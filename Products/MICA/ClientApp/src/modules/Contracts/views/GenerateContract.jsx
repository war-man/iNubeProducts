import React from "react";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
//import ProfileDet from "./_ProfileDet";
//import Address from "./_Address.jsx"
import swal from 'sweetalert';
import UserConfig from 'modules/Users/UserConfig.js';
import partnerconfig from "modules/Partners/PartnerConfig.js";
import FilterNone from "@material-ui/icons/FilterNone";
import PropTypes from "prop-types";
import $ from 'jquery';
// @material-ui/core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
//import profileStyles from "assets/jss/material-dashboard-pro-react/views/profileStyles.jsx";
//import profileStyles from "./profileStyles.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import profileDetails from "assets/img/profile-details.png";
import Icon from "@material-ui/core/Icon";
import Button from "components/CustomButtons/Button.jsx";
import Modal from '@material-ui/core/Modal';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import searchproduct from "assets/img/search-product.png";
//import Profile from "./Office.jsx";
//import ReactTable from "react-table";
import { Animated } from "react-animated-css";
import "react-table/react-table.css";
import ReactTable from 'components/MuiTable/MuiTable.jsx';
import ContractConfig from "modules/Contracts/ContractConfig.js";
import People from "modules/Hierarchy/views/People.jsx";
import Edit from "@material-ui/icons/Edit";
//import ReactTables from "./ReactTables.jsx"
import Tooltip from '@material-ui/core/Tooltip';
import Visibility from "@material-ui/icons/Visibility";
import IconButton from '@material-ui/core/IconButton';
import CustomRadioButton from "components/CustomRadiobutton/CustomRadiobutton.jsx";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import PageContentLoader from "components/Loaders/PageContentLoader.jsx";
import { Redirect } from 'react-router-dom';

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: "#00acc1",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);
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
const newStyle = {
    maxWidth: "80%",
    marginLeft: "12%",
    overflow: "auto"
}
const okBtn = {

    marginLeft: "527px",
    //marginTop: "20px",
    height: "25px",
    textAlign: "center",

    width: "65px",
    padding: "1px"
}
const modalStyles = {
    position: 'absolute',
    top: '10%',
    left: '10%',
    right: '10%',
    transform: 'translate(-25 %, -25%)',
    backgroundColor: 'white',
    width: 'auto',
    height: 'auto',
    borderRadius: '8px',
    paddingBottom: '5px',
    paddingRight: '2px'
    //  boxShadow: theme.shadows[5],

};

