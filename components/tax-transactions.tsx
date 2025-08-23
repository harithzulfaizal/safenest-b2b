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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CheckCircle,
  DollarSign,
  Download,
  FileText,
  Receipt,
  Search,
  Tag,
} from "lucide-react";
import { useState } from "react";

interface TaxTransactionsProps {
  onBack?: () => void;
}

export function TaxTransactions({ onBack }: TaxTransactionsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const [transactions] = useState([
    {
      id: "1",
      date: "2024-01-15",
      merchant: "Popular Bookstore",
      amount: 45.5,
      category: "Books & Journals",
      reliefCategory: "lifestyle",
      hasReceipt: true,
      status: "categorized",
      description: "Educational books purchase",
    },
    {
      id: "2",
      date: "2024-01-25",
      merchant: "Gleneagles Hospital",
      amount: 450.0,
      category: "Medical Treatment",
      reliefCategory: "medical",
      hasReceipt: true,
      status: "categorized",
      description: "Medical consultation and treatment",
    },
    {
      id: "3",
      date: "2024-02-01",
      merchant: "Coursera",
      amount: 200.0,
      category: "Online Education",
      reliefCategory: "education",
      hasReceipt: false,
      status: "categorized",
      description: "Professional development course",
    },
    {
      id: "4",
      date: "2024-02-15",
      merchant: "Guardian Pharmacy",
      amount: 85.3,
      category: "Health Products",
      reliefCategory: "unassigned",
      hasReceipt: false,
      status: "uncategorized",
      description: "Health supplements and vitamins",
    },
    {
      id: "5",
      date: "2024-02-20",
      merchant: "Fitness First",
      amount: 150.0,
      category: "Gym Membership",
      reliefCategory: "lifestyle",
      hasReceipt: true,
      status: "categorized",
      description: "Monthly gym membership fee",
    },
    {
      id: "6",
      date: "2024-03-01",
      merchant: "Salary Credit",
      amount: 7500.0,
      category: "Employment Income",
      reliefCategory: "income",
      hasReceipt: false,
      status: "categorized",
      description: "Monthly salary",
      type: "income",
    },
    {
      id: "7",
      date: "2024-03-05",
      merchant: "Rental Property",
      amount: 1200.0,
      category: "Rental Income",
      reliefCategory: "income",
      hasReceipt: false,
      status: "categorized",
      description: "Monthly rental income",
      type: "income",
    },
    {
      id: "8",
      date: "2024-03-10",
      merchant: "Maybank Investment",
      amount: 250.0,
      category: "Dividend Income",
      reliefCategory: "income",
      hasReceipt: true,
      status: "categorized",
      description: "Dividend payment",
      type: "income",
    },
  ]);

  const [uncategorizedTransactions] = useState([
    {
      id: "u1",
      date: "2024-02-28",
      merchant: "Watson's Pharmacy",
      amount: 120.5,
      category: "Health & Wellness",
      potentialRelief: "medical",
      confidence: "high",
      reason: "Pharmacy purchase - likely medical expense",
    },
    {
      id: "u2",
      date: "2024-03-15",
      merchant: "MPH Bookstore",
      amount: 75.0,
      category: "Books",
      potentialRelief: "lifestyle",
      confidence: "medium",
      reason: "Book purchase - could qualify for lifestyle relief",
    },
    {
      id: "u3",
      date: "2024-03-20",
      merchant: "Udemy",
      amount: 89.99,
      category: "Online Learning",
      potentialRelief: "education",
      confidence: "high",
      reason: "Online course - likely educational expense",
    },
  ]);

  const [uploadedReceipts] = useState([
    {
      id: "r1",
      name: "Medical_Receipt_Jan2024.pdf",
      category: "Medical",
      amount: 450.0,
      date: "2024-01-25",
      size: "245 KB",
    },
    {
      id: "r2",
      name: "Education_Receipt_Feb2024.pdf",
      category: "Education",
      amount: 200.0,
      date: "2024-02-01",
      size: "189 KB",
    },
    {
      id: "r3",
      name: "Lifestyle_Receipts_Q1.pdf",
      category: "Lifestyle",
      amount: 195.5,
      date: "2024-03-31",
      size: "567 KB",
    },
  ]);

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      transaction.reliefCategory === selectedCategory;
    const matchesStatus =
      selectedStatus === "all" || transaction.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const reliefCategories = [
    { value: "all", label: "All Categories" },
    { value: "lifestyle", label: "Lifestyle Relief" },
    { value: "medical", label: "Medical Expenses" },
    { value: "education", label: "Education" },
    { value: "income", label: "Income" },
    { value: "unassigned", label: "Unassigned" },
  ];

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "categorized", label: "Categorized" },
    { value: "uncategorized", label: "Uncategorized" },
  ];

  const getReliefBadgeColor = (category: string) => {
    switch (category) {
      case "lifestyle":
        return "bg-blue-100 text-blue-800";
      case "medical":
        return "bg-red-100 text-red-800";
      case "education":
        return "bg-green-100 text-green-800";
      case "income":
        return "bg-purple-100 text-purple-800";
      case "unassigned":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
            <h2 className="text-xl font-bold">Tax-Related Transactions</h2>
            <p className="text-sm text-muted-foreground">
              Review and categorize your tax-relevant transactions
            </p>
          </div>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Transactions
        </Button>
      </div>

      {/* Uncategorized Transactions Alert */}
      {uncategorizedTransactions.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-orange-800">
              <AlertCircle className="h-5 w-5" />
              <span>Uncategorized Tax Transactions</span>
            </CardTitle>
            <CardDescription className="text-orange-700">
              {uncategorizedTransactions.length} transactions could be
              tax-deductible but haven't been assigned to a relief category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {uncategorizedTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 bg-white rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">
                        {transaction.merchant}
                      </span>
                      <Badge
                        variant="outline"
                        className={getReliefBadgeColor(
                          transaction.potentialRelief
                        )}
                      >
                        {transaction.potentialRelief}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={
                          transaction.confidence === "high"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {transaction.confidence} confidence
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {transaction.reason}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-medium">
                      RM {transaction.amount.toFixed(2)}
                    </span>
                    <Button size="sm">
                      <Tag className="h-3 w-3 mr-1" />
                      Categorize
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {reliefCategories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Tax Transactions ({filteredTransactions.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Merchant</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Tax Category</TableHead>
                <TableHead>Receipt</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{transaction.date}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {transaction.merchant}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-48 truncate">
                    {transaction.description}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-3 w-3 text-muted-foreground" />
                      <span
                        className={`font-medium ${
                          transaction.type === "income" ? "text-green-600" : ""
                        }`}
                      >
                        {transaction.type === "income" ? "+" : ""}RM{" "}
                        {transaction.amount.toFixed(2)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={getReliefBadgeColor(
                        transaction.reliefCategory
                      )}
                    >
                      {transaction.reliefCategory}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      {transaction.hasReceipt ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                      )}
                      <span className="text-sm">
                        {transaction.hasReceipt ? "Yes" : "No"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Tag className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Receipt className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Receipt Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Receipt className="h-5 w-5" />
            <span>Uploaded Receipts ({uploadedReceipts.length})</span>
          </CardTitle>
          <CardDescription>
            Manage your tax-related receipts and documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {uploadedReceipts.map((receipt) => (
              <div
                key={receipt.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="h-8 w-8 text-blue-500" />
                  <div>
                    <h4 className="font-medium text-sm">{receipt.name}</h4>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>{receipt.category}</span>
                      <span>RM {receipt.amount.toFixed(2)}</span>
                      <span>{receipt.date}</span>
                      <span>{receipt.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                  <Button variant="ghost" size="sm">
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
