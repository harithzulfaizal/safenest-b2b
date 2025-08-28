-- This schema is designed to support the data shown in the FinanceApp screenshots.
-- It establishes relational integrity between different entities like clients, prospects,
-- appointments, and tasks using foreign keys.

-- Planner Table: Stores the details of the financial planner.
CREATE TABLE planners (
planner_id SERIAL PRIMARY KEY,
full_name VARCHAR(255) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
phone_number VARCHAR(20),
title VARCHAR(100),
firm VARCHAR(100),
short_bio TEXT,
specialties TEXT[], -- Using an array for multiple specialties
certifications TEXT[], -- Using an array for multiple certifications
logo_url VARCHAR(255),
primary_color VARCHAR(7) -- Hex code for branding
);

-- Risk Profiles Table: A lookup table for standardizing client risk profiles.
CREATE TABLE risk_profiles (
profile_id SERIAL PRIMARY KEY,
profile_name VARCHAR(50) UNIQUE NOT NULL -- e.g., 'Conservative', 'Moderate', 'Aggressive'
);

-- Client Table: The core table for all client information.
CREATE TABLE clients (
client_id SERIAL PRIMARY KEY,
planner_id INT REFERENCES planners(planner_id) ON DELETE SET NULL, -- A client is managed by a planner
full_name VARCHAR(255) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
phone_number VARCHAR(20),
risk_profile_id INT REFERENCES risk_profiles(profile_id), -- Links to a standardized risk profile
assets_under_management DECIMAL(15, 2),
total_gain_loss DECIMAL(15, 2),
lifetime_revenue DECIMAL(15, 2),
potential_revenue DECIMAL(15, 2),
status VARCHAR(50) -- e.g., 'active', 'inactive'
);

-- Prospects Table: Stores information on potential clients in the sales pipeline.
CREATE TABLE prospects (
prospect_id SERIAL PRIMARY KEY,
planner_id INT REFERENCES planners(planner_id) ON DELETE SET NULL,
full_name VARCHAR(255) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
phone_number VARCHAR(20),
est_value DECIMAL(15, 2),
pipeline_stage VARCHAR(50), -- e.g., 'Lead', 'Initial Contact', 'Qualified', 'Proposal', 'Negotiation', 'Closed'
source VARCHAR(100),
last_contact_date DATE
);

-- Appointment Statuses Table: A lookup table for appointment statuses.
CREATE TABLE appointment_statuses (
status_id SERIAL PRIMARY KEY,
status_name VARCHAR(50) UNIQUE NOT NULL -- e.g., 'Confirmed', 'Pending', 'Canceled'
);

-- Appointments Table: Manages scheduled meetings.
CREATE TABLE appointments (
appointment_id SERIAL PRIMARY KEY,
planner_id INT REFERENCES planners(planner_id) ON DELETE SET NULL,
client_id INT REFERENCES clients(client_id) ON DELETE SET NULL, -- An appointment can be with a client...
prospect_id INT REFERENCES prospects(prospect_id) ON DELETE SET NULL, -- ... or a prospect. One of these must be NULL.
title VARCHAR(255) NOT NULL,
description TEXT,
start_time TIMESTAMP NOT NULL,
duration_minutes INT,
location VARCHAR(255),
status_id INT REFERENCES appointment_statuses(status_id) -- Links to a standardized status
);

-- Task Priorities Table: A lookup table for standardizing task priorities.
CREATE TABLE task_priorities (
priority_id SERIAL PRIMARY KEY,
priority_name VARCHAR(50) UNIQUE NOT NULL -- e.g., 'High', 'Medium', 'Low'
);

-- Task Statuses Table: A lookup table for standardizing task statuses.
CREATE TABLE task_statuses (
status_id SERIAL PRIMARY KEY,
status_name VARCHAR(50) UNIQUE NOT NULL -- e.g., 'To Do', 'In Progress', 'Overdue', 'Completed'
);

-- Tasks Table: Stores all active and completed tasks.
CREATE TABLE tasks (
task_id SERIAL PRIMARY KEY,
planner_id INT REFERENCES planners(planner_id) ON DELETE SET NULL,
client_id INT REFERENCES clients(client_id) ON DELETE SET NULL,
title VARCHAR(255) NOT NULL,
description TEXT,
priority_id INT REFERENCES task_priorities(priority_id),
status_id INT REFERENCES task_statuses(status_id),
estimated_hours DECIMAL(5, 2),
actual_hours DECIMAL(5, 2),
due_date DATE
);

-- Report Types Table: A lookup table for report categories.
CREATE TABLE report_types (
type_id SERIAL PRIMARY KEY,
type_name VARCHAR(100) UNIQUE NOT NULL -- e.g., 'Client Reports', 'Portfolio Reports', etc.
);

