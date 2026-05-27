// Types, constants and pure helpers — all data operations are in src/lib/db.ts

export type ReportType =
  | "Natural Diamond"
  | "Lab Grown Diamond"
  | "Gemstone"
  | "Lab Grown Jewellery"
  | "Natural Jewellery";

export const REPORT_TYPE_LABELS: Record<ReportType, string> = {
  "Natural Diamond":     "NATURAL DIAMOND GRADING REPORT",
  "Lab Grown Diamond":   "LAB GROWN DIAMOND GRADING REPORT",
  "Gemstone":            "GEMSTONE GRADING REPORT",
  "Lab Grown Jewellery": "LAB GROWN DIAMOND JEWELLERY REPORT",
  "Natural Jewellery":   "NATURAL DIAMOND JEWELLERY REPORT",
};

export interface Client {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  createdAt: number;
}

export interface Certificate {
  id: string;
  reportNo: string;
  type: ReportType;
  issueDate: string;
  itemName: string;
  shape: string;
  caratWeight: string;
  measurements: string;
  color: string;
  clarity: string;
  cut: string;
  polish: string;
  symmetry: string;
  fluorescence: string;
  origin: string;
  metal?: string;
  metalDescription?: string;
  grossWeight?: string;
  netWeight?: string;
  diamondShape?: string;
  diamondWeight?: string;
  diamondColor?: string;
  diamondClarity?: string;
  diamondTotalPcs?: string;
  gemstoneStone?: string;
  gemstoneOrigin?: string;
  gemstoneShape?: string;
  gemstoneCaratWeight?: string;
  gemstonePcs?: string;
  gemstoneMeasurements?: string;
  gemstoneColorTransparency?: string;
  gemstoneCharacteristics?: string;
  remarks?: string;
  description?: string;
  imageDataUrl?: string;
  clientId?: string;
  clientName?: string;
  createdAt: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverDataUrl?: string;
  author: string;
  publishedAt: string;
  createdAt: number;
}

export const generateReportNo = (type: ReportType): string => {
  const prefixMap: Record<ReportType, string> = {
    "Natural Diamond":     "NDR",
    "Lab Grown Diamond":   "LGD",
    "Gemstone":            "GSR",
    "Lab Grown Jewellery": "LGJ",
    "Natural Jewellery":   "NJR",
  };
  const prefix = prefixMap[type];
  const yr = new Date().getFullYear().toString().slice(-2);
  const rand = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}-${yr}-${rand}`;
};

export const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// ─── Admin auth (session-only, no localStorage) ───────────────────────────────
const AUTH_KEY = "jr_admin_auth_v1";

export const ADMIN_USER = "admin";
export const ADMIN_PASS = "123";

export const isAdminAuthed = (): boolean =>
  typeof window !== "undefined" && sessionStorage.getItem(AUTH_KEY) === "1";

export const setAdminAuthed = (v: boolean) => {
  if (typeof window === "undefined") return;
  if (v) sessionStorage.setItem(AUTH_KEY, "1");
  else sessionStorage.removeItem(AUTH_KEY);
};
