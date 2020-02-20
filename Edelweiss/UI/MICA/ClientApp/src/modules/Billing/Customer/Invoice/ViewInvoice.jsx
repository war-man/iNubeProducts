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
import BillingConfig from "modules/Billing/BillingConfig.js";
class ViewInvoice extends React.Component{
 constructor(props) {
        super(props);
        this.state = {
            InvoiceViewData:{
            balance: "",
            contractId: "",
            contractName:"" ,
            creditDaysRemaining: "",
            currency: "",
            invAmount: "",
            invoiceDate: "",
            invoiceEffectiveDate: "",
            invoiceEndDate: "",
            invoiceId: "",
            invoiceNo: "",
            orgName: "",
            status: "",
            },
            InvoiceData:{
            invoiceNo:this.props.InvoiceSelectedNo,
            invoiceDate:"",
            contractName:"",
            orgName:"",
            invAmount:"",
            paid:"",
            particulars: "",
            amount: "",
            taxAmount: "",
            totalAmount:"",
            }
            };
            }


 onInputChange = (evt) => {
        const fields = this.state.InvoiceData;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
    };

componentDidMount() {
   fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/GetSearchInvoiceHistory`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.InvoiceData)
        }).then(response => response.json())
            .then(data => {

if(data.length>0){
 data[0].invoiceDate=new Date(data[0].invoiceDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', });
}         
            console.log("history Biling", data);
                this.setState({ InvoiceViewData: data[0] });
                this.tabledata(data);
        });
    }

    tabledata = (InvoiceViewList) => {
        this.setState({
            InvoiceView:InvoiceViewList.map((prop, key) => {
                return {
                    SNo: key + 1,
                    Particulars: prop.particulars,
                    Amount: prop.amount,
                    TaxAmount: prop.tax,
                    TotalAmount: prop.totalAmount,
                  
                };
            })
        });
    }


render(){

return(
<Card className="assignCard">
                <CardHeader color="rose" icon>
                    <CardIcon color="rose">
                        <Icon><img id="icon" /></Icon>
                    </CardIcon>
                    {
                        <h4 >
                            <small> View Invoice </small>
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
                                    required={true}
                                    value={this.state.InvoiceViewData.invoiceNo}
                                    onChange={(e) => this.onInputChange(e)}
                                    formControlProps={{ fullWidth: true }}
                                />
                            </GridItem>
                             <GridItem xs={12} sm={4}>
                                <CustomInput
                                    labelText="Invoice Date"
                                    name="invoiceDate"
                                    required={true}
                                    value={this.state.InvoiceViewData.invoiceDate}
                                    onChange={(e) => this.onInputChange(e)}
                                    formControlProps={{ fullWidth: true }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                <CustomInput
                                    labelText="Contract Name"
                            name="contractName"
                                    required={true}
                            value={this.state.InvoiceViewData.contractName}
                                    onChange={(e) => this.onInputChange(e)}
                                    formControlProps={{ fullWidth: true }}
                                />
                            </GridItem>
                              <GridItem xs={12} sm={4}>
                                <CustomInput
                                    labelText="Org Name"
                                    name="orgName"
                                    required={true}
                                    value={this.state.InvoiceViewData.orgName}
                                    onChange={(e) => this.onInputChange(e)}
                                    formControlProps={{ fullWidth: true }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                <CustomInput
                                    labelText="Invoice Amount"
                                    name="invAmount"
                                    required={true}
                                    value={this.state.InvoiceViewData.invAmount}
                                    onChange={(e) => this.onInputChange(e)}
                                    formControlProps={{ fullWidth: true }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                <CustomInput
                                    labelText="Paid"
                                    name="paid"
                                    required={true}
                                    value={this.state.InvoiceViewData.customerName}
                                    onChange={(e) => this.onInputChange(e)}
                                    formControlProps={{ fullWidth: true }}
                                />
                    </GridItem>
                    <GridItem xs={12} sm={4}>
                        <CustomInput
                            labelText="Balance"
                            name="balance"
                            required={true}
                            value={this.state.InvoiceViewData.balance}
                            onChange={(e) => this.onInputChange(e)}
                            formControlProps={{ fullWidth: true }}
                        />
                    </GridItem>
                            </GridContainer>

                               <GridContainer justify="center">
                                <div>

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
                                                        Header: "Particulars",
                                                       accessor: "Particulars",
                                                        //style: { textAlign: "center" },
                                                        headerClassName: 'react-table-center',
                                                        minWidth: 30,
                                                        resizable: false,

                                                    },
 {
                                                        Header: "Amount",
                                                        accessor: "Amount",
                                                        //style: { textAlign: "center" },
                                                        headerClassName: 'react-table-center',
                                                        minWidth: 30,
                                                        resizable: false,

                                                    },
 {
                                                        Header: "Tax",
                                                        accessor: "TaxAmount",
                                                        //style: { textAlign: "center" },
                                                        headerClassName: 'react-table-center',
                                                        minWidth: 30,
                                                        resizable: false,

                                                    },
                                                    {
                                                        Header: "Total Amount",
                                                        accessor: "TotalAmount",
                                                        //style: { textAlign: "center" },
                                                        headerClassName: 'react-table-center',
                                                        minWidth: 30,
                                                        resizable: false,

                                                    },
                                                     ]}

                                                defaultPageSize={5}
                                                showPaginationTop={false}
                                                //pageSize={([this.state.Policydetailsdata.length + 1] < 5) ? [this.state.Policydetailsdata.length + 1] : 5}
                                                showPaginationBottom
                                                 className="-striped -highlight discription-tab"
                                    /> 
                                        </CardBody>
                                    </GridItem>
                                </div>
                            </GridContainer>
                    </div>
                    </CardBody>
                    </Card>
);
}
}
export default ViewInvoice;
