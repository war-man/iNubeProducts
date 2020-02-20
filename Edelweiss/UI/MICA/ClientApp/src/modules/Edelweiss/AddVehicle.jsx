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
import Dropzone from 'react-dropzone-uploader';
import EdelweissConfig from "./EdelweissConfig.js";
import $ from 'jquery';
import swal from 'sweetalert';


class AddVehicle extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            vehicleModel:"",
            quotationdataDto: {},
            NoOfDriver: '',
            VehicleAge: '',
            VehicleNumber: '',
            VehicleModelNumber: '',
            insurableObj: [{

                "InsurableName": "Vehicle",

                "InsurableFields": [

                    {

                        "Name": "",

                        "Identification Number": "",

                        "Vehicle Registration Date": ""

                    }

                ]

            }],
            proposalIssueDTO:
            {

                "ProposalNumber": "",
                "InsurableItem": [],


            }
        }
    }

    Issuepolicy = () => {
        this.state.proposalIssueDTO.InsurableItem = this.state.insurableObj;
        console.log("Issuepolicy", this.state.proposalIssueDTO);
        fetch(`${EdelweissConfig.PolicyConfigUrl}/api/Policy/IssuePolicy`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI5NTc4NmM2OS0xNjAxLTQzMGQtODM1Ni01M2RlNDUyZjUxZTYiLCJFbWFpbCI6InZpdGFsQGludWJlc29sdXRpb25zLmNvbSIsIk9yZ0lkIjoiMTEyIiwiUGFydG5lcklkIjoiMCIsIlJvbGUiOiJEZW1vIFJvbGUiLCJOYW1lIjoidml0aGFsIiwiVXNlck5hbWUiOiJ2aXRhbEBpbnViZXNvbHV0aW9ucy5jb20iLCJQcm9kdWN0VHlwZSI6Ik1pY2EiLCJTZXJ2ZXJUeXBlIjoiMSIsImV4cCI6MTY3MDY1NDMzMCwiaXNzIjoiSW51YmUiLCJhdWQiOiJJbnViZU1JQ0EifQ.nZsItQ97TGtSZ-IrZ8SlDeOCIKnaCI4tmeLC953z9qA'

            },
            body: JSON.stringify(this.state.proposalIssueDTO)
        }).then(response => response.json())
            .then(data => {
                swal({
                    text: "Policy issued with policy number"+ ""+data,
                    icon: "success"
                })
                console.log("dddd", data);
            })
    }

    componentDidMount() {
        console.log("qaaaaa", this.props.location.state.quotationDetailsDto);
        console.log("prNo", this.props.location.state.proposalno);
        if (this.props.location.state != undefined) {
            this.setState({ quotationdataDto: this.props.location.state.quotationDetailsDto });
            this.state.proposalIssueDTO.ProposalNumber = this.props.location.state.proposalno;
            this.state.insurableObj[0].InsurableFields[0].Name = this.state.quotationdataDto.primaryDriverName;
            console.log("thisquotationDto", this.state.quotationdataDto);
        }
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
                this.setState({ vehicleModel: data.vehicleModel});
            });


    }
    //onInputChange = (evt) => {
    //    const Data = this.state.quotationDetailsDto;
    //    Data[evt.target.name] = evt.target.value;
    //    this.setState({ Data });
    //}
    showOnClick = () => {
        this.setState({ showDropZone: true })
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
            beforeSend: function (xhr) {
                /* Authorization header */
                xhr.setRequestHeader("Authorization", 'Bearer ' + localStorage.getItem('userToken'));
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
 
    render() {
        const { classes, loggingIn } = this.props;
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
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="Vehicle Number"
                                name="vehicleMakeModelId"
                                value={this.state.quotationdataDto.vehicleMakeModelId}
                                //onChange={(e) => this.onInputChangepropsal(e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>

                    </GridContainer>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="Make & Model"
                                //name="VehicleModelNumber"
                                value={this.state.vehicleModel}
                                //onChange={(e) => this.onInputChangepropsal(e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>

                    </GridContainer>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="Year of"
                                name="VehicleAge"
                                value={this.state.quotationdataDto.vehicleAge}
                                //onChange={(e) => this.onInputChangepropsal(e)}
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
                                    onSubmit={this.uploadfile}
                                    accept="image/*,audio/*,video/*,application/pdf/*,word/*"
                                />
                            </GridItem> : null}
                    </GridContainer>
                    <GridContainer justify="center">

                        <Button color="primary" round onClick={(e) => this.showOnClick(e)}> Upload File </Button>
                    </GridContainer>

                    <GridContainer justify="center">

                        <Button color="primary" round onClick={this.Issuepolicy}> Issue Policy </Button>

                    </GridContainer>
                   
                </CardBody>
           </Card>
           
      </div>
    );
  }
}
AddVehicle.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(AddVehicle);
