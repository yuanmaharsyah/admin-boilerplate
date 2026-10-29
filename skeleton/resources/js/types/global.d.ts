declare module 'react' {
    interface InputHTMLAttributes<T> {
        passwordrules?: string;
    }
}

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            auth: Yuan.AdminCore.Data.AuthData;
            menu: Yuan.AdminCore.Data.MenuGroupData[];
            app: Yuan.AdminCore.Data.AppData;
            downloads: Yuan.AdminCore.Data.DownloadsData;
            // Page prop, present on pages that pass it (frontend-behavior §3).
            breadcrumbs?: Yuan.AdminCore.Data.BreadcrumbsData;
        };
        flashDataType: Yuan.AdminCore.Data.FlashData;
    }
}

export {};
