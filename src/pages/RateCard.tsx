// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { CheckCircle, XCircle, Eye, TrendingUp, TrendingDown, Info } from "lucide-react";
// import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";
// import {
//   Tooltip,
//   TooltipProvider,
//   TooltipTrigger,
//   TooltipContent,
// } from "@/components/ui/tooltip";
// import { Textarea } from "@/components/ui/textarea";
// import { format } from "date-fns";

// const candidates = [
//   {
//     id: 1,
//     name: "Alice Cooper",
//     role: "Senior React Developer",
//     proposedRate: "$85/hr",
//     vendor: "TechSolutions Inc.",
//     project: "Mobile App Redesign",
//     poNumber: "PO-2025-001",
//     fyWorkStream: "FY25-Q4",
//     techStack: "React, TypeScript, AWS",
//     location: "Remote",
//     startDate: new Date(2025, 9, 16), // October 16, 2025
//     endDate: "2026-04-16",
//     justification: "Critical for frontend development",
//     preApproved: false,
//     notes: "",
//   },
//   {
//     id: 2,
//     name: "Bob Martinez",
//     role: "Backend Engineer",
//     proposedRate: "$90/hr",
//     vendor: "DevPro Services",
//     project: "API Infrastructure",
//     poNumber: "PO-2025-002",
//     fyWorkStream: "FY25-Q4",
//     techStack: "Node.js, PostgreSQL",
//     location: "Onsite",
//     startDate: new Date(2025, 9, 16), // October 16, 2025
//     endDate: "2026-05-16",
//     justification: "Backend expertise required",
//     preApproved: false,
//     notes: "",
//   },
//   {
//     id: 3,
//     name: "Carol Davis",
//     role: "DevOps Engineer",
//     proposedRate: "$95/hr",
//     vendor: "CloudExperts Ltd.",
//     project: "Cloud Migration",
//     poNumber: "PO-2025-003",
//     fyWorkStream: "FY25-Q4",
//     techStack: "AWS, Docker, Kubernetes",
//     location: "Remote",
//     startDate: new Date(2025, 9, 17), // October 17, 2025
//     endDate: "2026-04-17",
//     justification: "Required for cloud infrastructure setup",
//     preApproved: false,
//     notes: "",
//   },
//   {
//     id: 4,
//     name: "David Evans",
//     role: "Data Analyst",
//     proposedRate: "$80/hr",
//     vendor: "DataVendor Co.",
//     project: "Data Analytics",
//     poNumber: "PO-2025-004",
//     fyWorkStream: "FY25-Q4",
//     techStack: "Python, SQL, Tableau",
//     location: "Onsite",
//     startDate: new Date(2025, 9, 20), // October 20, 2025
//     endDate: "2026-03-20",
//     justification: "Needed for data pipeline development",
//     preApproved: true,
//     notes: "",
//   },
// ];

// export default function RateCard() {
//   const [selectedVendor, setSelectedVendor] = useState("all");
//   const [selectedProject, setSelectedProject] = useState("all");
//   const [selectedCandidate, setSelectedCandidate] = useState<typeof candidates[0] | null>(null);
//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [showNotesModal, setShowNotesModal] = useState(false);
//   const [notesCandidate, setNotesCandidate] = useState<typeof candidates[0] | null>(null);
//   const [notes, setNotes] = useState<{ [key: number]: string }>({});
//   const navigate = useNavigate();

//   const totalBudget = 500000;
//   const utilizedBudget = 325000;
//   const variance = totalBudget - utilizedBudget;
//   const variancePercent = ((variance / totalBudget) * 100).toFixed(1);

//   const handleApprove = (candidateId: number) => {
//     toast.success("Rate card approved and forwarded to Business Desk");
//   };

//   const handleReject = (candidateId: number) => {
//     toast.error("Rate card rejected. Vendor will be notified.");
//   };

//   const handleViewProfile = (candidate: typeof candidates[0]) => {
//     setSelectedCandidate(candidate);
//     setShowProfileModal(true);
//   };

//   const handleOpenNotes = (candidate: typeof candidates[0]) => {
//     setNotesCandidate(candidate);
//     setShowNotesModal(true);
//   };

