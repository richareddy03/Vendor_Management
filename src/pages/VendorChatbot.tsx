import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const vendorData = {
  activeEmployees: [
    { name: "John Doe", vId: "V-1001", project: "Alpha", role: "Senior Developer", startDate: "2024-01-15" },
    { name: "Jane Smith", vId: "V-1002", project: "Beta", role: "UI/UX Designer", startDate: "2024-02-01" },
    { name: "Mike Johnson", vId: "V-1003", project: "Gamma", role: "DevOps Engineer", startDate: "2024-03-10" },
    { name: "Sarah Williams", vId: "V-1004", project: "Alpha", role: "QA Lead", startDate: "2024-01-20" },
  ],
  upcomingOnboardings: [
    { candidate: "Robert Brown", project: "Delta", role: "Full Stack Developer", startDate: "2025-11-01", status: "Scheduled" },
    { candidate: "Emily Davis", project: "Epsilon", role: "Data Analyst", startDate: "2025-11-15", status: "Pending Interview" },
    { candidate: "David Wilson", project: "Beta", role: "Frontend Developer", startDate: "2025-12-01", status: "Rate Card Approved" },
  ],
  rateCardSummary: [
    { project: "Alpha", avgRate: "$85/hr", resources: 12, status: "Active" },
    { project: "Beta", avgRate: "$78/hr", resources: 8, status: "Active" },
    { project: "Gamma", avgRate: "$92/hr", resources: 5, status: "Active" },
    { project: "Delta", avgRate: "$80/hr", resources: 3, status: "Pending" },
  ],
  plannedVsActualData: [
    { month: "Jan", plannedHours: 400, actualHours: 380, plannedCost: 40000, actualCost: 38000 },
    { month: "Feb", plannedHours: 450, actualHours: 470, plannedCost: 45000, actualCost: 47000 },
    { month: "Mar", plannedHours: 500, actualHours: 480, plannedCost: 50000, actualCost: 48000 },
    { month: "Apr", plannedHours: 420, actualHours: 440, plannedCost: 42000, actualCost: 44000 },
    { month: "May", plannedHours: 480, actualHours: 490, plannedCost: 48000, actualCost: 49000 },
    { month: "Jun", plannedHours: 510, actualHours: 500, plannedCost: 51000, actualCost: 50000 },
  ],
};

