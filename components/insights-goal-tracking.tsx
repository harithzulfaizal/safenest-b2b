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
import { Progress } from "@/components/ui/progress";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  Clock,
  Info,
  Plus,
  Star,
  Target,
  Trophy,
  Zap,
} from "lucide-react";

interface InsightsGoalTrackingProps {
  onNavigateToModule?: (module: string) => void;
}

export function InsightsGoalTracking({
  onNavigateToModule,
}: InsightsGoalTrackingProps) {
  // Goals Tracking Data
  const goalsData = {
    overallProgress: 68,
    totalGoalsValue: 125000,
    currentProgress: 85000,
    activeGoals: [
      {
        id: "emergency-fund",
        name: "Emergency Fund",
        targetAmount: 25000,
        currentAmount: 21000,
        targetDate: "2024-06-30",
        status: "On Track",
        monthlyContribution: 800,
        projectedCompletion: "2024-05-15",
        category: "Safety",
        priority: "High",
      },
      {
        id: "house-deposit",
        name: "House Down Payment",
        targetAmount: 80000,
        currentAmount: 45000,
        targetDate: "2025-12-31",
        status: "Behind",
        monthlyContribution: 1200,
        projectedCompletion: "2026-03-15",
        category: "Major Purchase",
        priority: "High",
      },
      {
        id: "holiday-fund",
        name: "Japan Holiday Fund",
        targetAmount: 8000,
        currentAmount: 6500,
        targetDate: "2024-09-30",
        status: "Ahead",
        monthlyContribution: 300,
        projectedCompletion: "2024-08-15",
        category: "Lifestyle",
        priority: "Medium",
      },
      {
        id: "car-fund",
        name: "Car Replacement Fund",
        targetAmount: 35000,
        currentAmount: 12500,
        targetDate: "2025-06-30",
        status: "On Track",
        monthlyContribution: 600,
        projectedCompletion: "2025-06-15",
        category: "Major Purchase",
        priority: "Medium",
      },
    ],
    recentlyCompleted: [
      {
        name: "PTPTN Loan Payoff",
        amount: 15000,
        completedDate: "2023-12-15",
        category: "Debt",
      },
      {
        name: "Laptop Upgrade Fund",
        amount: 3500,
        completedDate: "2024-01-08",
        category: "Technology",
      },
    ],
  };

  const getGoalStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "ahead":
        return "text-green-600";
      case "on track":
        return "text-blue-600";
      case "behind":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getGoalStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "ahead":
        return "default" as const;
      case "on track":
        return "secondary" as const;
      case "behind":
        return "destructive" as const;
      default:
        return "outline" as const;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Goal Tracking</h1>
          <p className="text-muted-foreground">
            Consolidated updates on active financial goals
          </p>
        </div>
        <Button onClick={() => onNavigateToModule?.("goals")}>
          View Full Goals Module
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {/* Overall Goals Progress Summary */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-purple-600" />
            <span>Overall Goals Progress</span>
          </CardTitle>
          <CardDescription>
            Combined progress across all your active financial goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg
                  className="w-32 h-32 transform -rotate-90"
                  viewBox="0 0 36 36"
                >
                  <path
                    className="text-gray-200"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-purple-600"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray={`${goalsData.overallProgress}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {goalsData.overallProgress}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Complete
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                You are {goalsData.overallProgress}% towards achieving all your
                financial goals combined!
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-center p-4 bg-white rounded-lg border">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  RM {goalsData.currentProgress.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Progress
                </div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  RM {goalsData.totalGoalsValue.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Target
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="text-center p-4 bg-white rounded-lg border">
                <div className="text-2xl font-bold text-purple-600 mb-2">
                  {goalsData.activeGoals.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Active Goals
                </div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border">
                <div className="text-2xl font-bold text-orange-600 mb-2">
                  {goalsData.recentlyCompleted.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Recently Completed
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <h4 className="font-medium mb-3 flex items-center">
              <Info className="h-4 w-4 mr-2 text-purple-600" />
              AI Goals Analysis
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              This month, you made significant progress on your Emergency Fund,
              contributing RM 800 and moving you 84% closer to completion. Your
              consistent approach to goal funding shows strong financial
              discipline, though your House Down Payment goal could benefit from
              increased monthly contributions to stay on track for your target
              date.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Individual Active Goal Summaries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {goalsData.activeGoals.map((goal) => {
          const progressPercentage =
            (goal.currentAmount / goal.targetAmount) * 100;
          const remainingAmount = goal.targetAmount - goal.currentAmount;
          const monthsToTarget = Math.ceil(
            remainingAmount / goal.monthlyContribution
          );

          return (
            <Card key={goal.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{goal.name}</CardTitle>
                  <Badge variant={getGoalStatusBadge(goal.status)}>
                    {goal.status}
                  </Badge>
                </div>
                <CardDescription className="flex items-center space-x-4">
                  <span>
                    Target: {new Date(goal.targetDate).toLocaleDateString()}
                  </span>
                  <span>•</span>
                  <span
                    className={`font-medium ${getGoalStatusColor(goal.status)}`}
                  >
                    Priority: {goal.priority}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">
                      {progressPercentage.toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-muted-foreground">
                      RM {goal.currentAmount.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      RM {goal.targetAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="text-sm font-semibold">
                      RM {remainingAmount.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Remaining
                    </div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="text-sm font-semibold">
                      {monthsToTarget} months
                    </div>
                    <div className="text-xs text-muted-foreground">
                      At current pace
                    </div>
                  </div>
                </div>

                {/* Goal-Specific Insights */}
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h5 className="font-medium text-sm mb-2 flex items-center">
                    <Info className="h-3 w-3 mr-1 text-blue-500" />
                    AI Analysis
                  </h5>
                  {goal.status === "Behind" && (
                    <p className="text-sm text-blue-700">
                      You're RM {remainingAmount.toLocaleString()} behind on
                      your target. To catch up by your target date, consider
                      increasing your monthly contribution by RM{" "}
                      {Math.ceil(
                        (remainingAmount -
                          goal.monthlyContribution * monthsToTarget) /
                          monthsToTarget
                      )}
                      or extending your target date by 3 months.
                    </p>
                  )}
                  {goal.status === "On Track" && (
                    <p className="text-sm text-blue-700">
                      Great job staying on track! You only need to save RM{" "}
                      {remainingAmount.toLocaleString()} more. Your current
                      monthly contribution of RM {goal.monthlyContribution} will
                      get you there by {goal.projectedCompletion}.
                    </p>
                  )}
                  {goal.status === "Ahead" && (
                    <p className="text-sm text-blue-700">
                      Excellent! You're ahead of schedule and projected to reach
                      this goal by {goal.projectedCompletion}. Consider
                      reallocating any surplus to another goal or enjoy the
                      peace of mind of early completion.
                    </p>
                  )}
                </div>

                {/* Actionable Items */}
                <div className="space-y-2">
                  {goal.status === "Behind" && (
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription className="text-sm">
                        <strong>Action Needed:</strong> Increase monthly
                        contribution or adjust target date to stay on track.
                      </AlertDescription>
                    </Alert>
                  )}
                  {goal.status === "Ahead" && (
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription className="text-sm">
                        <strong>Opportunity:</strong> Consider reallocating
                        surplus funds to accelerate other goals.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                {/* Monthly Contribution */}
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm font-medium">
                    Monthly Contribution
                  </span>
                  <span className="text-sm font-bold">
                    RM {goal.monthlyContribution}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recently Completed Goals */}
      {goalsData.recentlyCompleted.length > 0 && (
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-green-600" />
              <span>Recently Completed Goals</span>
            </CardTitle>
            <CardDescription>
              Celebrate your financial achievements!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {goalsData.recentlyCompleted.map((goal, index) => (
                <div
                  key={index}
                  className="p-4 bg-white rounded-lg border border-green-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Trophy className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium text-green-800">
                        {goal.name}
                      </div>
                      <div className="text-sm text-green-600">
                        RM {goal.amount.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Completed on{" "}
                        {new Date(goal.completedDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-green-700 mb-3">
                🎉 Congratulations on achieving these financial milestones!
                What's your next goal?
              </p>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => onNavigateToModule?.("goals")}
              >
                <Plus className="h-4 w-4 mr-2" />
                Set a New Goal
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Goal Acceleration Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-yellow-600" />
            <span>Goal Acceleration Opportunities</span>
          </CardTitle>
          <CardDescription>
            Smart ways to reach your goals faster based on your spending
            patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>Opportunity Detected:</strong> You consistently
                underspent your 'Entertainment' budget by RM 150 this month.
                Reallocating this to your 'Car Fund' could get you there 4
                months faster.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-800">
                    Budget Surplus Reallocation
                  </span>
                </div>
                <p className="text-sm text-blue-700 mb-3">
                  Your average monthly surplus across flexible categories is RM
                  280. Redirecting this could accelerate your highest priority
                  goals.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onNavigateToModule?.("budgets")}
                >
                  Review Budget Allocation
                </Button>
              </div>

              <div className="p-4 border rounded-lg bg-purple-50 border-purple-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="h-4 w-4 text-purple-600" />
                  <span className="font-medium text-purple-800">
                    Goal Prioritization
                  </span>
                </div>
                <p className="text-sm text-purple-700 mb-3">
                  Focus extra funds on your Emergency Fund (84% complete) to
                  achieve your first major milestone, then redirect to House
                  Down Payment.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onNavigateToModule?.("goals")}
                >
                  Optimize Goal Strategy
                </Button>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h5 className="font-medium text-sm mb-2 flex items-center">
                <Star className="h-3 w-3 mr-1 text-yellow-500" />
                Smart Reallocation Suggestion
              </h5>
              <p className="text-sm text-yellow-700 mb-3">
                Based on your spending patterns, reallocating RM 200 from dining
                out and RM 80 from shopping to your goals could:
              </p>
              <ul className="text-sm text-yellow-700 space-y-1 mb-3">
                <li>• Complete Emergency Fund 2 months earlier</li>
                <li>• Reduce House Down Payment timeline by 6 months</li>
                <li>• Save RM 1,200 in opportunity cost over the year</li>
              </ul>
              <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                Apply Smart Reallocation
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
