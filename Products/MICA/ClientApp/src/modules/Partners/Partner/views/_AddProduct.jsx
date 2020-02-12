import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
//import Select from "@material-ui/core/Select";
//import MenuItem from "@material-ui/core/MenuItem";
//import InputLabel from "@material-ui/core/InputLabel";
//import FormControl from "@material-ui/core/FormControl";
//import CustomInput from "components/CustomInput/CustomInput.jsx";
import $ from "jquery";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";

// core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
//import Input from "@material-ui/core/Input";
import Button from "components/CustomButtons/Button.jsx";
//import Table from '@material-ui/core/Table';
//import TableBody from '@material-ui/core/TableBody';
//import TableCell from '@material-ui/core/TableCell';
//import TableHead from '@material-ui/core/TableHead';
//import TableRow from '@material-ui/core/TableRow';
import Datetime from "react-datetime";
//import Dropdown from "components/Dropdown/Dropdown.jsx";
//import AssignProduct from "modules/Partners/Partner/views/AssignProduct.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
//import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";

import DualListBox from 'react-dual-listbox';
import 'react-dual-listbox/lib/react-dual-listbox.css';
//import { Redirect } from 'react-router-dom'
import {Animated} from "react-animated-css";
import SearchAssignProduct from "./SearchAssignProduct.jsx";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import CommonMessage from "Messages/CommonMessage.jsx";

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

//const rightBtn = {
//    marginTop: "40px",
//    backgroundColor: "#1068ac",
//    color: "blue",
//    border: "none",
//    borderRadius: "4px",
//    width: "100px",
//    height: "30px",
//    marginLeft: "90px"
//}
//const makePayment = {
//    height: "35px",
//    margin: "0 auto",
//    marginTop: "20px"

//}

//const listerrors = {
//    marginLeft: "12px",
//fontSize: "10px",
//color: 'red' 
//}
//const CustomTableCell = withStyles(theme => ({
//    head: {
//        backgroundColor: "#e91e63",
//        color: theme.palette.common.white,
//    },
//    body: {
//        fontSize: 14,
//    },
//}))(TableCell);

//const btnStyle = {
//    height: "35px",
//    textAlign: "center"
//}
//const textAlign = {
//    textAlign: 'center'
//}

//const subHeading = { color: '#407ba4', marginLeft: '10px', display: 'none' }

//const tableStyle = { borderRadius: '2px', display: 'none', width: 'min-content' }

//const tableRow = { height: '45px' }

//const addBtn = { margin: '0 auto' }

const gridItem = { marginTop: '3px' }

//const dateStyle = {
//    width: "max-content",
//    marginLeft: "180px",
//    marginTop: "-25px",
//    backgroundColor: "transparent",
//    border: "none",
//    zoom: "1.15"
//}


