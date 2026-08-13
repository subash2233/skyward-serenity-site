import { createFileRoute } from "@tanstack/react-router";

// The site is a static HTML/CSS/JS build served from /public.
// Visiting "/" hands off to the static home page.
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SKY Yoga Centre | Yoga Studio in Ramanathapuram, Coimbatore" },
      {
        name: "description",
        content:
          "SKY Yoga Centre is a peaceful yoga studio in Ramanathapuram, Coimbatore offering group lessons, family yoga, karma yoga, kundalini yoga, power yoga and yoga therapy.",
      },
      {
        property: "og:title",
        content: "SKY Yoga Centre | Yoga Studio in Ramanathapuram, Coimbatore",
      },
      {
        property: "og:description",
        content:
          "A peaceful space for yoga, wellness and holistic growth in Ramanathapuram, Coimbatore.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <div style={{ minHeight: "100vh", background: "#1e2f24" }}>
      <meta httpEquiv="refresh" content="0; url=/index.html" />
      <script
        dangerouslySetInnerHTML={{
          __html: 'window.location.replace("/index.html");',
        }}
      />
      <noscript>
        <a href="/index.html" style={{ color: "#f7f3ea", padding: "2rem", display: "block" }}>
          Enter SKY Yoga Centre
        </a>
      </noscript>
    </div>
  );
}
