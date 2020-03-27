import config from '../../config';
let ruleEngineUrl = 'http://localhost:59676';
if (config.env == "dev") {
    ruleEngineUrl = 'http://localhost:59676';

}
else {

   ruleEngineUrl = 'https://inubecomponentsruleengine.azurewebsites.net';
  //  ruleEngineUrl = 'http://localhost:59676';
  
}
export const AllocationConfig = {
    ruleEngineUrl

}

export default AllocationConfig