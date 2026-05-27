import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  getCertificates, deleteCertificate,
  getBlogPosts, deleteBlogPost,
  getClients, deleteClient,
  getVisitors,
} from "@/lib/db";
import type { Certificate, BlogPost, Client, Visitor } from "@/lib/store";
import {
  Plus, FileText, Newspaper,
  Trash2, Edit3, Eye, Gem, LayoutDashboard,
  Users, Search, Phone, Mail, X, Loader2,
  MapPin, Globe, Monitor, Smartphone, Tablet, Activity,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"clients" | "certs" | "blog" | "visitors">("clients");
  const [certs, setCerts]       = useState<Certificate[]>([]);
  const [posts, setPosts]       = useState<BlogPost[]>([]);
  const [clients, setClients]   = useState<Client[]>([]);
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading]   = useState(true);
  const [certSearch, setCertSearch]     = useState("");
  const [clientSearch, setClientSearch] = useState("");
  const [blogSearch, setBlogSearch]     = useState("");
  const [visitorSearch, setVisitorSearch] = useState("");
  const [clientFilter, setClientFilter] = useState<Client | null>(null);

  const refresh = async () => {
    setLoading(true);
    try {
      const [c, p, cl, v] = await Promise.all([
        getCertificates(), getBlogPosts(), getClients(), getVisitors(),
      ]);
      setCerts(c);
      setPosts(p);
      setClients(cl);
      setVisitors(v);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refresh(); }, []);

  const filteredClients = clients.filter((c) => {
    const q = clientSearch.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q) ||
      (c.email ?? "").toLowerCase().includes(q) ||
      (c.address ?? "").toLowerCase().includes(q)
    );
  });

  const filteredCerts = certs.filter((c) => {
    if (clientFilter) {
      return (c.clientId === clientFilter.id) || (c.clientName === clientFilter.name);
    }
    const q = certSearch.toLowerCase();
    return (
      c.reportNo.toLowerCase().includes(q) ||
      c.type.toLowerCase().includes(q) ||
      (c.itemName ?? "").toLowerCase().includes(q) ||
      (c.clientName ?? "").toLowerCase().includes(q) ||
      (c.shape ?? "").toLowerCase().includes(q)
    );
  });

  const filteredPosts = posts.filter((p) => {
    const q = blogSearch.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.author.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q)
    );
  });

  const filteredVisitors = visitors.filter((v) => {
    const q = visitorSearch.toLowerCase();
    return (
      (v.ip ?? "").includes(q) ||
      (v.city ?? "").toLowerCase().includes(q) ||
      (v.country ?? "").toLowerCase().includes(q) ||
      (v.browser ?? "").toLowerCase().includes(q) ||
      (v.page ?? "").toLowerCase().includes(q) ||
      (v.device ?? "").toLowerCase().includes(q)
    );
  });

  // Visitor stats
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayVisitors = visitors.filter(v => v.timestamp >= todayStart.getTime());
  const uniqueIPs = new Set(visitors.map(v => v.ip).filter(Boolean)).size;
  const deviceBreakdown = visitors.reduce<Record<string, number>>((acc, v) => {
    acc[v.device] = (acc[v.device] || 0) + 1;
    return acc;
  }, {});

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
          { label: "Clients",       value: loading ? "—" : clients.length,  icon: Users     },
          { label: "Certificates",  value: loading ? "—" : certs.length,    icon: FileText  },
          { label: "Blog Posts",    value: loading ? "—" : posts.length,    icon: Newspaper },
          { label: "Total Visits",  value: loading ? "—" : visitors.length, icon: Activity  },
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
      <div className="flex flex-wrap gap-1 rounded-2xl border border-border bg-card p-1 mb-8 w-fit">
        {[
          { k: "clients",  label: "Clients",      icon: Users     },
          { k: "certs",    label: "Certificates", icon: FileText  },
          { k: "blog",     label: "Blog Posts",   icon: Newspaper },
          { k: "visitors", label: "Visitors",     icon: Activity  },
        ].map((t) => (
          <button
            key={t.k}
            onClick={() => setTab(t.k as "clients" | "certs" | "blog" | "visitors")}
            className={`px-4 py-2 rounded-xl inline-flex items-center gap-2 text-sm transition-all ${
              tab === t.k
                ? "bg-gradient-gold text-gold-foreground shadow-gold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <t.icon className="w-4 h-4" /> {t.label}
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}

      {/* ── CLIENTS ── */}
      {!loading && tab === "clients" && (
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <h2 className="font-display text-xl">
              Clients
              <span className="ml-2 text-sm font-sans text-muted-foreground font-normal">
                ({filteredClients.length})
              </span>
            </h2>
            <div className="flex items-center gap-3">
              <SearchBox value={clientSearch} onChange={setClientSearch} placeholder="Search clients…" />
              <Link
                to="/admin/clients/$id"
                params={{ id: "new" }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-gold text-gold-foreground text-sm shadow-gold font-medium hover:scale-[1.02] transition-transform whitespace-nowrap"
              >
                <Plus className="w-4 h-4" /> New Client
              </Link>
            </div>
          </div>

          {filteredClients.length === 0 ? (
            <Empty msg={clients.length === 0 ? "No clients yet — click New Client to add one." : "No clients match your search."} />
          ) : (
            <div className="rounded-2xl border border-border bg-card shadow-elegant overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-card">
                    <Th>Name</Th>
                    <Th hide="sm">Phone</Th>
                    <Th hide="md">Email</Th>
                    <Th hide="lg">Address</Th>
                    <Th right>Actions</Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredClients.map((cl) => (
                    <tr key={cl.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3.5 font-medium">{cl.name}</td>
                      <td className="px-5 py-3.5 text-foreground/80 hidden sm:table-cell">
                        <span className="inline-flex items-center gap-1.5">
                          <Phone className="w-3 h-3 text-primary/50" />{cl.phone}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-muted-foreground hidden md:table-cell">
                        {cl.email ? (
                          <span className="inline-flex items-center gap-1.5">
                            <Mail className="w-3 h-3 text-primary/50" />{cl.email}
                          </span>
                        ) : "—"}
                      </td>
                      <td className="px-5 py-3.5 text-muted-foreground hidden lg:table-cell truncate max-w-[200px]">{cl.address || "—"}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex justify-end gap-1">
                          <ActionBtn
                            title="View Certificates"
                            onClick={() => { setClientFilter(cl); setCertSearch(""); setTab("certs"); }}
                          >
                            <Gem className="w-4 h-4" />
                          </ActionBtn>
                          <Link
                            to="/admin/clients/$id"
                            params={{ id: cl.id }}
                            className="p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                            title="Edit"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Link>
                          <ActionBtn
                            title="Delete"
                            danger
                            onClick={async () => {
                              if (confirm(`Delete client "${cl.name}"?`)) {
                                await deleteClient(cl.id);
                                toast.success("Client deleted", { description: cl.name });
                                await refresh();
                              }
                            }}
                          >
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

      {/* ── CERTIFICATES ── */}
      {!loading && tab === "certs" && (
        <div>
          {clientFilter && (
            <div className="flex items-center gap-3 mb-4 px-4 py-2.5 rounded-xl border border-primary/30 bg-primary/5 text-sm">
              <Gem className="w-4 h-4 text-primary shrink-0" />
              <span className="text-foreground/80">
                Showing reports for <span className="font-semibold text-foreground">{clientFilter.name}</span>
              </span>
              <button
                onClick={() => setClientFilter(null)}
                className="ml-auto flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" /> Show all
              </button>
            </div>
          )}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <h2 className="font-display text-xl">
              Certificates
              <span className="ml-2 text-sm font-sans text-muted-foreground font-normal">
                ({filteredCerts.length})
              </span>
            </h2>
            <div className="flex items-center gap-3">
              {!clientFilter && <SearchBox value={certSearch} onChange={setCertSearch} placeholder="Search certificates…" />}
              <Link
                to="/admin/cert/$id"
                params={{ id: "new" }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-gold text-gold-foreground text-sm shadow-gold font-medium hover:scale-[1.02] transition-transform whitespace-nowrap"
              >
                <Plus className="w-4 h-4" /> New Certificate
              </Link>
            </div>
          </div>

          {filteredCerts.length === 0 ? (
            <Empty msg={certs.length === 0 ? "No certificates yet — click New Certificate to create one." : "No certificates match your search."} />
          ) : (
            <div className="rounded-2xl border border-border bg-card shadow-elegant overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-card">
                    <Th>Report No.</Th>
                    <Th hide="sm">Client</Th>
                    <Th>Type</Th>
                    <Th hide="md">Item</Th>
                    <Th hide="lg">Issued</Th>
                    <Th right>Actions</Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredCerts.map((c) => (
                    <tr key={c.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3.5 font-mono text-xs text-primary">{c.reportNo}</td>
                      <td className="px-5 py-3.5 text-foreground/80 hidden sm:table-cell">{c.clientName || "—"}</td>
                      <td className="px-5 py-3.5">{c.type}</td>
                      <td className="px-5 py-3.5 text-foreground/80 hidden md:table-cell">{c.itemName || "—"}</td>
                      <td className="px-5 py-3.5 text-muted-foreground hidden lg:table-cell">{c.issueDate}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex justify-end gap-1">
                          <ActionBtn
                            title="View"
                            onClick={() => navigate({ to: "/verify", search: { id: c.reportNo } })}
                          >
                            <Eye className="w-4 h-4" />
                          </ActionBtn>
                          <Link
                            to="/admin/cert/$id"
                            params={{ id: c.id }}
                            className="p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                            title="Edit"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Link>
                          <ActionBtn
                            title="Delete"
                            danger
                            onClick={async () => {
                              if (confirm(`Delete certificate ${c.reportNo}?`)) {
                                await deleteCertificate(c.id);
                                toast.success("Certificate deleted", { description: c.reportNo });
                                await refresh();
                              }
                            }}
                          >
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

      {/* ── BLOG ── */}
      {!loading && tab === "blog" && (
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <h2 className="font-display text-xl">
              Blog Posts
              <span className="ml-2 text-sm font-sans text-muted-foreground font-normal">
                ({filteredPosts.length})
              </span>
            </h2>
            <div className="flex items-center gap-3">
              <SearchBox value={blogSearch} onChange={setBlogSearch} placeholder="Search posts…" />
              <Link
                to="/admin/blog/$id"
                params={{ id: "new" }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-gold text-gold-foreground text-sm shadow-gold font-medium hover:scale-[1.02] transition-transform whitespace-nowrap"
              >
                <Plus className="w-4 h-4" /> New Post
              </Link>
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <Empty msg={posts.length === 0 ? "No blog posts yet — click New Post to write your first article." : "No posts match your search."} />
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
                  {filteredPosts.map((p) => (
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
                          <ActionBtn
                            title="Delete"
                            danger
                            onClick={async () => {
                              if (confirm(`Delete "${p.title}"?`)) {
                                await deleteBlogPost(p.id);
                                toast.success("Post deleted", { description: p.title });
                                await refresh();
                              }
                            }}
                          >
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

      {/* ── VISITORS ── */}
      {!loading && tab === "visitors" && (
        <div>
          {/* Visitor stats mini-cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <MiniStat label="Today" value={todayVisitors.length} />
            <MiniStat label="Unique IPs" value={uniqueIPs} />
            <MiniStat label="Mobile" value={deviceBreakdown["Mobile"] ?? 0} />
            <MiniStat label="Desktop" value={deviceBreakdown["Desktop"] ?? 0} />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <h2 className="font-display text-xl">
              Visitor Log
              <span className="ml-2 text-sm font-sans text-muted-foreground font-normal">
                ({filteredVisitors.length})
              </span>
            </h2>
            <SearchBox value={visitorSearch} onChange={setVisitorSearch} placeholder="Search IP, city, page…" />
          </div>

          {filteredVisitors.length === 0 ? (
            <Empty msg="No visitor records yet — visits are tracked 5 seconds after page load." />
          ) : (
            <div className="space-y-3">
              {filteredVisitors.map((v) => (
                <div
                  key={v.id}
                  className="rounded-xl border border-border bg-card p-4 hover:border-primary/30 transition-colors"
                >
                  <div className="flex flex-wrap items-start gap-x-6 gap-y-2">
                    {/* Time + page */}
                    <div className="min-w-0">
                      <div className="text-xs text-muted-foreground mb-0.5">
                        {new Date(v.timestamp).toLocaleString("en-GB", {
                          day: "numeric", month: "short", year: "numeric",
                          hour: "2-digit", minute: "2-digit",
                        })}
                      </div>
                      <div className="font-mono text-sm text-foreground/90 truncate max-w-[200px]">
                        {v.page || "/"}
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-1.5 min-w-0">
                      <MapPin className="w-3.5 h-3.5 text-primary/60 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-sm font-medium">
                          {[v.city, v.region, v.country].filter(Boolean).join(", ") || "Unknown location"}
                        </div>
                        <div className="text-xs text-muted-foreground font-mono">
                          {v.ip || "—"}
                          {v.locationSource === "browser" && (
                            <span className="ml-2 text-emerald-500 font-sans">● GPS</span>
                          )}
                          {v.locationSource === "ip" && (
                            <span className="ml-2 text-amber-500 font-sans">● IP</span>
                          )}
                          {v.locationSource === "denied" && (
                            <span className="ml-2 text-muted-foreground font-sans">● Denied</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Lat/lon if browser GPS */}
                    {v.lat && v.lon && (
                      <div className="flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-primary/60 shrink-0" />
                        <a
                          href={`https://maps.google.com/?q=${v.lat},${v.lon}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline font-mono"
                        >
                          {v.lat.toFixed(4)}, {v.lon.toFixed(4)}
                        </a>
                      </div>
                    )}

                    {/* Device */}
                    <div className="flex items-center gap-1.5">
                      {v.device === "Mobile" ? (
                        <Smartphone className="w-3.5 h-3.5 text-primary/60" />
                      ) : v.device === "Tablet" ? (
                        <Tablet className="w-3.5 h-3.5 text-primary/60" />
                      ) : (
                        <Monitor className="w-3.5 h-3.5 text-primary/60" />
                      )}
                      <div>
                        <div className="text-sm">{v.browser} · {v.os}</div>
                        <div className="text-xs text-muted-foreground">{v.device} · {v.screenWidth}×{v.screenHeight}</div>
                      </div>
                    </div>

                    {/* ISP / Timezone */}
                    {(v.isp || v.timezone) && (
                      <div className="text-xs text-muted-foreground leading-relaxed">
                        {v.isp && <div className="truncate max-w-[180px]">{v.isp}</div>}
                        {v.timezone && <div>{v.timezone}</div>}
                      </div>
                    )}

                    {/* Referrer */}
                    {v.referrer && (
                      <div className="text-xs text-muted-foreground truncate max-w-[180px]" title={v.referrer}>
                        From: {v.referrer}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="p-3 rounded-xl border border-border bg-card/60">
      <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{label}</div>
      <div className="font-display text-2xl text-gradient-gold">{value}</div>
    </div>
  );
}

function SearchBox({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-9 pr-4 py-2 rounded-full border border-border bg-card/60 text-sm outline-none focus:border-primary transition-colors w-48 text-foreground placeholder:text-muted-foreground"
      />
    </div>
  );
}

function Th({
  children,
  hide,
  right,
}: {
  children: React.ReactNode;
  hide?: "sm" | "md" | "lg";
  right?: boolean;
}) {
  const hideCls =
    hide === "sm"
      ? "hidden sm:table-cell"
      : hide === "md"
        ? "hidden md:table-cell"
        : hide === "lg"
          ? "hidden lg:table-cell"
          : "";
  return (
    <th
      className={`px-5 py-3 text-xs uppercase tracking-widest text-muted-foreground font-medium text-left ${right ? "text-right" : ""} ${hideCls}`}
    >
      {children}
    </th>
  );
}

function ActionBtn({
  children,
  onClick,
  title,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded-lg transition-colors text-muted-foreground ${
        danger
          ? "hover:bg-destructive/10 hover:text-destructive"
          : "hover:bg-primary/10 hover:text-primary"
      }`}
    >
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
