// import { useState } from "react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Eye } from "lucide-react";
// import VendorSubmitRatecard from "./VendorSubmitRatecard";

// interface Request {
//   id: string;
//   project: string;
//   techStack: string;
//   startDate: string;
//   endDate: string;
//   resourcesNeeded: number;
//   roles: string;
//   status: string;
//   fteLead: string;
//   businessJustification: string;
// }

// const requestsData: Request[] = [
//   {
//     id: "REQ-2025-001",
//     project: "Alpha",
//     techStack: "React, TypeScript, Node.js",
//     startDate: "2025-11-15",
//     endDate: "2026-05-15",
//     resourcesNeeded: 2,
//     roles: "Senior Developer, QA Engineer",
//     status: "Pending",
//     fteLead: "John Smith",
//     businessJustification: "New feature development for mobile app",
//   },
//   {
//     id: "REQ-2025-002",
//     project: "Beta",
//     techStack: "Angular, Java, PostgreSQL",
//     startDate: "2025-12-01",
//     endDate: "2026-06-01",
//     resourcesNeeded: 1,
//     roles: "Full Stack Developer",
//     status: "Pending",
//     fteLead: "Sarah Johnson",
//     businessJustification: "API enhancements for scalability",
//   },
//   {
//     id: "REQ-2025-003",
//     project: "Gamma",
//     techStack: "Python, Django, AWS",
//     startDate: "2025-11-20",
//     endDate: "2026-08-20",
//     resourcesNeeded: 3,
//     roles: "DevOps Engineer, Backend Developer, Cloud Architect",
//     status: "Responded",
//     fteLead: "John Smith",
//     businessJustification: "Cloud infrastructure migration",
//   },
//   {
//     id: "REQ-2025-004",
//     project: "Delta",
//     techStack: "Vue.js, Express, MongoDB",
//     startDate: "2025-12-10",
//     endDate: "2026-09-10",
//     resourcesNeeded: 2,
//     roles: "Frontend Developer, UI/UX Designer",
//     status: "Pending",
//     fteLead: "Sarah Johnson",
//     businessJustification: "UI redesign for analytics platform",
//   },
// ];

// export default function RequestInbox() {
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [showRateCardModal, setShowRateCardModal] = useState(false);
//   const [selectedDetailsRequest, setSelectedDetailsRequest] = useState<Request | null>(null);
//   const [selectedRateCardRequest, setSelectedRateCardRequest] = useState<{ requestId: string; project: string } | null>(null);

//   const pendingRequests = requestsData.filter((req) => req.status === "Pending");

//   const handleViewDetails = (request: Request) => {
//     setSelectedDetailsRequest(request);
//     setShowDetailsModal(true);
//   };

//   return (
//     <div className="p-6 space-y-6 w-full max-w-full">
//       <div>
//         <h1 className="text-3xl font-bold">Request Inbox</h1>
//         <p className="text-muted-foreground mt-1">Review and respond to resource requests</p>
//       </div>

