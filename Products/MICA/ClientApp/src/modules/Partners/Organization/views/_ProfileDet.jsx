import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import profileDetails from "assets/img/profile-details.png";
import Icon from "@material-ui/core/Icon";

const ProfileDet = (props) => {
    const profileData = props;
    return (
        <div>
            <Card>
                <CardHeader color="rose" icon>
                    <CardIcon color="rose">
                        { /*  <FilterNone /> */}

                       <Icon><img id="icon" src={profileDetails} /></Icon>

                    </CardIcon>
                    <h4>
                        <small> Profile Details </small>
                    </h4>
                </CardHeader>
                <CardBody>
                    
                    <GridContainer>
                        <GridItem xs={12} sm={4}>
                            <div>
                                <MasterDropdown labelText="Organization Category" id="OrganizationDTO.orgCategoryId" disabled={profileData.disabled} value={props.OrganizationDTO.orgCategoryId} lstObject={profileData.masterList} filterName='OrgCategory' model="OrganizationDTO" name='orgCategoryId' onChange={(e) => profileData.SetValue("orgCategoryId", e)} formControlProps={{ fullWidth: true }} />
                            </div>
                        </GridItem>
                        <GridItem xs={12} sm={4}>
                            <MasterDropdown labelText="Organization Type" id="OrganizationDTO.orgTypeId" disabled={profileData.disabled} value={props.OrganizationDTO.orgTypeId} lstObject={profileData.masterList} filterName='OrgType' model="OrganizationDTO" name='orgTypeId' onChange={(e) => profileData.SetValue("orgTypeId", e)} formControlProps={{ fullWidth: true }} />
                        </GridItem>
                        {/*  <GridItem xs={12} sm={4}>
                            <MasterDropdown labelText="Organization Configuartion" id="OrganizationDTO.orgTypeId" disabled={profileData.disabled} value={props.OrganizationDTO.configurationTypeId} lstObject={profileData.masterList} filterName='OrgConfigType' model="OrganizationDTO" name='configurationTypeId' onChange={(e) => profileData.SetValue("configurationTypeId",e)} formControlProps={{ fullWidth: true }} />
                        </GridItem> */}
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                disabled={profileData.disabled}
                                success={props.orgNameState == "success"}
                                error={props.orgNameState == "error"}
                                labelText="Organization Name"
                                id="orgname"
                                value={props.OrganizationDTO.orgName}
                                name="orgName"
                                onChange={(e) => profileData.SetValue("name", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                disabled={profileData.disabled}
                                success={props.orgWebsiteState == "success"}
                                error={props.orgWebsiteState == "error"}
                                labelText="Web Site"
                                required={true}
                                id="webSite"
                                value={props.OrganizationDTO.orgWebsite}
                                name="orgWebsite"
                                onChange={(e) => profileData.SetValue("Url", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                disabled={profileData.disabled}
                                success={props.orgPhoneNoState == "success"}
                                error={props.orgPhoneNoState == "error"}
                                labelText="Phone Number"
                                required={true}
                                id="phoneNo"
                                value={props.OrganizationDTO.orgPhoneNo}
                                name="orgPhoneNo"
                                onChange={(e) => profileData.SetValue("number", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                disabled={profileData.disabled}
                                success={props.orgFaxNoState == "success"}
                                error={props.orgFaxNoState == "error"}
                                labelText="Fax Number"
                                required={true}
                                id="faxNo"
                                value={props.OrganizationDTO.orgFaxNo}
                                name="orgFaxNo"
                                onChange={(e) => profileData.SetValue("faxno",e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>
                    </GridContainer>
                </CardBody>
            </Card>
        </div>
    );
}
ProfileDet.propTypes = {
    classes: PropTypes.object.isRequired
};

export default ProfileDet;
