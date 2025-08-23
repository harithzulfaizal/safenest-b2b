"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Building2,
  Calendar,
  Mail,
  Phone,
  TrendingUp,
  Users,
} from "lucide-react";

interface ClientData {
  name: string;
  email: string;
  phone: string;
  portfolioValue: number;
  riskProfile: string;
  status: string;
}

interface PlannerData {
  name: string;
  firm: string;
  totalClients: number;
  totalAUM: number;
  activeClients: number;
}

interface GlobalHeaderProps {
  currentView: "crm" | "client";
  clientData?: ClientData;
  plannerData: PlannerData;
  onBack?: () => void;
}

export function GlobalHeader({
  currentView,
  clientData,
  plannerData,
  onBack,
}: GlobalHeaderProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "MYR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatLargeNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K`;
    }
    return num.toString();
  };

  if (currentView === "client" && clientData) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-800 to-slate-700 text-white shadow-lg">
        <div className="flex items-center justify-between px-6 py-2">
          {/* Left: Logo and Back Button */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-6 w-6 text-blue-400" />
              <span className="text-lg font-semibold">FinanceApp</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-white hover:bg-slate-600"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to CRM
            </Button>
          </div>

          {/* Center: Client Info */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10 border-2 border-blue-400">
                <AvatarImage
                  src="/placeholder.svg?height=40&width=40"
                  alt={clientData.name}
                />
                <AvatarFallback className="bg-blue-500 text-white">
                  {clientData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-semibold">{clientData.name}</h2>
                <div className="flex items-center space-x-4 text-sm text-slate-300">
                  <div className="flex items-center space-x-1">
                    <Mail className="h-3 w-3" />
                    <span>{clientData.email}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Phone className="h-3 w-3" />
                    <span className="text-sm">{clientData.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="font-bold text-blue-400 text-lg">
                  {formatCurrency(clientData.portfolioValue)}
                </div>
                <div className="text-xs text-slate-300">Portfolio Value</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-base">
                  {clientData.riskProfile}
                </div>
                <div className="text-xs text-slate-300">Risk Profile</div>
              </div>
              <Badge
                variant={
                  clientData.status === "active" ? "default" : "destructive"
                }
                className={
                  clientData.status === "active"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-orange-600 hover:bg-orange-700"
                }
              >
                {clientData.status === "active" ? "Active" : "Needs Attention"}
              </Badge>
            </div>
          </div>

          {/* Right: Quick Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-slate-600"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Schedule
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-slate-600"
            >
              <Mail className="h-4 w-4 mr-2" />
              Contact
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Planner View
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-emerald-700 to-teal-700 text-white shadow-lg">
      <div className="flex items-center justify-between px-6 py-2">
        {/* Left: Logo */}
        <div className="flex items-center space-x-2">
          <Building2 className="h-6 w-6 text-emerald-400" />
          <span className="text-lg font-semibold">FinanceApp</span>
        </div>

        {/* Center: Planner Info */}
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 border-2 border-emerald-400">
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt={plannerData.name}
              />
              <AvatarFallback className="bg-emerald-500 text-white">
                {plannerData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">{plannerData.name}</h2>
              <div className="text-sm text-emerald-200">{plannerData.firm}</div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-xl font-bold text-emerald-400">
                {plannerData.totalClients}
              </div>
              <div className="text-xs text-emerald-200">Total Clients</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-emerald-400">
                {formatCurrency(plannerData.totalAUM)}
              </div>
              <div className="text-xs text-emerald-200">
                Assets Under Management
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-emerald-400">
                {plannerData.activeClients}
              </div>
              <div className="text-xs text-emerald-200">Active Clients</div>
            </div>
          </div>
        </div>

        {/* Right: Quick Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-emerald-600"
          >
            <Users className="h-4 w-4 mr-2" />
            Clients
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-emerald-600"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Calendar
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-emerald-600"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Reports
          </Button>
        </div>
      </div>
    </div>
  );
}
