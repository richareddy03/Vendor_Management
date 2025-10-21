import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, UserPlus, RefreshCw, CheckCircle, Clock, AlertCircle, X, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FteLeadChatbot from "./FTELeadChatbot";

const stats = [
  {
    title: "Pending Approvals",
    value: "12",
    icon: Clock,
    description: "Rate cards awaiting review",
    color: "text-warning",
  },
  {
    title: "Active Onboarding",
    value: "8",
    icon: UserPlus,
    description: "Onboarding in progress",
    color: "text-primary",
  },
  {
    title: "Replacements",
    value: "5",
    icon: RefreshCw,
    description: "Replacement requests",
    color: "text-accent-foreground",
  },
  {
    title: "Completed",
    value: "45",
    icon: CheckCircle,
    description: "This month",
    color: "text-success",
  },
];

const recentRequests = [
  {
    id: "REQ-2025-001",
    type: "Onboarding",
    vendor: "TechSolutions Inc.",
    status: "Pending Approval",
    date: "2025-01-15",
  },
  {
    id: "REQ-2025-002",
    type: "Replacement",
    vendor: "DevPro Services",
    status: "In Progress",
    date: "2025-01-14",
  },
  {
    id: "REQ-2025-003",
    type: "Rate Card Review",
    vendor: "CloudExperts Ltd.",
    status: "Approved",
    date: "2025-01-13",
  },
  {
    id: "REQ-2025-004",
    type: "Offboarding",
    vendor: "DataVendor Co.",
    status: "Completed",
    date: "2025-07-12",
  },
];

const pendingApprovalsData = [
  {
    id: "PA-001",
    title: "Rate Card Review - TechSolutions",
    type: "Rate Card",
    vendor: "TechSolutions Inc.",
    date: "2025-10-10",
    status: "Pending",
    comments: "Proposed rate for Senior React Developer is $85/hr.",
    preApproved: false,
  },
  {
    id: "PA-002",
    title: "Onboarding Approval - DevPro",
    type: "Onboarding",
    vendor: "DevPro Services",
    date: "2025-10-12",
    status: "Pending",
    comments: "Need 3 Backend Engineers for API Infrastructure.",
    preApproved: true,
  },
  {
    id: "PA-003",
    title: "Replacement Request - CloudExperts",
    type: "Replacement",
    vendor: "CloudExperts Ltd.",
    date: "2025-10-14",
    status: "Pending",
    comments: "Replace due to resignation.",
    preApproved: false,
  },
  {
    id: "PA-004",
    title: "Offboarding Approval - DataVendor",
    type: "Offboarding",
    vendor: "DataVendor Co.",
    date: "2025-10-15",
    status: "Pending",
    comments: "Offboarding due to project completion.",
    preApproved: false,
  },
  {
    id: "PA-005",
    title: "Rate Card Review - TechSolutions",
    type: "Rate Card",
    vendor: "TechSolutions Inc.",
    date: "2025-10-16",
    status: "Pending",
    comments: "Rate adjustment for Frontend Developer.",
    preApproved: false,
  },
  {
    id: "PA-006",
    title: "Onboarding Approval - DevPro",
    type: "Onboarding",
    vendor: "DevPro Services",
    date: "2025-10-17",
    status: "Pending",
    comments: "Full Stack Developer for API Infrastructure.",
    preApproved: true,
  },
  {
    id: "PA-007",
    title: "Replacement Request - CloudExperts",
    type: "Replacement",
    vendor: "CloudExperts Ltd.",
    date: "2025-10-18",
    status: "Pending",
    comments: "Replace due to skill mismatch.",
    preApproved: false,
  },
  {
    id: "PA-008",
    title: "Offboarding Approval - DataVendor",
    type: "Offboarding",
    vendor: "DataVendor Co.",
    date: "2025-10-19",
    status: "Pending",
    comments: "Offboarding due to contract end.",
    preApproved: false,
  },
  {
    id: "PA-009",
    title: "Rate Card Review - TechSolutions",
    type: "Rate Card",
    vendor: "TechSolutions Inc.",
    date: "2025-10-20",
    status: "Pending",
    comments: "Rate review for Mobile App Redesign team.",
    preApproved: false,
  },
  {
    id: "PA-010",
    title: "Onboarding Approval - DevPro",
    type: "Onboarding",
    vendor: "DevPro Services",
    date: "2025-10-21",
    status: "Pending",
    comments: "Need 2 developers for API enhancements.",
    preApproved: true,
  },
  {
    id: "PA-011",
    title: "Replacement Request - CloudExperts",
    type: "Replacement",
    vendor: "CloudExperts Ltd.",
    date: "2025-10-22",
    status: "Pending",
    comments: "Replace due to performance issues.",
    preApproved: false,
  },
  {
    id: "PA-012",
    title: "Offboarding Approval - DataVendor",
    type: "Offboarding",
    vendor: "DataVendor Co.",
    date: "2025-10-23",
    status: "Pending",
    comments: "Offboarding due to project completion.",
    preApproved: false,
  },
];

