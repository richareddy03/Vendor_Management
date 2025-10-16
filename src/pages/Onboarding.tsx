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

export default function Onboarding() {
  const [vendor, setVendor] = useState("");
  const [techStack, setTechStack] = useState("");
  const [numResources, setNumResources] = useState("");
  const [projectName, setProjectName] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!vendor || !techStack || !numResources || !projectName || !startDate || !endDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (endDate <= startDate) {
      toast.error("End date must be after start date");
      return;
    }

    setShowSuccessModal(true);
  };

  const handleReset = () => {
    setVendor("");
    setTechStack("");
    setNumResources("");
    setProjectName("");
    setStartDate(undefined);
    setEndDate(undefined);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Onboarding Request</h1>
        <p className="text-muted-foreground mt-1">Submit a new vendor onboarding request</p>
      </div>

      <Card className="shadow-material-md">
        <CardHeader>
          <CardTitle>Request Details</CardTitle>
          <CardDescription>
            Fill in the details below. All fields are required. The vendor will be notified after approval.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="vendor">Vendor *</Label>
              <Select value={vendor} onValueChange={setVendor}>
                <SelectTrigger id="vendor" aria-label="Select vendor">
                  <SelectValue placeholder="Select vendor" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="techsolutions">TechSolutions Inc.</SelectItem>
                  <SelectItem value="devpro">DevPro Services</SelectItem>
                  <SelectItem value="cloudexperts">CloudExperts Ltd.</SelectItem>
                  <SelectItem value="datavendor">DataVendor Co.</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="techStack">Tech Stack *</Label>
              <Input
                id="techStack"
                type="text"
                placeholder="e.g., React, Node.js, AWS (type to search)"
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                aria-label="Tech Stack"
              />
              <p className="text-xs text-muted-foreground">
                Type-ahead input similar to job portals. Start typing to see suggestions.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="numResources">Number of Resources *</Label>
              <Input
                id="numResources"
                type="number"
                min="1"
                placeholder="e.g., 5"
                value={numResources}
                onChange={(e) => setNumResources(e.target.value)}
                aria-label="Number of Resources"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name *</Label>
              <Input
                id="projectName"
                type="text"
                placeholder="e.g., Mobile App Redesign"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                aria-label="Project Name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>End Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

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
            <DialogTitle>Request Submitted Successfully</DialogTitle>
            <DialogDescription>
              Your onboarding request has been submitted and is now pending approval. The vendor will be
              notified once the request is approved through the approval chain.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setShowSuccessModal(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
