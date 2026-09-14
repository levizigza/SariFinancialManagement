import { Text } from "@/components/ui/typography";
import { insightsDisclaimer } from "@/content/insights";
import { cn } from "@/lib/cn";

type InsightsDisclaimerProps = {
  className?: string;
};

export function InsightsDisclaimer({ className }: InsightsDisclaimerProps) {
  return (
    <aside
      role="note"
      className={cn(
        "rounded-md border border-navy-800/12 bg-surface-ivory px-4 py-3",
        className,
      )}
    >
      <Text size="sm" muted className="!max-w-none">
        {insightsDisclaimer}
      </Text>
    </aside>
  );
}
