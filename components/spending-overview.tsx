"use client";

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
  ArrowRight,
  Car,
  Gamepad2,
  Home,
  Plus,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  Utensils,
} from "lucide-react";
import { useState } from "react";

interface SpendingOverviewProps {
  onNavigateToBreakdown?: () => void;
  onNavigateToCategory?: (categoryId: string) => void;
}

export function SpendingOverview({
  onNavigateToBreakdown,
  onNavigateToCategory,
}: SpendingOverviewProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("this-month");

  const spendingData = {
    totalSpending: 2847.32,
    previousPeriod: 2625.8,
    budgetTotal: 3200.0,
    projectedSpending: 3150.0,
    monthlyIncome: 5500.0,
  };

  const changeAmount = spendingData.totalSpending - spendingData.previousPeriod;
  const changePercent = (
    (changeAmount / spendingData.previousPeriod) *
    100
  ).toFixed(1);
  const budgetUsed =
    (spendingData.totalSpending / spendingData.budgetTotal) * 100;
  const incomeUsed =
    (spendingData.totalSpending / spendingData.monthlyIncome) * 100;

  const topCategories = [
    {
      id: "food-dining",
      name: "Food & Dining",
      amount: 856.45,
      percentage: 30.1,
      icon: Utensils,
      color: "bg-red-500",
      budget: 900,
    },
    {
      id: "transportation",
      name: "Transportation",
      amount: 542.3,
      percentage: 19.0,
      icon: Car,
      color: "bg-blue-500",
      budget: 600,
    },
    {
      id: "shopping",
      name: "Shopping",
      amount: 425.8,
      percentage: 15.0,
      icon: ShoppingCart,
      color: "bg-green-500",
      budget: 400,
    },
    {
      id: "utilities",
      name: "Utilities & Bills",
      amount: 380.25,
      percentage: 13.4,
      icon: Home,
      color: "bg-yellow-500",
      budget: 450,
    },
    {
      id: "entertainment",
      name: "Entertainment",
      amount: 285.6,
      percentage: 10.0,
      icon: Gamepad2,
      color: "bg-purple-500",
      budget: 300,
    },
  ];

  const spendingTrend = [
    120, 95, 180, 145, 220, 165, 190, 175, 240, 185, 205, 195, 225, 180,
  ];

  const insights = [
    {
      type: "warning",
      title: "Shopping Budget Exceeded",
      description:
        "You've spent RM 25.80 more on shopping than your usual budget this month.",
      action: "Review Shopping",
    },
    {
      type: "info",
      title: "Weekend Spending Spike",
      description:
        "Your spending tends to increase by 40% on weekends, mainly on dining and entertainment.",
      action: "View Pattern",
    },
    {
      type: "alert",
      title: "New Subscriptions Detected",
      description:
        "3 new subscriptions totaling RM 45.97 were detected this month.",
      action: "Manage Subscriptions",
    },
  ];

  const topMerchants = [
    { name: "Tesco", amount: 245.6, category: "Groceries" },
    { name: "GrabFood", amount: 189.45, category: "Food Delivery" },
    { name: "Shell", amount: 156.8, category: "Fuel" },
    { name: "Shopee", amount: 134.25, category: "Online Shopping" },
    { name: "Starbucks", amount: 89.7, category: "Coffee" },
  ];

  const moneyFlow = [
    {
      category: "Essential Bills & Housing",
      amount: 1200.0,
      percentage: 42.1,
      color: "bg-red-400",
    },
    {
      category: "Food & Groceries",
      amount: 856.45,
      percentage: 30.1,
      color: "bg-orange-400",
    },
    {
      category: "Transportation",
      amount: 542.3,
      percentage: 19.0,
      color: "bg-blue-400",
    },
    {
      category: "Discretionary/Lifestyle",
      amount: 248.57,
      percentage: 8.8,
      color: "bg-green-400",
    },
  ];

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <TrendingUp className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Period Selection */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Spending Overview</h1>
          <p className="text-muted-foreground">
            Track and analyze your spending patterns
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
              <SelectItem value="last-7-days">Last 7 Days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Expense
          </Button>
        </div>
      </div>

      {/* Main Spending Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Total Spending This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-4xl font-bold">
                  RM{" "}
                  {spendingData.totalSpending.toLocaleString("en-MY", {
                    minimumFractionDigits: 2,
                  })}
                </div>
                <div className="flex items-center mt-2 text-sm">
                  {changeAmount > 0 ? (
                    <TrendingUp className="h-4 w-4 text-red-600 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-green-600 mr-1" />
                  )}
                  <span
                    className={
                      changeAmount > 0 ? "text-red-600" : "text-green-600"
                    }
                  >
                    {changeAmount > 0 ? "+" : ""}RM{" "}
                    {Math.abs(changeAmount).toFixed(2)} (
                    {changeAmount > 0 ? "+" : ""}
                    {changePercent}%) vs. last month
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <div className="text-sm text-muted-foreground">
                    Budget Progress
                  </div>
                  <div className="text-lg font-semibold">
                    RM {spendingData.totalSpending.toFixed(2)} of RM{" "}
                    {spendingData.budgetTotal.toFixed(2)}
                  </div>
                  <Progress value={budgetUsed} className="mt-2" />
                  <div className="text-xs text-muted-foreground mt-1">
                    {budgetUsed.toFixed(1)}% of budget used
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">
                    Income Allocation
                  </div>
                  <div className="text-lg font-semibold">
                    {incomeUsed.toFixed(1)}% of monthly income
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Projected: RM {spendingData.projectedSpending.toFixed(2)} by
                    month-end
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Spending Pace</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {budgetUsed.toFixed(0)}%
                </div>
                <div className="text-sm text-muted-foreground">
                  of monthly budget
                </div>
              </div>
              <Progress value={budgetUsed} className="h-3" />
              <div className="text-xs text-center text-muted-foreground">
                At this pace, you're projected to spend RM{" "}
                {spendingData.projectedSpending.toFixed(2)} by month-end
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Spending Categories */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Top Spending Categories</CardTitle>
            <Button variant="outline" size="sm" onClick={onNavigateToBreakdown}>
              View All
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCategories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => onNavigateToCategory?.(category.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-full ${category.color} flex items-center justify-center`}
                    >
                      <category.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">{category.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {category.percentage}% of total
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      RM {category.amount.toFixed(2)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {category.amount > category.budget ? (
                        <span className="text-red-600">
                          Over by RM{" "}
                          {(category.amount - category.budget).toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-green-600">
                          RM {(category.budget - category.amount).toFixed(2)}{" "}
                          left
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Spending Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Spending Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-32 bg-gray-50 rounded flex items-end justify-center space-x-1 p-4">
                {spendingTrend.map((amount, index) => (
                  <div
                    key={index}
                    className="bg-blue-500 rounded-sm"
                    style={{
                      height: `${(amount / Math.max(...spendingTrend)) * 100}%`,
                      width: "12px",
                    }}
                  />
                ))}
              </div>
              <div className="text-sm text-muted-foreground text-center">
                Last 14 days • Average: RM{" "}
                {(
                  spendingTrend.reduce((a, b) => a + b, 0) /
                  spendingTrend.length
                ).toFixed(0)}
                /day
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights & Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Spending Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {insights.map((insight, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-start space-x-3">
                  {getInsightIcon(insight.type)}
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{insight.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {insight.description}
                    </p>
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0 h-auto mt-2 text-xs"
                    >
                      {insight.action}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Where Your Money Went */}
        <Card>
          <CardHeader>
            <CardTitle>Where Your Money Went</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {moneyFlow.map((flow, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{flow.category}</span>
                    <span className="font-medium">
                      RM {flow.amount.toFixed(2)} ({flow.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${flow.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${flow.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Merchants */}
        <Card>
          <CardHeader>
            <CardTitle>Top Merchants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topMerchants.map((merchant, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-700">
                        {merchant.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-sm">{merchant.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {merchant.category}
                      </div>
                    </div>
                  </div>
                  <div className="font-semibold text-sm">
                    RM {merchant.amount.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
