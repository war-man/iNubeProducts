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
import validationPage from "modules/Billing/ValidationPage.jsx";
import money from "assets/img/money.png"; 
import data_Not_found from "assets/img/data-not-found-new.png";
import TableContentLoader from "components/Loaders/TableContentLoader.jsx";
import PageContentLoader from "components/Loaders/PageContentLoader.jsx";
import { Animated } from "react-animated-css";
import bindModel from 'components/ModelBinding/bindModel.js';
import TranslationContainer from "components/Translation/TranslationContainer.jsx";

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
const paddingCard =
{
    padding: "10px",
}

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

};
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
            searchTableSec: false,
            
            InvoiceData: {
                customerName: "",
                contractName: "",
                statusId: "",
                invoiceNo: "",
                invoiceEffectiveDate: "",
                invoiceEndDate: "",
            },
            customerNameState: "",
            invoiceNoState: "",
            loader: true,
            pageloader: false,
            nodata: false,
            isButtonVisibility: false,
        };
        this.handleEdit = this.handleEdit.bind(this);
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

        setTimeout(
            function () {
                this.setState({ pageloader: true });
            }
                .bind(this),
            2000
        );
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
            case "invNo":
                if (validationPage.verifyInvNo(event.target.value)) {
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
        debugger;

        let effdate = "";
        let enddate = "";
        if (this.state.InvoiceData.invoiceEffectiveDate != "") {
            effdate = this.state.InvoiceData.invoiceEffectiveDate;
            this.state.InvoiceData.invoiceEffectiveDate = this.datechange(this.state.InvoiceData.invoiceEffectiveDate);
        }
        if (this.state.InvoiceData.invoiceEndDate != "") {
            enddate = this.state.InvoiceData.invoiceEndDate;
            this.state.InvoiceData.invoiceEndDate = this.datechange(this.state.InvoiceData.invoiceEndDate);
        }
        this.setState({ loader: false });
        debugger;
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

                this.setState({ invoiceDetails: data });
                if (this.state.invoiceDetails.length > 0) {
                    this.setState({ searchTableSec: false, loader: false });
                    this.tabledata();
                } else {
                    setTimeout(
                        function () {
                            this.setState({ loader: true, searchTableSec: false, nodata: true });
                        }.bind(this), 2000
                    );
                }

                console.log("Search history data:", data);
                
            });

        this.state.InvoiceData.invoiceEffectiveDate = effdate;
        this.state.InvoiceData.invoiceEndDate = enddate;
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


    handleEdit = (index,id) => {
        if (this.state.partid == "") {
            swal("", "Please select the patner to edit details", "error")
        } else {
            this.handleOpen();

            this.editFunction(index, id);
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
        debugger;
        let abc = this.state.invoiceDetails;
        let data = abc.filter((ele, index) => index === abc.findIndex(abc => abc.invoiceId === ele.invoiceId));
        this.setState({ searchTableSec: true, loader: true });
        this.setState({
            invoiceDetailsData: data.map((prop, key) => {
                return {
                    SNo: key + 1,
                    ContractId: prop.contractId,
                    OrgName: prop.orgName,
                    InvoiceNo: prop.invoiceNo,
                    InvoiceDate: new Date(prop.invoiceDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', }),
                    CreditDaysRemaining: prop.creditDaysRemaining,
                    Currency: prop.currency,
                    InvAmount: prop.invAmount.toFixed(2),
                    Balance: prop.balance.toFixed(2),
                    Status: prop.status,
                    radio: < input type="radio" name="product" onClick={this.editFunction.bind(this, key, prop.invoiceId)} />,
                    btn: <div><Button color="info" justIcon round simple className="edit" onClick={this.handleEdit.bind(this, key, prop.invoiceId)}><Edit /></Button>

                        <Button color="info" justIcon round simple className="download" onClick={this.downloadpdfFun.bind(this,key)}> <GetApp /></Button>

                    </div>

                };
            })
        });
    }

    downloadpdfFun = (key) => {
        const invNo = this.state.invoiceDetails[key].invoiceNo;
        console.log("Number", invNo);
        window.open(
            'https://invoiceawsbucket.s3.amazonaws.com/Invoice_' + invNo + '.pdf',
            '_blank' // <- This is what makes it open in a new window.
        );
        //window.location.href="https://invoiceawsbucket.s3.amazonaws.com/c1ffb69e-2818-4933-869e-35603a7d7208InvoiceOla00123.pdf"; // <- To open in same page
    }

    searchagain = () => {
        this.setState({ nodata: false });
        window.scrollTo(0, 0);
    }

    render() {
        const { classes } = this.props;
        const { model } = bindModel(this);

        return (
            <div>
                {this.state.pageloader ?
                <Card>
                <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                            <Icon><img id="icon" src={money} /></Icon>
                        </CardIcon>
                       {
                        <h4 >
                                    <small> <TranslationContainer translationKey="SearchInvoice" /> </small>
                        </h4>
                       }
                </CardHeader>
                <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                <CardBody>

                    <div>

                        <GridContainer>
                            <GridItem xs={12} sm={4}>
                                <CustomInput
                                    success={this.state.customerNameState === "success"}
                                    error={this.state.customerNameState === "error"}
                                    labelText="CustomerName"
                                    name="customerName"
                                    //required={true}
                                    value={this.state.InvoiceData.customerName}
                                    onChange={(e) => this.onInputChange("string", e)}
                                    formControlProps={{ fullWidth: true }}
                                />
                            </GridItem>

                            <GridItem xs={12} sm={12} md={4}>
                                <MasterDropdown
                                    labelText="Status"
                                    id="InvoiceData.statusId"
                                    value={this.state.InvoiceData.statusId}
                                    lstObject={this.state.masterList}
                                    //required={true}
                                    model="InvoiceSearchHistory"
                                    filterName='InvoiceStatus'
                                    name='statusId'
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
                                    labelText="InvoiceNo"
                                    name="invoiceNo"
                                    //required={true}
                                    value={this.state.InvoiceData.invoiceNo}
                                        onChange={(e) => this.onInputChange("invNo", e)}
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

                            <GridContainer justify="center">
                                <GridItem>
                                                <Button id="round" style={{ marginTop: '25px' }} color="info" onClick={this.onFormSubmit}> <TranslationContainer translationKey="Search" />  </Button>

                                </GridItem>
                                </GridContainer>


                                <Modal
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                    open={this.state.open}
                                    onClose={this.handleClose}>

                                    <div className={classes.paper} id="modal" >
                                    <h4>  <small className="center-text">   </small> </h4> 
                                        <Button color="info"
                                            round
                                            className={classes.marginRight}
                                            id="close-bnt"
                                            style={searchClose}
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
                                            </Animated>
                    </Card>
                    : <PageContentLoader />}
                                    {this.state.loader ?

                                        <GridContainer xl={12}>
                                            {this.state.searchTableSec ?

                                                    <GridItem lg={12}>
                                                        <ReactTable
                                    title=<TranslationContainer translationKey={"InvoiceDetails"} />
                                                            data={this.state.invoiceDetailsData}
                                                            filterable

                                                            columns={[
                                                                //{
                                                                //    Header: "Select",
                                                                //    accessor: "radio",
                                                                //    //minWidth: 20,
                                                                //    style: { textAlign: "center" },
                                                                //    headerClassName: 'react-table-center',
                                                                //    sortable: false,
                                                                //    filterable: false,
                                                                //    resizable: false,
                                                                //},

                                                                {

                                                                    Header: "OrgName",
                                                                    accessor: "OrgName",
                                                                    headerClassName: 'react-table-center',
                                                                    //minWidth: 40,
                                                                    resizable: false,
                                                                },
                                                                {
                                                                    Header: "InvoiceNo",
                                                                    accessor: "InvoiceNo",
                                                                    style: { textAlign: "center" },
                                                                    headerClassName: 'react-table-center',
                                                                    //minWidth: 40,
                                                                    resizable: false,
                                                                },
                                                                {
                                                                    Header: "InvoiceDate",
                                                                    accessor: "InvoiceDate",
                                                                    headerClassName: 'react-table-center',
                                                                    //minWidth: 40,
                                                                    resizable: false,
                                                                },
                                                                {
                                                                    Header: "CreditDaysRemaining",
                                                                    accessor: "CreditDaysRemaining",
                                                                    //style: { textAlign: "center" },
                                                                    headerClassName: 'react-table-center',
                                                                    //minWidth: 30,
                                                                    resizable: false,
                                                                },
                                                                {

                                                                    Header: "Currency",
                                                                    accessor: "Currency",
                                                                    style: { textAlign: "center" },
                                                                    headerClassName: 'react-table-center',
                                                                    //minWidth: 30,
                                                                    resizable: false,
                                                                },
                                                                {

                                                                    Header: "InvoiceAmount",
                                                                    accessor: "InvAmount",
                                                                    style: { textAlign: "right" },
                                                                    headerClassName: 'react-table-center',
                                                                    //minWidth: 40,
                                                                    resizable: false,
                                                                },
                                                                {

                                                                    Header: "BalanceAmount",
                                                                    accessor: "Balance",
                                                                    style: { textAlign: "right" },
                                                                    headerClassName: 'react-table-center',
                                                                    //minWidth: 50,
                                                                    resizable: false,
                                                                },

                                                                {

                                                                    Header: "Status",
                                                                    accessor: "Status",
                                                                    headerClassName: 'react-table-center',
                                                                    //minWidth: 30,
                                                                    resizable: false,
                                                                },
                                                                {

                                                                    Header: "Action",
                                                                    accessor: "btn",
                                                                    headerClassName: 'react-table-center',
                                                                    //minWidth: 40,
                                                                    resizable: false,
                                                                },

                                                            ]}

                                                            defaultPageSize={5}
                                                            showPaginationTop={false}
                                                            //pageSize={([this.state.Policydetailsdata.length + 1] < 5) ? [this.state.Policydetailsdata.length + 1] : 5}
                                                            showPaginationBottom
                                                            className="-striped -highlight discription-tab"
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
            </div>
        );
    }
}
export default withStyles(style)(SearchInvoice);