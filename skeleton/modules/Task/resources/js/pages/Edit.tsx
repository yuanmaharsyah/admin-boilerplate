import { FormFooter } from '@admin-core/components/admin/FormFooter';
import { PageHeader } from '@admin-core/components/admin/PageHeader';
import { StaleUpdateDialog } from '@admin-core/components/admin/StaleUpdateDialog';
import { UnsavedChangesGuard } from '@admin-core/components/admin/UnsavedChangesGuard';
import { useAdminForm } from '@admin-core/hooks/useAdminForm';
import { useT } from '@admin-core/lib/i18n';
import { Head } from '@inertiajs/react';
import { show, update } from '@/routes/kanban';
import { TaskForm } from '../components/TaskForm';
import type { TaskFormValues } from '../components/TaskForm';

type Props = {
    task: Modules.Task.Data.TaskData;
    options: Modules.Task.Data.TaskFormOptionsData;
};

/** Editing a kanban (generated from the approved pattern-form). */
export default function Edit({ task, options }: Props) {
    const t = useT();
    const { form, submit, stale, dirtyData, reload } = useAdminForm<
        TaskFormValues & { lock_version: number }
    >({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        assignee: task.assignee,
        due_on: task.due_on,
        position: task.position,
        lock_version: task.lock_version,
    });
    const title = t('kanban.edit_title', { name: task.title });

    return (
        <>
            <Head title={title} />
            <form
                noValidate
                className="flex flex-col gap-5"
                onSubmit={(event) => {
                    event.preventDefault();
                    // POST + _method=PUT, so picked files travel with the form.
                    submit({
                        url: update.form(task.id).action,
                        method: 'post',
                    });
                }}
            >
                <PageHeader title={title} backHref={show(task.id)} />
                <TaskForm form={form} record={task} options={options} />
                <FormFooter
                    cancelHref={show(task.id)}
                    processing={form.processing}
                    dirty={form.isDirty}
                />
            </form>
            <UnsavedChangesGuard
                when={form.isDirty && !form.processing && !stale}
            />
            <StaleUpdateDialog
                open={stale}
                dirtyData={dirtyData}
                onReload={reload}
            />
        </>
    );
}
