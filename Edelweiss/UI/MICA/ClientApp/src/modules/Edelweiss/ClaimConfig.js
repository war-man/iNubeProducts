import config from './../../config';
let claimConfigUrl = 'https://localhost:44344';
let productConfigUrl = 'https://localhost:44347';
let partnerconfigUrl = 'https://localhost:44315';
let policyconfigUrl = 'https://localhost:44351';
if (config.env == "dev") {
    claimConfigUrl = 'https://localhost:44344';
    productConfigUrl = 'https://localhost:44347';
    partnerconfigUrl = 'https://localhost:44315';
    policyconfigUrl = 'https://localhost:44351';
}
else {
    claimConfigUrl = 'https://inubeservicesclaims.azurewebsites.net';
    productConfigUrl = 'https://inubeservicesproductconfiguration.azurewebsites.net';
    partnerconfigUrl = 'https://inubeservicespartners.azurewebsites.net';
    policyconfigUrl = 'https://inubeservicespolicy.azurewebsites.net';
}
export const ClaimConfig = {
    claimConfigUrl,
    productConfigUrl,
    partnerconfigUrl,
    policyconfigUrl
}

export default ClaimConfig