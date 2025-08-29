drop extension if exists "pg_net";

create sequence "public"."appointment_statuses_status_id_seq";

create sequence "public"."appointments_appointment_id_seq";

create sequence "public"."assets_asset_id_seq";

create sequence "public"."clients_client_id_seq";

create sequence "public"."planners_planner_id_seq";

create sequence "public"."portfolios_portfolio_id_seq";

create sequence "public"."prospects_prospect_id_seq";

create sequence "public"."report_types_type_id_seq";

create sequence "public"."reports_report_id_seq";

create sequence "public"."risk_profiles_profile_id_seq";

create sequence "public"."task_priorities_priority_id_seq";

create sequence "public"."task_statuses_status_id_seq";

create sequence "public"."tasks_task_id_seq";


  create table "public"."appointment_statuses" (
    "status_id" integer not null default nextval('appointment_statuses_status_id_seq'::regclass),
    "status_name" character varying(50) not null
      );



  create table "public"."appointments" (
    "appointment_id" integer not null default nextval('appointments_appointment_id_seq'::regclass),
    "planner_id" integer,
    "client_id" integer,
    "prospect_id" integer,
    "title" character varying(255) not null,
    "description" text,
    "start_time" timestamp without time zone not null,
    "duration_minutes" integer,
    "location" character varying(255),
    "status_id" integer
      );


alter table "public"."appointments" enable row level security;


  create table "public"."assets" (
    "asset_id" integer not null default nextval('assets_asset_id_seq'::regclass),
    "portfolio_id" integer,
    "asset_name" character varying(255),
    "asset_type" character varying(100),
    "sector" character varying(100),
    "allocation_percentage" numeric(5,2),
    "ytd_return" numeric(5,2)
      );


alter table "public"."assets" enable row level security;


  create table "public"."clients" (
    "client_id" integer not null default nextval('clients_client_id_seq'::regclass),
    "planner_id" integer,
    "full_name" character varying(255) not null,
    "email" character varying(255) not null,
    "phone_number" character varying(20),
    "risk_profile_id" integer,
    "assets_under_management" numeric(15,2),
    "total_gain_loss" numeric(15,2),
    "lifetime_revenue" numeric(15,2),
    "potential_revenue" numeric(15,2),
    "status" character varying(50),
    "created_at" timestamp with time zone default now(),
    "last_contact" date
      );


alter table "public"."clients" enable row level security;


  create table "public"."planners" (
    "planner_id" integer not null default nextval('planners_planner_id_seq'::regclass),
    "full_name" character varying(255) not null,
    "email" character varying(255) not null,
    "phone_number" character varying(20),
    "title" character varying(100),
    "firm" character varying(100),
    "short_bio" text,
    "specialties" text[],
    "certifications" text[],
    "logo_url" character varying(255),
    "primary_color" character varying(7),
    "created_at" timestamp with time zone default now(),
    "user_id" uuid
      );


alter table "public"."planners" enable row level security;


  create table "public"."portfolios" (
    "portfolio_id" integer not null default nextval('portfolios_portfolio_id_seq'::regclass),
    "client_id" integer
      );


alter table "public"."portfolios" enable row level security;


  create table "public"."prospects" (
    "prospect_id" integer not null default nextval('prospects_prospect_id_seq'::regclass),
    "planner_id" integer,
    "full_name" character varying(255) not null,
    "email" character varying(255) not null,
    "phone_number" character varying(20),
    "est_value" numeric(15,2),
    "pipeline_stage" character varying(50),
    "source" character varying(100),
    "last_contact_date" date
      );



  create table "public"."report_types" (
    "type_id" integer not null default nextval('report_types_type_id_seq'::regclass),
    "type_name" character varying(100) not null
      );



  create table "public"."reports" (
    "report_id" integer not null default nextval('reports_report_id_seq'::regclass),
    "planner_id" integer,
    "client_id" integer,
    "report_type_id" integer,
    "title" character varying(255) not null,
    "generated_at" timestamp without time zone not null,
    "file_path" character varying(255),
    "status" character varying(50)
      );



  create table "public"."risk_profiles" (
    "profile_id" integer not null default nextval('risk_profiles_profile_id_seq'::regclass),
    "profile_name" character varying(50) not null
      );



  create table "public"."task_priorities" (
    "priority_id" integer not null default nextval('task_priorities_priority_id_seq'::regclass),
    "priority_name" character varying(50) not null
      );



  create table "public"."task_statuses" (
    "status_id" integer not null default nextval('task_statuses_status_id_seq'::regclass),
    "status_name" character varying(50) not null
      );



  create table "public"."tasks" (
    "task_id" integer not null default nextval('tasks_task_id_seq'::regclass),
    "planner_id" integer,
    "client_id" integer,
    "title" character varying(255) not null,
    "description" text,
    "priority_id" integer,
    "status_id" integer,
    "estimated_hours" numeric(5,2),
    "actual_hours" numeric(5,2),
    "due_date" date
      );