//   const handleSaveNotes = () => {
//     if (notesCandidate) {
//       const currentNotes = notes[notesCandidate.id] || "";
//       setNotes({ ...notes, [notesCandidate.id]: currentNotes });
//       console.log("Saved Notes for Dashboard.tsx:", {
//         id: `CR-${Date.now()}`,
//         title: `CR Request - ${notesCandidate.name}`,
//         type: "CR Request",
//         vendor: notesCandidate.vendor,
//         date: format(new Date(), "yyyy-MM-dd"),
//         status: "Pending",
//         comments: currentNotes,
//         preApproved: notesCandidate.preApproved,
//       });
//       toast.success(`Notes saved for ${notesCandidate.name}`);
//       setShowNotesModal(false);
//     }
//   };

//   const handleRaiseCRRequest = (candidate: typeof candidates[0]) => {
//     const crRequest = {
//       id: `CR-${Date.now()}`,
//       title: `CR Request - ${candidate.name}`,
//       type: "CR Request",
//       vendor: candidate.vendor,
//       date: format(new Date(), "yyyy-MM-dd"),
//       status: "Pending",
//       comments: notes[candidate.id] || "No notes provided",
//       preApproved: candidate.preApproved,
//     };
//     console.log("CR Request for Dashboard.tsx:", crRequest);
//     toast.success(`CR request raised for ${candidate.name}`);
//   };

//   const handleBack = () => {
//     navigate("/dashboard");
//   };

//   // Filter candidates by vendor and project
//   const filteredCandidates = candidates.filter((candidate) => {
//     const matchesVendor = selectedVendor === "all" || candidate.vendor === selectedVendor;
//     const matchesProject = selectedProject === "all" || candidate.project === selectedProject;
//     return matchesVendor && matchesProject;
//   });

//   return (
//     <div className="space-y-6 max-w-full">
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold text-foreground">Rate Card & Profile Review</h1>
//         <Button variant="outline" size="sm" onClick={handleBack} aria-label="Back to Dashboard">
//           Back
//         </Button>
//       </div>

//       {/* Filters */}
//       <Card className="shadow-material-md">
//         <CardContent className="pt-6">
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex-1">
//               <Select value={selectedVendor} onValueChange={setSelectedVendor}>
//                 <SelectTrigger aria-label="Filter by vendor">
//                   <SelectValue placeholder="All Vendors" />
//                 </SelectTrigger>
//                 <SelectContent className="bg-popover">
//                   <SelectItem value="all">All Vendors</SelectItem>
//                   <SelectItem value="TechSolutions Inc.">TechSolutions Inc.</SelectItem>
//                   <SelectItem value="DevPro Services">DevPro Services</SelectItem>
//                   <SelectItem value="CloudExperts Ltd.">CloudExperts Ltd.</SelectItem>
//                   <SelectItem value="DataVendor Co.">DataVendor Co.</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="flex-1">
//               <Select value={selectedProject} onValueChange={setSelectedProject}>
//                 <SelectTrigger aria-label="Filter by project">
//                   <SelectValue placeholder="All Projects" />
//                 </SelectTrigger>
//                 <SelectContent className="bg-popover">
//                   <SelectItem value="all">All Projects</SelectItem>
//                   <SelectItem value="Mobile App Redesign">Mobile App Redesign</SelectItem>
//                   <SelectItem value="API Infrastructure">API Infrastructure</SelectItem>
//                   <SelectItem value="Cloud Migration">Cloud Migration</SelectItem>
//                   <SelectItem value="Data Analytics">Data Analytics</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Budget Summary Cards */}
//       <div className="grid gap-4 md:grid-cols-3">
//         <Card className="shadow-material-md">
//           <CardHeader className="pb-3">
//             <CardTitle className="text-sm font-medium text-muted-foreground">Total Budget</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-foreground">
//               ${totalBudget.toLocaleString()}
//             </div>
//             <p className="text-xs text-muted-foreground mt-1">For selected filters</p>
//           </CardContent>
//         </Card>

