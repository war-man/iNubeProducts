import config from './../../config';

//RDLCConfigUrl = 'https://inubeservicesnotification.azurewebsites.net';
//productConfigUrl = 'https://inubeservicesproductconfiguration.azurewebsites.net';
//partnerconfigUrl = 'https://inubeservicespartners.azurewebsites.net';
//policyconfigUrl = 'https://inubeservicespolicy.azurewebsites.net';

let RDLCConfigUrl = config.RDLCConfigUrl;
let productConfigUrl = config.productConfigUrl;
let partnerconfigUrl = config.partnerconfigUrl;
let policyconfigUrl = config.policyconfigUrl;

export const RDLCConfig = {
    RDLCConfigUrl,
    productConfigUrl,
    partnerconfigUrl,
    policyconfigUrl
}

export default RDLCConfig