"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  BarChart3,
  Bell,
  DollarSign,
  ExternalLink,
  PieChart,
  Plus,
  RefreshCw,
  Target,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface InvestmentOverviewProps {
  onNavigateToAccount?: (accountId: string) => void;
  onNavigateToAllHoldings?: () => void;
  onNavigateToAddAccount?: () => void;
}

export function InvestmentOverview({
  onNavigateToAccount,
  onNavigateToAllHoldings,
  onNavigateToAddAccount,
}: InvestmentOverviewProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("1M");

  const portfolioData = {
    totalValue: 125680.3,
    todayChange: 450.25,
    todayChangePercent: 0.36,
    monthChange: 2450.8,
    monthChangePercent: 1.98,
    totalGainLoss: 18750.3,
    totalGainLossPercent: 17.52,
    totalDeposits: 107000,
    marketGrowth: 18680.3,
  };

  const performanceData = [
    { period: "1W", value: 124230 },
    { period: "2W", value: 123890 },
    { period: "3W", value: 125100 },
    { period: "1M", value: 125680 },
  ];

  const benchmarkData = [
    { period: "1W", value: 1580 },
    { period: "2W", value: 1575 },
    { period: "3W", value: 1590 },
    { period: "1M", value: 1595 },
  ];

  const assetAllocation = [
    {
      name: "Equities",
      value: 75680.3,
      percentage: 60.2,
      color: "bg-blue-500",
    },
    {
      name: "Unit Trusts",
      value: 25150.5,
      percentage: 20.0,
      color: "bg-green-500",
    },
    {
      name: "Fixed Income",
      value: 15120.25,
      percentage: 12.0,
      color: "bg-yellow-500",
    },
    { name: "Crypto", value: 6280.15, percentage: 5.0, color: "bg-purple-500" },
    { name: "Cash", value: 3449.1, percentage: 2.8, color: "bg-gray-500" },
  ];

  const investmentAccounts = [
    {
      id: "rakuten",
      name: "Rakuten Trade",
      institution: "Rakuten Trade Sdn Bhd",
      logo: "RT",
      type: "Brokerage",
      currentValue: 45680.3,
      todayChange: 285.5,
      todayChangePercent: 0.63,
      totalGainLoss: 8750.3,
      totalGainLossPercent: 23.7,
      lastSynced: "2 minutes ago",
    },
    {
      id: "versa",
      name: "Versa Invest",
      institution: "Versa",
      logo: "VI",
      type: "Robo-Advisor",
      currentValue: 28450.2,
      todayChange: 125.75,
      todayChangePercent: 0.44,
      totalGainLoss: 3450.2,
      totalGainLossPercent: 13.8,
      lastSynced: "5 minutes ago",
    },
    {
      id: "asb",
      name: "ASB Investment",
      institution: "Amanah Saham",
      logo: "AS",
      type: "Unit Trust",
      currentValue: 25250.1,
      todayChange: 0,
      todayChangePercent: 0,
      totalGainLoss: 2250.1,
      totalGainLossPercent: 9.8,
      lastSynced: "1 day ago",
    },
    {
      id: "epf",
      name: "EPF Account 1",
      institution: "EPF",
      logo: "EPF",
      type: "Retirement Fund",
      currentValue: 26299.7,
      todayChange: 39.0,
      todayChangePercent: 0.15,
      totalGainLoss: 4299.7,
      totalGainLossPercent: 19.5,
      lastSynced: "1 day ago",
    },
  ];

  const notifications = [
    {
      id: "1",
      type: "dividend",
      title: "EPF dividend for 2023 announced!",
      description: "5.5% dividend rate declared for conventional savings",
      time: "2 hours ago",
      isNew: true,
    },
    {
      id: "2",
      type: "update",
      title: "Your ASB account has been updated",
      description: "Latest NAV and unit balance synchronized",
      time: "1 day ago",
      isNew: false,
    },
    {
      id: "3",
      type: "dividend",
      title: "Dividend received from MAYBANK",
      description: "RM 45.60 dividend credited to your account",
      time: "3 days ago",
      isNew: false,
    },
    {
      id: "4",
      type: "alert",
      title: "Portfolio concentration alert",
      description:
        "Your portfolio is becoming over-concentrated in Technology sector (35%)",
      time: "1 week ago",
      isNew: false,
    },
  ];

  const growthAssets = assetAllocation
    .filter((asset) => ["Equities", "Crypto"].includes(asset.name))
    .reduce((sum, asset) => sum + asset.percentage, 0);

  const defensiveAssets = 100 - growthAssets;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "dividend":
        return <DollarSign className="h-4 w-4 text-green-600" />;
      case "update":
        return <RefreshCw className="h-4 w-4 text-blue-600" />;
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const chartData = [
    { month: "Jan", portfolioValue: 120000, contributions: 100000 },
    { month: "Feb", portfolioValue: 121000, contributions: 101000 },
    { month: "Mar", portfolioValue: 122000, contributions: 102000 },
    { month: "Apr", portfolioValue: 123000, contributions: 103000 },
    { month: "May", portfolioValue: 124000, contributions: 104000 },
    { month: "Jun", portfolioValue: 125000, contributions: 105000 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Investment Overview</h1>
          <p className="text-muted-foreground">
            Track your investment portfolio performance and growth
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh All
          </Button>
          <Button onClick={onNavigateToAddAccount}>
            <Plus className="h-4 w-4 mr-2" />
            Add Investment Account
          </Button>
        </div>
      </div>

      {/* Total Investment Value */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="text-4xl font-bold text-blue-900 mb-2">
                RM{" "}
                {portfolioData.totalValue.toLocaleString("en-MY", {
                  minimumFractionDigits: 2,
                })}
              </div>
              <div className="text-lg text-muted-foreground mb-4">
                Total Investment Value
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  {portfolioData.todayChange > 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                  )}
                  <span
                    className={
                      portfolioData.todayChange > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {portfolioData.todayChange > 0 ? "+" : ""}RM{" "}
                    {Math.abs(portfolioData.todayChange).toFixed(2)} (
                    {portfolioData.todayChange > 0 ? "+" : ""}
                    {portfolioData.todayChangePercent.toFixed(2)}%) today
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  {portfolioData.monthChange > 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                  )}
                  <span
                    className={
                      portfolioData.monthChange > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {portfolioData.monthChange > 0 ? "+" : ""}RM{" "}
                    {Math.abs(portfolioData.monthChange).toFixed(2)} (
                    {portfolioData.monthChange > 0 ? "+" : ""}
                    {portfolioData.monthChangePercent.toFixed(2)}%) this month
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="text-2xl font-bold text-green-600">
                  +RM{" "}
                  {portfolioData.totalGainLoss.toLocaleString("en-MY", {
                    minimumFractionDigits: 2,
                  })}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Gain (+{portfolioData.totalGainLossPercent.toFixed(2)}%
                  since inception)
                </div>
              </div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground mb-2">
                Portfolio Growth vs Deposits
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="portfolioValue"
                    stroke="#8884d8"
                    name="Portfolio Value"
                  />
                  <Line
                    type="monotone"
                    dataKey="contributions"
                    stroke="#82ca9d"
                    name="Total Contributions"
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                <div>
                  <span className="text-muted-foreground">
                    Total Deposits:{" "}
                  </span>
                  <span className="font-semibold">
                    RM {portfolioData.totalDeposits.toLocaleString("en-MY")}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Market Growth: </span>
                  <span className="font-semibold text-green-600">
                    RM {portfolioData.marketGrowth.toLocaleString("en-MY")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Portfolio Allocation */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Portfolio Allocation</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={onNavigateToAllHoldings}
            >
              <PieChart className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-48 bg-gray-50 rounded flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {growthAssets.toFixed(0)}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Growth Assets
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {defensiveAssets.toFixed(0)}% Defensive Assets
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {assetAllocation.map((asset, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${asset.color}`} />
                      <span className="text-sm font-medium">{asset.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold">
                        RM{" "}
                        {asset.value.toLocaleString("en-MY", {
                          minimumFractionDigits: 0,
                        })}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {asset.percentage.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t text-sm text-muted-foreground">
                <p>
                  Your portfolio is primarily allocated to{" "}
                  <span className="font-medium text-blue-600">Equities</span> (
                  {assetAllocation[0].percentage.toFixed(1)}%)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Investment Updates</span>
              <Badge variant="secondary">
                {notifications.filter((n) => n.isNew).length} new
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg border ${
                    notification.isNew
                      ? "bg-blue-50 border-blue-200"
                      : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-sm">
                          {notification.title}
                        </h4>
                        {notification.isNew && (
                          <Badge variant="default" className="text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Investment Accounts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Investment Accounts</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <BarChart3 className="h-4 w-4 mr-2" />
              Compare Performance
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onNavigateToAddAccount}
            >
              <Plus className="h-4 w-4 mr-2" />
              Link Account
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {investmentAccounts.map((account) => (
              <Card
                key={account.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onNavigateToAccount?.(account.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-700">
                          {account.logo}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold">{account.name}</h4>
                        <div className="text-sm text-muted-foreground">
                          {account.institution}
                        </div>
                        <Badge variant="outline" className="text-xs mt-1">
                          {account.type}
                        </Badge>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </div>

                  <div className="space-y-2">
                    <div className="text-2xl font-bold">
                      RM{" "}
                      {account.currentValue.toLocaleString("en-MY", {
                        minimumFractionDigits: 2,
                      })}
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        {account.todayChange > 0 ? (
                          <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                        ) : account.todayChange < 0 ? (
                          <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                        ) : null}
                        <span
                          className={
                            account.todayChange > 0
                              ? "text-green-600"
                              : account.todayChange < 0
                              ? "text-red-600"
                              : "text-gray-600"
                          }
                        >
                          {account.todayChange !== 0 &&
                            (account.todayChange > 0 ? "+" : "")}
                          {account.todayChange !== 0
                            ? `RM ${Math.abs(account.todayChange).toFixed(2)}`
                            : "No change"}
                          {account.todayChange !== 0 &&
                            ` (${
                              account.todayChange > 0 ? "+" : ""
                            }${account.todayChangePercent.toFixed(2)}%)`}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Today
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="text-green-600 font-medium">
                        +RM{" "}
                        {account.totalGainLoss.toLocaleString("en-MY", {
                          minimumFractionDigits: 2,
                        })}
                        (+{account.totalGainLossPercent.toFixed(1)}%)
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Total Gain
                      </span>
                    </div>

                    <div className="pt-2 border-t text-xs text-muted-foreground">
                      Last synced: {account.lastSynced}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={onNavigateToAddAccount}
            >
              <Plus className="h-5 w-5" />
              <span className="text-xs">Add Account</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
            >
              <DollarSign className="h-5 w-5" />
              <span className="text-xs">Make Deposit</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={onNavigateToAllHoldings}
            >
              <PieChart className="h-5 w-5" />
              <span className="text-xs">View All Holdings</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
            >
              <Target className="h-5 w-5" />
              <span className="text-xs">Set Targets</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
