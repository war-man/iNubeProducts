//let env = "Production";
//let env = "Dev";
//let env = "Local";
let env = "UAT";

let partnerconfigUrl = 'https://localhost:44315';
let productConfigUrl = 'https://localhost:44347';
let UserConfigUrl = 'https://localhost:44367';
let ruleEngineUrl = 'http://localhost:59676';
let accountConfigUrl = 'http://localhost:52166';
let BillingConfigUrl = 'https://localhost:44362';
let policyconfigUrl = 'https://localhost:44351';
let claimConfigUrl = 'https://localhost:44344';
let dynamicPagesConfigUrl = 'http://localhost:52166';
let rateConfigUrl = 'http://localhost:58593';
let RDLCConfigUrl = 'https://localhost:49776';
let ReinsuranceConfigUrl = 'http://localhost:5000';
let Baseurl = 'https://egiswitchapi.edelweisscustomeruat.com';
let ReportConfigUrl = 'https://egiswitchapi.edelweisscustomeruat.com';

if (env === "Local") {
    partnerconfigUrl = 'https://localhost:44315';
    productConfigUrl = 'https://localhost:44347';
    UserConfigUrl = 'https://localhost:44367';
    ruleEngineUrl = 'http://localhost:59676';
    accountConfigUrl = 'http://localhost:52166';
    BillingConfigUrl = 'https://localhost:44362';
    policyconfigUrl = 'https://localhost:44351';
    claimConfigUrl = 'https://localhost:44344';
    dynamicPagesConfigUrl = 'http://localhost:52166';
    rateConfigUrl = 'http://localhost:58593';
    RDLCConfigUrl = 'https://inubeservicesnotification.azurewebsites.net';
    ReinsuranceConfigUrl = 'http://localhost:5000';
}
if (env === "Dev") {
    Baseurl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com';
    partnerconfigUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com:9005';
    productConfigUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com:9007';
    UserConfigUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com:9009';
    ruleEngineUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com:9052';
    accountConfigUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com:9011';
    BillingConfigUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com:9001';
    policyconfigUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com:9006';
    claimConfigUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com:9002';
    rateConfigUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com:9012';

    dynamicPagesConfigUrl = 'https://inubeservicesaccounting.azurewebsites.net';
    RDLCConfigUrl = 'https://inubeservicesnotification.azurewebsites.net';
    ReinsuranceConfigUrl = 'https://inubeservicesreinsurance.azurewebsites.net';
}
if (env === "Production") {
    partnerconfigUrl = 'https://localhost:44315';
    productConfigUrl = 'https://localhost:44347';
    UserConfigUrl = 'https://localhost:44367';
    ruleEngineUrl = 'http://localhost:59676';
    accountConfigUrl = 'http://localhost:52166';
    ReinsuranceConfigUrl = 'http://localhost:5000';
    BillingConfigUrl = 'https://localhost:44362';
    policyconfigUrl = 'https://localhost:44351';
    claimConfigUrl = 'https://localhost:44344';
    dynamicPagesConfigUrl = 'http://localhost:52166';
    rateConfigUrl = 'http://localhost:58593';
    
    RDLCConfigUrl = 'https://inubeservicesnotification.azurewebsites.net';
    ReinsuranceConfigUrl = 'https://inubeservicesreinsurance.azurewebsites.net';
}
if (env === "UAT") {
    Baseurl = 'https://egiswitchapi.edelweisscustomeruat.com';
    partnerconfigUrl = 'https://egiswitchapi.edelweisscustomeruat.com';
    productConfigUrl = 'https://egiswitchapi.edelweisscustomeruat.com';
    UserConfigUrl = 'https://egiswitchapi.edelweisscustomeruat.com';
    ruleEngineUrl = 'https://egiswitchapi.edelweisscustomeruat.com';
    accountConfigUrl = 'https://egiswitchapi.edelweisscustomeruat.com';
    BillingConfigUrl = 'https://egiswitchapi.edelweisscustomeruat.com';
    policyconfigUrl = 'https://egiswitchapi.edelweisscustomeruat.com';
    claimConfigUrl = 'https://egiswitchapi.edelweisscustomeruat.com';
    rateConfigUrl = 'https://egiswitchapi.edelweisscustomeruat.com';
    ReportConfigUrl = 'https://egiswitchapi.edelweisscustomeruat.com';
    dynamicPagesConfigUrl = 'https://inubeservicesaccounting.azurewebsites.net';
    RDLCConfigUrl = 'https://inubeservicesnotification.azurewebsites.net';
    ReinsuranceConfigUrl = 'https://inubeservicesreinsurance.azurewebsites.net';
}


export const config = {
    env: 'production',
    product: 'Mica',
    isTest: false,
    Baseurl: 'https://egiswitchapi.edelweisscustomeruat.com',

    partnerconfigUrl: partnerconfigUrl,
    productConfigUrl: productConfigUrl,
    UserConfigUrl: UserConfigUrl,
    ruleEngineUrl: ruleEngineUrl,
    accountConfigUrl: accountConfigUrl,
    BillingConfigUrl: BillingConfigUrl,
    policyconfigUrl: policyconfigUrl,
    claimConfigUrl: claimConfigUrl,
    dynamicPagesConfigUrl: dynamicPagesConfigUrl,
    rateConfigUrl: rateConfigUrl,
    RDLCConfigUrl: RDLCConfigUrl,
    ReinsuranceConfigUrl: ReinsuranceConfigUrl,
    ReportConfigUrl: ReportConfigUrl,

    apiUrl: 'https://inubeservicesusermanagement.azurewebsites.net/api',
    localUrl: 'http://localhost:63034/api',
    ruleEngineUrl: 'https://inubecomponentsruleengine.azurewebsites.net/',
    rulelocalUrl: 'https://inubecomponentsruleengine.azurewebsites.net/',
    localRuleUrl: 'https://inubecomponentsruleengine.azurewebsites.net/',

    facebook: "", //Facebook App Id
    linkedin: "", //Linkedin app id
    google: "671491165170-2l31p1m7md0plbj9d5ak27uqcqo9kdpo.apps.googleusercontent.com" //Google client id  (7687687687-nq1asqrnbgordksqerer23dewqqe.apps.googleusercontent.com)
}

export default config