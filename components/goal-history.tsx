"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  CheckCircle,
  DollarSign,
  Download,
  FileText,
  Search,
  Target,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { useState } from "react";

interface GoalHistoryProps {
  onBack?: () => void;
}

export function GoalHistory({ onBack }: GoalHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [dateRange, setDateRange] = useState("all");

  // Mock data - in real app, this would come from API
  const goalActivity = [
    {
      id: "1",
      date: "2024-01-15",
      goalName: "Emergency Fund",
      type: "Deposit",
      amount: 800,
      source: "Maybank Savings",
      balance: 21000,
      notes: "Monthly automated transfer",
    },
    {
      id: "2",
      date: "2024-01-15",
      goalName: "Japan Holiday Fund",
      type: "Deposit",
      amount: 300,
      source: "CIMB Savings",
      balance: 6500,
      notes: "Monthly contribution",
    },
    {
      id: "3",
      date: "2024-01-10",
      goalName: "Car Fund",
      type: "Deposit",
      amount: 600,
      source: "Public Bank Savings",
      balance: 12500,
      notes: "Salary allocation",
    },
    {
      id: "4",
      date: "2024-01-08",
      goalName: "Laptop Upgrade Fund",
      type: "Withdrawal",
      amount: 3500,
      source: "Goal Completion",
      balance: 0,
      notes: "Goal achieved - purchased MacBook Pro",
    },
    {
      id: "5",
      date: "2024-01-01",
      goalName: "Emergency Fund",
      type: "Deposit",
      amount: 800,
      source: "Maybank Savings",
      balance: 20200,
      notes: "New Year contribution boost",
    },
  ];

  const completedGoals = [
    {
      id: "ptptn-payoff",
      name: "PTPTN Loan Payoff",
      finalAmount: 15000,
      targetAmount: 15000,
      startDate: "2022-06-01",
      completedDate: "2023-12-15",
      duration: "18 months",
      category: "Debt",
      lessonsLearned:
        "Automated payments made it much easier to stay consistent. Setting up bi-weekly payments instead of monthly helped accelerate the payoff.",
      achievements: [
        "Paid off 2 months early",
        "Saved RM 450 in interest",
        "Improved credit score",
      ],
    },
    {
      id: "laptop-fund",
      name: "Laptop Upgrade Fund",
      finalAmount: 3500,
      targetAmount: 3500,
      startDate: "2023-05-01",
      completedDate: "2024-01-08",
      duration: "8 months",
      category: "Technology",
      lessonsLearned:
        "Waiting for sales events helped stretch the budget further. Setting aside bonus money accelerated the timeline significantly.",
      achievements: [
        "Completed on time",
        "Got 15% discount during sale",
        "Sold old laptop for RM 800",
      ],
    },
    {
      id: "vacation-thailand",
      name: "Thailand Vacation Fund",
      finalAmount: 4200,
      targetAmount: 4000,
      startDate: "2022-01-01",
      completedDate: "2022-11-30",
      duration: "11 months",
      category: "Travel",
      lessonsLearned:
        "Booking flights early saved significant money. Having a buffer amount (extra RM 200) helped cover unexpected expenses.",
      achievements: [
        "Exceeded target by RM 200",
        "Booked flights 6 months early",
        "Amazing 2-week trip",
      ],
    },
  ];

  const filteredActivity = goalActivity.filter((activity) => {
    const matchesSearch =
      activity.goalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.notes.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      filterType === "all" ||
      activity.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesType;
  });

  const getActivityIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "deposit":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "withdrawal":
        return <Target className="h-4 w-4 text-blue-600" />;
      default:
        return <DollarSign className="h-4 w-4 text-gray-600" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "deposit":
        return "text-green-600";
      case "withdrawal":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-2xl font-bold">Goal Activity & History</h1>
            <p className="text-muted-foreground">
              Track your progress and celebrate achievements
            </p>
          </div>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export History
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="activity" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="activity" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Activity Feed</span>
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="flex items-center space-x-2"
          >
            <Trophy className="h-4 w-4" />
            <span>Completed Goals</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search activities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Activities</SelectItem>
                    <SelectItem value="deposit">Deposits Only</SelectItem>
                    <SelectItem value="withdrawal">Withdrawals Only</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Activity Feed */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span>Recent Activity</span>
              </CardTitle>
              <CardDescription>
                All transactions related to your goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div>
                        <div className="font-medium">{activity.goalName}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(activity.date).toLocaleDateString()} •{" "}
                          {activity.source}
                        </div>
                        {activity.notes && (
                          <div className="text-xs text-muted-foreground mt-1">
                            {activity.notes}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`font-medium ${getActivityColor(
                          activity.type
                        )}`}
                      >
                        {activity.type === "Deposit" ? "+" : "-"}RM{" "}
                        {activity.amount.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Balance: RM {activity.balance.toLocaleString()}
                      </div>
                      <Badge variant="outline" className="text-xs mt-1">
                        {activity.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          {/* Completed Goals Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    {completedGoals.length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Goals Completed
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    RM{" "}
                    {completedGoals
                      .reduce((sum, goal) => sum + goal.finalAmount, 0)
                      .toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Amount Achieved
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-2">
                    {Math.round(
                      completedGoals.reduce(
                        (sum, goal) => sum + Number.parseInt(goal.duration),
                        0
                      ) / completedGoals.length
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Avg. Months to Complete
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Completed Goals List */}
          <div className="space-y-6">
            {completedGoals.map((goal) => (
              <Card
                key={goal.id}
                className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Trophy className="h-5 w-5 text-green-600" />
                      <span>{goal.name}</span>
                    </CardTitle>
                    <Badge
                      variant="default"
                      className="bg-green-100 text-green-800"
                    >
                      {goal.category}
                    </Badge>
                  </div>
                  <CardDescription>
                    Completed on{" "}
                    {new Date(goal.completedDate).toLocaleDateString()} •
                    Duration: {goal.duration}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-white rounded-lg border">
                      <div className="text-lg font-bold text-green-600">
                        RM {goal.finalAmount.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Final Amount
                      </div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg border">
                      <div className="text-lg font-bold text-blue-600">
                        {goal.duration}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Time Taken
                      </div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg border">
                      <div className="text-lg font-bold text-purple-600">
                        {((goal.finalAmount / goal.targetAmount) * 100).toFixed(
                          0
                        )}
                        %
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Target Achievement
                      </div>
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                      Key Achievements
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {goal.achievements.map((achievement, index) => (
                        <div
                          key={index}
                          className="p-2 bg-white rounded border text-sm"
                        >
                          {achievement}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Lessons Learned */}
                  <div className="p-4 bg-white rounded-lg border">
                    <h4 className="font-medium mb-2 flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-blue-600" />
                      Lessons Learned
                    </h4>
                    <p className="text-sm text-gray-700">
                      {goal.lessonsLearned}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
