import config from '../../config';
let ruleEngineUrl = 'http://localhost:59676';
if (config.env == "dev") {
    ruleEngineUrl = 'http://localhost:59676';

}
else {

    //ruleEngineUrl = 'https://inubecomponentsruleengine.azurewebsites.net';
    ruleEngineUrl = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com/api/RuleEngine/swagger/index.html';

}
export const ruleconfig = {
    ruleEngineUrl

}

export default ruleconfig