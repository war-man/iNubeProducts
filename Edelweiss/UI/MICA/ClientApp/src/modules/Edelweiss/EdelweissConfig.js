import config from './../../config';

let EdelweissConfigUrl = 'http://localhost:63630';
let PolicyConfigUrl = 'https://localhost:44351';
let Edelweiss = '';
let micaEdelweissConfig = '';
if (config.env === "dev") {
    EdelweissConfigUrl = 'http://localhost:63630';
    PolicyConfigUrl = 'https://localhost:44351';
}
else {
    console.log("config.env",config.env);
    micaEdelweissConfig = 'http://mica-publi-11qa3l637dqw3-293834673.ap-south-1.elb.amazonaws.com:9025';
    EdelweissConfigUrl = 'https://egiswitchapi.edelweisscustomeruat.com';
    Edelweiss = 'http://edelw-publi-10uqrh34garg4-1391995876.ap-south-1.elb.amazonaws.com:9025';
    PolicyConfigUrl = 'http://egiswitchapi.edelweisscustomeruat.com:9006'
  
}
export const EdelweissConfig = {
    EdelweissConfigUrl,
    Edelweiss,
    PolicyConfigUrl,
    micaEdelweissConfig
}

export default EdelweissConfig