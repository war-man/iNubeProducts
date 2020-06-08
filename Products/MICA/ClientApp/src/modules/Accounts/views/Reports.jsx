import React from "react";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import AccountsReports from "assets/img/Accounts-Reports.png";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";

import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import AccountConfig from "modules/Accounts/AccountConfig.js";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Animated } from "react-animated-css";
import swal from 'sweetalert';
//import ReactTable from "react-table";
import ReactTable from 'components/MuiTable/MuiTable.jsx';
import ExportToExcel from "components/ExcelExport/ExcelPlugin/ExportToExcel.jsx";
import PageContentLoader from "components/Loaders/PageContentLoader.jsx";
import TableContentLoader from "components/Loaders/TableContentLoader.jsx";
import data_Not_found from "assets/img/data-not-found-new.png";
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
const paddingCard =
{
    padding: "10px",
}

class Reports extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                Object: "",
                Event: "",
                FromDate: "",
                ToDate: "",
                //For Search Account
                AccountTypeId: "",
                AccountName: "",
                AccountCode: "",
                Customer: "",
            },
            errormessage: false,
            TrasactionData: [],
            accountData: [],
            searchData: [],
            newdata: [],
            accountRadio: "",
            accountRadioSelected: "",
            accountFlag: "",
            displayGrid: false,
            accountTypeData: [],
            CustomerNameData: [],
            //Loader
            isButtonVisibility: false,
            loader: true,
            pageloader: false,
            nodata: false,
            //From To Date for Grid
            DateFrom: "",
            DateTo: "",
            CustomerName:"",

            lstSheet: [
                {
                    data: [],
                    sheetName: "Reports",
                    columnArray: [
                        {
                            Header: "Date",
                            accessor: "createdDate",
                        },
                        {
                            Header: "Account Code",
                            accessor: "accountCode",
                        },
                        {
                            Header: "Account Name",
                            accessor: "accountName",
                        },
                        {
                            Header: "Account Type",
                            accessor: "accountType",
                        },
                        {
                            Header: "Txn Description",
                            accessor: "description",
                        },
                        {
                            Header: "Amount",
                            accessor: "amount",
                        },
                        {
                            Header: "Currency",
                            accessor: "currency",
                        },
                    ]
                }
            ],
        };
    }

    onInputChange = (evt) => {
        const fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
    };

    handleRadioChange = (event) => {
        let value = event.target.value;
        this.state.accountRadio = event.target.value;
        this.state.accountRadioSelected = event.target.value;
        this.setState({ value });
        console.log("Radio", this.state.accountRadio);
        if (this.state.accountRadio == 0) {
            this.state.accountFlag = true;
        }
    }

    componentDidMount() {
        //Get Customer Name
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
                this.setState({ CustomerNameData: data });
                console.log(this.state.CustomerNameData, 'CD');
            });
        fetch(`${AccountConfig.accountConfigUrl}/api/AccountConfig/GetTransactionDetails`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ TrasactionData: data });
                console.log(this.state.TrasactionData, 'My Transaction Data');
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
                this.setState({ accountData: data });
                console.log(data);
            });
        //Accoount Type For Search
        fetch(`${AccountConfig.accountConfigUrl}/api/AccountConfig/GetAccountType`, {
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
                this.setState({ accountTypeData: data });
                console.log(this.state.accountTypeData, 'Data');
            });
    }

    onDateChange = (formate, name, event) => {
        const { validdate } = this.state.fields;
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
        //var date = today.getFullYear() + '-' + (today.getMonth() + 1)+ '-' + today.getDate();
        var date = dt + '/' + mm + '/' + today.getFullYear();
        const fields = this.state.fields;
        fields[name] = date;
        this.setState({ fields });

    };

    onFormSubmit = (evt) => {
        console.log(this.state.fields, 'Fields Value Before')
        if (this.state.fields.FromDate != "" && this.state.fields.ToDate != "" && this.state.fields.Customer != "") {
            //For Displaying into Grid
            this.state.DateFrom = this.state.fields.FromDate;
            this.state.DateTo = this.state.fields.ToDate;
            const customerData = this.state.CustomerNameData.filter(item => item.customerId == this.state.fields.Customer);
            this.state.CustomerName = customerData[0].customerName;
            //Previous
            this.setState({ newdata: [] });
            //Converting of Date into next Date Format only
            debugger;
            var datefrom = this.state.fields.FromDate.split('/');
            this.state.fields.FromDate = datefrom[2] + '-' + datefrom[1] + '-' + datefrom[0];
            var dateto = this.state.fields.ToDate.split('/');
            this.state.fields.ToDate = dateto[2] + '-' + dateto[1] + '-' + dateto[0];
            //Previoous Code
            var accountCode = parseInt(this.state.fields.AccountCode);
            var data = {
                'accountType': this.state.fields.AccountTypeId, 'AccountName': this.state.fields.AccountName, 'AccountCode': accountCode, 'orgId': this.state.fields.Customer,
            };
            //this.setState({ displayGrid: true });
            this.setState({ displayGrid: false, loader: false });
            fetch(`${AccountConfig.accountConfigUrl}/api/AccountConfig/SearchTransactionAccount?fromDate=` + this.state.fields.FromDate + "&toDate=" + this.state.fields.ToDate, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify(data)
            }).then(response => response.json())
                .then(data => {
                    this.setState({ searchData: data });
                    console.log(this.state.searchData, 'SearchData Fields ')
                    this.state.lstSheet[0].data = this.state.searchData;
                    console.log(this.state.lstSheet, 'List Sheet');
                    if (this.state.searchData.length > 0) {
                        this.setState({ displayGrid: true, loader: true });
                        this.setState({
                            newdata: this.state.searchData.map((prop, key) => {
                                return {
                                    Date: new Date(prop.createdDateTime).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second:'2-digit' }),
                                    AccountCode: prop.accountCode,
                                    AccountName: prop.accountName,
                                    AccountType: prop.accountType,
                                    CustomerCode: prop.customerAcCode,
                                    CustomerAcName: prop.customerAcName,
                                    TxnDescription: prop.referenceDescription,
                                    References: prop.description,
                                    //Amount: (prop.amount != null) ? prop.amount.toFixed(2) : null,
                                    //TransactionType: prop.typeOfTransaction,
                                    DrAmount: (prop.typeOfTransaction == "Debit") ? prop.amount.toFixed(2) : null,
                                    CrAmount: (prop.typeOfTransaction == "Credit") ? prop.amount.toFixed(2) : null,
                                    Currency: prop.currency
                                };
                            })
                        });
                        console.log(this.state.newdata, 'New Data');
                    }
                    else {
                        setTimeout(
                            function () {
                                this.setState({ loader: true, displayGrid: false, nodata: true });
                            }.bind(this), 2000
                        );
                    }
                }
                );
            //Reset Fields
            this.reset();
        }
        else {
            swal("", "Some fields are missing", "error");
            this.setState({ errormessage: true });
        }
    }
    reset = () => {
        //Setting States
        let fields = this.state.fields;
        fields['FromDate'] = "";
        fields['ToDate'] = "";
        fields['ToDate'] = "";
        fields['AccountTypeId'] = "";
        fields['AccountCode'] = "";
        fields['Customer'] = "";
        this.setState({ fields });
        let state = this.state;
        state['accountRadioSelected'] = "";
        state['accountFlag'] = "";
        this.setState({ state });
        this.setState({ errormessage: false });
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
                    <GridContainer>
                        <GridItem xs={12}>
                            <Card >
                                <CardHeader color="rose" icon>
                                    <CardIcon color="rose">
                                        <Icon><img id="icon" src={AccountsReports} /></Icon>
                                    </CardIcon>
                                    {
                                        <h4 >
                                            <small> <TranslationContainer translationKey="Reports" /> </small>
                                        </h4>
                                    }
                                </CardHeader>

                                <CardBody>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={8}>
                                            <div style={{ marginTop: "24px" }}>
                                                <h5> <small> <TranslationContainer translationKey="ViewBy" /> </small> </h5>
                                                {
                                                    <FormControlLabel
                                                        control={
                                                            <Radio

                                                                checked={this.state.accountRadioSelected === "0"}
                                                                onChange={(e) => { this.handleRadioChange(e) }}
                                                                value={0}
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
                                                        label="Account Details"
                                                    />
                                                }
                                                {
                                                    //<FormControlLabel
                                                    //    control={
                                                    //        <Radio
                                                    //            checked={this.state.accountRadioSelected === "2"}
                                                    //            onChange={(e) => { this.handleRadioChange(e) }}
                                                    //            value={2}
                                                    //            name="radio button demo"
                                                    //            aria-label="B"
                                                    //            icon={
                                                    //                <FiberManualRecord
                                                    //                    className={classes.radioUnchecked}
                                                    //                />
                                                    //            }
                                                    //            checkedIcon={
                                                    //                <FiberManualRecord
                                                    //                    className={classes.radioChecked}
                                                    //                />
                                                    //            }
                                                    //            classes={{
                                                    //                checked: classes.radio,
                                                    //                root: classes.radioRoot
                                                    //            }}
                                                    //        />
                                                    //    }
                                                    //    classes={{
                                                    //        label: classes.label
                                                    //    }}
                                                    //    label="Policy Details"
                                                    ///>
                                                }
                                                {

                                                    //<FormControlLabel
                                                    //    control={
                                                    //        <Radio
                                                    //            checked={this.state.accountRadioSelected === "1"}
                                                    //            onChange={(e) => { this.handleRadioChange(e) }}
                                                    //            value={1}
                                                    //            name="radio button demo"
                                                    //            aria-label="B"
                                                    //            icon={
                                                    //                <FiberManualRecord
                                                    //                    className={classes.radioUnchecked}
                                                    //                />
                                                    //            }
                                                    //            checkedIcon={
                                                    //                <FiberManualRecord
                                                    //                    className={classes.radioChecked}
                                                    //                />
                                                    //            }
                                                    //            classes={{
                                                    //                checked: classes.radio,
                                                    //                root: classes.radioRoot
                                                    //            }}
                                                    //        />
                                                    //    }
                                                    //    classes={{
                                                    //        label: classes.label
                                                    //    }}
                                                    //    label="Channel Details"
                                                    ///>
                                                    //<FormControlLabel
                                                    //    control={
                                                    //        <Radio
                                                    //            checked={this.state.accountRadioSelected === "3"}
                                                    //            onChange={(e) => { this.handleRadioChange(e) }}
                                                    //            value={3}
                                                    //            name="radio button demo"
                                                    //            aria-label="B"
                                                    //            icon={
                                                    //                <FiberManualRecord
                                                    //                    className={classes.radioUnchecked}
                                                    //                />
                                                    //            }
                                                    //            checkedIcon={
                                                    //                <FiberManualRecord
                                                    //                    className={classes.radioChecked}
                                                    //                />
                                                    //            }
                                                    //            classes={{
                                                    //                checked: classes.radio,
                                                    //                root: classes.radioRoot
                                                    //            }}
                                                    //        />
                                                    //    }
                                                    //    classes={{
                                                    //        label: classes.label
                                                    //    }}
                                                    //    label="Claim Details"
                                                    ///>
                                                }
                                            </div>
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={4} sm={4} md={4}>
                                            <CustomDatetime labelText="DateFrom" id='dtEventDate' name='FromDate' onChange={(evt) => this.onDateChange('datetime', 'FromDate', evt)} Futuredatevalidate={true} value={this.state.fields.FromDate} required={true} formControlProps={{ fullWidth: true }} />
                                            {this.state.errormessage && (this.state.fields.FromDate == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                                        </GridItem>

                                        <GridItem xs={4} sm={4} md={4}>
                                            <CustomDatetime labelText="DateTo" id='dtEventDate' name='ToDate' onChange={(evt) => this.onDateChange('datetime', 'ToDate', evt)} Futuredatevalidate={true} value={this.state.fields.ToDate} required={true} formControlProps={{ fullWidth: true }} />
                                            {this.state.errormessage && (this.state.fields.ToDate == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                                        </GridItem>
                                    </GridContainer>
                                    {this.state.accountFlag &&


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
                                                    <TranslationContainer translationKey="CustomerName" />
                          </InputLabel>
                                                    <Select
                                                        value={this.state.fields.Customer}
                                                        onChange={this.onInputChange}
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
                                                            this.state.CustomerNameData.map(item =>
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
                                                    <TranslationContainer translationKey="AccountType" />
                          </InputLabel>
                                                    <Select
                                                        value={this.state.fields.AccountTypeId}
                                                        onChange={this.onInputChange}
                                                        MenuProps={{
                                                            className: classes.selectMenu
                                                        }}
                                                        classes={{
                                                            select: classes.select
                                                        }}
                                                        inputProps={{
                                                            name: "AccountTypeId",
                                                            id: "simple-select"
                                                        }}
                                                    >
                                                        {
                                                            this.state.accountTypeData.map(item =>
                                                                <MenuItem
                                                                    value={item.accountType}
                                                                    classes={{
                                                                        root: classes.selectMenuItem,
                                                                        selected: classes.selectMenuItemSelected
                                                                    }}
                                                                >
                                                                    {item.accountType}
                                                                </MenuItem>
                                                            )
                                                        }
                                                    </Select>
                                            </FormControl>
                                            
                                            </GridItem>

                                            <GridItem xs={12} sm={12} md={3}>
                                                <CustomInput
                                                    labelText="AccountCode"
                                                    id="AccountCode"
                                                    value={this.state.fields.AccountCode}
                                                    name='AccountCode'
                                                    onChange={this.onInputChange}
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                />
                                            </GridItem>

                                            {
                                                //<GridItem xs={12} sm={12} md={4}>
                                                //    <CustomInput
                                                //        labelText="Account Name"
                                                //        id="AccountName"
                                                //        value={this.state.fields.AccountName}
                                                //        name='AccountName'
                                                //        onChange={this.onInputChange}
                                                //        formControlProps={{
                                                //            fullWidth: true
                                                //        }}
                                                //    />
                                                //</GridItem>
                                            }
                                            <GridItem xs={5} sm={3} md={3} lg={1}>
                                                <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                                                    <Button id="top-bnt" color="info" round onClick={() => this.onFormSubmit()}>
                                                    <TranslationContainer translationKey="Search" />
                          </Button>
                                                </Animated>
                                            </GridItem>
                                        </GridContainer>

                                    }
                                    {this.state.loader ?
                                        <GridContainer xl={12}>
                                            {this.state.displayGrid ?

                                                <GridItem lg={12}>

                                                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                        <ReactTable
                                                            title={"Report for" + " " + this.state.CustomerName+" " + "from"+" " + this.state.DateFrom+" " + "To" +" "+ this.state.DateTo}
                                                            data={this.state.newdata}
                                                            filterable
                                                            columns={[
                                                                {
                                                                    Header: "Date",
                                                                    accessor: "Date",
                                                                    minWidth: 40,
                                                                    style: { textAlign: "center" },
                                                                    headerClassName: 'react-table-center',
                                                                    resizable: false,

                                                                },
                                                                {
                                                                    Header: "MICAAccountCode",
                                                                    accessor: "AccountCode",
                                                                    minWidth: 20,
                                                                    style: { textAlign: "center" },
                                                                    headerClassName: 'react-table-center',
                                                                    resizable: false,

                                                                },
                                                                {
                                                                    Header: "MICAAccountName",
                                                                    accessor: "AccountName",
                                                                    minWidth: 30,
                                                                    style: { textAlign: "center" },
                                                                    headerClassName: 'react-table-center',
                                                                    resizable: false,
                                                                },
                                                                {
                                                                    Header: "CustomerAccountCode",
                                                                    accessor: "CustomerCode",
                                                                    minWidth: 30,
                                                                    style: { textAlign: "center" },
                                                                    headerClassName: 'react-table-center',
                                                                    resizable: false,
                                                                },
                                                                {
                                                                    Header: "CustomerAccountName",
                                                                    accessor: "CustomerAcName",
                                                                    minWidth: 30,
                                                                    style: { textAlign: "center" },
                                                                    headerClassName: 'react-table-center',
                                                                    resizable: false,
                                                                },
                                                                {
                                                                    Header: "AccountType",
                                                                    accessor: "AccountType",
                                                                    minWidth: 30,
                                                                    style: { textAlign: "center" },
                                                                    headerClassName: 'react-table-center',
                                                                    resizable: false,
                                                                },
                                                                {
                                                                    Header: "TxnDescription",
                                                                    accessor: "TxnDescription",
                                                                    minWidth: 30,
                                                                    style: { textAlign: "center" },
                                                                    headerClassName: 'react-table-center',
                                                                    resizable: false,
                                                                },

                                                                {
                                                                    Header: "Reference",
                                                                    accessor: "References",
                                                                    minWidth: 30,
                                                                    style: { textAlign: "center" },
                                                                    headerClassName: 'react-table-center',
                                                                    resizable: false,
                                                                },
                                                                //{
                                                                //    Header: "Amount",
                                                                //    accessor: "Amount",
                                                                //    minWidth: 20,
                                                                //    style: { textAlign: "center" },
                                                                //    headerClassName: 'react-table-center',
                                                                //    resizable: false,
                                                                //},

                                                                {
                                                                    Header: "AmountDebit",
                                                                    accessor: "DrAmount",
                                                                    minWidth: 20,
                                                                    //style: { textAlign: "center" },
                                                                    setCellProps: (value) => ({ style: { textAlign: "right" } }),
                                                                    headerClassName: 'react-table-center',
                                                                    resizable: false,
                                                                },
                                                                {
                                                                    Header: "AmountCredit",
                                                                    accessor: "CrAmount",
                                                                    minWidth: 20,
                                                                    //style: { textAlign: "center" },
                                                                    setCellProps: (value) => ({ style: { textAlign: "right" } }),
                                                                    headerClassName: 'react-table-center',
                                                                    resizable: false,
                                                                },
                                                                //{
                                                                //    Header: "Type of Transaction",
                                                                //    accessor: "TransactionType",
                                                                //    minWidth: 20,
                                                                //    style: { textAlign: "center" },
                                                                //    headerClassName: 'react-table-center',
                                                                //    resizable: false,
                                                                //},
                                                                {
                                                                    Header: "Currency",
                                                                    accessor: "Currency",
                                                                    minWidth: 20,
                                                                    style: { textAlign: "center" },
                                                                    headerClassName: 'react-table-center',
                                                                    resizable: false,
                                                                },
                                                            ]}
                                                            defaultPageSize={5}
                                                            showPaginationTop={false}
                                                            pageSize={([this.state.searchData.length + 1] < 5) ? [this.state.searchData.length + 1] : 5}
                                                            showPaginationBottom
                                                            className="-striped -highlight"
                                                        />

                                                    </Animated>
                                                </GridItem>

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

                                    {//this.state.displayGrid &&
                                        //<GridContainer justify="center">
                                        //    <GridItem >
                                        //        <ExportToExcel lstSheet={this.state.lstSheet} />
                                        //    </GridItem>
                                        //</GridContainer>
                                    }
                                </CardBody>
                            </Card>
                        </GridItem>
                    </GridContainer>
                    : <PageContentLoader />}
            </div>
        );
    }
}

export default withStyles(style)(Reports);