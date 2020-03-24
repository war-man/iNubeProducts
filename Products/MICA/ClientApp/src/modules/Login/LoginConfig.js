import config from '../../config';
let LoginUrl = 'https://localhost:44367';
let UserConfigUrl = 'https://localhost:44367';
let ProductType = config.product;

if (config.env == "dev") {
    UserConfigUrl = 'https://localhost:44367';
    LoginUrl = 'https://localhost:44367';
}
else {
    //UserConfigUrl = 'https://inubeservicesusermanagement.azurewebsites.net';
    //LoginUrl = 'https://inubeservicesusermanagement.azurewebsites.net';
   // LoginUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com:9009';
   // UserConfigUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com:9009';
    LoginUrl = 'https://egiswitchapi.edelweisscustomeruat.com:9009';
    UserConfigUrl = 'https://egiswitchapi.edelweisscustomeruat.com:9009';
}
export const LoginConfig = {
    LoginUrl,
    UserConfigUrl,
    ProductType
}

export default LoginConfig
