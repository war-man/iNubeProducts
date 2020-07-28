import React from "react";
import Radio from "@material-ui/core/Radio";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import TreatySearch from "assets/img/Treaty-doc.png";
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
import ReinsuranceConfig from "modules/Reinsurance/ReinsuranceConfig.js";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import Edit from "@material-ui/icons/Edit";
import Modal from '@material-ui/core/Modal';
import { Redirect } from 'react-router-dom';
import CreateTreaty from "modules/Reinsurance/views/CreateTreaty.jsx";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import Delete from "@material-ui/icons/Delete";
import swal from 'sweetalert';
import validationPage from "modules/Accounts/views/ValidationPage.jsx";
import Visibility from "@material-ui/icons/Visibility";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import Add from "@material-ui/icons/AddCircleOutline";
import TreatyDetails from "modules/Reinsurance/views/TreatyConfig.jsx";
import TPDetails from "modules/Reinsurance/views/_TPDetails.jsx";
import ParticipantGrid from "modules/Reinsurance/views/_AddParticipantGrid.jsx";
import Arrangements from "modules/Reinsurance/views/_Arrangements.jsx";
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

class SearchTreaty extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableflag:false,
            arrangementflag:false,
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
            createtreatyflag: true,
            modifytreatyflag: false,
            flagDuplicate: false,
            addeddata: "",
            surplusmaslist: [],
            Treatyflag: false,
            Brokerageflag: false,
            Treatymassage: "",
            higherlowerflag: false,
            allocationbasisflag: false,
            surpluslist: [],
            allocationOnflag: false,
            higherflag: false,
            allocationList: [],
            allocationmasList: [],
            showPercentage: false,
            showlimit: false,
            showperwithlimit: false,
            shownooflines: false,
            reinsurerCode: "",
            ribranchCode: "",
            brokerCode: "",
            bkbranchCode: "",
            brodreuxfreq: "",
            ddllist: [],
            newdata: [],
            //reinsurername: "",
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
            startdate: "",
            enddate:"",
            show: false,
            showG: false,
            createtreatyflag: true,
            modifytreatyflag: false,
            treatyId:"",
            IsParameterGrid: false,
            masterList: [],
            yearmasterlist: [],
            newdata: [],
            open: false,
            treatySelectedId: "",
            treatyGroupId:"",
          
            showTreatyflag: false,
            editModal: false,
            redirect: false,
            trtid: "",
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
            SearchTreaty: {
                treatyCode: null,
                treatyDescription: null,
                startDate: null,
                endDate: null,
                treatyYear: null
                
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
            }
        };
    }
    onInputChange = (evt) => {
        const Data = this.state.SearchTreaty;
        Data[evt.target.name] = evt.target.value;
        this.setState({ Data });
        console.log("Data", this.state.SearchTreaty);
        let name = evt.target.name;
        let value = evt.target.value;
        let Data1 = this.state.treatyDTO;
        Data1[name] = value;
        this.setState({ Data1 });
        console.log("Data1:", this.state.treatyDTO)
        //this.change(evt, name, type);
    }
    editFunction(id, pId) {

        document.getElementById("disp");

        this.setState({ treatySelectedId: pId });
        console.log("treatyid", this.state.treatySelectedId);

    }
    onDelete = (id) => {
        debugger;
        this.state.trtid = id
        //this.setState({ actnId: id })
        //if (this.state.actnId == "") {
        //    swal("", "Please select the Account to delete", "error")
        //}
        //else {
        fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/DeleteTeaty?tratyId=` + this.state.trtid, {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(data => {
            this.onFormSubmit();
            swal({
                text: " Treaty Deleted Successfully",
                icon: "success"
            });
        });

        //}
    }
    handleEdit = (index, id) => {
        debugger;
        this.editFunction(index, id);
        console.log("id", id);
        let edit = this.state;
        edit.close = false;
        edit.editModal = true;
        edit.visibility = false;
        edit.open = true;
        edit.disabled = true;
        edit.flagUpdate = true;
        //edit.createtreatyflag = false;
        //edit.modifytreatyflag = true;
        this.setState({ edit, treatyGroupId: id });
        this.setState({ createtreatyflag: false, modifytreatyflag: true})

        //let flageUpdate = this.state.flagUpdate;
        //this.setState({ flageUpdate: true })
        //let flag = this.state.flag;

        //this.setState({ flag: false })

        console.log("edit", this.state.editModal);

    }
    handleOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
        this.onFormSubmit();
    };
    editFunction(id, pId) {

        document.getElementById("disp");

        this.setState({ treatySelectedId: pId });

    }
    handleRadioOnChange = (event) => {

        this.state.singleValueIsParameter = event.target.value;
        if (event.target.value == 0) {
            this.setState({ IsParameterGrid: true });
            
            this.setState({});
        }
        else {
            this.setState({ IsParameterGrid: false });
        }

    }
    componentDidMount() {

        //fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/MastertypeData`, {
        //    method: 'get',
        //    headers: {
        //        'Accept': 'application/json',
        //        'Content-Type': 'application/json',
        //        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
        //    },
        //})
        //    .then(response => response.json())
        //    .then(data => {
        //        console.log("masterList: ", data);
        //        this.setState({ masterList: data });
        //    });
        //console.log("data", this.state.masterList);

        //fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/MasterYearData`, {
        //    method: 'get',
        //    headers: {
        //        'Accept': 'application/json',
        //        'Content-Type': 'application/json',
        //        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
        //    },
        //})
        //    .then(response => response.json())
        //    .then(data => {
        //        console.log("yearmasterlist: ", data);
        //        this.setState({ yearmasterlist: data });
        //    });
        debugger;
        this.onInputChange1();
        if (this.props.showTreatyGrp != undefined) {
            this.setState({ showTreatyGrp: false });

        }
        console.log("treartgpid", this.props.treatyGroupId);
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
                    debugger;
                    console.log("searchtrtyprops", data);
                    this.state.treatydata = [...data.tblTreatyGroup];
                    this.AddTreatyTable();
                    this.setState({ treatyDTO: data });
                    console.log(data, 'data1');
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
        debugger;
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

    renderRedirect = () => {
        if (this.state.redirect === true) {
            return <Redirect to={{
                pathname: '/Reinsurance/CreateTreaty',

            }} />
        }
    }
    handleAddTreaty = () => {
        debugger;
        this.setState({ redirect: true });
        this.renderRedirect();
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
        const fields = this.state.SearchTreaty;
        fields[name] = date;
        this.setState({ fields });

    };
    onFormSubmit = () => {
        debugger;
        console.log("submit", this.state.SearchTreaty);
        fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/SearchTreaty`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.SearchTreaty)
        }).then(response => response.json())
            .then(sdata => {
                //this.state.searchData = sdata;
                console.log(sdata, 'SearchData Fields ')
                if (sdata.length > 0) {
                    this.dataTable1(sdata);
                    console.log(this.state.newdata, 'New Data123');
                }
                this.setState({ showTreatyflag: true });
            });

        console.log(this.state.newdata, 'New Data');
    }
    dataTable1 = (ParticipantList) => {
        debugger;
        console.log("ParticipantList", ParticipantList);
        this.setState({
            newdata: ParticipantList.map((prop, key) => {
               if (prop.startDate != null) {
                    let fdate = new Date(prop.startDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
                    let edate = new Date(prop.endDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
                    this.setState({ startdate: fdate, enddate: edate });
                }
                return {
                    id: key,
                    treatycode: prop.treatyCode,
                    treatydescription: prop.treatyDescription,
                    startDate: this.state.startdate,                  
                    enddate: this.state.enddate,
                    treatyYear: prop.treatyYear,
                    //stausType: prop.stausType,
                    //enddate: prop.effectiveTo,
                    btn: <div><Button color="info" justIcon round simple className="edit" onClick={this.handleEdit.bind(this, key, prop.treatyId)} editModal={this.state.editModal}><Edit /></Button>
                        <Button color="danger" justIcon round simple className="edit" onClick={() => this.onDelete(prop.treatyId)} ><Delete /></Button>
                    </div>
                };
            })
        });
         
    }
    //create treaty fns
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
    deleteParticipantRecord = (index) => {
        debugger
        let deldata = this.state.treatyDTO.tblParticipant.splice(index, 1);
        let deldatas = this.state.participantdto.splice(index, 1);
        //let deldata = this.state.treatydata.filter(item => item.treatyGroup !== index);
        this.setState({ deldata, deldatas })
        console.log("deldata", this.state.deldata);
        this.dataTable();
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
        if (evt.target.value == "20" && evt.target.name == 'allocationLogicId') {
            this.setState({ showPercentage: true, showlimit: false, showperwithlimit: false, shownooflines: false })
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
    deleteTreatyRecord = (event, index) => {
        let deldata = this.state.treatydata.splice(index, 1);
        //let deldata = this.state.treatydata.filter(item => item.treatyGroup !== index);
        this.setState({ deldata })
        console.log("deldata", this.state.deldata);
        this.AddTreatyTable();
    }
    AddTreatyTable = () => {

         //if (this.state.newmasterlist.length > 0) {
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
            }), tableflag:true
        });
        //}
    }
    AddParticipant = () => {
        this.state.treatyDTO.tblParticipant.push(this.state.participant);
        this.state.participantdto.push(this.state.participantdetail);

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

                this.setState({ allocationbasisflag: false, allocationOnflag: true, higherflag: false });
                console.log("ddlvals", this.state.allocationList);
            }
            else if (evt.target.value == "5") {
                this.state.allocationList = this.state.allocationmasList.filter(m => m.mValue == 'Lines');
                this.state.surpluslist = this.state.surplusmaslist.filter(m => m.mValue != 'Sum Insured');

                this.setState({ allocationbasisflag: true, allocationOnflag: false, higherflag: false });
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
               // this.state.treatyDTO.tblParticipant.push(data.tblParticipant);
                this.setState({ treatyDTO: data });
                console.log("Treaty data:", this.state.treatyDTO);
                this.reset();

            });
        //let flageUpdate = this.state.flagUpdate
        //this.setState({ flageUpdate:true})
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Card >
                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                            <Icon><img id="icon" src={TreatySearch} /></Icon>
                        </CardIcon>
                        {
                            <h4 >
                                <small> <TranslationContainer translationKey="SearchTreaty"/> </small>
                            </h4>
                        }
                    </CardHeader>

                    <CardBody>
                    
                        <GridContainer>
                        <GridItem xs={12} sm={12} md={3}>
                           
                                <FormControlLabel
                                    control={
                                        <Radio

                                            //checked={this.props.singleValueIsParameter === "0"}
                                            checked={true}
                                            onChange={this.handleRadioOnChange}
                                            disabled={this.props.viewdisable}
                                            value={0}
                                            name="radio button demo"
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
                                    label={<TranslationContainer translationKey="Proportional"/>}
                        />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <FormControlLabel
                                    control={
                                        <Radio
                                            checked={this.props.singleValueIsParameter === "1"}
                                            onChange={this.handleRadioOnChange}
                                            disabled={this.props.viewdisable}
                                            value={1}
                                            name="radio button demo"
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
                                    label={<TranslationContainer translationKey="NonProportional"/>}
                                    />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                    <FormControlLabel
                                        control={
                                            <Radio

                                                checked={this.props.singleValueIsParameter === "0"}
                                                onChange={this.handleRadioOnChange}
                                                disabled={this.props.viewdisable}
                                                value={0}
                                                name="radio button demo"
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
                                    label={<TranslationContainer translationKey="Both"/>}
                                    />                          
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridContainer>
                            <GridItem xs={12} sm={12} md={3}>
                                <CustomInput
                                    labelText="TreatyCode"
                                    id="Treatycode"
                                    value={this.state.SearchTreaty.TreatyCode}
                                        name='TreatyCode'
                                    onChange={this.onInputChange}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />

                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <CustomInput
                                    labelText="TreatyDescription"
                                    id="Treatydisc"
                                    value={this.state.SearchTreaty.TreatyDescription}
                                        name='TreatyDescription'
                                    onChange={this.onInputChange}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />

                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>


                                <CustomDatetime
                                    //  success={this.state.billingStartDateState === "success"}
                                    //  error={this.state.billingStartDateState === "error"}
                                        labelText="EffectiveFromDate"
                                        id='EndDate'
                                        name='startDate'
                                        value={this.state.SearchTreaty.startDate}
                                        onChange={(evt) => this.onDateChange('datetime', 'StartDate', evt)}
                                        //value={this.state.SearchRetention.StartDate}
                                        formControlProps={{ fullWidth: true }} />

                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>


                                <CustomDatetime
                                    //  success={this.state.billingStartDateState === "success"}
                                    //  error={this.state.billingStartDateState === "error"}
                                        labelText="EffectiveToDate"
                                        id='EndDate'
                                        name='endDate'
                                        value={this.state.SearchTreaty.endDate}
                                        onChange={(evt) => this.onDateChange('datetime', 'EndDate', evt)}
                                        formControlProps={{ fullWidth: true }} />

                            </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <MasterDropdown
                                        labelText="Year"
                                        id="ddlstatus"
                                        lstObject={this.state.yearmasterlist}
                                        filterName='Year'
                                        value={this.state.SearchTreaty.treatyYear}
                                        name='treatyYear'
                                        onChange={this.onInputChange}
                                        formControlProps={{ fullWidth: true }} />

                                </GridItem>                                                           
                            </GridContainer>
                            <GridContainer justify="center">
                                <GridItem xs={5} sm={12} md={3}>
                                    <Button id="round"  color="info" round onClick={() => this.onFormSubmit()}>
                                        <TranslationContainer translationKey="Search" />
                                    </Button>
                                </GridItem>
                                </GridContainer>
                        </GridContainer>

                       
                       
                        <Modal
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={this.state.open}
                            onClose={this.handleClose}>

                            <div className={classes.paper} id="modal" >
                                <h4>  <small className="center-text">   </small> </h4>
                                <Button color="info"
                                    round
                                    className={classes.marginRight}
                                    id="close-bnt"
                                    //style={searchClose}
                                    onClick={this.handleClose}>
                                    &times;
                                        </Button>
                                <div id="disp" >
                                    <CreateTreaty RetentionSelectedId={this.state.treatySelectedId} editModal={this.state.editModal} flagUpdate={this.state.flagUpdate} disable={this.state.disable} handleClose={this.handleClose} open={this.state.open} close={this.state.close} disabled={this.state.disabled} btnvisibility={this.state.btnvisibility} displaybtn={!this.state.disabled} visibility={this.state.visibility} treatyGroupId={this.state.treatyGroupId} showTreatyGrp={this.state.showTreatyGrp} createtreatyflag={this.state.createtreatyflag} modifytreatyflag={this.state.modifytreatyflag} 
                                        handleRadioChange={this.handleRadioChange} treatyDTO={this.state.treatyDTO} masterList={this.state.masterList} onInputChange={this.onInputChange} onInputChange1={this.onInputChange1} onBlur={this.onBlur} tblArrangement={this.state.tblArrangement} onddChange={this.onddChange} yearmasterList={this.state.yearmasterList} onDateChange={this.onDateChange} treatyCodeState={this.state.treatyCodeState} Treatyflag={this.state.Treatyflag} Treatymassage={this.state.Treatymassage} treatyDescriptionState={this.state.treatyDescriptionState} allocationmasList={this.state.allocationmasList}
                                    />
                                   
                                  
                                </div>
                            </div>
                        </Modal>
                        
                       
                        

                    </CardBody>
                </Card>
                <GridContainer>
                    <GridItem xs={5} sm={3} md={3}>
                        <Button
                            id="round"
                            color="info"
                            size="sm"
                            onClick={this.handleAddTreaty}
                        >
                            <TranslationContainer translationKey="AddNewTreaty" />
                        </Button>
                    </GridItem>
                </GridContainer>
                {this.state.showTreatyflag ? <GridContainer>
                    <GridItem xs={12}>
                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>

                            <ReactTable
                                title={"Treaty List"}
                                data={this.state.newdata}
                                //data={this.state.Billingdata}
                                filterable
                                columns={[
                                    //{
                                    //    Header: "",
                                    //    accessor: "radio",
                                    //    minWidth: 20,
                                    //    style: { textAlign: "center" },
                                    //    headerClassName: 'react-table-center',
                                    //    sortable: false,
                                    //    filterable: false,
                                    //    resizable: false,
                                    //},

                                    {
                                        Header: " Treaty Code",
                                        accessor: "treatycode",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 50,
                                        resizable: false,

                                    },

                                    {
                                        Header: "Treaty Descripton",
                                        accessor: "treatydescription",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 50,
                                        resizable: false,

                                    },

                                    {
                                        Header: "Start Date",
                                        accessor: "startDate",

                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 50,
                                        resizable: false,
                                    },
                                    {
                                        Header: "End Date",
                                        accessor: "enddate",

                                        ///style: { textAlign: "center" },
                                        ///headerClassName: 'react-table-center'
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 50,
                                        resizable: false,
                                    },
                                    {
                                        Header: "Treaty Year",
                                        accessor: "treatyYear",

                                        ///style: { textAlign: "center" },
                                        ///headerClassName: 'react-table-center'
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 50,
                                        resizable: false,
                                    },

                                    {
                                        Header: "Status",
                                        accessor: "stausType",

                                        ///style: { textAlign: "center" },
                                        ///headerClassName: 'react-table-center'
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 50,
                                        resizable: false,
                                    },
                                    {
                                        Header: "Action",
                                        accessor: "btn",

                                        ///style: { textAlign: "center" },
                                        ///headerClassName: 'react-table-center'
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 50,
                                        resizable: false,
                                    },




                                ]}
                                defaultPageSize={5}
                                showPaginationTop={false}
                                // pageSize={([this.state.Billingdata.length + 1] < 5) ? [this.state.Billingdata.length + 1] : 5}
                                showPaginationBottom
                                className="-striped -highlight discription-tab"
                            />

                        </Animated>
                      

                    </GridItem>
                </GridContainer> : null}

                {this.renderRedirect()}
            </div>
        );
    }
}

export default withStyles(style)(SearchTreaty);