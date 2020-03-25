import config from './../../config';

//UserConfigUrl = 'https://inubeservicesusermanagement.azurewebsites.net';
//PartnerConfigUrl = 'https://inubeservicespartners.azurewebsites.net';
//UserConfigUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com:9009';
//PartnerConfigUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com:9005';
let UserConfigUrl = config.UserConfigUrl;
let PartnerConfigUrl = config.partnerconfigUrl;

export const UserConfig = {
    UserConfigUrl,
    PartnerConfigUrl
}

export default UserConfig