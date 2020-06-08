import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Datetime from "react-datetime";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Button from "components/CustomButtons/Button.jsx";
import IconButton from '@material-ui/core/IconButton';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import FilterNone from "@material-ui/icons/FilterNone";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import $ from 'jquery';
import bindModel from 'components/ModelBinding/bindModel.js';
import Employee from "modules/Users/views/UserManagement/Employee.jsx";
import Partner from "modules/Users/views/UserManagement/Partner.jsx";
import CreateUser from "modules/Users/views/UserManagement/_CreateUser.jsx";
import UserConfig from 'modules/Users/UserConfig.js';
import Icon from "@material-ui/core/Icon";
import CountUp from 'react-countup';
import { Animated } from "react-animated-css";

import ArrowForward from '@material-ui/icons/ArrowForward';


import CreateQuotation from "modules/NewBusiness/Quotation/CreateQuotation.jsx";

import Load from "modules/NewBusiness/Quotation/LoadQuotation.jsx";
import generatequotation from "assets/img/generate-quotation.png";
import loadquotation from "assets/img/load-quotation.png";

const style = {
    infoText: {
        fontWeight: "300",
        margin: "10px 0 30px",
        textAlign: "center"
    },
    inputAdornmentIcon: {
        color: "#555"
    },
    choiche: {
        textAlign: "center",
        cursor: "pointer",
        marginTop: "20px"
    },
    ...customSelectStyle,
    ...customCheckboxRadioSwitch
};

const radioAlign = {
    margin: "0 auto",
    textAlign: "center"
}

const validateBtn = {
    height: "35px",
    marginTop: "-10px",
}

class Quotation extends React.Component {
    constructor(props) {
        super(props);
        console.log("artprops", props);
        this.state = {
            Quoteflag: true,
            QutationValues: [],
            contactId:"",
            QuotationData: {
                "contactId": "",
                "prospectId": null,
                "prospectType": "",
                "prospectName": "Brajesh",
                "prospectLastName": "Kumar",
                "prospectMobile": "9902310906",
                "prospectHome": "Bihar",
                "prospectWork": "1234567890",
                "prospectEmail": "dfsjdghkjlk",
                "prospectNicNo": "",
                "leadNo": null,
                "leadDate": null,
                "dob": null,
                "place": "UP",
                "salutation": "Mrs",
                "prospectDaysleft": 3,
                "fullName": " Brajesh Kumar",
                "contactID": null,
                "ageAtNxtBday": 0,
                "address1": null,
                "address2": null,
                "address3": null,
                "city": null,
                "state": null,
                "pincode": null,
                "district": null,
                "province": null,
                "occupation": null,
                "salary": null,
                "passport": "ewtrtykuiol234567"
            },
            Showflag: false,
            Loadflag: true,
            ShowLoad:false,
            radioVal: "",
            empFlag: false,
            visibility: false,
            partFlag: false,
            redirect: false,
            selectedValue: null,
            employeeid: "",
            employeeidState: "",
            isUser: false,
            partnerid: "",
            partneridState: "",
            uid: "",
            firstName: "",
            firstNameState: "",
            middleName: "",
            middleNameState: "",
            lastName: "",
            lastNameState: "",
            maritalStatus: "",
            maritalStatusState: "",
            addressLine1: "",
            addressLine1State: "",
            addressLine2: "",
            addressLine2State: "",
            addressLine3: "",
            addressLine3State: "",
            contactNumber: "",
            contactNumberState: "",
            landLineResidence: "",
            landLineResidenceState: "",
            email: "",
            emailState: "",
            panNo: "",
            panNoState: "",
            branchName: "",
            branchNameState: "",
            branchCode: "",
            branchCodeState: "",
            emailvaidation: "",
            branchCodeState: "",
            UName: "",
            user: {
                "id": "",
                "userName": "",
                "email": "",
                "emailConfirmed": true,
                "passwordHash": "",
                "securityStamp": "",
                "concurrencyStamp": "",
                "phoneNumber": "",
                "phoneNumberConfirmed": true,
                "twoFactorEnabled": true,
                "lockoutEnabled": true,
                "accessFailedCount": 0,
                "tblUserDetails": [
                ]
            },
            masterList: [],
            errormessage: false,
            UserData:
            {
                "userId": "",
                "userName": "",
                "status": true,
                "createdBy": "",
                "createdDate": "",
                "locked": true,
                "lockedReason": "",
                "lockStartDate": "",
                "lockEndDate": "",
                "lockMechanism": true,
                "officeId": 0,
                "firstName": "",
                "middleName": "",
                "lastName": "",
                "countryId": "",
                "stateId": "",
                "districtId": "",
                "cityId": "",
                "addressLine1": "",
                "addressLine2": "",
                "addressLine3": "",
                "pincodeId": "",
                "employeeNumber": "",
                "dob": "",
                "doj": "",
                "genderId": "",
                "email": "",
                "passportNumber": "",
                "drivingLicenceNumber": "",
                "contactNumber": "",
                "userTypeId": "",
                "panNo": "",
                "lastLoginDateTime": "",
                "isIos": true,
                "isAndroid": true,
                "isWindows": true,
                "isPasswordChanged": true,
                "landLineOffice": "",
                "landLineResidence": "",
                "partnerId": "",
                "branchName": "",
                "branchCode": "",
                "designation": "",
                "maritalStatusId": ""
            },
            InitialUserData:
            {

                "userId": "",
                "userName": "",

                "status": true,
                "createdBy": "",
                "createdDate": "",
                "locked": true,
                "lockedReason": "",
                "lockStartDate": "",
                "lockEndDate": "",
                "lockMechanism": true,
                "officeId": 0,
                "firstName": "",
                "middleName": "",
                "lastName": "",
                "countryId": "",
                "stateId": "",
                "districtId": "",
                "cityId": "",
                "addressLine1": "",
                "addressLine2": "",
                "addressLine3": "",
                "pincodeId": "",
                "employeeNumber": "",
                "dob": "",
                "doj": "",
                "genderId": "",
                "email": "",
                "passportNumber": "",
                "drivingLicenceNumber": "",
                "contactNumber": "",
                "panNo": "",
                "lastLoginDateTime": "",
                "isIos": true,
                "isAndroid": true,
                "isWindows": true,
                "isPasswordChanged": true,
                "landLineOffice": "",
                "landLineResidence": "",
                "partnerId": "",
                "branchName": "",
                "branchCode": "",
                "designation": "",
                "maritalStatusId": ""
            },
            LocationDTO: {
                "Country": [],
                State: [],
                District: [],
                City: [],
                Pincode: []
            },
            errors: {},
            fields: {}
        };
        //this.assignrolesubmit = this.assignrolesubmit.bind(this);
      
    }
    SetValue = ((type, event) => {

        event.preventDefault();
        let LeadDTO = this.state.QuotationData;
        let name = event.target.name;
        let value = event.target.value;
        LeadDTO[name] = value;
        this.setState({ LeadDTO })
    });

