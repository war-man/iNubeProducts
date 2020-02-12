import React from "react";
import Icon from "@material-ui/core/Icon";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.jsx";

import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";

import CDAccountDashboard from "assets/img/security.png";

// @material-ui/icons
import CardBody from "components/Card/CardBody.jsx";
import Card from "components/Card/Card.jsx";
import TableCell from '@material-ui/core/TableCell';
import approved from "assets/img/approved.png";
//import CardBody from "components/Card/CardBody.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { CSVLink, CSVDownload } from "react-csv";
import { Animated } from "react-animated-css";
//import ReactTable from "react-table";
import ReactTable from "components/MuiTable/MuiTable.jsx";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import CustomCheckbox from "components/Checkbox/CustomCheckbox";
import ClaimConfig from 'modules/Claims/ClaimConfig.js';
import ExportToExcel from "components/ExcelExport/ExcelPlugin/ExportToExcel.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { dataTable } from "../../../../variables/general";
import swal from 'sweetalert';
import validationPage from "modules/Claims/views/ValidationPage.jsx";

import TableContentLoader from "components/Loaders/TableContentLoader.jsx";
import PageContentLoader from "components/Loaders/PageContentLoader.jsx";
import data_Not_found from "assets/img/data-not-found-new.png";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";


const style = {
    ...dashboardStyle,
};

const paddingCard =
    {
        padding: "10px",
    };

