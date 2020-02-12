import React from "react";
import FormControl from "@material-ui/core/FormControl";
import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "components/CustomButtons/Button.jsx";
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

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import Benefits from "./_Benefits.jsx";
import CardBody from "../../../../../components/Card/CardBody.jsx";
import CWEDetails from "../_CWEDetails.jsx";
import Accordion from "components/Accordion/Accordion.jsx";
import CustomCheckbox from "components/Checkbox/CustomCheckbox";

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
  

    console.log("Cindex",props);
    const coversData = props.componentData.props.props.state;
    const coversProductDetails = props.componentData;
    const propFun = props.componentData;
    const Iindex = props.componentData.Iindex;
    // console.log('testing cover data ', props, coversData.MasterDTO,coversData.MasterDTO.Cover[Iindex])
    console.log('testing cover data ', props, coversData.MasterDTO, coversData.MasterDTO.CoverEventFactor[Iindex])
    const coverdatalist = [];
    const Cindex = coversProductDetails.ProductDTO.productInsurableItem[Iindex].productCovers.length;
    console.log("Cover clauses:", coversData);
    if (coversData.MasterDTO.Cover.length > 0 && coversData.MasterDTO.Cover[Iindex] !== undefined) {
        coverdatalist.push(coversData.MasterDTO.Cover[Iindex][0]);

    }

    console.log("coversProductDetails", coversProductDetails, coversProductDetails.ProductDTO.productCover, coversProductDetails.ProductDTO.productCover.coverTypeId);
    const [addCover, addCoverfun] = React.useState([]);
   
  //  console.log("coverdatalist", coverdatalist, Iindex, Cindex, coverdatalist[0], coversProductDetails.ProductDTO.productInsurableItem[Iindex], coversProductDetails.ProductDTO.productInsurableItem[Iindex].productCovers[Cindex]);
    //////////getRadioButtonVal(e) {
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
            <GridContainer lg={12}>
                
            <CustomCheckbox
                    name="CoverEvent"
                    labelText="Cover Event"
                    value={coversData.MasterDTO.checkBox}
                    onChange={(e) => propFun.SetCoverEventValue(e)}
                    disabled={(coversProductDetails.ProductDTO.ProductDTO.isCoverEvent === false) ? coversData.viewdisable: coversProductDetails.ProductDTO.ProductDTO.isCoverEvent}
                    checked={coversData.MasterDTO.checkBox}
                formControlProps={{
                    fullWidth: true
                }}

                    />
               
                {coversData.MasterDTO.checkBox && <GridItem xs={12} sm={4}>
                    <Dropdown labelText="Cover Event" id="ProductDTO.coverEventId" required={true} lstObject={coversData.MasterDTO.CoverEvent} value={coversProductDetails.ProductDTO.productCover.coverEventId} name='coverEventId' onChange={(e) => propFun.GetInusrableMasterData('CoverEventFactor', 'productCover', e, Iindex, Cindex)} disabled={(coversProductDetails.ProductDTO.ProductDTO.isCoverEvent === false) ? coversData.viewdisable : coversProductDetails.ProductDTO.ProductDTO.isCoverEvent} formControlProps={{ fullWidth: true }} />
                {coversData.errormessage && (coversData.ProductDTO.productCover.coverEventId == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                </GridItem>}
            </GridContainer>
        <GridContainer lg={12}>
          
            <GridItem xs={12} sm={4}>
                    <Dropdown labelText="Covers" id="ProductDTO.coverTypeId" required={true} lstObject={(coverdatalist[0] === undefined) ? [] : coverdatalist[0]} value={coversProductDetails.ProductDTO.productCover.coverTypeId} name='coverTypeId' onChange={(e) => propFun.GetInusrableMasterData('', 'productCover', e,  Iindex,Cindex)} disabled={coversData.viewdisable} formControlProps={{ fullWidth: true }} />
                {/*coversData.errormessage && (coversData.ProductDTO.productCover.coverTypeId == "") ? <p className="error">*Required field cannot be left blank</p> : null*/}
            </GridItem>
           
                {coversData.MasterDTO.checkBox &&
                <GridItem xs={12} sm={4}>
                    <Dropdown labelText="Cover Event Factor" id="ProductDTO.coverEventFactorId" required={true} lstObject={coversData.MasterDTO.CoverEventFactor} value={coversProductDetails.ProductDTO.productCover.coverEventFactorId} name='coverEventFactorId' onChange={(e) => propFun.GetInusrableMasterData('CoverEventFactorValue', 'productCover', e, Iindex, Cindex)} disabled={coversData.viewdisable} formControlProps={{ fullWidth: true }} />
                    {/*coversData.errormessage && (coversData.ProductDTO.productCover.coverEventFactorId == "") ? <p className="error">*Required field cannot be left blank</p> : null*/}
                </GridItem>
            }
            <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                    required={true}
                    labelText="Cover Description"
                    id="coverDesc"
                        value={coversProductDetails.ProductDTO.productCover.coverDescription}
                    name="coverDescription"
                        onChange={(e) => propFun.SetCoverProductDetailsValue('productCover', e, Cindex, Iindex)}
                    disabled={coversData.viewdisable}
                    formControlProps={{
                        fullWidth: true
                    }}
                />
                {/*coversData.errormessage && (coversData.ProductDTO.productCover.coverDescription == "") ? <p className="error">*Required field cannot be left blank</p> : null*/}

            </GridItem>
                {coversData.MasterDTO.checkBox &&
                <GridItem xs={12} sm={12} md={4}>
                    <Dropdown required={true} disabled={coversData.viewdisable} labelText="Cover Event Factor Unit" id="ProductDTO.coverEventFactorValueUnitId" lstObject={coversData.MasterDTO.CoverEventFactorValue} value={coversProductDetails.ProductDTO.productCover.coverEventFactorValueUnitId} name='coverEventFactorValueUnitId' onChange={(e) => propFun.SetCoverProductDetailsValue('productCover', e, Cindex, Iindex)} formControlProps={{ fullWidth: true }} />
                    {/*coversData.errormessage && (coversData.ProductDTO.productCover.coverEventFactorValueUnitId == "") ? <p className="error">*Required field cannot be left blank</p> : null*/}
                </GridItem>

            }
            <GridItem xs={12} sm={12} md={4}>
                <div style={{ marginTop: "24px" }}>

                    <FormControlLabel
                        control={
                            <Radio
                                    checked={coversProductDetails.ProductDTO.productCover.singleValueSelected === "0"}
                                    onChange={(e) => propFun.handleRadioChange(e, Iindex, Cindex)}
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

                                    checked={coversProductDetails.ProductDTO.productCover.singleValueSelected === "1"}
                                    onChange={(e) => propFun.handleRadioChange(e, Iindex, Cindex)}
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

                {coversProductDetails.ProductDTO.productCover.singleValueSelected === "1" ?
                (<CardBody><GridContainer  ><GridItem xs={12} sm={12} md={6} id="coverEventFactorValueFrom">
                    <CustomInput
                        required={true}
                        labelText="Cover Event From Factor Value"
                        id="gstnumber"
                            value={coversProductDetails.ProductDTO.productCover.coverEventFactorValueFrom}
                        name="coverEventFactorValueFrom"
                            onChange={(e) => propFun.SetCoverProductDetailsValue('productCover', e, Cindex, Iindex)}
                        disabled={coversData.viewdisable}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                    {/*coversData.errormessage && (coversData.ProductDTO.productCover.coverEventFactorValueFrom == "") ? <p className="error">*Required field cannot be left blank</p> : null*/}

                </GridItem>

                    <GridItem xs={12} sm={12} md={6} id="factVal">
                        <CustomInput
                            required={true}
                            labelText="Cover Event To Factor Value"
                            id="gstnumber"
                                value={coversProductDetails.ProductDTO.productCover.coverEventFactorValueTo}
                            name="coverEventFactorValueTo"
                                onChange={(e) => propFun.SetCoverProductDetailsValue('productCover', e, Cindex, Iindex)}
                            disabled={coversData.viewdisable}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                        {/*coversData.errormessage && (coversData.ProductDTO.productCover.coverEventFactorValueTo == "") ? <p className="error">*Required field cannot be left blank</p> : null*/}

                    </GridItem>

                </GridContainer> </CardBody>) : (null)
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
                </GridItem>
            
            <Benefits props={coversData} Bindex={0} Iindex={Iindex} />
            <CWEDetails props={coversData} Bindex={0} Iindex={Iindex} />
               */} 
                <GridItem xs={12} sm={1}>
                    {!coversData.viewdisable && <Button round color="info" className="Add" small onClick={(e) => { propFun.addCoverelist(e, coversProductDetails.ProductDTO.productInsurableItem[Iindex].productCovers.length, Iindex); }}>ADD COVER</Button >}

            </GridItem>
           
        </GridContainer>
        <Accordion
           // active={0}
                collapses={coversData.InitialInsurable[Iindex].InitialCover}
        />
        </div>

    );

}
export default withStyles(extendedFormsStyle)(Covers);