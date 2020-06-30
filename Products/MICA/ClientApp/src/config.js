//let env = "EdelweissProd";
//let env = "Production";
let env = "Dev";               
//let env = "Local";                  
//let env = "UAT"; 

let Baseurl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com';
let partnerconfigUrl = Baseurl;
let productConfigUrl = Baseurl;  
let UserConfigUrl = Baseurl;
let ruleEngineUrl = Baseurl;
let accountConfigUrl = Baseurl; 
let BillingConfigUrl = Baseurl;        
let policyconfigUrl = Baseurl;     
let claimConfigUrl = Baseurl;  
let rateConfigUrl = Baseurl;  
let ReportConfigUrl = Baseurl;
let DashboardConfigUrl = Baseurl; 
let dynamicPagesConfigUrl = Baseurl;
let RDLCConfigUrl = Baseurl;
let ReinsuranceConfigUrl = Baseurl;
let ExtensionUrl = Baseurl;    
let NotificationUrl = Baseurl;

if (env === "EdelweissProd") {
    Baseurl = 'https://egiswitchapi.edelweissinsurance.com';
    partnerconfigUrl = Baseurl;
    productConfigUrl = Baseurl;
    UserConfigUrl = Baseurl;
    ruleEngineUrl = Baseurl;
    accountConfigUrl = Baseurl;
    BillingConfigUrl = Baseurl;
    policyconfigUrl = Baseurl;
    claimConfigUrl = Baseurl;
    rateConfigUrl = Baseurl;
    ReportConfigUrl = Baseurl;
    DashboardConfigUrl = Baseurl;
    dynamicPagesConfigUrl = Baseurl;
    RDLCConfigUrl = Baseurl;
    ReinsuranceConfigUrl = Baseurl;
    ExtensionUrl = Baseurl;
    NotificationUrl = Baseurl;
}
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
    DashboardConfigUrl = 'http://localhost:58593';
    RDLCConfigUrl = 'https://inubeservicesnotification.azurewebsites.net';
    ReinsuranceConfigUrl = 'http://localhost:5000';
    ExtensionUrl = "http://localhost:63630";
    NotificationUrl = "http://localhost:53000";
}
if (env === "Dev") {
    Baseurl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com';
    partnerconfigUrl = Baseurl;
    productConfigUrl = Baseurl;
    UserConfigUrl = Baseurl;
    ruleEngineUrl = Baseurl;
    accountConfigUrl = Baseurl;
    BillingConfigUrl = Baseurl;
    policyconfigUrl = Baseurl;
    claimConfigUrl = Baseurl;
    rateConfigUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com';
    ReportConfigUrl = Baseurl;
    DashboardConfigUrl = Baseurl;
    dynamicPagesConfigUrl = Baseurl;
    RDLCConfigUrl = Baseurl;
    ReinsuranceConfigUrl = Baseurl;
    ExtensionUrl = Baseurl;
    NotificationUrl = Baseurl;
}
if (env === "Production") {
    Baseurl = 'https://localhost:44315';
    partnerconfigUrl = Baseurl;
    productConfigUrl = Baseurl;
    UserConfigUrl = Baseurl;
    ruleEngineUrl = Baseurl;
    accountConfigUrl = Baseurl;
    BillingConfigUrl = Baseurl;
    policyconfigUrl = Baseurl;
    claimConfigUrl = Baseurl;
    rateConfigUrl = Baseurl;
    ReportConfigUrl = Baseurl;
    DashboardConfigUrl = Baseurl;
    dynamicPagesConfigUrl = Baseurl;
    RDLCConfigUrl = Baseurl;
    ReinsuranceConfigUrl = Baseurl;
    ExtensionUrl = Baseurl;
    NotificationUrl = Baseurl;
}
if (env === "UAT") {
    Baseurl = 'https://egiswitchapi.edelweisscustomeruat.com';
    partnerconfigUrl = Baseurl;
    productConfigUrl = Baseurl;
    UserConfigUrl = Baseurl;
    ruleEngineUrl = Baseurl;
    accountConfigUrl = Baseurl;
    BillingConfigUrl = Baseurl;
    policyconfigUrl = Baseurl;
    claimConfigUrl = Baseurl;
    rateConfigUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com';
    ReportConfigUrl = Baseurl;
    DashboardConfigUrl = Baseurl;
    dynamicPagesConfigUrl = Baseurl;
    RDLCConfigUrl = Baseurl;
    ReinsuranceConfigUrl = Baseurl;
    ExtensionUrl = Baseurl;
    NotificationUrl = Baseurl;
}

export const config = {
    env: env,
    product: 'Mica',
    isTest: false,
    Baseurl: Baseurl,
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
    DashboardConfigUrl: DashboardConfigUrl,
    ExtensionUrl: ExtensionUrl,
    NotificationUrl: NotificationUrl,

    apiUrl: '',
    localUrl: '',

    rulelocalUrl: '',
    localRuleUrl: '',

    facebook: "", //Facebook App Id
    linkedin: "", //Linkedin app id
    google: "671491165170-2l31p1m7md0plbj9d5ak27uqcqo9kdpo.apps.googleusercontent.com" //Google client id  (7687687687-nq1asqrnbgordksqerer23dewqqe.apps.googleusercontent.com)
}

export default config