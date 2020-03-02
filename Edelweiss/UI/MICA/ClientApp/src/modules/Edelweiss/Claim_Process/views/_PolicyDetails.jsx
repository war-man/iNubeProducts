import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";

import CustomInput from "components/CustomInput/CustomInput.jsx";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";
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
    ...customCheckboxRadioSwitch
};

const PolicyDetails = (props) => {
    console.log("policyDetailsData3", props);
    // const { classes } = this.props;

    const policyDetailsprops = props.componentData;

    //const insurableData = props.componentData;
    //console.log('Insurable data ', insurableData);
    //console.log('Insurable data props ', props);

    return (
            <div>
                <GridContainer>


                    <GridItem xs={12} sm={4} md={3}>


                        <CustomInput

                            labelText="InsuredReferenceNo"
                           
                        value={policyDetailsprops.policyDetailsData.customerId}
                            name='customerId'
                           
                        disabled={policyDetailsprops.disabled}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>


                <GridItem xs={12} sm={4} md={3}>
                    <CustomInput
                        labelText="Insured Name"
                        value={policyDetailsprops.policyDetailsData.coverNoteNo}
                        name='coverNoteNo'
                        disabled={policyDetailsprops.disabled}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>

                    <GridItem xs={12} sm={4} md={3}>


                        <CustomInput
                        disabled={policyDetailsprops.disabled}
                            labelText="InsuredMobileNo"
                            value={policyDetailsprops.policyDetailsData.mobileNumber}
                            name='mobileNumber'
                           
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={4} md={3}>


                        <CustomInput
                        disabled={policyDetailsprops.disabled}
                            
                            labelText="InsuredEmailID"
                            
                            value={policyDetailsprops.policyDetailsData.email}
                            name='email'
                        
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                </GridItem>

                {/*  <GridItem xs={12} sm={4} md={3}>


                    <CustomInput
                        disabled={policyDetailsprops.disabled}

                        labelText="EventDate"

                         value={policyDetailsprops.policyDetailsData.eventdate}
                        name='eventdate'

                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>

                <GridItem xs={12} sm={4} md={3}>


                    <CustomInput
                        disabled={policyDetailsprops.disabled}

                        labelText="CoverEvent"

                         value={policyDetailsprops.policyDetailsData.coverEvent}
                        name='coverEvent'

                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>*/}


                <GridItem xs={12} sm={4} md={3}>


                    <CustomInput
                        disabled={policyDetailsprops.disabled}

                        labelText="PolicyStartDate"

                         value={policyDetailsprops.policyDetailsData.sDate}
                        name='sDate'

                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>


                <GridItem xs={12} sm={4} md={3}>


                    <CustomInput
                        disabled={policyDetailsprops.disabled}

                        labelText="PolicyEndDate"

                        value={policyDetailsprops.policyDetailsData.eDate}
                        name='eDate'

                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>

                <GridItem xs={12} sm={4} md={3}>
                    <CustomInput
                        labelText="Total Sum Insured"
                        //value={policyDetailsprops.policyDetailsData.customerId}
                        // name='customerId'
                        disabled={policyDetailsprops.disabled}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>

                <GridItem xs={12} sm={4} md={3}>
                    <CustomInput
                        labelText="Balance Sum Insured"
                        //value={policyDetailsprops.policyDetailsData.customerId}
                        // name='customerId'
                        disabled={policyDetailsprops.disabled}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>


                </GridContainer>
        </div>
    );

}

export default PolicyDetails;
