import config from './../../config';
let WrapperConfigUrl = 'https://localhost:44351';
if (config.env === "dev") {
    WrapperConfigUrl = 'https://localhost:44351';
}
else {
    //WrapperConfigUrl = 'https://localhost:44351';
    WrapperConfigUrl = 'https://inubeservicespolicy.azurewebsites.net';
}

export const WrapperConfig = {
    WrapperConfigUrl,
}

export default WrapperConfig;