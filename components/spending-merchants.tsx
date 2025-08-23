"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Calendar,
  Filter,
  MapPin,
  Search,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

interface SpendingMerchantsProps {
  onBack?: () => void;
}

export function SpendingMerchants({ onBack }: SpendingMerchantsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("amount");

  const merchantData = [
    {
      id: "tesco",
      name: "Tesco",
      category: "Groceries",
      totalSpent: 456.75,
      transactions: 12,
      avgTransaction: 38.06,
      lastVisit: "2 days ago",
      trend: 15.2,
      location: "KLCC",
      frequency: "Weekly",
      monthlySpending: [380, 420, 456],
    },
    {
      id: "grabfood",
      name: "GrabFood",
      category: "Food Delivery",
      totalSpent: 389.45,
      transactions: 24,
      avgTransaction: 16.23,
      lastVisit: "Yesterday",
      trend: -8.5,
      location: "Various",
      frequency: "Daily",
      monthlySpending: [425, 410, 389],
    },
    {
      id: "shell",
      name: "Shell",
      category: "Fuel",
      totalSpent: 285.6,
      transactions: 8,
      avgTransaction: 35.7,
      lastVisit: "5 days ago",
      trend: 5.3,
      location: "Petaling Jaya",
      frequency: "Weekly",
      monthlySpending: [270, 275, 285],
    },
    {
      id: "shopee",
      name: "Shopee",
      category: "Online Shopping",
      totalSpent: 234.25,
      transactions: 6,
      avgTransaction: 39.04,
      lastVisit: "1 week ago",
      trend: 45.8,
      location: "Online",
      frequency: "Monthly",
      monthlySpending: [160, 180, 234],
    },
    {
      id: "starbucks",
      name: "Starbucks",
      category: "Coffee",
      totalSpent: 189.7,
      transactions: 15,
      avgTransaction: 12.65,
      lastVisit: "Today",
      trend: 12.4,
      location: "Mid Valley",
      frequency: "Weekly",
      monthlySpending: [165, 175, 189],
    },
    {
      id: "maybank",
      name: "Maybank",
      category: "Banking",
      totalSpent: 156.0,
      transactions: 3,
      avgTransaction: 52.0,
      lastVisit: "1 month ago",
      trend: 0,
      location: "Kuala Lumpur",
      frequency: "Monthly",
      monthlySpending: [156, 156, 156],
    },
    {
      id: "netflix",
      name: "Netflix",
      category: "Entertainment",
      totalSpent: 45.0,
      transactions: 3,
      avgTransaction: 15.0,
      lastVisit: "15 days ago",
      trend: 0,
      location: "Online",
      frequency: "Monthly",
      monthlySpending: [45, 45, 45],
    },
    {
      id: "gsc",
      name: "Golden Screen Cinemas",
      category: "Entertainment",
      totalSpent: 89.5,
      transactions: 4,
      avgTransaction: 22.38,
      lastVisit: "1 week ago",
      trend: 25.6,
      location: "1 Utama",
      frequency: "Monthly",
      monthlySpending: [70, 75, 89],
    },
  ];

  const categories = [
    "all",
    "Groceries",
    "Food Delivery",
    "Fuel",
    "Online Shopping",
    "Coffee",
    "Entertainment",
    "Banking",
  ];

  const filteredMerchants = merchantData
    .filter((merchant) => {
      const matchesSearch = merchant.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || merchant.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "amount":
          return b.totalSpent - a.totalSpent;
        case "transactions":
          return b.transactions - a.transactions;
        case "name":
          return a.name.localeCompare(b.name);
        case "trend":
          return Math.abs(b.trend) - Math.abs(a.trend);
        default:
          return 0;
      }
    });

  const totalSpent = merchantData.reduce(
    (sum, merchant) => sum + merchant.totalSpent,
    0
  );
  const totalTransactions = merchantData.reduce(
    (sum, merchant) => sum + merchant.transactions,
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
            <h1 className="text-2xl font-bold">Merchant Analysis</h1>
            <p className="text-muted-foreground">
              Detailed breakdown of your spending by merchant
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">RM {totalSpent.toFixed(2)}</div>
            <div className="text-sm text-muted-foreground">Total Spent</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{merchantData.length}</div>
            <div className="text-sm text-muted-foreground">
              Unique Merchants
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{totalTransactions}</div>
            <div className="text-sm text-muted-foreground">
              Total Transactions
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              RM {(totalSpent / totalTransactions).toFixed(2)}
            </div>
            <div className="text-sm text-muted-foreground">Avg Transaction</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search merchants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="amount">Sort by Amount</SelectItem>
                <SelectItem value="transactions">
                  Sort by Transactions
                </SelectItem>
                <SelectItem value="name">Sort by Name</SelectItem>
                <SelectItem value="trend">Sort by Trend</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Merchant List */}
      <div className="grid gap-4">
        {filteredMerchants.map((merchant) => (
          <Card
            key={merchant.id}
            className="hover:shadow-md transition-shadow cursor-pointer"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-blue-700">
                      {merchant.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{merchant.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <Badge variant="secondary">{merchant.category}</Badge>
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {merchant.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {merchant.frequency}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">
                    RM {merchant.totalSpent.toFixed(2)}
                  </div>
                  <div className="flex items-center justify-end text-sm">
                    {merchant.trend > 0 ? (
                      <TrendingUp className="h-3 w-3 text-red-500 mr-1" />
                    ) : merchant.trend < 0 ? (
                      <TrendingDown className="h-3 w-3 text-green-500 mr-1" />
                    ) : null}
                    <span
                      className={
                        merchant.trend > 0
                          ? "text-red-500"
                          : merchant.trend < 0
                          ? "text-green-500"
                          : "text-gray-500"
                      }
                    >
                      {merchant.trend !== 0 && (merchant.trend > 0 ? "+" : "")}
                      {merchant.trend.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 pt-4 border-t">
                <div>
                  <div className="text-sm text-muted-foreground">
                    Transactions
                  </div>
                  <div className="font-semibold">{merchant.transactions}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">
                    Avg Transaction
                  </div>
                  <div className="font-semibold">
                    RM {merchant.avgTransaction.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">
                    Last Visit
                  </div>
                  <div className="font-semibold">{merchant.lastVisit}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">
                    3-Month Trend
                  </div>
                  <div className="flex items-end space-x-1">
                    {merchant.monthlySpending.map((amount, index) => (
                      <div
                        key={index}
                        className="bg-blue-500 rounded-sm"
                        style={{
                          height: `${
                            (amount / Math.max(...merchant.monthlySpending)) *
                              20 +
                            5
                          }px`,
                          width: "8px",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMerchants.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No merchants found matching your criteria.</p>
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
