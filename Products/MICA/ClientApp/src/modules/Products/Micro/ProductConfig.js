import config from './../../../config';
let productConfigUrl = 'https://localhost:44347';
if (config.env == "dev") {
    productConfigUrl = 'https://localhost:44347';
}
else {
    productConfigUrl = 'https://inubeservicesproductconfiguration.azurewebsites.net';
}
export const productConfig = {
    productConfigUrl
}

export default productConfig