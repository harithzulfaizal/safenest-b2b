"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Calculator,
  Calendar,
  DollarSign,
  ExternalLink,
  Phone,
} from "lucide-react";
import { useState } from "react";

interface LoanDetailsProps {
  loanId: string;
  onBack: () => void;
}

export function LoanDetails({ loanId, onBack }: LoanDetailsProps) {
  const [extraPayment, setExtraPayment] = useState("");

  // Mock data - in real app this would come from API/state based on loanId
  const loan = {
    id: loanId,
    name: "Maybank Housing Loan",
    lender: "Maybank",
    lenderLogo: "/placeholder.svg?height=48&width=48",
    type: "Housing Loan",
    originalAmount: 350000,
    outstandingBalance: 185000,
    interestRate: 4.2,
    interestType: "Fixed",
    minimumPayment: 2850,
    nextDueDate: "2025-02-15",
    linkedAccount: "Maybank Savings Account",
    totalInterestPaid: 45000,
    progressPercentage: 47,
    loanTerm: 30,
    remainingTerm: 16,
    projectedPayoffDate: "March 2041",
  };

  const recentTransactions = [
    {
      id: "1",
      date: "2025-01-15",
      amount: 2850,
      principal: 1200,
      interest: 1650,
      balance: 185000,
    },
    {
      id: "2",
      date: "2024-12-15",
      amount: 2850,
      principal: 1180,
      interest: 1670,
      balance: 186200,
    },
    {
      id: "3",
      date: "2024-11-15",
      amount: 2850,
      principal: 1160,
      interest: 1690,
      balance: 187380,
    },
  ];

  const upcomingPayments = [
    {
      date: "2025-02-15",
      payment: 2850,
      principal: 1220,
      interest: 1630,
      remainingBalance: 183780,
    },
    {
      date: "2025-03-15",
      payment: 2850,
      principal: 1240,
      interest: 1610,
      remainingBalance: 182540,
    },
    {
      date: "2025-04-15",
      payment: 2850,
      principal: 1260,
      interest: 1590,
      remainingBalance: 181280,
    },
  ];

  const calculateExtraPaymentImpact = (extra: number) => {
    if (!extra || extra <= 0) return null;

    // Simplified calculation - in real app would use proper amortization formulas
    const monthlyRate = loan.interestRate / 100 / 12;
    const currentPayment = loan.minimumPayment;
    const newPayment = currentPayment + extra;

    // Rough estimates for demo
    const monthsSaved = Math.floor(extra / 100) * 2; // Simplified
    const interestSaved =
      monthsSaved * (loan.outstandingBalance * monthlyRate * 0.6); // Simplified
    const newPayoffDate = new Date();
    newPayoffDate.setMonth(
      newPayoffDate.getMonth() + loan.remainingTerm * 12 - monthsSaved
    );

    return {
      monthsSaved,
      interestSaved,
      newPayoffDate: newPayoffDate.toLocaleDateString("en-MY", {
        month: "long",
        year: "numeric",
      }),
    };
  };

  const extraPaymentImpact = calculateExtraPaymentImpact(
    Number.parseFloat(extraPayment) || 0
  );

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
        <div className="flex items-center gap-4 flex-1">
          <img
            src={loan.lenderLogo || "/placeholder.svg"}
            alt={loan.lender}
            className="w-12 h-12 rounded-lg border"
          />
          <div>
            <h1 className="text-2xl font-bold">{loan.name}</h1>
            <p className="text-muted-foreground">
              {loan.lender} • {loan.type}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Phone className="h-4 w-4 mr-2" />
            Contact Lender
          </Button>
          <Button variant="outline" size="sm">
            <ExternalLink className="h-4 w-4 mr-2" />
            Online Banking
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Outstanding Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              RM {loan.outstandingBalance.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              of RM {loan.originalAmount.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Interest Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loan.interestRate}%</div>
            <div className="text-sm text-muted-foreground">
              {loan.interestType}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Monthly Payment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              RM {loan.minimumPayment.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              Due {formatDate(loan.nextDueDate)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loan.progressPercentage}%</div>
            <Progress value={loan.progressPercentage} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Loan Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Loan Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-muted-foreground">
                        Original Loan Amount
                      </Label>
                      <div className="font-medium">
                        RM {loan.originalAmount.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">
                        Total Interest Paid
                      </Label>
                      <div className="font-medium">
                        RM {loan.totalInterestPaid.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">
                        Loan Term
                      </Label>
                      <div className="font-medium">{loan.loanTerm} years</div>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">
                        Remaining Term
                      </Label>
                      <div className="font-medium">
                        {loan.remainingTerm} years
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">
                        Linked Account
                      </Label>
                      <div className="font-medium">{loan.linkedAccount}</div>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">
                        Projected Payoff
                      </Label>
                      <div className="font-medium">
                        {loan.projectedPayoffDate}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Repayment Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Repayment Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Principal Paid</span>
                      <span>
                        RM{" "}
                        {(
                          loan.originalAmount - loan.outstandingBalance
                        ).toLocaleString()}
                      </span>
                    </div>
                    <Progress value={loan.progressPercentage} className="h-3" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>RM 0</span>
                      <span>RM {loan.originalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Payment Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingPayments.map((payment, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">
                              {formatDate(payment.date)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Principal: RM {payment.principal.toLocaleString()}{" "}
                              | Interest: RM {payment.interest.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            RM {payment.payment.toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Balance: RM{" "}
                            {payment.remainingBalance.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transactions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTransactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <div>
                            <div className="font-medium">
                              {formatDate(transaction.date)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Principal: RM{" "}
                              {transaction.principal.toLocaleString()} |
                              Interest: RM{" "}
                              {transaction.interest.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            -RM {transaction.amount.toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Balance: RM {transaction.balance.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="calculator" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Extra Payment Impact Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="extra-payment">
                      Extra Monthly Payment (RM)
                    </Label>
                    <Input
                      id="extra-payment"
                      type="number"
                      placeholder="Enter extra amount"
                      value={extraPayment}
                      onChange={(e) => setExtraPayment(e.target.value)}
                    />
                  </div>

                  {extraPaymentImpact && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg space-y-3">
                      <h4 className="font-medium text-green-800">
                        Impact of Extra RM {extraPayment} Monthly:
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-green-600 font-medium">
                            Time Saved
                          </div>
                          <div>{extraPaymentImpact.monthsSaved} months</div>
                        </div>
                        <div>
                          <div className="text-green-600 font-medium">
                            Interest Saved
                          </div>
                          <div>
                            RM{" "}
                            {extraPaymentImpact.interestSaved.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <div className="text-green-600 font-medium">
                            New Payoff Date
                          </div>
                          <div>{extraPaymentImpact.newPayoffDate}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full">Make a Payment</Button>
              <Button variant="outline" className="w-full">
                Set Payment Reminder
              </Button>
              <Button variant="outline" className="w-full">
                Download Statement
              </Button>
              <Button variant="outline" className="w-full">
                Edit Loan Details
              </Button>
            </CardContent>
          </Card>

          {/* Key Milestones */}
          <Card>
            <CardHeader>
              <CardTitle>Key Milestones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="text-sm">
                  <div className="font-medium">25% Principal Paid</div>
                  <div className="text-muted-foreground">Completed</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="text-sm">
                  <div className="font-medium">50% Principal Paid</div>
                  <div className="text-muted-foreground">3 years remaining</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="text-sm">
                  <div className="font-medium">75% Principal Paid</div>
                  <div className="text-muted-foreground">8 years remaining</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
