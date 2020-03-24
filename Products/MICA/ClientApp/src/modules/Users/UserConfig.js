import config from './../../config';
let UserConfigUrl = 'https://localhost:44367';
let PartnerConfigUrl = 'https://localhost:44315';
if (config.env === "dev") {
    UserConfigUrl = 'https://localhost:44367';
    PartnerConfigUrl = 'https://localhost:44315';
}
else {
    //UserConfigUrl = 'https://inubeservicesusermanagement.azurewebsites.net';
    //PartnerConfigUrl = 'https://inubeservicespartners.azurewebsites.net';
    UserConfigUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com:9009';
    PartnerConfigUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com:9005';
    //UserConfigUrl = 'http://egiswitchapi.edelweisscustomeruat.com:9009';
    //PartnerConfigUrl = 'http://egiswitchapi.edelweisscustomeruat.com:9005';
}
export const UserConfig = {
    UserConfigUrl,
    PartnerConfigUrl
}

export default UserConfig