import config from './../../config';
let claimsConfigUrl = 'https://localhost:44344';
let productConfigUrl = 'https://localhost:44347';
let partnerconfigUrl = 'https://localhost:44315';
if (config.env == "dev") {
    claimsConfigUrl = 'https://localhost:44344';
    productConfigUrl = 'https://localhost:44347';
    partnerconfigUrl = 'https://localhost:44315';
}
else {
    claimsConfigUrl = 'https://inubeservicesclaims.azurewebsites.net';
    productConfigUrl = 'https://inubeservicesproductconfiguration.azurewebsites.net';
    partnerconfigUrl = 'https://inubeservicespartners.azurewebsites.net';
}
export const ClaimsConfig = {
    claimsConfigUrl,
    productConfigUrl,
    partnerconfigUrl
}

export default ClaimsConfig