    componentDidMount() {

        if (this.props.location.state !== undefined) {
            console.log("quotationdata1", this.props.location.state.contactId)
            this.setState({ Showflag: true, ShowLoad: false, Loadflag: false, contactId: this.props.location.state.contactId });

    }
}

    Quotefun = () => {
        this.setState({ Quoteflag: false, Showflag: true })
    }

    LoadFun = () => {
        this.setState({ Loadflag: false, ShowLoad:true })
        }

    render() {
        const { classes } = this.props;
        return (
            <div>
                {this.state.Loadflag &&<div>
                    {this.state.Quoteflag &&
                       <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                       <GridContainer lg={12}>
                            <GridItem xs={4}>
                                <Card>
                                    <CardHeader color="rose" icon>
                                        <CardIcon color="rose">
                                            <Icon><img id="icon" src={generatequotation} /></Icon>
                                    </CardIcon>
                                    <Typography className="right" variant="h3" component="h5">
                                        <CountUp
                                            className="account-balance"
                                            start={0}
                                            end={26}
                                            duration={3.75}
                                            useEasing={true}
                                            useGrouping={true}
                                            separator=" "
                                        /></Typography>
                                    </CardHeader>
                                    <CardActionArea>
                                    </CardActionArea>
                                    <CardContent>

                                        <Typography variant="h6" color="textSecondary" component="h4">
                                            Generate Quotation
          </Typography>




                                    </CardContent>
                                    <GridContainer style={{ marginTop: "-62px" }} justify="flex-end" xs={12}>
                                        <CardActions >
                                            <IconButton onClick={this.Quotefun}>

                                                <ArrowForward />
                                            </IconButton>
                                        </CardActions>
                                    </GridContainer>


                                </Card>
                            </GridItem>
                            <GridItem xs={4}>
                                <Card>
                                    <CardHeader color="rose" icon>
                                        <CardIcon color="rose">
                                            <Icon><img id="icon" src={loadquotation}/></Icon>
                                        </CardIcon>

                                        <Typography className="right" variant="h3" component="h5">
                                            <CountUp
                                                className="account-balance"
                                                start={0}
                                                end={56}
                                                duration={3.75}
                                                useEasing={true}
                                                useGrouping={true}
                                                separator=" "
                                            /></Typography>
                                    </CardHeader>
                                    <CardActionArea>
                                    </CardActionArea>
                                    <CardContent>

                                        <Typography variant="h6" color="textSecondary" component="h4">
                                            Load Quotation
          </Typography>





                                    </CardContent>
                                    <GridContainer style={{ marginTop: "-62px" }} justify="flex-end" xs={12}>
                                        <CardActions >
                                            <IconButton onClick={this.LoadFun}>
                                                <ArrowForward />
                                            </IconButton>
                                        </CardActions>
                                    </GridContainer>


                                </Card>
                            </GridItem>

                        </GridContainer>
                        </Animated>
                    }</div>}
                {this.state.Showflag &&
                    <CreateQuotation QutationValues={this.state.QutationValues} QuotationData={this.state.QuotationData} contactId={this.state.contactId} SetValue={this.SetValue}/>
                }

                {
                    this.state.ShowLoad &&
                    <Load/>
                }


            </div>
        );
    }
}

export default withStyles(style)(Quotation);

