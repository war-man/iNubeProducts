import config from './../../../config';
let productConfigUrl = 'https://localhost:44347';
if (config.env == "dev") {
    productConfigUrl = 'https://localhost:44347';
}
else {
    //productConfigUrl = 'https://inubeservicesproductconfiguration.azurewebsites.net';
    productConfigUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com:9007';
    //productConfigUrl = 'http://egiswitchapi.edelweisscustomeruat.com:9007';
}
export const productConfig = {
    productConfigUrl
}

export default productConfig