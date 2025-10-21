// import { useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin,  { DateClickArg } from "@fullcalendar/interaction";
// import { EventClickArg } from "@fullcalendar/core";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Video } from "lucide-react";

// const interviews = [
//   {
//     id: "1",
//     title: "Alice Cooper - TechSolutions Inc.",
//     start: "2025-10-16T10:00:00",
//     end: "2025-10-16T11:00:00",
//     candidate: "Alice Cooper",
//     vendor: "TechSolutions Inc.",
//     time: "10:00 AM - 11:00 AM",
//     meetingLink: "https://meet.example.com/abc-123",
//     interviewers: "John Doe, Jane Smith",
//   },
//   {
//     id: "2",
//     title: "Bob Martinez - DevPro Services",
//     start: "2025-10-16T14:00:00",
//     end: "2025-10-16T15:00:00",
//     candidate: "Bob Martinez",
//     vendor: "DevPro Services",
//     time: "2:00 PM - 3:00 PM",
//     meetingLink: "https://meet.example.com/xyz-456",
//     interviewers: "John Doe, Mike Johnson",
//   },
//   {
//     id: "3",
//     title: "Carol Davis - CloudExperts Ltd.",
//     start: "2025-10-17T11:00:00",
//     end: "2025-10-17T12:00:00",
//     candidate: "Carol Davis",
//     vendor: "CloudExperts Ltd.",
//     time: "11:00 AM - 12:00 PM",
//     meetingLink: "https://meet.example.com/def-789",
//     interviewers: "John Doe, Sarah Wilson",
//   },
//   {
//     id: "4",
//     title: "David Evans - TechSolutions Inc.",
//     start: "2025-10-18T09:00:00",
//     end: "2025-10-18T10:00:00",
//     candidate: "David Evans",
//     vendor: "TechSolutions Inc.",
//     time: "9:00 AM - 10:00 AM",
//     meetingLink: "https://meet.example.com/ghi-012",
//     interviewers: "Jane Smith, Mike Johnson",
//   },
// ];

// export default function InterviewCalendar() {
//   const [selectedInterview, setSelectedInterview] = useState<any>(null);

//   const handleEventClick = (info: EventClickArg) => {
//     const interview = interviews.find((i) => i.id === info.event.id);
//     setSelectedInterview(interview || null);
//   };

//   return (
//     <div className="p-6 space-y-4">
//       <h1 className="text-3xl font-bold text-foreground">Interview Calendar</h1>

//       <FullCalendar
//         plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//         initialView="timeGridWeek"
//         headerToolbar={{
//           left: "prev,next today",
//           center: "title",
//           right: "dayGridMonth,timeGridWeek,timeGridDay",
//         }}
//         events={interviews.map((i) => ({
//           id: i.id,
//           title: i.title,
//           start: i.start,
//           end: i.end,
//           backgroundColor: "#6366f1", // Tailwind Indigo-500
//           borderColor: "#4f46e5",
//         }))}
//         eventClick={handleEventClick}
//         nowIndicator={true}
//         editable={false}
//         selectable={false}
//         height="85vh"
//         slotMinTime="08:00:00"
//         slotMaxTime="20:00:00"
//       />

//       {/* Interview Details Modal */}
//       <Dialog open={!!selectedInterview} onOpenChange={() => setSelectedInterview(null)}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Interview Details</DialogTitle>
//             <DialogDescription>Complete interview information</DialogDescription>
//           </DialogHeader>

//           {selectedInterview && (
//             <div className="space-y-4">
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">Candidate</p>
//                 <p className="text-base font-semibold text-foreground">{selectedInterview.candidate}</p>
//               </div>

//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">Vendor</p>
//                 <p className="text-base text-foreground">{selectedInterview.vendor}</p>
//               </div>

//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">Time</p>
//                 <p className="text-base text-foreground">{selectedInterview.time}</p>
//               </div>

//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">Interviewers</p>
//                 <p className="text-base text-foreground">{selectedInterview.interviewers}</p>
//               </div>

//               <div>
//                 <p className="text-sm font-medium text-muted-foreground mb-2">Meeting Link</p>
//                 <a
//                   href={selectedInterview.meetingLink}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-sm text-primary hover:underline break-all"
//                 >
//                   {selectedInterview.meetingLink}
//                 </a>
//               </div>

//               <Button className="w-full" size="lg">
//                 <Video className="h-5 w-5 mr-2" />
//                 Join Meeting
//               </Button>
//               <Button variant="outline" className="w-full">
//                 Request Reschedule
//               </Button>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";
import {
  format,
  addDays,
  addMonths,
  startOfWeek,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameDay,
  isSameMonth,
  eachDayOfInterval,
} from "date-fns";

