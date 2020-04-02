import config from './../../config';

//policyConfigUrl = 'https://inubeservicespolicy.azurewebsites.net';
//productConfigUrl = 'https://inubeservicesproductconfiguration.azurewebsites.net';
//partnerconfigUrl = 'https://inubeservicespartners.azurewebsites.net';
//productConfigUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com:9007';
//partnerconfigUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com:9005';
//policyConfigUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com:9006';
//productConfigUrl = 'https://egiswitchapi.edelweisscustomeruat.com:9007';
//partnerconfigUrl = 'https://egiswitchapi.edelweisscustomeruat.com:9005';
//policyConfigUrl = 'https://egiswitchapi.edelweisscustomeruat.com:9006';
let productConfigUrl = config.productConfigUrl;
let partnerconfigUrl = config.partnerconfigUrl;
let PolicyconfigUrl = config.policyconfigUrl;
let ExtensionUrl = config.ExtensionUrl
export const policyConfig = {
    PolicyconfigUrl,
    productConfigUrl,
    partnerconfigUrl,
    ExtensionUrl
}

export default policyConfig