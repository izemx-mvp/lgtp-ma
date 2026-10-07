import { createFileRoute, notFound } from "@tanstack/react-router";
import { postBySlug } from "@/data/posts";
import { PageHero } from "@/components/site/PageHero";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => { const post = postBySlug(params.slug); if (!post) throw notFound(); return { post }; },
  head: ({ loaderData, params }) => loaderData ? pageHead({ title: loaderData.post.seo.title, description: loaderData.post.seo.description, path: `/blog/${params.slug}`, type: "article" }) : { meta: [{ title: "Article introuvable — LGTP" }] },
  component: () => { const { post } = Route.useLoaderData(); return (<><PageHero title={post.title} intro={post.excerpt} crumbs={[{ label: "Blog", to: "/blog" }, { label: post.title }]} /><article className="container-site section-y prose-lgtp">{post.content.map((b, i) => b.type === "p" ? <p key={i}>{b.text}</p> : b.type === "h2" ? <h2 key={i} id={b.id}>{b.text}</h2> : b.type === "list" || b.type === "takeaways" ? <ul key={i}>{b.items.map((x) => <li key={x}>{x}</li>)}</ul> : b.type === "callout" ? <p key={i}><strong>{b.title} : </strong>{b.text}</p> : null)}</article></>); },
});