class ApprovedClaim extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageloader: false,
            nodata: false,
            loader: true,
            approved: [],
            tabledata: [],
            datediff: "",
            DateRange: false,
            errordate: false,
            fromDateState: "",
            toDateState: "",
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
                            //Header: "Bank Ref.No.",
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
                ClaimNumber: []
            },
            searchData: {
                fromDate: "",
                toDate: "",
            },
            claimNo: [],
            selected: [],
        };
        this.onDateChange = this.onDateChange.bind(this);
    }

    SetclauseValue = (index, event) => {
        let state = this.state;
        if (event.target.checked == true) {
            state.selected.push(this.state.tabledata[index]);
        } else if (event.target.checked == false) {
            console.log("selected array: ", this.state.tabledata[index].bankFileId);
            state.selected=state.selected.filter(item => item.bankFileId !== this.state.tabledata[index].bankFileId);
        }
        this.setState({ state });
        console.log("selected: ", this.state.selected);
    }

    dataTable = () => {
        this.setState({ loader: true, showtable: true, });
        this.setState({
            tabledata: this.state.approved.map((prop, key) => {
                var i = true;
                var name = localStorage.getItem('displayName');
                var payment;
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
                    paymentDate: "",
                    active: i,
                    creatBy: name,
                    select: <CustomCheckbox key={key}
                        name="select"
                        value={this.state.selected}
                        onChange={(e) => this.SetclauseValue(key, e)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />,
                };
            })
        });
        console.log("claim approved array: ", this.state.approved);
        for (let i = 0; i < this.state.selected.length; i++) {
            this.state.claimNo.push(this.state.selected[i].claimNo);
        }

        console.log("claimid array: ", this.state.claimNo);
        let claim = this.state.claims;
        claim.ClaimNumber = [...this.state.claimNo];
        this.setState({ claim });
        console.log("claimid array: ", this.state.claims);
        console.log("claimid array: ", this.state.approved);
        this.state.lstSheet[0].data = this.state.selected;
        this.setState({});
        console.log("listsheet: ", this.state.lstSheet);
        console.log("tabledata: ", this.state.tabledata);
    }

    searchagain = () => {
        this.setState({ nodata: false });
        window.scrollTo(0, 0);
    }

    handleDateValidation() {

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
        // var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        if (mm < 10) {
            mm = '0' + mm;
        }
        if (dd < 10) {
            dd = '0' + dd;
        }

        var date = dd + '/' + mm + '/' + today.getFullYear();
        const searchData = this.state.searchData;
        searchData[name] = date;
        this.setState({ searchData });

        if (this.state.searchData.toDate < this.state.searchData.fromDate) {
            this.state.errordate = true;
            this.setState({});
        } else {

        }
        this.change(event, name, formate, date, type);
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
        fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/GetFinanceBankData`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(date)
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ approved: data });
                this.setState({ showtable: false, loader: false });
                console.log("response data ", data)
                if (this.state.approved.length > 0) {
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

    handleClick = () => {
        console.log("claims: ", this.state.claims);
        //fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/ModifyActive`, {
        //    method: 'POST',
        //    headers: {
        //        'Accept': 'application/json',
        //        'Content-Type': 'application/json',
        //        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
        //    }, body: JSON.stringify(this.state.claims)
        //})
        //    .then(response => response.json())
        //    .then(data => {
        //        console.log("data ", data)
        //    });
        //console.log("hitting");
    }

    componentDidMount() {
        setTimeout(
            function () {
                this.setState({ pageloader: true });
            }.bind(this), 2000
        );
    }

    change(event, stateName, type, date, stateNameEqualTo, maxValue) {
        switch (type) {
            case "fromDate":
                if (validationPage.verifydatetime(date)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "toDate":
                if (validationPage.verifydatetime(date)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                {this.state.pageloader ?
                    <Card>
                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                                <Icon><img id="icon" src={approved} /></Icon>
                            </CardIcon>
                            <h4 className={this.props.cardIconTitle}>
                                <small><TranslationContainer translationKey="Approvedclaims" /></small>
                            </h4>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={3} sm={3} md={3}>
                                    <CustomDatetime
                                        success={this.state.searchData.fromDateState === "success"}
                                        error={this.state.searchData.fromDateState === "error"}
                                        style="ddl"
                                        labelText="FromDate"
                                        DateRange={this.state.DateRange}
                                        Futuredatevalidate={true}
                                        datediff={this.state.datediff}
                                        name='fromDate'
                                        onChange={(evt) => this.onDateChange('datetime', 'searchData', 'fromDate', evt)}
                                        value={this.state.searchData.fromDate}
                                        formControlProps={{ fullWidth: true }} />

                                </GridItem>
                                <GridItem xs={3} sm={3} md={3}>
                                    <CustomDatetime
                                        success={this.state.searchData.toDateState === "success"}
                                        error={this.state.searchData.toDateState === "error"}
                                        style="ddl"
                                        labelText="ToDate"
                                        DateRange={this.state.DateRange}
                                        Futuredatevalidate={true}
                                        datediff={this.state.datediff}
                                        name='toDate'
                                        onChange={(evt) => this.onDateChange('datetime', 'searchData', 'toDate', evt)}
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
                        </CardBody>
                    </Card>
                    : <PageContentLoader />}
                {this.state.loader ?
                    <GridContainer xl={12}>
                        {this.state.showtable ?
                            <GridItem xs={12}>
                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                    <ReactTable
                                        title={<h5><TranslationContainer translationKey="AppClaims" /></h5>}
                                        data={this.state.tabledata}
                                        filterable
                                        columns={[
                                            {
                                                Header: "Select",
                                                accessor: "select",
                                                minWidth: 60,
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                headerClassName: 'react-table-center',
                                                sortable: false,
                                                resizable: false,
                                            },
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
                                            //{
                                            //    Header: "Bank Ref.No.",
                                            //    accessor: "utrno",
                                            //    minWidth: 100,
                                            //    style: { textAlign: "center" },
                                            //    headerClassName: 'react-table-center',
                                            //    resizable: false,
                                            //},
                                            //{
                                            //    Header: "Payment Status",
                                            //    accessor: "paymentStatus",
                                            //    minWidth: 150,
                                            //    style: { textAlign: "center" },
                                            //    headerClassName: 'react-table-center',
                                            //    resizable: false,
                                            //},
                                            //{
                                            //    Header: "Payment Date",
                                            //    accessor: "paymentDate",
                                            //    minWidth: 100,
                                            //    style: { textAlign: "center" },
                                            //    headerClassName: 'react-table-center',
                                            //    resizable: false,
                                            //},
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

export default withStyles(style)(ApprovedClaim);