const activeOnboardingData = [
  {
    id: "AO-001",
    name: "John Doe",
    vendor: "TechSolutions Inc.",
    role: "Senior React Developer",
    project: "Mobile App Redesign",
    startDate: "2025-10-16",
    status: "In Progress",
  },
  {
    id: "AO-002",
    name: "Jane Smith",
    vendor: "DevPro Services",
    role: "Backend Engineer",
    project: "API Infrastructure",
    startDate: "2025-10-17",
    status: "In Progress",
  },
  {
    id: "AO-003",
    name: "Mike Johnson",
    vendor: "CloudExperts Ltd.",
    role: "DevOps Engineer",
    project: "Cloud Migration",
    startDate: "2025-10-18",
    status: "In Progress",
  },
  {
    id: "AO-004",
    name: "Sarah Wilson",
    vendor: "DataVendor Co.",
    role: "Data Analyst",
    project: "Data Analytics",
    startDate: "2025-10-19",
    status: "In Progress",
  },
  {
    id: "AO-005",
    name: "David Brown",
    vendor: "TechSolutions Inc.",
    role: "Frontend Developer",
    project: "Mobile App Redesign",
    startDate: "2025-10-20",
    status: "In Progress",
  },
  {
    id: "AO-006",
    name: "Emily Davis",
    vendor: "DevPro Services",
    role: "Full Stack Developer",
    project: "API Infrastructure",
    startDate: "2025-10-21",
    status: "In Progress",
  },
  {
    id: "AO-007",
    name: "Robert Clark",
    vendor: "CloudExperts Ltd.",
    role: "Cloud Architect",
    project: "Cloud Migration",
    startDate: "2025-10-22",
    status: "In Progress",
  },
  {
    id: "AO-008",
    name: "Lisa Green",
    vendor: "DataVendor Co.",
    role: "BI Analyst",
    project: "Data Analytics",
    startDate: "2025-10-23",
    status: "In Progress",
  },
];

const replacementsData = [
  {
    id: "REP-001",
    name: "Old Resource - John Doe",
    newResource: "New Resource - Alice Cooper",
    vendor: "TechSolutions Inc.",
    project: "Mobile App Redesign",
    reason: "Performance Issues",
    status: "Pending",
    date: "2025-10-16",
  },
  {
    id: "REP-002",
    name: "Old Resource - Jane Smith",
    newResource: "New Resource - Bob Martinez",
    vendor: "DevPro Services",
    project: "API Infrastructure",
    reason: "End of Contract",
    status: "In Progress",
    date: "2025-10-17",
  },
  {
    id: "REP-003",
    name: "Old Resource - Mike Johnson",
    newResource: "New Resource - Carol Davis",
    vendor: "CloudExperts Ltd.",
    project: "Cloud Migration",
    reason: "Resignation",
    status: "Approved",
    date: "2025-10-18",
  },
  {
    id: "REP-004",
    name: "Old Resource - Sarah Wilson",
    newResource: "New Resource - David Evans",
    vendor: "DataVendor Co.",
    project: "Data Analytics",
    reason: "Skill Mismatch",
    status: "Completed",
    date: "2025-10-19",
  },
  {
    id: "REP-005",
    name: "Old Resource - Robert Clark",
    newResource: "New Resource - Emily Davis",
    vendor: "TechSolutions Inc.",
    project: "Mobile App Redesign",
    reason: "Performance Issues",
    status: "Pending",
    date: "2025-10-20",
  },
];