const interviews = [
  {
    id: 1,
    date: new Date(2025, 9, 16),
    startTime: "10:00",
    endTime: "11:00",
    candidate: "Alice Cooper",
    vendor: "TechSolutions Inc.",
    meetingLink: "https://meet.example.com/abc-123",
  },
  {
    id: 2,
    date: new Date(2025, 9, 16),
    startTime: "14:00",
    endTime: "15:00",
    candidate: "Bob Martinez",
    vendor: "DevPro Services",
    meetingLink: "https://meet.example.com/xyz-456",
  },
  {
    id: 3,
    date: new Date(2025, 9, 17),
    startTime: "11:00",
    endTime: "12:00",
    candidate: "Carol Davis",
    vendor: "CloudExperts Ltd.",
    meetingLink: "https://meet.example.com/def-789",
  },
  {
    id: 4,
    date: new Date(2025, 9, 18),
    startTime: "09:00",
    endTime: "10:00",
    candidate: "David Evans",
    vendor: "TechSolutions Inc.",
    meetingLink: "https://meet.example.com/ghi-012",
  },
  {
    id: 5,
    date: new Date(2025, 9, 20),
    startTime: "13:00",
    endTime: "14:00",
    candidate: "Eve Foster",
    vendor: "DevPro Services",
    meetingLink: "https://meet.example.com/jkl-345",
  },
  {
    id: 6,
    date: new Date(2025, 9, 22),
    startTime: "15:00",
    endTime: "16:00",
    candidate: "Frank Green",
    vendor: "CloudExperts Ltd.",
    meetingLink: "https://meet.example.com/mno-678",
  },
  {
    id: 7,
    date: new Date(2025, 9, 25),
    startTime: "10:30",
    endTime: "11:30",
    candidate: "Grace Harris",
    vendor: "TechSolutions Inc.",
    meetingLink: "https://meet.example.com/pqr-901",
  },
];

type ViewMode = "day" | "week" | "month";

