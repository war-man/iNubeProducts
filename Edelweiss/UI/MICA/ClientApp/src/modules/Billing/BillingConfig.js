import config from './../../config';
let BillingConfigUrl = 'https://localhost:44362';
if (config.env === "dev") {
    BillingConfigUrl = 'https://localhost:44362';
}
else {
    //BillingConfigUrl = 'https://localhost:44362';
    BillingConfigUrl = 'https://inubeservicesbilling.azurewebsites.net';
}
export const BillingConfig = {
    BillingConfigUrl,
}

export default BillingConfig;