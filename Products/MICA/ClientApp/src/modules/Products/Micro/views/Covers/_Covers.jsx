import React from "react";
import FormControl from "@material-ui/core/FormControl";
import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import $ from 'jquery';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import { Animated } from "react-animated-css";
const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: "#e91e63",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const tableStyle = { borderRadius: '10px', width: '100%' }

const tableRow = { height: '20px' }

const rangeSec = { display: 'none' }

const radioAlign = {
    marginLeft: "50px",
    // marginTop: "-35px"
}


const Covers = (props) => {
    const { classes } = props;

    const coversData = props.componentData;
    console.log('testing cover data ', props)
    //getRadioButtonVal(e) {
    //    var radioVal = e.target.value

    //    if (radioVal == "R") {
    //        document.getElementById('rangeTable').style.display = 'block';
    //        document.getElementById('factVal').style.display = 'none';
    //        this.setState({
    //            valFlag: true,
    //             selectedValue: e.target.value
    //        });
    //    } else {
    //          document.getElementById('rangeTable').style.display = 'none';
    //          document.getElementById('factVal').style.display = 'block';
    //        this.setState({
    //            valFlag: false,
    //            selectedValue : e.target.value
    //        });
    //    }
    //}

    //addRow() {

    //    var table = document.getElementById('clauseTable');
    //    var row = table.insertRow(-1);
    //    row.className = 'tableClassRow';
    //    var cell1 = row.insertCell(-1);
    //    var cell2 = row.insertCell(-1);
    //    var cell3 = row.insertCell(-1);

    //    cell1.innerHTML = '<input type="text" class="addRow" />';
    //    cell2.innerHTML = '<input type="text"  class="addRow" />';
    //    cell3.innerHTML = '<span class="delete"><i class="fa fa-trash del-btn" aria-hidden="true"></i><span/>';

    //    $(".delete").on('click', function () {
    //        $(this).parent().parent().remove();
    //    });
    //}


    return (
        <div>
            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                <GridContainer>
                    <GridItem xs={12} sm={4}>
                        <Dropdown labelText="Cover" id="ProductDTO.coverTypeId" required={true} lstObject={coversData.MasterDTO.Cover} value={coversData.ProductDTO.productCover.coverTypeId} name='coverTypeId' onChange={(e) => coversData.GetMasterData('', 'productCover', e)} disabled={coversData.viewdisable} formControlProps={{ fullWidth: true }} />
                        {coversData.errormessage && (coversData.ProductDTO.productCover.coverTypeId == "") ? <p className="error">This Field is Required</p> : null}
                    </GridItem>
                    <GridItem xs={12} sm={4}>
                        <Dropdown labelText="Cover Event" id="ProductDTO.coverEventId" required={true} lstObject={coversData.MasterDTO.CoverEvent} value={coversData.ProductDTO.productCover.coverEventId} name='coverEventId' onChange={(e) => coversData.GetMasterData('CoverEventFactor', 'productCover', e)} disabled={coversData.viewdisable} formControlProps={{ fullWidth: true }} />
                        {coversData.errormessage && (coversData.ProductDTO.productCover.coverEventId == "") ? <p className="error">This Field is Required</p> : null}
                    </GridItem>
                    <GridItem xs={12} sm={4}>
                        <Dropdown labelText="Cover Event Factor" id="ProductDTO.coverEventFactorId" required={true} lstObject={coversData.MasterDTO.CoverEventFactor} value={coversData.ProductDTO.productCover.coverEventFactorId} name='coverEventFactorId' onChange={(e) => coversData.GetMasterData('CoverEventFactorValue', 'productCover', e)} disabled={coversData.viewdisable} formControlProps={{ fullWidth: true }} />
                        {coversData.errormessage && (coversData.ProductDTO.productCover.coverEventFactorId == "") ? <p className="error">This Field is Required</p> : null}
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                        <CustomInput
                            required={true}
                            labelText="Cover Description"
                            id="coverDesc"
                            value={coversData.ProductDTO.productCover.coverDescription}
                            name="coverDescription"
                            onChange={(e) => coversData.SetValue('productCover', e)}
                            disabled={coversData.viewdisable}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                        {coversData.errormessage && (coversData.ProductDTO.productCover.coverDescription == "") ? <p className="error">This Field is Required</p> : null}

                    </GridItem>

                    <GridItem xs={12} sm={12} md={4}>
                        <Dropdown required={true} disabled={coversData.viewdisable} labelText="Cover Event Factor Unit" id="ProductDTO.coverEventFactorValueUnitId" lstObject={coversData.MasterDTO.CoverEventFactorValue} value={coversData.ProductDTO.productCover.coverEventFactorValueUnitId} name='coverEventFactorValueUnitId' onChange={(e) => coversData.SetValue('productCover', e)} formControlProps={{ fullWidth: true }} />
                        {coversData.errormessage && (coversData.ProductDTO.productCover.coverEventFactorValueUnitId == "") ? <p className="error">This Field is Required</p> : null}
                    </GridItem>


                    <GridItem xs={12} sm={12} md={4}>
                        <div style={{ marginTop: "24px" }}>

                            <FormControlLabel
                                control={
                                    <Radio
                                        checked={coversData.ProductDTO.productCover.singleValueSelected === "0"}
                                        onChange={coversData.handleRadioChange}
                                        disabled={coversData.viewdisable}
                                        value={0}
                                        name="radio button demo"
                                        aria-label="B"
                                        icon={
                                            <FiberManualRecord
                                                className={classes.radioUnchecked}
                                            />
                                        }
                                        checkedIcon={
                                            <FiberManualRecord
                                                className={classes.radioChecked}
                                            />
                                        }
                                        classes={{
                                            checked: classes.radio,
                                            root: classes.radioRoot
                                        }}
                                    />
                                }
                                classes={{
                                    label: classes.label
                                }}
                                label="Single"
                            />

                            <FormControlLabel
                                control={
                                    <Radio

                                        checked={coversData.ProductDTO.productCover.singleValueSelected === "1"}
                                        onChange={coversData.handleRadioChange}
                                        disabled={coversData.viewdisable}
                                        value={1}
                                        name="radio button demo"
                                        aria-label="B"
                                        icon={
                                            <FiberManualRecord
                                                className={classes.radioUnchecked}
                                            />
                                        }
                                        checkedIcon={
                                            <FiberManualRecord
                                                className={classes.radioChecked}
                                            />
                                        }
                                        classes={{
                                            checked: classes.radio,
                                            root: classes.radioRoot
                                        }}
                                    />
                                }
                                classes={{
                                    label: classes.label
                                }}
                                label="Range"
                            />
                        </div>
                    </GridItem>

                    {coversData.ProductDTO.productCover.singleValueSelected === "1" ?
                        (


                            <GridItem xs={12} sm={12} md={4} >
                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                    <CustomInput
                                        required={true}
                                        labelText="Cover Event From Factor Value"
                                        id="gstnumber"

                                        type="numeric"
                                        inputType="number"
                                        value={coversData.ProductDTO.productCover.coverEventFactorValueFrom}
                                        name="coverEventFactorValueFrom"
                                        onChange={(e) => coversData.SetValue('productCover', e)}
                                        disabled={(coversData.viewdisable==false)? coversData.CEFvalueDisable:true}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    /> </Animated>
                                {coversData.errormessage && (coversData.ProductDTO.productCover.coverEventFactorValueFrom == "") ? <p className="error">This Field is Required</p> : null}

                            </GridItem>
                        ) : (null)}
                    {coversData.ProductDTO.productCover.singleValueSelected === "1" ?
                        (
                            <GridItem xs={12} sm={12} md={4}>
                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                    <CustomInput
                                        required={true}
                                        labelText="Cover Event To Factor Value"
                                        id="gstnumber"

                                        type="numeric"
                                        inputType="number"
                                        value={coversData.ProductDTO.productCover.coverEventFactorValueTo}
                                        name="coverEventFactorValueTo"
                                        onChange={(e) => coversData.SetValue('productCover', e)}
                                        disabled={(coversData.viewdisable == false) ? coversData.CEFvalueDisable : true}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    /> </Animated>
                                {coversData.errormessage && (coversData.ProductDTO.productCover.coverEventFactorValueTo == "") ? <p className="error">This Field is Required</p> : null}

                            </GridItem>


                        ) : (null)
                    }


                    {/*    <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                        labelText="Cover Period / Unit"
                        id="gstnumber"
                        value={coversData.ProductDTO.productCover.coverPeriod}
                        name="coverPeriod"
                        onChange={(e) => coversData.SetValue('productCover', e)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>*/}


                </GridContainer>
            </Animated>
        </div>
    );

}
export default withStyles(extendedFormsStyle)(Covers);