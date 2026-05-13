const CERT_KEY = "jr_certificates_v1";
const BLOG_KEY = "jr_blog_posts_v1";
const AUTH_KEY = "jr_admin_auth_v1";
function read(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function write(key, value) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}
const getCertificates = () => read(CERT_KEY, []).sort((a, b) => b.createdAt - a.createdAt);
const getCertificate = (id) => read(CERT_KEY, []).find(
  (c) => c.id.toLowerCase() === id.toLowerCase() || c.reportNo.toLowerCase() === id.toLowerCase()
);
const saveCertificate = (cert) => {
  const all = read(CERT_KEY, []);
  const idx = all.findIndex((c) => c.id === cert.id);
  if (idx >= 0) all[idx] = cert;
  else all.push(cert);
  write(CERT_KEY, all);
};
const deleteCertificate = (id) => {
  write(
    CERT_KEY,
    read(CERT_KEY, []).filter((c) => c.id !== id)
  );
};
const generateReportNo = (type) => {
  const prefixMap = {
    "Lab Grown Diamond": "LGD",
    "Natural Diamond": "NDR",
    Jewellery: "JWR",
    Gemstone: "GSR",
    "Lab Grown Jewellery": "LGJ"
  };
  const prefix = prefixMap[type];
  const yr = (/* @__PURE__ */ new Date()).getFullYear().toString().slice(-2);
  const rand = Math.floor(1e5 + Math.random() * 9e5);
  return `${prefix}-${yr}-${rand}`;
};
const getBlogPosts = () => read(BLOG_KEY, []).sort((a, b) => b.createdAt - a.createdAt);
const getBlogPost = (slug) => read(BLOG_KEY, []).find((p) => p.slug === slug);
const saveBlogPost = (post) => {
  const all = read(BLOG_KEY, []);
  const idx = all.findIndex((p) => p.id === post.id);
  if (idx >= 0) all[idx] = post;
  else all.push(post);
  write(BLOG_KEY, all);
};
const deleteBlogPost = (id) => {
  write(BLOG_KEY, read(BLOG_KEY, []).filter((p) => p.id !== id));
};
const slugify = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const ADMIN_USER = "admin";
const ADMIN_PASS = "123";
const isAdminAuthed = () => typeof window !== "undefined" && localStorage.getItem(AUTH_KEY) === "1";
const setAdminAuthed = (v) => {
  if (typeof window === "undefined") return;
  if (v) localStorage.setItem(AUTH_KEY, "1");
  else localStorage.removeItem(AUTH_KEY);
};
export {
  ADMIN_USER as A,
  getBlogPosts as a,
  deleteBlogPost as b,
  getCertificates as c,
  deleteCertificate as d,
  ADMIN_PASS as e,
  getBlogPost as f,
  getCertificate as g,
  generateReportNo as h,
  isAdminAuthed as i,
  saveCertificate as j,
  slugify as k,
  saveBlogPost as l,
  setAdminAuthed as s
};
