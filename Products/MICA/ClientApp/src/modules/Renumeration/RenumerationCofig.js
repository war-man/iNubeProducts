import config from '../../config';
let RenumerationCofigURL = 'https://localhost:44315';
if (config.env == "dev") {
    RenumerationCofigURL = 'https://localhost:44315';
}
else {
    RenumerationCofigURL = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com';
}
export const RenumerationCofig = {
    RenumerationCofigURL
}

export default RenumerationCofig;