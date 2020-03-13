import config from './../../config';
let ReportConfigUrl = 'https://localhost:44351';
if (config.env === "dev") {
    ReportConfigUrl = 'https://localhost:44351';
}
else {
    //ReportConfigUrl = 'https://localhost:44351';
    ReportConfigUrl = 'https://inubeservicespolicy.azurewebsites.net';
}
export const ReportConfig = {
    ReportConfigUrl,
}

export default ReportConfig;