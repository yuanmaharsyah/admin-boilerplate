import { KanbanBoard } from '@admin-core/components/admin/KanbanBoard';
import { PageHeader } from '@admin-core/components/admin/PageHeader';
import { StatusBadge } from '@admin-core/components/admin/StatusBadge';
import type { StatusTone } from '@admin-core/components/admin/StatusBadge';
import { Button } from '@admin-core/components/ui/button';
import { usePermission } from '@admin-core/hooks/usePermission';
import { formatLocalDate } from '@admin-core/lib/format';
import { useT } from '@admin-core/lib/i18n';
import { initials } from '@admin-core/lib/shell';
import { Head, Link, router } from '@inertiajs/react';
import { CalendarDays, Plus } from 'lucide-react';
import { create } from '@/routes/kanban';

type Card = Modules.Task.Data.TaskCardData;

const TONES: Record<Card['priority'], StatusTone> = {
    rendah: 'neutral',
    sedang: 'info',
    tinggi: 'destructive',
};

/** Kanban → Papan (demo, restyle 03): the KanbanBoard over the tasks the user may see. */
export default function Board({
    board,
}: {
    board: Modules.Task.Data.TaskBoardData;
}) {
    const t = useT();
    const { can } = usePermission();
    const cards = Object.fromEntries(
        board.cards.map((card) => [card.id, card]),
    );
    const moveHref = board.move_href;

    return (
        <>
            <Head title={t('kanban.board')} />
            <div className="flex flex-col gap-6">
                <PageHeader
                    title={t('kanban.board')}
                    description={t('kanban.board_text')}
                    actions={
                        can('kanban.create') && (
                            <Button asChild>
                                <Link href={create()}>
                                    <Plus />
                                    {t('kanban.add')}
                                </Link>
                            </Button>
                        )
                    }
                />
                <KanbanBoard
                    label={t('kanban.board')}
                    columns={board.columns}
                    items={cards}
                    cardLabel={(card) => card.title}
                    onMove={
                        moveHref
                            ? (columns, done) =>
                                  router.patch(
                                      moveHref,
                                      { columns },
                                      {
                                          preserveScroll: true,
                                          onSuccess: () => done(true),
                                          onError: () => done(false),
                                      },
                                  )
                            : undefined
                    }
                    renderCard={(card) => (
                        <div className="flex flex-col gap-3">
                            <div className="flex items-start gap-2">
                                <span className="flex-1 font-medium">
                                    {card.title}
                                </span>
                                <StatusBadge
                                    tone={TONES[card.priority]}
                                    label={card.priority_label}
                                />
                            </div>
                            {card.description && (
                                <p className="m-0 line-clamp-2 text-table text-muted-foreground">
                                    {card.description}
                                </p>
                            )}
                            <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                                <span className="inline-flex items-center gap-1.5">
                                    {card.due_on && (
                                        <>
                                            <CalendarDays
                                                aria-hidden="true"
                                                className="size-3.5"
                                            />
                                            {formatLocalDate(card.due_on)}
                                        </>
                                    )}
                                </span>
                                {card.assignee && (
                                    <span
                                        title={card.assignee}
                                        className="flex size-7 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground"
                                    >
                                        {initials(card.assignee)}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                />
            </div>
        </>
    );
}
