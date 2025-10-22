// import React, { useState, useEffect } from "react"; // Added React import
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Label } from "@/components/ui/label";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import { TrendingUp, TrendingDown, DollarSign, MessageCircle } from "lucide-react";
// import Chatbot from "./BusinessChatbot"; // Import the new Chatbot component

// const monthlyData = [
//   { month: "Jan", plannedHours: 1600, actualHours: 1550, plannedCost: 120000, actualCost: 115000 },
//   { month: "Feb", plannedHours: 1600, actualHours: 1620, plannedCost: 120000, actualCost: 122000 },
//   { month: "Mar", plannedHours: 1600, actualHours: 1580, plannedCost: 120000, actualCost: 118000 },
//   { month: "Apr", plannedHours: 1600, actualHours: 1600, plannedCost: 120000, actualCost: 120000 },
//   { month: "May", plannedHours: 1600, actualHours: 1610, plannedCost: 120000, actualCost: 121500 },
//   { month: "Jun", plannedHours: 1600, actualHours: 1590, plannedCost: 120000, actualCost: 119000 },
//   { month: "Jul", plannedHours: 1600, actualHours: 1630, plannedCost: 120000, actualCost: 122500 },
//   { month: "Aug", plannedHours: 1600, actualHours: 1575, plannedCost: 120000, actualCost: 118500 },
//   { month: "Sep", plannedHours: 1600, actualHours: 1605, plannedCost: 120000, actualCost: 120800 },
//   { month: "Oct", plannedHours: 1600, actualHours: 1580, plannedCost: 120000, actualCost: 119200 },
//   { month: "Nov", plannedHours: 1600, actualHours: 1615, plannedCost: 120000, actualCost: 121000 },
//   { month: "Dec", plannedHours: 1600, actualHours: 1595, plannedCost: 120000, actualCost: 119700 },
// ];

// const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// export default function BusinessDashboard() {
//   const [filters, setFilters] = useState({
//     project: "all",
//     lead: "all",
//     workstream: "all",
//     manager: "all",
//     month: "all",
//   });

//   const [filteredData, setFilteredData] = useState([]);
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [isChatOpen, setIsChatOpen] = useState(false);

//   useEffect(() => {
//     const today = new Date();
//     const currentMonthIndex = today.getMonth();
//     const currentMonthName = monthNames[currentMonthIndex];
//     setSelectedMonth(currentMonthName);

//     const monthData = monthlyData.filter((d) => d.month === currentMonthName);
//     setFilteredData(monthData);
//     setFilters((prev) => ({ ...prev, month: currentMonthName.toLowerCase() }));
//   }, []);

//   const handleMonthChange = (val) => {
//     setFilters({ ...filters, month: val });
//     if (val === "all") {
//       setFilteredData(monthlyData);
//       setSelectedMonth("All Months");
//     } else {
//       const monthName = val.charAt(0).toUpperCase() + val.slice(1, 3);
//       setSelectedMonth(monthName);
//       const monthData = monthlyData.filter((d) => d.month.toLowerCase() === val);
//       setFilteredData(monthData);
//     }
//   };

//   const handleChatToggle = () => {
//     setIsChatOpen(!isChatOpen);
//   };

//   return (
//     <div className="relative space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold">Business Desk Dashboard</h1>
//       </div>

//       {/* Filters */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Filters</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
//             <div className="space-y-2">
//               <Label>Project Grouping</Label>
//               <Select
//                 value={filters.project}
//                 onValueChange={(val) => setFilters({ ...filters, project: val })}
//               >
//                 <SelectTrigger>
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent className="bg-popover">
//                   <SelectItem value="all">All Projects</SelectItem>
//                   <SelectItem value="project-a">Project Alpha</SelectItem>
//                   <SelectItem value="project-b">Project Beta</SelectItem>
//                   <SelectItem value="project-c">Project Gamma</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="space-y-2">
//               <Label>Lead</Label>
//               <Select
//                 value={filters.lead}
//                 onValueChange={(val) => setFilters({ ...filters, lead: val })}
//               >
//                 <SelectTrigger>
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent className="bg-popover">
//                   <SelectItem value="all">All Leads</SelectItem>
//                   <SelectItem value="lead-1">John Smith</SelectItem>
//                   <SelectItem value="lead-2">Sarah Johnson</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="space-y-2">
//               <Label>FY26 Workstream</Label>
//               <Select
//                 value={filters.workstream}
//                 onValueChange={(val) => setFilters({ ...filters, workstream: val })}
//               >
//                 <SelectTrigger>
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent className="bg-popover">
//                   <SelectItem value="all">All Workstreams</SelectItem>
//                   <SelectItem value="ws-1">Digital Transformation</SelectItem>
//                   <SelectItem value="ws-2">Cloud Migration</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="space-y-2">
//               <Label>FTE Reporting Manager</Label>
//               <Select
//                 value={filters.manager}
//                 onValueChange={(val) => setFilters({ ...filters, manager: val })}
//               >
               
