import React from "react";
//import PropTypes from "prop-types";
//import { connect } from 'react-redux';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
//import Face from "@material-ui/icons/Face";
//import Email from "@material-ui/icons/Email";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
//import CardFooter from "components/Card/CardFooter.jsx";
//import Checkbox from "@material-ui/core/Checkbox";
//import FormControlLabel from "@material-ui/core/FormControlLabel";
//import Check from "@material-ui/icons/Check";
//import Clear from "@material-ui/icons/Clear";
//import Radio from "@material-ui/core/Radio";
//import MailOutline from "@material-ui/icons/MailOutline";
import LoginConfig from 'modules/Login/LoginConfig.js';
import swal from 'sweetalert';
import validationPage from "./ValidationPage";

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import $ from 'jquery'
import { Redirect } from 'react-router-dom';
//import { easing } from "@material-ui/core/styles/transitions";

class Frsttimelogin extends React.Component {
    constructor() {
        super();
        this.state = {
            oldpass: "",
            redirect: false,
            otpvisbility: false,
            btnvisibility: false,
            Username: "",
            newPassword: "",
            newPasswordState: "",
            confirmPassword: "",
            confirmPasswordState: "",
            servertype: "",
            userid: "",
            sucess: false,
            error: false,
            Password: {
                "id": "",
                "isChangePassword": false,
                "newPassword": "",
                "confirmPassword": ""
            },
            Mailotp: {
                "id": 0,
                "userId": "",
                "otp": "",
                "email": "",
                "userName": ""
            },
            UName: "",
            environment: [],
            Verifyotp: {
                "otp": "",
                "userId": ""
            },
            errormessage: false,
            blanknewpassword: false,
            successmessage: false,
            blankconfirmpassword: false,
            passwordexpired: false,
        };
        this.SendOtp = this.SendOtp.bind(this);
        this.VerifyOtp = this.VerifyOtp.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    SetValue = (type, event) => {
        event.preventDefault();

        let pass = this.state.Password;
        let name = event.target.name;
        let value = event.target.value;
        pass[name] = value;

        this.setState({ pass });
        this.change(event, name, type);
        if (this.state.Password.newPassword != "") {
            this.setState({ blanknewpassword: false });
            //this.state.blanknewpassword = false;
        }
        if (this.state.Password.confirmPassword != "") {
            this.setState({ blankconfirmpassword: false });
            //this.state.blankconfirmpassword = false;
        }
        if (this.state.Password.newPassword == this.state.Password.confirmPassword) {
            this.setState({ successmessage: true, errormessage: false });
            //this.state.successmessage = true;
            //this.state.errormessage = false;
            this.setState({ newPasswordState: "success" });
        }
        else {
            this.setState({ successmessage: false, errormessage: true });
            //this.state.errormessage = true;
            //this.state.successmessage = false;
            this.setState({ newPasswordState: "error" });
        }
    };

    change = (event, stateName, type) => {
        switch (type) {
            case "newpass":
                if (validationPage.verifypass(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                }
                else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "pass":
                if (this.state.Password.newPassword == this.state.Password.confirmPassword) {
                    this.setState({ successmessage: true, errormessage: false });
                    //this.state.successmessage = true;
                    //this.state.errormessage = false;
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ successmessage: false, errormessage: true });
                    //this.state.errormessage = true;
                    //this.state.successmessage = false;
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            default:
                break;
        }
    }

    handleChange(event) {
        let otp = this.state.Verifyotp;
        let name = event.target.name;
        let value = event.target.value;
        otp[name] = value;

        this.setState({ otp });
    }

    renderRedirect = () => {
        if (this.state.redirect == true) {
            return <Redirect to={{
                pathname: '/pages/password-page',
                state: {
                    UName: this.props.location.state.UserName,
                    environmentvalue: this.props.location.state.environmentvalue,
                    environment: this.props.location.state.environment,
                }
            }} />
        }
    }

    componentDidMount() {
        if (this.props.location.state != null) {
            this.setState({
                UName: this.props.location.state.UserName,
                environmentvalue: this.props.location.state.environmentvalue,
                environment: this.props.location.state.environment,
                passwordexpired: this.props.location.state.passwordexpired,
            });
        }

        //console.log("servertype: ", this.state.servertype);
        //console.log("servertype: ", this.props.location.state.servertype);
    }

    SendOtp() {
        var oneotp = this.state.Mailotp;
        oneotp.userName = localStorage.getItem('Username');
        this.setState({ oneotp });


        if (this.state.Password.newPassword == "" || this.state.Password.confirmPassword == "") {
            this.setState({ blanknewpassword: true, blankconfirmpassword: true, newPasswordState: '', confirmPasswordState: '' });
        }
        else if (this.state.Password.newPassword === this.state.Password.confirmPassword) {
            let pass = this.state.Password;
            pass.id = localStorage.getItem('userId');;
            pass.isChangePassword = true;
            this.setState({ pass });
            fetch(`${LoginConfig.UserConfigUrl}/api/UserProfile/ChangePassword`, {
                method: 'Post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify(pass)
            }).then(response => {
                console.log("response", response)
                return response.json()
            }).then(data => {
                console.log("data", data);
                if (data.status === 2) {
                    swal({
                        text: "Password changed successfully",
                        icon: "success",
                        buttons: [false, "OK"],
                    }).then((willDelete) => {
                        if (willDelete) {
                            this.setState({ redirect: true });
                        }
                    });
                } else {
                    this.setState({ errormessage: true });
                }
            });
        } else {
        }
    }

    VerifyOtp() {
        var validotp = this.state.Verifyotp;
        validotp.userId = this.state.userid;
        this.setState({ validotp });
        fetch(`${LoginConfig.UserConfigUrl}/api/UserProfile/VerifyingOTP`, {
            //fetch('https://localhost:44367/api/UserProfile/VerifyingOTP', {
            method: 'Post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(validotp)
        }).then(response => {
            console.log(response);
            return response.json()
        }).then(data => {
            if (data.status == 1) {
                //        swal({
                //            text: "OTP verified!",
                //            icon: "success"
                //        });
                this.setState({ btnvisibility: true });
            }
            else {
                this.setState({ error: true });
            }
        })
        if (this.state.Password.newPassword == this.state.Password.confirmPassword) {
            let pass = this.state.Password;
            pass.id = this.state.userid;
            pass.isChangePassword = true;
            this.setState({ pass });
            fetch(`${LoginConfig.UserConfigUrl}/api/UserProfile/ChangePassword`, {
                //fetch('https://localhost:44367/api/UserProfile/ChangePassword', {
                method: 'Post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pass)
            }).then(response => {
                console.log("response", response)
                return response.json()
            }).then(data => {
                console.log("data", data);
                if (data.status === 2) {
                    swal({
                        text: "Password changed successfully",
                        icon: "success"
                    });
                    this.setState({ redirect: true });
                } else {
                    this.setState({ errormessage: true });
                    //this.state.errormessage = true;
                }
            });
        } else {
            swal({
                text: "Please try again with other password",
                icon: "error"
            });
            this.setState({ errormessage: true });
            //this.state.errormessage = true;
        }
    }

    render() {
        const { classes, loggingIn } = this.props;
        return (
            <div className={classes.container}>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={6} md={4}>
                        <Card login className={classes[this.state.cardAnimaton]}>
                            <CardHeader
                                className={`${classes.cardHeader} ${classes.textCenter}`}
                                color="rose">
                                <h4 className={classes.cardTitle}>Create Your Password</h4>
                            </CardHeader>
                            <CardBody>
                                <GridContainer>
                                    <GridItem>
                                        <p><b>*Note: </b>The Password should contain more than 8 characters with at least one lowercase alphabet, one upper case alphabet, one numeric digit and a special character.</p>
                                    </GridItem>
                                </GridContainer>

                                {this.state.passwordexpired ?
                                    <GridContainer justify="center">
                                        <p className="error">*your password has been expired. Please set a new password.</p>
                                    </GridContainer>
                                    : null}

                                <CustomInput
                                    success={this.state.newPasswordState === "success"}
                                    error={this.state.newPasswordState === "error"}
                                    labelText="New Password"
                                    name="newPassword"
                                    value={this.state.Password.newPassword}
                                    onChange={(e) => this.SetValue("newpass", e)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        type: "Password",
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Icon className={classes.inputAdornmentIcon} >
                                                    lock_outline </Icon>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                {this.state.blanknewpassword ? <p className="error">*Password should not be blank</p> : null}
                                <CustomInput
                                    success={this.state.confirmPasswordState === "success"}
                                    error={this.state.confirmPasswordState === "error"}
                                    labelText="Confirm Password"
                                    name="confirmPassword"
                                    value={this.state.Password.confirmPassword}
                                    onChange={(e) => this.SetValue("pass", e)}
                                    type="password"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        type: "Password",
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Icon className={classes.inputAdornmentIcon} >
                                                    lock_outline </Icon>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                {this.state.blankconfirmpassword ? <p className="error">*Password should not be blank</p> : null}
                                {this.state.successmessage ? <p className="success">Password Matching</p> : null}
                                {this.state.errormessage ? <p className="error">*Password not Matching</p> : null}
                                <div>
                                    <GridContainer justify="center">
                                        {this.renderRedirect()} <Button color="info" simple size="lg" onClick={this.SendOtp} > Submit </Button>
                                    </GridContainer>
                                </div>
                                {this.state.otpvisbility ?
                                    <div>
                                        <p className="success">Please Check your Mail!</p>
                                        <CustomInput
                                            labelText="Enter OTP"
                                            name="otp"
                                            value={this.state.Verifyotp.otp}
                                            onChange={this.handleChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        <div>
                                            <GridContainer justify="center">
                                                {this.renderRedirect()}
                                                <Button color="info" simple size="lg" onClick={this.VerifyOtp} >Confirm OTP</Button>
                                            </GridContainer>
                                        </div>
                                    </div>
                                    : null}
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default withStyles(loginPageStyle)(Frsttimelogin);