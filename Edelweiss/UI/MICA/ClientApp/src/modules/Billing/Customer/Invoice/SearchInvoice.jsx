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
import $ from 'jquery';
import swal from 'sweetalert';
import InvoiceConfiguration from "modules/Billing/Invoice/InvoiceConfiguration.jsx";
import Visibility from "@material-ui/icons/Visibility";
import GetApp from "@material-ui/icons/GetApp";
import Edit from "@material-ui/icons/Edit";
import { Link } from 'react-router-dom';
import ViewInvoice from "modules/Billing/Invoice/ViewInvoice.jsx";
import RegenerateInvoice from "modules/Billing/Invoice/RegenerateInvoice.jsx";
import validationPage from "modules/Partners/Organization/views/ValidationPage.jsx";


const styles = theme => ({
    paper: {
        position: 'absolute',
        width: '60%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',

    },
});

class SearchInvoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            InvoiceSelectedNo: "",
            editModal: false,
            close: false,
            open: false,
            simpleSelect: "",
            selectedValue: null,
            visibility: false,
            activeFrom: "",
            disabled: true,
            disable: true,
            InvoiceStatus: "",
            masterList: [],
            //tblinvoicedetails: false,
            invoiceDetails: [],
            invoicedetailsdata: [],

            InvoiceData: {
                customerName: "",
                contractName: "",
                status: "",
                invoiceNo: "",
                invoiceEffectiveDate: "",
                invoiceEndDate: "",
            },
            customerNameState: "",
            invoiceNoState: "",
        };
        this.handleEdit = this.handleEdit.bind(this);
    }

    onDateChange = (formate, name, event) => {
        var today = event.toDate();
        var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
        var date2 = new Date();
        var date1 = new Date(today);
        let state = this.state.InvoiceData;
        state[name] = date;
        this.setState({ state });

    };


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



    onInputParamChange = (evt) => {
        console.log('Event', evt);
        const fields = this.state.InvoiceData;
        fields[evt.target.name] = evt.target.value;
        console.log("fields", fields);
        this.setState({ fields });

    };
    datechange = (date) => {
        const _date = date.split('/');
        const dateObj = { month: _date[1], year: _date[2], day: _date[0] };

        return dateObj.year + '-' + dateObj.month + '-' + dateObj.day;
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

    onInputChange = (type, event) => {
        const fields = this.state.InvoiceData;
        fields[event.target.name] = event.target.value;
        this.setState({ fields });
        this.change(event, event.target.name, type);
    };

    onFormSubmit = () => {
        const Fromdate = this.state.InvoiceData.invoiceEffectiveDate;
        const Todate = this.state.InvoiceData.invoiceEndDate;
        this.state.InvoiceData.invoiceEffectiveDate = this.datechange(this.state.InvoiceData.invoiceEffectiveDate);
        this.state.InvoiceData.invoiceEndDate = this.datechange(this.state.InvoiceData.invoiceEndDate);
        // let that = this;
        fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/GetSearchInvoiceHistory`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.InvoiceData)
        }).then(response => response.json())
            .then(data => {

                this.setState({ invoiceDetails: data });
                console.log("history data:", data);

                this.tabledata();

            });

        this.state.InvoiceData.invoiceEffectiveDate = Fromdate;
        this.state.InvoiceData.invoiceEndDate = Todate;
        document.getElementById('searchTableSec');
    }

    editFunction(id, pId) {

        document.getElementById("disp");
        var orgArr = this.state.invoiceDetails;
        var partArr = [];
        $.each(orgArr, function (k, v) {
            if (v.invoiceId == pId) {
                partArr.push(orgArr[id]);
            }
        })
        console.log("partArr", partArr);
        this.setState({ InvoiceSelectedNo: partArr[0].invoiceNo });

    }
    handleView = () => {
        if (this.state.partid == "") {
            swal("", "Please select the patner to view details", "error")
        } else {
            this.handleOpen();
            let view = this.state;
            view.disabled = false;
            view.disable = false;
            view.editModal = true;
            view.open = true;
            view.close = false;
            view.visibility = false;
            view.close = false

            this.setState({ view });
        }
    };
    downloadpdfFun = () => {

        window.open(
            'https://invoiceawsbucket.s3.amazonaws.com/c1ffb69e-2818-4933-869e-35603a7d7208InvoiceOla00123.pdf',
            '_blank' // <- This is what makes it open in a new window.
        );

        //window.location.href="https://invoiceawsbucket.s3.amazonaws.com/c1ffb69e-2818-4933-869e-35603a7d7208InvoiceOla00123.pdf"; // <- To open in same page

    }
    handleEdit = (id) => {
        if (this.state.partid == "") {
            swal("", "Please select the patner to edit details", "error")
        } else {
            this.handleOpen();
            console.log(id)
            let edit = this.state;
            edit.close = false;
            edit.editModal = true;
            edit.visibility = false;
            edit.open = true;
            edit.disabled = true;
            edit.disable = true;
            edit.close = false
            this.setState({ edit });
            console.log("edit", this.state.editModal);
        }
    };
    handleOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };

    tabledata = (e, index) => {
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
                    btn: <div><Button color="info" justIcon round simple className="edit" onClick={this.handleView.bind(this, key)}><Edit /></Button>

                        <Button color="info" justIcon round simple className="dwonload" onClick={this.downloadpdfFun.bind(this)}> <GetApp /></Button>

                    </div>

                };
            })
        });
    }


    render() {
        return (
            <Card className="assignCard">
                <CardHeader color="rose" icon>
                    <CardIcon color="rose">
                        <Icon><img id="icon" /></Icon>
                    </CardIcon>
                    {
                        <h4 >
                            <small> Search Invoice </small>
                        </h4>
                    }
                </CardHeader>

                <CardBody>

                    <div>

                        <GridContainer>
                            <GridItem xs={12} sm={4}>
                                <CustomInput 
                                    success={this.state.customerNameState === "success"}
                                    error={this.state.customerNameState === "error"}
                                    labelText="Customer Name"
                                    name="customerName"
                                    required={true}
                                    value={this.state.InvoiceData.customerName}
                                    onChange={(e) => this.onInputChange("string", e)}
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
                                    success={this.state.invoiceNoState === "success"}
                                    error={this.state.invoiceNoState === "error"}
                                    labelText="Invoice No "
                                    name="invoiceNo"
                                    required={true}
                                    value={this.state.InvoiceData.invoiceNo}
                                    onChange={(e) => this.onInputChange("number", e)}
                                    formControlProps={{ fullWidth: true }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                                <CustomDatetime required={true} onFocus={this.state.onClick} labelText="Start Date" id='dtActiveFrom' name='invoiceEffectiveDate' onChange={(evt) => this.onDateChange('datetime', 'invoiceEffectiveDate', evt)} value={this.state.InvoiceData.invoiceEffectiveDate} formControlProps={{ fullWidth: true }} />

                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                                <CustomDatetime required={true} onFocus={this.state.onClick} labelText="End Date" id='dtActiveFrom' name='invoiceEndDate' onChange={(evt) => this.onDateChange('datetime', 'invoiceEndDate', evt)} value={this.state.InvoiceData.invoiceEndDate} formControlProps={{ fullWidth: true }} />

                            </GridItem>

                            <GridContainer justify="center">
                                <GridItem>
                                    <Button id="round" style={{ marginTop: '25px' }} color="info" onClick={this.onFormSubmit}> Search  </Button>

                                </GridItem>
                            </GridContainer>


                            {<GridContainer justify="center">
                                <div>

                                    <GridItem xs={12} >


                                        <CardBody className="modify-user-react-tab">
                                            <ReactTable
                                                data={this.state.invoiceDetailsData}
                                                filterable

                                                columns={[
                                                    {
                                                        Header: "",
                                                        accessor: "radio",
                                                        minWidth: 20,
                                                        style: { textAlign: "center" },
                                                        headerClassName: 'react-table-center',
                                                        sortable: false,
                                                        filterable: false,
                                                        resizable: false,
                                                    },
                                                    {
                                                        Header: "S.No",
                                                        accessor: "SNo",
                                                        //style: { textAlign: "center" },
                                                        headerClassName: 'react-table-center',
                                                        minWidth: 30,
                                                        resizable: false,

                                                    },
                                                    {
                                                        Header: "Contract ID",
                                                        accessor: "ContractId",
                                                        //style: { textAlign: "center" },
                                                        headerClassName: 'react-table-center',
                                                        minWidth: 50,
                                                        resizable: false,
                                                        /* minWidth: 150,
                                                           style: { textAlign: "center" },
                                                           headerClassName: 'react-table-center'*/
                                                    },
                                                    {

                                                        Header: "Org Name",
                                                        accessor: "OrgName",
                                                        //minWidth: 150,
                                                        //style: { textAlign: "center" },
                                                        headerClassName: 'react-table-center',
                                                        minWidth: 50,
                                                        resizable: false,
                                                    },
                                                    {
                                                        Header: "Invoice No",
                                                        accessor: "InvoiceNo",
                                                        //minWidth: 150,
                                                        //style: { textAlign: "center" },
                                                        //headerClassName: 'react-table-center'
                                                        style: { textAlign: "center" },
                                                        headerClassName: 'react-table-center',
                                                        minWidth: 40,
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
                                                        //style: { textAlign: "center" },
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
                                                        minWidth: 30,
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
                                        </CardBody>
                                    </GridItem>
                                </div>
                            </GridContainer>}



                            <Modal
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                open={this.state.open}
                                onClose={this.handleClose}>
                                <div id="modal">
                                    <h4><small> Regenerate Invoice</small></h4>
                                    <Button color="info"
                                        round
                                        //className={classes.marginRight}
                                        id="close-bnt"
                                        onClick={this.handleClose}>
                                        &times;
                                                        </Button>
                                    <div id="disp" >
                                        <RegenerateInvoice InvoiceSelectedNo={this.state.InvoiceSelectedNo} editModal={this.state.editModal} disable={this.state.disable} handleClose={this.handleClose} open={this.state.open} close={this.state.close} disabled={this.state.disabled} searchPartnerId={this.state.partid} btnvisibility={this.state.btnvisibility} displaybtn={!this.state.disabled} visibility={this.state.visibility} />
                                    </div>
                                </div>
                            </Modal>

                        </GridContainer>
                    </div>
                </CardBody>
            </Card>


        );

    }
}
export default SearchInvoice;