//                 <SelectTrigger>
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent className="bg-popover">
//                   <SelectItem value="all">All Managers</SelectItem>
//                   <SelectItem value="mgr-1">Michael Brown</SelectItem>
//                   <SelectItem value="mgr-2">Lisa Davis</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="space-y-2">
//               <Label>Month</Label>
//               <Select value={filters.month} onValueChange={handleMonthChange}>
//                 <SelectTrigger>
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent className="bg-popover max-h-48 overflow-y-auto scrollbar-thin">
//                   <SelectItem value="all">All Months</SelectItem>
//                   {monthNames.map((m) => (
//                     <SelectItem key={m} value={m.toLowerCase()}>
//                       {m}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Budget Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
//             <DollarSign className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">$800,000</div>
//             <p className="text-xs text-muted-foreground mt-1">FY 2025-26</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">Spent Budget</CardTitle>
//             <TrendingUp className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">$450,000</div>
//             <p className="text-xs text-muted-foreground mt-1">56.25% utilized</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">Variance</CardTitle>
//             <TrendingDown className="h-4 w-4 text-destructive" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-destructive">-$5,000</div>
//             <p className="text-xs text-muted-foreground mt-1">Over budget this month</p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Planned vs Actual Hours ({selectedMonth})</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={filteredData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="plannedHours" fill="hsl(var(--primary))" name="Planned Hours" barSize={25} />
//                 <Bar dataKey="actualHours" fill="orange" name="Actual Hours" barSize={25} />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Planned vs Actual Cost ({selectedMonth})</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={filteredData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
//                 <Legend />
//                 <Bar dataKey="plannedCost" fill="hsl(var(--primary))" name="Planned Cost" barSize={25} />
//                 <Bar dataKey="actualCost" fill="green" name="Actual Cost" barSize={25} />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Chatbot Floating Button */}
//       <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
//         <button
//           className="bg-primary text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform"
//           onClick={handleChatToggle}
//         >
//           <MessageCircle className="h-6 w-6" />
//         </button>
//       </div>

//       {/* Render Chatbot Component */}
//       <Chatbot isOpen={isChatOpen} onClose={handleChatToggle} />
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Label } from "@/components/ui/label";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";
// import { TrendingUp, TrendingDown, DollarSign, MessageCircle, Brain } from "lucide-react";
// import Chatbot from "./BusinessChatbot";

// const monthlyData = [
//   { month: "Jan", plannedHours: 1600, actualHours: 1550, plannedCost: 120000, actualCost: 115000 },
//   { month: "Feb", plannedHours: 1600, actualHours: 1620, plannedCost: 120000, actualCost: 122000 },
//   { month: "Mar", plannedHours: 1600, actualHours: 1580, plannedCost: 120000, actualCost: 118000 },
//   { month: "Apr", plannedHours: 1600, actualHours: 1600, plannedCost: 120000, actualCost: 120000 },
//   { month: "May", plannedHours: 1600, actualHours: 1610, plannedCost: 120000, actualCost: 121500 },
//   { month: "Jun", plannedHours: 1600, actualHours: 1590, plannedCost: 120000, actualCost: 119000 },
//   { month: "Jul", plannedHours: 1600, actualHours: 1630, plannedCost: 120000, actualCost: 122500 },
//   { month: "Aug", plannedHours: 1600, actualHours: 1575, plannedCost: 120000, actualCost: 118500 },
//   { month: "Sep", plannedHours: 1600, actualHours: 1605, plannedCost: 120000, actualCost: 120800 },
//   { month: "Oct", plannedHours: 1600, actualHours: 1580, plannedCost: 120000, actualCost: 119200 },
//   { month: "Nov", plannedHours: 1600, actualHours: 1615, plannedCost: 120000, actualCost: 121000 },
//   { month: "Dec", plannedHours: 1600, actualHours: 1595, plannedCost: 120000, actualCost: 119700 },
// ];

