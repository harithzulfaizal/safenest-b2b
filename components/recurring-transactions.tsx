"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CheckCircle,
  DollarSign,
  Edit,
  Pause,
  Play,
  Plus,
  Square,
  Trash2,
  TrendingDown,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { useState } from "react";

interface RecurringTransactionsProps {
  onBack?: () => void;
}

export function RecurringTransactions({ onBack }: RecurringTransactionsProps) {
  const [viewType, setViewType] = useState("list");

  const recurringTransactions = [
    {
      id: "1",
      name: "Salary",
      amount: 5500,
      frequency: "Monthly",
      category: "Income",
      categoryIcon: "💰",
      nextOccurrence: "2024-02-01",
      lastOccurred: "2024-01-01",
      status: "active",
      account: "Maybank Savings",
      accountIcon: "MB",
      projectedAnnual: 66000,
      type: "income",
    },
    {
      id: "2",
      name: "Rent",
      amount: -1500,
      frequency: "Monthly",
      category: "Housing",
      categoryIcon: "🏠",
      nextOccurrence: "2024-02-01",
      lastOccurred: "2024-01-01",
      status: "active",
      account: "Maybank Savings",
      accountIcon: "MB",
      projectedAnnual: -18000,
      type: "expense",
    },
    {
      id: "3",
      name: "Netflix",
      amount: -15.99,
      frequency: "Monthly",
      category: "Entertainment",
      categoryIcon: "🎬",
      nextOccurrence: "2024-02-15",
      lastOccurred: "2024-01-15",
      status: "active",
      account: "AmEx Business",
      accountIcon: "AX",
      projectedAnnual: -191.88,
      type: "expense",
    },
    {
      id: "4",
      name: "Car Insurance",
      amount: -245,
      frequency: "Quarterly",
      category: "Insurance",
      categoryIcon: "🚗",
      nextOccurrence: "2024-04-01",
      lastOccurred: "2024-01-01",
      status: "active",
      account: "CIMB Current",
      accountIcon: "CB",
      projectedAnnual: -980,
      type: "expense",
    },
    {
      id: "5",
      name: "Gym Membership",
      amount: -89,
      frequency: "Monthly",
      category: "Health & Fitness",
      categoryIcon: "💪",
      nextOccurrence: "2024-02-10",
      lastOccurred: "2024-01-10",
      status: "paused",
      account: "Maybank Savings",
      accountIcon: "MB",
      projectedAnnual: -1068,
      type: "expense",
    },
  ];

  const autoDetectedTransactions = [
    {
      id: "auto-1",
      description: "RM 129 to Maxis",
      amount: -129,
      frequency: "Monthly",
      confidence: "High",
      suggestedCategory: "Utilities",
      occurrences: 6,
    },
    {
      id: "auto-2",
      description: "RM 45 to Spotify",
      amount: -45,
      frequency: "Monthly",
      confidence: "Medium",
      suggestedCategory: "Entertainment",
      occurrences: 4,
    },
  ];

  const totalMonthlyIncome = recurringTransactions
    .filter((t) => t.type === "income" && t.status === "active")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const totalMonthlyExpenses = recurringTransactions
    .filter((t) => t.type === "expense" && t.status === "active")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Play className="h-4 w-4 text-green-600" />;
      case "paused":
        return <Pause className="h-4 w-4 text-yellow-600" />;
      case "ended":
        return <Square className="h-4 w-4 text-gray-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "border-l-green-500";
      case "paused":
        return "border-l-yellow-500";
      case "ended":
        return "border-l-gray-500";
      default:
        return "border-l-gray-300";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Transactions
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Recurring Transactions</h1>
            <p className="text-muted-foreground">
              Manage your regular income and expenses
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={viewType} onValueChange={setViewType}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="list">List View</SelectItem>
              <SelectItem value="calendar">Calendar</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Recurring
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-700">
                  RM {totalMonthlyIncome.toLocaleString("en-MY")}
                </div>
                <div className="text-sm text-green-600">
                  Monthly Recurring Income
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-50 to-rose-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <TrendingDown className="h-8 w-8 text-red-600" />
              <div>
                <div className="text-2xl font-bold text-red-700">
                  RM {totalMonthlyExpenses.toLocaleString("en-MY")}
                </div>
                <div className="text-sm text-red-600">
                  Monthly Recurring Expenses
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <DollarSign className="h-8 w-8 text-blue-600" />
              <div>
                <div
                  className={`text-2xl font-bold ${
                    totalMonthlyIncome - totalMonthlyExpenses >= 0
                      ? "text-green-700"
                      : "text-red-700"
                  }`}
                >
                  RM{" "}
                  {Math.abs(
                    totalMonthlyIncome - totalMonthlyExpenses
                  ).toLocaleString("en-MY")}
                </div>
                <div className="text-sm text-blue-600">Net Monthly Flow</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Auto-Detected Recurring Transactions */}
      {autoDetectedTransactions.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              <span>Review Auto-Detected Recurring Transactions</span>
              <Badge variant="secondary">
                {autoDetectedTransactions.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {autoDetectedTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 bg-white border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-medium">
                        {transaction.description}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {transaction.frequency} • {transaction.occurrences}{" "}
                        occurrences • {transaction.confidence} confidence
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="font-semibold">
                        RM {Math.abs(transaction.amount).toFixed(2)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {transaction.suggestedCategory}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Confirm
                      </Button>
                      <Button variant="ghost" size="sm">
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recurring Transactions List */}
      <Card>
        <CardHeader>
          <CardTitle>All Recurring Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recurringTransactions.map((transaction) => (
              <Card
                key={transaction.id}
                className={`border-l-4 ${getStatusColor(transaction.status)}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(transaction.status)}
                        <span className="text-2xl">
                          {transaction.categoryIcon}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold">{transaction.name}</h4>
                        <div className="text-sm text-muted-foreground">
                          {transaction.category} • {transaction.frequency}
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                          <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-blue-700">
                              {transaction.accountIcon}
                            </span>
                          </div>
                          <span>{transaction.account}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div
                        className={`text-xl font-bold ${
                          transaction.amount > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.amount > 0 ? "+" : ""}RM{" "}
                        {Math.abs(transaction.amount).toLocaleString("en-MY", {
                          minimumFractionDigits: 2,
                        })}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Annual: RM{" "}
                        {Math.abs(transaction.projectedAnnual).toLocaleString(
                          "en-MY"
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t">
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Next Occurrence
                      </div>
                      <div className="font-medium">
                        {formatDate(transaction.nextOccurrence)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Last Occurred
                      </div>
                      <div className="font-medium">
                        {formatDate(transaction.lastOccurred)}
                      </div>
                    </div>
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {transaction.status === "active" ? (
                        <Button variant="ghost" size="sm">
                          <Pause className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button variant="ghost" size="sm">
                          <Play className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Calendar View Placeholder */}
      {viewType === "calendar" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Recurring Transactions Calendar</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
              <div className="text-center">
                <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                <p className="text-muted-foreground">
                  Calendar view coming soon
                </p>
                <p className="text-sm text-muted-foreground">
                  Visual timeline of all recurring transactions
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