//       {/* Requests Table */}
//       <Card className="w-full max-w-full">
//         <CardHeader>
//           <CardTitle>Resource Requests ({pendingRequests.length})</CardTitle>
//           <CardDescription>Click the eye icon to see details or "Respond" to open the rate card form</CardDescription>
//         </CardHeader>
//         <CardContent className="w-full max-w-full">
//           <Table className="table-fixed w-full">
//             <TableHeader>
//               <TableRow>
//                 <TableHead className="cursor-pointer hover:text-foreground w-[150px]">Request ID</TableHead>
//                 <TableHead className="cursor-pointer hover:text-foreground w-[100px]">Project</TableHead>
//                 <TableHead className="cursor-pointer hover:text-foreground max-w-[200px]">Tech Stack</TableHead>
//                 <TableHead className="max-w-[200px]">Roles Required</TableHead>
//                 <TableHead className="w-[100px]">Status</TableHead>
//                 <TableHead className="text-right w-[150px]">Action</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {pendingRequests.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
//                     No pending requests found
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 pendingRequests.map((req) => (
//                   <TableRow key={req.id} className="hover:bg-muted/50">
//                     <TableCell className="font-medium">{req.id}</TableCell>
//                     <TableCell>{req.project}</TableCell>
//                     <TableCell className="max-w-[200px] min-w-0">
//                       <div className="truncate" title={req.techStack}>
//                         {req.techStack}
//                       </div>
//                     </TableCell>
//                     <TableCell className="max-w-[200px] min-w-0">
//                       <div className="truncate" title={req.roles}>
//                         {req.roles}
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <Badge variant={req.status === "Pending" ? "secondary" : "default"}>
//                         {req.status}
//                       </Badge>
//                     </TableCell>
//                     <TableCell className="text-right">
//                       <div className="flex gap-2 justify-end">
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           onClick={() => handleViewDetails(req)}
//                           aria-label={`View details for request ${req.id}`}
//                         >
//                           <Eye className="h-4 w-4" />
//                         </Button>
//                         <Button
//                           size="sm"
//                           onClick={() => {
//                             setSelectedRateCardRequest({ requestId: req.id, project: req.project });
//                             setShowRateCardModal(true);
//                           }}
//                           aria-label={`Respond to request ${req.id}`}
//                         >
//                           Respond
//                         </Button>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>

//       {/* Details Modal */}
//       <Dialog open={showDetailsModal} onOpenChange={(open) => {
//         setShowDetailsModal(open);
//         if (!open) setSelectedDetailsRequest(null);
//       }}>
//         <DialogContent className="sm:max-w-[600px] p-0 bg-white rounded-xl shadow-2xl overflow-hidden">
//           <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
//             <DialogHeader>
//               <DialogTitle className="text-xl font-semibold">Request Details - {selectedDetailsRequest?.id || "N/A"}</DialogTitle>
//             </DialogHeader>
//           </div>
//           <div className="p-6 space-y-6">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <p className="text-sm font-medium text-gray-500">Request ID</p>
//                 <p className="text-base font-semibold">{selectedDetailsRequest?.id || "N/A"}</p>
//               </div>
//               <div className="space-y-2">
//                 <p className="text-sm font-medium text-gray-500">Project</p>
//                 <p className="text-base font-semibold">{selectedDetailsRequest?.project || "N/A"}</p>
//               </div>
//               <div className="space-y-2">
//                 <p className="text-sm font-medium text-gray-500">Tech Stack</p>
//                 <p className="text-base">{selectedDetailsRequest?.techStack || "N/A"}</p>
//               </div>
//               <div className="space-y-2">
//                 <p className="text-sm font-medium text-gray-500">Roles Required</p>
//                 <p className="text-base">{selectedDetailsRequest?.roles || "N/A"}</p>
//               </div>
//               <div className="space-y-2">
//                 <p className="text-sm font-medium text-gray-500">Start Date</p>
//                 <p className="text-base">{selectedDetailsRequest?.startDate || "N/A"}</p>
//               </div>
//               <div className="space-y-2">
//                 <p className="text-sm font-medium text-gray-500">End Date</p>
//                 <p className="text-base">{selectedDetailsRequest?.endDate || "N/A"}</p>
//               </div>
//               <div className="space-y-2">
//                 <p className="text-sm font-medium text-gray-500">Resources Needed</p>
//                 <p className="text-base">{selectedDetailsRequest?.resourcesNeeded ?? "N/A"}</p>
//               </div>
//               <div className="space-y-2">
//                 <p className="text-sm font-medium text-gray-500">FTE Lead</p>
//                 <p className="text-base">{selectedDetailsRequest?.fteLead || "N/A"}</p>
//               </div>
//             </div>
//             <div className="space-y-2">
//               <p className="text-sm font-medium text-gray-500">Business Justification</p>
//               <p className="text-base bg-gray-50 p-3 rounded-lg">{selectedDetailsRequest?.businessJustification || "N/A"}</p>
//             </div>
//             <div className="flex justify-end">
//               <Button
//                 onClick={() => setShowDetailsModal(false)}
//                 className="bg-blue-500 hover:bg-blue-600 text-white"
//               >
//                 Close
//               </Button>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>

  
//       <Dialog open={showRateCardModal} onOpenChange={(open) => {
//         setShowRateCardModal(open);
//         if (!open) setSelectedRateCardRequest(null);
//       }}>
//         <DialogContent className="max-w-full w-full sm:max-w-[70vw] h-[90vh] overflow-y-auto">
      
//           <VendorSubmitRatecard
//             requestData={selectedRateCardRequest || { requestId: "", project: "" }}
//             onClose={() => setShowRateCardModal(false)}
//           />
//         </DialogContent> 
//       </Dialog>
//     </div>
//   );
// }

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import VendorSubmitRatecard from "./VendorSubmitRatecard";

interface Request {
  id: string;
  project: string;
  techStack: string;
  startDate: string;
  endDate: string;
  resourcesNeeded: number;
  roles: string;
  status: string;
  fteLead: string;
  businessJustification: string;
}

const requestsData: Request[] = [
  {
    id: "REQ-2025-001",
    project: "Alpha",
    techStack: "React, TypeScript, Node.js",
    startDate: "2025-11-15",
    endDate: "2026-05-15",
    resourcesNeeded: 2,
    roles: "Senior Developer, QA Engineer",
    status: "Pending",
    fteLead: "John Smith",
    businessJustification: "New feature development for mobile app",
  },
  {
    id: "REQ-2025-002",
    project: "Beta",
    techStack: "Angular, Java, PostgreSQL",
    startDate: "2025-12-01",
    endDate: "2026-06-01",
    resourcesNeeded: 1,
    roles: "Full Stack Developer",
    status: "Pending",
    fteLead: "Sarah Johnson",
    businessJustification: "API enhancements for scalability",
  },
  {
    id: "REQ-2025-003",
    project: "Gamma",
    techStack: "Python, Django, AWS",
    startDate: "2025-11-20",
    endDate: "2026-08-20",
    resourcesNeeded: 3,
    roles: "DevOps Engineer, Backend Developer, Cloud Architect",
    status: "Responded",
    fteLead: "John Smith",
    businessJustification: "Cloud infrastructure migration",
  },
  {
    id: "REQ-2025-004",
    project: "Delta",
    techStack: "Vue.js, Express, MongoDB",
    startDate: "2025-12-10",
    endDate: "2026-09-10",
    resourcesNeeded: 2,
    roles: "Frontend Developer, UI/UX Designer",
    status: "Pending",
    fteLead: "Sarah Johnson",
    businessJustification: "UI redesign for analytics platform",
  },
];

export default function RequestInbox() {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showRateCardModal, setShowRateCardModal] = useState(false);
  const [selectedDetailsRequest, setSelectedDetailsRequest] = useState<Request | null>(null);
  const [selectedRateCardRequest, setSelectedRateCardRequest] = useState<{ requestId: string; project: string } | null>(null);

  const pendingRequests = requestsData.filter((req) => req.status === "Pending");

  const handleViewDetails = (request: Request) => {
    setSelectedDetailsRequest(request);
    setShowDetailsModal(true);
  };

  return (
    <div className="p-6 space-y-6 w-full max-w-full">
      <div>
        <h1 className="text-3xl font-bold">Request Inbox</h1>
        <p className="text-muted-foreground mt-1">Review and respond to resource requests</p>
      </div>

      {/* Requests Table */}
      <Card className="w-full max-w-full">
        <CardHeader>
          <CardTitle>Resource Requests ({pendingRequests.length})</CardTitle>
          <CardDescription>Click the eye icon to see details or "Respond" to open the rate card form</CardDescription>
        </CardHeader>
        <CardContent className="w-full max-w-full">
          <Table className="table-fixed w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer hover:text-foreground w-[150px]">Request ID</TableHead>
                <TableHead className="cursor-pointer hover:text-foreground w-[100px]">Project</TableHead>
                <TableHead className="cursor-pointer hover:text-foreground max-w-[200px]">Tech Stack</TableHead>
                <TableHead className="max-w-[200px]">Roles Required</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead className="text-right w-[150px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingRequests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No pending requests found
                  </TableCell>
                </TableRow>
              ) : (
                pendingRequests.map((req) => (
                  <TableRow key={req.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{req.id}</TableCell>
                    <TableCell>{req.project}</TableCell>
                    <TableCell className="max-w-[200px] min-w-0">
                      <div className="truncate" title={req.techStack}>
                        {req.techStack}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[200px] min-w-0">
                      <div className="truncate" title={req.roles}>
                        {req.roles}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={req.status === "Pending" ? "secondary" : "default"}>
                        {req.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewDetails(req)}
                          aria-label={`View details for request ${req.id}`}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedRateCardRequest({ requestId: req.id, project: req.project });
                            setShowRateCardModal(true);
                          }}
                          aria-label={`Respond to request ${req.id}`}
                        >
                          Respond
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={(open) => {
        setShowDetailsModal(open);
        if (!open) setSelectedDetailsRequest(null);
      }}>
        <DialogContent className="sm:max-w-[600px] max-w-[700px] h-[88vh] overflow-y-auto p-0 bg-white rounded-xl shadow-2xl">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">Request Details - {selectedDetailsRequest?.id || "N/A"}</DialogTitle>
            </DialogHeader>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Request ID</p>
                <p className="text-base font-semibold">{selectedDetailsRequest?.id || "N/A"}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Project</p>
                <p className="text-base font-semibold">{selectedDetailsRequest?.project || "N/A"}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Tech Stack</p>
                <p className="text-base">{selectedDetailsRequest?.techStack || "N/A"}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Roles Required</p>
                <p className="text-base">{selectedDetailsRequest?.roles || "N/A"}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Start Date</p>
                <p className="text-base">{selectedDetailsRequest?.startDate || "N/A"}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">End Date</p>
                <p className="text-base">{selectedDetailsRequest?.endDate || "N/A"}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Resources Needed</p>
                <p className="text-base">{selectedDetailsRequest?.resourcesNeeded ?? "N/A"}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">FTE Lead</p>
                <p className="text-base">{selectedDetailsRequest?.fteLead || "N/A"}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">Business Justification</p>
              <p className="text-base bg-gray-50 p-3 rounded-lg">{selectedDetailsRequest?.businessJustification || "N/A"}</p>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={() => setShowDetailsModal(false)}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showRateCardModal} onOpenChange={(open) => {
        setShowRateCardModal(open);
        if (!open) setSelectedRateCardRequest(null);
      }}>
        <DialogContent className="max-w-full w-full sm:max-w-[70vw] h-[90vh] overflow-y-auto">
          <VendorSubmitRatecard
            requestData={selectedRateCardRequest || { requestId: "", project: "" }}
            onClose={() => setShowRateCardModal(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}