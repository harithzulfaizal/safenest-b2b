"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  AlertCircle,
  CheckCircle,
  CreditCard,
  FileText,
  PiggyBankIcon as Investment,
  Plus,
  RefreshCw,
  TrendingDown,
  TrendingUp,
  Wallet,
  XCircle,
} from "lucide-react";

interface AccountsOverviewProps {
  onNavigateToAccount?: (accountId: string) => void;
  onNavigateToAddAccount?: () => void;
}

export function AccountsOverview({
  onNavigateToAccount,
  onNavigateToAddAccount,
}: AccountsOverviewProps) {
  const netWorth = {
    total: 287450.89,
    change: 2450.5,
    changePercent: 0.86,
    trend: [285000, 286200, 287450, 287000, 288000, 287450], // Simplified trend data
  };

  const accountGroups = [
    {
      id: "cash-bank",
      title: "Cash & Bank Accounts",
      icon: Wallet,
      total: 45231.89,
      count: 4,
      accounts: [
        {
          id: "maybank-savings",
          nickname: "My Savings",
          institution: "Maybank",
          type: "Savings Account",
          lastFour: "1234",
          balance: 25430.5,
          status: "connected",
          lastUpdated: "2 minutes ago",
        },
        {
          id: "cimb-current",
          nickname: "Daily Spending",
          institution: "CIMB Bank",
          type: "Current Account",
          lastFour: "5678",
          balance: 8750.25,
          status: "connected",
          lastUpdated: "5 minutes ago",
        },
        {
          id: "public-savings",
          nickname: "Emergency Fund",
          institution: "Public Bank",
          type: "Savings Account",
          lastFour: "9012",
          balance: 10051.14,
          status: "needs-auth",
          lastUpdated: "2 days ago",
        },
        {
          id: "cash-wallet",
          nickname: "Cash on Hand",
          institution: "Manual",
          type: "Cash",
          lastFour: "",
          balance: 1000.0,
          status: "manual",
          lastUpdated: "1 week ago",
        },
      ],
    },
    {
      id: "credit",
      title: "Credit Accounts",
      icon: CreditCard,
      total: -15680.45,
      count: 3,
      accounts: [
        {
          id: "amex-business",
          nickname: "Business Card",
          institution: "American Express",
          type: "Credit Card",
          lastFour: "3456",
          balance: -8450.3,
          creditLimit: 15000,
          status: "connected",
          lastUpdated: "1 hour ago",
        },
        {
          id: "maybank-credit",
          nickname: "Personal Card",
          institution: "Maybank",
          type: "Credit Card",
          lastFour: "7890",
          balance: -3230.15,
          creditLimit: 8000,
          status: "connected",
          lastUpdated: "30 minutes ago",
        },
        {
          id: "car-loan",
          nickname: "Car Loan",
          institution: "RHB Bank",
          type: "Auto Loan",
          lastFour: "2468",
          balance: -4000.0,
          status: "error",
          lastUpdated: "3 days ago",
        },
      ],
    },
    {
      id: "investments",
      title: "Investments",
      icon: Investment,
      total: 125680.3,
      count: 3,
      accounts: [
        {
          id: "epf-account",
          nickname: "EPF Account 1",
          institution: "EPF",
          type: "Retirement Fund",
          lastFour: "1357",
          balance: 85430.2,
          status: "connected",
          lastUpdated: "1 day ago",
        },
        {
          id: "asb-account",
          nickname: "ASB Investment",
          institution: "Amanah Saham",
          type: "Unit Trust",
          lastFour: "2468",
          balance: 25250.1,
          status: "connected",
          lastUpdated: "1 day ago",
        },
        {
          id: "robo-advisor",
          nickname: "Robo Portfolio",
          institution: "StashAway",
          type: "Robo Advisor",
          lastFour: "9876",
          balance: 15000.0,
          status: "connected",
          lastUpdated: "4 hours ago",
        },
      ],
    },
    {
      id: "other",
      title: "Other Accounts",
      icon: FileText,
      total: 5000.0,
      count: 1,
      accounts: [
        {
          id: "property-value",
          nickname: "Property Estimate",
          institution: "Manual",
          type: "Real Estate",
          lastFour: "",
          balance: 5000.0,
          status: "manual",
          lastUpdated: "1 month ago",
        },
      ],
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="h-3 w-3 text-green-500" />;
      case "needs-auth":
        return <AlertCircle className="h-3 w-3 text-yellow-500" />;
      case "error":
        return <XCircle className="h-3 w-3 text-red-500" />;
      case "manual":
        return <FileText className="h-3 w-3 text-blue-500" />;
      default:
        return <CheckCircle className="h-3 w-3 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "border-l-green-500";
      case "needs-auth":
        return "border-l-yellow-500";
      case "error":
        return "border-l-red-500";
      case "manual":
        return "border-l-blue-500";
      default:
        return "border-l-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Net Worth Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Total Net Worth</span>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh All
              </Button>
              <Button size="sm" onClick={onNavigateToAddAccount}>
                <Plus className="h-4 w-4 mr-2" />
                Add Account
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-4xl font-bold text-blue-900">
                RM{" "}
                {netWorth.total.toLocaleString("en-MY", {
                  minimumFractionDigits: 2,
                })}
              </div>
              <div className="flex items-center mt-2 text-sm">
                {netWorth.change > 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                )}
                <span
                  className={
                    netWorth.change > 0 ? "text-green-600" : "text-red-600"
                  }
                >
                  {netWorth.change > 0 ? "+" : ""}RM{" "}
                  {Math.abs(netWorth.change).toLocaleString("en-MY", {
                    minimumFractionDigits: 2,
                  })}
                  ({netWorth.changePercent > 0 ? "+" : ""}
                  {netWorth.changePercent}%) from last month
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground mb-2">
                6-month trend
              </div>
              <div className="w-32 h-16 bg-blue-100 rounded p-2">
                <svg viewBox="0 0 120 40" className="w-full h-full">
                  <polyline
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    points="10,30 30,25 50,20 70,15 90,18 110,10"
                  />
                  {netWorth.trend.map((value, index) => (
                    <circle
                      key={index}
                      cx={10 + index * 20}
                      cy={40 - (value / Math.max(...netWorth.trend)) * 30}
                      r="2"
                      fill="#3b82f6"
                    />
                  ))}
                </svg>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Jul - Dec 2024
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Groups */}
      <div className="space-y-6">
        {accountGroups.map((group) => (
          <Card key={group.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <group.icon className="h-5 w-5" />
                  <span>{group.title}</span>
                  <Badge variant="secondary">{group.count} accounts</Badge>
                </div>
                <div className="text-right">
                  <div
                    className={`text-lg font-semibold ${
                      group.total < 0 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    RM{" "}
                    {Math.abs(group.total).toLocaleString("en-MY", {
                      minimumFractionDigits: 2,
                    })}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total {group.title.toLowerCase()}
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {group.accounts.map((account) => (
                  <Card
                    key={account.id}
                    className={`cursor-pointer hover:shadow-md transition-shadow border-l-4 ${getStatusColor(
                      account.status
                    )}`}
                    onClick={() => onNavigateToAccount?.(account.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium">
                              {account.institution
                                .substring(0, 2)
                                .toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium">
                              {account.nickname}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {account.institution} • {account.type}
                              {account.lastFour && ` • ****${account.lastFour}`}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`text-lg font-semibold ${
                              account.balance < 0
                                ? "text-red-600"
                                : "text-green-600"
                            }`}
                          >
                            RM{" "}
                            {Math.abs(account.balance).toLocaleString("en-MY", {
                              minimumFractionDigits: 2,
                            })}
                          </div>
                          {account.creditLimit && (
                            <div className="text-xs text-muted-foreground">
                              Limit: RM{" "}
                              {account.creditLimit.toLocaleString("en-MY")}
                              <Progress
                                value={
                                  (Math.abs(account.balance) /
                                    account.creditLimit) *
                                  100
                                }
                                className="w-20 h-1 mt-1"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t">
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          {getStatusIcon(account.status)}
                          <span>Last updated: {account.lastUpdated}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {account.status === "needs-auth" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs"
                            >
                              Re-authenticate
                            </Button>
                          )}
                          {account.status === "error" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs"
                            >
                              Fix Connection
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
