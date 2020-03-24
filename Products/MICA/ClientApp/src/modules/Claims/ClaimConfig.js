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
    ////claimConfigUrl = 'https://inubeservicesclaims.azurewebsites.net';
    //productConfigUrl = 'https://inubeservicesproductconfiguration.azurewebsites.net';
    //partnerconfigUrl = 'https://inubeservicespartners.azurewebsites.net';
    //policyconfigUrl = 'https://inubeservicespolicy.azurewebsites.net';
    claimConfigUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com:9002';
    productConfigUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com:9007';
    partnerconfigUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com:9005';
    policyconfigUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com:9006';
    //claimConfigUrl = 'http://egiswitchapi.edelweisscustomeruat.com:9002';
    //productConfigUrl = 'http://egiswitchapi.edelweisscustomeruat.com:9007';
    //partnerconfigUrl = 'http://egiswitchapi.edelweisscustomeruat.com:9005';
    //policyconfigUrl = 'http://egiswitchapi.edelweisscustomeruat.com:9006';
}
export const ClaimConfig = {
    claimConfigUrl,
    productConfigUrl,
    partnerconfigUrl,
    policyconfigUrl
}

export default ClaimConfig