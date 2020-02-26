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
import EdelweissConfig from "./EdelweissConfig.js";

const Styledivider = withStyles({
    root: {
        color: '#000',
        right: '3rem',
        position: 'relative'
        //width: '38rem',

        //height: '0.1rem',
    }
})(Divider);

const StyleButton = withStyles({
    root: {
        fontSize: '12px',
        //color:'#ddd'
    },
    //label: {
    //    textTransform: 'capitalize',
    //    color: 'white'
    //},
})(MuiButton);

const Styleinput = withStyles({
    root: {
        //background: '#e7ab37ad !important',
        background: '#fff !important',
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px'
    },
    //input: {
    //    color:'white'
    //},
    label: {
        //    textTransform: 'capitalize',
        color: 'white'
    },
})(TextField);

class Scheduler extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //schedule: {
            //    vehicleRegistrationNo: "",
            //    policyNo: "",
            //    vehicleType: "",
            //    mon: false,
            //    tue: false,
            //    wed: false,
            //    thu: false,
            //    fri: false,
            //    sat: false,
            //    sun: false,
            //    switchStatus: false,
            //    switchEnabled: false,
            //},
            //serverresponse: {
            //    scheduleId: 0,
            //    policyNo: "",
            //    vehicleRegistrationNo: "",
            //    vehicleType: "",
            //    mon: true,
            //    tue: true,
            //    wed: true,
            //    thu: true,
            //    fri: true,
            //    sat: true,
            //    sun: true,
            //    createdDate: "2020-02-22T07:30:26.191Z",
            //    modifiedDate: "2020-02-22T07:30:26.191Z",
            //    modifyCount: 0,
            //    isActive: true
            //}
        };
    }



    render() {
        const { classes, loggingIn } = this.props;
        return (
            <div className={classes.container}>
                <GridContainer xs={6} className="schedularalign">
                    <GridContainer justify="center">
                        <Styledivider style={{ right: '.4rem', width: '38rem', height: '0.2rem', }} />
                    </GridContainer>
                    <CustomCheckbox
                        name="mon"
                        labelText="Monday"
                        value={this.props.schedule.mon}
                        onChange={(e) => this.props.handleCheckbox(e)}
                        //disabled={(item.disable == true) ? true : null}
                        checked={this.props.schedule.mon}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                    <CustomCheckbox
                        name="tue"
                        labelText="Tuesday"
                        value={this.props.schedule.tue}
                        onChange={(e) => this.props.handleCheckbox(e)}
                        //disabled={(item.disable == true) ? true : null}
                        checked={this.props.schedule.tue}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                    <CustomCheckbox
                        name="wed"
                        labelText="Wednesday"
                        value={this.props.schedule.wed}
                        onChange={(e) => this.props.handleCheckbox(e)}
                        //disabled={(item.disable == true) ? true : null}
                        checked={this.props.schedule.wed}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                    <CustomCheckbox
                        name="thu"
                        labelText="Thursday"
                        value={this.props.schedule.thu}
                        onChange={(e) => this.props.handleCheckbox(e)}
                        //disabled={(item.disable == true) ? true : null}
                        checked={this.props.schedule.thu}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                    <CustomCheckbox
                        name="fri"
                        labelText="Friday"
                        value={this.props.schedule.fri}
                        onChange={(e) => this.props.handleCheckbox(e)}
                        //disabled={(item.disable == true) ? true : null}
                        checked={this.props.schedule.fri}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                    <CustomCheckbox
                        name="sat"
                        labelText="Saturday"
                        value={this.props.schedule.sat}
                        onChange={(e) => this.props.handleCheckbox(e)}
                        //disabled={(item.disable == true) ? true : null}
                        checked={this.props.schedule.sat}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                    <CustomCheckbox
                        name="sun"
                        labelText="Sunday"
                        value={this.props.schedule.sun}
                        onChange={(e) => this.props.handleCheckbox(e)}
                        //disabled={(item.disable == true) ? true : null}
                        checked={this.props.schedule.sun}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                    <GridContainer justify="center" className="schedularalign">
                        <Styledivider style={{ left: '2rem', width: '38rem', height: '0.2rem', }} />
                    </GridContainer>
                    {/*  <GridContainer justify="center">
                            <CustomCheckbox
                                name="tppolicy"
                                labelText="Repeat every week"
                                //value={this.state.Checkbox.tppolicy}
                                //onChange={(e) => this.handleCheckbox(e)}
                                //disabled={(item.disable == true) ? true : null}
                                //checked={item.mIsRequired}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridContainer>*/}
                    <GridContainer justify="center" className="schedularalign">
                        <Button round color="primary" style={{ left: '3rem' }} onClick={this.props.handleSubmit} >sumbit</Button>
                    </GridContainer>
                </GridContainer>
            </div >
        );
    }
}

Scheduler.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(Scheduler);