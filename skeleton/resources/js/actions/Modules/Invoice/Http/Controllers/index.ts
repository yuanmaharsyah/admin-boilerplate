import InvoiceController from './InvoiceController'
import InvoiceReportController from './InvoiceReportController'

const Controllers = {
    InvoiceController: Object.assign(InvoiceController, InvoiceController),
    InvoiceReportController: Object.assign(InvoiceReportController, InvoiceReportController),
}

export default Controllers