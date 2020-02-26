import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import React from "react";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import { Redirect } from 'react-router-dom'
import EdelweissConfig from "./EdelweissConfig.js";
import Dropzone from 'react-dropzone-uploader';
import $ from 'jquery';
import swal from 'sweetalert';



class AddDriver extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            showadditionaldriver: false,
            proposalno: "",
            showadddrvflag: true,
            showDropZone: false,
            showadddrvbtn: false,
            redirect: "",
            ddlDTO: [
                { mID: 1, mValue: "Mr", label: "Mr" },
                { mID: 2, mValue: "Miss", label: "Miss" },
                { mID: 3, mValue: "Mrs", label: "Mrs" },
            ],
            NoOfDriver: '',
            VehicleAge: '',
            VehicleNumber: '',
            VehicleModelNumber: '',
            showadddrvbtn: '',

            quotationDetailsDto: {
            },
            policyRqst: {},
            premDTO: {},
            RiskObj: {
                "Age": "",
                "Name": "",
                "Identification Number": "223",
                "Aadhaar No.": "33",
                "Licence No.": "333",
                "Driving Experience": "",
                "Documents": [],
            },
            duplicateRiskObj: {
                "Age": "",
                "Name": "",
                "Identification Number": "223",
                "Aadhaar No.": "33",
                "Licence No.": "333",
                "Driving Experience": "",
                "Documents": []
            },
            insurableObj: [{

                "InsurableName": "Driver",

                "RiskItems": [

                ]

            }, {

                "InsurableName": "Vehicle",

                "RiskItems": [


                ]

            }],
            policyIssueDTO:
            {

                "ProposalNumber": "",
                "InsurableItem": [],


            },
            drvvehicleType: "",
            adddrvMakeModel: "",
        }
    }


    componentDidMount() {
        if (this.props.location.state != undefined) {
            this.state.drvvehicleType = this.props.location.state.vehType;
            this.state.adddrvMakeModel = this.props.location.state.drMakeModel

            this.setState({ quotationDetailsDto: this.props.location.state.quotationDto, proposalno: this.props.location.state.proposalNo, policyRqst: this.props.location.state.policyRequest, premDTO: this.props.location.state.premiumDTO });
            this.state.RiskObj.Age = this.props.location.state.quotationDto.age;
            this.state.RiskObj.Name = this.props.location.state.quotationDto.primaryDriverName;
            this.state.policyIssueDTO.ProposalNumber = this.props.location.state.proposalNo;
            this.setState({});
            console.log("prno", this.props.location.state.proposalNo);
            console.log("policyRqst", this.state.policyRqst);

            if (this.props.location.state.premiumDTO.additionalDriver > 1 && this.props.location.state.premiumDTO.additionalDriver <= 3) {
                this.setState({ showadddrvbtn: true });
            }
        }


    }
    showOnClick = () => {
        this.setState({ showDropZone: true })
    }
    onInputChangepropsal = (event) => {
        let RiskObj = this.state.RiskObj;

        RiskObj[event.target.name] = event.target.value;
        this.setState({ RiskObj });
    }


    getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }

    handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }
    uploadfile = (files) => {
        debugger;
        //var myJSON = JSON.stringify(files); 
        console.log("StData", files.map(f => f.meta))
        var data = new FormData();
        if (files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                data.append(files[i].file.name, files[i].file);
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
            beforeSend: function (xhr) {
                /* Authorization header */
                // xhr.setRequestHeader("Authorization", 'Bearer ' + localStorage.getItem('userToken'));
            },
            success: function (message) {
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

    }

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

    getModelNumber = (e) => {

    }
    renderRedirect = () => {
        if (this.state.redirect === true) {
            return <Redirect to={{
                pathname: '/pages/AddVehicle',
                state: { quotationDetailsDto: this.state.quotationDetailsDto, proposalno: this.state.proposalno, policyIssueDTO: this.state.policyIssueDTO, premDTO: this.state.premDTO, drvvehicleType: this.state.drvvehicleType, adddrvMakeModel: this.state.adddrvMakeModel, policyRqst: this.state.policyRqst }
            }} />
        }
    }
    submitDriverDetails = (e) => {
        this.AddDrv();
        this.state.policyIssueDTO.InsurableItem = this.state.insurableObj;
        this.renderRedirect();
        this.setState({ redirect: true })
    }
    AddDrv = () => {
        debugger;

        if (this.props.location.state.premiumDTO.additionalDriver > 1 && this.props.location.state.premiumDTO.additionalDriver <= 3) {

            for (var i = 0; i < this.state.insurableObj.length; i++) {
                if (this.state.insurableObj[i].InsurableName == "Driver") {
                    this.state.insurableObj[i].RiskItems.push(this.state.RiskObj);
                }
            }
            this.setState({ showadddrvbtn: true });

        } else {
            this.setState({ showadddrvbtn: false });
        }

        this.setState({ showadddrvflag: false, RiskObj: this.state.duplicateRiskObj });
        this.setState({ showadditionaldriver: true })
        console.log(" this.state.policyRqst", this.state.policyRqst);
    }

    render() {
        const { touched } = this.state;
        const className = touched ? 'btn touched' : 'btn';
        const { classes, loggingIn } = this.props;
        let nameTitles = [{ value: 'Mr' }, { value: 'Miss' }, { value: 'Mrs' }];
        console.log(this.state);

        return (

            <div className={classes.container}>

                <GridContainer justify="center">
                    <GridItem xs={8}>
                        <Card>
                            <CardBody>
                                {this.state.showadddrvbtn ?
                                    <GridContainer justify="center">
                                        <GridItem>
                                            <Button color="primary" round onClick={this.AddDrv}> Add Driver </Button>
                                        </GridItem>
                                    </GridContainer> : null}
                                <GridContainer justify="center">
                                    {/*<GridItem xs={12} sm={12} md={2}>
                                        <Dropdown
                                            labelText="Title"
                                            id="TitleId"
                                            lstObject={this.state.ddlDTO}
                                            //value={this.state.proposalIssueDTO.InsurableName}
                                            //name='InsurableName'
                                            //onChange={(e) => this.GetMasterData(e)}
                                            formControlProps={{ fullWidth: true }} />
                                    </GridItem>*/}
                                    <GridItem xs={4} >
                                        <CustomInput
                                            labelText="Name"
                                            name="Name"
                                            value={this.state.RiskObj.Name}
                                            onChange={(e) => this.onInputChangepropsal(e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={4}>
                                        <CustomInput
                                            labelText="Age"
                                            name="Age"
                                            value={this.state.RiskObj.Age}
                                            onChange={(e) => this.onInputChangepropsal(e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer justify="center">
                                    {this.state.showDropZone ?
                                        <GridItem xs={12} sm={12} md={4}>
                                            <Dropzone
                                                getUploadParams={this.getUploadParams}
                                                onChangeStatus={this.handleChangeStatus}
                                                onSubmit={this.uploadfilefront}
                                                accept="image/*,audio/*,video/*,application/pdf/*,word/*"
                                            />
                                        </GridItem> : null}
                                </GridContainer>
                                <GridContainer justify="center">

                                    <Button color="primary" round onClick={(e) => this.showOnClick(e)}> Upload File </Button>
                                </GridContainer>
                                <GridContainer justify="center">
                                    {this.renderRedirect()}
                                    <Button color="primary" round onClick={this.submitDriverDetails}> Submit </Button>

                                </GridContainer>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>


            </div>
        );
    }
}
AddDriver.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(AddDriver);