const searchClose = {
    float: "right",
    position: 'relative',
    bottom: "56px",
    width: "26px",
    height: "28px",
    borderRadius: "4px",
    fontSize: "larger",
    padding: "0px",
    right: '10px',

}
const searchBtn = {
    width: "120px",
    height: "35px",
    textAlign: "center",
    margin: "0 auto"
}
class GenerateContract extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            validationflag:false,
            validationMassage:"",
            redirect:false,
            loder: false,
            disableFlag: false,
            filterObj: {},
            Calculateresult:[],
            TableDataList: [],
            resultDetails:[],
            selectedDate:"",
            openincentive: false,
            flag: false,
            falgdrop: false,
            datagrid: false,
            masterList: [],
            flagmodify: true,
            flagsave: true,
            Contractflag:true,
            reportingmasList1: [],
            levels: [
                { mID: '16', mType: "levels", mValue: "MDA" },
                { mID: '18', mType: "levels", mValue: "GRAFTING" },

            ],
            Duration: [{
                mID: 12,
                mValue: '12'
                },
                {
                    mID: 24,
                    mValue: '24'
                },
                {
                    mID: 36,
                    mValue: '36'
                }],
            Contract: {
                //recruitmentId: 1,	
                recruitmentNo: "",
                name: "",
                channel: "",
                subChannel: "",
                designation: "",
                Contractterm: "",
                contractInceptionDate: ""
                //Level: "",	
                //Program: "",	
                //Income: "",	
                //Duration: "",	
                //free:""
            },
            ContractDTO: {
                "recruitmentNo": "",
                "name": "",
                "channel": "",
                "subChannel": "",
                "designation": "",
                "levelId": "",
                "contractTerm": "",
                "contractInceptionDate": "",
                "contractExpirationDate": "",
                "programApplicableId": null,
                "averageIncome": null,
                "duration": "",
                "codingMonth": null,
                "numberOfFreeMonth": "",
                "allowance": null,
                "totalCost": null,
                "totalAnpTarget": null,
                "manPower": null,
                "activityAgents": null,
                "isEmployee": true,
                "isActive": true,
                "flag": true,
                "lstIllustraionModels": []
            },
            targetData: {
                programId: "",
                levelId: ""
            },
            drop: {
                year: null
            },
            year: [],
            goal: {
                Allowance: "",
                Cost: "",
                ANP: "",
                Manpower: "",
                ActiveAgents: ""
            },
            yearlyDict: { "EndingManPower": "", "Duration": "", "TotalANP": "" },
            yearlyRate: { "ActiveAgentRate_Year": "1", "ANPTargetDistRate_NoOfMonths": "", "ANPTargetDistRate_Year": "1" },
            calculateMonthly: { "MonthlyANP": "316667", "PreviousCummulativeANP": "0", "InitialManPower": "3.14", "PreviousEndingManPower": "1", "ActivityRatio": "20" },
            calculateDTO:{ "TotalANP": "", "ActivityRatioForMonth_Month": "1", "MontlyANPTargetDistRate_Month": "1", "Month": "1", "PrevEndingManPower": "0", "PrevCummulativeANP": "0", "EndingManPower": "", "Duration": "", "MontlyANPTargetDistRate_Duration": "" }


        };

    }
    onInputChange1 = (evt) => {
     
        if (evt.target.value == 1) {
            this.state.resultDetails = this.state.Calculateresult.filter(s => s.Period >= 1 && s.Period<=12);
        } else if (evt.target.value == 2) {
            this.state.resultDetails = this.state.Calculateresult.filter(s => s.Period >= 13 && s.Period <= 24);
        } else if (evt.target.value == 3) {
            this.state.resultDetails = this.state.Calculateresult.filter(s => s.Period >= 25 && s.Period <= 36);
        }
        if (this.state.resultDetails.length > 0) {

            this.setState({ Data, falgdrop: true, filterObj: this.state.resultDetails[this.state.resultDetails.length - 1], });
        } else {
            this.setState({ Data, falgdrop: false, filterObj: {} });
        }
        this.tabledata(this.state.resultDetails);

        const Data = this.state.drop;
        //var year1, year2, year3;
        Data[evt.target.name] = evt.target.value;
        
        this.setState({ datagrid: true});
        console.log("this.state.result", this.state.resultDetails, this.state.filterObj)
    }
    onInputChange = (evt) => {
       
        const Data = this.state.ContractDTO;
        //var year1, year2, year3;
        Data[evt.target.name] = evt.target.value;
        console.log("Data1", this.state.ContractDTO);

        if (evt.target.name == "contractTerm" && this.state.selectedDate != "") {
            console.log("selectedDate", this.state.selectedDate)
           
            Data.contractExpirationDate = this.ADDMonthChange(this.state.selectedDate, evt.target.value);
        }

        if (this.state.ContractDTO.recruitmentNo != "" && evt.target.name =="recruitmentNo" ) {
           
            fetch(`${ContractConfig.ContractConfigURL}/api/Contract/RecruitmentByCode?RecNo=` + this.state.ContractDTO.recruitmentNo, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log("countpos", data);
                    if (data.status == 1) {
                        //this.state.positionmasterList = data;	
                        this.state.ContractDTO.name = data.name;
                        this.state.ContractDTO.channel = data.channel;
                        this.state.ContractDTO.subChannel = data.subChannel;
                        this.state.ContractDTO.designation = data.designation;
                        this.setState({ reportingmasList1: data, validationflag:false});
                        //this.MappingTableData();
                    } else {
                        this.setState({ validationMassage: data.responseMessage, validationflag:true})
                    }
                });
        }
        this.setState({ Data });
        this.state.year = [];
        if (this.state.ContractDTO.duration == 12) {
            this.state.year=[{
                mID: 1,
               
                mValue: '1'
            }];
        }
        else if (this.state.ContractDTO.duration == 24) {
            this.state.year=[
                {
                    mID: 1,
                  
                    mValue: '1'
                },
                {
                    mID: 2,
                 
                    mValue: '2'
                }] ;
        }
        else if (this.state.ContractDTO.duration == 36) {
            this.state.year=[
                {
                    mID: 1,
                
                    mValue: '1'
                },
                {
                    mID: 2,
                  
                    mValue: '2'
                },
                {
                    mID: 3,
                    
                    mValue: '3'
                }];
        }
       

        console.log("Data", this.state.ContractDTO)
    }
    onInputChange2 = (evt) => {
        const data1 = this.state.targetData;
        const data2 = this.state.goal;
        let CDTO = this.state.ContractDTO;
        
        data1[evt.target.name] = evt.target.value;
        data2[evt.target.name] = evt.target.value;
        if (evt.target.name != "programId") {
            CDTO[evt.target.name] = evt.target.value;
        } else {
            CDTO.programApplicableId = evt.target.value;
        }

        this.setState({ CDTO, data2, data1});

    }
    datechange = (date) => {
        const _date = date.split('/');
        const dateObj = { month: _date[1], year: _date[2], day: _date[0] };

        return dateObj.year + '-' + dateObj.month + '-' + dateObj.day;
    }
    onSubmit = () => {
     
        console.log("targetData", this.state.targetData)
       
        fetch(`${ContractConfig.ContractConfigURL}/api/Contract/SearchTarget`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.targetData)
        }).then(response => response.json())
            .then(sdata => {
                this.state.goal.Allowance = sdata.Allowance;
                this.state.goal.Cost = sdata.Totalcost;
                this.state.goal.ANP = sdata.ANPtarget;
                this.state.goal.Manpower = sdata.Manpower;
                this.state.goal.ActiveAgents = sdata.ActiveAgents;

                this.state.yearlyDict.EndingManPower = sdata.Manpower;
                this.state.yearlyDict.Duration = this.state.ContractDTO.duration;
                this.state.yearlyDict.TotalANP = sdata.ANPtarget;
                this.state.yearlyRate.ANPTargetDistRate_NoOfMonths = this.state.ContractDTO.duration;

                this.state.calculateDTO.TotalANP = sdata.ANPtarget;
                this.state.calculateDTO.Duration = this.state.ContractDTO.duration;
                this.state.calculateDTO.MontlyANPTargetDistRate_Duration = this.state.ContractDTO.duration;
                this.state.calculateDTO.EndingManPower = sdata.Manpower;

                let DTO = this.state.ContractDTO;
                DTO.allowance = sdata.Allowance;
                DTO.totalCost = sdata.Totalcost;
                DTO.manPower = sdata.Manpower;
                DTO.totalAnpTarget = sdata.ANPtarget;
                DTO.activityAgents = sdata.ActiveAgents;
                DTO.activityAgents = sdata.ActiveAgents;
              
                this.setState({});
                console.log(sdata, 'SearchData Fields ')
                
                //this.setState({ showMapping: true });	
            });
    }

    YearlyTarget = () => {
        var rst;
        this.setState({ loder: false,flag:true })
        fetch(`${ContractConfig.RateConfigUrl}/api/RatingConfig/CheckIllustration/CheckIllustration/13?From=1&To=`+this.state.ContractDTO.duration, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.calculateDTO)
        }).then(response => response.json())
            .then(data => {
              
            
                if (data.length > 0) {

                    this.setState({ Calculateresult: data});
                    console.log(this.state.Calculateresult, 'Result', this.state.drop.year);
                 
                    this.tabledata(data);
                   
                  
                }
                else {
                    setTimeout(
                        function () {
                            this.setState({ loader: true, searchTableSec: false, nodata: true });
                        }.bind(this), 2000
                    );
                }
            });


   
    }

    tabledata = (data) => {
        this.setState({
            flag: true,
            loder:true,
            resultDetails: data.map((prop, key) => {
                return {
                    Period: prop.Period,
                    OCummulativeANP: prop.oCummulativeANP,
                    OMonthlyANP: prop.oMonthlyANP,
                    OEndingManPower: Number(prop.oEndingManPower).toFixed(0),
                    OActiveAgent: prop.oActiveAgent,
                    OActivityRatio: prop.oActivityRatio,
                };
            })
        });
    }
   

    onSubmit1 = (evt) => {
        this.YearlyTarget();
       
    }
    componentDidMount() {
        console.log("ParticipantList", this.props);
        if (this.props.RequrementNo!= undefined) {
            this.setState({ flagmodify: this.props.flagmodify, flagsave: this.props.flagsave, Contractflag: this.props.Contractflag, disableFlag: true   });
            fetch(`${ContractConfig.ContractConfigURL}/api/Contract/GetContractByRecruitmentNo?recruitmentNo=` + this.props.RequrementNo, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
            })
                .then(response => response.json())
                .then(data => {
                    if (data != null) {
                        this.state.ContractDTO.recruitmentNo = data.contract.recruitmentNo;
                        this.state.ContractDTO.name = data.contract.name;
                        this.state.ContractDTO.channel = data.contract.channel;
                        this.state.ContractDTO.subChannel = data.contract.subChannel;
                        this.state.ContractDTO.designation = data.contract.designation;
                        this.state.ContractDTO.contractTerm = data.contract.contractTerm;
                        this.state.ContractDTO.levelId = data.contract.levelId; 
                        this.state.ContractDTO.programApplicableId = data.contract.programApplicableId;
                        this.state.ContractDTO.contractInceptionDate = new Date(data.contract.contractInceptionDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
                        this.state.ContractDTO.contractExpirationDate = new Date(data.contract.contractExpirationDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
                        this.state.ContractDTO.averageIncome = data.contract.averageIncome;
                        this.state.ContractDTO.duration = data.contract.duration;
                        this.state.ContractDTO.codingMonth = data.contract.codingMonth;
                        this.state.ContractDTO.numberOfFreeMonth = data.contract.numberOfFreeMonth;
                        this.state.targetData.programId = data.contract.programApplicableId;
                    }
                    console.log("masterdata", data);
                    this.setState({ masterList: data });
                });
        }
    }
        //this.setState({ flagmodify: this.props.flagmodify });
    handleopenincentive = () => {
        this.setState({ openincentive: true });
    }

    handlecloseincentive = () => {
        this.setState({ openincentive: false });
    }

    onDateChange = (name, event) => {
        let contractDTO = this.state.ContractDTO;
      
        var today = event.toDate();
        var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
        contractDTO[name] = date;
        this.state.selectedDate = event.toDate();
        contractDTO.contractExpirationDate = this.ADDMonthChange(today, this.state.ContractDTO.contractTerm);
        this.setState({ contractDTO });
    }
    ADDMonthChange = (toDay, additionalmonth) => {
        toDay.setDate(toDay.getDate() - 1);
        let ToDATE = toDay;
        return new Date(ToDATE.setMonth(ToDATE.getMonth() + Number(additionalmonth == "" ? 0 : additionalmonth)));
      
    }
    onCreate = () => {
        let InDATE = this.state.ContractDTO.contractInceptionDate;
        let ExDATE = this.state.ContractDTO.contractExpirationDate;
        if (this.state.ContractDTO.contractExpirationDate != "") {
            
            this.state.ContractDTO.contractExpirationDate = this.state.ContractDTO.contractExpirationDate.getFullYear() + '-' + (this.state.ContractDTO.contractExpirationDate.getMonth() + 1) + '-' + this.state.ContractDTO.contractExpirationDate.getDate();
            this.state.ContractDTO.contractExpirationDate = this.datechange(this.state.ContractDTO.contractExpirationDate);
        }
        if (this.state.ContractDTO.contractInceptionDate != "") {
            this.state.ContractDTO.contractExpirationDate = this.datechange(this.state.ContractDTO.contractInceptionDate);
        }

        if (this.state.validationflag == false) {
            let contract = this.state.ContractDTO;
            contract.lstIllustraionModels = this.state.Calculateresult;
            this.setState({ contract });
            fetch(`${ContractConfig.ContractConfigURL}/api/Contract/CreateUpdateContract`, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify(this.state.ContractDTO)
            }).then(response => response.json())
                .then(data => {
                    if (data.status == 2) {
                        swal({

                            text: data.responseMessage,
                            icon: "success"
                        });
                        this.setState({ redirect: true });
                        this.renderRedirect();
                    }
                });
        } 
        this.state.ContractDTO.contractInceptionDate = InDATE;
        this.state.ContractDTO.contractExpirationDate = ExDATE;
    }
    renderRedirect = () => {
        if (this.state.redirect == true) {
            return <Redirect to={{
                pathname: '/dashboard/home',

            }} />
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Card>
                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                            { /*  <FilterNone /> */}

                            {/*<Icon><img id="icon" src={searchproduct} /></Icon>*/}

                        </CardIcon>
                        <h4 className={this.props.cardIconTitle}>
                            <small> Intermediary Details </small>
                        </h4>
                    </CardHeader>
                    <CardBody>
                        <GridContainer>

                            <GridItem xs={12} sm={12} md={4}> <CustomInput
                                labelText="Recruitment Number"
                                name="recruitmentNo"
                                disabled={this.state.disableFlag}
                                value={this.state.ContractDTO.recruitmentNo}
                                onChange={this.onInputChange}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                                {this.state.validationflag ? <p className="error">{this.state.validationMassage}</p> : null}
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}> <CustomInput
                                labelText="Name"
                                name="name"
                                disabled={this.state.disableFlag}
                                value={this.state.ContractDTO.name}
                                onChange={this.onInputChange}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}> <CustomInput
                                labelText="Channel"
                                name="channel"
                                disabled={this.state.disableFlag}
                                value={this.state.ContractDTO.channel}
                                onChange={this.onInputChange}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}> <CustomInput
                                labelText="SubChannel"
                                name="subChannel"
                                value={this.state.ContractDTO.subChannel}
                                onChange={this.onInputChange}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}> <CustomInput
                                labelText="Designation"
                                name="designation"
                                value={this.state.ContractDTO.designation}
                                onChange={this.onInputChange}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}> <CustomInput
                                labelText="Level"
                                disabled={this.state.disableFlag}
                                required={true}
                                name="levelId"
                                value={this.state.ContractDTO.levelId}
                                onChange={(e) => this.onInputChange2(e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                    labelText="Contract Term"
                                    name="contractTerm"
                                    value={this.state.ContractDTO.contractTerm}
                                    onChange={(e)=>this.onInputChange(e)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />

                            </GridItem>

                            <GridItem xs={12} sm={12} md={4}>
                                <CustomDatetime
                                    labelText="Contract Inception Date"
                                    id='contractInceptionDate'
                                    disabled={this.state.disableFlag}
                                    name='contractInceptionDate'
                                    onChange={(event) => this.onDateChange('contractInceptionDate', event)}
                                    value={this.state.ContractDTO.contractInceptionDate}
                                    required={true}
                                    formControlProps={{ fullWidth: true }}
                                />

                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                                <CustomDatetime
                                  
                                    disabled={true}
                                    labelText="Contract Expiry Date"
                                    id='contractExpirationDate'
                                    name='contractExpirationDate'
                                    //onChange={(event) => this.onDateChange('datetime', 'effectiveFrom', event)}
                                    value={this.state.ContractDTO.contractExpirationDate}
                                    required={true}
                                    formControlProps={{ fullWidth: true }}
                                />

                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                                <Dropdown
                                    labelText=" Program Applicable"
                                    id="ddlstatus"
                                    required={true}	
                                    disabled={this.state.disableFlag}
                                    lstObject={this.state.levels}
                                    //filterName='Year'	
                                    value={this.state.targetData.programId}
                                    name='programId'
                                    onChange={this.onInputChange2}
                                    formControlProps={{ fullWidth: true }} />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}> <CustomInput
                                labelText="Average Income"
                                name="averageIncome"
                                disabled={this.state.disableFlag}
                                value={this.state.ContractDTO.averageIncome}
                                onChange={this.onInputChange}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                          
                            <GridItem xs={12} sm={4} md={4}>
                                <Dropdown
                                    id="duration"
                                    labelText="Duration"
                                    disabled={this.state.disableFlag}
                                    lstObject={this.state.Duration}
                                    value={this.state.ContractDTO.duration}
                                    name='duration'
                                    formControlProps={{ fullWidth: true }}
                                    onChange={this.onInputChange}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                  
                                    labelText="Coding Month"
                                    id='codingMonth'
                                    name='codingMonth'
                                    disabled={this.state.disableFlag}
                                    value={this.state.ContractDTO.codingMonth}
                                    required={true}
                                    onChange={this.onInputChange}
                                    formControlProps={{ fullWidth: true }}
                                />

                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}> <CustomInput
                                labelText="No Of Free Months"
                                name="numberOfFreeMonth"
                                disabled={this.state.disableFlag}
                                value={this.state.ContractDTO.numberOfFreeMonth}
                                onChange={this.onInputChange}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                           
                        </GridContainer>
                        {this.state.flagsave ?
                            <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={4}>
                            <Button color="warning" style={{ 'top': '14px' }} round onClick={() => this.onSubmit()}>submit</Button>
                            </GridItem>
                            </GridContainer>
                        : null}
                        {/*     {this.state.react && <ReactTables officelist={this.state.officelist} editFunction={this.editFunction} />} */}

                    </CardBody>

                </Card>
                {this.state.flagmodify ?
                <Card>
                    <CardHeader color="rose" icon>

                        <h4 className={this.props.cardIconTitle}>
                            <small> Target and Goal Sheet </small>
                        </h4>
                    </CardHeader>
                    <CardBody>
                        <GridContainer>

                            <GridItem xs={12} sm={12} md={4}> <CustomInput
                                labelText="Allowance"
                                name="Allowance"
                                value={this.state.goal.Allowance}
                                onChange={(e) => this.onInputChange2(e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}> <CustomInput
                                labelText="Total Cost"
                                name="Cost"
                                value={this.state.goal.Cost}
                                onChange={(e) => this.onInputChange2(e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}> <CustomInput
                                labelText="Total ANP Target"
                                name="ANP"
                                value={this.state.goal.ANP}
                                onChange={(e) => this.onInputChange2(e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}> <CustomInput
                                labelText="Manpower"
                                name="Manpower"
                                value={this.state.goal.Manpower}
                                onChange={(e) => this.onInputChange2(e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}> <CustomInput
                                labelText="Activity Agents"
                                name="ActiveAgents"
                                value={this.state.goal.ActiveAgents}
                                onChange={(e) => this.onInputChange2(e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>

                            <GridItem xs={12} sm={12} md={4}>
                                <Button color="warning" style={{ 'top': '14px' }} round onClick={() => this.onSubmit1()}>Create Validation Schedule</Button>

                            </GridItem>
                        </GridContainer>


                        {/*     {this.state.react && <ReactTables officelist={this.state.officelist} editFunction={this.editFunction} />} */}

                    </CardBody>
                    </Card>
                    : null}
                {this.state.flag ?
                    this.state.loder?
                    <Card>
                        <CardHeader color="rose" icon>

                        </CardHeader>
                        <CardBody>


                            <GridItem xs={12} sm={4} md={4}>
                                <Dropdown
                                    id="year"
                                    labelText="Year"
                                    lstObject={this.state.year}
                                    value={this.state.drop.year}
                                    name='year'
                                    formControlProps={{ fullWidth: true }}
                                    onChange={(e)=>this.onInputChange1(e)}
                                />
                            </GridItem>
                            {this.state.falgdrop ?
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={4}> <CustomInput
                                        labelText="Monthly ANP"
                                        name="oMonthlyANP"
                                        value={this.state.filterObj.oMonthlyANP}
                                        //onChange={this.onInputChange}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}> <CustomInput
                                        labelText="Cummulative ANP"
                                        name="oCummulativeANP"
                                        value={this.state.filterObj.oCummulativeANP}
                                        //onChange={this.onInputChange}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}> <CustomInput
                                        labelText="Ending Manpower"
                                        name="oEndingManPower"
                                        value={Number(this.state.filterObj.oEndingManPower).toFixed(0)}
                                        //onChange={this.onInputChange}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}> <CustomInput
                                        labelText="Active ratio"
                                        name="oActivityRatio"
                                        value={this.state.filterObj.oActivityRatio}
                                        //onChange={this.onInputChange}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}> <CustomInput
                                        labelText="Active Agent"
                                        name="oActiveAgent"
                                        value={this.state.filterObj.oActiveAgent}
                                        //onChange={this.onInputChange}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                    </GridItem>

                                </GridContainer>
                                : null}

                        </CardBody>
                    </Card>

                    : <PageContentLoader />:null}
                {this.state.datagrid ?

                    <GridContainer lg={12}>

                        <ReactTable
                            data={this.state.resultDetails}
                            filterable
                            columns={[
                                {
                                    Header: "Month",
                                    accessor: "Period",
                                    minWidth: 20,
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    sortable: false,
                                    filterable: false,
                                    resizable: false,

                                }, {
                                    Header: "Monthly ANP",
                                    accessor: "OMonthlyANP",
                                    minWidth: 20,
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    sortable: false,
                                    filterable: false,
                                    resizable: false,

                                },
                                {
                                    Header: "Cummulative ANP",
                                    accessor: "OCummulativeANP",
                                    minWidth: 20,
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    sortable: false,
                                    filterable: false,
                                    resizable: false,

                                },
                                {
                                    Header: "Ending Manpower",
                                    accessor: "OEndingManPower",
                                    minWidth: 20,
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    sortable: false,
                                    filterable: false,
                                    resizable: false,

                                },
                                {
                                    Header: "Active Agent",
                                    accessor: "OActiveAgent",
                                    minWidth: 20,
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    sortable: false,
                                    filterable: false,
                                    resizable: false,

                                },
                                {
                                    Header: "Activity Ratio",
                                    accessor: "OActivityRatio",
                                    minWidth: 20,
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    sortable: false,
                                    filterable: false,
                                    resizable: false,

                                }



                            ]}
                            defaultPageSize={5}
                            showPaginationTop={false}
                            showPaginationBottom
                            //pageSize={([this.state.data.length + 1] < 5) ? [this.state.data.length + 1] : 5}
                            //showPaginationBottom={([this.state.data.length + 1] <= 5) ? false : true}
                            className="-striped -highlight"
                        />



                      
                {this.state.Contractflag ?
                            <GridContainer lg={12}>
                                <GridItem xs={12} sm={12} md={4}>
                                    <Button color="warning" style={{'position': 'absolute','left': '37%'}} round onClick={() => this.onCreate()}>Create Contract</Button>

                                </GridItem>
                            </GridContainer>
                            : null}
                       
                    </GridContainer> : null}
                {this.renderRedirect()}
            </div>
        );
    }
}

export default withStyles(styles)(GenerateContract);