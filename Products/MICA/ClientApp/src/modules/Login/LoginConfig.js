import config from '../../config';
let LoginUrl = 'https://localhost:44367';
let UserConfigUrl = 'https://localhost:44367';
let ProductType = config.product;

if (config.env == "dev") {
    UserConfigUrl = 'https://localhost:44367';
    LoginUrl = 'https://localhost:44367';
}
else {
    UserConfigUrl = 'https://inubeservicesusermanagement.azurewebsites.net';
    LoginUrl = 'https://inubeservicesusermanagement.azurewebsites.net';
}
export const LoginConfig = {
    LoginUrl,
    UserConfigUrl,
    ProductType
}

export default LoginConfig
