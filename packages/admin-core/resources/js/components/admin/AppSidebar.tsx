import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { useT } from '../../lib/i18n';
import type { Href } from '../../lib/shell';
import { initials } from '../../lib/shell';
import { cn } from '../../lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { AppMark } from './AppMark';
import { Icon } from './Icon';

type Props = {
    menu: Yuan.AdminCore.Data.MenuGroupData[];
    appName: string;
    logo: string | null;
    activeSlug?: string;
    auth: Yuan.AdminCore.Data.AuthData;
    profile: Href;
    /** Icon-only strip (desktop, `Ctrl+B`); never in the mobile sheet. */
    collapsed?: boolean;
    /** Extra control next to the app name (the sheet's close button). */
    action?: ReactNode;
    /** 44px touch targets in the mobile sheet, 36px on desktop. */
    touch?: boolean;
};

/** Shows the label in a tooltip only while the sidebar is an icon strip. */
function WithTooltip({
    label,
    show,
    children,
}: {
    label: string;
    show: boolean;
    children: ReactNode;
}) {
    if (!show) {
        return children;
    }

    return (
        <Tooltip>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            <TooltipContent side="right">{label}</TooltipContent>
        </Tooltip>
    );
}

/**
 * The sidebar (ui-design §2, frontend-behavior §3): app mark and name, every
 * group as a labelled section with its items, the current user at the bottom.
 * Collapsed, it is a 56px icon strip with tooltips.
 */
export function AppSidebar({
    menu,
    appName,
    logo,
    activeSlug,
    auth,
    profile,
    collapsed = false,
    action,
    touch = false,
}: Props) {
    const t = useT();

    return (
        <nav
            aria-label={t('shell.navigation')}
            data-collapsed={collapsed || undefined}
            className={cn(
                'flex h-full min-w-0 flex-col bg-sidebar text-sidebar-foreground transition-[width] duration-200 ease-linear',
                collapsed ? 'w-sidebar-icon' : 'w-sidebar',
            )}
        >
            <div
                className={cn(
                    'flex h-topbar shrink-0 items-center gap-2.5',
                    collapsed ? 'justify-center' : 'px-4',
                )}
            >
                <AppMark name={appName} logo={logo} />
                {!collapsed && (
                    <span className="min-w-0 flex-1 truncate text-brand">
                        {appName}
                    </span>
                )}
                {action}
            </div>

            <div
                className={cn(
                    'flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto pb-3',
                    collapsed ? 'items-center px-2' : 'px-2',
                )}
            >
                {menu.map((group) => (
                    <div
                        key={group.key}
                        role="group"
                        aria-label={group.label}
                        className="flex w-full flex-col gap-0.5 pt-4 first:pt-2"
                    >
                        {collapsed ? (
                            <div
                                aria-hidden="true"
                                className="mx-auto mb-1.5 h-px w-6 bg-sidebar-border"
                            />
                        ) : (
                            <div className="px-3 pb-1.5 text-label text-muted-foreground uppercase">
                                {group.label}
                            </div>
                        )}
                        {group.items.map((item) => {
                            const active = item.slug === activeSlug;

                            return (
                                <WithTooltip
                                    key={item.slug}
                                    label={item.label}
                                    show={collapsed}
                                >
                                    <Link
                                        href={item.href}
                                        aria-label={
                                            collapsed ? item.label : undefined
                                        }
                                        aria-current={
                                            active ? 'page' : undefined
                                        }
                                        className={cn(
                                            'flex shrink-0 items-center gap-3 rounded-md text-body font-medium transition-colors duration-200',
                                            touch ? 'h-row' : 'h-control',
                                            collapsed
                                                ? 'mx-auto size-control justify-center'
                                                : 'px-3',
                                            active
                                                ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                                                : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                                        )}
                                    >
                                        <Icon
                                            name={item.icon}
                                            aria-hidden="true"
                                            className="size-4 shrink-0"
                                        />
                                        {!collapsed && (
                                            <span className="truncate">
                                                {item.label}
                                            </span>
                                        )}
                                    </Link>
                                </WithTooltip>
                            );
                        })}
                    </div>
                ))}
            </div>

            {auth.user && (
                <div className="shrink-0 border-t border-sidebar-border p-2">
                    <WithTooltip label={auth.user.name} show={collapsed}>
                        <Link
                            href={profile}
                            aria-label={collapsed ? auth.user.name : undefined}
                            className={cn(
                                'flex items-center gap-2.5 rounded-md p-2 transition-colors duration-200 hover:bg-sidebar-accent',
                                collapsed && 'justify-center',
                            )}
                        >
                            <span
                                aria-hidden="true"
                                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sidebar-accent text-xs font-semibold"
                            >
                                {initials(auth.user.name)}
                            </span>
                            {!collapsed && (
                                <span className="flex min-w-0 flex-col">
                                    <span className="truncate text-table font-medium">
                                        {auth.user.name}
                                    </span>
                                    {auth.level && (
                                        <span className="truncate text-xs text-muted-foreground">
                                            {auth.level.label}
                                        </span>
                                    )}
                                </span>
                            )}
                        </Link>
                    </WithTooltip>
                </div>
            )}
        </nav>
    );
}
