import config from '../../config';

//UserConfigUrl = 'https://inubeservicesusermanagement.azurewebsites.net';
//LoginUrl = 'https://inubeservicesusermanagement.azurewebsites.net';
//LoginUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com:9009';
//UserConfigUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com:9009';
let LoginUrl = config.UserConfigUrl;
let UserConfigUrl = config.UserConfigUrl;
export const LoginConfig = {
    LoginUrl,
    UserConfigUrl,
    ProductType
}

export default LoginConfig
