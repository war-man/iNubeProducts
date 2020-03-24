import config from './../../config';
let policyConfigUrl = 'https://localhost:44351';
let productConfigUrl = 'https://localhost:44347';
let partnerconfigUrl = 'https://localhost:44315';
if (config.env == "dev") {
    policyConfigUrl = 'https://localhost:44351';
    productConfigUrl = 'https://localhost:44347';
    partnerconfigUrl = 'https://localhost:44315';
}
else {
    //policyConfigUrl = 'https://inubeservicespolicy.azurewebsites.net';
    //productConfigUrl = 'https://inubeservicesproductconfiguration.azurewebsites.net';
    //partnerconfigUrl = 'https://inubeservicespartners.azurewebsites.net';
    productConfigUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com:9007';
    partnerconfigUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com:9005';
    policyConfigUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com:9006';
    //productConfigUrl = 'http://egiswitchapi.edelweisscustomeruat.com:9007';
    //partnerconfigUrl = 'http://egiswitchapi.edelweisscustomeruat.com:9005';
    //policyConfigUrl = 'http://egiswitchapi.edelweisscustomeruat.com:9006';
}
export const policyConfig = {
    policyConfigUrl,
    productConfigUrl,
    partnerconfigUrl
}

export default policyConfig