const completedData = [
  {
    id: "COMP-001",
    type: "Onboarding",
    name: "John Doe",
    vendor: "TechSolutions Inc.",
    project: "Mobile App Redesign",
    completedDate: "2025-10-10",
  },
  {
    id: "COMP-002",
    type: "Replacement",
    name: "Jane Smith replaced by Bob Martinez",
    vendor: "DevPro Services",
    project: "API Infrastructure",
    completedDate: "2025-10-12",
  },
  {
    id: "COMP-003",
    type: "Offboarding",
    name: "Mike Johnson",
    vendor: "CloudExperts Ltd.",
    project: "Cloud Migration",
    completedDate: "2025-10-14",
  },
  {
    id: "COMP-004",
    type: "Rate Card Approval",
    name: "Sarah Wilson Rate Card",
    vendor: "DataVendor Co.",
    project: "Data Analytics",
    completedDate: "2025-10-15",
  },
  {
    id: "COMP-005",
    type: "Onboarding",
    name: "David Brown",
    vendor: "TechSolutions Inc.",
    project: "Mobile App Redesign",
    completedDate: "2025-10-16",
  },
  {
    id: "COMP-006",
    type: "Replacement",
    name: "Lisa Green replaced by Robert Clark",
    vendor: "DevPro Services",
    project: "API Infrastructure",
    completedDate: "2025-10-17",
  },
  {
    id: "COMP-007",
    type: "Offboarding",
    name: "Emily Davis",
    vendor: "CloudExperts Ltd.",
    project: "Cloud Migration",
    completedDate: "2025-10-18",
  },
  {
    id: "COMP-008",
    type: "Rate Card Approval",
    name: "Frank Green Rate Card",
    vendor: "DataVendor Co.",
    project: "Data Analytics",
    completedDate: "2025-10-19",
  },
  {
    id: "COMP-009",
    type: "Onboarding",
    name: "Grace Harris",
    vendor: "TechSolutions Inc.",
    project: "Mobile App Redesign",
    completedDate: "2025-10-20",
  },
  {
    id: "COMP-010",
    type: "Replacement",
    name: "Henry White replaced by Ian Black",
    vendor: "DevPro Services",
    project: "API Infrastructure",
    completedDate: "2025-10-21",
  },
  {
    id: "COMP-011",
    type: "Offboarding",
    name: "Julia Brown",
    vendor: "CloudExperts Ltd.",
    project: "Cloud Migration",
    completedDate: "2025-10-22",
  },
  {
    id: "COMP-012",
    type: "Rate Card Approval",
    name: "Kevin Green Rate Card",
    vendor: "DataVendor Co.",
    project: "Data Analytics",
    completedDate: "2025-10-23",
  },
  {
    id: "COMP-013",
    type: "Onboarding",
    name: "Laura Davis",
    vendor: "TechSolutions Inc.",
    project: "Mobile App Redesign",
    completedDate: "2025-10-24",
  },
  {
    id: "COMP-014",
    type: "Replacement",
    name: "Mark Smith replaced by Nina Wilson",
    vendor: "DevPro Services",
    project: "API Infrastructure",
    completedDate: "2025-10-25",
  },
  {
    id: "COMP-015",
    type: "Offboarding",
    name: "Oliver Johnson",
    vendor: "CloudExperts Ltd.",
    project: "Cloud Migration",
    completedDate: "2025-10-26",
  },
  {
    id: "COMP-016",
    type: "Rate Card Approval",
    name: "Paula Clark Rate Card",
    vendor: "DataVendor Co.",
    project: "Data Analytics",
    completedDate: "2025-10-27",
  },
  {
    id: "COMP-017",
    type: "Onboarding",
    name: "Quinn Lee",
    vendor: "TechSolutions Inc.",
    project: "Mobile App Redesign",
    completedDate: "2025-10-28",
  },
  {
    id: "COMP-018",
    type: "Replacement",
    name: "Rachel Taylor replaced by Steve Anderson",
    vendor: "DevPro Services",
    project: "API Infrastructure",
    completedDate: "2025-10-29",
  },
  {
    id: "COMP-019",
    type: "Offboarding",
    name: "Tom Brown",
    vendor: "CloudExperts Ltd.",
    project: "Cloud Migration",
    completedDate: "2025-10-30",
  },
  {
    id: "COMP-020",
    type: "Rate Card Approval",
    name: "Uma Patel Rate Card",
    vendor: "DataVendor Co.",
    project: "Data Analytics",
    completedDate: "2025-10-31",
  },
  {
    id: "COMP-021",
    type: "Onboarding",
    name: "Victor Kim",
    vendor: "TechSolutions Inc.",
    project: "Mobile App Redesign",
    completedDate: "2025-11-01",
  },
  {
    id: "COMP-022",
    type: "Replacement",
    name: "Wendy Garcia replaced by Xavier Lopez",
    vendor: "DevPro Services",
    project: "API Infrastructure",
    completedDate: "2025-11-02",
  },
  {
    id: "COMP-023",
    type: "Offboarding",
    name: "Yvonne Martinez",
    vendor: "CloudExperts Ltd.",
    project: "Cloud Migration",
    completedDate: "2025-11-03",
  },
  {
    id: "COMP-024",
    type: "Rate Card Approval",
    name: "Zachary Nguyen Rate Card",
    vendor: "DataVendor Co.",
    project: "Data Analytics",
    completedDate: "2025-11-04",
  },
  {
    id: "COMP-025",
    type: "Onboarding",
    name: "Amy Wong",
    vendor: "TechSolutions Inc.",
    project: "Mobile App Redesign",
    completedDate: "2025-11-05",
  },
  {
    id: "COMP-026",
    type: "Replacement",
    name: "Brian Lee replaced by Chloe Kim",
    vendor: "DevPro Services",
    project: "API Infrastructure",
    completedDate: "2025-11-06",
  },
  {
    id: "COMP-027",
    type: "Offboarding",
    name: "Derek Chen",
    vendor: "CloudExperts Ltd.",
    project: "Cloud Migration",
    completedDate: "2025-11-07",
  },
  {
    id: "COMP-028",
    type: "Rate Card Approval",
    name: "Elena Rodriguez Rate Card",
    vendor: "DataVendor Co.",
    project: "Data Analytics",
    completedDate: "2025-11-08",
  },
  {
    id: "COMP-029",
    type: "Onboarding",
    name: "Frank Murphy",
    vendor: "TechSolutions Inc.",
    project: "Mobile App Redesign",
    completedDate: "2025-11-09",
  },
  {
    id: "COMP-030",
    type: "Replacement",
    name: "Grace Thompson replaced by Harry White",
    vendor: "DevPro Services",
    project: "API Infrastructure",
    completedDate: "2025-11-10",
  },
  {
    id: "COMP-031",
    type: "Offboarding",
    name: "Iris Young",
    vendor: "CloudExperts Ltd.",
    project: "Cloud Migration",
    completedDate: "2025-11-11",
  },
  {
    id: "COMP-032",
    type: "Rate Card Approval",
    name: "Jack King Rate Card",
    vendor: "DataVendor Co.",
    project: "Data Analytics",
    completedDate: "2025-11-12",
  },
  {
    id: "COMP-033",
    type: "Onboarding",
    name: "Kara Lewis",
    vendor: "TechSolutions Inc.",
    project: "Mobile App Redesign",
    completedDate: "2025-11-13",
  },
  {
    id: "COMP-034",
    type: "Replacement",
    name: "Leo Hall replaced by Mia Scott",
    vendor: "DevPro Services",
    project: "API Infrastructure",
    completedDate: "2025-11-14",
  },
  {
    id: "COMP-035",
    type: "Offboarding",
    name: "Noah Green",
    vendor: "CloudExperts Ltd.",
    project: "Cloud Migration",
    completedDate: "2025-11-15",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ sender: string; text: string; timestamp: string }[]>([
    {
      sender: "bot",
      text: "How may I help you?",
      timestamp: format(new Date(), "HH:mm"),
    },
  ]);
  const [userInput, setUserInput] = useState("");

  const handleViewRequests = () => {
    navigate("/request-tracking");
  };

  const handleCardClick = (title: string) => {
    setSelectedCategory(title);
  };

  const handleChatbotToggle = () => {
    console.log("Chatbot toggled:", { isOpen: !showChatbot, timestamp: new Date().toISOString() });
    setShowChatbot(!showChatbot);
    if (!showChatbot) {
      setChatMessages([
        {
          sender: "bot",
          text: "How may I help you?",
          timestamp: format(new Date(), "HH:mm"),
        },
      ]);
    }
  };

  const handleSendMessage = () => {
    if (userInput.trim()) {
      const userMessage = {
        sender: "user",
        text: userInput,
        timestamp: format(new Date(), "HH:mm"),
      };
      const botResponse = {
        sender: "bot",
        text: "Thanks for your message! I'm here to help. Please let me know more about your query.",
        timestamp: format(new Date(), "HH:mm"),
      };
      setChatMessages([...chatMessages, userMessage, botResponse]);
      console.log("User message sent:", { message: userInput, timestamp: new Date().toISOString() });
      setUserInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && userInput.trim()) {
      handleSendMessage();
    }
  };

  const renderDetailsTable = () => {
    if (!selectedCategory) return null;

    let data: any[] = [];
    let columns: string[] = [];
    let title = "";

    switch (selectedCategory) {
      case "Pending Approvals":
        data = pendingApprovalsData;
        columns = ["ID", "Title", "Type", "Vendor", "Date", "Status", "Comments", "Pre approved"];
        title = "Pending Approvals";
        break;
      case "Active Onboarding":
        data = activeOnboardingData;
        columns = ["ID", "Name", "Vendor", "Role", "Project", "Start Date", "Status"];
        title = "Active Onboarding";
        break;
      case "Replacements":
        data = replacementsData;
        columns = ["ID", "Old Resource", "New Resource", "Vendor", "Project", "Reason", "Status", "Date"];
        title = "Replacements";
        break;
      case "Completed":
        data = completedData;
        columns = ["ID", "Type", "Name", "Vendor", "Project", "Completed Date"];
        title = "Completed Requests";
        break;
      default:
        return null;
    }

    return (
      <div className="w-full">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b border-border">
              {columns.map((column) => (
                <th key={column} className="text-left py-3 px-4 text-sm font-medium text-muted-foreground min-w-0">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b border-border hover:bg-accent/50 transition-base">
                <td className="py-3 px-4 text-sm font-medium text-foreground whitespace-normal break-words">{item.id}</td>
                {selectedCategory === "Pending Approvals" && (
                  <>
                    <td className="py-3 px-4 text-sm text-foreground whitespace-normal break-words">{item.title}</td>
                    <td className="py-3 px-4 text-sm text-foreground whitespace-normal break-words">{item.type}</td>
                    <td className="py-3 px-4 text-sm text-foreground whitespace-normal break-words">{item.vendor}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground whitespace-normal">{item.date}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning/10 text-warning`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-foreground whitespace-normal break-words">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="line-clamp-2">{item.comments}</span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{item.comments}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </td>
                    <td className="py-3 px-4 text-sm text-foreground whitespace-normal">{item.preApproved ? "Yes" : "No"}</td>
                  </>
                )}
                {selectedCategory === "Active Onboarding" && (
                  <>
                    <td className="py-3 px-4 text-sm text-foreground whitespace-normal break-words">{item.name}</td>
                    <td className="py-3 px-4 text-sm text-foreground whitespace-normal break-words">{item.vendor}</td>
                    <td className="py-3 px-4 text-sm text-foreground whitespace-normal break-words">{item.role}</td>
                    <td className="py-3 px-4 text-sm text-foreground whitespace-normal break-words">{item.project}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground whitespace-normal">{item.startDate}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </>
                )}
                {selectedCategory === "Replacements" && (
                  <>
                    <td className="py-3 px-4 text-sm text-foreground whitespace-normal break-words">{item.name}</td>
                    <td className="py-3 px-4 text-sm text-foreground whitespace-normal break-words">{item.newResource}</td>
                    <td className="py-3 px-4 text-sm text-foreground whitespace-normal break-words">{item.vendor}</td>
                    <td className="py-3 px-4 text-sm text-foreground whitespace-normal break-words">{item.project}</td>
                    <td className="py-3 px-4 text-sm text-foreground whitespace-normal break-words">{item.reason}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.status === "Approved"
                            ? "bg-success/10 text-success"
                            : item.status === "Completed"
                            ? "bg-success/10 text-success"
                            : item.status === "In Progress"
                            ? "bg-primary/10 text-primary"
                            : "bg-warning/10 text-warning"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground whitespace-normal">{item.date}</td>
                  </>
                )}
                {selectedCategory === "Completed" && (
                  <>
                    <td className="py-3 px-4 text-sm text-foreground whitespace-normal break-words">{item.type}</td>
                    <td className="py-3 px-4 text-sm text-foreground whitespace-normal break-words">{item.name}</td>
                    <td className="py-3 px-4 text-sm text-foreground whitespace-normal break-words">{item.vendor}</td>
                    <td className="py-3 px-4 text-sm text-foreground whitespace-normal break-words">{item.project}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground whitespace-normal">{item.completedDate}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's your overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="shadow-material-md hover:shadow-material-lg transition-smooth cursor-pointer"
            onClick={() => handleCardClick(stat.title)}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Requests Table */}
      <Card className="shadow-material-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Requests</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewRequests}
            aria-label="View all requests"
          >
            View Requests
          </Button>
        </CardHeader>
        <CardContent>
          <div className="w-full">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground min-w-0">Request ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground min-w-0">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground min-w-0">Vendor</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground min-w-0">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground min-w-0">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentRequests.map((request) => (
                  <tr key={request.id} className="border-b border-border hover:bg-accent/50 transition-base">
                    <td className="py-3 px-4 text-sm font-medium text-foreground whitespace-normal break-words">{request.id}</td>
                    <td className="py-3 px-4 text-sm text-foreground whitespace-normal break-words">{request.type}</td>
                    <td className="py-3 px-4 text-sm text-foreground whitespace-normal break-words">{request.vendor}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          request.status === "Approved"
                            ? "bg-success/10 text-success"
                            : request.status === "Completed"
                            ? "bg-success/10 text-success"
                            : request.status === "In Progress"
                            ? "bg-primary/10 text-primary"
                            : "bg-warning/10 text-warning"
                        }`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground whitespace-normal">{request.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Details Modal */}
      <Dialog open={!!selectedCategory} onOpenChange={() => setSelectedCategory(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle>{selectedCategory}</DialogTitle>
            {/* <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedCategory(null)}
              aria-label="Close details"
            >
              <X className="h-4 w-4" />
              Close
            </Button> */}
          </DialogHeader>
          {renderDetailsTable()}
        </DialogContent>
      </Dialog>
     
     {/* Chatbot Component */}
     <FteLeadChatbot isOpen={showChatbot} onClose={setShowChatbot} />
      
      
    </div>
  );
}