// const budgetData = [
//   { name: "Spent", value: 600000, color: "#4CAF50" },
//   { name: "Forecast", value: 120000, color: "#FF9800" },
//   { name: "Remaining", value: 80000, color: "#9E9E9E" },
// ];

// const projectDetails = [
//   { project: "Project Alpha", budget: 300000, spent: 180000, forecast: 50000, variance: 70000 },
//   { project: "Project Beta", budget: 250000, spent: 200000, forecast: 40000, variance: 10000 },
//   { project: "Project Gamma", budget: 250000, spent: 220000, forecast: 30000, variance: 0 },
// ];

// const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// export default function BusinessDashboard() {
//   const [filters, setFilters] = useState({
//     project: "all",
//     lead: "all",
//     workstream: "all",
//     manager: "all",
//     month: "all",
//   });

//   const [filteredData, setFilteredData] = useState([]);
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [isChatOpen, setIsChatOpen] = useState(false);

//   useEffect(() => {
//     const today = new Date();
//     const currentMonthIndex = today.getMonth();
//     const currentMonthName = monthNames[currentMonthIndex];
//     setSelectedMonth(currentMonthName);

//     const monthData = monthlyData.filter((d) => d.month === currentMonthName);
//     setFilteredData(monthData);
//     setFilters((prev) => ({ ...prev, month: currentMonthName.toLowerCase() }));
//   }, []);

//   const handleMonthChange = (val) => {
//     setFilters({ ...filters, month: val });
//     if (val === "all") {
//       setFilteredData(monthlyData);
//       setSelectedMonth("All Months");
//     } else {
//       const monthName = val.charAt(0).toUpperCase() + val.slice(1, 3);
//       setSelectedMonth(monthName);
//       const monthData = monthlyData.filter((d) => d.month.toLowerCase() === val);
//       setFilteredData(monthData);
//     }
//   };

//   const handleChatToggle = () => {
//     setIsChatOpen(!isChatOpen);
//   };

//   return (
//     <div className="relative space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold">Business Desk Dashboard</h1>
//       </div>

