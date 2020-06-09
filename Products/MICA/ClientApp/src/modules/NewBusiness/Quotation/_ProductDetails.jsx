import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Radio from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";

// @material-ui/icons
import MailOutline from "@material-ui/icons/MailOutline";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import Contacts from "@material-ui/icons/Contacts";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import ReactTable from "react-table";
import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Switch from "@material-ui/core/Switch";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import Accordion from "components/Accordion/Accordion.jsx";
import Benifit from "./_BenifitDetails.jsx"

import SpouseDetails from "./_SpouseDetails.jsx";

import NewBusinessConfig from '.././NewBusinessConfig.js';




class RegularForms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            BasePremiumDTO: {
                "refNo": "",
                "serviceTraceID": "",
                "isForServices": true,
                "quoteIndex": 0,

                "lstIllustation": [],

                "objProspect": {},

                "objProductDetials": {},

                "age": 0,
                "quotationType": "",
                "cess": "",
                "policyFee": "",
                "vat": "",
                "annualPremium": "",
                "halfYearlyPremium": "",
                "quaterlyPremium": "",
                "monthlyPremium": "",
                "basicSumInsured": "200000",
                "basicPremium": "",
                "contactid": 0,
                "isSelfPay": true,
                "isSelfCovered": true,
                "isSpouseCovered": true,
                "isChildCovered": true,
                "isNeedsIdentified": true,
                "isModifyQuote": true,
                "noofChilds": "0",

                "objSpouseDetials": {},

                "objChildDetials": [],

                "strHtml": "",
                "strPremiumHtml": "",
                "strBenefitHtml": "",
                "userName": "",
                "quoteNo": "",
                "prevQuoteNo": "",
                "message": "",
                "lifeQQID": 0,

                "listAssured": [],

                "panelIndex": "",
                "_memberIndex": 0,
                "quoteVersion": 0,
                "totalSumAssured": 0,
                "isForCounterOffer": true,

                "objQuoteMemberDetails": [],

