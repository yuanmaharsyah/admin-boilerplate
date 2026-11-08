import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \Modules\Invoice\Http\Controllers\InvoiceReportController::monthly
* @see modules/Invoice/Http/Controllers/InvoiceReportController.php:25
* @route '/admin/invoices/reports/monthly'
*/
export const monthly = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: monthly.url(options),
    method: 'get',
})

monthly.definition = {
    methods: ["get","head"],
    url: '/admin/invoices/reports/monthly',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceReportController::monthly
* @see modules/Invoice/Http/Controllers/InvoiceReportController.php:25
* @route '/admin/invoices/reports/monthly'
*/
monthly.url = (options?: RouteQueryOptions) => {
    return monthly.definition.url + queryParams(options)
}

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceReportController::monthly
* @see modules/Invoice/Http/Controllers/InvoiceReportController.php:25
* @route '/admin/invoices/reports/monthly'
*/
monthly.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: monthly.url(options),
    method: 'get',
})

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceReportController::monthly
* @see modules/Invoice/Http/Controllers/InvoiceReportController.php:25
* @route '/admin/invoices/reports/monthly'
*/
monthly.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: monthly.url(options),
    method: 'head',
})

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceReportController::monthly
* @see modules/Invoice/Http/Controllers/InvoiceReportController.php:25
* @route '/admin/invoices/reports/monthly'
*/
const monthlyForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: monthly.url(options),
    method: 'get',
})

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceReportController::monthly
* @see modules/Invoice/Http/Controllers/InvoiceReportController.php:25
* @route '/admin/invoices/reports/monthly'
*/
monthlyForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: monthly.url(options),
    method: 'get',
})

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceReportController::monthly
* @see modules/Invoice/Http/Controllers/InvoiceReportController.php:25
* @route '/admin/invoices/reports/monthly'
*/
monthlyForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: monthly.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

monthly.form = monthlyForm

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceReportController::yearly
* @see modules/Invoice/Http/Controllers/InvoiceReportController.php:30
* @route '/admin/invoices/reports/yearly'
*/
export const yearly = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: yearly.url(options),
    method: 'get',
})

yearly.definition = {
    methods: ["get","head"],
    url: '/admin/invoices/reports/yearly',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceReportController::yearly
* @see modules/Invoice/Http/Controllers/InvoiceReportController.php:30
* @route '/admin/invoices/reports/yearly'
*/
yearly.url = (options?: RouteQueryOptions) => {
    return yearly.definition.url + queryParams(options)
}

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceReportController::yearly
* @see modules/Invoice/Http/Controllers/InvoiceReportController.php:30
* @route '/admin/invoices/reports/yearly'
*/
yearly.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: yearly.url(options),
    method: 'get',
})

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceReportController::yearly
* @see modules/Invoice/Http/Controllers/InvoiceReportController.php:30
* @route '/admin/invoices/reports/yearly'
*/
yearly.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: yearly.url(options),
    method: 'head',
})

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceReportController::yearly
* @see modules/Invoice/Http/Controllers/InvoiceReportController.php:30
* @route '/admin/invoices/reports/yearly'
*/
const yearlyForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: yearly.url(options),
    method: 'get',
})

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceReportController::yearly
* @see modules/Invoice/Http/Controllers/InvoiceReportController.php:30
* @route '/admin/invoices/reports/yearly'
*/
yearlyForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: yearly.url(options),
    method: 'get',
})

/**
* @see \Modules\Invoice\Http\Controllers\InvoiceReportController::yearly
* @see modules/Invoice/Http/Controllers/InvoiceReportController.php:30
* @route '/admin/invoices/reports/yearly'
*/
yearlyForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: yearly.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

yearly.form = yearlyForm

const reports = {
    monthly: Object.assign(monthly, monthly),
    yearly: Object.assign(yearly, yearly),
}

export default reports