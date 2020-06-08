import React from "react";

// @material-ui/core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import PinCodeModal from "./_PinCodeModal";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import withStyles from "@material-ui/core/styles/withStyles";
import $ from 'jquery';


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


const radio = {
    marginTop: "-35px",
    marginLeft: "315px"
}

const OfficeAddress = (props) => {
    const regData = props.componentData;

    const data = props.componentName;

    const { classes } = props;
    var addType;
    var countryValue, stateValue, distValue, cityValue, pinCodeValue, addLine1, addLine2, addLine3;
    var countryName, stateName, distName, cityName, pinCodeName, addLine1Name, addLine2Name, addLine3Name;
    var lblmsg = '';
    //if (data == "offAddress") {
        //addType = 'off';
        //console.log("regdata",regData);
        countryValue = regData.Officeaddress.officeCountryId;
        stateValue = regData.Officeaddress.officeStateId;
        distValue = regData.Officeaddress.officeDistrictId;
        cityValue = regData.Officeaddress.officeCityId;
        pinCodeValue = regData.Officeaddress.officePincodeId;
        addLine1 = regData.Officeaddress.officeAddressLine1;
        addLine2 = regData.Officeaddress.officeAddressLine2;
        addLine3 = regData.Officeaddress.officeAddressLine3;
        //console.log("value off", countryValue);
    //}
    //else if (data == "spocDet") {
    //    addType = 'spoc';
    //    //console.log(regData);
    //    countryValue = regData.addressDTO.spoc.spoccountryId;
    //    stateValue = regData.addressDTO.spoc.spocstateId;
    //    distValue = regData.addressDTO.spoc.spocdistrictId;
    //    cityValue = regData.addressDTO.spoc.spoccityId;
    //    pinCodeValue = regData.addressDTO.spoc.spocpincodeId;
    //    addLine1 = regData.addressDTO.spoc.spocaddressLine1;
    //    addLine2 = regData.addressDTO.spoc.spocaddressLine2;
    //    addLine3 = regData.addressDTO.spoc.spocaddressLine3;
    //} 
    //if (data == "spocDet") {
    //     countryName = 'spoccountryId';
    //     stateName = 'spocstateId';
    //     distName = 'spocdistrictId';
    //     cityName = 'spoccityId';
    //     pinCodeName = 'spocpincodeId';
    //     addLine1Name = 'spocaddressLine1';
    //     addLine2Name = 'spocaddressLine2';
    //     addLine3Name = 'spocaddressLine3';
    // }
    //if (data == "offAddress") {
        countryName = 'officeCountryId';
        stateName = 'officeStateId';
        distName = 'officeDistrictId';
        cityName = 'officeCityId';
        pinCodeName = 'officePincodeId';
        addLine1Name = 'officeAddressLine1';
        addLine2Name = 'officeAddressLine2';
        addLine3Name = 'officeAddressLine3';
    //}
    //console.log(countryValue);

    return (

        <GridContainer>
            <GridContainer id="regAddress" disabled={true}>
                <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                        disabled={regData.disabled}
                        //success={regData.orgAddressLine1State === "success"}
                        //error={regData.orgAddressLine1State === "error"}
                        error={regData.orgAddressLine1State}
                        labelText="Address Line 1"
                        id="add1"
                        value={addLine1}
                        required={true}
                        name={addLine1Name}
                        onChange={(e) => regData.GetLocation("addLineName", '', e)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                        disabled={regData.disabled}
                        //success={regData.orgAddressLine2State === "success"}
                        //error={regData.orgAddressLine2State === "error"}
                        error={regData.orgAddressLine2State}
                        labelText="Address Line 2"
                        id="add2"
                        value={addLine2}
                        name={addLine2Name}
                        onChange={(e) => regData.GetLocation("addLineName", '', e)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                        disabled={regData.disabled}
                        //success={regData.orgAddressLine3State === "success"}
                        //error={regData.orgAddressLine3State === "error"}
                        error={regData.orgAddressLine3State}
                        labelText="Address Line 3"
                        id="add3"
                        value={addLine3}
                        name={addLine3Name}
                        onChange={(e) => regData.GetLocation("addLineName", '', e)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <Dropdown labelText="Country" id="OrganizationDTO.countryId" required={true} disabled={regData.disabled} lstObject={regData.LocationDTO.Country} value={countryValue} name={countryName} onChange={(e) => regData.GetLocation('State', '', e)} formControlProps={{ fullWidth: true }} />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <Dropdown labelText="State" id="OrganizationDTO.stateId" required={true} disabled={regData.disabled} lstObject={regData.LocationDTO.State} value={stateValue} name={stateName} onChange={(e) => regData.GetLocation('District', '', e)} formControlProps={{ fullWidth: true }} />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <Dropdown labelText="District" id="OrganizationDTO.districtId" required={true} disabled={regData.disabled} lstObject={regData.LocationDTO.District} value={distValue} name={distName} onChange={(e) => regData.GetLocation('City', '', e)} formControlProps={{ fullWidth: true }} />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <Dropdown labelText="City" id="OrganizationDTO.cityId" required={true} disabled={regData.disabled} lstObject={regData.LocationDTO.City} value={cityValue} name={cityName} onChange={(e) => regData.GetLocation('Pincode', '', e)} formControlProps={{ fullWidth: true }} />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <Dropdown labelText="Pincode" id="OrganizationDTO.pincodeId" disabled={regData.disabled} lstObject={regData.LocationDTO.Pincode} value={pinCodeValue} name={pinCodeName} onChange={(e) => regData.GetLocation('', '', e)} formControlProps={{ fullWidth: true }} />
                </GridItem>
            </GridContainer>
        </GridContainer>

    );
}




export default withStyles(style)(OfficeAddress);