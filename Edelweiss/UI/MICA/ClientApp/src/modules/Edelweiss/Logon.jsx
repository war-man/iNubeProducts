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
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Select from '@material-ui/core/Select';
import { Redirect } from 'react-router-dom'
import { Paper, Divider } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import MuiButton from '@material-ui/core/Button';
import CustomCheckbox from "components/Checkbox/CustomCheckbox";
import Tooltip from '@material-ui/core/Tooltip';
import GetAppIcon from '@material-ui/icons/GetApp';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import Car from "assets/img/Car.jpg";
import Scheduler from './Scheduler.jsx';
import Modal from '@material-ui/core/Modal';

import EdelweissConfig from "./EdelweissConfig.js";
const Styledivider = withStyles({
    root: {
        color: "#000",
        width: '67rem',
        height: '0.1rem',
    }
})(Divider);

const StyleButton = withStyles({
    root: {
        fontSize: '12px',
        //color:'#ddd'
    },
    //label: {
    //    textTransform: 'capitalize',
    //    color: 'white'
    //},
})(MuiButton);

const Styleinput = withStyles({
    root: {
        //background: '#e7ab37ad !important',
        background: '#fff !important',
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px'
    },
    //input: {
    //    color:'white'
    //},
    label: {
        //    textTransform: 'capitalize',
        color: 'white'
    },
})(TextField);

