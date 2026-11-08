import { DateField } from '@admin-core/components/admin/DateField';
import { FormErrorSummary } from '@admin-core/components/admin/FormErrorSummary';
import { NumberField } from '@admin-core/components/admin/NumberField';
import { SelectField } from '@admin-core/components/admin/SelectField';
import { TextField } from '@admin-core/components/admin/TextField';
import { TextareaField } from '@admin-core/components/admin/TextareaField';
import { useT } from '@admin-core/lib/i18n';
import type { InertiaFormProps } from '@inertiajs/react';
import type { ReactNode } from 'react';

/** The form's state: the input Data's fields (without `lock_version`), each empty until filled in. */
export type TaskFormValues = {
    [Key in Exclude<keyof Modules.Task.Data.StoreTaskData, 'lock_version'>]:
        Modules.Task.Data.StoreTaskData[Key] | null;
};

type Props = {
    /** The page's `useForm`; the edit form carries `lock_version` too, which no field touches. */
    form: Pick<InertiaFormProps<TaskFormValues>, 'data' | 'errors' | 'setData'>;
    /** The record on edit (labels of its relations). */
    record?: Modules.Task.Data.TaskData;
    options: Modules.Task.Data.TaskFormOptionsData;
};

/** Fields of the kanban create and edit pages. */
export function TaskForm({ form, options }: Props) {
    const t = useT();
    const { data, errors } = form;

    return (
        <div className="flex flex-col gap-5">
            <FormErrorSummary errors={errors} />
            <Section title={t('kanban.section_main')}>
                <TextField
                    name="title"
                    label={t('kanban.title')}
                    required
                    error={errors.title}
                    value={data.title ?? ''}
                    onChange={(value) => form.setData('title', value)}
                />
                <div className="md:col-span-2">
                    <TextareaField
                        name="description"
                        label={t('kanban.description')}
                        error={errors.description}
                        value={data.description ?? ''}
                        onChange={(value) =>
                            form.setData(
                                'description',
                                value === '' ? null : value,
                            )
                        }
                    />
                </div>
                <SelectField
                    name="status"
                    label={t('kanban.status')}
                    required
                    error={errors.status}
                    options={options.status_options}
                    placeholder=""
                    value={data.status ?? ''}
                    onChange={(value) =>
                        form.setData(
                            'status',
                            value === ''
                                ? null
                                : (value as Modules.Task.Enums.TaskStatus),
                        )
                    }
                />
                <SelectField
                    name="priority"
                    label={t('kanban.priority')}
                    required
                    error={errors.priority}
                    options={options.priority_options}
                    placeholder=""
                    value={data.priority ?? ''}
                    onChange={(value) =>
                        form.setData(
                            'priority',
                            value === ''
                                ? null
                                : (value as Modules.Task.Enums.TaskPriority),
                        )
                    }
                />
                <TextField
                    name="assignee"
                    label={t('kanban.assignee')}
                    error={errors.assignee}
                    value={data.assignee ?? ''}
                    onChange={(value) =>
                        form.setData('assignee', value === '' ? null : value)
                    }
                />
                <DateField
                    name="due_on"
                    label={t('kanban.due_on')}
                    error={errors.due_on}
                    value={data.due_on}
                    onChange={(value) => form.setData('due_on', value)}
                />
                <NumberField
                    name="position"
                    label={t('kanban.position')}
                    required
                    error={errors.position}
                    maximumFractionDigits={0}
                    value={data.position}
                    onChange={(value) => form.setData('position', value)}
                />
            </Section>
        </div>
    );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
    return (
        <section className="flex flex-col gap-4 rounded bg-card p-6 text-card-foreground">
            <h2 className="m-0 text-section">{title}</h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
                {children}
            </div>
        </section>
    );
}