const VendorChatbot = ({ isOpen: isOpenProp, onClose: onCloseProp }) => {
  const [isOpen, setIsOpen] = useState(isOpenProp || false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef(null);

  useEffect(() => {
    setIsOpen(isOpenProp);
    if (isOpenProp && messages.length === 0) {
      addBotMessage("Welcome to the Vendor Assistant! How can I help with your vendor operations?", [
        { text: "View Active Employees", action: () => handleOptionSelect("employees") },
        { text: "Check Upcoming Onboardings", action: () => handleOptionSelect("onboardings") },
        { text: "Get Rate Card Summary", action: () => handleOptionSelect("ratecard") },
        { text: "View Hours/Costs", action: () => handleOptionSelect("hours") },
      ]);
    }
  }, [isOpenProp]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const addBotMessage = (text, options = []) => {
    setMessages(prev => [
      ...prev,
      { type: "bot", text, options, timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
    ]);
  };

  const addUserMessage = (text) => {
    setMessages(prev => [
      ...prev,
      { type: "user", text, timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
    ]);
  };

  const handleOptionSelect = (option) => {
    addUserMessage(option);
    switch (option) {
      case "employees":
        addBotMessage(
          `There are ${vendorData.activeEmployees.length} active employees. Example: ${vendorData.activeEmployees[0].name} (${vendorData.activeEmployees[0].vId}) is a ${vendorData.activeEmployees[0].role} on ${vendorData.activeEmployees[0].project}. Want details for a specific project?`
        );
        break;
      case "onboardings":
        addBotMessage(
          `There are ${vendorData.upcomingOnboardings.length} upcoming onboardings. Example: ${vendorData.upcomingOnboardings[0].candidate} is scheduled for ${vendorData.upcomingOnboardings[0].project} on ${vendorData.upcomingOnboardings[0].startDate} (${vendorData.upcomingOnboardings[0].status}). Need more details?`
        );
        break;
      case "ratecard":
        addBotMessage(
          `Rate card summary: ${vendorData.rateCardSummary.map(rc => `${rc.project}: ${rc.avgRate}, ${rc.resources} resources`).join("; ")}. Which project's rate card would you like to explore?`
        );
        break;
      case "hours":
        addBotMessage(
          `For June, planned hours were ${vendorData.plannedVsActualData[5].plannedHours} vs actual ${vendorData.plannedVsActualData[5].actualHours}, and planned cost was $${vendorData.plannedVsActualData[5].plannedCost} vs actual $${vendorData.plannedVsActualData[5].actualCost}. Want data for another month?`
        );
        break;
      default:
        addBotMessage("Thanks for your message! How can I assist further with vendor operations?");
        break;
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    addUserMessage(input);
    const inputLower = input.toLowerCase();
    let botResponse = "I'm not sure how to answer that. Could you provide more details?";

    if (inputLower.includes("active employees")) {
      botResponse = `There are ${vendorData.activeEmployees.length} active employees. Example: ${vendorData.activeEmployees[0].name} (${vendorData.activeEmployees[0].vId}) on ${vendorData.activeEmployees[0].project}. Want details for a specific project?`;
    } else if (inputLower.includes("onboardings")) {
      botResponse = `There are ${vendorData.upcomingOnboardings.length} upcoming onboardings. Example: ${vendorData.upcomingOnboardings[0].candidate} for ${vendorData.upcomingOnboardings[0].project} on ${vendorData.upcomingOnboardings[0].startDate}. Need more specifics?`;
    } else if (inputLower.includes("rate card")) {
      botResponse = `Rate card summary: ${vendorData.rateCardSummary.map(rc => `${rc.project}: ${rc.avgRate}`).join("; ")}. Which project would you like details for?`;
    } else if (inputLower.includes("hours") || inputLower.includes("cost")) {
      botResponse = `For June, planned hours: ${vendorData.plannedVsActualData[5].plannedHours}, actual: ${vendorData.plannedVsActualData[5].actualHours}; planned cost: $${vendorData.plannedVsActualData[5].plannedCost}, actual: $${vendorData.plannedVsActualData[5].actualCost}. Want another month's data?`;
    } else if (inputLower.includes("project alpha")) {
      const alphaData = vendorData.rateCardSummary.find(rc => rc.project === "Alpha");
      botResponse = `Project Alpha: Avg rate ${alphaData?.avgRate}, ${alphaData?.resources} resources, Status: ${alphaData?.status}. More details?`;
    }

    setTimeout(() => {
      addBotMessage(botResponse);
    }, 500);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (onCloseProp) onCloseProp(!isOpen);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={toggleChat}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-white text-xs"
          size="icon"
          aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
        >
          {isOpen ? <X className="h-7 w-7 text-white" /> : <MessageCircle className="h-7 w-7 text-white" />}
        </Button>
      </div>

      {isOpen && (
        <div className="fixed bottom-20 right-6 w-full sm:w-80 h-[400px] bg-white rounded-xl shadow-2xl z-50 flex flex-col transition-all duration-300">
          <div className="flex items-center justify-between p-2 border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-xl text-xs">
            <span className="font-semibold">Vendor Assistant</span>
            <Button variant="ghost" size="sm" onClick={toggleChat} className="text-white hover:text-gray-200">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50 text-xs">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`max-w-[80%] ${message.type === "user" ? "ml-auto bg-blue-500 text-white" : "bg-white text-gray-800"} p-2 rounded-xl shadow-md`}
              >
                <p className="text-sm">{message.text}</p>
                <span className="text-xs text-gray-500 block mt-1">{message.timestamp}</span>
                {message.options && message.options.length > 0 && (
                  <div className="mt-2 flex flex-col gap-2">
                    {message.options.map((option, optIndex) => (
                      <Button
                        key={optIndex}
                        onClick={() => option.action()}
                        variant="outline"
                        className="w-full bg-white hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 rounded-lg text-xs"
                      >
                        {option.text}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="p-2 border-t bg-gray-50 flex items-center rounded-b-xl">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 text-xs p-2 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
            <Button onClick={handleSend} size="icon" className="bg-blue-500 hover:bg-blue-600 ml-2 rounded-lg">
              <Send className="h-4 w-4 text-white" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default VendorChatbot;