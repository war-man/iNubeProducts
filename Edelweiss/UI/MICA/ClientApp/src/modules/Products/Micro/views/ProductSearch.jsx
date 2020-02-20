import React from "react";
import FilterNone from "@material-ui/icons/FilterNone";

// @material-ui/core components
import InputLabel from "@material-ui/core/InputLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import Datetime from "react-datetime";
import productConfig from 'modules/Products/Micro/ProductConfig.js';
import SingleProductConfig from './ProductConfig.jsx';
import MultiProductConfig from '../MultiCover/ProductConfig.jsx';
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
import IconButton from '@material-ui/core/IconButton';
import CloudUpload from "@material-ui/icons/CloudUpload";
import Visibility from "@material-ui/icons/Visibility";
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
//import ReactTable from "react-table";
import ReactTable from 'components/MuiTable/MuiTable.jsx';
import Dropdown from "components/Dropdown/Dropdown.jsx";
import { Animated } from "react-animated-css";
import swal from 'sweetalert';
import TableContentLoader from "components/Loaders/TableContentLoader.jsx";
import PageContentLoader from "components/Loaders/PageContentLoader.jsx";
import data_Not_found from "assets/img/data-not-found-new.png";

import UserExcelUpload from "./UserExcelUpload.jsx";
import Docupload from "modules/Products/Micro/views/Docupload.jsx";
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
    left: "120%",
}
const paddingCard =
{
    padding: "10px",
}

