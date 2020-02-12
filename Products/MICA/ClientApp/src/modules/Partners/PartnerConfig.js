import config from '../../config';
let partnerconfigUrl = 'https://localhost:44315';
let productConfigUrl = 'https://localhost:44347';
let UserConfigUrl = 'https://localhost:44347';
if (config.env === "dev") {
    partnerconfigUrl = 'https://localhost:44315';
    productConfigUrl = 'https://localhost:44347';
}
else {
    partnerconfigUrl = 'https://inubeservicespartners.azurewebsites.net';
    productConfigUrl = 'https://inubeservicesproductconfiguration.azurewebsites.net';
    UserConfigUrl = 'https://inubeservicesusermanagement.azurewebsites.net';
}
export const partnerconfig = {
    productConfigUrl,
    partnerconfigUrl,
    UserConfigUrl

}

export default partnerconfig