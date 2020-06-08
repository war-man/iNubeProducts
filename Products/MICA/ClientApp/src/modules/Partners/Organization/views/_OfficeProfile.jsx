//Node Module components
import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import FilterNone from "@material-ui/icons/FilterNone";
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

//General components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

//General Styles
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
//Module Components
import profileStyles from "./profileStyles.jsx";
import RegAddress from "./_RegAddress.jsx";


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
    ...customCheckboxRadioSwitch,
    ...profileStyles
}



const OfficeProfile = (props) => {
    const officeData = props.componentData;

    const { classes } = props;
    console.log("office props", props);
    return (
        <div>
            <CardBody>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                            disabled={officeData.disabled}
                            labelText="Office Name"
                            id="officename"
                            name="officeName"
                            value={officeData.aVOOrgOffice.officeName}
                            onChange={(e) => officeData.SetValue("office", e)}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                            disabled={officeData.disabled}
                            labelText="Office Code"
                            id="officeCode"
                            name="officeCode"
                            value={officeData.aVOOrgOffice.officeCode}
                            onChange={(e) => officeData.SetValue("office", e)}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                            disabled={officeData.disabled}
                            labelText="Phone Number"
                            id="phoneNum"
                            name="officePhoneNo"
                            value={officeData.aVOOrgOffice.officePhoneNo}
                            onChange={(e) => officeData.SetValue("office", e)}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                            disabled={officeData.disabled}
                            labelText="Fax Number"
                            id="faxNum"
                            name="officeFaxNo"
                            value={officeData.aVOOrgOffice.officeFaxNo}
                            onChange={(e) => officeData.SetValue("office", e)}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>


                    {/*  <GridItem xs={12} sm={4}>
                        <MasterDropdown disabled={officeData.disabled} labelText="Select Level Applicable" value={officeData.officeDTO.officeLevelId} lstObject={officeData.list} filterName='office' model="OrganizationDTO" name='officeLevelId' onChange={(e) => officeData.SetValue('officeLevelId', e)} formControlProps={{ fullWidth: true }} />
                    </GridItem>*/}
                    {/*   
                          
                            <GridItem xs={12} sm={4}>
                                <MasterDropdown disabled={officeData.disabled} labelText="Reporting Office" id="OrganizationDTO.orgTypeId" value={officeData.officeDTO.officeReportingOfficeId} lstObject={officeData.list} filterName='office' model="OrganizationDTO" name='officeReportingOfficeId' formControlProps={{ fullWidth: true }} />   
                            </GridItem>
                                 
                             <GridItem xs={12} sm={4}>
                                <FormControl fullWidth className={classes.selectFormControl}>
                                    <InputLabel
                                        htmlFor="rep-Code"
                                        className={classes.selectLabel}
                                    >
                                        Reporting Office Code
                                     </InputLabel>
                                    <Select
                                        MenuProps={{
                                            className: classes.selectMenu
                                        }}
                                        classes={{
                                            select: classes.select
                                        }}
                                        value={this.state.repOffCode}
                                        onChange={this.handleSimple}
                                        inputProps={{
                                            name: "repOffCode",
                                            id: "rep-Code"
                                        }}
                                    >
                                        <MenuItem
                                            disabled
                                            classes={{
                                                root: classes.selectMenuItem
                                            }}
                                        >
                                            Select Level
                                        </MenuItem>
                                        <MenuItem
                                            classes={{
                                                root: classes.selectMenuItem,
                                                selected: classes.selectMenuItemSelected
                                            }}
                                            value="2"
                                        >
                                            Option 1
                                        </MenuItem>
                                        <MenuItem
                                            classes={{
                                                root: classes.selectMenuItem,
                                                selected: classes.selectMenuItemSelected
                                            }}
                                            value="3"
                                        >
                                            Option 2
                                     </MenuItem>
                                    </Select>
                                </FormControl>
                            </GridItem>
                            */}
                </GridContainer>
            </CardBody>
        </div>
    );
}



export default withStyles(style)(OfficeProfile);