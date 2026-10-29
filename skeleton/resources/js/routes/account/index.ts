import profile from './profile'
import password from './password'
import downloads from './downloads'

const account = {
    profile: Object.assign(profile, profile),
    password: Object.assign(password, password),
    downloads: Object.assign(downloads, downloads),
}

export default account