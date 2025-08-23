"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  Mail,
  MapPin,
  Phone,
  Plus,
  Users,
  Video,
  XCircle,
} from "lucide-react";
import { useState } from "react";

interface Appointment {
  id: string;
  clientName: string;
  clientEmail: string;
  type: "consultation" | "review" | "planning" | "follow-up";
  meetingType: "in-person" | "virtual" | "phone";
  date: string;
  time: string;
  duration: number;
  status: "confirmed" | "pending" | "rescheduled" | "cancelled";
  location?: string;
  agenda: string;
  notes?: string;
}

const mockAppointments: Appointment[] = [
  {
    id: "1",
    clientName: "John Doe",
    clientEmail: "john.doe@email.com",
    type: "review",
    meetingType: "in-person",
    date: "2024-01-16",
    time: "09:00",
    duration: 60,
    status: "confirmed",
    location: "Office Conference Room A",
    agenda: "Quarterly portfolio review and rebalancing discussion",
    notes: "Client interested in ESG investments",
  },
  {
    id: "2",
    clientName: "Sarah Lim",
    clientEmail: "sarah.lim@email.com",
    type: "consultation",
    meetingType: "virtual",
    date: "2024-01-16",
    time: "11:00",
    duration: 45,
    status: "confirmed",
    agenda: "Initial financial planning consultation",
    notes: "New client referral from Ahmad Rahman",
  },
  {
    id: "3",
    clientName: "Michael Chen",
    clientEmail: "michael.chen@email.com",
    type: "planning",
    meetingType: "in-person",
    date: "2024-01-16",
    time: "14:00",
    duration: 90,
    status: "pending",
    location: "Office Conference Room B",
    agenda: "Retirement planning strategy session",
    notes: "Bring retirement calculator and projection models",
  },
  {
    id: "4",
    clientName: "Lisa Wong",
    clientEmail: "lisa.wong@email.com",
    type: "follow-up",
    meetingType: "phone",
    date: "2024-01-16",
    time: "16:30",
    duration: 30,
    status: "confirmed",
    agenda: "Follow up on insurance policy applications",
    notes: "Check status of life insurance application",
  },
  {
    id: "5",
    clientName: "David Kumar",
    clientEmail: "david.kumar@email.com",
    type: "review",
    meetingType: "virtual",
    date: "2024-01-17",
    time: "10:00",
    duration: 60,
    status: "confirmed",
    agenda: "Investment performance review and tax planning",
    notes: "Discuss tax-loss harvesting opportunities",
  },
  {
    id: "6",
    clientName: "Ahmad Rahman",
    clientEmail: "ahmad.rahman@email.com",
    type: "planning",
    meetingType: "in-person",
    date: "2024-01-17",
    time: "15:00",
    duration: 75,
    status: "rescheduled",
    location: "Office Conference Room A",
    agenda: "Estate planning and wealth transfer strategies",
    notes: "Reschedule due to client travel",
  },
];

const appointmentTypeLabels = {
  consultation: "Consultation",
  review: "Review",
  planning: "Planning",
  "follow-up": "Follow-up",
};

const meetingTypeIcons = {
  "in-person": MapPin,
  virtual: Video,
  phone: Phone,
};

const statusColors = {
  confirmed: "bg-green-100 text-green-700 border-green-200",
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  rescheduled: "bg-orange-100 text-orange-700 border-orange-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
};

const statusIcons = {
  confirmed: CheckCircle,
  pending: AlertCircle,
  rescheduled: Clock,
  cancelled: XCircle,
};

