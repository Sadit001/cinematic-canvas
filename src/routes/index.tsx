import { createFileRoute } from "@tanstack/react-router";
import { PortfolioHome } from "../components/PortfolioHome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mara Voss — Creative Developer & Designer" },
      { name: "description", content: "Creative developer and designer crafting cinematic, motion-driven digital experiences." },
      { property: "og:title", content: "Mara Voss — Creative Developer & Designer" },
      { property: "og:description", content: "Cinematic digital experiences, creative development, and art direction." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PortfolioHome,
});
