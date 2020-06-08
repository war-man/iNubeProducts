import config from '../../config';
let HierarchyConfigURL = 'https://localhost:44315';
if (config.env == "dev") {
   // HierarchyConfig = 'https://localhost:44315';
}
else {
   // HierarchyConfigURL = 'https://egiswitchapi.edelweisscustomeruat.com';
    //HierarchyConfigURL = 'https://localhost:44315';
    HierarchyConfigURL = 'http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com';
    //HierarchyConfig = 'https://inubeservicespartners.azurewebsites.net';
}
export const HierarchyConfig = {
    HierarchyConfigURL
}

export default HierarchyConfig;