export default function InterviewCalendar() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>("week");
  const [showCalendarPicker, setShowCalendarPicker] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<
    typeof interviews[0] | null
  >(null);
  const [showInterviewPopover, setShowInterviewPopover] = useState(false);

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getWeekDays = (date: Date) => {
    const start = startOfWeek(date, { weekStartsOn: 0 });
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  };

  const getMonthDays = (date: Date) => {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    const startWeek = startOfWeek(start, { weekStartsOn: 0 });
    const endWeek = endOfWeek(end, { weekStartsOn: 0 });
    return eachDayOfInterval({ start: startWeek, end: endWeek });
  };

  const weekDays = getWeekDays(currentDate);
  const monthDays = getMonthDays(currentDate);
  const displayDays =
    viewMode === "week"
      ? weekDays
      : viewMode === "month"
      ? monthDays
      : [currentDate];

  const getInterviewsForDay = (day: Date) => {
    return interviews.filter((interview) => isSameDay(interview.date, day));
  };

  const getInterviewPosition = (
    startTime: string,
    endTime: string,
    hourBlock: number
  ) => {
    const [startHour, startMin] = startTime.split(":").map(Number);
    const [endHour, endMin] = endTime.split(":").map(Number);

    const startMinutes = startMin;
    const endMinutes = (endHour - hourBlock) * 60 + endMin;

    return {
      top: `${(startMinutes / 60) * 100}%`,
      height: `${((endMinutes - startMinutes) / 60) * 100}%`,
    };
  };

  const navigateDate = (direction: "prev" | "next") => {
    if (viewMode === "week") {
      setCurrentDate(
        direction === "next"
          ? addDays(currentDate, 7)
          : addDays(currentDate, -7)
      );
    } else if (viewMode === "month") {
      setCurrentDate(
        direction === "next"
          ? addMonths(currentDate, 1)
          : addMonths(currentDate, -1)
      );
    } else {
      setCurrentDate(
        direction === "next"
          ? addDays(currentDate, 1)
          : addDays(currentDate, -1)
      );
    }
  };

  const handleInterviewClick = (interview: typeof interviews[0]) => {
    setSelectedInterview(interview);
    setShowInterviewPopover(true);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border p-4 flex items-center justify-between gap-4 flex-wrap bg-background z-20">
        <div className="flex items-center gap-4">
          <Popover open={showCalendarPicker} onOpenChange={setShowCalendarPicker}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <CalendarIcon className="h-4 w-4" />
                {viewMode === "month"
                  ? format(currentDate, "MMMM yyyy")
                  : format(currentDate, "MMM dd, yyyy")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={currentDate}
                onSelect={(date) => {
                  if (date) {
                    setCurrentDate(date);
                    setShowCalendarPicker(false);
                  }
                }}
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => navigateDate("prev")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentDate(new Date())}
            >
              Today
            </Button>
            <Button variant="outline" size="icon" onClick={() => navigateDate("next")}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Select value={viewMode} onValueChange={(value) => setViewMode(value as ViewMode)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 overflow-auto relative">
        {viewMode === "month" ? (
          /* Month View */
          <div className="p-4">
            <div className="grid grid-cols-7 gap-2">
              {/* Day Headers */}
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-semibold text-muted-foreground p-2 sticky top-0 bg-background z-10"
                >
                  {day}
                </div>
              ))}

              {/* Month Days */}
              {displayDays.map((day) => {
                const dayInterviews = getInterviewsForDay(day);
                const isCurrentMonth = isSameMonth(day, currentDate);
                const isToday = isSameDay(day, new Date());

                return (
                  <div
                    key={day.toISOString()}
                    className={`min-h-[100px] border border-border rounded-lg p-2 ${
                      !isCurrentMonth ? "bg-muted/30" : "bg-background"
                    } ${isToday ? "ring-2 ring-primary" : ""}`}
                  >
                    <div
                      className={`text-sm font-semibold mb-1 ${
                        isToday
                          ? "bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center"
                          : !isCurrentMonth
                          ? "text-muted-foreground"
                          : ""
                      }`}
                    >
                      {format(day, "d")}
                    </div>
                    <div className="space-y-1">
                      {dayInterviews.map((interview) => (
                        <Popover key={interview.id}>
                          <PopoverTrigger asChild>
                            <div
                              onClick={() => handleInterviewClick(interview)}
                              className="text-xs bg-primary text-primary-foreground rounded px-1 py-0.5 cursor-pointer hover:opacity-90 truncate"
                            >
                              {interview.startTime} {interview.candidate}
                            </div>
                          </PopoverTrigger>
                          <PopoverContent className="w-80" align="start">
                            <div className="space-y-3">
                              <div>
                                <h3 className="font-semibold text-lg">{interview.candidate}</h3>
                                <Badge variant="outline" className="mt-1">
                                  {interview.vendor}
                                </Badge>
                              </div>

                              <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <CalendarIcon className="h-4 w-4" />
                                  {format(interview.date, "PPP")}
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Clock className="h-4 w-4" />
                                  {interview.startTime} - {interview.endTime}
                                </div>
                              </div>

                              <div className="pt-2 space-y-2">
                                <Button variant="outline" className="w-full" size="sm">
                                  Request Reschedule
                                </Button>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Day/Week View */
          <div className="min-w-[800px] relative">
            {/* Sticky Header */}
            <div
              className="grid border-b border-border sticky top-0 bg-background z-20"
              style={{ gridTemplateColumns: `60px repeat(${displayDays.length}, 1fr)` }}
            >
              <div className="border-r border-border p-2"></div>
              {displayDays.map((day) => (
                <div key={day.toISOString()} className="border-r border-border p-2 text-center">
                  <div className="text-xs text-muted-foreground">{format(day, "EEE")}</div>
                  <div
                    className={`text-lg font-semibold ${
                      isSameDay(day, new Date())
                        ? "bg-primary/20 text-primary rounded-full w-8 h-8 flex items-center justify-center mx-auto"
                        : ""
                    }`}
                  >
                    {format(day, "dd")}
                  </div>
                </div>
              ))}
            </div>

            {/* Scrollable Time Grid */}
            <div className="relative z-0">
              {hours.map((hour) => (
                <div
                  key={hour}
                  className="grid border-b border-border"
                  style={{
                    gridTemplateColumns: `60px repeat(${displayDays.length}, 1fr)`,
                    height: "60px",
                  }}
                >
                  <div className="border-r border-border p-2 text-xs text-muted-foreground text-right">
                    {hour === 0 ? "" : `${hour}:00`}
                  </div>
                  {displayDays.map((day) => (
                    <div key={day.toISOString()} className="border-r border-border relative">
                      {/* Interview blocks */}
                      {getInterviewsForDay(day).map((interview) => {
                        const [startHour] = interview.startTime.split(":").map(Number);
                        if (startHour === hour) {
                          const position = getInterviewPosition(
                            interview.startTime,
                            interview.endTime,
                            hour
                          );
                          return (
                            <Popover
                              key={interview.id}
                              open={showInterviewPopover && selectedInterview?.id === interview.id}
                              onOpenChange={setShowInterviewPopover}
                            >
                              <PopoverTrigger asChild>
                                <div
                                  onClick={() => handleInterviewClick(interview)}
                                  className="absolute left-1 right-1 bg-primary text-primary-foreground rounded p-2 cursor-pointer hover:opacity-90 transition-opacity overflow-hidden z-10"
                                  style={{
                                    top: position.top,
                                    height: position.height,
                                    minHeight: "40px",
                                  }}
                                >
                                  <div className="text-xs font-semibold truncate">
                                    {interview.candidate}
                                  </div>
                                  <div>
                                    <Badge variant="outline" className="text-xs">
                                      {interview.vendor}
                                    </Badge>
                                  </div>
                                </div>
                              </PopoverTrigger>
                              <PopoverContent className="w-80" align="start">
                                <div className="space-y-3">
                                  <div>
                                    <h3 className="font-semibold text-lg">{interview.candidate}</h3>
                                    <Badge variant="outline" className="mt-1">
                                      {interview.vendor}
                                    </Badge>
                                  </div>

                                  <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                      <CalendarIcon className="h-4 w-4" />
                                      {format(interview.date, "PPP")}
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                      <Clock className="h-4 w-4" />
                                      {interview.startTime} - {interview.endTime}
                                    </div>
                                  </div>

                                  <div className="pt-2 space-y-2">
                                    <Button variant="outline" className="w-full" size="sm">
                                      Request Reschedule
                                    </Button>
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                          );
                        }
                        return null;
                      })}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}