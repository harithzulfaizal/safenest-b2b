// components/planner-settings.tsx
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import * as React from "react";

export function PlannerSettings() {
  const { toast } = useToast();
  const [saving, setSaving] = React.useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.currentTarget);
    // Simulate save
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Settings saved",
        description: "Your profile and preferences have been updated.",
      });
      // Debug log
      console.log("Planner settings:", Object.fromEntries(formData.entries()));
    }, 800);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">
          Planner Settings
        </h2>
        <p className="text-sm text-muted-foreground">
          Manage your profile, practice preferences, notifications, and
          branding.
        </p>
      </div>

      <form onSubmit={onSubmit} className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Your public information visible to clients.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src="/placeholder.svg?height=64&width=64"
                    alt="Planner avatar"
                  />
                  <AvatarFallback>PL</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button type="button" variant="outline" size="sm">
                    Upload
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    PNG or JPG. Max 1MB.
                  </p>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fullName">Full name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="Sarah Chen"
                  defaultValue="Sarah Chen"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@firm.com"
                  defaultValue="sarah@wms.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" placeholder="+60 12-345 6789" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Senior Financial Planner"
                  defaultValue="Senior Financial Planner"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="firm">Firm</Label>
                <Input
                  id="firm"
                  name="firm"
                  placeholder="Wealth Management Solutions"
                  defaultValue="Wealth Management Solutions"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Choose what updates you receive.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SettingToggle
                id="notif-email"
                label="Email notifications"
                hint="Announcements, reminders, updates"
              />
              <SettingToggle
                id="notif-sms"
                label="SMS notifications"
                hint="Time-sensitive reminders only"
              />
              <SettingToggle
                id="notif-digest"
                label="Weekly digest"
                hint="Summary of activity every Monday"
                defaultChecked
              />
              <Separator />
              <div className="grid gap-2">
                <Label htmlFor="meetingLink">Meeting link</Label>
                <Input
                  id="meetingLink"
                  name="meetingLink"
                  placeholder="https://cal.com/your-handle/intro"
                />
              </div>
              <div className="grid gap-2">
                <Label>Timezone</Label>
                <Select name="timezone" defaultValue="Asia/Kuala_Lumpur">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asia/Kuala_Lumpur">
                      (GMT+8) Asia/Kuala Lumpur
                    </SelectItem>
                    <SelectItem value="Asia/Singapore">
                      (GMT+8) Asia/Singapore
                    </SelectItem>
                    <SelectItem value="America/New_York">
                      (GMT-4) America/New_York
                    </SelectItem>
                    <SelectItem value="Europe/London">
                      (GMT+1) Europe/London
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Professional Details</CardTitle>
              <CardDescription>
                Tell clients more about your specialization and credentials.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="specialties">Specialties</Label>
                <Input
                  id="specialties"
                  name="specialties"
                  placeholder="Retirement, Tax planning, HNW"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="certifications">Certifications</Label>
                <Input
                  id="certifications"
                  name="certifications"
                  placeholder="CFP, CFA, ChFC"
                />
              </div>
              <div className="md:col-span-2 grid gap-2">
                <Label htmlFor="bio">Short bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  placeholder="A sentence or two that describes your practice."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div>
                <CardTitle>Branding</CardTitle>
                <CardDescription>
                  Customize how your workspace appears to clients.
                </CardDescription>
              </div>
              <Badge variant="outline">Firm-wide</Badge>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="brandColor">Primary color</Label>
                <Input
                  id="brandColor"
                  name="brandColor"
                  type="color"
                  defaultValue="#16a34a"
                  className="h-10 p-1"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="logoUrl">Logo URL</Label>
                <Input id="logoUrl" name="logoUrl" placeholder="https://..." />
              </div>
              <div className="md:col-span-2 grid gap-2">
                <Label htmlFor="disclaimer">Compliance disclaimer</Label>
                <Textarea
                  id="disclaimer"
                  name="disclaimer"
                  placeholder="Enter your firm disclaimer text..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => (window.location.href = window.location.href)}
            >
              Reset
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

function SettingToggle(props: {
  id: string;
  label: string;
  hint?: string;
  defaultChecked?: boolean;
}) {
  const [checked, setChecked] = React.useState(!!props.defaultChecked);
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="space-y-1">
        <Label htmlFor={props.id} className="font-normal">
          {props.label}
        </Label>
        {props.hint ? (
          <p className="text-xs text-muted-foreground">{props.hint}</p>
        ) : null}
      </div>
      <Switch
        id={props.id}
        checked={checked}
        onCheckedChange={setChecked}
        name={props.id}
      />
    </div>
  );
}
