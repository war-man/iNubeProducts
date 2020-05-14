import config from './../../../../config';

let policyConfigUrl = config.policyconfigUrl;
let partnerconfigUrl = config.partnerconfigUrl;
let productConfigUrl = config.productConfigUrl;

export const paymentConfig = {
    policyConfigUrl,
    productConfigUrl,
    partnerconfigUrl
}

export default paymentConfig