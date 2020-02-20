import React from "react";

// @material-ui/core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";
//import PinCodeModal from "./_PinCodeModal";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import withStyles from "@material-ui/core/styles/withStyles";
import $ from 'jquery';
import CreatePartner from "./CreatePartner";
import CommonMessage from "Messages/CommonMessage.jsx";


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




const RegAddress = (props) => {
    //console.log("peops coimng", props);
    const regData = props.componentData;

    const data = props.componentName;
    //console.log("peops coimng data", data);
    //console.log(regData);
    console.log('props',props);
    const { classes } = props;
    var addType;
    var countryValue, stateValue, distValue, cityValue, pinCodeValue, addLine1, addLine2, addLine3;
    var countryName, stateName, distName, cityName, pinCodeName, addLine1Name, addLine2Name, addLine3Name;
    var lblmsg = '';
    var Country = [];
    var State = [];
    var District = [];
    var City = [];
    var Pincode = [];
    //if (data == "cAddress") {
    //    addType = 'corp';
    //    lblmsg = 'Corporate Address same as Registered Address';
    //    countryValue = regData.addressDTO.corp.orgCountryId; 
    //    stateValue = regData.addressDTO.corp.orgStateId;
    //    distValue = regData.addressDTO.corp.orgDistrictId;
    //    cityValue = regData.addressDTO.corp.orgCityId;
    //    pinCodeValue = regData.addressDTO.corp.orgPincodeId;
    //    addLine1 = regData.addressDTO.corp.orgAddressLine1;
    //    addLine2 = regData.addressDTO.corp.orgAddressLine2;
    //    addLine3 = regData.addressDTO.corp.orgAddressLine3;

    //} else if (data == "mAddress") {
    //    addType = 'mail';
    //    countryValue = regData.addressDTO.mail.orgCountryId;
    //    stateValue = regData.addressDTO.mail.orgStateId;
    //    distValue = regData.addressDTO.mail.orgDistrictId;
    //    cityValue = regData.addressDTO.mail.orgCityId;
    //    pinCodeValue = regData.addressDTO.mail.orgPincodeId;
    //    addLine1 = regData.addressDTO.mail.orgAddressLine1;
    //    addLine2 = regData.addressDTO.mail.orgAddressLine2;
    //    addLine3 = regData.addressDTO.mail.orgAddressLine3;

    //} else if (data == "rAddress") {
    //    addType = 'reg';
    //    //console.log(regData);
    //    countryValue = regData.addressDTO.reg.orgCountryId;
    //    stateValue = regData.addressDTO.reg.orgStateId;
    //    distValue = regData.addressDTO.reg.orgDistrictId;
    //    cityValue = regData.addressDTO.reg.orgCityId;
    //    pinCodeValue = regData.addressDTO.reg.orgPincodeId;
    //    addLine1 = regData.addressDTO.reg.orgAddressLine1;
    //    addLine2 = regData.addressDTO.reg.orgAddressLine2;
    //    addLine3 = regData.addressDTO.reg.orgAddressLine3;
    //}
    //else if (data == "offAddress") {
    //    addType = 'off';
    //    //console.log("regdata",regData);
    //    countryValue = regData.addressDTO.off.officeCountryId;
    //    stateValue = regData.addressDTO.off.officeStateId;
    //    distValue = regData.addressDTO.off.officeDistrictId;
    //    cityValue = regData.addressDTO.off.officeCityId;
    //    pinCodeValue = regData.addressDTO.off.officePincodeId;
    //    addLine1 = regData.addressDTO.off.officeAddressLine1;
    //    addLine2 = regData.addressDTO.off.officeAddressLine2;
    //    addLine3 = regData.addressDTO.off.officeAddressLine3;
    //    //console.log("value off", countryValue);
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
    //else if (data == "pCorpAddress") {
    if (data == "pCorpAddress") {
        addType = 'corp';
        Country = regData.LocationDTO.Country;
        State = regData.LocationDTO.State;
        District = regData.LocationDTO.District;
        City = regData.LocationDTO.City;
        Pincode = regData.LocationDTO.Pincode;
        //console.log(regData);
        countryValue = regData.addressDTO.corp.partnerCountryId;
        stateValue = regData.addressDTO.corp.partnerStateId;
        distValue = regData.addressDTO.corp.partnerDistrictId;
        cityValue = regData.addressDTO.corp.partnerCityId;
        pinCodeValue = regData.addressDTO.corp.partnerPincodeId;
        addLine1 = regData.addressDTO.corp.partnerAddressLine1;
        addLine2 = regData.addressDTO.corp.partnerAddressLine2;
        addLine3 = regData.addressDTO.corp.partnerAddressLine3;
    } else if (data == "pOffAddress") {
        addType = 'off';
        Country = regData.LocationDTO.RCountry;
        State = regData.LocationDTO.RState;
        District = regData.LocationDTO.RDistrict;
        City = regData.LocationDTO.RCity;
        Pincode = regData.LocationDTO.RPincode;
        lblmsg = 'Office Address same as Corporate Address';
        //console.log(regData);
        countryValue = regData.addressDTO.off.partnerCountryId;
        stateValue = regData.addressDTO.off.partnerStateId;
        distValue = regData.addressDTO.off.partnerDistrictId;
        cityValue = regData.addressDTO.off.partnerCityId;
        pinCodeValue = regData.addressDTO.off.partnerPincodeId;
        addLine1 = regData.addressDTO.off.partnerAddressLine1;
        addLine2 = regData.addressDTO.off.partnerAddressLine2;
        addLine3 = regData.addressDTO.off.partnerAddressLine3;
    }
    //if (data == "rAddress" || data == "mAddress" || data == "cAddress") {
    //    countryName = 'orgCountryId';
    //    stateName = 'orgStateId';
    //    distName = 'orgDistrictId';
    //    cityName = 'orgCityId';
    //    pinCodeName = 'orgPincodeId';
    //    addLine1Name = 'orgAddressLine1';
    //    addLine2Name = 'orgAddressLine2';
    //    addLine3Name = 'orgAddressLine3';
    //} else if (data == "spocDet") {
    //    countryName = 'spoccountryId';
    //    stateName = 'spocstateId';
    //    distName = 'spocdistrictId';
    //    cityName = 'spoccityId';
    //    pinCodeName = 'spocpincodeId';
    //    addLine1Name = 'spocaddressLine1';
    //    addLine2Name = 'spocaddressLine2';
    //    addLine3Name = 'spocaddressLine3';
    //} else if (data == "pCorpAddress" || data == "pOffAddress") {
    if (data == "pCorpAddress" || data == "pOffAddress") {
        countryName = 'partnerCountryId';
        stateName = 'partnerStateId';
        distName = 'partnerDistrictId';
        cityName = 'partnerCityId';
        pinCodeName = 'partnerPincodeId';
        addLine1Name = 'partnerAddressLine1';
        addLine2Name = 'partnerAddressLine2';
        addLine3Name = 'partnerAddressLine3';
    }
    //} else if (data == "offAddress") {
    //    countryName = 'officeCountryId';
    //    stateName = 'officeStateId';
    //    distName = 'officeDistrictId';
    //    cityName = 'officeCityId';
    //    pinCodeName = 'officePincodeId';
    //    addLine1Name = 'officeAddressLine1';
    //    addLine2Name = 'officeAddressLine2';
    //    addLine3Name = 'officeAddressLine3';
    //}
    console.log(countryValue);

    return (
        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
            <GridContainer lg={12}>
                {(data == "cAddress" || data == "pOffAddress") ?
                    <GridContainer lg={12} >

                        <GridItem spacing={2} xs={12} sm={12} md={12} lg={12}>
                            <label id="radioButtonText"> {lblmsg}</label>  &nbsp;
                      
                    <FormControlLabel
                                control={
                                    <Radio
                                        disabled={regData.viewEditFlag}
                                        checked={regData.addressDTO.corpSelectedValue == "0"}
                                        onChange={regData.handleRadioChange}
                                        className="radioChange"
                                        value="0"
                                        name="radio button demo"
                                        aria-label="0"
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
                                label="Yes"
                            />

                            <FormControlLabel
                                control={
                                    <Radio
                                        disabled={regData.viewEditFlag}
                                        checked={regData.addressDTO.corpSelectedValue == "1"}
                                        onChange={regData.handleRadioChange}
                                        value="1"
                                        name="radio button demo"
                                        aria-label="1"
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
                                label="No"
                            />

                        </GridItem>
                    </GridContainer> : ""}
                {data == "mAddress" ?
                    <GridItem xs={12} sm={12} md={12}>
                        <div>
                            <label className="radioButtonText"> Mail Address Same as </label> &nbsp;
                                    <div className={classes.mailAdd} style={radio}>
                                <FormControlLabel
                                    control={
                                        <Radio

                                            checked={regData.addressDTO.mailSelectedValue == "2"}
                                            onChange={regData.handleRadioChange}
                                            value="2"
                                            name="radio button demo"
                                            aria-label="R"
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
                                    label="Register"
                                />

                                <FormControlLabel
                                    control={
                                        <Radio
                                            checked={regData.addressDTO.mailSelectedValue == "3"}
                                            onChange={regData.handleRadioChange}

                                            value="3"
                                            name="radio button demo"
                                            aria-label="C"
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
                                    label="Corporate"
                                />
                                <FormControlLabel
                                    control={
                                        <Radio

                                            checked={regData.addressDTO.mailSelectedValue == "4"}
                                            onChange={regData.handleRadioChange}
                                            value="4"
                                            name="radio button demo"
                                            aria-label="O"
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
                                    label="Others"
                                />
                            </div>
                        </div>
                    </GridItem> : ""}


                <GridContainer id="regAddress" disabled={true}>
                    <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                            disabled={regData.disabled}
                            success={regData.orgAddressLine1State == "success"}
                            error={regData.orgAddressLine1State == "error"}
                            labelText="AddressLine1"
                            id="add1"
                            value={addLine1}
                            required={true}
                            name={addLine1Name}
                            onChange={(e) => regData.GetLocation("addLineName", addType, e)}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                        <span className="error">   {regData.errormessage && (addLine1 == "") ? CommonMessage("RequiredField", []) : null}</span>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                            disabled={regData.disabled}
                            success={regData.orgAddressLine2State == "success"}
                            error={regData.orgAddressLine2State == "error"}
                            labelText="AddressLine2"
                            id="add2"
                            value={addLine2}
                            name={addLine2Name}
                            onChange={(e) => regData.GetLocation("addLineName", addType, e)}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                            disabled={regData.disabled}
                            success={regData.orgAddressLine3State == "success"}
                            error={regData.orgAddressLine3State == "error"}
                            labelText="AddressLine3"
                            id="add3"
                            value={addLine3}
                            name={addLine3Name}
                            onChange={(e) => regData.GetLocation("addLineName", addType, e)}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={4}>
                        <Dropdown labelText="Country" id="OrganizationDTO.countryId" required={true} disabled={regData.disabled} lstObject={Country} value={countryValue} name={countryName} onChange={(e) => regData.GetLocation('State', addType, e)} formControlProps={{ fullWidth: true }} />
                        <span className="error">   {regData.errormessage && (countryValue == "") ? CommonMessage("RequiredField", []) : null}</span>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={4}>
                        <Dropdown labelText="State" id="OrganizationDTO.stateId" required={true} disabled={regData.disabled} lstObject={State} value={stateValue} name={stateName} onChange={(e) => regData.GetLocation('District', addType, e)} formControlProps={{ fullWidth: true }} />
                        <span className="error">   {regData.errormessage && (stateValue == "") ? CommonMessage("RequiredField", []) : null}</span>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={4}>
                        <Dropdown labelText="District" id="OrganizationDTO.districtId" required={true} disabled={regData.disabled} lstObject={District} value={distValue} name={distName} onChange={(e) => regData.GetLocation('City', addType, e)} formControlProps={{ fullWidth: true }} />
                        <span className="error">   {regData.errormessage && (distValue == "") ? CommonMessage("RequiredField", []) : null}</span>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={4}>
                        <Dropdown labelText="City" id="OrganizationDTO.cityId" required={true} disabled={regData.disabled} lstObject={City} value={cityValue} name={cityName} onChange={(e) => regData.GetLocation('Pincode', addType, e)} formControlProps={{ fullWidth: true }} />
                        <span className="error">   {regData.errormessage && (cityValue == "") ? CommonMessage("RequiredField", []) : null}</span>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={4}>
                        <Dropdown labelText="Pincode" id="OrganizationDTO.pincodeId" disabled={regData.disabled} lstObject={Pincode} value={pinCodeValue} name={pinCodeName} onChange={(e) => regData.GetLocation('', addType, e)} formControlProps={{ fullWidth: true }} />
                    </GridItem>
                </GridContainer>

            </GridContainer>
        </Animated>
    );
}




export default withStyles(style)(RegAddress);