import React from "react";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import role from "assets/img/users.png";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import SearchInvoice from "../Invoice/SearchInvoice";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import InvoiceFinance from "./_InvoiceFinance";
import Modal from '@material-ui/core/Modal';
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import ReactTable from "components/MuiTable/MuiTable.jsx";
import BillingConfig from 'modules/Billing/BillingConfig.js';
import swal from 'sweetalert';
import Edit from "@material-ui/icons/Edit";
import Check from "@material-ui/icons/CheckCircle";
import Cancel from "@material-ui/icons/Cancel";
import $ from 'jquery';
import { Animated } from "react-animated-css";
import Delete from "@material-ui/icons/Delete";
import Add from "@material-ui/icons/AddCircleOutline";
import Tooltip from '@material-ui/core/Tooltip';
import money from "assets/img/money.png"
import IconButton from '@material-ui/core/IconButton';

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
    width: "26px",
    height: "28px",
    borderRadius: "4px",
    fontSize: "larger",
    padding: "0px",
    right: '10px',

}

const scale = {
    visibility : "hidden !important"
}

class RealisePayments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // radiolist1: [{ cob: null, disable: false, label: null, lob: null, mID: 0, mIsRequired: false, mType: "Type", mValue: "Yes", planCode: null, selectedValue: 0, value: null }, { cob: null, disable: false, label: null, lob: null, mID: 1, mIsRequired: false, mType: "Type", mValue: "No", planCode: null, selectedValue: 0, value: null }],
            paymentdetails: false,
            masterList: [],
            invoiceDetails: [],
            InvoiceData: {
                contractName: "",
                status: "",
                invoiceNo: "",
                invoiceEffectiveDate: "",
                invoiceEndDate: ""
            },
            InvoiceSelectedNo: "",
            InvDatails: [],
            PaymentDto: [{
                "paymentId": 0,
                "paymentTypeId": 0,
                "paymentDate": "",
                "realisedDate": "",
                "paymentAmount": "",
                "paymentRefId": 0,
                "invoiceId": 0,
                "bankName": "",
                "branchName": "",
                "ifscCode": "",
                "statusId": 0,
                "createdBy": 0,
                "createdDate": "",
                "paid": 0,
                "balance": 0,
            }],
            PaymentList: {
                "invoiceId": 0,
                "payment": []
            },
            PaymentData: [],
            PaymentDataList: [],
            InvoiceId: 0,
            invbalance: 0,
            searchContractTable: false,
            Status: "",
            acceptClass: false,
            rejectClass: false,
            rj: "bnt-scale",
            
        };
       //  this.handleacceptcall = this.handleacceptcall.bind(this);

    }

    componentDidMount() {

        fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/GetMaster?lMasterlist=InvoiceStatus`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("masterList: ", data);
                this.setState({ masterList: data });
            });
        console.log("data", this.state.masterList);
    }

    searchInvoice = () => {
        let effdate = "";
        let enddate = "";
        if (this.state.InvoiceData.invoiceEffectiveDate != "") {
            effdate = this.state.InvoiceData.invoiceEffectiveDate;
            this.state.InvoiceData.invoiceEffectiveDate = this.datechange(this.state.InvoiceData.invoiceEffectiveDate);
        }
        if (this.state.InvoiceData.invoiceEndDate != "") {
            effdate = this.state.InvoiceData.invoiceEndDate;
            this.state.InvoiceData.invoiceEndDate = this.datechange(this.state.InvoiceData.invoiceEndDate);
        }

        fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/GetSearchInvoiceHistory`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.InvoiceData)
        }).then(response => response.json())
            .then(data => {

                this.setState({ invoiceDetails: data });
                console.log("history data:", data);
                if (this.state.invoiceDetails.length > 0) {
                    this.setState({ searchContractTable: true });
                    this.tabledata();
                }

            });


        this.state.InvoiceData.invoiceEffectiveDate = effdate;
        this.state.InvoiceData.invoiceEndDate = enddate;
        // document.getElementById('searchTableSec');
    }

    onInputChange = (evt, index) => {
        const fields = this.state.PaymentDto[index];
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
        console.log("name", evt.target.name);
        //paymentAmount
        //let payed = 0;
        if (evt.target.name == "paid") {

            //let paid = this.state.PaymentDto.paid;
            //let payed = this.state.PaymentDto.paymentAmount;
            //let available = this.state.PaymentDto.balance;
            //let changePaid = paid + payed;
            //let changeBal = available - payed;
            //this.setState({ changePaid });
            //this.setState({ changeBal });
            //this.state.PaymentDto.paid = changePaid;
            //this.state.PaymentDto.balance = changeBal;
        }

    };

    onDateChange = (formate, name, index, event) => {
        var today = event.toDate();
        var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
        var date2 = new Date();
        var date1 = new Date(today);
        let state = this.state.PaymentDto[index];
        state[name] = date;
        this.setState({ state });

    };
    datechange = (date) => {
        const _date = date.split('/');
        const dateObj = { month: _date[1], year: _date[2], day: _date[0] };

        return dateObj.year + '-' + dateObj.month + '-' + dateObj.day;
    }
    datechange = (date) => {
        const _date = date.split('/');
        const dateObj = { month: _date[1], year: _date[2], day: _date[0] };

        return dateObj.year + '-' + dateObj.month + '-' + dateObj.day;
    }

    tabledata = () => {
        this.setState({
            invoiceDetailsData: this.state.invoiceDetails.map((prop, key) => {
                return {
                    SNo: key + 1,
                    ContractId: prop.contractId,
                    OrgName: prop.orgName,
                    InvoiceNo: prop.invoiceNo,
                    InvoiceDate: new Date(prop.invoiceDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', }),
                    CreditDaysRemaining: prop.creditDaysRemaining,
                    Currency: prop.currency,
                    InvAmount: prop.invAmount,
                    Balance: prop.balance,
                    Status: prop.status,
                    radio: < input type="radio" name="product" onClick={this.editFunction.bind(this, key, prop.invoiceId)} />,
                    btn: <Button color="info" justIcon round simple className="edit" onClick={this.handleView.bind(this, key, prop.invoiceId)}><Edit /></Button>


                };
            })
        });
    }
    editFunction(id, pId) {

        var orgArr = this.state.invoiceDetails;
        var partArr = [];
        $.each(orgArr, function (k, v) {
            if (v.invoiceId == pId) {
                partArr.push(orgArr[id]);
            }
        })
        console.log("partArr", partArr);
        this.setState({ InvoiceSelectedNo: partArr[0].invoiceNo });
        this.setState({ InvoiceId: partArr[0].invoiceId });
        this.setState({ invbalance: partArr[0].balance });
        //let details = this.state.invoiceDetails.filter(i => i.invoiceId === pId);
        //this.setState({ InvDatails: details });
        this.state.InvDatails.push(partArr[0]);
        console.log("invoicedateils:", this.state.InvDatails);
        
    }
    handleView = (id, pId) => {
        if (this.state.pId == "") {
            swal("", "Please select the patner to view details", "error")
        } else {
            this.handleopen();

            this.editFunction(id, pId);
            console.log("invoicedateils:", this.state.InvDatails);
            
            // this.setState({ view });
            this.paymentGrid(pId);
        }
    };
    handleInvoice = () => {

    }
    handleopen = () => {
        this.setState({ open: true });
        
    }
    handleClose = () => {
        this.setState({ open: false });
    };

    paymentGrid = (invoiceid) => {
        debugger
        fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/GetPaymentByInvoiceId?invoiceId=` + invoiceid, {
            method: 'POST',
           
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },

        }).then(response => response.json())
            .then(data => {

                this.setState({ PaymentData: data });
                console.log("Payment data:", data);
                if (this.state.PaymentData.length > 0) {
                    this.paymenttabledata(data);
                    this.paytable(data);
                }

            });
        //this.paidAmount();
    }
    paymenttabledata = (pdata) => {
        debugger
        this.setState({
            paymentForInvoice: pdata.map((prop, key) => {
                return {
                    SNo: key + 1,
                    PaymentType: prop.paymentType,
                    BankName: prop.bankName,
                    BranchName: prop.branchName,
                    IFSCCode: prop.ifscCode,
                    
                    PaymentRefId: prop.paymentRefId,
                    PaymentAmount: prop.paymentamount,
                    PaymentDate: new Date(prop.paymentDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', }),
                    // radio: < input type="radio" name="product" onClick={this.editFunction.bind(this, key, prop.invoiceId)} />,
                    //btn: <Button justIcon round simple color="danger" className="remove" disabled={(this.state.nonedit === true) ? true : false} onClick={(e) => this.deletePayment(e, key)} ><Delete /> </Button >
                    //PaymentStatus: < CustomInput value={this.state.Status} disabled={this.state.viewdisable} name="Status" onChange={(e) => this.setStatus(e, key, prop.statusId)} formControlProps={{ fullWidth: true }} />
                    PaymentStatus: prop.status
                };
            })
        });
       
    }
    //setStatus = (e, index, sid) => {
    //    if (sid == 0) {
    //        this.state.Status = "Approved";
    //    }
    //    else {
    //        this.state.Status = "Rejected";
    //    }
    //}
   
    paytable = (data) => {
        //this.setState({});
        //debugger
        //const rej = this.state.rejectClass ? "bnt-scale-click-reject" : "bnt-scale";
        //console.log("reject:",rej);
        this.setState({
            payment: data.map((prop, key) => {
                return {
                    SNo: key + 1,
                    PaymentType: prop.paymentType,
                    BankName: prop.bankName,
                    BranchName: prop.branchName,
                    IFSCCode: prop.ifscCode,
                   
                    PaymentRefId: prop.paymentRefId,
                    PaymentAmount: prop.paymentamount,
                    PaymentDate: new Date(prop.paymentDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', }),
                    // radio: < input type="radio" name="product" onClick={this.editFunction.bind(this, key, prop.invoiceId)} />,
                   btn: <div> <Button justIcon round simple onClick={(e) => this.handleacceptcall(e, key, prop.paymentId)}> <Check /> </Button>
                        <Button justIcon round simple onClick={(e) => this.handlerejectcall(e, key, prop.paymentId)}> <Cancel /> </Button ></div>
                    //btn: <div> <IconButton onClick={(e) => this.handleacceptcall(e, key, prop.paymentId)}> <Check id={"btnAccept" + prop.paymentId} className="bnt-scale" /> </IconButton>
                    //    <IconButton onClick={(e) => this.handlerejectcall(e, key, prop.paymentId)}> <Cancel id={"btnReject" + prop.paymentId} className="bnt-scale-click-accept " /> </IconButton ></div>

                };
            })
        });

    }
    handleacceptcall = (event, index, pid) => {
      //  this.setState({ acceptClass: !this.state.acceptClass})
      //  event.target.classList = [];
      //  //event.target.classList.add('bnt-scale-click-accept');
      //  var element = document.getElementById(Rbtn);
      //  const Rbtn = "btnReject" + pid;
      //  console.log("btnid", Rbtn)

      //  //if (this.state.acceptClass == true) {
      //     // event.target.classList.add('bnt-scale-click-accept');
      //  const Abtn = "btnAccept" + pid;
      //  var reelement = document.getElementById(Abtn);
      ////  var element = document.getElementById(Abtn);
      //  document.getElementById(Abtn).style = "color:#4caf50 !important";
      //  //} else {
      //      //element[0].classList.remove('bnt-scale-click-reject');
      //      //element.classList=[];
      //      document.getElementById(Rbtn).style = "color:#2C81B7  !important";
      //      //element.classList.add('bnt-scale');
      //  //}
               
      //  console.log("element:", element);
      //  //element.classList.remove('bnt-scale-click-reject');
        
      ////  element.color = "success";
      //  //element.classList.add('bnt-scale');
       

        var orgArr = this.state.PaymentData;
        var partArr = [];
        $.each(orgArr, function (k, v) {
            if (v.paymentId == pid) {
                partArr.push(orgArr[index]);
            }
        })
        partArr[0].statusId = 22;
        console.log("partArr", partArr);

           this.handleUpdateStatus(partArr);
    }
    handlerejectcall = (event, index, pid) => {
      //  this.setState({ rejectClass: !this.state.rejectClass });

      //  event.target.classList = [];
      //  //event.target.classList.add('bnt-scale-click-reject');

      //  const Abtn = "btnAccept" + pid;
      //  var element = document.getElementById(Abtn);
      //  console.log(" element.classList:", element.classList);
      //  console.log("element:", element);
      //  const Rbtn = "btnReject" + pid;
      //  var acelement = document.getElementById(Rbtn);
      //  //if (this.state.rejectClass == true) {
      //      //event.target.classList.add('bnt-scale-click-reject');
      //  document.getElementById(Rbtn).style = "color:#d2181c !important";
      //  //} else {
      //      //element.classList.remove('bnt-scale-click-accept');
      //      //element.classList=[];
      //      //element.classList.add('bnt-scale');
      //      document.getElementById(Abtn).style = "color:#2C81B7 !important";
      //  //}
      //  //element.classList.remove('bnt-scale-click-accept');
      //  //element.color = "danger";
      //  //element.classList.add('bnt-scale')
        
      //  console.log(" element.classList:", element.classList);
      //  //this.state.acceptClass = false;
      //  //this.state.rejectClass = true;
      //  //this.setState({});
      ////  this.state.rj = (this.state.rejectClass === true) ? "bnt-scale-click-reject" : "bnt-scale";
        var orgArr = this.state.PaymentData;
        var partArr = [];
        $.each(orgArr, function (k, v) {
            if (v.paymentId == pid) {
                partArr.push(orgArr[index]);
            }
        })
        partArr[0].statusId = 23;
        console.log("partArr", partArr);

        this.handleUpdateStatus(partArr);
       
    }
    handleUpdateStatus = (paydto) => {
        debugger
        console.log("paydto", paydto);
        fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/UpdatePaymentStatus`, {
            method: 'POST',
            body: JSON.stringify(paydto[0]),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },

        })
            .then(response => response.json())
            .then(data => {

               
                console.log("Updated data:", data);
               

            });
    }

    onInvoiceChange = (type, event) => {
        const fields = this.state.InvoiceData;
        fields[event.target.name] = event.target.value;
        this.setState({ fields });
      //  this.change(event, event.target.name, type);
    };
    onInputParamChange = (evt) => {
        console.log('Event', evt);
        const fields = this.state.InvoiceData;
        fields[evt.target.name] = evt.target.value;
        console.log("fields", fields);
        this.setState({ fields });

    };

    onDateChange = (formate, name, event) => {
        var today = event.toDate();
        if (today.getDate() < 10) {
            var dt = '0' + today.getDate();
        }
        else {
            var dt = today.getDate();
        }
        if (today.getMonth() < 10) {
            var mm = '0' + (today.getMonth() + 1)
        }
        else {
            var mm = (today.getMonth() + 1);
        }
        var date = dt + '/' + mm + '/' + today.getFullYear();
        var date2 = new Date();
        var date1 = new Date(today);
        let state = this.state.InvoiceData;
        state[name] = date;
        this.setState({ state });

    };
    render() {

        const { classes } = this.props;
        return (
            <div>
              
            <Card className="assignCard">
                <CardHeader color="rose" icon>
                    <CardIcon color="rose">
                        <Icon><img id="icon" src={money}  /></Icon>
                    </CardIcon>
                    {
                        <h4 >
                            <small> Payment Search </small>
                        </h4>
                    }
                </CardHeader>
                    
                <CardBody>

                    <GridContainer>

                        <GridItem xs={12} sm={4}>
                            <CustomInput
                                labelText="Customer Name"
                                name="customerName"
                                required={true}
                                value={this.state.InvoiceData.customerName}
                                        onChange={(e) => this.onInvoiceChange("string", e)}
                                formControlProps={{ fullWidth: true }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={4}>
                            <MasterDropdown
                                labelText="Status"
                                id="status"
                                value={this.state.InvoiceData.status}
                                lstObject={this.state.masterList}
                                required={true}
                                filterName='InvoiceStatus'
                                //model="LeadDTO"
                                name='status'
                                        onChange={this.onInputParamChange}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={4}>
                            <CustomInput
                                labelText="Invoice No "
                                name="invoiceNo"
                                required={true}
                                value={this.state.InvoiceData.invoiceNo}
                                        onChange={(e) => this.onInvoiceChange("string", e)}
                                formControlProps={{ fullWidth: true }}
                            />
                        </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomDatetime
                                        onFocus={this.state.onClick}
                                        labelText="StartDate"
                                        id='InvoiceData.invoiceEffectiveDate'
                                        name='invoiceEffectiveDate'
                                        onChange={(evt) => this.onDateChange('datetime', 'invoiceEffectiveDate', evt)}
                                        value={this.state.InvoiceData.invoiceEffectiveDate}
                                        formControlProps={{ fullWidth: true }} />

                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomDatetime
                                        onFocus={this.state.onClick}
                                        labelText="EndDate"
                                        id='InvoiceData.invoiceEndDate'
                                    name='invoiceEndDate'
                                    onChange={(evt) => this.onDateChange('datetime', 'invoiceEndDate', evt)}
                                    value={this.state.InvoiceData.invoiceEndDate}
                                        formControlProps={{ fullWidth: true }} />

                                </GridItem>

                       <GridContainer lg={12} justify="center">
                                    <GridItem xs={5} sm={3} md={3} lg={1}>

                                        <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                                            <Button round color="info" onClick={this.searchInvoice}> Search  </Button>
                                        </Animated>

                            </GridItem>
                        </GridContainer>


                        {<GridContainer justify="center">
                            <div>

                                <GridItem xs={12} >


                                    
                                </GridItem>
                            </div>
                        </GridContainer>}

                    </GridContainer>
                    <GridContainer>
                       
                    </GridContainer>
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.open}
                        onClose={this.handleClose}

                    >
                        <div className={classes.paper} id="modal">
                            <Button color="info"
                                round
                                className={classes.marginRight}
                                style={searchClose}
                                onClick={this.handleClose}>
                                &times;
                            </Button>

                            <InvoiceFinance payment={this.state.payment} handleUpdateStatus={this.handleUpdateStatus} masterList={this.state.masterList} InvoiceSelectedNo={this.state.InvoiceSelectedNo} InvDatails={this.state.InvDatails} paymentForInvoice={this.state.paymentForInvoice} onDateChange={this.onDateChange} />
                        </div>
                    </Modal>
                        </CardBody>
                   

                    </Card>
                    {
                        this.state.searchContractTable ?
                        <GridContainer >
                            <GridItem xs={12}>
                                <ReactTable
                                    data={this.state.invoiceDetailsData}
                                    filterable

                                    columns={[
                                        {
                                            Header: "Select",
                                            accessor: "radio",
                                            minWidth: 20,
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            sortable: false,
                                            filterable: false,
                                            resizable: false,
                                        },
                                        //{
                                        //    Header: "SNo",
                                        //    accessor: "SNo",
                                        //    //style: { textAlign: "center" },
                                        //    headerClassName: 'react-table-center',
                                        //    minWidth: 30,
                                        //    resizable: false,

                                        //},
                                        //{
                                        //    Header: "Contract ID",
                                        //    accessor: "ContractId",
                                        //    //style: { textAlign: "center" },
                                        //    headerClassName: 'react-table-center',
                                        //    minWidth: 50,
                                        //    resizable: false,
                                        //    /* minWidth: 150,
                                        //       style: { textAlign: "center" },
                                        //       headerClassName: 'react-table-center'*/
                                        //},

                                        {
                                            Header: "Invoice No",
                                            accessor: "InvoiceNo",
                                            //minWidth: 150,
                                            //style: { textAlign: "center" },
                                            //headerClassName: 'react-table-center'
                                            style: { textAlign: "right" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 80,
                                            resizable: false,
                                        },
                                        {
                                            Header: "Invoice Date",
                                            accessor: "InvoiceDate",

                                            ///style: { textAlign: "center" },
                                            ///headerClassName: 'react-table-center'
                                            //style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 50,
                                            resizable: false,
                                        },
                                        {
                                            Header: "Credit Days Remaining",
                                            accessor: "CreditDaysRemaining",
                                            style: { textAlign: "right" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 50,
                                            resizable: false,
                                            //minWidth: 150,
                                            //style: { textAlign: "center" },
                                            //headerClassName: 'react-table-center'
                                        },
                                        {

                                            Header: "Currency",
                                            accessor: "Currency",
                                            //minWidth: 150,
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 40,
                                            resizable: false,
                                        },
                                        {

                                            Header: "Invoice Amount",
                                            accessor: "InvAmount",
                                            //minWidth: 150,
                                            style: { textAlign: "right" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 60,
                                            resizable: false,
                                        },
                                        {

                                            Header: "Balance Amount",
                                            accessor: "Balance",
                                            //minWidth: 150,
                                            style: { textAlign: "right" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 60,
                                            resizable: false,
                                        },

                                        {

                                            Header: "Status",
                                            accessor: "Status",
                                            //minWidth: 150,
                                            //style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 40,
                                            resizable: false,
                                        },
                                        {

                                            Header: "Actions",
                                            accessor: "btn",
                                            //minWidth: 150,
                                            //style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 40,
                                            resizable: false,
                                        },

                                    ]}

                                    defaultPageSize={5}
                                    showPaginationTop={false}
                                    //pageSize={([this.state.Policydetailsdata.length + 1] < 5) ? [this.state.Policydetailsdata.length + 1] : 5}
                                    showPaginationBottom
                                    className="-striped -highlight discription-tab"
                                />




                                <GridContainer justify="center">
                                    <GridItem >

                                        <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                                            <Button id="submitBtn" color="info" round className={classes.marginRight} onClick={this.handleopen} >
                                                Invoice Details
                        </Button>
                                        </Animated>
                                    </GridItem>
                                </GridContainer>
                            </GridItem>

                        </GridContainer>
                            : null}
                    
              

            </div >
        );
    }
}


export default withStyles(style)(RealisePayments);