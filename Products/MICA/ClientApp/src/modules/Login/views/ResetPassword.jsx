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
import validationPage from "./ValidationPage";
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import $ from 'jquery'
import { Redirect } from 'react-router-dom';

//import { userActions } from "../_actions";

class ResetPassword extends React.Component {
    constructor() {
        super();
        this.state = {
            redirect: false,
            newPassword: "",
            newPasswordState: false,
            confirmPassword: "",
            confirmPasswordState: false,
            Password: {
                id: "",
                isChangePassword: false,
                newPassword: "",
                confirmPassword: "",
                envId: "",
                productType: LoginConfig.ProductType
            },
            environmentvalue: "",
            environment: [],
            UserName: "",
            userid: "",
            servertype: "",
            errormessage: false,
            blanknewpassword: false,
            successmessage: false,
            blankconfirmpassword: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
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
            this.setState({ successmessage: true, errormessage: false })
            //this.state.successmessage = true;
            //this.state.errormessage = false;
            //this.setState({ newPasswordState: "success" });
            this.setState({ newPasswordState: false });
        }
        else {
            this.setState({ errormessage: true, successmessage: false });
            //this.state.errormessage = true;
            //this.state.successmessage = false;
            //this.setState({ newPasswordState: "error" });
            this.setState({ newPasswordState: true });
        }
        if (this.state.Password.newPassword == "" && this.state.Password.confirmPassword === "") {
            this.setState({ successmessage: false });
            //this.state.successmessage = false;
        }
    };

    change = (event, stateName, type) => {
        switch (type) {
            case "newpass":
                if (this.state.Password.newPassword != "") {
                    if (validationPage.verifypass(event.target.value)) {
                        //this.setState({ [stateName + "State"]: "success" });
                        this.setState({ [stateName + "State"]: false });
                    }
                    else {
                        //this.setState({ [stateName + "State"]: "error" });
                        this.setState({ [stateName + "State"]: true });
                    }
                }
                else {
                    //this.setState({ [stateName + "State"]: "error" });
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            case "pass":
                if (this.state.Password.newPassword == this.state.Password.confirmPassword) {
                    this.setState({ successmessage: true, errormessage: false });
                    //this.state.successmessage = true;
                    //this.state.errormessage = false;
                    //this.setState({ [stateName + "State"]: "success" });
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ errormessage: true, successmessage: false });
                    //this.state.errormessage = true;
                    //this.state.successmessage = false;
                    //this.setState({ [stateName + "State"]: "error" });
                    this.setState({ [stateName + "State"]: true });
                }
                if (this.state.Password.confirmPassword == "") {
                    this.setState({ [stateName + "State"]: true });
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
                    UName: this.state.UserName,
                    servertype: this.state.servertype,
                    environmentvalue: this.props.location.state.environmentvalue,
                    environment: this.props.location.state.environment,
                }
            }} />
        }
    }

    componentDidMount() {

        if (this.props.location.state != null) {
            this.setState({
                userid: this.props.location.state.userid,
                UserName: this.props.location.state.UserName,
                servertype: this.props.location.state.servertype,
                environmentvalue: this.props.location.state.environmentvalue,
                environment: this.props.location.state.environment,
            });
        }
        //console.log("servertype: ", this.state.servertype);
        //console.log("servertype1: ", this.props.location.state.servertype);
        //console.log("id: ", this.state.userid);
    }

    handleSubmit(e) {
        if (this.state.Password.newPassword == "" && this.state.Password.confirmPassword == "") {
            this.setState({ blankconfirmpassword: true });
            this.setState({ blanknewpassword: true });
        }
        else if (this.state.Password.newPassword == this.state.Password.confirmPassword) {
            let pass = this.state.Password;
            pass.id = this.props.location.state.userid;
            pass.envId = this.props.location.state.environmentvalue;
            pass.isChangePassword = true;
            this.setState({ pass });
            console.log("pass", pass);
            fetch(`${LoginConfig.UserConfigUrl}/api/UserProfile/ChangePassword`, {
                method: 'Post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pass)
            })
                .then(response => {
                    if (response.status == 500) {
                        swal({
                            text: "Please enter valid password",
                            icon: "error"
                        });
                    }
                    console.log(response);
                    return response.json()
                }).then(data => {
                    this.setState({ redirect: true });
                });
        } else {

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
                                <h4 className={classes.cardTitle}>Change Your Password</h4>
                            </CardHeader>
                            <CardBody>
                                <GridContainer>
                                    <GridItem>
                                        <p><b>*Note: </b>The Password should contain more than 8 characters with at least one lowercase alphabet, one uppercase alphabet , one numeric digit and a special character.</p>
                                    </GridItem>
                                </GridContainer>
                                <CustomInput
                                    //success={this.state.newPasswordState === "success"}
                                    //error={this.state.newPasswordState === "error"}
                                    error={this.state.newPasswordState}
                                    labelText="New Password"
                                    name="newPassword"
                                    value={this.state.Password.newPassword}
                                    onChange={(e) => this.SetValue("newpass", e)}
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
                                {this.state.blanknewpassword ? <p className="error">*Password should not be blank</p> : null}
                                <CustomInput
                                    //success={this.state.confirmPasswordState === "success"}
                                    //error={this.state.confirmPasswordState === "error"}
                                    error={this.state.confirmPasswordState}
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
                                        {this.renderRedirect()}
                                        <Button
                                            color="info" simple size="lg" onClick={this.handleSubmit} >
                                            Submit
                                    </Button>
                                    </GridContainer>
                                </div>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default withStyles(loginPageStyle)(ResetPassword);