alter table "public"."tasks" enable row level security;

alter sequence "public"."appointment_statuses_status_id_seq" owned by "public"."appointment_statuses"."status_id";

alter sequence "public"."appointments_appointment_id_seq" owned by "public"."appointments"."appointment_id";

alter sequence "public"."assets_asset_id_seq" owned by "public"."assets"."asset_id";

alter sequence "public"."clients_client_id_seq" owned by "public"."clients"."client_id";

alter sequence "public"."planners_planner_id_seq" owned by "public"."planners"."planner_id";

alter sequence "public"."portfolios_portfolio_id_seq" owned by "public"."portfolios"."portfolio_id";

alter sequence "public"."prospects_prospect_id_seq" owned by "public"."prospects"."prospect_id";

alter sequence "public"."report_types_type_id_seq" owned by "public"."report_types"."type_id";

alter sequence "public"."reports_report_id_seq" owned by "public"."reports"."report_id";

alter sequence "public"."risk_profiles_profile_id_seq" owned by "public"."risk_profiles"."profile_id";

alter sequence "public"."task_priorities_priority_id_seq" owned by "public"."task_priorities"."priority_id";

alter sequence "public"."task_statuses_status_id_seq" owned by "public"."task_statuses"."status_id";

alter sequence "public"."tasks_task_id_seq" owned by "public"."tasks"."task_id";

CREATE UNIQUE INDEX appointment_statuses_pkey ON public.appointment_statuses USING btree (status_id);

CREATE UNIQUE INDEX appointment_statuses_status_name_key ON public.appointment_statuses USING btree (status_name);

CREATE UNIQUE INDEX appointments_pkey ON public.appointments USING btree (appointment_id);

CREATE UNIQUE INDEX assets_pkey ON public.assets USING btree (asset_id);

CREATE UNIQUE INDEX clients_email_key ON public.clients USING btree (email);

CREATE UNIQUE INDEX clients_pkey ON public.clients USING btree (client_id);

CREATE INDEX idx_appointments_planner_start ON public.appointments USING btree (planner_id, start_time);

CREATE INDEX idx_clients_planner_created ON public.clients USING btree (planner_id, created_at DESC);

CREATE INDEX idx_tasks_planner_due ON public.tasks USING btree (planner_id, due_date);

CREATE UNIQUE INDEX planners_email_key ON public.planners USING btree (email);

CREATE UNIQUE INDEX planners_pkey ON public.planners USING btree (planner_id);

CREATE UNIQUE INDEX planners_user_id_key ON public.planners USING btree (user_id);

CREATE UNIQUE INDEX portfolios_client_id_key ON public.portfolios USING btree (client_id);

CREATE UNIQUE INDEX portfolios_pkey ON public.portfolios USING btree (portfolio_id);

CREATE UNIQUE INDEX prospects_email_key ON public.prospects USING btree (email);

CREATE UNIQUE INDEX prospects_pkey ON public.prospects USING btree (prospect_id);

CREATE UNIQUE INDEX report_types_pkey ON public.report_types USING btree (type_id);

CREATE UNIQUE INDEX report_types_type_name_key ON public.report_types USING btree (type_name);

