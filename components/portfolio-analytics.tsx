// components/portfolio-analytics.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  DollarSign,
  Shield,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

import { Client } from "@/components/client-add-modal"; // Import the Client interface

interface PortfolioAnalyticsProps {
  clients: Client[]; // ADDED: Prop to receive the clients data
}

export function PortfolioAnalytics({ clients }: PortfolioAnalyticsProps) {
  // Receive clients prop
  // Dynamically calculate these metrics from the clients prop
  const totalAUM = clients.reduce(
    (sum, client) => sum + client.portfolioValue,
    0
  );
  const totalClients = clients.length;
  const averagePortfolioSize = totalClients > 0 ? totalAUM / totalClients : 0;
  const averageMonthlyReturn =
    totalClients > 0
      ? clients.reduce((sum, client) => sum + client.monthlyReturn, 0) /
        totalClients
      : 0;

  const portfolioMetrics = {
    totalAUM: totalAUM, // DYNAMIC
    totalClients: totalClients, // DYNAMIC
    averagePortfolioSize: averagePortfolioSize, // DYNAMIC
    ytdReturn: 8.2, // STATIC - Requires more detailed transaction history
    quarterReturn: 2.1, // STATIC - Requires more detailed transaction history
    monthReturn: averageMonthlyReturn, // DYNAMIC (average of individual client monthly returns)
  };

  // STATIC data (requires more granular portfolio data per client)
  const assetAllocation = [
    { category: "Equities", value: 45, amount: 5625000, color: "bg-blue-500" },
    {
      category: "Fixed Income",
      value: 30,
      amount: 3750000,
      color: "bg-green-500",
    },
    {
      category: "Real Estate",
      value: 15,
      amount: 1875000,
      color: "bg-purple-500",
    },
    {
      category: "Commodities",
      value: 5,
      amount: 625000,
      color: "bg-yellow-500",
    },
    { category: "Cash", value: 5, amount: 625000, color: "bg-gray-500" },
  ];

  // STATIC data (requires more granular portfolio data per client)
  const sectorBreakdown = [
    { sector: "Technology", percentage: 22, performance: 12.5 },
    { sector: "Healthcare", percentage: 18, performance: 8.3 },
    { sector: "Financial Services", percentage: 15, performance: 6.7 },
    { sector: "Consumer Goods", percentage: 12, performance: 4.2 },
    { sector: "Energy", percentage: 10, performance: -2.1 },
    { sector: "Utilities", percentage: 8, performance: 3.8 },
    { sector: "Materials", percentage: 7, performance: 5.9 },
    { sector: "Others", percentage: 8, performance: 2.4 },
  ];

  // STATIC data (requires complex risk models and underlying portfolio data)
  const riskMetrics = {
    portfolioVaR: 2.8,
    sharpeRatio: 1.24,
    beta: 0.92,
    volatility: 12.4,
    maxDrawdown: 8.7,
  };

  // Dynamically calculate client segmentation
  const clientSegmentationMap = new Map<
    string,
    { count: number; aum: number; totalMonthlyReturn: number }
  >();

  clients.forEach((client) => {
    const risk = client.riskProfile;
    if (!clientSegmentationMap.has(risk)) {
      clientSegmentationMap.set(risk, {
        count: 0,
        aum: 0,
        totalMonthlyReturn: 0,
      });
    }
    const segmentData = clientSegmentationMap.get(risk)!;
    segmentData.count += 1;
    segmentData.aum += client.portfolioValue;
    segmentData.totalMonthlyReturn += client.monthlyReturn;
  });

  const clientSegmentation = Array.from(clientSegmentationMap.entries())
    .map(([segmentName, data]) => ({
      segment: segmentName,
      count: data.count,
      aum: data.aum,
      avgReturn:
        data.count > 0
          ? parseFloat((data.totalMonthlyReturn / data.count).toFixed(2))
          : 0,
    }))
    .sort((a, b) => a.segment.localeCompare(b.segment)); // Sort for consistent order

  // STATIC data (requires individual holding performance)
  const topPerformers = [
    { name: "Tech Growth Fund", return: 18.5, allocation: 8.2 },
    { name: "Healthcare Innovation ETF", return: 15.3, allocation: 6.1 },
    { name: "Emerging Markets Bond", return: 12.7, allocation: 4.8 },
    { name: "REIT Income Fund", return: 11.9, allocation: 7.3 },
    { name: "Dividend Aristocrats", return: 9.8, allocation: 5.5 },
  ];

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `RM ${(amount / 1000000).toFixed(1)}M`;
    }
    return `RM ${Math.round(amount / 1000)}K`; // Use Math.round for better K formatting
  };

  return (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total AUM</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(portfolioMetrics.totalAUM)}
            </div>
            <p className="text-xs text-muted-foreground">
              Assets under management
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {portfolioMetrics.totalClients}
            </div>
            <p className="text-xs text-muted-foreground">Active portfolios</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">YTD Return</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              +{portfolioMetrics.ytdReturn}%
            </div>
            <p className="text-xs text-muted-foreground">
              Year to date (Static Mock)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Portfolio</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(portfolioMetrics.averagePortfolioSize)}
            </div>
            <p className="text-xs text-muted-foreground">Per client</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="allocation" className="space-y-4">
        <TabsList>
          <TabsTrigger value="allocation">Asset Allocation</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
          <TabsTrigger value="clients">Client Segments</TabsTrigger>
        </TabsList>

        <TabsContent value="allocation" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Asset Allocation (STATIC) */}
            <Card>
              <CardHeader>
                <CardTitle>Asset Allocation</CardTitle>
                <CardDescription>
                  Portfolio distribution across asset classes (Static Mock)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assetAllocation.map((asset) => (
                    <div key={asset.category} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-3 h-3 rounded-full ${asset.color}`}
                          />
                          <span className="font-medium">{asset.category}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{asset.value}%</div>
                          <div className="text-xs text-muted-foreground">
                            {formatCurrency(asset.amount)}
                          </div>
                        </div>
                      </div>
                      <Progress value={asset.value} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sector Breakdown (STATIC) */}
            <Card>
              <CardHeader>
                <CardTitle>Sector Breakdown</CardTitle>
                <CardDescription>
                  Equity allocation by sector with performance (Static Mock)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sectorBreakdown.map((sector) => (
                    <div
                      key={sector.sector}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="font-medium">{sector.sector}</div>
                          <div className="text-xs text-muted-foreground">
                            {sector.percentage}% allocation
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`font-semibold ${
                            sector.performance >= 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {sector.performance >= 0 ? "+" : ""}
                          {sector.performance}%
                        </div>
                        <div className="text-xs text-muted-foreground">YTD</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Metrics (Partially Dynamic) */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Summary</CardTitle>
                <CardDescription>
                  Portfolio returns across different time periods
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Month to Date</span>
                    <span
                      className={`font-bold ${
                        portfolioMetrics.monthReturn >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {portfolioMetrics.monthReturn >= 0 ? "+" : ""}
                      {portfolioMetrics.monthReturn.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Quarter to Date</span>
                    <span className="font-bold text-green-600">
                      +{portfolioMetrics.quarterReturn}% (Static Mock)
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Year to Date</span>
                    <span className="font-bold text-green-600">
                      +{portfolioMetrics.ytdReturn}% (Static Mock)
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Performers (STATIC) */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>
                  Best performing holdings by return (Static Mock)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topPerformers.map((holding, index) => (
                    <div
                      key={holding.name}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center justify-center">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{holding.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {holding.allocation}% allocation
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-green-600">
                          +{holding.return}%
                        </div>
                        <div className="text-xs text-muted-foreground">YTD</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risk" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Risk Metrics (STATIC) */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Metrics</CardTitle>
                <CardDescription>
                  Portfolio risk analysis and measurements (Static Mock)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Value at Risk (95%)</div>
                      <div className="text-xs text-muted-foreground">
                        1-day VaR
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-red-600">
                        {riskMetrics.portfolioVaR}%
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Sharpe Ratio</div>
                      <div className="text-xs text-muted-foreground">
                        Risk-adjusted return
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">
                        {riskMetrics.sharpeRatio}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Beta</div>
                      <div className="text-xs text-muted-foreground">
                        Market sensitivity
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{riskMetrics.beta}</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Volatility</div>
                      <div className="text-xs text-muted-foreground">
                        Annualized
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{riskMetrics.volatility}%</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Max Drawdown</div>
                      <div className="text-xs text-muted-foreground">
                        Peak to trough
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-red-600">
                        -{riskMetrics.maxDrawdown}%
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Risk Alerts (STATIC) */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Alerts</CardTitle>
                <CardDescription>
                  Portfolio risk monitoring and alerts (Static Mock)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-yellow-800">
                        Concentration Risk
                      </div>
                      <div className="text-sm text-yellow-700">
                        Technology sector allocation exceeds 20% threshold
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <Shield className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-blue-800">
                        Diversification Good
                      </div>
                      <div className="text-sm text-blue-700">
                        Portfolio maintains good diversification across asset
                        classes
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <TrendingUp className="h-4 w-4 text-green-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-green-800">
                        Risk-Return Optimal
                      </div>
                      <div className="text-sm text-green-700">
                        Current Sharpe ratio indicates good risk-adjusted
                        returns
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="clients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Client Segmentation</CardTitle>
              <CardDescription>
                Portfolio performance by risk profile segments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {clientSegmentation.length > 0 ? (
                  clientSegmentation.map((segment) => (
                    <div
                      key={segment.segment}
                      className="p-4 border rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold">{segment.segment}</h3>
                        <Badge variant="outline">{segment.count} clients</Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            AUM
                          </span>
                          <span className="font-medium">
                            {formatCurrency(segment.aum)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Avg Return
                          </span>
                          <span
                            className={`font-medium ${
                              segment.avgReturn >= 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {segment.avgReturn >= 0 ? "+" : ""}
                            {segment.avgReturn}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Avg per Client
                          </span>
                          <span className="font-medium">
                            {formatCurrency(segment.aum / segment.count)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-muted-foreground p-4 col-span-full">
                    No client data available for segmentation.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
