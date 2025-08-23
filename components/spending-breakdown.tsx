"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  BarChart3,
  Download,
  Filter,
  PieChart,
  Search,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

interface SpendingBreakdownProps {
  onBack?: () => void;
}

export function SpendingBreakdown({ onBack }: SpendingBreakdownProps) {
  const [chartType, setChartType] = useState("bar");
  const [selectedPeriod, setSelectedPeriod] = useState("this-month");
  const [selectedAccount, setSelectedAccount] = useState("all");

  const categoryData = [
    {
      id: "food-dining",
      name: "Food & Dining",
      amount: 856.45,
      percentage: 30.1,
      change: 12.5,
      budget: 900,
      transactions: 24,
      subcategories: [
        { name: "Restaurants", amount: 425.3, percentage: 49.7 },
        { name: "Groceries", amount: 285.6, percentage: 33.4 },
        { name: "Takeaway", amount: 145.55, percentage: 17.0 },
      ],
    },
    {
      id: "transportation",
      name: "Transportation",
      amount: 542.3,
      percentage: 19.0,
      change: -5.2,
      budget: 600,
      transactions: 18,
      subcategories: [
        { name: "Fuel", amount: 285.4, percentage: 52.6 },
        { name: "Public Transport", amount: 156.9, percentage: 28.9 },
        { name: "Ride Sharing", amount: 100.0, percentage: 18.4 },
      ],
    },
    {
      id: "shopping",
      name: "Shopping",
      amount: 425.8,
      percentage: 15.0,
      change: 25.8,
      budget: 400,
      transactions: 12,
      subcategories: [
        { name: "Clothing", amount: 245.3, percentage: 57.6 },
        { name: "Electronics", amount: 125.5, percentage: 29.5 },
        { name: "Home & Garden", amount: 55.0, percentage: 12.9 },
      ],
    },
    {
      id: "utilities",
      name: "Utilities & Bills",
      amount: 380.25,
      percentage: 13.4,
      change: 2.1,
      budget: 450,
      transactions: 8,
      subcategories: [
        { name: "Electricity", amount: 145.25, percentage: 38.2 },
        { name: "Internet", amount: 89.0, percentage: 23.4 },
        { name: "Water", amount: 65.5, percentage: 17.2 },
        { name: "Phone", amount: 80.5, percentage: 21.2 },
      ],
    },
    {
      id: "entertainment",
      name: "Entertainment",
      amount: 285.6,
      percentage: 10.0,
      change: 18.3,
      budget: 300,
      transactions: 15,
      subcategories: [
        { name: "Movies & Shows", amount: 125.3, percentage: 43.9 },
        { name: "Gaming", amount: 89.5, percentage: 31.3 },
        { name: "Events", amount: 70.8, percentage: 24.8 },
      ],
    },
  ];

  const monthlyTrends = [
    { month: "Oct", amount: 2456.8 },
    { month: "Nov", amount: 2625.9 },
    { month: "Dec", amount: 2847.32 },
    { month: "Jan", amount: 2734.5 },
    { month: "Feb", amount: 2847.32 },
  ];

  const accountBreakdown = [
    { account: "Maybank Savings", amount: 1245.6, percentage: 43.7 },
    { account: "CIMB Current", amount: 856.45, percentage: 30.1 },
    { account: "AmEx Business", amount: 542.3, percentage: 19.0 },
    { account: "Cash", amount: 202.97, percentage: 7.1 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Overview
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Spending Breakdown & Trends</h1>
            <p className="text-muted-foreground">
              Deep dive into your spending patterns
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label className="text-sm">Time Period</Label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                  <SelectItem value="this-year">This Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm">Account</Label>
              <Select
                value={selectedAccount}
                onValueChange={setSelectedAccount}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Accounts</SelectItem>
                  <SelectItem value="maybank">Maybank Savings</SelectItem>
                  <SelectItem value="cimb">CIMB Current</SelectItem>
                  <SelectItem value="amex">AmEx Business</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm">Chart Type</Label>
              <Select value={chartType} onValueChange={setChartType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bar">Bar Chart</SelectItem>
                  <SelectItem value="pie">Pie Chart</SelectItem>
                  <SelectItem value="trend">Trend Line</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm">Search Categories</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-10" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Spending by Category</CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setChartType("bar")}
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setChartType("pie")}
              >
                <PieChart className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {chartType === "bar" ? (
              <div className="space-y-4">
                {categoryData.map((category, index) => (
                  <div key={category.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        {category.name}
                      </span>
                      <span className="text-sm">
                        RM {category.amount.toFixed(2)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${category.percentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{category.percentage}% of total</span>
                      <span>{category.transactions} transactions</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                <div className="text-center">
                  <PieChart className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Pie chart visualization
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Monthly Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Spending Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-32 bg-gray-50 rounded flex items-end justify-center space-x-2 p-4">
                {monthlyTrends.map((month, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className="bg-blue-500 rounded-sm w-8"
                      style={{
                        height: `${
                          (month.amount /
                            Math.max(...monthlyTrends.map((m) => m.amount))) *
                          100
                        }%`,
                      }}
                    />
                    <span className="text-xs text-muted-foreground mt-1">
                      {month.month}
                    </span>
                  </div>
                ))}
              </div>
              <div className="text-sm text-center text-muted-foreground">
                Average: RM{" "}
                {(
                  monthlyTrends.reduce((sum, m) => sum + m.amount, 0) /
                  monthlyTrends.length
                ).toFixed(0)}
                /month
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Category Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryData.map((category) => (
              <div key={category.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-medium">{category.name}</h4>
                    <Badge
                      variant={
                        category.amount > category.budget
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {category.amount > category.budget
                        ? "Over Budget"
                        : "Within Budget"}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      RM {category.amount.toFixed(2)}
                    </div>
                    <div className="flex items-center text-sm">
                      {category.change > 0 ? (
                        <TrendingUp className="h-3 w-3 text-red-500 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-green-500 mr-1" />
                      )}
                      <span
                        className={
                          category.change > 0
                            ? "text-red-500"
                            : "text-green-500"
                        }
                      >
                        {category.change > 0 ? "+" : ""}
                        {category.change}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Budget: </span>
                    <span>RM {category.budget.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      Transactions:{" "}
                    </span>
                    <span>{category.transactions}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">% of Total: </span>
                    <span>{category.percentage}%</span>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="text-sm font-medium mb-2">Subcategories:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {category.subcategories.map((sub, index) => (
                      <div
                        key={index}
                        className="text-xs bg-gray-50 p-2 rounded"
                      >
                        <div className="font-medium">{sub.name}</div>
                        <div className="text-muted-foreground">
                          RM {sub.amount.toFixed(2)} ({sub.percentage}%)
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Spending by Account */}
      <Card>
        <CardHeader>
          <CardTitle>Spending by Account</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {accountBreakdown.map((account, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-700">
                      {account.account
                        .split(" ")[0]
                        .substring(0, 2)
                        .toUpperCase()}
                    </span>
                  </div>
                  <span className="font-medium">{account.account}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">
                    RM {account.amount.toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {account.percentage}% of total
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
