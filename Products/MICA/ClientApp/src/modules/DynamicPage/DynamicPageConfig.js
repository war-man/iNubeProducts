import config from './../../config';

//dynamicPagesConfigUrl = 'https://inubeservicesaccounting.azurewebsites.net';
//productConfigUrl = 'https://inubeservicesproductconfiguration.azurewebsites.net';

let dynamicPagesConfigUrl = config.dynamicPagesConfigUrl;//'https://inubeservicesaccounting.azurewebsites.net';
let productConfigUrl = config.productConfigUrl;//'https://inubeservicesproductconfiguration.azurewebsites.net';

export const DynamicPageConfig = {
    dynamicPagesConfigUrl,
    productConfigUrl
}

export default DynamicPageConfig