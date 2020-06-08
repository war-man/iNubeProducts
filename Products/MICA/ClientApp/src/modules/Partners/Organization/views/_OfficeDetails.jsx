//node modules
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

//General Components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";

//General Styles
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import officedetails from "assets/img/architecture-and-city.png";
import Icon from "@material-ui/core/Icon"
import Dropdown from "components/Dropdown/Dropdown.jsx";
//Module components
import profileStyles from "./profileStyles.jsx";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";

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
};

const OfficeDetails = (props) => {
    const profileData = props;


    const { classes } = props;

    return (
        <div>
            <Card>
                <CardHeader color="rose" icon>
                    <CardIcon color="rose">

                        <Icon><img id="icon" src={officedetails} /></Icon>

                    </CardIcon>
                    <h4 className={props.cardIconTitle}>
                        <small> <TranslationContainer translationKey="OfficeDetails" /> </small>

                    </h4>
                </CardHeader>
                <CardBody>
                    <GridContainer>
                        <GridItem xs={12} sm={4} md={3}>
                            <Dropdown
                                required={true}
                                labelText="Organization"
                                lstObject={profileData.Organizations}
                                value={profileData.aVOOrgOffice.organizationId}
                                name='organizationId'
                                onChange={(e) => profileData.handleOrgdata(e)}
                                formControlProps={{ fullWidth: true }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={4} md={3}>
                            <Dropdown
                                required={true}
                                labelText="ReportingToOffice"
                                lstObject={profileData.Office}
                                value={profileData.aVOOrgOffice.officeReportingOfficeId}
                                name='officeReportingOfficeId'
                                onChange={(e) => profileData.handleOfficeData(e)}
                                formControlProps={{ fullWidth: true }}
                            />
                        </GridItem>

                    </GridContainer>
                </CardBody>
            </Card>



        </div>
    );
}


OfficeDetails.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(style)(OfficeDetails);