export function AppointmentsCalendar() {
  const [selectedDate, setSelectedDate] = useState("2024-01-16");

  // Filter appointments for today and upcoming
  const todayAppointments = mockAppointments.filter(
    (apt) => apt.date === selectedDate
  );
  const upcomingAppointments = mockAppointments
    .filter((apt) => apt.date > selectedDate)
    .slice(0, 5);

  // Calculate metrics
  const totalAppointments = mockAppointments.length;
  const confirmedAppointments = mockAppointments.filter(
    (apt) => apt.status === "confirmed"
  ).length;
  const pendingAppointments = mockAppointments.filter(
    (apt) => apt.status === "pending"
  ).length;

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = Number.parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    return (
      statusColors[status as keyof typeof statusColors] ||
      "bg-gray-100 text-gray-700"
    );
  };

  const getMeetingTypeIcon = (type: string) => {
    const IconComponent =
      meetingTypeIcons[type as keyof typeof meetingTypeIcons];
    return IconComponent || MapPin;
  };

  const getStatusIcon = (status: string) => {
    const IconComponent = statusIcons[status as keyof typeof statusIcons];
    return IconComponent || AlertCircle;
  };

  return (
    <div className="space-y-6">
      {/* Appointment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Appointments
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAppointments}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {confirmedAppointments}
            </div>
            <p className="text-xs text-muted-foreground">Ready to go</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {pendingAppointments}
            </div>
            <p className="text-xs text-muted-foreground">Need confirmation</p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Schedule */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>{formatDate(selectedDate)}</CardDescription>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Schedule Meeting
          </Button>
        </CardHeader>
        <CardContent>
          {todayAppointments.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">
                No appointments today
              </h3>
              <p className="text-muted-foreground mb-4">
                Your schedule is clear for today.
              </p>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Schedule Meeting
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {todayAppointments.map((appointment) => {
                const MeetingIcon = getMeetingTypeIcon(appointment.meetingType);
                const StatusIcon = getStatusIcon(appointment.status);

                return (
                  <div
                    key={appointment.id}
                    className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      <div className="text-center">
                        <div className="text-lg font-bold">
                          {formatTime(appointment.time)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {appointment.duration}min
                        </div>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={`/placeholder.svg?height=40&width=40`}
                          alt={appointment.clientName}
                        />
                        <AvatarFallback>
                          {appointment.clientName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold truncate">
                          {appointment.clientName}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          {appointmentTypeLabels[appointment.type]}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {appointment.agenda}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MeetingIcon className="h-3 w-3" />
                          {appointment.meetingType === "in-person" &&
                          appointment.location
                            ? appointment.location
                            : appointment.meetingType}
                        </div>
                        <div className="flex items-center gap-1">
                          <StatusIcon className="h-3 w-3" />
                          <Badge
                            variant="outline"
                            className={`text-xs ${getStatusColor(
                              appointment.status
                            )}`}
                          >
                            {appointment.status}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Phone className="h-3 w-3 mr-1" />
                        Call
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mail className="h-3 w-3 mr-1" />
                        Email
                      </Button>
                      {appointment.meetingType === "virtual" && (
                        <Button size="sm">
                          <Video className="h-3 w-3 mr-1" />
                          Join
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upcoming Appointments */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
          <CardDescription>Next 5 scheduled meetings</CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingAppointments.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">
                No upcoming appointments
              </h3>
              <p className="text-muted-foreground">
                Schedule meetings with your clients.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingAppointments.map((appointment) => {
                const MeetingIcon = getMeetingTypeIcon(appointment.meetingType);
                const StatusIcon = getStatusIcon(appointment.status);

                return (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={`/placeholder.svg?height=32&width=32`}
                          alt={appointment.clientName}
                        />
                        <AvatarFallback className="text-xs">
                          {appointment.clientName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">
                            {appointment.clientName}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {appointmentTypeLabels[appointment.type]}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{formatDate(appointment.date)}</span>
                          <span>{formatTime(appointment.time)}</span>
                          <div className="flex items-center gap-1">
                            <MeetingIcon className="h-3 w-3" />
                            <span className="capitalize">
                              {appointment.meetingType}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={`text-xs ${getStatusColor(
                          appointment.status
                        )}`}
                      >
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {appointment.status}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
