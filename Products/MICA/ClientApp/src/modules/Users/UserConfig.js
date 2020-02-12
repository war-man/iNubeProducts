import config from './../../config';
let UserConfigUrl = 'https://localhost:44367';
let PartnerConfigUrl = 'https://localhost:44315';
if (config.env === "dev") {
    UserConfigUrl = 'https://localhost:44367';
    PartnerConfigUrl = 'https://localhost:44315';
}
else {
    UserConfigUrl = 'https://inubeservicesusermanagement.azurewebsites.net';
    PartnerConfigUrl = 'https://inubeservicespartners.azurewebsites.net';
}
export const UserConfig = {
    UserConfigUrl,
    PartnerConfigUrl
}

export default UserConfig