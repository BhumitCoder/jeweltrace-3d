import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useEffect, useState } from "react";
import {
  ADMIN_PASS, ADMIN_USER,
  isAdminAuthed, setAdminAuthed,
  getCertificates, deleteCertificate,
  getBlogPosts, deleteBlogPost,
  type Certificate, type BlogPost,
} from "@/lib/store";
import { LogOut, Plus, FileText, Newspaper, Trash2, Edit3, Eye, Lock } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => { setAuthed(isAdminAuthed()); setReady(true); }, []);
  if (!ready) return null;
  return authed ? <Dashboard onLogout={() => { setAdminAuthed(false); setAuthed(false); }} /> : <Login onLogin={() => setAuthed(true)} />;
}

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
    <Layout>
      <section className="px-6 py-32 flex justify-center">
        <form onSubmit={submit} className="w-full max-w-md p-10 rounded-2xl border border-border bg-card shadow-3d">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-gold flex items-center justify-center shadow-gold">
            <Lock className="w-6 h-6 text-gold-foreground" />
          </div>
          <h1 className="mt-6 font-display text-3xl text-center">Admin Access</h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">JewelReport control panel</p>
          <div className="mt-8 space-y-4">
            <input value={u} onChange={(e) => setU(e.target.value)} placeholder="Username" className="w-full bg-input/30 border border-border rounded-xl px-4 py-3 outline-none focus:border-primary" />
            <input value={p} onChange={(e) => setP(e.target.value)} type="password" placeholder="Password" className="w-full bg-input/30 border border-border rounded-xl px-4 py-3 outline-none focus:border-primary" />
            {err && <p className="text-sm text-destructive">{err}</p>}
            <button className="w-full py-3 rounded-xl bg-gradient-gold text-gold-foreground font-medium shadow-gold hover:scale-[1.02] transition-transform">Sign In</button>
          </div>
        </form>
      </section>
    </Layout>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<"reports" | "blog">("reports");
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const refresh = () => { setCerts(getCertificates()); setPosts(getBlogPosts()); };
  useEffect(refresh, []);
  const navigate = useNavigate();

  return (
    <Layout>
      <section className="px-6 pt-16 pb-32 mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-primary">Control Panel</p>
            <h1 className="mt-2 font-display text-4xl">Admin Dashboard</h1>
          </div>
          <button onClick={onLogout} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border hover:border-primary hover:text-primary transition-colors">
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>

        <div className="mt-10 inline-flex rounded-full border border-border bg-card p-1">
          {[
            { k: "reports", label: "Certificates", icon: FileText },
            { k: "blog", label: "Blog", icon: Newspaper },
          ].map((t) => (
            <button
              key={t.k}
              onClick={() => setTab(t.k as "reports" | "blog")}
              className={`px-5 py-2 rounded-full inline-flex items-center gap-2 text-sm transition-all ${tab === t.k ? "bg-gradient-gold text-gold-foreground shadow-gold" : "text-muted-foreground hover:text-foreground"}`}
            >
              <t.icon className="w-4 h-4" /> {t.label}
            </button>
          ))}
        </div>

        {tab === "reports" ? (
          <div className="mt-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display text-2xl">Certificates ({certs.length})</h2>
              <Link to="/admin/cert/$id" params={{ id: "new" }} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-gold text-gold-foreground shadow-gold font-medium">
                <Plus className="w-4 h-4" /> New Certificate
              </Link>
            </div>
            {certs.length === 0 ? (
              <Empty msg="No certificates yet. Create your first one." />
            ) : (
              <div className="rounded-2xl border border-border bg-card shadow-elegant overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gradient-navy text-muted-foreground uppercase tracking-widest text-xs">
                    <tr>
                      <th className="text-left px-5 py-4">Report No.</th>
                      <th className="text-left px-5 py-4">Type</th>
                      <th className="text-left px-5 py-4">Item</th>
                      <th className="text-left px-5 py-4">Carat</th>
                      <th className="text-left px-5 py-4">Issued</th>
                      <th className="text-right px-5 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {certs.map((c) => (
                      <tr key={c.id} className="border-t border-border">
                        <td className="px-5 py-4 font-mono text-primary">{c.reportNo}</td>
                        <td className="px-5 py-4">{c.type}</td>
                        <td className="px-5 py-4">{c.itemName}</td>
                        <td className="px-5 py-4">{c.caratWeight}</td>
                        <td className="px-5 py-4 text-muted-foreground">{c.issueDate}</td>
                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-2">
                            <button onClick={() => navigate({ to: "/verify", search: { id: c.reportNo } })} className="p-2 rounded-lg hover:bg-primary/10 text-primary"><Eye className="w-4 h-4" /></button>
                            <Link to="/admin/cert/$id" params={{ id: c.id }} className="p-2 rounded-lg hover:bg-primary/10 text-primary"><Edit3 className="w-4 h-4" /></Link>
                            <button onClick={() => { if (confirm("Delete this certificate?")) { deleteCertificate(c.id); refresh(); } }} className="p-2 rounded-lg hover:bg-destructive/10 text-destructive"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display text-2xl">Blog Posts ({posts.length})</h2>
              <Link to="/admin/blog/$id" params={{ id: "new" }} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-gold text-gold-foreground shadow-gold font-medium">
                <Plus className="w-4 h-4" /> New Post
              </Link>
            </div>
            {posts.length === 0 ? (
              <Empty msg="No blog posts yet." />
            ) : (
              <div className="grid md:grid-cols-2 gap-5">
                {posts.map((p) => (
                  <div key={p.id} className="p-6 rounded-2xl border border-border bg-card shadow-elegant">
                    <div className="flex items-start gap-4">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-gradient-navy shrink-0">
                        {p.coverDataUrl && <img src={p.coverDataUrl} alt="" className="w-full h-full object-cover" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-lg truncate">{p.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{p.publishedAt} • {p.author}</p>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{p.excerpt}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                      <Link to="/blog/$slug" params={{ slug: p.slug }} className="p-2 rounded-lg hover:bg-primary/10 text-primary"><Eye className="w-4 h-4" /></Link>
                      <Link to="/admin/blog/$id" params={{ id: p.id }} className="p-2 rounded-lg hover:bg-primary/10 text-primary"><Edit3 className="w-4 h-4" /></Link>
                      <button onClick={() => { if (confirm("Delete this post?")) { deleteBlogPost(p.id); refresh(); } }} className="p-2 rounded-lg hover:bg-destructive/10 text-destructive"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </Layout>
  );
}

function Empty({ msg }: { msg: string }) {
  return <div className="p-16 rounded-2xl border border-dashed border-border text-center text-muted-foreground">{msg}</div>;
}
