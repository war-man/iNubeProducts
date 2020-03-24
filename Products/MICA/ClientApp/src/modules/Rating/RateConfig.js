import config from './../../config';

/* local url*/
let rateConfigUrl = 'http://localhost:58593';

if (config.env == "dev") {
    /*Local url*/
    rateConfigUrl = 'http://localhost:58593';
}
else {
    /*  Server url */
    //rateConfigUrl = 'http://localhost:58593';
    //rateConfigUrl = 'https://inubeservicesrating.azurewebsites.net';
    rateConfigUrl = 'https://egiswitchapi.edelweisscustomeruat.com:9012';
}
export const RateConfig = {
    rateConfigUrl
}

export default RateConfig