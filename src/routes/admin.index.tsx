import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  getCertificates, deleteCertificate,
  getBlogPosts, deleteBlogPost,
  type Certificate, type BlogPost,
} from "@/lib/store";
import {
  Plus, FileText, Newspaper,
  Trash2, Edit3, Eye, Gem, LayoutDashboard,
} from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"certs" | "blog">("certs");
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);

  const refresh = () => {
    setCerts(getCertificates());
    setPosts(getBlogPosts());
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <LayoutDashboard className="w-5 h-5 text-primary" />
        <h1 className="font-display text-2xl">Dashboard</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Certificates", value: certs.length, icon: FileText },
          { label: "Blog Posts", value: posts.length, icon: Newspaper },
          { label: "Report Types", value: 4, icon: Gem },
          { label: "Status", value: "Live", icon: Eye },
        ].map((s) => (
          <div key={s.label} className="p-4 rounded-xl border border-border bg-card/60 backdrop-blur-sm shadow-elegant">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">{s.label}</span>
              <s.icon className="w-4 h-4 text-primary/50" />
            </div>
            <div className="font-display text-3xl text-gradient-gold">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="inline-flex rounded-full border border-border bg-card p-1 mb-8">
        {[
          { k: "certs", label: "Certificates", icon: FileText },
          { k: "blog", label: "Blog Posts", icon: Newspaper },
        ].map((t) => (
          <button
            key={t.k}
            onClick={() => setTab(t.k as "certs" | "blog")}
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

      {/* Certificates */}
      {tab === "certs" && (
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-xl">
              Certificates
              <span className="ml-2 text-sm font-sans text-muted-foreground font-normal">({certs.length})</span>
            </h2>
            <Link
              to="/admin/cert/$id"
              params={{ id: "new" }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-gold text-gold-foreground text-sm shadow-gold font-medium hover:scale-[1.02] transition-transform"
            >
              <Plus className="w-4 h-4" /> New Certificate
            </Link>
          </div>

          {certs.length === 0 ? (
            <Empty msg="No certificates yet — click New Certificate to create one." />
          ) : (
            <div className="rounded-2xl border border-border bg-card shadow-elegant overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-card">
                    <Th>Report No.</Th>
                    <Th>Type</Th>
                    <Th hide="md">Item</Th>
                    <Th hide="sm">Carat</Th>
                    <Th hide="lg">Issued</Th>
                    <Th right>Actions</Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {certs.map((c) => (
                    <tr key={c.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3.5 font-mono text-xs text-primary">{c.reportNo}</td>
                      <td className="px-5 py-3.5">{c.type}</td>
                      <td className="px-5 py-3.5 text-foreground/80 hidden md:table-cell">{c.itemName || "—"}</td>
                      <td className="px-5 py-3.5 text-foreground/80 hidden sm:table-cell">{c.caratWeight || "—"}</td>
                      <td className="px-5 py-3.5 text-muted-foreground hidden lg:table-cell">{c.issueDate}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex justify-end gap-1">
                          <ActionBtn title="View" onClick={() => navigate({ to: "/verify", search: { id: c.reportNo } })}>
                            <Eye className="w-4 h-4" />
                          </ActionBtn>
                          <Link to="/admin/cert/$id" params={{ id: c.id }}
                            className="p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors" title="Edit">
                            <Edit3 className="w-4 h-4" />
                          </Link>
                          <ActionBtn title="Delete" danger onClick={() => {
                            if (confirm(`Delete certificate ${c.reportNo}?`)) { deleteCertificate(c.id); refresh(); }
                          }}>
                            <Trash2 className="w-4 h-4" />
                          </ActionBtn>
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

      {/* Blog */}
      {tab === "blog" && (
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-xl">
              Blog Posts
              <span className="ml-2 text-sm font-sans text-muted-foreground font-normal">({posts.length})</span>
            </h2>
            <Link
              to="/admin/blog/$id"
              params={{ id: "new" }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-gold text-gold-foreground text-sm shadow-gold font-medium hover:scale-[1.02] transition-transform"
            >
              <Plus className="w-4 h-4" /> New Post
            </Link>
          </div>

          {posts.length === 0 ? (
            <Empty msg="No blog posts yet — click New Post to write your first article." />
          ) : (
            <div className="rounded-2xl border border-border bg-card shadow-elegant overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-card">
                    <Th>Title</Th>
                    <Th hide="md">Author</Th>
                    <Th hide="sm">Published</Th>
                    <Th right>Actions</Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {posts.map((p) => (
                    <tr key={p.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg overflow-hidden bg-gradient-navy shrink-0 flex items-center justify-center text-primary/30 text-xs font-display">
                            {p.coverDataUrl
                              ? <img src={p.coverDataUrl} alt="" className="w-full h-full object-cover" />
                              : "JR"}
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium truncate max-w-[200px]">{p.title}</div>
                            <div className="text-xs text-muted-foreground truncate max-w-[200px]">{p.excerpt}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-foreground/80 hidden md:table-cell">{p.author}</td>
                      <td className="px-5 py-3.5 text-muted-foreground hidden sm:table-cell">{p.publishedAt}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex justify-end gap-1">
                          <Link to="/blog/$slug" params={{ slug: p.slug }}
                            className="p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors" title="View">
                            <Eye className="w-4 h-4" />
                          </Link>
                          <Link to="/admin/blog/$id" params={{ id: p.id }}
                            className="p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors" title="Edit">
                            <Edit3 className="w-4 h-4" />
                          </Link>
                          <ActionBtn title="Delete" danger onClick={() => {
                            if (confirm(`Delete "${p.title}"?`)) { deleteBlogPost(p.id); refresh(); }
                          }}>
                            <Trash2 className="w-4 h-4" />
                          </ActionBtn>
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
  );
}

function Th({ children, hide, right }: { children: React.ReactNode; hide?: "sm" | "md" | "lg"; right?: boolean }) {
  const hideCls = hide === "sm" ? "hidden sm:table-cell" : hide === "md" ? "hidden md:table-cell" : hide === "lg" ? "hidden lg:table-cell" : "";
  return (
    <th className={`px-5 py-3 text-xs uppercase tracking-widest text-muted-foreground font-medium text-left ${right ? "text-right" : ""} ${hideCls}`}>
      {children}
    </th>
  );
}

function ActionBtn({ children, onClick, title, danger }: { children: React.ReactNode; onClick: () => void; title: string; danger?: boolean }) {
  return (
    <button onClick={onClick} title={title}
      className={`p-1.5 rounded-lg transition-colors text-muted-foreground ${
        danger ? "hover:bg-destructive/10 hover:text-destructive" : "hover:bg-primary/10 hover:text-primary"
      }`}>
      {children}
    </button>
  );
}

function Empty({ msg }: { msg: string }) {
  return (
    <div className="py-20 rounded-2xl border border-dashed border-border text-center text-sm text-muted-foreground">
      {msg}
    </div>
  );
}
