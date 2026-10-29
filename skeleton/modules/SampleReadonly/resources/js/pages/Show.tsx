import { ActivityHistory } from '@admin-core/components/admin/ActivityHistory';
import { DetailGrid } from '@admin-core/components/admin/DetailGrid';
import { PageHeader } from '@admin-core/components/admin/PageHeader';
import { StatusBadge } from '@admin-core/components/admin/StatusBadge';
import { Tabs } from '@admin-core/components/admin/Tabs';
import { usePermission } from '@admin-core/hooks/usePermission';
import { formatLocalDate, formatNumber } from '@admin-core/lib/format';
import { useT } from '@admin-core/lib/i18n';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { index } from '@/routes/sample-readonly';

type Props = {
    sampleReadonly: Modules.SampleReadonly.Data.SampleReadonlyData;

    /** The Riwayat tab's optional prop; null without `audit-log.view`. */
    history?: Yuan.AdminCore.Data.Audit.ActivityHistoryData | null;
};

/** One contoh baca saja (generated from the approved pattern-show). */
export default function Show({ sampleReadonly, history }: Props) {
    const t = useT();
    const { can, isSuperAdmin } = usePermission();
    const [tab, setTab] = useState('detail');

    return (
        <>
            <Head title={sampleReadonly.nama} />
            <div className="flex flex-col gap-5">
                <PageHeader title={sampleReadonly.nama} backHref={index()} />
                <Tabs
                    label={t('detail.tabs')}
                    value={tab}
                    onChange={setTab}
                    tabs={[
                        {
                            key: 'detail',
                            label: t('detail.title'),
                            content: (
                                <section className="rounded bg-card p-6 text-card-foreground">
                                    <DetailGrid
                                        items={[
                                            {
                                                label: t(
                                                    'sample-readonly.nama',
                                                ),
                                                value: sampleReadonly.nama,
                                            },
                                            {
                                                label: t(
                                                    'sample-readonly.jumlah',
                                                ),
                                                value: formatNumber(
                                                    sampleReadonly.jumlah,
                                                ),
                                            },
                                            {
                                                label: t(
                                                    'sample-readonly.status',
                                                ),
                                                value: (
                                                    <StatusBadge
                                                        label={
                                                            sampleReadonly.status_label
                                                        }
                                                    />
                                                ),
                                            },
                                            {
                                                label: t(
                                                    'sample-readonly.tanggal',
                                                ),
                                                value:
                                                    sampleReadonly.tanggal !==
                                                        null &&
                                                    formatLocalDate(
                                                        sampleReadonly.tanggal,
                                                    ),
                                            },
                                        ]}
                                    />
                                </section>
                            ),
                        },

                        ...(can('audit-log.view') || isSuperAdmin
                            ? [
                                  {
                                      key: 'history',
                                      label: t('history.tab'),
                                      content: (
                                          <section className="rounded bg-card px-6 py-4 text-card-foreground">
                                              <ActivityHistory
                                                  history={history}
                                              />
                                          </section>
                                      ),
                                  },
                              ]
                            : []),
                    ]}
                />
            </div>
        </>
    );
}
