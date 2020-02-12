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
import swal from 'sweetalert';

class ModifyContract extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ContractViewData: {
                customerId: "",
                contractName: "",
                customerName: "",
                customerName: "",
                createdDate: "",
                currencyId: "",
                contractEffeciveDate: "",
                contractEndDate: "",
                maxCreditAmountAllowed: "",
                maxCreditPeriod: "",
                gracePeriod: "",
                pono: "",
                podate: "",
            },
            ContractDTO: {
                customerId: this.props.ContractSelectedNo,
                contractName: "",
                customerName: "",
                customerName: "",
                createdDate: "",
                currencyId: "",
                contractEffeciveDate: "",
                contractEndDate: "",
                maxCreditAmountAllowed: "",
                maxCreditPeriod: "",
                gracePeriod: "",
                pono: "",
                podate: "",
            },
            masterList: [],
        };
    }
    componentDidMount() {

        fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/GetMaster?lMasterlist=Currency`, {
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

    onInputChange = (evt) => {
        debugger;
        const fields = this.state.ContractViewData;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
    };

    onDateChange = (formate, name, event) => {
        var today = event.toDate();
        var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
        var date2 = new Date();
        var date1 = new Date(today);
        let state = this.state.ContractViewData;
        state[name] = date;
        this.setState({ state });

    };

    onFormSubmit = () => {
        debugger;
        fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/CreateContract`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.ContractDTO)
        }).then(response => response.json())
            .then(data => {

                if (data.length > 0) {
                    data[0].createdDate = new Date(data[0].createdDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', });
                    data[0].contractEndDate = new Date(data[0].contractEndDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', });
                    data[0].contractEffectiveDate = new Date(data[0].contractEffectiveDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', });
                    data[0].poDate = new Date(data[0].poDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', });

                }

                this.setState({ contractId: data.contractId });//to display contract id in swal
                console.log("create Contract: ", data);
            });

        document.getElementById('searchTableSec');

        swal({
            //title: "Good job!",
            text: "Contract Id:" + this.state.contractId + " generated successfully",
            icon: "success",
            button: "OK",
        });
    }

    render() {
        return (
            <div>
                <Card className="assignCard">
                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                            <Icon><img id="icon" /></Icon>
                        </CardIcon>
                        {
                            <h4 >
                                <small> Contract Details </small>
                            </h4>
                        }
                    </CardHeader>

                    <CardBody>

                        <div>

                            <GridContainer>

                                <GridItem xs={12} sm={4}>
                                    <CustomInput
                                        labelText="Customer Name"
                                        name="customerName"
                                        required={true}
                                        value={this.state.customerName}
                                        onChange={(e) => this.onInputChange("string", e)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                </GridItem>

                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomDatetime required={true} onFocus={this.state.onClick} labelText="Contract Date" id='dtActiveFrom' name='createdDate' onChange={(evt) => this.onDateChange('datetime', 'createdDate', evt)} value={this.state.ContractViewData.createdDate} formControlProps={{ fullWidth: true }} />

                                </GridItem>



                                <GridItem xs={12} sm={4}>
                                    <CustomInput
                                        success={this.state.contractNameState === "success"}
                                        error={this.state.contractNameState === "error"}
                                        labelText="Contract Name"
                                        name="contractName"
                                        // required={true}
                                        value={this.state.ContractViewData.contractName}
                                        onChange={(e) => this.onInputChange("string", e)}

                                        formControlProps={{ fullWidth: true }}
                                    />
                                </GridItem>

                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomDatetime required={true} onFocus={this.state.onClick} labelText="Effective From Date" id='dtActiveFrom' name='contractEffectiveDate' onChange={(evt) => this.onDateChange('datetime', 'contractEffectiveDate', evt)} value={this.state.ContractViewData.contractEffectiveDate} formControlProps={{ fullWidth: true }} />

                                </GridItem>


                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomDatetime required={true} onFocus={this.state.onClick} labelText="Effective To Date" id='dtActiveFrom' name='contractEndDate' onChange={(evt) => this.onDateChange('datetime', 'contractEndDate', evt)} value={this.state.ContractViewData.contractEndDate} formControlProps={{ fullWidth: true }} />

                                </GridItem>


                                <GridItem xs={12} sm={12} md={4}>
                                    <MasterDropdown
                                        labelText="Contract Currency"
                                        id="Currency"
                                        required={true}
                                        value={this.state.ContractViewData.currencyId}
                                        lstObject={this.state.masterList}
                                        required={true}
                                        filterName='Currency'
                                        name='currencyId'
                                        onChange={this.onInputParamChange}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={4}>
                                    <CustomInput
                                        success={this.state.maxCreditAmountAllowedState === "success"}
                                        error={this.state.maxCreditAmountAllowedState === "error"}
                                        labelText="Max Credit Amount"
                                        name="maxCreditAmountAllowed"
                                        // required={true}
                                        value={this.state.ContractViewData.maxCreditAmountAllowed}
                                        // onChange={(evt) => this.onInputChange("string", evt)}
                                        onChange={(e) => this.onInputChange("number", e)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                </GridItem>

                                <GridItem xs={12} sm={4}>
                                    <CustomInput
                                        success={this.state.maxCreditPeriodState === "success"}
                                        error={this.state.maxCreditPeriodState === "error"}
                                        labelText="Max Credit Period(In Days)"
                                        name="maxCreditPeriod"
                                        // required={true}
                                        value={this.state.ContractViewData.maxCreditPeriod}
                                        onChange={(e) => this.onInputChange("number", e)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={4}>
                                    <CustomInput
                                        success={this.state.gracePeriodState === "success"}
                                        error={this.state.gracePeriodState === "error"}
                                        labelText="Grace Period(In Days)"
                                        name="gracePeriod"
                                        // required={true}
                                        value={this.state.ContractViewData.gracePeriod}
                                        onChange={(e) => this.onInputChange("number", e)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={4}>
                                    <CustomInput
                                        success={this.state.ponoState === "success"}
                                        error={this.state.ponoState === "error"}
                                        labelText="Purchase Order No"
                                        name="pono"
                                        // required={true}
                                        value={this.state.ContractViewData.pono}
                                        onChange={(e) => this.onInputChange("number", e)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                </GridItem>

                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomDatetime required={true} onFocus={this.state.onClick} labelText="Purchase Order Date" id='dtActiveFrom' name='podate' onChange={(evt) => this.onDateChange('datetime', 'podate', evt)} value={this.state.ContractViewData.podate} formControlProps={{ fullWidth: true }} />

                                </GridItem>

                            </GridContainer>

                            <GridContainer justify="center">
                                <GridItem xs={3} sm={3} md={3}>
                                    <Button id="round" color="info" onClick={() => this.onFormSubmit()} > Save  </Button>
                                </GridItem>
                            </GridContainer>




                            {/*this.renderRedirect()*/}



                        </div>
                    </CardBody>
                </Card>
                {this.state.searchContractTable ?
                    <GridContainer justify="center">
                        <div id="searchTableSec">

                            <GridItem xs={12} >


                                <CardBody className="modify-user-react-tab">
                                    <ReactTable
                                        data={this.state.newData}
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
                                            //    Header: "Customer Name",
                                            //    accessor: "CustomerName",
                                            //    //style: { textAlign: "center" },
                                            //    headerClassName: 'react-table-center',
                                            //    minWidth: 60,
                                            //    resizable: false,
                                            //    /* minWidth: 150,
                                            //       style: { textAlign: "center" },
                                            //       headerClassName: 'react-table-center'*/
                                            //},
                                            {
                                                Header: "Contract Id",
                                                accessor: "ContractId",
                                                //style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 60,
                                                resizable: false,
                                                /* minWidth: 150,
                                                   style: { textAlign: "center" },
                                                   headerClassName: 'react-table-center'*/
                                            },
                                            {
                                                Header: "Document Name",
                                                accessor: "DocumentName",
                                                //Cell: e => <a href={e.value} onClick={() => this.documentView(e.value)}>{e.value} </a>,
                                                //style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 60,
                                                resizable: false,
                                                /* minWidth: 150,
                                                   style: { textAlign: "center" },
                                                   headerClassName: 'react-table-center'*/
                                            },
                                            {
                                                Header: "Contract Date",
                                                accessor: "ContractDate",
                                                //style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 60,
                                                resizable: false,
                                                /* minWidth: 150,
                                                   style: { textAlign: "center" },
                                                   headerClassName: 'react-table-center'*/
                                            },
                                            {

                                                Header: "Effective From Date",
                                                accessor: "ContractEffectiveDate",
                                                //minWidth: 150,
                                                //style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 60,
                                                resizable: false,
                                            },
                                            {
                                                Header: "Effective To Date",
                                                accessor: "ContractEndDate",
                                                //minWidth: 150,
                                                //style: { textAlign: "center" },
                                                //headerClassName: 'react-table-center'
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 60,
                                                resizable: false,
                                            },
                                            {
                                                Header: "Contract Currency",
                                                accessor: "ContractCurrency",

                                                ///style: { textAlign: "center" },
                                                ///headerClassName: 'react-table-center'
                                                //style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 60,
                                                resizable: false,
                                            },
                                            {
                                                Header: "Max Credit Amount Allowed",
                                                accessor: "MaxCreditAmountAllowed",
                                                //style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 60,
                                                resizable: false,
                                                //minWidth: 150,
                                                //style: { textAlign: "center" },
                                                //headerClassName: 'react-table-center'
                                            },
                                            {

                                                Header: "Max Credit Period",
                                                accessor: "MaxCreditPeriod",
                                                //minWidth: 150,
                                                //style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 50,
                                                resizable: false,
                                            },
                                            {

                                                Header: "Grace Period",
                                                accessor: "GracePeriod",
                                                //minWidth: 150,
                                                //style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 50,
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
                    : null}
            </div >

        );




    }


}
export default ModifyContract;
