"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  ArrowLeft,
  Building2,
  CheckCircle,
  FileText,
  Plus,
  Search,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useState } from "react";

interface AddAccountProps {
  onBack?: () => void;
}

export function AddAccount({ onBack }: AddAccountProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBank, setSelectedBank] = useState<string | null>(null);

  const popularBanks = [
    { id: "maybank", name: "Maybank", logo: "MB", status: "supported" },
    { id: "cimb", name: "CIMB Bank", logo: "CB", status: "supported" },
    { id: "public-bank", name: "Public Bank", logo: "PB", status: "supported" },
    { id: "rhb", name: "RHB Bank", logo: "RH", status: "supported" },
    {
      id: "hong-leong",
      name: "Hong Leong Bank",
      logo: "HL",
      status: "supported",
    },
    { id: "ambank", name: "AmBank", logo: "AM", status: "supported" },
    { id: "uob", name: "UOB Malaysia", logo: "UO", status: "supported" },
    { id: "ocbc", name: "OCBC Bank", logo: "OC", status: "supported" },
    {
      id: "alliance",
      name: "Alliance Bank",
      logo: "AL",
      status: "coming-soon",
    },
    { id: "affin", name: "Affin Bank", logo: "AF", status: "coming-soon" },
  ];

  const connectedInstitutions = [
    {
      id: "maybank-connected",
      name: "Maybank",
      logo: "MB",
      status: "connected",
      accountCount: 2,
      lastSynced: "2 minutes ago",
    },
    {
      id: "cimb-connected",
      name: "CIMB Bank",
      logo: "CB",
      status: "needs-auth",
      accountCount: 1,
      lastSynced: "2 days ago",
    },
  ];

  const manualAccounts = [
    {
      id: "cash-manual",
      name: "Cash on Hand",
      type: "Cash",
      balance: 1000.0,
      lastUpdated: "1 week ago",
    },
  ];

  const filteredBanks = popularBanks.filter((bank) =>
    bank.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBankSelect = (bankId: string) => {
    setSelectedBank(bankId);
    // In a real app, this would initiate the connection flow
  };

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
            <h1 className="text-2xl font-bold">Add New Account</h1>
            <p className="text-muted-foreground">
              Connect your bank accounts or add manual accounts
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Connect New Bank */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building2 className="h-5 w-5" />
                <span>Connect New Bank</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for your bank..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Popular Banks in Malaysia
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {filteredBanks.map((bank) => (
                    <Card
                      key={bank.id}
                      className={`cursor-pointer hover:shadow-md transition-shadow ${
                        selectedBank === bank.id ? "ring-2 ring-blue-500" : ""
                      } ${bank.status === "coming-soon" ? "opacity-60" : ""}`}
                      onClick={() =>
                        bank.status === "supported" && handleBankSelect(bank.id)
                      }
                    >
                      <CardContent className="p-4 text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-sm font-bold text-blue-700">
                            {bank.logo}
                          </span>
                        </div>
                        <div className="font-medium text-sm">{bank.name}</div>
                        {bank.status === "coming-soon" && (
                          <Badge variant="secondary" className="mt-1 text-xs">
                            Coming Soon
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {selectedBank && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">
                          Ready to connect{" "}
                          {
                            popularBanks.find((b) => b.id === selectedBank)
                              ?.name
                          }
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          You'll be redirected to your bank's secure login page
                        </p>
                      </div>
                      <Button>Connect Now</Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          {/* Manual Account */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Add Manual Account</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Add accounts that can't be connected automatically, such as
                cash, investments, or assets.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  {
                    type: "Cash",
                    icon: Wallet,
                    color: "bg-green-100 text-green-700",
                  },
                  {
                    type: "Investment",
                    icon: TrendingUp,
                    color: "bg-blue-100 text-blue-700",
                  },
                  {
                    type: "Asset",
                    icon: Building2,
                    color: "bg-purple-100 text-purple-700",
                  },
                  {
                    type: "Other",
                    icon: FileText,
                    color: "bg-gray-100 text-gray-700",
                  },
                ].map((accountType) => (
                  <Card
                    key={accountType.type}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4 text-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 ${accountType.color}`}
                      >
                        <accountType.icon className="h-5 w-5" />
                      </div>
                      <div className="font-medium text-sm">
                        {accountType.type}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Connected Institutions */}
          <Card>
            <CardHeader>
              <CardTitle>Connected Institutions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {connectedInstitutions.map((institution) => (
                <div
                  key={institution.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-700">
                        {institution.logo}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-sm">
                        {institution.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {institution.accountCount} accounts
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {institution.status === "connected" ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                    )}
                    <div className="text-xs text-muted-foreground mt-1">
                      {institution.lastSynced}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Manual Accounts */}
          <Card>
            <CardHeader>
              <CardTitle>Manual Accounts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {manualAccounts.map((account) => (
                <div
                  key={account.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <Wallet className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{account.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {account.type}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm">
                      RM{" "}
                      {account.balance.toLocaleString("en-MY", {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {account.lastUpdated}
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Manual Account
              </Button>
            </CardContent>
          </Card>

          {/* Help */}
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Having trouble connecting your bank? Check our support guide or
                contact us.
              </p>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  View Support Guide
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
