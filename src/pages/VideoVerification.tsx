import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Video, VideoOff, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function VideoVerification() {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleStartVerification = () => {
    setIsCallActive(true);
    toast.success("Video verification call initiated");
  };

  const handleCompleteVerification = () => {
    if (!isVerified) {
      toast.error("Please confirm that the resource has been verified");
      return;
    }
    toast.success("Verification completed successfully");
    setIsCallActive(false);
    setIsVerified(false);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Video Verification</h1>
        <p className="text-muted-foreground mt-1">
          Verify resource identity through video call
        </p>
      </div>

      <Card className="shadow-material-md">
        <CardHeader>
          <CardTitle>Resource Verification</CardTitle>
          <CardDescription>
            Conduct video verification call with the resource to confirm identity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Video Call Frame Placeholder */}
          <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
            {isCallActive ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                <div className="text-center space-y-4">
                  <Video className="h-16 w-16 mx-auto text-primary animate-pulse" />
                  <p className="text-lg font-medium text-foreground">Video Call Active</p>
                  <p className="text-sm text-muted-foreground">
                    Mock video call interface - No real video functionality
                  </p>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <VideoOff className="h-16 w-16 mx-auto text-muted-foreground" />
                  <p className="text-lg font-medium text-foreground">No Active Call</p>
                  <p className="text-sm text-muted-foreground">
                    Click "Start Verification" to begin
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Resource Info */}
          <div className="border border-border rounded-lg p-4 bg-card">
            <h3 className="font-semibold text-foreground mb-3">Resource Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Name</p>
                <p className="font-medium text-foreground">Alice Cooper</p>
              </div>
              <div>
                <p className="text-muted-foreground">V-ID</p>
                <p className="font-medium text-foreground">V-12345</p>
              </div>
              <div>
                <p className="text-muted-foreground">Role</p>
                <p className="font-medium text-foreground">Senior React Developer</p>
              </div>
              <div>
                <p className="text-muted-foreground">Vendor</p>
                <p className="font-medium text-foreground">TechSolutions Inc.</p>
              </div>
              <div>
                <p className="text-muted-foreground">Project</p>
                <p className="font-medium text-foreground">Mobile App Redesign</p>
              </div>
              <div>
                <p className="text-muted-foreground">Start Date</p>
                <p className="font-medium text-foreground">2025-02-01</p>
              </div>
            </div>
          </div>

          {/* Verification Checkbox */}
          {isCallActive && (
            <div className="flex items-center space-x-2 p-4 border border-border rounded-lg bg-accent/50">
              <Checkbox
                id="verified"
                checked={isVerified}
                onCheckedChange={(checked) => setIsVerified(checked === true)}
              />
              <Label
                htmlFor="verified"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I confirm that the resource identity has been verified through video call
              </Label>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            {!isCallActive ? (
              <Button
                onClick={handleStartVerification}
                className="flex-1"
                size="lg"
              >
                <Video className="mr-2 h-5 w-5" />
                Start Verification
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsCallActive(false);
                    setIsVerified(false);
                    toast.info("Verification cancelled");
                  }}
                  className="flex-1"
                  size="lg"
                >
                  <VideoOff className="mr-2 h-5 w-5" />
                  End Call
                </Button>
                <Button
                  onClick={handleCompleteVerification}
                  className="flex-1 bg-success hover:bg-success/90"
                  size="lg"
                >
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Complete Verification
                </Button>
              </>
            )}
          </div>

          {/* Instructions */}
          <div className="text-sm text-muted-foreground space-y-2 p-4 bg-muted/50 rounded-lg">
            <p className="font-medium text-foreground">Verification Instructions:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Confirm resource identity by matching with submitted documents</li>
              <li>Verify that the person on video matches the profile photo</li>
              <li>Ask resource to show government-issued ID on camera</li>
              <li>Complete verification checklist before ending call</li>
              <li>Mark checkbox to confirm successful verification</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
