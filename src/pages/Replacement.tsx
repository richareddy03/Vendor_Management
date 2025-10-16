import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

export default function Replacement() {
  const [employeeId, setEmployeeId] = useState("");
  const [reason, setReason] = useState("");
  const [effectiveDate, setEffectiveDate] = useState<Date>();
  const [vendor, setVendor] = useState("");
  const [techStack, setTechStack] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!employeeId || !reason || !effectiveDate || !vendor || !techStack) {
      toast.error("Please fill in all required fields");
      return;
    }

    setShowSuccessModal(true);
  };

  const handleReset = () => {
    setEmployeeId("");
    setReason("");
    setEffectiveDate(undefined);
    setVendor("");
    setTechStack("");
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Replacement Request</h1>
        <p className="text-muted-foreground mt-1">Request a replacement for an existing resource</p>
      </div>

      <Card className="shadow-material-md">
        <CardHeader>
          <CardTitle>Replacement Details</CardTitle>
          <CardDescription>
            Submit a replacement request for underperforming resources or contract completions.
            Request will go through the same approval chain as onboarding.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="employeeId">Current Employee / V-ID *</Label>
              <Select value={employeeId} onValueChange={setEmployeeId}>
                <SelectTrigger id="employeeId" aria-label="Select employee">
                  <SelectValue placeholder="Select employee to replace" />
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
              <Label htmlFor="reason">Reason for Replacement *</Label>
              <Select value={reason} onValueChange={setReason}>
                <SelectTrigger id="reason" aria-label="Select reason">
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="performance">Performance Issues</SelectItem>
                  <SelectItem value="contract-end">End of Contract</SelectItem>
                  <SelectItem value="resignation">Resignation</SelectItem>
                  <SelectItem value="skill-mismatch">Skill Mismatch</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
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

            <div className="space-y-2">
              <Label htmlFor="vendor">Vendor *</Label>
              <Select value={vendor} onValueChange={setVendor}>
                <SelectTrigger id="vendor" aria-label="Select vendor">
                  <SelectValue placeholder="Select vendor for replacement" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="techsolutions">TechSolutions Inc.</SelectItem>
                  <SelectItem value="devpro">DevPro Services</SelectItem>
                  <SelectItem value="cloudexperts">CloudExperts Ltd.</SelectItem>
                  <SelectItem value="datavendor">DataVendor Co.</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* <div className="space-y-2">
              <Label htmlFor="techStack">Tech Stack Required *</Label>
              <Input
                id="techStack"
                type="text"
                placeholder="e.g., React, TypeScript, Node.js"
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                aria-label="Tech Stack"
              />
            </div> */}

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">
                Submit Request
              </Button>
              <Button type="button" variant="outline" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Replacement Request Submitted</DialogTitle>
            <DialogDescription>
              Your replacement request has been submitted successfully. It will follow the same approval
              chain as onboarding requests. The vendor will be notified once approved.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setShowSuccessModal(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
