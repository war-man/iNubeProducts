import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import $ from 'jquery';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import ReactTable from "react-table";
import user from "assets/img/user.png";
import Modify from "./Modify.jsx";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Switch from "@material-ui/core/Switch";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Edit from "@material-ui/icons/Edit";
import ProspectScreen from './ProspectScreen.jsx';
import NeedIdentification from './NeedIdentification.jsx';
import NeedAnalysis from './NeedAnalysis.jsx';
import PersonalInformation from './PersonalInformation.jsx';
import swal from 'sweetalert';
import NewBusinessConfig from 'modules/NewBusiness/NewBusinessConfig.js';
import RegularForms from 'modules/NewBusiness/Prospect/NeedAnalysisCompleted.jsx';
import { Redirect } from 'react-router-dom';
import Quotation from '../Quotation/Quotation.jsx';
import { Animated } from "react-animated-css";
import Calculator from "./Calculator.jsx";
import Retirement from "./Retirement.jsx";
import Health from "./Health.jsx";
import Education from "./Education.jsx";
import HumanValue from "./HumanValues.jsx";
import Savings from "./Savings.jsx";

//const dataTable = {
//    headerRow: ["Type", "Lead Number", "Lead Date", "Proposer Name", "dob", "Place", "Actions"],
//    // footerRow: ["Type", "Position", "Office", "Age", "Actions"],
//    dataRows: [
//        ["OWN", "1000020", "12-06-2019", "MR ASLAM SHEIK", "31-01-1986", "DUBAI", ""],
//        ["OWN", "1000016", "12-06-2019", "MR RAVI CHANDRAN", "13-04-1980", "BANGALORE", ""],
//        ["OWN", "1000016", "11-06-2019", "MR DINESH TIWARI", "31-01-1987", "DUBAI", ""],
//        ["OWN", "1000015", "09-06-2019", "MR GANESH KUMAR", "09-04-1985", "BANGALORE", ""],
//        ["OWN", "1000007", "09-06-2019", "MR RAVI CHANDRAN", "31-01-1987", "DUBAI", ""],


//    ]
//};

const searchClose = {
    float: "right",
    position: 'relative',
    width: "26px",
    height: "28px",
    borderRadius: "4px",
    fontSize: "larger",
    padding: "0px",
    right: '10px',

}
const searchBtn = {
    left: "140%",

}
const popup = {
    marginleft: "115px",
    marginright: "- 71px",
}
const styles = theme => ({
    paper: {
        position: 'absolute',
        width: '60%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',

    },
});


