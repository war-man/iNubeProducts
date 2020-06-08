import React from "react";

// @material-ui/core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import withStyles from "@material-ui/core/styles/withStyles";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";

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
    const regData = props.componentData;
    const data = props.componentName;
    const { classes } = props;
    var addType;
    var countryValue, stateValue, distValue, cityValue, pinCodeValue, addLine1, addLine2, addLine3;
    var countryName, stateName, distName, cityName, pinCodeName, addLine1Name, addLine2Name, addLine3Name;
    var Country = [];
    var State = [];
    var District = [];
    var City = [];
    var Pincode = [];
    var lblmsg = '';
    if (data == "permAddress") {
        Country = regData.LocationDTO.Country;
        State = regData.LocationDTO.State;
        District = regData.LocationDTO.District;
        City = regData.LocationDTO.City;
        Pincode = regData.LocationDTO.Pincode;
        addType = 'perm';
        countryValue = regData.avoOrgEmpAddress.perm.empCountryId;
        stateValue = regData.avoOrgEmpAddress.perm.empStateId;
        distValue = regData.avoOrgEmpAddress.perm.empDistrictId;
        cityValue = regData.avoOrgEmpAddress.perm.empCityId;
        pinCodeValue = regData.avoOrgEmpAddress.perm.empPincodeId;
        addLine1 = regData.avoOrgEmpAddress.perm.empAddressLine1;
        addLine2 = regData.avoOrgEmpAddress.perm.empAddressLine2;
        addLine3 = regData.avoOrgEmpAddress.perm.empAddressLine3;
    } else if (data == "commAddress") {
        Country = regData.LocationDTO.RCountry;
        State = regData.LocationDTO.RState;
        District = regData.LocationDTO.RDistrict;
        City = regData.LocationDTO.RCity;
        Pincode = regData.LocationDTO.RPincode;
        addType = 'comm';
        lblmsg = 'Permanent Address same as Communication Address';
        countryValue = regData.avoOrgEmpAddress.comm.empCountryId;
        stateValue = regData.avoOrgEmpAddress.comm.empStateId;
        distValue = regData.avoOrgEmpAddress.comm.empDistrictId;
        cityValue = regData.avoOrgEmpAddress.comm.empCityId;
        pinCodeValue = regData.avoOrgEmpAddress.comm.empPincodeId;
        addLine1 = regData.avoOrgEmpAddress.comm.empAddressLine1;
        addLine2 = regData.avoOrgEmpAddress.comm.empAddressLine2;
        addLine3 = regData.avoOrgEmpAddress.comm.empAddressLine3;
    }
    if (data == "permAddress" || data == "commAddress") {
        countryName = 'empCountryId';
        stateName = 'empStateId';
        distName = 'empDistrictId';
        cityName = 'empCityId';
        pinCodeName = 'empPincodeId';
        addLine1Name = 'empAddressLine1';
        addLine2Name = 'empAddressLine2';
        addLine3Name = 'empAddressLine3';
    }

    return (
        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>

            <GridContainer>
                {(data == "commAddress") ?
                    <GridItem>
                        <GridItem xs={12} sm={12} md={12}>

                            <div>
                                <GridContainer xl={12}>
                                    <GridItem xl={12} xs={12} sm={12} md={12}>
                                        <label id="radioButtonText"> {lblmsg}</label> &nbsp;&nbsp;&nbsp;
                            <FormControlLabel
                                            control={
                                                <Radio
                                                    disabled={regData.radiodisable}
                                                    checked={regData.avoOrgEmpAddress.permSelectedValue == "0"}
                                                    onChange={regData.handleAddressRadioChange}
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
                                        //label={<TranslationContainer translationKey="Yes" />}
                                        />
                                        <FormControlLabel
                                            control={
                                                <Radio
                                                    disabled={regData.radiodisable}
                                                    checked={regData.avoOrgEmpAddress.permSelectedValue == "1"}
                                                    onChange={regData.handleAddressRadioChange}
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
                                        //label={<TranslationContainer translationKey="No" />}
                                        />
                                    </GridItem>
                                </GridContainer>
                            </div>
                        </GridItem>
                    </GridItem> : ""}
                <GridContainer id="regAddress" disabled={true}>
                    <GridItem xs={12} sm={4} md={4}>
                        <CustomInput
                            disabled={regData.disable}
                            //success={regData.orgAddressLine1State == "success"}
                            //error={regData.orgAddressLine1State == "error"}
                            error={regData.userAddressLine1State}
                            labelText="AddressLine1"
                            id="add1"
                            value={addLine1}
                            required={true}
                            name={addLine1Name}
                            onChange={(e) => regData.GetLocation("string", addType, e)}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={4} md={4}>
                        <CustomInput
                            disabled={regData.disable}
                            //success={regData.orgAddressLine2State == "success"}
                            //error={regData.orgAddressLine2State == "error"}
                            //error={regData.userAddressLine2State}
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

                    <GridItem xs={12} sm={4} md={4}>
                        <CustomInput
                            disabled={regData.disable}
                            //success={regData.orgAddressLine3State == "success"}
                            //error={regData.orgAddressLine3State == "error"}
                            //error={regData.userAddressLine3State}
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

                    <GridItem xs={12} sm={4} md={4}>
                        <Dropdown labelText="Country" id="User.countryId" disabled={regData.disable} required={true} lstObject={Country} value={countryValue} name={countryName} onChange={(e) => regData.GetLocation('State', addType, e)} formControlProps={{ fullWidth: true }} />
                    </GridItem>

                    <GridItem xs={12} sm={4} md={4}>
                        <Dropdown labelText="State" id="User.stateId" disabled={regData.disable} required={true} lstObject={State} value={stateValue} name={stateName} onChange={(e) => regData.GetLocation('District', addType, e)} formControlProps={{ fullWidth: true }} />
                    </GridItem>

                    <GridItem xs={12} sm={4} md={4}>
                        <Dropdown labelText="District" id="User.districtId" disabled={regData.disable} required={true} lstObject={District} value={distValue} name={distName} onChange={(e) => regData.GetLocation('City', addType, e)} formControlProps={{ fullWidth: true }} />
                    </GridItem>

                    <GridItem xs={12} sm={4} md={4}>
                        <Dropdown labelText="City" id="User.cityId" required={true} disabled={regData.disable} lstObject={City} value={cityValue} name={cityName} onChange={(e) => regData.GetLocation('Pincode', addType, e)} formControlProps={{ fullWidth: true }} />
                    </GridItem>

                    <GridItem xs={12} sm={4} md={4}>
                        <Dropdown labelText="Pincode" id="User.pincodeId" disabled={regData.disable} lstObject={Pincode} value={pinCodeValue} name={pinCodeName} onChange={(e) => regData.GetLocation('', addType, e)} formControlProps={{ fullWidth: true }} />
                    </GridItem>
                </GridContainer>
            </GridContainer>
        </Animated>
    );
}
export default withStyles(style)(RegAddress);