-- Reports Table: Stores generated reports.
CREATE TABLE reports (
report_id SERIAL PRIMARY KEY,
planner_id INT REFERENCES planners(planner_id) ON DELETE SET NULL,
client_id INT REFERENCES clients(client_id) ON DELETE SET NULL,
report_type_id INT REFERENCES report_types(type_id),
title VARCHAR(255) NOT NULL,
generated_at TIMESTAMP NOT NULL,
file_path VARCHAR(255), -- Or link to a file storage service
status VARCHAR(50) -- e.g., 'Completed', 'Generating', 'Scheduled'
);

-- Portfolios Table: A client's portfolio.
CREATE TABLE portfolios (
portfolio_id SERIAL PRIMARY KEY,
client_id INT UNIQUE REFERENCES clients(client_id) ON DELETE CASCADE -- Each client has one portfolio
);

-- Asset Table: Stores individual assets within a portfolio.
CREATE TABLE assets (
asset_id SERIAL PRIMARY KEY,
portfolio_id INT REFERENCES portfolios(portfolio_id) ON DELETE CASCADE,
asset_name VARCHAR(255),
asset_type VARCHAR(100), -- e.g., 'Equities', 'Fixed Income', 'Real Estate'
sector VARCHAR(100),
allocation_percentage DECIMAL(5, 2),
ytd_return DECIMAL(5, 2)
);

-- INSERT statements to populate the tables with sample data.

-- Populate lookup tables first
INSERT INTO risk_profiles (profile_name) VALUES
('Conservative'), ('Moderate'), ('Aggressive');

INSERT INTO appointment_statuses (status_name) VALUES
('Confirmed'), ('Pending'), ('Canceled');

INSERT INTO task_priorities (priority_name) VALUES
('High'), ('Medium'), ('Low');

INSERT INTO task_statuses (status_name) VALUES
('To Do'), ('In Progress'), ('Overdue'), ('Completed');

INSERT INTO report_types (type_name) VALUES
('Client Reports'), ('Portfolio Reports'), ('Performance Reports'), ('Business Reports'), ('Compliance Reports');

-- Populate planner
INSERT INTO planners (full_name, email, phone_number, title, firm, short_bio, specialties, certifications, logo_url, primary_color) VALUES
('Sarah Chen', 'sarah@acme.com', '+60 12-345 6789', 'Senior Financial Planner', 'Wealth Management Solutions', 'A sentence or two that describes your practice.', ARRAY['Retirement', 'Tax planning', 'HNW'], ARRAY['CFP', 'CFA', 'ChFC'], 'https://placehold.co/100x100', '#2E8B57');

-- Populate clients
INSERT INTO clients (planner_id, full_name, email, phone_number, risk_profile_id, assets_under_management, total_gain_loss, lifetime_revenue, potential_revenue, status) VALUES
(1, 'John Doe', 'john.doe@email.com', '+60 12-345 6789', 2, 450000.00, 45000.00, 16000.00, 7300.00, 'active'),
(1, 'Sarah Lim', 'sarah.lim@email.com', '+60 12-867 6543', 1, 280000.00, -8000.00, 8000.00, 0.00, 'active'),
(1, 'Ahmad Rahman', 'ahmad.rahman@email.com', '+60 12-555 1234', 3, 750000.00, 125000.00, 25000.00, 5800.00, 'active');

-- Populate prospects
INSERT INTO prospects (planner_id, full_name, email, phone_number, est_value, pipeline_stage, source, last_contact_date) VALUES
(1, 'Michael Chen', 'michael.chen@email.com', '+60 12-345 6789', 250000.00, 'Qualified', 'Referral', '2024-10-15'),
(1, 'Lisa Wong', 'lisa.wong@email.com', '+60 12-987 6543', 180000.00, 'Proposal', 'Website', '2024-10-15'),
(1, 'David Kumar', 'david.kumar@email.com', '+60 12-558 1234', 320000.00, 'Negotiation', 'Linkedin', '2024-10-15');

-- Populate appointments
INSERT INTO appointments (planner_id, client_id, prospect_id, title, description, start_time, duration_minutes, location, status_id) VALUES
(1, 1, NULL, 'Quarterly portfolio review and rebalancing discussion', 'Office Conference Room A', '2025-08-25 09:00:00', 60, 'Office Conference Room A', 1),
(1, 2, NULL, 'Initial financial planning consultation', 'via virtual', '2025-08-25 11:00:00', 45, 'via virtual', 1),
(1, 3, NULL, 'Retirement planning strategy session', 'Office Conference Room B', '2025-08-25 14:00:00', 90, 'Office Conference Room B', 2),
(1, NULL, 2, 'Follow up on insurance policy applications', 'Phone call', '2025-08-25 16:30:00', 30, 'phone', 1);

