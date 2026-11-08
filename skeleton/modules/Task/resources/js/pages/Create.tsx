import { FormFooter } from '@admin-core/components/admin/FormFooter';
import { PageHeader } from '@admin-core/components/admin/PageHeader';
import { UnsavedChangesGuard } from '@admin-core/components/admin/UnsavedChangesGuard';
import { useAdminForm } from '@admin-core/hooks/useAdminForm';
import { useT } from '@admin-core/lib/i18n';
import { Head } from '@inertiajs/react';
import { index, store } from '@/routes/kanban';
import { TaskForm } from '../components/TaskForm';
import type { TaskFormValues } from '../components/TaskForm';

type Props = {
    options: Modules.Task.Data.TaskFormOptionsData;
};

/** A new kanban (generated from the approved pattern-form). */
export default function Create({ options }: Props) {
    const t = useT();
    const { form, submit } = useAdminForm<TaskFormValues>({
        title: '',
        description: null,
        status: null,
        priority: null,
        assignee: null,
        due_on: null,
        position: null,
    });

    return (
        <>
            <Head title={t('kanban.create_title')} />
            <form
                noValidate
                className="flex flex-col gap-5"
                onSubmit={(event) => {
                    event.preventDefault();
                    submit(store());
                }}
            >
                <PageHeader
                    title={t('kanban.create_title')}
                    backHref={index()}
                />
                <TaskForm form={form} options={options} />
                <FormFooter
                    cancelHref={index()}
                    processing={form.processing}
                    dirty={form.isDirty}
                />
            </form>
            <UnsavedChangesGuard when={form.isDirty && !form.processing} />
        </>
    );
}
