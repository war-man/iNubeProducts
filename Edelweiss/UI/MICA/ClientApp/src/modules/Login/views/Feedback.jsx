import React from "react";
import PropTypes, { any, string } from "prop-types";
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
//import Feedback from "react-bootstrap/Feedback";
//import Loginconfig from '../config';
//import { ok } from "assert";
////import { Divider } from "@material-ui/core";

function date() {

    var today = new Date();
    var date;
    var hrs = today.getHours();
    hrs = hrs < 10 ? '0' + hrs : hrs;
    var min = today.getMinutes();
    min = min < 10 ? '0' + min : min;
    var sec = today.getSeconds();
    sec = sec < 10 ? '0' + sec : sec;

    return date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + 'T' + hrs + ':' + min + ':' + sec;

}



class Feedback extends React.Component {
    constructor(props) {
        super(props)

        var str = (window.location.pathname);
        var res = str.substring(16);
        this.state = {
            GName: '',
            submitted: false,
            cardAnimaton: "cardHidden",
            Data: {
                CompanyName: "",
                CompanyAddress: "",
                CompanyEmail: "",
                CompanyNumber: "",
                CompanyUsage: "",
                CompanyFeedback: "",
                PolicyNo: res,
            },

        };
        console.log("This policy no :" + this.state.Data.PolicyNo + " is going to be stored into the Database");

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    changeHandler = (evt) => {

        const Data = this.state.Data;
        Data[evt.target.name] = evt.target.value;
        this.setState({ Data });
    };
    onFormSubmit = (evt) => {

        console.log('ButtonCall');
        console.log('CheckFirst', this.state.Data);
        this.state.Data.CreatedDate = date();
        fetch(`http://localhost:62948/FeedbackConfig/CreateFeedbacks`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(this.state.Data)
        }).then(function (data) {
            console.log(data);
            alert("Feedback Submitted");

            });
        this.setState({

            Data: {
                CompanyName: "",
                CompanyAddress: "",
                CompanyEmail: "",
                CompanyNumber: "",
                CompanyUsage: "",
                CompanyFeedback: "",
                CreatedDate: "",
                PolicyNo: "",
            },
            

        });
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
        console.log(window.location.pathname); //yields: "/js" (where snippets run)
        console.log(window.location.href);
        var str = (window.location.pathname);
        var res = str.substring(16,);
        console.log(res);
    }


    handleSubmit(e) {
        console.log("feedback hitting")
    }

    render() {
        const { classes, loggingIn } = this.props;
        const { submitted } = this.state;
        return (
            <div className={classes.container}>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={6}>

                        <form onSubmit={this.handleSubmit}>
                            <Card login className={classes[this.state.cardAnimaton]}>
                                <CardHeader
                                    className={`${classes.cardHeader} ${classes.textCenter}`}
                                    color="rose"
                                >
                                    <h4 className={classes.cardTitle}>Feedback</h4>
                                </CardHeader>
                                <CardBody >


                                    <CustomInput
                                        labelText="Company Name"
                                        id="CompanyName"
                                        name="CompanyName"
                                        value={this.state.Data.CompanyName}
                                        onChange={this.changeHandler}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />



                                    <CustomInput
                                        labelText="Company Address"
                                        id="CompanyAddress"
                                        name="CompanyAddress"
                                        value={this.state.Data.CompanyAddress}
                                        onChange={this.changeHandler}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />



                                    <CustomInput
                                        labelText="Company Number"
                                        id="CompanyNumber"

                                        name="CompanyNumber"
                                        value={this.state.Data.CompanyNumber}
                                        onChange={this.changeHandler}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: "number"
                                        }}
                                    />


                                    <CustomInput
                                        labelText="Email"
                                        id="CompanyEmail"
                                        name="CompanyEmail"
                                        value={this.state.Data.CompanyEmail}
                                        onChange={this.changeHandler}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />



                                    <CustomInput
                                        labelText="Number of the Days Used"
                                        id="CompanyUsage"
                                        name="CompanyUsage"
                                        value={this.state.Data.CompanyUsage}
                                        onChange={this.changeHandler}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: "number"
                                        }}
                                    />



                                    <CustomInput
                                        labelText="Feedback"
                                        id="CompanyFeedback"
                                        name="CompanyFeedback"
                                        value={this.state.Data.CompanyFeedback}
                                        onChange={this.changeHandler}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                    <GridItem className="center-bnt-partner" xs={12} sm={12} md={12}>

                                        <Button onClick={() => this.onFormSubmit()}
                                            color="info"
                                            size="sm"
                                        >
                                            SAVE
                </Button>
                                    </GridItem>





                                </CardBody>
                                <CardFooter className={classes.justifyContentCenter}>

                                </CardFooter>
                            </Card>

                        </form>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

Feedback.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(Feedback); 