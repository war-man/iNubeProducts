import React from "react";
import Radio from "@material-ui/core/Radio";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import mapping from "assets/img/mapping.png";
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
import Add from "@material-ui/icons/AddCircleOutline";
import Delete from "@material-ui/icons/Delete";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import swal from 'sweetalert';
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import validationPage from "modules/Accounts/views/ValidationPage.jsx";
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

class DefineMapping extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            modifyflag:false,
            GridData: {},

            dublicatSequenceIndex:[],
            sequnceNoflag: false,
            DefineDTOTableData: [],
            sequenceNoState:false,
            flag: true,
            flagUpdate: false,
            DefineDTOData: [{
                "treatyCode": "",
                "treatydescription": "",
                "treatyGroupId": "",
                "treatyType": "",
                "sequenceNo": ""
            }],
            treatymasterlist: [],
            array:[],
            treatycodemasterlist: [],
            trtygrpmasList:[],
            tretyMasterData:[],
            treatydata: [],
            masterList: [],
            yearmasterlist: [],
            mappingDetail: [
                {
                    retentionGroupId: "",
                    treatyGroupId:"",
                    sequenceNo: ""
                }
            ],
            Mapping: {
                year: "",
                level: "",
                lobProductCover: "",
                retentionGroupId: "",
                //SequenceNumber:""
                TblRimappingDetail: []
                
            }

        };
    }


    settreatyGroupId = (event, index) => {
         
       
        console.log(index, 'Index');
        let name = event.target.name;
        let value = event.target.value;
        let treatyGridData = this.state.DefineDTOData;

        treatyGridData[index][name] = value;

        this.setState({ treatyGridData });

        let SendValue = parseInt(value);
        console.log(value,'value')
        fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/GetDescriptionRIGrid?treatyid=` + SendValue, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(response => response.json())
            .then(data => {
                console.log('data1', data);
                //this.setState({ treatydata: data });
                //console.log("treatydata: ", this.state.treatydata);
                for (let i = 0; i < data.length; i++) {
                    this.state.DefineDTOData[index].treatydescription = data[i].treatyDescription;
                }

                this.setState({});

                this.AddTreatyTable();
                console.log("Descripion1 ", this.state.treatydata, this.state.DefineDTOData);
            });
         ;
        let c = this.state.DefineDTOData[index].treatyCode;
        //this.state.DefineDTOData[index].treatydescription = this.state.treatydata.treatyDescription;
        //console.log("Descripion ", this.state.treatydata);
        this.commonTreatyGroup(c, index);
        console.log("List checking", this.state.trtygrpmasList, this.state.DefineDTOData);
        
    }
    
    commonTreatyGroup = (c,index) => {


        fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/TreatyCode?treatyId=` + c, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("masterList: ", data);


                //this.state.treatycodemasterlist = data;
                //this.state.array = data;
                //let arr = [];
                //arr.push(data);
                
                let trtygrpmaslist = this.state.trtygrpmasList;
                if (this.state.trtygrpmasList[index] == undefined) {
                    trtygrpmaslist.push(data);
                } else {
                    this.state.trtygrpmasList[index] = data;
                    this.state.DefineDTOData[index].treatyGroupId = "";
                    this.state.DefineDTOData[index].treatyType = "";
                }
                this.setState({ trtygrpmaslist });
                //this.state.trtygrpmasList = [];
                //this.state.trtygrpmasList.push(this.state.treatycodemasterlist[index]);
                //this.state.trtygrpmasList.push(this.state.treatycodemasterlist);

                //this.setState({ treatycodemasterlist: data });
                this.AddTreatyTable();
                console.log("treatycodemasterlist", this.state.treatycodemasterlist, this.state.trtygrpmasList)


            });

    }
    settreatygroup = (event, index) => {
        //let name = event.target.name;
        //let value = event.target.value;
        
        //let treatyGridData = this.state.DefineDTOData;

        //treatyGridData[index][name] = value;
         
        //this.setState({ treatyGridData });
        console.log(index, 'Index');
        let name = event.target.name;
        let value = event.target.value;
        let treatyGridData = this.state.DefineDTOData;

        treatyGridData[index][name] = value;

        this.setState({ treatyGridData });

        if (this.state.modifyflag == true) {
            debugger
            let tbltreatydata = this.state.Mapping.tblRimappingDetail;
                tbltreatydata[index][name] = value;
                this.setState({ tbltreatydata });
        }
        let SendValue = parseInt(value);
        console.log(value, 'value')
        fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/GetDescriptionRIGrid?treatyid=` + this.state.DefineDTOData[0].treatyCode, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(response => response.json())
            .then(data => {

                //this.setState({ treatydata: data });
                console.log('data2', data);
                //console.log("treatydata: ", this.state.treatydata);
                this.state.DefineDTOData[index].treatyType = data[0].treatyType;


                this.setState({});

                this.AddTreatyTable();
                console.log("Descripion1 ", this.state.treatydata, this.state.DefineDTOData);
            });

        //this.state.DefineDTOData[index].treatydescription = this.state.treatydata.treatyDescription;
        //console.log("Descripion ", this.state.treatydata);
        console.log("Descripion1 ", this.state.treatydata, this.state.DefineDTOData);

    }
    onSequenceBlur = (index, e) => {
        if (e.target.value != "") {
            let check = this.state.dublicatSequenceIndex.filter(s => s == index);

            if (Number(e.target.value) > 0) {

                let key = this.state.dublicatSequenceIndex.findIndex(s => s == index);
                if (key != -1) {
                    this.state.dublicatSequenceIndex.splice(key, 1);
                }
            } else {
                if (check.length == 0) {
                    this.state.sequnceNoflag = true;
                    this.state.dublicatSequenceIndex.push(index);
                    this.setState({});
                }

            }
            this.AddTreatyTable();
        }
       // console.log("  this.state.dublicatSequenceIndex", this.state.dublicatSequenceIndex)
        
}

    onBlur = (key,event) => {

        var c = event.target.value.toString();
             
            //fetch(`${UserConfig.UserConfigUrl}/api/Role/GetDynamicGraphPermissions?Userid=` + userid + `&Roleid=` + roleid + `&itemType=` + "Graph",
        fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/RIValidations?codeName=` + c + '&type=' + "SequenceNo", {
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
                        this.setState({ branchCodeflag: true, branchCodemassage: data.responseMessage });
                        if (data.responseMessage != null) {
                            this.state.sequnceNoflag = true;
                        }
                        else {
                            this.state.sequnceNoflag = false;
                        }
                    } else {
                        this.setState({ sequnceNoflag: false, branchCodemassage: "" });
                    }
                  //  this.AddTreatyTable();
            });
        console.log("flagTest", this.state.sequnceNoflag);
    }

    handletreatygrid = (event, index) => {
     
        let name = event.target.name;
        let value = event.target.value;
        let treatyGridData = this.state.DefineDTOData;
       
        treatyGridData[index][name] = value;

        console.log("List checking", this.state.trtygrpmasList, this.state.DefineDTOData);
        if (this.state.modifyflag == true) {
            let tblGridData = this.state.Mapping.tblRimappingDetail;
             tblGridData[index][name] = value;
            this.setState({ tblGridData });
        }
        this.setState({ treatyGridData });
        this.AddTreatyTable();
        //this.change(event, name, type);
    }
    change(evt, stateName, type, stateNameEqualTo, maxValue) {
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
            case "Number":
                if (validationPage.verifyNum(evt.target.value)) {
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            case "phoneno":
                if (validationPage.verifyPhoneNum(evt.target.value)) {
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            default:
                break;
        }
    }
    componentDidMount() {
        const props = this.props;
        console.log("porpsdat", props)
        console.log(props.rimappingId, 'DataID');
        if (props.rimappingId != undefined) {

            console.log(this.props.flagEdit, 'FlagEditProps');
            this.setState({ flag: false, flagUpdate: this.props.flagUpdate, modifyflag:true });
            //fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/ModifyRImapping?rimappingId=` + this.props.rimappingId, {
            //    method: 'PUT',
            //    headers: {
            //        'Accept': 'application/json',
            //        'Content-Type': 'application/json',
            //        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            //    },
            //})
            //    .then(response => response.json())
            //    .then(data => {
            //        this.setState({ Mapping: data });
            //        console.log(data, 'Mydata')
            //        console.log("Accountss data: ", data);
            //    });

            //Written By Brajesh for Define Grid Data



            fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/mappingGridByTGId?RiMappingId=` + this.props.rimappingId, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                //  body: JSON.stringify(this.state.SearchParticipant)
            }).then(response => response.json())
                .then(data => {
                    this.setState({ GridData: data });
                    console.log(data, 'brajesh');
                    console.log(this.state.GridData, 'brajesh1');
                    this.state.DefineDTOData = [...data.gridDtos];
                    for (var i = 0; i < data.gridDtos.length; i++) {
                        this.commonTreatyGroup(data.gridDtos[i].treatyCode,i);

                    }


                    this.AddTreatyTable();
                });
        









            fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/GetRImappingBYId?RImappingById=` + this.props.rimappingId, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                //  body: JSON.stringify(this.state.SearchParticipant)
            }).then(response => response.json())
                .then(data => {
                    this.setState({ Mapping: data });
                    this.state.Mapping.retentionGroupId = data.retentionGroupId;
                    console.log(data, 'MyData1');
                 //   console.log(this.state.Mapping, 'Data1');
                   // this.state.DefineDTOData = [...data.tblRimappingDetail];
                });
        }

        fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/TreatyName`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("masterList: ", data);
                this.setState({ treatymasterlist: data });
                this.AddTreatyTable();
                console.log("treatymasterlist", this.state.treatymasterlist)
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
                console.log("yearmasterlist: ", data);
                this.setState({ yearmasterlist: data });
            });
        console.log("data", this.state.masterList);
        //let c = this.state.DefineDTOData[0].treatyCode;
        // ;
        //fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/TreatyCode?treatyId=` + c, {
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

        //        this.setState({ treatycodemasterlist: data });
        //        this.AddTreatyTable();
        //        console.log("treatycodemasterlist", this.state.treatycodemasterlist)

        //    });
        fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/RetentionGroup`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("masterList: ", data);
                this.setState({ masterList: data });
               // this.AddTreatyTable();
            });
        console.log("data", this.state.masterList);

   
    }
    onInputChange = (evt) => {
        const Data = this.state.Mapping;
        Data[evt.target.name] = evt.target.value;
        this.setState({ Data });

        console.log("Data", this.state.Mapping)

    }
    onInputChange1 = (evt) => {
        let Data = this.state.mappingDetail[0];
      
        Data[evt.target.name] = evt.target.value;

        this.setState({ Data });
        //
        //let arr = this.state.Mapping;
        // arr[0].push(this.state.mappingDetail);
        console.log("Data", this.state.mappingDetail)
        console.log("Data1111", this.state.Mapping)
    }
    reset = () => {
        //Setting States After Saving
        let MappingDto = this.state.Mapping;
        let MappingDto1 = this.state.Mapping.TblRimappingDetail
        MappingDto['year'] = "";
        MappingDto['level'] = "";
        MappingDto['LobProductCover'] = "";
        MappingDto1['retentionGroupId'] = "";
        


        this.setState({ MappingDto, MappingDto1});

        //let status = this.state;
        //status['accountNameState'] = "";
        //status['accountDescState'] = "";
        //this.setState({ status });
    }
    onFormSubmit = (evt) => {
        if (this.state.dublicatSequenceIndex.length == 0) {
            this.state.Mapping.TblRimappingDetail = this.state.DefineDTOData;
            this.setState({});
            console.log("submit", this.state.Mapping);

            fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/SaveRIMapping`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify(this.state.Mapping)
            }).then(response => response.json())
                .then(data => {
                    if (data.status == 2) {
                         ;
                        this.reset();
                        swal({

                            //   title: "Perfect",

                            //text: data.responseMessage,
                            text: "Data Saved Successfully",
                            icon: "success"
                        });
                        this.setState({ errormessage: false });
                        //this.HandleApi();
                        //this.setState({ redirect: true });
                        //this.renderRedirect();
                    } else if (data.status == 8) {

                        swal({
                            text: data.errors[0].errorMessage,
                            icon: "error"
                        });
                    } else if (data.status == 4) {

                        swal({
                            text: data.errors[0].errorMessage,
                            icon: "error"
                        });
                    }
                });
        }
    } 
    AddTreatyRecord = (event, index) => {
        this.state.array = this.state.trtygrpmasList[index];
        //if (this.state.treatydata[index].treatyGroup !== "" && this.state.treatydata[index].businessTypeId !== "" ) {
        //let TreatyDetails = this.state;
        //TreatyDetails['DefineDTOTableData'] = this.state.DefineDTOTableData.concat({ treatyGroup: "", businessTypeId: "" });
        //TreatyDetails['DefineDTOData'] = this.state.DefineDTOData.concat({ treatyGroup: "", businessTypeId: "" });

        //this.setState({ TreatyDetails });
         
        let mappingdeatils = this.state;
        mappingdeatils['DefineDTOData'] = this.state.DefineDTOData.concat({
            "treatyCode": "",
            "treatydescription": "",
            "treatyGroupId": "",
            "treatyType": "",
            "sequenceNo": ""
        });
      
        if (this.state.modifyflag == true) {
            let maptbldeatils = this.state.Mapping;
            maptbldeatils['tblRimappingDetail'] = this.state.Mapping.tblRimappingDetail.concat({
               
                "treatyGroupId": 0,
                "sequenceNo": 0,

            });
            this.setState({ maptbldeatils });
        }
        this.setState({ mappingdeatils });
        //console.log("treatydata", this.state.treatydata[index].treatyGroup, this.state.treatydata);
        console.log("add defination", this.state.DefineDTOData);

        this.AddTreatyTable();

        // }
    }
    onInputBranchesChange = (event, index) => {
        event.preventDefault();
        let name = event.target.name;
        let value = event.target.value;
        //this.state.treatydata[name] = value;
        //this.setState({ treatydata})


        let treatydata = this.state.DefineDTOData;

        treatydata[index][name] = value;

        this.setState({ treatydata });
        this.AddTreatyTable();
    }
    deleteTreatyRecord = (event, index) => {

        let deldata = this.state.DefineDTOTableData.splice(index, 1);
        if (this.state.modifyflag == true) {
            this.state.Mapping.tblRimappingDetail.splice(index, 1);
        }
        this.state.DefineDTOData.splice(index, 1);
        //let deldata = this.state.treatydata.filter(item => item.treatyGroup !== index);
        this.setState({ deldata })
        console.log("deldata", this.state.deldata);
        this.AddTreatyTable();
    }
    AddTreatyTable = () => {




        this.setState({
            DefineDTOTableData: this.state.DefineDTOData.map((prop, key) => {
                //console.log("this.ProductDetails.productChannel[key].channelTypeId", key, con, this.ProductDetails.productChannel[key].channelTypeId, this.state.chindex + 1);
                return {
                    SNo: key + 1,
                    Treatycode: <MasterDropdown labelText="TreatyCode" id="MaritalStatus" lstObject={this.state.treatymasterlist} filterName='TratyGroup' value={this.state.DefineDTOData[key].treatyCode} name='treatyCode' onChange={(e) => this.settreatyGroupId(e, key)} formControlProps={{ fullWidth: true }} />,
                    TreatyDescription: <CustomInput labelText="TreatyDescription" value={this.state.DefineDTOData[key].treatydescription} name="treatydescription" onChange={(e) => this.handletreatygrid(e, key)} formControlProps={{ fullWidth: true }} />,
                    Treatygroup: <MasterDropdown labelText="TreatyGroup" filterName='TreatyGroupName' lstObject={(this.state.trtygrpmasList.length > 0) ? ((this.state.trtygrpmasList[key]!=undefined)?this.state.trtygrpmasList[key]:[]):[]} value={this.state.DefineDTOData[key].treatyGroupId} name='treatyGroupId' formControlProps={{ fullWidth: true }} onChange={(e) => this.settreatygroup(e, key)} />,
                    Treatytype: <CustomInput labelText="TreatyType" value={this.state.DefineDTOData[key].treatyType} name="treatyType" onChange={(e) => this.handletreatygrid(e, key)} formControlProps={{ fullWidth: true }} />,
                    SequenceNo: <div><CustomInput labelText="Sequence" onBlur={(event) => this.onSequenceBlur(key, event)} type="numeric" inputType="number" value={this.state.DefineDTOData[key].sequenceNo} name="sequenceNo" onChange={(e) => this.handletreatygrid(e, key)} error={(this.state.dublicatSequenceIndex.findIndex(s => s == key) != -1)?true:false} formControlProps={{ fullWidth: true }} />{(this.state.dublicatSequenceIndex.findIndex(s => s == key) != -1) ? <p className="error">This Field is can not be less then 1</p>:null}</div>,
                    Actions: < div > <Button justIcon round simple color="info" className="add" onClick={(e) => this.AddTreatyRecord(e, key)} ><Add /> </Button >
                        <Button justIcon round simple color="danger" className="remove" onClick={(e) => this.deleteTreatyRecord(e, key)} ><Delete /> </Button >
                    </div >
                };
            })
        });
        //}
    }
    onFormModify = (id) => {
        if (this.state.dublicatSequenceIndex.length == 0) {
            console.log("ssss", this.state.DefineDTOData);
           
            
            fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/ModifyRImapping?rimappingId=` + this.props.rimappingId, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify(this.state.Mapping)
            }) //.then(response => response.json())
                .then(data => {
                    console.log("data456", data);
                    this.setState({ treatyDTO: data });
                    swal({

                        text: "Data Updated Successfully",
                        icon: "success"
                    });
                    console.log("Treaty data:", this.state.Mapping);
                });
            //let flageUpdate = this.state.flagUpdate
            //this.setState({ flageUpdate:true})
      }
    }

    render() {
        return (
            <div>
                <Card >
                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                            <Icon><img id="icon" src={mapping} /></Icon>
                        </CardIcon>
                        {
                            <h4 >
                                <small><TranslationContainer translationKey="RI Mapping & Sequencing" /></small>
                            </h4>
                        }
                    </CardHeader>

                    <CardBody>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={3}>
                                <MasterDropdown
                                    labelText="Year"
                                    id="ddlstatus"
                                    lstObject={this.state.yearmasterlist}
                                    filterName='Year'
                                    value={this.state.Mapping.year}
                                    name='year'
                                    onChange={this.onInputChange}
                                    formControlProps={{ fullWidth: true }} />



                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <CustomInput
                                    labelText="Level"
                                    id="ContactNo"
                                    value={this.state.Mapping.level}
                                    name='level'
                                    onChange={this.onInputChange}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />


                            </GridItem> <GridItem xs={12} sm={12} md={3}>
                                <CustomInput
                                    labelText="LOBProductCover"
                                    id="ContactNo"
                                    value={this.state.Mapping.lobProductCover}
                                    name='lobProductCover'
                                    onChange={this.onInputChange}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />


                            </GridItem>
                        </GridContainer>
                         
                        <GridContainer>
                            <CardHeader color="info" icon >

                                {
                                    <h3 >
                                        <small> <TranslationContainer translationKey="RetentionMapping" /></small>
                                    </h3>
                                }
                            </CardHeader>

                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={3}>
                                <MasterDropdown
                                    labelText="RetentionGroup"
                                    id="ddlstatus"
                                    lstObject={this.state.masterList}
                                    filterName='TratyCode'
                                    value={this.state.Mapping.retentionGroupId}
                                    name='retentionGroupId'
                                    onChange={this.onInputChange}
                                    formControlProps={{ fullWidth: true }} />

                            </GridItem>
                            
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12}>
                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                    <ReactTable
                                        //StyleType={true}
                                        //title={"Branch Details "}
                                        data={this.state.DefineDTOTableData}

                                        filterable

                                        //getTdProps={() => ({

                                        //    style: {

                                        //        overflow: 'visible',

                                        //    },

                                        //})}

                                        columns={[

                                            {

                                                Header: "SNo",

                                                accessor: "SNo",

                                                headerClassName: 'react-table-center',

                                                style: { textAlign: "center" },

                                                minWidth: 20,

                                                sortable: false,



                                                //  filterable: false

                                            },

                                            {



                                                Header: "TreatyCode",

                                                accessor: "Treatycode",

                                                minWidth: 40,

                                                // style: { textAlign: "center" },

                                                headerClassName: 'react-table-center'

                                            },

                                            {

                                                Header: "TreatyDescription",

                                                accessor: "TreatyDescription",

                                                minWidth: 40,

                                                style: { textAlign: "center" },

                                                headerClassName: 'react-table-center'

                                            },
                                            {

                                                Header: "TreatyGroup",

                                                accessor: "Treatygroup",

                                                minWidth: 40,

                                                style: { textAlign: "center" },

                                                headerClassName: 'react-table-center'

                                            },
                                            {

                                                Header: "TreatyType",

                                                accessor: "Treatytype",

                                                minWidth: 40,

                                                style: { textAlign: "center" },

                                                headerClassName: 'react-table-center'

                                            },
                                            {

                                                Header: "SequenceNo",

                                                accessor: "SequenceNo",

                                                minWidth: 40,

                                                style: { textAlign: "center" },

                                                headerClassName: 'react-table-center'

                                            },
                                            {

                                                Header: "Action",

                                                accessor: "Actions",

                                                minWidth: 40,

                                                style: { textAlign: "center" },

                                                headerClassName: 'react-table-center'

                                            },

                                        ]}

                                        defaultPageSize={5}

                                        //pageSize={([TreatyData.TreatytableData.length + 2] < 5) ? [TreatyData.TreatytableData.length + 2] : 5}

                                        showPaginationTop={false}

                                        showPaginationBottom

                                        className="-striped -highlight long-tab"

                                    //loading={this.state.newdata}



                                    //   loadingText="coming"

                                    />







                                </Animated>


                            </GridItem>
                        </GridContainer>



                        <GridContainer justify="center">
                            {this.state.flag &&
                                <GridItem >
                                    <Button id="button-search-partner" color="info" round onClick={() => this.onFormSubmit()}>
                                        Save
                                    </Button>
                                </GridItem>}

                            {this.state.flagUpdate &&
                                <GridItem >
                                <center>
                                    <Button color="info" round onClick={this.onFormModify}><TranslationContainer translationKey="Update" /></Button>
                                </center>
                            </GridItem>}
                        </GridContainer>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default withStyles(style)(DefineMapping);