CREATE UNIQUE INDEX reports_pkey ON public.reports USING btree (report_id);

CREATE UNIQUE INDEX risk_profiles_pkey ON public.risk_profiles USING btree (profile_id);

CREATE UNIQUE INDEX risk_profiles_profile_name_key ON public.risk_profiles USING btree (profile_name);

CREATE UNIQUE INDEX task_priorities_pkey ON public.task_priorities USING btree (priority_id);

CREATE UNIQUE INDEX task_priorities_priority_name_key ON public.task_priorities USING btree (priority_name);

CREATE UNIQUE INDEX task_statuses_pkey ON public.task_statuses USING btree (status_id);

CREATE UNIQUE INDEX task_statuses_status_name_key ON public.task_statuses USING btree (status_name);

CREATE UNIQUE INDEX tasks_pkey ON public.tasks USING btree (task_id);

alter table "public"."appointment_statuses" add constraint "appointment_statuses_pkey" PRIMARY KEY using index "appointment_statuses_pkey";

alter table "public"."appointments" add constraint "appointments_pkey" PRIMARY KEY using index "appointments_pkey";

alter table "public"."assets" add constraint "assets_pkey" PRIMARY KEY using index "assets_pkey";

alter table "public"."clients" add constraint "clients_pkey" PRIMARY KEY using index "clients_pkey";

alter table "public"."planners" add constraint "planners_pkey" PRIMARY KEY using index "planners_pkey";

alter table "public"."portfolios" add constraint "portfolios_pkey" PRIMARY KEY using index "portfolios_pkey";

alter table "public"."prospects" add constraint "prospects_pkey" PRIMARY KEY using index "prospects_pkey";

alter table "public"."report_types" add constraint "report_types_pkey" PRIMARY KEY using index "report_types_pkey";

alter table "public"."reports" add constraint "reports_pkey" PRIMARY KEY using index "reports_pkey";

alter table "public"."risk_profiles" add constraint "risk_profiles_pkey" PRIMARY KEY using index "risk_profiles_pkey";

alter table "public"."task_priorities" add constraint "task_priorities_pkey" PRIMARY KEY using index "task_priorities_pkey";

alter table "public"."task_statuses" add constraint "task_statuses_pkey" PRIMARY KEY using index "task_statuses_pkey";

alter table "public"."tasks" add constraint "tasks_pkey" PRIMARY KEY using index "tasks_pkey";

alter table "public"."appointment_statuses" add constraint "appointment_statuses_status_name_key" UNIQUE using index "appointment_statuses_status_name_key";

alter table "public"."appointments" add constraint "appointments_client_id_fkey" FOREIGN KEY (client_id) REFERENCES clients(client_id) ON DELETE SET NULL not valid;

alter table "public"."appointments" validate constraint "appointments_client_id_fkey";

alter table "public"."appointments" add constraint "appointments_planner_id_fkey" FOREIGN KEY (planner_id) REFERENCES planners(planner_id) ON DELETE SET NULL not valid;

alter table "public"."appointments" validate constraint "appointments_planner_id_fkey";

alter table "public"."appointments" add constraint "appointments_prospect_id_fkey" FOREIGN KEY (prospect_id) REFERENCES prospects(prospect_id) ON DELETE SET NULL not valid;

alter table "public"."appointments" validate constraint "appointments_prospect_id_fkey";

alter table "public"."appointments" add constraint "appointments_status_id_fkey" FOREIGN KEY (status_id) REFERENCES appointment_statuses(status_id) not valid;

alter table "public"."appointments" validate constraint "appointments_status_id_fkey";

alter table "public"."assets" add constraint "assets_portfolio_id_fkey" FOREIGN KEY (portfolio_id) REFERENCES portfolios(portfolio_id) ON DELETE CASCADE not valid;

alter table "public"."assets" validate constraint "assets_portfolio_id_fkey";

alter table "public"."clients" add constraint "clients_email_key" UNIQUE using index "clients_email_key";

