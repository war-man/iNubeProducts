/*
**READ ME:
**--------
**
**This file handles API mocks. Tests take too long to run and cause a  
**failure due to timeout if they make actual requests to servers. To 
**get ariund the issue, server calls are intercepted. Instead of actual server
**calls being made, fixed values are returned for requests (We are mocking the
**server side processing in front end). Note that nock can also be used in 
**development mode. This way, we can mock APIs until server side code is 
**written. Refer to https://github.com/nock/nock for details on parameters
**
** ~Abhay
*/

export const apiMockList=[
{
	url:'https://inubeservicespartners.azurewebsites.net/api', //compulsory
	requestType:'get', //Compulsory
	path:'/Organization/GetMasterData?sMasterlist=OrgCategory', //Compulsory
	requestData:undefined, //if doesn't exist, can be set to undefined or can be omitted
	responseCode:200, //Compulsory
	responseBody:[{"mType":"OrgCategory","mdata":[{"mID":1,"mValue":"Corporate","mType":"OrgCategory","lob":null,"cob":null},{"mID":2,"mValue":"Individual","mType":"OrgCategory","lob":null,"cob":null}]},{"mType":"OrgConfigType","mdata":[{"mID":3,"mValue":"Self","mType":"OrgConfigType","lob":null,"cob":null},{"mID":4,"mValue":"Others","mType":"OrgConfigType","lob":null,"cob":null}]},{"mType":"OrgType","mdata":[{"mID":5,"mValue":"Corporate","mType":"OrgType","lob":null,"cob":null},{"mID":6,"mValue":"Insurer","mType":"OrgType","lob":null,"cob":null},{"mID":7,"mValue":"TPA","mType":"OrgType","lob":null,"cob":null}]},{"mType":"PartnerType","mdata":[{"mID":8,"mValue":"Individual","mType":"PartnerType","lob":null,"cob":null},{"mID":9,"mValue":"Corporate","mType":"PartnerType","lob":null,"cob":null}]},{"mType":"PartnerClass","mdata":[{"mID":10,"mValue":"Agent","mType":"PartnerClass","lob":null,"cob":null},{"mID":11,"mValue":"Broker","mType":"PartnerClass","lob":null,"cob":null},{"mID":12,"mValue":"Corp Agent","mType":"PartnerClass","lob":null,"cob":null}]},{"mType":"Salutation","mdata":[{"mID":13,"mValue":"Mr.","mType":"Salutation","lob":null,"cob":null},{"mID":14,"mValue":"Mrs.","mType":"Salutation","lob":null,"cob":null},{"mID":15,"mValue":"Ms.","mType":"Salutation","lob":null,"cob":null},{"mID":16,"mValue":"Dr.","mType":"Salutation","lob":null,"cob":null},{"mID":17,"mValue":"Prof.","mType":"Salutation","lob":null,"cob":null},{"mID":18,"mValue":"M/s","mType":"Salutation","lob":null,"cob":null}]},{"mType":"PaymentMode","mdata":[{"mID":19,"mValue":"Online","mType":"PaymentMode","lob":null,"cob":null},{"mID":20,"mValue":"Cheque","mType":"PaymentMode","lob":null,"cob":null},{"mID":21,"mValue":"Demand Draft","mType":"PaymentMode","lob":null,"cob":null},{"mID":22,"mValue":"Cash","mType":"PaymentMode","lob":null,"cob":null}]}]
	//responseBody can be a string or JSON
},
{
	url:'https://inubeservicespartners.azurewebsites.net/api', //compulsory
	requestType:'get', //Compulsory
	path:'/Organization/GetLocation?locationType=Country&parentID=0', //Compulsory
	requestData:undefined, //if doesn't exist, can be set to undefined or can be omitted
	responseCode:200, //Compulsory
	responseBody:[{"mID":1,"mValue":"India","mType":"Country","lob":null,"cob":null}]
	//responseBody can be a string or JSON
},
{
    url: 'https://inubeservicespartners.azurewebsites.net/api', //compulsory
    requestType: 'get', //Compulsory
    path: '/Organization/GetLocation?locationType=Country&parentID=0', //Compulsory
    requestData: undefined, //if doesn't exist, can be set to undefined or can be omitted
    responseCode: 200, //Compulsory
    responseBody: [{ "mID": 1, "mValue": "India", "mType": "Country", "lob": null, "cob": null }]
}







]