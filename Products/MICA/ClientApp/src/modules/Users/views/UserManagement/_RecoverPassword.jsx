import React from "react";
import Button from "components/CustomButtons/Button.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import $ from 'jquery';
import Alerts from "components/CustomAlerts/Alerts.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import FilterNone from "@material-ui/icons/FilterNone";
import swal from 'sweetalert';
import { FormControl } from "@material-ui/core";
import validationPage from "./ValidationPage";
import UserConfig from 'modules/Users/UserConfig.js';

class RecoverPassword extends React.Component {
    constructor() {
        super();
        this.state = {
            emailid: "",
            emailidState: "",
            phonenum: 0,
            phonenumState: 0,
            otp: "",
            otpState: "",
            time: {},
            seconds: 60,
            RetrievePassword: {
                "emailid": "",
                "phonenum": 0,
                "otp": "",
            }
        };
        this.timer = 0;
        this.countDown = this.countDown.bind(this);
        this.Sendotp = this.Sendotp.bind(this);
        this.SubmitOtp = this.SubmitOtp.bind(this);
        this.Sendresetlink = this.Sendresetlink.bind(this);
        this.passwordreset = this.passwordreset.bind(this);
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

    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
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

    SetValue = (type, event) => {
        event.preventDefault();

        let rpass = this.state.RetrievePassword;
        let name = event.target.name;
        let value = event.target.value;
        rpass[name] = value;

        this.setState({ rpass });
        this.change(event, name, type);
    };

    change = (event, stateName, type) => {
        console.log("come baby", type);
        switch (type) {

            case "string":
                if (validationPage.verifyName(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                }
                else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "number":
                if (validationPage.verifyNumber(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                }
                else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "email":
                if (validationPage.verifyEmail(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                }
                else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            default:
                break;
        }
    }

    passwordreset() {
        if (this.state.RetrievePassword.phonenum == null) {
            this.Sendotp();
        }
        else {
            this.Sendresetlink();
        }
    }

    Sendresetlink(event) {
        console.log("Phone Number= " + this.state.RetrievePassword.emailid);
        if (this.timer == 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
        this.setState({
            isButtonDisabled: true
        });
        setTimeout(() => this.setState({ isButtonDisabled: false }), 60000);
        $.ajax({
            url: `${UserConfig.UserConfigUrl}/api/ResetPassword/emailPasswordReset?emailid=` + this.state.RetrievePassword.emailid,
            method: 'GET',
            success: function (response) {
                console.log('data save result ', response);
                swal("Perfect!", "Password Reset Link Sent!", "success");
            },
            fail: function (response) {
                console.log('request fail ', response);
                swal("Oh Oww!", "Enter Valid Email-Id!", "error");
            }
        });
        setTimeout(function () {
            $('#alertSection').fadeOut('fast');
        }, 5000);
    }

    Sendotp(event) {
        console.log("Phone Number= " + this.state.RetrievePassword.phonenum);
        if (this.timer == 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
        this.setState({
            isButtonDisabled: true
        });
        setTimeout(() => this.setState({ isButtonDisabled: false }), 60000);
        $.ajax({
            url: `${UserConfig.UserConfigUrl}/api/ResetPassword/PasswordReset?phonenum=` + this.state.RetrievePassword.phonenum,
            method: 'GET',
            success: function (response) {
                console.log('data save result ', response);
                swal("Perfect!", "OTP Sent!", "success");
            },
            fail: function (response) {
                console.log('request fail ', response);
                swal("Oh Oww!", "Enter Valid Phone Number!", "error");
            });
        setTimeout(function () {
            $('#alertSection').fadeOut('fast');
        }, 5000);
    }

    SubmitOtp() {
        console.log("OTP= " + this.state.RetrievePassword.otp);
        $.ajax({
            url: `${UserConfig.UserConfigUrl}/api/ResetPassword/VerifyPassword?otp=` + this.state.RetrievePassword.otp,
            method: 'GET',
            success: function (response) {
                console.log('data save result ', response);
                swal("Perfect!", "OTP verified!", "success");
            },
            fail: function (response) {
                console.log('request fail ', response);
                swal("oh Oww!", "Invalid Valid OTP", "error");
            }
        });
        setTimeout(function () {
            $('#alertSection').fadeOut('fast');
        }, 5000);
    }
    render() {
        return (
            <Card>
                <CardHeader color="rose" icon>
                    <CardIcon color="rose">
                        <FilterNone />
                    </CardIcon>
                    {
                        <h4 >
                            <small> Retrieve Password </small>
                        </h4>
                    }
                </CardHeader>
                <CardBody>
                    <GridContainer justify="center" >
                        <GridItem>
                            <GridItem >
                                <CustomInput
                                    success={this.state.emailidState === "success"}
                                    error={this.state.emailidState === "error"}
                                    align="center"
                                    labelText="Email-ID"
                                    name="emailid"
                                    onChange={(e) => this.SetValue("email", e)}
                                    value={this.state.RetrievePassword.emailid}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem >
                                <CustomInput
                                    success={this.state.phonenumState === "success"}
                                    error={this.state.phonenumState === "error"}
                                    align="center"
                                    labelText="Phone Number"
                                    name="phonenum"
                                    onChange={(e) => this.SetValue("number", e)}
                                    type="number"
                                    value={this.state.RetrievePassword.phonenum}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem align="center" >
                                <div>
                                    <Button color="info" onClick={this.passwordreset} disabled={this.state.isButtonDisabled}>Send OTP</Button>
                                    <br /><br />Please wait to Resend OTP &nbsp;&nbsp;{this.state.time.s}
                                </div>
                                <br />
                            </GridItem>
                            <GridItem >
                                <CustomInput
                                    success={this.state.otpState === "success"}
                                    error={this.state.otpState === "error"}
                                    align="center"
                                    labelText="OTP"
                                    name="otp"
                                    onChange={(e) => this.SetValue("string", e)}
                                    value={this.state.RetrievePassword.otp}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem align="center">
                                <Button color="info" onClick={this.SubmitOtp}>Submit OTP</Button>
                            </GridItem>
                            <br />

                        </GridItem>
                    </GridContainer>
                </CardBody>
            </Card>
        );
    }
}

export default RecoverPassword;