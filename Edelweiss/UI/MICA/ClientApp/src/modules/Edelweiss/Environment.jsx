﻿import React from "react";
import PropTypes from "prop-types";
//import { connect } from 'react-redux';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import config from './../../config';
// @material-ui/icons
import Face from "@material-ui/icons/Face";
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
import CardFooter from "components/Card/CardFooter.jsx";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Check from "@material-ui/icons/Check";
//import Clear from "@material-ui/icons/Clear";
//import Radio from "@material-ui/core/Radio";
////import MailOutline from "@material-ui/icons/MailOutline";
import LoginConfig from 'modules/Login/LoginConfig.js';
import Dropdown from "components/Dropdown/Dropdown.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";

import swal from 'sweetalert';

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import $ from 'jquery'
import { Redirect } from 'react-router-dom'

class Environment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            environmentvalue: "",
            redirect: false,
            environment: [
                { mID: 1, mValue: "dev", mType: null },
                { mID: 2, mValue: "UAT", mType: null }
            ],
        }
    }

    renderRedirect = () => {
        if (this.state.redirect == true) {
            return <Redirect to={{
                pathname: '/pages/homepage',
            }} />
        } 
    }
    getEnviData = e => {
        debugger;
        this.setState({ [e.target.name]: e.target.value });
        console.log("login: ", e.target.value);
        console.log("environmentvalue: ", this.state.environmentvalue);
        let env = this.state.environment.filter(s => s.mID == e.target.value)[0].mValue;
        config.env = env;
        localStorage.setItem('config', config);
        this.setState({});
        console.log("config", config);
    }
    handlesubmit = () => {
            this.setState({ redirect: true });
    }
    componentDidMount() {
       
    }

      render() {
        const { classes, loggingIn } = this.props;
        const { UserName, Password, submitted, attemptFlag, isLoading, redirect } = this.state;
        return (
            <div className={classes.container}>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={6} md={4}>
                        <form onSubmit={this.handleSubmit}>
                            <Card login className={classes[this.state.cardAnimaton]}>
                                <CardHeader id="padding-bottom"
                                    className={`${classes.cardHeader} ${classes.textCenter}`}
                                    color="rose">
                                    <h4 className={classes.cardTitle}>Environment Type</h4>
                                   
                                </CardHeader>
                                <CardBody>
                                    <GridContainer justify="center">
                                        <CustomInput
                                            required={true}
                                            labelText="User Name"
                                            id="UserName"
                                            name="UserName"
                                            //value={this.state.UserName}
                                            //onChange={this.handleChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}

                                            inputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Face className={classes.inputAdornmentIcon} />
                                                    </InputAdornment>
                                                )
                                                //placeholder: "UserName"
                                            }}
                                        />
                                         <Dropdown
                                            required={true}
                                            labelText="Environment Type"
                                            lstObject={this.state.environment}
                                            value={this.state.environmentvalue}
                                            name="environmentvalue"
                                            onChange={(e) => this.getEnviData(e)}
                                            formControlProps={{ fullWidth: true }}
                                        />
                                    </GridContainer>
                                </CardBody>
                                <CardFooter className={classes.justifyContentCenter}>
                                    <GridContainer justify="center">
                                        {this.renderRedirect()}
                                        <Button
                                            color="info" simple id="btnLogin" size="lg" block type="submit" onClick={this.handlesubmit}>
                                            PROCEED
                                    </Button>
                                    </GridContainer>
                                </CardFooter>

                            </Card>
                        </form>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

Environment.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(Environment);