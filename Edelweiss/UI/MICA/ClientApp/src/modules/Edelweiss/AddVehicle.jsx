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



class AddVehicle extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            policyNo: "",
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
                "Model": "",
                "VehicleNumber": "",
                "Identification Number": "1",
                "YearofRegistration": "",
                "VehicleType": "",
                "Documents": []
            },
            duplicateRiskObj: {

                "Model": "",

                "VehicleNumber": "",

                "Identification Number": "",

                "YearofRegistration": "",

                "VehicleType": "",

                "Documents": []
            },
            scheduleDTO: {
                "policyNo": "",
                "vehicleRegistrationNo": "",
                "vehicleType": "",
                "mon": false,
                "tue": false,
                "wed": false,
                "thu": false,
                "fri": false,
                "sat": false,
                "sun": false,
            },
            poliNo: "",

        }
    }
    AddVehicle = (files) => {
        debugger;
        if (this.state.policyIssueRequest.InsurableItem[1].InsurableName == "Vehicle") {

            this.state.policyIssueRequest.InsurableItem[1].RiskItems.push(this.state.RiskObj);


        }
        //this.setState({ RiskObj: this.state.duplicateRiskObj });
        console.log(" this.state.policyRqst", this.state.policyRqst);
    }
    Issuepolicy = () => {
        debugger;
        //let policyno = this.state.scheduleDTO.policyNo;
        this.state.scheduleDTO.vehicleRegistrationNo = this.state.RiskObj.VehicleNumber;
        this.AddVehicle();
        debugger;
        console.log("Issuepolicy", this.state.policyIssueRequest);
        fetch(`${EdelweissConfig.PolicyConfigUrl}/api/Policy/IssuePolicy`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('edelweisstoken')
            },
            body: JSON.stringify(this.state.policyIssueRequest)
        }).then(response => response.json())
            .then(data => {

                this.state.policyNo = data.id;
                let sDTO = this.state.scheduleDTO;
                sDTO.policyNo = data.id;
                //this.setState({poliNo:data.id})

                this.setState({ sDTO });

                //let policynothis = data.id;
                //policyno = policynothis;

                if (data.status == 2) {

                    this.renderRedirect();
                    this.setState({ redirect: true });

                    swal({
                        text: data.responseMessage,
                        icon: "success"
                    })
                    console.log("dddd", data);
                    fetch(`${EdelweissConfig.Edelweiss}/api/Mica_EGI/CreateUpdateSchedule`, {
                        method: 'Post',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': localStorage.getItem('edelweisstoken')
                        },
                        body: JSON.stringify(this.state.scheduleDTO)
                    }).then(response => response.json())
                        .then(data => {
                            swal({
                                text: "Schedule Created Successfully!",
                                icon: "success"
                            })
                            this.setState({ disablesendotp: true, disableresendotp: false })
                            console.log("dddd", data);
                        })
                }
            })

        console.log("ssssss", this.state.scheduleDTO);


    }

    componentDidMount() {


        const edelweisstoken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJhOTVkMDNjZC1kZjE4LTQ3NTYtYTU3Ny0zNDEyYjY4MTdkZDAiLCJFbWFpbCI6InNhbmRoeWFAZ21haWwuY29tIiwiT3JnSWQiOiIyNzciLCJQYXJ0bmVySWQiOiIwIiwiUm9sZSI6ImlOdWJlIEFkbWluIiwiTmFtZSI6InNhbmRoeWEiLCJVc2VyTmFtZSI6InNhbmRoeWFAZ21haWwuY29tIiwiUHJvZHVjdFR5cGUiOiJNaWNhIiwiU2VydmVyVHlwZSI6IjEiLCJleHAiOjE2NzU0OTkyOTksImlzcyI6IkludWJlIiwiYXVkIjoiSW51YmVNSUNBIn0.2oUTJQBxiqqqgl2319ZCREz1IyYHjVRhlDehI__O8Xg';
        localStorage.setItem('edelweisstoken', edelweisstoken);

        if (this.props.location.state != undefined) {
            this.state.scheduleDTO.vehicleType = this.props.location.state.drvvehicleType;
            this.state.RiskObj.VehicleType = this.props.location.state.drvvehicleType;
            this.state.RiskObj.Model = this.props.location.state.adddrvMakeModel;
            console.log("this.state.scheduleDTO.vehicleType", this.state.RiskObj.Model, this.state.scheduleDTO.vehicleType);

            this.setState({ quotationdataDto: this.props.location.state.quotationDetailsDto, policyIssueRequest: this.props.location.state.policyIssueDTO, vehiclepremiumDto: this.props.location.state.premDTO });
            //this.state.policyIssueRequest = this.props.location.state.policyRqst;
            //this.state.insurableObj[0].RiskItems[0].Name = this.state.quotationdataDto.primaryDriverName;
            console.log("policyIssueRequestis.stat", this.state.policyIssueRequest);

            fetch(`${EdelweissConfig.EdelweissConfigUrl}/api/Mica_EGI/GetVehicleDetails?VehicleId=` + this.props.location.state.quotationDetailsDto.vehicleMakeModelId, {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log("qdata21:", data);
                    this.setState({ vehicleModel: data.vehicleModel });
                });

            console.log("this.state.insurableObj", this.state.insurableObj);
        }
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
                pathname: '/pages/LogonVehicle',
                state: { policyIssueRequest: this.state.policyIssueRequest, RiskObj: this.state.RiskObj, scheduleDTO: this.state.scheduleDTO, vehiclepremiumDto: this.state.vehiclepremiumDto, policyNo: this.state.policyNo }
            }} />
        }
    }



    render() {
        const { classes, loggingIn } = this.props;
        console.log(this.state);

        return (
            <div className={classes.container}>
                <GridContainer justify="center">
                    <GridItem xs={8}>
                        <Card>
                            <CardBody>
                                <GridContainer justify="center">
                                    <GridItem xs={4}>
                                        <CustomInput
                                            labelText="Vehicle Number"
                                            name="VehicleNumber"
                                            value={this.state.RiskObj.VehicleNumber}
                                            onChange={(e) => this.onInputChange(e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={4}>
                                        <CustomInput
                                            labelText="Make & Model"
                                            name="Model"
                                            value={this.state.RiskObj.Model}
                                            onChange={(e) => this.onInputChange(e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={4}>
                                        <CustomInput
                                            labelText="Year of Registration"
                                            name="YearofRegistration"
                                            value={this.state.RiskObj.YearofRegistration}
                                            onChange={(e) => this.onInputChange(e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    {this.state.showDropZone ?
                                        <GridItem >
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
                                    <Button color="primary" round onClick={this.Issuepolicy}> Issue Policy </Button>
                                </GridContainer>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}
AddVehicle.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(AddVehicle);
