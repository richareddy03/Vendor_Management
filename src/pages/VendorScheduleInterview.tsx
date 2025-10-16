import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, Clock, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM"
];

export default function ScheduleInterview() {
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleSchedule = () => {
    if (!date || !timeSlot || !meetingLink || !candidateName) {
      toast.error("Please fill in all required fields");
      return;
    }

    setShowConfirmModal(true);
  };

  const confirmSchedule = () => {
    setShowConfirmModal(false);
    toast.success("Interview scheduled! Invites sent to FTE Lead and Candidate");
    
    // Reset form
    setDate("");
    setTimeSlot("");
    setMeetingLink("");
    setCandidateName("");
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Schedule Interview</h1>
        <p className="text-muted-foreground mt-1">Schedule interviews with candidates and FTE leads</p>
      </div>

      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Interview Details</CardTitle>
            <CardDescription>Fill in all fields to schedule an interview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="candidateName">Candidate Name *</Label>
              <Input
                id="candidateName"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                placeholder="Enter candidate name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Interview Date *</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="pl-10"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeSlot">Time Slot *</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10" />
                <Select value={timeSlot} onValueChange={setTimeSlot}>
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Select time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="meetingLink">Meeting Link *</Label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  id="meetingLink"
                  type="url"
                  value={meetingLink}
                  onChange={(e) => setMeetingLink(e.target.value)}
                  placeholder="https://meet.google.com/xxx-xxxx-xxx"
                  className="pl-10"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Provide a video conference link (Google Meet, Zoom, Teams, etc.)
              </p>
            </div>

            {date && timeSlot && (
              <div className="p-4 bg-accent/30 rounded-lg border border-accent">
                <h4 className="font-medium mb-2">Interview Summary</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="text-muted-foreground">Candidate:</span> {candidateName || "Not specified"}</p>
                  <p><span className="text-muted-foreground">Date:</span> {new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <p><span className="text-muted-foreground">Time:</span> {timeSlot}</p>
                  {meetingLink && <p><span className="text-muted-foreground">Link:</span> <a href={meetingLink} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Join Meeting</a></p>}
                </div>
              </div>
            )}

            <div className="flex gap-3 justify-end pt-4 border-t">
              <Button 
                variant="outline" 
                onClick={() => {
                  setDate("");
                  setTimeSlot("");
                  setMeetingLink("");
                  setCandidateName("");
                }}
              >
                Clear Form
              </Button>
              <Button onClick={handleSchedule}>
                Schedule Interview
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Confirmation Modal */}
        <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Interview Scheduled</DialogTitle>
              <DialogDescription>
                Calendar invites will be sent to the following recipients
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-3">
              <div className="p-3 bg-accent/30 rounded-lg">
                <p className="text-sm font-medium mb-1">Recipients:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• FTE Lead (Project Manager)</li>
                  <li>• Candidate: {candidateName}</li>
                </ul>
              </div>
              <div className="p-3 bg-accent/30 rounded-lg">
                <p className="text-sm font-medium mb-1">Interview Details:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Date: {date && new Date(date).toLocaleDateString()}</li>
                  <li>• Time: {timeSlot}</li>
                  <li>• Link: Meeting link included in invite</li>
                </ul>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowConfirmModal(false)}>
                Cancel
              </Button>
              <Button onClick={confirmSchedule}>
                Send Invites
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
