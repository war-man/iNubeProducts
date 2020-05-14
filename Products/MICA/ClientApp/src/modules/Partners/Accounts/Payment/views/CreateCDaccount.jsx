import React from "react";
import validationPage from "modules/Partners/Organization/views/ValidationPage.jsx";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
import PermIdentity from "@material-ui/icons/PermIdentity";
//import PropTypes from "prop-types";
import { Redirect } from 'react-router-dom';
// core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
//import Datetime from "react-datetime";
import Button from "components/CustomButtons/Button.jsx";
//import Paper from "@material-ui/core/Paper";
//import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx"
import CreateCDAccountPage from "./CreateCDAccountPage.jsx";
import paymentConfig from "../PaymentConfig.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import swal from 'sweetalert';
import Paper from '@material-ui/core/Paper';
import createcd from "assets/img/security.png";
import Icon from "@material-ui/core/Icon";
//import CustomRadioButton from "components/CustomRadiobutton/CustomRadiobutton.jsx";
import { Animated } from "react-animated-css";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import CommonMessage from "Messages/CommonMessage.jsx";

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
const header = {
    fontSize: "16px",
    color: "#333",
    fontSize: "500",
    lineHeight: "1"


}

class CreateCDaccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errormessage: false,
            required: true,
            disabled: false,
            simpleSelect: "",
            partnerName: "",
            productName: "",
            dropLimit: "",
            dropLimitState: "",
            thresholdValueState: "",
            droplimit: false,
            thresholdValue: "",
            redirect: false,
            PartnerData: [],
            ProductData: [],
            PolicyData: [],
            datalist: [],
            List: "",
            topics: [],
            fields: {
                PartnerId: "",
                ProductId: "",

            },
            show: false,
            CDaccountDTO:
                {
                    lob: "",
                    cob: "",
                    threshold: "",
                    droplimit: "",
                    PartnerId: "",
                    ProductId: ""
                },
            cdAccountsDTO: {
                // "cdid": 0,
                "partnerId": "",
                //"partnerName": "",
                //"productName":"",
                "productId": "",
                "lob": "",
                "cob": "",
                "thresholdValue": "",
                "dropLimit": "",
                "cdid": 0,
                "partnerId": "",
                "productId": "",
                "accountNo": "",
                "initialAmount": "",
                "availableBalance": "",
                "ledgerBalance": "",
                "thresholdValue": "",
                "dropLimit": "",
                "isLocked": true,
                "paymentType": "",
                "remark": "",
                "lob": "",
                "cob": "",
                "active": true,
                "createdDate": "",
                "partnerName": "",
                "productName": "",
                "tblCdtransactions": [
                ]
            },
            resetcdAccountsDTO: {
                // "cdid": 0,
                "partnerId": "",
                //"partnerName": "",
                //"productName":"",
                "productId": "",
                "lob": "",
                "cob": "",
                "thresholdValue": "",
                "dropLimit": "",
                "cdid": 0,
                "partnerId": "",
                "productId": "",
                "accountNo": "",
                "initialAmount": "",
                "availableBalance": "",
                "ledgerBalance": "",
                "thresholdValue": "",
                "dropLimit": "",
                "isLocked": true,
                "paymentType": "",
                "remark": "",
                "lob": "",
                "cob": "",
                "active": true,
                "createdDate": "",
                "partnerName": "",
                "productName": "",
                "tblCdtransactions": [
                ]
            },
            paymentdetailsmodel: {
                "sno": "",
                "cdAccountnumber": "",
                "partnerId": "",
                "partnerName": "",
                "productId": "",
                "productName": "",
            }
        }
    };
    change(event, stateName) {

        console.log("come baby name", stateName);
        switch (stateName) {
            case "thresholdValue":
                if (validationPage.verifyCDvalue(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                    console.log("statename", stateName);
                    console.log("coming");
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                    console.log("not coming");
                    console.log("nostatename", stateName);
                }
                break;
            case "dropLimit":
                if (validationPage.verifyCDvalue(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                    console.log("statename", stateName);
                    console.log("coming");
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                    console.log("not coming");
                    console.log("nostatename", stateName);
                }
                break;

            default:
                break;
        }


    }
    setValue = (event) => {
        //event.preventDefault();
        //let ProductDTO = this.state.ProductDTO;
        //let name = event.target.name;
        //let value = event.target.value;
        //console.log('teset ' + event.target.value)
        //console.log('Event Details ', event)
        //ProductDTO[name] = value;
        //this.setState({ ProductDTO });

        event.preventDefault();
        let cdAccountsDTO = this.state.cdAccountsDTO;
        let name = event.target.name;
        let value = event.target.value;
        cdAccountsDTO[name] = value;
        console.log("name", name);
        console.log("value", value);
        this.setState({ cdAccountsDTO });
        this.change(event, name);
        console.log("data", this.state.cdAccountsDTO);
        if (name == "partnerId") {

            let pks = this.state.PartnerData[0].mdata.filter(item => item.mID == value);
            console.log("pks", pks);
            this.state.cdAccountsDTO.partnerName = pks[0].mValue;

            fetch(`${paymentConfig.partnerconfigUrl}/api/Partner/GetMasterDataAsync?sMasterlist=Product&partnerId=` + value, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
            })
                .then(response => response.json())
                .then(data => {

                    console.log("off", data);
                    this.setState({ datalist: data[0].mdata });

                    console.log("datalist", this.state.datalist);

                    let ProductData = this.state.ProductData;
                    ProductData = data;

                    this.setState({ ProductData });
                    console.log("ProductDatalist", this.state.ProductData);
                });

        }
        if (name == "productId") {
            let List = this.state.datalist.filter(item => item.mID == value);
            console.log("proid", List);
            this.state.cdAccountsDTO.productName = List[0].mValue;
            if (List.length > 0) {
                let cdAccountsDTO = this.state.cdAccountsDTO;
                cdAccountsDTO["lob"] = List[0].lob;
                cdAccountsDTO["cob"] = List[0].cob;
                this.setState({ disabled: true });
                this.setState({ cdAccountsDTO });
                console.log("cdAccountsDTO with lob", this.state.cdAccountsDTO);
            }
        }
        //if (this.state.cdAccountsDTO.thresholdValue < this.state.cdAccountsDTO.dropLimit) {
        //    this.setState({ droplimit: true });
        //} else {
        //    this.setState({ droplimit: false });
        //}
        this.Droplimitvalidation();
    }

    Droplimitvalidation = () => {
       
        if (eval(this.state.cdAccountsDTO.thresholdValue) < eval(this.state.cdAccountsDTO.dropLimit)) {
            this.setState({ droplimit: true });
        } else {
            this.setState({ droplimit: false });
        }
    }


    handleSimple = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onClick = () => {
        console.log(this.state.cdAccountsDTO.partnerName);
        console.log(this.state.cdAccountsDTO.productName);
        const { show } = this.state.show;
        this.setState({ show: true });
        let that = this;
        console.log("create payment", this.state.cdAccountsDTO);
        if (this.state.cdAccountsDTO.partnerId != "" && this.state.cdAccountsDTO.productId != "" && this.state.cdAccountsDTO.lob != "" && this.state.cdAccountsDTO.cob != "" && this.state.cdAccountsDTO.thresholdValue != "" && this.state.cdAccountsDTO.dropLimit != "" && eval(this.state.cdAccountsDTO.thresholdValue) > eval(this.state.cdAccountsDTO.dropLimit)) {
         
       
                fetch(`${paymentConfig.partnerconfigUrl}/api/Accounts/CreateCdAccount`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                    },
                    body: JSON.stringify(this.state.cdAccountsDTO)
                }).then(function (response) {
                    return response.json();
                }).then(function (data) {
                    console.log('Response data', data);
                    // this.setState({ topics: data });
                    if (data.status == 2) {
                        var msg = CommonMessage(data.messageKey, data.messageValue);
                        swal({
                            //text: data.responseMessage,
                            text: msg,
                            icon: "success"
                        });
                        that.reset();
                        //this.setState({ redirect: true });
                        //this.renderRedirect();
                     
                    } else if (data.status == 8) {
                     //   var msg = CommonMessage(AccountExi)
                        swal({
                            text: data.errors[0].errorMessage,
                            icon: "error"
                        });
                    } else if (data.status == 4) {
                        var msg = CommonMessage(data.messageKey, data.messageValue);
                        swal({
                            //text: data.errors[0].errorMessage,
                            text: msg,
                            icon: "error"
                        });
                    }

                });
            
        } else {
            var msg = CommonMessage("MissingField", []);
            //swal("", "Some fields are missing", "error");
            swal({
                text: msg,
                icon:"error"
            });
            this.setState({ errormessage: true });
            }

    }
    renderRedirect = () => {
        if (this.state.redirect == true) {
            return <Redirect to={{
                pathname: '/dashboard/home',

            }} />
        }
    }

    onInputChange = (evt) => {
        const fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
    };
    componentDidMount() {
        fetch(`${paymentConfig.partnerconfigUrl}/api/Partner/GetMasterDataAsync?sMasterlist=Partner`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ PartnerData: data });
            });
        console.log("partner list", this.state.PartnerData);
 
    }
    reset = () => {
        let cdAccountsDTO = this.state.cdAccountsDTO;
        cdAccountsDTO['partnerId'] = "";
        cdAccountsDTO['productId'] = "";
        cdAccountsDTO['cob'] = "";
        cdAccountsDTO['lob'] = "";
        cdAccountsDTO['dropLimit'] = "";
        cdAccountsDTO['thresholdValue'] = "";
        this.setState({ cdAccountsDTO });

    }

    render() {
        const { classes } = this.props;
        return (
            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                <Card>

                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                            {/*  <FilterNone /> */}
                            <Icon><img id="icon" src={createcd} /></Icon>
                        </CardIcon>
                        <h4>
                            <small><TranslationContainer translationKey="CreateCDAccount" /></small>
                        </h4>

                    </CardHeader>
                    <CardBody>
                        {this.renderRedirect()}
                        <div>
                            <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                                <CreateCDAccountPage classes={this.classes} errormessage={this.state.errormessage} handleSimple={this.handleSimple} required={this.state.required} disabled={this.state.disabled} SetValue={this.SetValue} PartnerData={this.state.PartnerData} ProductData={this.state.ProductData} fields={this.state.fields} onInputChange={this.onInputChange} setValue={this.setValue} cdAccountsDTO={this.state.cdAccountsDTO} />
                            </Animated>

                            <GridContainer>
                                <GridItem xs={12} sm={12} md={3}>
                                    <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                                        <CustomInput
                                            success={this.state.thresholdValueState == "success"}
                                            error={this.state.thresholdValueState == "error"}
                                            labelText="ThresholdLimit"
                                            name="thresholdValue"
                                            required={true}
                                            value={this.state.cdAccountsDTO.thresholdValue}
                                            onChange={this.setValue}
                                            inputType="number"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        /></Animated>
                                    {/*{this.state.errormessage && (this.state.cdAccountsDTO.thresholdValue == "") ? <p className="error">*Required field cannot be left blank</p> : null}*/}
                                    <span className="error">  {this.state.errormessage && (this.state.cdAccountsDTO.thresholdValue == "") ? CommonMessage("RequiredField", []) : null}</span>
                                    {(this.state.cdAccountsDTO.thresholdValue > 100) ? <p className="error">*Threshold Limit cannot be greater than 1000% </p> : null}



                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                                        <CustomInput
                                            success={this.state.dropLimitState == "success"}
                                            error={this.state.dropLimitState == "error"}
                                            labelText="DropLimit"
                                            required={true}
                                            name="dropLimit"
                                            value={this.state.cdAccountsDTO.dropLimit}
                                            onChange={this.setValue}
                                            inputType="number"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        /> </Animated>
                                   {/* {this.state.errormessage && (this.state.cdAccountsDTO.dropLimit == "") ? <p className="error">*Required field cannot be left blank</p> : null}*/}
                                    <span className="error">  {this.state.errormessage && (this.state.cdAccountsDTO.dropLimit == "") ? CommonMessage("RequiredField", []) : null}</span>
                                    {this.state.droplimit ? <p className="error">*Drop limit should not be greater than Threshold limit</p> : null}
                                </GridItem>



                            </GridContainer>

                            <GridContainer lg={12} justify="center" >
                                <GridItem xs={5} sm={3} md={3} lg={1}>
                                    <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                                        <Button color="info" onClick={this.onClick} round><TranslationContainer translationKey="Submit" /></Button>
                                    </Animated>
                                   
                                </GridItem>
                               
                            </GridContainer>

                        </div>

                      
                    </CardBody>
                </Card >
            </Animated>
        );
    }
}

export default withStyles(style)(CreateCDaccount);
