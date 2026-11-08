import Customer from './Customer'
import Invoice from './Invoice'
import Sample from './Sample'
import SampleAdmin from './SampleAdmin'
import SampleReadonly from './SampleReadonly'
import Task from './Task'
import Ticket from './Ticket'

const Modules = {
    Customer: Object.assign(Customer, Customer),
    Invoice: Object.assign(Invoice, Invoice),
    Sample: Object.assign(Sample, Sample),
    SampleAdmin: Object.assign(SampleAdmin, SampleAdmin),
    SampleReadonly: Object.assign(SampleReadonly, SampleReadonly),
    Task: Object.assign(Task, Task),
    Ticket: Object.assign(Ticket, Ticket),
}

export default Modules