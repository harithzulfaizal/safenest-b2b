"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
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
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Calculator,
  Calendar,
  CheckCircle,
  CreditCard,
  DollarSign,
  Info,
  Pause,
  PiggyBank,
  Settings,
  Share2,
  Target,
  Trash2,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useState } from "react";

interface GoalDetailsProps {
  goalId: string;
  onBack?: () => void;
}

export function GoalDetails({ goalId, onBack }: GoalDetailsProps) {
  const [monthlyContribution, setMonthlyContribution] = useState([800]);
  const [targetAmount, setTargetAmount] = useState("25000");
  const [targetDate, setTargetDate] = useState("2024-06-30");

  // Mock data - in real app, this would be fetched based on goalId
  const goalData = {
    id: "emergency-fund",
    name: "Emergency Fund",
    description: "Build a safety net for unexpected expenses",
    targetAmount: 25000,
    currentAmount: 21000,
    targetDate: "2024-06-30",
    startDate: "2023-01-01",
    status: "On Track",
    priority: "High",
    category: "Safety",
    monthlyContribution: 800,
    linkedAccounts: [
      {
        id: "savings-1",
        name: "Maybank Savings",
        type: "Savings",
        contribution: 600,
      },
      {
        id: "investment-1",
        name: "Versa Portfolio",
        type: "Investment",
        contribution: 200,
      },
    ],
    milestones: [
      { amount: 5000, achieved: true, date: "2023-03-15" },
      { amount: 10000, achieved: true, date: "2023-07-20" },
      { amount: 15000, achieved: true, date: "2023-11-10" },
      { amount: 20000, achieved: true, date: "2024-01-05" },
      { amount: 25000, achieved: false, date: null },
    ],
    recentActivity: [
      {
        date: "2024-01-15",
        type: "Deposit",
        amount: 800,
        source: "Maybank Savings",
        balance: 21000,
      },
      {
        date: "2024-01-01",
        type: "Deposit",
        amount: 800,
        source: "Maybank Savings",
        balance: 20200,
      },
      {
        date: "2023-12-15",
        type: "Deposit",
        amount: 800,
        source: "Maybank Savings",
        balance: 19400,
      },
      {
        date: "2023-12-01",
        type: "Deposit",
        amount: 800,
        source: "Maybank Savings",
        balance: 18600,
      },
    ],
  };

  const progressPercentage =
    (goalData.currentAmount / goalData.targetAmount) * 100;
  const remainingAmount = goalData.targetAmount - goalData.currentAmount;
  const monthsRemaining = Math.ceil(remainingAmount / monthlyContribution[0]);

  // Calculate projected completion date based on current contribution
  const projectedDate = new Date();
  projectedDate.setMonth(projectedDate.getMonth() + monthsRemaining);

  // What-if scenarios
  const calculateScenario = (newContribution: number) => {
    const newMonthsRemaining = Math.ceil(remainingAmount / newContribution);
    const newProjectedDate = new Date();
    newProjectedDate.setMonth(newProjectedDate.getMonth() + newMonthsRemaining);
    return {
      months: newMonthsRemaining,
      date: newProjectedDate.toLocaleDateString(),
      timeSaved: monthsRemaining - newMonthsRemaining,
    };
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "on track":
        return "text-blue-600";
      case "ahead":
        return "text-green-600";
      case "behind":
        return "text-yellow-600";
      case "at risk":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "on track":
        return "secondary" as const;
      case "ahead":
        return "default" as const;
      case "behind":
        return "outline" as const;
      case "at risk":
        return "destructive" as const;
      default:
        return "outline" as const;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Goals
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{goalData.name}</h1>
            <p className="text-muted-foreground">{goalData.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share Progress
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Goal Summary */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-6 w-6 text-blue-600" />
              <span>Goal Progress</span>
            </CardTitle>
            <Badge variant={getStatusBadge(goalData.status)}>
              {goalData.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Progress Ring */}
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg
                  className="w-32 h-32 transform -rotate-90"
                  viewBox="0 0 36 36"
                >
                  <path
                    className="text-gray-200"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-blue-600"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${progressPercentage}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {progressPercentage.toFixed(1)}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Complete
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="space-y-4">
              <div className="text-center p-4 bg-white rounded-lg border">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  RM {goalData.currentAmount.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  Current Amount
                </div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  RM {goalData.targetAmount.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  Target Amount
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              <div className="text-center p-4 bg-white rounded-lg border">
                <div className="text-lg font-bold text-purple-600 mb-2">
                  RM {remainingAmount.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Remaining</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border">
                <div className="text-lg font-bold text-orange-600 mb-2">
                  {monthsRemaining} months
                </div>
                <div className="text-sm text-muted-foreground">
                  At current pace
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Progress value={progressPercentage} className="h-3" />
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-muted-foreground">
                RM {goalData.currentAmount.toLocaleString()}
              </span>
              <span className="text-sm text-muted-foreground">
                RM {goalData.targetAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for detailed information */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Goal Timeline & Milestones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span>Goal Timeline & Milestones</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {goalData.milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        milestone.achieved
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {milestone.achieved ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <Target className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">
                          RM {milestone.amount.toLocaleString()}
                        </span>
                        {milestone.achieved && milestone.date && (
                          <span className="text-sm text-muted-foreground">
                            Achieved on{" "}
                            {new Date(milestone.date).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className={`h-2 rounded-full ${
                            milestone.achieved ? "bg-green-500" : "bg-gray-300"
                          }`}
                          style={{
                            width: milestone.achieved
                              ? "100%"
                              : `${Math.min(
                                  (goalData.currentAmount / milestone.amount) *
                                    100,
                                  100
                                )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Financial Impact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span>Financial Impact</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Net Worth Impact:</strong> This goal contributes 18%
                    to your overall net worth growth. Completing it will
                    significantly improve your financial security.
                  </AlertDescription>
                </Alert>
                <Alert>
                  <TrendingUp className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Peace of Mind:</strong> An emergency fund covering 6
                    months of expenses provides excellent protection against
                    unexpected financial challenges.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calculator" className="space-y-6">
          {/* Goal Adjustments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-blue-600" />
                <span>Goal Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="target-amount">Target Amount (RM)</Label>
                  <Input
                    id="target-amount"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    type="number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target-date">Target Date</Label>
                  <Input
                    id="target-date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    type="date"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label>Monthly Contribution: RM {monthlyContribution[0]}</Label>
                <Slider
                  value={monthlyContribution}
                  onValueChange={setMonthlyContribution}
                  max={2000}
                  min={100}
                  step={50}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>RM 100</span>
                  <span>RM 2,000</span>
                </div>
              </div>

              <Alert>
                <Calculator className="h-4 w-4" />
                <AlertDescription>
                  <strong>Impact:</strong> With RM {monthlyContribution[0]}{" "}
                  monthly contribution, you'll reach your goal in{" "}
                  {monthsRemaining} months by{" "}
                  {projectedDate.toLocaleDateString()}.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* What-If Scenarios */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calculator className="h-5 w-5 text-purple-600" />
                <span>"What If" Scenarios</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1000, 1200, 1500].map((contribution) => {
                  const scenario = calculateScenario(contribution);
                  return (
                    <div key={contribution} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">
                          If you save RM {contribution}/month:
                        </span>
                        <Badge variant="outline">
                          {scenario.timeSaved > 0
                            ? `${scenario.timeSaved} months faster`
                            : "Same timeline"}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Goal achieved in {scenario.months} months by{" "}
                        {scenario.date}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accounts" className="space-y-6">
          {/* Linked Accounts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5 text-blue-600" />
                <span>Linked Accounts</span>
              </CardTitle>
              <CardDescription>
                Accounts contributing to this goal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {goalData.linkedAccounts.map((account) => (
                  <div
                    key={account.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        {account.type === "Savings" ? (
                          <PiggyBank className="h-5 w-5 text-blue-600" />
                        ) : (
                          <TrendingUp className="h-5 w-5 text-green-600" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{account.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {account.type} Account
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        RM {account.contribution}/month
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Auto-transfer
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center">
                  <Zap className="h-4 w-4 mr-2 text-blue-600" />
                  Automate Your Contributions
                </h4>
                <p className="text-sm text-blue-700 mb-3">
                  Set up automatic transfers to ensure consistent progress
                  towards your goal.
                </p>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Set Up Auto-Transfer
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-green-600" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {goalData.recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <DollarSign className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium">{activity.type}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(activity.date).toLocaleDateString()} •{" "}
                          {activity.source}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-green-600">
                        +RM {activity.amount}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Balance: RM {activity.balance.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Goal Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button>
              <DollarSign className="h-4 w-4 mr-2" />
              Make One-Time Contribution
            </Button>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Edit Goal Details
            </Button>
            <Button variant="outline">
              <Pause className="h-4 w-4 mr-2" />
              Pause Goal
            </Button>
            <Button variant="outline">
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark as Complete
            </Button>
            <Button
              variant="outline"
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Goal
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
