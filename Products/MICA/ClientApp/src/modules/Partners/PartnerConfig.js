import config from '../../config';
let partnerconfigUrl = 'https://localhost:44315';
let productConfigUrl = 'https://localhost:44347';
let UserConfigUrl = 'https://localhost:44347';
if (config.env === "dev") {
    partnerconfigUrl = 'https://localhost:44315';
    productConfigUrl = 'https://localhost:44347';
}
else {
    //partnerconfigUrl = 'https://inubeservicespartners.azurewebsites.net';
    //productConfigUrl = 'https://inubeservicesproductconfiguration.azurewebsites.net';
    //UserConfigUrl = 'https://inubeservicesusermanagement.azurewebsites.net';
    UserConfigUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com:9009';
    partnerconfigUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com:9005';
    productConfigUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com:9007';
    //UserConfigUrl = 'http://egiswitchapi.edelweisscustomeruat.com:9009';
    //partnerconfigUrl = 'http://egiswitchapi.edelweisscustomeruat.com:9005';
    //productConfigUrl = 'http://egiswitchapi.edelweisscustomeruat.com:9007';
}
export const partnerconfig = {
    productConfigUrl,
    partnerconfigUrl,
    UserConfigUrl

}

export default partnerconfig