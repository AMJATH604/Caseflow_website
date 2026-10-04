/*
 * The CaseFlow feature catalogue, written from the app itself (screens in
 * apps/mobile/lib/pages). Each entry's `shot` is a file in public/app.
 */

export type Feature = {
  name: string;
  line: string;
  shot: string;
  detail?: string; // a short, specific fact shown in mono
};

export type FeatureGroup = {
  id: string;
  title: string;
  intro: string;
  items: Feature[];
};

export const FEATURE_GROUPS: FeatureGroup[] = [
  {
    id: "practice",
    title: "Your practice",
    intro: "The diary, the cases and the people — the part of the day you open the app for.",
    items: [
      { name: "Home", line: "Today's hearings, upcoming dates, active cases and clients at a glance.", shot: "home" },
      { name: "Court Diary", line: "A month calendar with every hearing marked, and the board for any day.", shot: "diary" },
      { name: "Legal Repository", line: "Every case dossier with its status, court and next hearing, searchable by title, CNR or client.", shot: "repository", detail: "Search by CNR" },
      { name: "Case dossier", line: "Parties, case number, CNR, court, stage, history and interim orders — one screen per case.", shot: "dossier-details" },
      { name: "Court Schedule", line: "Your hearings by date, so tomorrow's board is never a surprise.", shot: "schedule" },
      { name: "Daily Tasks", line: "A simple list for the day, next to your hearings.", shot: "tasks" },
      { name: "Client Directory", line: "Every client, their cases and how to reach them.", shot: "clients" },
    ],
  },
  {
    id: "courts",
    title: "Courts and eCourts",
    intro: "Bring cases in from eCourts, pay fees and track the filings the registry is sitting on.",
    items: [
      { name: "eCourts import", line: "Import the cases you saved in the eCourts Services app, or restore a CaseFlow backup.", shot: "import", detail: "mycases.txt → CaseFlow" },
      { name: "Export and backup", line: "Export any case with its complete data.", shot: "export" },
      { name: "eCourts ePay", line: "Court fees, fines, judicial deposits and process fees through the official portal.", shot: "epay" },
      { name: "Court Portals", line: "Certified copies, video conferencing, holiday calendars and fee payment for every state.", shot: "court-portals", detail: "36 states · 600+ districts" },
      { name: "Certified Copies", line: "Track each CC application from box drop to memo, ready and collected.", shot: "certified-copies" },
      { name: "Caveat Tracker", line: "Caveats with filing and expiry dates, so an ex-parte order never catches you out.", shot: "caveat" },
      { name: "E-Filing", line: "Track your electronic filings and their status.", shot: "efiling" },
    ],
  },
  {
    id: "tools",
    title: "Legal tools",
    intro: "The arithmetic of practice, done the same way every time.",
    items: [
      { name: "Court Fee", line: "Court fee for suits, appeals, petitions and NI Act complaints — old and amended rates side by side.", shot: "court-fee", detail: "1955 Act · 2017 amendment" },
      { name: "Limitation", line: "Pick the article, enter the date, get the last day to file.", shot: "limitation", detail: "Limitation Act, 1963" },
      { name: "Delay condonation", line: "Days of delay for a Section 5 application, from the period that applies.", shot: "delay", detail: "Section 5" },
      { name: "Interest", line: "Pre-suit, pendente lite and post-decree interest, simple or compound.", shot: "interest" },
      { name: "MACT Claims", line: "Motor-accident compensation from age, income, employment and dependants.", shot: "mact" },
      { name: "Maintenance", line: "Interim or final maintenance from both incomes and the children.", shot: "maintenance", detail: "Sec 144 BNSS" },
      { name: "Partition Share", line: "Shares of the legal heirs under the personal law that applies.", shot: "partition" },
      { name: "Stamp Values", line: "Court stamp values for appeals, petitions and documents.", shot: "stamp-values", detail: "Tamil Nadu courts" },
      { name: "Holiday List", line: "Court holidays, month by month.", shot: "holidays" },
    ],
  },
  {
    id: "research",
    title: "Research",
    intro: "The library you used to carry, and an assistant that reads it with you.",
    items: [
      { name: "CaseFlow AI", line: "Ask about Indian law, or send a photo of an order or FIR and ask about it.", shot: "ai" },
      { name: "Bare Acts Library", line: "Search across statutes, section by section.", shot: "bare-acts", detail: "16 statutes · 8 domains" },
      { name: "Legal Templates", line: "Petitions and affidavits ready to adapt.", shot: "templates" },
      { name: "Legal Dictionary", line: "Latin maxims, legal English and criminal-law terms, explained.", shot: "legal-dictionary", detail: "502 terms" },
      { name: "English Dictionary", line: "The words that turn up in pleadings, with their parts of speech.", shot: "english-dictionary" },
      { name: "Legal Pulse", line: "Live legal news from across India — Supreme Court, High Courts and more.", shot: "legal-pulse" },
    ],
  },
  {
    id: "documents",
    title: "Documents",
    intro: "Everything a filing needs, without a laptop.",
    items: [
      { name: "PDF toolkit", line: "Word to PDF and back, merge, split, compress, rotate, watermark, protect and unlock.", shot: "tools-hub-3" },
      { name: "Case documents", line: "Orders, pleadings and evidence attached to the case they belong to.", shot: "dossier-history" },
    ],
  },
  {
    id: "team",
    title: "Your team",
    intro: "Juniors and clerks in the same app, each seeing exactly what they should.",
    items: [
      { name: "Recruit Associate", line: "Invite a junior or clerk by email; they join your firm when they accept.", shot: "recruit" },
      { name: "Digital Chambers", line: "One conversation for the whole chamber, with documents and voice notes.", shot: "chambers" },
      { name: "Financial Ledger", line: "Agreed fee, received, expenses and what's yet to come — per client.", shot: "ledger" },
      { name: "Notifications", line: "Hearing reminders, chamber messages and direct messages, each with its own switch.", shot: "settings-notifications" },
    ],
  },
  {
    id: "field",
    title: "Advocate Commissioner",
    intro: "A field kit for commissions — from the warrant to the report.",
    items: [
      { name: "Commissions", line: "Every commission with its warrant date, deadline and status.", shot: "commissioner" },
      { name: "Site visits", line: "Check in and out at the site, with the GPS point recorded.", shot: "commission-visits" },
      { name: "Evidence photos", line: "Numbered photos, ready to download and print for the report.", shot: "commission-evidence" },
      { name: "Site sketch", line: "Draw the site plan on the phone.", shot: "commission-sketch" },
      { name: "Expenses", line: "Travel and other costs, totalled for the bill.", shot: "commission-expenses" },
    ],
  },
  {
    id: "bar",
    title: "Bar associations",
    intro: "The association office, on every member's phone.",
    items: [
      { name: "My Bar", line: "Membership card, fee status, notices, elections and events for your association.", shot: "bar-association" },
    ],
  },
];

export const ALL_FEATURES = FEATURE_GROUPS.flatMap((g) => g.items);
