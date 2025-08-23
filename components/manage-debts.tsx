"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Banknote,
  Building2,
  Car,
  CreditCard,
  Filter,
  GraduationCap,
  Home,
  Plus,
  Search,
} from "lucide-react";
import { useState } from "react";

interface ManageDebtsProps {
  onBack: () => void;
  onNavigateToLoanDetails: (loanId: string) => void;
  onNavigateToAddDebt: () => void;
}

export function ManageDebts({
  onBack,
  onNavigateToLoanDetails,
  onNavigateToAddDebt,
}: ManageDebtsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("balance-high");

  // Mock data - in real app this would come from API/state
  const loans = [
    {
      id: "1",
      name: "Maybank Housing Loan",
      lender: "Maybank",
      lenderLogo: "/placeholder.svg?height=32&width=32",
      type: "housing",
      originalAmount: 350000,
      outstandingBalance: 185000,
      minimumPayment: 2850,
      nextDueDate: "2025-02-15",
      interestRate: 4.2,
      status: "active",
      progressPercentage: 47,
    },
    {
      id: "2",
      name: "Honda Car Loan",
      lender: "Public Bank",
      lenderLogo: "/placeholder.svg?height=32&width=32",
      type: "car",
      originalAmount: 85000,
      outstandingBalance: 45000,
      minimumPayment: 680,
      nextDueDate: "2025-02-20",
      interestRate: 3.8,
      status: "active",
      progressPercentage: 47,
    },
    {
      id: "3",
      name: "CIMB Credit Card",
      lender: "CIMB Bank",
      lenderLogo: "/placeholder.svg?height=32&width=32",
      type: "credit",
      originalAmount: 50000,
      outstandingBalance: 25000,
      minimumPayment: 450,
      nextDueDate: "2025-02-18",
      interestRate: 18.0,
      status: "active",
      progressPercentage: 50,
    },
    {
      id: "4",
      name: "AmBank Personal Loan",
      lender: "AmBank",
      lenderLogo: "/placeholder.svg?height=32&width=32",
      type: "personal",
      originalAmount: 30000,
      outstandingBalance: 15000,
      minimumPayment: 520,
      nextDueDate: "2025-02-25",
      interestRate: 8.5,
      status: "active",
      progressPercentage: 50,
    },
    {
      id: "5",
      name: "PTPTN Education Loan",
      lender: "PTPTN",
      lenderLogo: "/placeholder.svg?height=32&width=32",
      type: "education",
      originalAmount: 45000,
      outstandingBalance: 9980,
      minimumPayment: 180,
      nextDueDate: "2025-03-01",
      interestRate: 1.0,
      status: "active",
      progressPercentage: 78,
    },
    {
      id: "6",
      name: "RHB Credit Card",
      lender: "RHB Bank",
      lenderLogo: "/placeholder.svg?height=32&width=32",
      type: "credit",
      originalAmount: 20000,
      outstandingBalance: 10000,
      minimumPayment: 200,
      nextDueDate: "2025-02-22",
      interestRate: 17.5,
      status: "active",
      progressPercentage: 50,
    },
  ];

  const getTypeIcon = (type: string) => {
    const icons = {
      housing: Home,
      car: Car,
      credit: CreditCard,
      personal: Banknote,
      education: GraduationCap,
    };
    return icons[type as keyof typeof icons] || Banknote;
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      housing: "Housing",
      car: "Car Loan",
      credit: "Credit Card",
      personal: "Personal",
      education: "Education",
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: "bg-green-100 text-green-800",
      paid: "bg-gray-100 text-gray-800",
      defaulted: "bg-red-100 text-red-800",
    };
    return colors[status as keyof typeof colors] || colors.active;
  };

  const filteredAndSortedLoans = loans
    .filter((loan) => {
      const matchesSearch =
        loan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.lender.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === "all" || loan.type === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "balance-high":
          return b.outstandingBalance - a.outstandingBalance;
        case "balance-low":
          return a.outstandingBalance - b.outstandingBalance;
        case "interest-high":
          return b.interestRate - a.interestRate;
        case "interest-low":
          return a.interestRate - b.interestRate;
        case "due-date":
          return (
            new Date(a.nextDueDate).getTime() -
            new Date(b.nextDueDate).getTime()
          );
        default:
          return 0;
      }
    });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-MY", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Manage My Debts</h1>
          <p className="text-muted-foreground">
            View and manage all your loans and debts in one place
          </p>
        </div>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search loans or lenders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter by Type */}
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="housing">Housing</SelectItem>
                <SelectItem value="car">Car Loan</SelectItem>
                <SelectItem value="credit">Credit Card</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="education">Education</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="balance-high">
                  Balance (High to Low)
                </SelectItem>
                <SelectItem value="balance-low">
                  Balance (Low to High)
                </SelectItem>
                <SelectItem value="interest-high">
                  Interest Rate (High to Low)
                </SelectItem>
                <SelectItem value="interest-low">
                  Interest Rate (Low to High)
                </SelectItem>
                <SelectItem value="due-date">Next Due Date</SelectItem>
              </SelectContent>
            </Select>

            {/* Add New Debt */}
            <Button onClick={onNavigateToAddDebt} className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add Debt
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Loans List */}
      <div className="space-y-4">
        {filteredAndSortedLoans.map((loan) => {
          const IconComponent = getTypeIcon(loan.type);
          return (
            <Card
              key={loan.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onNavigateToLoanDetails(loan.id)}
            >
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    {/* Lender Logo & Icon */}
                    <div className="relative">
                      <img
                        src={loan.lenderLogo || "/placeholder.svg"}
                        alt={loan.lender}
                        className="w-12 h-12 rounded-lg border"
                      />
                      <div className="absolute -bottom-1 -right-1 p-1 bg-white rounded-full border">
                        <IconComponent className="h-3 w-3" />
                      </div>
                    </div>

                    {/* Loan Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold truncate">{loan.name}</h3>
                        <Badge className={getStatusColor(loan.status)}>
                          {loan.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{loan.lender}</span>
                        <span>•</span>
                        <span>{getTypeLabel(loan.type)}</span>
                        <span>•</span>
                        <span>{loan.interestRate}% APR</span>
                      </div>
                    </div>
                  </div>

                  {/* Balance & Progress */}
                  <div className="text-right min-w-0 ml-4">
                    <div className="font-semibold text-lg">
                      RM {loan.outstandingBalance.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      of RM {loan.originalAmount.toLocaleString()}
                    </div>
                    <div className="w-24">
                      <Progress
                        value={loan.progressPercentage}
                        className="h-1.5"
                      />
                      <div className="text-xs text-muted-foreground mt-1">
                        {loan.progressPercentage}% paid
                      </div>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="text-right min-w-0 ml-6">
                    <div className="font-medium">
                      RM {loan.minimumPayment.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Due {formatDate(loan.nextDueDate)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredAndSortedLoans.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No debts found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || filterType !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "You don't have any debts added yet"}
              </p>
              {!searchTerm && filterType === "all" && (
                <Button onClick={onNavigateToAddDebt}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Debt
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
