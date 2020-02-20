import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import ReactTable from "components/MuiTable/MuiTable.jsx";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import $ from 'jquery';
import BillingConfig from "modules/Billing/BillingConfig.js";
import { Animated } from "react-animated-css";
import contract from "assets/img/contract-search.png";
import validationPage from "modules/Billing/ValidationPage.jsx";
import SearchContract from "../BillingConfiguration/_SearchContract.jsx";

import swal from 'sweetalert';



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
  //  ...customSelectStyle,
   // ...customCheckboxRadioSwitch
};


class InvoiceConfiguration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            masterList: [],
            Policydetails: [],
            InoviceFrequency: "",
            invoiceDetails: [],
            invoiceDetailsData: [],
            search: false,
            searchTableSec:false,
            contractN: "",
            contractResetN: "",
            contractI: "",
            cEffDate: "",
            cEndDate:"",
            contractName: "",
            errormessage:false, 
            InvoiceData: {
                FrequencyId: "",
                ContractId:"",
                InvoiceCreditPeriod: "",
                InvoiceGracePeriod: "",
                InvoiceStartDate: "",
                InvoiceEndDate: "",
                PenaltyPercentage: "",
                isActive:"",
            },

            InvoiceResetData: {
                FrequencyId: "",
                ContractId: "",
                InvoiceCreditPeriod: "",
                InvoiceGracePeriod: "",
                InvoiceStartDate: "",
                InvoiceEndDate: "",
                PenaltyPercentage: "",
                isActive: "",
            },
            SearchData: [],
            selectedRow: [],
            contractdata: [],
            searchContractTable: false,
            PenaltyPercentageState: "",
            InvoiceGracePeriodState: "",
            InvoiceCreditPeriodState: "",
            ContractNameState: "",
            contractIdState: "",
            contractEffectiveDateState: "",
            datediff: "",
            DateRange: false,
            dateVal: "",
            contractEndDateState: "",
            billingConfigs: {
                "billingConfigId": 0,
                "contractId": 0,
                "billingStartDate": "",
                "billingEndDate": "",
                "currencyId": "",
                "remarks": "",
                "billingAmount": "",
                "createdBy": 0,
                "createdDate": "",
                "tblBillingItem": [
                ]
            },
            ContractDTO:
            {
                "contractId": 0,
                "contractName": "",
                "vendorId": 0,
                "customerId": 0,
                "contractEffectiveDate": "",
                "contractEndDate": "",
                "maxCreditPeriod": "",
                "maxCreditAmountAllowed": 0,
                "gracePeriod": 0,
                "currencyId": 0,
                "pono": "string",
                "podate": "",
                "createdBy": 0,
                "createdDate": "",
                "isActive": ""
            },

        };

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
            case "decimal":
                if (validationPage.verifydecimal(event.target.value)) {
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

    onInputChange = (type, event) => {
        const fields = this.state.InvoiceData;
        fields[event.target.name] = event.target.value;
        this.setState({ fields });
        this.change(event, event.target.name, type);
    };
    componentDidMount() {
        
        fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/GetMaster?lMasterlist=InvoiceFrequency`, {
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

    onInputParamChange = (evt) => {
        console.log('Event', evt);
        let fields = this.state.InvoiceData;
        fields[evt.target.name] = evt.target.value;
        console.log("fields", fields);
        this.setState({ fields });

    };
    datechange = (date) => {
        debugger;
        console.log("date change", date);
        const _date = date.split('/');
        const dateObj = { month: _date[1], year: _date[2], day: _date[0] };

        return dateObj.year + '-' + dateObj.month + '-' + dateObj.day;


    }
    onFormSubmit = () => {
        const enddate = this.state.InvoiceData.InvoiceEndDate;
        const effdate = this.state.InvoiceData.InvoiceStartDate;
        if (this.state.InvoiceData.FrequencyId != "" && this.state.InvoiceData.InvoiceStartDate != "" && this.state.InvoiceData.InvoiceEndDate != "" && this.state.InvoiceData.PenaltyPercentage != "") {
          
            this.state.InvoiceData.InvoiceEndDate = this.datechange(this.state.InvoiceData.InvoiceEndDate);
            this.state.InvoiceData.InvoiceStartDate = this.datechange(this.state.InvoiceData.InvoiceStartDate);

            console.log(this.state.ContractDTO, 'My DATA');
            this.state.InvoiceData.isActive = "Y";
            var data =
            {
                'frequencyId': this.state.InvoiceData.FrequencyId,
                'contractId': this.state.ContractDTO[0].contractId,
                'invoiceCreditPeriod': this.state.ContractDTO[0].maxCreditPeriod,
                'invoiceGracePeriod': this.state.ContractDTO[0].gracePeriod,
                'invoiceStartDate': this.state.InvoiceData.InvoiceStartDate,
                'invoiceEndDate': this.state.InvoiceData.InvoiceEndDate,
                'penaltyPercentage': this.state.InvoiceData.PenaltyPercentage
            };
            console.log("contractId", this.state.ContractDTO);
            debugger;
            fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/CreateInvoiceConfig`, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                //body: JSON.stringify(this.state.InvoiceData)
                body: JSON.stringify(data)
            }).then(response => response.json())
                .then(data => {
                    console.log("invoice config: ", data);

                });
          
            document.getElementById('searchTableSec');

            swal({
                //title: "Good job!",
                // text: "Contract for:" + this.state.contractName + " created successfully",
                text: "Invoice for" +"  "+ this.state.contractN + " " + "configured successfully",
                icon: "success",
                button: "OK",
            });
        }
        else {
            swal("", "Some fields are missing", "error");
            this.setState({ errormessage: true });
        }

        this.renderRedirect();



        this.state.InvoiceData.InvoiceEndDate = enddate;
        this.state.InvoiceData.InvoiceStartDate = effdate;
        fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/GetInvoiceConfigHistory`,{
        method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
    }).then(response => response.json())
            .then(data => {
                this.setState({ invoiceDetails: data });
                console.log("Invoice dataaa", data, this.state.invoiceDetails);

                this.tabledata();
            });
            }

     tabledata = () => {

                    this.setState({
                        invoiceDetailsData: this.state.invoiceDetails.map((prop, key) => {
                            return {
                                SNo: key + 1,
                                InoviceFrequency: prop.frequency,
                                //contractName: prop.contractName,
                                InvoiceCreditPeriod: prop.invoiceCreditPeriod,
                                InvoiceGracePeriod: prop.invoiceGracePeriod,
                                InvoiceStartDate: new Date(prop.invoiceStartDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', }),
                                InvoiceEndDate: new Date(prop.invoiceEndDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', }),
                                //PED: new Date(prop.policyEndDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', }),
                                PenaltyPercentage: prop.penaltyPercentage,
                                //CustName: prop.customerId
                        };
                    })
                });
            }

    handleSearchContract = (event) => {
        debugger
        console.log("contractdto", this.state.ContractDTO);
        let effdate = "";
        let enddate = "";
        debugger
        if (this.state.ContractDTO.contractEffectiveDate != "") {
            effdate = this.state.ContractDTO.contractEffectiveDate;
            this.state.ContractDTO.contractEffectiveDate = this.datechange(this.state.ContractDTO.contractEffectiveDate);
        }
        if (this.state.ContractDTO.contractEndDate != "") {
            enddate = this.state.ContractDTO.contractEndDate;
            this.state.ContractDTO.contractEndDate = this.datechange(this.state.ContractDTO.contractEndDate);
        }

        fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/SearchContract`, {
            method: 'POST',
            body: JSON.stringify(this.state.ContractDTO),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log("data save result:", data);
                this.setState({ SearchData: data });
                this.setState({ ContractDTO: data });
                if (this.state.SearchData.length > 0) {
                    this.setState({ searchContractTable: true });
                    this.contractTable(data);
                }

            });


        this.state.ContractDTO.contractEffectiveDate = effdate;
        this.state.ContractDTO.contractEndDate = enddate;
    };

    contractTable = (rows) => {
        console.log("contracttable", this.state.ContractDTO);
        this.setState({
            contractdata: rows.map((prop, key) => {
                return {
                    id: key,
                    SNo: key + 1,
                    ContractId: prop.contractId,
                    ContractName: prop.contractName,
                    EfficitiveDate: new Date(prop.contractEffectiveDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', }),
                    EndDate: new Date(prop.contractEndDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', }),
                    radio: < input type="radio" name="product" onClick={this.editFunction.bind(this, key, prop.contractId, prop.contractName, prop.contractEffectiveDate, prop.contractEndDate)} />

                };
            })
        });
    }

    editFunction(id, cId, cName, cEff, cEnd) {
        debugger
        this.setState({ contractN: cName });
        this.setState({ contractI: cId });
        this.setState({ cEffDate: new Date(cEff).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', }) });
        this.setState({ cEndDate: new Date(cEnd).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', }) });
        
        const fields = this.state.InvoiceData;
        fields['InvoiceCreditPeriod'] = this.state.ContractDTO[0].maxCreditPeriod;
        const data = this.state.InvoiceData;
        data['InvoiceGracePeriod']=this.state.ContractDTO[0].gracePeriod;

        var orgArr = this.state.ContractDTO;
        var contArr = [];
        $.each(orgArr, function (k, v) {
            if (v.contractId == cId) {
                contArr.push(orgArr[id]);
            }
        })
        console.log("ContArr", contArr);
        this.state.selectedRow = contArr;
    };


    SetContract = ((type, event) => {
        console.log("contractdto", this.state.ContractDTO);
        let ContractDTO = this.state.ContractDTO;
        let name = event.target.name;
        let value = event.target.value;
        ContractDTO[name] = value;
        this.setState({ ContractDTO })
        this.change(event, name, type);
        
    });


    onDateChangeContract = (formate, name, event) => {

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

        const state = this.state.ContractDTO;
        state[name] = date;
        this.setState({ state });
        // this.change(event, name, type);
    };
    handleClose = () => {
        console.log("contractdto", this.state.ContractDTO);
        this.setState({ searchContractTable: false });
        if (this.state.contractN != null) {
            this.setState({ search: true });
            fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/GetHistory?contractid=` + this.state.billingConfigs.contractId, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
            })
                .then(response => response.json())
                .then(data => {

                    this.setState({ historydata: data })
                    if (this.state.historydata.length > 0) {
                        this.setState({ searchTableSec: true });
                        
                    }
                    this.setState({ dataRows: data });

                    console.log("dataRows", this.state.dataRows);


                });
        }
    }

    handleSimple = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onDateChange = (formate, type, name, event) => {

        this.setState({ DateRange: true });
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
        if (type === 'InvoiceData') {
            let InvoiceData = this.state.InvoiceData;
            InvoiceData[name] = date;
            this.setState({ InvoiceData });

            var timeDiff = date2.getTime() - date1.getTime();
            var datediff = this.state.date;
            datediff = Math.ceil(timeDiff / (1000 * 3600 * 24));
            // var datediff = datediff;
            this.setState({ datediff });
        }
    }

    renderRedirect = () => {
        const idata = this.state.InvoiceResetData;
        this.state.InvoiceData = idata;
        this.setState({ idata });
        const cname = this.state.contractResetN;
        this.state.contractN = cname;
        this.setState({ cname });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
               
                    <SearchContract search={this.state.search}
                        contractIdState={this.state.contractIdState} contractNameState={this.state.contractNameState}
                        ContractEffectiveDateState={this.state.ContractEffectiveDateState} contractEndDateState={this.state.contractEndDateState}
                        ContractDTO={this.state.ContractDTO} handleSearchContract={this.handleSearchContract}
                        contractTable={this.state.contractTable} SetContract={this.SetContract} contractdata={this.state.contractdata}
                        handleClose={this.handleClose} onDateChangeContract={this.onDateChangeContract}
                        searchContractTable={this.state.searchContractTable} />
                    <br />
                      
                <GridContainer lg={12} justify="center" >
                    
                        <br />
                        <label>
                            {this.state.search == true ?
                                <div className="assign-role-info">

                                    <label>  Contract Name:</label><h5>{`${this.state.contractN}`}</h5>&nbsp;&nbsp;
                                            <hr></hr>

                                    <label>  Effective Date:</label><h5>{`${this.state.cEffDate}`}</h5>&nbsp;&nbsp;
                                            <hr></hr>
                                    <label>  To Date:</label><h5>{`${this.state.cEndDate}`}</h5>&nbsp;&nbsp;
                                            <hr></hr>
                                </div>

                                : null}

                        </label>
                </GridContainer>
           

            <Card className="assignCard">
                <CardHeader color="rose" icon>
                    <CardIcon color="rose">
                        <Icon><img id="icon" /></Icon>
                    </CardIcon>
                    {
                        <h4 >
                            <small> Invoice Configuration </small>
                        </h4>
                    }
                </CardHeader>
                    
                <CardBody>

                    <div>
                       
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={4}>
                                 <MasterDropdown
                                    labelText="Invoice Frequency"
                                    id="InoviceFrequency"
                                    value={this.state.InvoiceData.FrequencyId}
                                    lstObject={this.state.masterList}
                                    required={true}
                                    filterName='InvoiceFrequency'
                                    //model="LeadDTO"
                                    name='FrequencyId'
                                    onChange={ this.onInputParamChange}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    />
                                    {this.state.errormessage && (this.state.InvoiceData.FrequencyId == "") ? <p className="error">*Required field cannot be left blank</p> : null}

                            </GridItem>

                            <GridItem xs={12} sm={4}>
                                    <CustomInput
                                        success={this.state.ContractNameState === "success"}
                                        error={this.state.ContractNameState === "error"}
                                        labelText="Contract Name"
                                        name="contractN"
                                        disabled="true"
                                        // required={true}
                                        value={this.state.contractN}
                                       // onChange={(e) => this.onInputChange("string", e)}
                                   
                                    formControlProps={{ fullWidth: true }}
                                />
                            </GridItem>


                            <GridItem xs={12} sm={4}>
                                    <CustomInput
                                        success={this.state.InvoiceCreditPeriodState === "success"}
                                        error={this.state.InvoiceCreditPeriodState === "error"}
                                        labelText="Invoice Credit Period"
                                        name="InvoiceCreditPeriod"
                                        disabled="true"
                                        // required={true}
                                        value={this.state.InvoiceData.InvoiceCreditPeriod}
                                        onChange={(e) => this.onInputChange("string", e)}
                                    formControlProps={{ fullWidth: true }}
                                />
                            </GridItem>

                            <GridItem xs={12} sm={4}>
                                    <CustomInput
                                        success={this.state.InvoiceGracePeriodState === "success"}
                                        error={this.state.InvoiceGracePeriodState === "error"}
                                        labelText="Invoice Grace Period"
                                        name="InvoiceGracePeriod"
                                        disabled="true"
                                        // required={true}
                                        value={this.state.InvoiceData.InvoiceGracePeriod}
                                        onChange={(e) => this.onInputChange("string", e)}
                                    formControlProps={{ fullWidth: true }}
                                />
                            </GridItem>

                                <GridItem xs={12} sm={12} md={4}>


                                    <CustomDatetime
                                        required={true}
                                        onFocus={this.state.onClick}
                                        labelText="Effective From Date"
                                        id='EffectiveDate'
                                        DateRange={this.state.DateRange}

                                        datediff={this.state.datediff}
                                        name='InvoiceStartDate'
                                        onChange={(evt) => this.onDateChange('datetime', 'InvoiceData', 'InvoiceStartDate', evt)}
                                        value={this.state.InvoiceData.InvoiceStartDate}
                                        formControlProps={{ fullWidth: true }} />
                                    {this.state.errormessage && (this.state.InvoiceData.InvoiceStartDate == "") ? <p className="error">*Required field cannot be left blank</p> : null}


                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>

                                    <CustomDatetime success={this.state.activeToState === "success"}
                                        disabled={this.state.viewdisable}
                                        required={true}
                                        error={this.state.activeToState === "error"}
                                        DateRange={this.state.DateRange}
                                        datediff={this.state.datediff}
                                        labelText="Effective To Date"
                                        id='dtActiveFrom'
                                        name='InvoiceEndDate'
                                        onChange={(evt) => this.onDateChange('datetime', 'InvoiceData', 'InvoiceEndDate', evt)}
                                        value={this.state.InvoiceData.InvoiceEndDate}
                                        formControlProps={{ fullWidth: true }} />
                                    {this.state.errormessage && (this.state.InvoiceData.InvoiceEndDate == "") ? <p className="error">*Required field cannot be left blank</p> : null}


                                </GridItem>


                                <GridItem xs={12} sm={4}>
                                  
                                    <CustomInput
                                        success={this.state.PenaltyPercentageState === "success"}
                                        error={this.state.PenaltyPercentageState === "error"}
                                    labelText="Penalty Percentage per annum"
                                    name="PenaltyPercentage"
                                    required={true}
                                    value={this.state.InvoiceData.PenaltyPercentage}
                                        onChange={(e) => this.onInputChange("decimal", e)}
                                    formControlProps={{ fullWidth: true }}
                                    />
                                    {this.state.errormessage && (this.state.InvoiceData.PenaltyPercentage == "") ? <p className="error">*Required field cannot be left blank</p> : null}

                            </GridItem>



                            <GridContainer justify="center">
                            <GridItem xs={3} sm={3} md={3}>
                                
                                    <Button id="round" color="info" onClick={this.onFormSubmit}> Save  </Button>
                 
                            </GridItem>
                        </GridContainer>
                        </GridContainer>

                          
                    </div>
                </CardBody>
                </Card>

                {
                    this.state.searchTableSec ?
                        <GridContainer justify="center">
                            <div id="searchTableSec">
                                <GridItem xs={12}>
                                    <ReactTable
                                        title={"History"}
                                        data={this.state.invoiceDetailsData}
                                        filterable

                                        columns={[
                                            {
                                                Header: "S.No",
                                                accessor: "SNo",
                                                //style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 30,
                                                resizable: false,

                                            },
                                            //{

                                            //    Header: "Contract Name",
                                            //    accessor: "contractName",
                                            //    //minWidth: 150,
                                            //    //style: { textAlign: "center" },
                                            //    headerClassName: 'react-table-center',
                                            //    minWidth: 90,
                                            //    resizable: false,
                                            //},
                                            {
                                                Header: "Invoice Frequency",
                                                accessor: "InoviceFrequency",
                                                //style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 70,
                                                resizable: false,
                                                /* minWidth: 150,
                                                   style: { textAlign: "center" },
                                                   headerClassName: 'react-table-center'*/
                                            },
                                            {

                                                Header: "Invoice Credit Period",
                                                accessor: "InvoiceCreditPeriod",
                                                //minWidth: 150,
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 90,
                                                resizable: false,
                                            },
                                            {
                                                Header: "Invoice Grace Period",
                                                accessor: "InvoiceGracePeriod",
                                                //minWidth: 150,
                                                //style: { textAlign: "center" },
                                                //headerClassName: 'react-table-center'
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 90,
                                                resizable: false,
                                            },
                                            {
                                                Header: "Effective From Date",
                                                accessor: "InvoiceStartDate",

                                                ///style: { textAlign: "center" },
                                                ///headerClassName: 'react-table-center'
                                                //style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 70,
                                                resizable: false,
                                            },
                                            {
                                                Header: "Effective To Date",
                                                accessor: "InvoiceEndDate",
                                                //style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 100,
                                                resizable: false,
                                                //minWidth: 150,
                                                //style: { textAlign: "center" },
                                                //headerClassName: 'react-table-center'
                                            },


                                        ]}

                                        defaultPageSize={5}
                                        showPaginationTop={false}
                                        //pageSize={([this.state.Policydetailsdata.length + 1] < 5) ? [this.state.Policydetailsdata.length + 1] : 5}
                                        showPaginationBottom
                                        className="-striped -highlight"
                                    />
                                </GridItem>


                            </div>
                        </GridContainer>

                        : null}
</div>



        );


    }


}

export default withStyles(style)(InvoiceConfiguration);

