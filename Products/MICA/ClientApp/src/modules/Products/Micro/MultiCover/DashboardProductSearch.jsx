import React from "react";
import FilterNone from "@material-ui/icons/FilterNone";

// @material-ui/core components
import InputLabel from "@material-ui/core/InputLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import Datetime from "react-datetime";

import productConfig from 'modules/Products/Micro/ProductConfig.js';
import ProductConfig from './ProductConfig.jsx';

// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import $ from 'jquery';
import Button from "components/CustomButtons/Button.jsx";
import bindModel from 'components/ModelBinding/bindModel.js';
import Modal from '@material-ui/core/Modal';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import searchproduct from "assets/img/search-product.png";
import Icon from "@material-ui/core/Icon";
import ReactTable from "react-table";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import { Animated } from "react-animated-css";
import swal from 'sweetalert';
import product from "assets/img/product.png";
const tableClassRow = {
    color: "red"
}
const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: "#086b77",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,

    },
}))(TableCell);


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
const newStyle = {
    maxWidth: "80%",
    marginLeft: "12%",
    overflow: "auto"
}
const okBtn = {
    marginLeft: "330px",
    marginTop: "20px",
    height: "25px",
    textAlign: "center",
    width: "30px",
    padding: "1px"
}

const modalStyles = {
    position: 'absolute',
    top: '25%',
    left: '25%',
    transform: 'translate(-25 %, -25%)',
    backgroundColor: 'white',
    width: '70%',
    height: '50%',
    borderRadius: '8px',
    paddingBottom: '5px'
    //  boxShadow: theme.shadows[5],
};

