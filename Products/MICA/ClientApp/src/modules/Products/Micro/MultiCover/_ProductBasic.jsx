import React from "react";
import FilterNone from "@material-ui/icons/FilterNone";

// @material-ui/core components

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Datetime from "react-datetime";
import CustomCheckbox from "components/Checkbox/CustomCheckbox";
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
import bindModel from 'components/ModelBinding/bindModel.js';
import Dropdown from "components/Dropdown/Dropdown.jsx";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import ProductConfigIcon from "assets/img/pro-config.png";
import Icon from "@material-ui/core/Icon";
import { Animated } from "react-animated-css";
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

const dateStyle = {
    width: "max-content",
    marginLeft: "245px",
    marginTop: "-25px",
    backgroundColor: "transparent",
    border: "none",
    zoom: "1.15"
}

const ProductBasic = (props) => {

    console.log("hello mr", props);
    return (

        <div>

            <Card>
                <CardHeader color="rose" icon>
                    <CardIcon color="rose">
                        {/*  <FilterNone /> */}
                        <Icon><img id="icon" src={ProductConfigIcon} /></Icon>
                    </CardIcon>
                    {
                        <h4 className={props.cardIconTitle}>
                            <small> Product Basic Features </small>
                        </h4>
                    }
                </CardHeader>
                <CardBody>
                    <GridContainer>


                        <GridItem xs={12} sm={12} md={4}>

                            <CustomInput
                                disabled={props.viewdisable}
                                success={props.productCodeState === "success"}
                                error={props.productCodeState === "error"}
                                labelText="Product Code"
                                value={props.ProductDTO.productCode}
                                required={true}
                                name="productCode"

                                onChange={(event) => props.SetValue("string", event)}
                                id="productcode"
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            {props.errormessage && (props.ProductDTO.productCode == "") ? <p className="error">This Field is Required</p> : null}
                            {props.message && <p className="error">{props.servermessage}</p>}
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                disabled={props.viewdisable}
                                success={props.productNameState === "success"}
                                error={props.productNameState === "error"}
                                labelText="Product Name"
                                required={true}
                                value={props.ProductDTO.productName}
                                name="productName"
                                // onChange={props.SetValue}
                                onChange={(event) => props.SetValue("string", event)}
                                id="productname"
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            {props.errormessage && (props.ProductDTO.productName == "") ? <p className="error">This Field is Required</p> : null}
                        </GridItem>



                        <GridItem xs={12} sm={12} md={4}>
                            <Dropdown success={props.LineofState === "success"} required={true} disabled={props.viewdisable} required={true} error={props.LineofState === "error"} labelText="Line Of Business" id="ProductDTO.lobid" lstObject={props.MasterDTO.LOB} value={props.ProductDTO.lobid} name='lobid' onChange={(e) => props.GetMasterData('COB', 'ProductDTO', e)} formControlProps={{ fullWidth: true }} />
                            {props.errormessage && (props.ProductDTO.lobid == "") ? <p className="error">This Field is Required</p> : null}
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <Dropdown success={props.ClassofState === "success"} disabled={props.viewdisable} required={true} error={props.ClassofState === "error"} labelText="Class Of Business" id="ProductDTO.cobid" lstObject={props.MasterDTO.COB} value={props.ProductDTO.cobid} name='cobid' onChange={(e) => props.GetMasterData('InsurableCategory', 'ProductDTO', e)} formControlProps={{ fullWidth: true }} />
                            {props.errormessage && (props.ProductDTO.cobid == "") ? <p className="error">This Field is Required</p> : null}
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomDatetime success={props.activeFromState === "success"} disabled={props.viewdisable} required={true} onFocus={props.onClick} error={props.activeFromState === "error"} validdate={true} labelText="Active From" id='dtActiveFrom' name='activeFrom' onChange={(evt) => props.onDateChange('datetime', 'ProductDTO', 'activeFrom', evt)} value={props.ProductDTO.activeFrom} formControlProps={{ fullWidth: true }} />
                            {props.errormessage && (props.ProductDTO.activeFrom == "") ? <p className="error">This Field is Required</p> : null}
                        </GridItem>

                        <GridItem xs={12} sm={12} md={4}>
                            <CustomDatetime success={props.activeToState === "success"} disabled={props.viewdisable} required={true} error={props.activeToState === "error"} validdate={false} datediff={props.datediff} labelText="Active To" id='dtActiveFrom' name='activeTo' onChange={(evt) => props.onDateChange('datetime', 'ProductDTO', 'activeTo', evt)} value={props.ProductDTO.activeTo} formControlProps={{ fullWidth: true }} />
                            {props.errormessage && (props.ProductDTO.activeTo == "") ? <p className="error">This Field is Required</p> : null}
                        </GridItem>
                        <GridItem  xs={12} sm={12} md={4}>
                            <MasterDropdown success={props.productStatusIdState === "success"} disabled={props.viewdisable} required={true} error={props.productStatusIdState === "error"} labelText="Product Status" id="ddlstatus" lstObject={props.masterList} filterName='ProductStatus' value={props.ProductDTO.productStatusId} name='productStatusId' onChange={(event) => props.SetValue("string", event)} formControlProps={{ fullWidth: true }} />
                            {props.errormessage && (props.ProductDTO.productStatusId == "") ? <p className="error">This Field is Required</p> : null}
                        </GridItem>

                        <GridItem xs={12} sm={12} md={4}>
                            <Dropdown required={true} disabled={props.viewdisable} required={true} labelText="Product Type" lstObject={props.MasterDTO.ProductType} value={props.ProductDTO.productTypeId} name='productTypeId' onChange={(e) => props.GetMasterData('ProductType', 'ProductDTO', e)} formControlProps={{ fullWidth: true }} />
                            {props.errormessage && (props.ProductDTO.productTypeId == "") ? <p className="error">This Field is Required</p> : null}
                        </GridItem>
                        <GridItem className="dropPro" xs={12} sm={12} md={4}>
                            <CustomCheckbox
                                name="isMasterPolicy"
                                disabled={props.viewdisable} 
                                labelText="Cover OnDemand"
                                value={props.ProductDTO.isMasterPolicy}
                                onChange={(e) => props.SetMasterPolicyCheckBox(e)}
                                //disabled={(coversProductDetails.ProductDTO.ProductDTO.isCoverEvent === false) ? coversData.viewdisable : coversProductDetails.ProductDTO.ProductDTO.isCoverEvent}
                                checked={props.ProductDTO.isMasterPolicy}

                                formControlProps={{
                                    fullWidth: true
                                }}

                            />
                        </GridItem>

                    </GridContainer>

                </CardBody>
            </Card>
        </div>
    )
}

//export default withStyles(style)(ProductBasic);
export default ProductBasic;