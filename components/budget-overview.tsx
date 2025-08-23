"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  Clock,
  Settings,
  Target,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

interface BudgetOverviewProps {
  onNavigateToManage?: () => void;
  onNavigateToInsights?: () => void;
}

export function BudgetOverview({
  onNavigateToManage,
  onNavigateToInsights,
}: BudgetOverviewProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("this-month");

  const budgetData = {
    totalBudget: 3200.0,
    totalSpent: 2847.32,
    totalIncome: 5500.0,
    projectedSpending: 3150.0,
    healthScore: 8,
  };

  const spentPercentage =
    (budgetData.totalSpent / budgetData.totalBudget) * 100;
  const remainingBudget = budgetData.totalBudget - budgetData.totalSpent;
  const availableAfterBudget = budgetData.totalIncome - budgetData.totalBudget;

  const getStatusColor = (percentage: number) => {
    if (percentage <= 70) return "text-green-600";
    if (percentage <= 90) return "text-yellow-600";
    return "text-red-600";
  };

  const getStatusIcon = (percentage: number) => {
    if (percentage <= 70)
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (percentage <= 90) return <Clock className="h-4 w-4 text-yellow-600" />;
    return <AlertTriangle className="h-4 w-4 text-red-600" />;
  };

  const categories = [
    {
      id: "food-dining",
      name: "Food & Dining",
      budgeted: 900,
      spent: 856.45,
      status: "warning",
      trend: 12.5,
    },
    {
      id: "transportation",
      name: "Transportation",
      budgeted: 600,
      spent: 542.3,
      status: "good",
      trend: -5.2,
    },
    {
      id: "shopping",
      name: "Shopping",
      budgeted: 400,
      spent: 425.8,
      status: "over",
      trend: 25.8,
    },
    {
      id: "utilities",
      name: "Utilities & Bills",
      budgeted: 450,
      spent: 380.25,
      status: "good",
      trend: 2.1,
    },
    {
      id: "entertainment",
      name: "Entertainment",
      budgeted: 300,
      spent: 285.6,
      status: "warning",
      trend: 18.3,
    },
  ];

  const upcomingPayments = [
    { name: "Rent", amount: 1500, date: "Oct 28", category: "Housing" },
    {
      name: "Car Insurance",
      amount: 245,
      date: "Nov 2",
      category: "Insurance",
    },
    { name: "Internet Bill", amount: 89, date: "Nov 5", category: "Utilities" },
  ];

  const recommendations = [
    "Consider reducing discretionary spending by RM 150 to increase savings.",
    "You've consistently underspent in Utilities. Reallocate RM 70 to Emergency Fund?",
    "Your fixed expenses are 45% of your income. Great job keeping it under 50%!",
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Budget Overview</h1>
          <p className="text-muted-foreground">
            Track your spending against your budget
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="next-month">Next Month</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={onNavigateToManage}>
            <Settings className="h-4 w-4 mr-2" />
            Manage Budget
          </Button>
        </div>
      </div>

      {/* Main Budget Progress */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Overall Budget Progress</span>
            <div className="flex items-center space-x-2">
              {getStatusIcon(spentPercentage)}
              <Badge
                variant={
                  spentPercentage > 100
                    ? "destructive"
                    : spentPercentage > 90
                    ? "secondary"
                    : "default"
                }
              >
                {spentPercentage > 100
                  ? "Over Budget"
                  : spentPercentage > 90
                  ? "Approaching Limit"
                  : "On Track"}
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="text-4xl font-bold mb-2">
                <span className={getStatusColor(spentPercentage)}>
                  RM{" "}
                  {budgetData.totalSpent.toLocaleString("en-MY", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="text-lg text-muted-foreground mb-4">
                of RM {budgetData.totalBudget.toLocaleString("en-MY")} budgeted
                ({spentPercentage.toFixed(1)}% used)
              </div>
              <Progress
                value={Math.min(spentPercentage, 100)}
                className="h-3 mb-4"
              />
              <div className="text-sm">
                {remainingBudget > 0 ? (
                  <span className="text-green-600">
                    RM {remainingBudget.toFixed(2)} remaining • At current pace,
                    projected to have RM{" "}
                    {(
                      budgetData.totalBudget - budgetData.projectedSpending
                    ).toFixed(2)}{" "}
                    left
                  </span>
                ) : (
                  <span className="text-red-600">
                    Over budget by RM {Math.abs(remainingBudget).toFixed(2)} •
                    Projected to exceed by RM{" "}
                    {(
                      budgetData.projectedSpending - budgetData.totalBudget
                    ).toFixed(2)}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-blue-600 mb-2">
                  {budgetData.healthScore}/10
                </div>
                <div className="text-lg font-medium text-blue-800">
                  Budget Health Score
                </div>
                <div className="text-sm text-muted-foreground">
                  Excellent financial discipline!
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Income vs Budget vs Remaining */}
      <Card>
        <CardHeader>
          <CardTitle>Income Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span>Monthly Income</span>
              <span className="font-semibold">
                RM {budgetData.totalIncome.toLocaleString("en-MY")}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-8 flex overflow-hidden">
              <div
                className="bg-blue-500 flex items-center justify-center text-white text-xs font-medium"
                style={{
                  width: `${
                    (budgetData.totalBudget / budgetData.totalIncome) * 100
                  }%`,
                }}
              >
                Budgeted
              </div>
              <div
                className="bg-green-500 flex items-center justify-center text-white text-xs font-medium"
                style={{
                  width: `${
                    (availableAfterBudget / budgetData.totalIncome) * 100
                  }%`,
                }}
              >
                Available
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">
                  Budgeted Expenses:{" "}
                </span>
                <span className="font-semibold">
                  RM {budgetData.totalBudget.toLocaleString("en-MY")} (
                  {(
                    (budgetData.totalBudget / budgetData.totalIncome) *
                    100
                  ).toFixed(1)}
                  %)
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">
                  Available for Savings:{" "}
                </span>
                <span className="font-semibold text-green-600">
                  RM {availableAfterBudget.toLocaleString("en-MY")} (
                  {(
                    (availableAfterBudget / budgetData.totalIncome) *
                    100
                  ).toFixed(1)}
                  %)
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Status */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Category Status</CardTitle>
            <Button variant="outline" size="sm" onClick={onNavigateToManage}>
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categories
                .sort((a, b) => {
                  const aPercentage = (a.spent / a.budgeted) * 100;
                  const bPercentage = (b.spent / b.budgeted) * 100;
                  return bPercentage - aPercentage;
                })
                .slice(0, 5)
                .map((category) => {
                  const percentage = (category.spent / category.budgeted) * 100;
                  return (
                    <div key={category.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{category.name}</span>
                        <div className="flex items-center space-x-2">
                          {category.trend > 0 ? (
                            <TrendingUp className="h-3 w-3 text-red-500" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-green-500" />
                          )}
                          <span className="text-sm font-semibold">
                            RM {category.spent.toFixed(2)} / RM{" "}
                            {category.budgeted}
                          </span>
                        </div>
                      </div>
                      <Progress
                        value={Math.min(percentage, 100)}
                        className="h-2"
                      />
                      <div className="flex justify-between text-xs">
                        <span className={getStatusColor(percentage)}>
                          {percentage.toFixed(1)}% used
                        </span>
                        {percentage > 90 && (
                          <span className="text-orange-600">
                            {percentage > 100 ? "Over by" : "Only"} RM{" "}
                            {Math.abs(
                              category.budgeted - category.spent
                            ).toFixed(2)}{" "}
                            {percentage <= 100 && "left"}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Payments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Upcoming Payments</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingPayments.map((payment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <div className="font-medium">{payment.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {payment.category} • {payment.date}
                    </div>
                  </div>
                  <div className="text-lg font-semibold">
                    RM {payment.amount.toFixed(2)}
                  </div>
                </div>
              ))}
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Impact</span>
                  <span className="text-lg font-bold">
                    RM{" "}
                    {upcomingPayments
                      .reduce((sum, payment) => sum + payment.amount, 0)
                      .toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Budget Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recommendations.map((recommendation, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg"
              >
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">
                    {index + 1}
                  </span>
                </div>
                <p className="text-sm">{recommendation}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t">
            <Button
              variant="outline"
              onClick={onNavigateToInsights}
              className="w-full"
            >
              View Detailed Insights & Projections
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
