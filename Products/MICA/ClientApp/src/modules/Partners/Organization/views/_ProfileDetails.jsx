import React from "react";
import FilterNone from "@material-ui/icons/FilterNone";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import profileStyles from "./profileStyles.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import CreatePartner from "assets/img/group.png";
import Icon from "@material-ui/core/Icon";
import $ from 'jquery';
import Button from "../../../../components/CustomButtons/Button";

import {Animated} from "react-animated-css";

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

const partnerName = {
    marginTop: "-59px",
    marginLeft: "75px"
}

const solutation = {
    marginTop: "40px"
}

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

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
    marginTop: "-31px",
    width: "120px",
    height: "35px",
    textAlign: "center",
    marginLeft: "167%"
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

const ProfileDetails = (props) => {
    const profileData = props;
    var addType = 'prof';
    console.log("Type of" + props.PartnerDTO.partnerTypeId);
    console.log("props in pd", props.isdisable);
    console.log("view properties" + props.PartnerDTO.par);
    return (
        <div>
            <Card>
                <CardHeader color="rose" icon>
                    <CardIcon color="rose">
                        { /*  <FilterNone /> */}
                        <Icon><img id="icon" src={CreatePartner} /></Icon>

                    </CardIcon>
                    <h4>
                        <small> Partner Details</small>
                    </h4>
                </CardHeader>
                <CardBody>
               
                    <GridContainer>
                        
                        <GridItem xs={12} sm={4} md={3}>
                            <MasterDropdown labelText="Partner Type" required={true} disabled={props.disabled} success={props.partnerTypeIdState === "success"} error={props.partnerTypeIdState === "error"} id="PartnerDTO.partTypeId" value={props.PartnerDTO.partnerTypeId} lstObject={profileData.masterList} filterName='PartnerType' model="PartnerDTO" name='partnerTypeId' onChange={(e) => profileData.SetValue("dropdown", e)} formControlProps={{ fullWidth: true }} />
                            
                             {props.errormessage && (props.PartnerDTO.partnerTypeId == "") ? <span className="error">*Required field data is missing</span> : null}
                        </GridItem>
                        <GridItem xs={12} sm={4} md={3}>
                            <MasterDropdown labelText="Partner Class" required={true} disabled={props.disabled} success={props.partnerClassIdState} error={props.partnerClassIdState} id="PartnerDTO.partClassId" value={props.PartnerDTO.partnerClassId} lstObject={profileData.masterList} filterName='PartnerClass' model="PartnerDTO" name='partnerClassId' onChange={(e) => profileData.SetValue("dropdown", e)} formControlProps={{ fullWidth: true }} />
                            
                             {props.errormessage && (props.PartnerDTO.partnerClassId == "") ? <span className="error">*Required field data is missing</span> : null}
                        </GridItem>
                        <GridItem xs={12} sm={4} md={3}>
                            <MasterDropdown labelText="Salutation" required={true} disabled={props.disabled} success={props.salutationIdState} error={props.salutationIdState} id="PartnerDTO.salutationId" value={props.PartnerDTO.salutationId} lstObject={profileData.masterList} filterName='Salutation' model="PartnerDTO" name='salutationId' onChange={(e) => profileData.SetValue("dropdown", e)} formControlProps={{ fullWidth: true }} />
                            
                            {props.errormessage && (props.PartnerDTO.salutationId == "") ? <span className="error">*Required field data is missing</span> : null}
                            {/*  <p className="errorMsg">{props.errors.salutationId}</p>*/}
                        </GridItem>
                        <GridItem xs={12} sm={4} md={3}>

                            <CustomInput
                                disabled={props.disabled}
                                success={props.partnerNameState === "success"}
                                error={props.partnerNameState === "error"}
                                labelText="Partner Name"
                                required={true}
                                id="partnerNmae"
                                value={props.PartnerDTO.partnerName}
                                name="partnerName"
                                onChange={(event) => profileData.SetValue("partnerName", event)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            {props.errormessage && (props.PartnerDTO.partnerName == "") ? <span className="error">*Required field data is missing</span> : null}
                            {/* <p className="errorMsg">{props.errors.partnerName}</p>*/}
                        </GridItem>
                        <GridItem xs={12} sm={4} md={3}>
                            <CustomInput
                                disabled={props.disabled}
                                success={props.telephoneState === "success"}
                                error={props.telephoneState === "error"}
                                labelText="Telephone"
                                id="telephone"
                                value={props.PartnerDTO.telephone}
                                name="telephone"
                                onChange={(event) => profileData.SetValue("telephone", event)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={4} md={3}>
                            <CustomInput
                                disabled={props.disabled}
                                success={props.mobileState === "success"}
                                error={props.mobileState === "error"}
                                labelText="Mobile Number"
                                required={true}
                                id="mobile"
                                value={props.PartnerDTO.mobile}
                                name="mobile"
                                onChange={(event) => profileData.SetValue("number", event)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            {props.errormessage && (props.PartnerDTO.mobile == "") ? <span className="error">*Required field data is missing</span> : null}
                            {/*  <p className="errorMsg">{props.errors.mobile}</p>*/}
                        </GridItem>
                        <GridItem xs={12} sm={4} md={3}>
                            <CustomInput
                                disabled={props.disabled}
                                success={props.emailState === "success"}
                                error={props.emailState === "error"}
                                labelText="Email"
                                required={true}
                                id="email"
                                value={props.PartnerDTO.email}
                                name="email"
                                onChange={(event) => profileData.SetValue("email", event)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            {props.errormessage && (props.PartnerDTO.email == "") ? <span className="error">*Required field data is missing</span> : null}
                            {/* <p className="errorMsg">{props.errors.email}</p>*/}
                        </GridItem>
                        <GridItem xs={12} sm={4} md={3}>
                            <CustomInput
                                disabled={props.disabled}
                                success={props.panState === "success"}
                                error={props.panState === "error"}
                                labelText="PAN"
                                required={true}
                                id="pan"
                                value={props.PartnerDTO.pan}
                                name="pan"
                                onChange={(event) => profileData.SetValue("pan", event)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            {props.errormessage && (props.PartnerDTO.pan == "") ? <span className="error">*Required field data is missing</span> : null}
                            {/*  <p className="errorMsg">{props.errors.pan}</p>*/}
                        </GridItem>
                        <GridItem xs={12} sm={4} md={3}>
                            <CustomInput
                                disabled={props.disabled}
                                success={props.websiteState === "success"}
                                error={props.websiteState === "error"}
                                labelText="Website"
                                required={true}
                                id="website"
                                value={props.PartnerDTO.website}
                                name="website"
                                onChange={(event) => profileData.SetValue("Url", event)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            {props.errormessage && (props.PartnerDTO.website == "") ? <span className="error">*Required field data is missing</span> : null}
                            {/*<p className="errorMsg">{props.errors.website}</p>*/}
                        </GridItem>

                    </GridContainer>
                    
                </CardBody>
            </Card>
        </div>
    );

}
ProfileDetails.propTypes = {
    classes: PropTypes.object.isRequired
};

export default ProfileDetails;