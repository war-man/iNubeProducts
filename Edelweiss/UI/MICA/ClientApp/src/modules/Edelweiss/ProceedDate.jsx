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

class ProceedDate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Retention: {
                retentionGroupId: 0,
                retentionGroupName: "",
                year: "",
                businessTypeId: "",
                businessType: "",
                retentionLogicId: "",
                retentionType: "",
                percentage: "",
                limit: "",
                effectiveFrom: "",
                effectiveTo: "",
                createdDate: null,
                createdBy: null,
                modifiedDate: null,
                modifiedBy: null,
                isActive: null,

                tblRimappingDetail: [],
            },
            redirect: false,
            redirectback: false,
        };
    }

    handleinput = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleChange = (event) => {
        console.log(event);
    }
    handleToggle(value) {
        const { checked } = this.state;
        //const currentIndex = checked.indexOf(value);
        //const newChecked = [...checked];

        //if (currentIndex === -1) {
        //    newChecked.push(value);
        //} else {
        //    newChecked.splice(currentIndex, 1);
        //}

        //this.setState({
        //    checked: newChecked
        //});
    }
    handleSubmit = () => {
        swal({
            text: "Do Service",
            icon: "error"
        })
    }
    renderRedirect = () => {
        if (this.state.redirect === true) {
            return <Redirect to={{
                pathname: '/pages/BillingFrequency',

            }} />
        }
        else if (this.state.redirectback === true) {
            return <Redirect to={{
                pathname: '/pages/ProceedPayment',

            }} />
        }
    }
    //renderRedirectback = () => {
    //    if (this.state.redirectback === true) {
    //        return <Redirect to={{
    //            pathname: '/pages/ProceedPayment',

    //        }} />
    //    }
    //}
    quickbuyRedirect = () => {

        this.setState({ redirect: true })
        this.renderRedirect();
    }
    BackRedirect = () => {
        this.setState({ redirectback: true })
        this.renderRedirect();
    }
    onDateChange = (formate, name, event) => {

        //const { validdate } = this.state.fields;
        //this.setState({ validdate: false });
        var today = event.toDate();
        if (today.getDate() < 10) {
            var dt = '0' + today.getDate();
        }
        else {
            var dt = today.getDate();
        }
        if (today.getMonth() < 10) {
            var mm = '0' + (today.getMonth() + 1);
        }
        else {
            var mm = (today.getMonth() + 1);
        }


        //var date = today.getFullYear() + '-' + (today.getMonth() + 1)+ '-' + today.getDate();
        var date = dt + '/' + mm + '/' + today.getFullYear();
        const fields = this.state.Retention;
        fields[name] = date;
        this.setState({ fields });

    };
    render() {
        const { classes, loggingIn } = this.props;
        return (
            <div className={classes.container}>
                <Card>                    <CardBody>
                        <h3>Starting Date</h3>                        <GridContainer>                        <GridItem xs={12} sm={12} md={3}>
                            <CustomDatetime
                                labelText="EffectiveFromDate"
                                id='EndDate'
                                name='effectiveFrom'
                                onChange={(event) => this.onDateChange('datetime', 'effectiveFrom', event)}
                                value={this.state.Retention.effectiveFrom}
                                required={true}
                                formControlProps={{ fullWidth: true }}
                            />

                            </GridItem>
                        </GridContainer>
                     
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={3}>
                                <Button round color="primary" onClick={this.BackRedirect}> Back</Button>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <Button round color="primary" onClick={this.quickbuyRedirect}> Proceed</Button>
                            </GridItem>
                        </GridContainer>
                                           </CardBody>                </Card>                {this.renderRedirect()}                           </div >

        );
    }
}

ProceedDate.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(ProceedDate);