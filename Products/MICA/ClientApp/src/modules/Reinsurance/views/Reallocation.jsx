import React from "react";
import Radio from "@material-ui/core/Radio";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import role from "assets/img/users.png";
import Paper from '@material-ui/core/Paper';
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ReactTable from 'components/MuiTable/MuiTable.jsx';
import { Animated } from "react-animated-css";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import ReinsuranceConfig from "modules/Reinsurance/ReinsuranceConfig.js";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import Add from "@material-ui/icons/AddCircleOutline";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import Visibility from "@material-ui/icons/Visibility";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import DefineMapping from "modules/Reinsurance/views/DefineMapping.jsx";
import Modal from '@material-ui/core/Modal';
import swal from 'sweetalert';
import { Redirect } from 'react-router-dom';
import ParticipantGrid from "modules/Reinsurance/views/_AddParticipantGrid.jsx";
import AddParticipant from "modules/Reinsurance/views/AddParticipant.jsx";
const style = {
    infoText: {
        fontWeight: "300",
        margin: "10px 0 30px",
        textAlign: "center"
    },
    inputAdornmentIcon: {
        color: "#555"
    },
    choiche: {
        textAlign: "center",
        cursor: "pointer",
        marginTop: "20px"
    },
    ...customSelectStyle,
    ...customCheckboxRadioSwitch
};

