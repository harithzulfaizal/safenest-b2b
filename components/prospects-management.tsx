"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowRight,
  Calendar,
  DollarSign,
  Mail,
  Phone,
  Plus,
  Search,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";

interface Prospect {
  id: string;
  name: string;
  email: string;
  phone: string;
  stage: string;
  source: string;
  estimatedValue: number;
  probability: number;
  lastContact: string;
  nextAction: string;
  assignedTo: string;
}

const mockProspects: Prospect[] = [
  {
    id: "1",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+60 12-345 6789",
    stage: "qualified",
    source: "referral",
    estimatedValue: 250000,
    probability: 75,
    lastContact: "2024-01-15",
    nextAction: "Send proposal",
    assignedTo: "You",
  },
  {
    id: "2",
    name: "Lisa Wong",
    email: "lisa.wong@email.com",
    phone: "+60 12-987 6543",
    stage: "proposal",
    source: "website",
    estimatedValue: 180000,
    probability: 60,
    lastContact: "2024-01-14",
    nextAction: "Follow up on proposal",
    assignedTo: "You",
  },
  {
    id: "3",
    name: "David Kumar",
    email: "david.kumar@email.com",
    phone: "+60 12-555 1234",
    stage: "negotiation",
    source: "linkedin",
    estimatedValue: 320000,
    probability: 85,
    lastContact: "2024-01-13",
    nextAction: "Schedule final meeting",
    assignedTo: "You",
  },
  {
    id: "4",
    name: "Sarah Abdullah",
    email: "sarah.abdullah@email.com",
    phone: "+60 12-777 8888",
    stage: "lead",
    source: "cold-call",
    estimatedValue: 150000,
    probability: 25,
    lastContact: "2024-01-12",
    nextAction: "Initial consultation",
    assignedTo: "You",
  },
  {
    id: "5",
    name: "Robert Tan",
    email: "robert.tan@email.com",
    phone: "+60 12-999 0000",
    stage: "initial-contact",
    source: "referral",
    estimatedValue: 400000,
    probability: 40,
    lastContact: "2024-01-11",
    nextAction: "Needs assessment",
    assignedTo: "You",
  },
];

const stageOrder = [
  "lead",
  "initial-contact",
  "qualified",
  "proposal",
  "negotiation",
  "closed",
];
const stageLabels = {
  lead: "Lead",
  "initial-contact": "Initial Contact",
  qualified: "Qualified",
  proposal: "Proposal",
  negotiation: "Negotiation",
  closed: "Closed",
};

const stageColors = {
  lead: "bg-gray-100 text-gray-700",
  "initial-contact": "bg-blue-100 text-blue-700",
  qualified: "bg-yellow-100 text-yellow-700",
  proposal: "bg-orange-100 text-orange-700",
  negotiation: "bg-purple-100 text-purple-700",
  closed: "bg-green-100 text-green-700",
};

const sourceLabels = {
  referral: "Referral",
  website: "Website",
  linkedin: "LinkedIn",
  "cold-call": "Cold Call",
  event: "Event",
};

