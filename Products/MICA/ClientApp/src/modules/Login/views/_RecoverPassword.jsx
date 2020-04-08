import React from "react";
//import PropTypes from "prop-types";
//import { connect } from 'react-redux';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
//import InputAdornment from "@material-ui/core/InputAdornment";
//import Icon from "@material-ui/core/Icon";

// @material-ui/icons
//import Face from "@material-ui/icons/Face";
//import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";

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
//import validationPage from "./ValidationPage";

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import $ from 'jquery'
import { Redirect } from 'react-router-dom';

class RecoverPassword extends React.Component {
    constructor() {
        super();
        this.state = {
            visibility: false,
            sndvisibility: true,
            rsndvisibility: false,
            otpvisibility: false,
            redirect: false,
            redirectto: false,
            time: {},
            seconds: 60,
            userid: "",
            userId: "",
            UserName: "",
            environmentvalue: "",
            environment: [],
            Mailotp: {
                id: 0,
                userId: "",
                otp: "",
                email: "",
                userName: "",
                envId: "",
                productType: LoginConfig.ProductType
            },
            RetrievePassword: {
                emailid: "",
                phonenum: "",
                otp: ""
            },
            Verifyotp: {
                otp: "",
                userId: "",
                envId: "",
                productType: LoginConfig.ProductType
            },
            errormessage: false,
            errorotp: false,
        };
        this.timer = 0;
        this.countDown = this.countDown.bind(this);
        this.Sendotp = this.Sendotp.bind(this);
        this.SubmitOtp = this.SubmitOtp.bind(this);
        this.Sendresetlink = this.Sendresetlink.bind(this);
        this.passwordreset = this.passwordreset.bind(this);
        this.starttimer = this.starttimer.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }

    secondsToTime(secs) {
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }

