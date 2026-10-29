import AuditLog from './AuditLog'
import Dashboard from './Dashboard'
import Levels from './Levels'
import Settings from './Settings'
import Users from './Users'

const Modules = {
    AuditLog: Object.assign(AuditLog, AuditLog),
    Dashboard: Object.assign(Dashboard, Dashboard),
    Levels: Object.assign(Levels, Levels),
    Settings: Object.assign(Settings, Settings),
    Users: Object.assign(Users, Users),
}

export default Modules