export function ProspectsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStage, setSelectedStage] = useState("all");
  const [selectedSource, setSelectedSource] = useState("all");

  const filteredProspects = mockProspects.filter((prospect) => {
    const matchesSearch =
      prospect.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prospect.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage =
      selectedStage === "all" || prospect.stage === selectedStage;
    const matchesSource =
      selectedSource === "all" || prospect.source === selectedSource;

    return matchesSearch && matchesStage && matchesSource;
  });

  // Calculate pipeline metrics
  const totalProspects = mockProspects.length;
  const totalPipelineValue = mockProspects.reduce(
    (sum, p) => sum + p.estimatedValue,
    0
  );
  const weightedPipelineValue = mockProspects.reduce(
    (sum, p) => sum + (p.estimatedValue * p.probability) / 100,
    0
  );
  const averageConversionRate =
    mockProspects.reduce((sum, p) => sum + p.probability, 0) / totalProspects;

  // Pipeline by stage
  const pipelineByStage = stageOrder.map((stage) => {
    const prospects = mockProspects.filter((p) => p.stage === stage);
    const value = prospects.reduce((sum, p) => sum + p.estimatedValue, 0);
    const count = prospects.length;
    return { stage, count, value, prospects };
  });

  const getStageColor = (stage: string) => {
    return (
      stageColors[stage as keyof typeof stageColors] ||
      "bg-gray-100 text-gray-700"
    );
  };

  const formatCurrency = (amount: number) => {
    return `RM ${(amount / 1000).toFixed(0)}K`;
  };

  return (
    <div className="space-y-6">
      {/* Pipeline Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Prospects
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProspects}</div>
            <p className="text-xs text-muted-foreground">Active in pipeline</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pipeline Value
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalPipelineValue)}
            </div>
            <p className="text-xs text-muted-foreground">
              Total potential value
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Weighted Value
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(weightedPipelineValue)}
            </div>
            <p className="text-xs text-muted-foreground">
              Probability adjusted
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Conversion
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {averageConversionRate.toFixed(0)}%
            </div>
            <p className="text-xs text-muted-foreground">Expected close rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Stages */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Pipeline</CardTitle>
          <CardDescription>
            Prospects by stage with values and conversion rates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {pipelineByStage.map((stage, index) => (
              <div key={stage.stage} className="relative">
                <div className="text-center">
                  <div
                    className={`rounded-lg p-4 ${getStageColor(
                      stage.stage
                    )} border`}
                  >
                    <div className="font-semibold text-sm mb-1">
                      {stageLabels[stage.stage as keyof typeof stageLabels]}
                    </div>
                    <div className="text-2xl font-bold mb-1">{stage.count}</div>
                    <div className="text-xs">{formatCurrency(stage.value)}</div>
                  </div>
                </div>
                {index < pipelineByStage.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search prospects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedStage} onValueChange={setSelectedStage}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stages</SelectItem>
            {stageOrder.map((stage) => (
              <SelectItem key={stage} value={stage}>
                {stageLabels[stage as keyof typeof stageLabels]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedSource} onValueChange={setSelectedSource}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            {Object.entries(sourceLabels).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Prospect
        </Button>
      </div>

      {/* Prospects List */}
      <div className="grid gap-4">
        {filteredProspects.map((prospect) => (
          <Card key={prospect.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={`/placeholder.svg?height=48&width=48`}
                      alt={prospect.name}
                    />
                    <AvatarFallback>
                      {prospect.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-lg">{prospect.name}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-muted-foreground">
                      <span className="truncate">{prospect.email}</span>
                      <span className="hidden sm:block">•</span>
                      <span>{prospect.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge
                        variant="outline"
                        className={getStageColor(prospect.stage)}
                      >
                        {
                          stageLabels[
                            prospect.stage as keyof typeof stageLabels
                          ]
                        }
                      </Badge>
                      <Badge variant="outline">
                        {
                          sourceLabels[
                            prospect.source as keyof typeof sourceLabels
                          ]
                        }
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="text-center lg:text-right">
                    <div className="text-xl font-bold">
                      {formatCurrency(prospect.estimatedValue)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Est. Value
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Progress
                        value={prospect.probability}
                        className="w-16 h-2"
                      />
                      <span className="text-sm font-medium">
                        {prospect.probability}%
                      </span>
                    </div>
                  </div>

                  <div className="text-center lg:text-right">
                    <div className="text-sm font-medium">
                      {prospect.nextAction}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Next Action
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Last contact:{" "}
                      {new Date(prospect.lastContact).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Phone className="h-3 w-3 mr-1" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mail className="h-3 w-3 mr-1" />
                      Email
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="h-3 w-3 mr-1" />
                      Schedule
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProspects.length === 0 && (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No prospects found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ||
                selectedStage !== "all" ||
                selectedSource !== "all"
                  ? "Try adjusting your filters or search terms."
                  : "Start by adding your first prospect to the pipeline."}
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Prospect
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
