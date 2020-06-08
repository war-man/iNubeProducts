import config from '../../config';
let ContractConfigURL = 'https://localhost:44315';
let RateConfigUrl = '';
if (config.env == "dev") {
    //ContractConfigURL = 'https://localhost:44315';
}
else {
    ContractConfigURL = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com';
    RateConfigUrl ='https://inubeservicesrating.azurewebsites.net'
}
export const ContractConfig = {
    ContractConfigURL,
    RateConfigUrl
}

export default ContractConfig;