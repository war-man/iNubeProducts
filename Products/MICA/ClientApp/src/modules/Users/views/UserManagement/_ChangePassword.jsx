import React from "react";
// @material-ui/core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import swal from 'sweetalert';
import $ from 'jquery';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import validationPage from "./ValidationPage";
import UserConfig from 'modules/Users/UserConfig.js';
import password from "assets/img/padlock.png";
import Icon from "@material-ui/core/Icon";
import { Animated } from "react-animated-css";
import PageContentLoader from "components/Loaders/PageContentLoader.jsx";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";

class ChangePassword extends React.Component {
    constructor() {
        super();
        this.state = {
            loader: false,
            oldpass: "",
            newPassword: "",
            newPasswordState: false,
            confirmPassword: "",
            confirmPasswordState: false,
            Password: {
                "id": "",
                "isChangePassword": false,
                "oldPassword": "",
                "newPassword": "",
                "confirmPassword": ""
            },
            initialPassword: {
                "id": "",
                "isChangePassword": false,
                "oldPassword": "",
                "newPassword": "",
                "confirmPassword": ""
            },
            errormessage: false,
            blanknewpassword: false,
            successmessage: false,
            blankconfirmpassword: false,
            sameoldpassword: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    SetValue = (type, event) => {
        let pass = this.state.Password;
        let name = event.target.name;
        let value = event.target.value;
        pass[name] = value;

        this.setState({ pass });

        this.change(event, name, type);
        if (this.state.Password.newPassword != "") {
            this.setState({ blanknewpassword: false, sameoldpassword: false });
        }
        if (this.state.Password.confirmPassword != "") {
            this.setState({ blankconfirmpassword: false });
        }
    };

    change = (event, stateName, type) => {
        switch (type) {
            case "password":
                if (validationPage.verifypass(event.target.value)) {
                    //this.setState({ [stateName + "State"]: "success" });
                    this.setState({ [stateName + "State"]: false });
                }
                else {
                    //this.setState({ [stateName + "State"]: "error" });
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            case "newpass":
                if (validationPage.verifypass(event.target.value)) {
                    //this.setState({ [stateName + "State"]: "success" });
                    this.setState({ [stateName + "State"]: false });
                }
                else {
                    //this.setState({ [stateName + "State"]: "error" });
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            case "pass":
                if (this.state.Password.newPassword == this.state.Password.confirmPassword) {
                    this.setState({ errormessage: false, successmessage: true });
                    //this.setState({ [stateName + "State"]: "success" });
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ errormessage: true, successmessage: false });
                    //this.setState({ [stateName + "State"]: "error" });
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            default:
                break;
        }
    }

    componentDidMount() {
        setTimeout(
            function () {
                this.setState({ loader: true });
            }.bind(this), 2000
        );
    }

    handleSubmit(e) {
        if (this.state.newPasswordState == false && this.state.confirmPasswordState == false) {
            if (this.state.Password.newPassword == "" || this.state.Password.confirmPassword == "") {
                this.setState({ blanknewpassword: true, blankconfirmpassword: true });
            }
            else if (this.state.Password.oldPassword == this.state.Password.confirmPassword) {
                this.setState({ sameoldpassword: true });

            } else {
                var userId = localStorage.getItem('userId');
                let pass = this.state.Password;
                pass.id = userId;
                this.setState({ pass });
                fetch(`${UserConfig.UserConfigUrl}/api/UserProfile/ChangePassword`, {
                    method: 'Post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                    },
                    body: JSON.stringify(pass)
                }).then(response => {
                    if (response.status == 500) {
                        swal({
                            text: "Please enter valid password",
                            icon: "error"
                        });
                    }
                    return response.json()
                })
                    .then(data => {
                        if (data.status == 2) {
                            swal({
                                text: data.responseMessage,
                                icon: "success"
                            });
                            this.setState({ Password: this.state.initialPassword, successmessage: false, newPasswordState: "", confirmPasswordState: "" });
                        }
                        else if (data.status == 401) {
                            swal({
                                text: "Invalid old password",
                                icon: "error"
                            });
                        }
                        else if (data.status == 9) {
                            swal({
                                text: "Password typed is not matching",
                                icon: "error"
                            })
                        }
                        else { }
                    })
            }
        } else {
            swal({
                text: "Please enter valid Password format" + "\n" + "The Password should contain 8-16 characters with at least one alphabets, one numeric digit and a special character.",
                icon: "error"
            })
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>{this.state.loader ?
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12} >
                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                            <Card>
                                <CardHeader color="rose" icon>
                                    <CardIcon color="rose">
                                        <Icon><img id="icon" src={password} /></Icon>
                                    </CardIcon>
                                    {
                                        <h4 >
                                            <small><TranslationContainer translationKey="ChangePassword" /></small>
                                        </h4>
                                    }
                                </CardHeader>
                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                    <CardBody>

                                        <GridContainer>
                                            <GridItem xs={12} sm={4}>
                                                <CustomInput
                                                    labelText="OldPassword"
                                                    name="oldPassword"
                                                    value={this.state.Password.oldPassword}
                                                    onChange={(e) => this.SetValue("password", e)}
                                                    type="password"
                                                    required={true}
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        type: "Password",
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={4}>
                                                <CustomInput
                                                    //success={this.state.newPasswordState == "success"}
                                                    //error={this.state.newPasswordState == "error"}
                                                    error={this.state.newPasswordState}
                                                    labelText="NewPassword"
                                                    name="newPassword"
                                                    value={this.state.Password.newPassword}
                                                    onChange={(e) => this.SetValue("newpass", e)}
                                                    type="password"
                                                    required={true}
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        type: "Password",
                                                    }}
                                                />
                                                {this.state.blanknewpassword ? <p className="error">*< TranslationContainer translationKey="PasswordBlank1" /></p> : null}
                                                {this.state.sameoldpassword ? <p className="error">*< TranslationContainer translationKey="SameOldPassword" /></p> : null}
                                            </GridItem>
                                            <GridItem xs={12} sm={4}>
                                                <CustomInput
                                                    //success={this.state.confirmPasswordState == "success"}
                                                    //error={this.state.confirmPasswordState == "error"}
                                                    error={this.state.confirmPasswordState}
                                                    labelText="ConfirmPassword"
                                                    name="confirmPassword"
                                                    value={this.state.Password.confirmPassword}
                                                    onChange={(e) => this.SetValue("pass", e)}
                                                    type="password"
                                                    required={true}
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        type: "Password",
                                                    }}
                                                />
                                                {this.state.blankconfirmpassword ? <p className="error">*< TranslationContainer translationKey="PasswordBlank1" /></p> : null}
                                                {this.state.successmessage ? <p className="success">< TranslationContainer translationKey="PasswordMatching" /></p> : null}
                                                {this.state.errormessage ? <p className="error">*< TranslationContainer translationKey="PasswordNotMatching2" /></p> : null}
                                                <GridItem>
                                                </GridItem>
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer lg={12} justify="center">
                                            <GridItem xs={9} sm={3} md={3} lg={1} >
                                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                    <Button round color="success" onClick={this.handleSubmit} ><TranslationContainer translationKey="Save" /> </Button>
                                                </Animated>
                                            </GridItem>
                                        </GridContainer>
                                    </CardBody>
                                </Animated>
                            </Card>
                        </Animated>
                    </GridItem>
                </GridContainer>
                : <PageContentLoader />}
            </div>
        );
    }
}
export default ChangePassword;