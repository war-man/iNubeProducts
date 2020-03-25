import config from '../../config';

//partnerconfigUrl = 'https://inubeservicespartners.azurewebsites.net';
//productConfigUrl = 'https://inubeservicesproductconfiguration.azurewebsites.net';
//UserConfigUrl = 'https://inubeservicesusermanagement.azurewebsites.net';
//UserConfigUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com:9009';
//partnerconfigUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com:9005';
//productConfigUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com:9007';
let UserConfigUrl = config.UserConfigUrl;
let partnerconfigUrl = config.partnerconfigUrl;
let productConfigUrl = config.productConfigUrl;

export const partnerconfig = {
    productConfigUrl,
    partnerconfigUrl,
    UserConfigUrl

}

export default partnerconfig