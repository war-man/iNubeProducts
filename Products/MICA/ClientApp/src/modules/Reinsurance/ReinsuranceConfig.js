import config from './../../config';

/* local url*/
let ReinsuranceConfigUrl = 'http://localhost:5000';

if (config.env == "dev") {
    /*Local url*/
    ReinsuranceConfigUrl = 'http://localhost:5000';
}
else {
    /*  Server url */
    //ReinsuranceConfigUrl = 'http://localhost:5000';
    ReinsuranceConfigUrl = 'https://inubeservicesreinsurance.azurewebsites.net';
}
export const ReinsuranceConfig = {
    ReinsuranceConfigUrl
}

export default ReinsuranceConfig;