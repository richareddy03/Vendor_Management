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

const interviews = [
  {
    id: 1,
    date: new Date(2025, 0, 20),
    candidate: "Alice Cooper",
    time: "10:00 AM - 11:00 AM",
    vendor: "TechSolutions Inc.",
    meetingLink: "https://meet.example.com/abc-123",
    interviewers: "John Doe, Jane Smith",
  },
  {
    id: 2,
    date: new Date(2025, 0, 22),
    candidate: "Bob Martinez",
    time: "2:00 PM - 3:00 PM",
    vendor: "DevPro Services",
    meetingLink: "https://meet.example.com/xyz-456",
    interviewers: "John Doe, Mike Johnson",
  },
  {
    id: 3,
    date: new Date(2025, 0, 25),
    candidate: "Carol Davis",
    time: "11:00 AM - 12:00 PM",
    vendor: "CloudExperts Ltd.",
    meetingLink: "https://meet.example.com/def-789",
    interviewers: "John Doe, Sarah Wilson",
  },
];

export default function Interview() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedInterview, setSelectedInterview] = useState<typeof interviews[0] | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const handleViewDetails = (interview: typeof interviews[0]) => {
    setSelectedInterview(interview);
    setShowDetailsModal(true);
  };

  const interviewDates = interviews.map((i) => i.date);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Interview Calendar</h1>
        <p className="text-muted-foreground mt-1">
          View interviews scheduled by vendors (read-only)
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar */}
        <Card className="shadow-material-md lg:col-span-1">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Interviews highlighted in blue</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
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
          </CardContent>
        </Card>

        {/* Interview List */}
        <Card className="shadow-material-md lg:col-span-2">
          <CardHeader>
            <CardTitle>Scheduled Interviews</CardTitle>
            <CardDescription>
              FTE Lead cannot edit or reschedule. Contact vendor to request changes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {interviews.map((interview) => (
                <div
                  key={interview.id}
                  className="border border-border rounded-lg p-4 hover:bg-accent/50 transition-base"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{interview.candidate}</h3>
                        <Badge variant="outline">{interview.vendor}</Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-4 w-4" />
                          {interview.date.toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {interview.time}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        {interview.interviewers}
                      </div>
                    </div>

                    <div className="flex gap-2">
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
          </CardContent>
        </Card>
      </div>

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
                  className="text-sm text-primary hover:underline"
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