class Reallocation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            facadjustrealloc: "",
            total: 0,
            facadjustprem: "",
            dynamicList: [],
            indexList: [],
            redirect: false,
            rimasterList: [],
            bkmasterList: [],
            bkbcmasterList: [],
            bcmasterList: [],
            qoutaflag: false,
            Participantflag: false,
            showparticipantgrid: false,
            yearmasterlist: [],
            newdata: [],
            masterList: [],
            masterLists: [],
            reallocationlist: {},
            rimapId: "",
            showMapping: false,
            showRetentionflag: false,
            SelectedId: "",
            QuotaShare: false,
            surplus: false,
            rimappingId: "",
            faclist:[],
            reallocationparticiant: {
                ParticipantId: "",
                ReInsurerId: "",
                ReinsurerBranchId: "",
                BrokerId: "",
                BrokerBranchId: "",
                Branch: "",
                Share: "",
                CommissionRate: "",
                BrokerageRate: "",
                Commission: "",
                Brokerage: "",
                AllocatedAmount: "",
                AllocatedPremium: ""
            },
            Modifydto: {
                allocationAmount: "",
                Level: "",
                Name: "",
                mappingId: "",
                policyNo: "",
                premium: "",
                allocationDetails: ""

            },
            Policydto: {
                policynumber: ""
            },
            //treaty(reallocation)
            participant: {
                "reInsurerId": "",
                "brokername": "",
                "reinsurername": "",
                "reInsurerBranchId": "",
                "brokerId": "",
                "brokerBranchId": "",
                "sharePercentage": "",
                "brokeragePercentage": "",
                "ricommissionPercentage": "",
                "bordereauxFreqId": "",
                "status": "",
                "isActive": "y"
            },
            participantdto: [],
            participantdetail: {
                "reInsurerId": "",
                "brokername": "",
                "reinsurername": "",
                "reInsurerBranchId": "",
                "brokerId": "",
                "brokerBranchId": "",
                "sharePercentage": "",
                "brokeragePercentage": "",
                "ricommissionPercentage": "",
                "bordereauxFreqId": "",
                "status": "",
                "isActive": "y"
            },
            treatyDTO: {
                //"treatyType": "",
                //"treatyCode": "",
                //"stausType": "",
                //"treatyDescription": "",
                //"treatyCategoryId": "",
                //"treatyTypeId": "",
                //"treatyYear": "",
                //"startDate": "",
                //"endDate": "",
                //"treatyBasisId": "",
                //"accountingToId": "",
                //"currencyId": "",
                //"borderauxFreqId": "",
                //"statusId": "",
                //"remarks": "",
                //"isActive": "Y",
                //"isApproved": "Y",
                "treatyCode": "",
                "treatyDescription": "",
                "treatyCategoryId": "",
                "treatyTypeId": "",
                "treatyYearId": "",
                "startDate": "",
                "endDate": "",
                "treatyBasisId": "",
                "accountingToId": "",
                "currencyId": "",
                "borderauxFreqId": "",
                "statusId": "",
                "remarks": "",
                "isActive": "",
                "isApproved": "",
                "treatyYear": "",
                //"tblParticipant": [
                //           {
                //               "reInsurerId": 0,
                //               "reInsurerBranchId": 0,
                //               "brokerId": 0,
                //               "brokerBranchId": 0,
                //               "sharePercentage": 0,
                //               "brokeragePercentage": 0,
                //               "ricommissionPercentage": 0,
                //               "bordereauxFreqId": 0,
                //               "status": 0,
                //               "createdDate": "",
                //               "modifiedDate": "",
                //               "isActive": "",
                //           }
                //       ],
                "tblParticipant": [],
                "tblTreatyGroup": []

            },
            CalculationDTO: {
                //policynumber: "",
                policystartdate: "",
                policyenddate: "",
                Name: "",
                Level: "",
                type: "",
                PremiumAmount: "",
                AllocationAmount: "",
                MapDetails: [

                    {
                        Type: "",
                        Percentage: "",
                        Limit: "",
                        AllocationBasis: "",
                        NoOfLines: "",
                        AllocatedAmount: "",
                        AllocatedPremium: "",
                        Adjustment: "",
                        retentionadded: "",
                        Reallocatedpremium: "",
                        Participant: [
                            {
                                ParticipantId: "",
                                Branch: "",
                                Share: "",
                                CommissionRate: "",
                                BrokerageRate: "",
                                Commission: "",
                                Brokerage: "",
                                AllocatedAmount: "",
                                AllocatedPremium: ""
                            }
                        ]
                    },
                    {
                        Type1: "",
                        Percentage: "",
                        Limit: "",
                        AllocationBasis: "",
                        NoOfLines: "",
                        AllocatedAmount: "",
                        AllocatedPremium: "",
                        Participant: [
                            {
                                ParticipantId: "",
                                Branch: "",
                                Share: "",
                                CommissionRate: "",
                                BrokerageRate: "",
                                Commission: "",
                                Brokerage: "",
                                AllocatedAmount: "",
                                AllocatedPremium: ""
                            }
                        ]
                    },
                    {
                        Type2: "",
                        Percentage: "",
                        Limit: "",
                        AllocationBasis: "",
                        NoOfLines: "",
                        AllocatedAmount: "",
                        AllocatedPremium: "",
                        Participant: [
                            {
                                ParticipantId: "",
                                Branch: "",
                                Share: "",
                                CommissionRate: "",
                                BrokerageRate: "",
                                Commission: "",
                                Brokerage: "",
                                AllocatedAmount: "",
                                AllocatedPremium: ""
                            }
                        ]
                    }
                ]
            }
        };

    }
    //renderRedirect = () => {
    //    if (this.state.redirect === true) {
    //        return <Redirect to={{
    //            pathname: '/Reinsurance/ParticipantMaster',

    //        }} />
    //    }
    //}
    onddChange = (evt, id, name) => {
        debugger;
        const Data = this.state.participant;
        Data[evt.target.name] = evt.target.value;
        this.setState({ Data });
        console.log("Data2:", this.state.treatyDTO, this.state.reinsurerCode)
        console.log('data1', this.state.participant)
        this.state.reallocationparticiant.ReInsurerId = this.state.participant.reInsurerId;
        this.state.reallocationparticiant.ReinsurerBranchId = this.state.participant.reInsurerBranchId;
        this.state.reallocationparticiant.BrokerId = this.state.participant.brokerId;
        this.state.reallocationparticiant.BrokerBranchId = this.state.participant.brokerBranchId;
        this.state.reallocationparticiant.Share = this.state.participant.sharePercentage;
        this.state.reallocationparticiant.BrokerageRate = this.state.participant.brokeragePercentage;
        this.state.reallocationparticiant.CommissionRate = this.state.participant.ricommissionPercentage;
        console.log("Facvlue", this.state.facadjustrealloc);
        console.log("Facvlue1", this.state.facadjustprem);
        console.log("Facvlue2", this.state.participant.sharePercentage);
        // console.log("Facvlue3", this.state.reallocationparticiant.AllocatedPremium);
        console.log("Facvlue4", this.state.participant.ricommissionPercentage);
        console.log("Facvlue5", this.state.participant.brokeragePercentage);
        console.log('share', this.state.participant.sharePercentage);
        this.state.reallocationparticiant.AllocatedAmount = ((this.state.facadjustrealloc * (parseInt(this.state.participant.sharePercentage))) / 100).toFixed(2);
        this.state.reallocationparticiant.AllocatedPremium = ((this.state.facadjustprem * (parseInt(this.state.participant.sharePercentage))) / 100).toFixed(2);
        this.state.reallocationparticiant.Commission = ((this.state.reallocationparticiant.AllocatedPremium * (this.state.participant.ricommissionPercentage)) / 100).toFixed(2);
        this.state.reallocationparticiant.Brokerage = ((this.state.reallocationparticiant.AllocatedPremium * (this.state.participant.brokeragePercentage)) / 100).toFixed(2);
        this.setState({});
        console.log('data3', this.state.reallocationparticiant);
        if (evt.target.name == 'reInsurerId') {
            //let  temp = this.state.rimasterList[0].mdata.filter(x => x.mID == evt.target.value);
            //  this.state.ddllist = [...this.state.ddllist, ...temp];
            fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/GetBrachCode?participantMasterId=` + evt.target.value, {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log("bcmasterList: ", data);
                    this.setState({ bcmasterList: data });


                    console.log("bcmasterList", this.state.bcmasterList);
                });
        }
        if (name == 'reInsurerBranchId' && this.state.bcmasterList != null) {
            //let temp = this.state.bcmasterList[0].mdata.filter(x => x.mID == evt.target.value);
            //this.state.ddllist = [...this.state.ddllist,...temp];
            //console.log("branchCode", this.state.bcmasterList, this.state.branchCode)
        }
        if (name == 'bordereauxFreqId' && this.state.masterList != null) {
            //this.state.brodreuxfreq = this.state.masterList[4].mdata.filter(x => x.mID == evt.target.value)[0].mValue;
            //console.log("branchCode", this.state.bcmasterList, this.state.brodreuxfreq)
        }
        console.log("this.state.rimasterList", this.state.rimasterList[0].mdata);
        if (name == 'reInsurerId') {
            let paricipantCode = this.state.rimasterList[0].mdata.filter(x => x.mID == evt.target.value)[0].mValue;
            console.log("paricipantName", paricipantCode);
            fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/GetParticipantNameByCode?participantcode=` + paricipantCode, {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log("dataList: ", data);
                    if (data != null) {
                        this.state.participant.reinsurername = data[0].participantName;
                        this.state.participantdetail.reinsurername = data[0].participantName;
                    }
                    this.setState({});
                });
        }
        let PData = this.state.participantdetail;
        PData[evt.target.name] = evt.currentTarget.innerText;
        this.setState({ PData });

        console.log("innertxt", evt.currentTarget.innerText, this.state.participantdetail);
    }
    onparticipantInputChange = (evt) => {
        debugger
        let name = evt.target.name;
        let value = evt.target.value;
        let Data = this.state.participant;
        Data[name] = value;
        this.setState({ Data });
        let PData = this.state.participantdetail;
        PData[evt.target.name] = evt.currentTarget.innerText;
        this.state.participantdetail.ricommissionPercentage = this.state.participant.ricommissionPercentage;
        this.state.participantdetail.sharePercentage = this.state.participant.sharePercentage;
        this.state.participantdetail.brokeragePercentage = this.state.participant.brokeragePercentage;
        this.setState({ PData });
        console.log("Data1", this.state.treatyDTO, evt.currentTarget.innerText, this.state.participantdetail)
        //this.change(evt, name, type);
    }
    handleParticipant = () => {
        debugger;
        this.setState({ Participantflag: true });
        //this.renderRedirect();
    }
    onInputChange = (evt) => {

        //const Data = this.state.CalculationDTO;
        //Data[evt.target.name] = evt.target.value;
        //this.setState({ Data });
        //const Data2 = this.state.CalculationDTO
        //Data2[evt.target.name] = evt.target.value;
        //this.setState({ Data2 });
        //const Data3 = this.state.CalculationDTO.MapDetails[0];
        //Data3[evt.target.name] = evt.target.value;
        //this.setState({ Data3 });
        //const Data4 = this.state.CalculationDTO.MapDetails[1];
        //Data4[evt.target.name] = evt.target.value;
        //this.setState({ Data4 });
        const Data1 = this.state.Policydto;
        Data1[evt.target.name] = evt.target.value;
        this.setState({ Data1 });
        console.log("Data", this.state.CalculationDTO)
        //const Data5 = this.state.masterList
        //Data5[evt.target.name] = evt.target.value;
        //this.setState({ Data5 });


        //var d = this.state.masterList;

        // console.log("c", c);

        //if (this.state.masterList.Type == "Retention") {
        //    this.state.CalculationDTO.MapDetails[0].retentionadded = ((this.state.masterList.AllocatedAmount * this.state.CalculationDTO.MapDetails[0].Adjustment) / 100);
        //    console.log("Data1", this.state.CalculationDTO.MapDetails[0].retentionadded)
        //    this.state.CalculationDTO.MapDetails[0].Reallocatedpremium = ((this.state.masterList.AllocatedPremium * this.state.CalculationDTO.MapDetails[0].Adjustment) / 100);
        //    console.log("Data1", this.state.CalculationDTO.MapDetails[0].retentionadded)
        //}
    }
    onInputChange1 = (evt) => {
        //this.state.reallocationlist = this.state.masterList;
        const Data = this.state.reallocationlist;
        Data[evt.target.name] = evt.target.value;
        //const Data1 = this.state.reallocationlist.mapDetails[index];
        //Data1[evt.target.name] = evt.target.value;
        this.setState({ Data });
        //this.setState({ Data1 });


    }
    deleteParticipantRecord = (index) => {
        debugger
        let deldata = this.state.treatyDTO.tblParticipant.splice(index, 1);
        let deldatas = this.state.participantdto.splice(index, 1);
        //let deldata = this.state.treatydata.filter(item => item.treatyGroup !== index);
        this.setState({ deldata, deldatas })
        console.log("deldata", this.state.deldata);
        this.dataTable();
    }
    onInputChange2 = (evt, index) => {

        //this.state.reallocationlist = this.state.masterList;



        console.log("calculatedValue1", this.state.CalculationDTO.MapDetails[0].retentionadded);
        const Data = this.state.reallocationlist.mapDetails;
        Data[index][evt.target.name] = evt.target.value;
        //const Data1 = this.state.reallocationlist.mapDetails[index];
        //Data1[evt.target.name] = evt.target.value;
        this.setState({ Data });
        //this.setState({ Data1 });
        console.log("reallocationlist", this.state.reallocationlist.mapDetails, this.state.masterLists);
        let caldata;
        let calpremium;
        let splist = this.state.masterLists.filter(s => s.Type == "Surplus");
        let SPcount = splist.length;
        let deductionAmount = 0;
        let deductionPremiumAmount = 0;
        let TSTotal = 100;
        let TotalSuminsured;
        let TotalPremium;
        let facadjustamount = 0;
        let facpremium = 0;
        let qssuminsuared;
        let qspremium;
        let qssuminsuared1;
        let qspremium1;
        let qssuminsuared2;
        let qspremium2;
        let surplusadjustsi;
        let surplusadjustpremium;

        //console.log("d", d);
        let QSTotal = this.state.masterLists.reduce((sum, m) => { if (m.Type == "QS") { return (sum + m.AllocatedAmount) } else { return (sum + 0) } }, 0);
        let QSPremiumTotal = this.state.masterLists.reduce((sum, m) => { if (m.Type == "QS") { return (sum + m.AllocatedPremium) } else { return (sum + 0) } }, 0);
        let QSTSTotal = this.state.masterLists.reduce((sum, m) => { if (m.Type == "QS") { return (sum + m.Percentage) } else { return (sum + 0) } }, 0);
        console.log("calorieTotal", QSTotal, QSPremiumTotal, QSTSTotal)

        let spParcentage = 0;
        this.state.masterLists.map((item, key) => {
            let type = item.Type;
            if (type == "Retention") {

                spParcentage = TSTotal - ((Number(QSTSTotal)) + Number(this.state.reallocationlist.mapDetails[key].Percentage));
                console.log("spParcentage", this.state.reallocationlist.mapDetails[key].Percentage, spParcentage);
                caldata = ((this.state.reallocationlist.AllocationAmount * this.state.reallocationlist.mapDetails[key].Percentage) / 100);
                calpremium = ((this.state.reallocationlist.PremiumAmount * this.state.reallocationlist.mapDetails[key].Percentage) / 100);
                this.state.reallocationlist.mapDetails[key].AllocatedAmount = caldata;
                this.state.reallocationlist.mapDetails[key].AllocatedPremium = calpremium;
            }
            if (this.state.reallocationlist.mapDetails[key].Type == "QS") {

                let limit = item.Limit;
                let percentage = item.Percentage;
                if (limit == 0) {

                    this.state.reallocationlist.mapDetails[key].AllocatedAmount = (((this.state.reallocationlist.AllocationAmount - caldata) * this.state.reallocationlist.mapDetails[key].Percentage) / 100);
                    this.state.reallocationlist.mapDetails[key].AllocatedPremium = (((this.state.reallocationlist.PremiumAmount - calpremium) * this.state.reallocationlist.mapDetails[key].Percentage) / 100);
                    console.log(this.state.reallocationlist.mapDetails[key].AllocatedPremium, "qspremium");
                    qssuminsuared = this.state.reallocationlist.mapDetails[key].AllocatedAmount;
                    qspremium = this.state.reallocationlist.mapDetails[key].AllocatedPremium;
                }
                if (percentage == 0) {

                    let qslimit = (this.state.reallocationlist.AllocationAmount - caldata);
                    if (qslimit <= item.Limit) {
                        this.state.reallocationlist.mapDetails[key].AllocatedAmount = (this.state.reallocationlist.AllocationAmount - caldata);
                        this.state.reallocationlist.mapDetails[key].AllocatedPremium = (this.state.reallocationlist.PremiumAmount - calpremium);
                    }
                    else {

                        this.state.reallocationlist.mapDetails[key].AllocatedAmount = item.Limit;
                        this.state.reallocationlist.mapDetails[key].AllocatedPremium = item.AllocatedPremium;
                    }

                    qssuminsuared = this.state.reallocationlist.mapDetails[key].AllocatedAmount;
                    qspremium = this.state.reallocationlist.mapDetails[key].AllocatedPremium;
                    //this.state.reallocationlist.mapDetails[key].AllocatedAmount
                    //this.state.reallocationlist.mapDetails[key].AllocatedAmount = this.state.reallocationlist.MapDetails[key].Limit
                    //this.state.reallocationlist.mapDetails[key].AllocatedPremium
                }
                if (limit != 0 && percentage != 0) {
                    let qslimit = (this.state.reallocationlist.AllocationAmount - caldata);
                    let availblesuminsured = (((this.state.reallocationlist.AllocationAmount - caldata) * this.state.reallocationlist.mapDetails[key].Percentage) / 100);
                    let availblepremium = (((this.state.reallocationlist.PremiumAmount - calpremium) * this.state.reallocationlist.mapDetails[key].Percentage) / 100);
                    if (availblesuminsured <= item.Limit) {
                        this.state.reallocationlist.mapDetails[key].AllocatedAmount = availblesuminsured;
                        this.state.reallocationlist.mapDetails[key].AllocatedPremium = availblepremium;
                    }
                    else {
                        this.state.reallocationlist.mapDetails[key].AllocatedAmount = item.Limit;
                        //this.state.reallocationlist.mapDetails[key].AllocatedPremium = item.AllocatedPremium;
                    }
                    qssuminsuared = this.state.reallocationlist.mapDetails[key].AllocatedAmount;
                    qspremium = this.state.reallocationlist.mapDetails[key].AllocatedPremium;
                }

            }

            if (this.state.reallocationlist.mapDetails[key].Type == "Surplus") {
                //deductionAmount= this.state.reallocationlist.AllocationAmount - (QSTotal + caldata);
                //this.state.reallocationlist.mapDetails[key].AllocatedAmount = deductionAmount / SPcount;
                //deductionPremiumAmount = this.state.reallocationlist.PremiumAmount - (QSPremiumTotal + calpremium);
                //this.state.reallocationlist.mapDetails[key].AllocatedPremium = deductionPremiumAmount / SPcount;
                //this.state.reallocationlist.mapDetails[key].Percentage = spParcentage / SPcount;
                this.state.reallocationlist.mapDetails[key].AllocatedAmount = ((caldata * this.state.reallocationlist.mapDetails[key].NoOfLines) / 100);
                this.state.reallocationlist.mapDetails[key].AllocatedPremium = ((calpremium * this.state.reallocationlist.mapDetails[key].NoOfLines) / 100);
                surplusadjustsi = this.state.reallocationlist.mapDetails[key].AllocatedAmount;
                surplusadjustpremium = this.state.reallocationlist.mapDetails[key].AllocatedPremium;
                console.log("deductionAmount", deductionAmount, deductionPremiumAmount, spParcentage, this.state.reallocationlist.mapDetails[key].AllocatedAmount)
            }
            //if (this.state.reallocationlist.mapDetails[key].Type == "FAC" && qssuminsuared != undefined && qspremium != undefined && surplusadjustsi != undefined && surplusadjustpremium!=undefined) {
            //    debugger;

            //}


        });
        let FACindex = this.state.reallocationlist.mapDetails.findIndex(s => s.Type == "FAC")
        if (FACindex != -1) {
            debugger
            facadjustamount = ((this.state.reallocationlist.AllocationAmount) - ((caldata) + (qssuminsuared) + (surplusadjustsi)));
            facpremium = (this.state.reallocationlist.PremiumAmount - (calpremium + qspremium + surplusadjustpremium));
            this.state.reallocationlist.mapDetails[FACindex].AllocatedAmount = facadjustamount;
            this.state.reallocationlist.mapDetails[FACindex].AllocatedPremium = facpremium;
            console.log(facadjustamount, 'fac1');
            console.log(facpremium, 'fac2');
            console.log("deductionAmount", deductionAmount, this.state.reallocationlist.mapDetails)
            console.log("calculatedValue", caldata, this.state.masterLists);
            this.state.facadjustrealloc = facadjustamount;
            this.state.facadjustprem = facpremium;
            this.setState({})
            console.log('fac111', this.state.facadjustrealloc, this.state.facadjustprem);
            //this.state.reallocationparticiant.AllocatedAmount = ((facadjustamount * 100) / (this.state.reallocationparticiant.Share));
            //this.state.reallocationparticiant.AllocatedPremium = ((facpremium * 100) / (this.state.reallocationparticiant.Share));
            //this.state.reallocationparticiant.Commission = ((this.state.reallocationparticiant.AllocatedPremium * 100) / (this.state.reallocationparticiant.CommissionRate));
            //this.state.reallocationparticiant.Brokerage = ((this.state.reallocationparticiant.AllocatedPremium * 100) / (this.state.reallocationparticiant.BrokerageRate));
        }
        //this.state.reallocationlist.mapDetails[key].AllocatedAmount = caldata;
        //this.state.reallocationlist.mapDetails[key].AllocatedPremium = calpremium;
        // set = caldata;
        this.setState({ caldata, calpremium });

    }
    onddlChange = (evt, name) => {
        const Data = this.state.participant;
        Data[evt.target.name] = evt.target.value;
        this.setState({ Data, Brokerageflag: true });
        console.log("Data2:", this.state.treatyDTO)
        if (evt.target.name == 'brokerId') {
            this.state.brokerCode = this.state.bkmasterList[0].mdata.filter(x => x.mID == evt.target.value)[0].mValue;
            fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/GetBrachCode?participantMasterId=` + evt.target.value, {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log("bkbcmasterList: ", data);
                    this.setState({ bkbcmasterList: data });

                    console.log("bkbcmasterList", this.state.bkbcmasterList);
                    debugger

                });
        }
        if (name == 'brokerBranchId' && this.state.bkbcmasterList != null) {
            this.state.bkbranchCode = this.state.bkbcmasterList[0].mdata.filter(x => x.mID == evt.target.value)[0].mValue;
        }
        if (evt.target.name == 'brokerId') {

            let bkbCode = this.state.bkmasterList[0].mdata.filter(x => x.mID == evt.target.value)[0].mValue;
            fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/GetParticipantNameByCode?participantcode=` + bkbCode, {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log("dataList: ", data);
                    if (data != null) {
                        this.state.participant.brokername = data[0].participantName;
                        this.state.participantdetail.brokername = data[0].participantName;
                    }
                    this.setState({});
                });
        }
        let PData = this.state.participantdetail;
        PData[evt.target.name] = evt.currentTarget.innerText;
        this.setState({ PData });
        console.log("this.state.brokername", this.state.participant.brokername, evt.currentTarget.innerText);
    }
    onDateChange = (formate, name, event) => {

        //const { validdate } = this.state.fields;
        //this.setState({ validdate: false });
        var today = event.toDate();
        if (today.getDate() < 10) {
            var dt = '0' + today.getDate();
        }
        else {
            var dt = today.getDate();
        }
        if (today.getMonth() < 10) {
            var mm = '0' + (today.getMonth() + 1);
        }
        else {
            var mm = (today.getMonth() + 1);
        }


        //var date = today.getFullYear() + '-' + (today.getMonth() + 1)+ '-' + today.getDate();
        var date = dt + '/' + mm + '/' + today.getFullYear();
        const fields = this.state.CalculationDTO;
        fields[name] = date;
        this.setState({ fields });

    };
    componentDidMount() {
        fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/MastertypeData`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.state.treatyDTO.treatyBasisId = data[2].mdata[0].mID;
                console.log("Create Treaty masterList: ", data);
                this.setState({ masterList: data });
                console.log("Create Treaty masterList: ", this.state.masterList);
                let newmasterlist = data.filter((e) => e.mType === 'BusinessType')[0].mdata;
                let allocationList = data.filter((e) => e.mType == 'AllocationLogic')[0].mdata;
                this.state.surplusmaslist = data.filter((e) => e.mType == 'AllocationBasis')[0].mdata;
                console.log("allocationList", allocationList);
                this.setState({ newmasterList: newmasterlist, allocationmasList: allocationList });
                //this.AddTreatyTable();

                console.log("masterdata", data, this.state.treatyDTO.treatyBasisIdf);
                console.log("newmasterlist", this.state.newmasterList);
            });
        fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/Reinsurer`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("rimasterList: ", data);
                this.setState({ rimasterList: data });

                console.log("rimasterList", this.state.rimasterList);
            });
        fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/Broker`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("bkmasterList: ", data);
                this.setState({ bkmasterList: data });

                console.log("bkmasterList", this.state.bkmasterList);
            });
    }
    onFormSubmit = () => {
        debugger;

        console.log("submit", this.state.SearchPeople);
        fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/GetAllocationByPolicyNo?PolicyNo=` + this.state.Policydto.policynumber, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {

                this.state.reallocationlist.Name = data.Name;
                this.state.reallocationlist.Level = data.Level;
                this.state.reallocationlist.AllocationAmount = data.AllocationAmount;
                this.state.reallocationlist.PremiumAmount = data.PremiumAmount;

                //datalist = data.MapDetails;                
                console.log("masterdata123", data);
                //this.state.masterList = data.MapDetails;
                let temp = JSON.parse(JSON.stringify(data));
                let list = Object.assign([], data.mapDetails);

                //reset
                temp.mapDetails.map(item => {
                    if (item.Type == "Retention") {
                        item.Percentage = "";
                        item.AllocatedAmount = "";
                        item.Limit = "";
                        item.AllocatedPremium = "";
                    }
                    if (item.Type == "Surplus") {
                        item.AllocatedAmount = "";
                        item.AllocatedPremium = "";
                        item.Percentage = "";
                        item.NoOfLines = "";
                    }
                    if (item.Type == "QS") {
                        item.AllocatedAmount = "";
                        item.AllocatedPremium = "";

                    }
                    if (item.Type == "FAC") {
                        //item.AllocatedAmount = "";
                        //item.AllocatedPremium = "";
                    }
                });

                this.setState({
                    masterLists: list, reallocationlist: temp, qoutaflag: true
                });

                console.log("masterdata", this.state.masterLists);
                console.log("reallocation", this.state.reallocationlist);
                // console.log(datalist, 'new1');

            });
        //console.log(datalist, 'new');
        //this.setState({ masterList });
        console.log("masterdata1", this.state.masterLists);
    }

    //    checkAdult = (item) => {
    //        if(item.Type == "FAC")
    //        {
    //            item.participant.push(this.state.reallocationparticiant)
    //}
    //    }



    onFormUpdate = () => {
        debugger;
        this.state.Modifydto.mappingId = this.state.reallocationlist.MappingId;
        this.state.Modifydto.allocationAmount = this.state.reallocationlist.AllocationAmount;
        this.state.Modifydto.premium = this.state.reallocationlist.PremiumAmount;
        this.state.Modifydto.policyNo = this.state.reallocationlist.PolicyNumber;
        this.state.Modifydto.Level = this.state.reallocationlist.Level;
        this.state.reallocationlist.mapDetails.map((item, key) => {
            if (item.Type == "FAC") {
                item.participants = this.state.faclist;
            }
        });
        //var previos = parseInt(this.state.treatyDTO.tblParticipant[0].sharePercentage);
        //if (this.state.treatyDTO.tblParticipant.length - 1 < 1) {
        //    this.state.total = parseInt(this.state.treatyDTO.tblParticipant[0].sharePercentage)
        //}
        //for (let j = 0; j < this.state.treatyDTO.tblParticipant.length - 1; j++) {
        //    debugger;
        //    var current = parseInt(this.state.treatyDTO.tblParticipant[j].sharePercentage);
        //    var data = previos + parseInt(this.state.treatyDTO.tblParticipant[j + 1].sharePercentage);
        //    previos = data;
        //    console.log(data, "data1");
        //    this.state.total = data;
        //    console.log(this.state.total, 'total1')
        //}

        console.log("facjson", this.state.reallocationlist);
        this.state.Modifydto.allocationDetails = JSON.stringify(this.state.reallocationlist);
        //this.state.allocationDetails.mapDetails.map((item, key) => {
        //    if (item.Type == "FAC") {
        //        item.participants.push(this.state.reallocationparticiant)
        //    }
        //});
       
            fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/ModifyReAllocation?MappingId=` + this.state.reallocationlist.MappingId, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify(this.state.Modifydto)
            })//.then(response => response.json())
                .then(data => {
                    swal({
                        //text: data.responseMessage,
                        text: "data Reallocated successfully",
                        icon: "success"
                    });
                    this.setState({ Retention: data });
                    console.log(data, 'Mydata')
                    console.log("Accountss data: ", data);

                });
        
        
            
    }
    AddParticipant = () => {
        let partdetailcopy = JSON.parse(JSON.stringify(this.state.participant));
        this.state.treatyDTO.tblParticipant.push(partdetailcopy);
        let partcopy = JSON.parse(JSON.stringify(this.state.participantdetail));
        this.state.participantdto.push(partcopy);
        
        let copyfac = JSON.parse(JSON.stringify(this.state.reallocationparticiant));

        this.state.faclist.push(copyfac);
        this.state.reallocationparticiant = {
            ParticipantId: "",
            ReInsurerId: "",
            ReinsurerBranchId: "",
            BrokerId: "",
            BrokerBranchId: "",
            Branch: "",
            Share: "",
            CommissionRate: "",
            BrokerageRate: "",
            Commission: "",
            Brokerage: "",
            AllocatedAmount: "",
            AllocatedPremium: ""
        };
        this.state.participant = {
            "reInsurerId": "",
            "brokername": "",
            "reinsurername": "",
            "reInsurerBranchId": "",
            "brokerId": "",
            "brokerBranchId": "",
            "sharePercentage": "",
            "brokeragePercentage": "",
            "ricommissionPercentage": "",
            "bordereauxFreqId": "",
            "status": "",
            "isActive": "y"
        };
        this.state.participantdetail = {
            "reInsurerId": "",
            "brokername": "",
            "reinsurername": "",
            "reInsurerBranchId": "",
            "brokerId": "",
            "brokerBranchId": "",
            "sharePercentage": "",
            "brokeragePercentage": "",
            "ricommissionPercentage": "",
            "bordereauxFreqId": "",
            "status": "",
            "isActive": "y"
        };
        //let participant = this.state.participant;
        this.dataTable();
        //this.state.reinsurername = "";
        //this.state.reinsurerCode = "";
        //this.state.ribranchCode = "";
        //this.state.brokerCode = "";
        //this.state.bkbranchCode = "";
        //this.state.brodreuxfreq = "";
        this.setState({ showparticipantgrid: true });
        console.log("trdto", this.state.treatyDTO);
    }
    dataTable = () => {
        let ParticipantList = this.state.participantdto;
        this.setState({
            newdata: ParticipantList.map((prop, key) => {
                console.log("trtprop", prop, ParticipantList, this.state.ddllist, this.state.reinsurername);
                return {
                    id: key + 1,
                    reinsurercodeId: prop.reInsurerId,
                    //this.state.ddllist.filter(x => x.reinsurercodeId == ParticipantList[key].reinsurercodeId)[0].mValue,
                    reinsurername: prop.reinsurername,
                    brokername: prop.brokername,
                    //this.state.reinsurername,
                    ribranchcodeId: prop.reInsurerBranchId,
                    //this.state.ribranchCode,
                    brokercode: prop.brokerId,
                    //this.state.brokerCode,
                    bkbranchcodeId: prop.brokerBranchId,
                    //this.state.bkbranchCode,
                    sharepercent: prop.sharePercentage,
                    brokagepercent: prop.brokeragePercentage,
                    riCommissionpercent: prop.ricommissionPercentage,
                    bordereauxfrequencyId: prop.bordereauxFreqId,
                    btn: <div><Button color="danger" justIcon round simple className="edit" onClick={() => this.deleteParticipantRecord(key)} ><Delete /></Button>
                    </div>
                    //this.state.brodreuxfreq,

                };
            })
        });


    }
    onChangeTreaty = (index) => {
        let indexlist = this.state.indexList;
        indexlist.push(index);
        this.setState({ indexlist });

        console.log("indexList", this.state.indexList);

    }
    onChangeTreaty1 = () => {
        this.setState({ surplus: true });
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Card >
                    <CardHeader>

                        {
                            <h4 >
                                <small> <TranslationContainer translationKey="Policy Details" /> </small>
                            </h4>
                        }
                    </CardHeader>
                    <CardBody>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={3}>
                                <CustomInput
                                    labelText="Policy Number"
                                    id="ContactNo"
                                    //required={true}
                                    //error={this.state.percentageState}
                                    value={this.state.Policydto.policynumber}
                                    name='policynumber'
                                    onChange={this.onInputChange}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                                <Button color="warning" style={{ 'top': '14px' }} round onClick={() => this.onFormSubmit()}>Search</Button>

                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                                <Button color="warning" style={{ 'top': '14px' }} round onClick={() => this.onFormUpdate()}>Update</Button>

                            </GridItem>
                        </GridContainer>
                        {this.state.qoutaflag &&
                            <GridContainer>

                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="Product Name"
                                        id="ContactNo"
                                        disabled={true}
                                        //error={this.state.percentageState}
                                        value={this.state.reallocationlist.Name}
                                        name='Name'
                                        onChange={(e) => this.onInputChange1(e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="Basis"
                                        id="ContactNo"
                                        disabled={true}
                                        //error={this.state.percentageState}
                                        value={this.state.reallocationlist.Level}
                                        name='Level'
                                        onChange={(e) => this.onInputChange1(e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                {/* <GridItem xs={12} sm={12} md={3}>
                                <CustomInput
                                    labelText="Type"
                                    id="ContactNo"
                                    //required={true}
                                    //error={this.state.percentageState}
                                    value={this.state.CalculationDTO.type}
                                    name='type'
                                    onChange={this.onInputChange}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />

                            </GridItem> */}
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="SumInsured"
                                        id="ContactNo"
                                        disabled={true}
                                        //required={true}
                                        //error={this.state.percentageState}
                                        value={this.state.reallocationlist.AllocationAmount}
                                        name='AllocationAmount'
                                        onChange={(e) => this.onInputChange1(e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="Premium"
                                        id="ContactNo"
                                        disabled={true}
                                        //required={true}
                                        //error={this.state.percentageState}
                                        value={this.state.reallocationlist.PremiumAmount}
                                        name='PremiumAmount'
                                        onChange={(e) => this.onInputChange1(e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                        }
                    </CardBody>
                </Card>


                {this.state.qoutaflag && this.state.masterLists.map((item, key) => {

                    return (<div>
                        {item.Type == "Retention" &&




                            <Card>

                                <CardHeader color="rose" icon>

                                    <h4 className={this.props.cardIconTitle}>
                                        <small> {item.Type} </small>
                                    </h4>
                                </CardHeader>
                                <CardBody>
                                    <GridContainer>

                                        <GridItem xs={12} sm={12} md={3}> <CustomInput
                                            labelText="Retention %"
                                            name="Percentage"
                                            disabled={true}
                                            value={item.Percentage}
                                            onChange={(e) => this.onInputChange2(e, key)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}> <CustomInput
                                            labelText="Retention Allocation SI"
                                            name="AllocatedAmount"
                                            disabled={true}
                                            value={item.AllocatedAmount}
                                            onChange={this.onInputChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}> <CustomInput
                                            labelText="Limit"
                                            name="Limit"
                                            disabled={true}
                                            value={item.Limit}
                                            onChange={this.onInputChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        </GridItem>

                                        <GridItem xs={12} sm={12} md={3}> <CustomInput
                                            labelText="Premium Amount"
                                            name="AllocatedPremium"
                                            disabled={true}
                                            value={item.AllocatedPremium}
                                            onChange={this.onInputChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}> <CustomInput
                                            labelText="Adjustment %"
                                            name="Percentage"
                                            value={this.state.reallocationlist.mapDetails[key].Percentage}
                                            onChange={(e) => this.onInputChange2(e, key)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}> <CustomInput
                                            labelText="Reallocated SI"
                                            name="AllocatedAmount"
                                            //disabled={true}
                                            value={this.state.reallocationlist.mapDetails[key].AllocatedAmount}
                                            onChange={(e) => this.onInputChange2(e, key)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}> <CustomInput
                                            labelText="Reallocated Limit"
                                            name="Limit"
                                            value={this.state.reallocationlist.mapDetails[key].Limit}
                                            onChange={(e) => this.onInputChange2(e, key)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}> <CustomInput
                                            labelText="Reallocated Amount"
                                            name="AllocatedPremium"
                                            value={this.state.reallocationlist.mapDetails[key].AllocatedPremium}
                                            onChange={(e) => this.onInputChange2(e, key)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        </GridItem>

                                    </GridContainer>


                                </CardBody>


                            </Card>

                        }


                    </div>);


                })}

                {this.state.qoutaflag && this.state.masterLists.map((item, key) => {

                    return (<div>
                        {item.Type == "QS" &&
                            <Card>

                                <CardHeader color="rose" icon>

                                    <h4 className={this.props.cardIconTitle}>
                                        <small> QuotaShare/Obligatory </small>
                                    </h4>
                                </CardHeader>

                                <CardBody>

                                    <GridContainer>

                                        <GridItem xs={12} sm={12} md={3}> <CustomInput
                                            labelText="Type"
                                            name="Type1"
                                            value={item.Type}
                                            disabled={true}
                                            onChange={this.onInputChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}> <CustomInput
                                            labelText="Treaty Group Name"
                                            name="treatyshare"
                                            disabled={true}
                                            //value={this.state.CalculationDTO.riallocationDetails[0].ricalculation[1].treatyshare}
                                            onChange={this.onInputChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}> <CustomInput
                                            labelText="Allocation SI"
                                            name="AllocationAmount"
                                            value={item.AllocatedAmount}
                                            disabled={true}
                                            onChange={this.onInputChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}> <CustomInput
                                            labelText="Allocation Premium"
                                            name="AllocatedPremium"
                                            disabled={true}
                                            value={item.AllocatedPremium}
                                            onChange={this.onInputChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}> <CustomInput
                                            labelText="Treaty Share"
                                            name="limit2"
                                            value={item.Percentage}
                                            disabled={true}
                                            onChange={this.onInputChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}> <CustomInput
                                            labelText="Limit"
                                            name="Limit"
                                            disabled={true}
                                            value={item.Limit}
                                            onChange={this.onInputChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        </GridItem>

                                        <GridItem xs={12} sm={12} md={3}> <CustomInput
                                            labelText="ReAllocated SI"
                                            name="AllocationAmount"
                                            value={this.state.reallocationlist.mapDetails[key].AllocatedAmount}
                                            disabled={true}
                                            onChange={(e) => this.onInputChange2(e, key)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}> <CustomInput
                                            labelText="ReAllocated Premium"
                                            name="AllocatedPremium"
                                            disabled={true}
                                            value={this.state.reallocationlist.mapDetails[key].AllocatedPremium}
                                            onChange={(e) => this.onInputChange2(e, key)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        </GridItem>
                                    </GridContainer>

                                    <GridContainer justify="center">
                                        <GridItem xs={3} sm={3} md={3}>
                                            <Button color="warning" style={{ 'top': '14px' }} round onClick={() => this.onChangeTreaty(key)}>TreatyDetails</Button>

                                        </GridItem>

                                    </GridContainer>

                                    {/*     {this.state.react && <ReactTables officelist={this.state.officelist} editFunction={this.editFunction} />} */}

                                </CardBody>



                            </Card>
                        }
                        {item.Type == "QS"
                            && (this.state.indexList.findIndex(s => s == key) != -1 ? true : false) &&
                            <GridContainer xl={12}>
                                <GridItem lg={12}>



                                    <ReactTable
                                        title={"Participant Details"}
                                        data={item.participants}
                                        filterable
                                        columns={[
                                            {
                                                Header: "Participant",
                                                accessor: "ParticipantId",
                                                Width: "20px"

                                            },
                                            {
                                                Header: "Share",
                                                accessor: "Share",

                                            },
                                            {
                                                Header: "Amount",
                                                accessor: "AllocatedAmount",
                                                //Width: "10px"
                                            },
                                            {
                                                Header: "Premium",
                                                accessor: "AllocatedPremium",
                                                //Width: "20px"
                                            },
                                            {
                                                Header: "Brokerage",
                                                accessor: "Brokerage",
                                                //Width: "10px"
                                            },
                                            {
                                                Header: "Commission",
                                                accessor: "Commission",
                                                //Width: "10px"
                                            }

                                        ]}
                                        defaultPageSize={5}
                                        showPaginationTop={false}
                                        showPaginationBottom
                                        //pageSize={([this.state.data.length + 1] < 5) ? [this.state.data.length + 1] : 5}
                                        //showPaginationBottom={([this.state.data.length + 1] <= 5) ? false : true}
                                        className="-striped -highlight"
                                    />


                                </GridItem>


                                <Paper className={classes.root} style={{ marginLeft: '75px', marginRight: '75px' }} >


                                </Paper>





                            </GridContainer>}
                    </div>);


                })}
                {this.state.qoutaflag && this.state.masterLists.map((item, key) => {

                    return (<div>
                        {item.Type == "Surplus" &&

                            <Card>

                                <CardHeader color="rose" icon>

                                    <h4 className={this.props.cardIconTitle}>
                                        <small> {item.Type} </small>
                                    </h4>
                                </CardHeader>
                                <CardBody>

                                    <GridContainer>

                                        <GridItem xs={12} sm={12} md={3}> <CustomInput
                                            labelText="Type"
                                            name="Type1"
                                            disabled={true}
                                            value={item.Type}
                                            onChange={(e) => this.onInputChange2(e, key)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}> <CustomInput
                                            labelText="Treaty Group Name"
                                            name="treatyshare"
                                            disabled={true}
                                            //value={this.state.CalculationDTO.riallocationDetails[0].ricalculation[1].treatyshare}
                                            onChange={(e) => this.onInputChange2(e, key)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}> <CustomInput
                                            labelText="Allocation SI"
                                            name="AllocationAmount"
                                            value={item.AllocatedAmount}
                                            disabled={true}
                                            onChange={(e) => this.onInputChange2(e, key)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}> <CustomInput
                                            labelText="Allocation Premium"
                                            name="AllocatedPremium"
                                            disabled={true}
                                            value={item.AllocatedPremium}
                                            onChange={(e) => this.onInputChange2(e, key)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}> <CustomInput
                                            labelText="Treaty Share"
                                            name="TreatyShare"
                                            disabled={true}
                                            value={item.Percentage}
                                            onChange={(e) => this.onInputChange2(e, key)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}> <CustomInput
                                            labelText="Lines"
                                            name="NoOfLines"
                                            //disabled={true}
                                            value={item.NoOfLines}
                                            onChange={(e) => this.onInputChange2(e, key)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}> <CustomInput
                                            labelText="Adjustment %"
                                            name="NoOfLines"
                                            value={this.state.reallocationlist.mapDetails[key].NoOfLines}
                                            onChange={(e) => this.onInputChange2(e, key)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}> <CustomInput
                                            labelText="ReAllocated SI"
                                            name="AllocationAmount"
                                            value={this.state.reallocationlist.mapDetails[key].AllocatedAmount}
                                            //disabled={true}
                                            onChange={(e) => this.onInputChange2(e, key)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}> <CustomInput
                                            labelText="ReAllocated Premium"
                                            name="AllocatedPremium"
                                            //disabled={true}
                                            value={this.state.reallocationlist.mapDetails[key].AllocatedPremium}
                                            onChange={(e) => this.onInputChange2(e, key)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        </GridItem>

                                    </GridContainer>

                                    <GridContainer justify="center">
                                        <GridItem xs={3} sm={3} md={3}>
                                            <Button color="warning" style={{ 'top': '14px' }} round onClick={() => this.onChangeTreaty(key)}>TreatyDetails</Button>

                                        </GridItem>

                                    </GridContainer>

                                    {/*     {this.state.react && <ReactTables officelist={this.state.officelist} editFunction={this.editFunction} />} */}

                                </CardBody>


                            </Card>
                        }

                        {
                            item.Type == "Surplus" &&
                            (this.state.indexList.findIndex(s => s == key) != -1 ? true : false) &&
                            <GridContainer xl={12}>
                                <GridItem lg={12}>



                                    <ReactTable
                                        title={"Participant Details"}
                                        data={item.participants}
                                        filterable
                                        columns={[
                                            {
                                                Header: "Participant",
                                                accessor: "ParticipantId",
                                                Width: "20px"

                                            },
                                            {
                                                Header: "Share",
                                                accessor: "Share",

                                            },
                                            {
                                                Header: "Amount",
                                                accessor: "AllocatedAmount",
                                                //Width: "10px"
                                            },
                                            {
                                                Header: "Premium",
                                                accessor: "AllocatedPremium",
                                                //Width: "20px"
                                            },
                                            {
                                                Header: "Brokerage",
                                                accessor: "Brokerage",
                                                //Width: "10px"
                                            },
                                            {
                                                Header: "Commission",
                                                accessor: "Commission",
                                                //Width: "10px"
                                            }

                                        ]}
                                        defaultPageSize={5}
                                        showPaginationTop={false}
                                        showPaginationBottom
                                        //pageSize={([this.state.data.length + 1] < 5) ? [this.state.data.length + 1] : 5}
                                        //showPaginationBottom={([this.state.data.length + 1] <= 5) ? false : true}
                                        className="-striped -highlight"
                                    />


                                </GridItem>


                                <Paper className={classes.root} style={{ marginLeft: '75px', marginRight: '75px' }} >


                                </Paper>





                            </GridContainer>}

                    </div>);

                })}
                {this.state.qoutaflag && this.state.masterLists.map((item, key) => {

                    return (<div>
                        {item.Type == "FAC" &&




                            <Card>

                                <CardHeader color="rose" icon>

                                    <h4 className={this.props.cardIconTitle}>
                                        <small> {item.Type} </small>
                                    </h4>
                                </CardHeader>
                                <CardBody>
                                    <GridContainer>


                                        <GridItem xs={12} sm={12} md={3}> <CustomInput
                                            labelText="Retention Allocation SI"
                                            name="AllocatedAmount"
                                            disabled={true}

                                            value={this.state.reallocationlist.mapDetails[key].AllocatedAmount}
                                            onChange={(e) => this.onInputChange2(e, key)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        </GridItem>

                                        <GridItem xs={12} sm={12} md={3}> <CustomInput
                                            labelText="Premium Amount"
                                            name="AllocatedPremium"
                                            disabled={true}
                                            value={this.state.reallocationlist.mapDetails[key].AllocatedPremium}
                                            onChange={(e) => this.onInputChange2(e, key)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        </GridItem>









                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={3} sm={3} md={3}>
                                            <Button color="warning" style={{ 'top': '14px' }} round onClick={() => this.handleParticipant()}>AddParticipant</Button>

                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer justify="center">
                                        <GridItem xs={3} sm={3} md={3}>
                                            <Button color="warning" style={{ 'top': '14px' }} round onClick={() => this.onChangeTreaty(key)}>ParticipantDetails</Button>

                                        </GridItem>

                                    </GridContainer>
                                </CardBody>
                                {this.state.Participantflag &&
                                    <CardBody>
                                        <AddParticipant AddParticipant={this.AddParticipant} TreatytableData={this.state.TreatytableData} participantstableData={this.state.participantstableData} participantdata={this.state.participantdata} bkmasterList={this.state.bkmasterList} masterList={this.state.masterList} onddlChange={this.onddlChange} participant={this.state.participant} newdata={this.state.newdata}
                                            onddChange={this.onddChange} onparticipantInputChange={this.onparticipantInputChange} AddParticipant={this.AddParticipant} Brokerageflag={this.state.Brokerageflag} showparticipantgrid={this.state.showparticipantgrid} treatyDTO={this.state.treatyDTO} rimasterList={this.state.rimasterList} bcmasterList={this.state.bcmasterList} bkbcmasterList={this.state.bkbcmasterList} reinsurername={this.state.reinsurername} />
                                        {this.state.showparticipantgrid ? <ParticipantGrid deleteParticipantRecord={this.deleteParticipantRecord} participantdata={this.state.participantdata} participantstableData={this.state.participantstableData} newdata={this.state.newdata} /> : null}

                                    </CardBody>

                                }

                            </Card>

                        }
                        {
                            item.Type == "FAC" &&
                            (this.state.indexList.findIndex(s => s == key) != -1 ? true : false) &&
                            <GridContainer xl={12}>
                                <GridItem lg={12}>



                                    <ReactTable
                                        title={"Participant Details"}
                                        data={item.participants}
                                        filterable
                                        columns={[
                                            {
                                                Header: "Reinsurer",
                                                accessor: "ReInsurerId",
                                                Width: "20px"

                                            },
                                            {
                                                Header: "Broker",
                                                accessor: "BrokerId",
                                                Width: "20px"

                                            },
                                            {
                                                Header: "Share",
                                                accessor: "Share",

                                            },
                                            {
                                                Header: "Amount",
                                                accessor: "AllocatedAmount",
                                                //Width: "10px"
                                            },
                                            {
                                                Header: "Premium",
                                                accessor: "AllocatedPremium",
                                                //Width: "20px"
                                            },
                                            {
                                                Header: "Brokerage",
                                                accessor: "Brokerage",
                                                //Width: "10px"
                                            },
                                            {
                                                Header: "Commission",
                                                accessor: "Commission",
                                                //Width: "10px"
                                            }

                                        ]}
                                        defaultPageSize={5}
                                        showPaginationTop={false}
                                        showPaginationBottom
                                        //pageSize={([this.state.data.length + 1] < 5) ? [this.state.data.length + 1] : 5}
                                        //showPaginationBottom={([this.state.data.length + 1] <= 5) ? false : true}
                                        className="-striped -highlight"
                                    />


                                </GridItem>


                                <Paper className={classes.root} style={{ marginLeft: '75px', marginRight: '75px' }} >


                                </Paper>





                            </GridContainer>}

                    </div>);


                })}

            </div>
        );
    }
}

export default withStyles(style)(Reallocation);