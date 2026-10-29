import Modules from './Modules'
import Trash from './Trash'
import Attachments from './Attachments'
import Http from './Http'
import Account from './Account'
import Exports from './Exports'

const AdminCore = {
    Modules: Object.assign(Modules, Modules),
    Trash: Object.assign(Trash, Trash),
    Attachments: Object.assign(Attachments, Attachments),
    Http: Object.assign(Http, Http),
    Account: Object.assign(Account, Account),
    Exports: Object.assign(Exports, Exports),
}

export default AdminCore