//       {/* Filters */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Filters</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
//             <div className="space-y-2">
//               <Label>Project Grouping</Label>
//               <Select
//                 value={filters.project}
//                 onValueChange={(val) => setFilters({ ...filters, project: val })}
//               >
//                 <SelectTrigger>
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent className="bg-popover">
//                   <SelectItem value="all">All Projects</SelectItem>
//                   <SelectItem value="project-a">Project Alpha</SelectItem>
//                   <SelectItem value="project-b">Project Beta</SelectItem>
//                   <SelectItem value="project-c">Project Gamma</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="space-y-2">
//               <Label>Lead</Label>
//               <Select
//                 value={filters.lead}
//                 onValueChange={(val) => setFilters({ ...filters, lead: val })}
//               >
//                 <SelectTrigger>
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent className="bg-popover">
//                   <SelectItem value="all">All Leads</SelectItem>
//                   <SelectItem value="lead-1">John Smith</SelectItem>
//                   <SelectItem value="lead-2">Sarah Johnson</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="space-y-2">
//               <Label>FY26 Workstream</Label>
//               <Select
//                 value={filters.workstream}
//                 onValueChange={(val) => setFilters({ ...filters, workstream: val })}
//               >
//                 <SelectTrigger>
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent className="bg-popover">
//                   <SelectItem value="all">All Workstreams</SelectItem>
//                   <SelectItem value="ws-1">Digital Transformation</SelectItem>
//                   <SelectItem value="ws-2">Cloud Migration</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="space-y-2">
//               <Label>FTE Reporting Manager</Label>
//               <Select
//                 value={filters.manager}
//                 onValueChange={(val) => setFilters({ ...filters, manager: val })}
//               >
//                 <SelectTrigger>
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent className="bg-popover">
//                   <SelectItem value="all">All Managers</SelectItem>
//                   <SelectItem value="mgr-1">Michael Brown</SelectItem>
//                   <SelectItem value="mgr-2">Lisa Davis</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="space-y-2">
//               <Label>Month</Label>
//               <Select value={filters.month} onValueChange={handleMonthChange}>
//                 <SelectTrigger>
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent className="bg-popover max-h-48 overflow-y-auto scrollbar-thin">
//                   <SelectItem value="all">All Months</SelectItem>
//                   {monthNames.map((m) => (
//                     <SelectItem key={m} value={m.toLowerCase()}>
//                       {m}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Budget Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
//             <DollarSign className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">$800,000</div>
//             <p className="text-xs text-muted-foreground mt-1">FY 2025-26</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">Spent Budget</CardTitle>
//             <TrendingUp className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">$450,000</div>
//             <p className="text-xs text-muted-foreground mt-1">56.25% utilized</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">Available</CardTitle>
//             <TrendingDown className="h-4 w-4 text-destructive" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-destructive">$3,50,000</div>
//             <p className="text-xs text-muted-foreground mt-1">Remain budget this month</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">ML Predictions</CardTitle>
//             <Brain className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">$780,000</div>
//             <p className="text-xs text-muted-foreground mt-1">Predicted FY spend</p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Planned vs Actual Hours ({selectedMonth})</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={filteredData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="plannedHours" fill="hsl(var(--primary))" name="Planned Hours" barSize={25} />
//                 <Bar dataKey="actualHours" fill="orange" name="Actual Hours" barSize={25} />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Planned vs Actual Cost ({selectedMonth})</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={filteredData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
//                 <Legend />
//                 <Bar dataKey="plannedCost" fill="hsl(var(--primary))" name="Planned Cost" barSize={25} />
//                 <Bar dataKey="actualCost" fill="green" name="Actual Cost" barSize={25} />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Budget Forecast Pie Chart */}
//       <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
//         <CardHeader className="text-center">
//           <CardTitle className="text-lg font-semibold text-primary">
//             Budget Spent vs Forecast
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex flex-col items-center justify-center">
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={budgetData}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                   outerRadius={100}
//                   dataKey="value"
//                 >
//                   {budgetData.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={entry.color}
//                       stroke="#fff"
//                       strokeWidth={2}
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip
//                   formatter={(value, name) => [`$${value.toLocaleString()}`, name]}
//                   contentStyle={{
//                     backgroundColor: "white",
//                     borderRadius: "8px",
//                     border: "1px solid #ddd",
//                   }}
//                 />
//               </PieChart>
//             </ResponsiveContainer>

//             <div className="flex justify-center gap-6 mt-4">
//               {budgetData.map((entry, index) => (
//                 <div key={index} className="flex items-center gap-2">
//                   <div
//                     className="w-4 h-4 rounded-full"
//                     style={{ backgroundColor: entry.color }}
//                   ></div>
//                   <span className="text-sm font-medium text-muted-foreground">
//                     {entry.name}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Project Budget Details */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Project Budget Details</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="border-b">
//                 <th className="text-left py-2">Project</th>
//                 <th className="text-right py-2">Budget</th>
//                 <th className="text-right py-2">Spent</th>
//                 <th className="text-right py-2">Forecast</th>
//                 <th className="text-right py-2">Variance</th>
//                 <th className="text-right py-2">Variance %</th>
//               </tr>
//             </thead>
//             <tbody>
//               {projectDetails.map((proj) => (
//                 <tr key={proj.project} className="border-b">
//                   <td className="py-2">{proj.project}</td>
//                   <td className="text-right">${proj.budget.toLocaleString()}</td>
//                   <td className="text-right">${proj.spent.toLocaleString()}</td>
//                   <td className="text-right">${proj.forecast.toLocaleString()}</td>
//                   <td className={`text-right ${proj.variance >= 0 ? "text-green-600" : "text-red-600"}`}>
//                     ${proj.variance.toLocaleString()}
//                   </td>
//                   <td className={`text-right ${proj.variance >= 0 ? "text-green-600" : "text-red-600"}`}>
//                     {((proj.variance / proj.budget) * 100).toFixed(1)}%
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </CardContent>
//       </Card>

