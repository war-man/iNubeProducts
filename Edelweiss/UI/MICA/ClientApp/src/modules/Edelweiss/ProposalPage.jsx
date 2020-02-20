import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import TextField from '@material-ui/core/TextField';
import swal from 'sweetalert';
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import { Redirect } from 'react-router-dom';
import { Paper } from "@material-ui/core";
import CalCulatePremuim from "./CalCulatePremium.jsx";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import EdelweissConfig from "./EdelweissConfig.js";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MUIButton from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dropzone from 'react-dropzone-uploader';
import Dropdown from "components/Dropdown/Dropdown.jsx";
import $ from 'jquery';
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

const Styledropdown = withStyles({
    root: {
        background: '#e7ab37ad !important',
        // background: '#fff !important',
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
        width: '12rem !important'
    },
    //input: {
    //    color:'white'
    //},
    label: {
        //    textTransform: 'capitalize',
        color: '#white'
    },
})(FormControl);

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


class Proposal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            InsurableItem: [
                { mID: 1, mValue: "Vehicle", label: "Vehicle" },
                { mID: 2, mValue: "Person", label: "Person" },
            ],
            selectedIns: "",
            proposalDTO: {
                "proposalNo": "",
            },
            showDropZone: false,
            insurableObj: {

                "InsurableName": "",

                "InsurableFields": [

                    {

                        "Name": "",

                        "Identification Number": 123

                    }

                ]

            },
            proposalIssueDTO: 
                {

            "proposalNumber": "",
                "InsurableItem": [],
               
       
            }

        }
    }

    componentDidMount() {
        console.log("rdr", this.props.location.state);
        if (this.props.location.state != undefined) {

            this.state.insurableObj.InsurableFields[0].Name = this.props.location.state.drName;
            //let calculateDto = this.state.proposalIssueDTO.CalculatePremium;
            //calculateDto.stateCode = this.props.location.state.premiumDTO.stateCode;
            //calculateDto.si = this.props.location.state.premiumDTO.si;
            //calculateDto.noOfPC = this.props.location.state.premiumDTO.noOfPC;
            //calculateDto.noOfTW = this.props.location.state.premiumDTO.noOfTW;
            //calculateDto.driverAge = this.props.location.state.premiumDTO.driverAge;
            //calculateDto.driverExp = this.props.location.state.premiumDTO.driverExp;
            //calculateDto.additionalDriver = this.props.location.state.premiumDTO.additionalDriver;
            //calculateDto.billingFrequency = this.props.location.state.premiumDTO.billingFrequency;
            
            this.setState({ });
          
        }

    }


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

    showOnClick = () => {
        this.setState({ showDropZone: true })
    }

    getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }

    handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }

    onInputChangepropsal = (evt) => {
        let name = evt.target.name;
        let value = evt.target.value;
        let Data = this.state.proposalIssueDTO;
        Data[name] = value;
        this.setState({ Data });
        console.log("Data1:", this.state.proposalDTO)
        // this.change(evt, name, type);
    }

    handleselectedIns = (e, key) => {

    }

    handlecloseDialog = () => {
        this.setState({ opendialog: false });
    }

    handleopenDialog = () => {
        this.setState({ opendialog: true });
    }

    GetMasterData = (event) => {
       
        let Value=this.state.InsurableItem.filter(s => s.mID == event.target.value);
        if (Value.length > 0) {
            this.state.insurableObj.InsurableName = Value[0].mValue;
        }
        console.log("poll", this.state.insurableObj.InsurableName);
    }
    Issuepolicy = () => {
        this.state.proposalIssueDTO.InsurableItem = this.state.insurableObj;
        console.log("Issuepolicy", this.state.proposalIssueDTO);
        fetch(`${EdelweissConfig.PolicyConfigUrl}/api/Policy/IssuePolicy`, {
            method: 'Post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.proposalIssueDTO)
        }).then(response => response.json())
            .then(data => {
                swal({
                    text: "Policy issued sent successfully!",
                    icon: "success"
                })
               console.log("dddd", data);
            })
    }
    render() {
        const { classes, loggingIn } = this.props;
        let btn3_class = this.state.btn3color ? "warning" : "default";
        return (
          
            <div className={classes.container}>
                <Card>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                            labelText="Proposal No"
                                name="proposalNumber"
                                value={this.state.proposalIssueDTO.proposalNumber}
                            onChange={(e) => this.onInputChangepropsal(e)}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>


                   
                      {/*  <GridContainer justify="center">
                            <GridItem>
                                <Button variant="outlined" round size="large" color={btn3_class} onClick={this.handleopenDialog}>{this.state.selectedIns}</Button>
                                <Dialog style={{ textAlign: "center" }} onClose={this.handlecloseDialog} aria-labelledby="simple-dialog-title" open={this.state.opendialog} >
                                    <DialogTitle id="simple-dialog-title"> <b></b> </DialogTitle>
                                    <DialogContent dividers>
                                        {this.state.InsurableItem.map(function (item, key) {
                                            return (
                                                <List round button>
                                                    <ListItem button id="padding-list-item" selected={this.state.selectedInsItem === item.mID} onClick={e => this.handleselectedIns(e, key)} >
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
                        </GridContainer>*/}
                            <GridContainer justify="center">
                                <GridItem xs={6} sm={6} md={4}>
                            <Dropdown
                                labelText="Insurable Item"
                                id="InsurableItemId"
                                lstObject={this.state.InsurableItem}
                                    value={this.state.proposalIssueDTO.InsurableName}
                                    name='InsurableName'
                                onChange={(e) => this.GetMasterData(e)}
                                        formControlProps={{ fullWidth: true }} />
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
                   
                   
                    </GridContainer>
                    <GridContainer justify="center">

                        <Button color="primary" round onClick={(e) => this.showOnClick(e)}> Upload File </Button>


                        <Button color="primary" round onClick={this.Issuepolicy}> Policy Issue </Button>

                    </GridContainer>

                    
                </Card>
            </div >
        );
    }
}

Proposal.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(Proposal);