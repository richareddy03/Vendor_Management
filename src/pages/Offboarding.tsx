import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Offboarding() {
  const [employeeId, setEmployeeId] = useState("");
  const [reason, setReason] = useState("");
  const [effectiveDate, setEffectiveDate] = useState<Date>();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!employeeId || !reason || !effectiveDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    setShowSuccessModal(true);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Offboarding Request</h1>
        <p className="text-muted-foreground mt-1">Submit an offboarding request for a resource</p>
      </div>

      <Card className="shadow-material-md">
        <CardHeader>
          <CardTitle>Offboarding Details</CardTitle>
          <CardDescription>
            Submit offboarding request due to resignation or end of contract. Business Desk will be
            notified to disable resource tracker access.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="employeeId">Employee / V-ID *</Label>
              <Select value={employeeId} onValueChange={setEmployeeId}>
                <SelectTrigger id="employeeId" aria-label="Select employee">
                  <SelectValue placeholder="Select employee to offboard" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="V-12345">V-12345 - John Doe (React Developer)</SelectItem>
                  <SelectItem value="V-12346">V-12346 - Jane Smith (Backend Engineer)</SelectItem>
                  <SelectItem value="V-12347">V-12347 - Mike Johnson (DevOps)</SelectItem>
                  <SelectItem value="V-12348">V-12348 - Sarah Wilson (QA Engineer)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason *</Label>
              <Select value={reason} onValueChange={setReason}>
                <SelectTrigger id="reason" aria-label="Select reason">
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="resignation">Resignation</SelectItem>
                  <SelectItem value="contract-end">End of Contract</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Effective Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !effectiveDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {effectiveDate ? format(effectiveDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={effectiveDate}
                    onSelect={setEffectiveDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Button type="submit" className="w-full">
              Submit Offboarding Request
            </Button>
          </form>
        </CardContent>
      </Card>

      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Offboarding Request Submitted</DialogTitle>
            <DialogDescription>
              Your offboarding request has been submitted successfully. Business Desk has been notified
              to disable resource tracker access for this employee.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setShowSuccessModal(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
