import React from "react";
import Radio from "@material-ui/core/Radio";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import Treaty from "assets/img/Treaty.png";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Modal from '@material-ui/core/Modal';
import AddTreaty from "modules/Reinsurance/views/AddTreaty.jsx";
import TPDetails from "modules/Reinsurance/views/_TPDetails.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import MenuItem from "@material-ui/core/MenuItem";
import ReactTable from 'components/MuiTable/MuiTable.jsx';
import { Animated } from "react-animated-css";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import validationPage from "modules/Accounts/views/ValidationPage.jsx";

const searchClose = {
    float: "right",
    position: 'relative',
    width: "26px",
    height: "28px",
    borderRadius: "4px",
    fontSize: "larger",
    padding: "0px",
    right: '10px',

};
const radioAlign = {
    margin: "0 auto",
    textAlign: "center"
};
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

const TreatyDetails = (props) => {
    console.log("TreatyConfig props: ", props);
    const { classes } = props;
    return (

        <Card >
            <CardHeader color="rose" icon>
                <CardIcon color="rose">
                    <Icon><img id="icon" src={Treaty} /></Icon>
                </CardIcon>
                {
                    <h4 >
                        <small><TranslationContainer translationKey="CreateTreaty" /> </small>
                    </h4>
                }
            </CardHeader>

            <CardBody>
                <GridContainer lg={12} justify="center">
                    <GridItem xs={12} sm={12} md={6} style={radioAlign}>


                        <FormControlLabel
                            control={
                                <Radio
                                    checked={true}
                                    onChange={props.handleRadioChange}
                                    value="1001"
                                    name="radio button demo"
                                    aria-label="B"
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
                            label={<TranslationContainer translationKey="Proportional" />}

                        />

                        <FormControlLabel
                            control={
                                <Radio
                                    checked={false}
                                    onChange={props.handleRadioChange}
                                    value="1002"
                                    name="radio button demo"
                                    aria-label="B"
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
                            label={<TranslationContainer translationKey="NonProportional" />}
                        />
                    </GridItem>

                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                            labelText="TreatyCode"
                            id="TreatyCode"
                            required={true}
                            error={props.treatyCodeState}
                            value={props.treatyDTO.treatyCode}
                            name='treatyCode'
                            //onChange={e => props.onInputChange(e)}
                            onChange={evt => props.onInputChange("alphaNumeric", evt)}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                            labelText="TreatyDescription"
                            id="TreatyDescription"
                            value={props.treatyDTO.treatyDescription}
                            name='treatyDescription'
                            required={true}
                            error={props.treatyDescriptionState}
                            //onChange={e => props.onInputChange(e)}
                            onChange={evt => props.onInputChange("alphaNumeric", evt)}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <MasterDropdown
                            labelText="TreatyType"
                            id="ddlstatus"
                            lstObject={props.masterList}
                            filterName='TreatyType'
                            required={true}
                            value={props.treatyDTO.treatyTypeId}
                            name='treatyTypeId'
                            //onChange={e => props.onInputChange(e)}
                            onChange={evt => props.onInputChange1(evt)}
                            formControlProps={{ fullWidth: true }} />
                    </GridItem>


                    <GridItem xs={12} sm={12} md={3}>
                        <MasterDropdown
                            labelText="TreatyYear"
                            id="ddlstatus"
                            lstObject={props.yearmasterList}
                            filterName='Year'
                            required={true}
                            value={props.treatyDTO.treatyYearId}
                            name='treatyYearId'
                            //onChange={e => props.onInputChange(e)}
                            onChange={evt => props.onInputChange1(evt)}
                            formControlProps={{ fullWidth: true }} />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={3}>


                        <CustomDatetime
                            //  success={this.state.billingStartDateState === "success"}
                            //  error={this.state.billingStartDateState === "error"}
                            required={true}
                            //onFocus={this.state.onClick}
                            labelText="StartDate"
                            id='StartDate'
                            name='startDate'
                            onChange={(evt) => props.onDateChange('startDate', evt)}
                            value={props.treatyDTO.startDate}
                            formControlProps={{ fullWidth: true }} />

                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>


                        <CustomDatetime
                            //  success={this.state.billingStartDateState === "success"}
                            //  error={this.state.billingStartDateState === "error"}
                            required={true}
                            //onFocus={this.state.onClick}
                            labelText="EndDate"
                            id='EndDate'
                            name='endDate'
                            onChange={(evt) => props.onDateChange('endDate', evt)}
                            value={props.treatyDTO.endDate}
                            formControlProps={{ fullWidth: true }} />

                    </GridItem>

                    <GridItem xs={12} sm={12} md={3}>
                        <MasterDropdown
                            labelText="TreatyBasis"
                            id="ddlstatus"
                            lstObject={props.masterList}
                            filterName='TreatyBasis'
                            value={props.treatyDTO.treatyBasisId}
                            name='treatyBasisId'
                            onChange={evt => props.onInputChange1(evt)}
                            formControlProps={{ fullWidth: true }} />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={3}>
                        <MasterDropdown
                            labelText="AccountingTo"
                            id="ddlstatus"
                            lstObject={props.masterList}
                            filterName='TreatyAccountingTo'
                            value={props.treatyDTO.accountingToId}
                            name='accountingToId'
                            //onChange={e => props.onInputChange(e)}
                            onChange={evt => props.onInputChange1(evt)}
                            formControlProps={{ fullWidth: true }} />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={3}>
                        <MasterDropdown
                            labelText="Currency"
                            id="ddlstatus"
                            lstObject={props.masterList}
                            filterName='Currency'
                            required={true}
                            value={props.treatyDTO.currencyId}
                            name='currencyId'
                            onChange={evt => props.onInputChange1(evt)}
                            formControlProps={{ fullWidth: true }} />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={3}>
                        <MasterDropdown
                            labelText="BordereauxFrequency"
                            id="ddlstatus"
                            lstObject={props.masterList}
                            filterName='Bordereaux Frequency'
                            required={true}
                            value={props.treatyDTO.borderauxFreqId}
                            name='borderauxFreqId'
                            onChange={evt => props.onInputChange1(evt)}
                            formControlProps={{ fullWidth: true }} />
                    </GridItem>



                    <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                            labelText="Remarks"
                            id="remarks"
                            value={props.treatyDTO.remarks}
                            name='remarks'
                            onChange={evt => props.onInputChange("alphaNumeric", evt)}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                    <GridContainer>


                    </GridContainer>

                </GridContainer>

            </CardBody>



        </Card>

    );

}

export default withStyles(style)(TreatyDetails);