class NeedAnalysisCompleted extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            calcObj: {
                interval: "",
                redirect: false,
                interval1: "",
                interval2: "",
                Retirement: false,
                Health: false,
                Education: false,
                Savings: false,
                HumanVal: false,
                display: false,
                fundbalflag: true,
                ddldata: [],
                ddlvals: [],
                data: [],
                data2: [],
                data3: [],
                tabledata: [],
            },
         


            Checked: false,
            openCal: false,
            editModal: false,
            showCalc: false,
            showFNA: false,
            contactId: 0,
            Policydetailsdata: ["pks"],
            editModal: false,
            btnvisibility: false,
            disabled: false,
            open: false,
            simpleSelect: "",
            selectedValue: null,
            masterList: [],
            Policydetails: [],
            rowData: [],
            ProspectData: [],
            eventId: "",
            policyNumber: "",
            //display: false,
            PartnerData: [],
            ProductData: [],
            datalist: [],
            PolicyData: [],
            FinancilaObligationsData: [],
            FinancialObligations: [],
            healthAdversitiesData: [],
            FOSelected: [],
            AvailableddlData: [],
            HealthMasddlDTO: [{
                "availableAnnualAmount": null,
                "coverage": null,
                "adequecy": null
            }],
            //contactid:0,
            needid: false,
            Policydata: {
                PartnerId: "",
            },
            show: false,
            submitshow: false,
            dataRows: [],
            AvailableAnnualAmountDTO: [],
            ProspectpoolDTO: [{
                "prospectId": 0,
                "ageAtNxtBday": 0,
                "prospectType": "",
                "prospectName": "",
                "prospectLastName": "",
                "prospectMobile": "",
                "prospectHome": "",
                "prospectWork": "",
                "prospectEmail": "",
                "prospectNicNo": "",
                "leadNo": "",
                "leadDate": null,
                "dob": null,
                "place": "",
                "salutation": "",
                "prospectDaysleft": 0,
                "fullName": "",

            }],
            PersonalInfoDTO: [{
                "fullName": "",
                "objPreviousInsuranceList": [],
                "objProspectPool": [],
                "prospectStage": 0,
                "contactID": 0,
                "createdBy": null,
                "type": "",
                "email": "",
                "work": "",
                "home": "",
                "ageNextBdy": 0,
                "currentAge": 0,
                "dateofBirth": null,
                "occupation": null,
                "mobile": "",
                "clientCode": null,
                "nationality": null,
                "employerName": null,
                "nic": null,
                "bmI_Exceed": false,
                "nicavail": false,
                "gender": null,
                "maritalStatus": null,
                "displayMaritalStatus": null,
                "avgMonthlyIncome": null,
                "message": null,
                "assignedTo": null,
                "introducerCode": null,
                "needAnalysisDTO": null,
                "salutation": null,
                "passPort": null,
                "place": null,
                "samsLeadNumber": null,
                "objAddress": null,
                "name": "",
                "lastName": ""
            }],
            RetirementCalculatorDTO: [{
                "contactId": "",
                "fromYear": null,
                "toYear": null,
                "inflationRate": null,
                "planNoYears": null,
                "intrestRate": null,
                "totalMonthlyExpense": null,
                "estimatedTotalMonthlyExpense": null,
                "foodExpense": null,
                "waterExpense": "",
                "rentExpense": "",
                "leaseExpense": "",
                "transportExpense": "",
                "medicineExpense": "",
                "educationExpense": "",
                "clothesExpense": "",
                "entertainmentExpense": "",
                "charityExpense": "",
                "otherExpense": "",
                "estimatedFoodExpense": "",
                "estimatedWaterExpense": "",
                "estimatedRentExpense": "",
                "estimatedLeaseExpense": "",
                "estimatedTransportExpense": "",
                "estimatedMedicineExpense": "",
                "estimatedEducationExpense": "",
                "estimatedClothesExpense": "",
                "estimatedEntertainmentExpense": "",
                "estimatedCharityExpense": "",
                "estimatedOtherExpense": "",
                "currentEPFBalance": "",
                "estimatedEPFBalance": "",
                "currentETFBalance": "",
                "estimatedETFBalance": "",
                "monthlyAllocation20": "",
                "monthlyAllocation3": "",
                "salary": "",
                "currentGratuityFund": "",
                "estimatedGratuityFund": "",
                "totalRetirementFund": "",
                "fundBalanceTotal": null,
                "perAnnumIncome": null,
                "exsitingotherincome": null,
                "estimatedAnnuallivingExpenses": null,
                "annualIncomeSurplus": null,
                "monthlyPensionGap": null
            }],


            //prospect pool data
            ProspectDTO: [],

            //Radio Button filterd data Storing
            RadioFilterData: [],


            RetirementDTO: [],
            filterdata: [],
            value: null,
            arrayValue: [],
            HealthCalDTO: [{
                "criticalRequiremenent": "",
                "criticalFund": 0,
                "criticalGap": "",
                "hospitalizationRequiremenent": "",
                "hospitalizationFund": 0,
                "hospitalizationGap": "",
                "additionalexpenseRequiremenent": "",
                "additionalexpenseFund": 0,
                "additionalexpenseGap": "",
                "objadversities": [
                    "Major Surgeries"
                ],
                "objcoverage": "",
                "objadequacy": "",
                "hospitalBills": "",
                "objannualamount": "",
                "hospitalRtrExp": "",
                "healthAdversities": null,
                "annualAmountHealthExp": null,


            }],
        };
        this.handleChange = this.handleChange.bind(this);
        this.selectMultipleOption = this.selectMultipleOption.bind(this);
        this.handleChangeCalc = this.handleChangeCalc.bind(this);
    }




    handleddtChange = (currentNode, selectedNodes) => {
        this.state.FinancialObligations.push(selectedNodes);
        console.log("FOPushedVals", this.state.FinancialObligations);
    }

    selectMultipleOption(value) {
        //console.count('onChange')
        //console.log("Val", value);
        this.setState({ arrayValue: value });
        console.log("arrayval", this.state.arrayValue)
    }

    showRetirement = () => {
        let flag = this.state.calcObj;
        flag.Retirement = true;
        flag.Health = false;
        flag.Education = false;
        flag.Savings = false;
        flag.HumanVal = false;
        this.setState({ flag });
    };

    showHealth = () => {
        let flag = this.state.calcObj;
        flag.Retirement = false;
        flag.Health = true;
        flag.Education = false;
        flag.Savings = false;
        flag.HumanVal = false;
        this.setState({ flag });
    };

    showEducation = () => {
        let flag = this.state.calcObj;
        flag.Retirement = false;
        flag.Health = false;
        flag.Education = true;
        flag.Savings = false;
        flag.HumanVal = false;
        this.setState({ flag });
    };

    showSavings = () => {
        let flag = this.state.calcObj;
        flag.Retirement = false;
        flag.Health = false;
        flag.Education = false;
        flag.Savings = true;
        flag.HumanVal = false;
        this.setState({ flag });
    };

    showHumanValue = () => {
        let flag = this.state.calcObj;
        flag.Retirement = false;
        flag.Health = false;
        flag.Education = false;
        flag.Savings = false;
        flag.HumanVal = true;
        this.setState({ flag });
    };



    handleSimple = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleChangeCalc = (e) => {
        debugger;
        //console.log("checked state: ", this.state.Checked)
        console.log("checked: ", e.target.checked);
        //let objcal = this.state.calcObj;
        this.setState({ Checked: e.target.checked });

        // console.log('checked', this.state.calcObj.Checked);
        if (e.target.checked == true) {
            this.setState({
                display: true
            })
            this.dataRetirement();
        }
        else {
            this.setState({
                display: false
            })
        }
    }
    fundbal = () => {
        this.setState({
            fundbalflag: false
        })
    }


    SetValue = (event) => {

        event.preventDefault();
        let PTDTO = this.state.PersonalInfoDTO;
        let name = event.target.name;
        let value = event.target.value;
        PTDTO[0][name] = value;
        this.setState({ PTDTO });

    }
    HealthddlSetValue = ((type, event) => {

        event.preventDefault();
        let HealthMasddlDTO = this.state.LeadDTO;
        let name = event.target.name;
        let value = event.target.value;
        HealthMasddlDTO[name] = value;
        this.setState({ HealthMasddlDTO })
        this.change(event, name, type);
    });
    RetCalSetValue = (event) => {
        debugger;
        event.preventDefault();
        let RTRDTO = this.state.RetirementCalculatorDTO[0];
        let name = event.target.name;
        let value = event.target.value;
        RTRDTO[name] = value;
        this.setState({ RTRDTO });

    }

    datatable = (columndata) => {
        this.setState({
            newdata: columndata.map((prop, key) => {
                const { classes } = this.props;
                console.log("prop data", prop);
                console.log("send data", key);
                console.log("contid", prop);
                return {
                    id: key,
                    Type: prop.prospectType,
                    LeadNo: prop.leadNo,
                    LeadDate: prop.leadDate,
                    ProposerName: prop.fullName,
                    Dob: prop.dob,
                    Place: prop.place,
                    radio: < input type="radio" name="radio" onClick={this.editFunction.bind(this, key, prop.contactId)} />,

                    //Mobile: prop.mobileNo,

                    actions: (
                        <div className="actions-right">
                            <Button color="info" justIcon round simple className="edit" onClick={() => this.edittable(prop.contactId)}><Edit /></Button>
                        </div>

                    )
                };
            })
        });
    }

    editFunction(id, pId) {

        var orgArr = this.state.ProspectDTO
        var userArr = [];

        $.each(orgArr, function (k, v) {
            if (v.contactId == pId) {
                userArr.push(orgArr[id]);
            }
        })
        const userdata = userArr;
        console.log("UserData", userdata)
        //const username = userArr[0].firstName;
        //this.state.rowData = userArr[0];
        this.state.RadioFilterData = userdata;
        //this.setState({ RadioFilterDataTrial: userdata });

        console.log("RadioFilterdata", this.state.RadioFilterData)

        ////state.userId = userdata;
        //this.state.UserData = this.state.rowData;
        //this.setState({ state });
    }



    datatablehealth = (healthcolumndata) => {
        this.setState({
            healthdata: healthcolumndata.map((prop, key) => {
                const { classes } = this.props;
                console.log("health prop data", prop);
                console.log("send health data", key);
                console.log("health contid", prop);
                return {
                    id: key,
                    CurrentReq: prop.CurrentReq,
                    AvailableFund: prop.AvailableFund,
                    Gap: prop.Gap,

                    actions: (
                        <div className="actions-right">
                            <Button color="info" justIcon round simple className="edit" onClick={() => this.edittable(prop.contactId)}><Edit /></Button>
                        </div>
                    )
                };
            })
        });
    }


    dataRetirement = (prop, key) => {
        const calc = this.state.calcObj;
        console.log("rrrdto", this.state.dataRows3);
        calc['data2'] = this.state.dataRows3.map((prop, key) => {
            return {
                id: key,
                CatagoryType: prop,
                CML: <CustomInput labelText=""
                    id="productname" formControlProps={{ fullWidth: true }}
                    name="prop"
                    value={this.state.RetirementCalculatorDTO[0].foodExpense}
                    //onChange={(e) => this.RetCalSetValue(e)}
                    onChange={(e) => this.onChangeRet(e, key)}
                    formControlProps={{
                        fullWidth: true
                    }}
                    inputProps={{
                        type: "name"
                    }}
                />,
                EME: <CustomInput labelText=""
                    id="productname"
                    value={this.state.RetirementCalculatorDTO[0].estimatedFoodExpense}
                    formControlProps={{ fullWidth: true }} />,
                actions: (
                    <div className="actions-right">
                        <Button color="info" justIcon round simple className="edit" onClick={() => this.edittable(prop.contactID)}><Edit /></Button>
                    </div>
                )
            };
        })

        this.setState({ calc });
    }



    onChangeRet = (e, key) => {
        debugger;
        if (key == 0) {
            this.state.RetirementCalculatorDTO[0].foodExpense = e.target.value;
            console.log("RetirementCalculatorDTO", this.state.RetirementCalculatorDTO)
        }

    }

    caledit = () => {

        this.setState({
            openCal: true,
            showCalc: true,
            showFNA: false,
        });
        swal({
            //title: "Good job!",
            text: "Currently, we have X% of customers with same profile",
            icon: "warning",
            button: "Close",
        });

    };

    FNAedit = () => {
        this.setState({
            openCal: true,
            showCalc: false,
            showFNA: true,
        });
        swal({
            //title: "Good job!",
            text: "Currently, we have X% of customers with same profile",
            icon: "warning",
            button: "Close",
        });
    };

    componentDidMount() {
        fetch(`${NewBusinessConfig.NewBusinessConfigUrl}/api/NeedAnalysis/GetProspectPool`)
            .then(response => response.json())
            .then(data => {
                //this.setState({ masterList: data });
                console.log("dataaa", data);
                let rowdata = this.state.dataRows3;

                //for (let i = 0; i < data[0].mdata.length; i++) {
                //    rowdata.push(data[0].mdata[i].mValue);
                //}
                //this.setState({ rowdata });
                //console.log(" dtrowsmas", rowdata);

                //this.datatable(data);
            });

        fetch(`${NewBusinessConfig.NewBusinessConfigUrl}/api/NeedAnalysis/GetMaster?lMasterlist=qwer&isFilter=true`)
            .then(response => response.json())
            .then(data => {
                this.setState({ masterList: data });
                console.log("masterlist", data);
                this.filterData(data);
            });


        fetch(`${NewBusinessConfig.NewBusinessConfigUrl}/api/NeedAnalysis/GetProspectPool`)
            .then(response => response.json())
            .then(data => {
                this.setState({ ProspectDTO: data });
                console.log(" dtrows", this.state.ProspectDTO);
                this.datatable(data);
            });
    }

    filterData = (data) => {
        const FinancilaObligations = data.filter(item => item.mType == "Financial Obligations")
        this.setState({ FinancilaObligationsData: FinancilaObligations })
        console.log(this.state.FinancilaObligationsData[0].mdata, 'lsdata')


        const healthAdvertise = data.filter(item => item.mType == "Health Adversity")
        this.setState({ healthAdversitiesData: healthAdvertise })
        console.log(this.state.healthAdversitiesData[0].mdata, 'hadata')

        const Advertiseddl = data.filter(item => item.mType == "Available Annual Amount")
        this.setState({ AvailableddlData: Advertiseddl })
        console.log(this.state.Advertiseddl, 'Addata')

    }
    edittable = (contactid) => {
        this.setState({ open: true });
        fetch(`${NewBusinessConfig.NewBusinessConfigUrl}/api/NeedAnalysis/LoadPersonalInformation?ContactID=` + contactid, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(response => response.json())
            .then(data => {
                // this.datatable(data);
                this.setState({ PersonalInfoDTO: data });
                console.log("suspectinfo", this.state.PersonalInfoDTO, data);
            });

        fetch(`${NewBusinessConfig.NewBusinessConfigUrl}/api/NeedAnalysis/GetCalcRetirement?contactId=` + contactid, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                // this.datatable(data);
                this.setState({ RetirementCalculatorDTO: data, data2: data });
                console.log("retirement", this.state.RetirementCalculatorDTO, data);
                console.log("retirementd", data);

            });
        fetch(`${NewBusinessConfig.NewBusinessConfigUrl}/api/NeedAnalysis/GetHealthCalc?contactId=` + contactid, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                // this.datatable(data);
                this.setState({ HealthCalDTO: data });
                console.log("healthDto", this.state.HealthCalDTO, data);

            });
    }


    handleClose = () => {

        this.setState({
            open: false,
            openCal: false,
        });

    };

    handleChange = () => {
        this.setState({ show: true })
    }
    CreateQuoteFun = () => {
        this.setState({ redirect: true });
        this.renderRedirect();
    }
    renderRedirect = () => {
        if (this.state.redirect == true) {
            return <Redirect to={{
                pathname: '/Quotation',
                state: {

                    RadioFilterData: this.state.RadioFilterData
                }
            }} />
        }
    }
    render() {
        const { classes } = this.props;

        return (
            <GridContainer xl={12}>
                
                    <GridItem lg={12}>

                        <CardBody>
                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>

                            <NeedAnalysis data2={this.state.calcObj.data2} data3={this.state.calcObj.data3}
                                calcObj={this.state.calcObj} classes={this.classes}
                                handleChange={this.handleChange}

                                display={this.state.display}
                                RetirementCalculatorDTO={this.state.RetirementCalculatorDTO}
                                RetCalSetValue={this.RetCalSetValue} checked={this.state.checked} handleChangeCalc={this.handleChangeCalc}
                                Checked={this.state.Checked} display={this.state.display} FinancilaObligationsData={this.state.FinancilaObligationsData}
                                handleddtChange={this.handleddtChange} showRetirement={this.showRetirement} showHealth={this.showHealth}
                                showEducation={this.showEducation} showSavings={this.showSavings} showHumanValue={this.showHumanValue}
                                healthAdversitiesData={this.state.healthAdversitiesData} HealthMasddlDTO={this.state.HealthMasddlDTO}
                                masterList={this.state.masterList} openCal={this.state.openCal} showCalc={this.state.showCalc}
                                showFNA={this.state.showFNA} caledit={this.caledit} handleClose={this.handleClose} FNAedit={this.FNAedit}
                            />

                            </Animated>
                        </CardBody>



                    </GridItem>
             
            </GridContainer >
        );


    }


}


export default withStyles(styles)(NeedAnalysisCompleted);