import { AuthorByline } from "@/components/insights/author-byline";
import { InsightsDisclaimer } from "@/components/insights/disclaimer";
import type { InsightBlock, InsightArticle } from "@/content/insights";
import { Heading, Text } from "@/components/ui/typography";
import { TextLink } from "@/components/ui/text-link";

function Block({ block }: { block: InsightBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <Heading as={block.level === 2 ? "h2" : "h3"} size={block.level === 2 ? "md" : "sm"}>
          {block.text}
        </Heading>
      );
    case "paragraph":
      return <Text>{block.text}</Text>;
    case "list":
      return block.ordered ? (
        <ol className="m-0 pl-5 space-y-2 font-sans text-navy-900 leading-relaxed">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      ) : (
        <ul className="m-0 pl-5 space-y-2 font-sans text-navy-900 leading-relaxed">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <aside
          className="rounded-md border border-navy-800/15 bg-surface-ivory px-4 py-3 font-sans text-sm text-navy-900"
          role="note"
        >
          {block.text}
        </aside>
      );
    case "externalLink":
      return (
        <p className="m-0 font-sans text-sm">
          <TextLink href={block.href} target="_blank" rel="noopener noreferrer">
            {block.label}
            <span className="sr-only"> (opens in a new tab)</span>
          </TextLink>
          {block.note ? (
            <span className="text-navy-800"> — {block.note}</span>
          ) : null}
        </p>
      );
    default:
      return null;
  }
}

type ArticleBodyProps = {
  article: InsightArticle;
};

export function InsightArticleBody({ article }: ArticleBodyProps) {
  const blocks = article.body ?? [];

  return (
    <div className="space-y-8 max-w-2xl">
      <InsightsDisclaimer />

      <AuthorByline
        writtenById={article.writtenBy}
        reviewedByIds={article.reviewedBy}
        publishedAt={article.publishedAt}
        updatedAt={article.updatedAt}
      />

      {blocks.length === 0 ? (
        <Text muted>
          This article is marked published but has no body content yet. Add
          blocks in the content module before promoting it publicly.
        </Text>
      ) : (
        <div className="space-y-5">
          {blocks.map((block, index) => (
            <Block key={`${block.type}-${index}`} block={block} />
          ))}
        </div>
      )}
    </div>
  );
}
