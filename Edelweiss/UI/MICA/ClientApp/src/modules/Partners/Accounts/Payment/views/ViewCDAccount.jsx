import React from "react";
//import Moment from 'react-moment';
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
import PropTypes from "prop-types";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import CustomCheckbox from "components/Checkbox/CustomCheckbox";
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
import Datetime from "react-datetime";
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
import Paper from '@material-ui/core/Paper';
import swal from 'sweetalert';

import viewcd from "assets/img/shield.png";
import Icon from "@material-ui/core/Icon";
import { Animated } from "react-animated-css";
import ReactTable from "components/MuiTable/MuiTable.jsx";

const tableClassRow = {
    //   color: "red"
}
const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: "#086b77",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,

    },
}))(TableCell);
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

const SubmitBtn = {
    left: "28%"

}

const balanceBtn = {
    left: "215%",
    top: "10px",
    float: "right"

}
const header = {
    fontSize: "16px",
    color: "#333",
    fontSize: "500",
    lineHeight: "1"


}
const tableStyle = { borderRadius: '10px  ', width: '80%' }


const tableRow = { height: 'Auto', width: 'Auto', }


class ViewCDaccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errordate: false,
            errdate: false,
            data: [],
            newdata: [],
            simpleSelect: "",
            partnerName: "",
            productName: "",
            List: "",
            DateRange: false,
            datediff:"",
            PartnerData: [],
            ProductData: [],
            PolicyData: [],
            datalist: [],
            fields: {
                PartnerId: "",
                ProductId: "",
            },
            display: false,
            show: false,
            hide: false,
            SearchAccountList: [],
            SearchCdTransactionList: [],
            SearchCdTransactionList: [],
            SearchAccountModel: {
                "partnerId": "",
                "productId": "",
                "isActive": true,
                "isPaymentReceived": true,
                "accountNo": "",
                "paymentModeId": "",
                "fromDate": "",
                "toDate": "",
                "policyNo": "",
                "txnType": "",
                "lob": "",
                "cob": ""
            },
            cdAccountsDTO:
                {
                    lob: "",
                    cob: "",
                    threshold: "",
                    droplimit: "",
                    PartnerId: "",
                    ProductId: ""
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
        this.onDateChange = this.onDateChange.bind(this);
    };
    setValue = (event) => {
        event.preventDefault();

        let SearchAccountModel = this.state.SearchAccountModel;
        let name = event.target.name;
        let value = event.target.value;
        SearchAccountModel[name] = value;
        console.log("name", name);
        console.log("value", value);
        this.setState({ SearchAccountModel });
        console.log("data", this.state.SearchAccountModel)
        if (name == "partnerId") {
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
                    console.log("datalistmvalue", this.state.datalist.mValue);

                    let ProductData = this.state.ProductData;
                    ProductData = data;

                    this.setState({ ProductData });
                    console.log("ProductDatalist", this.state.ProductData);
                });

        }
        if (name == "productId") {
            let List = this.state.datalist.filter(item => item.mID == value);
            console.log("proid", List);
            let SearchAccountModel = this.state.SearchAccountModel;
            SearchAccountModel["lob"] = List[0].lob;
            SearchAccountModel["cob"] = List[0].cob;
            console.log("SearchAccountModel with lob", this.state.SearchAccountModel);
        }
        this.setState({ display: false, hide: false, show: false })
    }

    handleSimple = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    //handleOpen = () => {
    //    this.setState({ open: true });
    //};
    //handleClose = () => {
    //    this.setState({ open: false });
    //};
    //handleToggle(value) {
    //    const { checked } = this.state;
    //    const currentIndex = checked.indexOf(value);
    //    const newChecked = [...checked];

    //    if (currentIndex === -1) {
    //        newChecked.push(value);
    //    } else {
    //        newChecked.splice(currentIndex, 1);
    //    }

    //    this.setState({
    //        checked: newChecked
    //    });
    //}

    onClick = () => {
        const { show } = this.state.show;
        this.setState({ hide: false });
        console.log("SearchAccountModel", this.state.SearchAccountModel);
        if (this.state.SearchAccountModel.partnerId != "" && this.state.SearchAccountModel.productId != "") {
            let that = this;
            fetch(`${paymentConfig.partnerconfigUrl}/api/Accounts/SearchCdAccountAsync`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify(that.state.SearchAccountModel)
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                if (data.length > 0) {
                    that.dataTable(data);
                    console.log('data coming inside', data);
                    that.setState({ SearchAccountList: data });

                    that.setState({ show: true });
                } else {
                    swal("", "CD-Account does not exist", "error");
                    that.setState({ display: false, hide: false, show: false })
                }
                console.log('SearchAccountList data', that.state.SearchAccountList);
            });
        }
    }

    onClickView = () => {
        const { hide } = this.state.hide;
        this.setState({ hide: true });
        // this.setState({ show: false });

    }

    datechange = (date) => {
        const _date = date.split('/');
        const dateObj = { month: _date[1], year: _date[2], day: _date[0] };

        return dateObj.year + '-' + dateObj.month + '-' + dateObj.day;
    }

    onClickdisplay = () => {
        this.setState({ hide: true });
        console.log('SearchAccountList data', this.state.SearchAccountModel);
        const fdate = this.state.SearchAccountModel.fromDate;
        const tdate = this.state.SearchAccountModel.toDate;
        let that = this;
        if (that.state.SearchAccountModel.fromDate != "" && that.state.SearchAccountModel.toDate != "") {
          
            this.state.SearchAccountModel.fromDate = this.datechange(this.state.SearchAccountModel.fromDate);
            this.state.SearchAccountModel.toDate = this.datechange(this.state.SearchAccountModel.toDate);
            
            fetch(`${paymentConfig.partnerconfigUrl}/api/Accounts/SearchCdTransactionAsync`, {
                //fetch(`https://localhost:44315/api/Accounts/SearchCdTransactionAsync`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify(this.state.SearchAccountModel)
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log('SearchCdTransactionAsync data', data);
                if (data.length > 0) {
                    that.ReactTable(data);
                    that.setState({ SearchCdTransactionList: data });

                    const display = that.state.display;

                    that.setState({ display: true });
                } else {
                    that.setState({ display: false });
                    swal("", "No records found", "error");
                }
            });
        } else {
            swal("", "Please select From and To date", "error");
        }

        this.state.SearchAccountModel.fromDate = fdate;
        this.state.SearchAccountModel.toDate = tdate;
    }

    onInputChange = (evt) => {
        const fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
    };

    onDateChange = (format,type, name, event) => {
        debugger;
        //console.log("event", event);
        //console.log("name", name);
        //var today = event.toDate();
        ////var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
        //var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
        //console.log("today", today);
        //console.log("date", date);
        //if (type == 'SearchAccountModel') {
        //    let SearchAccountModel = this.state.SearchAccountModel;
        //    SearchAccountModel[name] = date;
        //    this.setState({ SearchAccountModel });
        //}
        //let fromDate = this.state.SearchAccountModel.fromDate;
        //let toDate = this.state.SearchAccountModel.toDate;
        //var a = new Date(fromDate);
        //var b = new Date(toDate);

        //var currentDate = new Date();
        //var DateA = Date.UTC(a.getFullYear(), a.getMonth() + 1, a.getDate());
        //var DateB = Date.UTC(b.getFullYear(), b.getMonth() + 1, b.getDate());
        //var Datetoday = Date.UTC(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());

        ////if (DateB != null && (parseFloat(DateB) > parseFloat(Datetoday))) {
        ////    swal("", "ToDate cannot be greater than current date", "error");
        ////}
       
        //if (DateA != null && (parseFloat(DateB) < parseFloat(DateA))) {
        //    swal("", "ToDate cannot be less than from date", "error");
        //}
        //else {
        //    return -1;
        //}
        // if (type == 'Channel') {
        //   let ProductDTO = this.state.ProductDTO;
        // ProductDTO[name] = date;
        //}
        console.log("SearchAccountModel", this.state.SearchAccountModel);
       
        this.setState({ DateRange: true });
        var today = event.toDate();
        var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
        var date2 = new Date();
        var date1 = new Date(today);
        if (type === 'SearchAccountModel') {
            let SearchAccountModel = this.state.SearchAccountModel;
            SearchAccountModel[name] = date;
            this.setState({ SearchAccountModel });

            var timeDiff = date2.getTime() - date1.getTime();
            var datediff = this.state.date;
            datediff = Math.ceil(timeDiff / (1000 * 3600 * 24));
            // var datediff = datediff;
            this.setState({ datediff });
        }
      
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
                console.log("partnerdata coming", data);
                this.setState({ PartnerData: data });

            });
        console.log("partnerdata coming", this.state.PartnerData);
        //fetch(`${paymentConfig.productConfigUrl}/api/Product/GetMasterData?sMasterlist=Product`, {
        //    method: 'GET',
        //    headers: {
        //        'Accept': 'application/json',
        //        'Content-Type': 'application/json',
        //        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
        //    },
        //})
        //    .then(response => response.json())
        //    .then(data => {
        //        console.log("product coming", data);
        //        this.setState({ ProductData1: data });
        //    });
        console.log("product list", this.state.ProductData);
    }

    dataTable = (newlist) => {
        console.log("list in react", newlist);
        this.setState({
            data: newlist.map((prop, key) => {
                console.log("coming");
                const { classes } = this.props;
                console.log("prop data", prop);
                console.log("send data", key);
                return {
                    id: key + 1,
                    cdid: prop.cdid,
                    accountNo: prop.accountNo,
                    partnerId: prop.partnerId,
                    partnerName: prop.partnerName,
                    productId: prop.productId,
                    productName: prop.productName,
                    initialAmount: (prop.initialAmount != null) ? prop.initialAmount.toFixed(2) : null,
                    availableBalance: (prop.availableBalance != null) ? prop.availableBalance.toFixed(2) : null,

                };

            })
        });
    }

    ReactTable = (newlist) => {
        console.log("list in react", newlist);
        this.setState({
            newdata: newlist.map((prop, key) => {
                //console.log("coming");
                //const { classes } = this.props;
                //console.log("prop data", prop);
                //console.log("send data", key);
                return {
                    id: key + 1,
                    txnId: prop.txnId,
                    partnerName: prop.partnerName,
                    //transactionDate: new Date(prop.transactionDate).toISOString().slice(0, 10),
                    transactionDate: new Date(prop.transactionDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', }),
                    txnAmount: (prop.txnAmount != null) ? prop.txnAmount.toFixed(2) : null,
                    initialAmount: (prop.initialAmount != null) ? prop.initialAmount.toFixed(2) : null,
                    availableAmount: (prop.availableAmount != null) ? prop.availableAmount.toFixed(2) : null,
                    description: prop.description,
                    txnType: prop.txnType,

                };

            })
        });
        console.log("list in newlist", this.state.newdata);
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                <Card>

                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                            {/*  <FilterNone /> */}
                            <Icon><img id="icon" src={viewcd} /></Icon>
                        </CardIcon>
                        <h4 style={header}><small>View CD Account</small></h4>
                    </CardHeader>
                    <CardBody>

                        <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                            <CreateCDAccountPage classes={this.classes} handleSimple={this.handleSimple} SetValue={this.SetValue} PartnerData={this.state.PartnerData} ProductData={this.state.ProductData} fields={this.state.fields} onInputChange={this.onInputChange} setValue={this.setValue} cdAccountsDTO={this.state.SearchAccountModel} />
                        </Animated>



                        <GridContainer lg={12} justify="center" >
                            <GridItem xs={5} sm={3} md={3} lg={1}>
                                <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                                    <Button color="info" round onClick={this.onClick} >Search</Button>
                                </Animated>
                            </GridItem>
                        </GridContainer>

                        {this.state.show && this.state.SearchAccountList.length > 0 &&
                            <GridContainer lg={12} justify="center" >
                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                    <div className="banner">
                                        <label> Account Number: </label><h5>{this.state.SearchAccountList[0].accountNo}</h5>
                                        <label>Initial Amount:</label> <h5>{this.state.SearchAccountList[0].initialAmount}</h5>
                                        <label>Available Balance:</label> <h5>{this.state.SearchAccountList[0].availableBalance}</h5>
                                    </div>
                                </Animated>

                                <GridContainer lg={12} sm={12} className="repli-date-time" justify="center">
                                    <GridItem xs={12} sm={6} md={3}>

                                        <CustomDatetime labelText="From Date" id='dtEffectFrom' DateRange={this.state.DateRange} datediff={this.state.datediff} name='fromDate' onChange={(evt) => this.onDateChange('datetime','SearchAccountModel', 'fromDate', evt)} value={this.state.SearchAccountModel.fromDate} formControlProps={{ fullWidth: true }} />

                                    </GridItem>
                                    <GridItem xs={12} sm={6} md={3}>
                                        <CustomDatetime labelText="To Date" id='dtEffectFrom' DateRange={this.state.DateRange} datediff={this.state.datediff} name='toDate' onChange={(evt) => this.onDateChange('datetime','SearchAccountModel', 'toDate', evt)} value={this.state.SearchAccountModel.toDate} formControlProps={{ fullWidth: true }} />
                                        {this.state.errordate ? <p className="error">*ToDate Cannot be less than from date</p> : null}
                                    </GridItem>
                                </GridContainer>
                            </GridContainer>
                        }

                        {this.state.show && this.state.SearchAccountList.length > 0 && <GridContainer lg={12} justify="center">
                            <GridItem xs={5} sm={3} md={3} lg={1}>
                                {/*  <Button color="info" round > ViewCDbalance</Button> */}
                                {/*   <Button color="warning" round onClick={this.onClickView} style={balanceBtn} > ViewStatement</Button> */}
                                <Button color="warning" id="right-15px" round onClick={this.onClickdisplay} round >Get Statement</Button>
                            </GridItem>
                        </GridContainer>}

                        {this.state.hide &&
                            <GridContainer className="viewStatement_grid">




                                
                            </GridContainer>

                        }








                    </CardBody>
                </Card >
            </Animated>
            {
            this.state.display ?
            <GridContainer>
                <GridItem xs={12}>
                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>

                        <ReactTable
                            data={this.state.newdata}
                            filterable
                            columns={[
                                {
                                    Header: "S-No",
                                    accessor: "id",
                                    headerClassName: 'react-table-center',
                                    style: { textAlign: "center" },
                                    // width: '50'
                                    minWidth: 40,
                                    resizable: false,
                                },
                                //{
                                //    Header: "TXN-ID",
                                //    accessor: "txnId",

                                //},

                                {
                                    Header: "Trans-Date",
                                    accessor: "transactionDate",
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minwidth: '40',
                                    resizable: false,
                                    // minWidth: 100
                                },
                                {
                                    Header: "Description",
                                    accessor: "description",
                                    style: { textAlign: "left" },
                                    headerClassName: 'react-table-center',
                                    //width: '50'
                                    minWidth: 80,
                                    resizable: false,
                                },
                                {
                                    Header: "Opening Balance",
                                    accessor: "initialAmount",
                                    style: { textAlign: "right" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 100,
                                    resizable: false,
                                },
                                {
                                    Header: "Trans-Type",
                                    accessor: "txnType",
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minwidth: 40,
                                    resizable: false,

                                },
                                {
                                    Header: "Trans-Amount",
                                    accessor: "txnAmount",
                                    // headerClassName: 'rt-tr-align-right',
                                    style: { textAlign: "right" },
                                    headerClassName: 'react-table-center',
                                    // textAlign:"right"
                                    // Width: "20px"
                                    // width: '30'
                                    minwidth: 40,
                                    resizable: false,
                                },

                                {
                                    Header: "Closing Balance",
                                    accessor: "availableAmount",
                                    style: { textAlign: "right" },
                                    headerClassName: 'react-table-center',
                                    //   width: '50'
                                    resizable: false,
                                },


                            ]}
                            defaultPageSize={5}
                            pageSize={([this.state.newdata.length + 1] < 5) ? [this.state.newdata.length + 1] : 5}
                            showPaginationTop={false}
                            showPaginationBottom
                            className="-striped -highlight discription-tab"
                        //loading={this.state.newdata}
                        //   loadingText="coming"
                        />

                    </Animated>
                </GridItem>





                {/*         <div className="tableCD">
                                    <Table style={tableStyle} id="clauseTable">
                                        <TableHead>
                                            <TableRow className="table-row" style={tableRow}>
                                                <CustomTableCell className="table-row" ><h7><b>S-NO</b></h7></CustomTableCell>
                                                <CustomTableCell className="table-row"><h7><b>TXN-ID</b></h7></CustomTableCell>
                                                 <CustomTableCell className="tableClassRow"><h7><b>TRANS-TYPE</b></h7></TableCell>
                                                <CustomTableCell className="table-row"><h7><b>PARTNER NAME</b></h7></CustomTableCell>
                                                <CustomTableCell className="table-row"><h7><b>TRANS-DATE</b></h7></CustomTableCell>
                                                <TableCell className="tableClassRow"><h7><b>PAYMENT-TYPE</b></h7></TableCell>
                                                <CustomTableCell className="table-row"><h7><b>TRANS-AMOUNT</b></h7></CustomTableCell>
                                                <CustomTableCell className="table-row"><h7><b>INITIAL AMOUNT</b></h7></CustomTableCell>
                                                <CustomTableCell className="table-row"><h7><b>AVAILABLE AMOUNT</b></h7></CustomTableCell>
                                                    </TableRow>
                                        </TableHead>
                                        {this.state.SearchCdTransactionList.map((topic, index) =>
                                            <TableRow className="table-row" key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <CustomTableCell>{topic.txnId}</CustomTableCell>
                                             <TableCell><h6><b>{topic.txnType}</b></h6></TableCell>
                                                <CustomTableCell>{topic.partnerName}</CustomTableCell>
                                                <CustomTableCell>{topic.transactionDate}</CustomTableCell>
                                                <CustomTableCell>{topic.txnAmount}</CustomTableCell>
                                                <CustomTableCell>{topic.initialAmount}</CustomTableCell>
                                                <CustomTableCell>{topic.availableAmount}</CustomTableCell>
                                            </TableRow>
                                        )}
                                        </Table>
                                    </div>
                                    */}
            </GridContainer>
            : null
        }
        </div>
        );
    }
}

export default withStyles(style)(ViewCDaccount);