alter table "public"."clients" add constraint "clients_planner_id_fkey" FOREIGN KEY (planner_id) REFERENCES planners(planner_id) ON DELETE SET NULL not valid;

alter table "public"."clients" validate constraint "clients_planner_id_fkey";

alter table "public"."clients" add constraint "clients_risk_profile_id_fkey" FOREIGN KEY (risk_profile_id) REFERENCES risk_profiles(profile_id) not valid;

alter table "public"."clients" validate constraint "clients_risk_profile_id_fkey";

alter table "public"."planners" add constraint "planners_email_key" UNIQUE using index "planners_email_key";

alter table "public"."planners" add constraint "planners_user_id_key" UNIQUE using index "planners_user_id_key";

alter table "public"."portfolios" add constraint "portfolios_client_id_fkey" FOREIGN KEY (client_id) REFERENCES clients(client_id) ON DELETE CASCADE not valid;

alter table "public"."portfolios" validate constraint "portfolios_client_id_fkey";

alter table "public"."portfolios" add constraint "portfolios_client_id_key" UNIQUE using index "portfolios_client_id_key";

alter table "public"."prospects" add constraint "prospects_email_key" UNIQUE using index "prospects_email_key";

alter table "public"."prospects" add constraint "prospects_planner_id_fkey" FOREIGN KEY (planner_id) REFERENCES planners(planner_id) ON DELETE SET NULL not valid;

alter table "public"."prospects" validate constraint "prospects_planner_id_fkey";

alter table "public"."report_types" add constraint "report_types_type_name_key" UNIQUE using index "report_types_type_name_key";

alter table "public"."reports" add constraint "reports_client_id_fkey" FOREIGN KEY (client_id) REFERENCES clients(client_id) ON DELETE SET NULL not valid;

alter table "public"."reports" validate constraint "reports_client_id_fkey";

alter table "public"."reports" add constraint "reports_planner_id_fkey" FOREIGN KEY (planner_id) REFERENCES planners(planner_id) ON DELETE SET NULL not valid;

alter table "public"."reports" validate constraint "reports_planner_id_fkey";

alter table "public"."reports" add constraint "reports_report_type_id_fkey" FOREIGN KEY (report_type_id) REFERENCES report_types(type_id) not valid;

alter table "public"."reports" validate constraint "reports_report_type_id_fkey";

alter table "public"."risk_profiles" add constraint "risk_profiles_profile_name_key" UNIQUE using index "risk_profiles_profile_name_key";

alter table "public"."task_priorities" add constraint "task_priorities_priority_name_key" UNIQUE using index "task_priorities_priority_name_key";

alter table "public"."task_statuses" add constraint "task_statuses_status_name_key" UNIQUE using index "task_statuses_status_name_key";

alter table "public"."tasks" add constraint "tasks_client_id_fkey" FOREIGN KEY (client_id) REFERENCES clients(client_id) ON DELETE SET NULL not valid;

alter table "public"."tasks" validate constraint "tasks_client_id_fkey";

alter table "public"."tasks" add constraint "tasks_planner_id_fkey" FOREIGN KEY (planner_id) REFERENCES planners(planner_id) ON DELETE SET NULL not valid;

alter table "public"."tasks" validate constraint "tasks_planner_id_fkey";

alter table "public"."tasks" add constraint "tasks_priority_id_fkey" FOREIGN KEY (priority_id) REFERENCES task_priorities(priority_id) not valid;

alter table "public"."tasks" validate constraint "tasks_priority_id_fkey";

alter table "public"."tasks" add constraint "tasks_status_id_fkey" FOREIGN KEY (status_id) REFERENCES task_statuses(status_id) not valid;

alter table "public"."tasks" validate constraint "tasks_status_id_fkey";

grant delete on table "public"."appointment_statuses" to "anon";

grant insert on table "public"."appointment_statuses" to "anon";

grant references on table "public"."appointment_statuses" to "anon";

grant select on table "public"."appointment_statuses" to "anon";

grant trigger on table "public"."appointment_statuses" to "anon";

grant truncate on table "public"."appointment_statuses" to "anon";

