import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const offboardingReasons = [
  "Project Completion",
  "Contract End",
  "Resource Request",
  "Performance Issues",
  "Budget Constraints",
  "Other"
];

export default function Offboarding() {
  const [employeeName, setEmployeeName] = useState("");
  const [vId, setVId] = useState("");
  const [project, setProject] = useState("");
  const [reason, setReason] = useState("");
  const [lastWorkingDate, setLastWorkingDate] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleConfirm = () => {
    if (!employeeName || !vId || !project || !reason || !lastWorkingDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    setShowConfirmModal(true);
  };

  const confirmOffboarding = () => {
    setShowConfirmModal(false);
    toast.success("Tracker disabled successfully! Offboarding process initiated");
    
    // Reset form
    setEmployeeName("");
    setVId("");
    setProject("");
    setReason("");
    setLastWorkingDate("");
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Offboarding Confirmation</h1>
        <p className="text-muted-foreground mt-1">Confirm employee offboarding and disable tracker</p>
      </div>

      <div className="max-w-2xl">
        <Card className="border-destructive/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Offboarding Details
            </CardTitle>
            <CardDescription>This action will disable the employee's tracker access</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="employeeName">Employee Name *</Label>
              <Input
                id="employeeName"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                placeholder="Enter employee full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vId">V-ID *</Label>
              <Input
                id="vId"
                value={vId}
                onChange={(e) => setVId(e.target.value)}
                placeholder="e.g., V-1001"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="project">Project *</Label>
              <Select value={project} onValueChange={setProject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Alpha">Alpha</SelectItem>
                  <SelectItem value="Beta">Beta</SelectItem>
                  <SelectItem value="Gamma">Gamma</SelectItem>
                  <SelectItem value="Delta">Delta</SelectItem>
                  <SelectItem value="Epsilon">Epsilon</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Offboarding *</Label>
              <Select value={reason} onValueChange={setReason}>
                <SelectTrigger>
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  {offboardingReasons.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastWorkingDate">Last Working Date *</Label>
              <Input
                id="lastWorkingDate"
                type="date"
                value={lastWorkingDate}
                onChange={(e) => setLastWorkingDate(e.target.value)}
              />
            </div>

            {employeeName && vId && project && reason && lastWorkingDate && (
              <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/30">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium mb-2 text-destructive">Offboarding Summary</h4>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-muted-foreground">Employee:</span> {employeeName}</p>
                      <p><span className="text-muted-foreground">V-ID:</span> {vId}</p>
                      <p><span className="text-muted-foreground">Project:</span> {project}</p>
                      <p><span className="text-muted-foreground">Reason:</span> {reason}</p>
                      <p><span className="text-muted-foreground">Last Working Date:</span> {new Date(lastWorkingDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <p className="text-xs text-destructive mt-3 font-medium">
                      ⚠️ This will immediately disable tracker access
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3 justify-end pt-4 border-t">
              <Button 
                variant="outline" 
                onClick={() => {
                  setEmployeeName("");
                  setVId("");
                  setProject("");
                  setReason("");
                  setLastWorkingDate("");
                }}
              >
                Clear Form
              </Button>
              <Button variant="destructive" onClick={handleConfirm}>
                Confirm Tracker Disable
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Confirmation Modal */}
        <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Confirm Offboarding
              </DialogTitle>
              <DialogDescription>
                This action will disable tracker access for {employeeName}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/30 space-y-2">
                <p className="text-sm font-medium text-destructive">Offboarding Details:</p>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• Employee: {employeeName}</p>
                  <p>• V-ID: {vId}</p>
                  <p>• Project: {project}</p>
                  <p>• Reason: {reason}</p>
                  <p>• Last Working Date: {lastWorkingDate && new Date(lastWorkingDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-1">Actions to be taken:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>✓ Tracker access will be disabled immediately</li>
                  <li>✓ Business Desk will be notified</li>
                  <li>✓ Project manager will receive notification</li>
                  <li>✓ Offboarding checklist will be initiated</li>
                </ul>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowConfirmModal(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmOffboarding}>
                Disable Tracker
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
              <li>Offboarding form with destructive styling to indicate critical action</li>
              <li>Employee details displayed: Name, V-ID, Project, Reason</li>
              <li>Summary preview with warning about immediate tracker disable</li>
              <li>Confirmation modal lists all actions to be taken</li>
              <li>Mock confirmation interaction - "Tracker Disabled Successfully" message</li>
              <li>Simulates notification flow to Business Desk and Project Manager</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
