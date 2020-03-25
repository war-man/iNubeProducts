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
    },
})(MuiButton);

const Styleinput = withStyles({
    root: {
        background: '#fff !important',
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px'
    },
    label: {
        color: 'white'
    },
})(TextField);

class BillingDetails extends React.Component {
    constructor(props) {
      
        super(props)
        this.state = {
            policyNumber: "",
            month:"",
            year: 0,
            totalUsage: 0,
            billing: 0,
            gst: 0,
            total: 0,
            carriedfw: 0,
        };
    }

    componentDidMount() {
        console.log("billingprops", this.props);
        fetch(`${EdelweissConfig.EdelweissConfigUrl}/api/Mica_EGI/BillingDetails?PolicyNo=` + this.props.policynum + '&Month=' + this.state.month + '&Year=' + this.state.year, {

            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('Token')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("billingdetailsdata: ", data);
                this.state.totalUsage = data.billingDTO.totalUsage;
                this.state.billing = data.billingDTO.billing;
                this.state.gst = data.billingDTO.gst;
                this.state.total = data.billingDTO.total;
                this.state.carriedfw = data.billingDTO.balanceCarryForward;
                //this.setState({ masterList: data });
            });
    }
    render() {
        const { classes, loggingIn } = this.props;
        return (
            <div className={classes.container}>
                <GridContainer justify="center">
                    <GridItem xs={24}>
                        <Card>
                            <CardBody>
                                <div>   
                                    <GridContainer justify="center">
                                        <h1>Billing Details</h1><br/>
                                        <GridContainer justify="center">
                                            <GridItem xs={6}>
                                                <table >
                                                    <tbody style={{ lineHeight: "1.18rem"}}>
                                                        <tr>
                                                            <td style={{ fontWeight: "400", "padding-right": "317px" }}>Total Usage</td> 
                                                            <td style={{ fontSize: "1rem", textAlign: "right" }}>₹<b></b>/-</td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ fontWeight: "400" }}>Billing </td>
                                                            <td style={{ fontSize: "1rem", textAlign: "right" }}>₹<b></b>/-</td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ fontWeight: "400" }}>GST: </td>
                                                            <td style={{ fontSize: "1rem", textAlign: "right" }}>₹<b></b>/-</td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ fontWeight: "400" }}>Total: </td>
                                                            <td style={{ fontSize: "1rem", textAlign: "right" }}>₹<b></b>/-</td>
                                                        </tr>
                                                        <tr>
                                                            Less Balance
                                                            </tr>
                                                        <tr>
                                                            <td style={{ fontWeight: "400" }}>Carried fw </td>
                                                            <td style={{ fontSize: "1rem", textAlign: "right" }}>₹<b></b>/-</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </GridItem>
                                        </GridContainer>
                                    </GridContainer>
                                </div>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer >
            </div >
        );
    }
}

BillingDetails.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(BillingDetails);