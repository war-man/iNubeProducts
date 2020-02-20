import React from "react";
import Radio from "@material-ui/core/Radio";
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
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import participant from "assets/img/participant-master.png";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import Modal from '@material-ui/core/Modal';
import FormLabel from "@material-ui/core/FormLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import ReinsuranceConfig from "modules/Reinsurance/ReinsuranceConfig.js";
import Add from "@material-ui/icons/AddCircleOutline";
import Delete from "@material-ui/icons/Delete";
import swal from 'sweetalert';
import validationPage from "modules/Accounts/views/ValidationPage.jsx";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
const searchClose = {
    float: "right",
    position: 'relative',
    width: "28px",
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

class ParticipantMaster extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: true,
            flagUpdate: false,
            editModal: false,
            TreatytableData: [],
            selectedValue:false,
            Brokerflag: false,
            //BrokerRadioSelect: "",
            BrokerRadio: "",
            open: false,
            participantNameState: false,
            participantCodeState: false,
            contactNoState: false,
            address1State: false,
            address2State: false,
            branchCodeState: false,
            branchNameState: false,
            BranchSpocEmailIDState: false,
            address3State:false,
            Branchesdto: [{
                branchCode: " ",
                branchName: " ",
                BranchSpocEmailID: " "
            }],
            //Active: " ",
            //Inactive: " ",
            ParticipantMaster: {
                //BrokerRadioSelect: "",
                //BrokerRadio: "",
                participantTypeId: "",
                participantCode: "",
                participantName: "",
                contactNo: "",
                address1: "",
                address2: "",
                address3:"",
                stateId: "",
                countryId: "",
                districtId: "",
                cityId: "",
                pincode:"",
                isActive: "",
                disabled: false,
                tblParticipantBranch: [],
            },
            addressDTO: {
                AddressId: 0,
                Id: 0,
                AddressType: "",
                CountryId: "",
                StateId: "",
                DistrictId: "",
                CityId: "",
                AddressLine1: "",
                AddressLine2: "",
                AddressLine3: "",
                PincodeId: ""
            },
            LocationDTO: {
                Country: [],
                State: [],
                District: [],
                City: [],
                Pincode: [],
                //Country: [],
                //State: [],
                //District: [],
                //City: [],
                //Pincode: [],
            },

        };

        this.GetLocationService = this.GetLocationService.bind(this);
    }

    handleRadioChange = (event) => {

        let value = event.target.value;
        this.state.BrokerRadio = event.target.value;
        this.state.ParticipantMaster.participantTypeId = event.target.value;
        this.setState({ value });
        console.log("Radio", this.state.BrokerRadio);
        if (this.state.ParticipantMaster.participantTypeId == 8) {
            this.setState({ Brokerflag: false });
        }
        if (this.state.ParticipantMaster.participantTypeId == 9) {
            this.setState({ Brokerflag: true });
        }
        console.log("brokerValue", this.state.Brokerflag);
    }
    handleRadioOnChange = (event) => {
        debugger 
        let value = event.target.value;
        //this.state.BrokerRadio = event.target.value;
        this.state.ParticipantMaster.isActive = event.target.value;      
        this.setState({ value });
        console.log("isActive", this.state.ParticipantMaster.isActive);
        if (this.state.ParticipantMaster.isActive == 'Y') {
            this.setState({ selectedValue:false});
        }
        if (this.state.ParticipantMaster.isActive == 'N') {
            this.setState({ selectedValue:true});
        }
        console.log("isActive1", this.state.ParticipantMaster.isActive);
    }
    handleClose = () => {
        this.setState({ open: false });
    }
    ViewPDFFun = () => {
        this.setState({ open: true });
    }
    onInputChange = (type,evt) => {
        let name = evt.target.name;
        const Data = this.state.ParticipantMaster;
        Data[evt.target.name] = evt.target.value;
        this.setState({ Data });
        console.log("Data", this.state.ParticipantMaster)
        this.change(evt, name, type);
    }
    reset = () => {
        //Setting States After Saving
        let ParticipantDto = this.state.ParticipantMaster;
        let Address = this.state.addressDTO;
        ParticipantDto['participantTypeId'] = "";
        ParticipantDto['participantCode'] = "";
        ParticipantDto['participantName'] = "";
        ParticipantDto['contactNo'] = "";
        ParticipantDto['address1'] = "";
        ParticipantDto['address2'] = "";
        ParticipantDto['address3'] = "";
        Address['StateId'] = "";
        Address['CountryId'] = "";
        Address['DistrictId'] = "";
        Address['CityId'] = "";
        Address['PincodeId'] = "";
        ParticipantDto['isActive'] = "";

        this.setState({ ParticipantDto, Address });

        //let status = this.state;
        //status['accountNameState'] = "";
        //status['accountDescState'] = "";
        //this.setState({ status });
    }
    onInputBranchesChange = (type,event,index) => {
        event.preventDefault();
        let name = event.target.name;
        let value = event.target.value;
        //this.state.treatydata[name] = value;
        //this.setState({ treatydata})


        let treatydata = this.state.Branchesdto;

        treatydata[index][name] = value;

        this.setState({ treatydata });
        this.AddTreatyTable();
        this.change(event, name, type);
    }
    onFormSubmit = (evt) => {
        this.state.ParticipantMaster.tblParticipantBranch = this.state.Branchesdto;
        //this.state.ParticipantMaster = this.state.LocationDTO;
        console.log("submit", this.state.ParticipantMaster);
        var data = {
            'participantTypeId': this.state.ParticipantMaster.participantTypeId,
            'participantCode': this.state.ParticipantMaster.participantCode,
            'participantName': this.state.ParticipantMaster.participantName,
            'contactNo': this.state.ParticipantMaster.contactNo,
            'address1': this.state.ParticipantMaster.address1,
            'address2': this.state.ParticipantMaster.address2,
            'address3':this.state.ParticipantMaster.address3,
            'stateId': this.state.addressDTO.StateId,
            'countryId': this.state.addressDTO.CountryId,
            'districtId': this.state.addressDTO.DistrictId,
            'cityId': this.state.addressDTO.CityId,
            'pincode':this.state.addressDTO.PincodeId,
            'isActive': this.state.ParticipantMaster.isActive,
            'tblParticipantBranch': this.state.Branchesdto
        };
        //this.state.ParticipantMaster.branches = [... this.state.ParticipantMaster, ...this.state.Branchesdto]
        console.log("Participantdata", this.state.ParticipantMaster)
        if (this.state.ParticipantMaster.participantCode != "" && this.state.ParticipantMaster.participantName != "" && this.state.ParticipantMaster.contactNo != "" && this.state.ParticipantMaster.address1 != "" && this.state.addressDTO.CountryId != "" && this.state.addressDTO.StateId != "" && this.state.addressDTO.CityId != "" && this.state.addressDTO.DistrictId!="") {
            fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/SaveParticipentData`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify(data)
            }).then(response => response.json())
                .then(data => {
                    if (data.status == 2) {
                        debugger;
                        this.reset();
                        swal({

                            //   title: "Perfect",

                            //text: data.responseMessage,
                              text: "Participant Successfully Created",
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
     else {
    swal("", "Some fields are missing", "error");
    this.setState({ errormessage: true });
}

    }
    AddTreatyRecord = (event, index) => {
        
        //if (this.state.treatydata[index].treatyGroup !== "" && this.state.treatydata[index].businessTypeId !== "" ) {
        let TreatyDetails = this.state;
        TreatyDetails['Branchesdto'] = this.state.Branchesdto.concat({ 
            branchCode: "",
            branchName: "",
            BranchSpocEmailID: ""
        });
        this.setState({ TreatyDetails });
        console.log("treatydataindex", index);

        this.AddTreatyTable();
        // }
    }

    deleteTreatyRecord = (event, index) => {
        debugger;
        let deldata = this.state.Branchesdto.splice(index, 1);
        //let deldata = this.state.treatydata.filter(item => item.treatyGroup !== index);
        this.setState({ deldata })
        console.log("deldata", this.state.deldata);
        this.AddTreatyTable();
    }
    AddTreatyTable = () => {

        // if (this.state.newmasterlist.length > 0) {
        console.log("product channel", this.state.masterList, this.state.newmasterlist);

        let con = this.state.newmasterlist;


        this.setState({
            TreatytableData: this.state.Branchesdto.map((prop, key) => {
                //console.log("this.ProductDetails.productChannel[key].channelTypeId", key, con, this.ProductDetails.productChannel[key].channelTypeId, this.state.chindex + 1);
                return {
                    id: key + 1,

                    BranchCode: <CustomInput labelText="BranchCode" id="BusinessTypeText"
                        required={true}
                        error={this.state.branchCodeState}
                        value={this.state.Branchesdto[key].branchCode} 
                        name='branchCode'
                        onChange={(event) => this.onInputBranchesChange("numeric",event,key)}
                        //onChange={(evt)=>this.onInputBranchesChange(evt,key)} 
                        formControlProps={{ fullWidth: true }
                    } />,
                    BranchName: <CustomInput labelText="BranchName" id="BusinessTypeText"
                        required={true}
                        error={this.state.branchNameState}
                        value={this.state.Branchesdto[key].branchName}
                        name='branchName'
                        onChange={(event) => this.onInputBranchesChange("alphaNumeric", event, key)}
                        //onChange={(event) => this.onInputBranchesChange(event, key)}
                        formControlProps={{ fullWidth: true }
                    } />,
                    BranchSpocEmailID: <CustomInput labelText="EmailDetails" id="BusinessTypeText"
                        required={true}
                        error={this.state.BranchSpocEmailIDState}
                        value={this.state.Branchesdto[key].BranchSpocEmailID}
                        name='BranchSpocEmailID'
                        onChange={(event) => this.onInputBranchesChange("alphaNumeric", event, key)}
                        formControlProps={{ fullWidth: true }
                    } />,

                    Action: <div><Button justIcon round simple color="info" className="add" onClick={(e) => this.AddTreatyRecord(e, key)} ><Add /> </Button >
                        <Button justIcon round simple color="danger" className="remove" onClick={(e) => this.deleteTreatyRecord(e, key)} ><Delete /> </Button >
                    </div>
                };
            })
        });
        //}
    }
    //onInputBrokerBranchesChange = (evt) => {
    //    const Data = this.state.BrokerParticipant.branches;
    //    Data[evt.target.name] = evt.target.value;
    //    this.setState({ Data });
    //    console.log("Data", this.state.BrokerParticipant)
    //}
    //onInputBrokerChange = (evt) => {
    //    const Data = this.state.BrokerParticipant;
    //    Data[evt.target.name] = evt.target.value;
    //    this.setState({ Data });
    //    console.log("Data", this.state.BrokerParticipant)
    //}
    //Reset = () => {
    //    debugger;
    //    let reset = this.state.Participant;
    //    reset = "";
    //    this.setState({ reset});

    //}
    GetLocation = (type, event) => {
        debugger
       // this.SetValue(type, event);
        let reg = this.state.addressDTO;
        let name = event.target.name;
        let value = event.target.value;
        reg[name] = value;

        this.setState({ reg })
        if (type != "") {
            this.GetLocationService(type, event.target.value);
        }
    };
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
            default:
                break;
        }
    }
    componentDidMount() {
        this.GetLocationService('Country', 0);
        this.AddTreatyTable();
        const props = this.props;
        console.log("porpsdat", props)
        console.log(props.participantMasterId, 'DataID');
        if (props.participantMasterId != undefined) {
            console.log(this.props.flagEdit, 'FlagEditProps');
            this.setState({ flag: false, flagUpdate: this.props.flagUpdate });
            fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/ModifyParticipant?ParticipantMasterId=` + this.props.participantMasterId, {
            //fetch(`http://localhost:5000/api/ReInsurance/ModifyParticipant?ParticipantMasterId=` + this.props.participantMasterId, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
            })
                .then(response => response.json())
                .then(data => {
                    this.setState({ ParticipantMaster: data });
                    console.log(data, 'Mydata')
                    console.log("Accountss data: ", data);

                });
            
            fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/GetParticipantBYId?participantmasterID=` + this.props.participantMasterId, {
            //fetch(`http://localhost:5000/api/ReInsurance/GetParticipantBYId?participantmasterID=` + this.props.participantMasterId, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify(this.state.SearchParticipant)
            }).then(response => response.json())
                .then(data => {
               
                   // this.state.ParticipantMaster = data;
                    this.setState({ ParticipantMaster: data });
                    console.log(data, 'MyData2');
                    console.log(this.state.ParticipantMaster, 'Data1');
                });
            this.setState({ editflag: true });
        }

        console.log(this.state.ParticipantMaster, 'Data3');

    }
    onFormModify = (id) => {
        debugger;
        fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/ModifyParticipant?ParticipantMasterId=` + this.props.participantMasterId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.ParticipantMaster)
        }) //.then(response => response.json())
            .then(data => {
                this.setState({ ParticipantMaster: data });
                console.log(data, 'Mydata')
                console.log("Accountss data: ", data);

            });
        //let flageUpdate = this.state.flagUpdate
        //this.setState({ flageUpdate:true})
    }
    GetLocationService = (type, pID) => {
        fetch(`${ReinsuranceConfig.ReinsuranceConfigUrl}/api/ReInsurance/GetLocation?locationType=` + type + `&parentID=` + pID, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                const lData = data;
                let locDTO = this.state.LocationDTO;
                locDTO[type] = lData;
                this.setState({ locDTO });
                console.log("locations", this.state.LocationDTO)
            });
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Card >
                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                            <Icon><img id="icon" src={participant} /></Icon>
                        </CardIcon>
                        {
                            <h4 >
                                <small> <TranslationContainer translationKey="ParticipantMaster" /> </small>
                            </h4>
                        }
                    </CardHeader>

                    <CardBody>
                        <GridContainer xs={12} justify="center">
                           
                            <GridItem xs={12} sm={12} md={5}>

                                <div style={{ marginTop: "24px" }}>
                                    <label style={{ marginRight: "1rem" }}> <TranslationContainer translationKey="ReinsurerType" /></label>
                                    <FormControlLabel
                                        control={
                                            <Radio

                                                checked={this.state.ParticipantMaster.participantTypeId === "8"}
                                                onChange={this.handleRadioChange}
                                                //disabled={this.props.viewdisable}
                                                value={8}
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
                                        label={<TranslationContainer translationKey="Reinsurer" />}
                            />

                                    <FormControlLabel
                                        control={
                                            <Radio
                                                checked={this.state.ParticipantMaster.participantTypeId === "9"}
                                                onChange={this.handleRadioChange}
                                                //disabled={this.props.viewdisable}
                                                value={9}
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
                                        label={< TranslationContainer translationKey="Broker"/>}
                                />
                                </div>
                            </GridItem>
                        </GridContainer>
                        {this.state.Brokerflag == false ?
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="ReinsurerCode"
                                        id="Code"
                                        required={true}
                                        error={this.state.participantCodeState}
                                        value={this.state.ParticipantMaster.participantCode}
                                        name='participantCode'
                                       onChange= {(evt) => this.onInputChange("alphaNumeric", evt)}
                                        //onChange={this.onInputChange}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="ReinsurerName"
                                        id="Name"
                                        required={true}
                                        error={this.state.participantNameState}
                                        value={this.state.ParticipantMaster.participantName}
                                        name='participantName'
                                        onChange={(evt) => this.onInputChange("string", evt)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="ContactNo"
                                        id="contactNo"
                                        required={true}
                                        error={this.state.contactNoState}
                                        value={this.state.ParticipantMaster.contactNo}
                                        name='contactNo'
                                        onChange={(evt) => this.onInputChange("numeric", evt)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem>
                                    <Button id="top-bnt" color="info" round onClick={this.ViewPDFFun}>
                                        <TranslationContainer translationKey="branches" />
                                    </Button>
                                </GridItem>
                                <GridItem>
                                    <Modal
                                        aria-labelledby="simple-modal-title"
                                        aria-describedby="simple-modal-description"
                                        open={this.state.open}
                                        onClose={this.handleClose}

                                    >
                                        <div className={classes.paper} id="modal">


                                            <Button color="info"
                                                round
                                                className={classes.marginRight}
                                                style={searchClose}
                                                onClick={this.handleClose}>
                                                &times;
                                </Button>
                                            <GridContainer xl={10} justify="center">
                                                <GridItem xs={10}>
                                                   
            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                <ReactTable
                                                            StyleType={true}
                                                            title={<TranslationContainer translationKey="BranchDetails" />} 
                    data={this.state.TreatytableData}

                    filterable

                    getTdProps={() => ({

                        style: {

                            overflow: 'visible',

                        },

                    })}

                    columns={[

                        {

                            Header: "SNo",

                            accessor: "id",

                            headerClassName: 'react-table-center',

                            style: { textAlign: "center" },

                            minWidth: 20,

                            sortable: false,



                            //  filterable: false

                        },

                        {



                            Header: "BranchCode",

                            accessor: "BranchCode",

                            minWidth: 40,

                            // style: { textAlign: "center" },

                            headerClassName: 'react-table-center'

                        },

                        {

                            Header: "BranchName",

                            accessor: "BranchName",

                            minWidth: 40,

                            style: { textAlign: "center" },

                            headerClassName: 'react-table-center'

                        },
                        {

                            Header: "EmailDetails",

                            accessor: "BranchSpocEmailID",

                            minWidth: 40,

                            style: { textAlign: "center" },

                            headerClassName: 'react-table-center'

                        },
                        {

                            Header: "Action",

                            accessor: "Action",

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
                                                <GridItem >
                                                   
                                                    <Button id="round" style={{ marginTop: '25px' }} color="info" onClick={() => this.handleClose()}> Ok  </Button>
                                                       
                                                </GridItem>
                                            </GridContainer>
                                        </div>
                                    </Modal>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="Address1"
                                        id="address1"
                                        required={true}
                                        error={this.state.address1State}
                                        value={this.state.ParticipantMaster.address1}
                                        name='address1'
                                        onChange={(evt) => this.onInputChange("alphaNumeric", evt)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="Address2"
                                        id="address2" 
                                        error={this.state.address2State}
                                        value={this.state.ParticipantMaster.address2}
                                        name='address2'
                                        onChange={(evt) => this.onInputChange("alphaNumeric", evt)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="Address3"
                                        id="address2"
                                        error={this.state.address3State}
                                        value={this.state.ParticipantMaster.address3}
                                        name='address3'
                                        onChange={(evt) => this.onInputChange("alphaNumeric", evt)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <Dropdown labelText="Country" required={true} disabled={this.state.disabled} lstObject={this.state.LocationDTO.Country} value={this.state.addressDTO.CountryId} name="CountryId" onChange={(e) => this.GetLocation('State', e)} formControlProps={{ fullWidth: true }} />
                                </GridItem>
                              
                                <GridItem xs={12} sm={12} md={3}>
                                    <Dropdown labelText="State" required={true} disabled={this.state.disabled} lstObject={this.state.LocationDTO.State} value={this.state.addressDTO.StateId} name="StateId" onChange={(e) => this.GetLocation('District', e)} formControlProps={{ fullWidth: true }} />
                                </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                    <Dropdown labelText="District" required={true}  disabled={this.state.disabled} lstObject={this.state.LocationDTO.District} value={this.state.addressDTO.DistrictId} name="DistrictId" onChange={(e) => this.GetLocation('City', e)} formControlProps={{ fullWidth: true }} />
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={3}>
                                    <Dropdown labelText="City" required={true} disabled={this.state.disabled} lstObject={this.state.LocationDTO.City} value={this.state.addressDTO.CityId} name="CityId" onChange={(e) => this.GetLocation('Pincode', e)} formControlProps={{ fullWidth: true }} />
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={3}>
                                        <Dropdown labelText="Pincode" disabled={this.state.disabled} lstObject={this.state.LocationDTO.Pincode} value={this.state.addressDTO.PincodeId} name="PincodeId" onChange={(e) => this.GetLocation('', e)} formControlProps={{ fullWidth: true }} />
                                    </GridItem>
                                <GridItem style={{ marginTop: "1.5rem" }} xs={12} sm={12} md={6}>
                                    <label style={{ marginRight: "1rem" }}><TranslationContainer translationKey="Status" /></label>
                                    <FormControlLabel
                                        control={
                                            <Radio
                                                checked={this.state.ParticipantMaster.isActive === 'Y'}
                                                onChange={this.handleRadioOnChange}
                                                //disabled={this.props.viewdisable}
                                                value={'Y'}
                                                
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
                                        label= {<TranslationContainer translationKey="Active"/>}
                                    />

                                    <FormControlLabel
                                        control={
                                            <Radio
                                                checked={this.state.ParticipantMaster.isActive === 'N'}
                                                onChange={this.handleRadioOnChange}
                                                //disabled={this.props.viewdisable}
                                                value={'N'}
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
                                        label= {<TranslationContainer translationKey="Inactive" />}
                                    />
                                </GridItem>
                                    


                                
                                


                               


                                {this.state.flag &&
                                    <GridContainer justify="center">
                                        <GridItem xs={3} sm={3} md={3}>
                                        <Button id="round" style={{ marginTop: '25px' }} color="info" onClick={() => this.onFormSubmit()}> <TranslationContainer translationKey="Save" />  </Button>
                                        </GridItem>

                                    </GridContainer>}
                                {this.state.flagUpdate &&
                                    <GridContainer justify="center">
                                        <GridItem xs={3} sm={3} md={3}>
                                        <Button id="round" style={{ marginTop: '25px' }} color="info" onClick={() => this.onFormModify()} > <TranslationContainer translationKey="Update" /> </Button>

                                        </GridItem>

                                    </GridContainer>}

                            </GridContainer>
                            :
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="BrokerCode"
                                        id="BrokerCode"
                                        required={true}
                                        error={this.state.participantCodeState}
                                        value={this.state.ParticipantMaster.participantCode}
                                        name='participantCode'
                                        onChange={(evt) => this.onInputChange("alphaNumeric", evt)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="BrokerName"
                                        id="BrokerName"
                                        required={true}
                                        error={this.state.participantNameState}
                                        value={this.state.ParticipantMaster.participantName}
                                        name='participantName'
                                        onChange={(evt) => this.onInputChange("string", evt)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="ContactNo"
                                        id="contactNo"
                                        required={true}
                                        error={this.state.contactNoState}
                                        value={this.state.ParticipantMaster.contactNo}
                                        name='contactNo'
                                        onChange={(evt) => this.onInputChange("numeric", evt)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem>
                                    <Button id="top-bnt" color="info" round onClick={this.ViewPDFFun}>
                                        <TranslationContainer translationKey="branches" />
                                    </Button>
                                </GridItem>
                                <GridItem>
                                    <Modal
                                        aria-labelledby="simple-modal-title"
                                        aria-describedby="simple-modal-description"
                                        open={this.state.open}
                                        onClose={this.handleClose}

                                    >
                                        <div className={classes.paper} id="modal">


                                            <Button color="info"
                                                round
                                                className={classes.marginRight}
                                                style={searchClose}
                                                onClick={this.handleClose}>
                                                &times;
                                </Button>
                                            <GridContainer xl={10} justify="center">
                                                <GridItem xs={10}>
                                                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                        <ReactTable
                                                            StyleType={true}
                                                            title={"Branch Details "}
                                                            data={this.state.TreatytableData}

                                                            filterable

                                                            getTdProps={() => ({

                                                                style: {

                                                                    overflow: 'visible',

                                                                },

                                                            })}

                                                            columns={[

                                                                {

                                                                    Header: "SNo",

                                                                    accessor: "id",

                                                                    headerClassName: 'react-table-center',

                                                                    style: { textAlign: "center" },

                                                                    minWidth: 20,

                                                                    sortable: false,



                                                                    //  filterable: false

                                                                },

                                                                {



                                                                    Header: "BranchCode",

                                                                    accessor: "BranchCode",

                                                                    minWidth: 40,

                                                                    // style: { textAlign: "center" },

                                                                    headerClassName: 'react-table-center'

                                                                },

                                                                {

                                                                    Header: "BranchName",

                                                                    accessor: "BranchName",

                                                                    minWidth: 40,

                                                                    style: { textAlign: "center" },

                                                                    headerClassName: 'react-table-center'

                                                                },
                                                                {

                                                                    Header: "Spoc/Email Details",

                                                                    accessor: "BranchSpocEmailID",

                                                                    minWidth: 40,

                                                                    style: { textAlign: "center" },

                                                                    headerClassName: 'react-table-center'

                                                                },
                                                                {

                                                                    Header: "Action",

                                                                    accessor: "Action",

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
                                                <GridItem >  
                                                    <Button id="round" style={{ marginTop: '25px' }} color="info" onClick={() => this.handleClose()} > Ok  </Button>
                                                </GridItem>
                                            </GridContainer>
                                        </div>
                                    </Modal>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="Address1"
                                        id="address1"
                                        required={true}
                                        error={this.state.address1State}
                                        value={this.state.ParticipantMaster.address1}
                                        name='address1'
                                        onChange={(evt) => this.onInputChange("alphaNumeric", evt)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="Address2"
                                        id="address2"
                                        error={this.state.address2State}
                                        value={this.state.ParticipantMaster.address2}
                                        name='address2'
                                        onChange={(evt) => this.onInputChange("alphaNumeric", evt)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>

                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="Address3"
                                        id="address2"
                                        error={this.state.address3State}
                                        value={this.state.ParticipantMaster.address3}
                                        name='address3'
                                        onChange={(evt) => this.onInputChange("alphaNumeric", evt)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <Dropdown labelText="Country" required={true} disabled={this.state.disabled} lstObject={this.state.LocationDTO.Country} value={this.state.addressDTO.CountryId} name="CountryId" onChange={(e) => this.GetLocation('State', e)} formControlProps={{ fullWidth: true }} />
                                </GridItem>

                                <GridItem xs={12} sm={12} md={3}>
                                    <Dropdown labelText="State" required={true} disabled={this.state.disabled} lstObject={this.state.LocationDTO.State} value={this.state.addressDTO.StateId} name="StateId" onChange={(e) => this.GetLocation('District', e)} formControlProps={{ fullWidth: true }} />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <Dropdown labelText="District" required={true} disabled={this.state.disabled} lstObject={this.state.LocationDTO.District} value={this.state.addressDTO.DistrictId} name="DistrictId" onChange={(e) => this.GetLocation('City', e)} formControlProps={{ fullWidth: true }} />
                                </GridItem>

                                <GridItem xs={12} sm={12} md={3}>
                                    <Dropdown labelText="City" required={true} disabled={this.state.disabled} lstObject={this.state.LocationDTO.City} value={this.state.addressDTO.CityId} name="CityId" onChange={(e) => this.GetLocation('Pincode', e)} formControlProps={{ fullWidth: true }} />
                                </GridItem>

                                <GridItem xs={12} sm={12} md={3}>
                                    <Dropdown labelText="Pincode" disabled={this.state.disabled} lstObject={this.state.LocationDTO.Pincode} value={this.state.addressDTO.PincodeId} name="PincodeId" onChange={(e) => this.GetLocation('', e)} formControlProps={{ fullWidth: true }} />
                                </GridItem>
                                <GridItem style={{ marginTop: "1.5rem" }} xs={12} sm={12} md={6}>
                                    <label style={{ marginRight: "1rem" }}><TranslationContainer translationKey="Status" /></label>
                                    <FormControlLabel
                                        control={
                                            <Radio
                                                checked={this.state.ParticipantMaster.isActive  === 'Y'}
                                                onChange={this.handleRadioOnChange}
                                                //disabled={this.props.viewdisable}
                                                value={'Y'}
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
                                        label={<TranslationContainer translationKey="Active" />}
                                    />

                                    <FormControlLabel
                                        control={
                                            <Radio
                                                checked={this.state.ParticipantMaster.isActive  === 'N'}
                                                onChange={this.handleRadioOnChange}
                                                //disabled={this.props.viewdisable}
                                                value={'N'}
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
                                        label={<TranslationContainer translationKey="Inactive" />}
                                    />
                                </GridItem>











                                {this.state.flag &&
                                    <GridContainer justify="center">
                                        <GridItem xs={3} sm={3} md={3}>
                                        <Button id="round" style={{ marginTop: '25px' }} color="info" onClick={() => this.onFormSubmit()}> <TranslationContainer translationKey="Save" />  </Button>
                                        </GridItem>

                                    </GridContainer>}
                                {this.state.flagUpdate &&
                                    <GridContainer justify="center">
                                        <GridItem xs={3} sm={3} md={3}>
                                        <Button id="round" style={{ marginTop: '25px' }} color="info" onClick={() => this.onFormModify()} > <TranslationContainer translationKey="Update" />  </Button>

                                        </GridItem>

                                    </GridContainer>}

                            </GridContainer>


                          
                        }
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default withStyles(style)(ParticipantMaster);