//       {/* Chatbot Floating Button */}
//       <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
//         <button
//           className="bg-primary text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform"
//           onClick={handleChatToggle}
//         >
//           <MessageCircle className="h-6 w-6" />
//         </button>
//       </div>

//       {/* Render Chatbot Component */}
//       <Chatbot isOpen={isChatOpen} onClose={handleChatToggle} />
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, TrendingDown, DollarSign, MessageCircle, Brain } from "lucide-react";
import Chatbot from "./BusinessChatbot";

const monthlyData = [
  { month: "Jan", plannedHours: 1600, actualHours: 1550, plannedCost: 120000, actualCost: 115000 },
  { month: "Feb", plannedHours: 1600, actualHours: 1620, plannedCost: 120000, actualCost: 122000 },
  { month: "Mar", plannedHours: 1600, actualHours: 1580, plannedCost: 120000, actualCost: 118000 },
  { month: "Apr", plannedHours: 1600, actualHours: 1600, plannedCost: 120000, actualCost: 120000 },
  { month: "May", plannedHours: 1600, actualHours: 1610, plannedCost: 120000, actualCost: 121500 },
  { month: "Jun", plannedHours: 1600, actualHours: 1590, plannedCost: 120000, actualCost: 119000 },
  { month: "Jul", plannedHours: 1600, actualHours: 1630, plannedCost: 120000, actualCost: 122500 },
  { month: "Aug", plannedHours: 1600, actualHours: 1575, plannedCost: 120000, actualCost: 118500 },
  { month: "Sep", plannedHours: 1600, actualHours: 1605, plannedCost: 120000, actualCost: 120800 },
  { month: "Oct", plannedHours: 1600, actualHours: 1580, plannedCost: 120000, actualCost: 119200 },
  { month: "Nov", plannedHours: 1600, actualHours: 1615, plannedCost: 120000, actualCost: 121000 },
  { month: "Dec", plannedHours: 1600, actualHours: 1595, plannedCost: 120000, actualCost: 119700 },
];

const budgetData = [
  { name: "Spent", value: 600000, color: "#4CAF50" },
  { name: "Forecast", value: 120000, color: "#FF9800" },
  { name: "Remaining", value: 80000, color: "#9E9E9E" },
];

