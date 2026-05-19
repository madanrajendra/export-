"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Blog } from "@/types";
import { Calendar, ArrowLeft, Loader2, BookOpen } from "lucide-react";
import { DateTime } from "luxon";

export default function BlogDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const q = query(
          collection(db, "blogs"),
          where("slug", "==", slug),
          where("status", "==", "published")
        );
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          setBlog({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Blog);
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [slug]);

  if (loading) {
    return <div className="p-40 flex justify-center"><Loader2 className="w-12 h-12 text-secondary animate-spin" /></div>;
  }

  if (!blog) {
    return (
      <div className="p-40 text-center">
        <h1 className="text-4xl font-black text-primary mb-4">Article Not Found</h1>
        <button onClick={() => router.push("/blog")} className="text-secondary font-bold hover:underline">Return to Insights</button>
      </div>
    );
  }

  return (
    <article className="pb-24">
      <header className="bg-slate-950 text-white pt-24 pb-32 relative text-center">
        {blog.coverImage && <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${blog.coverImage})`}} />}
        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <button onClick={() => router.push("/blog")} className="mb-8 flex items-center gap-2 text-slate-400 hover:text-white mx-auto">
            <ArrowLeft className="w-4 h-4" /> Back to Insights
          </button>
          <div className="flex justify-center mb-6">
            <div className="bg-secondary/10 text-secondary border border-secondary/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {blog.publishedAt ? DateTime.fromJSDate(blog.publishedAt.toDate()).toFormat("MMMM dd, yyyy") : "Draft"}
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tighter mb-8">{blog.title}</h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">{blog.summary}</p>
        </div>
      </header>
      <div className="container mx-auto px-4 -mt-16 relative z-20 max-w-4xl">
        <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl border border-slate-100 prose prose-lg prose-slate prose-headings:font-black prose-a:text-secondary max-w-none">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
      </div>
    </article>
  );
}
