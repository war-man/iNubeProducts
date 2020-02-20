import config from './../../config';
let RDLCConfigUrl = 'https://localhost:49776';
let productConfigUrl = 'https://localhost:44347';
let partnerconfigUrl = 'https://localhost:44315';
let policyconfigUrl = 'https://localhost:44351';
if (config.env == "dev") {
    RDLCConfigUrl = 'https://localhost49776';
    productConfigUrl = 'https://localhost:44347';
    partnerconfigUrl = 'https://localhost:44315';
    policyconfigUrl = 'https://localhost:44351';
}
else {
    RDLCConfigUrl = 'https://inubeservicesnotification.azurewebsites.net';
    productConfigUrl = 'https://inubeservicesproductconfiguration.azurewebsites.net';
    partnerconfigUrl = 'https://inubeservicespartners.azurewebsites.net';
    policyconfigUrl = 'https://inubeservicespolicy.azurewebsites.net';
}
export const RDLCConfig = {
    RDLCConfigUrl,
    productConfigUrl,
    partnerconfigUrl,
    policyconfigUrl
}

export default RDLCConfig