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
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import Radio from "@material-ui/core/Radio"
import EdelweissConfig from "./EdelweissConfig.js";
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

class BillingFrequency extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          participantTypeId:"",
            redirect: false,
            premium: "",
            ft: "",
            ad:"",
            adsixtyFttaxamntVal: "",
            adsixtyTtaxamntVal: "",
            ftFtaxamntVal: "",
            ftTtaxamntVal: "",
            gst: "",
            username1: "20",
            redirectback: false,
            ParticipantMaster: {
                isActive: "",
                disabled: false,
              
            },
            fields: {
                "SI": "500000",
                "NOOFTW": "1",
                "NOOFPC": "3"
            },
            rate: {
                "DEXPRT_Exp": "6",
                "PDAGERT_PAge": "35",
                "ADDRVRT_DRV": "1",
                "AVFACTORPC_PC_NOOFPC": "3",
                "AVFACTORTW_TW_NOOFPC": "3",
                "AVFACTORTW_TW_NOOFTW": "1",
                "FSTTAX_TAXTYPE": "IGST",
                "TSTTAX_TAXTYPE": "NA"
            },
        };
    }

    handleinput = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleChange = (event) => {
        console.log(event);
    }
    
    renderRedirect = () => {
        if (this.state.redirect === true) {
            return <Redirect to={{
                pathname: '/pages/Payment',

            }} />
        }
        else if (this.state.redirectback === true) {
            return <Redirect to={{
                pathname: '/pages/ProceedDate',

            }} />
        }
    }
    quickbuyRedirect = () => {

        this.setState({ redirect: true })
        this.renderRedirect();
    }
    BackRedirect = () => {
        this.setState({ redirectback: true })
        this.renderRedirect();
    }
    handleRadioOnChange = (event) => {
        debugger
        let value = event.target.value;
        //this.state.BrokerRadio = event.target.value;
        this.state.ParticipantMaster.isActive = event.target.value;
        this.setState({ value });
        console.log("isActive", this.state.ParticipantMaster.isActive);
        if (this.state.ParticipantMaster.isActive == 'Y') {
            this.setState({ selectedValue: false });
        }
        if (this.state.ParticipantMaster.isActive == 'N') {
            this.setState({ selectedValue: true });
        }
        console.log("isActive1", this.state.ParticipantMaster.isActive);
    }
    componentDidMount() {
        //this.setState({ premium: this.props.location.state.premperday });

        this.CalCulatePremium("1");
        //console.log("premiumres", this.state.premium);
        //this.setState();
    }
    CalCulatePremium = (NFDrv) => {
        debugger;
        this.state.rate.addrvrt_drv = NFDrv;
        var data = {
            'dictionary_rule': this.state.fields, 'dictionary_rate': this.state.rate,
        };

        fetch(`${EdelweissConfig.EdelweissConfigUrl}/api/policy/calculatepremium `, {
            method: 'post',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI5NTc4NmM2OS0xNjAxLTQzMGQtODM1Ni01M2RlNDUyZjUxZTYiLCJFbWFpbCI6InZpdGFsQGludWJlc29sdXRpb25zLmNvbSIsIk9yZ0lkIjoiMTEyIiwiUGFydG5lcklkIjoiMCIsIlJvbGUiOiJEZW1vIFJvbGUiLCJOYW1lIjoidml0aGFsIiwiVXNlck5hbWUiOiJ2aXRhbEBpbnViZXNvbHV0aW9ucy5jb20iLCJQcm9kdWN0VHlwZSI6Ik1pY2EiLCJTZXJ2ZXJUeXBlIjoiMSIsImV4cCI6MTY3MDY1NDMzMCwiaXNzIjoiSW51YmUiLCJhdWQiOiJJbnViZU1JQ0EifQ.nZsItQ97TGtSZ-IrZ8SlDeOCIKnaCI4tmeLC953z9qA'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log("hmpagedata", data);
                let firetheft = data.filter((e) => e.entity === 'FT365')[0].eValue;
                let adforsixtydays = data.filter((e) => e.entity === 'AD60DAYS')[0].eValue;
                this.setState({ ft: firetheft});
                this.setState({ ad: adforsixtydays });
                   
                    
                let adsixtyFttaxamnt = data.filter((e) => e.entity === 'AD60FTAXAMT')[0].eValue;
                let adsixtyTtaxamnt = data.filter((e) => e.entity === 'AD60TTAXAMT')[0].eValue;
                let ftFtaxamnt = data.filter((e) => e.entity === 'FTFTAXAMT')[0].eValue;
                let ftTtaxamnt = data.filter((e) => e.entity === 'FTTTAXAMT')[0].eValue;
                this.setState({ adsixtyFttaxamntVal: adsixtyFttaxamnt, adsixtyTtaxamntVal: adsixtyTtaxamnt, ftFtaxamntVal: ftFtaxamnt, ftTtaxamntVal: ftTtaxamnt })
                let sum = eval(this.state.adsixtyFttaxamntVal) + eval(this.state.adsixtyTtaxamntVal) + eval(this.state.ftFtaxamntVal) + eval(this.state.ftTtaxamntVal);

                this.setState({ gst: sum.toFixed(2) });
                console.log("gst1", this.state.gst);

                //let sumInsured = data.filter((e) => e.entity === 'SI')[0].eValue;

                //console.log("SI", sumInsured);
                //let ftmp = data.filter((e) => e.entity === 'FTPM')[0].eValue;
                //let adpmpd = data.filter((e) => e.entity === 'ADPMPD')[0].eValue;
                //this.setState({ ftmpval: ftmp, adpmpdval: adpmpd });
                //console.log("ftmp11", this.state.ftmpval, this.state.adpmpdval);
                //let num1 = eval(this.state.ftmpval);
                //let num2 = eval(this.state.adpmpdval);
                //let add = num1 + num2;
                //this.setState({ premium: add.toFixed(2) });
                //console.log("added", add);
                //console.log("premperday", this.state.premium);
                //this.setState({ value1: sumInsured });
                //console.log("valk1", this.state.value1);
                //let val = "";
                //if (sumInsured > 300000) {
                //    val = eval(this.state.value1 - 100000);
                //} else {
                //    val = 300000;
                //}
                //this.setState({ value2: val });
                //console.log("value222", this.state.value2);
                //this.setState({ result: data });
                //console.log(this.state.result, 'result');
            });


    }
    render() {
        const { classes, loggingIn } = this.props;
        return (
            <div className={classes.container}>
                <Card>                    <CardBody>
                      <h3>Billing Frequency</h3>                   <GridContainer>                      <GridItem xs={12} sm={12} md={3}>                                <FormControlLabel
                                    control={
                                        <Radio
                                            checked={this.state.ParticipantMaster.isActive === 'Y'}
                                            onChange={this.handleRadioOnChange}
                                            //disabled={this.props.viewdisable}
                                            value={'Y'}

                                            name="radio button demo"
                                            aria-label="B"
                                            icon={
                                                <FiberManualRecord
                                                    className={classes.radioUnchecked}
                                                />
                                            }
                                            checkedIcon={
                                                <FiberManualRecord
                                                    className={classes.radioChecked}
                                                />
                                            }
                                            classes={{
                                                checked: classes.radio,
                                                root: classes.radioRoot
                                            }}
                                        />
                                    }   
                                    classes={{
                                        label: classes.label
                                    }}
                                    label="Monthly"
                                /> </GridItem>                        </GridContainer>                        <GridContainer>                            <GridItem xs={12} sm={12} md={3}>                                <FormControlLabel
                                    control={
                                        <Radio
                                            checked={this.state.ParticipantMaster.isActive === 'N'}
                                            onChange={this.handleRadioOnChange}
                                            //disabled={this.props.viewdisable}
                                            value={'N'}

                                            name="radio button demo"
                                            aria-label="B"
                                            icon={
                                                <FiberManualRecord
                                                    className={classes.radioUnchecked}
                                                />
                                            }
                                            checkedIcon={
                                                <FiberManualRecord
                                                    className={classes.radioChecked}
                                                />
                                            }
                                            classes={{
                                                checked: classes.radio,
                                                root: classes.radioRoot
                                            }}
                                        />
                                    }
                                    classes={{
                                        label: classes.label
                                    }}
                                    label="Yearly"
                                />                            </GridItem>                        </GridContainer>                        <GridContainer>                        <GridItem>
                            <CustomCheckbox
                                //name={item.mValue}
                                labelText="Auto Debit my saved card/Bank"
                                //value={item.mIsRequired}
                                //onChange={(e) => props.componentData.SetRiskClaimsDetailsValue('Risk', e)}
                                //disabled={(item.disable == true) ? true : null}
                                //checked={item.mIsRequired}
                                formControlProps={{
                                    fullWidth: true
                                }}
                                />                                    </GridItem>                        </GridContainer>                        <GridContainer>                            <GridItem xs={8} sm={4}>                              <h3>Fire and Theft: <CustomInput label="Fire and Theft" disabled={true} value={this.state.ft} name="value2" /></h3>                            </GridItem>                        </GridContainer>                        <GridContainer>                            <GridItem xs={8} sm={4}>                                <h3>AD For 60 days: <CustomInput label="AD for 60 days " disabled={true} value={this.state.ad} name="value1" /></h3>                            </GridItem>                        </GridContainer>                        <GridContainer>                            <GridItem xs={8} sm={4}>                                <h3>GST: <CustomInput label="GST" disabled={true} value={this.state.gst} name="value1" /></h3>                            </GridItem>                            </GridContainer>                                                  <GridContainer>
                            <GridItem xs={12} sm={12} md={3}>
                                <Button round color="primary" onClick={this.BackRedirect}> Back</Button>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <Button round color="primary" onClick={this.quickbuyRedirect}> Done</Button>
                            </GridItem>
                        </GridContainer>                    </CardBody>                </Card>                {this.renderRedirect()}            </div >

        );
    }
}

BillingFrequency.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(BillingFrequency);