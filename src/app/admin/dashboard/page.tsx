"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { checkAuth, logout } from "@/lib/admin-auth";
import { blogPosts } from "@/data/blog-posts";

interface ContactSubmission {
  name: string;
  email: string;
  interest: string;
  message: string;
  date: string;
}

function StatCard({
  label,
  value,
  icon,
  gradient,
  index,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  gradient: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass glass-hover rounded-2xl p-6 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white`}
        >
          {icon}
        </div>
      </div>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm text-white/40">{label}</p>
    </motion.div>
  );
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);

  useEffect(() => {
    if (!checkAuth()) {
      router.push("/admin");
      return;
    }
    setAuthenticated(true);

    // Load contact submissions from localStorage
    try {
      const stored = localStorage.getItem("bluewave_contact_submissions");
      if (stored) {
        setSubmissions(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push("/admin");
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-deep-900 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-ocean-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  const stats = [
    {
      label: "Total Students",
      value: 42,
      gradient: "from-ocean-500 to-wave-500",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
        </svg>
      ),
    },
    {
      label: "Contact Submissions",
      value: submissions.length,
      gradient: "from-wave-500 to-glacier-300",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
    },
    {
      label: "Blog Posts",
      value: blogPosts.length,
      gradient: "from-lava-500 to-amber-400",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5" />
        </svg>
      ),
    },
    {
      label: "Revenue (MTD)",
      value: "$1,240",
      gradient: "from-emerald-500 to-teal-400",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  const quickLinks = [
    { label: "Manage Blog", href: "/blog", icon: "pencil" },
    { label: "View School Stats", href: "/school", icon: "academic" },
    { label: "Site Settings", href: "/", icon: "cog" },
  ];

  return (
    <div className="min-h-screen bg-deep-900">
      {/* Top bar */}
      <nav className="glass border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-white font-bold text-lg hover:text-ocean-400 transition-colors"
            >
              BlueWave
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-white/60 text-sm font-medium">Admin</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, Captain.
          </h1>
          <p className="text-white/40">
            Here&apos;s what&apos;s happening at BlueWave.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, i) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
              gradient={stat.gradient}
              index={i}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent submissions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2 glass rounded-2xl p-6"
          >
            <h2 className="text-lg font-semibold text-white mb-4">
              Recent Contact Submissions
            </h2>
            {submissions.length === 0 ? (
              <div className="text-center py-12">
                <svg
                  viewBox="0 0 24 24"
                  className="w-12 h-12 text-white/10 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <p className="text-white/30 text-sm">
                  No submissions yet. They&apos;ll appear here when someone
                  fills out the contact form.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {submissions
                  .slice()
                  .reverse()
                  .slice(0, 10)
                  .map((sub, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ocean-500 to-wave-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {sub.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-medium text-white truncate">
                            {sub.name}
                          </p>
                          <span className="text-xs text-white/20">
                            {sub.date}
                          </span>
                        </div>
                        <p className="text-xs text-white/40 mb-1">
                          {sub.email} — {sub.interest || "General"}
                        </p>
                        <p className="text-sm text-white/50 line-clamp-2">
                          {sub.message}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="glass rounded-2xl p-6"
          >
            <h2 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h2>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-ocean-500/10 flex items-center justify-center text-ocean-400 group-hover:bg-ocean-500/20 transition-colors">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      {link.icon === "pencil" && (
                        <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      )}
                      {link.icon === "academic" && (
                        <path d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
                      )}
                      {link.icon === "cog" && (
                        <path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                      )}
                      {link.icon === "cog" && (
                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      )}
                    </svg>
                  </div>
                  <span className="text-sm text-white/60 group-hover:text-white transition-colors">
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>

            {/* Blog posts list */}
            <h3 className="text-sm font-semibold text-white/60 mt-8 mb-3">
              Published Posts
            </h3>
            <div className="space-y-2">
              {blogPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center gap-2 text-xs text-white/40 py-1.5"
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${post.gradient}`}
                  />
                  <span className="truncate flex-1">{post.title}</span>
                  <span className="text-white/20 shrink-0">{post.date}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
