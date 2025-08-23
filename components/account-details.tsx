"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  CreditCard,
  DollarSign,
  Download,
  Edit2,
  ExternalLink,
  Eye,
  EyeOff,
  Percent,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { useState } from "react";

interface AccountDetailsProps {
  accountId: string;
  onBack?: () => void;
}

export function AccountDetails({ accountId, onBack }: AccountDetailsProps) {
  const [showFullAccountNumber, setShowFullAccountNumber] = useState(false);
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [nickname, setNickname] = useState("");

  // Mock account data - in real app, this would be fetched based on accountId
  const accountData = {
    "maybank-savings": {
      nickname: "My Savings",
      institution: "Maybank",
      institutionLogo: "MB",
      type: "Savings Account",
      accountNumber: "1234567890123456",
      lastFour: "1234",
      currentBalance: 25430.5,
      availableBalance: 25430.5,
      interestRate: 2.5,
      lastSynced: "2 minutes ago",
      status: "connected",
      settings: {
        includeInNetWorth: true,
        hideFromOverview: false,
        isPrimary: true,
      },
      balanceHistory: [24000, 24500, 25000, 25430],
    },
    "amex-business": {
      nickname: "Business Card",
      institution: "American Express",
      institutionLogo: "AX",
      type: "Credit Card",
      accountNumber: "3456789012345678",
      lastFour: "3456",
      currentBalance: -8450.3,
      availableBalance: 6549.7,
      creditLimit: 15000,
      minimumPayment: 250.0,
      nextPaymentDate: "2025-02-15",
      interestRate: 18.9,
      lastSynced: "1 hour ago",
      status: "connected",
      settings: {
        includeInNetWorth: true,
        hideFromOverview: false,
        isPrimary: false,
      },
      balanceHistory: [-7000, -7500, -8000, -8450],
    },
  };

  const account =
    accountData[accountId as keyof typeof accountData] ||
    accountData["maybank-savings"];

  const handleNicknameEdit = () => {
    if (isEditingNickname) {
      // Save nickname logic here
      setIsEditingNickname(false);
    } else {
      setNickname(account.nickname);
      setIsEditingNickname(true);
    }
  };

  const isCreditCard = account.type === "Credit Card";
  const utilizationPercentage = isCreditCard
    ? (Math.abs(account.currentBalance) / account.creditLimit!) * 100
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Accounts
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{account.nickname}</h1>
            <p className="text-muted-foreground">
              {account.institution} • {account.type}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <ExternalLink className="h-4 w-4 mr-2" />
            Bank Website
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Account Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Account Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Account Summary</span>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <Badge variant="secondary">Connected</Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm text-muted-foreground">
                    Current Balance
                  </Label>
                  <div
                    className={`text-3xl font-bold ${
                      account.currentBalance < 0
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    RM{" "}
                    {Math.abs(account.currentBalance).toLocaleString("en-MY", {
                      minimumFractionDigits: 2,
                    })}
                  </div>
                </div>
                {isCreditCard ? (
                  <div>
                    <Label className="text-sm text-muted-foreground">
                      Available Credit
                    </Label>
                    <div className="text-2xl font-bold text-blue-600">
                      RM{" "}
                      {account.availableBalance!.toLocaleString("en-MY", {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      of RM {account.creditLimit!.toLocaleString("en-MY")} limit
                    </div>
                  </div>
                ) : (
                  <div>
                    <Label className="text-sm text-muted-foreground">
                      Available Balance
                    </Label>
                    <div className="text-2xl font-bold text-green-600">
                      RM{" "}
                      {account.availableBalance!.toLocaleString("en-MY", {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Account Number</Label>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm">
                      {showFullAccountNumber
                        ? account.accountNumber
                        : `****${account.lastFour}`}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setShowFullAccountNumber(!showFullAccountNumber)
                      }
                    >
                      {showFullAccountNumber ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Last Synced</Label>
                  <span className="text-sm text-muted-foreground">
                    {account.lastSynced}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account-Specific Details */}
          <Card>
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
            </CardHeader>
            <CardContent>
              {isCreditCard ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <Label className="text-sm">Credit Limit</Label>
                        <div className="font-semibold">
                          RM {account.creditLimit!.toLocaleString("en-MY")}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Percent className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <Label className="text-sm">Interest Rate (APR)</Label>
                        <div className="font-semibold">
                          {account.interestRate}%
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <DollarSign className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <Label className="text-sm">Minimum Payment</Label>
                        <div className="font-semibold">
                          RM{" "}
                          {account.minimumPayment!.toLocaleString("en-MY", {
                            minimumFractionDigits: 2,
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <Label className="text-sm">Next Payment Due</Label>
                        <div className="font-semibold">
                          {account.nextPaymentDate}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Label className="text-sm">Credit Utilization</Label>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-2xl font-bold">
                        {utilizationPercentage.toFixed(1)}%
                      </span>
                      <span
                        className={`text-sm ${
                          utilizationPercentage > 30
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {utilizationPercentage > 30
                          ? "Above recommended 30%"
                          : "Within recommended range"}
                      </span>
                    </div>
                    <Progress value={utilizationPercentage} className="mt-2" />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Percent className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <Label className="text-sm">Interest Rate</Label>
                      <div className="font-semibold">
                        {account.interestRate}% p.a.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Balance History */}
          <Card>
            <CardHeader>
              <CardTitle>Balance History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-32 bg-gray-50 rounded flex items-end justify-center space-x-2 p-4">
                {account.balanceHistory.map((balance, index) => (
                  <div
                    key={index}
                    className="bg-blue-500 rounded-sm"
                    style={{
                      height: `${
                        (Math.abs(balance) /
                          Math.max(...account.balanceHistory.map(Math.abs))) *
                        100
                      }%`,
                      width: "20px",
                    }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>3 months ago</span>
                <span>2 months ago</span>
                <span>1 month ago</span>
                <span>Current</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Settings Sidebar */}
        <div className="space-y-6">
          {/* Account Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm">Account Nickname</Label>
                <div className="flex items-center space-x-2 mt-1">
                  {isEditingNickname ? (
                    <Input
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      className="flex-1"
                    />
                  ) : (
                    <span className="flex-1 font-medium">
                      {account.nickname}
                    </span>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleNicknameEdit}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Include in Net Worth</Label>
                  <Switch defaultChecked={account.settings.includeInNetWorth} />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Hide from Overview</Label>
                  <Switch defaultChecked={account.settings.hideFromOverview} />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Primary Account</Label>
                  <Switch defaultChecked={account.settings.isPrimary} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Export Transactions
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Transactions
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Disconnect Account
              </Button>
            </CardContent>
          </Card>

          {/* Connection Status */}
          <Card>
            <CardHeader>
              <CardTitle>Connection Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <div className="font-medium text-green-700">Connected</div>
                  <div className="text-sm text-muted-foreground">
                    Last synced: {account.lastSynced}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
