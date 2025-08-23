"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
  FileText,
  Filter,
  MoreHorizontal,
  Paperclip,
  Plus,
  Search,
  Split,
  Zap,
} from "lucide-react";
import { useState } from "react";

interface TransactionsFeedProps {
  onTransactionClick?: (transactionId: string) => void;
  onAddTransaction?: () => void;
}

export function TransactionsFeed({
  onTransactionClick,
  onAddTransaction,
}: TransactionsFeedProps) {
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("this-month");
  const [accountFilter, setAccountFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const transactions = [
    {
      id: "1",
      date: "2024-01-15",
      time: "14:30",
      merchant: "Tesco KLCC",
      originalDescription: "TESCO STORES 4523 KUALA LUMPUR MY",
      category: "Groceries",
      categoryIcon: "🛒",
      amount: -125.45,
      account: "Maybank Savings",
      accountIcon: "MB",
      status: "cleared",
      isUncategorized: false,
      isReviewed: true,
      hasReceipt: true,
      hasNote: false,
      isSplit: false,
      ruleApplied: true,
      isPending: false,
    },
    {
      id: "2",
      date: "2024-01-15",
      time: "09:15",
      merchant: "Salary Deposit",
      originalDescription: "PAYROLL DEPOSIT COMPANY ABC",
      category: "Income",
      categoryIcon: "💰",
      amount: 5500.0,
      account: "Maybank Savings",
      accountIcon: "MB",
      status: "cleared",
      isUncategorized: false,
      isReviewed: true,
      hasReceipt: false,
      hasNote: true,
      isSplit: false,
      ruleApplied: true,
      isPending: false,
    },
    {
      id: "3",
      date: "2024-01-14",
      time: "19:45",
      merchant: "Unknown Merchant",
      originalDescription: "POS PURCHASE 1234567890",
      category: "",
      categoryIcon: "",
      amount: -45.6,
      account: "CIMB Current",
      accountIcon: "CB",
      status: "cleared",
      isUncategorized: true,
      isReviewed: false,
      hasReceipt: false,
      hasNote: false,
      isSplit: false,
      ruleApplied: false,
      isPending: false,
    },
    {
      id: "4",
      date: "2024-01-14",
      time: "16:20",
      merchant: "GrabFood",
      originalDescription: "GRAB HOLDINGS PTE LTD",
      category: "Food Delivery",
      categoryIcon: "🍔",
      amount: -28.5,
      account: "AmEx Business",
      accountIcon: "AX",
      status: "cleared",
      isUncategorized: false,
      isReviewed: false,
      hasReceipt: false,
      hasNote: false,
      isSplit: true,
      ruleApplied: true,
      isPending: false,
    },
    {
      id: "5",
      date: "2024-01-14",
      time: "12:00",
      merchant: "Shell Station",
      originalDescription: "SHELL 1234 PETALING JAYA MY",
      category: "Fuel",
      categoryIcon: "⛽",
      amount: -65.0,
      account: "Maybank Savings",
      accountIcon: "MB",
      status: "pending",
      isUncategorized: false,
      isReviewed: false,
      hasReceipt: false,
      hasNote: false,
      isSplit: false,
      ruleApplied: true,
      isPending: true,
    },
  ];

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.originalDescription
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "uncategorized" && transaction.isUncategorized) ||
      (statusFilter === "income" && transaction.amount > 0) ||
      (statusFilter === "expenses" && transaction.amount < 0) ||
      (statusFilter === "pending" && transaction.isPending);

    return matchesSearch && matchesStatus;
  });

  const totalIncome = filteredTransactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = filteredTransactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const netAmount = totalIncome - totalExpenses;

  const uncategorizedCount = transactions.filter(
    (t) => t.isUncategorized
  ).length;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const handleTransactionSelect = (transactionId: string) => {
    setSelectedTransactions((prev) =>
      prev.includes(transactionId)
        ? prev.filter((id) => id !== transactionId)
        : [...prev, transactionId]
    );
  };

  const handleSelectAll = () => {
    if (selectedTransactions.length === filteredTransactions.length) {
      setSelectedTransactions([]);
    } else {
      setSelectedTransactions(filteredTransactions.map((t) => t.id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Summary */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Transactions</h1>
          <p className="text-muted-foreground">
            Track and manage all your financial movements
          </p>
        </div>
        <Button onClick={onAddTransaction}>
          <Plus className="h-4 w-4 mr-2" />
          Add Transaction
        </Button>
      </div>

      {/* Current Period Summary */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                RM{" "}
                {totalIncome.toLocaleString("en-MY", {
                  minimumFractionDigits: 2,
                })}
              </div>
              <div className="text-sm text-muted-foreground">Total Income</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                RM{" "}
                {totalExpenses.toLocaleString("en-MY", {
                  minimumFractionDigits: 2,
                })}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Expenses
              </div>
            </div>
            <div className="text-center">
              <div
                className={`text-2xl font-bold ${
                  netAmount >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                RM{" "}
                {Math.abs(netAmount).toLocaleString("en-MY", {
                  minimumFractionDigits: 2,
                })}
              </div>
              <div className="text-sm text-muted-foreground">Net Amount</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {filteredTransactions.length}
              </div>
              <div className="text-sm text-muted-foreground">Transactions</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            <Select value={accountFilter} onValueChange={setAccountFilter}>
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
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transactions</SelectItem>
                <SelectItem value="uncategorized">Uncategorized</SelectItem>
                <SelectItem value="income">Income Only</SelectItem>
                <SelectItem value="expenses">Expenses Only</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Uncategorized Alert */}
      {uncategorizedCount > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                <div>
                  <h4 className="font-medium text-orange-800">
                    {uncategorizedCount} transaction
                    {uncategorizedCount > 1 ? "s" : ""} need
                    {uncategorizedCount === 1 ? "s" : ""} categorization
                  </h4>
                  <p className="text-sm text-orange-700">
                    Review and categorize to improve your spending insights
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Review All Uncategorized
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bulk Actions */}
      {selectedTransactions.length > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={
                    selectedTransactions.length === filteredTransactions.length
                  }
                  onCheckedChange={handleSelectAll}
                />
                <span className="font-medium">
                  {selectedTransactions.length} transaction
                  {selectedTransactions.length > 1 ? "s" : ""} selected
                </span>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Bulk Categorize
                </Button>
                <Button variant="outline" size="sm">
                  Mark as Reviewed
                </Button>
                <Button variant="outline" size="sm">
                  Add Tags
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Transactions List */}
      <Card>
        <CardContent className="p-0">
          <div className="space-y-0">
            {filteredTransactions.map((transaction, index) => (
              <div
                key={transaction.id}
                className={`p-4 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors ${
                  selectedTransactions.includes(transaction.id)
                    ? "bg-blue-50"
                    : ""
                }`}
                onClick={() => onTransactionClick?.(transaction.id)}
              >
                <div className="flex items-center space-x-4">
                  <Checkbox
                    checked={selectedTransactions.includes(transaction.id)}
                    onCheckedChange={() =>
                      handleTransactionSelect(transaction.id)
                    }
                    onClick={(e) => e.stopPropagation()}
                  />

                  <div className="flex-1 grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                    {/* Date & Time */}
                    <div className="text-sm">
                      <div className="font-medium">
                        {formatDate(transaction.date)}
                      </div>
                      <div className="text-muted-foreground">
                        {transaction.time}
                      </div>
                    </div>

                    {/* Merchant & Description */}
                    <div className="md:col-span-2">
                      <div className="font-medium">{transaction.merchant}</div>
                      <div className="text-sm text-muted-foreground truncate">
                        {transaction.originalDescription}
                      </div>
                    </div>

                    {/* Category */}
                    <div className="flex items-center space-x-2">
                      {transaction.isUncategorized ? (
                        <Badge
                          variant="outline"
                          className="text-orange-600 border-orange-300"
                        >
                          Uncategorized
                        </Badge>
                      ) : (
                        <>
                          <span className="text-lg">
                            {transaction.categoryIcon}
                          </span>
                          <span className="text-sm font-medium">
                            {transaction.category}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Amount */}
                    <div className="text-right">
                      <div
                        className={`text-lg font-bold ${
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
                      <div className="flex items-center justify-end space-x-1 text-xs text-muted-foreground">
                        <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-blue-700">
                            {transaction.accountIcon}
                          </span>
                        </div>
                        <span>{transaction.account}</span>
                      </div>
                    </div>

                    {/* Status Indicators */}
                    <div className="flex items-center justify-end space-x-1">
                      {transaction.isPending && (
                        <Clock
                          className="h-3 w-3 text-orange-500"
                          title="Pending"
                        />
                      )}
                      {transaction.isReviewed && (
                        <CheckCircle
                          className="h-3 w-3 text-green-500"
                          title="Reviewed"
                        />
                      )}
                      {transaction.hasReceipt && (
                        <Paperclip
                          className="h-3 w-3 text-blue-500"
                          title="Receipt Attached"
                        />
                      )}
                      {transaction.hasNote && (
                        <FileText
                          className="h-3 w-3 text-purple-500"
                          title="Note Added"
                        />
                      )}
                      {transaction.isSplit && (
                        <Split
                          className="h-3 w-3 text-indigo-500"
                          title="Split Transaction"
                        />
                      )}
                      {transaction.ruleApplied && (
                        <Zap
                          className="h-3 w-3 text-yellow-500"
                          title="Rule Applied"
                        />
                      )}
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {filteredTransactions.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No transactions found matching your criteria.</p>
              <p className="text-sm mt-2">
                Try adjusting your search or filters.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
