import React from "react";
import FilterNone from "@material-ui/icons/FilterNone";

// @material-ui/core components

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Datetime from "react-datetime";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import AddProduct from "modules/Partners/Partner/views/_AddProduct.jsx";
import Button from "components/CustomButtons/Button.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import searchproduct from "assets/img/search-product.png";
import Icon from "@material-ui/core/Icon";
import $ from 'jquery';
import CustomDropdown from "../../../components/CustomDropdown/CustomDropdown";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import user from "assets/img/user.png";
import ReactTable from "components/MuiTable/MuiTable.jsx";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import { Animated } from "react-animated-css";

import swal from 'sweetalert';
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import { type } from "os";

import Dropdown from "components/Dropdown/Dropdown.jsx";
import contract from "assets/img/contract-search.png";
import BillingConfig from 'modules/Billing/BillingConfig.js';
import CreateBilling from "./CreateBilling";
import Modal from '@material-ui/core/Modal';




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

const radioAlign = {
    margin: "0 auto",
    textAlign: "center"
}

const submitBtn = {
    height: "35px",
    marginTop: "-10px"
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
class SearchContract extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            SearchData: [],
            contractdata: [],
            searchContractTable: false,
            sendbillingid: 0,
            billingsearch: {
                customerName: "",
                contractId: 0,
                contractName: "",
                billingStartDate: "",
                billingEndDate: "",
                billingConfigId: 0
            },
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
            "billingItem": [
                {
                    "billingItemId": 0,
                    "billingConfigId": 0,
                    "billingTypeDesc": "",
                    "billingTypeId": 0,
                    //"billingObjectId": 0,
                    //"billingEventId": 0,
                    "billingFrequencyId": 0,
                    "noofFrequency": 0,
                    "categoryTypeId": 0,
                    "valueFactorId": 0,
                    "rateCategoryId": 0,
                    "rateTypeId": 0,
                    "threshold": 0,
                    "rate": 0,
                    "createdBy": 0,
                    "createdDate": "",
                    "eventMappingId": 0,
                    "tblBillingItemDetail": [
                        {
                            "billingItemDetailId": 0,
                            "billingItemId": 0,
                            "seqNo": 0,
                            "amount": 0,
                            "dueDate": "",
                            "from": 0,
                            "to": 0,
                            "ratePercent": 0
                        }
                    ],
                    
                }
            ],
           

        }
    };


    handleSearchBilling = (event) => {
        debugger
        let effdate = "";
        let enddate = "";
        console.log("contractdto", this.state.billingsearch);
        if (this.state.billingsearch.billingStartDate != "" ) {
            effdate = this.state.billingsearch.billingStartDate;
            this.state.billingsearch.billingStartDate = this.datechange(this.state.billingsearch.billingStartDate);
        }
        if (this.state.billingsearch.billingEndDate != "" ) {
            enddate = this.state.billingsearch.billingEndDate;
            this.state.billingsearch.billingEndDate = this.datechange(this.state.billingsearch.billingEndDate);
        }

    fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/SearchBilling`, {
            method: 'POST',
            body: JSON.stringify(this.state.billingsearch),
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
                //this.setState({ billingsearch: data });

                //console.log("data save result:", this.state.ContractDTO);
                if (this.state.SearchData.length > 0) {
                    // document.getElementById('searchContractTable').style.display = 'block';
                    this.setState({ searchBillingTable: true });
                    this.billingTable(data);
                }

            });
        this.state.billingsearch.billingStartDate = effdate;
        this.state.billingsearch.billingEndDate = enddate;
    };

    billingTable = (rows) => {
        console.log("Billingdata", this.state.SearchData);
        this.setState({
            Billingdata: rows.map((prop, key) => {
                return {
                    id: key,
                    SNo: key + 1,
                    BillingId: prop.billingConfigId,
                    ContractId: prop.contractId,
                   // ContractName: prop.contractName,
                    BillingStartDate: new Date(prop.billingStartDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', }),
                    BillingEndDate: new Date(prop.billingEndDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', }),
                    radio: < input type="radio" name="product" onClick={this.editFunction.bind(this, key, prop.billingConfigId)} />

                };
            })
        });
    }

    datechange = (date) => {
        debugger
        console.log("date change", date);
        const _date = date.split('/');
        const dateObj = { month: _date[1], year: _date[2], day: _date[0] };

        return dateObj.year + '-' + dateObj.month + '-' + dateObj.day;
    }

    editFunction(id, billingconfigid) {
        debugger
        // this.setState({ contractN: cname });
        //this.setState({ BillingItemDTO.billingConfig.contractId: cId });
        // this.state.BillingItemDTO.billingConfig.contractId = cId;

        //this.state.billingConfigs.contractId = cId;
        //this.setState({ contractN: cName });
        var bArr = this.state.SearchData;
        var BillingArr = [];
        $.each(bArr, function (k, v) {
            if (v.billingConfigId == billingconfigid) {
                BillingArr.push(bArr[id]);
            }
        })
        console.log("BillingArr", BillingArr);
        const billingdataid = BillingArr[0].billingConfigId;
        console.log("billingdataid: ", billingdataid);
        this.setState({ sendbillingid: billingdataid });
    };

    SetBilling = ((type, event) => {
        console.log("contractdto", this.state.billingsearch);
        debugger
        event.preventDefault();
        let billingsearch = this.state.billingsearch;
        let name = event.target.name;
        let value = event.target.value;
        billingsearch[name] = value;
        this.setState({ billingsearch })
    });
    
    handleClose = () => {
        // this.setState({ showusertable: false });
        console.log("contractdto", this.state.ContractDTO);
        //this.setState({ searchContractTable: false });
        //document.getElementById('searchContractTable').style.display = 'none';

    };

    onDateChangeContract = (formate, name, event) => {
       
        var today = event.toDate();
        var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

        const state = this.state.billingsearch;
        state[name] = date;
        this.setState({ state });

    };
    handleSimple = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    handleopen = () => {
        if (this.state.sendbillingid !== "") {
            this.setState({ open: true });
        }
    }
    handleClose = () => {
        this.setState({ open: false });

    };
    render() {

        const { classes } = this.props;

       

        return (
           <div>
                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                    <Card>
               <CardHeader color="rose" icon>
                    <CardIcon color="rose">
                        <Icon><img id="icon" src={contract} /></Icon>
                    </CardIcon>
                    {
                        <GridItem>
                            <h4><small>Billing Search</small></h4>

                        </GridItem>
                    }
                </CardHeader>
               

                <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                    <CardBody>
                        <GridContainer className="search-Product">

                                    {/*    <GridItem xs={12} sm={12} md={4}>
                                        <CustomInput

                                            labelText="Billing Id"
                                            value={this.state.billingsearch.billingConfigId}
                                            name="billingConfigId"
                                            id="billingConfigId"
                                            onChange={(e) => this.SetBilling("string", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                                    
                                        <CustomInput
                                            labelText="Contract Id"
                                            value={this.state.billingsearch.contractId}
                                            name="contractId"
                                            onChange={(e) => this.SetBilling("string", e)}
                                            id="ContractId"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    

                                </GridItem>

*/}
                           
                                
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput

                                            labelText="Contract Name"
                                            value={this.state.billingsearch.contractName}
                                        name="contractName"
                                            id="ContractName"
                                            onChange={(e) => this.SetBilling("string", e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>

                          
                            <GridItem xs={12} sm={12} md={4}>

                               
                                <CustomDatetime

                                            onFocus={this.state.onClick}
                                            labelText="Effective From Date"
                                            id='billingStartDate'
                                            name='billingStartDate'
                                            onChange={(evt) => this.onDateChangeContract('datetime', 'billingStartDate', evt)}
                                            value={this.state.billingsearch.billingStartDate}
                                    formControlProps={{ fullWidth: true }} />
                                    
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                   
                                        <CustomDatetime

                                            onFocus={this.state.onClick}
                                            labelText="Effective To Date"
                                            id='billingEndDate'
                                            name='billingEndDate'
                                            onChange={(evt) => this.onDateChangeContract('datetime', 'billingEndDate', evt)}
                                            value={this.state.billingsearch.billingEndDate}
                                            formControlProps={{ fullWidth: true }} />
                                    </GridItem>
                                
                           
                            
                          
                            <GridContainer justify="center">
                                <GridItem >
                                   
                                            <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                                                <Button id="submitBtn" color="info" round className={classes.marginRight} onClick={this.handleSearchBilling} >
                                            Search
                                               </Button>
                                               </Animated>
                                       
 
                                    
                                </GridItem>
                            </GridContainer>
                                    {/* <div id="searchContractTable" style={{ display: 'none' }}> */}
                                    {this.state.searchBillingTable == true ?
                                        <GridContainer justify="center">

                                            

                                                <GridItem>

                                                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                        <CardBody className="modify-user-react-tab">

                                                            



                                                        </CardBody>
                                                    </Animated>
                                                    <GridItem >

                                                



                                                    </GridItem>
                                                </GridItem>
                                          
                                        </GridContainer>
                                        : null}

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


                                            <CreateBilling sendbillingid={this.state.sendbillingid} />
                                        </div>
                                    </Modal>
                        </GridContainer>
                    </CardBody>
              </Animated>
                    </Card>
                    {this.state.searchBillingTable ?
                        <GridContainer>
                            <GridItem xs={12}>
                                <ReactTable
                                    title={"Billing Details"}
                                    data={this.state.Billingdata}
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
                                            Header: " S No",
                                            accessor: "SNo",
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 50,
                                            resizable: false,

                                        },
                                        {
                                            Header: " Billing Id",
                                            accessor: "BillingId",
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 50,
                                            resizable: false,

                                        },

                                        {
                                            Header: "Contract Id",
                                            accessor: "ContractId",
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 50,
                                            resizable: false,

                                        },
                                        //{

                                        //    Header: "Contract Name",
                                        //    accessor: "ContractName",

                                        //    style: { textAlign: "center" },
                                        //    headerClassName: 'react-table-center',
                                        //    minWidth: 50,
                                        //    resizable: false,
                                        //},
                                        {
                                            Header: "Billing Start Date",
                                            accessor: "BillingStartDate",

                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 50,
                                            resizable: false,
                                        },
                                        {
                                            Header: "Billing End Date",
                                            accessor: "BillingEndDate",

                                            ///style: { textAlign: "center" },
                                            ///headerClassName: 'react-table-center'
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 50,
                                            resizable: false,
                                        },


                                    ]}
                                    defaultPageSize={5}
                                    showPaginationTop={false}
                                    // pageSize={([this.state.Billingdata.length + 1] < 5) ? [this.state.Billingdata.length + 1] : 5}
                                    showPaginationBottom
                                    className="-striped -highlight discription-tab"
                                />



                                <GridContainer justify="center">
                                    <GridItem >
                                        <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                                            <Button id="submitBtn" color="info" round className={classes.marginRight} onClick={this.handleopen} >
                                                Ok
                                               </Button>
                                        </Animated>
                                        
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
export default withStyles(style)(SearchContract);
