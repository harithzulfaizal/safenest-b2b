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
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft,
  Bell,
  Calendar,
  DollarSign,
  Edit2,
  ExternalLink,
  RefreshCw,
  Settings,
  Target,
  Trash2,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

interface InvestmentAccountDetailsProps {
  accountId: string;
  onBack?: () => void;
}

export function InvestmentAccountDetails({
  accountId,
  onBack,
}: InvestmentAccountDetailsProps) {
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [nickname, setNickname] = useState("");
  const [includeInNetWorth, setIncludeInNetWorth] = useState(true);
  const [rebalanceThreshold, setRebalanceThreshold] = useState("5");

  // Mock account data
  const accountData = {
    rakuten: {
      name: "Rakuten Trade",
      nickname: "My Stock Portfolio",
      institution: "Rakuten Trade Sdn Bhd",
      logo: "RT",
      type: "Brokerage",
      currentValue: 45680.3,
      todayChange: 285.5,
      todayChangePercent: 0.63,
      totalGainLoss: 8750.3,
      totalGainLossPercent: 23.7,
      lastSynced: "2 minutes ago",
      accountNumber: "RT123456789",
      performanceData: [42000, 43500, 44200, 45680],
    },
  };

  const account =
    accountData[accountId as keyof typeof accountData] || accountData.rakuten;

  const holdings = [
    {
      id: "1",
      name: "PETRONAS Chemicals Group Bhd",
      symbol: "PCHEM",
      type: "Stock",
      quantity: 1000,
      currentPrice: 8.45,
      currentValue: 8450.0,
      averageCost: 7.2,
      unrealizedGainLoss: 1250.0,
      unrealizedGainLossPercent: 17.36,
      todayChange: 0.15,
      todayChangePercent: 1.81,
      sector: "Energy",
      country: "Malaysia",
    },
    {
      id: "2",
      name: "Vanguard FTSE All-World UCITS ETF",
      symbol: "VWRA",
      type: "ETF",
      quantity: 45,
      currentPrice: 105.2,
      currentValue: 4734.0,
      averageCost: 98.5,
      unrealizedGainLoss: 301.5,
      unrealizedGainLossPercent: 6.8,
      todayChange: -0.8,
      todayChangePercent: -0.75,
      sector: "Diversified",
      country: "Global",
    },
    {
      id: "3",
      name: "Public Bank Bhd",
      symbol: "PBBANK",
      type: "Stock",
      quantity: 2000,
      currentPrice: 4.12,
      currentValue: 8240.0,
      averageCost: 3.85,
      unrealizedGainLoss: 540.0,
      unrealizedGainLossPercent: 7.01,
      todayChange: 0.02,
      todayChangePercent: 0.49,
      sector: "Financial Services",
      country: "Malaysia",
    },
    {
      id: "4",
      name: "iShares Core S&P 500 UCITS ETF",
      symbol: "CSPX",
      type: "ETF",
      quantity: 25,
      currentPrice: 520.8,
      currentValue: 13020.0,
      averageCost: 485.2,
      unrealizedGainLoss: 890.0,
      unrealizedGainLossPercent: 7.33,
      todayChange: 2.4,
      todayChangePercent: 0.46,
      sector: "Diversified",
      country: "US",
    },
  ];

  const recentActivity = [
    {
      id: "1",
      type: "buy",
      description: "Bought 100 shares of PCHEM",
      amount: -845.0,
      date: "2024-01-15",
      price: 8.45,
      quantity: 100,
    },
    {
      id: "2",
      type: "dividend",
      description: "Dividend from PBBANK",
      amount: 45.6,
      date: "2024-01-10",
      price: null,
      quantity: null,
    },
    {
      id: "3",
      type: "sell",
      description: "Sold 50 shares of VWRA",
      amount: 5260.0,
      date: "2024-01-08",
      price: 105.2,
      quantity: -50,
    },
  ];

  const handleNicknameEdit = () => {
    if (isEditingNickname) {
      setIsEditingNickname(false);
    } else {
      setNickname(account.nickname);
      setIsEditingNickname(true);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "buy":
        return <TrendingUp className="h-4 w-4 text-blue-600" />;
      case "sell":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      case "dividend":
        return <DollarSign className="h-4 w-4 text-green-600" />;
      default:
        return <Calendar className="h-4 w-4 text-gray-600" />;
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
            <h1 className="text-2xl font-bold">{account.name}</h1>
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
            Open in App
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Account Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Account Summary</span>
                <Badge variant="secondary">
                  Last synced: {account.lastSynced}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold mb-2">
                    RM{" "}
                    {account.currentValue.toLocaleString("en-MY", {
                      minimumFractionDigits: 2,
                    })}
                  </div>
                  <div className="text-lg text-muted-foreground mb-4">
                    Current Value
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      {account.todayChange > 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                      )}
                      <span
                        className={
                          account.todayChange > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {account.todayChange > 0 ? "+" : ""}RM{" "}
                        {Math.abs(account.todayChange).toFixed(2)} (
                        {account.todayChange > 0 ? "+" : ""}
                        {account.todayChangePercent.toFixed(2)}%) today
                      </span>
                    </div>

                    <div className="text-sm">
                      <span className="text-green-600 font-medium">
                        Total Gain: +RM{" "}
                        {account.totalGainLoss.toLocaleString("en-MY", {
                          minimumFractionDigits: 2,
                        })}
                        (+{account.totalGainLossPercent.toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Performance (Last 4 Months)
                  </div>
                  <div className="h-32 bg-gray-50 rounded flex items-end justify-center space-x-2 p-4">
                    {account.performanceData.map((value, index) => (
                      <div
                        key={index}
                        className="bg-blue-500 rounded-sm w-8"
                        style={{
                          height: `${
                            (value / Math.max(...account.performanceData)) * 80
                          }px`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground text-center mt-2">
                    Consistent growth over the past 4 months
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Holdings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Holdings ({holdings.length})</span>
                <div className="flex items-center space-x-2">
                  <Select defaultValue="value">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="value">Sort by Value</SelectItem>
                      <SelectItem value="gain">Sort by Gain</SelectItem>
                      <SelectItem value="name">Sort by Name</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {holdings.map((holding) => (
                  <div
                    key={holding.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                      <div className="md:col-span-2">
                        <div className="font-semibold">{holding.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {holding.symbol} • {holding.type} • {holding.sector}
                        </div>
                        <Badge variant="outline" className="text-xs mt-1">
                          {holding.country}
                        </Badge>
                      </div>

                      <div className="text-center">
                        <div className="font-medium">
                          {holding.quantity.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Units
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="font-medium">
                          RM {holding.currentPrice.toFixed(2)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Avg: RM {holding.averageCost.toFixed(2)}
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="font-semibold">
                          RM{" "}
                          {holding.currentValue.toLocaleString("en-MY", {
                            minimumFractionDigits: 2,
                          })}
                        </div>
                        <div
                          className={`text-xs ${
                            holding.todayChange > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {holding.todayChange > 0 ? "+" : ""}RM{" "}
                          {Math.abs(holding.todayChange).toFixed(2)} (
                          {holding.todayChange > 0 ? "+" : ""}
                          {holding.todayChangePercent.toFixed(2)}%)
                        </div>
                      </div>

                      <div className="text-right">
                        <div
                          className={`font-semibold ${
                            holding.unrealizedGainLoss > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {holding.unrealizedGainLoss > 0 ? "+" : ""}RM{" "}
                          {Math.abs(holding.unrealizedGainLoss).toFixed(2)}
                        </div>
                        <div
                          className={`text-xs ${
                            holding.unrealizedGainLoss > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          ({holding.unrealizedGainLoss > 0 ? "+" : ""}
                          {holding.unrealizedGainLossPercent.toFixed(2)}%)
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      {getActivityIcon(activity.type)}
                      <div>
                        <div className="font-medium text-sm">
                          {activity.description}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {activity.date}
                          {activity.price &&
                            ` • RM ${activity.price.toFixed(2)}`}
                          {activity.quantity &&
                            ` • ${Math.abs(activity.quantity)} units`}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`font-semibold ${
                        activity.amount > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {activity.amount > 0 ? "+" : ""}RM{" "}
                      {Math.abs(activity.amount).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Account Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Account Settings</span>
              </CardTitle>
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
                  <Switch
                    checked={includeInNetWorth}
                    onCheckedChange={setIncludeInNetWorth}
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm">Account Number</Label>
                <div className="text-sm font-mono mt-1">
                  {account.accountNumber}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rebalancing Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Rebalancing</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm">Alert Threshold</Label>
                <Select
                  value={rebalanceThreshold}
                  onValueChange={setRebalanceThreshold}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3% deviation</SelectItem>
                    <SelectItem value="5">5% deviation</SelectItem>
                    <SelectItem value="10">10% deviation</SelectItem>
                    <SelectItem value="15">15% deviation</SelectItem>
                  </SelectContent>
                </Select>
                <div className="text-xs text-muted-foreground mt-1">
                  Get notified when holdings deviate from target allocation
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm">Rebalancing Alerts</Label>
                <Switch defaultChecked />
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
                <DollarSign className="h-4 w-4 mr-2" />
                Make Deposit
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Brokerage App
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Bell className="h-4 w-4 mr-2" />
                Set Price Alerts
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
        </div>
      </div>
    </div>
  );
}
