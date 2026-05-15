// LocalStorage-backed data store for clients, certificates and blog posts
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
  id: string;                // also the report number
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
  totalWeight?: string;
  // Jewellery-specific diamond details
  diamondShape?: string;
  diamondWeight?: string;
  diamondColor?: string;
  diamondClarity?: string;
  remarks?: string;
  imageDataUrl?: string;     // base64 image for the gem/jewellery
  clientId?: string;
  clientName?: string;       // denormalised for display
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

const CLIENT_KEY = "jr_clients_v1";
const CERT_KEY   = "jr_certificates_v1";
const BLOG_KEY   = "jr_blog_posts_v1";
const AUTH_KEY   = "jr_admin_auth_v1";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

// ----- Clients -----
export const getClients = (): Client[] =>
  read<Client[]>(CLIENT_KEY, []).sort((a, b) => b.createdAt - a.createdAt);

export const getClient = (id: string): Client | undefined =>
  read<Client[]>(CLIENT_KEY, []).find((c) => c.id === id);

export const saveClient = (client: Client) => {
  const all = read<Client[]>(CLIENT_KEY, []);
  const idx = all.findIndex((c) => c.id === client.id);
  if (idx >= 0) all[idx] = client;
  else all.push(client);
  write(CLIENT_KEY, all);
};

export const deleteClient = (id: string) => {
  write(CLIENT_KEY, read<Client[]>(CLIENT_KEY, []).filter((c) => c.id !== id));
};

// ----- Certificates -----
export const getCertificates = (): Certificate[] =>
  read<Certificate[]>(CERT_KEY, []).sort((a, b) => b.createdAt - a.createdAt);

export const getCertificatesByClient = (clientId: string): Certificate[] =>
  read<Certificate[]>(CERT_KEY, [])
    .filter((c) => c.clientId === clientId)
    .sort((a, b) => b.createdAt - a.createdAt);

export const getCertificate = (id: string): Certificate | undefined =>
  read<Certificate[]>(CERT_KEY, []).find(
    (c) => c.id.toLowerCase() === id.toLowerCase() || c.reportNo.toLowerCase() === id.toLowerCase()
  );

export const saveCertificate = (cert: Certificate) => {
  const all = read<Certificate[]>(CERT_KEY, []);
  const idx = all.findIndex((c) => c.id === cert.id);
  if (idx >= 0) all[idx] = cert;
  else all.push(cert);
  write(CERT_KEY, all);
};

export const deleteCertificate = (id: string) => {
  write(
    CERT_KEY,
    read<Certificate[]>(CERT_KEY, []).filter((c) => c.id !== id)
  );
};

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

// ----- Blog -----
export const getBlogPosts = (): BlogPost[] =>
  read<BlogPost[]>(BLOG_KEY, []).sort((a, b) => b.createdAt - a.createdAt);

export const getBlogPost = (slug: string): BlogPost | undefined =>
  read<BlogPost[]>(BLOG_KEY, []).find((p) => p.slug === slug);

export const getBlogPostById = (id: string): BlogPost | undefined =>
  read<BlogPost[]>(BLOG_KEY, []).find((p) => p.id === id);

export const saveBlogPost = (post: BlogPost) => {
  const all = read<BlogPost[]>(BLOG_KEY, []);
  const idx = all.findIndex((p) => p.id === post.id);
  if (idx >= 0) all[idx] = post;
  else all.push(post);
  write(BLOG_KEY, all);
};

export const deleteBlogPost = (id: string) => {
  write(BLOG_KEY, read<BlogPost[]>(BLOG_KEY, []).filter((p) => p.id !== id));
};

export const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// ----- Admin auth (static) -----
export const ADMIN_USER = "admin";
export const ADMIN_PASS = "123";

export const isAdminAuthed = (): boolean =>
  typeof window !== "undefined" && localStorage.getItem(AUTH_KEY) === "1";

export const setAdminAuthed = (v: boolean) => {
  if (typeof window === "undefined") return;
  if (v) localStorage.setItem(AUTH_KEY, "1");
  else localStorage.removeItem(AUTH_KEY);
};
