import React from "react";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import MappingCOA from "assets/img/Mapping-COA.png";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import AccountConfig from "modules/Accounts/AccountConfig.js";
import withStyles from "@material-ui/core/styles/withStyles";

import CustomInput from "components/CustomInput/CustomInput.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "components/CustomButtons/Button.jsx";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";
import { Animated } from "react-animated-css";
//import ReactTable from "react-table";
import ReactTable from 'components/MuiTable/MuiTable.jsx';
import swal from 'sweetalert';
import $ from 'jquery';
import validationPage from "./ValidationPage.jsx";
import ExportToExcel from "components/ExcelExport/ExcelPlugin/ExportToExcel.jsx";
import PageContentLoader from "components/Loaders/PageContentLoader.jsx";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";


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
function date() {
    var today = new Date();
    var date;
    var hrs = today.getHours();
    hrs = hrs < 10 ? '0' + hrs : hrs;
    var min = today.getMinutes();
    min = min < 10 ? '0' + min : min;
    var sec = today.getSeconds();
    sec = sec < 10 ? '0' + sec : sec;
    return date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + 'T' + hrs + ':' + min + ':' + sec;
}


class COAMapping extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                Account: "",
                MicaAccountCode: "",
                AccountType: "",
                Customer: "",
                AccountCode: "",
                AccountName: "",
                AccountDesc: "",
                isActive: "",
            },
            errormessage: false,
            displayGrid: false,
            flagCustomerAcCodeUpdated: false,
            newdata: [],
            fieldsArray: [],
            coaData: [],
            customerData: [],
            customerNameData: [],
            coaMappingListExcel: [],
            accId: "",
            AccountCodeState: false,
            AccountNameState: false,
            AccountDescState: false,
            flag: true,
            flagEdit: true,
            flagUpdate: false,
            flagEditTypee: false,
            //Loader
            isButtonVisibility: false,
            loader: true,
            pageloader: false,
            nodata: false,
            lstSheet: [
                {
                    data: [],
                    sheetName: "Coa Mapping Entry",
                    columnArray: [
                        {
                            Header: "MICAAccountType",
                            accessor: "micaAccountType",
                        },
                        {
                            Header: "MicaAccountCode",
                            accessor: "micaAccountCode",
                        },
                        {
                            Header: "MicaAccountName",
                            accessor: "micaAccountName",
                        },
                        {
                            Header: "CustomerName"
                        },
                        {
                            Header: "CustomerAccountCode "
                        },
                        {
                            Header: "CustomerAccountsName"
                        },
                        {
                            Header: "CustomerAccountDescription"
                        },
                    ]
                }
            ],
        };
    }
    onInputChangeEv = (type, event) => {
        const fields = this.state.fields;
        let name = event.target.name;
        //Check For Customer Account COde Is Editable or not 
        if (name == 'AccountCode') {
            this.setState({ flagCustomerAcCodeUpdated: true });
        }
        console.log(name, 'Event Target Name');
        fields[event.target.name] = event.target.value;
        this.setState({ fields });
        this.change(event, name, type);
    };
    onInputChange = (event) => {
        const fields = this.state.fields;
        let name = event.target.name;
        fields[event.target.name] = event.target.value;
        this.setState({ fields });
    }
    onHandleEvent = (evt) => {
        const fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        const type = this.state.coaData.filter(item => item.accountCode == evt.target.value);
        //this.setState({ coaData: type  });
        fields['AccountType'] = type[0].accountType;
        fields['Account'] = type[0].accountName;
        this.state.accId = type[0].accountId;

        this.setState({ fields });
    }
    componentDidMount() {
        fetch(`${AccountConfig.accountConfigUrl}/api/AccountConfig/GetAllAccountWithType`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ coaData: data });
                console.log(data);
            });
        fetch(`https://inubeservicesbilling.azurewebsites.net/api/Billing/GetCustomerName`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    setTimeout(
                        function () {
                            this.setState({ pageloader: true });
                        }
                            .bind(this),
                        2000
                    );
                    this.setState({ isButtonVisibility: true });
                }
                this.setState({ customerData: data });
                this.setState({ customerNameData: data });
                console.log(data);
            });
        //for Export to Excel
        fetch(`${AccountConfig.accountConfigUrl}/api/AccountConfig/GetCoaMappingDetails`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ coaMappingListExcel: data });
                console.log(this.state.coaMappingListExcel, 'Export to Excel');
                this.state.lstSheet[0].data = this.state.coaMappingListExcel;
            });
        console.log("listsheet: ", this.state.lstSheet)

        if (this.props.searchAccountMapId != undefined) {
            console.log(this.props.flagEdit, 'FlagEditProps');
            this.setState({ flagEdit: this.props.flagEdit, flagEditTypee: this.props.flagEditTypee, flag: false, flagUpdate: this.props.flagUpdate });
            fetch(`${AccountConfig.accountConfigUrl}/api/AccountConfig/GetCOAMappingById?accountMappingId=` + this.props.searchAccountMapId, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
            })
                .then(response => response.json())
                .then(data => {
                    //this.setState({ fields: data });
                    console.log("Coa data: ", data);

                    let fields = this.state.fields;
                    fields['Customer'] = data.customerId;
                    fields['MicaAccountCode'] = data.micaAccountCode;
                    fields['AccountType'] = data.accountType;
                    fields['Account'] = data.accountId;
                    fields['AccountCode'] = data.refAccountCode;
                    fields['AccountName'] = data.name;
                    fields['AccountDesc'] = data.description;
                    this.setState({ fields });

                });
        }
    }

    // While Updating for Modify Accounts
    onFormUpdate = (evt) => {
        debugger;
        this.state.fields.isActive = "Y";
        this.state.fields.CreatedDate = date();
        // Validation of Customer Account not to be Repeated
        const CoaDataValidate = this.state.coaMappingListExcel.filter(item => item.customerAcCode == this.state.fields.AccountCode);
        const CoaDataAcNameValidate = this.state.coaMappingListExcel.filter(item => item.customerName == this.state.fields.AccountName);
        //Checking Fields should not be Blank
        if (this.state.fields.AccountCode != "" && this.state.fields.AccountName != "" && this.state.fields.AccountDesc != "") {
            //Check weather Account Code is Updated or not if Updated den check for already present account Code
            if (this.state.flagCustomerAcCodeUpdated == true) {
                //Checking if length is 0 means Code Doesn't exists in Darabase so it will Execute 
                if (CoaDataValidate.length == 0 && CoaDataAcNameValidate == 0) {
                    var data = {
                        'accountId': this.state.fields.Account, 'refAccountCode': this.state.fields.AccountCode, 'name': this.state.fields.AccountName, 'customerId': this.state.fields.Customer, 'description': this.state.fields.AccountDesc, 'createdDate': date(), 'isActive': this.state.fields.isActive, 'accountType': this.state.fields.AccountType, 'micaAccountCode': this.state.fields.MicaAccountCode
                    };
                    fetch(`${AccountConfig.accountConfigUrl}/api/AccountConfig/ModifyCoaMapping?AccountMappingId=` + this.props.searchAccountMapId, {
                        method: 'put',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                        },
                        body: JSON.stringify(data)
                    }).then(data => {
                        swal({

                            text: "Successfully Updated",
                            icon: "success"
                        });
                        console.log("data save result:", data);
                        this.setState({ SavedData: data });
                    });
                }
                else {
                    if (CoaDataAcNameValidate != 0 && CoaDataValidate != 0) {
                        swal({
                            text: "Customer Account Name and Code Already Exists, Enter different Customer Name and Code",
                            icon: "error"
                        });
                    }
                    else if (CoaDataAcNameValidate != 0) {
                        swal({
                            text: "Customer Account Name Already Exists, Enter different Customer Name",
                            icon: "error"
                        });
                    }
                    else {
                        swal({
                            text: "Customer Account Code Already Exists, Enter different Customer Code",
                            icon: "error"
                        });
                    }
                }
            }
            else {
                var data = {
                    'accountId': this.state.fields.Account, 'refAccountCode': this.state.fields.AccountCode, 'name': this.state.fields.AccountName, 'customerId': this.state.fields.Customer, 'description': this.state.fields.AccountDesc, 'createdDate': date(), 'isActive': this.state.fields.isActive, 'accountType': this.state.fields.AccountType, 'micaAccountCode': this.state.fields.MicaAccountCode
                };
                fetch(`${AccountConfig.accountConfigUrl}/api/AccountConfig/ModifyCoaMapping?AccountMappingId=` + this.props.searchAccountMapId, {
                    method: 'put',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                    },
                    body: JSON.stringify(data)
                }).then(data => {
                    swal({

                        text: "Successfully Updated",
                        icon: "success"
                    });
                    console.log("data save result:", data);
                    this.setState({ SavedData: data });
                });
            }
        }
        else {
            swal({
                text: "Some fields are missing",
                icon: "error"
            });
        }
    }

    onFormSubmit = (evt) => {
        debugger;
        this.setState({
            fieldsArray: []
        })
        const CoaDataValidate = this.state.coaMappingListExcel.filter(item => item.customerAcCode == this.state.fields.AccountCode);
        const CoaDataAcNameValidate = this.state.coaMappingListExcel.filter(item => item.customerName == this.state.fields.AccountName)
        if (CoaDataValidate.length == 0 && CoaDataAcNameValidate == 0) {
            if (this.state.fields.Account != "" && this.state.fields.AccountType != "" && this.state.fields.Customer != "" && this.state.fields.AccountCode != "" && this.state.fields.AccountName != "" && this.state.fields.AccountDesc != "" && this.state.fields.MicaAccountCode != "") {
                const customerFiletrData = Object.assign({}, this.state.fields);
                this.state.fieldsArray.push(customerFiletrData);
                console.log(this.state.fieldsArray, 'Fields Array');
                let type = this.state.customerNameData.filter(item => item.customerId == this.state.fields.Customer);
                this.state.fieldsArray[0]['Customer'] = type[0].customerName;


                this.state.fields.isActive = "Y";
                this.state.fields.CreatedDate = date();
                var data = {
                    'accountId': this.state.accId, 'refAccountCode': this.state.fields.AccountCode, 'name': this.state.fields.AccountName, 'customerId': this.state.fields.Customer, 'description': this.state.fields.AccountDesc, 'createdDate': date(), 'isActive': this.state.fields.isActive, 'accountType': this.state.fields.AccountType, 'micaAccountCode': this.state.fields.MicaAccountCode
                };

                //After Saving Shows into Grid
                this.setState({ displayGrid: true });
                if (this.state.fieldsArray.length > 0) {
                    this.setState({
                        newdata: this.state.fieldsArray.map((prop, key) => {

                            return {
                                CustomerName: prop.Customer,
                                MicaAccountCode: prop.MicaAccountCode,
                                MicaAccountType: prop.AccountType,
                                MicaAccountName: prop.Account,
                                CustomerAccountCode: prop.AccountCode,
                                CustomerAccountName: prop.AccountName,
                                CustomerAccountDesc: prop.AccountDesc
                            };
                        })
                    });
                    console.log(this.state.newdata, 'New Data');
                }
                fetch(`${AccountConfig.accountConfigUrl}/api/AccountConfig/CreateMapping`, {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                    },
                    body: JSON.stringify(data)
                }).then(response => response.json())
                    .then(data => {
                        //swal({

                        //    text: data.responseMessage,
                        //    icon: "success"
                        //});
                        //console.log("data save result:", data);
                        //this.setState({ SavedData: data });
                        //});
                        if (data.status == 2) {

                            swal({

                                //   title: "Perfect",

                                text: data.responseMessage,
                                //  text: "Account Successfully Created",
                                icon: "success"
                            });
                            this.reset();
                            this.setState({ errormessage: false });
                            //this.setState({ redirect: true });
                            //this.renderRedirect();
                        } else if (data.status == 8) {

                            swal({
                                text: data.errors[0].errorMessage,
                                icon: "error"
                            });
                        } else if (data.status == 4) {

                            swal({
                                text: data.errors[0].errorMessage,
                                icon: "error"
                            });
                        }
                    });
            } else {
                swal("", "Some fields are missing", "error");
                this.setState({ errormessage: true });
            }
        }
        else {
            debugger
            if (CoaDataAcNameValidate != 0 && CoaDataValidate != 0) {
                swal({
                    text: "Customer Account Name and Code Already Exists, Enter different Customer Name and Code",
                    icon: "error"
                });
            }
            else if (CoaDataAcNameValidate != 0) {
                swal({
                    text: "Customer Account Name Already Exists, Enter different Customer Name",
                    icon: "error"
                });
            }
            else {
                swal({
                    text: "Customer Account Code Already Exists, Enter different Customer Code",
                    icon: "error"
                });
            }
        }

    }
    //Reset 
    reset = () => {
        //Setting States After Saving
        let accountDto = this.state.fields;
        accountDto['Account'] = "";
        accountDto['AccountType'] = "";
        accountDto['Customer'] = "";
        accountDto['AccountCode'] = "";
        accountDto['AccountName'] = "";
        accountDto['AccountDesc'] = "";
        accountDto['MicaAccountCode'] = "";
        this.setState({ accountDto });

        let status = this.state;
        status['AccountCodeState'] = "";
        status['AccountDescState'] = "";
        status['AccountNameState'] = "";
        this.setState({ status });
    }

    // For Validation 
    change(event, stateName, type, stateNameEqualTo, maxValue) {
        switch (type) {
            case "number":
                if (validationPage.verifyAccountCode(event.target.value)) {
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            case "string":
                if (validationPage.verifyName(event.target.value)) {
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            case "alphaNumeric":
                if (validationPage.verifyAlphaNumeric(event.target.value)) {
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            default:
                break;
        }
    }


    render() {
        const { classes } = this.props;
        return (
            <div>
                {this.state.pageloader ?
                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                        <Card >
                            {this.state.flag &&
                                <CardHeader color="rose" icon>
                                    <CardIcon color="rose">
                                        <Icon><img id="icon" src={MappingCOA} /></Icon>
                                    </CardIcon>
                                    {
                                        <h4 >
                                        <small><TranslationContainer translationKey="COAMapping" /> </small>
                                        </h4>
                                    }
                                </CardHeader>
                            }
                            <CardBody>

                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <FormControl
                                            fullWidth
                                            className={classes.selectFormControl}
                                        >
                                            <InputLabel
                                                htmlFor="simple-select"
                                                className={classes.selectLabel}
                                            >
                                                <TranslationContainer translationKey="Customer" />
                          </InputLabel>
                                            <Select
                                                value={this.state.fields.Customer}
                                                onChange={this.onInputChange}
                                                disabled={this.state.flagEditTypee}
                                                MenuProps={{
                                                    className: classes.selectMenu
                                                }}
                                                classes={{
                                                    select: classes.select
                                                }}
                                                inputProps={{
                                                    name: "Customer",
                                                    id: "simple-select"
                                                }}
                                            >
                                                {
                                                    this.state.customerData.map(item =>
                                                        <MenuItem
                                                            value={item.customerId}
                                                            classes={{
                                                                root: classes.selectMenuItem,
                                                                selected: classes.selectMenuItemSelected
                                                            }}
                                                        >
                                                            {item.customerName}
                                                        </MenuItem>
                                                    )
                                                }
                                            </Select>
                                        </FormControl>
                                        {this.state.errormessage && (this.state.fields.Customer == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <FormControl
                                            fullWidth
                                            className={classes.selectFormControl}
                                        >
                                            <InputLabel
                                                htmlFor="simple-select"
                                                className={classes.selectLabel}
                                            >
                                                <TranslationContainer translationKey="MICAAccountCode" />
                          </InputLabel>
                                            <Select
                                                value={this.state.fields.MicaAccountCode}
                                                onChange={this.onHandleEvent}
                                                disabled={this.state.flagEditTypee}
                                                MenuProps={{
                                                    className: classes.selectMenu
                                                }}
                                                classes={{
                                                    select: classes.select
                                                }}
                                                inputProps={{
                                                    name: "MicaAccountCode",
                                                    id: "simple-select"
                                                }}
                                            >
                                                {
                                                    this.state.coaData.map(item =>
                                                        <MenuItem
                                                            value={item.accountCode}
                                                            classes={{
                                                                root: classes.selectMenuItem,
                                                                selected: classes.selectMenuItemSelected
                                                            }}
                                                        >
                                                            {item.accountCode}
                                                        </MenuItem>
                                                    )
                                                }
                                            </Select>
                                        </FormControl>
                                        {this.state.errormessage && (this.state.fields.MicaAccountCode == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            labelText="MICAAccountType"
                                            id="AccountType"
                                            disabled={true}
                                            value={this.state.fields.AccountType}
                                            name='AccountType'
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        {this.state.errormessage && (this.state.fields.AccountType == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            labelText="MICAAccountName"
                                            id="Account"
                                            disabled={true}
                                            value={this.state.fields.Account}
                                            name='Account'
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        {this.state.errormessage && (this.state.fields.Account == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            labelText="CustomerAccountCode"
                                            id="AccountCode"
                                            required={true}
                                            disabled={!this.state.flagEdit}
                                            error={this.state.AccountCodeState}
                                            value={this.state.fields.AccountCode}
                                            name='AccountCode'
                                            onChange={(event) => this.onInputChangeEv("number", event)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        {this.state.errormessage && (this.state.fields.AccountCode == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            labelText="CustomerAccountName"
                                            id="AccountName"
                                            required={true}
                                            disabled={!this.state.flagEdit}
                                            error={this.state.AccountNameState}
                                            value={this.state.fields.AccountName}
                                            name='AccountName'
                                            onChange={(event) => this.onInputChangeEv("alphaNumeric", event)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        {this.state.errormessage && (this.state.fields.AccountName == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            labelText="CustomerAccountDescription"
                                            id="AccountDesc"
                                            required={true}
                                            disabled={!this.state.flagEdit}
                                            error={this.state.AccountDescState}
                                            multiline={true}
                                            value={this.state.fields.AccountDesc}
                                            name='AccountDesc'
                                            onChange={(event) => this.onInputChangeEv("alphaNumeric", event)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        {this.state.errormessage && (this.state.fields.AccountDesc == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                                    </GridItem>
                                </GridContainer>
                                {this.state.flag &&
                                    <GridContainer lg={12} justify="center">
                                        <GridItem xs={5} sm={3} md={3} lg={1}>
                                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                <Button id="button-search-partner" color="info" round onClick={() => this.onFormSubmit()}>
                                                <TranslationContainer translationKey="Save" />
                          </Button>
                                            </Animated>
                                        </GridItem>
                                    </GridContainer>
                                }
                                {this.state.flagUpdate &&
                                    <GridContainer lg={12} justify="center">
                                        <GridItem xs={5} sm={3} md={3} lg={1}>
                                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                <Button id="button-search-partner" color="info" round onClick={() => this.onFormUpdate()}>
                                                <TranslationContainer translationKey="Update" />
                          </Button>
                                            </Animated>
                                        </GridItem>
                                    </GridContainer>}
                                {
                                    //<GridContainer justify="center">
                                    //    <GridItem>
                                    //        <ExportToExcel lstSheet={this.state.lstSheet} />
                                    //    </GridItem>
                                    //</GridContainer>
                                }
                                {this.state.displayGrid &&
                                    <GridContainer>
                                        <GridItem xs={12}>

                                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                <CardBody className="product-search-tab">
                                                    <ReactTable
                                                        data={this.state.newdata}
                                                        filterable
                                                        columns={[
                                                            {
                                                                Header: "Customer Name",
                                                                accessor: "CustomerName",
                                                                minWidth: 40,
                                                                style: { textAlign: "center" },
                                                                headerClassName: 'react-table-center',
                                                                resizable: false,
                                                            },
                                                            {
                                                                Header: "Mica Account Code",
                                                                accessor: "MicaAccountCode",
                                                                minWidth: 20,
                                                                style: { textAlign: "center" },
                                                                headerClassName: 'react-table-center',
                                                                resizable: false,
                                                            },
                                                            {
                                                                Header: "Mica Account Type",
                                                                accessor: "MicaAccountType",
                                                                minWidth: 20,
                                                                style: { textAlign: "center" },
                                                                headerClassName: 'react-table-center',
                                                                resizable: false,

                                                            },
                                                            {
                                                                Header: "Mica Account Name",
                                                                accessor: "MicaAccountName",
                                                                minWidth: 30,
                                                                style: { textAlign: "center" },
                                                                headerClassName: 'react-table-center',
                                                                resizable: false,
                                                            },
                                                            {
                                                                Header: "Customer Account Code",
                                                                accessor: "CustomerAccountCode",
                                                                minWidth: 30,
                                                                style: { textAlign: "center" },
                                                                headerClassName: 'react-table-center',
                                                                resizable: false,
                                                            },
                                                            {
                                                                Header: " Customer Account Name",
                                                                accessor: "CustomerAccountName",
                                                                minWidth: 50,
                                                                style: { textAlign: "center" },
                                                                headerClassName: 'react-table-center',
                                                                resizable: false,
                                                            },
                                                            {
                                                                Header: "Customer Account Desc",
                                                                accessor: "CustomerAccountDesc",
                                                                minWidth: 20,
                                                                style: { textAlign: "center" },
                                                                headerClassName: 'react-table-center',
                                                                resizable: false,
                                                            }
                                                        ]}
                                                        defaultPageSize={5}
                                                        showPaginationTop={false}
                                                        pageSize={([this.state.fieldsArray.length + 1] < 5) ? [this.state.fieldsArray.length + 1] : 5}
                                                        showPaginationBottom
                                                        className="-striped -highlight"
                                                    />
                                                </CardBody>
                                            </Animated>
                                        </GridItem>
                                    </GridContainer>
                                }
                            </CardBody>
                        </Card>
                    </Animated>
                    : <PageContentLoader />}
            </div>
        );
    }
}

export default withStyles(style)(COAMapping);
