import config from './../../../../config';
let policyConfigUrl = 'https://localhost:44351';
let productConfigUrl = 'https://localhost:44347';
let partnerconfigUrl = 'https://localhost:44315';
if (config.env == "dev") {
    policyConfigUrl = 'https://localhost:44351';
    productConfigUrl = 'https://localhost:44347';
    partnerconfigUrl = 'https://localhost:44315';
}
else {
    policyConfigUrl = 'https://inubeservicespolicy.azurewebsites.net';
    productConfigUrl = 'https://inubeservicesproductconfiguration.azurewebsites.net';
    partnerconfigUrl = 'https://inubeservicespartners.azurewebsites.net';
    //partnerconfigUrl = 'https://localhost:44315';
}
export const paymentConfig = {
    policyConfigUrl,
    productConfigUrl,
    partnerconfigUrl
}

export default paymentConfig