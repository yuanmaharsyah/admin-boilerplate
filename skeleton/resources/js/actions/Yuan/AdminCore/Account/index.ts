import ProfileController from './ProfileController'
import PasswordController from './PasswordController'

const Account = {
    ProfileController: Object.assign(ProfileController, ProfileController),
    PasswordController: Object.assign(PasswordController, PasswordController),
}

export default Account