const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");

const ideas = [
  {
    "Sl.No": 1,
    Idea: "AI-Powered PR Review Bot",
    Description:
      "Automated code review bot using LLMs to detect bugs, security issues, and style violations in pull requests before human review.",
    Owner: "Alice Chen",
    Lead: "Raj Kumar",
    Portfolio: "Platform Engineering",
    Status: "DEPLOYED",
    "Business Impact":
      "Reduced review cycle time by 60%, freeing senior engineers for high-value work.",
    Ranking: 9,
    "Cost Efficiency": "$180K/yr",
    "Productivity Increase": 40,
    "Tickets Reduced": 120,
    "Time Saved": "8 hrs/week",
  },
  {
    "Sl.No": 2,
    Idea: "LLM-Based Incident Classification",
    Description:
      "Use GPT-4 to auto-classify incoming incidents by severity and category, routing them to the right on-call team instantly.",
    Owner: "Raj Patel",
    Lead: "Sarah Mitchell",
    Portfolio: "Security",
    Status: "IN_PROGRESS",
    "Business Impact":
      "Estimated 40% reduction in mean time to acknowledge (MTTA) for P1 incidents.",
    Ranking: 7,
    "Cost Efficiency": "$60K/yr",
    "Productivity Increase": 25,
    "Tickets Reduced": 0,
    "Time Saved": "5 hrs/week",
  },
  {
    "Sl.No": 3,
    Idea: "Copilot for SQL Query Generation",
    Description:
      "Natural language to SQL interface for analysts to query the data warehouse without writing SQL code.",
    Owner: "Priya Nair",
    Lead: "David Wong",
    Portfolio: "Data & Analytics",
    Status: "DEPLOYED",
    "Business Impact":
      "Enabled non-technical stakeholders to self-serve data needs, reducing analytics backlog by 70%.",
    Ranking: 8,
    "Cost Efficiency": "$95K/yr",
    "Productivity Increase": 35,
    "Tickets Reduced": 240,
    "Time Saved": "12 hrs/week",
  },
  {
    "Sl.No": 4,
    Idea: "AI Customer Support Deflection",
    Description:
      "LLM-powered chatbot that resolves tier-1 customer queries automatically, escalating only complex issues to human agents.",
    Owner: "Tom Walker",
    Lead: "Meena Suresh",
    Portfolio: "Customer Experience",
    Status: "DEPLOYED",
    "Business Impact":
      "Deflected 45% of support tickets, saving $420K annually in agent hours.",
    Ranking: 10,
    "Cost Efficiency": "$420K/yr",
    "Productivity Increase": 50,
    "Tickets Reduced": 800,
    "Time Saved": "30 hrs/week",
  },
  {
    "Sl.No": 5,
    Idea: "Automated Release Notes Generator",
    Description:
      "AI tool that reads commit history and PR descriptions to auto-generate structured release notes for each sprint.",
    Owner: "Sam Lee",
    Lead: "Chris Park",
    Portfolio: "Developer Productivity",
    Status: "REVIEW",
    "Business Impact":
      "Eliminates 3-4 hours of manual documentation work per release cycle.",
    Ranking: 6,
    "Cost Efficiency": "$25K/yr",
    "Productivity Increase": 20,
    "Tickets Reduced": 0,
    "Time Saved": "4 hrs/sprint",
  },
  {
    "Sl.No": 6,
    Idea: "Fraud Detection Model Fine-Tuning",
    Description:
      "Fine-tune a domain-specific model on transaction data to improve fraud detection accuracy and reduce false positives.",
    Owner: "Maria Lopez",
    Lead: "Kevin Brooks",
    Portfolio: "Payments",
    Status: "IDEATION",
    "Business Impact":
      "Projected to prevent $2M+ in annual fraud losses and reduce chargebacks by 30%.",
    Ranking: 5,
    "Cost Efficiency": "",
    "Productivity Increase": 0,
    "Tickets Reduced": 0,
    "Time Saved": "",
  },
  {
    "Sl.No": 7,
    Idea: "AI Test Case Generation",
    Description:
      "Automatically generate unit and integration test cases from source code using Claude, improving code coverage.",
    Owner: "James Okafor",
    Lead: "Lisa Tang",
    Portfolio: "Developer Productivity",
    Status: "IN_PROGRESS",
    "Business Impact":
      "Expected to increase code coverage from 62% to 85%, reducing regression bugs.",
    Ranking: 8,
    "Cost Efficiency": "$70K/yr",
    "Productivity Increase": 30,
    "Tickets Reduced": 90,
    "Time Saved": "6 hrs/week",
  },
  {
    "Sl.No": 8,
    Idea: "Smart Log Anomaly Detection",
    Description:
      "ML pipeline that scans application logs in real time to detect anomalies and alert before they become incidents.",
    Owner: "Nina Sharma",
    Lead: "Omar Farouk",
    Portfolio: "Platform Engineering",
    Status: "DEPLOYED",
    "Business Impact":
      "Reduced production incidents by 35%, improving system reliability SLA from 99.5% to 99.9%.",
    Ranking: 9,
    "Cost Efficiency": "$150K/yr",
    "Productivity Increase": 28,
    "Tickets Reduced": 180,
    "Time Saved": "10 hrs/week",
  },
  {
    "Sl.No": 9,
    Idea: "AI-Assisted Contract Review",
    Description:
      "LLM tool for the legal team to review vendor contracts, flag risky clauses, and suggest standard alternatives.",
    Owner: "Rachel Gomez",
    Lead: "Arjun Mehta",
    Portfolio: "Security",
    Status: "REVIEW",
    "Business Impact":
      "Reduces contract review time from 5 days to 1 day, accelerating vendor onboarding.",
    Ranking: 6,
    "Cost Efficiency": "$80K/yr",
    "Productivity Increase": 60,
    "Tickets Reduced": 0,
    "Time Saved": "16 hrs/contract",
  },
  {
    "Sl.No": 10,
    Idea: "Predictive Churn Scoring",
    Description:
      "ML model that scores customers on churn risk weekly, enabling proactive outreach by the success team.",
    Owner: "Ben Carter",
    Lead: "Yuki Tanaka",
    Portfolio: "Customer Experience",
    Status: "DEPLOYED",
    "Business Impact":
      "Retained 12% more at-risk accounts, adding $800K in ARR over 6 months.",
    Ranking: 10,
    "Cost Efficiency": "$800K ARR impact",
    "Productivity Increase": 20,
    "Tickets Reduced": 0,
    "Time Saved": "8 hrs/week",
  },
  {
    "Sl.No": 11,
    Idea: "AI Payment Reconciliation",
    Description:
      "Automate matching of bank transactions to internal records using ML, replacing a fully manual reconciliation process.",
    Owner: "Sofia Petrov",
    Lead: "Daniel Kim",
    Portfolio: "Payments",
    Status: "IN_PROGRESS",
    "Business Impact":
      "Will eliminate 20+ hours of manual reconciliation work per week and reduce error rate to near zero.",
    Ranking: 7,
    "Cost Efficiency": "$110K/yr",
    "Productivity Increase": 45,
    "Tickets Reduced": 60,
    "Time Saved": "20 hrs/week",
  },
  {
    "Sl.No": 12,
    Idea: "Data Quality AI Monitor",
    Description:
      "Continuous monitoring agent that detects data quality issues in pipelines and automatically triggers remediation workflows.",
    Owner: "Liam O'Brien",
    Lead: "Priya Nair",
    Portfolio: "Data & Analytics",
    Status: "REVIEW",
    "Business Impact":
      "Prevents bad data from reaching dashboards, saving 6+ hours of debugging per week.",
    Ranking: 7,
    "Cost Efficiency": "$45K/yr",
    "Productivity Increase": 22,
    "Tickets Reduced": 75,
    "Time Saved": "6 hrs/week",
  },
  {
    "Sl.No": 13,
    Idea: "Intelligent Runbook Automation",
    Description:
      "AI agent that reads incident alerts and executes relevant runbook steps autonomously for known failure patterns.",
    Owner: "Zara Ahmed",
    Lead: "Raj Kumar",
    Portfolio: "Platform Engineering",
    Status: "IDEATION",
    "Business Impact":
      "Could automate resolution for 40% of recurring incidents without human intervention.",
    Ranking: 8,
    "Cost Efficiency": "",
    "Productivity Increase": 0,
    "Tickets Reduced": 0,
    "Time Saved": "",
  },
  {
    "Sl.No": 14,
    Idea: "AI Code Documentation Generator",
    Description:
      "Tool that auto-generates inline comments and README docs from code, keeping documentation in sync with the codebase.",
    Owner: "Marcus Johnson",
    Lead: "Lisa Tang",
    Portfolio: "Developer Productivity",
    Status: "IDEATION",
    "Business Impact":
      "Addresses chronic under-documentation, reducing onboarding time for new engineers by an estimated 30%.",
    Ranking: 5,
    "Cost Efficiency": "",
    "Productivity Increase": 0,
    "Tickets Reduced": 0,
    "Time Saved": "",
  },
  {
    "Sl.No": 15,
    Idea: "Threat Intelligence Summarizer",
    Description:
      "LLM pipeline that ingests security advisories and CVE feeds and produces daily digest summaries for the security team.",
    Owner: "Fatima Hassan",
    Lead: "Omar Farouk",
    Portfolio: "Security",
    Status: "DEPLOYED",
    "Business Impact":
      "Security team processes 3x more threat signals per day with the same headcount.",
    Ranking: 7,
    "Cost Efficiency": "$40K/yr",
    "Productivity Increase": 50,
    "Tickets Reduced": 30,
    "Time Saved": "10 hrs/week",
  },
];

const sheet = XLSX.utils.json_to_sheet(ideas);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, sheet, "Ideas");

const dir = path.join(__dirname, "..", "data");
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

XLSX.writeFile(workbook, path.join(dir, "ideas.xlsx"));
console.log("✓ Seeded data/ideas.xlsx with 15 ideas");