grant update on table "public"."appointment_statuses" to "anon";

grant delete on table "public"."appointment_statuses" to "authenticated";

grant insert on table "public"."appointment_statuses" to "authenticated";

grant references on table "public"."appointment_statuses" to "authenticated";

grant select on table "public"."appointment_statuses" to "authenticated";

grant trigger on table "public"."appointment_statuses" to "authenticated";

grant truncate on table "public"."appointment_statuses" to "authenticated";

grant update on table "public"."appointment_statuses" to "authenticated";

grant delete on table "public"."appointment_statuses" to "service_role";

grant insert on table "public"."appointment_statuses" to "service_role";

grant references on table "public"."appointment_statuses" to "service_role";

grant select on table "public"."appointment_statuses" to "service_role";

grant trigger on table "public"."appointment_statuses" to "service_role";

grant truncate on table "public"."appointment_statuses" to "service_role";

grant update on table "public"."appointment_statuses" to "service_role";

grant delete on table "public"."appointments" to "anon";

grant insert on table "public"."appointments" to "anon";

grant references on table "public"."appointments" to "anon";

grant select on table "public"."appointments" to "anon";

grant trigger on table "public"."appointments" to "anon";

grant truncate on table "public"."appointments" to "anon";

grant update on table "public"."appointments" to "anon";

grant delete on table "public"."appointments" to "authenticated";

grant insert on table "public"."appointments" to "authenticated";

grant references on table "public"."appointments" to "authenticated";

grant select on table "public"."appointments" to "authenticated";

grant trigger on table "public"."appointments" to "authenticated";

grant truncate on table "public"."appointments" to "authenticated";

grant update on table "public"."appointments" to "authenticated";

grant delete on table "public"."appointments" to "service_role";

grant insert on table "public"."appointments" to "service_role";

grant references on table "public"."appointments" to "service_role";

grant select on table "public"."appointments" to "service_role";

grant trigger on table "public"."appointments" to "service_role";

grant truncate on table "public"."appointments" to "service_role";

grant update on table "public"."appointments" to "service_role";

grant delete on table "public"."assets" to "anon";

grant insert on table "public"."assets" to "anon";

grant references on table "public"."assets" to "anon";

grant select on table "public"."assets" to "anon";

grant trigger on table "public"."assets" to "anon";

grant truncate on table "public"."assets" to "anon";

grant update on table "public"."assets" to "anon";

grant delete on table "public"."assets" to "authenticated";

grant insert on table "public"."assets" to "authenticated";

grant references on table "public"."assets" to "authenticated";

grant select on table "public"."assets" to "authenticated";

grant trigger on table "public"."assets" to "authenticated";

grant truncate on table "public"."assets" to "authenticated";

grant update on table "public"."assets" to "authenticated";

grant delete on table "public"."assets" to "service_role";

grant insert on table "public"."assets" to "service_role";

grant references on table "public"."assets" to "service_role";

grant select on table "public"."assets" to "service_role";

grant trigger on table "public"."assets" to "service_role";

grant truncate on table "public"."assets" to "service_role";

grant update on table "public"."assets" to "service_role";

grant delete on table "public"."clients" to "anon";

grant insert on table "public"."clients" to "anon";

grant references on table "public"."clients" to "anon";

grant select on table "public"."clients" to "anon";

grant trigger on table "public"."clients" to "anon";

grant truncate on table "public"."clients" to "anon";

grant update on table "public"."clients" to "anon";

grant delete on table "public"."clients" to "authenticated";

grant insert on table "public"."clients" to "authenticated";

grant references on table "public"."clients" to "authenticated";

grant select on table "public"."clients" to "authenticated";

grant trigger on table "public"."clients" to "authenticated";

grant truncate on table "public"."clients" to "authenticated";

grant update on table "public"."clients" to "authenticated";

grant delete on table "public"."clients" to "service_role";

grant insert on table "public"."clients" to "service_role";

grant references on table "public"."clients" to "service_role";

grant select on table "public"."clients" to "service_role";

grant trigger on table "public"."clients" to "service_role";