-- Populate tasks
INSERT INTO tasks (planner_id, client_id, title, description, priority_id, status_id, estimated_hours, actual_hours, due_date) VALUES
(1, 1, 'Prepare quarterly review for John Doe', 'Compile portfolio performance report and prepare presentation materials', 1, 2, 20.0, 3.5, '2025-08-24'),
(1, 2, 'Follow up on Sarah Lim''s insurance application', 'Check status with insurance company and update client', 2, 1, 2.0, NULL, '2025-08-26'),
(1, 3, 'Complete CPD training on ESG investing', NULL, 1, 3, 10.0, 5.0, '2025-08-22');

-- Populate reports
INSERT INTO reports (planner_id, client_id, report_type_id, title, generated_at, file_path, status) VALUES
(1, 1, 2, 'Q4 2023 Portfolio Performance Report', '2024-01-15 10:00:00', '/reports/q4_2023_johndoe.pdf', 'Completed'),
(1, 1, 1, 'Client Relationship Summary - John Doe', '2024-01-15 11:30:00', '/reports/summary_johndoe.pdf', 'Completed'),
(1, 2, 1, 'Client Relationship Summary - Sarah Lim', '2024-01-15 11:35:00', '/reports/summary_sarahlim.pdf', 'Completed'),
(1, 3, 3, 'Q2 2024 Performance Report - Ahmad Rahman', '2024-07-20 12:00:00', '/reports/q2_2024_ahmadrahman.pdf', 'Generating');

-- Populate portfolios and assets
INSERT INTO portfolios (client_id) VALUES (1), (2), (3);

INSERT INTO assets (portfolio_id, asset_name, asset_type, sector, allocation_percentage, ytd_return) VALUES
(1, 'Tech ETF', 'Equities', 'Technology', 0.45, 12.5),
(1, 'Corporate Bond Fund', 'Fixed Income', NULL, 0.30, 8.3),
(1, 'REIT A', 'Real Estate', NULL, 0.15, 6.7),
(1, 'Gold', 'Commodities', NULL, 0.05, -2.1),
(1, 'Cash Reserve', 'Cash', NULL, 0.05, 3.8),
(2, 'Healthcare Mutual Fund', 'Equities', 'Healthcare', 0.50, 10.1),
(2, 'Government Bonds', 'Fixed Income', NULL, 0.40, 5.5),
(2, 'Cash', 'Cash', NULL, 0.10, 3.8);

-- The rest of the tables are populated with data that reflects the client and planner tables.

-- add timestamps across your main tables
ALTER TABLE planners ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT now();
ALTER TABLE clients ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT now();
ALTER TABLE clients ADD COLUMN IF NOT EXISTS last_contact DATE;

-- if you plan to use "needs-attention" as a client status, allow it
-- (you can enforce with a CHECK or a lookup table later)
-- existing "status" is VARCHAR(50), so you're fine.

-- helpful indexes
CREATE INDEX IF NOT EXISTS idx_clients_planner_created ON clients (planner_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_appointments_planner_start ON appointments (planner_id, start_time);
CREATE INDEX IF NOT EXISTS idx_tasks_planner_due ON tasks (planner_id, due_date);

-- enable RLS
ALTER TABLE planners ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;

-- helper: map JWT email -> planner row
-- policy on planners
CREATE POLICY "planner can see self"
ON planners FOR SELECT
USING (email = auth.jwt()->>'email');

-- clients visible if they belong to this planner
CREATE POLICY "planner sees own clients"
ON clients FOR SELECT
USING (
planner_id IN (
SELECT planner_id FROM planners WHERE email = auth.jwt()->>'email'
)
);

-- appointments visible if planner owns them
CREATE POLICY "planner sees own appointments"
ON appointments FOR SELECT
USING (
planner_id IN (
SELECT planner_id FROM planners WHERE email = auth.jwt()->>'email'
)
);

-- tasks visible if planner owns them
CREATE POLICY "planner sees own tasks"
ON tasks FOR SELECT
USING (
planner_id IN (
SELECT planner_id FROM planners WHERE email = auth.jwt()->>'email'
)
);

-- portfolios + assets via client->planner
CREATE POLICY "planner sees portfolios"
ON portfolios FOR SELECT
USING (
client_id IN (
SELECT client_id FROM clients
WHERE planner_id IN (
SELECT planner_id FROM planners WHERE email = auth.jwt()->>'email'
)
)
);

CREATE POLICY "planner sees assets"
ON assets FOR SELECT
USING (
portfolio_id IN (
SELECT portfolio_id FROM portfolios WHERE client_id IN (
SELECT client_id FROM clients
WHERE planner_id IN (
SELECT planner_id FROM planners WHERE email = auth.jwt()->>'email'
)
)
)
);
