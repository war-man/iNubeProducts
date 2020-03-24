import config from '../../config';
let ruleEngineUrl = 'http://localhost:59676';
if (config.env == "dev") {
    ruleEngineUrl = 'http://localhost:59676';

}
else {

    //ruleEngineUrl = 'https://inubecomponentsruleengine.azurewebsites.net';
    ruleEngineUrl = 'https://egiswitchapi.edelweisscustomeruat.com:9052';
}
export const ruleconfig = {
    ruleEngineUrl

}

export default ruleconfig