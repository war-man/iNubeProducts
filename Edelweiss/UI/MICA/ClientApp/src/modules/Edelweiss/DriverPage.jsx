import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
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
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import andriodapp from "assets/img/andriodappstore.png";
import iosapp from "assets/img/iosappstore.png";
import FormControl from '@material-ui/core/FormControl';
import MuiButton from '@material-ui/core/Button';
import CustomCheckbox from "components/Checkbox/CustomCheckbox";
import Tooltip from '@material-ui/core/Tooltip';
import GetAppIcon from '@material-ui/icons/GetApp';
import IconButton from '@material-ui/core/IconButton';
import AccessibleIcon from '@material-ui/icons/Accessible';
import LooksOneIcon from '@material-ui/icons/LooksOne';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';
import Looks3Icon from '@material-ui/icons/Looks3';
import MUIButton from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import Avatar from '@material-ui/core/Avatar';
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import StepConnector from '@material-ui/core/StepConnector';
import Check from '@material-ui/icons/Check';
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";

import EdelweissConfig from "./EdelweissConfig.js";

const StyleButton = withStyles({
    root: {
        color: '#E7AB37',
    },
    label: {
        // textTransform: 'capitalize',
        color: '#E7AB37'
    },
})(MuiButton);

const QontoConnector = withStyles({
    alternativeLabel: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    active: {
        '& $line': {
            borderColor: '#E7AB37',
        },
    },
    completed: {
        '& $line': {
            borderColor: '#E7AB37',
        },
    },
    line: {
        borderColor: '#ddd',
        borderTopWidth: 3,
        borderRadius: 1,
    },
})(StepConnector);

const style = {
    ...customSelectStyle,
    ...customCheckboxRadioSwitch
};

//const QontoStepIcon = (props) => {
//    const classes = useQontoStepIconStyles();
//    const { active, completed } = props;

//    return (
//        <div
//            className={clsx(classes.root, {
//                [classes.active]: active,
//            })}
//        >
//            {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
//        </div>
//    );
//}

//QontoStepIcon.propTypes = {
//    active: PropTypes.bool,
//    completed: PropTypes.bool,
//};

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

class DriverPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            random:0,
            amount:0,
            monthlypremium:"",
            validdate: true,
            datediff: 1,
            //button css 
            btn1color: false,
            btn2color: false,
            btn3color: false,
            //

            //step Flags 
            step1: true,
            step2: false,
            //step3: false,
            step5: false,
            step6: false,
            //

            //user details
            sendotp: {
                "contactNumber": "",
                "otp": ""
            },
            disablesendotp: false,
            disableresendotp: true,

            policyRequest:
                {
                    "InsurableItem": [{
                        "InsurableName": "Driver", "RiskCount": 0, "RiskItems": [{
                            "Name": "",
                            "Identification Number": "D1",
                            "Aadhaar No.": "",
                            "Licence No.": "",
                            "Driving Experience": "",
                             "Documents": [],
                        }], "Covers": []
                },
                        { "InsurableName": "Vehicle", "RiskCount": 0, "RiskItems": [{ "Make": "","Model":"", "Vehicle Number": "", "Year of Registration": "", "Vehicle Type": "", "Identification Number": "V1", "Documents": [],}], "Covers": [] }], "Identification Number": "", "Name": "", "Product Code": "DBI001", "No. Of Risks": "", "Policy Start Date": "", "Mobile Number": "", "Policy End Date": "", "Email ID": "",

                    "stateCode": "",
                    "si": 0,
                    "PaymentReferenceNumber": "",
                    "noOfPC": "",
                    "noOfTW": "",
                    "driverAge": "",
                    "driverExp": "",
                    "additionalDriver": "",
                    "billingFrequency": ""
                    ,
                    "PaymentInfo": [{ "RefrenceNumber": "", "Amount": "" }],

                },
            proposalNo: "",
            //title: [
            //    mType: "title",
            //    mData: [
            //        {mID:"1",mValue:"Mr."},
            //        {mID:"2",mValue:"Ms."},
            //        {mID:"3",mValue:"Mrs."},
            //    ]
            //]
            //

            // start date step 3

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
            //

            //billing frequency
            hidecheck: true,
            step4: false,
            premium: "",
            ft: "",
            adsixty: "",
            adsixtyFttaxamntVal: "",
            adsixtyTtaxamntVal: "",
            ftFtaxamntVal: "",
            ftTtaxamntVal: "",
            gst: "",
            showAutodebit: false,
            ParticipantMaster: {
                isActive: "",
                disabled: false,
            },
            selectedValue: "",
            fields: {
                "SI": "800000",
                "NOOFTW": "0",
                "NOOFPC": "1"
            },
            rate: {
                "DEXPRT_Exp": "",
                "PDAGERT_PAge": "",
                "ADDRVRT_DRV": "",
                "AVFACTORPC_PC_NOOFPC": "1",
                "AVFACTORTW_TW_NOOFPC": "1",
                "AVFACTORTW_TW_NOOFTW": "0",
                "FSTTAX_TAXTYPE": "",
                "TSTTAX_TAXTYPE": ""
            },
            premiumDto: {
                "cityId": "",
                "premiumObj": {
                    "dictionary_rule": {
                        "SI": "",
                        "NOOFTW": "",
                        "NOOFPC": ""
                    },
                    "dictionary_rate": {
                        "DEXPRT_Exp": "",
                        "PDAGERT_PAge": "",
                        "ADDRVRT_DRV": "1",
                        "AVFACTORPC_PC_NOOFPC": "",
                        "AVFACTORTW_TW_NOOFPC": "",
                        "AVFACTORTW_TW_NOOFTW": "",
                        "FSTTAX_TAXTYPE": "",
                        "TSTTAX_TAXTYPE": ""
                    }
                }
            },

            premiumDTO: {
                "stateCode": "",
                "si": "",
                "noOfPC": "",
                "noOfTW": "",
                "driverAge": "",
                "driverExp": "",
                "additionalDriver": "",
                "billingFrequency": ""
            },
            noofdrivers:"",
            //
            total: "",

            //drivers step1 
            Checkbox: {
                "tppolicy": "",
                "declaration": "",
            },
            premium: "",
            ftfor30Days: "",
            value2: "",
            vehType: "",
            drMakeModel: "",

            premiumperday: "",
            ft365days: "",
            adpremium: "",
            gsttax: "",
            totalsum: "",
            suminsureamount: [
                { mID: 1, mValue: "300000", label: "3,00,000" },
                { mID: 2, mValue: "700000", label: "7,00,000" },
            ],
            suminsured: [
                { mID: 1, mValue: "800000", label: "8,00,000" },
                { mID: 2, mValue: "900000", label: "9,00,000" },
                { mID: 3, mValue: "1000000", label: "10,00,000" },
                { mID: 4, mValue: "1100000", label: "11,00,000" },
                { mID: 5, mValue: "1200000", label: "12,00,000" },
                { mID: 6, mValue: "1300000", label: "13,00,000" },
                { mID: 7, mValue: "1400000", label: "14,00,000" },
                { mID: 8, mValue: "1500000", label: "15,00,000" },
                { mID: 9, mValue: "1600000", label: "16,00,000" },
                { mID: 10, mValue: "1700000", label: "17,00,000" },
                { mID: 11, mValue: "1800000", label: "18,00,000" },
                { mID: 11, mValue: "1900000", label: "19,00,000" },
                { mID: 11, mValue: "2000000", label: "20,00,000" },
            ],
            selectedamount: "",
            drivercount: 1,
            opendialog: false,
            selectedSI: 0,
            premuimamount: "",
            fordays: 60,
            //

            //Stepper
            activeStep: 0,
            steps: [
                { label: "Drivers", value: "Drivers" },
                { label: "Details", value: "Details" },
                //{ label: 'Start Date', value: "date" },
                { label: 'Billing Frequency', value: "billing" },
                { label: 'Payment', value: "payment" },
                { label: 'Final Step', value: "final" },
            ],
            //
            quotationDto: {
            },
            //Final step 6
            drName: "",
            //

        };
    }

    //Stepper 
    handlestep = (key, e) => {
        this.setState({ activeStep: key });
        if (key == 0) {
            this.setState({ step1: true, step2: false, step3: false, step4: false, step5: false, step6: false });
        }
        if (key == 1) {
            this.setState({ step1: false, step2: true, step3: false, step4: false, step5: false, step6: false });
        }
        if (key == 2) {
            this.setState({ step1: false, step2: false, step3: true, step4: false, step5: false, step6: false });
        }
        if (key == 3) {
            this.setState({ step1: false, step2: false, step3: false, step4: true, step5: false, step6: false });
        }
        if (key == 4) {
            this.setState({ step1: false, step2: false, step3: false, step4: false, step5: true, step6: false });
        }
        if (key == 5) {
            this.setState({ step1: false, step2: false, step3: false, step4: false, step5: false, step6: true });
        }
    }

    handleNext = () => {
        this.setState({ activeStep: this.state.activeStep + 1 });
    };

    handleBack = () => {
        this.setState({ activeStep: this.state.activeStep - 1 })
    };

    getStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return 'Fill the details';
            case 1:
                return 'Select the start date';
            case 2:
                return 'Set the Frequency';
            case 3:
                return 'Set the Frequency';
            default:
                return 'Final step';
        }
    }

    getSteps = () => {
        return ['Details', 'Start Date', 'Billing Frequency', 'Payment'];
    }
    //

    //Billing frequency step 4
    //CalCulatePremium = (NFDrv) => {
    //    this.state.rate.addrvrt_drv = NFDrv;
    //    var data = {
    //        'dictionary_rule': this.state.fields, 'dictionary_rate': this.state.rate,
    //    };

    //    fetch(`https://localhost:44351/api/policy/calculatepremium `, {
    //        method: 'post',
    //        headers: {
    //            'accept': 'application/json',
    //            'content-type': 'application/json',
    //            'authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI5NTc4NmM2OS0xNjAxLTQzMGQtODM1Ni01M2RlNDUyZjUxZTYiLCJFbWFpbCI6InZpdGFsQGludWJlc29sdXRpb25zLmNvbSIsIk9yZ0lkIjoiMTEyIiwiUGFydG5lcklkIjoiMCIsIlJvbGUiOiJEZW1vIFJvbGUiLCJOYW1lIjoidml0aGFsIiwiVXNlck5hbWUiOiJ2aXRhbEBpbnViZXNvbHV0aW9ucy5jb20iLCJQcm9kdWN0VHlwZSI6Ik1pY2EiLCJTZXJ2ZXJUeXBlIjoiMSIsImV4cCI6MTY3MDY1NDMzMCwiaXNzIjoiSW51YmUiLCJhdWQiOiJJbnViZU1JQ0EifQ.nZsItQ97TGtSZ-IrZ8SlDeOCIKnaCI4tmeLC953z9qA'
    //        },
    //        body: JSON.stringify(data)
    //    })
    //        .then(response => response.json())
    //        .then(data => {
    //            console.log("hmpagedata", data);
    //            let firetheft = data.filter((e) => e.entity === 'FT365')[0].eValue;
    //            let adforsixtydays = data.filter((e) => e.entity === 'AD60DAYS')[0].eValue;
    //            this.setState({ ft: firetheft });
    //            this.setState({ ad: adforsixtydays });

    //            let adsixtyFttaxamnt = data.filter((e) => e.entity === 'AD60FTAXAMT')[0].eValue;
    //            let adsixtyTtaxamnt = data.filter((e) => e.entity === 'AD60TTAXAMT')[0].eValue;
    //            let ftFtaxamnt = data.filter((e) => e.entity === 'FTFTAXAMT')[0].eValue;
    //            let ftTtaxamnt = data.filter((e) => e.entity === 'FTTTAXAMT')[0].eValue;
    //            this.setState({ adsixtyFttaxamntVal: adsixtyFttaxamnt, adsixtyTtaxamntVal: adsixtyTtaxamnt, ftFtaxamntVal: ftFtaxamnt, ftTtaxamntVal: ftTtaxamnt })
    //            let sum = eval(this.state.adsixtyFttaxamntVal) + eval(this.state.adsixtyTtaxamntVal) + eval(this.state.ftFtaxamntVal) + eval(this.state.ftTtaxamntVal);

    //            this.setState({ gst: sum.toFixed(2) });
    //            console.log("gst1", this.state.gst);
    //        });


    //}

    handleRadioOnChange = (event) => {
        let value = event.target.value;
        if (Object.keys(this.state.quotationDto).length != 0) {
            this.state.quotationDto.frequency = event.target.name;
            this.state.premiumDTO.billingFrequency = event.target.name;
        }


        console.log("event radio", event, event.target.value, event.target.name);
        //this.state.BrokerRadio = event.target.value;
        this.state.ParticipantMaster.isActive = event.target.value;
        this.setState({ value });
        console.log("isActive", this.state.ParticipantMaster.isActive);
        if (this.state.ParticipantMaster.isActive == '60') {
            this.setState({ selectedValue: false, hidecheck: true });
        }
        if (this.state.ParticipantMaster.isActive == '365') {
            this.setState({ selectedValue: true, hidecheck: false });
        }
        console.log("isActive1", this.state.ParticipantMaster.isActive, this.state.quotationDto);
    }

    quickbuyBilling = () => {
        debugger;
        fetch(`http://mica-publi-11qa3l637dqw3-293834673.ap-south-1.elb.amazonaws.com:9025/api/Mica_EGI/GetQuotationbyMobileNo?mobileNo=` + this.state.sendotp.contactNumber, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("qdata:", data);
                //this.setState({ quotationDto: data });
                this.state.quotationDto.quoteId = data.quoteId;
                console.log("qtdata", this.state.quotationDto);
                fetch(`http://mica-publi-11qa3l637dqw3-293834673.ap-south-1.elb.amazonaws.com:9025/api/Mica_EGI/UpdateQuotation`, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        //'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                    },
                    body: JSON.stringify(this.state.quotationDto)
                }).then(response => response.json())
                    .then(data => {
                        //swal({
                        //    text: "Quotation created successfully!",
                        //    icon: "success"
                        //})

                    })

            });


        console.log("qqqqqqqq", this.state.quotationDto)
        this.CalCulatePremium(this.state.drivercount);
        this.setState({ step3: false, step4: true, activeStep: this.state.activeStep + 1 });
    }
    //

    //start date step 3
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
        //this.state.policyRequest["Policy Start Date"] = this.state.quotationDto.startDate;

    };

    quickbuyDateProceed = () => {
        this.setState({ step3: false, step4: true, activeStep: this.state.activeStep + 1 });
    }



    //

    //User details step 2
    onInputChange = (evt) => {
        const Data = this.state.sendotp;
        Data[evt.target.name] = evt.target.value;
        this.setState({ Data });

        this.state.policyRequest['Mobile Number'] = this.state.sendotp.contactNumber;
        console.log("Data", this.state.sendotp)
    }

    onCustomInputChange = (event) => {
        const fields = this.state.quotationDto;
        let name = event.target.name;
        fields[event.target.name] = event.target.value;
        this.setState({ fields });
        console.log("mobno", this.state.sendotp.contactNumber);
        this.state.policyRequest.Name = this.state.quotationDto.primaryDriverName;

        this.state.drName = this.state.quotationDto.primaryDriverName;
        console.log("dernae", this.state.drName);
        let insurablelen = this.state.policyRequest.InsurableItem.length - 1;

        while (insurablelen >= 0) {
            if (this.state.policyRequest.InsurableItem[insurablelen].InsurableName == "Driver") {
                this.state.policyRequest.InsurableItem[insurablelen].RiskItems[0].Name = this.state.quotationDto.primaryDriverName;
                this.state.policyRequest.InsurableItem[insurablelen].RiskItems[0]['Driving Experience'] = this.state.premiumDTO.driverExp;

            }

            insurablelen--;
        }


        console.log("policyRqst", this.state.policyRequest);
    }


    SendOTP = () => {
        if (this.state.sendotp.contactNumber != "" && this.state.quotationDto.primaryDriverName != "") {
            console.log("console", this.state.sendotp.contactNumber);
            fetch(`http://mica-publi-11qa3l637dqw3-293834673.ap-south-1.elb.amazonaws.com:9025/api/Mica_EGI/SendOTP`, {
                method: 'Post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state.sendotp)
            }).then(response => response.json())
                .then(data => {
                    swal({
                        text: "OTP sent successfully!",
                        icon: "success"
                    })
                    this.setState({ disablesendotp: true, disableresendotp: false })
                    console.log("dddd", data);
                })
        } else {
            swal({
                text: "Please enter your valid Name & Mobile Number",
                icon: "error"
            })
        }
    }

    quickbuyProceed = () => {
        console.log("console", this.state.sendotp.contactNumber);
        fetch(`http://mica-publi-11qa3l637dqw3-293834673.ap-south-1.elb.amazonaws.com:9025/api/Mica_EGI/VerifyingOTP`, {
            method: 'Post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                //'authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJhOTVkMDNjZC1kZjE4LTQ3NTYtYTU3Ny0zNDEyYjY4MTdkZDAiLCJFbWFpbCI6InNhbmRoeWFAZ21haWwuY29tIiwiT3JnSWQiOiIyNzciLCJQYXJ0bmVySWQiOiIwIiwiUm9sZSI6ImlOdWJlIEFkbWluIiwiTmFtZSI6InNhbmRoeWEiLCJVc2VyTmFtZSI6InNhbmRoeWFAZ21haWwuY29tIiwiUHJvZHVjdFR5cGUiOiJNaWNhIiwiU2VydmVyVHlwZSI6IjEiLCJleHAiOjE2NzU0OTkyOTksImlzcyI6IkludWJlIiwiYXVkIjoiSW51YmVNSUNBIn0.2oUTJQBxiqqqgl2319ZCREz1IyYHjVRhlDehI__O8Xg'

            },
            body: JSON.stringify(this.state.sendotp)
        }).then(response => response.json())
            .then(data => {
                swal({
                    text: "OTP verified successfully!",
                    icon: "success"
                })
                this.setState({ step2: false, step3: true, activeStep: this.state.activeStep + 1 });
                console.log("dddd", data);
                this.CreateQuotaion();
            })
    }
    CreateQuotaion = () => {


        this.state.quotationDto.mobileno = this.state.sendotp.contactNumber;
        console.log("quotationDTO", this.state.quotationDto);
        fetch(`http://mica-publi-11qa3l637dqw3-293834673.ap-south-1.elb.amazonaws.com:9025/api/Mica_EGI/CreateQuotation`, {
            method: 'Post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.quotationDto)
        }).then(response => response.json())
            .then(data => {
                //swal({
                //    text: "Quotation created successfully!",
                //    icon: "success"
                //})

            })
    }

    ResetOTP = () => {
        console.log("console", this.state.sendotp.contactNumber);
        if (this.state.sendotp.contactNumber != "" && this.state.quotationDto.primaryDriverName != "") {
            fetch(`http://mica-publi-11qa3l637dqw3-293834673.ap-south-1.elb.amazonaws.com:9025/api/Mica_EGI/ResetOTP`, {
                method: 'Post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state.sendotp)
            }).then(response => response.json())
                .then(data => {
                    swal({
                        text: "OTP sent successfully!",
                        icon: "success"
                    })
                    console.log("dddd", data);
                })
        } else {
            swal({
                text: "Please enter your valid Name & Mobile Number",
                icon: "error"
            })
        }
    }

    //

    // drivers step 1
    //CalCulatePremium = (NFDrv) => {
    //    this.state.rate.ADDRVRT_DRV = NFDrv;
    //    var data = {
    //        'dictionary_rule': this.state.fields, 'dictionary_rate': this.state.rate,
    //    };

    //    fetch(`${EdelweissConfig.PolicyConfigUrl}/api/policy/calculatepremium `, {
    //        method: 'post',
    //        headers: {
    //            'accept': 'application/json',
    //            'content-type': 'application/json',
    //            'authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJhOTVkMDNjZC1kZjE4LTQ3NTYtYTU3Ny0zNDEyYjY4MTdkZDAiLCJFbWFpbCI6InNhbmRoeWFAZ21haWwuY29tIiwiT3JnSWQiOiIyNzciLCJQYXJ0bmVySWQiOiIwIiwiUm9sZSI6ImlOdWJlIEFkbWluIiwiTmFtZSI6InNhbmRoeWEiLCJVc2VyTmFtZSI6InNhbmRoeWFAZ21haWwuY29tIiwiUHJvZHVjdFR5cGUiOiJNaWNhIiwiU2VydmVyVHlwZSI6IjEiLCJleHAiOjE2NzU0OTkyOTksImlzcyI6IkludWJlIiwiYXVkIjoiSW51YmVNSUNBIn0.2oUTJQBxiqqqgl2319ZCREz1IyYHjVRhlDehI__O8Xg'
    //        },
    //        body: JSON.stringify(data)
    //    }).then(response => response.json())
    //        .then(data => {
    //            console.log("hmpagedata", data);
    //            let firetheft = data.filter((e) => e.entity === 'FT365');
    //            if (firetheft.length > 0) {
    //                this.setState({ ft: firetheft[0].eValue });
    //            }
    //            let adforsixtydays = data.filter((e) => e.entity === 'AD60DAYS');
    //            if (adforsixtydays.length > 0) {
    //                this.setState({ ad: adforsixtydays[0].eValue });
    //            }
    //            let adsixtyFttaxamnt = data.filter((e) => e.entity === 'AD60FTAXAMT');
    //            let adsixtyTtaxamnt = data.filter((e) => e.entity === 'AD60TTAXAMT');
    //            let ftFtaxamnt = data.filter((e) => e.entity === 'FTFTAXAMT');
    //            let ftTtaxamnt = data.filter((e) => e.entity === 'FTTTAXAMT');
    //            if (adsixtyFttaxamnt.length > 0 && adsixtyTtaxamnt.length > 0 && ftFtaxamnt.length > 0 && ftTtaxamnt.length > 0) {
    //                this.setState({ adsixtyFttaxamntVal: adsixtyFttaxamnt[0].eValue, adsixtyTtaxamntVal: adsixtyTtaxamnt[0].eValue, ftFtaxamntVal: ftFtaxamnt[0].eValue, ftTtaxamntVal: ftTtaxamnt[0].eValue })
    //            }
    //            let sum = eval(this.state.adsixtyFttaxamntVal) + eval(this.state.adsixtyTtaxamntVal) + eval(this.state.ftFtaxamntVal) + eval(this.state.ftTtaxamntVal);
    //            //let totalsum = parseInt(this.state.ad) + parseInt(this.state.ft) + parseInt(this.state.gst);
    //            let totalsum = eval(this.state.ad) + eval(this.state.ft) + eval(this.state.gst);
    //            this.setState({ total: totalsum });
    //            console.log("total", this.state.total)
    //            this.setState({ gst: sum.toFixed(2) });
    //            console.log("gst1", this.state.gst);

    //            let ftmp = data.filter((e) => e.entity === 'FTPM');
    //            let adpmpd = data.filter((e) => e.entity === 'ADPMPD');
    //            if (ftmp.length > 0 && adpmpd.length > 0) {
    //                this.setState({ ftmpval: ftmp[0].eValue, adpmpdval: adpmpd[0].eValue });
    //            }
    //            console.log("ftmp11", this.state.ftmpval, this.state.adpmpdval);
    //            let num1 = eval(this.state.ftmpval);
    //            let num2 = eval(this.state.adpmpdval);
    //            let add = num1 + num2;
    //            this.setState({ premium: add.toFixed(2) });
    //            console.log("added", add);
    //            console.log("premperday", this.state.premium);

    //            let sumInsuredList = data.filter((e) => e.entity === 'SI');
    //            if (sumInsuredList.length > 0) {
    //                console.log("SI", sumInsuredList);
    //                this.setState({ value1: sumInsuredList[0].eValue });
    //                console.log("valk1", this.state.value1);
    //                let val = "";
    //                if (sumInsuredList[0].eValue > 300000) {
    //                    val = eval(this.state.value1 - 100000);
    //                } else {
    //                    val = 300000;
    //                }
    //                this.setState({ value2: val });
    //            }
    //            console.log("value222", this.state.value2);
    //            this.setState({ result: data });
    //            console.log(this.state.result, 'result');
    //            this.setState({ premuimamount: this.state.premium });
    //        });
    //}



    CalCulatePremium = (N) => {
        //this.state.premiumDto.premiumObj.dictionary_rate.ADDRVRT_DRV = N; additionalDriver
        this.state.premiumDTO.additionalDriver = N-1;
        fetch(`${EdelweissConfig.EdelweissConfigUrl}/api/Mica_EGI/CalCulatePremium `, {
            method: 'post',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('edelweisstoken')
                //'authorization': 'Bearer '+'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJhOTVkMDNjZC1kZjE4LTQ3NTYtYTU3Ny0zNDEyYjY4MTdkZDAiLCJFbWFpbCI6InNhbmRoeWFAZ21haWwuY29tIiwiT3JnSWQiOiIyNzciLCJQYXJ0bmVySWQiOiIwIiwiUm9sZSI6ImlOdWJlIEFkbWluIiwiTmFtZSI6InNhbmRoeWEiLCJVc2VyTmFtZSI6InNhbmRoeWFAZ21haWwuY29tIiwiUHJvZHVjdFR5cGUiOiJNaWNhIiwiU2VydmVyVHlwZSI6IjEiLCJleHAiOjE2NzU0OTkyOTksImlzcyI6IkludWJlIiwiYXVkIjoiSW51YmVNSUNBIn0.2oUTJQBxiqqqgl2319ZCREz1IyYHjVRhlDehI__O8Xg'
            },
            body: JSON.stringify(this.state.premiumDTO)
        }).then(response => response.json())
            .then(data => {
                if (data.status == 8) {
                    swal({
                        text: data.errors[0].errorMessage,
                        icon: "error",
                    })
                }
                console.log("premdata", data);
                let premperday = data.perDayPremium;
                let ft365 = data.fireTheft;
                let adprem = data.adPremium;
                let gstt = data.gst;
                let monthprem = data.monthlyPremium;
                this.state.policyRequest.PaymentInfo[0].Amount = data.total;
                this.state.amount = data.total;
                console.log("ammmt", this.state.amount);
                this.setState({ premiumperday: premperday, ft365days: ft365, adpremium: adprem, gsttax: gstt, monthlypremium: monthprem});



                //let ft30days = data.fT30Day;
                //let adfor60days = data.aD60Days;
                //let fval = data.fStateValue;
                //let tval = data.tStateValue;
                //let gstsum = fval + tval;
                //let totalsum = ft30days + adfor60days + gstsum;
                //this.setState({ premuimamount: premperday, adsixty: adfor60days, gst: gstsum, total: totalsum, ftfor30Days: ft30days });
                //console.log("premperday", this.state.premuimamount);
            });
    }

    handleselectedSI = (e, key) => {
        //this.state.selectedSI = this.state.suminsured[key].mID;
        let suminsu = this.state.premiumDTO;
        //this.state.premiumDto.premiumObj.dictionary_rule;
        suminsu.si = this.state.suminsured[key].mValue;
        this.setState({ selectedSI: this.state.suminsured[key].mID, selectedamount: this.state.suminsured[key].label, suminsu, opendialog: false, btn3color: true });
        //this.state.selectedamount=
        console.log("Value: ", this.state.selectedSI, this.state.selectedamount);
        if (this.state.btn1color != false || this.state.btn2color != false) {
            this.setState({ btn1color: false, btn2color: false });
        }
        this.CalCulatePremium(this.state.drivercount);
    }

    handlecloseDialog = () => {
        this.setState({ opendialog: false });
    }

    handleopenDialog = () => {
        this.setState({ opendialog: true });
    }

    handleSI1 = () => {
        let suminsu = this.state.premiumDTO;
        //this.state.premiumDto.premiumObj.dictionary_rule;
        suminsu.si = this.state.suminsureamount[0].mValue;
        this.setState({ btn1color: !this.state.btn1color, selectedamount: this.state.suminsureamount[0].label, suminsu })
        if (this.state.btn2color != false) {
            this.setState({ btn2color: false });
        }
        if (this.state.btn3color != false) {
            this.setState({ btn3color: false });
        }
        this.CalCulatePremium(this.state.drivercount);
    }

    handleSI2 = () => {
        let suminsu = this.state.premiumDTO;
        //this.state.premiumDto.premiumObj.dictionary_rule;
        suminsu.si = this.state.suminsureamount[1].mValue;
        this.setState({ btn2color: !this.state.btn2color, selectedamount: this.state.suminsureamount[1].label, suminsu });
        if (this.state.btn1color != false) {
            this.setState({ btn1color: false });
        }
        if (this.state.btn3color != false) {
            this.setState({ btn3color: false });
        }
        this.CalCulatePremium(this.state.drivercount);

    }

    driver1 = () => {
        let driver = this.state.rate
        this.setState({ drivercount: 1, [driver.ADDRVRT_DRV]: 1 });
        console.log("Drivercount", driver)
        this.CalCulatePremium("1");
    }

    driver2 = () => {
        let driver = this.state.rate
        this.setState({ drivercount: 2, [driver.ADDRVRT_DRV]: 2 });
        this.CalCulatePremium("2");
    }

    driver3 = () => {
        let driver = this.state.rate
        this.setState({ drivercount: 3, [driver.ADDRVRT_DRV]: 3 });
        this.CalCulatePremium("3");
    }

    handleCheckbox = (event) => {
        let name = event.target.name;
        let checked = event.target.checked;
        let check = this.state.Checkbox;
        check[name] = checked;
        this.setState({ check });
    }

    quickbuy = () => {
        if (this.state.Checkbox.tppolicy != true) {
            swal({
                text: "Do the vehicle is already covered under a TP policy",
                icon: "info",
                buttons: ["No", "Yes"]
            })
                .then((willDelete) => {
                    if (willDelete) {
                        this.setState({ step1: false, step2: true, activeStep: this.state.activeStep + 1 });
                    } else {

                    }
                });
        } else {
            this.setState({ step1: false, step2: true, activeStep: this.state.activeStep + 1 });
        }
    }
    //

    //datechange = (date) => {
    //    const _date = date.split('/');
    //    const dateObj = { month: _date[1], year: _date[2], day: _date[0] };

    //    return dateObj.year + '-' + dateObj.month + '-' + dateObj.day;
    //}
    //payment step 5
    handlepayment = () => {
        var tempDate = new Date();
        var date = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() + " " + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
        console.log("currDate", date);


        var enddate = new Date();
        var endddate = (enddate.getFullYear() + 1) + '-' + (enddate.getMonth() + 1) + '-' + (enddate.getDate() - 1) +" "+ tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
        //var endddate = (enddate.getFullYear() + 1) + '-' + (enddate.getMonth() + 1) + '-' + (enddate.getDate() - 1) + 'T' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
        console.log("endDate", endddate);


        //console.log("endDate", in_a_week);
        this.state.policyRequest["Policy Start Date"] = date;
        this.state.policyRequest["Policy End Date"] = endddate;
        this.state.policyRequest.PaymentInfo[0].RefrenceNumber = this.state.random.toFixed();
        console.log("ppreq", this.state.policyRequest);
        let calculateDto = this.state.policyRequest;
        calculateDto.stateCode = this.state.premiumDTO.stateCode;
        calculateDto.si = this.state.premiumDTO.si;
        calculateDto.noOfPC = this.state.premiumDTO.noOfPC;
        calculateDto.noOfTW = this.state.premiumDTO.noOfTW;
        calculateDto.driverAge = this.state.premiumDTO.driverAge;
        calculateDto.driverExp = this.state.premiumDTO.driverExp;
        calculateDto.additionalDriver = this.state.premiumDTO.additionalDriver;
        calculateDto.billingFrequency = this.state.premiumDTO.billingFrequency;
        console.log("calculateDto.InsurableItem[1].RiskItems.length", calculateDto.InsurableItem[1].RiskItems.length);

        for (var i = 0; i < calculateDto.InsurableItem[1].RiskItems.length; i++) {
            calculateDto.InsurableItem[1].RiskItems[i]["Vehicle Type"] = this.state.vehType;
        }

        calculateDto.InsurableItem[0].RiskCount = this.state.drivercount;
        calculateDto.InsurableItem[1].RiskCount = 1;
        console.log("calculateDto.InsurableItem[0].RiskCount", calculateDto.InsurableItem[0].RiskCount, calculateDto.InsurableItem[1].RiskCount);
       
        this.setState({ calculateDto });
        console.log("calculateDto", calculateDto);
        let startDate = this.state.policyRequest["Policy Start Date"];
        //if (this.state.policyRequest["Policy Start Date"] != "") {
        //    this.state.policyRequest["Policy Start Date"] = this.datechange(this.state.policyRequest["Policy Start Date"]);
        //}

        fetch(`${EdelweissConfig.PolicyConfigUrl}/api/Policy/CreateProposal`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('edelweisstoken')
                //'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI5NTc4NmM2OS0xNjAxLTQzMGQtODM1Ni01M2RlNDUyZjUxZTYiLCJFbWFpbCI6InZpdGFsQGludWJlc29sdXRpb25zLmNvbSIsIk9yZ0lkIjoiMTEyIiwiUGFydG5lcklkIjoiMCIsIlJvbGUiOiJEZW1vIFJvbGUiLCJOYW1lIjoidml0aGFsIiwiVXNlck5hbWUiOiJ2aXRhbEBpbnViZXNvbHV0aW9ucy5jb20iLCJQcm9kdWN0VHlwZSI6Ik1pY2EiLCJTZXJ2ZXJUeXBlIjoiMSIsImV4cCI6MTY3MDY1NDMzMCwiaXNzIjoiSW51YmUiLCJhdWQiOiJJbnViZU1JQ0EifQ.nZsItQ97TGtSZ-IrZ8SlDeOCIKnaCI4tmeLC953z9qA'
            },
            body: JSON.stringify(this.state.policyRequest)
        }).then(response => response.json())
            .then(data => {
                console.log("proposalrespata", data)
                console.log("respdata", data.response);
                this.setState({ proposalNo: data.id })
                if (data.status == 2) {
                    //this.setState({ activeStep: this.state.activeStep + 1, step5: false, step6: true });
                    this.setState({ redirect: true })
                    swal({
                        //let res = partnerId.toString();
                        text: data.responseMessage,
                        icon: "success"
                    });
                } 
                  else {
                    swal({
                        text: data.responseMessage,
                        icon: "error"
                    });
                }   
                //else if (data.status == 7 && data.errors!=[]) {
                //    swal({
                //        text: data.errors[0].errorMessage,
                //        icon: "error"
                //    });
                //}
              
            });
        this.state.policyRequest["Policy Start Date"] = startDate;
    }
    //

    //step 7
    renderRedirect = () => {
        if (this.state.redirect === true) {
            return <Redirect to={{
                pathname: '/pages/StartDate',
                state: { proposalNo: this.state.proposalNo, quotationDto: this.state.quotationDto, policyRequest: this.state.policyRequest, premiumDTO: this.state.premiumDTO, vehType: this.state.vehType, drMakeModel: this.state.drMakeModel, amount: this.state.amount }
            }} />
        }
    }
    proposalRedirect = () => {

        this.setState({ activeStep: this.state.activeStep + 1, step4: false, step5: true });

    }
    //handleSubmit = () => {
    //    swal({
    //        text: "Do Service",
    //        icon: "error"
    //    })f
    //}

    componentDidMount() {
        const min = 1;
        const max = 100;
        const rand = min + Math.random() * (max - min);
        //const rand = Math.random();
        this.setState({ random: this.state.random + rand });
        const edelweisstoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJjNTFhYmQ0Mi0zZDEyLTRkODctOTI5OS1iOTY0MGUzMmU3ZjIiLCJFbWFpbCI6ImphZ3VhcnJpZGVyMThAZ21haWwuY29tIiwiT3JnSWQiOiIxMTIiLCJQYXJ0bmVySWQiOiIwIiwiUm9sZSI6ImlOdWJlIEFkbWluIiwiTmFtZSI6IkdvcGkiLCJVc2VyTmFtZSI6ImphZ3VhcnJpZGVyMThAZ21haWwuY29tIiwiUHJvZHVjdFR5cGUiOiJNaWNhIiwiU2VydmVyVHlwZSI6IjI5OCIsImV4cCI6MTYxNDUwNzU0OSwiaXNzIjoiSW51YmUiLCJhdWQiOiJJbnViZU1JQ0EifQ.MxIIyauo1RUqJfaAZNKIuVDKMjpsM8ax1NYGE1Wq3Sk';
        localStorage.setItem('edelweisstoken', edelweisstoken);
        if (this.props.location.state != undefined) {
            this.state.vehType = this.props.location.state.vehicleType;
            this.state.drMakeModel = this.props.location.state.makeModel;
            //this.state.policyRequest.InsurableItem[1].RiskItems[0].MakeModel = this.props.location.state.makeModel;
            this.state.premiumperday = this.state.quotationDto.premium;
            this.setState({ quotationDto: this.props.location.state.quotationDTO });
            //this.state.premiumDto.premiumObj.dictionary_rate.PDAGERT_PAge = this.props.location.state.quotationDTO.age;
            //this.state.premiumDto.premiumObj.dictionary_rate.DEXPRT_Exp = this.props.location.state.quotationDTO.experience;
            let premium = this.state.premiumDTO;
            let quotation = this.state.quotationDto;
            premium.driverAge = this.props.location.state.quotationDTO.age;
            premium.driverExp = this.props.location.state.quotationDTO.experience;
            premium.billingFrequency = this.props.location.state.quotationDTO.frequency;
            premium.si = this.props.location.state.quotationDTO.sumInsured;
            premium.stateCode = this.props.location.state.stateCode;
            premium.noOfPC = this.props.location.state.numofpc;
            premium.noOfTW = this.props.location.state.numoftw;

            //let premrday = this.state.premiumperday;
            //premrday = this.props.location.state.quotationDTO.premium;


            this.CalCulatePremium(this.state.drivercount);
            premium.additionalDriver = this.props.location.state.quotationDTO.numberOfDrivers;
            this.setState({ premium });
            let amount = this.state.premiumDTO.si;
            //premium.si
            this.setState({ selectedSI: this.state.suminsured[this.state.selectedSI].mID, selectedamount: amount, opendialog: false });

            console.log("premddto", this.state.premiumDTO);
            console.log("data", this.state.masterList);
        }
    }

    render() {
        const { classes, loggingIn } = this.props;
        let btn1_class = this.state.btn1color ? "warning" : "default";
        let btn2_class = this.state.btn2color ? "warning" : "default";
        let btn3_class = this.state.btn3color ? "warning" : "default";


        return (
            <div className={classes.container}>
                <GridContainer justify="center">
                    <GridItem xs={12}>
                        <Card>
                            <Stepper activeStep={this.state.activeStep} alternativeLabel connector={<QontoConnector />}>
                                {this.state.steps.map((item, key) => (
                                    <Step key={key} style={{ color: '#E7AB37' }} onClick={(e) => this.handlestep(key, e)}>
                                        <StepLabel>{item.label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                            {/*  {this.state.activeStep === this.state.steps.length ? (
                                <div>
                                    <Typography >All steps completed</Typography>
                                    <Button onClick={this.handleReset}>Reset</Button>
                                </div>
                            ) : (
                                    <div>
                                       <Typography>{this.getStepContent(this.state.activeStep)}</Typography>
                                            <div>
                                                    <MUIButton
                                                    disabled={this.state.activeStep === 0}
                                                    onClick={this.handleBack}
                                                //className={classes.backButton}
                                                >Back</MUIButton>
                                                <Button variant="contained" color="primary" onClick={this.handleNext}>
                                                    {this.state.activeStep === this.state.steps.length - 1 ? 'Finish' : 'Next'}
                                                </Button>
                                            </div>
                                    </div>
                                )}*/}
                        </Card>
                    </GridItem>
                </GridContainer>
                <GridContainer className="Container-padding">
                    <GridItem lg={6}>
                        <Card >
                            <CardBody>
                                {this.state.step1 ?
                                    <div> {/*step 1 starts*/}
                                        <GridContainer justify="center">
                                            <h4 style={{ fontSize: "26px" }}>Driver</h4>
                                            <GridItem>
                                                <Tooltip title="Driver 1" placement="bottom" >
                                                    <IconButton justIcon round simple color="default" onClick={this.driver1}><LooksOneIcon fontSize="large" /></IconButton>
                                                </Tooltip>
                                                <Tooltip title="Driver 2" placement="bottom" >
                                                    <IconButton justIcon round simple color="default" onClick={this.driver2}><LooksTwoIcon fontSize="large" /></IconButton>
                                                </Tooltip>
                                                <Tooltip title="Driver 3" placement="bottom" >
                                                    <IconButton justIcon round simple color="default" onClick={this.driver3}><Looks3Icon fontSize="large" /></IconButton>
                                                </Tooltip>
                                            </GridItem>
                                        </GridContainer>
                                        <Divider />
                                        <h3>Choose sum insured</h3>
                                        <GridItem>
                                            <GridContainer justify="center">
                                                <ButtonGroup size="large" color="primary" aria-label="contained primary button group">
                                                    <GridItem xs={6}>
                                                        <Button variant="outlined" round size="large" color={btn1_class} onClick={this.handleSI1}>3,00,000</Button>
                                                    </GridItem>
                                                    <GridItem xs={6}>
                                                        <Button variant="outlined" round size="large" color={btn2_class} onClick={this.handleSI2}>7,00,000</Button>
                                                    </GridItem>
                                                    <GridItem xs={6}>
                                                        <Button variant="outlined" round size="large" color={btn3_class} onClick={this.handleopenDialog}>{this.state.selectedamount}</Button>
                                                        <Dialog style={{ textAlign: "center" }} onClose={this.handlecloseDialog} aria-labelledby="simple-dialog-title" open={this.state.opendialog} >
                                                            <DialogTitle id="simple-dialog-title"> <b>Sum Insured Amount</b> </DialogTitle>
                                                            <DialogContent dividers>
                                                                {this.state.suminsured.map(function (item, key) {
                                                                    return (
                                                                        <List round button>
                                                                            <ListItem button id="padding-list-item" selected={this.state.selectedSI === item.mID} onClick={e => this.handleselectedSI(e, key)} >
                                                                                <ListItemText>
                                                                                    ₹{item.label}
                                                                                </ListItemText>
                                                                            </ListItem>
                                                                        </List>
                                                                    );
                                                                }.bind(this))}
                                                            </DialogContent>
                                                        </Dialog>
                                                    </GridItem>
                                                </ButtonGroup>
                                            </GridContainer>
                                        </GridItem>
                                        <br />
                                        <br />
                                        <GridContainer>
                                            <GridItem>
                                                <CustomCheckbox
                                                    name="tppolicy"
                                                    labelText="This vehicle is covered under a TP policy"
                                                    value={this.state.Checkbox.tppolicy}
                                                    onChange={(e) => this.handleCheckbox(e)}
                                                    //disabled={(item.disable == true) ? true : null}
                                                    //checked={item.mIsRequired}
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem>
                                                <CustomCheckbox
                                                    name="declaration"
                                                    labelText="Declaration goes here"
                                                    value={this.state.Checkbox.declaration}
                                                    onChange={(e) => this.handleCheckbox(e)}
                                                    //disabled={(item.disable == true) ? true : null}
                                                    //checked={item.mIsRequired}
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer justify="center">
                                            <Button color="primary" round onClick={this.quickbuy}>Quick Buy</Button>
                                        </GridContainer>
                                    </div> /*step 1 ends*/
                                    : null}
                                {this.state.step2 ?
                                    <div> {/*step 2 starts*/}
                                        <GridContainer justify="center">
                                            <GridItem>
                                                <GridContainer justify="center">
                                                    {/* <GridItem>
                                                        <MasterDropdown
                                                            labelText="Title"
                                                            id="ddlstatus"
                                                            lstObject={[]}
                                                            filterName=''
                                                            value=''
                                                            //name='year'
                                                            //onChange={this.onInputChange}
                                                            formControlProps={{ fullWidth: true }} />
                                                    </GridItem>*/}
                                                    <CustomInput
                                                        labelText="Name"
                                                        id="email_adress"
                                                        name="primaryDriverName"
                                                        value={this.state.quotationDto.primaryDriverName}
                                                        onChange={this.onCustomInputChange}
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                    />
                                                </GridContainer>
                                                <GridContainer>
                                                    <CustomInput
                                                        labelText="Mobile Number"
                                                        id="email_adress"
                                                        name="contactNumber"
                                                        value={this.state.sendotp.contactNumber}
                                                        onChange={this.onInputChange}
                                                        inputType="number"
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                    />
                                                    <StyleButton color="default" style={{ fontSize: "0.7rem" }} round disabled={this.state.disablesendotp} onClick={this.SendOTP}>send OTP</StyleButton>
                                                    <MuiButton color="primary" style={{ fontSize: "0.7rem", position: "relative", left: "21rem" }} disabled={this.state.disableresendotp} round onClick={this.ResetOTP}>send Again</MuiButton>
                                                    <CustomInput
                                                        labelText="Enter OTP"
                                                        id="email_adress"
                                                        name="otp"
                                                        value={this.state.sendotp.otp}
                                                        onChange={this.onInputChange}
                                                        inputType="number"
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                    />
                                                </GridContainer>
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer justify="center">
                                            <Button color="primary" round onClick={this.quickbuyProceed}>Proceed</Button>
                                        </GridContainer>
                                    </div> /*step 2 ends*/
                                    : null}

                                {this.state.step3 ?
                                    <div>   {/*Step 4 starts*/}
                                        <GridContainer justify="center">
                                            <h3>Billing Frequency</h3>
                                        </GridContainer>
                                        <GridContainer justify="center">
                                            <GridItem>
                                                <FormControlLabel
                                                    control={
                                                        <Radio
                                                            checked={this.state.ParticipantMaster.isActive === '60'}
                                                            onChange={this.handleRadioOnChange}
                                                            value={'60'}
                                                            name="Monthly"
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
                                                />
                                            </GridItem>
                                            <GridItem>
                                                <FormControlLabel
                                                    control={
                                                        <Radio
                                                            checked={this.state.ParticipantMaster.isActive === '365'}
                                                            onChange={this.handleRadioOnChange}
                                                            value={'365'}
                                                            name="Yearly"
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
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer justify="center">
                                            <GridItem>
                                                {this.state.hidecheck ?
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
                                                    />
                                                    : null}
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer justify="center">
                                            <Button round color="primary" onClick={this.quickbuyBilling}> Done</Button>
                                        </GridContainer>
                                    </div>  //step 4 ends
                                    : null}
                                {this.state.step4 ?
                                    <div>       {/* step 5 start*/}
                                        <GridContainer justify="center">
                                            <h1>Payment</h1>
                                            <GridContainer justify="center">
                                                <GridItem>
                                                    <table>
                                                        <tbody style={{ lineHeight: "1.18rem" }}>
                                                            <tr>
                                                                <td style={{ fontWeight: "400" }}>Fire & Theft: </td>
                                                                <td style={{ fontSize: "1rem", textAlign: "right" }}>₹<b>{this.state.ft365days}</b>/-</td>
                                                            </tr>
                                                            <tr>
                                                                {/* <td style={{ fontWeight: "400" }}>AD for {this.state.fordays} Days: </td>*/}
                                                                <td style={{ fontWeight: "400" }}>AD {/* {this.state.ParticipantMaster.isActive} Days:*/} </td>
                                                                <td style={{ fontSize: "1rem", textAlign: "right" }}>₹<b>{this.state.adpremium}</b>/-</td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ fontWeight: "400" }}>GST: </td>
                                                                <td style={{ fontSize: "1rem", textAlign: "right" }}>₹<b>{this.state.gsttax}</b>/-</td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ fontWeight: "400" }}>Total: </td>
                                                                <td style={{ fontSize: "1rem", textAlign: "right" }}>₹<b>{this.state.policyRequest.PaymentInfo[0].Amount}</b>/-</td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ fontWeight: "400" }}><h6>I authorize EGIC to bill me upto a maximum ₹<b>{this.state.monthlypremium}</b>/- Per month</h6></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </GridItem>
                                            </GridContainer>
                                            <GridItem>
                                                {this.renderRedirect()}
                                                <Button round color="primary" onClick={this.proposalRedirect}> Go</Button>
                                            </GridItem>
                                        </GridContainer>
                                    </div> // step 5 ends
                                    :
                                    null}
                                {this.state.step5 ?
                                    <div>{/*step 6 starts*/}
                                        <GridContainer justify="center">
                                            <GridItem>
                                                <h5 style={{ textAlign: "center" }}>Thank you for purchasing “Pay as you go Product”</h5>
                                                <br />
                                                <br />
                                                <h4 style={{ textAlign: "center" }}>You are 1 step away from activating your cover</h4>
                                                <h6 style={{ textAlign: "center" }}>(Note – Your cover will not commence on your specified date unless you download the app and activate it) </h6>
                                                <br />
                                                <h5 style={{ textAlign: "center" }}>Simply download the app and activate your cover</h5>
                                                <br />
                                            </GridItem>

                                            <GridContainer justify="center">
                                                <GridItem>
                                                    <a href="https://play.google.com/store?hl=en"> <img src={andriodapp} style={{ width: "8.8rem" }} /> </a><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                    <a href="https://www.apple.com/in/ios/app-store/" ><img src={iosapp} style={{ width: "10rem" }} /></a>
                                                    {/*<MuiButton>IOS Application</MuiButton>
                                                <MuiButton>Andriod Application</MuiButton>*/}
                                                </GridItem>
                                            </GridContainer>
                                            <GridContainer justify="center">
                                                <GridItem>
                                                    {this.renderRedirect()}
                                                    <Button round color="primary" onClick={this.handlepayment}>Success</Button>
                                                    <Button round color="primary">Failure</Button>
                                                </GridItem>
                                            </GridContainer>
                                        </GridContainer>


                                    </div>//step 6 ends
                                    : null}

                            </CardBody>
                        </Card>


                    </GridItem>

                    <GridItem lg={6}>
                        <Card >
                            <CardBody>
                                <GridContainer justify="center">
                                    <GridItem>
                                        <h1 style={{ fontSize: "3em", padding: "0.5rem" }}>Only ₹<b style={{ color: "#E7AB37" }}>{this.state.premiumperday}</b>/- per day</h1>
                                    </GridItem>
                                </GridContainer>
                                <Divider />
                                <GridContainer justify="center">
                                    <h3 style={{ fontWeight: "500" }}>Number of Drivers: {this.state.drivercount}</h3>
                                </GridContainer>
                                <GridContainer justify="center">
                                    <h3 style={{ fontWeight: "500" }}>Selected amount: ₹ <b style={{ color: "#E7AB37" }}>{this.state.selectedamount}</b>/-</h3>
                                </GridContainer>
                                <GridContainer justify="center">
                                    <GridItem >
                                        <MuiButton variant="outlined" round color="primary">
                                            <div>
                                                <a href="/EdelweissBenefitIllustrator.pdf" download="BenefitIllustrator">download the benefit illustrator</a>
                                            </div>
                                        </MuiButton>
                                    </GridItem>
                                </GridContainer>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div >

        );
    }
}

DriverPage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(DriverPage);