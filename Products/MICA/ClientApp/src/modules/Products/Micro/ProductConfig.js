import config from './../../../config';

//productConfigUrl = 'https://inubeservicesproductconfiguration.azurewebsites.net';
//productConfigUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com:9007';
//productConfigUrl = 'https://egiswitchapi.edelweisscustomeruat.com:9007';
//let productConfigUrl = "http://localhost:59968";
let productConfigUrl = config.productConfigUrl;

export const productConfig = {
    productConfigUrl
}

export default productConfig