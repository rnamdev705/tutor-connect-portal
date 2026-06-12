import Link from "next/link";
import { Badge, Card, Icon } from "@/components/ui";
import { ROUTES } from "@/lib/constants";
import type { CaseItem } from "@/lib/types/domain";

type CaseListItemProps = {
  caseItem: CaseItem;
};

export function CaseListItem({ caseItem }: CaseListItemProps) {
  return (
    <div className={caseItem.closed ? "opacity-70" : undefined}>
      <Link
        href={ROUTES.case(caseItem.id)}
        className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40"
        aria-label={`View case: ${caseItem.title}`}
      >
        <Card
          variant="glass"
          accent={`${caseItem.accent} group-hover:bg-secondary`}
          padding="lg"
          className="hover:border-secondary transition-colors group"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-3 mb-1">
                <Badge status={caseItem.status}>{caseItem.status}</Badge>
                <span className="text-label-sm text-outline">ID: {caseItem.caseId}</span>
              </div>
              <h3 className="text-headline-sm text-on-surface">{caseItem.title}</h3>
              <div className="flex flex-wrap items-center gap-6 text-on-surface-variant">
                <div className="flex items-center gap-1">
                  <Icon name="school" size={18} />
                  <span className="text-body-sm">{caseItem.level}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="book" size={18} />
                  <span className="text-body-sm">{caseItem.subject}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="location_on" size={18} />
                  <span className="text-body-sm">{caseItem.location}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-1">
              <p className="text-headline-sm text-primary">{caseItem.rate}</p>
              {caseItem.closed ? (
                <span className="p-3 text-outline rounded-full" aria-hidden>
                  <Icon name="lock" />
                </span>
              ) : (
                <Icon name="chevron_right" className="text-secondary md:hidden" />
              )}
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
}
