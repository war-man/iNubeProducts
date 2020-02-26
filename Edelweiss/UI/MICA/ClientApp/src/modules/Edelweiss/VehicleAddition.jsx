import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import React from "react";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import { Redirect } from 'react-router-dom';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Dropzone from 'react-dropzone-uploader';
import EdelweissConfig from "./EdelweissConfig.js";
import $ from 'jquery';
import swal from 'sweetalert';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Modal from '@material-ui/core/Modal';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';


const Styleinput = withStyles({
    root: {
        //background: '#e7ab37ad !important',
        background: 'rgba(231, 171, 55, 0.82)!important',
        //background: '#fff !important',
        //borderTopLeftRadius: '5px',
        //borderTopRightRadius: '5px'
        borderRadius: '0px !important'
    },
    //input: {
    //    color:'white'
    //},
    label: {
        //    textTransform: 'capitalize',
        color: 'white !important'
    },
})(TextField);
const StyleAutocomplete = withStyles({
    root: {
        //width: "13rem",
        //background: '#e7ab37ad !important',
        //borderTopLeftRadius: '5px',
        //borderTopRightRadius: '5px',
    },
    label: {
        color: 'white !important'
    },
})(Autocomplete);


class VehicleAddition extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            masterList:[],
            vehicleModel: "",
            vehicleModel1: "",
            showDropZone: false,
            quotationdataDto: {},
            NoOfDriver: '',
            VehicleAge: '',
            VehicleAge1: '',
            //VehicleNumber: '',
            VehicleModelNumber: '',
            insurableObj: [],
            vehiclepremiumDto: {},
            proposalIssueDTO:
            {

                "ProposalNumber": "",
                "InsurableItem": [],


            },
            policyIssueRequest: {

            },
            RiskObj: {

                Model: "",

                VehicleNumber: "",

                IdentificationNumber: "223",

                YearofRegistration: "",

                VehicleType: "sdsd",

                Documents: []
            },
            duplicateRiskObj: {

                "Model": "",

                "VehicleNumber": "",

                "Identification Number": "223",

                "YearofRegistration": "",

                "Vehicle Type": "sdsd",

                "Documents": []
            },
            scheduleDTO: {
                "policyNo": "",
                "vehicleRegistrationNo": "",
                "vehicleType": "",
                "mon": true,
                "tue": true,
                "wed": true,
                "thu": true,
                "fri": true,
                "sat": true,
                "sun": true,
            },
            suminsured: [
                { mID: 1, mValue: "800000", label: "8,00,000" },
                { mID: 2, mValue: "900000", label: "9,00,000" },
                { mID: 3, mValue: "1000000", label: "10,00,000" },
                { mID: 4, mValue: "1100000", label: "11,00,000" },
                { mID: 5, mValue: "1200000", label: "12,00,000" },
                { mID: 6, mValue: "1300000", label: "13,00,000" },
                { mID: 7, mValue: "1400000", label: "14,00,000" },
                { mID: 8, mValue: "1500000", label: "15,00,000" },
                { mID: 9, mValue: "1600000", label: "16,00,000" },
                { mID: 10, mValue: "1700000", label: "17,00,000" },
                { mID: 11, mValue: "1800000", label: "18,00,000" },
                { mID: 11, mValue: "1900000", label: "19,00,000" },
                { mID: 11, mValue: "2000000", label: "20,00,000" },
            ],
            selectedamount: "",
            opendialog: false,
            endorsementPremium: {
                "policyNo": "",
                "si": "",
                "pcCount": "",
                "twCount": "0",
                "typeOfEndorsement": "Add",
                "endorsementEffectiveDate": "2020-02-23T09:48:46.291Z"
            },
            addvehiclepremiumDto: {},
            selectedSI: 0,
            open: false,
            addshedulerdto: {},
            count: 1,
            twoCount:0,
            vehicleType: "",
            premiumperday: "",
            firetheft: "",
            adprem: "",
            gsttax: "",
            sum: "",
            redirect: false,
            showpremium: false,
            openpopup:false,
        }
    }
    AddVehicle = (files) => {
        debugger;
        if (this.state.policyIssueRequest.InsurableItem[1].InsurableName == "Vehicle") {

            this.state.policyIssueRequest.InsurableItem[1].RiskItems.push(this.state.RiskObj);


        }
        this.setState({ RiskObj: this.state.duplicateRiskObj });
        console.log(" this.state.policyRqst", this.state.policyRqst);
    }

    componentDidMount() {
        //if (this.props.location.state != undefined) {
        //    this.state.endorsementPremium.si = this.props.location.state.vehpremDTO.si;
        //    this.state.selectedamount = this.props.location.state.vehpremDTO.si
        //    this.state.addshedulerdto = this.props.location.state.scheduledatadto;
        //    this.state.endorsementPremium.policyNo = this.props.location.state.scheduledatadto.policyNo;
        //    console.log("this.state.endorsementPremium.si", this.state.endorsementPremium,this.props.location.state.vehiclepremiumDto);
        //}
             this.state.endorsementPremium.si = this.props.vehpremDTO.si;
            this.state.selectedamount = this.props.vehpremDTO.si
            this.state.addshedulerdto = this.props.scheduledatadto;
            this.state.endorsementPremium.policyNo = this.props.scheduledatadto.policyNo;
            //console.log("this.state.endorsementPremium.si", this.state.endorsementPremium,this.props.location.state.vehiclepremiumDto);
        fetch(`http://edelw-publi-10uqrh34garg4-1391995876.ap-south-1.elb.amazonaws.com:9025/api/Mica_EGI/GetVehicleMaster?isFilter=true`, {

            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("masterList: ", data);
                this.setState({ masterList: data });
            });
   }
    onInputChange = (evt) => {

        const Data = this.state.RiskObj;
        Data[evt.target.name] = evt.target.value;
        this.setState({ Data });
    }
    showOnClick = (evt) => {
        debugger;
        this.setState({ showDropZone: true })
    }
    showOnClick1 = () => {
        this.setState({ showDropZone1: true })
    }
    showOnClick2 = () => {
        this.setState({ showDropZone2: true })
    }
    showOnClick3 = () => {
        this.setState({ showDropZone3: true })
    }

    getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }

    handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }

    uploadfilefront = (files) => {
        debugger;
        let obj = this.state.RiskObj;
        var data = new FormData();
        if (files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                data.append(files[i].file.name, files[i].file, files[i].file.size);

            }
        }

        $.ajax({
            type: "POST",
            //url: `http://localhost:53000/api/DMS/UploadFile`,
            url: `https://inubeservicesnotification.azurewebsites.net/api/DMS/Documentupload/Documentupload`,
            // url: `https://inubeservicesnotification.azurewebsites.net/api/DMS/MobileDocumentupload/MobileDocumentupload`,
            contentType: false,
            processData: false,

            data: data,
            beforeSend: function (data, xhr) {
                /* Authorization header */
                //xhr.setRequestHeader("Authorization", 'Bearer ' + localStorage.getItem('userToken'));
            },
            success: function (data, message) {
                console.log("dddata", data);
                let docObj = [
                ]
                for (var i = 0; i < data.dMSDTOs.length; i++) {

                    docObj.push(data.dMSDTOs[i]);
                }
                console.log("docobj", docObj);
                for (var i = 0; i < docObj.length; i++) {
                    let x = {};
                    x.docId = docObj[i].docId;
                    x.fileName = docObj[i].fileName;
                    let mainobj = obj.Documents;
                    mainobj.push(x);
                   
                    console.log("docobj", mainobj);
                }
               
                //this.state.documentObj.docId = data.docId;
                //this.state.documentObj.fileName = data.fileName;

                swal({
                    text: "Document Uploaded Successful",
                    icon: "success"
                });
            },
            error: function (message) {

                swal({
                    text: "Document Upload Failed",
                    icon: "error"
                });
            }
        });
        this.setState({});
        console.log("this.state.Riskobj", this.state.RiskObj);
    }

    renderRedirect = () => {
        if (this.state.redirect === true) {
            return <Redirect to={{
                pathname: '/pages/Vehicles',
                state: {endorsementPremium: this.state.endorsementPremium }
            }} />
        }
      
    }

    handleopenDialog = () => {
        this.setState({ opendialog: true });
    }
    handlecloseDialog = () => {
        this.setState({ opendialog: false });
    }
    handleClose = () => {
        this.setState({ open: false });
    }

    handleselectedSI = (e, key) => {
        this.state.selectedSI = this.state.suminsured[key].mID;
        this.state.endorsementPremium.si = this.state.selectedSI;
        this.state.endorsementPremium.si = this.state.suminsured[key].mValue;
        this.setState({ selectedSI: this.state.suminsured[key].mID, selectedamount: this.state.suminsured[key].label,  opendialog: false, btn3color: true });
        console.log("state.endorsementPremium", this.state.endorsementPremium);
     ;
    }
    EndorsementPremium = () => {
        debugger;
        this.setState({ open: true });
        if (this.state.vehicleType == "PC") {
            let Count = this.state.count + 1;
            this.state.count = Count;
            //this.setState({ count: Count });
            this.state.endorsementPremium.pcCount = this.state.count;
        }
        if (this.state.vehicleType == "TW") {
            let Count1 = this.state.twoCount + 1;
            this.state.twoCount = Count1;
            this.state.endorsementPremium.twCount = this.state.twoCount;
        }

        fetch(`http://edelw-publi-10uqrh34garg4-1391995876.ap-south-1.elb.amazonaws.com:9025/api/Mica_EGI/EndorsementPremium`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                //'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI5NTc4NmM2OS0xNjAxLTQzMGQtODM1Ni01M2RlNDUyZjUxZTYiLCJFbWFpbCI6InZpdGFsQGludWJlc29sdXRpb25zLmNvbSIsIk9yZ0lkIjoiMTEyIiwiUGFydG5lcklkIjoiMCIsIlJvbGUiOiJEZW1vIFJvbGUiLCJOYW1lIjoidml0aGFsIiwiVXNlck5hbWUiOiJ2aXRhbEBpbnViZXNvbHV0aW9ucy5jb20iLCJQcm9kdWN0VHlwZSI6Ik1pY2EiLCJTZXJ2ZXJUeXBlIjoiMSIsImV4cCI6MTY3MDY1NDMzMCwiaXNzIjoiSW51YmUiLCJhdWQiOiJJbnViZU1JQ0EifQ.nZsItQ97TGtSZ-IrZ8SlDeOCIKnaCI4tmeLC953z9qA'
            },
            body: JSON.stringify(this.state.endorsementPremium)
        }).then(response => response.json())
            .then(data => {
                console.log("calendorsement", data)
                console.log("respdata", data.response);
               
                this.setState({ proposalNo: data.id, premiumperday: data.perDayPremium, firetheft: data.fireTheft, adprem: data.adPremium, gsttax: data.gst, sum: data.total})

                if (data.status == 2) {
                    //swal({
                    //    //let res = partnerId.toString();
                    //    text: data.responseMessage,
                    //    icon: "success"
                    //});
                } else if (data.status == 8) {
                    //swal({
                    //    text: data.responseMessage,
                    //    icon: "error"
                    //});
                }
                else {
                    //swal({
                    //    text: data.errors[0].errorMessage,
                    //    icon: "error"
                    //});
                }
            });
    }
    handleCity = (event, values, name) => {
        if (name == "vehicleMakeModelId") {
            let vehicletype = this.state.masterList.filter(x => x.mID == values.mID)[0].mType;
            let makemodel = this.state.masterList.filter(x => x.mID == values.mID)[0].mValue;
            this.setState({ vehicleType: vehicletype, makeModel: makemodel })
            console.log("this.state.vehicleType", this.state.vehicleType, this.state.makeModel);

            //if (name == "vehicleMakeModelId") {
            //    quotation[name] = values.mID;
            //}
            //this.setState({ quotation });
          
        }

        //let quotation = this.state.quotationDTO;
        //if (name == "vehicleMakeModelId") {
        //    quotation[name] = values.mID;
        //} else if (name == "city" && values != null) {
        //    quotation[name] = values.cityId;
        //}
        //this.setState({ quotation });

        //console.log("tags: ", quotation)
     
    }
    confirm = () => {
      
        //this.renderRedirect();
        //this.setState({redirect:true})
    }

    render() {
        const { classes, loggingIn } = this.props;
        let btn3_class = this.state.btn3color ? "warning" : "default";
        console.log(this.state);

        return (
            <div className={classes.container}>
                <Card>
                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                            {/*  <FilterNone /> */}
                            <Icon></Icon>
                        </CardIcon>
                        {
                            <h3>
                                <small>  Vehicle Details </small>
                            </h3>
                        }
                    </CardHeader>
                    <CardBody>
                        <GridContainer justify="center">

                        </GridContainer>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                    labelText="Vehicle Number"
                                    name="VehicleNumber"
                                    //value={this.state.RiskObj.VehicleNumber}
                                    //onChange={(e) => this.onInputChange(e)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>

                        </GridContainer>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={4}>
                                <StyleAutocomplete
                                    //className="autocomplete"
                                    name="vehicleMakeModelId"
                                    options={this.state.masterList}
                                    getOptionLabel={option => option.mValue}
                                    onChange={(e, value) => this.handleCity(e, value, 'vehicleMakeModelId')}
                                    renderInput={params => (
                                        <Styleinput {...params} variant="filled" style={{ width: "12rem", top: "8px" }} id="text-field-hero" label="Car make model" formControlProps={{ fullWidth: true }} />
                                    )}
                                />
                            </GridItem>

                        </GridContainer>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                    labelText="Year of Registration"
                                    name="YearofRegistration"
                                    //value={this.state.RiskObj.YearofRegistration}
                                    //onChange={(e) => this.onInputChange(e)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>

                        </GridContainer>

                        <GridContainer justify="center">
                        <GridItem xs={6}>
                            <Button variant="outlined" round size="large" color={btn3_class} onClick={this.handleopenDialog}>{this.state.selectedamount}</Button>
                            <Dialog style={{ textAlign: "center" }} onClose={this.handlecloseDialog} aria-labelledby="simple-dialog-title" open={this.state.opendialog} >
                                <DialogTitle id="simple-dialog-title"> <b>Sum Insured Amount</b> </DialogTitle>
                                <DialogContent dividers>
                                    {this.state.suminsured.map(function (item, key) {
                                        return (
                                            <List round button>
                                                <ListItem button id="padding-list-item" selected={this.state.selectedSI === item.mID} onClick={e => this.handleselectedSI(e, key)} >
                                                    <ListItemText>
                                                        ₹{item.label}
                                                    </ListItemText>
                                                </ListItem>
                                            </List>
                                        );
                                    }.bind(this))}
                                </DialogContent>
                            </Dialog>
                            </GridItem>
                        </GridContainer>

                        <GridContainer>

                            {this.state.showDropZone ?
                                <GridItem xs={12} sm={12} md={4}>
                                    <Dropzone
                                        getUploadParams={this.getUploadParams}
                                        onChangeStatus={this.handleChangeStatus}
                                        onSubmit={(e) => this.uploadfilefront(e)}
                                        name="front"
                                        //value={this.state.RiskObj.Documents}
                                        accept="image/*,audio/*,video/*,application/pdf/*,word/*"
                                    />
                                </GridItem> : null}

                        </GridContainer>


                      

                        <GridContainer justify="center">

                            <Button color="primary" name="frontCarImage" round onClick={(e) => this.showOnClick(e)}> Upload</Button>


                      
                        </GridContainer>

                        <GridContainer justify="center">
                            {this.renderRedirect()}
                            <Button color="primary" round onClick={this.EndorsementPremium}> ok </Button>

                        </GridContainer>

                        <Modal
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={this.state.open}
                            onClose={this.handleClose}>
                            <GridContainer justify="center">
                                <GridItem>
                                    <Card>
                                        <div>

                                            <Button
                                                color="success"
                                                round
                                                style={{ left: '68rem', top: '-2.5rem' }}
                                                onClick={this.handleClose}>
                                                &times;
                                                        </Button>
                                        </div>
                                        <GridContainer>
                                            <GridContainer justify="center">
                                                <GridContainer justify="center">
                                                    <GridItem>
                                                        <table>
                                                            <tbody style={{ lineHeight: "1.18rem" }}>
                                                                <h4>Endorsement Premium</h4>
                                                                <tr>
                                                                    <td style={{ fontWeight: "400" }}>per day premium: </td>
                                                                    <td style={{ fontSize: "1rem", textAlign: "right" }}>₹<b>{this.state.premiumperday}</b>/-</td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{ fontWeight: "400" }}>Fire & Theft: </td>
                                                                    <td style={{ fontSize: "1rem", textAlign: "right" }}>₹<b>{this.state.firetheft}</b>/-</td>
                                                                </tr>
                                                                <tr>
                                                                    {/* <td style={{ fontWeight: "400" }}>AD for {this.state.fordays} Days: </td>*/}
                                                                    <td style={{ fontWeight: "400" }}>AD {/* {this.state.ParticipantMaster.isActive} Days:*/} </td>
                                                                    <td style={{ fontSize: "1rem", textAlign: "right" }}>₹<b>{this.state.adprem}</b>/-</td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{ fontWeight: "400" }}>GST: </td>
                                                                    <td style={{ fontSize: "1rem", textAlign: "right" }}>₹<b>{this.state.gsttax}</b>/-</td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{ fontWeight: "400" }}>Total: </td>
                                                                    <td style={{ fontSize: "1rem", textAlign: "right" }}>₹<b>{this.state.sum}</b>/-</td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{ fontWeight: "400" }}><h6>I authorize EGIC to bill me upto a maximum ₹<b>600</b>/- Per month</h6></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </GridItem>
                                                </GridContainer>
                                                <GridItem>
                                                    {this.renderRedirect()}
                                                    <Button round color="primary" onClick={this.confirm}>confirm</Button>
                                                </GridItem>
                                            </GridContainer> 
                                        </GridContainer>
                                    </Card>
                                </GridItem>
                            </GridContainer>
                        </Modal>

                       
                    </CardBody>
                </Card>

            </div>
        );
    }
}
VehicleAddition.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(VehicleAddition);