const modalSearch = {
    margin: "0px auto",
    height: "25px",
    textAlign: "center",
    width: "65px",
    padding: "1px"
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
const searchBtn = {
    left: "140%",

}

const dateStyle = {
    width: "max-content",
    marginLeft: "245px",
    marginTop: "-25px",
    backgroundColor: "transparent",
    border: "none",
    zoom: "1.15"
}
const subHeading = { color: '#407ba4', marginLeft: '10px', display: 'none' }

class DashBoardProductSearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
     
            MasterDTO: {
                btnhide: false,
                LOB: [],
                COB: [],
                Cover: [],
                CoverEvent: [],
                CoverEventFactor: [],
                CoverEventFactorValue: [],
                InsuranceType: [],
                Risk: [],
                Claim: [],
                channel: [],
                BenefitCriteria: []
            },
            
            simpleSelect: "",
            desgin: false,
            code: false,
            develop: false,
            topics: [],
            topicId: 0,
            topicMessage: "",
            lob: "",
            productStatus: "",
            dflag: false,
            masterList: [],
            display: false,
            productList: [],
            ddlLobId: "",
            sendproductid: "",
            productsearchmodel: {
                "productCode": "",
                "productName": "",
                "lineoOfBusiness": "",
                "classOfBusiness": "",
                "activeFrom": "",
                "activeTo": "",
                "cover": 0,
                "coverEvent": 0,
                "benefitCriteria": 0
            },
            productSearchDTO: {
                "productId": 0,
                "lobid": "",
                "cobid": "",
                "productStatusId": 0,
                "productName": "",
                "productCode": "",
                "activeFrom": null,
                "activeTo": null,
                "premiumAmount": 0,
                "createdBy": null,
                "createdDate": null,
                "modifyBy": null,
                "modifyDate": null

            },
            productsearchResponsemodel: {},
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleSimple = this.handleSimple.bind(this);
        this.handleChange = this.handleChange.bind(this);


    }

    handleopen = () => {
        if (this.state.sendproductid !== "") {
            this.setState({ open: true });
        }
    }
    handleClick = () => {


        fetch(`${productConfig.productConfigUrl}/api/Product/SearchProduct`, {
            method: 'POST',
            body: JSON.stringify(this.state.productSearchDTO),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        })
            .then(response => response.json())
            .then(data => {


                this.setState({ topics: data })

                console.log("data save result:", data);
                console.log("topics", this.state.topics);

            });

    };
    handleClose = () => {
        this.setState({ open: false });

    };

    showProductTable = () => {

        fetch(`${productConfig.productConfigUrl}/api/Product/SearchProduct`, {
            method: 'POST',
            body: JSON.stringify(this.state.productSearchDTO),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        })
            .then(response => response.json())
            .then(data => {
                let display = this.state.display;


                if (data.length > 0) {
                    this.setState({ display: true });
                    this.setState({ topics: data })
                    this.dataTable(data);
                    console.log("data save result:", data);
                    console.log("topics", this.state.topics);
                } else {
                    swal("", "No records found", "error");
                    this.setState({ display: false });
                }
            });

    }
    SetValue = (type, event) => {
        let dasboardDTO = this.state.productSearchDTO;
        let name = event.target.name;
        let value = event.target.value;
        dasboardDTO[name] = value;

        this.setState({ dasboardDTO })
        console.log("this.state.productSearchDTO", this.state.productSearchDTO);
        this.state.sendproductid = "";
    };
    GetMasterData = (type, addType, event) => {
        console.log('GetMasterData: ', type, addType, event)
        this.SetValue(type, event);
        let reg = this.state[addType];
        let name = event.target.name;
        let value = event.target.value;
        reg[name] = value;

        this.setState({ reg });
        // console.log("lobid", this.state.dasboardDTO.lobid);
        this.GetMasterService(type, event.target.value);


    };

    handleSimple = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };
    componentDidMount() {
     
        console.log("Type", this.state.animatedType)
        fetch(`https://inubeservicesproductconfiguration.azurewebsites.net/api/Product/GetMasterData?sMasterlist=das`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ masterList: data });

                console.log('Master Data', this.state.masterList);
            });

        this.GetMasterService('LOB', 0);

    };


    GetMasterService = (type, pID) => {
        // fetch(`https://localhost:44347/api/Product/GetProductMaster?masterType=` + type + `&parentID=` + pID,{
        fetch(`https://inubeservicesproductconfiguration.azurewebsites.net/api/Product/GetProductMaster?masterType=` + type + `&parentID=` + pID, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                const lData = data;
                let locDTO = this.state.MasterDTO;
                locDTO[type] = lData;
                this.setState({ locDTO });
                console.log("mIsRequired", data);
            })
    };

    editFunction(id, pid) {
        //console.log("pid", pid);
        //  console.log("topics data", this.state.topics);
        var pArr = this.state.topics
        var ProductArr = [];
        $.each(pArr, function (k, v) {
            if (v.productId == pid) {
                ProductArr.push(pArr[id]);
            }
        })
        console.log("ProductArr", ProductArr);
        const Productdataid = ProductArr[0].productId;
        console.log("Productdataid: ", Productdataid);
        this.setState({ sendproductid: Productdataid });
        // this.setState({ sendproductlist: ProductArr });

    }

    dataTable = (productlist) => {
        console.log("productlist in react", productlist);
        this.setState({
            data: productlist.map((prop, key) => {
                console.log("coming");
                const { classes } = this.props;
                console.log("prop data", prop);
                console.log("send data", key);
                return {
                    id: key,
                    productCode: prop.productCode,
                    productName: prop.productName,
                    lobid: prop.lob,
                    cobid: prop.cob,
                    activeFrom: new Date(prop.activeFrom).toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', }),
                    activeTo: new Date(prop.activeTo).toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', }),
                    premiumAmount: prop.premiumAmount,
                    radio: < input type="radio" name="product" onClick={this.editFunction.bind(this, key, prop.productId)} />
                };

            })
        });





    }

    render() {
        const { classes } = this.props;
        const { model } = bindModel(this);
        return (

            <GridContainer lg={12} xs={12}>
                <GridItem xs={12} lg={12}>
                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                        <Card>
                                                           <CardHeader color="danger" icon>

                                    <CardIcon color="danger">

                                        <Icon> <img id="icon" src={product} className={classes.cardIcons} /></Icon>

                                    </CardIcon>

                                    <h4 className={classes.cardIconTitle}>

                                        Product Search
           
                </h4>

                                </CardHeader>
                           
                            <Animated animationIn="fadeInUp" animationOut="fadeOut" isVisible={true}>
                                <CardBody>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={3}>
                                            <CustomInput
                                                labelText="Product Code"
                                                id="productcode"
                                                // modelbind={model('productsearchmodel.productCode')}
                                                name='productCode'
                                                onChange={(e) => this.SetValue("productCode", e)}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}>
                                            <CustomInput
                                                labelText="Product Name"
                                                id="productname"
                                                // modelbind={model('productsearchmodel.productName')}
                                                // value={this.state.productsearchModel.ps.ProductName}
                                                name='productName'
                                                onChange={(e) => this.SetValue("productName", e)}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                            />
                                        </GridItem>


                                        <GridItem xs={12} sm={12} md={3}>
                                            <Dropdown labelText="Line Of Business" id="ProductDTO.lobid" lstObject={this.state.MasterDTO.LOB} name='lobid' value={this.state.productSearchDTO.lobid} onChange={(e) => this.GetMasterData('COB', 'productSearchDTO', e)} formControlProps={{ fullWidth: true }} />

                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}>
                                            <Dropdown labelText="Class Of Business" id="ProductDTO.cobid" lstObject={this.state.MasterDTO.COB} name='cobid' value={this.state.productSearchDTO.cobid} onChange={(e) => this.GetMasterData('', 'productSearchDTO', e)} formControlProps={{ fullWidth: true }} />

                                        </GridItem>




                                    </GridContainer>

                                    {/*
                                <Modal
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                    open={this.state.open}
                                    onClose={this.handleClose}
                                >
                                    <div className={classes.paper} style={modalStyles}>
                                        <h4 className="search-heading">Product Search <Button color="info" className={classes.marginRight} style={searchClose} onClick={this.handleClose}>
                                            &times;
                                </Button>
                                            </h4>
                                        <GridContainer>
                                            <GridItem xs={12} sm={4}>
                                                <FormControl fullWidth className={classes.selectFormControl}>
                                                    <InputLabel
                                                        htmlFor="simple-select"
                                                        className={classes.selectLabel}
                                                    >
                                                        Partner ID
                                    </InputLabel>
                                                    <Select
                                                        MenuProps={{
                                                            className: classes.selectMenu
                                                        }}
                                                        classes={{
                                                            select: classes.select
                                                        }}
                                                        value={this.state.simpleSelect}
                                                        onChange={this.handleSimple}
                                                        inputProps={{
                                                            name: "simpleSelect",
                                                            id: "simple-select"
                                                        }}
                                                    >
                                                        <MenuItem
                                                            disabled
                                                            classes={{
                                                                root: classes.selectMenuItem
                                                            }}
                                                        >
                                                            Select
                                     </MenuItem>
                                                        <MenuItem
                                                            classes={{
                                                                root: classes.selectMenuItem,
                                                                selected: classes.selectMenuItemSelected
                                                            }}
                                                            value="1"
                                                        >
                                                            Option 1
                                      </MenuItem>
                                                        <MenuItem
                                                            classes={{
                                                                root: classes.selectMenuItem,
                                                                selected: classes.selectMenuItemSelected
                                                            }}
                                                            value="2"
                                                        >
                                                            Option 2
                                     </MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </GridItem>
                                            <Button color="info" round className={classes.marginRight} style={searchBtn} onClick={this.showProductTable}>
                                                Search
                                             </Button>
                                            <GridContainer>
                                                <div id="searchTableSec" style={{ display: 'none' }}>
                                                    <br />
                                                    <Paper className={classes.root} style={{ marginLeft: '70px', marginRight: '70px' }} >
                                                      
                                                        <table className="createTableClass table-striped " style={{ borderRadius: '6px  ', width: '100%', margin: '0 auto' }} id="searchTable">
                                                            <thead className="tableClassRow" style={{ height: '10px' }}>
                                                                <tr className="tableClassRow">
                                                                    <th className="tableClassRow" ><h7><b>PRODUCT CODE</b></h7></th>
                                                                    <th className="tableClassRow" ><h7><b>PRODUCT NAME</b></h7></th>
                                                                    <th className="tableClassRow" ><h7><b>LINE OF BUSINESS</b></h7></th>
                                                                    <th className="tableClassRow" ><h7><b>CLASS OF BUSINESS</b></h7></th>
                                                                    <th className="tableClassRow" ><h7><b>ACTIVE FROM</b></h7></th>
                                                                    <th className="tableClassRow" ><h7><b>ACTIVE TO</b></h7></th>
                                                                    <th className="tableClassRow" ><h7><b>COVER</b></h7></th>
                                                                    <th className="tableClassRow" ><h7><b>COVER EVENT</b></h7></th>
                                                                    <th className="tableClassRow" ><h7><b>BENEFIT CRITERIA</b></h7></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {console.log(this.state.topics)}
                                                                {this.state.topics.map((topic, index) =>
                                                                    <tr className="tableClassRow" key={index}>

                                                                        <td><h6><b>{topic.productCode}</b></h6></td>
                                                                        <td><h6><b>{topic.productName}</b></h6></td>
                                                                        <td><h6><b>{topic.lineoOfBusiness}</b></h6></td>
                                                                        <td><h6><b>{topic.classOfBusiness}</b></h6></td>
                                                                        <td><h6><b>{topic.activeFrom}</b></h6></td>
                                                                        <td><h6><b>{topic.activeTo}</b></h6></td>
                                                                        <td><h6><b>{topic.cover}</b></h6></td>
                                                                        <td><h6><b>{topic.coverEvent}</b></h6></td>
                                                                        <td><h6><b>{topic.benefitCriteria}</b></h6></td>

                                                                    </tr>

                                                                )}
                                                            </tbody>
                                                        </table>

                                                    </Paper>
                                                    <Button color="info" round className={classes.marginRight} style={okBtn} onClick={this.handleClose}>
                                                        OK
                                    </Button>
                                                </div>

                                            </GridContainer>
                                        </GridContainer>
                                    </div>
                                </Modal>
          

 */}
                                    <GridContainer>

                                        <h4 style={subHeading} id="subHead">Product Details</h4>
                                        <GridContainer lg={12} justify="center">
                                            <GridItem xs={5} sm={2} md={3} lg={1} >
                                                <Animated animationIn={this.state.animatedType} animationOut="fadeOut" isVisible={true}>
                                                    <Button color="info" round onClick={this.showProductTable}>
                                                        Search
                                        </Button>
                                                </Animated>
                                            </GridItem>
                                        </GridContainer>


                                    </GridContainer>



                                    {this.state.display &&
                                        <GridContainer>

                                            <GridItem xs={12}>

                                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                    <CardBody className="product-search-tab">
                                                        <ReactTable
                                                            data={this.state.data}
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
                                                                    Header: "Product Code",
                                                                    accessor: "productCode",
                                                                    minWidth: 30,
                                                                    style: { textAlign: "center" },
                                                                    headerClassName: 'react-table-center',
                                                                    resizable: false,

                                                                },
                                                                {
                                                                    Header: "Product Name",
                                                                    accessor: "productName",
                                                                    minWidth: 30,
                                                                    style: { textAlign: "center" },
                                                                    headerClassName: 'react-table-center',
                                                                    resizable: false,

                                                                },
                                                                {
                                                                    Header: "Line of Business",
                                                                    accessor: "lobid",
                                                                    minWidth: 30,
                                                                    style: { textAlign: "center" },
                                                                    headerClassName: 'react-table-center',
                                                                    resizable: false,
                                                                },
                                                                {
                                                                    Header: "Class of Business",
                                                                    accessor: "cobid",
                                                                    minWidth: 30,
                                                                    style: { textAlign: "center" },
                                                                    headerClassName: 'react-table-center',
                                                                    resizable: false,
                                                                },
                                                                {
                                                                    Header: "Active From",
                                                                    accessor: "activeFrom",
                                                                    minWidth: 30,
                                                                    style: { textAlign: "center" },
                                                                    headerClassName: 'react-table-center',
                                                                    resizable: false,
                                                                },
                                                                {
                                                                    Header: "Active To",
                                                                    accessor: "activeTo",
                                                                    minWidth: 30,
                                                                    style: { textAlign: "center" },
                                                                    headerClassName: 'react-table-center',
                                                                    resizable: false,
                                                                },

                                                                //{
                                                                //    Header: "SPOC-EMAILID",
                                                                //    accessor: "spocemailId",
                                                                //    // Width: "20px"
                                                                //},
                                                                //{
                                                                //    Header: "OFFICE ADDRESS",
                                                                //    accessor: "officeAddressLine1",
                                                                //    // maxWidth: "20px"
                                                                //},
                                                                //{
                                                                //    Header: "",
                                                                //    accessor: "radio",
                                                                //    sortable: false,
                                                                //    filterable: false
                                                                //},
                                                            ]}
                                                            defaultPageSize={5}
                                                            showPaginationTop={false}
                                                            showPaginationBottom
                                                            className="-striped -highlight"
                                                        />
                                                    </CardBody>
                                                </Animated>
                                            </GridItem>







                                            <Paper className={classes.root} style={{ marginLeft: '70px', marginRight: '70px', marginTop: ' 49px' }} >
                                                {/*              <Table className="createTableClass table-striped " style={{ borderRadius: '6px  ', width: '100%', margin: '0 auto' }} id="paymentTable">
                                                <TableHead className="tableClassRow" style={tableClassRow}>
                                                    <TableRow className="tableClassRow">
                                                    <CustomTableCell className="tableClassRow"><h7><b>PRODUCT CODE</b></h7></CustomTableCell>
                                                    <CustomTableCell className="tableClassRow"><h7><b>PRODUCT NAME</b></h7></CustomTableCell>
                                                    <CustomTableCell className="tableClassRow"><h7><b>LINE OF BUSINESS</b></h7></CustomTableCell>
                                                   <CustomTableCell className="tableClassRow"><h7><b>CLASS OF BUSINESS</b></h7></CustomTableCell>
                                                    <CustomTableCell className="tableClassRow"><h7><b>ACTIVE FROM</b></h7></CustomTableCell>
                                                      <CustomTableCell className="tableClassRow"><h7><b>ACTIVE TO</b></h7></CustomTableCell>
                                                      <CustomTableCell className="tableClassRow"><h7><b>COVER</b></h7></CustomTableCell>
                                                    <CustomTableCell className="tableClassRow"><h7><b>COVER EVENT</b></h7></CustomTableCell>
                                                   
                                                    <CustomTableCell className="tableClassRow"><h7><b>Select</b></h7></CustomTableCell>

                                                    </TableRow>
                                                </TableHead>
                                            {this.state.topics.map((topic, index) =>
                                                    <TableRow className="tableClassRow" key={index}>

                                                    <CustomTableCell><h6><b>{topic.productCode}</b></h6></CustomTableCell>
                                                  
                                                    <CustomTableCell><h6><b>{topic.productName}</b></h6></CustomTableCell>
                                                    <CustomTableCell><h6><b>{topic.lineoOfBusiness}</b></h6></CustomTableCell>
                                                    <CustomTableCell><h6><b>{topic.classOfBusiness}</b></h6></CustomTableCell>

                                                    <CustomTableCell><h6><b>{topic.activeFrom}</b></h6></CustomTableCell>
                                                <CustomTableCell><h6><b>{topic.activeTo}</b></h6></CustomTableCell>
                                                   <CustomTableCell><h6><b>{topic.cover}</b></h6></CustomTableCell>
                                                    <CustomTableCell><h6><b>{topic.coverEvent}</b></h6></CustomTableCell>
                                                
                                                    <CustomTableCell><h6><b> <input type="radio" name="product" onClick={this.editFunction.bind(this, index, topic.productId)} /></b></h6></CustomTableCell>
                                                  




                                                    </TableRow>

                                                )}
                                            </Table> */}
                                            </Paper>

                                            <GridItem xs={6} sm={6} md={3}>

                                                <Button color="info" round className={classes.marginRight} style={searchBtn} onClick={this.handleopen}  >
                                                    VIEW
                                        </Button>
                                            </GridItem>
                                            {/*  <GridItem xs={6} sm={6} md={3}>

                                        <Button color="info" round className={classes.marginRight} style={searchBtn} onClick={this.handleopen}  >
                                            VIEW
                                        </Button>
                                    </GridItem>
                                    <GridItem xs={6} sm={6} md={3}>

                                        <Button color="info" round className={classes.marginRight} style={searchBtn} onClick={this.handleopen} >
                                            EDIT
                                        </Button>
                                    </GridItem> */}
                                        </GridContainer>


                                    }
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


                                            <ProductConfig sendproductid={this.state.sendproductid} btnhide={this.state.btnhide} />
                                        </div>
                                    </Modal>

                                </CardBody>
                            </Animated>
                        </Card>
                    </Animated>
                </GridItem>

            </GridContainer>



        );
    }
}
export default withStyles(style)(DashBoardProductSearch);