import React from "react";
import FilterNone from "@material-ui/icons/FilterNone";
import PropTypes from "prop-types";

// @material-ui/core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import profileStyles from "./profileStyles.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import profileDetails from "assets/img/profile-details.png";
import Icon from "@material-ui/core/Icon";
import Button from "../../../../components/CustomButtons/Button";
import Modal from '@material-ui/core/Modal';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import { TRANSLATIONS } from 'components/Translation/constants/translations';
import Dropdown from "components/Dropdown/Dropdown.jsx";
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
};

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: '60%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',

    },
});

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: "#00acc1",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const modalStyles = {
    position: 'absolute',
    top: '10%',
    left: '10%',
    right: '10%',
    transform: 'translate(-25 %, -25%)',
    backgroundColor: 'white',
    width: 'auto',
    height: 'auto',
    borderRadius: '8px',
    paddingBottom: '5px',
    paddingRight: '2px',
    'max-height': 'calc(100vh - 210px)', 'overflow-y': 'auto'
};

const searchBtn = {
    margintop: '4px',
    width: '160px',
    height: '35px',
    textalign: 'left',
    marginleft: '167%'
}

const modalSearch = {
    margin: "0px auto",
    height: "25px",
    textAlign: "center",
    width: "65px",
    padding: "1px"
}

const okBtn = {
    marginLeft: "527px",
    height: "25px",
    textAlign: "center",
    width: "65px",
    padding: "1px"
}

const styletable = {
    marginLeft: "300px",
}

const view = {
    marginLeft: "600px",
    height: "25px",
    textAlign: "center",
    width: "65px",
    padding: "1px"

}

const edit = {
    height: "25px",
    textAlign: "center",
    width: "65px",
    padding: "1px"
}

const searchClose = {
    float: "right",
    position: 'relative',
    bottom: "56px",
    width: "26px",
    height: "28px",
    borderRadius: "4px",
    fontSize: "larger",
    padding: "0px",
    right: '10px',

}

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
                        <small><TranslationContainer translationKey="OrganizationDetails" />  </small>
                    </h4>
                </CardHeader>
                <CardBody>

                    <GridContainer>
                        <GridItem xs={12} sm={4} md={3}>
                            <div>
                                <MasterDropdown
                                    labelText="OrganizationCategory" id="OrganizationDTO.orgCategoryId" disabled={profileData.disabled} value={props.OrganizationDTO.orgCategoryId} lstObject={profileData.masterList} filterName='OrgCategory' model="OrganizationDTO" name='orgCategoryId' onChange={(e) => profileData.SetValue("orgCategoryId", e)} formControlProps={{ fullWidth: true }} />
                            </div>
                        </GridItem>
                        <GridItem xs={12} sm={4} md={3}>
                            <MasterDropdown labelText="OrganizationType" id="OrganizationDTO.orgTypeId" disabled={profileData.disabled} value={props.OrganizationDTO.orgTypeId} lstObject={profileData.masterList} filterName='OrgType' model="OrganizationDTO" name='orgTypeId' onChange={(e) => profileData.SetValue("orgTypeId", e)} formControlProps={{ fullWidth: true }} />
                        </GridItem>
                        <GridItem xs={12} sm={4} md={3}>
                            <MasterDropdown labelText="OrganizationConfiguartion" id="OrganizationDTO.orgTypeId" disabled={profileData.disabled} value={props.OrganizationDTO.configurationTypeId} lstObject={profileData.masterList} filterName='OrgConfigType' model="OrganizationDTO" name='configurationTypeId' onChange={(e) => profileData.SetValue("configurationTypeId", e)} formControlProps={{ fullWidth: true }} />
                        </GridItem>
                        <GridItem xs={12} sm={4} md={3}>
                            <CustomInput
                                disabled={profileData.disabled}
                                error={props.orgNameState}
                                labelText="OrganizationName"
                                id="orgname"
                                required={true}
                                value={props.OrganizationDTO.orgName}
                                name="orgName"
                                onChange={(e) => profileData.SetValue("name", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={4} md={3}>
                            <CustomInput
                                disabled={profileData.disabled}
                                error={props.orgWebsiteState}
                                labelText="WebSite"
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

                        <GridItem xs={12} sm={4} md={3}>
                            <CustomInput
                                disabled={profileData.disabled}
                                error={props.orgPhoneNoState}
                                labelText="PhoneNumber"
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

                        <GridItem xs={12} sm={4} md={3}>
                            <CustomInput
                                disabled={profileData.disabled}
                                error={props.orgFaxNoState}
                                labelText="FaxNumber"
                                required={true}
                                id="faxNo"
                                value={props.OrganizationDTO.orgFaxNo}
                                name="orgFaxNo"
                                onChange={(e) => profileData.SetValue("faxno", e)}
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
