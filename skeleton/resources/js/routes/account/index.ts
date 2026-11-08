import profile from './profile'
import avatar from './avatar'
import sessions from './sessions'
import password from './password'
import downloads from './downloads'

const account = {
    profile: Object.assign(profile, profile),
    avatar: Object.assign(avatar, avatar),
    sessions: Object.assign(sessions, sessions),
    password: Object.assign(password, password),
    downloads: Object.assign(downloads, downloads),
}

export default account