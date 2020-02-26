import config from './../../config';
let ReportConfigUrl = 'https://localhost:44351';
if (config.env === "dev") {
    ReportConfigUrl = 'https://localhost:44351';
}
else {
    //ReportConfigUrl = 'https://localhost:44351';
    //ReportConfigUrl = 'https://inubeservicespolicy.azurewebsites.net';
    ReportConfigUrl='http://ed-mica-policy.ed.internal.:9006';
    //ReportConfigUrl = 'http://edelw-publi-10uqrh34garg4-1391995876.ap-south-1.elb.amazonaws.com:9006/swagger/index.html';
}
export const ReportConfig = {
    ReportConfigUrl,
}

export default ReportConfig;