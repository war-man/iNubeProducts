import React from "react";
import Radio from "@material-ui/core/Radio";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import Treaty from "assets/img/Treaty.png";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import swal from 'sweetalert';
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
import TreatyDetails from "modules/Reinsurance/views/TreatyConfig.jsx";
import TPDetails from "modules/Reinsurance/views/_TPDetails.jsx";
import ParticipantGrid from "modules/Reinsurance/views/_AddParticipantGrid.jsx";
import Arrangements from "modules/Reinsurance/views/_Arrangements.jsx";
import Edit from "@material-ui/icons/Edit";
import Add from "@material-ui/icons/AddCircleOutline";
import Delete from "@material-ui/icons/Delete";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import Visibility from "@material-ui/icons/Visibility";
import Modal from '@material-ui/core/Modal';
import ReinsuranceConfig from "modules/Reinsurance/ReinsuranceConfig.js";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import validationPage from "modules/Accounts/views/ValidationPage.jsx";
import { object } from "prop-types";
const searchClose = {
    float: "right",
    position: 'relative',
    width: "26px",
    height: "28px",
    borderRadius: "4px",
    fontSize: "larger",
    padding: "0px",
    right: '10px',

};
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

class CreateTreaty extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            surplusmaslist: [],
            Treatyflag: false,
            Treatymassage: "",
            higherlowerflag:false,
            allocationbasisflag: false,
            surpluslist:[],
            allocationOnflag: false,
            higherflag: false,
            allocationList:[],
            allocationmasList:[],
            showPercentage: false,
            showlimit: false,
            showperwithlimit: false,
            shownooflines: false,
            reinsurerCode: "",
            ribranchCode:"",
            brokerCode: "",
            bkbranchCode: "",
            brodreuxfreq: "",
            ddllist:[],
            newdata: [],
            reinsurername: "",
            flag: true,
            treatyCodeState: false,
            treatyDescriptionState: false,
            treatyGroupNameState: false,
            percentageState: false,
            plaState: false,
            claState: false,
            amountState: false,
            reinsurernameState: false,
            flagUpdate: false,
            editModal: false,
            datename: [],
            datetime: [],
            datetemp: [],
            arrViewindex: 0,
            masterList: [],
            newmasterList: [],
            yearmasterList: [],
            rimasterList: [],

            remasterlist: [],
            brmasterlist: [],

            bcmasterList: [],
            bkmasterList: [],
            bkbcmasterList: [],
            open: false,
            mvalue: [],
            showparticipantgrid: false,
            nonedit: false,
            chindex: -1,
            deldata: [],
            TreatytableData: [],
            participantstableData: [],
            newmasterList: [],
            showTreatyGrp: true,
            DuplicateTreaty: {
                treatyGroupId: 0,
            },
            participant: {
                "reInsurerId": "",
                "brokername":"",
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
            duplicateparticipant: {
                "reInsurerId": "",
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
            //Arrangement: [
            //    {
            //        "allocationOnId": "",
            //        "allocationLogicId": "",
            //        "percentage": "",
            //        "amount": "",
            //        "noOfLines": "",
            //        "higherOrLowerId": "",
            //        "allocationBasisId": "",
            //        "maxCeidingLimit": "",
            //        "pla": "",
            //        "cla": "",
            //        "isActive": "Y"
            //    }],
            treatydata: [
                {
                    //"treatyGroupName": "",
                    //"businessTypeId": "",
                    //"isActive": "Y",
                    "treatyGroupName": "",
                    "businessTypeId": "",
                    "isActive": "",
                    "tblArrangement": [
                        {
                            //"allocationOnId": "",
                            //"allocationLogicId": "",
                            //"percentage": 0,
                            //"amount": 0,
                            //"noOfLines": 0,
                            //"higherOrLowerId": "",
                            //"allocationBasisId": "",
                            //"maxCeidingLimit": 0,
                            //"pla": "",
                            //"cla": "",
                            //"isActive": "Y"
                            "allocationOnId": "",
                            "allocationLogicId": "",
                            "percentage": "",
                            "amount": "",
                            "noOfLines": "",
                            "higherOrLowerId": "",
                            "allocationBasisId": "",
                            "maxCeidingLimit": "",
                            "pla": "",
                            "cla": "",
                            "isActive": ""
                        }],

                }
            ],

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

            }
        };
        this.handleAggrement = this.handleAggrement.bind(this);
    }
    onFormModify = (id) => {
        fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/ModifyfTraty?treatyId=` + this.props.treatyGroupId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.treatyDTO)
        }) //.then(response => response.json())
            .then(data => {
                console.log("data456", data);
                this.setState({ treatyDTO: data });
                console.log("Treaty data:", this.state.treatyDTO);

            });
        //let flageUpdate = this.state.flagUpdate
        //this.setState({ flageUpdate:true})
    }
    AddTreatyRecord = (event, index) => {
        //let arr = Object.assign([], this.state.Arrangement);
        //if (this.state.treatydata[index].treatyGroup !== "" && this.state.treatydata[index].businessTypeId !== "" ) {
        const arr = [
            {
                "allocationOnId": "",
                "allocationLogicId": "",
                "percentage": "",
                "amount": "",
                "noOfLines": "",
                "higherOrLowerId": "",
                "allocationBasisId": "",
                "maxCeidingLimit": "",
                "pla": "",
                "cla": "",
                "isActive": "Y"
            }];
        let TreatyDetails = this.state;
        TreatyDetails['treatydata'] = this.state.treatydata.concat({ treatyGroupName: "", businessTypeId: "", tblArrangement: arr });
        this.setState({ TreatyDetails });
        console.log("treatydata", this.state.treatydata[index].treatyGroup, this.state.treatydata);

        console.log("Aggreement", this.state.Arrangement);
        console.log("iindex", index);
        this.AddTreatyTable();
        // }
    }
    onDateChange = (name, event) => {

        //var today = event.toDate();
        //if (today.getDate() < 10) {
        //    var dt = '0' + today.getDate();
        //}
        //else {
        //    var dt = today.getDate();
        //}
        //if (today.getMonth() < 10) {
        //    var mm = '0' + (today.getMonth() + 1)
        //}
        //else {
        //    var mm = (today.getMonth() + 1);
        //}
        //var date = dt + '/' + mm + '/' + today.getFullYear();
        //var date2 = new Date();
        //var date1 = new Date(today);
        var today = event.toDate();
        var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
        console.log("today", today);
        console.log("date", date);
        //if (type == 'Datetime') {
        let fields = this.state.treatyDTO;
        fields[name] = date;
        this.setState({ fields });
        //}

        const treatyDTO = this.state.treatyDTO;
        treatyDTO[name] = date;
        this.setState({ treatyDTO });
        if (this.state.datename.length == 0) {
            this.state.datename.push(name);
            this.state.datetemp.push(date);
            this.state.datetime.push(this.datechange(date));
        } else {
            for (var i = 0; i <= this.state.datetime.length - 1; i++) {
                if (this.state.datename[i] !== name) {
                    this.state.datename.push(name);
                    this.state.datetemp.push(date);
                    this.state.datetime.push(this.datechange(date));
                }
            }
        }

        console.log("datetime", this.state.treatyDTO);

    };
    datechange = (date) => {
        const _date = date.split('/');
        const dateObj = { month: _date[1], year: _date[2], day: _date[0] };

        return dateObj.year + '-' + dateObj.month + '-' + dateObj.day;
    }
    deleteTreatyRecord = (event, index) => {
        let deldata = this.state.treatydata.splice(index, 1);
        //let deldata = this.state.treatydata.filter(item => item.treatyGroup !== index);
        this.setState({ deldata })
        console.log("deldata", this.state.deldata);
        this.AddTreatyTable();
    }
    SetTreatyDetailsValue = (type, event, index) => {
        event.preventDefault();
        let name = event.target.name;
        let value = event.target.value;
        //this.state.treatydata[name] = value;
        //this.setState({ treatydata})


        let treatydata = this.state.treatydata;

        treatydata[index][name] = value;

        this.setState({ treatydata });
        this.AddTreatyTable();
    }
    SetTreatyDetailsValue1 = (event, index) => {
        debugger;
        event.preventDefault();
        let name = event.target.name;
        let value = event.target.value;
        //this.state.treatydata[name] = value;
        //this.setState({ treatydata})
        let treatydata = this.state.treatydata;
        treatydata[index][name] = value;
        this.setState({ treatydata });
        this.AddTreatyTable();
    }
    componentDidMount() {

        //this.ParticipantTable();

        //this.AddTreatyRecord();
        this.onInputChange1();
        if (this.props.showTreatyGrp != undefined) {
            this.setState({ showTreatyGrp: false });

        }
        if (this.props.treatyGroupId != undefined) {
            console.log(this.props.flagEdit, 'FlagEditProps');
            this.setState({ flag: false, flagUpdate: this.props.flagUpdate });
            fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/GetTreatyById?treatyId=` + this.props.treatyGroupId, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
            }).then(response => response.json())
                .then(data => {
                    this.setState({ treatyDTO: data });
                    this.state.treatyDTO.startDate = new Date(data.startDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
                    this.state.treatyDTO.endDate = new Date(data.endDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
                    this.setState({})
                    console.log("ttt", this.state.treatyDTO);
                });
        }
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
                this.AddTreatyTable();

                console.log("masterdata", data, this.state.treatyDTO.treatyBasisIdf);
                console.log("newmasterlist", this.state.newmasterList);
            });
        fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/MasterYearData`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("Create Treaty masterList: ", data);
                this.setState({ yearmasterList: data });

                console.log("yearmasterList", this.state.yearmasterList);
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
    handleClose = () => {
        this.setState({ open: false });
    }
    ViewArrngements = (evt, index) => {
        this.state.arrViewindex = index;
        this.setState({ arrViewindex: index, open: true });

    }
    handleAggrement = (evt) => {
        let trety = this.state.treatydata[this.state.arrViewindex].tblArrangement[0];
        console.log("trety", trety, this.state.arrViewindex);
        trety[evt.target.name] = evt.target.value;
        console.log("evt.target.value", evt.target.value);
        this.setState({ trety });
        if (evt.target.value == "20"&&evt.target.name=='allocationLogicId') {
            this.setState({ showPercentage: true, showlimit: false, showperwithlimit: false,shownooflines: false})
        }
        else if (evt.target.value == "21" && evt.target.name == 'allocationLogicId') {
            this.state.showPercentage = false;
            this.state.showlimit = true;
            this.state.showperwithlimit = false;
            this.state.shownooflines = false;
            this.state.higherflag = false;
            //this.setState({ showlimit })

            //const { showTable } = this.state.showTable;
            //this.setState({ showTable: !showTable });
            //const { showColumn } = this.state.showColumn;
            //this.setState({ showColumn: !showColumn, [event.target.name]: event.target.value });

        }
        else if (evt.target.value == "22" && evt.target.name == 'allocationLogicId') {
            this.state.showPercentage = true;
            this.state.showlimit = true;
            this.state.showperwithlimit = false;
            this.state.shownooflines = false;
            this.state.higherflag = true;
            //this.setState({ showPercentage })
            //this.setState({ showlimit })

            //const { showTable } = this.state.showTable;
            //this.setState({ showTable: !showTable });
            //const { showColumn } = this.state.showColumn;
            //this.setState({ showColumn: !showColumn, [event.target.name]: event.target.value });

        }
        else if (evt.target.value == "33" && evt.target.name == 'allocationLogicId') {
            this.state.showPercentage = false;
            this.state.showlimit = false;
            this.state.showperwithlimit = false;
            this.state.shownooflines = true;
            this.state.higherflag = false;
            //this.setState({ showPercentage })
            //this.setState({ showlimit })

            //const { showTable } = this.state.showTable;
            //this.setState({ showTable: !showTable });
            //const { showColumn } = this.state.showColumn;
            //this.setState({ showColumn: !showColumn, [event.target.name]: event.target.value });

        }
        console.log("trety1,index", this.state.treatydata, this.state.arrViewindex);
    }
    handleAggrement1 = (type, evt) => {
        let name = evt.target.name;
        let trety = this.state.treatydata[this.state.arrViewindex].tblArrangement[0];
        console.log("trety", trety, this.state.arrViewindex);
        trety[evt.target.name] = evt.target.value;
        this.setState({ trety });
        this.change(evt, name, type);
        console.log("trety1,index", this.state.treatydata, this.state.arrViewindex);
    }
    AddTreatyTable = () => {

        // if (this.state.newmasterlist.length > 0) {
        console.log("product channel", this.state.masterList, this.state.newmasterlist);

        let con = this.state.newmasterlist;


        this.setState({
            TreatytableData: this.state.treatydata.map((prop, key) => {
                //console.log("this.ProductDetails.productChannel[key].channelTypeId", key, con, this.ProductDetails.productChannel[key].channelTypeId, this.state.chindex + 1);
                return {
                    id: key + 1,

                    treatyGroup: <CustomInput labelText="" id="BusinessTypeText" required={true} value={this.state.treatydata[key].treatyGroupName} error={this.state.treatyGroupNameState} name="treatyGroupName" onChange={(e) => this.SetTreatyDetailsValue("alphaNumeric", e, key)} formControlProps={{ fullWidth: true }
                    } />,
                    selectType: <Dropdown id="treatydata.businessTypeId" labelText={(this.state.treatydata[key].businessTypeId == "") ? "Select" : ""} lstObject={this.state.newmasterList} value={this.state.treatydata[key].businessTypeId} name='businessTypeId' formControlProps={{ fullWidth: true }} onChange={(e) => this.SetTreatyDetailsValue1(e, key)} />,

                    Action: <div><Button justIcon round simple color="info" className="add" onClick={(e) => this.AddTreatyRecord(e, key)} ><Add /> </Button >
                        <Button justIcon round simple color="info" className="add" onClick={(e) => this.ViewArrngements(e, key)} ><Visibility /></Button >

                        <Button justIcon round simple color="danger" className="remove" onClick={(e) => this.deleteTreatyRecord(e, key)} ><Delete /> </Button >
                    </div>
                };
            })
        });
        //}
    }

    //ParticipantTable = () => {

    //    // if (this.state.newmasterlist.length > 0) {
    //    console.log("product channel", this.state.masterList, this.state.newmasterlist);

    //    let con = this.state.newmasterlist;


    //    this.setState({
    //        participantstableData: this.state.participantdata.map((prop, key) => {

    //        })
    //    });
    //}


    AddParticipant = () => {
        this.state.treatyDTO.tblParticipant.push(this.state.participant);
        this.state.participant = {
            "reInsurerId": "",
            "brokername":"",
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

    handleRadioChange = (e) => {
        let value = e.target.value;
        this.state.radioVal = e.target.value;
        this.setState({ selectedValue: e.target.value });

        //UserData[name] = value;
        //this.setState({ UserData })
        if (this.state.radioVal == "1001") {
        }
        else if (this.state.radioVal == "1002") {

        }
        else { }
    }


    onInputChange = (type, evt) => {
        let name = evt.target.name;
        let value = evt.target.value;
        let Data = this.state.treatyDTO;
        Data[name] = value;
        this.setState({ Data });
        console.log("Data1:", this.state.treatyDTO)
        this.change(evt, name, type);
    }
    onparticipantInputChange = (evt) => {
        let name = evt.target.name;
        let value = evt.target.value;
        let Data = this.state.participant;
        Data[name] = value;
        this.setState({ Data });
        console.log("Data1:", this.state.treatyDTO)
        //this.change(evt, name, type);
    }
    onInputChange1 = (evt) => {
        //if (evt.target.value = "4") {
        //    this.state.AllocationList = this.state.AllocationList;
        //} else
       
        if (evt != null) {
            let name = evt.target.name;
            let value = evt.target.value;
            let Data = this.state.treatyDTO;
            Data[name] = value;
            this.setState({ Data });
        } else {
            let Data = this.state.treatyDTO;
            Data['treatyBasisId'] = this.state.treatyDTO.treatyBasisId;
            this.setState({ Data });
        }
        debugger;
        if (evt != null) {
            if (evt.target.value == "4") {
                this.state.allocationList = this.state.allocationmasList.filter(m => m.mValue != 'Lines');

                this.setState({ allocationbasisflag: false, allocationOnflag: true, higherflag:false});
                console.log("ddlvals", this.state.allocationList);
            }
            else if (evt.target.value == "5") {
                this.state.allocationList = this.state.allocationmasList.filter(m => m.mValue == 'Lines');
                this.state.surpluslist = this.state.surplusmaslist.filter(m => m.mValue != 'Sum Insured');

                this.setState({ allocationbasisflag: true, allocationOnflag: false, higherflag:false });
                console.log("ddlvals", this.state.allocationList);
            }
        }
        console.log("Data2:", this.state.treatyDTO)
    }
    change(evt, stateName, type, stateNameEqualTo, maxValue) {
        debugger;
        switch (type) {
            case "range":
                if (validationPage.verifyAcCode(evt.target.value)) {
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            case "string":
                if (validationPage.verifyName(evt.target.value)) {
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            case "numeric":
                if (validationPage.verifyAccountCode(evt.target.value)) {
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            case "alphaNumeric":
                if (validationPage.verifyAlphaNumeric(evt.target.value)) {
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            default:
                break;
        }
    }
    onddChange = (evt, id, name) => {
        debugger;
        const Data = this.state.participant;
        Data[evt.target.name] = evt.target.value;
        this.setState({ Data });
        console.log("Data2:", this.state.treatyDTO, this.state.reinsurerCode)
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
        if (name == 'bordereauxFreqId' && this.state.masterList!= null) {
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
                    if (data!=null) {
                        this.state.reinsurername = data[0].participantName;
                    }
                    this.setState({});
                });
        }
    }
    onddlChange = (evt, name) => {
        const Data = this.state.participant;
        Data[evt.target.name] = evt.target.value;
        this.setState({ Data });
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
        if (name == 'brokerBranchId' && this.state.bkbcmasterList!=null) {
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
                    }
                    this.setState({});
                });
        }
        console.log("this.state.brokername", this.state.participant.brokername);
    }
    handleSaveTreaty = () => {
        for (var i = 0; i <= this.state.datename.length - 1; i++) {

            this.state.treatyDTO[this.state.datename[i]] = this.state.datetime[i];
        }
        console.log("finalconverteddt", this.state.treatyDTO);
        this.state.treatyDTO.tblTreatyGroup = [... this.state.treatyDTO.tblTreatyGroup, ...this.state.treatydata];
        console.log("Treatydto", this.state.treatyDTO);
        fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/SaveTreatyData`, {
            method: 'Post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.treatyDTO)
        }).then(response => response.json())
            .then(data => {
                if (data.status == 2) {
                    swal({
                        text: data.responseMessage,
                        icon: "success"
                    });
                }
                console.log("dataresp", data);
            })
    }
    dataTable = () => {
        let ParticipantList = this.state.treatyDTO.tblParticipant;
        this.setState({
            newdata: ParticipantList.map((prop, key) => {
                console.log("trtprop", prop, ParticipantList, this.state.ddllist, this.state.reinsurername);
                return {
                    id: key,
                    reinsurercodeId: prop.reInsurerId,
                    //this.state.ddllist.filter(x => x.reinsurercodeId == ParticipantList[key].reinsurercodeId)[0].mValue,
                    reinsurername: this.state.reinsurername,
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
                        //this.state.brodreuxfreq,

                };
            })
        });
      

    }
    onBlur = () => {

        debugger
        //fetch(`${UserConfig.UserConfigUrl}/api/Role/GetDynamicGraphPermissions?Userid=` + userid + `&Roleid=` + roleid + `&itemType=` + "Graph",
        fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/RIValidations?codeName=` + this.state.treatyDTO.treatyCode + '&type=' + "TreatyCode", {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.status == 9) {
                    this.setState({ Treatyflag: true, Treatymassage: data.responseMessage });
                } else {
                    this.setState({ Treatyflag: false, Treatymassage: "" });
                }
                //this.AddTreatyTable();
            });
        console.log("data", this.state.masterList);
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12} >
                        <TreatyDetails
                            treatyCodeState={this.state.treatyCodeState} Treatyflag={this.state.Treatyflag} Treatymassage={this.state.Treatymassage} treatyDescriptionState={this.state.treatyDescriptionState} allocationmasList={this.state.allocationmasList}
                            handleRadioChange={this.handleRadioChange} treatyDTO={this.state.treatyDTO} masterList={this.state.masterList} onInputChange={this.onInputChange} onInputChange1={this.onInputChange1} onBlur={this.onBlur} tblArrangement={this.state.tblArrangement} onddChange={this.onddChange} yearmasterList={this.state.yearmasterList} onDateChange={this.onDateChange} />
                        {this.state.showTreatyGrp && <TPDetails TreatytableData={this.state.TreatytableData} participantstableData={this.state.participantstableData} participantdata={this.state.participantdata} bkmasterList={this.state.bkmasterList} masterList={this.state.masterList} onddlChange={this.onddlChange} participant={this.state.participant} newdata={this.state.newdata}
                            onddChange={this.onddChange} onparticipantInputChange={this.onparticipantInputChange} AddParticipant={this.AddParticipant} showparticipantgrid={this.state.showparticipantgrid} treatyDTO={this.state.treatyDTO} rimasterList={this.state.rimasterList} bcmasterList={this.state.bcmasterList} bkbcmasterList={this.state.bkbcmasterList} reinsurername={this.state.reinsurername} />

                        }

                        {this.state.showparticipantgrid ? <ParticipantGrid participantdata={this.state.participantdata} participantstableData={this.state.participantstableData} newdata={this.state.newdata}/> : null}
                        {this.state.flag &&
                            <center>
                                <Button round color="rose" onClick={this.handleSaveTreaty}><TranslationContainer translationKey="Submit" /></Button>
                            </center>}
                        {this.state.flagUpdate &&
                            <center>
                                <Button color="rose" onClick={this.onFormModify}><TranslationContainer translationKey="Update" /></Button>
                            </center>}
                    </GridItem>
                    <GridItem>

                        <Modal
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={this.state.open}
                            onClose={this.handleClose}

                        >
                            <div className={classes.paper} id="modal-small">


                                <Button color="info"
                                    round
                                    className={classes.marginRight}
                                    style={searchClose}
                                    onClick={this.handleClose}>
                                    &times;
                                </Button>
                                <Arrangements handleAggrement={this.handleAggrement} handleAggrement1={this.handleAggrement1} percentageState={this.state.percentageState} amountState={this.state.amountState} plaState={this.state.plaState} claState={this.state.claState} treatydata={this.state.treatydata} index={this.state.arrViewindex} masterList={this.state.masterList} handleClose={this.handleClose} showPercentage={this.state.showPercentage} showlimit={this.state.showlimit} showperwithlimit={this.state.showperwithlimit} shownooflines={this.state.shownooflines} allocationList={this.state.allocationList} allocationbasisflag={this.state.allocationbasisflag} allocationOnflag={this.state.allocationOnflag} higherflag={this.state.higherflag} surpluslist={this.state.surpluslist}/>
                            </div>
                        </Modal>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default withStyles(style)(CreateTreaty);