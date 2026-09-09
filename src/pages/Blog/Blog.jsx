import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Clock } from "lucide-react";
import SiteLayout from "../../components/SiteLayout";
import PolicyHero from "../../components/PolicyHero";
import CatalogFilters from "../../components/CatalogFilters";
import LoadMore from "../../components/LoadMore";
import { imageUrl } from "../../api/imageUrl";
import { useApi } from "../../api/useApi";
import { fetchBlogs } from "../../api/endpoints";

/**
 * NOTE: there is no Figma frame for /blog — the More menu (1616:18859) and the
 * footer both link to it. Posts are records written in the CRM, and the listing
 * is paged by the server rather than fetched whole.
 */
const PAGE_SIZE = 9;

const DATE = { day: "numeric", month: "short", year: "numeric" };

/** Cards have no bundled artwork, so one without a cover gets this. */
const COVER_FALLBACK = "bg-gradient-to-br from-[#3f4550] to-[#1f2937]";

export default function Blog() {
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);

  // Asking for page 1..N at once keeps "Load more" simple: the server returns
  // the running slice, so nothing is stitched together in the browser.
  const { data, loading } = useApi(
    (options) => fetchBlogs({ category, limit: page * PAGE_SIZE }, options),
    null,
    [category, page]
  );

  const posts = data?.items || [];
  const categories = data?.categories || ["All"];
  const total = data?.total || 0;

  return (
    <SiteLayout>
      <PolicyHero
        variant="legal"
        badge="Blog"
        title="Stories from the studio"
        meta="Shoot guides, styling tips and behind-the-scenes"
      />

      <section className="flex w-full flex-col items-center bg-white px-6 py-16">
        <div className="flex w-full max-w-[1200px] flex-col items-center">
          {categories.length > 1 && (
            <CatalogFilters
              filters={categories}
              active={category}
              onChange={(next) => {
                setPage(1);
                setCategory(next);
              }}
            />
          )}

          {loading && posts.length === 0 ? (
            <p className="py-16 text-[14px] leading-[20px] text-[#99a1af]">Loading posts…</p>
          ) : posts.length === 0 ? (
            <div className="flex w-full max-w-[560px] flex-col items-center py-12 text-center">
              <span className="text-[40px] leading-none">✍️</span>
              <h2 className="pt-5 text-[24px] leading-8 font-bold text-[#1f2937]">
                We're writing our first posts
              </h2>
              <p className="pt-3 text-[14px] leading-[22px] text-[#6a7282]">
                In the meantime, browse our themes for inspiration or see real
                shoots in the studio gallery.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-7">
                <Link
                  to="/themes"
                  className="rounded-2xl bg-[#f9a825] px-6 py-3 text-center text-[14px] leading-[20px] font-bold text-white transition-colors hover:bg-[#e69a1f]"
                >
                  Browse Themes
                </Link>
                <Link
                  to="/gallery"
                  className="rounded-2xl border-[0.57px] border-solid border-[#e5e7eb] px-6 py-3 text-center text-[14px] leading-[20px] font-bold text-[#1f2937] transition-colors hover:border-[#f9a825]"
                >
                  Studio Gallery
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="grid w-full grid-cols-1 gap-6 pt-10 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border-[0.57px] border-solid border-[#f3f4f6] bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1)]"
                  >
                    <div className={`relative h-[180px] w-full shrink-0 overflow-hidden ${COVER_FALLBACK}`}>
                      {post.coverImage && (
                        <img
                          src={imageUrl(post.coverImage, 640)}
                          alt={post.title}
                          loading="lazy"
                          className="pointer-events-none absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                      <span className="absolute top-3 left-3 rounded-full bg-[rgba(249,168,37,0.92)] px-3 py-1 text-[11px] leading-4 font-bold text-[#1f2937]">
                        {post.category}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col items-start p-5">
                      <h3 className="text-[16px] leading-6 font-bold text-[#1f2937]">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="line-clamp-3 pt-2 text-[13px] leading-[20px] text-[#6a7282]">
                          {post.excerpt}
                        </p>
                      )}
                      <span className="mt-auto flex items-center gap-3 pt-4 text-[11px] leading-4 text-[#99a1af]">
                        <span className="flex items-center gap-1">
                          <CalendarDays className="size-[13px] shrink-0" strokeWidth={1.666} />
                          {new Date(post.publishedAt).toLocaleDateString("en-GB", DATE)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="size-[13px] shrink-0" strokeWidth={1.666} />
                          {post.readMinutes} min read
                        </span>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              <LoadMore
                shown={posts.length}
                total={total}
                onMore={() => setPage((current) => current + 1)}
                noun="posts"
              />
            </>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