const projectDetails = [
  { project: "Project Alpha", budget: 300000, spent: 180000, forecast: 50000, variance: 70000 },
  { project: "Project Beta", budget: 250000, spent: 200000, forecast: 40000, variance: 10000 },
  { project: "Project Gamma", budget: 250000, spent: 220000, forecast: 30000, variance: 0 },
];

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function BusinessDashboard() {
  const [filters, setFilters] = useState({
    project: "all",
    fiscalYear: "all",
    workstream: "all",
    manager: "all",
    month: "all",
  });

  const [filteredData, setFilteredData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const today = new Date();
    const currentMonthIndex = today.getMonth();
    const currentMonthName = monthNames[currentMonthIndex];
    setSelectedMonth(currentMonthName);

    const monthData = monthlyData.filter((d) => d.month === currentMonthName);
    setFilteredData(monthData);
    setFilters((prev) => ({ ...prev, month: currentMonthName.toLowerCase() }));
  }, []);

  const handleMonthChange = (val) => {
    setFilters({ ...filters, month: val });
    if (val === "all") {
      setFilteredData(monthlyData);
      setSelectedMonth("All Months");
    } else {
      const monthName = val.charAt(0).toUpperCase() + val.slice(1, 3);
      setSelectedMonth(monthName);
      const monthData = monthlyData.filter((d) => d.month.toLowerCase() === val);
      setFilteredData(monthData);
    }
  };

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="relative space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Business Desk Dashboard</h1>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label>Project Grouping</Label>
              <Select
                value={filters.project}
                onValueChange={(val) => setFilters({ ...filters, project: val })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="project-a">Project Alpha</SelectItem>
                  <SelectItem value="project-b">Project Beta</SelectItem>
                  <SelectItem value="project-c">Project Gamma</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Fiscal Year</Label>
              <Select
                value={filters.fiscalYear}
                onValueChange={(val) => setFilters({ ...filters, fiscalYear: val })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Fiscal Years</SelectItem>
                  <SelectItem value="fy23">FY23</SelectItem>
                  <SelectItem value="fy24">FY24</SelectItem>
                  <SelectItem value="fy25">FY25</SelectItem>
                  <SelectItem value="fy26">FY26</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Workstream</Label>
              <Select
                value={filters.workstream}
                onValueChange={(val) => setFilters({ ...filters, workstream: val })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Workstreams</SelectItem>
                  <SelectItem value="ws-1">Digital Transformation</SelectItem>
                  <SelectItem value="ws-2">Cloud Migration</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>FTE Reporting Manager</Label>
              <Select
                value={filters.manager}
                onValueChange={(val) => setFilters({ ...filters, manager: val })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Managers</SelectItem>
                  <SelectItem value="mgr-1">Michael Brown</SelectItem>
                  <SelectItem value="mgr-2">Lisa Davis</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Month</Label>
              <Select value={filters.month} onValueChange={handleMonthChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover max-h-48 overflow-y-auto scrollbar-thin">
                  <SelectItem value="all">All Months</SelectItem>
                  {monthNames.map((m) => (
                    <SelectItem key={m} value={m.toLowerCase()}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Budget Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$800,000</div>
            <p className="text-xs text-muted-foreground mt-1">FY 2025-26</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Spent Budget</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$450,000</div>
            <p className="text-xs text-muted-foreground mt-1">56.25% utilized</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <TrendingDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">$350,000</div>
            <p className="text-xs text-muted-foreground mt-1">Remain budget this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">ML Predictions</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$780,000</div>
            <p className="text-xs text-muted-foreground mt-1">Predicted FY spend</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Planned vs Actual Hours ({selectedMonth})</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="plannedHours" fill="hsl(var(--primary))" name="Planned Hours" barSize={25} />
                <Bar dataKey="actualHours" fill="orange" name="Actual Hours" barSize={25} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Planned vs Actual Cost ({selectedMonth})</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="plannedCost" fill="hsl(var(--primary))" name="Planned Cost" barSize={25} />
                <Bar dataKey="actualCost" fill="green" name="Actual Cost" barSize={25} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Budget Forecast Pie Chart */}
      <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="text-center">
          <CardTitle className="text-lg font-semibold text-primary">
            Budget Spent vs Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={budgetData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  dataKey="value"
                >
                  {budgetData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="#fff"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`$${value.toLocaleString()}`, name]}
                  contentStyle={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="flex justify-center gap-6 mt-4">
              {budgetData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  ></div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {entry.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Budget Details */}
      <Card>
        <CardHeader>
          <CardTitle>Project Budget Details</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Project</th>
                <th className="text-right py-2">Budget</th>
                <th className="text-right py-2">Spent</th>
                <th className="text-right py-2">Forecast</th>
                <th className="text-right py-2">Variance</th>
                <th className="text-right py-2">Variance %</th>
              </tr>
            </thead>
            <tbody>
              {projectDetails.map((proj) => (
                <tr key={proj.project} className="border-b">
                  <td className="py-2">{proj.project}</td>
                  <td className="text-right">${proj.budget.toLocaleString()}</td>
                  <td className="text-right">${proj.spent.toLocaleString()}</td>
                  <td className="text-right">${proj.forecast.toLocaleString()}</td>
                  <td className={`text-right ${proj.variance >= 0 ? "text-green-600" : "text-red-600"}`}>
                    ${proj.variance.toLocaleString()}
                  </td>
                  <td className={`text-right ${proj.variance >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {((proj.variance / proj.budget) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Chatbot Floating Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
        <button
          className="bg-primary text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform"
          onClick={handleChatToggle}
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>

      {/* Render Chatbot Component */}
      <Chatbot isOpen={isChatOpen} onClose={handleChatToggle} />
    </div>
  );
}