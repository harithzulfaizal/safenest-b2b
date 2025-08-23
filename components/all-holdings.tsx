"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  DollarSign,
  Download,
  Search,
  Target,
} from "lucide-react";
import { useState } from "react";

interface AllHoldingsProps {
  onBack?: () => void;
}

export function AllHoldings({ onBack }: AllHoldingsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAssetType, setSelectedAssetType] = useState("all");
  const [selectedSector, setSelectedSector] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [sortBy, setSortBy] = useState("value");
  const [selectedHoldings, setSelectedHoldings] = useState<string[]>([]);
  const [viewType, setViewType] = useState("list");

  const allHoldings = [
    {
      id: "1",
      name: "PETRONAS Chemicals Group Bhd",
      symbol: "PCHEM",
      type: "Stock",
      account: "Rakuten Trade",
      accountIcon: "RT",
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
      currency: "MYR",
      weight: 6.7,
    },
    {
      id: "2",
      name: "Vanguard FTSE All-World UCITS ETF",
      symbol: "VWRA",
      type: "ETF",
      account: "Rakuten Trade",
      accountIcon: "RT",
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
      currency: "USD",
      weight: 3.8,
    },
    {
      id: "3",
      name: "Public Bank Bhd",
      symbol: "PBBANK",
      type: "Stock",
      account: "Rakuten Trade",
      accountIcon: "RT",
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
      currency: "MYR",
      weight: 6.6,
    },
    {
      id: "4",
      name: "ASB Fixed Price",
      symbol: "ASB",
      type: "Unit Trust",
      account: "ASB Investment",
      accountIcon: "AS",
      quantity: 25250.1,
      currentPrice: 1.0,
      currentValue: 25250.1,
      averageCost: 1.0,
      unrealizedGainLoss: 2250.1,
      unrealizedGainLossPercent: 9.8,
      todayChange: 0,
      todayChangePercent: 0,
      sector: "Diversified",
      country: "Malaysia",
      currency: "MYR",
      weight: 20.1,
    },
    {
      id: "5",
      name: "Versa Global Equity Fund",
      symbol: "VGEF",
      type: "Robo-Advisor",
      account: "Versa Invest",
      accountIcon: "VI",
      quantity: 1425.3,
      currentPrice: 19.95,
      currentValue: 28450.2,
      averageCost: 17.54,
      unrealizedGainLoss: 3450.2,
      unrealizedGainLossPercent: 13.8,
      todayChange: 0.25,
      todayChangePercent: 1.27,
      sector: "Diversified",
      country: "Global",
      currency: "USD",
      weight: 22.6,
    },
  ];

  const portfolioAllocation = {
    assetClass: [
      {
        name: "Equities",
        value: 75680.3,
        percentage: 60.2,
        color: "bg-blue-500",
      },
      {
        name: "Unit Trusts",
        value: 25250.1,
        percentage: 20.1,
        color: "bg-green-500",
      },
      {
        name: "ETFs",
        value: 15120.25,
        percentage: 12.0,
        color: "bg-yellow-500",
      },
      {
        name: "Robo-Advisor",
        value: 10129.65,
        percentage: 8.1,
        color: "bg-purple-500",
      },
    ],
    sector: [
      {
        name: "Technology",
        value: 35240.5,
        percentage: 28.0,
        color: "bg-blue-600",
      },
      {
        name: "Financial Services",
        value: 28450.2,
        percentage: 22.6,
        color: "bg-green-600",
      },
      { name: "Energy", value: 18750.3, percentage: 14.9, color: "bg-red-600" },
      {
        name: "Healthcare",
        value: 15680.4,
        percentage: 12.5,
        color: "bg-purple-600",
      },
      {
        name: "Consumer Goods",
        value: 12450.8,
        percentage: 9.9,
        color: "bg-yellow-600",
      },
      {
        name: "Others",
        value: 15107.8,
        percentage: 12.1,
        color: "bg-gray-600",
      },
    ],
    geography: [
      {
        name: "Malaysia",
        value: 62450.3,
        percentage: 49.7,
        color: "bg-red-500",
      },
      {
        name: "United States",
        value: 35680.2,
        percentage: 28.4,
        color: "bg-blue-500",
      },
      {
        name: "Europe",
        value: 15250.4,
        percentage: 12.1,
        color: "bg-green-500",
      },
      {
        name: "Asia Ex-Malaysia",
        value: 8450.6,
        percentage: 6.7,
        color: "bg-yellow-500",
      },
      {
        name: "Others",
        value: 3848.8,
        percentage: 3.1,
        color: "bg-purple-500",
      },
    ],
    currency: [
      { name: "MYR", value: 87700.4, percentage: 69.8, color: "bg-red-500" },
      { name: "USD", value: 28450.2, percentage: 22.6, color: "bg-blue-500" },
      { name: "EUR", value: 6250.3, percentage: 5.0, color: "bg-green-500" },
      {
        name: "Others",
        value: 3279.4,
        percentage: 2.6,
        color: "bg-yellow-500",
      },
    ],
  };

  const riskMetrics = {
    concentrationRisk: "Moderate",
    topHoldingsPercentage: 49.3,
    diversificationScore: "Good",
    sectorConcentration: "Technology sector represents 28% of portfolio",
  };

  const dividendSummary = {
    totalReceived: 1250.8,
    projectedAnnual: 3850.4,
    yieldPercentage: 3.1,
    upcomingPayments: [
      { name: "PBBANK", amount: 45.6, date: "2024-02-15" },
      { name: "PCHEM", amount: 28.5, date: "2024-02-28" },
      { name: "ASB", amount: 125.3, date: "2024-03-31" },
    ],
  };

  const filteredHoldings = allHoldings
    .filter((holding) => {
      const matchesSearch =
        holding.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        holding.symbol.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesAssetType =
        selectedAssetType === "all" || holding.type === selectedAssetType;
      const matchesSector =
        selectedSector === "all" || holding.sector === selectedSector;
      const matchesCountry =
        selectedCountry === "all" || holding.country === selectedCountry;

      return (
        matchesSearch && matchesAssetType && matchesSector && matchesCountry
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "value":
          return b.currentValue - a.currentValue;
        case "gain":
          return b.unrealizedGainLossPercent - a.unrealizedGainLossPercent;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const handleHoldingSelect = (holdingId: string) => {
    setSelectedHoldings((prev) =>
      prev.includes(holdingId)
        ? prev.filter((id) => id !== holdingId)
        : [...prev, holdingId]
    );
  };

  const totalValue = allHoldings.reduce(
    (sum, holding) => sum + holding.currentValue,
    0
  );

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
            <h1 className="text-2xl font-bold">
              All Holdings & Portfolio Analysis
            </h1>
            <p className="text-muted-foreground">
              Comprehensive view of your investment portfolio
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline" size="sm">
            <Target className="h-4 w-4 mr-2" />
            Set Targets
          </Button>
        </div>
      </div>

      {/* Portfolio Summary */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-700">
                RM{" "}
                {totalValue.toLocaleString("en-MY", {
                  minimumFractionDigits: 2,
                })}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Portfolio Value
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-700">
                {allHoldings.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Holdings
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-700">
                {dividendSummary.yieldPercentage}%
              </div>
              <div className="text-sm text-muted-foreground">
                Portfolio Yield
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-700">
                {riskMetrics.diversificationScore}
              </div>
              <div className="text-sm text-muted-foreground">
                Diversification Score
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search holdings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={selectedAssetType}
              onValueChange={setSelectedAssetType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Asset Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Stock">Stocks</SelectItem>
                <SelectItem value="ETF">ETFs</SelectItem>
                <SelectItem value="Unit Trust">Unit Trusts</SelectItem>
                <SelectItem value="Robo-Advisor">Robo-Advisor</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedSector} onValueChange={setSelectedSector}>
              <SelectTrigger>
                <SelectValue placeholder="Sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sectors</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Financial Services">
                  Financial Services
                </SelectItem>
                <SelectItem value="Energy">Energy</SelectItem>
                <SelectItem value="Healthcare">Healthcare</SelectItem>
                <SelectItem value="Diversified">Diversified</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger>
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                <SelectItem value="Malaysia">Malaysia</SelectItem>
                <SelectItem value="Global">Global</SelectItem>
                <SelectItem value="US">United States</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="value">Sort by Value</SelectItem>
                <SelectItem value="gain">Sort by Gain/Loss</SelectItem>
                <SelectItem value="name">Sort by Name</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex space-x-2">
              <Button
                variant={viewType === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewType("list")}
              >
                List
              </Button>
              <Button
                variant={viewType === "charts" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewType("charts")}
              >
                Charts
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {viewType === "charts" ? (
        /* Portfolio Allocation Charts */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Asset Class Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {portfolioAllocation.assetClass.map((asset, index) => (
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sector Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {portfolioAllocation.sector.map((sector, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${sector.color}`} />
                      <span className="text-sm font-medium">{sector.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold">
                        RM{" "}
                        {sector.value.toLocaleString("en-MY", {
                          minimumFractionDigits: 0,
                        })}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {sector.percentage.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Geographic Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {portfolioAllocation.geography.map((geo, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${geo.color}`} />
                      <span className="text-sm font-medium">{geo.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold">
                        RM{" "}
                        {geo.value.toLocaleString("en-MY", {
                          minimumFractionDigits: 0,
                        })}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {geo.percentage.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Currency Exposure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {portfolioAllocation.currency.map((curr, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${curr.color}`} />
                      <span className="text-sm font-medium">{curr.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold">
                        RM{" "}
                        {curr.value.toLocaleString("en-MY", {
                          minimumFractionDigits: 0,
                        })}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {curr.percentage.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* Holdings List */
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Holdings ({filteredHoldings.length})</span>
              {selectedHoldings.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    {selectedHoldings.length} selected
                  </span>
                  <Button variant="outline" size="sm">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Compare Selected
                  </Button>
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredHoldings.map((holding) => (
                <div
                  key={holding.id}
                  className="border rounded-lg p-4 hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-4">
                    <Checkbox
                      checked={selectedHoldings.includes(holding.id)}
                      onCheckedChange={() => handleHoldingSelect(holding.id)}
                    />

                    <div className="flex-1 grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
                      <div className="md:col-span-2">
                        <div className="font-semibold">{holding.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {holding.symbol} • {holding.type}
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {holding.sector}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {holding.country}
                          </Badge>
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="flex items-center space-x-1">
                          <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-blue-700">
                              {holding.accountIcon}
                            </span>
                          </div>
                          <span className="text-sm">{holding.account}</span>
                        </div>
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
                          {holding.currency} {holding.currentPrice.toFixed(2)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Avg: {holding.currency}{" "}
                          {holding.averageCost.toFixed(2)}
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="font-semibold">
                          RM{" "}
                          {holding.currentValue.toLocaleString("en-MY", {
                            minimumFractionDigits: 2,
                          })}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {holding.weight}% of portfolio
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
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Risk Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5" />
            <span>Risk Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Concentration Risk</div>
                  <div className="text-sm text-muted-foreground">
                    Your top 3 holdings account for{" "}
                    {riskMetrics.topHoldingsPercentage}% of your portfolio
                  </div>
                </div>
                <Badge
                  variant={
                    riskMetrics.concentrationRisk === "Low"
                      ? "default"
                      : "secondary"
                  }
                >
                  {riskMetrics.concentrationRisk}
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Diversification Score</div>
                  <div className="text-sm text-muted-foreground">
                    Based on sector and geographic distribution
                  </div>
                </div>
                <Badge variant="default">
                  {riskMetrics.diversificationScore}
                </Badge>
              </div>
            </div>

            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-orange-800">
                    Portfolio Alert
                  </h4>
                  <p className="text-sm text-orange-700 mt-1">
                    {riskMetrics.sectorConcentration}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 text-orange-700 border-orange-300"
                  >
                    View Rebalancing Suggestions
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dividend Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5" />
            <span>Dividend & Income Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    RM {dividendSummary.totalReceived.toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Received YTD
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    RM {dividendSummary.projectedAnnual.toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Projected Annual
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">
                    {dividendSummary.yieldPercentage}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Portfolio Yield
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Upcoming Dividend Payments</h4>
              <div className="space-y-2">
                {dividendSummary.upcomingPayments.map((payment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 border rounded"
                  >
                    <div>
                      <div className="font-medium text-sm">{payment.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {payment.date}
                      </div>
                    </div>
                    <div className="font-semibold text-green-600">
                      RM {payment.amount.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
