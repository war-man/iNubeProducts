import config from './../../config';
/* local url*/
let CoinsuranceConfigUrl = 'http://localhost:5000';
if (config.env == "dev") {
    /*Local url*/
    CoinsuranceConfigUrl = 'http://localhost:5000';
}
else {
    /*  Server url */
    //ReinsuranceConfigUrl = 'http://localhost:5000';
    //CoinsuranceConfigUrl = 'https://inubeservicesreinsurance.azurewebsites.net';
}
export const CoinsuranceConfig = {
    CoinsuranceConfigUrl
}
export default CoinsuranceConfig;