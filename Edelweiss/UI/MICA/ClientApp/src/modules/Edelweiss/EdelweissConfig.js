import config from './../../config';

let EdelweissConfigUrl = 'http://localhost:63630';
let PolicyConfigUrl = 'https://localhost:44351';
let Edelweiss = '';
if (config.env === "dev") {
    EdelweissConfigUrl = 'http://localhost:63630';
    PolicyConfigUrl = 'https://localhost:44351';
}
else {
    //EdelweissConfigUrl = 'http://mica-publi-11qa3l637dqw3-293834673.ap-south-1.elb.amazonaws.com:9025';
    EdelweissConfigUrl = 'http://elwei-publi-1sxquhk82c0h4-688030859.ap-south-1.elb.amazonaws.com:9025';
    Edelweiss = 'http://edelw-publi-10uqrh34garg4-1391995876.ap-south-1.elb.amazonaws.com:9025';
    //Edelweiss = 'http://edelw-publi-10uqrh34garg4-1391995876.ap-south-1.elb.amazonaws.com';
    //EdelweissConfigUrl = 'http://inubeservicesmicaextegi.azurewebsites.net';
    //PolicyConfigUrl = 'https://inubeservicespolicy.azurewebsites.net';
    PolicyConfigUrl = 'http://elwei-publi-1sxquhk82c0h4-688030859.ap-south-1.elb.amazonaws.com:9006';

}
export const EdelweissConfig = {
    EdelweissConfigUrl,
    Edelweiss,
    PolicyConfigUrl
}

export default EdelweissConfig