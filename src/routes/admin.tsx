import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AdminShell, AdminTopBar } from "@/components/AdminShell";
import { useEffect, useState } from "react";
import {
  ADMIN_PASS, ADMIN_USER,
  isAdminAuthed, setAdminAuthed,
  getCertificates, deleteCertificate,
  getBlogPosts, deleteBlogPost,
  type Certificate, type BlogPost,
} from "@/lib/store";
import {
  LogOut, Plus, FileText, Newspaper,
  Trash2, Edit3, Eye, Lock, Gem,
  LayoutDashboard,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => { setAuthed(isAdminAuthed()); setReady(true); }, []);
  if (!ready) return null;
  return authed
    ? <Dashboard onLogout={() => { setAdminAuthed(false); setAuthed(false); }} />
    : <Login onLogin={() => setAuthed(true)} />;
}

/* ── Login ── */
function Login({ onLogin }: { onLogin: () => void }) {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (u === ADMIN_USER && p === ADMIN_PASS) {
      setAdminAuthed(true);
      onLogin();
    } else {
      setErr("Invalid credentials");
    }
  };

  return (
    <AdminShell>
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="mb-8 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold">
            <Gem className="w-4 h-4 text-gold-foreground" />
          </div>
          <span className="font-display text-xl tracking-wide">JewelReport</span>
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground border border-border rounded-full px-2.5 py-0.5 ml-1">Admin</span>
        </div>

        <form
          onSubmit={submit}
          className="w-full max-w-sm p-8 rounded-2xl border border-border bg-card/80 backdrop-blur-sm shadow-3d"
        >
          <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold mb-6">
            <Lock className="w-5 h-5 text-gold-foreground" />
          </div>
          <h1 className="font-display text-2xl text-center">Sign in</h1>
          <p className="mt-1 text-center text-sm text-muted-foreground">JewelReport control panel</p>

          <div className="mt-7 space-y-3">
            <input
              value={u}
              onChange={(e) => setU(e.target.value)}
              placeholder="Username"
              autoComplete="username"
              className="w-full bg-input/30 border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
            />
            <input
              value={p}
              onChange={(e) => setP(e.target.value)}
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              className="w-full bg-input/30 border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
            />
            {err && <p className="text-xs text-destructive">{err}</p>}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-gold text-gold-foreground text-sm font-medium shadow-gold hover:scale-[1.02] transition-transform"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}

/* ── Dashboard ── */
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<"reports" | "blog">("reports");
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const refresh = () => { setCerts(getCertificates()); setPosts(getBlogPosts()); };
  useEffect(refresh, []);
  const navigate = useNavigate();

  return (
    <AdminShell>
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-gold flex items-center justify-center shadow-gold">
              <Gem className="w-3.5 h-3.5 text-gold-foreground" />
            </div>
            <span className="font-display text-base tracking-wide">JewelReport</span>
            <span className="hidden sm:inline-block text-xs uppercase tracking-[0.2em] text-muted-foreground border border-border rounded-full px-2.5 py-0.5">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="hidden sm:inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
              View site
            </Link>
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border text-xs hover:border-primary hover:text-primary transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Page title */}
        <div className="flex items-center gap-3 mb-8">
          <LayoutDashboard className="w-5 h-5 text-primary" />
          <h1 className="font-display text-2xl">Dashboard</h1>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Certificates", value: certs.length, icon: FileText },
            { label: "Blog Posts", value: posts.length, icon: Newspaper },
            { label: "Report Types", value: 4, icon: Gem },
            { label: "Status", value: "Live", icon: Eye },
          ].map((s) => (
            <div key={s.label} className="p-4 rounded-xl border border-border bg-card/60 backdrop-blur-sm shadow-elegant">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">{s.label}</span>
                <s.icon className="w-4 h-4 text-primary/60" />
              </div>
              <div className="font-display text-2xl text-gradient-gold">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Tab switcher */}
        <div className="inline-flex rounded-full border border-border bg-card p-1 mb-8">
          {[
            { k: "reports", label: "Certificates", icon: FileText },
            { k: "blog", label: "Blog Posts", icon: Newspaper },
          ].map((t) => (
            <button
              key={t.k}
              onClick={() => setTab(t.k as "reports" | "blog")}
              className={`px-5 py-2 rounded-full inline-flex items-center gap-2 text-sm transition-all ${
                tab === t.k
                  ? "bg-gradient-gold text-gold-foreground shadow-gold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon className="w-4 h-4" /> {t.label}
            </button>
          ))}
        </div>

        {/* Certificates tab */}
        {tab === "reports" && (
          <div>
            <div className="flex justify-between items-center mb-5">
              <h2 className="font-display text-xl">
                Certificates
                <span className="ml-2 text-sm font-sans text-muted-foreground">({certs.length})</span>
              </h2>
              <Link
                to="/admin/cert/$id"
                params={{ id: "new" }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-gold text-gold-foreground text-sm shadow-gold font-medium hover:scale-[1.02] transition-transform"
              >
                <Plus className="w-4 h-4" /> New Certificate
              </Link>
            </div>

            {certs.length === 0 ? (
              <Empty msg="No certificates yet. Create your first one." />
            ) : (
              <div className="rounded-2xl border border-border bg-card shadow-elegant overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-card border-b border-border">
                    <tr>
                      <th className="text-left px-5 py-3 text-xs uppercase tracking-widest text-muted-foreground font-medium">Report No.</th>
                      <th className="text-left px-5 py-3 text-xs uppercase tracking-widest text-muted-foreground font-medium">Type</th>
                      <th className="text-left px-5 py-3 text-xs uppercase tracking-widest text-muted-foreground font-medium hidden md:table-cell">Item</th>
                      <th className="text-left px-5 py-3 text-xs uppercase tracking-widest text-muted-foreground font-medium hidden sm:table-cell">Carat</th>
                      <th className="text-left px-5 py-3 text-xs uppercase tracking-widest text-muted-foreground font-medium hidden lg:table-cell">Issued</th>
                      <th className="text-right px-5 py-3 text-xs uppercase tracking-widest text-muted-foreground font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {certs.map((c) => (
                      <tr key={c.id} className="hover:bg-muted/20 transition-colors">
                        <td className="px-5 py-3.5 font-mono text-xs text-primary">{c.reportNo}</td>
                        <td className="px-5 py-3.5 text-sm">{c.type}</td>
                        <td className="px-5 py-3.5 text-sm text-foreground/80 hidden md:table-cell">{c.itemName}</td>
                        <td className="px-5 py-3.5 text-sm text-foreground/80 hidden sm:table-cell">{c.caratWeight}</td>
                        <td className="px-5 py-3.5 text-sm text-muted-foreground hidden lg:table-cell">{c.issueDate}</td>
                        <td className="px-5 py-3.5">
                          <div className="flex justify-end gap-1">
                            <button
                              onClick={() => navigate({ to: "/verify", search: { id: c.reportNo } })}
                              className="p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <Link
                              to="/admin/cert/$id"
                              params={{ id: c.id }}
                              className="p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                              title="Edit"
                            >
                              <Edit3 className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => {
                                if (confirm("Delete this certificate?")) {
                                  deleteCertificate(c.id);
                                  refresh();
                                }
                              }}
                              className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Blog tab */}
        {tab === "blog" && (
          <div>
            <div className="flex justify-between items-center mb-5">
              <h2 className="font-display text-xl">
                Blog Posts
                <span className="ml-2 text-sm font-sans text-muted-foreground">({posts.length})</span>
              </h2>
              <Link
                to="/admin/blog/$id"
                params={{ id: "new" }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-gold text-gold-foreground text-sm shadow-gold font-medium hover:scale-[1.02] transition-transform"
              >
                <Plus className="w-4 h-4" /> New Post
              </Link>
            </div>

            {posts.length === 0 ? (
              <Empty msg="No blog posts yet. Write your first article." />
            ) : (
              <div className="rounded-2xl border border-border bg-card shadow-elegant overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-card border-b border-border">
                    <tr>
                      <th className="text-left px-5 py-3 text-xs uppercase tracking-widest text-muted-foreground font-medium">Title</th>
                      <th className="text-left px-5 py-3 text-xs uppercase tracking-widest text-muted-foreground font-medium hidden md:table-cell">Author</th>
                      <th className="text-left px-5 py-3 text-xs uppercase tracking-widest text-muted-foreground font-medium hidden sm:table-cell">Published</th>
                      <th className="text-right px-5 py-3 text-xs uppercase tracking-widest text-muted-foreground font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {posts.map((p) => (
                      <tr key={p.id} className="hover:bg-muted/20 transition-colors">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg overflow-hidden bg-gradient-navy shrink-0">
                              {p.coverDataUrl && <img src={p.coverDataUrl} alt="" className="w-full h-full object-cover" />}
                            </div>
                            <div className="min-w-0">
                              <div className="font-medium truncate max-w-[180px] md:max-w-xs">{p.title}</div>
                              <div className="text-xs text-muted-foreground mt-0.5 truncate max-w-[180px] md:max-w-xs">{p.excerpt}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-sm text-foreground/80 hidden md:table-cell">{p.author}</td>
                        <td className="px-5 py-3.5 text-sm text-muted-foreground hidden sm:table-cell">{p.publishedAt}</td>
                        <td className="px-5 py-3.5">
                          <div className="flex justify-end gap-1">
                            <Link
                              to="/blog/$slug"
                              params={{ slug: p.slug }}
                              className="p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <Link
                              to="/admin/blog/$id"
                              params={{ id: p.id }}
                              className="p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                              title="Edit"
                            >
                              <Edit3 className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => {
                                if (confirm("Delete this post?")) {
                                  deleteBlogPost(p.id);
                                  refresh();
                                }
                              }}
                              className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminShell>
  );
}

function Empty({ msg }: { msg: string }) {
  return (
    <div className="py-16 rounded-2xl border border-dashed border-border text-center text-sm text-muted-foreground">
      {msg}
    </div>
  );
}
