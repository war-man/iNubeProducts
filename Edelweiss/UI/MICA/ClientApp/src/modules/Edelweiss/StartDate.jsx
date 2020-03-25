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

class StartDate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            paymentAmt:0,
            startdate:"",
            redirect:false,
            validdate: true,
            vehType: "",
            drMakeModel:"",
            quotationDto: {},
            proposalNo: "",
            policyRequest: {},
            premiumDTO: {},
        };
    }

   

    onDateChange = (formate, name, event) => {
        debugger;
        const { validdate } = this.state;
        this.setState({ validdate: false });

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
        var date = dt + '/' + mm + '/' + today.getFullYear();
        const fields = this.state.quotationDto;
        fields[name] = date;
        this.setState({ fields });
        var psdate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() +" "+ today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds(); 
        console.log("psdate", psdate);
        this.state.startdate = psdate;

    };

    componentDidMount() {
        //console.log("this.props.location.state.policyRequest", this.props.location.state.policyRequest, this.props.location.state.quotationDto);
        if (this.props.location.state != undefined) {
            this.state.vehType = this.props.location.state.vehType;
            this.state.drMakeModel = this.props.location.state.drMakeModel
            this.state.policyRequest = this.props.location.state.policyRequest;
            this.state.premiumDTO = this.props.location.state.premiumDTO;
            this.state.proposalNo = this.props.location.state.proposalNo; 
            this.state.quotationDto = this.props.location.state.quotationDto;
            this.state.quotationDto.age = this.props.location.state.quotationDto.age;
            this.state.quotationDto.primaryDriverName = this.props.location.state.quotationDto.primaryDriverName;
            this.state.proposalNo = this.props.location.state.proposalNo;
            this.state.paymentAmt = this.props.location.state.amount;
            console.log("this.props.location.state.amount", this.state.paymentAmt, this.props.location.state.amount);
            this.setState({});
            console.log("prno", this.props.location.state.proposalNo);
            console.log("policyRqst", this.state.policyRequest);
            console.log("qdto", this.state.quotationDto);
            console.log("prdto", this.state.premiumDTO);
            console.log("veho", this.state.vehType);

          
        }


    }

    renderRedirect = () => {
        if (this.state.redirect === true) {
            return <Redirect to={{
                pathname: '/pages/AddDriver',
                state: { proposalNo: this.state.proposalNo, quotationDto: this.state.quotationDto, policyRequest: this.state.policyRequest, premiumDTO: this.state.premiumDTO, vehType: this.state.vehType, drMakeModel: this.state.drMakeModel, startdate: this.state.startdate, paymentAmt: this.state.paymentAmt}
            }} />
        }
    }

    quickDateProceed = () => {
        this.renderRedirect();
        this.setState({ redirect: true })
    }
  

    render() {
        const { classes, loggingIn } = this.props;
        return (
            <div className={classes.container}>
                <GridContainer justify="center">
                    <GridItem xs={6}>
                        <Card>
                            <CardBody>
                                 <div>   
                                        <GridContainer justify="center">
                                            <h3>Starting Date</h3>
                                        </GridContainer>
                                        <GridContainer justify="center">
                                            <GridItem xs={6}>
                                                <CustomDatetime
                                                    labelText="EffectiveFromDate"
                                                    id='startDate'
                                                    name='startDate'
                                                    validdate={this.state.validdate}
                                                    onChange={(event) => this.onDateChange('datetime', 'startDate', event)}
                                                    value={this.state.quotationDto.startDate}
                                                    required={true}
                                                    formControlProps={{ fullWidth: true }}
                                                />
                                            </GridItem>
                                        </GridContainer>


                                    <GridContainer justify="center">
                                        {this.renderRedirect()}
                                            <Button round color="primary" onClick={this.quickDateProceed}> Proceed</Button>

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

StartDate.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(StartDate);