    starttimer() {
        // start timer after button is clicked
        this.interval = setInterval(() => {
            this.setState(prevState => ({
                seconds: prevState.seconds - 1
            }));
        }, 1000);
    }

    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        console.log("seconds", this.state.seconds)
        this.setState({ time: timeLeftVar });
        if (this.props.location.state != null) {
            this.setState({
                UserName: this.props.location.state.UserName,
                userId: this.props.location.state.userId,
                environmentvalue: this.props.location.state.environmentvalue,
                environment: this.props.location.state.environment,
            });
        }
        console.log("servertype: ", this.state.environmentvalue);
        console.log("servertype1: ", this.props.location.state.environmentvalue);
    }

    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });

        // Check if we're at zero.
        if (seconds == 0) {
            clearInterval(this.timer);
        }
    }

    SetValue = (event) => {
        event.preventDefault();

        let rpass = this.state.RetrievePassword;
        let name = event.target.name;
        let value = event.target.value;
        rpass[name] = value;

        this.setState({ rpass });
        if (this.state.RetrievePassword.emailid != "") {
            this.setState({ errormessage: false });
        }
    };

    passwordreset() {
        if (this.state.RetrievePassword.phonenum == "" && this.state.RetrievePassword.emailid == "") {
            this.setState({ errormessage: true });
            //this.state.errormessage = true;
        }
        else if (this.state.RetrievePassword.phonenum.length == 0) {
            this.Sendresetlink();
        }
        else {
            this.Sendotp();
        }
        //this.setState({ visibility: true });
    }

    Sendresetlink(event) {
        //console.log("email id= " + this.state.RetrievePassword.emailid);
        if (this.timer == 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
            //this.setState({ isButtonDisabled: true });
        }
        if (this.state.time.s == 0) {
            this.setState({
                isButtonDisabled: true
            });
        }
        else {
            this.setState({
                isButtonDisabled: false
            });
        }
        setTimeout(() => this.setState({ isButtonDisabled: false, visibility: false, seconds: 60 }), 60000);

        let mail = this.state.Mailotp;
        mail.email = this.state.RetrievePassword.emailid;
        mail.envId = this.props.location.state.environmentvalue;
        //mail.userName = this.state.UserName;
        //mail.id = this.state.userId;
        this.setState({ mail });
        console.log(" send otp mail: ", mail)
        fetch(`${LoginConfig.UserConfigUrl}/api/UserProfile/ResetOTP`, {
            //fetch('https://localhost:44367/api/UserProfile/ResetOTP', {
            method: 'Post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mail)
        })
            .then(response => {
                if (response.status == 200) {
                    //console.log('success');
                    swal({
                        text: "OTP sent to your mail",
                        icon: "success"
                    });
                }
                return response.json()
            })
            .then((data) => {
                console.log("response data: ", data);
                if (data.status == 1) {
                    this.setState({
                        sndvisibility: false,
                        rsndvisibility: true,
                        otpvisibility: true,
                        visibility: true,
                        userid: data.sendOtp.userId
                    });
                }
                else if (data.status == 4) {
                    swal({
                        text: "Please enter registered Email-ID",
                        icon: "error",
                    });
                }
            });

    }

    Sendotp(event) {
        //console.log("Phone Number= " + this.state.RetrievePassword.phonenum);
        if (this.timer == 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
        if (this.state.time.s == 0) {
            this.setState({
                isButtonDisabled: true
            });
        }
        else {
            this.setState({
                isButtonDisabled: false
            });
        }
        this.setState({
            sndvisibility: false,
            rsndvisibility: true,
            otpvisibility: true
        });
    }

    renderRedirect = () => {
        if (this.state.redirect == true) {
            return <Redirect to={{
                pathname: '/pages/ResetPassword',
                state: {
                    userid: this.state.userid,
                    UserName: this.state.UserName,
                    environmentvalue: this.props.location.state.environmentvalue,
                    environment: this.props.location.state.environment,
                }
            }} />
        }
    }

    handleBack() {
        this.setState({ redirectto: true });
    }

    renderRedirectto = () => {
        if (this.state.redirectto == true) {
            return <Redirect to={{
                pathname: '/pages/password-page',
                state: {
                    environmentvalue: this.props.location.state.environmentvalue,
                    environment: this.props.location.state.environment,
                }
            }} />
        }
    }

    SubmitOtp() {
        if (this.state.RetrievePassword.otp == "") {
            this.state.errorotp = true;
        } else {
            var validotp = this.state.Verifyotp;
            validotp.userId = this.state.userid;
            validotp.envId = this.props.location.state.environmentvalue;
            validotp.otp = this.state.RetrievePassword.otp;
            this.setState({ validotp });
            fetch(`${LoginConfig.UserConfigUrl}/api/UserProfile/VerifyingOTP`, {
                method: 'Post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(validotp)
            }).then(response => {
                //if (response == false) {
                //    swal({
                //        text: "Invalid OTP",
                //        icon: "success"
                //    });
                //}
                console.log(response);
                return response.json()
            })
                .then(data => {
                    if (data.status == 1) {
                        swal({
                            text: "OTP verified!",
                            icon: "success"
                        });
                        this.setState({ redirect: true });
                    }
                    else {
                        this.setState({ errorotp: true });
                    }
                })
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
                                <h4 className={classes.cardTitle}>Reset Your Password</h4>
                            </CardHeader>
                            <CardBody>
                                <CustomInput
                                    align="center"
                                    labelText="Email-ID"
                                    name="emailid"
                                    onChange={this.SetValue}
                                    value={this.state.RetrievePassword.emailid}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                                {this.state.errormessage ? <p className="error">*Please enter your registered Email-ID</p> : null}
                                <GridContainer justify="center">
                                    <label> OR </label>
                                </GridContainer>
                                <CustomInput
                                    align="center"
                                    labelText="Phone number"
                                    name="phonenum"
                                    onChange={this.SetValue}
                                    type="number"
                                    value={this.state.RetrievePassword.phonenum}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />

                                <GridContainer justify="center">
                                    <div>{this.renderRedirectto()}
                                        <Button color="rose" simple size="lg" onClick={this.handleBack}>Back</Button>

                                        {this.state.sndvisibility ?
                                            <Button color="info" simple size="lg" onClick={this.passwordreset}>Send OTP</Button>
                                            : null}

                                        {this.state.rsndvisibility ?
                                            <Button color="info" simple size="lg" onClick={this.passwordreset} disabled={this.state.isButtonDisabled} >Resend OTP</Button>
                                            : null}
                                        <br />
                                        {/* {this.state.visibility ? <label>Please wait to Resend OTP &nbsp;&nbsp;{this.state.time.s}</label> : null}*/}
                                        {this.state.visibility ? <p>Please wait for a minute to Resend OTP </p> : null}
                                    </div>
                                </GridContainer>

                                {this.state.otpvisibility ?
                                    <div>
                                        <CustomInput
                                            align="center"
                                            labelText="Enter OTP"
                                            name="otp"
                                            onChange={this.SetValue}
                                            value={this.state.RetrievePassword.otp}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        {this.state.errorotp ? <p className="error">*Please enter valid OTP</p> : null}
                                        <div>
                                            <GridContainer justify="center">
                                                {this.renderRedirect()}
                                                <Button color="info" simple size="lg" onClick={this.SubmitOtp}>Submit OTP</Button>
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

export default withStyles(loginPageStyle)(RecoverPassword);