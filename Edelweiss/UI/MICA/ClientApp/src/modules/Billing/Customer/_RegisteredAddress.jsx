import React from "react";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";




const RegisteredAddress = (props) => {
    const prop = props.componentData;
    console.log("props.componentData", prop);

    return (
        <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                    success={prop.addressLine1State === "success"}
                    error={prop.addressLine1State === "error"}
                    disabled={prop.disableView}
                        labelText="AddressLine1"
                    name="addressLine1"
                         required={true}
                    value={prop.regAddress[0].addressLine1}
                    onChange={(e) => prop.SetAddValue("string", e)}
                        formControlProps={{ fullWidth: true }}
                />
                {prop.errormessage && (prop.regAddress[0].addressLine1 == "") ? <p className="error">*Required field cannot be left blank</p> : null}
            </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                    success={prop.addressLine2State === "success"}
                    error={prop.addressLine2State === "error"}
                    disabled={prop.disableView}
                        labelText="AddressLine2"
                    name="addressLine2"
                     //    required={true}
                    value={prop.regAddress[0].addressLine2}
                    onChange={(e) => prop.SetAddValue("string", e)}
                        formControlProps={{ fullWidth: true }}
                />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                    success={prop.addressLine3State === "success"}
                    error={prop.addressLine3State === "error"}
                    disabled={prop.disableView}
                        labelText="AddressLine3"
                    name="addressLine3"
                     //    required={true}
                    value={prop.regAddress[0].addressLine3}
                    onChange={(e) => prop.SetAddValue("string", e)}
                        formControlProps={{ fullWidth: true }}
                />
            </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                <Dropdown labelText="Country" id="custAddress.countryId" required={true} disabled={prop.disableView} lstObject={prop.LocationDTO.Country} value={prop.regAddress[0].countryId} name="countryId" onChange={(e) => prop.GetLocation('State', e)} formControlProps={{ fullWidth: true }} />
                {prop.errormessage && (prop.regAddress[0].countryId == "") ? <p className="error">*Required field cannot be left blank</p> : null}
            </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                <Dropdown labelText="StateProvince" id="custAddress.stateId" required={true} disabled={prop.disableView} lstObject={prop.LocationDTO.State} value={prop.regAddress[0].stateId} name="stateId" onChange={(e) => prop.GetLocation('District', e)} formControlProps={{ fullWidth: true }} />
           {prop.errormessage && (prop.regAddress[0].stateId == "") ? <p className="error">*Required field cannot be left blank</p> : null}
            </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                <Dropdown labelText="DistrictArea" id="custAddress.districtId" required={true} disabled={prop.disableView} lstObject={prop.LocationDTO.District} value={prop.regAddress[0].districtId} name="districtId" onChange={(e) => prop.GetLocation('City', e)} formControlProps={{ fullWidth: true }} />
            {prop.errormessage && (prop.LocationDTO.District == "") ? <p className="error">*Required field cannot be left blank</p> : null}
            </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                <Dropdown labelText="City" id="custAddress.cityId" required={true} disabled={prop.disableView} lstObject={prop.LocationDTO.City} value={prop.regAddress[0].cityId} name="cityId" onChange={(e) => prop.GetLocation('Pincode', e)} formControlProps={{ fullWidth: true }} />
            {prop.errormessage && (prop.regAddress[0].cityId == "") ? <p className="error">*Required field cannot be left blank</p> : null}
            </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                <Dropdown labelText="Pincode" id="custAddress.pincodeId" required={true} disabled={prop.disableView} lstObject={prop.LocationDTO.Pincode} value={prop.regAddress[0].pincodeId} name="pincodeId" onChange={(e) => prop.GetLocation('', e)} formControlProps={{ fullWidth: true }} />
           {prop.errormessage && (prop.regAddress[0].pincodeId == "") ? <p className="error">*Required field cannot be left blank</p> : null}
            </GridItem>

        </GridContainer>
    );
}




export default RegisteredAddress;