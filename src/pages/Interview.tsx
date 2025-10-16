import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Video, Calendar as CalendarIcon, Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const interviews = [
  {
    id: 1,
    date: new Date(2025, 9, 16), // October 16, 2025
    candidate: "Alice Cooper",
    time: "10:00 AM - 11:00 AM",
    vendor: "TechSolutions Inc.",
    meetingLink: "https://meet.example.com/abc-123",
    interviewers: "John Doe, Jane Smith",
  },
  {
    id: 2,
    date: new Date(2025, 9, 16), // October 16, 2025
    candidate: "Bob Martinez",
    time: "2:00 PM - 3:00 PM",
    vendor: "DevPro Services",
    meetingLink: "https://meet.example.com/xyz-456",
    interviewers: "John Doe, Mike Johnson",
  },
  {
    id: 3,
    date: new Date(2025, 9, 17), // October 17, 2025
    candidate: "Carol Davis",
    time: "11:00 AM - 12:00 PM",
    vendor: "CloudExperts Ltd.",
    meetingLink: "https://meet.example.com/def-789",
    interviewers: "John Doe, Sarah Wilson",
  },
  {
    id: 4,
    date: new Date(2025, 9, 18), // October 18, 2025
    candidate: "David Evans",
    time: "9:00 AM - 10:00 AM",
    vendor: "TechSolutions Inc.",
    meetingLink: "https://meet.example.com/ghi-012",
    interviewers: "Jane Smith, Mike Johnson",
  },
  {
    id: 5,
    date: new Date(2025, 9, 20), // October 20, 2025
    candidate: "Eve Foster",
    time: "1:00 PM - 2:00 PM",
    vendor: "DevPro Services",
    meetingLink: "https://meet.example.com/jkl-345",
    interviewers: "Sarah Wilson, John Doe",
  },
  {
    id: 6,
    date: new Date(2025, 9, 22), // October 22, 2025
    candidate: "Frank Green",
    time: "3:00 PM - 4:00 PM",
    vendor: "CloudExperts Ltd.",
    meetingLink: "https://meet.example.com/mno-678",
    interviewers: "Mike Johnson, Jane Smith",
  },
  {
    id: 7,
    date: new Date(2025, 9, 25), // October 25, 2025
    candidate: "Grace Harris",
    time: "10:30 AM - 11:30 AM",
    vendor: "TechSolutions Inc.",
    meetingLink: "https://meet.example.com/pqr-901",
    interviewers: "John Doe, Sarah Wilson, Mike Johnson",
  },
];

export default function Interview() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2025, 9, 16)); // Today's date: October 16, 2025
  const [selectedInterview, setSelectedInterview] = useState<typeof interviews[0] | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCalendarDialog, setShowCalendarDialog] = useState(false);
  const navigate = useNavigate();

  const handleViewDetails = (interview: typeof interviews[0]) => {
    setSelectedInterview(interview);
    setShowDetailsModal(true);
  };

  // const handleBack = () => {
  //   navigate("/dashboard");
  // };

  const interviewDates = interviews.map((i) => i.date);

  // Filter interviews by selected date
  const filteredInterviews = interviews.filter(
    (interview) =>
      interview.date.toDateString() === selectedDate.toDateString()
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Interview Calendar</h1>
        <div className="flex items-center gap-2">
          {/* <Button
            variant="outline"
            size="sm"
            onClick={handleBack}
            aria-label="Back to Dashboard"
          >
            Back
          </Button> */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCalendarDialog(true)}
            aria-label="Open Calendar"
          >
            <CalendarIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Interview List */}
      <Card className="shadow-material-md">
        <CardHeader>
          <CardTitle>Scheduled Interviews for {selectedDate.toLocaleDateString()}</CardTitle>
          <CardDescription>
            FTE Lead cannot edit or reschedule. Contact vendor to request changes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredInterviews.length === 0 ? (
            <p className="text-sm text-muted-foreground">No interviews scheduled for this date.</p>
          ) : (
            <div className="space-y-4">
              {filteredInterviews.map((interview) => (
                <div
                  key={interview.id}
                  className="border border-border rounded-lg p-4 hover:bg-accent/50 transition-base"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-foreground">{interview.candidate}</h3>
                        <Badge variant="outline">{interview.vendor}</Badge>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-4 w-4" />
                          {interview.date.toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {interview.time}
                        </div>
                      </div>

                      <div className="flex items-start gap-1 text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mt-0.5" />
                        <span className="break-words">{interview.interviewers}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(interview)}
                      >
                        View Details
                      </Button>
                      <Button size="sm">
                        <Video className="h-4 w-4 mr-1" />
                        Join
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Calendar Dialog */}
      <Dialog open={showCalendarDialog} onOpenChange={setShowCalendarDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Interview Calendar</DialogTitle>
            <DialogDescription>Interviews highlighted in blue</DialogDescription>
          </DialogHeader>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              setSelectedDate(date || new Date(2025, 9, 16));
              setShowCalendarDialog(false); // Close dialog after selection
            }}
            className="pointer-events-auto"
            modifiers={{
              interview: interviewDates,
            }}
            modifiersStyles={{
              interview: {
                backgroundColor: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
                fontWeight: "bold",
              },
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Interview Details</DialogTitle>
            <DialogDescription>Complete interview information</DialogDescription>
          </DialogHeader>
          {selectedInterview && (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Candidate</p>
                <p className="text-base font-semibold text-foreground">{selectedInterview.candidate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Vendor</p>
                <p className="text-base text-foreground">{selectedInterview.vendor}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Date & Time</p>
                <p className="text-base text-foreground">
                  {selectedInterview.date.toLocaleDateString()} - {selectedInterview.time}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Interviewers</p>
                <p className="text-base text-foreground">{selectedInterview.interviewers}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Meeting Link</p>
                <a
                  href={selectedInterview.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline break-all"
                >
                  {selectedInterview.meetingLink}
                </a>
              </div>
              <Button className="w-full" size="lg">
                <Video className="h-5 w-5 mr-2" />
                Join Meeting
              </Button>
              <Button variant="outline" className="w-full">
                Request Reschedule
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}