import config from './../../config';
let NewBusinessConfigUrl = 'https://localhost:44347';
//let ProductConfig = 'https://inubeservicesproductconfiguration.azurewebsites.net';
let ProductConfig = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com';

///Local---https://localhost:44347(Lead)
let ProposalConfigUrl = 'https://localhost:44351';
if (config.env === "dev") {
    NewBusinessConfigUrl = 'https://localhost:44347';
    //productConfigUrl = 'https://localhost:44347';
    ProposalConfigUrl = 'https://localhost:44351';
}
else {
    // NewBusinessConfigUrl = 'https://localhost:44347';
    NewBusinessConfigUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com';
    ProductConfig = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com';
    ProposalConfigUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com';
    //NewBusinessConfigUrl = 'https://inubeserviceslead.azurewebsites.net';
    //ProductConfig = 'https://inubeservicesproductconfiguration.azurewebsites.net';
    //ProposalConfigUrl = 'https://inubeservicespolicy.azurewebsites.net';
    //'https://inubeservicespolicy.azurewebsites.net'
}

export const NewBusinessConfig = {
    NewBusinessConfigUrl, ProductConfig, ProposalConfigUrl
}

export default NewBusinessConfig;