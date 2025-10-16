import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function Confirmation() {
  const [candidateName, setCandidateName] = useState("");
  const [vId, setVId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleConfirm = () => {
    if (!candidateName || !vId || !startDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    setShowConfirmModal(true);
  };

  const confirmOnboarding = () => {
    setShowConfirmModal(false);
    toast.success("Confirmation sent to Business Desk successfully!");
    
    // Reset form
    setCandidateName("");
    setVId("");
    setStartDate("");
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Onboarding Confirmation</h1>
        <p className="text-muted-foreground mt-1">Confirm candidate onboarding details</p>
      </div>

      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Confirm Onboarding</CardTitle>
            <CardDescription>Enter the candidate details to confirm onboarding</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="candidateName">Candidate Name *</Label>
              <Input
                id="candidateName"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                placeholder="Enter candidate full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vId">V-ID *</Label>
              <Input
                id="vId"
                value={vId}
                onChange={(e) => setVId(e.target.value)}
                placeholder="e.g., V-1005"
              />
              <p className="text-xs text-muted-foreground">
                Vendor ID assigned to the candidate
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            {candidateName && vId && startDate && (
              <div className="p-4 bg-accent/30 rounded-lg border border-accent">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-2">Onboarding Summary</h4>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-muted-foreground">Candidate:</span> {candidateName}</p>
                      <p><span className="text-muted-foreground">V-ID:</span> {vId}</p>
                      <p><span className="text-muted-foreground">Start Date:</span> {new Date(startDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3 justify-end pt-4 border-t">
              <Button 
                variant="outline" 
                onClick={() => {
                  setCandidateName("");
                  setVId("");
                  setStartDate("");
                }}
              >
                Clear Form
              </Button>
              <Button onClick={handleConfirm}>
                Confirm Onboarding
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Confirmation Modal */}
        <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Onboarding Confirmation</DialogTitle>
              <DialogDescription>
                You are about to confirm the onboarding for {candidateName}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="p-4 bg-accent/30 rounded-lg space-y-2">
                <p className="text-sm font-medium">Confirmation Details:</p>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• Candidate: {candidateName}</p>
                  <p>• V-ID: {vId}</p>
                  <p>• Start Date: {startDate && new Date(startDate).toLocaleDateString()}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                This confirmation will be sent to the Business Desk for final processing.
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowConfirmModal(false)}>
                Cancel
              </Button>
              <Button onClick={confirmOnboarding}>
                Send Confirmation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Annotation */}
        <Card className="bg-accent/50 border-primary/20 mt-6">
          <CardHeader>
            <CardTitle className="text-sm">💡 Interaction Notes</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <ul className="list-disc list-inside space-y-1">
              <li>Simple form with three required fields: Candidate Name, V-ID, and Start Date</li>
              <li>Summary preview appears when all fields are filled</li>
              <li>Confirmation modal displays details before submission</li>
              <li>Upon confirmation, notification is sent to Business Desk</li>
              <li>Indicates confirmation flow completion</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
