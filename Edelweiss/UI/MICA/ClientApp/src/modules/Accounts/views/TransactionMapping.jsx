import React from "react";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import JEConfiguration from "assets/img/JE-Configuration.png";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import AccountConfig from "modules/Accounts/AccountConfig.js";
import FormLabel from "@material-ui/core/FormLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import Check from "@material-ui/icons/Check";
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
import Checkbox from "@material-ui/core/Checkbox";
import swal from 'sweetalert';
import CustomCheckbox from "components/Checkbox/CustomCheckbox";
import $ from 'jquery';
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import validationPage from "./ValidationPage.jsx";
import Visibility from "@material-ui/icons/Visibility";
import Modal from '@material-ui/core/Modal';
import PageContentLoader from "components/Loaders/PageContentLoader.jsx";
import TableContentLoader from "components/Loaders/TableContentLoader.jsx";
import data_Not_found from "assets/img/data-not-found-new.png"

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
const searchClose = {
    float: "right",
    position: 'relative',
    bottom: "56px",
    width: "26px",
    height: "28px",
    borderRadius: "4px",
    fontSize: "larger",
    padding: "0px",
    right: '10px',
}

const paddingCard =
{
    padding: "10px",
}

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

class TransactionMapping extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                RuleName: "",
                Object: "",
                Event: "",
                Value: "",
                Descriptions: "",
                AccountCode: "",
                AccountType: "",
                isActive: "",
                TypeofTransaction: "",
                SubLedgerReference: "",
                SubLedgerObject: "",
                SubLedgerColName: "",
            },
            MicaACNameShow: "",
            errormessage: false,
            errormessageInitialized: false,
            errormessageLedger: false,
            checked: [24, 22],
            TransactionConditionArray: [],
            SubLedgerArray: [],
            newdata: [],
            newDataJournal: [],
            newLedgerData: [],
            ObjectMap: [],
            EventMap: [],
            EventObjectMap: [],
            SubLedgerMap: [],
            JournalEntryDetails: [],
            AccountList: [],
            AcccountCodeList: [],
            AccountTypeList: [],
            SubLedgerReferencesList: [],
            TransactionList: [],
            searchTransactionData: [],
            displayGrid: false,
            displayJournalGrid: false,
            displayLeddgerGrid: false,
            DescriptionsState: "",
            RuleNameState: "",
            journalName: "",
            SubLedgersGridList: "",
            displaySubLedgerJournalGrid: false,
            SubledgerGridView: [],
            open: false,
            //Loader
            isButtonVisibility: false,
            loader: true,
            pageloader: false,
            nodata: false,

        };
    }

    componentDidMount() {

        fetch(`https://inubeservicesbilling.azurewebsites.net/api/Billing/GetObjectParameter`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ ObjectMap: data });
                //this.setState({ SubLedgerMap: data})
                const array = this.state.ObjectMap.filter(item => item.objectName != "Recurring" && item.objectName != "OneTime");
                this.setState({ ObjectMap: array });
                console.log(this.state.ObjectMap, 'EventMapValueData');
            });
        fetch(`https://inubeservicesbilling.azurewebsites.net/api/Billing/GetEventMapDetails`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ EventMap: data });
                //this.setState({ SubLedgerMap: data})
                const array = this.state.EventMap.filter(item => item.objectName != "Recurring" && item.objectName != "OneTime");
                this.setState({ EventMap: array });
                console.log(this.state.EventMap, 'EventMapValueData');
            });
        fetch(`https://inubeservicesbilling.azurewebsites.net/api/Billing/GetEventMapParamDetails`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ SubLedgerMap: data })
                console.log(this.state.SubLedgerMap, 'SubLedgerData');
            });

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
                this.setState({ AccountList: data });
                console.log(data);
            });
        //SubLedgers Values
        fetch(`${AccountConfig.accountConfigUrl}/api/AccountConfig/GetSubLedgers`, {
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
                this.setState({ SubLedgersGridList: data });
                console.log(data);
            });

        fetch(`${AccountConfig.accountConfigUrl}/api/AccountConfig/GetJournalEntryDetailsGrid`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ JournalEntryDetails: data });
                console.log(this.state.JournalEntryDetails, 'JournalEntryDetails');

            });
        // For Transaction Details
        //fetch(`${AccountConfig.accountConfigUrl}/api/AccountConfig/GetTransactionDetails`)
        //    .then(response => response.json())
        //    .then(data => {
        //        this.setState({ TransactionList: data });
        //        console.log(data,'My Transaction Date');
        //    });
    }
    // For Validation 
    change(event, stateName, type, stateNameEqualTo, maxValue) {
        switch (type) {
            case "string":
                if (validationPage.verifyName(event.target.value)) {
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            default:
                break;
        }
    }
    onInputChangeEv = (type, event) => {
        const fields = this.state.fields;
        let name = event.target.name;
        fields[event.target.name] = event.target.value;
        this.setState({ fields });
        this.change(event, name, type);
    };

    onHandleEvent = (evt) => {
        const fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
        const type = this.state.EventMap.filter(item => item.objectName == evt.target.value);
        this.setState({ EventObjectMap: type });
        console.log(this.state.EventObjectMap, 'Event Map Value');
    }
    onhandleState = (evt) => {
        const fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        const type = this.state.AccountList.filter(item => item.accountCode == evt.target.value);
        this.setState({ AcccountCodeList: type });
        fields['AccountType'] = type[0].accountType;
        this.setState({ fields });
        //Getting Account Name
        const acFields = this.state;
        acFields['MicaACNameShow'] = type[0].accountName;
    }

    onHandleLedgerEvents = (evt) => {
        const fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
        this.setState({ SubLedgerReferencesList: this.state.SubLedgerMap.filter(item => item.objectName == evt.target.value) });
        console.log(this.state.SubLedgerReferencesList, 'SubLedgerReferecesList');
    }
    onInputChange = (evt) => {
        const fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
    };
    onInputChangeEv = (type, event) => {
        const fields = this.state.fields;
        let name = event.target.name;
        fields[event.target.name] = event.target.value;
        this.setState({ fields });
        this.change(event, name, type);
    };

    // For Validation 
    change(event, stateName, type, stateNameEqualTo, maxValue) {
        switch (type) {
            case "alphaNumeric":
                if (validationPage.verifyAlphaNumeric(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            default:
                break;
        }
    }

    handleToggle(value) {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked
        });
        console.log(this.state.checked, 'Checked Event');
    };
    onDateChange = (type, name, event) => {
        console.log("event", event);
        console.log("name", name);
        var today = event.toDate();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        console.log("today", today);
        console.log("date", date);
        if (type == 'Transaction') {
            let Transaction = this.state.Transaction;
            Transaction[name] = date;
            this.setState({ Transaction });
        }
    }

    handleClose = () => {
        this.setState({ open: false });
    };
    //Adding into Array 
    addRow() {
        // For Add Row 
        if (this.state.fields.TypeofTransaction != "" && this.state.fields.AccountCode != "" && this.state.fields.AccountType != "" && this.state.fields.Value != "" && this.state.fields.Descriptions != "") {
            this.setState({ displayGrid: true });
            var isActive = "Y";
            let pTransactionConditionArray = this.state.TransactionConditionArray;
            this.setState({ TransactionConditionArray: pTransactionConditionArray });

            pTransactionConditionArray.push({
                'typeofTransaction': this.state.fields.TypeofTransaction,
                'accountCode': this.state.fields.AccountCode,
                'accountName': this.state.MicaACNameShow,
                'accountType': this.state.fields.AccountType,
                'value': this.state.fields.Value,
                'description': this.state.fields.Descriptions,
                'createdDate': date(),
                'isActive': isActive
            });
            //Deleting that Account after selecting 
            this.setState({ AcccountCodeList: this.state.AcccountCodeList.filter(item => item.accountCode != this.state.fields.AccountCode) });
            // State Set After Selecting
            this.setState({ TypeofTransaction: '', AccountCode: '', AccountType: '', Value: '' });
            this.state.fields.TypeofTransaction = "";
            this.state.fields.AccountCode = "";
            this.state.fields.Value = "";
            this.state.fields.AccountType = "";
            this.state.fields.Descriptions = "";
            this.state.MicaACNameShow = "";
            console.log(this.state.TransactionConditionArray, 'MIne Transaction Array');

            if (this.state.TransactionConditionArray.length > 0) {
                this.setState({
                    newdata: this.state.TransactionConditionArray.map((prop, key) => {

                        return {
                            TypeOfTransaction: prop.typeofTransaction,
                            AccountCode: prop.accountCode,
                            AccountName: prop.accountName,
                            AccountType: prop.accountType,
                            Value: prop.value,
                            Description: prop.description
                        };
                    })
                });
            }
            this.setState({ errormessage: false });
            //Description State False
            let status = this.state;
            status['DescriptionsState'] = "";
            this.setState({ status });
        }
        else {
            swal("", "Some fields are missing", "error");
            this.setState({ errormessage: true });
        }
    }

    addSubLedgerRow() {
        if (this.state.fields.SubLedgerObject != "" && this.state.fields.SubLedgerColName != "") {
            //Showing Grid
            this.setState({ displayLeddgerGrid: true });
            var isActive = "Y";
            let pSubLedgerArray = this.state.SubLedgerArray;
            this.setState({ SubLedgerArray: pSubLedgerArray });

            pSubLedgerArray.push({
                'ledgerObject': this.state.fields.SubLedgerObject,
                'ledgerColName': this.state.fields.SubLedgerColName,
                'createdDate': date(),
                'isActive': isActive
            });
            //Deleting that Account after selecting 
            this.setState({ SubLedgerMap: this.state.SubLedgerMap.filter(item => item.colname != this.state.fields.SubLedgerColName) });
            // State Set After Selecting
            this.setState({ SubLedgerObject: '', SubLedgerColName: '' });
            this.state.fields.SubLedgerObject = "";
            this.state.fields.SubLedgerColName = "";
            console.log(this.state.SubLedgerArray, 'MIne SubLedgerArrayList');

            if (this.state.SubLedgerArray.length > 0) {
                this.setState({
                    newLedgerData: this.state.SubLedgerArray.map((prop, key) => {

                        return {
                            SubLedgerObject: prop.ledgerObject,
                            SubLedgerColName: prop.ledgerColName,
                        };
                    })
                });
            }
            this.setState({ errormessageLedger: false });
            //For Filtering Selected value in array 
            //if (this.state.SubLedgerArray.length > 0) {
            //    var arrayCol = this.state.SubLedgerArray[0].ledgerColName;
            //    console.log(arrayCol,'ArrayCOlumn')
            //}
        }
        else {
            swal("", "Some fields are missing", "error");
            this.setState({ errormessageLedger: true });
        }

    }

    onGrid() {
        fetch(`${AccountConfig.accountConfigUrl}/api/AccountConfig/GetJournalEntryDetailsGrid`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ JournalEntryDetails: data });
                console.log(this.state.JournalEntryDetails, 'JournalEntryDetails');

            });
        //this.setState({ displayJournalGrid: true });
        this.setState({ displayJournalGrid: false, loader: false });
        if (this.state.JournalEntryDetails.length > 0) {
            this.setState({ displayJournalGrid: true, loader: true });
            this.setState({
                newDataJournal: this.state.JournalEntryDetails.map((prop, key) => {

                    return {
                        RuleName: prop.ruleName,
                        Object: prop.object,
                        Event: prop.event,
                        TypeofTransaction: prop.typeofTransaction,
                        AccountCode: prop.accountCode,
                        AccountName: prop.accountName,
                        AccountType: prop.accountType,
                        Value: prop.value,
                        Description: prop.description,
                        TransactionMappingId: prop.transactionRuleMappingId,
                        btn: <div>
                            <Button color="info" justIcon round simple className="view" onClick={() => this.handleSubLedgerView(prop.transactionRuleMappingId)}><Visibility /></Button>
                        </div>

                    };
                })
            });
        }
        else {
            setTimeout(
                function () {
                    this.setState({ loader: true, displayJournalGrid: false, nodata: true });
                }.bind(this), 2000
            );
        }
    }

    //For Viewing SubLedger Part
    handleSubLedgerView = (id) => {
        debugger
        this.setState({ displaySubLedgerJournalGrid: true, open: true });
        document.getElementById("disp");
        const subLedger = this.state.SubLedgersGridList.filter(item => item.transactionRuleMappingId == id);
        console.log(subLedger, 'SubLedger');
        //SubLedgersGridList
        if (subLedger.length > 0) {
            this.setState({
                SubledgerGridView: subLedger.map((prop, key) => {
                    return {
                        SubLedgerObject: prop.ledgerObject,
                        SubLedgerEvent: prop.ledgerColName,
                    };
                })
            });
        }
    }

    onFormSubmit = (evt) => {
        debugger;
        let conditionArray = this.state.TransactionConditionArray;
        //For Checccking before transactino condition to be send as (it should be one creadit and one debit )
        const CreditCount = conditionArray.filter(item => item.typeofTransaction == 'Credit');
        const DebitCount = conditionArray.filter(item => item.typeofTransaction == 'Debit');

        if (CreditCount.length > 0 && DebitCount.length > 0 && this.state.SubLedgerArray.length != 0) {

            this.state.fields.IsActive = "Y";
            this.state.fields.CreatedDate = date();
            var data = {
                'ruleName': this.state.fields.RuleName, 'object': this.state.fields.Object, 'event': this.state.fields.Event, 'createdDate': date(), 'isActive': this.state.fields.isActive, 'subLedgerReferences': this.state.SubLedgerArray, 'transactionConditions': this.state.TransactionConditionArray,
            };
            console.log(data, 'MyData');
            if (this.state.fields.RuleName != "" && this.state.fields.Object != "" && this.state.fields.Event != "" && this.state.TransactionConditionArray.length != 0 && this.state.SubLedgerArray.length != 0) {
                fetch(`${AccountConfig.accountConfigUrl}/api/AccountConfig/CreateTransactionMapping`, {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                    },
                    body: JSON.stringify(data)
                }).then(response => response.json())
                    .then(data => {
                        if (data.status == 2) {
                            swal({
                                //   title: "Perfect",
                                text: data.responseMessage,
                                //  text: "Account Successfully Created",
                                icon: "success"
                            });
                            this.reset();
                            window.scrollTo(0, 0);
                            this.setState({ errormessageInitialized: false });
                            this.setState({ errormessage: false });
                            this.setState({ errormessageLedger: false });
                            //this.setState({ redirect: true });
                            //this.renderRedirect();
                        } else if (data.status == 8) {
                            swal({
                                text: data.errors[0].errormessageInitialized,
                                icon: "error"
                            });
                        } else if (data.status == 4) {
                            swal({
                                text: data.errors[0].errormessageInitialized,
                                icon: "error"
                            });
                        }
                    });
            } else {
                swal("", "Some fields are missing", "error");
                this.setState({ errormessageInitialized: true });
            }
        }
        else {
            debugger;
            if (CreditCount.length == 0 || DebitCount.length == 0) {
                this.setState({ errormessage: true });
                swal({
                    text: "Transaction conditions are missing",
                    icon: "error"
                });
            }
            else if (this.state.SubLedgerArray.length == 0) {
                this.setState({ errormessageLedger: true });
                swal({
                    text: "Subledgers are missing",
                    icon: "error"
                });
            }
            else {
                this.setState({ errormessageInitialized: true });
                swal({
                    text: "Some fields are missing",
                    icon: "error"
                });
            }
        }
    }

    //Reset 
    reset = () => {
        //Setting States After Saving
        let accountDto = this.state.fields;
        accountDto['RuleName'] = "";
        accountDto['Object'] = "";
        accountDto['Event'] = "";
        this.setState({ accountDto });

        let status = this.state;
        status['DescriptionsState'] = "";
        status['RuleNameState'] = "";
        this.setState({ status });
        //Array Reset
        this.setState({
            TransactionConditionArray: [],
            newdata: [],
            displayGrid: false,
            //Ledger Reset
            newLedgerData: [],
            SubLedgerArray: [],
            displayLeddgerGrid: false,

        })

    }
    searchagain = () => {
        this.setState({ nodata: false });
        window.scrollTo(0, 0);
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                {this.state.pageloader ?
                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                        <Card >
                            <CardHeader color="rose" icon>
                                <CardIcon color="rose">
                                    <Icon><img id="icon" src={JEConfiguration} /></Icon>
                                </CardIcon>
                                {
                                    <h4 >
                                        <small> Journal Entry Configuration </small>
                                    </h4>
                                }
                            </CardHeader>

                            <CardBody>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <CustomInput
                                            labelText="Journal Name"
                                            id="RuleName"
                                            value={this.state.fields.RuleName}
                                            name='RuleName'
                                            required={true}
                                            success={this.state.RuleNameState === "success"}
                                            error={this.state.RuleNameState === "error"}
                                            onChange={(event) => this.onInputChangeEv("alphaNumeric", event)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        {this.state.errormessageInitialized && (this.state.fields.RuleName == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={4}>
                                        <FormControl
                                            fullWidth
                                            className={classes.selectFormControl}
                                        >
                                            <InputLabel
                                                htmlFor="simple-select"
                                                className={classes.selectLabel}
                                            >
                                                Module
                          </InputLabel>
                                            <Select
                                                value={this.state.fields.Object}
                                                onChange={this.onHandleEvent}
                                                MenuProps={{
                                                    className: classes.selectMenu
                                                }}
                                                classes={{
                                                    select: classes.select
                                                }}
                                                inputProps={{
                                                    name: "Object",
                                                    id: "simple-select"
                                                }}
                                            >
                                                {
                                                    this.state.ObjectMap.map(item =>
                                                        <MenuItem
                                                            value={item.objectName}
                                                            classes={{
                                                                root: classes.selectMenuItem,
                                                                selected: classes.selectMenuItemSelected
                                                            }}
                                                        >
                                                            {item.objectName}
                                                        </MenuItem>
                                                    )
                                                }
                                            </Select>
                                        </FormControl>
                                        {this.state.errormessageInitialized && (this.state.fields.Object == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <FormControl
                                            fullWidth
                                            className={classes.selectFormControl}
                                        >
                                            <InputLabel
                                                htmlFor="simple-select"
                                                className={classes.selectLabel}
                                            >
                                                Event
                          </InputLabel>
                                            <Select
                                                value={this.state.fields.Event}
                                                onChange={this.onInputChange}
                                                MenuProps={{
                                                    className: classes.selectMenu
                                                }}
                                                classes={{
                                                    select: classes.select
                                                }}
                                                inputProps={{
                                                    name: "Event",
                                                    id: "simple-select"
                                                }}
                                            >
                                                {
                                                    this.state.EventObjectMap.map(item =>
                                                        <MenuItem
                                                            value={item.eventName}
                                                            classes={{
                                                                root: classes.selectMenuItem,
                                                                selected: classes.selectMenuItemSelected
                                                            }}
                                                        >
                                                            {item.eventName}
                                                        </MenuItem>
                                                    )
                                                }
                                            </Select>
                                        </FormControl>
                                        {this.state.errormessageInitialized && (this.state.fields.Event == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                                    </GridItem>
                                </GridContainer>


                            </CardBody>
                        </Card>
                    </Animated>
                    : <PageContentLoader />}
                {this.state.pageloader ?
                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                        <Card >

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
                                                Type of Transaction
                          </InputLabel>
                                            <Select
                                                MenuProps={{
                                                    className: classes.selectMenu
                                                }}
                                                classes={{
                                                    select: classes.select
                                                }}
                                                value={this.state.fields.TypeofTransaction}
                                                onChange={this.onInputChange}
                                                inputProps={{
                                                    name: "TypeofTransaction",
                                                    id: "simple-select"
                                                }}
                                            >
                                                <MenuItem
                                                    disabled
                                                    classes={{
                                                        root: classes.selectMenuItem
                                                    }}
                                                >
                                                    Type of Transaction
                            </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="Credit"
                                                >
                                                    Credit
                            </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="Debit"
                                                >
                                                    Debit
                            </MenuItem>
                                            </Select>
                                        </FormControl>
                                        {this.state.errormessage && (this.state.fields.TypeofTransaction == "") ? <p className="error">*Required field cannot be left blank</p> : null}
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
                                                Account Code
                          </InputLabel>
                                            <Select
                                                value={this.state.fields.AccountCode}
                                                onChange={this.onhandleState}
                                                MenuProps={{
                                                    className: classes.selectMenu
                                                }}
                                                classes={{
                                                    select: classes.select
                                                }}
                                                inputProps={{
                                                    name: "AccountCode",
                                                    id: "simple-select"
                                                }}
                                            >
                                                {
                                                    this.state.AccountList.map(item =>
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
                                        {this.state.errormessage && (this.state.fields.AccountCode == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            labelText="Account Type"
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
                                            labelText="Acccount Name"
                                            id="MicaACNameShow"
                                            disabled={true}
                                            value={this.state.MicaACNameShow}
                                            name='MicaACNameShow'
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        {this.state.errormessage && (this.state.MicaACNameShow == "") ? <p className="error">*Required field cannot be left blank</p> : null}
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
                                                Value
                                </InputLabel>
                                            <Select
                                                value={this.state.fields.Value}
                                                onChange={this.onInputChange}
                                                MenuProps={{
                                                    className: classes.selectMenu
                                                }}
                                                classes={{
                                                    select: classes.select
                                                }}
                                                inputProps={{
                                                    name: "Value",
                                                    id: "simple-select"
                                                }}
                                            >
                                                {
                                                    this.state.EventObjectMap.map(item =>
                                                        <MenuItem
                                                            value={item.colname}
                                                            classes={{
                                                                root: classes.selectMenuItem,
                                                                selected: classes.selectMenuItemSelected
                                                            }}
                                                        >
                                                            {item.colname}
                                                        </MenuItem>
                                                    )
                                                }
                                            </Select>
                                        </FormControl>
                                        {this.state.errormessage && (this.state.fields.Value == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={9}>
                                        <CustomInput labelText="Description"
                                            value={this.state.fields.Descriptions}
                                            name="Descriptions"
                                            required={true}
                                            success={this.state.DescriptionsState === "success"}
                                            error={this.state.DescriptionsState === "error"}
                                            multiline={true}
                                            onChange={(event) => this.onInputChangeEv("alphaNumeric", event)}
                                            inputProps={{
                                                //type: "number"
                                            }}
                                            formControlProps={{ fullWidth: true }} />
                                        {this.state.errormessage && (this.state.fields.Descriptions == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                                    </GridItem>

                                    <GridContainer lg={12} justify="center">
                                        <GridItem xs={5} sm={3} md={3} lg={1}>
                                            <Button round onClick={() => this.addRow()}
                                                color="info"
                                            >
                                                ADD
                            </Button>
                                        </GridItem>
                                    </GridContainer>
                                </GridContainer>
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
                                                                Header: "Type Of Transaction",
                                                                accessor: "TypeOfTransaction",
                                                                minWidth: 30,
                                                                style: { textAlign: "center" },
                                                                headerClassName: 'react-table-center',
                                                                resizable: false,

                                                            },
                                                            {
                                                                Header: "Account Code",
                                                                accessor: "AccountCode",
                                                                minWidth: 30,
                                                                style: { textAlign: "center" },
                                                                headerClassName: 'react-table-center',
                                                                resizable: false,

                                                            },
                                                            {
                                                                Header: "Account Name",
                                                                accessor: "AccountName",
                                                                minWidth: 30,
                                                                style: { textAlign: "center" },
                                                                headerClassName: 'react-table-center',
                                                                resizable: false,

                                                            },
                                                            {
                                                                Header: "Account Type",
                                                                accessor: "AccountType",
                                                                minWidth: 30,
                                                                style: { textAlign: "center" },
                                                                headerClassName: 'react-table-center',
                                                                resizable: false,
                                                            },
                                                            {
                                                                Header: "Value",
                                                                accessor: "Value",
                                                                minWidth: 30,
                                                                style: { textAlign: "center" },
                                                                headerClassName: 'react-table-center',
                                                                resizable: false,
                                                            },
                                                            {
                                                                Header: "Description",
                                                                accessor: "Description",
                                                                minWidth: 30,
                                                                style: { textAlign: "center" },
                                                                headerClassName: 'react-table-center',
                                                                resizable: false,
                                                            }
                                                        ]}
                                                        defaultPageSize={5}
                                                        showPaginationTop={false}
                                                        pageSize={([this.state.newdata.length + 1] < 5) ? [this.state.newdata.length + 1] : 5}
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
                {this.state.pageloader ?
                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                        <Card >
                            <CardHeader color="rose" icon>
                                {
                                    <h4 >
                                        <small> Subledger References </small>
                                    </h4>
                                }
                            </CardHeader>
                            <CardBody>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <FormControl
                                            fullWidth
                                            className={classes.selectFormControl}
                                        >
                                            <InputLabel
                                                htmlFor="simple-select"
                                                className={classes.selectLabel}
                                            >
                                                Subledger Module
                          </InputLabel>
                                            <Select
                                                value={this.state.fields.SubLedgerObject}
                                                onChange={this.onHandleLedgerEvents}
                                                MenuProps={{
                                                    className: classes.selectMenu
                                                }}
                                                classes={{
                                                    select: classes.select
                                                }}
                                                inputProps={{
                                                    name: "SubLedgerObject",
                                                    id: "simple-select"
                                                }}
                                            >
                                                {
                                                    this.state.ObjectMap.map(item =>
                                                        <MenuItem
                                                            value={item.objectName}
                                                            classes={{
                                                                root: classes.selectMenuItem,
                                                                selected: classes.selectMenuItemSelected
                                                            }}
                                                        >
                                                            {item.objectName}
                                                        </MenuItem>
                                                    )
                                                }
                                            </Select>
                                        </FormControl>
                                        {this.state.errormessageLedger && (this.state.fields.SubLedgerObject == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={4}>
                                        <FormControl
                                            fullWidth
                                            className={classes.selectFormControl}
                                        >
                                            <InputLabel
                                                htmlFor="simple-select"
                                                className={classes.selectLabel}
                                            >
                                                Subledger References
                          </InputLabel>
                                            <Select
                                                value={this.state.fields.SubLedgerColName}
                                                onChange={this.onInputChange}
                                                MenuProps={{
                                                    className: classes.selectMenu
                                                }}
                                                classes={{
                                                    select: classes.select
                                                }}
                                                inputProps={{
                                                    name: "SubLedgerColName",
                                                    id: "simple-select"
                                                }}
                                            >
                                                {
                                                    this.state.SubLedgerReferencesList.map(item =>
                                                        <MenuItem
                                                            value={item.colName}
                                                            classes={{
                                                                root: classes.selectMenuItem,
                                                                selected: classes.selectMenuItemSelected
                                                            }}
                                                        >
                                                            {item.colName}
                                                        </MenuItem>
                                                    )
                                                }
                                            </Select>
                                        </FormControl>
                                        {this.state.errormessageLedger && (this.state.fields.SubLedgerColName == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={4}>
                                        <Button id="top-bnt" onClick={() => this.addSubLedgerRow()}
                                            color="info"
                                            round
                                        >
                                            ADD SUBLEDGER REFERENCE
                            </Button>
                                    </GridItem>
                                </GridContainer>
                                {this.state.displayLeddgerGrid &&
                                    <GridContainer>
                                        <GridItem xs={8}>
                                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                <CardBody className="product-search-tab">
                                                    <ReactTable
                                                        data={this.state.newLedgerData}
                                                        filterable
                                                        columns={[
                                                            {
                                                                Header: "Subledger Object",
                                                                accessor: "SubLedgerObject",
                                                                minWidth: 30,
                                                                style: { textAlign: "center" },
                                                                headerClassName: 'react-table-center',
                                                                resizable: false,

                                                            },
                                                            {
                                                                Header: "Subledger ColName ",
                                                                accessor: "SubLedgerColName",
                                                                minWidth: 30,
                                                                style: { textAlign: "center" },
                                                                headerClassName: 'react-table-center',
                                                                resizable: false,

                                                            }
                                                        ]}
                                                        defaultPageSize={5}
                                                        showPaginationTop={false}
                                                        pageSize={([this.state.newLedgerData.length + 1] < 5) ? [this.state.newLedgerData.length + 1] : 5}
                                                        showPaginationBottom
                                                        className="-striped -highlight"
                                                    />
                                                </CardBody>
                                            </Animated>
                                        </GridItem>
                                    </GridContainer>
                                }

                                <GridContainer lg={12} justify="center">
                                    <GridItem xs={5} sm={3} md={3} lg={4}>
                                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                            <Button id="push-right" color="info" round onClick={() => this.onGrid()}>
                                                JOURNAL ENTRY GRID
                                    </Button>
                                            <Button id="push-right" color="info" round onClick={() => this.onFormSubmit()}>
                                                SAVE
                        </Button></Animated>
                                    </GridItem>
                                </GridContainer>
                                {this.state.loader ?
                                    <GridContainer xl={12}>
                                        {this.state.displayJournalGrid ?
                                            <GridContainer>

                                                <GridItem xs={12}>
                                                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                        <CardBody className="product-search-tab">
                                                            <ReactTable
                                                                title={"Journal Entries"}
                                                                data={this.state.newDataJournal}
                                                                filterable
                                                                columns={[
                                                                    {
                                                                        Header: "Journal Name",
                                                                        accessor: "RuleName",
                                                                        minWidth: 30,
                                                                        style: { textAlign: "center" },
                                                                        headerClassName: 'react-table-center',
                                                                        resizable: false,

                                                                    },
                                                                    {
                                                                        Header: "Module",
                                                                        accessor: "Object",
                                                                        minWidth: 30,
                                                                        style: { textAlign: "center" },
                                                                        headerClassName: 'react-table-center',
                                                                        resizable: false,

                                                                    },
                                                                    {
                                                                        Header: "Event",
                                                                        accessor: "Event",
                                                                        minWidth: 30,
                                                                        style: { textAlign: "center" },
                                                                        headerClassName: 'react-table-center',
                                                                        resizable: false,
                                                                    },
                                                                    {
                                                                        Header: "Type of Transaction",
                                                                        accessor: "TypeofTransaction",
                                                                        minWidth: 30,
                                                                        style: { textAlign: "center" },
                                                                        headerClassName: 'react-table-center',
                                                                        resizable: false,
                                                                    },
                                                                    {
                                                                        Header: "Account Code",
                                                                        accessor: "AccountCode",
                                                                        minWidth: 30,
                                                                        style: { textAlign: "center" },
                                                                        headerClassName: 'react-table-center',
                                                                        resizable: false,
                                                                    },
                                                                    {
                                                                        Header: "Account Name",
                                                                        accessor: "AccountName",
                                                                        minWidth: 30,
                                                                        style: { textAlign: "center" },
                                                                        headerClassName: 'react-table-center',
                                                                        resizable: false,
                                                                    },
                                                                    {
                                                                        Header: "Account Type",
                                                                        accessor: "AccountType",
                                                                        minWidth: 30,
                                                                        style: { textAlign: "center" },
                                                                        headerClassName: 'react-table-center',
                                                                        resizable: false,
                                                                    },
                                                                    {
                                                                        Header: "Value",
                                                                        accessor: "Value",
                                                                        minWidth: 30,
                                                                        style: { textAlign: "center" },
                                                                        headerClassName: 'react-table-center',
                                                                        resizable: false,
                                                                    },
                                                                    {
                                                                        Header: "Description",
                                                                        accessor: "Description",
                                                                        minWidth: 30,
                                                                        style: { textAlign: "center" },
                                                                        headerClassName: 'react-table-center',
                                                                        resizable: false,
                                                                    },
                                                                    //{
                                                                    //    Header: "Subledger Object",
                                                                    //    accessor: "SubLedgerObject",
                                                                    //    minWidth: 30,
                                                                    //    style: { textAlign: "center" },
                                                                    //    headerClassName: 'react-table-center',
                                                                    //    resizable: false,
                                                                    //},
                                                                    //{
                                                                    //    Header: "Subledger Column",
                                                                    //    accessor: "SubLedgerColumn",
                                                                    //    minWidth: 30,
                                                                    //    style: { textAlign: "center" },
                                                                    //    headerClassName: 'react-table-center',
                                                                    //    resizable: false,
                                                                    //},
                                                                    {
                                                                        Header: "Subledger Reference",
                                                                        accessor: "btn",
                                                                        minwidth: 30,
                                                                        style: { textalign: "left" },
                                                                        headerclassname: 'react-table-center',
                                                                        resizable: false,
                                                                    }

                                                                ]}
                                                                defaultPageSize={5}
                                                                showPaginationTop={false}
                                                                pageSize={([this.state.JournalEntryDetails.length + 1] < 5) ? [this.state.JournalEntryDetails.length + 1] : 5}
                                                                showPaginationBottom
                                                                className="-striped -highlight"
                                                            />
                                                        </CardBody>
                                                    </Animated>
                                                </GridItem>
                                            </GridContainer>
                                            : <GridItem lg={12}>{
                                                this.state.nodata ?
                                                    <Card>
                                                        <GridContainer lg={12} justify="center">
                                                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                                <img src={data_Not_found} className="tab-data-not-found" />
                                                            </Animated>
                                                        </GridContainer>
                                                        <GridContainer lg={12} justify="center">
                                                            <GridItem xs={5} sm={3} md={3} lg={1} >
                                                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                                    <Button className="secondary-color" round onClick={() => this.searchagain()}> Try again </Button>
                                                                </Animated>
                                                            </GridItem>
                                                        </GridContainer>
                                                    </Card>
                                                    : null
                                            }
                                            </GridItem>
                                        }
                                    </GridContainer>
                                    :
                                    <Card style={paddingCard}>
                                        <TableContentLoader />
                                    </Card>
                                }


                                {this.state.displaySubLedgerJournalGrid &&
                                    <Modal
                                        aria-labelledby="simple-modal-title"
                                        aria-describedby="simple-modal-description"
                                        open={this.state.open}
                                        onClose={this.handleClose}>
                                        <div className={classes.paper} id="modal">
                                            <h4><small className="center-text">Subledgers</small></h4>

                                            <Button color="info"
                                                round
                                                className={classes.marginRight}
                                                style={searchClose}
                                                onClick={this.handleClose}>
                                                &times;
                                                        </Button>
                                            <div id="disp" >
                                                <GridContainer>
                                                    <GridItem xs={12}>
                                                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                            <CardBody className="product-search-tab">
                                                                <ReactTable
                                                                    title={"Subledger Entries"}
                                                                    data={this.state.SubledgerGridView}
                                                                    filterable
                                                                    columns={[
                                                                        {
                                                                            Header: "Subledger Object",
                                                                            accessor: "SubLedgerObject",
                                                                            minWidth: 30,
                                                                            style: { textAlign: "center" },
                                                                            headerClassName: 'react-table-center',
                                                                            resizable: false,

                                                                        },
                                                                        {
                                                                            Header: "Subledger Event",
                                                                            accessor: "SubLedgerEvent",
                                                                            minWidth: 30,
                                                                            style: { textAlign: "center" },
                                                                            headerClassName: 'react-table-center',
                                                                            resizable: false,

                                                                        }
                                                                    ]}
                                                                    defaultPageSize={5}
                                                                    showPaginationTop={false}
                                                                    pageSize={([this.state.SubledgerGridView.length + 1] < 5) ? [this.state.SubledgerGridView.length + 1] : 5}
                                                                    showPaginationBottom
                                                                    className="-striped -highlight"
                                                                />
                                                            </CardBody>
                                                        </Animated>
                                                    </GridItem>
                                                </GridContainer>
                                            </div>
                                        </div>
                                    </Modal>

                                }
                            </CardBody>
                        </Card>
                    </Animated>
                    : <PageContentLoader />}
            </div>
        );
    }
}

export default withStyles(style)(TransactionMapping);