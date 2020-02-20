import config from './../../config';

let EdelweissConfigUrl = 'http://localhost:63630';
let PolicyConfigUrl = 'https://localhost:44351';
if (config.env === "dev") {
    EdelweissConfigUrl = 'http://localhost:63630';
    PolicyConfigUrl = 'https://localhost:44351';
}
else {
     EdelweissConfigUrl = 'http://mica-publi-11qa3l637dqw3-293834673.ap-south-1.elb.amazonaws.com:9025';
    //EdelweissConfigUrl = 'http://inubeservicesmicaextegi.azurewebsites.net';
    PolicyConfigUrl = 'https://inubeservicespolicy.azurewebsites.net';
}
export const EdelweissConfig = {
    EdelweissConfigUrl,
    PolicyConfigUrl
}

export default EdelweissConfig