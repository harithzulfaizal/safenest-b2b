// components/client-settings.tsx
"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

type ClientSettingsProps = {
  clientData?: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    dateOfBirth?: string;
  };
};

export function ClientSettings({ clientData }: ClientSettingsProps) {
  const { toast } = useToast();
  const [saving, setSaving] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.currentTarget);
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Profile updated",
        description: "Your account settings have been saved.",
      });
      console.log("Client settings:", Object.fromEntries(formData.entries()));
    }, 800);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">My Settings</h2>
        <p className="text-sm text-muted-foreground">
          Manage your personal information, security, and privacy preferences.
        </p>
      </div>

      <form onSubmit={onSubmit} className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Keep your information up to date.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src="/placeholder.svg?height=64&width=64"
                    alt="Client avatar"
                  />
                  <AvatarFallback>CL</AvatarFallback>
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
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  defaultValue={clientData?.name}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@email.com"
                  defaultValue={clientData?.email}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="+60 ..."
                  defaultValue={clientData?.phone}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dob">Date of birth</Label>
                <Input
                  id="dob"
                  name="dob"
                  type="date"
                  defaultValue={clientData?.dateOfBirth}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>
                How we communicate and display information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label>Language</Label>
                <Select name="language" defaultValue="en">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ms">Bahasa Melayu</SelectItem>
                    <SelectItem value="zh">中文</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Currency</Label>
                <Select name="currency" defaultValue="MYR">
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MYR">MYR</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="SGD">SGD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <ToggleRow id="pref-email" label="Email updates" defaultChecked />
              <ToggleRow id="pref-sms" label="SMS reminders" />
              <ToggleRow id="pref-marketing" label="Marketing emails" />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Address</CardTitle>
              <CardDescription>
                Where we will send documents if needed.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="address">Street address</Label>
                <Textarea
                  id="address"
                  name="address"
                  placeholder="Address line"
                  defaultValue={clientData?.address}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" placeholder="City" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" name="state" placeholder="State" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="postal">Postal code</Label>
                  <Input id="postal" name="postal" placeholder="Postal code" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Protect your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ToggleRow
                id="twofa"
                label="Two-factor authentication"
                defaultChecked
              />
              <Separator />
              <div className="grid gap-2 md:grid-cols-3">
                <div className="grid gap-2">
                  <Label htmlFor="currentPassword">Current password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    name="currentPassword"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="newPassword">New password</Label>
                  <Input id="newPassword" type="password" name="newPassword" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Privacy</CardTitle>
              <CardDescription>Control your data and sharing.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ToggleRow
                id="share-advisor"
                label="Allow my planner to see my full transaction details"
                defaultChecked
              />
              <ToggleRow
                id="share-analytics"
                label="Contribute anonymized data to improve analytics"
              />
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    // Simulate data export
                    setTimeout(() => {
                      const blob = new Blob(
                        [
                          JSON.stringify(
                            { exportedAt: new Date().toISOString() },
                            null,
                            2
                          ),
                        ],
                        {
                          type: "application/json",
                        }
                      );
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = "my-data.json";
                      a.click();
                      URL.revokeObjectURL(url);
                    }, 400);
                  }}
                >
                  Export my data
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => setConfirmOpen(true)}
                >
                  Delete my account
                </Button>
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

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete account?</AlertDialogTitle>
            <AlertDialogDescription>
              This action is permanent and cannot be undone. Your data will be
              scheduled for deletion within 30 days.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => {
                setConfirmOpen(false);
                // Simulated delete
                setTimeout(() => {
                  alert("Your account deletion request has been received.");
                }, 400);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function ToggleRow(props: {
  id: string;
  label: string;
  defaultChecked?: boolean;
}) {
  const [checked, setChecked] = React.useState(!!props.defaultChecked);
  return (
    <div className="flex items-center justify-between gap-4">
      <Label htmlFor={props.id} className="font-normal">
        {props.label}
      </Label>
      <Switch
        id={props.id}
        checked={checked}
        onCheckedChange={setChecked}
        name={props.id}
      />
    </div>
  );
}
