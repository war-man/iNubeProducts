import config from '../../config';
let ruleEngineUrl = 'http://localhost:59676';
if (config.env == "dev") {
    ruleEngineUrl = 'http://localhost:59676';

}
else {

    ruleEngineUrl = 'https://inubecomponentsruleengine.azurewebsites.net';

}
export const ruleconfig = {
    ruleEngineUrl

}

export default ruleconfig