grant truncate on table "public"."clients" to "service_role";

grant update on table "public"."clients" to "service_role";

grant delete on table "public"."planners" to "anon";

grant insert on table "public"."planners" to "anon";

grant references on table "public"."planners" to "anon";

grant select on table "public"."planners" to "anon";

grant trigger on table "public"."planners" to "anon";

grant truncate on table "public"."planners" to "anon";

grant update on table "public"."planners" to "anon";

grant delete on table "public"."planners" to "authenticated";

grant insert on table "public"."planners" to "authenticated";

grant references on table "public"."planners" to "authenticated";

grant select on table "public"."planners" to "authenticated";

grant trigger on table "public"."planners" to "authenticated";

grant truncate on table "public"."planners" to "authenticated";

grant update on table "public"."planners" to "authenticated";

grant delete on table "public"."planners" to "service_role";

grant insert on table "public"."planners" to "service_role";

grant references on table "public"."planners" to "service_role";

grant select on table "public"."planners" to "service_role";

grant trigger on table "public"."planners" to "service_role";

grant truncate on table "public"."planners" to "service_role";

grant update on table "public"."planners" to "service_role";

grant delete on table "public"."portfolios" to "anon";

grant insert on table "public"."portfolios" to "anon";

grant references on table "public"."portfolios" to "anon";

grant select on table "public"."portfolios" to "anon";

grant trigger on table "public"."portfolios" to "anon";

grant truncate on table "public"."portfolios" to "anon";

grant update on table "public"."portfolios" to "anon";

grant delete on table "public"."portfolios" to "authenticated";

grant insert on table "public"."portfolios" to "authenticated";

grant references on table "public"."portfolios" to "authenticated";

grant select on table "public"."portfolios" to "authenticated";

grant trigger on table "public"."portfolios" to "authenticated";

grant truncate on table "public"."portfolios" to "authenticated";

grant update on table "public"."portfolios" to "authenticated";

grant delete on table "public"."portfolios" to "service_role";

grant insert on table "public"."portfolios" to "service_role";

grant references on table "public"."portfolios" to "service_role";

grant select on table "public"."portfolios" to "service_role";

grant trigger on table "public"."portfolios" to "service_role";

grant truncate on table "public"."portfolios" to "service_role";

grant update on table "public"."portfolios" to "service_role";

grant delete on table "public"."prospects" to "anon";

grant insert on table "public"."prospects" to "anon";

grant references on table "public"."prospects" to "anon";

grant select on table "public"."prospects" to "anon";

grant trigger on table "public"."prospects" to "anon";

grant truncate on table "public"."prospects" to "anon";

grant update on table "public"."prospects" to "anon";

grant delete on table "public"."prospects" to "authenticated";

grant insert on table "public"."prospects" to "authenticated";

grant references on table "public"."prospects" to "authenticated";

grant select on table "public"."prospects" to "authenticated";

grant trigger on table "public"."prospects" to "authenticated";

grant truncate on table "public"."prospects" to "authenticated";

grant update on table "public"."prospects" to "authenticated";

grant delete on table "public"."prospects" to "service_role";

grant insert on table "public"."prospects" to "service_role";

grant references on table "public"."prospects" to "service_role";

grant select on table "public"."prospects" to "service_role";

grant trigger on table "public"."prospects" to "service_role";

grant truncate on table "public"."prospects" to "service_role";

grant update on table "public"."prospects" to "service_role";

grant delete on table "public"."report_types" to "anon";

grant insert on table "public"."report_types" to "anon";

grant references on table "public"."report_types" to "anon";

grant select on table "public"."report_types" to "anon";

grant trigger on table "public"."report_types" to "anon";

grant truncate on table "public"."report_types" to "anon";

grant update on table "public"."report_types" to "anon";

grant delete on table "public"."report_types" to "authenticated";

grant insert on table "public"."report_types" to "authenticated";

grant references on table "public"."report_types" to "authenticated";

grant select on table "public"."report_types" to "authenticated";

grant trigger on table "public"."report_types" to "authenticated";

