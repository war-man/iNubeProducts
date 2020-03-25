import config from './../../config';

//BillingConfigUrl = 'https://inubeservicesbilling.azurewebsites.net';
//BillingConfigUrl = 'http://edelw-publi-10uqrh34garg4-1391995876.ap-south-1.elb.amazonaws.com:9001';
//BillingConfigUrl = 'https://egiswitchapi.edelweisscustomeruat.com:9001';
let BillingConfigUrl = config.BillingConfigUrl;

export const BillingConfig = {
    BillingConfigUrl,
}

export default BillingConfig;