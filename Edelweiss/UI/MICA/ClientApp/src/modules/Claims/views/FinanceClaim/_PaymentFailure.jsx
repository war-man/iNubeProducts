import React from "react";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Icon from "@material-ui/core/Icon";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import TableCell from '@material-ui/core/TableCell';
import ClaimConfig from 'modules/Claims/ClaimConfig.js';

import ruleconfig from 'modules/RuleEngine/RuleConfig.js';
//import config from '../../../../config.js';
import failure from "assets/img/failure-payment.png";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import $ from 'jquery';
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import claim from "assets/img/claim.png";
//import ReactTable from "react-table";
import ReactTable from "components/MuiTable/MuiTable.jsx";
import swal from 'sweetalert';
import { Animated } from "react-animated-css";
import { CSVLink, CSVDownload } from "react-csv";
import ExportToExcel from "components/ExcelExport/ExcelPlugin/ExportToExcel.jsx";

import TableContentLoader from "components/Loaders/TableContentLoader.jsx";
import PageContentLoader from "components/Loaders/PageContentLoader.jsx";
import data_Not_found from "assets/img/data-not-found-new.png";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";

const paddingCard =
    {
        padding: "10px",
    };

class PaymentFailure extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageloader: false,
            nodata: false,
            loader: true,
            payment: [],
            tabledata: [],
            datediff: "",
            DateRange: false,
            lstSheet: [
                {
                    data: [],
                    sheetName: "Claim",
                    columnArray: [
                        {
                            Header: "BankFileId",
                            accessor: "bankFileId",
                        },
                        {
                            Header: "PolicyNo",
                            accessor: "policyNo",
                        },
                        {
                            Header: "ClaimNo",
                            accessor: "claimNo",
                        },
                        {
                            Header: "ClaimStatus",
                            accessor: "claimStatus",
                        },
                        {
                            Header: "InsuredName",
                            accessor: "insuredName",
                        },
                        {
                            Header: "InsuredRefNo",
                            accessor: "insuredRefNo",
                        },
                        {
                            Header: "BankAccountHolderName",
                            accessor: "bankAccountHolderName",
                        },
                        {
                            Header: "BankName",
                            accessor: "bankName",
                        },
                        {
                            Header: "BankAccountNumber",
                            accessor: "bankAccountNumber",
                        },
                        {
                            Header: "BankBranchAddress",
                            accessor: "bankBranchAddress",
                        },
                        {
                            Header: "BankIFSCCode",
                            accessor: "bankIfsccode",
                        },
                        {
                            Header: "Amount",
                            accessor: "amount",
                        },
                        {
                            Header: "UTRNo",
                            accessor: "utrno",
                        },
                        {
                            Header: "PaymentStatus",
                            accessor: "paymentStatus",
                        },
                        {
                            Header: "PaymentDate",
                            accessor: "paymentDate",
                        },
                        {
                            Header: "Active",
                            accessor: "active",
                        },
                        {
                            Header: "CreatedBy",
                            accessor: "creatBy",
                        },
                    ]
                }
            ],
            showtable: false,
            claims: {
                ClaimId: []
            },
            searchData: {
                fromDate: "",
                toDate: "",
                value: "Failure"
            },
            claimid: [],
        };
    }

    dataTable = () => {
        this.setState({ loader: true, showtable: true, });
        this.setState({
            tabledata: this.state.payment.map((prop, key) => {
                var i = true;
                var name = localStorage.getItem('displayName');
                return {
                    bankFileId: key + 1,
                    policyNo: prop.policyNo,
                    claimNo: prop.claimNo,
                    claimStatus: prop.claimStatus,
                    insuredName: prop.insuredName,
                    insuredRefNo: prop.insuredRefNo,
                    bankAccountHolderName: prop.bankAccountHolderName,
                    bankName: prop.bankName,
                    bankAccountNumber: prop.bankAccountNumber,
                    bankBranchAddress: prop.bankBranchAddress,
                    bankIfsccode: prop.bankIfsccode,
                    amount: prop.amount,
                    utrno: prop.utrno,
                    paymentStatus: prop.paymentStatus,
                    //paymentDate: prop.paymentDate
                    paymentDate: new Date(prop.paymentDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', }),
                    active: i,
                    creatBy: name,
                };
            })
        });
        for (let i = 0; i < this.state.payment.length; i++) {
            this.state.claimid.push(this.state.payment[i].claimId);
        }
        let claim = this.state.claims;
        claim.ClaimId = [...this.state.claimid];
        this.setState({ claim });
        console.log("claimid array: ", this.state.claims);
        console.log("claimid array: ", this.state.payment);
        this.state.lstSheet[0].data = this.state.tabledata;
        this.setState({});
        console.log("listsheet: ", this.state.lstSheet);
        console.log("tabledata: ", this.state.tabledata);
    }

    searchagain = () => {
        this.setState({ nodata: false });
        window.scrollTo(0, 0);
    }

    handleDateValidation() {
        //debugger;
        //let fromDate = this.state.searchData.fromDate;
        //let toDate = this.state.searchData.toDate;
        //var a = new Date(fromDate);
        //var b = new Date(toDate);

        //var currentDate = new Date();
        //var DateA = Date.UTC(a.getFullYear(), a.getMonth() + 1, a.getDate());
        //var DateB = Date.UTC(b.getFullYear(), b.getMonth() + 1, b.getDate());
        //var Datetoday = Date.UTC(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());

        //if (DateB != null && (parseFloat(DateB) > parseFloat(Datetoday))) {
        //    swal("", "ToDate cannot be greater than current date", "error");
        //}
        //else if (DateA != null && (parseFloat(DateB) < parseFloat(DateA))) {
        //    swal("", "ToDate cannot be less than from date", "error");
        //}
        //else {
        //    return -1;
        //}

        //}
    }

    onDateChange = (formate, type, name, event) => {

        //this.setState({ DateRange: true });
        var today = event.toDate();
        //var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        if (mm < 10) {
            mm = '0' + mm;

        }
        if (dd < 10) {
            dd = '0' + dd;
        }

        var date = dd + '/' + mm + '/' + today.getFullYear();
        var date2 = new Date();
        var date1 = new Date(today);
        if (type === 'searchData') {
            let searchData = this.state.searchData;
            searchData[name] = date;
            this.setState({ searchData });

            var timeDiff = date2.getTime() - date1.getTime();
            var datediff = this.state.date;
            datediff = Math.ceil(timeDiff / (1000 * 3600 * 24));
            // var datediff = datediff;
            this.setState({ datediff });
        }
    };

    newdatechange = (date) => {
        const _date = date.split('/');
        const dateObj = { month: _date[1], year: _date[2], day: _date[0] };

        return dateObj.year + '-' + dateObj.month + '-' + dateObj.day;
    }

    handlesearch = () => {
        let date = this.state.searchData;
        const fromdate = this.state.searchData.fromDate;
        const todate = this.state.searchData.toDate;
        if (this.state.searchData.fromDate != "") {
            this.state.searchData.fromDate = this.newdatechange(this.state.searchData.fromDate);

        }

        if (this.state.searchData.toDate != "") {
            this.state.searchData.toDate = this.newdatechange(this.state.searchData.toDate);
        }
        this.setState({ date });
        console.log("date values: ", date)
        this.setState({ loader: false });
        fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/GetPaymentFinanceData`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }, body: JSON.stringify(date)
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ payment: data });
                console.log("data ", data)
                this.setState({ showtable: false, loader: false });
                if (this.state.payment.length > 0) {
                    this.dataTable();
                } else {
                    setTimeout(
                        function () {
                            this.setState({ loader: true, showtable: false, nodata: true });
                        }.bind(this), 2000
                    );
                }
            });
        this.state.searchData.fromDate = fromdate;
        this.state.searchData.toDate = todate;
    }

    componentDidMount() {
        setTimeout(
            function () {
                this.setState({ pageloader: true });
            }.bind(this), 2000
        );
    }

    handleClick = () => {
        console.log("claims: ", this.state.claims);
        fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/ModifyActive`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }, body: JSON.stringify(this.state.claims)
        })
            .then(response => response.json())
            .then(data => {
                console.log("data ", data)
            });
        console.log("hitting");
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                {this.state.pageloader ?
                    <Card>
                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                                <Icon><img id="icon" src={failure} /></Icon>
                            </CardIcon>
                            <h4 className={this.props.cardIconTitle}>
                                <small><TranslationContainer translationKey="Paymentfailure" /></small>
                            </h4>
                        </CardHeader>
                        <CardBody>
                            <GridItem xs={12}>

                                <GridContainer>
                                    <GridItem xs={4} sm={4} md={3}>
                                        <CustomDatetime style="ddl"
                                            labelText="FromDate"
                                            name='fromDate'
                                            DateRange={this.state.DateRange}
                                            datediff={this.state.datediff}
                                            Futuredatevalidate={true}
                                            onChange={(evt) => this.onDateChange((evt) => 'datetime', 'searchData', 'fromDate', evt)}
                                            value={this.state.searchData.fromDate}
                                            formControlProps={{ fullWidth: true }} />
                                    </GridItem>
                                    <GridItem xs={4} sm={4} md={3}>
                                        <CustomDatetime style="ddl"
                                            labelText="ToDate"
                                            DateRange={this.state.DateRange}
                                            datediff={this.state.datediff}
                                            Futuredatevalidate={true}
                                            name='toDate'
                                            onChange={(evt) => this.onDateChange((evt) => 'datetime', 'searchData', 'toDate', evt)}
                                            value={this.state.searchData.toDate}
                                            formControlProps={{ fullWidth: true }} />
                                    </GridItem>
                                    <GridItem xs={3} sm={3} md={3}>
                                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                            <Button id="top-bnt" round onClick={this.handlesearch} color="success">
                                                <TranslationContainer translationKey="Search" />
                                            </Button>
                                        </Animated>
                                    </GridItem>
                                </GridContainer>

                            </GridItem>
                        </CardBody>
                    </Card>
                    : <PageContentLoader />}
                {this.state.loader ?
                    <GridContainer xl={12}>
                        {this.state.showtable ?
                            <GridItem xs={12}>
                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                    <ReactTable
                                        title={<h5><TranslationContainer translationKey="PaymentFailuresClaims" /></h5>}
                                        data={this.state.tabledata}
                                        filterable
                                        columns={[
                                            {
                                                Header: "PolicyNo",
                                                accessor: "policyNo",
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                headerClassName: 'react-table-center',
                                                minWidth: 200,
                                                resizable: false,
                                            },
                                            {
                                                Header: "ClaimNo",
                                                accessor: "claimNo",
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                headerClassName: 'react-table-center',
                                                minWidth: 250,
                                                resizable: false,
                                            },
                                            {
                                                Header: "ClaimStatus",
                                                accessor: "claimStatus",
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                headerClassName: 'react-table-center',
                                                minWidth: 100,
                                                resizable: false,
                                            },
                                            {
                                                Header: "InsuredName",
                                                accessor: "insuredName",
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                headerClassName: 'react-table-center',
                                                minWidth: 100,
                                                resizable: false,
                                            },
                                            {
                                                Header: "InsuredRefNumber",
                                                accessor: "insuredRefNo",
                                                minWidth: 200,
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                headerClassName: 'react-table-center',
                                                resizable: false,
                                            },
                                            {
                                                Header: "BankAccountHolderName",
                                                accessor: "bankAccountHolderName",
                                                minWidth: 200,
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                headerClassName: 'react-table-center',
                                                resizable: false,
                                            },
                                            {
                                                Header: "BankName",
                                                accessor: "bankName",
                                                minWidth: 100,
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                headerClassName: 'react-table-center',
                                                resizable: false,
                                            },
                                            {
                                                Header: "BankAccountNumber",
                                                accessor: "bankAccountNumber",
                                                minWidth: 200,
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                headerClassName: 'react-table-center',
                                                resizable: false,
                                            },
                                            {
                                                Header: "BankBranchAddress",
                                                accessor: "bankBranchAddress",
                                                minWidth: 200,
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                headerClassName: 'react-table-center',
                                                resizable: false,
                                            },
                                            {
                                                Header: "BankIFSCCode",
                                                accessor: "bankIfsccode",
                                                minWidth: 200,
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                headerClassName: 'react-table-center',
                                                resizable: false,
                                            },
                                            {
                                                Header: "Amount",
                                                accessor: "amount",
                                                minWidth: 100,
                                                setCellProps: (value) => ({ style: { textAlign: "right" } }),
                                                headerClassName: 'react-table-center',
                                                resizable: false,
                                            },
                                            {
                                                Header: "BankRefNo",
                                                accessor: "utrno",
                                                minWidth: 100,
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                headerClassName: 'react-table-center',
                                                resizable: false,
                                            },
                                            {
                                                Header: "PaymentStatus",
                                                accessor: "paymentStatus",
                                                minWidth: 150,
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                headerClassName: 'react-table-center',
                                                resizable: false,
                                            },
                                            {
                                                Header: "PaymentDate",
                                                accessor: "paymentDate",
                                                minWidth: 100,
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                headerClassName: 'react-table-center',
                                                resizable: false,
                                            },
                                        ]}
                                        defaultPageSize={5}
                                        pageSize={([this.state.tabledata.length + 1] < 5) ? [this.state.tabledata.length + 1] : 5}
                                        showPaginationTop={false}
                                        showPaginationBottom={([this.state.tabledata.length + 1] <= 5) ? false : true}
                                        className="-striped -highlight"
                                    />
                                </Animated>
                                <GridContainer justify="center">
                                    <GridItem>
                                        <ExportToExcel lstSheet={this.state.lstSheet} onClick={this.handleClick} />
                                    </GridItem>
                                </GridContainer>

                            </GridItem>
                            : <GridItem lg={12}>{
                                this.state.nodata ? <Card>
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
                                    : null}
                            </GridItem>}
                    </GridContainer>
                    : <Card style={paddingCard}>
                        <TableContentLoader />
                    </Card>}
            </div>
        );
    }
}
export default PaymentFailure;