class Logon extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sendotp: {
                "contactNumber": "",
                "otp": ""
            },
            policyNo: "",
            redirect: false,
            disablesendotp: false,
            disableresendotp: true,
        };
    }

    //handleSubmit = () => {
    //    swal({
    //        text: "Do Service",
    //        icon: "error"
    //    })
    //}

    handleCheckbox = (e) => {

    }


    renderRedirect = () => {
        if (this.state.redirect === true) {
            return <Redirect to={{
                pathname: '/pages/LogonVehicle',
                state: { policyNo: this.state.policyNo }
            }} />
        }
        else if (this.state.redirectback === true) {
            return <Redirect to={{
                pathname: '/pages/ProceedPayment',

            }} />
        }
    }

    handleSubmit = () => {

    }

    componentDidMount() {


        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJjNTFhYmQ0Mi0zZDEyLTRkODctOTI5OS1iOTY0MGUzMmU3ZjIiLCJFbWFpbCI6ImphZ3VhcnJpZGVyMThAZ21haWwuY29tIiwiT3JnSWQiOiIxMTIiLCJQYXJ0bmVySWQiOiIwIiwiUm9sZSI6ImlOdWJlIEFkbWluIiwiTmFtZSI6IkdvcGkiLCJVc2VyTmFtZSI6ImphZ3VhcnJpZGVyMThAZ21haWwuY29tIiwiUHJvZHVjdFR5cGUiOiJNaWNhIiwiU2VydmVyVHlwZSI6IjI5OCIsImV4cCI6MTYxNDUwNzU0OSwiaXNzIjoiSW51YmUiLCJhdWQiOiJJbnViZU1JQ0EifQ.MxIIyauo1RUqJfaAZNKIuVDKMjpsM8ax1NYGE1Wq3Sk';
        localStorage.setItem('Token', token);

        //fetch(`${EdelweissConfig.PolicyConfigUrl}/api/Policy/GetProposalPolicyDetail?Mobileno=112233445566`, {
        //    method: 'GET',
        //    headers: {
        //        'Accept': 'application/json',
        //        'Content-Type': 'application/json',
        //        'Authorization': 'Bearer ' + localStorage.getItem('Token')
        //    },
        //}).then(response => response.json())
        //    .then(data => {
        //        console.log('response: ', data);
        //    });
    }

    handleOpen = () => {
        this.setState({ open: true });
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    onInputChange = (evt) => {
        const Data = this.state.sendotp;
        Data[evt.target.name] = evt.target.value;
        this.setState({ Data });
    }

    SendOTP = () => {
        if (this.state.sendotp.contactNumber != "") {
            console.log("console", this.state.sendotp.contactNumber);
            fetch(`http://mica-publi-11qa3l637dqw3-293834673.ap-south-1.elb.amazonaws.com:9025/api/Mica_EGI/SendOTP`, {
                method: 'Post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state.sendotp)
            }).then(response => response.json())
                .then(data => {
                    swal({
                        text: "OTP sent successfully!",
                        icon: "success"
                    })
                    this.setState({ disablesendotp: true, disableresendotp: false })
                    console.log("dddd", data);
                })
        } else {
            swal({
                text: "Please enter your Mobile Number",
                icon: "error"
            })
        }
    }

    ResetOTP = () => {
        console.log("console", this.state.sendotp.contactNumber);
        fetch(`${EdelweissConfig.EdelweissConfigUrl}/api/Mica_EGI/ResetOTP`, {
            method: 'Post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.sendotp)
        }).then(response => response.json())
            .then(data => {
                //if (data.status == 1) {
                swal({
                    text: "OTP sent successfully!",
                    icon: "success"
                })
                //} else {
                //    swal({
                //        text: data.responseMessage,
                //        icon: "error"
                //    })
                //}
                console.log("dddd", data);
            })
    }

    quickbuyProceed = () => {
        console.log("console", this.state.sendotp.contactNumber);
        fetch(`http://mica-publi-11qa3l637dqw3-293834673.ap-south-1.elb.amazonaws.com:9025/api/Mica_EGI/VerifyingOTP`, {
            method: 'Post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.sendotp)
        }).then(response => response.json())
            .then(data => {
                swal({
                    text: "OTP verified successfully!",
                    icon: "success"
                })
                this.handleVehicles();
                //this.setState({ redirect: true });
            })

    }

    handleVehicles = () => {
        fetch(`${EdelweissConfig.PolicyConfigUrl}/api/Policy/GetProposalPolicyDetail?Mobileno=` + this.state.sendotp.contactNumber + ``, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('Token')
            },
        }).then(response => response.json())
            .then(data => {
                console.log('response: ', data);
                this.setState({ policyNo: data.PolicyNumber, redirect: true });
            });
    }

    render() {
        const { classes, loggingIn } = this.props;
        return (
            <div className={classes.container}>
                <GridContainer justify="center">
                    <GridItem xs={6}>
                        <Card>
                            <CardBody>
                                <GridContainer justify="center">
                                    <GridItem>
                                        <GridContainer justify="center">
                                            <h3>Log-in Here</h3>
                                        </GridContainer>
                                        <GridContainer>
                                            <CustomInput
                                                labelText="Mobile Number"
                                                id="email_adress"
                                                name="contactNumber"
                                                value={this.state.sendotp.contactNumber}
                                                onChange={this.onInputChange}
                                                inputType="number"
                                                formControlProps={{ fullWidth: true }}
                                            />
                                            <StyleButton color="default" style={{ fontSize: "0.7rem" }} round disabled={this.state.disablesendotp} onClick={this.SendOTP}>send OTP</StyleButton>
                                            <MuiButton color="primary" style={{ fontSize: "0.7rem", position: "relative", left: "21rem" }} disabled={this.state.disableresendotp} round onClick={this.ResetOTP}>send Again</MuiButton>
                                            <CustomInput
                                                labelText="Enter OTP"
                                                id="email_adress"
                                                name="otp"
                                                value={this.state.sendotp.otp}
                                                onChange={this.onInputChange}
                                                inputType="number"
                                                formControlProps={{ fullWidth: true }}
                                            />
                                        </GridContainer>
                                        <GridContainer justify="center">
                                            {this.renderRedirect()}
                                            <Button color="primary" round onClick={this.quickbuyProceed}>Proceed</Button>
                                        </GridContainer>
                                    </GridItem>
                                </GridContainer>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer >
            </div >
        );
    }
}

Logon.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(Logon);