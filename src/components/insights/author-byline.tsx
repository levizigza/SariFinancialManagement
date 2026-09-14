import Link from "next/link";
import { OptimizedImage } from "@/components/ui/optimized-image";
import {
  getAuthor,
  getPublicCredentials,
  type Author,
} from "@/content/insights";
import { cn } from "@/lib/cn";

type AuthorBylineProps = {
  writtenById: string;
  reviewedByIds?: readonly string[];
  publishedAt?: string;
  updatedAt?: string;
  className?: string;
};

function formatDate(iso?: string) {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function AuthorPortrait({ author }: { author: Author }) {
  if (!author.portraitSrc) return null;

  const isSvg = author.portraitSrc.toLowerCase().endsWith(".svg");

  return (
    <div
      className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-navy-800/15 bg-navy-900"
      aria-hidden="true"
    >
      <OptimizedImage
        src={author.portraitSrc}
        alt=""
        width={author.portraitWidth ?? 112}
        height={author.portraitHeight ?? 112}
        sizes="3.5rem"
        className="h-full w-full object-cover"
        unoptimized={isSvg}
      />
    </div>
  );
}

function PersonLine({
  label,
  author,
  showBio = false,
}: {
  label: string;
  author: Author;
  showBio?: boolean;
}) {
  const credentials = getPublicCredentials(author);

  return (
    <div className="flex gap-4 items-start">
      <AuthorPortrait author={author} />
      <div className="space-y-1 min-w-0">
        <p className="m-0 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-navy-800">
          {label}
        </p>
        <p className="m-0 font-sans text-sm text-navy-900">
          {author.profilePath ? (
            <Link
              href={author.profilePath}
              className="font-semibold no-underline hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-800 rounded-sm"
            >
              {author.name}
            </Link>
          ) : (
            <span className="font-semibold">{author.name}</span>
          )}
          <span className="text-navy-800">
            {" · "}
            {author.title}
          </span>
        </p>
        <p className="m-0 font-sans text-sm text-navy-800">{author.organization}</p>
        {showBio && author.bio && (
          <p className="m-0 mt-2 font-sans text-sm text-navy-800 text-pretty">
            {author.bio}
          </p>
        )}
        {credentials.length > 0 && (
          <ul className="m-0 mt-1 flex flex-wrap gap-2 list-none p-0">
            {credentials.map((credential) => (
              <li
                key={credential.label}
                className="rounded-sm border border-navy-800/15 px-2 py-0.5 font-sans text-xs text-navy-900"
              >
                {credential.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/**
 * Written-by / reviewed-by byline for Resources articles.
 * Portrait + name identify who stands behind the content.
 * Credentials render only when author.credentialsVerified and approvedForDisplay.
 */
export function AuthorByline({
  writtenById,
  reviewedByIds = [],
  publishedAt,
  updatedAt,
  className,
}: AuthorBylineProps) {
  const author = getAuthor(writtenById);
  const reviewers = reviewedByIds
    .map((id) => getAuthor(id))
    .filter((person): person is Author => Boolean(person));

  if (!author) return null;

  const published = formatDate(publishedAt);
  const updated = formatDate(updatedAt);

  return (
    <aside
      className={cn(
        "rounded-lg border border-navy-800/12 bg-surface-white p-5 sm:p-6 space-y-5",
        className,
      )}
      aria-label="Article authorship"
    >
      <PersonLine label="Written by" author={author} showBio />

      {reviewers.map((reviewer) => (
        <PersonLine
          key={reviewer.id}
          label="Reviewed by"
          author={reviewer}
        />
      ))}

      {(published || updated) && (
        <p className="m-0 font-sans text-xs text-navy-800 border-t border-navy-800/10 pt-4">
          {published && <span>Published {published}</span>}
          {published && updated && updated !== published && <span> · </span>}
          {updated && updated !== published && <span>Updated {updated}</span>}
        </p>
      )}
    </aside>
  );
}