                "byteArray": "",
                "byteArray1": "",
                "quotePDFPath": "",
                "proposerSignPath": "",
                "wpProposerSignPath": "",
                "signature": "",
                "prospectSign": "",
                "wpProposerSignature": "",
                "wpProposerSigPath": "",
                "wpSignature": "",
                "signType": "",
                "emailAddress": "",
                "riskCommencementDate": "2019-10-07T09:28:00.340Z",
                "childDeleteIndex": 0
            },

            lstIllustation: [
                {
                    "policyYear": 0,
                    "basicPremium": 0,
                    "mainBenefitsPremium": 0,
                    "additionalBenefitsPremiums": 0,
                    "totalPremium": 0,
                    "fundBalanceDiv4": 0,
                    "surrenderValueDiv4": 0,
                    "drawDownDiv4": 0,
                    "pensionBoosterDiv4": 0,
                    "fundBalanceDiv8": 0,
                    "surrenderValueDiv8": 0,
                    "drawDownDiv8": 0,
                    "pensionBoosterDiv8": 0,
                    "fundBalanceDiv12": 0,
                    "surrenderValueDiv12": 0,
                    "drawDownDiv12": 0,
                    "pensionBoosterDiv12": 0,
                    "fundBalanceDiv5": 0,
                    "fundBalanceDiv6": 0,
                    "fundBalanceDiv7": 0,
                    "fundBalanceDiv9": 0,
                    "fundBalanceDiv10": 0,
                    "fundBalanceDiv11": 0,
                    "drawDownDiv5": 0,
                    "drawDownDiv6": 0,
                    "drawDownDiv7": 0,
                    "drawDownDiv9": 0,
                    "drawDownDiv10": 0,
                    "drawDownDiv11": 0,
                    "unAllocatedPremium": 0,
                    "fundBoosterDiv12": 0
                }
            ],

            objProspect: {
                "wpName": "",
                "wpCode": "",
                "wpPhone": "",
                "hdnAutOccupation": "",
                "hdnValue": "",
                "createdBy": "",
                "prefix": "",
                "userName": "Ajay",
                "isForServices": true,
                "type": "Own",
                "salutation": "Mr",
                "name": "Ajay",
                "lastName": "Raikar",
                "mobile": "",
                "passPort": "",
                "place": "Davangere",
                "email": "ajay.v@inubesolutions.com",
                "work": "",
                "home": "",
                "ageNextBdy": 22,
                "currentAge": 0,
                "dateofBirth": "",
                "occupation": "",
                "nationality": "",
                "employerName": "",
                "nic": "",
                "bmI_Exceed": true,
                "nicavail": true,
                "gender": "M",
                "maritalStatus": "",
                "displayMaritalStatus": "",
                "avgMonthlyIncome": "",
                "message": "",
                "contactID": 0,
                "assignedTo": "",
                "upload": "",
                "signature": "",
                "notePad": "",
                "notePadByteArray": "",
                "byteArrayGraph": "",
                "byteArray": "",
                "byteArray1": "",
                "byteArray2": "",
                "byteArray3": "",
                "byteArray4": "",
                "byteArray5": "",
                "byteArray6": "",
                "protectionByteArraygraph": "",
                "healthByteArraygraph": "",
                "isConfirmedProspect": true,
                "isNeedAnalysisCompleted": true,
                "prospectStage": 0,
                "sendEmail": "",
                "reasonForRemove": "",
                "clientCode": "",
                "samsLeadNumber": "",
                "introducerCode": "",
                "serviceTraceID": "",
                "errorMessage": ""

            },

            objProductDetials: {
                "plan": "1",
                "variant": "84",
                "planCode": "",
                "policyTerm": "30",
                "premiumTerm": "",
                "pensionPeriod": "",
                "retirementAge": "",
                "drawDownPeriod": "",
                "maturityBenefits": "",
                "preferredLangauage": "",
                "preferredMode": "12",
                "monthlySurvivorIncome": 0,
                "basicSumInsured": 200000,
                "annualPremium": "",
                "sam": 0,
                "apcp": 0,
                "isFamilyFloater": true,
                "deductable": true,
                "isAfc": "",
                "modalPremium": ""
            },

            objSpouseDetials: {
                "ageNextBirthday": 0,
                "currrentAge": 0,
                "dob": "2019-10-07T10:09:40.742Z",
                "spouseName": "",
                "spouseNIC": "",
                "gender": "",
                "occupation": "",
                "assuredName": ""
            },

            objChildDetials: [
                {
                    "sumAssured": "",
                    "assured": "",
                    "relationship": "",
                    "ageNextBirthday": 0,
                    "currentAge": 0,
                    "dateofBirth": "2019-10-07T10:09:40.742Z",
                    "gender": "",
                    "name": ""
                }
            ],

            listAssured: [],

            objQuoteMemberDetails: [
                {
                    "assured": "",
                    "relationship": "267",
                    "memberIndex": "",
                    "ageNextBirthDay": 22,
                    "currentAge": 0,
                    "childRelationship": "",
                    "tabIndex": "1",
                    "isBenefitRequested": true,

                    "objBenefitDetails": [],

                    "hospitalizationAvailability": "",
                    "dateOfBirth": "2019-10-07T09:28:00.340Z"
                }
            ],

            objBenefitDetails: [
                {
                    "memberBenifitID": 0,
                    "benefitID": 0,
                    "benifitName": "",
                    "assuredMember": "",
                    "benifitOpted": true,
                    "mandatory": true,
                    "riderSuminsured": "",
                    "riderCode": "",
                    "minSumInsured": "",
                    "maxSumInsured": "",
                    "riderPremium": "",
                    "riderID": 0,
                    "relationshipWithProspect": "",
                    "calType": "",
                    "minAge": 0,
                    "maxAge": 0,
                    "memberBenefitDetailID": 0,
                    "loadingType": "",
                    "loadingAmount": "",
                    "discountAmount": "",
                    "extraPremium": "",
                    "loadingBasis": "",
                    "exclusion": "",
                    "actualRiderPremium": "",
                    "annualRiderPremium": "",
                    "totalPremium": "",
                    "isDeleted": true,
                    "riderLoadingIndex": 0,
                    "memberID": "",
                    "loadingPercentage": "",
                    "loadinPerMille": "",
                    "annualModeLoadingAmount": "",
                    "annualModeDiscountAmount": "",
                    "annualModeAnnualpremium": ""
                }
            ],

            PremiumResponseDTO: [],
            MainLifeData: [],
            SpouseData: [],
            RiderDTO: [],
            tabledata: [],
            MainRiderTableData: [],
            SpouseRiderTableData: [],
            checked: [24, 22],
            selectedValue: null,
            selectedEnabled: "b",
            Productdata: [],
            Plandata: [],
            Policydata: [],
            PrefferedMode: [],
            MasterType: "",
            product: "",
            ProductDTO: {
                PlanId: "",
                PolicyID: "",
                PrefferedModeID: "",
                premiumData: "",
                ProductId: "",
                planCode: "",
                basicSum: ""
            },
            fields: {
                ProductId: ""
            },
            MasterDTO: {
                Product: []
            },
            CalculateFlag: false,
            RiskFlag: false,
            SpouseCheck: false,
            SpouseFlag: false,
            selectedValue: null,
            SpouseRadio: "",
            SpouseMaster: [],

        };
        this.handleQuoteChange = this.handleQuoteChange.bind(this);
        this.handleChangeEnabled = this.handleChangeEnabled.bind(this);

    }



    componentDidMount() {

        this.state.BasePremiumDTO.lstIllustation = this.state.lstIllustation;
        this.state.BasePremiumDTO.objProspect = this.state.objProspect;
        this.state.BasePremiumDTO.objProductDetials.plan = this.state.ProductDTO.ProductId; //this.state.ProductDTO.ProductId as it is hardcoded
        this.state.BasePremiumDTO.objProductDetials.variant = this.state.ProductDTO.PlanId;
        this.state.BasePremiumDTO.objProductDetials.policyTerm = this.state.ProductDTO.PolicyID;
        this.state.BasePremiumDTO.objProductDetials.basicSumInsured = this.state.ProductDTO.basicSumInsured;
        this.state.BasePremiumDTO.objProductDetials.preferredMode = this.state.ProductDTO.PrefferedModeID;

        console.log("BaseDTO", this.state.BasePremiumDTO);

        fetch(`${NewBusinessConfig.ProductConfig}/api/Product/GetProductMasterAvo`, {
            method: 'Get',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        })
            .then(response => response.json())
            .then(data => {

                this.setState({ Productdata: data });
                //   this.state.MasterDTO.Product=data;

                console.log("ProductMaster", data);
                console.log("ThisData", this.state.Productdata);

            });


        let prefferedmode = "Preffered Mode"
        fetch(`${NewBusinessConfig.ProductConfig}/api/Product/GetProductMasterAvo?masterType=` + prefferedmode + ``, {
            method: 'Get',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ PrefferedMode: data });
                console.log("PrefferedMode", data);
            });



        fetch(`${NewBusinessConfig.NewBusinessConfigUrl}/api/Lead/GetMaster?isFilter=true`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("masterList: ", data);
                this.setState({ SpouseMaster: data });

                console.log("SpouseMaster: ", this.state.SpouseMaster);


            });

        //this.dataTable();

    }


    GetRidersData = () => {

        fetch(`${NewBusinessConfig.ProductConfig}/api/Product/GetRiders?ProductId=` + this.state.ProductDTO.ProductId + "&PlanId=" + this.state.ProductDTO.PlanId, {
            method: 'Get',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        })
            .then(response => response.json())
            .then(data => {

                this.state.RiderDTO = data;
                this.setState({});
                this.GetTableforRiders();
                // console.log("RiderDTO", this.state.RiderDTO, 'Data', data);
            });

        this.setState({ RiskFlag: true });
    }


    GetTableforRiders = (event) => {

        //  console.log("DTORider", this.state.RiderDTO);
        if (event == null) {
            this.state.MainLifeData = this.state.RiderDTO.filter(x => x.relationshipWithProspect != 2);
            this.state.SpouseData = this.state.RiderDTO.filter(x => x.relationshipWithProspect === "2");
        }

        console.log("MainData", this.state.MainLifeData, this.state.SpouseData);

        this.setState({

            MainRiderTableData: this.state.MainLifeData.map((prop, key) => {



                return {
                    id: key + 1,
                    benifitId: prop.benefitID,
                    benifitName: prop.benifitName,
                    riderSuminsured: < CustomInput value={prop.riderSuminsured} name="riderSuminsured" onChange={(e) => this.setObjValue('MainLife', e, key)} formControlProps={{ fullWidth: true }} />,
                    actualRiderPremium: prop.actualRiderPremium,
                    loadingAmount: prop.loadingAmount,
                    riderPremium: prop.riderPremium,

                };

            })

        });


        this.setState({

            SpouseRiderTableData: this.state.SpouseData.map((prop, key) => {



                return {
                    id: key + 1,
                    benifitId: prop.benefitID,
                    benifitName: prop.benifitName,
                    riderSuminsured: < CustomInput value={prop.riderSuminsured} name="riderSuminsured" onChange={(e) => this.setSpouseValue('Spouse', e, key)} formControlProps={{ fullWidth: true }} />,
                    actualRiderPremium: prop.actualRiderPremium,
                    loadingAmount: prop.loadingAmount,
                    riderPremium: prop.riderPremium,

                };

            })

        });

        // console.log("MainLifeData", this.state.MainRiderTableData);

        // console.log("SpouseTableData", this.state.SpouseRiderTableData);

    }

    setObjValue = (name, e, key) => {
        const maindata = this.state.MainLifeData;
        maindata[key].riderSuminsured = e.target.value;
        this.setState({ maindata });

        console.log("MDATA", maindata);


        const filtermdata = maindata.filter(x => x.riderSuminsured != null)


        filtermdata[key].benifitOpted = true;

        this.state.BasePremiumDTO.objProductDetials.basicSumInsured = filtermdata[0].riderSuminsured;
        this.state.objQuoteMemberDetails[0].objBenefitDetails = filtermdata;

        //  this.GetRiskDetailsFun();
        console.log("OnchangeData", filtermdata);
        //this.GetTableforRiders("PremiumCalC");
    }


    setSpouseValue = (name, e, key) => {
        const spousedata = this.state.SpouseData;
        spousedata[key].riderSuminsured = e.target.value;
        this.setState({ spousedata });

        //console.log("MDATA", maindata);


        //const filtermdata = maindata.filter(x => x.riderSuminsured != null)


        //filtermdata[key].benifitOpted = true;

        //this.state.BasePremiumDTO.objProductDetials.basicSumInsured = filtermdata[0].riderSuminsured;
        //this.state.objQuoteMemberDetails[0].objBenefitDetails = filtermdata;

        //  this.GetRiskDetailsFun();
        console.log("SPOUSEDATA", spousedata);
        //this.GetTableforRiders("PremiumCalC");
    }

    GetRiskDetailsFun = () => {



        this.state.BasePremiumDTO.lstIllustation = this.state.lstIllustation;
        this.state.BasePremiumDTO.objProspect = this.state.objProspect;
        this.state.BasePremiumDTO.objProductDetials = this.state.objProductDetials;
        this.state.BasePremiumDTO.objProductDetials.plan = this.state.ProductDTO.ProductId; //this.state.ProductDTO.ProductId as it is hardcoded
        this.state.BasePremiumDTO.objProductDetials.variant = this.state.ProductDTO.PlanId;
        this.state.BasePremiumDTO.objProductDetials.policyTerm = this.state.ProductDTO.premiumData;
        this.state.BasePremiumDTO.objProductDetials.PremiumTerm = this.state.ProductDTO.premiumData;
        // this.state.BasePremiumDTO.objProductDetials.basicSumInsured = 200000;
        this.state.BasePremiumDTO.objProductDetials.preferredMode = 12; //ID Not Properly coming with Master Handel Correctly


        this.state.BasePremiumDTO.objSpouseDetials = this.state.objSpouseDetials;
        this.state.BasePremiumDTO.objChildDetials = this.state.objChildDetials;
        this.state.BasePremiumDTO.listAssured = this.state.listAssured;
        // this.state.objQuoteMemberDetails[0].objBenefitDetails = this.state.objBenefitDetails;
        //this.state.objQuoteMemberDetails = this.state.objQuoteMemberDetails;

        this.state.BasePremiumDTO.objQuoteMemberDetails = this.state.objQuoteMemberDetails;


        console.log("BaseDTO", this.state.BasePremiumDTO);

        ///https://localhost:44347
        ///https://inubeservicesproductconfiguration.azurewebsites.net/api/Product/CalculateQuotePremium?AnnualMode=false

        fetch(`${NewBusinessConfig.ProductConfig}/api/Product/CalculateQuotePremium?AnnualMode=false`, {
            method: 'POST',
            body: JSON.stringify(this.state.BasePremiumDTO),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log("QuotePremium123", data);
                this.setState({ MainLifeData: data.objQuoteMemberDetails[0].objBenefitDetails });
                this.GetTableforRiders("PremiumData");

                // this.setState({ BasePremiumDTO.lstIllustation :  });
                this.state.PremiumResponseDTO = this.state.PremiumResponseDTO.concat(data);
                this.setState({});
                console.log("lstIllustation", this.state.PremiumResponseDTO[0].lstIllustation);
                //this.dataTable(this.state.objQuoteMemberDetails[0].tabIndex);
            });
        this.setState({ CalculateFlag: true });
        // this.GetRidersData();
    }



    SaveQuote = () => {
        console.log("1stDTO", this.state.BasePremiumDTO);
        this.state.BasePremiumDTO.refNo = 1;
        //Get UserName from Prospect Module Pending
        this.state.BasePremiumDTO.userName = this.state.objProspect.userName;
        this.state.BasePremiumDTO.objProductDetials.premiumTerm = this.state.ProductDTO.premiumData;
        this.state.BasePremiumDTO.objProductDetials.pensionPeriod = this.state.ProductDTO.premiumData;
        this.state.BasePremiumDTO.objProductDetials.drawDownPeriod = this.state.ProductDTO.premiumData;
        this.state.BasePremiumDTO.objProductDetials.annualPremium = 0;
        this.state.BasePremiumDTO.objProductDetials.retirementAge = 60;

        //this.state.BasePremiumDTO.objBenefitDetails.annualModeLoadingAmount = "0";
        //this.state.BasePremiumDTO.objBenefitDetails.annualModeDiscountAmount = "0";
        //this.state.BasePremiumDTO.objBenefitDetails.annualModeAnnualpremium = "0";

        console.log("FinalsaveDTO", this.state.BasePremiumDTO);

        fetch(`${NewBusinessConfig.NewBusinessConfigUrl}/api/Quotation/QuotationSave`, {
            method: 'POST',
            body: JSON.stringify(this.state.BasePremiumDTO),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        }).then(response => response.json())
            .then(data => {
                console.log('response', data);
            });



    }


    handleQuoteChange(type, event) {

        const name = event.target.name;
        const obj = this.state.ProductDTO;
        obj[name] = event.target.value;

        ///https://inubeservicesproductconfiguration.azurewebsites.net/api/Product/GetProductMasterAvo?masterType=

        fetch(`${NewBusinessConfig.ProductConfig}/api/Product/GetProductMasterAvo?masterType=` + type + `&parentID=` + event.target.value)
            .then(response => response.json())
            .then(data => {

                if (type == "Plan") {
                    this.setState({ Plandata: data });

                }
                if (type == "Policy Term") {

                    this.setState({ Policydata: data });

                    const filterData = this.state.Plandata.filter(item => item.mID == event.target.value);


                    obj['planCode'] = filterData[0].planCode;
                    this.setState({ obj });
                }
                if (name === "PolicyID") {

                    const filterPolicyData = this.state.Policydata.filter(item => item.mID == event.target.value);
                    obj['premiumData'] = filterPolicyData[0].mValue;

                    console.log("premiumData", filterPolicyData);
                    this.setState({ obj });
                }

            });
        console.log("obj", obj);
        this.setState({ obj });


        if (obj.PlanId != "") {
            fetch(`${NewBusinessConfig.ProductConfig}/api/Product/CheckSpouse?ProductID=` + obj.ProductId + "&PlanID=" + obj.PlanId)
                .then(response => response.json())
                .then(data => {

                    this.setState({ SpouseCheck: data });

                    console.log("SpouseCheck", this.state.SpouseCheck);
                });
        }



    }



    handleChangeEnabled(event) {
        this.setState({ selectedEnabled: event.target.value });
    }
    handleToggle(value) {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked
        });
    }



    handleRadioButton = (event) => {

        this.state.SpouseRadio = event.target.value;

        this.setState({ selectedValue: event.target.value });

        console.log("Selected Radio", this.state.SpouseRadio);


        if (this.state.SpouseRadio == "Yes") {

            this.state.SpouseFlag = true;

            console.log("SpouseYes", this.state.SpouseFlag);
        }
        else {
            this.state.SpouseFlag = false;

            console.log("SpouseNO", this.state.SpouseFlag);
        }

        //for Rendering a page
        this.setState({});
    }

    render() {
        const { classes } = this.props;
        return (
            <GridContainer lg={12}>


                <CardHeader color="rose" icon>

                </CardHeader>
                <CardBody>
                    <GridContainer lg={12}>

                        <GridItem xs={12} sm={12} md={3}>
                            <Dropdown required={true}
                                labelText="Product"
                                id=""
                                //filterName='Product'
                                lstObject={this.state.Productdata}
                                value={this.state.ProductDTO.ProductId}
                                name='ProductId'
                                onChange={(e) => this.handleQuoteChange("Plan", e)}
                                //disabled={this.state.viewdisable}
                                formControlProps={{ fullWidth: true }}
                            />
                        </GridItem>




                        <GridItem xs={6} sm={6} md={3}>

                            <Dropdown
                                labelText="Plan"
                                //id="ddlstatus"
                                lstObject={this.state.Plandata}
                                value={this.state.ProductDTO.PlanId}
                                name='PlanId'
                                onChange={(e) => this.handleQuoteChange("Policy Term", e)}
                                formControlProps={{ fullWidth: true }}
                            />
                        </GridItem>

                        <GridItem xs={6} sm={6} md={3}>

                            <CustomInput
                                labelText="Plan Code"


                                name="planCode"
                                value={this.state.ProductDTO.planCode}

                                disabled="true"
                                formControlProps={{
                                    fullWidth: true
                                }}

                            />
                        </GridItem>

                        <GridItem xs={6} sm={6} md={3}>

                            <Dropdown
                                labelText="Policy Term"
                                //id="ddlstatus"
                                lstObject={this.state.Policydata}
                                filterName='Policy Term'
                                value={this.state.ProductDTO.PolicyID}
                                name='PolicyID'
                                onChange={(e) => this.handleQuoteChange(this.state.PolicyID, e)}
                                formControlProps={{ fullWidth: true }}
                            />

                        </GridItem>


                        <GridItem xs={6} sm={6} md={3}>

                            <CustomInput
                                disabled="true"
                                labelText="Premium Paying Term"
                                //id="ddlstatus"
                                // lstObject={this.state.Policydata}
                                // filterName='Policy Term'
                                value={this.state.ProductDTO.premiumData}
                                name='premium'
                                //  onChange={(e) => this.handleQuoteChange(this.state.PolicyID, e)}
                                formControlProps={{ fullWidth: true }}
                            />

                        </GridItem>

                        {/*    <GridItem xs={6} sm={6} md={4}>

                                <Dropdown
                                    labelText="Preffered Language"
                                    //id="ddlstatus"
                                    lstObject={[]}
                                    filterName='Preffered Language'
                                    //value={props.fields.ClaimsDecisionId}
                                    name='ClaimsDecisionId'
                                    //onChange={props.onInputParamChange}
                                    formControlProps={{ fullWidth: true }}
                                />

                            </GridItem>
                            */}


                        <GridItem xs={6} sm={6} md={3}>

                            <Dropdown
                                labelText="Preffered Mode"
                                //id="ddlstatus"
                                lstObject={this.state.PrefferedMode}
                                //filterName='Preffered Mode'
                                value={this.state.ProductDTO.PrefferedModeID}
                                name='PrefferedModeID'
                                onChange={(e) => this.handleQuoteChange("", e)}
                                formControlProps={{ fullWidth: true }}
                            />

                        </GridItem>







                        {/*   <GridItem xs={6} sm={6} md={4}>

                                <CustomInput
                                    labelText="Basic Sum Assured"
                                    name='basicSum'
                                    id="basicSum"
                                    onChange={(e) => this.handleQuoteChange("", e)}

                                    formControlProps={{
                                        fullWidth: true
                                    }}

                                />
                            </GridItem>

                                              */}


                        {/*   <GridItem xs={6} sm={6} md={4}>

                                                <CustomInput
                                                    labelText="Annual Planned Premium"
                                                    id="Salutation"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        type: "password"
                                                    }}
                                                />
                                            </GridItem>

                                */}


                        {this.state.SpouseCheck && <GridItem xs={6} sm={6} md={4}>

                            <h5><b> Spouse to be covered? </b></h5>

                            <FormControlLabel
                                control={
                                    <Radio
                                        checked={this.state.selectedValue == "Yes"}
                                        onChange={this.handleRadioButton}
                                        value="Yes"
                                        name="Spouse Yes"
                                        aria-label="B"
                                        icon={
                                            <FiberManualRecord
                                                className={classes.radioUnchecked}
                                            />
                                        }
                                        checkedIcon={
                                            <FiberManualRecord
                                                className={classes.radioChecked}
                                            />
                                        }
                                        classes={{
                                            checked: classes.radio,
                                            root: classes.radioRoot
                                        }}
                                    />
                                }
                                classes={{
                                    label: classes.label
                                }}
                                label="Yes"
                            />
                            <FormControlLabel
                                control={
                                    <Radio
                                        checked={this.state.selectedValue == "No"}
                                        onChange={this.handleRadioButton}
                                        value="No"
                                        name="No Spouse"
                                        aria-label="B"
                                        icon={
                                            <FiberManualRecord
                                                className={classes.radioUnchecked}
                                            />
                                        }
                                        checkedIcon={
                                            <FiberManualRecord
                                                className={classes.radioChecked}
                                            />
                                        }
                                        classes={{
                                            checked: classes.radio,
                                            root: classes.radioRoot
                                        }}
                                    />
                                }
                                classes={{
                                    label: classes.label
                                }}
                                label="NO"
                            />


                        </GridItem>}


                        {this.state.SpouseFlag &&


                            <SpouseDetails SpouseMaster={this.state.SpouseMaster} />

                        }


                     


                        <GridContainer justify="center">

                            <GridItem >
                                <div>
                                    <Button color="info"
                                        round className={this.props.classes.marginRight}
                                        //onClick={props.handlepartnerdata}
                                        id="cancelBtn" >
                                        Get Risk Benifits
                                </Button>
                                </div>
                            </GridItem>
                        </GridContainer>



                    </GridContainer>

                    {this.state.RiskFlag && <GridContainer>

                        <GridItem xs={12} >

                            <Accordion
                                active={0}
                                collapses={[
                                    {
                                        title: "Benifit Details",
                                        content: <Benifit SpouseFlag={this.state.SpouseFlag} SpouseRiderTableData={this.state.SpouseRiderTableData} MainRiderTableData={this.state.MainRiderTableData} />

                                    }
                                ]}
                            />

                        </GridItem>


                        <GridContainer justify="center" >
                            <GridItem xs={8} sm={3} md={3} lg={2}>


                                <Button onClick={this.GetRiskDetailsFun}> Calculate </Button>

                            </GridItem>
                        </GridContainer>


                    </GridContainer>}


                    {this.state.CalculateFlag &&

                        <GridContainer>

                            <GridContainer justify="center" >
                                <GridItem xs={8} sm={3} md={3} lg={2}>

                                    <Card>

                                        <center> <h5><b><font color="Blue">Total Premium </font></b></h5> </center>

                                        <center>{this.state.MainLifeData.length > 0 ?

                                            < h5 > <b><font color="Blue">{this.state.MainLifeData[0].totalPremium} </font></b></h5> : <h5> 0 </h5>}</center>

                                    </Card>

                                </GridItem>
                            </GridContainer>



                            <GridItem xs={12}>

                                <h4 >
                                    <small> Illustration </small>
                                </h4>

                                {this.state.PremiumResponseDTO.length > 0 ? <ReactTable
                                    data={this.state.PremiumResponseDTO[0].lstIllustation}
                                    filterable
                                    columns={[
                                        {
                                            Header: "Policy Year",
                                            accessor: "policyYear",
                                            headerClassName: 'react-table-center',
                                            style: { textAlign: "center" },
                                            minWidth: 20,
                                            sortable: false,
                                            //  filterable: false 
                                        },
                                        {

                                            Header: "Annual Planned Premium",
                                            accessor: "basicPremium",
                                            minWidth: 40,
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center'
                                        },
                                        {
                                            Header: "Account Value [4%]",
                                            accessor: "fundBalanceDiv4",
                                            minWidth: 40,
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center'
                                        },
                                        {
                                            Header: "Surrender Value [4%]",
                                            accessor: "surrenderValueDiv4",
                                            minWidth: 40,
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center'
                                        },
                                        {
                                            Header: "Account Value [8%]",
                                            accessor: "fundBalanceDiv8",
                                            minWidth: 40,
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center'
                                        },
                                        {
                                            Header: "Surrender Value [8%]",
                                            accessor: "surrenderValueDiv8",
                                            minWidth: 40,
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center'
                                        },
                                        {
                                            Header: "Account Value [12%]",
                                            accessor: "fundBalanceDiv12",
                                            minWidth: 40,
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center'
                                        },
                                        {
                                            Header: "Surrender Value [12%]",
                                            accessor: "surrenderValueDiv12",
                                            minWidth: 40,
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center'
                                        },



                                    ]}
                                    defaultPageSize={5}
                                    //pageSize={([this.state.PremiumResponseDTO.length + 1] < 5) ?
                                    //    [this.state.PremiumResponseDTO.length + 1] : 5}
                                    showPaginationTop={false}
                                    showPaginationBottom
                                    className="-striped -highlight discription-tab"
                                //loading={this.state.newdata}

                                //   loadingText="coming"
                                /> : <center>< svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                                    <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
                                </svg>
                                    </center>}

                            </GridItem>

                            <GridContainer justify="center" >
                                <GridItem xs={8} sm={3} md={3} lg={2}>


                                    <Button onClick={this.SaveQuote}> Save Quote </Button>

                                </GridItem>
                            </GridContainer>

                        </GridContainer>

                    }




                </CardBody>


            </GridContainer>





        );
    }
}

export default withStyles(regularFormsStyle)(RegularForms);
