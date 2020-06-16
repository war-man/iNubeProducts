import React from "react";
//import PropTypes from "prop-types";
//import { connect } from 'react-redux';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
//import InputAdornment from "@material-ui/core/InputAdornment";
//import Icon from "@material-ui/core/Icon";

// @material-ui/icons
////import Face from "@material-ui/icons/Face";
////import Email from "@material-ui/icons/Email";

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
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import $ from 'jquery'
import { Redirect } from 'react-router-dom';

class RecoverUsername extends React.Component {
    constructor() {
        super();
        this.state = {
            redirect: false,
            email: "",
            UserName: "",
            userid: "",
            errordisplay: false,
            errormessage: false,
            redirectto: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.SetValue = this.SetValue.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }

    SetValue = (event) => {

        this.setState({
            [event.target.name]: event.target.value,
            email: event.target.value
        });
        this.setState({ errordisplay: false });
        if (this.state.email != "") {
            this.setState({ errormessage: false });
            //this.state.errormessage= false;
        }

    };

    componentDidMount() {
    }

    renderRedirect = () => {
        if (this.state.redirect == true) {
            return <Redirect to={{
                pathname: '/pages/login-page',
            }} />
        }
    }

    renderRedirectto = () => {
        if (this.state.redirectto == true) {
            return <Redirect to={{
                pathname: '/pages/login-page',
            }} />
        }
    }

    handleBack() {
        this.setState({ redirectto: true });
    }

    handleSubmit = () => {
        if (this.state.email == "") {
            this.setState({ errormessage: true });
            console.log("blank email", this.state.errormessage)
        } else if (this.state.email != "") {
            fetch(`${LoginConfig.UserConfigUrl}/api/Login/GetUserName?email=` + this.state.email + `&productType=` + LoginConfig.ProductType, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then(response => response.json())
                .then(data => {
                    if (data) {
                        console.log("response: ", data)
                        if (data.result == null) {
                            this.setState({ errordisplay: true });
                        } else {
                            swal({
                                text: "Username sent to your registered Email!",
                                icon: "success"
                            });
                            this.setState({ redirect: true });
                        }
                    }
                });
        } else { }
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
                                <h4 className={classes.cardTitle}>Recover User Name</h4>
                            </CardHeader>
                            <CardBody>
                                <CustomInput
                                    labelText="Enter your registered Email ID"
                                    name="Email"
                                    value={this.state.email}
                                    onChange={this.SetValue}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                                {this.state.errormessage ? <p className="error">*Email ID should not be blank</p> : null}
                                {this.state.errordisplay ? <p>There is no such User with Email ID: {this.state.email} </p> : null}
                                <div>
                                    <GridContainer justify="center">
                                        <div>
                                            {this.renderRedirectto()}
                                            <Button color="rose" simple size="lg" onClick={this.handleBack} > Back </Button>
                                        </div>
                                        <div>
                                            {this.renderRedirect()}
                                            <Button color="info" simple size="lg" onClick={() => this.handleSubmit()} > Submit </Button>
                                        </div>
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

export default withStyles(loginPageStyle)(RecoverUsername);