grant truncate on table "public"."report_types" to "authenticated";

grant update on table "public"."report_types" to "authenticated";

grant delete on table "public"."report_types" to "service_role";

grant insert on table "public"."report_types" to "service_role";

grant references on table "public"."report_types" to "service_role";

grant select on table "public"."report_types" to "service_role";

grant trigger on table "public"."report_types" to "service_role";

grant truncate on table "public"."report_types" to "service_role";

grant update on table "public"."report_types" to "service_role";

grant delete on table "public"."reports" to "anon";

grant insert on table "public"."reports" to "anon";

grant references on table "public"."reports" to "anon";

grant select on table "public"."reports" to "anon";

grant trigger on table "public"."reports" to "anon";

grant truncate on table "public"."reports" to "anon";

grant update on table "public"."reports" to "anon";

grant delete on table "public"."reports" to "authenticated";

grant insert on table "public"."reports" to "authenticated";

grant references on table "public"."reports" to "authenticated";

grant select on table "public"."reports" to "authenticated";

grant trigger on table "public"."reports" to "authenticated";

grant truncate on table "public"."reports" to "authenticated";

grant update on table "public"."reports" to "authenticated";

grant delete on table "public"."reports" to "service_role";

grant insert on table "public"."reports" to "service_role";

grant references on table "public"."reports" to "service_role";

grant select on table "public"."reports" to "service_role";

grant trigger on table "public"."reports" to "service_role";

grant truncate on table "public"."reports" to "service_role";

grant update on table "public"."reports" to "service_role";

grant delete on table "public"."risk_profiles" to "anon";

grant insert on table "public"."risk_profiles" to "anon";

grant references on table "public"."risk_profiles" to "anon";

grant select on table "public"."risk_profiles" to "anon";

grant trigger on table "public"."risk_profiles" to "anon";

grant truncate on table "public"."risk_profiles" to "anon";

grant update on table "public"."risk_profiles" to "anon";

grant delete on table "public"."risk_profiles" to "authenticated";

grant insert on table "public"."risk_profiles" to "authenticated";

grant references on table "public"."risk_profiles" to "authenticated";

grant select on table "public"."risk_profiles" to "authenticated";

grant trigger on table "public"."risk_profiles" to "authenticated";

grant truncate on table "public"."risk_profiles" to "authenticated";

grant update on table "public"."risk_profiles" to "authenticated";

grant delete on table "public"."risk_profiles" to "service_role";

grant insert on table "public"."risk_profiles" to "service_role";

grant references on table "public"."risk_profiles" to "service_role";

grant select on table "public"."risk_profiles" to "service_role";

grant trigger on table "public"."risk_profiles" to "service_role";

grant truncate on table "public"."risk_profiles" to "service_role";

grant update on table "public"."risk_profiles" to "service_role";

grant delete on table "public"."task_priorities" to "anon";

grant insert on table "public"."task_priorities" to "anon";

grant references on table "public"."task_priorities" to "anon";

grant select on table "public"."task_priorities" to "anon";

grant trigger on table "public"."task_priorities" to "anon";

grant truncate on table "public"."task_priorities" to "anon";

grant update on table "public"."task_priorities" to "anon";

grant delete on table "public"."task_priorities" to "authenticated";

grant insert on table "public"."task_priorities" to "authenticated";

grant references on table "public"."task_priorities" to "authenticated";

grant select on table "public"."task_priorities" to "authenticated";

grant trigger on table "public"."task_priorities" to "authenticated";

grant truncate on table "public"."task_priorities" to "authenticated";

grant update on table "public"."task_priorities" to "authenticated";

grant delete on table "public"."task_priorities" to "service_role";

grant insert on table "public"."task_priorities" to "service_role";

grant references on table "public"."task_priorities" to "service_role";

grant select on table "public"."task_priorities" to "service_role";

grant trigger on table "public"."task_priorities" to "service_role";

grant truncate on table "public"."task_priorities" to "service_role";

grant update on table "public"."task_priorities" to "service_role";

grant delete on table "public"."task_statuses" to "anon";

