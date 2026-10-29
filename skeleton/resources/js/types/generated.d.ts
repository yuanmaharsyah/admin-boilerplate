declare namespace Illuminate {
export type CursorPaginator<TKey, TValue> = {
data: TKey extends string ? Record<TKey, TValue> : TValue[],
links: {
url: string | null,
label: string,
active: boolean,
}[],
meta: {
path: string,
per_page: number,
next_cursor: string | null,
next_page_url: string | null,
prev_cursor: string | null,
prev_page_url: string | null,
},
};
export type CursorPaginatorInterface<TKey, TValue> = Illuminate.CursorPaginator<TKey, TValue>;
export type LengthAwarePaginator<TKey, TValue> = {
data: TKey extends string ? Record<TKey, TValue> : TValue[],
links: {
url: string | null,
label: string,
active: boolean,
}[],
meta: {
total: number,
current_page: number,
first_page_url: string,
from: number | null,
last_page: number,
last_page_url: string,
next_page_url: string | null,
path: string,
per_page: number,
prev_page_url: string | null,
to: number | null,
},
};
export type LengthAwarePaginatorInterface<TKey, TValue> = Illuminate.LengthAwarePaginator<TKey, TValue>;
}
declare namespace Modules {
namespace Customer {
namespace Data {
export type CustomerData = {
id: number,
name: string,
city: string | null,
no_hp: string | null,
updated_at: string,
};
export type CustomerListItemData = {
id: number,
name: string,
city: string | null,
no_hp: string | null,
};
}
}
namespace Invoice {
namespace Data {
export type InvoiceData = {
id: number,
number: string,
customer_id: number,
customer_name: string,
issued_on: string,
due_at: string | null,
status: Modules.Invoice.Enums.InvoiceStatus,
status_label: string,
payment_method: Modules.Invoice.Enums.PaymentMethod | null,
payment_method_label: string | null,
total: number,
tax_rate: number,
send_reminder: boolean,
npwp: string | null,
notes: string | null,
lock_version: number,
};
export type InvoiceFormOptionsData = {
statuses: Yuan.AdminCore.Data.OptionData[],
payment_methods: Yuan.AdminCore.Data.OptionData[],
};
export type InvoiceListItemData = {
id: number,
number: string,
customer_name: string,
issued_on: string,
status: Modules.Invoice.Enums.InvoiceStatus,
status_label: string,
total: number,
};
export type StoreInvoiceData = {
number: string,
customer_id: number,
issued_on: string,
due_at: string | null,
status: Modules.Invoice.Enums.InvoiceStatus,
payment_method: Modules.Invoice.Enums.PaymentMethod | null,
total: number,
tax_rate: number,
send_reminder: boolean,
npwp: string | null,
notes: string | null,
files: Record<string, File | File[] | null>,
};
export type UpdateInvoiceData = {
number: string,
customer_id: number,
issued_on: string,
due_at: string | null,
status: Modules.Invoice.Enums.InvoiceStatus,
payment_method: Modules.Invoice.Enums.PaymentMethod | null,
total: number,
tax_rate: number,
send_reminder: boolean,
npwp: string | null,
notes: string | null,
lock_version: number,
files: Record<string, File | File[] | null>,
};
}
namespace Enums {
export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'void';
export type PaymentMethod = 'transfer' | 'tunai' | 'giro' | 'qris';
}
}
namespace Sample {
namespace Data {
export type SampleData = {
id: number,
nama: string,
kode: string | null,
catatan: string | null,
jumlah: number,
tahun: number,
berat: number | null,
harga: number,
aktif: boolean,
mulai_tanggal: string,
selesai_pada: string | null,
status: Modules.Sample.Enums.SampleStatus,
status_label: string,
customer_id: number,
customer_name: string,
lock_version: number,
};
export type SampleFormOptionsData = {
status_options: Yuan.AdminCore.Data.OptionData[],
};
export type SampleListItemData = {
id: number,
nama: string,
kode: string | null,
jumlah: number,
tahun: number,
berat: number | null,
harga: number,
mulai_tanggal: string,
selesai_pada: string | null,
status: Modules.Sample.Enums.SampleStatus,
status_label: string,
customer_id: number,
customer_name: string,
};
export type StoreSampleData = {
nama: string,
kode: string | null,
catatan: string | null,
jumlah: number,
tahun: number,
berat: number | null,
harga: number,
aktif: boolean,
mulai_tanggal: string,
selesai_pada: string | null,
status: Modules.Sample.Enums.SampleStatus,
customer_id: number,
files: Record<string, File | File[] | null>,
};
export type UpdateSampleData = {
nama: string,
kode: string | null,
catatan: string | null,
jumlah: number,
tahun: number,
berat: number | null,
harga: number,
aktif: boolean,
mulai_tanggal: string,
selesai_pada: string | null,
status: Modules.Sample.Enums.SampleStatus,
customer_id: number,
lock_version: number,
files: Record<string, File | File[] | null>,
};
}
namespace Enums {
export type SampleStatus = 'draf' | 'aktif' | 'arsip';
}
}
namespace SampleAdmin {
namespace Data {
export type SampleAdminData = {
id: number,
judul: string,
catatan: string | null,
lock_version: number,
};
export type SampleAdminListItemData = {
id: number,
judul: string,
};
export type StoreSampleAdminData = {
judul: string,
catatan: string | null,
files: Record<string, File | File[] | null>,
};
export type UpdateSampleAdminData = {
judul: string,
catatan: string | null,
lock_version: number,
files: Record<string, File | File[] | null>,
};
}
}
namespace SampleReadonly {
namespace Data {
export type SampleReadonlyData = {
id: number,
nama: string,
jumlah: number,
status: Modules.SampleReadonly.Enums.SampleReadonlyStatus,
status_label: string,
tanggal: string | null,
};
export type SampleReadonlyListItemData = {
id: number,
nama: string,
jumlah: number,
status: Modules.SampleReadonly.Enums.SampleReadonlyStatus,
status_label: string,
tanggal: string | null,
};
}
namespace Enums {
export type SampleReadonlyStatus = 'baru' | 'lama';
}
}
}
declare namespace Spatie {
namespace LaravelData {
export type CursorPaginatedDataCollection<TKey, TValue> = Illuminate.CursorPaginator<TKey, TValue>;
export type PaginatedDataCollection<TKey, TValue> = Illuminate.LengthAwarePaginator<TKey, TValue>;
}
}
declare namespace Yuan {
namespace AdminCore {
namespace Audit {
export type AuditCategory = 'created' | 'updated' | 'deleted' | 'auth' | 'other';
export type AuditEvent = 'created' | 'updated' | 'deleted' | 'restored' | 'force_deleted' | 'exported' | 'attachment_uploaded' | 'attachment_downloaded' | 'attachment_deleted' | 'login' | 'logout' | 'login_failed' | 'login_locked' | 'password_changed' | 'password_reset' | 'level_changed' | 'user_activated' | 'user_deactivated' | 'permissions_updated' | 'settings_updated' | 'audit_pruned' | 'attachments_swept';
}
namespace Dashboard {
export type WidgetSize = 'sm' | 'md' | 'lg' | 'full';
export type WidgetType = 'stat' | 'stat_stack' | 'segment' | 'bar_chart' | 'table';
}
namespace Data {
export type AppData = {
name: string,
locale: string,
timezone: string,
panel_open: boolean,
site_access: Yuan.AdminCore.Data.SiteAccessPageData | null,
route: string | null,
logo: string | null,
logo_landscape: string | null,
favicon: string | null,
settings: Record<string, string | number | boolean | null>,
};
export type AttachmentData = {
id: number,
name: string,
mime: string,
size: number,
uploaded_by: string | null,
created_at: string,
url_href: string,
destroy_href: string | null,
};
export type AttachmentSlotData = {
key: string,
label: string,
multiple: boolean,
required: boolean,
accept: string[],
max_kb: number,
items: Yuan.AdminCore.Data.AttachmentData[],
};
export type AttachmentsData = {
slots: Yuan.AdminCore.Data.AttachmentSlotData[],
};
export type AuthData = {
user: Yuan.AdminCore.Data.UserData | null,
level: Yuan.AdminCore.Data.LevelData | null,
is_super_admin: boolean,
permissions: string[],
};
export type BreadcrumbData = {
label: string,
href: string | null,
};
export type BreadcrumbsData = {
items: Yuan.AdminCore.Data.BreadcrumbData[],
};
export type DataTableFilterData = {
key: string,
label: string,
options: Yuan.AdminCore.Data.OptionData[],
column: string | null,
};
export type DataTableStateData = {
search: string | null,
sort: string | null,
filter: Record<string, string>,
per_page: number,
per_page_options: number[],
sortable: string[],
filters: Yuan.AdminCore.Data.DataTableFilterData[],
searchable: boolean,
params: Record<string, string>,
};
export type DownloadItemData = {
id: number,
module_label: string,
file_name: string | null,
row_count: number,
status: Yuan.AdminCore.Exports.ExportStatus,
error: string | null,
created_at: string,
expires_at: string | null,
url_href: string | null,
};
export type DownloadListData = {
items: Yuan.AdminCore.Data.DownloadItemData[],
ttl_hours: number,
};
export type DownloadsData = {
ready_count: number,
};
export type ErrorPageData = {
status: number,
home_href: string,
signed_in: boolean,
};
export type FlashData = {
success?: string,
error?: string,
info?: string,
description?: string,
undo?: Yuan.AdminCore.Data.UndoData,
secret?: string,
};
export type LevelData = {
id: number,
name: string,
label: string,
};
export type LookupData = {
items: Yuan.AdminCore.Data.OptionData[],
};
export type MenuGroupData = {
key: string,
label: string,
icon: string,
items: Yuan.AdminCore.Data.MenuItemData[],
};
export type MenuItemData = {
slug: string,
label: string,
icon: string,
href: string,
create_href: string | null,
};
export type NoAccessPageData = {
logout_href: string,
};
export type OptionData = {
value: string,
label: string,
};
export type PaginatedData<T> = {
items: T[],
meta: Yuan.AdminCore.Data.PaginationMetaData,
links: Yuan.AdminCore.Data.PaginationLinksData,
};
export type PaginationLinksData = {
first: string,
last: string,
prev: string | null,
next: string | null,
};
export type PaginationMetaData = {
current_page: number,
per_page: number,
total: number,
last_page: number,
};
export type PermissionMatrixData = {
level: Yuan.AdminCore.Data.LevelData,
columns: string[],
rows: Yuan.AdminCore.Data.PermissionMatrixRowData[],
};
export type PermissionMatrixRowData = {
slug: string,
label: string,
group: string,
actions: string[],
granted: string[],
};
export type SelectionData = {
ids: number[],
};
export type SignedUrlData = {
url: string,
};
export type SiteAccessPageData = {
mode: 'maintenance' | 'coming_soon',
message: string | null,
};
export type TrashItemData = {
id: number,
label: string,
deleted_at: string,
};
export type TrashPageData = {
module_label: string,
index_href: string,
restore_href: string,
destroy_href: string,
};
export type UndoData = {
href: string,
ids: number[],
};
export type UserData = {
id: number,
name: string,
email: string,
};
namespace Account {
export type ProfileData = {
name: string,
email: string,
username: string | null,
level_label: string | null,
lock_version: number,
submit_href: string,
password_href: string,
};
export type UpdateProfileData = {
name: string,
email: string,
lock_version: number,
};
}
namespace Audit {
export type ActivityDetailData = {
item: Yuan.AdminCore.Data.Audit.ActivityItemData,
context: Yuan.AdminCore.Data.Audit.LabelValueData[],
diff: Yuan.AdminCore.Data.Audit.DiffRowData[],
notes: Yuan.AdminCore.Data.Audit.LabelValueData[],
subject_href: string | null,
batch_href: string | null,
};
export type ActivityHistoryData = {
items: Yuan.AdminCore.Data.Audit.ActivityItemData[],
total: number,
next_page: number | null,
};
export type ActivityItemData = {
id: number,
created_at: string,
causer_name: string | null,
causer_level: string | null,
attempted_username: string | null,
module_label: string,
event: string,
event_label: string,
tone: 'neutral' | 'success' | 'warning' | 'info' | 'destructive',
subject_label: string | null,
subject_type: string | null,
summary: string | null,
batch_uuid: string | null,
batch_size: number | null,
batch_href: string | null,
diff: Yuan.AdminCore.Data.Audit.DiffRowData[],
};
export type DiffRowData = {
field: string,
old: string | null,
new: string | null,
masked: boolean,
};
export type LabelValueData = {
label: string,
value: string,
mono: boolean,
};
}
namespace Auth {
export type ChangePasswordPageData = {
submit_href: string,
back_href: string,
logout_href: string,
required: boolean,
user_name: string,
level_label: string | null,
password_hint: string,
};
export type ForgotPasswordPageData = {
submit_href: string,
login_href: string,
status: string | null,
resend_after: number,
};
export type LoginPageData = {
submit_href: string,
forgot_href: string | null,
status: string | null,
};
export type ResetPasswordData = {
password: string,
};
export type ResetPasswordPageData = {
submit_href: string,
login_href: string,
forgot_href: string,
email: string,
token: string,
token_valid: boolean,
password_hint: string,
};
export type UpdatePasswordData = {
current_password: string,
password: string,
};
}
namespace Users {
export type ExtraFieldData = {
name: string,
label: string,
type: 'text' | 'number' | 'select',
required: boolean,
help: string | null,
options: Yuan.AdminCore.Data.OptionData[],
};
export type ExtraValueData = {
name: string,
label: string,
value: string | number | null,
display: string | null,
};
}
namespace Widgets {
export type BarChartWidgetData = {
bars: Yuan.AdminCore.Data.Widgets.WidgetFigureData[],
unit: string,
};
export type SegmentWidgetData = {
segments: Yuan.AdminCore.Data.Widgets.WidgetFigureData[],
};
export type StatStackWidgetData = {
items: Yuan.AdminCore.Data.Widgets.WidgetFigureData[],
};
export type StatWidgetData = {
value: number,
icon: string,
format: 'number' | 'currency',
badge: string | null,
};
export type TableWidgetData = {
columns: Yuan.AdminCore.Data.OptionData[],
rows: Record<string, string | null>[],
};
export type WidgetFigureData = {
key: string,
label: string,
value: number,
format: 'number' | 'currency',
href: string | null,
};
export type WidgetMetaData = {
key: string,
prop: string,
label: string,
type: 'stat' | 'stat_stack' | 'segment' | 'bar_chart' | 'table',
size: 'sm' | 'md' | 'lg' | 'full',
tall: boolean,
uses_range: boolean,
href: string | null,
empty: string,
};
}
}
namespace Exports {
export type ExportStatus = 'processing' | 'ready' | 'failed' | 'expired';
}
namespace Generator {
export type FieldType = 'string' | 'text' | 'integer' | 'year' | 'decimal' | 'currency' | 'boolean' | 'date' | 'datetime' | 'enum' | 'foreign' | 'file';
}
namespace Modules {
namespace AuditLog {
namespace Data {
export type AuditCountData = {
key: string,
label: string,
value: number,
};
export type AuditFilterData = {
range: string,
from: string | null,
to: string | null,
filter: Record<string, string>,
search: string | null,
event_id: number | null,
};
export type AuditFilterOptionsData = {
range: string,
from: string,
to: string,
user: string | null,
module: string | null,
users: Yuan.AdminCore.Data.OptionData[],
modules: Yuan.AdminCore.Data.OptionData[],
max_days: number,
};
export type AuditSummaryData = {
total: number,
active_users: number,
failed_logins: number,
downloads: number,
rows_downloaded: number,
permission_changes: number,
logins: number,
by_type: Yuan.AdminCore.Modules.AuditLog.Data.AuditCountData[],
by_day: Yuan.AdminCore.Modules.AuditLog.Data.AuditCountData[],
bucket: 'day' | 'week',
from: string,
to: string,
};
}
}
namespace Dashboard {
namespace Data {
export type DashboardPageData = {
widgets: Yuan.AdminCore.Data.Widgets.WidgetMetaData[],
range: '7d' | '30d' | '90d',
};
}
}
namespace Levels {
namespace Data {
export type LevelFormData = {
id: number,
label: string,
description: string | null,
lock_version: number,
};
export type LevelListData = {
items: Yuan.AdminCore.Modules.Levels.Data.LevelListItemData[],
};
export type LevelListItemData = {
id: number,
label: string,
description: string | null,
users_count: number,
is_protected: boolean,
};
export type SaveMatrixData = {
grants: Record<string, string[]>,
};
export type StoreLevelData = {
label: string,
description: string | null,
};
export type UpdateLevelData = {
label: string,
description: string | null,
lock_version: number,
};
}
}
namespace Settings {
namespace Data {
export type SettingFieldData = {
name: string,
type: 'string' | 'text' | 'integer' | 'boolean' | 'enum' | 'phone' | 'whatsapp' | 'postal_code' | 'social' | 'image',
label: string,
help: string | null,
value: string | number | boolean | null,
options: Yuan.AdminCore.Data.OptionData[],
accept: string[],
max_kb: number | null,
};
export type SettingsPageData = {
tabs: Yuan.AdminCore.Modules.Settings.Data.SettingsTabData[],
tab: string,
};
export type SettingsTabData = {
key: string,
label: string,
lock_version: number,
fields: Yuan.AdminCore.Modules.Settings.Data.SettingFieldData[],
};
export type UpdateSettingsData = {
lock_version: number,
values: Record<string, any>,
};
}
}
namespace Users {
namespace Data {
export type ResetPasswordData = {
mode: unknown,
password: string | null,
};
export type StoreUserData = {
name: string,
username: string | null,
email: string,
level_id: number,
is_active: boolean,
password: string,
extra: Record<string, string | number | null>,
};
export type UpdateUserData = {
name: string,
username: string | null,
email: string,
level_id: number,
is_active: boolean,
lock_version: number,
extra: Record<string, string | number | null>,
};
export type UserData = {
id: number,
name: string,
username: string | null,
email: string,
level_id: number | null,
level_label: string | null,
is_active: boolean,
must_change_password: boolean,
last_login_at: string | null,
created_at: string,
lock_version: number,
is_self: boolean,
extra: Yuan.AdminCore.Data.Users.ExtraValueData[],
};
export type UserFormOptionsData = {
levels: Yuan.AdminCore.Data.OptionData[],
extra_fields: Yuan.AdminCore.Data.Users.ExtraFieldData[],
password_hint: string,
};
export type UserListItemData = {
id: number,
name: string,
username: string | null,
email: string,
level_label: string | null,
is_active: boolean,
last_login_at: string | null,
};
}
}
}
namespace Settings {
export type SettingType = 'string' | 'text' | 'integer' | 'boolean' | 'enum' | 'phone' | 'whatsapp' | 'postal_code' | 'social' | 'image';
}
}
}
