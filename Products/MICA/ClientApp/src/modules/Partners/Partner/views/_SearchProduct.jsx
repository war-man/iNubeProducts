import React from "react";
//import FilterNone from "@material-ui/icons/FilterNone";

// @material-ui/core components

//import InputLabel from "@material-ui/core/InputLabel";
//import FormControl from "@material-ui/core/FormControl";
//import Datetime from "react-datetime";
import Dropdown from "components/Dropdown/Dropdown.jsx";
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
//import AddProduct from "modules/Partners/Partner/views/_AddProduct.jsx";
import Button from "components/CustomButtons/Button.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import searchproduct from "assets/img/search-product.png";
import Icon from "@material-ui/core/Icon";
import $ from 'jquery';
import {Animated} from "react-animated-css";
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

const SearchProduct = (props) => {
    //const { classes } = props;
    //const entryFlag = props.entryFlag;
    //const searchData = props.componentData;
    console.log('props', props.productSearchDTO);
    //entryFlag: false;
    //$("#searchProduct").on('click', function () {
    //    document.getElementById('searchProductSec').style.display = "block";
    //});

    return (
        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
        <Card>
            <CardHeader color="rose" icon>
                <CardIcon color="rose">
                    { /*  <FilterNone /> */}

                    <Icon><img id="icon" src={searchproduct} /></Icon>

                </CardIcon>
                {
                    <h4 className={props.cardIconTitle}>
                            <small> <TranslationContainer translationKey="SearchProduct" /> </small>
                    </h4>
                }
                {/*  <Button color="success" id="searchProduct" round style={okBtn} onClick={props.handleOpen} >Search Assign Products</Button> */}
            </CardHeader>

            <CardBody>
                <GridItem xs={12} sm={12} md={3}>
                
                    <GridContainer justify="center">
                       
                            <label>
                                {props.cpartner ?
                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                    <div className="banner">
                                            <label><TranslationContainer translationKey="PartnerName" /></label> 
                                        <h5> : {props.partname}</h5>
                                    </div>
                                    </Animated>
                                    : null}
                                    
                            </label>
                        
                    </GridContainer>
                    
                </GridItem>
                <GridItem>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={3}>
                                    <label>
                                    {props.displaypart ?
                                     <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                        <div className="banner">
                                                <label><TranslationContainer translationKey="PartnerName" />   </label> 
                                            <h5> : {props.partnername}</h5>
                                        </div>
                                        </Animated>
                                    : null}
                                    </label>
                                </GridItem>
                    </GridContainer>
                </GridItem>
                <GridItem>
                <GridContainer className="search-Product">
                        {/*<h5 className="seach-title"></h5>*/}
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="ProductCode"
                                        id="productcode"
                                        // modelbind={model('productsearchmodel.productCode')}
                                        name='productCode'
                                        onChange={(e) => props.SetValue("productCode", e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>

                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="ProductName"
                                        id="productname"
                                        // modelbind={model('productsearchmodel.productName')}
                                        // value={this.state.productsearchModel.ps.ProductName}
                                        name='productName'
                                        onChange={(e) => props.SetValue("productName", e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>


                                <GridItem xs={12} sm={12} md={3}>
                                    <Dropdown labelText="LineOfBusiness" id="ProductDTO.lobid" lstObject={props.MasterDTO.LOB} name='lobid' value={props.productSearchDTO.lobid} onChange={(e) => props.GetMasterData('COB', 'productSearchDTO', e)} formControlProps={{ fullWidth: true }} />

                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <Dropdown labelText="ClassOfBusiness" id="ProductDTO.cobid" lstObject={props.MasterDTO.COB} name='cobid' value={props.productSearchDTO.cobid} onChange={(e) => props.GetMasterData('', 'productSearchDTO', e)} formControlProps={{ fullWidth: true }} />

                                </GridItem>

                            </GridContainer>
                            <GridContainer  justify="center" >
                                        <GridItem xs={5} sm={3} md={3} lg={1}>
                                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                        <Button color="warning" round onClick={props.handleSearch}  ><TranslationContainer translationKey="Search" /> </Button>
                        </Animated>
                                </GridItem>
                    </GridContainer>
                    </GridContainer>
                    </GridItem>
             </CardBody>
             </Card>
             </Animated>
             
           //{this.props.entryFlag ? <AddProduct /> : null}
    );
}
export default withStyles(style)(SearchProduct);