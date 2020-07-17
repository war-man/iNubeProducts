import config from '../../config';
let ProductType = config.product;

//let UserConfigUrl = 'https://inubeservicesusermanagement.azurewebsites.net';
//let LoginUrl = 'https://inubeservicesusermanagement.azurewebsites.net';
//let LoginUrl = 'https://localhost:44351';
//let UserConfigUrl = 'https://localhost:44351';
//let LoginUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com:9009';
//let UserConfigUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com:9009';
let LoginUrl = config.UserConfigUrl;
let UserConfigUrl = config.UserConfigUrl;
export const LoginConfig = {
    LoginUrl,
    UserConfigUrl,
    ProductType
}

export default LoginConfig
