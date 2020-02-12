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
import InvoiceDetails from "./_InvoiceDetails";
import Modal from '@material-ui/core/Modal';
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import ReactTable from "components/MuiTable/MuiTable.jsx";
import BillingConfig from 'modules/Billing/BillingConfig.js';
import swal from 'sweetalert';
import Edit from "@material-ui/icons/Edit";
import $ from 'jquery';
import Delete from "@material-ui/icons/Delete";
import validationPage from "modules/Partners/Organization/views/ValidationPage.jsx";
import { Animated } from "react-animated-css";








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

class ReceivePayment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // radiolist1: [{ cob: null, disable: false, label: null, lob: null, mID: 0, mIsRequired: false, mType: "Type", mValue: "Yes", planCode: null, selectedValue: 0, value: null }, { cob: null, disable: false, label: null, lob: null, mID: 1, mIsRequired: false, mType: "Type", mValue: "No", planCode: null, selectedValue: 0, value: null }],
            paymentdetails: false,
            masterList: [],
            customerName: "",
            customerNameState: "",
            invoiceNoState: "",
            invoiceDetails: [],
            balanceState: "",
            paidState: "",
            paymentAmountState: "",
            ifscCodeState: "",
            branchNameState: "",
            bankNameState: "",
            paymentRefIdState: "",
            InvoiceData: {
                customerName: "",
                contractName: "",
                status: "",
                invoiceNo: "",
                invoiceEffectiveDate: "",
                invoiceEndDate: "",
                //orgId: 112,
                //envId: 1,
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
                "balance":0,
            }],
            PaymentList: {
                "invoiceId": 0,
                "payment": []
            },
            PaymentData: [],
            PaymentDataList: [],
            InvoiceId: 0,
            searchContractTable: false,
            invbalance: 0,
            payTableFlag: false,
        };
       // this.handleView = this.handleView.bind(this);

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

        fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/GetSearchInvoiceForCustomer`, {
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
    change(event, stateName, type, date, maxValue) {
        switch (type) {

            case "string":
                if (validationPage.verifyName(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });


                } else {
                    this.setState({ [stateName + "State"]: "error" });


                }
                break;
            case "datetime":
                if (validationPage.verifydatetime(date)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "pan":
                if (validationPage.verifyPanNum(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "phoneno":
                if (validationPage.verifyNumber(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "email":
                if (validationPage.verifyEmail(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "website":
                if (validationPage.verifyUrl(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "tan":
                if (validationPage.verifyTanNum(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "number":
                if (validationPage.verifyNumeric(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            default:
                break;
        }


    }

    onInputChange = (type, event, index) => {
        const fields = this.state.PaymentDto[index];
        fields[event.target.name] = event.target.value;
        this.setState({ fields });
        console.log("name", event.target.name);
        this.change(event, event.target.name, type);

      

    };
    oninvoiceChange = (type, event) => {
        const invoice = this.state.InvoiceData;
        invoice[event.target.name] = event.target.value;
        this.setState({ invoice });
        console.log("name", event.target.name);
        let name = event.target.name;
        this.change(event, name, type);
    }

    onBlur = (e, index) => {
        if (this.state.PaymentDto[index].paymentAmount != "" ) {
            //&& this.state.PaymentDto[index].paymentAmount <= this.state.PaymentDto[index].balance

            //let paid = Number(this.state.PaymentDto.paid);
            //let payed = Number(this.state.PaymentDto.paymentAmount);
            //let available = this.state.PaymentDto.balance;
            //let changePaid = paid + payed;
            //let changeBal = available - payed;
            //this.setState({ changePaid });
            //this.setState({ changeBal });
            //this.state.PaymentDto.paid = changePaid;
            //this.state.PaymentDto.balance = changeBal;
            debugger
            let payedamt = 0;
            let bal = 0;   
         
        for (let i = 0; i < this.state.PaymentData.length; i++) {
            console.log("paymentamount", this.state.PaymentData[i].paymentamount);
            let paid = this.state.PaymentData[i].paymentamount;
            payedamt = payedamt + paid;
            this.setState({ payedamt });
            //let balance = this.state.invbalance;
            //bal = balance - payedamt;
            //this.setState({ bal });
                }
            console.log("paymenttable:", this.state.payList);
            if (this.state.payList != undefined) {
                console.log("length", this.state.payList.length);
                for (let i = 0; i < this.state.payList.length; i++) {

                    payedamt = payedamt + Number(this.state.payList[i].PaymentAmount);
                   // bal = bal - payedamt;
                    }
            }
            let balance = this.state.invbalance;
            bal = balance - payedamt;
            this.setState({ bal });

            let payed = Number(this.state.PaymentDto[index].paymentAmount);
            let changePaid = payedamt + payed;
            let changeBal = bal - payed;
            this.setState({ changePaid });
            this.setState({ changeBal });
            
           

            this.setState({});
            if (this.state.PaymentDto[index].paymentAmount > this.state.PaymentDto[index].balance) {
                swal("", "Payment Amount should not be greater than balance amount", "error");
                this.state.PaymentDto[index].paymentAmount = "";
            }
            else {
                this.state.PaymentDto[index].balance = changeBal;
                this.state.PaymentDto[index].paid = changePaid;
            }
        }
        else {
            
            this.paidAmount();
        }
    }
    onDateChange = (formate, name, index, event) => {
        var today = event.toDate();
        var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
        var date2 = new Date();
        var date1 = new Date(today);
        let state = this.state.PaymentDto[index];
        state[name] = date;
        this.setState({ state });

    };

    onDateChangeInvoice = (formate, name, event) => {
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
                   // ContractId: prop.contractId,
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

 
    handleRadioOnChange = (event) => {

        this.state.singleValueSelectedProposer = event.target.value;
        if (event.target.value == 0) {
            this.setState({ paymentdetails: true });
          
            this.paymentGrid();
        }
        else {
            this.setState({ paymentdetails: false });
        }
    }
    handlePaymenttable = () => {
       
            this.setState({
                payTableFlag: true
            });
        
        let len = this.state.PaymentDto.length - 1;
        this.state.PaymentDto[len].invoiceId = this.state.InvoiceId;
        this.state.PaymentDto[len].paymentDate = this.datechange(this.state.PaymentDto[len].paymentDate);
        this.payTable(this.state.PaymentDto);
        this.addlist();
        console.log("paymentdto:", this.state.PaymentDto);
    }

    addlist = () => {
         this.state.PaymentDto = this.state.PaymentDto.concat({
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
        }
        )
        console.log("paymentdto:", this.state.PaymentDto);
    }
    payTable = (pay) => {
        this.setState({
            payList: pay.map((prop, key) => {
                return {
                    SNo: key + 1,
                    PaymentType: prop.paymentTypeId,
                    BankName: prop.bankName,
                    BranchName: prop.branchName,
                    IFSCCode: prop.ifscCode,
                    PaymentRefId: prop.paymentRefId,
                    PaymentAmount: prop.paymentAmount,
                    PaymentDate: new Date(prop.paymentDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', }),
                    // radio: < input type="radio" name="product" onClick={this.editFunction.bind(this, key, prop.invoiceId)} />,
                    btn: <Button justIcon round simple color="danger" className="remove" disabled={(this.state.nonedit === true) ? true : false} onClick={(e) => this.deletePayment(e, key)} ><Delete /> </Button >

                };
            })
        });
       // this.paidAmount();
    }

    handleAddPayment = () => {
        debugger
        
        //const Paydate = this.state.PaymentDto.paymentDate;
       
        console.log("payment data", this.state.PaymentDto);
        this.state.PaymentDto.pop();
        console.log("after delete", this.state.PaymentDto)
        let PaymentList = this.state.PaymentList;

        PaymentList['payment'] = this.state.PaymentDto;

        console.log("PaymentList:", this.state.PaymentList);
        fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/CreatePayment`, {
            method: 'POST',
            body: JSON.stringify(this.state.PaymentList),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
           
        }).then(response => response.json())
            .then(data => {

                this.setState({ PaymentDataList: data });
                console.log("Payment data:", data);
                swal({

                    text: "Payment Done Successfully",
                    icon: "success"
                });

               // this.paymentGrid();

            });
        //this.state.PaymentDto.paymentDate = Paydate;
    }
    paymentGrid = () => {
        fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/GetPaymentByInvoiceId?invoiceId=` + this.state.InvoiceId, {
            method: 'post',
            body: JSON.stringify(this.state.PaymentDto),
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
                    PaymentStatus: prop.status
                };
            })
        });
        this.paidAmount();
    }

    paidAmount = () => {
        let payed = 0;
        let bal = 0;
        debugger
        //if (this.state.PaymentData.length > 0) {
        for (let i = 0; i < this.state.PaymentData.length; i++) {
            console.log("paymentamount", this.state.PaymentData[i].paymentamount);
            let paid = this.state.PaymentData[i].paymentamount;

            payed = payed + paid;
            this.setState({ payed });
            let balance = this.state.invbalance;
            bal = balance - payed;
            this.setState({ bal });
            }
       
        let len = this.state.PaymentDto.length;
        this.state.PaymentDto[len-1].paid = payed;
        this.state.PaymentDto[len - 1].balance = bal;
       // }
        this.setState({});

    }
    deletePayment = (event, index) => {
        debugger

        this.state.PaymentDto[index].splice(index, 1);
        
        this.setState({});
        this.payTable(this.state.PaymentDto);

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
                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
            <Card className="assignCard">
                <CardHeader color="rose" icon>
                    <CardIcon color="rose">
                        <Icon><img id="icon" /></Icon>
                    </CardIcon>
                    {
                        <h4 >
                            <small> Payment Search </small>
                        </h4>
                    }
                </CardHeader>

                <CardBody>

                    <GridContainer>
                      
                                {/* <GridItem xs={12} sm={4}>
                                    <CustomInput
                                        success={this.state.customerNameState === "success"}
                                        error={this.state.customerNameState === "error"}
                                        labelText="Customer Name"
                                        name="customerName"
                                        //required={true}
                                        value={this.state.InvoiceData.customerName}
                                        onChange={(e) => this.onInvoiceChange("string", e)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                </GridItem> */}

                                <GridItem xs={12} sm={12} md={4}>
                                    <MasterDropdown
                                        labelText="Status"
                                        id="status"
                                        value={this.state.InvoiceData.status}
                                        lstObject={this.state.masterList}
                                        //required={true}
                                        filterName='InvoiceStatus'
                                        name='status'
                                        onChange={this.onInputParamChange}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>

                                <GridItem xs={12} sm={4}>
                                    <CustomInput
                                        success={this.state.invoiceNoState === "success"}
                                        error={this.state.invoiceNoState === "error"}
                                        labelText="Invoice No "
                                        name="invoiceNo"
                                        //required={true}
                                        value={this.state.InvoiceData.invoiceNo}
                                        onChange={(e) => this.onInvoiceChange("invNo", e)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomDatetime onFocus={this.state.onClick} labelText="Start Date" id='dtActiveFrom' name='invoiceEffectiveDate' onChange={(evt) => this.onDateChangeInvoice('datetime', 'invoiceEffectiveDate', evt)} value={this.state.InvoiceData.invoiceEffectiveDate} formControlProps={{ fullWidth: true }} />

                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomDatetime onFocus={this.state.onClick} labelText="End Date" id='dtActiveFrom' name='invoiceEndDate' onChange={(evt) => this.onDateChangeInvoice('datetime', 'invoiceEndDate', evt)} value={this.state.InvoiceData.invoiceEndDate} formControlProps={{ fullWidth: true }} />

                                </GridItem>

                            <GridContainer justify="center">
                                <GridItem>
                                <Button id="round" style={{ marginTop: '25px' }} color="info" onClick={this.searchInvoice}> Search  </Button>

                                </GridItem>
                            </GridContainer>


                            {<GridContainer justify="center">
                                <div>

                                    <GridItem xs={12} >


                                        <CardBody className="modify-user-react-tab">
                                            
                                        </CardBody>
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

                                    <InvoiceDetails change={this.change} onBlur={this.onBlur} masterList={this.state.masterList}
                                        balanceState={this.state.balanceState} paidState={this.state.paidState}
                                        paymentAmountState={this.state.paymentAmountState} ifscCodeState={this.state.ifscCodeState}
                                        branchNameState={this.state.branchNameState} bankNameState={this.state.bankNameState} paymentRefIdState={this.state.paymentRefIdState}
                                        InvoiceSelectedNo={this.state.InvoiceSelectedNo} paymentdetails={this.state.paymentdetails} InvDatails={this.state.InvDatails} PaymentDto={this.state.PaymentDto} onInputChange={this.onInputChange} handleAddPayment={this.handleAddPayment} paymentForInvoice={this.state.paymentForInvoice} handleRadioOnChange={this.handleRadioOnChange} handlePaymenttable={this.handlePaymenttable} singleValueSelectedProposer={this.state.singleValueSelectedProposer} onDateChange={this.onDateChange} payList={this.state.payList} payTableFlag={this.state.payTableFlag} />
                        </div>
                    </Modal>
                </CardBody>

                    </Card>
                    {
                        this.state.searchContractTable ?
                        <GridContainer>
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
                                        //    Header: "S.No",
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
                                            style: { textAlign: "right" },
                                            //headerClassName: 'react-table-center'
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 80,
                                            resizable: false,
                                        },
                                        {
                                            Header: "Invoice Date",
                                            accessor: "InvoiceDate",

                                            ///style: { textAlign: "center" },
                                            ///headerClassName: 'react-table-center'
                                            style: { textAlign: "center" },
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
                                        <Button id="submitBtn" color="info" round className={classes.marginRight} onClick={this.handleopen} >
                                            Invoice Details
                        </Button>
                                        
                                    </GridItem>
                                </GridContainer>
                            </GridItem>

                        </GridContainer>

                            : null}
                </Animated>
                </div>
        );
    }
}

export default withStyles(style)(ReceivePayment);