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
import ReactTable from "react-table";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import $ from 'jquery';
import BillingConfig from "modules/Billing/BillingConfig.js";
import { Animated } from "react-animated-css";
import contract from "assets/img/contract-search.png";
import validationPage from "modules/Billing/ValidationPage.jsx";
import swal from 'sweetalert';
import CreateCustomer from "../CreateCustomer";





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
            contractN: "",
            contractI: "",
            cEffDate: "",
            cEndDate: "",
            ContractName: "",
            InvoiceData: {
                frequencyId: "",
               // contractId: "",
                invoiceCreditPeriod: "",
                invoiceGracePeriod: "",
                invoiceStartDate: "",
                invoiceEndDate: "",
                penaltyPercentage: "",
            },
            SearchData: [],
            selectedRow: [],
            contractdata: [],
            searchContractTable: false,
            penaltyPercentageState: "",
            InvoiceGracePeriodState: "",
            InvoiceCreditPeriodState: "",
            ContractNameState: "",
            contractIdState: "",

            ContractDTO:
            {
                "contractId": 0,
                "contractName": "",
                "vendorId": 0,
                "customerId": 0,
                "ContractEffectiveDate": "",
                "contractEndDate": "",
                "maxCreditPeriod": 0,
                "maxCreditAmountAllowed": 0,
                "gracePeriod": 0,
                "currencyId": 0,
                "pono": "string",
                "podate": "",
                "createdBy": 0,
                "createdDate": "",
                "isActive": ""
            },
            InvoicesearchData: [],
            invoiceModify: false,
            errorSdate: false,
            errorEdate: false,

        };
        this.InvoiceDetail = {
            "InvoiceData": this.state.InvoiceData,
        };
        console.log("props coming", props);
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

    onDateChange = (formate, name, event) => {
        var today = event.toDate();
        var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();


        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        if (mm < 10) {
            mm = '0' + mm;

        }
        if (dd < 10) {
            dd = '0' + dd;
        }

        var date1 = dd + '/' + mm + '/' + today.getFullYear();

       
        let state = this.state.InvoiceData;
        state[name] = date1;
        this.setState({ state });
        debugger
        console.log("cstartdate", this.props.componentData.cStartDate, this.props.componentData.cEndDate, this.state.InvoiceData.invoiceStartDate, this.state.InvoiceData.invoiceEndDate);
        if (name == "invoiceStartDate") {
            if (today.getTime() < this.props.componentData.cStartDate || today.getTime() > this.props.componentData.cEndDate) {
                this.setState({ errorSdate: true });
            } else {
                this.setState({ errorSdate: false });
            }
        }
        if (name == "invoiceEndDate") {
            if (today.getTime() < this.props.componentData.cStartDate || today.getTime() > this.props.componentData.cEndDate) {
                this.setState({ errorEdate: true });
            } else {
                this.setState({ errorEdate: false });
            }
        }
        else {
            //this.setState({ errorSdate: false });
            //this.setState({ errorEdate: false });
        }
        console.log("errordata:", this.state.errorSdate);
    };
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

        debugger
        console.log("this.props:", this.props);
        //console.log("props in invoice:", this.props.componentData);
        //console.log("props invoice", this.props);
        //console.log("Invoice:", this.props.componentData.props.ContractData[0].tblInvoiceConfig[0]);
        //const invoice = this.props.componentData.props.ContractData[0].tblInvoiceConfig;
        if (this.props.componentData.SearchFlag == true) {
            if (this.props.componentData.props.ContractData[0].tblInvoiceConfig.length > 0) {
                const invoice = this.props.componentData.props.ContractData[0].tblInvoiceConfig[0];
                let bdata = this.state;
                bdata['InvoiceData'] = invoice;

                this.setState({ bdata });

                this.state.InvoiceData.invoiceStartDate = new Date(this.state.InvoiceData.invoiceStartDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
                this.state.InvoiceData.invoiceEndDate = new Date(this.state.InvoiceData.invoiceEndDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });

                console.log("invoicedata", this.state.InvoiceData);
            }
            //else {
            //    this.state.InvoiceData.invoiceCreditPeriod = this.props.componentData.props.ContractData[0].maxCreditPeriod;
            //    this.state.InvoiceData.invoiceGracePeriod = this.props.componentData.props.ContractData[0].gracePeriod;
            //}
        }
    }


    onInputParamChange = (evt) => {
        console.log('Event', evt);
        let fields = this.state.InvoiceData;
        fields[evt.target.name] = evt.target.value;
        console.log("fields", fields);
        this.setState({ fields });

    };

    datechange = (date) => {
        const _date = date.split('/');
        const dateObj = { month: _date[1], year: _date[2], day: _date[0] };

        return dateObj.year + '-' + dateObj.month + '-' + dateObj.day;
    }

    onFormSubmit = () => {
        const enddate = this.state.InvoiceData.InvoiceEndDate;
        const effdate = this.state.InvoiceData.InvoiceStartDate;
        this.state.InvoiceData.InvoiceEndDate = this.datechange(this.state.InvoiceData.InvoiceEndDate);
        this.state.InvoiceData.InvoiceStartDate = this.datechange(this.state.InvoiceData.InvoiceStartDate);

        fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/CreateInvoiceConfig`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.InvoiceData)
        }).then(response => response.json())
            .then(data => {
                console.log("invoice config: ", data);

            });
        this.state.InvoiceData.InvoiceEndDate = enddate;
        this.state.InvoiceData.InvoiceStartDate = effdate;
        document.getElementById('searchTableSec');

        fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/GetInvoiceConfigHistory`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
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
                    contractName: prop.contractName,
                    InvoiceCreditPeriod: prop.invoiceCreditPeriod,
                    InvoiceGracePeriod: prop.invoiceGracePeriod,
                    InvoiceStartDate: new Date(prop.invoiceStartDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', }),
                    InvoiceEndDate: new Date(prop.invoiceEndDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', }),
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
        if (this.state.ContractDTO.ContractEffectiveDate != undefined && this.state.ContractDTO.ContractEffectiveDate != "") {
            this.state.ContractDTO.contractEffeciveDate = this.datechange(this.state.ContractDTO.ContractEffectiveDate);
        }
        if (this.state.ContractDTO.contractEndDate != undefined && this.state.ContractDTO.contractEndDate != "") {
            this.state.ContractDTO.contractEndDate = this.datechange(this.state.ContractDTO.contractEndDate);
        }
        //fetch(`https://localhost:44362/api/Billing/SearchContractById?contractid=` + this.state.ContractDTO.contractId, {
        //fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/SearchContractById?contractid=` + this.state.ContractDTO[0].contractId, {
        fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/SearchContract`, {
            //fetch(`https://localhost:44362/api/Billing/SearchContract`, {
            method: 'POST',
            body: JSON.stringify(this.state.ContractDTO),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        })
            .then(response => response.json())
            .then(data => {

                console.log("data save result:", data);
                this.setState({ SearchData: data });
                this.setState({ ContractDTO: data });

                //console.log("data save result:", this.state.ContractDTO);
                if (this.state.SearchData.length > 0) {
                    // document.getElementById('searchContractTable').style.display = 'block';
                    this.setState({ searchContractTable: true });
                    this.contractTable(data);
                }

            });

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
                    EffecitiveDate: prop.contractEffectiveDate,
                    EndDate: prop.contractEndDate,
                    radio: < input type="radio" name="product" onClick={this.editFunction.bind(this, key, prop.contractId, prop.contractName, prop.contractEffectiveDate, prop.contractEndDate)} />

                };
            })
        });
    }


    editFunction(id, cId, cName, cEff, cEnd) {
        debugger
        // this.setState({ contractN: cname });
        //this.setState({ BillingItemDTO.billingConfig.contractId: cId });
        // this.state.BillingItemDTO.billingConfig.contractId = cId;

        //this.state.billingConfigs.contractId = cId;
        this.setState({ contractN: cName });
        this.setState({ contractI: cId });
        this.setState({ cEffDate: cEff });
        this.setState({ cEndDate: cEnd });

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

        event.preventDefault();
        let ContractDTO = this.state.ContractDTO;
        let name = event.target.name;
        let value = event.target.value;
        ContractDTO[name] = value;
        this.setState({ ContractDTO })
        this.change(event, name, type);
    });


    handleOK = () => {
        debugger
        console.log("contractprops", this.state.selectedRow);
        this.state.ContractName = this.state.selectedRow[0].contractName;
        this.state.InvoiceData.ContractId = this.state.selectedRow[0].contractId;
        this.setState({ searchContractTable: false });
        if (this.state.contractN != null) {

            this.setState({ search: true });
        }
        //console.log("contractprops", this.props);
    }
    onDateChangeContract = (formate, name, event) => {

        var today = event.toDate();
        var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

        const state = this.state.ContractDTO;
        state[name] = date;
        this.setState({ state });

    };
    handleSimple = event => {
        this.setState({ [event.target.name]: event.target.value });
    };




    render() {
        const { classes } = this.props;
        if (this.props.componentData.SearchFlag == false) {
            this.props.componentData.props.ContractData[0].TblInvoiceConfig[0] = this.state.InvoiceData;
            this.state.InvoiceData.invoiceCreditPeriod = this.props.componentData.props.ContractData[0].maxCreditPeriod;
            this.state.InvoiceData.invoiceGracePeriod = this.props.componentData.props.ContractData[0].gracePeriod;
        }
        //else {
        //    const fields = this.state.InvoiceData;
        //    fields['InvoiceCreditPeriod'] = this.props.componentData.props.maxCreditPeriod;
        //    const data = this.state.InvoiceData;
        //    data['InvoiceGracePeriod'] = this.props.componentData.props.gracePeriod;
        //    this.setState({});

        //}
        
        return (


            <CardBody>

                <div>

                    <GridContainer>
                        <GridItem xs={12} sm={12} md={4}>
                            <MasterDropdown
                                
                                labelText="InvoiceFrequency"
                                id="InoviceFrequency"
                                value={this.state.InvoiceData.frequencyId}
                                lstObject={this.state.masterList}
                                required={true}
                                disabled={this.props.componentData.disableView}
                                filterName='InvoiceFrequency'
                                //model="LeadDTO"
                                name='frequencyId'
                                onChange={this.onInputParamChange}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            {this.props.componentData.errormessage && (this.state.InvoiceData.frequencyId == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                        </GridItem>

                        {/*   <GridItem xs={12} sm={4}>
                                    <CustomInput
                                        success={this.state.ContractNameState === "success"}
                                        error={this.state.ContractNameState === "error"}
                                    labelText="Contract Name"
                                    name="ContractName"
                                        // required={true}
                                        value={this.state.ContractName}
                                        onChange={(e) => this.onInputChange("string", e)}
                                   
                                    formControlProps={{ fullWidth: true }}
                                />
                            </GridItem> */}


                        <GridItem xs={12} sm={4}>
                            <CustomInput
                                success={this.state.InvoiceCreditPeriodState === "success"}
                                error={this.state.InvoiceCreditPeriodState === "error"}
                                disabled={this.props.componentData.disableView}
                                labelText="InvoiceCreditPeriod"
                                name="invoiceCreditPeriod"
                                // required={true}
                                value={this.state.InvoiceData.invoiceCreditPeriod}
                                onChange={(e) => this.onInputChange("string", e)}
                                formControlProps={{ fullWidth: true }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={4}>
                            <CustomInput
                                success={this.state.InvoiceGracePeriodState === "success"}
                                error={this.state.InvoiceGracePeriodState === "error"}
                                disabled={this.props.componentData.disableView}
                                labelText="InvoiceGracePeriod"
                                name="invoiceGracePeriod"
                                // required={true}
                                value={this.state.InvoiceData.invoiceGracePeriod}
                                onChange={(e) => this.onInputChange("string", e)}
                                formControlProps={{ fullWidth: true }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={4}>
                            <CustomDatetime
                                disabled={this.props.componentData.disableView}
                                required={true}
                                onFocus={this.state.onClick}
                                labelText="EffectiveFromDate"
                                id='InvoiceStartDate'
                                name='invoiceStartDate'
                                onChange={(evt) => this.onDateChange('datetime', 'invoiceStartDate', evt)}
                                value={this.state.InvoiceData.invoiceStartDate}
                                formControlProps={{ fullWidth: true }} />
                            {this.props.componentData.errormessage && (this.state.InvoiceData.invoiceStartDate == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                            {this.state.errorSdate ? <p className="error">*Invoice Start Date should be within Contract Period </p> : null}
                        </GridItem>

                        <GridItem xs={12} sm={12} md={4}>
                            <CustomDatetime
                                disabled={this.props.componentData.disableView}
                                required={true}
                                onFocus={this.state.onClick}
                                labelText="EffectiveToDate"
                                id='InvoiceEndDate'
                                name='invoiceEndDate'
                                onChange={(evt) => this.onDateChange('datetime', 'invoiceEndDate', evt)}
                                value={this.state.InvoiceData.invoiceEndDate}
                                formControlProps={{ fullWidth: true }} />
                            {this.props.componentData.errormessage && (this.state.InvoiceData.invoiceEndDate == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                            {this.state.errorEdate ? <p className="error">*Invoice End Date should be within Contract Period </p> : null}
                        </GridItem>

                        <GridItem xs={12} sm={4}>

                            <CustomInput
                                disabled={this.props.componentData.disableView}
                                success={this.state.penaltyPercentageState === "success"}
                                error={this.state.penaltyPercentageState === "error"}
                                labelText="PenaltyPercentagePerAnnum"
                                name="penaltyPercentage"
                                required={true}
                                //inputType="number"
                                value={this.state.InvoiceData.penaltyPercentage}
                                onChange={(e) => this.onInputChange("decimal", e)}
                                formControlProps={{ fullWidth: true }}
                            />
                            {this.props.componentData.errormessage && (this.state.InvoiceData.PenaltyPercentage == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                        </GridItem>

                       

                    </GridContainer>


                    {this.state.invoiceModify == true && <GridContainer>
                        <CreateCustomer onInvoiceModify={this.onInvoiceModify} />
                    </GridContainer>}
                </div>
            </CardBody>

        );


    }


}

export default withStyles(style)(InvoiceConfiguration);