const uploadBtn = {
    left: "48%",
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

class ProductSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ExcelName:"",
            isButtonVisibility: false,
            Type: false,
            pageloader: false,
            nodata: false,
            loader: true,
            MasterDTO: {
                isSingleCover: true,
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
            animatedType: "fadeIn",
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
            openupload: false,
            openpromoupload: false,
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
                "modifyDate": null,
                "partnerId": 0,
            },
            productsearchResponsemodel: {},
            visible: false,
            productid: "",
            productcode: "",
            productname: "",
            display: false,
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleSimple = this.handleSimple.bind(this);
        this.handleChange = this.handleChange.bind(this);

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

    handleuploadClose = () => {
        this.setState({ openupload: false });
    };

    handlePromouploadClose = () => {
        this.setState({ openpromoupload: false });
    };

    showProductTable = () => {

        let search = this.state.productSearchDTO;
        if (localStorage.getItem('partnerid') != "null") {
            search['partnerId'] = localStorage.getItem('partnerid');
        }
        this.setState({ search,loader:false });
        fetch(`${productConfig.productConfigUrl}/api/Product/SearchProduct`, {
            method: 'POST',
            body: JSON.stringify(search),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        })
            .then(response => response.json())
            .then(data => {
                //let display = this.state.display;
                this.setState({ display: false});
                if (data.length > 0) {
                    //
                    this.setState({ topics: data })
                    this.dataTable(data);
                    console.log("data save result:", data);
                    console.log("topics", this.state.topics);
                } else {
                    setTimeout(
                        function () {
                            this.setState({ loader: true, display: false, nodata: true });
                        }.bind(this), 2000
                    );
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
    handleExcelUpload = () => {
        
        this.setState({ ExcelName:"PromoCode", openpromoupload:true});

    }
    componentDidMount() {

        if (localStorage.getItem('partnerid') > 0) {
            this.setState({ display: true });
        }

        setTimeout(
            function () {
                this.setState({ pageloader: true });
            }.bind(this), 2000
        );

        console.log("Type", this.props)
        if (this.props.Type == true) {
            this.state.Type = true;
            //  this.state.animatedType = "fadeInUp";
            //this.setState({ animatedType: "fadeInUp" });
        }
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
                if (data.length > 0) {
                    //setTimeout(
                    //    function () {
                    //        this.setState({ pageloader: true });
                    //    }
                    //        .bind(this),
                    //    2000
                    //);
                    this.setState({ isButtonVisibility: true });

                }
            })
    };

    editFunction(id, pid, type) {
      
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
        const productName = ProductArr[0].productName;
        const productCode = ProductArr[0].productCode
        this.state.isSingleCover = ProductArr[0].isSingleCover;
        this.setState({ isSingleCover: ProductArr[0].isSingleCover })
        console.log("Productdataid: ", Productdataid);

        this.setState({ sendproductid: Productdataid, productid: Productdataid, productname: productName, productcode: productCode });
        // this.setState({ sendproductlist: ProductArr });
        if (this.state.sendproductid == 613) {
            this.setState({ visible: true });
        }
        if (type == "view") {
            this.setState({ open: true });

        } else if (type == "upload") {
            this.setState({ openupload: true, ExcelName: "User" });

        } else if (type == "PromoCodeupload") {
            this.setState({ openupload: true, ExcelName: "PromoCode" })
        }
      
    }

    searchagain = () => {
        this.setState({ nodata: false });
        window.scrollTo(0, 0);
    }

    dataTable = (productlist) => {
        console.log("productlist in react", productlist);
        this.setState({ display: true, loader: true });
        this.setState({
            data: productlist.map((prop, key) => {
                console.log("coming");
                const { classes } = this.props;
                console.log("prop data", prop);
                console.log("send data", key, prop.activeFrom);
                return {
                    id: key,
                    productCode: prop.productCode,
                    productName: prop.productName,
                    lob: prop.loB1,
                    cob: prop.coB1,
                    activeFrom: new Date(prop.activeFrom).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', }),
                    activeTo: new Date(prop.activeTo).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', }),
                    premiumAmount: prop.premiumAmount,
                   // Select: < input type="radio" name="product" onClick={this.editFunction.bind(this, key, prop.productId)} />
                   Action:<div> <IconButton color="info" justIcon round simple className="view" name="view" onClick={this.editFunction.bind(this, key, prop.productId,"view")}><Visibility /></IconButton>
                                <IconButton color="info" justIcon round simple className="Upload" name="upload" onClick={this.editFunction.bind(this,key,prop.productId,"upload")}><CloudUpload /></IconButton>
                       {/*  <IconButton color="info" justIcon round simple className="Upload" name="upload" onClick={this.editFunction.bind(this, key, prop.productId, "PromoCodeupload")}><CloudUpload /></IconButton>*/}
                
                </div>
                };
            })
        });
    }
  
    render() {
        const { classes } = this.props;
        const { model } = bindModel(this);
        return (
            <div>
                {
                    this.state.pageloader ?
                     
                                <Card>
                                    {(this.state.Type == false) ? <CardHeader color="rose" icon>
                                        <CardIcon color="rose">
                                            { /*  <FilterNone /> */}

                                            <Icon><img id="icon" src={searchproduct} /></Icon>

                                        </CardIcon>
                                        <h4 className={this.props.cardIconTitle}>
                                            <small> Product Search </small>
                                        </h4>
                                    </CardHeader>
                                        :
                                        <CardHeader color="danger" icon>

                                            <CardIcon color="danger">

                                                <Icon> <img id="icon" src={product} className={classes.cardIcons} /></Icon>

                                            </CardIcon>

                                            <h4 className={classes.cardIconTitle}>

                                                Product Search
        
                </h4>

                                        </CardHeader>
                                    }
                                    <Animated animationIn={(this.state.Type === false) ? "fadeIn" : "fadeInUp"} animationOut="fadeOut" isVisible={true}>
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

                                                    {(this.state.isSingleCover) ? <MultiProductConfig sendproductid={this.state.sendproductid} btnhide={this.state.btnhide} /> : <SingleProductConfig sendproductid={this.state.sendproductid} visible={this.state.visible} btnhide={this.state.btnhide} />}

                                                </div>
                                            </Modal>

                                        </CardBody>
                                    </Animated>
                                </Card>
                           :
                           <PageContentLoader />}
                            {this.state.loader ?
                                <GridContainer xl={12}>
                             
                                    {this.state.display ?
                                        <GridItem xs={12}>
                                            <ReactTable
                                            title="Product Search"
                                                data={this.state.data}
                                                filterable
                                                columns={[
                                                    
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
                                                        accessor: "lob",
                                                        minWidth: 30,
                                                        style: { textAlign: "center" },
                                                        headerClassName: 'react-table-center',
                                                        resizable: false,
                                                    },
                                                    {
                                                        Header: "Class of Business",
                                                        accessor: "cob",
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
                                                    {
                                                        Header: "Action",
                                                        accessor: "Action",
                                                        minWidth: 20,
                                                        style: { textAlign: "center" },
                                                        headerClassName: 'react-table-center',
                                                        sortable: false,
                                                        filterable: false,
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



                                            <Modal
                                            aria-labelledby="simple-modal-title"
                                            aria-describedby="simple-modal-description"
                                            open={this.state.openupload}
                                            onClose={this.handleuploadClose}
            
                                        >
                                            <div className={classes.paper} id="modal">
            
            
                                                <Button color="info"
                                                    round
                                                    className={classes.marginRight}
                                                    style={searchClose}
                                                    onClick={this.handleuploadClose}>
                                                    &times;
                                                                    </Button>
                                        <UserExcelUpload productid={this.state.productid} productcode={this.state.productcode} productname={this.state.productname} ExcelName={this.state.ExcelName}/>
                                            </div>
                                        </Modal>
            
                                <Modal
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                    open={this.state.openpromoupload}
                                    onClose={this.handlePromouploadClose}

                                >
                                    <div className={classes.paper} id="modal">


                                        <Button color="info"
                                            round
                                            className={classes.marginRight}
                                            style={searchClose}
                                            onClick={this.handlePromouploadClose}>
                                            &times;
                                                                    </Button>
                                        <Docupload productid={this.state.productid} productcode={this.state.productcode} productname={this.state.productname} />
                                    </div>
                                </Modal>
                              
                                        </GridItem>
                                        :
                                        <GridItem lg={12}>{
                                            this.state.nodata ?
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
                                                : null
                                        }
                                        </GridItem>
                                    }

                                 
                                </GridContainer>
                                :

                                <Card style={paddingCard}>
                                    <TableContentLoader />
                                </Card>
                            }
                            
                        
            </div>

        );
    }
}
export default withStyles(style)(ProductSearch);
