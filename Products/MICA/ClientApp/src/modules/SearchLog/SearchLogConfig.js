import config from './../../config';
let SearchLogConfigUrl = 'https://localhost:44367';
if (config.env === "dev") {
    SearchLogConfigUrl = 'https://localhost:44367';
}
else {
    //SearchLogConfigUrl = 'https://localhost:44367';
    SearchLogConfigUrl = 'https://inubeservicesusermanagement.azurewebsites.net';
}
export const SearchLogConfig = {
    SearchLogConfigUrl,
}

export default SearchLogConfig;