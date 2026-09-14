export { authors, getAuthor, getPublicCredentials } from "@/content/insights/authors";
export type { Author, AuthorCredential } from "@/content/insights/authors";

export {
  insightCategories,
  getInsightCategory,
} from "@/content/insights/categories";
export type {
  InsightCategory,
  InsightCategorySlug,
} from "@/content/insights/categories";

export {
  insightArticles,
  getPublishedArticles,
  getArticlesByCategory,
  getArticle,
  canPublishPublicly,
  getPlannedTopics,
} from "@/content/insights/articles";
export type {
  InsightArticle,
  ArticleStatus,
  ReviewDomain,
  InsightBlock,
} from "@/content/insights/articles";

export const insightsDisclaimer =
  "Resources and insights on this site are for general education only. They are not legal, tax, accounting, payroll-compliance, or investment advice. Rules change—confirm details with a qualified professional and official sources such as the CRA or Government of Alberta before acting.";
