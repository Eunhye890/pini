import { Game } from "@/lib/games";

interface JsonLdProps {
  data: Record<string, unknown>;
}

function JsonLdScript({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebsiteJsonLd() {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Pini",
        url: "https://playpini.com",
        description:
          "1000+ free games for kids & students K-12. Puzzles, strategy, memory and more. No signup needed.",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://playpini.com/games?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      }}
    />
  );
}

export function GameJsonLd({ game }: { game: Game }) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "VideoGame",
        name: game.title,
        description: game.description,
        url: `https://playpini.com/games/${game.id}`,
        image: game.thumbnail,
        playMode: "SinglePlayer",
        applicationCategory: "Game",
        operatingSystem: "Web Browser",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        audience: {
          "@type": "EducationalAudience",
          educationalRole: "student",
        },
      }}
    />
  );
}

export function GameListJsonLd({
  name,
  games,
  url,
}: {
  name: string;
  games: Game[];
  url: string;
}) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name,
        url,
        numberOfItems: games.length,
        itemListElement: games.slice(0, 20).map((game, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `https://playpini.com/games/${game.id}`,
          name: game.title,
        })),
      }}
    />
  );
}
