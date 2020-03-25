import config from './../../config';

////claimConfigUrl = 'https://inubeservicesclaims.azurewebsites.net';
//productConfigUrl = 'https://inubeservicesproductconfiguration.azurewebsites.net';
//partnerconfigUrl = 'https://inubeservicespartners.azurewebsites.net';
//policyconfigUrl = 'https://inubeservicespolicy.azurewebsites.net';
//claimConfigUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com:9002';
//productConfigUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com:9007';
//partnerconfigUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com:9005';
//policyconfigUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com:9006';
let claimConfigUrl = config.claimConfigUrl;
let productConfigUrl = config.productConfigUrl;
let partnerconfigUrl = config.partnerconfigUrl;
let policyconfigUrl = config.policyconfigUrl;

export const ClaimConfig = {
    claimConfigUrl,
    productConfigUrl,
    partnerconfigUrl,
    policyconfigUrl
}

export default ClaimConfig