import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Calendar } from "lucide-react";

const requestsData = [
  { 
    id: "REQ-2025-001", 
    project: "Alpha", 
    techStack: "React, TypeScript, Node.js", 
    startDate: "2025-11-15", 
    endDate: "2026-05-15",
    resourcesNeeded: 2,
    roles: "Senior Developer, QA Engineer",
    status: "Pending"
  },
  { 
    id: "REQ-2025-002", 
    project: "Beta", 
    techStack: "Angular, Java, PostgreSQL", 
    startDate: "2025-12-01", 
    endDate: "2026-06-01",
    resourcesNeeded: 1,
    roles: "Full Stack Developer",
    status: "Pending"
  },
  { 
    id: "REQ-2025-003", 
    project: "Gamma", 
    techStack: "Python, Django, AWS", 
    startDate: "2025-11-20", 
    endDate: "2026-08-20",
    resourcesNeeded: 3,
    roles: "DevOps Engineer, Backend Developer, Cloud Architect",
    status: "Responded"
  },
  { 
    id: "REQ-2025-004", 
    project: "Delta", 
    techStack: "Vue.js, Express, MongoDB", 
    startDate: "2025-12-10", 
    endDate: "2026-09-10",
    resourcesNeeded: 2,
    roles: "Frontend Developer, UI/UX Designer",
    status: "Pending"
  },
];

export default function RequestInbox() {
  const [selectedProject, setSelectedProject] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredRequests = requestsData.filter(req => {
    const matchesProject = selectedProject === "all" || req.project.toLowerCase() === selectedProject;
    const matchesSearch = req.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         req.techStack.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesProject && matchesSearch;
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Request Inbox</h1>
        <p className="text-muted-foreground mt-1">Review and respond to resource requests</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Filter requests by project and date range</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Search Requests</label>
              <Input 
                placeholder="Search by ID or tech stack..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <label className="text-sm font-medium mb-2 block">Project</label>
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="alpha">Alpha</SelectItem>
                  <SelectItem value="beta">Beta</SelectItem>
                  <SelectItem value="gamma">Gamma</SelectItem>
                  <SelectItem value="delta">Delta</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-48">
              <label className="text-sm font-medium mb-2 block">Date Range</label>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Select Dates
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Resource Requests ({filteredRequests.length})</CardTitle>
          <CardDescription>Click "Respond" to submit a rate card for the request</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="cursor-pointer hover:text-foreground">Request ID</TableHead>
                  <TableHead className="cursor-pointer hover:text-foreground">Project</TableHead>
                  <TableHead className="cursor-pointer hover:text-foreground">Tech Stack</TableHead>
                  <TableHead className="cursor-pointer hover:text-foreground">Start Date</TableHead>
                  <TableHead className="cursor-pointer hover:text-foreground">End Date</TableHead>
                  <TableHead className="text-center">Resources</TableHead>
                  <TableHead>Roles Required</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                      No requests found matching your filters
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRequests.map((req) => (
                    <TableRow key={req.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{req.id}</TableCell>
                      <TableCell>{req.project}</TableCell>
                      <TableCell className="max-w-xs">
                        <div className="truncate" title={req.techStack}>
                          {req.techStack}
                        </div>
                      </TableCell>
                      <TableCell>{req.startDate}</TableCell>
                      <TableCell>{req.endDate}</TableCell>
                      <TableCell className="text-center">{req.resourcesNeeded}</TableCell>
                      <TableCell className="max-w-xs">
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
                        <Button
                          size="sm"
                          onClick={() => navigate("/vendor-submit-ratecard", { state: { requestId: req.id, project: req.project } })}
                          disabled={req.status === "Responded"}
                        >
                          Respond
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination placeholder */}
          {filteredRequests.length > 0 && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Showing {filteredRequests.length} of {requestsData.length} requests
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm" disabled>Next</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Annotation */}
      <Card className="bg-accent/50 border-primary/20">
        <CardHeader>
          <CardTitle className="text-sm">💡 Interaction Note</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <ul className="list-disc list-inside space-y-1">
            <li>Click column headers to sort (visual indication on hover)</li>
            <li>Use filters to narrow down requests by project or date range</li>
            <li>Click "Respond" button to navigate to the Rate Card Submission form</li>
            <li>Requests marked as "Responded" have disabled action buttons</li>
            <li>Pagination controls appear when there are multiple pages</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
