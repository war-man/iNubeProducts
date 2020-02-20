import React from "react";

// @material-ui/core components

import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";

import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.jsx";

import Calendars from "views/Calendar/Calendar.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import product from "assets/img/product.png";

//import DashBoardProductSearch from "../../../Products/Micro/views/DashboardProductSearch.jsx";
import productConfig from 'modules/Products/Micro/ProductConfig.js';
import { Animated } from "react-animated-css";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import paymentConfig from "modules/Partners/Accounts/Payment/PaymentConfig.jsx";
import data_Not_found from "assets/img/data-not-found-new.png";
import TableContentLoader from "components/Loaders/TableContentLoader.jsx";
import PageContentLoader from "components/Loaders/PageContentLoader.jsx";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import policyConfig from "modules/Policy/PolicyConfig.js";
import ReactTable from "components/MuiTable/MuiTable.jsx";

const style = {
    ...dashboardStyle,
};

const paddingCard =
{
    padding: "10px",
}

class ProductDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Type: true,
            masterLists: [],
            masterList: [],
            ProductDTO: {
                // "cdid": 0,
                "partnerId": "",
                //"partnerName": "",
                //"productName":"",
                "productId": "",
                "lob": "",
                "cob": "",
                "thresholdValue": "",
                "dropLimit": "",
                "cdid": 0,
                "partnerId": "",
                "productId": "",
                "accountNo": "",
                "initialAmount": "",
                "availableBalance": "",
                "ledgerBalance": "",
                "thresholdValue": "",
                "dropLimit": "",
                "isLocked": true,
                "paymentType": "",
                "remark": "",
                "lob": "",
                "cob": "",
                "active": true,
                "createdDate": "",
                "partnerName": "",
                "productName": "",
                "tblCdtransactions": [
                ]
            },
            fields: {
                PartnerId: "",
                ProductId: "",

            },
            required: true,
            PartnerData: [],
            ProductData: [],
            loader: false,

            PolicyDTO: {
                "count": "",
                "productName": "",
                "partnerName": "",
                "partnerId": "",
                "productId": "",
                "lob": "",
                "cob": "",
            },
            policyDetails: [],
            policyDetailsData: [],
            searchTableSec: false,
            loader: true,
            pageloader: false,
            nodata: false,
            datalist: [],
            tableFlag: false,
        };
    }

    componentDidMount() {
        fetch(`${paymentConfig.partnerconfigUrl}/api/Partner/GetMasterDataAsync?sMasterlist=Partner`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ PartnerData: data });
            });
        console.log("partner list", this.state.PartnerData);
        setTimeout(
            function () {
                this.setState({ pageloader: true });
            }
                .bind(this),
            2000
        );

        //Product search
        fetch(`${productConfig.productConfigUrl}/api/Product/GetMasterData?sMasterlist=Product&isFilter=true`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ ProductData: data });
            });
        console.log("product list", this.state.ProductData);
        setTimeout(
            function () {
                this.setState({ pageloader: true });
            }
                .bind(this),
            2000
        );

    }

    onInputChange = (evt) => {
        const fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
    };

    setValue = (event) => {
        event.preventDefault();
        let PolicyDTO = this.state.PolicyDTO;
        let name = event.target.name;
        let value = event.target.value;
        PolicyDTO[name] = value;
        console.log("name", name);
        console.log("value", value);
        this.setState({ PolicyDTO });
      //   this.change(event, name);
        console.log("data", this.state.PolicyDTO);
        if (name == "partnerId") {

            let pks = this.state.PartnerData[0].mdata.filter(item => item.mID == value);
            console.log("pks", pks);
            this.state.PolicyDTO.partnerName = pks[0].mValue;

            fetch(`${paymentConfig.partnerconfigUrl}/api/Partner/GetMasterDataAsync?sMasterlist=Product&partnerId=` + value, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
            })
                .then(response => response.json())
                .then(data => {

                    console.log("off", data);
                    this.setState({ datalist: data[0].mdata });

                    console.log("datalist", this.state.datalist);

                    let ProductData = this.state.ProductData;
                    ProductData = data;

                    this.setState({ ProductData });
                    console.log("ProductDatalist", this.state.ProductData);
                });

        }
        if (name == "productId") {

            let List = this.state.ProductData[0].mdata.filter(item => item.mID == value);
            console.log("pks", List);
            this.state.PolicyDTO.productName = List[0].mValue;

           // let List = this.state.datalist.filter(item => item.mID == value);
            //console.log("proid", List);
            this.state.PolicyDTO.productName = List[0].mValue;
            if (List.length > 0) {
                let PolicyDTO = this.state.PolicyDTO;
                PolicyDTO["lob"] = List[0].lob;
                PolicyDTO["cob"] = List[0].cob;
                this.setState({ disabled: true });
                this.setState({ PolicyDTO });
                console.log("PolicyDTO with lob", this.state.PolicyDTO);
            }
        }
    }

    onFormSubmit = () => {
        debugger;
        if (this.state.PolicyDTO.partnerId != "") {
            this.state.tableFlag = false;
            this.setState({ loader: false });
            fetch(`${policyConfig.policyConfigUrl}/api/Policy/PolicySearchDashboard`, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify(this.state.PolicyDTO)
            }).then(response => response.json())
                .then(data => {
                    this.setState({ policyDetails: data });

                    console.log('searchArr', this.state.PolicyDTO);

                    if (this.state.policyDetails.length > 0) {
                        this.setState({ searchTableSec: false, loader: false });
                        this.tabledata();
                    } else {
                        setTimeout(
                            function () {
                                this.setState({ loader: true, searchTableSec: false, nodata: true });
                            }.bind(this), 2000
                        );
                    }
                });
        }

        else {
            this.state.tableFlag = true;
            this.setState({ loader: false });
            fetch(`${policyConfig.policyConfigUrl}/api/Policy/PolicySearchDashboard`, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify(this.state.PolicyDTO)
            }).then(response => response.json())
                .then(data => {
                    this.setState({ policyDetails: data });

                    console.log('searchArr', this.state.PolicyDTO);

                    if (this.state.policyDetails.length > 0) {
                        this.setState({ searchTableSec: false, loader: false });
                        this.ProdTabledata();
                    } else {
                        setTimeout(
                            function () {
                                this.setState({ loader: true, searchTableSec: false, nodata: true });
                            }.bind(this), 2000
                        );
                    }
                });
        }
        document.getElementById('searchTableSec');
    }

    tabledata = (e, index) => {
        debugger;
        this.setState({ searchTableSec: true, loader: true });
        this.setState({
            policyDetailsData: this.state.policyDetails.map((prop, key) => {
                return {
                    SNo: key + 1,
                    PartnerName: prop.partnerName,
                    ProductName: prop.productName,
                    PolicyCount: prop.count,
                };
            })
        });
    }

    ProdTabledata = (e, index) => {
        debugger;
        this.setState({ searchTableSec: true, loader: true });
        this.setState({
            policyDetailsData: this.state.policyDetails.map((prop, key) => {
                return {
                    SNo: key + 1,
                    ProductName: prop.productName,
                    PolicyCount: prop.count,
                };
            })
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                {this.state.pageloader ?
                <Card>
                    <CardHeader color="danger" icon>
                        <CardIcon color="danger">
                            <Icon> <img id="icon" src={product} className={classes.cardIcons} /></Icon>
                        </CardIcon>

                        <h4 className={classes.cardIconTitle}>
                                <small> <TranslationContainer translationKey={"ProductSearch"} /> </small>
                        </h4>

                    </CardHeader>

                    <CardBody>
                        <GridContainer xl={12}>
                            {/*<DashBoardProductSearch Type={this.state.Type} />*/}

                            <GridItem xs={12} sm={12} md={3} >
                                <MasterDropdown
                                    labelText="PartnerName"
                                    id="ddlstatus"
                                    lstObject={this.state.PartnerData}
                                    //required={this.state.required}
                                    filterName='Partner'
                                    value={this.state.PolicyDTO.partnerId}
                                    name='partnerId'
                                    onChange={this.setValue}
                                    formControlProps={{ fullWidth: true }}
                                />
                            </GridItem>

                            <GridItem xs={12} sm={12} md={3} >
                                <MasterDropdown
                                    labelText="ProductName"
                                    id="ddlstatus"
                                    lstObject={this.state.ProductData}
                                    //required={this.state.required}
                                    filterName='Product'
                                    value={this.state.PolicyDTO.productId}
                                    name='productId'
                                    onChange={this.setValue}
                                    formControlProps={{ fullWidth: true }}
                                />
                            </GridItem>

                            <GridItem xs={12} sm={12} md={3}>
                                <CustomInput
                                    //required={props.required}
                                    labelText="LineOfBusiness"
                                    name="lob"
                                    value={this.state.PolicyDTO.lob}
                                    onChange={this.setValue}
                                    disabled={this.state.disabled}
                                    formControlProps={{fullWidth: true}}
                                />
                            </GridItem>

                            <GridItem xs={12} sm={12} md={3}>
                                <CustomInput
                                    // required={props.required}
                                    labelText="ClassOfBusiness"
                                        name="cob"
                                        value={this.state.PolicyDTO.cob}
                                    onChange={this.setValue}
                                    disabled={this.state.disabled}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>

                            <GridContainer lg={12} justify="center">
                                <GridItem xs={5} sm={2} md={3} lg={1} >
                                    <Animated animationIn={this.state.animatedType} animationOut="fadeOut" isVisible={true}>
                                            <Button color="info" round onClick={this.onFormSubmit} >
                                                <TranslationContainer translationKey={"Search"} />
                                        </Button>
                                    </Animated>
                                </GridItem>
                            </GridContainer>

                        </GridContainer>
                    </CardBody>
                </Card>
                    : <PageContentLoader />}

                    {this.state.loader ?
                    <GridContainer xl={12}>
                        {this.state.searchTableSec && !this.state.tableFlag ?
                                                    <GridItem lg={12}>
                                                        <ReactTable
                                                            title= <TranslationContainer translationKey={"ProductDetails"} />
                                                            data={this.state.policyDetailsData}
                                                            filterable

                                                            columns={[
                                                                {

                                                                    Header: "SNo",
                                                                    accessor: "SNo",
                                                                    headerClassName: 'react-table-center',
                                                                    //minWidth: 40,
                                                                    resizable: false,
                                                                },
                                                                {
                                                                    Header: "PartnerName",
                                                                    accessor: "PartnerName",
                                                                    style: { textAlign: "center" },
                                                                    headerClassName: 'react-table-center',
                                                                    //minWidth: 40,
                                                                    resizable: false,
                                                                },
                                                                {
                                                                    Header: "ProductName",
                                                                    accessor: "ProductName",
                                                                    headerClassName: 'react-table-center',
                                                                    //minWidth: 40,
                                                                    resizable: false,
                                                                },
                                                                {
                                                                    Header: "PolicyCount",
                                                                    accessor: "PolicyCount",
                                                                    //style: { textAlign: "center" },
                                                                    headerClassName: 'react-table-center',
                                                                    //minWidth: 30,
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


                    {this.state.loader ?
                    <GridContainer xl={12}>
                        {this.state.searchTableSec && this.state.tableFlag ?
                                                    <GridItem lg={12}>
                                                        <ReactTable
                                                            title= <TranslationContainer translationKey={"ProductDetails"} />
                                                            data={this.state.policyDetailsData}
                                                            filterable

                                                            columns={[
                                                                {

                                                                    Header: "SNo",
                                                                    accessor: "SNo",
                                                                    headerClassName: 'react-table-center',
                                                                    //minWidth: 40,
                                                                    resizable: false,
                                                                },
                                                                {
                                                                    Header: "ProductName",
                                                                    accessor: "ProductName",
                                                                    headerClassName: 'react-table-center',
                                                                    //minWidth: 40,
                                                                    resizable: false,
                                                                },
                                                                {
                                                                    Header: "PolicyCount",
                                                                    accessor: "PolicyCount",
                                                                    //style: { textAlign: "center" },
                                                                    headerClassName: 'react-table-center',
                                                                    //minWidth: 30,
                                                                    resizable: false,
                                                                },
                                                                //{

                                                                //    Header: "Policy Type Id",
                                                                //    accessor: "PolicyTypeId",
                                                                //    style: { textAlign: "center" },
                                                                //    headerClassName: 'react-table-center',
                                                                //    //minWidth: 30,
                                                                //    resizable: false,
                                                                //},
                                                                //{

                                                                //    Header: "Policy Status",
                                                                //    accessor: "PolicyStatus",
                                                                //    style: { textAlign: "right" },
                                                                //    headerClassName: 'react-table-center',
                                                                //    //minWidth: 40,
                                                                //    resizable: false,
                                                                //},

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
export default withStyles(style)(ProductDashboard);