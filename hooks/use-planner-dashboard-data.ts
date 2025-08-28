// hooks/use-planner-dashboard-data.ts
"use client";

import { supabase } from "@/lib/supabase-browser";
import { isThisMonth } from "date-fns";
import { useEffect, useMemo, useState } from "react";

export type DashboardClient = {
  id: string; // mapped from client_id
  name: string; // full_name
  email: string;
  phoneNumber: string | null;
  riskProfile: string | null; // joined name
  portfolioValue: number; // assets_under_management
  status: string | null;
  lastContact: string | null; // last_contact (YYYY-MM-DD)
  joinDate: string; // created_at as ISO
};

export type AppointmentItem = {
  id: string;
  clientName: string | null;
  prospectName: string | null;
  title: string;
  timeISO: string; // start_time
  status: string | null;
};

export type TaskItem = {
  id: string;
  title: string;
  dueDate: string | null;
  priority: string | null;
  status: string | null;
  clientName: string | null;
};

export function usePlannerDashboardData() {
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState<DashboardClient[]>([]);
  const [appointmentsToday, setAppointmentsToday] = useState<AppointmentItem[]>(
    []
  );
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);

      // 1) Clients + risk profile name
      const { data: clientRows, error: clientsErr } = await supabase
        .from("clients")
        .select(
          `
          client_id,
          full_name,
          email,
          phone_number,
          status,
          assets_under_management,
          last_contact,
          created_at,
          risk_profiles:risk_profile_id(profile_name)
        `
        )
        .order("created_at", { ascending: false });

      if (clientsErr) {
        setError(clientsErr.message);
        setLoading(false);
        return;
      }

      const mappedClients: DashboardClient[] = (clientRows ?? []).map(
        (c: any) => ({
          id: String(c.client_id),
          name: c.full_name,
          email: c.email,
          phoneNumber: c.phone_number,
          status: c.status,
          portfolioValue: Number(c.assets_under_management ?? 0),
          riskProfile: c.risk_profiles?.profile_name ?? null,
          lastContact: c.last_contact ? String(c.last_contact) : null,
          joinDate: c.created_at,
        })
      );

      setClients(mappedClients);

      // 2) Appointments (today only)
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      const todayEnd = new Date();
      todayEnd.setHours(23, 59, 59, 999);

      const { data: appts, error: apptErr } = await supabase
        .from("appointments")
        .select(
          `
          appointment_id,
          title,
          start_time,
          status:status_id(status_name),
          client:client_id(full_name),
          prospect:prospect_id(full_name)
        `
        )
        .gte("start_time", todayStart.toISOString())
        .lte("start_time", todayEnd.toISOString())
        .order("start_time", { ascending: true });

      if (apptErr) {
        setError(apptErr.message);
        setLoading(false);
        return;
      }

      const mappedAppts: AppointmentItem[] = (appts ?? []).map((a: any) => ({
        id: String(a.appointment_id),
        title: a.title,
        timeISO: a.start_time,
        status: a.status?.status_name ?? null,
        clientName: a.client?.full_name ?? null,
        prospectName: a.prospect?.full_name ?? null,
      }));

      setAppointmentsToday(mappedAppts);

      // 3) Tasks (open-ish)
      const { data: taskRows, error: taskErr } = await supabase
        .from("tasks")
        .select(
          `
          task_id,
          title,
          due_date,
          priority:priority_id(priority_name),
          tstatus:status_id(status_name),
          client:client_id(full_name)
        `
        )
        .in(
          "status_id",
          // if your status table has these rows, you can also fetch by join names first
          // here we simply don't filter and let UI decide; or filter later.
          [] as number[]
        )
        .order("due_date", { ascending: true });

      if (taskErr && taskErr.code !== "PGRST116") {
        // PGRST116 can occur when .in() is empty; ignore
        setError(taskErr.message);
        setLoading(false);
        return;
      }

      const mappedTasks: TaskItem[] = (taskRows ?? []).map((t: any) => ({
        id: String(t.task_id),
        title: t.title,
        dueDate: t.due_date ?? null,
        priority: t.priority?.priority_name ?? null,
        status: t.tstatus?.status_name ?? null,
        clientName: t.client?.full_name ?? null,
      }));

      setTasks(mappedTasks);
      setLoading(false);
    })();
  }, []);

  // Derived metrics for your cards
  const metrics = useMemo(() => {
    const totalAUM = clients.reduce((s, c) => s + (c.portfolioValue || 0), 0);
    const active = clients.filter((c) => c.status === "active").length;
    const needsAttention = clients.filter(
      (c) => c.status === "needs-attention"
    ).length;
    const newThisMonth = clients.filter(
      (c) => c.joinDate && isThisMonth(new Date(c.joinDate))
    ).length;

    // Appointments today count
    const apptCount = appointmentsToday.length;

    // “Pending tasks” example: To Do / In Progress / Overdue
    const pending = tasks.filter((t) =>
      ["To Do", "In Progress", "Overdue"].includes(t.status ?? "")
    ).length;

    return {
      totalClients: clients.length,
      totalAUM,
      activeClients: active,
      reviewsDue: needsAttention,
      newClientsThisMonth: newThisMonth,
      appointmentsToday: apptCount,
      pendingTasks: pending,
    };
  }, [clients, appointmentsToday, tasks]);

  return { loading, error, clients, appointmentsToday, tasks, metrics };
}