grant insert on table "public"."task_statuses" to "anon";

grant references on table "public"."task_statuses" to "anon";

grant select on table "public"."task_statuses" to "anon";

grant trigger on table "public"."task_statuses" to "anon";

grant truncate on table "public"."task_statuses" to "anon";

grant update on table "public"."task_statuses" to "anon";

grant delete on table "public"."task_statuses" to "authenticated";

grant insert on table "public"."task_statuses" to "authenticated";

grant references on table "public"."task_statuses" to "authenticated";

grant select on table "public"."task_statuses" to "authenticated";

grant trigger on table "public"."task_statuses" to "authenticated";

grant truncate on table "public"."task_statuses" to "authenticated";

grant update on table "public"."task_statuses" to "authenticated";

grant delete on table "public"."task_statuses" to "service_role";

grant insert on table "public"."task_statuses" to "service_role";

grant references on table "public"."task_statuses" to "service_role";

grant select on table "public"."task_statuses" to "service_role";

grant trigger on table "public"."task_statuses" to "service_role";

grant truncate on table "public"."task_statuses" to "service_role";

grant update on table "public"."task_statuses" to "service_role";

grant delete on table "public"."tasks" to "anon";

grant insert on table "public"."tasks" to "anon";

grant references on table "public"."tasks" to "anon";

grant select on table "public"."tasks" to "anon";

grant trigger on table "public"."tasks" to "anon";

grant truncate on table "public"."tasks" to "anon";

grant update on table "public"."tasks" to "anon";

grant delete on table "public"."tasks" to "authenticated";

grant insert on table "public"."tasks" to "authenticated";

grant references on table "public"."tasks" to "authenticated";

grant select on table "public"."tasks" to "authenticated";

grant trigger on table "public"."tasks" to "authenticated";

grant truncate on table "public"."tasks" to "authenticated";

grant update on table "public"."tasks" to "authenticated";

grant delete on table "public"."tasks" to "service_role";

grant insert on table "public"."tasks" to "service_role";

grant references on table "public"."tasks" to "service_role";

grant select on table "public"."tasks" to "service_role";

grant trigger on table "public"."tasks" to "service_role";

grant truncate on table "public"."tasks" to "service_role";

grant update on table "public"."tasks" to "service_role";


  create policy "planner sees own appointments"
  on "public"."appointments"
  as permissive
  for select
  to public
using ((planner_id IN ( SELECT planners.planner_id
   FROM planners
  WHERE ((planners.email)::text = (auth.jwt() ->> 'email'::text)))));



  create policy "planner sees assets"
  on "public"."assets"
  as permissive
  for select
  to public
using ((portfolio_id IN ( SELECT portfolios.portfolio_id
   FROM portfolios
  WHERE (portfolios.client_id IN ( SELECT clients.client_id
           FROM clients
          WHERE (clients.planner_id IN ( SELECT planners.planner_id
                   FROM planners
                  WHERE ((planners.email)::text = (auth.jwt() ->> 'email'::text)))))))));



  create policy "planner sees own clients"
  on "public"."clients"
  as permissive
  for select
  to public
using ((planner_id IN ( SELECT planners.planner_id
   FROM planners
  WHERE ((planners.email)::text = (auth.jwt() ->> 'email'::text)))));



  create policy "planner can see self"
  on "public"."planners"
  as permissive
  for select
  to public
using (((email)::text = (auth.jwt() ->> 'email'::text)));



  create policy "planner sees portfolios"
  on "public"."portfolios"
  as permissive
  for select
  to public
using ((client_id IN ( SELECT clients.client_id
   FROM clients
  WHERE (clients.planner_id IN ( SELECT planners.planner_id
           FROM planners
          WHERE ((planners.email)::text = (auth.jwt() ->> 'email'::text)))))));



  create policy "planner sees own tasks"
  on "public"."tasks"
  as permissive
  for select
  to public
using ((planner_id IN ( SELECT planners.planner_id
   FROM planners
  WHERE ((planners.email)::text = (auth.jwt() ->> 'email'::text)))));



