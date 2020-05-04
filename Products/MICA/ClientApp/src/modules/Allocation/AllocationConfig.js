import config from '../../config';
let ruleEngineUrl = config.ruleEngineUrl;
//if (config.env == "dev") {
//    ruleEngineUrl = 'http://localhost:59676';

//}
//else {
//    let ruleEngineUrl = config.ruleEngineUrl;
//  // ruleEngineUrl = 'https://inubecomponentsruleengine.azurewebsites.net';
//  //  ruleEngineUrl = 'http://localhost:59676';
////ruleEngineUrl = 'https://egiswitchapi.edelweisscustomeruat.com/api/RuleEngine/swagger/index.html';
//}


export const AllocationConfig = {
    ruleEngineUrl

}

export default AllocationConfig