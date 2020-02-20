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
import validationPage from "modules/Billing/ValidationPage.jsx";
import swal from 'sweetalert';
import Success from "../../../components/Typography/Success.jsx";
import data_Not_found from "assets/img/data-not-found-new.png";
import TableContentLoader from "components/Loaders/TableContentLoader.jsx";
import PageContentLoader from "components/Loaders/PageContentLoader.jsx";
import regenerateInvoice from "assets/img/regenerate-invoice.png";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import CommonMessage from "Messages/CommonMessage.jsx";

const paddingCard =
{
    padding: "10px",
}

class RegenerateInvoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            InvoiceViewData: {
                balance: "",
                contractId: "",
                contractName: "",
                creditDaysRemaining: "",
                currency: "",
                invAmount: "",
                invoiceDate: "",
                invoiceEffectiveDate: "",
                invoiceEndDate: "",
                invoiceId: "",
                invoiceNo: "",
                orgName: "",
                paid: "",
                status: "",
                defaultDays: "",
                penaltyRate: "",
                penaltyAmount: "",
                revisedInvoiceAmount: "",
                revisedInvoiceAmountGrid: "",
            },
            InvoiceData: {
                penaltyRate: "",
                penaltyAmount: "",
                invAmount: "",
                invoiceNo: this.props.InvoiceSelectedNo,
                ContractId: "",
                orgName: "",
                balance: "",
                paid: "",
                dueDate: "",
                defaultDays: "",
                modifiedDate: "",
                UserId: "",
                revisedInvoiceAmount: "",
                invoiceDate: "",
                revisedInvoiceAmountGrid:"",
            },
            searchTableSec: false,
            PenaltyRateState: "",

            loader: true,
            pageloader: true,
            nodata: false,
           
        };
        //this.inFocus = this.inFocus.bind(this);
        //this.outFocus = this.outFocus.bind(this);
    }


    onInputChange = (type, event) => {
        debugger;
        const fields = this.state.InvoiceViewData;
        fields[event.target.name] = event.target.value;
        this.setState({ fields });
        //Auto calculation for PenaltyAmount and RevisedInvoiceAmount based on PenaltyRate
        if (fields.penaltyRate != null) {
            fields.penaltyAmount = fields.balance * fields.penaltyRate / 100;
            fields.revisedInvoiceAmount = fields.invAmount + fields.penaltyAmount;
        }
        this.setState({ fields });
        this.change(event, event.target.name, type);
    };

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
            case "decimal":
                if (validationPage.verifydecimals(event.target.value)) {
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
        let state = this.state.InvoiceViewData;
        state[name] = date;
        this.setState({ state });

    };

    componentDidMount() {
        debugger;
        //this.state.InvoiceViewData.revisedInvoiceAmount = this.state.InvoiceViewData.penaltyAmount + this.state.InvoiceViewData.invAmount;
        this.setState({ loader: false });
        fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/GetSearchInvoiceHistory`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.InvoiceData)
        }).then(response => response.json())
            .then(data => {

                if (data.length > 0) {
                    data[0].invoiceDate = new Date(data[0].invoiceDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
                    data[0].dueDate = new Date(data[0].dueDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
                }
                this.setState({ InvoiceViewData: data });
                if (this.state.InvoiceViewData.length > 0) {
                    this.setState({ searchTableSec: false,loader: false });
                    console.log("history Biling", data);
                    this.setState({ InvoiceViewData: data[0] });
                    this.tabledata(data);
            } else {
                    setTimeout(
                        function () {
                            this.setState({ loader: true, searchTableSec: false, nodata:true});
                        }
                            .bind(this),
                        2000
                    );
                   
    }
            });
    }

    tabledata = (InvoiceViewList) => {
        this.setState({ searchTableSec: true, loader: true });
        this.setState({
            InvoiceView: InvoiceViewList.map((prop, key) => {
                return {
                    SNo: key + 1,
                    ModifiedDate: new Date(prop.modifiedDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', }),
                    PenaltyRate: prop.penaltyRate,
                    PenaltyAmount: (prop.penaltyAmount == null) ? prop.penaltyAmount: prop.penaltyAmount.toFixed(2),
                    RevisedInvoiceAmount: (prop.revisedInvoiceAmount == null) ? prop.revisedInvoiceAmount:prop.revisedInvoiceAmount.toFixed(2),
                    InvoiceAmount: (prop.invAmount == null) ? prop.invAmount:prop.invAmount.toFixed(2),
                    UserId: prop.userId,
                    RevisedPenaltyRate: prop.revisedPenaltyRate,
                    RevisedPenaltyAmount: (prop.revisedPenaltyAmount == null) ? prop.revisedPenaltyAmount : prop.revisedPenaltyAmount.toFixed(2),
                    RevisedInvoiceAmountGrid: (prop.revisedInvoiceAmountGrid == null) ? prop.revisedInvoiceAmountGrid : prop.revisedInvoiceAmountGrid.toFixed(2)
                };
            })
        });
    }

    searchagain = () => {
        this.setState({ nodata: false });
        window.scrollTo(0, 0);
    }

    onFormSubmit = () => {
        //this.state.InvoiceViewData.revisedInvoiceAmount = parseInt(this.state.InvoiceViewData.penaltyAmount) + parseInt(this.state.InvoiceViewData.invAmount);
        var dbData = {
            'invoiceId': this.state.InvoiceViewData.invoiceId,
            'createdUserId': this.state.InvoiceViewData.userId,
            'modifiedDate': this.state.InvoiceViewData.modifiedDate,
            'penaltyAmount': this.state.InvoiceViewData.penaltyAmount,
            'penaltyRate': this.state.InvoiceViewData.penaltyRate,
            'revisedInvAmount': this.state.InvoiceViewData.revisedInvoiceAmount,
            'revisedInvAmountGrid':this.state.InvoiceViewData.revisedInvoiceAmountGrid
        }
        fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/CreateRegenerateInvoice`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(dbData)
        }).then(response => response.json())
            .then(data => {
                console.log("Save Invoice Penalty", data);
            });

        var msg = CommonMessage("RegInvoiceSwal", []);
        swal({
            text: msg,
            icon: "success",
            button: "OK",
        });
    }

    //inFocus(event) {
    //    debugger;
    //    this.setState({ penaltyRate: this.state.InvoiceData.penaltyRate })
    //    console.log("onFocus", this.state.InvoiceViewData.penaltyRate);

    //}

    //outFocus(event) {
    //    debugger;
    //    var penaltyAmount = this.state.InvoiceViewData.penaltyAmount;
    //    penaltyAmount = this.state.InvoiceViewData.balance * this.state.InvoiceViewData.penaltyRate / 100;
    //    console.log("outFocus", penaltyAmount);
    //    let amount = this.state.InvoiceViewData.penaltyAmount;
    //    amount = penaltyAmount;
    //    this.setState({ amount});
    //}



    render() {
        const { classes } = this.props;
        return (
            <div>
                {this.state.pageloader ?
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12} >
                           
                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                <Card className="assignCard">
                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                                            <Icon><img id="icon" src={regenerateInvoice}/></Icon>
                        </CardIcon>
                        {
                            <h4 >
                                                <small> <TranslationContainer translationKey="RegenerateInvoice" />  </small>
                            </h4>
                        }
                                        </CardHeader>
                    <CardBody>

                        <div>

                            <GridContainer>
                                <GridItem xs={12} sm={4}>
                                    <CustomInput
                                        labelText="InvoiceNo"
                                        name="invoiceNo"
                                        disabled="true"
                                        // required={true}
                                        value={this.state.InvoiceViewData.invoiceNo}
                                        onChange={(e) => this.onInputChange(e)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                </GridItem>

                                <GridItem xs={12} sm={4}>
                                    <CustomInput
                                        labelText="OrganizationName"
                                        name="orgName"
                                        disabled="true"
                                        // required={true}
                                        value={this.state.InvoiceViewData.orgName}
                                        onChange={(e) => this.onInputChange(e)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                </GridItem>

                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomDatetime required={true}
                                        onFocus={this.state.InvoiceViewData.onClick}
                                        labelText="InvoiceDate"
                                        disabled="true"
                                        id='invoiceDate'
                                        name='invoiceDate'
                                        onChange={(event) => this.onDateChange('datetime', 'invoiceDate', event)}
                                        value={this.state.InvoiceViewData.invoiceDate}
                                        formControlProps={{ fullWidth: true }} />
                                </GridItem>

                                <GridItem xs={12} sm={4}>
                                    <CustomInput
                                        labelText="InvoiceAmount"
                                        name="invAmount"
                                        disabled="true"
                                        // required={true}
                                        value={this.state.InvoiceViewData.invAmount}
                                        onChange={(e) => this.onInputChange(e)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                </GridItem>

                                <GridItem xs={12} sm={4}>
                                    <CustomInput
                                        labelText="PaidAmount"
                                        name="paid"
                                        disabled="true"
                                        // required={true}
                                        value={this.state.InvoiceViewData.paid}
                                        onChange={(e) => this.onInputChange(e)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                </GridItem>

                                <GridItem xs={12} sm={4}>
                                    <CustomInput
                                        labelText="BalanceAmount"
                                        name="balance"
                                        disabled="true"
                                        // required={true}
                                        value={this.state.InvoiceViewData.balance}
                                        onChange={(e) => this.onInputChange(e)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                </GridItem>

                                <GridContainer>
                                    <GridItem>
                                                        <h4><small><TranslationContainer translationKey="PenaltyDetails" /> </small>
                                        </h4>
                                    </GridItem>
                                </GridContainer>

                                <GridContainer>

                                    <GridItem xs={12} sm={12} md={4}>
                                        <CustomDatetime required={true}
                                            onFocus={this.state.onClick}
                                            labelText="DueDate"
                                            id='dueDate'
                                            disabled="true"
                                            name='dueDate'
                                            onChange={(event) => this.onDateChange('datetime', 'dueDate', event)}
                                            value={this.state.InvoiceViewData.dueDate}
                                            formControlProps={{ fullWidth: true }}
                                        />
                                    </GridItem>

                                    <GridItem xs={12} sm={4}>
                                        <CustomInput
                                            labelText="DefaultDays"
                                            name="defaultDays"
                                            disabled="true"
                                            value={this.state.InvoiceViewData.defaultDays}
                                            onChange={(e) => this.onInputChange(e)}
                                            formControlProps={{ fullWidth: true }}
                                        />
                                    </GridItem>

                                    <GridItem xs={12} sm={4}>
                                        <CustomInput
                                            success={this.state.PenaltyRateState === "success"}
                                            error={this.state.PenaltyRateState === "error"}
                                            labelText="PenaltyRate"
                                            name="penaltyRate"
                                            //onFocus={(e)=>this.inFocus(e)}
                                            value={this.state.InvoiceViewData.penaltyRate}
                                            onChange={(e) => this.onInputChange("string", e)}
                                            formControlProps={{ fullWidth: true }}
                                        />
                                    </GridItem>

                                    <GridItem xs={12} sm={4}>
                                        <CustomInput
                                            labelText="PenaltyAmount"
                                            name="penaltyAmount"
                                            //onBlur={(e)=>this.outFocus(e)}
                                            disabled="true"
                                            value={this.state.InvoiceViewData.penaltyAmount}
                                            onChange={(e) => this.onInputChange(e)}
                                            formControlProps={{ fullWidth: true }}
                                        />
                                    </GridItem>

                                </GridContainer>


                                <GridContainer>
                                    <GridItem>
                                                        <h4><small> <TranslationContainer translationKey="RevisedInvoiceDetails" /> </small>
                                        </h4>
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={4}>
                                        <CustomInput
                                            labelText="RevisedInvoiceAmount"
                                            name="revisedInvoiceAmount"
                                            disabled="true"
                                            // required={true}
                                            value={this.state.InvoiceViewData.revisedInvoiceAmount}
                                            onChange={(e) => this.onInputChange(e)}
                                            formControlProps={{ fullWidth: true }}
                                        />
                                    </GridItem>
                                </GridContainer>

                                <GridContainer justify="center">
                                    <GridItem xs={3} sm={3} md={3}>

                                    <Button id="round" color="info" onClick={this.onFormSubmit}> <TranslationContainer translationKey="Save" />  </Button>

                                    </GridItem>
                                </GridContainer>

                            </GridContainer>
                                                </div>
                                            </CardBody>
                </Card>

                                    {this.state.loader ?

                                        <GridContainer xl={12}>
                                            {this.state.searchTableSec ?

                                                <GridItem lg={12}>
                                <ReactTable
                                    title=<TranslationContainer translationKey={"History"} />
                                    data={this.state.InvoiceView}
                                    filterable

                                    columns={[
                                        {
                                            Header: "SNo",
                                            accessor: "SNo",
                                            //style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 30,
                                            resizable: false,

                                        },
                                        {

                                            Header: "ModifiedDate",
                                            accessor: "ModifiedDate",
                                            //minWidth: 150,
                                            //style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 40,
                                            resizable: false,
                                        },
                                        {
                                            Header: "UserId",
                                            accessor: "UserId",
                                            //style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 40,
                                            resizable: false,
                                            /* minWidth: 150,
                                               style: { textAlign: "center" },
                                               headerClassName: 'react-table-center'*/
                                        },
                                        {

                                            Header: "PenaltyRate",
                                            accessor: "PenaltyRate",
                                            //style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 40,
                                            resizable: false,
                                        },
                                        {

                                            Header: "PenaltyAmount",
                                            accessor: "PenaltyAmount",
                                            style: { textAlign: "right" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 40,
                                            resizable: false,
                                        },
                                        {
                                            Header: "InvoiceAmount",
                                            accessor: "InvoiceAmount",
                                            //minWidth: 150,
                                            style: { textAlign: "right" },
                                            //headerClassName: 'react-table-center'
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 40,
                                            resizable: false,
                                        },
                                        {

                                            Header: "RevisedPenaltyRate",
                                            accessor: "RevisedPenaltyRate",
                                            style: { textAlign: "right" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 40,
                                            resizable: false,
                                        },
                                        {

                                            Header: "RevisedPenaltyAmount",
                                            accessor: "RevisedPenaltyAmount",
                                            style: { textAlign: "right" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 40,
                                            resizable: false,
                                        },
                                        {

                                            Header: "RevisedInvoiceAmount",
                                            accessor: "RevisedInvoiceAmountGrid",
                                            style: { textAlign: "right" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 40,
                                            resizable: false,
                                        },


                                    ]}

                                    defaultPageSize={5}
                                    showPaginationTop={false}
                                    //pageSize={([this.state.Policydetailsdata.length + 1] < 5) ? [this.state.Policydetailsdata.length + 1] : 5}
                                    showPaginationBottom
                                    className="-striped -highlight"
                                />
                            </GridItem>
                                                : <GridItem lg={12}>
                                                    {this.state.nodata ?
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
                                                        : null}
                                                </GridItem>}

                                        </GridContainer>
                                        : <Card style={paddingCard}>
                                            <TableContentLoader />
                                        </Card>}

                                </Animated>
                        </GridItem>
                    </GridContainer>
                    : <PageContentLoader />}
            </div>
        );
    }
}
export default RegenerateInvoice;
