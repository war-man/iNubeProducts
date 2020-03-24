import config from './../../config';
let BillingConfigUrl = 'https://localhost:44362';
if (config.env === "dev") {
    BillingConfigUrl = 'https://localhost:44362';
}
else {
    //BillingConfigUrl = 'https://localhost:44362';
    //BillingConfigUrl = 'https://inubeservicesbilling.azurewebsites.net';
    //BillingConfigUrl = 'http://edelw-publi-10uqrh34garg4-1391995876.ap-south-1.elb.amazonaws.com:9001';
    BillingConfigUrl = 'https://egiswitchapi.edelweisscustomeruat.com:9001';
}
export const BillingConfig = {
    BillingConfigUrl,
}

export default BillingConfig;