import Link from "next/link";
import { Badge, Button, Card, Icon } from "@/components/ui";
import { ROUTES } from "@/lib/constants";
import type { CaseItem } from "@/lib/types/domain";

type CaseListItemProps = {
  caseItem: CaseItem;
  onClose?: () => void;
  closePending?: boolean;
};

export function CaseListItem({ caseItem, onClose, closePending }: CaseListItemProps) {
  return (
    <div className={caseItem.closed ? "opacity-70" : undefined}>
      <Card
        variant="glass"
        accent={`${caseItem.accent} group-hover:bg-secondary`}
        padding="lg"
        className="hover:border-secondary transition-colors group"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Link
            href={ROUTES.case(caseItem.id)}
            className="flex-1 min-w-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40"
            aria-label={`View case: ${caseItem.title}`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-3 mb-1">
                <Badge status={caseItem.status}>{caseItem.status}</Badge>
                <span className="text-label-sm text-outline">ID: {caseItem.caseId}</span>
              </div>
              <h3 className="text-headline-sm text-on-surface">{caseItem.title}</h3>
              <div className="flex flex-wrap items-center gap-4 text-on-surface-variant">
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
          </Link>

          <div className="flex flex-row md:flex-col items-center md:items-end gap-2 shrink-0">
            <p className="text-headline-sm text-primary">{caseItem.rate}</p>
            <div className="flex items-center gap-2">
              {onClose && (
                <Button
                  variant="outline"
                  size="sm"
                  disabled={closePending}
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                  }}
                >
                  Close case
                </Button>
              )}
              <Link
                href={ROUTES.case(caseItem.id)}
                className="p-2 text-secondary hover:bg-surface-container-low rounded-lg"
                aria-label="View case"
              >
                <Icon name="chevron_right" />
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
