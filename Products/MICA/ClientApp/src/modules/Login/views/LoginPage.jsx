import React from "react";
import PropTypes from "prop-types";
//import { connect } from 'react-redux';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
//import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
// import LockOutline from "@material-ui/icons/LockOutline";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import swal from 'sweetalert';
import ThemeSwitch from 'assets/jss/ThemeSwitch.jsx';
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import $ from 'jquery'
import { Redirect } from 'react-router-dom'
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
//import GoogleLogin from '../GoogleLogin/'
import LoginConfig from 'modules/Login/LoginConfig.js';
//import Loginconfig from '../config';
//import { ok } from "assert";
////import { Divider } from "@material-ui/core";

class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        // reset login status
        //  this.props.dispatch(userActions.logout());
        // we use this to make the card to appear after the page has been rendered
        this.state = {
            UserName: '',
            GName: '',
            submitted: false,
            exist: false,
            inactive: false,
            cardAnimaton: "cardHidden",
            redirect: false,
            UName: '',
            servertype: "",
            GoogleName: '',
            Email: '',
            userId: '',
            Alert: '',
            UserType: '',
            count: '',
            redirectto: '',
            value: "",
            environment: [],
        };
        this.changeEvent = this.changeEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlename = this.handlename.bind(this);
    }

    handlename() {
        this.setState({ redirectto: true });
    }

    componentWillMount() {
        ThemeSwitch.resetTheme();
    }

    componentDidMount() {

        this.timeOutFunction = setTimeout(
            function () {
                this.setState({ cardAnimaton: "" });
            }.bind(this),
            700
        );
        (function () {
            var e = document.createElement("script");
            e.type = "text/javascript";
            e.async = true;
            e.src = "https://apis.google.com/js/client:platform.js?onload=gPOnLoad";
            var t = document.getElementsByTagName("script")[0];
            t.parentNode.insertBefore(e, t)
        })();
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value,
            UserName: target.value
        });
        if (this.state.UserName != "") {
            this.setState({ submitted: false, exist: false });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ exist: false, inactive: false });
        localStorage.setItem('Username', this.state.UserName);
        console.log("producttype: ", LoginConfig.ProductType);

        //console.log('login Clicked' + this.state.UserName);
        if (this.state.UserName != "") {
            fetch(`${LoginConfig.LoginUrl}/api/Login/GetUserType?username=` + this.state.UserName + ``, {
                //fetch(`https://localhost:44351/api/Login/GetUserType?username=` + this.state.UserName + ``, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log("response data", data);
                    if (data.status == 1) {
                        this.setState({ UserType: data.userLogin.loginProvider, count: data.userLogin.isFirstTimeLogin, userId: data.userLogin.id, environment: data.userLogin.environmentDTOs, redirect: "Pass" });
                        localStorage.setItem('ProductType', data.userLogin.product);
                        localStorage.setItem('CompanyLogo', data.userLogin.companyLogo);
                        //console.log("UserId: ", this.state.userId);
                        //console.log('response:', data.userLogin.loginProvider);
                        //console.log("usertype", this.state.UserType);
                        //console.log("first Time login", this.state.count);
                        console.log("environment: ", this.state.environment);
                    } else if (data.status == 4) {
                        this.setState({ exist: true });
                    } else if (data.status == 7) {
                        this.setState({ inactive: true });
                    }
                    else {

                    }
                });
        } else {
            this.setState({ submitted: true });
        }
        //console.log('response:', this.state.UserType);
        if (this.state.UserType == "Google") {
            //console.log('Google login Clicked');
            this.googleLogin();
            //this.alert(this.state.Alert);
        }
        else {
            if (this.state.UserType == "Form") {
                //console.log('login Clicked');
                this.setState({
                    redirect: "Pass",
                })
            }
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeOutFunction);
        this.timeOutFunction = null;
    }
    changeEvent() {
        //console.log('text box change event fired');
    }

    setRedirect = () => {
        this.setState({
            redirect: true,
        })
    }

    renderRedirectusername = () => {
        if (this.state.redirectto == true) {
            return <Redirect to={{
                pathname: '/pages/RecoverUsername',
                state: { servertype: this.state.servertype }
            }}
            />
        }
    }

    renderRedirect = () => {
        if (this.state.count == 0) {
            if ("Pass" == this.state.redirect) {
                return <Redirect to={{
                    pathname: '/pages/Firsttimelogin',
                    state: { userId: this.state.userId, servertype: this.state.servertype }

                }}
                />
            }
        }
        else {
            if (true == this.state.redirect) {
                return <Redirect to={{
                    pathname: '/dashboard/home',
                    state: { GName: this.state.GoogleName }
                }}
                />
            }
            else if ("Pass" == this.state.redirect) {
                return <Redirect to={{
                    pathname: '/pages/password-page',
                    state: {
                        UName: this.state.UserName,
                        userId: this.state.userId,
                        servertype: this.state.servertype,
                        environment: this.state.environment,
                    }

                }}
                />
            }
        }
    }

    googleSignInCallback = (e) => {
        //console.log(e)
        if (e["status"]["signed_in"]) {
            window.gapi.client.load("plus", "v1", function () {
                if (e["access_token"]) {
                    this.getUserGoogleProfile(e["access_token"])
                } else if (e["error"]) {
                    //console.log('Import error', 'Error occured while importing data')
                }
            }.bind(this));
        } else {
            //console.log('Oops... Error occured while importing data')
        }
    }

    //Triggering login for google
    googleLogin = () => {
        //let response = null;
        window.gapi.auth.signIn({
            callback: function (authResponse) {
                this.googleSignInCallback(authResponse)
            }.bind(this),
            clientid: LoginConfig.google, //Google client Id
            cookiepolicy: "single_host_origin",
            requestvisibleactions: "http://schema.org/AddAction",
            scope: "https://www.googleapis.com/auth/plus.login email"
        });
    }

    handleSimple = event => {
        this.setState({ [event.target.name]: event.target.value });
        this.state.value = event.target.value;
        //this.setState({
        //    value: event.target.value
        //})
        this.state.servertype = this.state.value;
        this.setState({});
        console.log("dropdown", this.state.servertype);
        console.log("dropdown", this.state.value);
    };

    getUserGoogleProfile = accesstoken => {
        var e = window.gapi.client.plus.people.get({
            userId: "me"
        });
        e.execute(function (e) {
            if (e.error) {
                //console.log(e.message);
                //console.log('Import error - Error occured while importing data')
                return
            } else if (e.id) {
                var GEmail = e.emails[0].value;
                this.setState({ GoogleName: GEmail });
                //this.state.GoogleName = GEmail;
                var dataObject = {
                    Email: this.state.GoogleName
                }
                fetch(`${LoginConfig.LoginUrl}/api/Login/GoogleValidate`, {
                    //fetch('https://localhost:44367/api/Login/GoogleValidate', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(dataObject),
                }).then((data) => {
                    //console.log(data);
                    if (data.ok == true) {
                        this.setState({
                            redirect: true,
                        })
                    }
                    else {
                        this.setState({
                            redirect: false,
                        })
                    }
                });

            }
        }.bind(this));
    }

    render() {
        const { classes, loggingIn } = this.props;
        const { UserName, submitted } = this.state;
        return (
            <div className={classes.container}>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={6} md={4}>

                        <form onSubmit={this.handleSubmit}>
                            <Card login className={classes[this.state.cardAnimaton]}>
                                <CardHeader
                                    className={`${classes.cardHeader} ${classes.textCenter}`}
                                    color="rose"
                                >
                                    <h4 className={classes.cardTitle}>Log in</h4>
                                </CardHeader>
                                <CardBody>
                                    <CustomInput
                                        labelText="User Name"
                                        id="username"
                                        value={this.state.UserName}
                                        name='UserName'
                                        required={true}
                                        onChange={this.handleChange}
                                        formControlProps={{
                                            fullWidth: true
                                        }}

                                        inputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <Face className={classes.inputAdornmentIcon} />
                                                </InputAdornment>
                                            )
                                            //placeholder: "UserName "
                                        }}
                                    />

                                    <GridContainer>
                                        {this.renderRedirectusername()}
                                        <Button id="text-captalize" color="rose" simple size="sm" onClick={this.handlename}>
                                            Forgot User Name?
                                        </Button>
                                        {/*<a href="https://invoiceawsbucket.s3.amazonaws.com/7fa275db-090b-4a32-8624-ae871cfbd8fbQuestionSet100100.pdf"> Link</a>*/}
                                    </GridContainer>
                                    {this.state.exist ?
                                        <div className="help-block">Username does not exist</div>
                                        : null}
                                    {this.state.inactive ?
                                        <div className="help-block">Username is Deactivated please contact Admin.</div>
                                        : null}
                                    {submitted && !UserName &&
                                        <div className="help-block">Username is required</div>
                                    }
                                </CardBody>
                                <CardFooter className={classes.justifyContentCenter}>
                                    <div>
                                        {this.renderRedirect()}
                                        <Button color="info" id="btnUserlogin" simple size="lg" block type="submit" onClick={this.handleSubmit}>
                                            Let's Go
                                        </Button>
                                        {loggingIn &&
                                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                        }
                                    </div>
                                </CardFooter>
                            </Card>

                        </form>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

LoginPage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(LoginPage); 