const AddProduct = (props) => {
    const maxFrom=new Date(props.getMaxFromDate());
    const minTo = new Date(props.getMinToDate());
    console.log("max", maxFrom, minTo);

    const Productdata = props.componentData;

    const { classes } = props;
    console.log("addpro props", props);
    return (
        <div>
             <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>

        <Card>
            <CardBody>
                <CardHeader color="rose" icon>
                    {
                        <h4>
                                    <small> <TranslationContainer translationKey="Products" /> </small>
                        </h4>
                    }
                </CardHeader>
                
                <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <span className="error">  {props.listerror  ? CommonMessage("RequiredField", []) : null} </span>
                              
                                <h3><small><TranslationContainer translationKey="ProductCode" />- <TranslationContainer translationKey="ProductName" /></small></h3>
                                <DualListBox
                                    id="selectBox"
                                    label={props.Searchproduct}
                                    options={props.Searchproduct}

                                    selected={props.selected}
                                    onChange={props.dualChange}
                                />
                    </GridItem>
                    { (props.getMaxFromDate()==null || props.getMinToDate()==null)?"":
                        <GridItem xs={12} sm={12} md={12}>
                            <p>
                            <br />
                            <br />
                            {
                                (props.getMaxFromDate()!=null && props.getMinToDate()==null)? "The selected products are valid from "+maxFrom.getDate()+"/"+(maxFrom.getMonth()+1)+"/"+maxFrom.getFullYear():
                                (props.getMaxFromDate()==null && props.getMinToDate()!=null)? "The selected products are valid to "+minTo.getDate()+"/"+(minTo.getMonth()+1)+"/"+minTo.getFullYear():
                                (props.getMaxFromDate()!=null && props.getMinToDate()!=null && props.getMaxFromDate()>props.getMinToDate())? "Some of the selected products start after the end date of other products. Please select proper product":
                                (props.getMaxFromDate()!=null && props.getMinToDate()!=null)? "The selected products are valid from "+maxFrom.getDate()+"/"+(maxFrom.getMonth()+1)+"/"+maxFrom.getFullYear()+" to "+minTo.getDate()+"/"+(minTo.getMonth()+1)+"/"+minTo.getFullYear():
                                ""
                            }
                            </p>
                        </GridItem>
                    }
                    <br />
                    <br />
                    <GridContainer className="assign_pro">
                        <GridItem xs={12} sm={12} md={4} style={gridItem}>
                            <CustomDatetime labelText="AssignDate" id='dtAssign' name='assignDate' required={true} onChange={(evt) => props.onDateChange('assignProductDto', 'assignDate', evt)} value={props.assignProductDto.assignDate} formControlProps={{ fullWidth: true }} />
                                    <span className="error">  {props.assignDateerror ? CommonMessage("RequiredField", []) : null} </span>
                        </GridItem>

                        <GridItem xs={12} sm={12} md={4} style={gridItem}>
                            <CustomDatetime labelText="EffectiveFrom" id='dtEffectFrom' isValidDate={(current) => { return ((props.getMaxFromDate() == null) ? true : current.isAfter(Datetime.moment(maxFrom, ['DD/MM/YYYY']).subtract(1, 'day'))) && ((props.getMinToDate() == null) ? true : current.isBefore(Datetime.moment(minTo, ['DD/MM/YYYY']).add(1, 'day'))) && ((props.assignProductDto.effectiveTo == "") ? true : current.isBefore(Datetime.moment(props.assignProductDto.effectiveTo, ['DD/MM/YYYY']).add(1, 'day'))) }} required={true} name='effectiveFrom' onChange={(evt) => props.onDateChange('assignProductDto', 'effectiveFrom', evt)} value={props.assignProductDto.effectiveFrom} formControlProps={{ fullWidth: true }} />
                                    <span className="error">  {props.effectiveFromerror ? CommonMessage("RequiredField", []) : null} </span>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4} style={gridItem}>
                            
                            <CustomDatetime labelText="EffectiveTo" id='dtEffectTo' isValidDate={(current) => { return ((props.getMaxFromDate() == null) ? true : current.isAfter(Datetime.moment(maxFrom, ['DD/MM/YYYY']).subtract(1, 'day'))) && ((props.getMinToDate() == null) ? true : current.isBefore(Datetime.moment(minTo, ['DD/MM/YYYY']).add(1 , 'day')))&&((props.assignProductDto.effectiveFrom=="")?true:current.isAfter(Datetime.moment(props.assignProductDto.effectiveFrom,['DD/MM/YYYY']).subtract(1 , 'day')))}} name='effectiveTo' required={true}onChange={(evt) => props.onDateChange('assignProductDto', 'effectiveTo', evt)} value={props.assignProductDto.effectiveTo} formControlProps={{ fullWidth: true }} />
                                    <span className="error">  {props.effectiveToerror ? CommonMessage("RequiredField", []) : null} </span>
                        </GridItem>

                    </GridContainer>
                    <GridContainer justify="center" >
                            <GridItem xs={3} sm={3} md={3}>
                                <Button color="warning" id="addproduct" round onClick={props.onClicksave}>
                                        <TranslationContainer translationKey="Save" />
                        </Button>
                        </GridItem>
                    </GridContainer>
                 
                </GridContainer>
            </CardBody>
        </Card>
             <SearchAssignProduct partid={props.partid}/>
             </Animated>
        </div>
    );
}

export default withStyles(style)(AddProduct);
