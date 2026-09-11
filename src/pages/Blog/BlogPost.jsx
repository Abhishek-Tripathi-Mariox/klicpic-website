import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import SiteLayout from "../../components/SiteLayout";
import NotFound from "../NotFound";
import FitImage from "../../components/FitImage";
import { imageUrl } from "../../api/imageUrl";
import { useApi } from "../../api/useApi";
import { fetchBlogPost } from "../../api/endpoints";

/**
 * A single blog post, opened by its slug.
 *
 * A slug that is unknown, unpublished or scheduled comes back 404 from the
 * API, and this renders the site's own not-found page rather than an empty
 * article shell.
 */
const DATE = { day: "numeric", month: "long", year: "numeric" };

export default function BlogPost() {
  const { slug } = useParams();
  const { data: post, loading, error } = useApi(
    (options) => fetchBlogPost(slug, options),
    null,
    [slug]
  );

  if (loading) {
    return (
      <SiteLayout>
        <div className="flex w-full justify-center px-6 py-32">
          <p className="text-[14px] leading-[20px] text-[#99a1af]">Loading…</p>
        </div>
      </SiteLayout>
    );
  }

  if (error || !post) return <NotFound />;

  return (
    <SiteLayout>
      <article className="flex w-full flex-col items-center bg-white px-6 pt-16 pb-20 md:pt-32">
        <div className="flex w-full max-w-[720px] flex-col items-start">
          <Link
            to="/blog"
            className="flex items-center gap-2 text-[13px] leading-[18px] font-semibold text-[#6a7282] transition-colors hover:text-[#f9a825]"
          >
            <ArrowLeft className="size-4 shrink-0" strokeWidth={1.666} />
            All posts
          </Link>

          <span className="mt-6 rounded-full bg-[#fffbeb] px-3 py-1 text-[11px] leading-4 font-bold text-[#d08700]">
            {post.category}
          </span>

          <h1 className="pt-4 text-[28px] leading-[36px] font-bold break-words text-[#1f2937] sm:text-[32px] sm:leading-[40px] md:text-[40px] md:leading-[48px]">
            {post.title}
          </h1>

          <span className="flex flex-wrap items-center gap-4 pt-4 text-[12px] leading-4 text-[#99a1af]">
            <span>{post.author}</span>
            <span className="flex items-center gap-1">
              <CalendarDays className="size-[13px] shrink-0" strokeWidth={1.666} />
              {new Date(post.publishedAt).toLocaleDateString("en-GB", DATE)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="size-[13px] shrink-0" strokeWidth={1.666} />
              {post.readMinutes} min read
            </span>
          </span>

          {post.coverImage && (
            <FitImage
              src={imageUrl(post.coverImage, 1280)}
              alt={post.title}
              loading="eager"
              className="mt-8 h-[240px] w-full rounded-2xl sm:h-[360px]"
            />
          )}

          {/* The body is plain text with blank lines between paragraphs, so it
              renders as paragraphs rather than through a markdown parser. */}
          <div className="flex w-full flex-col gap-5 pt-8">
            {String(post.body || "")
              .split(/\n\s*\n/)
              .map((paragraph) => paragraph.trim())
              .filter(Boolean)
              .map((paragraph, index) => (
                <p key={index} className="text-[16px] leading-[28px] text-[#374151]">
                  {paragraph}
                </p>
              ))}
          </div>

          {post.tags?.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-10">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#f3f4f6] px-3 py-1 text-[11px] leading-4 font-semibold text-[#6a7282]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </SiteLayout>
  );
}
