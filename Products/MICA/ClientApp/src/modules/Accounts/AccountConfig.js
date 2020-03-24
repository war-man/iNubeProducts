import config from './../../config';

/* local url*/
let accountConfigUrl = 'http://localhost:52166';

if (config.env == "dev") {
    /*Local url*/
    accountConfigUrl = 'http://localhost:52166';
}
else {
    /*  Server url */
    //accountConfigUrl = 'http://localhost:52166';
    //accountConfigUrl = 'https://inubeservicesaccounting.azurewebsites.net';
    accountConfigUrl = 'https://egiswitchapi.edelweisscustomeruat.com';
}
export const AccountConfig = {
    accountConfigUrl
}

export default AccountConfig