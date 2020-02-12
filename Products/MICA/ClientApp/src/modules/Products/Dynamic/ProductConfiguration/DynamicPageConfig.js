import config from './../../config';

/* local url*/
let dynamicPagesConfigUrl = 'http://localhost:52166';
let productConfigUrl = 'https://localhost:44347';

if (config.env == "dev") {
    /*Local url*/
    dynamicPagesConfigUrl = 'http://localhost:52166';
    productConfigUrl = 'https://localhost:44347';

}
else {
    /*  Server url */
    //dynamicPagesConfigUrl = 'http://localhost:52166';
    dynamicPagesConfigUrl = 'https://inubeservicesaccounting.azurewebsites.net';
    productConfigUrl = 'https://inubeservicesproductconfiguration.azurewebsites.net';
}
export const DynamicPageConfig = {
    dynamicPagesConfigUrl,
    productConfigUrl
}

export default DynamicPageConfig