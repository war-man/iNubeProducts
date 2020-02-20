import React from "react";
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
import CustomInput from "components/CustomInput/CustomInput.jsx";
import { Animated } from "react-animated-css";
import BillingConfig from "modules/Billing/BillingConfig.js";

import withStyles from "@material-ui/core/styles/withStyles";

import $ from 'jquery';
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import CreateCustomer from "./CreateCustomer";
import CreateContract from "modules/Billing/Contract/CreateContract.jsx";
import swal from 'sweetalert';
import TableContentLoader from "components/Loaders/TableContentLoader.jsx";
import PageContentLoader from "components/Loaders/PageContentLoader.jsx";
import data_Not_found from "assets/img/data-not-found-new.png"; 

import TranslationContainer from "components/Translation/TranslationContainer.jsx";



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
    marginBottom: "1rem",
    right: '10px',

}
const paddingCard =
{
    padding: "10px",
};

class SearchCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeFrom: "",
            Datapic: [
                { documentStr: "" }
            ],
            docpage: false,
            contractDetails: [],
            contractDetailsData: [],
            masterList: [],
            redirect: false,
            Currency: "",
            ContractCurrency: "",
            contractId: "",
            customerId: "",
            customerName: "",
            selectedRow: [],
            SearchData: [],
            CustomersDTO: {
                "customerId": 0,
                "customerName": "",
                "contractName": "",
                "contractNo": "", 
            },
            sendCustomerid: 0,
            searchData: [],
            customername:"",
            customerN:"",
            flag: true,
            viewPage: false,
            editPage: false,

            pageloader: false,
            nodata: false,
            loader: true, 
            
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

        setTimeout(
            function () {
                this.setState({ pageloader: true });
            }.bind(this), 2000
        ); 
    }

    onInputChange = (evt) => {
        const fields = this.state.ContractData;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
    };

    onInputParamChange = (evt) => {
        console.log('Event', evt);
        const fields = this.state.ContractData;
        fields[evt.target.name] = evt.target.value;
        console.log("fields", fields);
        this.setState({ fields });

    };

    onDateChange = (formate, name, event) => {
        var today = event.toDate();
        var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
        var date2 = new Date();
        var date1 = new Date(today);
        if (name === "PurchaseOrderDate") {
            let state = this.state;
            state[name] = date;
            this.setState({ state });
        } else {
            const ContractDTO = this.state.ContractData;
            ContractDTO[name] = date;
            this.setState({ ContractDTO });
        }
    };

    onInputChange = (evt) => {
        const fields = this.state.ContractData;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
    };
    datechange = (date) => {
        const _date = date.split('/');
        const dateObj = { month: _date[1], year: _date[2], day: _date[0] };

        return dateObj.year + '-' + dateObj.month + '-' + dateObj.day;
    }


    handleSearchCustomer = (event) => {

        this.setState({ loader: false });

        fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/CustomerSearch`, {
            method: 'POST',
            body: JSON.stringify(this.state.CustomersDTO),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        }).then(response => response.json())
            .then(data => {

                console.log("data save result:", data);
                this.setState({ searchData: data });

                this.setState({ searchContractTable: false, loader: false }); 

                if (this.state.searchData.length > 0) {
                    // document.getElementById('searchContractTable').style.display = 'block';
                    this.setState({ searchContractTable: true });
                    this.customerTable(data);
                }
                else {

                    setTimeout(
                        function () {
                            this.setState({ loader: true, searchContractTable: false, nodata: true });
                        }.bind(this), 2000
                    ); 
                }

            });

    }

    customerTable = (rows) => {
        this.setState({ loader: true, searchContractTable: true }) 

        console.log("contracttable", this.state.CustomersDTO);
        this.setState({
            customerdata: rows.map((prop, key) => {
                return {
                    id: key,
                    SNo: key + 1,
                    CustomerId: prop.customerId,
                    CustomerName: prop.customerName,
                    ContractName: prop.contractName,
                    radio: < input type="radio" name="product" onClick={this.editFunction.bind(this, key, prop.customerId, prop.customerName)} />
                };
            })
        });
    }

    editFunction(id, cId, cName) {
     
        
        console.log('custName:', cName,this.props.customerNameUpdate);
        
        this.setState({ customerN: cName });
        var orgArr = this.state.searchData;
        var contArr = [];
        $.each(orgArr, function (k, v) {
            if (v.customerId == cId) {
                contArr.push(orgArr[id]);
            }
        })
       // this.props.customerNameUpdate(this.state.searchData,cId,cName);

        console.log("ContArr", contArr);
        this.state.selectedRow = contArr;
        const custid = contArr[0].customerId;
        console.log("billingdataid: ", custid);

        const custname = contArr[0].customerName;
        console.log("billingdataname:", custname);
        this.setState({ sendCustomerid: custid, customername: custname });
    };

    handleopen = () => {
        if (this.props.Okflag == false) {
            console.log("custname: ", this.state.customername);
            this.setState({ searchContractTable:false});
            //const name = this.props.customername;
            //this.setState({ name: this.state.customername });
            //name = this.state.customer;
            console.log("custname: ", this.state.customername);
            console.log("custname: ", this.props.customername);
        }
        else {
            console.log("customerprops", this.state.selectedRow);
            if (this.state.sendCustomerid !== "") {
                this.setState({ open: true });
                this.setState({ viewPage: false });
            }
        }
    };
    handleView = () => {
        if (this.props.Okflag == false) {
            console.log("custname: ", this.state.customername);
            this.setState({ searchContractTable: false });
           
            console.log("custname: ", this.state.customername);
            console.log("custname: ", this.props.customername);
        }
        else {
            console.log("customerprops", this.state.selectedRow);
            if (this.state.sendCustomerid !== "") {
                this.setState({ open: true });
                this.setState({ viewPage: true });
            }
        }
    };
    handleClose = () => {
        this.setState({ open: false });
    };

    SetCustomer = ((type, event) => {
        console.log("customerdto", this.state.CustomersDTO);
       // event.preventDefault();
        let CustomersDTO = this.state.CustomersDTO;
        let name = event.target.name;
        let value = event.target.value;
        CustomersDTO[name] = value;
        this.setState({ CustomersDTO });
    });


    render() {
        const { classes } = this.props;

        return (
            <div>
                {this.state.pageloader ? 
                    <Card>
                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                            <Icon><img id="icon"/></Icon>
                            </CardIcon>
                            {
                                <GridItem>
                                    <h4><small><TranslationContainer translationKey="CustomerSearch" /></small></h4>

                                </GridItem>
                            }
                        </CardHeader>

                        
                       
                            <CardBody>
                                <GridContainer className="search-Product">


                                    {/* <GridItem xs={12} sm={12} md={4}>

                                        <CustomInput
                                            labelText="Customer Id"
                                            value={this.state.CustomersDTO.customerId}
                                            name="customerId"
                                            onChange={(e) => this.SetCustomer("string", e)}
                                            id="customerId"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />


                                    </GridItem> */}




                                    <GridItem xs={12} sm={12} md={4}>
                                        <CustomInput

                                            labelText="CustomerName"
                                            value={this.state.CustomersDTO.customerName}
                                            name="customerName"
                                            id="customerName"
                                            onChange={(e) => this.SetCustomer("string", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput

                                    labelText="ContractName"
                                    value={this.state.CustomersDTO.contractName}
                                    name="contractName"
                                    id="contractName"
                                    onChange={(e) => this.SetCustomer("string", e)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput

                                    labelText="ContractNumber"
                                    value={this.state.CustomersDTO.contractNo}
                                    name="contractNo"
                                    id="contractNo"
                                    onChange={(e) => this.SetCustomer("string", e)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                                    <GridContainer justify="center">
                                        <GridItem >

                                            <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                                                <Button id="submitBtn" color="info" round onClick={this.handleSearchCustomer} >
                                                <TranslationContainer translationKey="Search" />  
                                               </Button>
                                            </Animated>



                                        </GridItem>
                                    </GridContainer>
                                   
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
                                    {this.state.viewPage ? <h4><small className="center-text"><TranslationContainer translationKey="ViewCustomer" /> </small></h4> : <h4><small className="center-text"><TranslationContainer translationKey="ModifyCustomer" /> </small></h4>}

                                <CreateCustomer sendCustomerid={this.state.sendCustomerid} viewPage={this.state.viewPage}/>
                                    </div>
                                </Modal>
                            </CardBody>
                       
                    </Card>
                    : <PageContentLoader />
                } 
                {this.state.loader ?
                    <GridContainer xl={12}> 
                    {this.state.searchContractTable ?
                       
                            <GridItem xs={12}>
                                <ReactTable
                                    title={<TranslationContainer translationKey="CustomerDetails" />}
                                    data={this.state.customerdata}
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
                                        //    Header: " S No",
                                        //    accessor: "SNo",
                                        //    style: { textAlign: "right" },
                                        //    headerClassName: 'react-table-center',
                                        //    minWidth: 50,
                                        //    resizable: false,

                                        //},
                                        //{
                                        //    Header: "Customer Id",
                                        //    accessor: "CustomerId",
                                        //    style: { textAlign: "center" },
                                        //    headerClassName: 'react-table-center',
                                        //    minWidth: 50,
                                        //    resizable: false,

                                        //},
                                        {

                                            Header: "CustomerName",
                                            accessor: "CustomerName",
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 50,
                                            resizable: false,
                                        }, 
                                        {

                                            Header: "ContractName",
                                            accessor: "ContractName",
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 50,
                                            resizable: false,
                                        },
                                    ]}
                                    defaultPageSize={5}
                                    showPaginationTop={false}
                                    //pageSize={([this.state.data.length + 1] < 5) ? [this.state.data.length + 1] : 5}
                                    showPaginationBottom
                                    className="-striped -highlight discription-tab"
                                />
 
                                   
                                   
                                   
                            <GridContainer justify="center">
                                <GridItem>

                                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>

                                        <Button id="submitBtn" color="info" round onClick={this.handleView} >
                                                <TranslationContainer translationKey="View" /> 
                                               </Button>

                                    </Animated>
                                </GridItem>

                                <GridItem>

                                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                              
                                                <Button id="submitBtn" color="info" round onClick={this.handleopen} >
                                                <TranslationContainer translationKey="Edit" />  
                                               </Button>
                                           
                                        </Animated>
                                    </GridItem>
                                </GridContainer>
                            </GridItem>

                      
                            : <GridItem lg={12}> {
                                this.state.nodata ? <Card>
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
                            </GridItem>
                        }

                    </GridContainer>
                    : <Card style={paddingCard}>
                        <TableContentLoader />
                    </Card>
                }   
               
            </div>


        );
    }
}

export default withStyles(style)(SearchCustomer);