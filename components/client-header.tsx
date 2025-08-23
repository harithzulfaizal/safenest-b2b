"use client";

import type React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Calendar,
  ChevronDown,
  ChevronUp,
  FileText,
  Mail,
  Phone,
} from "lucide-react";
import { useState } from "react";

interface ClientHeaderProps {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  portfolioValue: number;
  riskProfile: string;
  status: string;
  onBack: () => void;
}

export function ClientHeader({
  clientName,
  clientEmail,
  clientPhone,
  portfolioValue,
  riskProfile,
  status,
  onBack,
}: ClientHeaderProps) {
  const [isCollapsed, setIsCollapsed] = useState(true); // Changed default to true (collapsed)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "needs-attention":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "inactive":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "conservative":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "moderate":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "aggressive":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const formatPhone = (phone: string) => {
    // Format phone number for better display on mobile
    return phone.replace(/(\+60\s?)(\d{2})-(\d{3})\s(\d{4})/, "$1$2-$3-$4");
  };

  const handleToggleExpansion = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleBackClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBack();
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Action button logic here
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-800 to-slate-700 shadow-sm border-b border-slate-600 ml-64">
      {/* Expanded State Visual Indicator */}
      {!isCollapsed && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-75"></div>
      )}

      <div
        className={cn(
          "transition-all duration-300 ease-in-out overflow-hidden cursor-pointer",
          isCollapsed ? "h-10 hover:bg-white/5" : "h-auto hover:bg-white/5"
        )}
        onClick={handleToggleExpansion}
      >
        {/* Collapsed View */}
        {isCollapsed && (
          <div className="flex items-center justify-between px-4 py-2 h-10">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackClick}
                className="text-white hover:bg-white/10 h-6 px-2"
              >
                <ArrowLeft className="h-3 w-3" />
              </Button>
              <Avatar className="h-5 w-5">
                <AvatarImage
                  src={`/placeholder.svg?height=20&width=20`}
                  alt={clientName}
                />
                <AvatarFallback className="text-xs bg-white/20 text-white text-[10px]">
                  {clientName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="text-white font-medium text-sm">
                {clientName}
              </span>
              <Badge
                variant="outline"
                className="bg-white/10 text-white border-white/20 text-xs h-5 px-2"
              >
                RM {(portfolioValue / 1000).toFixed(0)}K
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-white/60 text-xs">Click to expand</span>
              <ChevronDown className="h-3 w-3 text-white/60" />
            </div>
          </div>
        )}

        {/* Expanded View */}
        {!isCollapsed && (
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBackClick}
                  className="text-white hover:bg-white/10 h-7 px-2"
                >
                  <ArrowLeft className="h-3 w-3 mr-1" />
                  <span className="text-xs">Back to CRM</span>
                </Button>
                <div className="h-4 w-px bg-white/30" />
                <div className="text-white/80 text-xs font-medium">
                  Client Profile
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 text-white/60 text-xs">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span>Expanded - Click to collapse</span>
                </div>
                <ChevronUp className="h-3 w-3 text-white/60" />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
              {/* Client Info */}
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8 ring-1 ring-white/20">
                  <AvatarImage
                    src={`/placeholder.svg?height=32&width=32`}
                    alt={clientName}
                  />
                  <AvatarFallback className="bg-white/20 text-white font-semibold text-sm">
                    {clientName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <h2 className="text-lg font-semibold text-white truncate">
                    {clientName}
                  </h2>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs text-white/80">
                    <span className="truncate">{clientEmail}</span>
                    <span className="hidden sm:block">•</span>
                    <span className="whitespace-nowrap">
                      {formatPhone(clientPhone)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs font-medium h-5",
                      getStatusColor(status)
                    )}
                  >
                    {status.replace("-", " ").toUpperCase()}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs font-medium h-5",
                      getRiskColor(riskProfile)
                    )}
                  >
                    {riskProfile.toUpperCase()}
                  </Badge>
                </div>
              </div>

              {/* Portfolio Value & Actions */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="text-right">
                  <div className="text-lg font-bold text-white">
                    RM {portfolioValue.toLocaleString()}
                  </div>
                  <div className="text-xs text-white/70">Portfolio Value</div>
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleActionClick}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 h-7 px-2"
                  >
                    <Phone className="h-3 w-3 mr-1" />
                    <span className="hidden sm:inline text-xs">Call</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleActionClick}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 h-7 px-2"
                  >
                    <Mail className="h-3 w-3 mr-1" />
                    <span className="hidden sm:inline text-xs">Email</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleActionClick}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 h-7 px-2"
                  >
                    <Calendar className="h-3 w-3 mr-1" />
                    <span className="hidden sm:inline text-xs">Meet</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleActionClick}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 h-7 px-2"
                  >
                    <FileText className="h-3 w-3 mr-1" />
                    <span className="hidden sm:inline text-xs">Report</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
