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
//ReinsuranceConfigUrl = 'https://inubeservicesreinsurance.azurewebsites.net';
    ReinsuranceConfigUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com';
}
export const ReinsuranceConfig = {
    ReinsuranceConfigUrl
}

export default ReinsuranceConfig;