//         <Card className="shadow-material-md">
//           <CardHeader className="pb-3">
//             <CardTitle className="text-sm font-medium text-muted-foreground">Utilized Budget</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-foreground">
//               ${utilizedBudget.toLocaleString()}
//             </div>
//             <p className="text-xs text-muted-foreground mt-1">
//               {((utilizedBudget / totalBudget) * 100).toFixed(1)}% of total
//             </p>
//           </CardContent>
//         </Card>

//         <Card className="shadow-material-md">
//           <CardHeader className="pb-3">
//             <CardTitle className="text-sm font-medium text-muted-foreground">Variance</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="flex items-center gap-2">
//               <div className={`text-2xl font-bold ${variance >= 0 ? "text-success" : "text-destructive"}`}>
//                 ${Math.abs(variance).toLocaleString()}
//               </div>
//               {variance >= 0 ? (
//                 <TrendingUp className="h-5 w-5 text-success" />
//               ) : (
//                 <TrendingDown className="h-5 w-5 text-destructive" />
//               )}
//             </div>
//             <p className="text-xs text-muted-foreground mt-1">
//               {variance >= 0 ? "Within budget" : "Over budget"} ({variancePercent}%)
//             </p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Candidates Table */}
//       <Card className="shadow-material-md">
//         <CardHeader>
//           <CardTitle>Pending Rate Card Reviews</CardTitle>
//           <CardDescription>
//             Approve or reject rate cards. Approved requests will be forwarded to Business Desk.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="w-full">
//             <table className="w-full table-auto">
//               <thead>
//                 <tr className="border-b border-border">
//                   <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground min-w-0">Candidate</th>
//                   <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground min-w-0">Role</th>
//                   <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground min-w-0">Proposed Rate</th>
//                   <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground min-w-0">Vendor</th>
//                   <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground min-w-0">Project</th>
//                   <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground min-w-0">Profile</th>
//                   <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground min-w-0 w-[120px]">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredCandidates.length === 0 ? (
//                   <tr>
//                     <td colSpan={7} className="py-3 px-4 text-sm text-muted-foreground text-center">
//                       No rate cards match the selected filters.
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredCandidates.map((candidate) => (
//                     <tr key={candidate.id} className="border-b border-border hover:bg-accent/50 transition-base">
//                       <td className="py-3 px-4 text-sm font-medium text-foreground whitespace-normal break-words">{candidate.name}</td>
//                       <td className="py-3 px-4 text-sm text-foreground whitespace-normal break-words">{candidate.role}</td>
//                       <td className="py-3 px-4 text-sm font-semibold text-primary whitespace-normal">{candidate.proposedRate}</td>
//                       <td className="py-3 px-4 text-sm text-foreground whitespace-normal break-words">{candidate.vendor}</td>
//                       <td className="py-3 px-4 text-sm text-foreground whitespace-normal break-words">{candidate.project}</td>
//                       <td className="py-3 px-4">
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => handleViewProfile(candidate)}
//                         >
//                           <Eye className="h-4 w-4 mr-1" />
//                           View
//                         </Button>
//                       </td>
//                       <td className="py-3 px-4">
//                         <TooltipProvider>
//                           <div className="flex gap-1 flex-nowrap">
//                             <Tooltip>
//                               <TooltipTrigger asChild>
//                                 <Button
//                                   variant="ghost"
//                                   size="icon"
//                                   onClick={() => handleApprove(candidate.id)}
//                                   className="text-success hover:text-success/90"
//                                   aria-label="Approve rate card"
//                                 >
//                                   <CheckCircle className="h-4 w-4" />
//                                 </Button>
//                               </TooltipTrigger>
//                               <TooltipContent>
//                                 <p>Approve</p>
//                               </TooltipContent>
//                             </Tooltip>
//                             <Tooltip>
//                               <TooltipTrigger asChild>
//                                 <Button
//                                   variant="ghost"
//                                   size="icon"
//                                   onClick={() => handleReject(candidate.id)}
//                                   className="text-destructive hover:text-destructive/90"
//                                   aria-label="Reject rate card"
//                                 >
//                                   <XCircle className="h-4 w-4" />
//                                 </Button>
//                               </TooltipTrigger>
//                               <TooltipContent>
//                                 <p>Reject</p>
//                               </TooltipContent>
//                             </Tooltip>
//                             <Tooltip>
//                               <TooltipTrigger asChild>
//                                 <Button
//                                   variant="ghost"
//                                   size="icon"
//                                   onClick={() => handleOpenNotes(candidate)}
//                                   className="text-info hover:text-info/90"
//                                   aria-label="View notes and CR request"
//                                 >
//                                   <Info className="h-4 w-4" />
//                                 </Button>
//                               </TooltipTrigger>
//                               <TooltipContent>
//                                 <p>Notes & CR Request</p>
//                               </TooltipContent>
//                             </Tooltip>
//                           </div>
//                         </TooltipProvider>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Profile Modal */}
//       <Dialog open={showProfileModal} onOpenChange={setShowProfileModal}>
//         <DialogContent className="max-w-2xl">
//           <DialogHeader>
//             <DialogTitle>Candidate Profile</DialogTitle>
//             <DialogDescription>Complete profile details for review</DialogDescription>
//           </DialogHeader>
//           {selectedCandidate && (
//             <div className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-sm font-medium text-muted-foreground">Candidate Name</p>
//                   <p className="text-base font-semibold text-foreground">{selectedCandidate.name}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-muted-foreground">Role</p>
//                   <p className="text-base text-foreground">{selectedCandidate.role}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-muted-foreground">Vendor</p>
//                   <p className="text-base text-foreground">{selectedCandidate.vendor}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-muted-foreground">Proposed Rate</p>
//                   <p className="text-base font-semibold text-primary">{selectedCandidate.proposedRate}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-muted-foreground">Project</p>
//                   <p className="text-base text-foreground">{selectedCandidate.project}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-muted-foreground">PO Number</p>
//                   <p className="text-base text-foreground">{selectedCandidate.poNumber}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-muted-foreground">FY Work Stream</p>
//                   <p className="text-base text-foreground">{selectedCandidate.fyWorkStream}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-muted-foreground">Location</p>
//                   <p className="text-base text-foreground">{selectedCandidate.location}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-muted-foreground">Start Date</p>
//                   <p className="text-base text-foreground">{selectedCandidate.startDate.toLocaleDateString()}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-muted-foreground">End Date</p>
//                   <p className="text-base text-foreground">{selectedCandidate.endDate}</p>
//                 </div>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground mb-1">Tech Stack</p>
//                 <p className="text-base text-foreground">{selectedCandidate.techStack}</p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground mb-1">Business Justification</p>
//                 <p className="text-base text-foreground">{selectedCandidate.justification}</p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground mb-1">Notes</p>
//                 <p className="text-base text-foreground">{notes[selectedCandidate.id] || "No notes provided"}</p>
//               </div>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* Notes and CR Request Modal */}
//       <Dialog open={showNotesModal} onOpenChange={setShowNotesModal}>
//         <DialogContent className="max-w-md">
//           <DialogHeader>
//             <DialogTitle>Notes & CR Request</DialogTitle>
//             <DialogDescription>
//               Raise a change request or add notes for {notesCandidate?.name}.
//             </DialogDescription>
//           </DialogHeader>
//           {notesCandidate && (
//             <div className="space-y-4">
//               <div className="space-y-2">
//                 <label htmlFor={`notes-${notesCandidate.id}`} className="text-sm font-medium text-muted-foreground">
//                   Notes
//                 </label>
//                 <Textarea
//                   id={`notes-${notesCandidate.id}`}
//                   placeholder="Enter notes for this candidate"
//                   value={notes[notesCandidate.id] || ""}
//                   onChange={(e) => setNotes({ ...notes, [notesCandidate.id]: e.target.value })}
//                   rows={4}
//                   aria-label="Notes"
//                 />
//               </div>
//               <div className="flex gap-4">
//                 <Button
//                   onClick={() => handleRaiseCRRequest(notesCandidate)}
//                   className="flex-1"
//                 >
//                   Raise CR Request
//                 </Button>
//                 <Button
//                   onClick={handleSaveNotes}
//                   variant="outline"
//                   className="flex-1"
//                 >
//                   Save Notes
//                 </Button>
//               </div>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle, XCircle, Eye, TrendingUp, TrendingDown, Info, Brain } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";

const candidates = [
  {
    id: 1,
    name: "Alice Cooper",
    role: "Senior React Developer",
    proposedRate: "$85/hr",
    vendor: "TechSolutions Inc.",
    project: "Mobile App Redesign",
    poNumber: "PO-2025-001",
    fyWorkStream: "FY25-Q4",
    techStack: "React, TypeScript, AWS",
    location: "Remote",
    startDate: new Date(2025, 9, 16), // October 16, 2025
    endDate: "2026-04-16",
    justification: "Critical for frontend development",
    preApproved: false,
    notes: "",
  },
  {
    id: 2,
    name: "Bob Martinez",
    role: "Backend Engineer",
    proposedRate: "$90/hr",
    vendor: "DevPro Services",
    project: "API Infrastructure",
    poNumber: "PO-2025-002",
    fyWorkStream: "FY25-Q4",
    techStack: "Node.js, PostgreSQL",
    location: "Onsite",
    startDate: new Date(2025, 9, 16), // October 16, 2025
    endDate: "2026-05-16",
    justification: "Backend expertise required",
    preApproved: false,
    notes: "",
  },
  {
    id: 3,
    name: "Carol Davis",
    role: "DevOps Engineer",
    proposedRate: "$95/hr",
    vendor: "CloudExperts Ltd.",
    project: "Cloud Migration",
    poNumber: "PO-2025-003",
    fyWorkStream: "FY25-Q4",
    techStack: "AWS, Docker, Kubernetes",
    location: "Remote",
    startDate: new Date(2025, 9, 17), // October 17, 2025
    endDate: "2026-04-17",
    justification: "Required for cloud infrastructure setup",
    preApproved: false,
    notes: "",
  },
  {
    id: 4,
    name: "David Evans",
    role: "Data Analyst",
    proposedRate: "$80/hr",
    vendor: "DataVendor Co.",
    project: "Data Analytics",
    poNumber: "PO-2025-004",
    fyWorkStream: "FY25-Q4",
    techStack: "Python, SQL, Tableau",
    location: "Onsite",
    startDate: new Date(2025, 9, 20), // October 20, 2025
    endDate: "2026-03-20",
    justification: "Needed for data pipeline development",
    preApproved: true,
    notes: "",
  },
];

export default function RateCard() {
  const [selectedVendor, setSelectedVendor] = useState("all");
  const [selectedProject, setSelectedProject] = useState("all");
  const [selectedCandidate, setSelectedCandidate] = useState<typeof candidates[0] | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [notesCandidate, setNotesCandidate] = useState<typeof candidates[0] | null>(null);
  const [notes, setNotes] = useState<{ [key: number]: string }>({});
  const navigate = useNavigate();

  const totalBudget = 500000;
  const utilizedBudget = 325000;
  const variance = totalBudget - utilizedBudget;
  const variancePercent = ((variance / totalBudget) * 100).toFixed(1);

  const handleApprove = (candidateId: number) => {
    toast.success("Rate card approved and forwarded to Business Desk");
  };

  const handleReject = (candidateId: number) => {
    toast.error("Rate card rejected. Vendor will be notified.");
  };

  const handleViewProfile = (candidate: typeof candidates[0]) => {
    setSelectedCandidate(candidate);
    setShowProfileModal(true);
  };

  const handleOpenNotes = (candidate: typeof candidates[0]) => {
    setNotesCandidate(candidate);
    setShowNotesModal(true);
  };

  const handleSaveNotes = () => {
    if (notesCandidate) {
      const currentNotes = notes[notesCandidate.id] || "";
      setNotes({ ...notes, [notesCandidate.id]: currentNotes });
      console.log("Saved Notes for Dashboard.tsx:", {
        id: `CR-${Date.now()}`,
        title: `CR Request - ${notesCandidate.name}`,
        type: "CR Request",
        vendor: notesCandidate.vendor,
        date: format(new Date(), "yyyy-MM-dd"),
        status: "Pending",
        comments: currentNotes,
        preApproved: notesCandidate.preApproved,
      });
      toast.success(`Notes saved for ${notesCandidate.name}`);
      setShowNotesModal(false);
    }
  };

  const handleRaiseCRRequest = (candidate: typeof candidates[0]) => {
    const crRequest = {
      id: `CR-${Date.now()}`,
      title: `CR Request - ${candidate.name}`,
      type: "CR Request",
      vendor: candidate.vendor,
      date: format(new Date(), "yyyy-MM-dd"),
      status: "Pending",
      comments: notes[candidate.id] || "No notes provided",
      preApproved: candidate.preApproved,
    };
    console.log("CR Request for Dashboard.tsx:", crRequest);
    toast.success(`CR request raised for ${candidate.name}`);
    setShowNotesModal(false);
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  // Filter candidates by vendor and project
  const filteredCandidates = candidates.filter((candidate) => {
    const matchesVendor = selectedVendor === "all" || candidate.vendor === selectedVendor;
    const matchesProject = selectedProject === "all" || candidate.project === selectedProject;
    return matchesVendor && matchesProject;
  });

  return (
    <div className="space-y-6 max-w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Rate Card & Profile Review</h1>
        <Button variant="outline" size="sm" onClick={handleBack} aria-label="Back to Dashboard">
          Back
        </Button>
      </div>

      {/* Filters */}
      <Card className="shadow-material-md">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Select value={selectedVendor} onValueChange={setSelectedVendor}>
                <SelectTrigger aria-label="Filter by vendor">
                  <SelectValue placeholder="All Vendors" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Vendors</SelectItem>
                  <SelectItem value="TechSolutions Inc.">TechSolutions Inc.</SelectItem>
                  <SelectItem value="DevPro Services">DevPro Services</SelectItem>
                  <SelectItem value="CloudExperts Ltd.">CloudExperts Ltd.</SelectItem>
                  <SelectItem value="DataVendor Co.">DataVendor Co.</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger aria-label="Filter by project">
                  <SelectValue placeholder="All Projects" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="Mobile App Redesign">Mobile App Redesign</SelectItem>
                  <SelectItem value="API Infrastructure">API Infrastructure</SelectItem>
                  <SelectItem value="Cloud Migration">Cloud Migration</SelectItem>
                  <SelectItem value="Data Analytics">Data Analytics</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Budget Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-material-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              ${totalBudget.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">For selected filters</p>
          </CardContent>
        </Card>

        <Card className="shadow-material-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Utilized Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              ${utilizedBudget.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {((utilizedBudget / totalBudget) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-material-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Available</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className={`text-2xl font-bold ${variance >= 0 ? "text-success" : "text-destructive"}`}>
                ${Math.abs(variance).toLocaleString()}
              </div>
              {variance >= 0 ? (
                <TrendingUp className="h-5 w-5 text-success" />
              ) : (
                <TrendingDown className="h-5 w-5 text-destructive" />
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {variance >= 0 ? "Within budget" : "Over budget"} ({variancePercent}%)
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-material-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">ML Predictions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-foreground">
                $475,000
              </div>
              <Brain className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Predicted FY spend</p>
          </CardContent>
        </Card>
      </div>

      {/* Candidates Table */}
      <Card className="shadow-material-md">
        <CardHeader>
          <CardTitle>Pending Rate Card Reviews</CardTitle>
          <CardDescription>
            Approve or reject rate cards. Approved requests will be forwarded to Business Desk.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground min-w-0">Candidate</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground min-w-0">Role</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground min-w-0">Proposed Cost</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground min-w-0">Vendor</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground min-w-0">Project</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground min-w-0">Profile</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground min-w-0 w-[120px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCandidates.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-3 px-4 text-sm text-muted-foreground text-center">
                      No rate cards match the selected filters.
                    </td>
                  </tr>
                ) : (
                  filteredCandidates.map((candidate) => (
                    <tr key={candidate.id} className="border-b border-border hover:bg-accent/50 transition-base">
                      <td className="py-3 px-4 text-sm font-medium text-foreground whitespace-normal break-words">{candidate.name}</td>
                      <td className="py-3 px-4 text-sm text-foreground whitespace-normal break-words">{candidate.role}</td>
                      <td className="py-3 px-4 text-sm font-semibold text-primary whitespace-normal">{candidate.proposedRate}</td>
                      <td className="py-3 px-4 text-sm text-foreground whitespace-normal break-words">{candidate.vendor}</td>
                      <td className="py-3 px-4 text-sm text-foreground whitespace-normal break-words">{candidate.project}</td>
                      <td className="py-3 px-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewProfile(candidate)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </td>
                      <td className="py-3 px-4">
                        <TooltipProvider>
                          <div className="flex gap-1 flex-nowrap">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleApprove(candidate.id)}
                                  className="text-success hover:text-success/90"
                                  aria-label="Approve rate card"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Approve</p>
                              </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleReject(candidate.id)}
                                  className="text-destructive hover:text-destructive/90"
                                  aria-label="Reject rate card"
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Reject</p>
                              </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleOpenNotes(candidate)}
                                  className="text-info hover:text-info/90"
                                  aria-label="View notes and CR request"
                                >
                                  <Info className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Notes & CR Request</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </TooltipProvider>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Profile Modal */}
      <Dialog open={showProfileModal} onOpenChange={setShowProfileModal}>
        <DialogContent className="max-w-2xl max-h-[70vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Candidate Profile</DialogTitle>
            {/* <DialogDescription>Complete profile details for review</DialogDescription> */}
          </DialogHeader>
          {selectedCandidate && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Candidate Name</p>
                  <p className="text-base font-semibold text-foreground">{selectedCandidate.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Role</p>
                  <p className="text-base text-foreground">{selectedCandidate.role}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Vendor</p>
                  <p className="text-base text-foreground">{selectedCandidate.vendor}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Proposed Cost</p>
                  <p className="text-base font-semibold text-primary">{selectedCandidate.proposedRate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Project</p>
                  <p className="text-base text-foreground">{selectedCandidate.project}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">PO Number</p>
                  <p className="text-base text-foreground">{selectedCandidate.poNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">FY Work Stream</p>
                  <p className="text-base text-foreground">{selectedCandidate.fyWorkStream}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Location</p>
                  <p className="text-base text-foreground">{selectedCandidate.location}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Start Date</p>
                  <p className="text-base text-foreground">{selectedCandidate.startDate.toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">End Date</p>
                  <p className="text-base text-foreground">{selectedCandidate.endDate}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Tech Stack</p>
                <p className="text-base text-foreground">{selectedCandidate.techStack}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Comments</p>
                <p className="text-base text-foreground">{selectedCandidate.justification}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Notes</p>
                <p className="text-base text-foreground">{notes[selectedCandidate.id] || "No notes provided"}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Notes and CR Request Modal */}
      <Dialog open={showNotesModal} onOpenChange={setShowNotesModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Notes & CR Request</DialogTitle>
            <DialogDescription>
              Raise a change request or add notes for {notesCandidate?.name}.
            </DialogDescription>
          </DialogHeader>
          {notesCandidate && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor={`notes-${notesCandidate.id}`} className="text-sm font-medium text-muted-foreground">
                  Notes
                </label>
                <Textarea
                  id={`notes-${notesCandidate.id}`}
                  placeholder="Enter notes for this candidate"
                  value={notes[notesCandidate.id] || ""}
                  onChange={(e) => setNotes({ ...notes, [notesCandidate.id]: e.target.value })}
                  rows={4}
                  aria-label="Notes"
                />
              </div>
              <div className="flex gap-4">
                <Button
                  onClick={() => handleRaiseCRRequest(notesCandidate)}
                  className="flex-1"
                >
                  Raise CR Request
                </Button>
                <Button
                  onClick={handleSaveNotes}
                  variant="outline"
                  className="flex-1"
                >
                  Save Notes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}