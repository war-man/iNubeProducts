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

class RegenerateInvoice extends React.Component {
    constructor(props){
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
                invoiceDate:"",
            },
            
        };
        //this.inFocus = this.inFocus.bind(this);
        //this.outFocus = this.outFocus.bind(this);
}


    onInputChange = (evt) => {
        debugger;
        const fields = this.state.InvoiceViewData;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
        //Auto calculation for PenaltyAmount and RevisedInvoiceAmount based on PenaltyRate
        if (fields.penaltyRate != null) {
            fields.penaltyAmount = fields.balance * fields.penaltyRate / 100;
            fields.revisedInvoiceAmount = fields.invAmount + fields.penaltyAmount;
        }
        this.setState({ fields });
    };

    onDateChange = (formate, name, event) => {
        var today = event.toDate();
        var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
        var date2 = new Date();
        var date1 = new Date(today);
        let state = this.state.InvoiceViewData;
        state[name] = date;
        this.setState({ state });

    };

    componentDidMount() {
        this.state.InvoiceViewData.revisedInvoiceAmount = this.state.InvoiceViewData.penaltyAmount + this.state.InvoiceViewData.invAmount;
        fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/GetSearchInvoiceHistory`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.InvoiceData)
        }).then(response => response.json())
            .then(data => {

                if (data.length > 0) {
                    data[0].invoiceDate = new Date(data[0].invoiceDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', });
                    data[0].dueDate = new Date(data[0].dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', });
                }
                console.log("history Biling", data);
                this.setState({ InvoiceViewData: data[0] });
                this.tabledata(data);
            });
    }

    tabledata = (InvoiceViewList) => {
        this.setState({
            InvoiceView: InvoiceViewList.map((prop, key) => {
                return {
                    SNo: key + 1,
                    ModifiedDate: new Date(prop.modifiedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', }),
                    PenaltyRate: prop.penaltyRate,
                    PenaltyAmount: prop.penaltyAmount,
                    RevisedInvoiceAmount: prop.revisedInvoiceAmount,
                    InvoiceAmount: prop.invAmount,
                    UserId: prop.userId,
                    RevisedPenaltyRate: prop.revisedPenaltyRate,
                    RevisedPenaltyAmount: prop.revisedPenaltyAmount,
                    RevisedInvoiceAmount: prop.revisedInvoiceAmount

                };
            })
        });
    }

    onFormSubmit = () => {
        this.state.InvoiceViewData.revisedInvoiceAmount = parseInt(this.state.InvoiceViewData.penaltyAmount) + parseInt( this.state.InvoiceViewData.invAmount);
        var dbData = {
            'invoiceId': this.state.InvoiceViewData.invoiceId,
            'createdUserId': this.state.InvoiceViewData.userId,
            'modifiedDate': this.state.InvoiceViewData.modifiedDate,
            'penaltyAmount': this.state.InvoiceViewData.penaltyAmount,
            'penaltyRate': this.state.InvoiceViewData.penaltyRate,
            'revisedInvAmount': this.state.InvoiceViewData.revisedInvoiceAmount
        }
        fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/CreateRegenerateInvoice`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dbData)
        }).then(response => response.json())
            .then(data => {
               
                console.log("Save Invoice Penalty", data);
                
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



render(){
    const { classes } = this.props;
    return (

        <Card className="assignCard">
            <CardHeader color="rose" icon>
                <CardIcon color="rose">
                    <Icon><img id="icon" /></Icon>
                </CardIcon>
                {
                    <h4 >
                        <small> Regenerate Invoice  </small>
                    </h4>
                }
            </CardHeader>
            <CardBody>

                <div>

                    <GridContainer>
                        <GridItem xs={12} sm={4}>
                            <CustomInput
                                labelText="Invoice No"
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
                                labelText="Contract Id"
                                name="contractId"
                                disabled="true"
                                // required={true}
                                value={this.state.InvoiceViewData.contractId}
                                onChange={(e) => this.onInputChange(e)}
                                formControlProps={{ fullWidth: true }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={4}>
                            <CustomInput
                                labelText="Organization Name"
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
                                labelText="Invoice Date"
                                disabled="true"
                                id='invoiceDate'
                                name='invoiceDate'
                                onChange={(evt) => this.onDateChange('datetime', 'invoiceDate', evt)} 
                                value={this.state.InvoiceViewData.invoiceDate} 
                                formControlProps={{ fullWidth: true }} />
                        </GridItem>

                        <GridItem xs={12} sm={4}>
                            <CustomInput
                                labelText="Invoice Amount"
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
                                labelText="Paid Amount"
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
                                labelText="Balance Amount"
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
                                <h4><small> Penalty Details</small>
                                </h4>
                            </GridItem>
                        </GridContainer>

                        <GridContainer>
                            
                            <GridItem xs={12} sm={12} md={4}>
                                <CustomDatetime required={true} onFocus={this.state.onClick}
                                    labelText="Due Date"
                                    id='dueDate'
                                    disabled="true"
                                    name='dueDate'
                                    onChange={(evt) => this.onDateChange('datetime', 'dueDate', evt)}
                                    value={this.state.InvoiceViewData.dueDate}
                                    formControlProps={{ fullWidth: true }}
                                />
                            </GridItem>
                           
                            <GridItem xs={12} sm={4}>
                                <CustomInput
                                    labelText="Default Days"
                                    name="defaultDays"
                                    disabled="true"
                                    // required={true}
                                    value={this.state.InvoiceViewData.defaultDays}
                                    onChange={(e) => this.onInputChange(e)}
                                    formControlProps={{ fullWidth: true }}
                                />
                            </GridItem>

                            <GridItem xs={12} sm={4}>
                                <CustomInput
                                    labelText="Penalty Rate(%)"
                                    name="penaltyRate"
                                    //onFocus={(e)=>this.inFocus(e)}
                                    // required={true}
                                    value={this.state.InvoiceViewData.penaltyRate}
                                    onChange={(e) => this.onInputChange(e)}
                                    formControlProps={{ fullWidth: true }}
                                />
                            </GridItem>

                            <GridItem xs={12} sm={4}>
                                <CustomInput
                                    labelText="Penalty Amount"
                                    name="penaltyAmount"
                                    //onBlur={(e)=>this.outFocus(e)}
                                    disabled="true"
                                    // required={true}
                                    value={this.state.InvoiceViewData.penaltyAmount}
                                    onChange={(e) => this.onInputChange(e)}
                                    formControlProps={{ fullWidth: true }}
                                />
                            </GridItem>

                        </GridContainer>

                        
                        <GridContainer>
                            <GridItem>
                                <h4><small> Revised Invoice Details</small>
                                </h4>
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={4}>
                                <CustomInput
                                    labelText="Revised Invoice Amount"
                                    name="revisedInvoiceAmount"
                                    disabled="true"
                                    // required={true}
                                    value={this.state.InvoiceViewData.revisedInvoiceAmount}
                                    onChange={(e) => this.onInputChange(e)}
                                    formControlProps={{ fullWidth: true }}
                                />
                            </GridItem>
                        </GridContainer>

                        

                        <CardHeader color="info" icon >

                            {
                                <h3 >
                                    <small> History </small>
                                </h3>
                            }
                        </CardHeader>
                        <GridContainer justify="center">
                            <div id="searchTableSec">

                                <GridItem xs={12} >


                                    <CardBody className="modify-user-react-tab">
                                        <ReactTable
                                            data={this.state.InvoiceView}
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
                                                {

                                                    Header: "Modified Date",
                                                    accessor: "ModifiedDate",
                                                    //minWidth: 150,
                                                    //style: { textAlign: "center" },
                                                    headerClassName: 'react-table-center',
                                                    minWidth: 40,
                                                    resizable: false,
                                                },
                                                {
                                                    Header: "User Id",
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

                                                    Header: "Penalty Rate",
                                                    accessor: "PenaltyRate",
                                                    //style: { textAlign: "center" },
                                                    headerClassName: 'react-table-center',
                                                    minWidth: 40,
                                                    resizable: false,
                                                },
                                                {

                                                    Header: "Penalty Amount",
                                                    accessor: "PenaltyAmount",
                                                    //style: { textAlign: "center" },
                                                    headerClassName: 'react-table-center',
                                                    minWidth: 40,
                                                    resizable: false,
                                                },
                                                {
                                                    Header: "Invoice Amount",
                                                    accessor: "InvoiceAmount",
                                                    //minWidth: 150,
                                                    //style: { textAlign: "center" },
                                                    //headerClassName: 'react-table-center'
                                                    style: { textAlign: "center" },
                                                    headerClassName: 'react-table-center',
                                                    minWidth: 40,
                                                    resizable: false,
                                                },
                                                {

                                                    Header: "Revised Penalty Rate",
                                                    accessor: "RevisedPenaltyRate",
                                                    //style: { textAlign: "center" },
                                                    headerClassName: 'react-table-center',
                                                    minWidth: 40,
                                                    resizable: false,
                                                },
                                                {

                                                    Header: "Revised Penalty Amount",
                                                    accessor: "RevisedPenaltyAmount",
                                                    //style: { textAlign: "center" },
                                                    headerClassName: 'react-table-center',
                                                    minWidth: 40,
                                                    resizable: false,
                                                },
                                                {

                                                    Header: "Revised Invoice Amount",
                                                    accessor: "RevisedInvoiceAmount",
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
                                            className="-striped -highlight"
                                        />
                                    </CardBody>
                                </GridItem>
                            </div>
                        </GridContainer>

                        <GridContainer justify="center">
                            <GridItem xs={3} sm={3} md={3}>

                                <Button id="round" color="info" onClick={this.onFormSubmit}> Save  </Button>

                            </GridItem>
                        </GridContainer>

                    </GridContainer>
                </div>
            </CardBody>
        </Card>
        
);
}


}
export default RegenerateInvoice;
