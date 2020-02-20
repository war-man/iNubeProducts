import React from "react";

// @material-ui/core components
//import withStyles from "@material-ui/core/styles/withStyles";
//import Select from "@material-ui/core/Select";
//import MenuItem from "@material-ui/core/MenuItem";
//import InputLabel from "@material-ui/core/InputLabel";
//import FormControl from "@material-ui/core/FormControl";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
//import CustomInput from "components/CustomInput/CustomInput.jsx";
//import FormControlLabel from "@material-ui/core/FormControlLabel";
//import Radio from "@material-ui/core/Radio";
//import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import profileStyles from "./profileStyles.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";

//const style = {
//    infoText: {
//        fontWeight: "300",
//        margin: "10px 0 30px",
//        textAlign: "center"
//    },
//    inputAdornmentIcon: {
//        color: "#555"
//    },
//    choiche: {
//        textAlign: "center",
//        cursor: "pointer",
//        marginTop: "20px"
//    },
//    ...customSelectStyle,
//    ...customCheckboxRadioSwitch,
//    ...profileStyles
//};


const CorpAddress = (props) => {
    const corpData = props.componentData;

    return (
        <GridContainer>

            <GridItem xs={12} sm={4}>
                <MasterDropdown labelText="COUNTRY" id="OrganizationDTO.countryId" lstObject={corpData.masterList} filterName='InsuranceType' value={corpData.OrganizationDTO} model="OrganizationDTO" name='countryId' onChange={corpData.SetValue} formControlProps={{ fullWidth: true }} />

            </GridItem>

            <GridItem xs={12} sm={4}>
                <MasterDropdown labelText="STATE" id="OrganizationDTO.stateId" lstObject={corpData.masterList} filterName='InsuranceType' value={corpData.OrganizationDTO} model="OrganizationDTO" name='stateId' onChange={corpData.SetValue} formControlProps={{ fullWidth: true }} />

            </GridItem>

            <GridItem xs={12} sm={4}>
                <MasterDropdown labelText="DISTRICT" id="OrganizationDTO.districtId" lstObject={corpData.masterList} filterName='InsuranceType' value={corpData.OrganizationDTO} model="OrganizationDTO" name='districtId' onChange={corpData.SetValue} formControlProps={{ fullWidth: true }} />

            </GridItem>

            <GridItem xs={12} sm={4}>
                <MasterDropdown labelText="CITY" id="OrganizationDTO.cityId" lstObject={corpData.masterList} filterName='InsuranceType' value={corpData.OrganizationDTO} model="OrganizationDTO" name='cityId' onChange={corpData.SetValue} formControlProps={{ fullWidth: true }} />

            </GridItem>

            <GridItem xs={12} sm={4}>
                <MasterDropdown labelText="AREA" id="OrganizationDTO.areaId" lstObject={corpData.masterList} filterName='InsuranceType' value={corpData.OrganizationDTO} model="OrganizationDTO" name='areaId' onChange={corpData.SetValue} formControlProps={{ fullWidth: true }} />

            </GridItem>

        </GridContainer>
    );
}




export default CorpAddress;