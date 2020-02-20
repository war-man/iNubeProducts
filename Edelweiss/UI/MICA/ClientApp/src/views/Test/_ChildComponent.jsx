import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";

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

const ChildComponent = (props) =>{
       // const { classes } = this.props;
    const insurableData = props.componentData;
    console.log(insurableData);

        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={4}>
                        <MasterDropdown labelText="Insurable Items" id="ProductDTO.insurableItemId" lstObject={insurableData.masterList} filterName='InsuranceType' value={insurableData.ProductDTO.insurableItemId} model="ProductDTO" name='insurableItemId' onChange={insurableData.SetValue} formControlProps={{ fullWidth: true }} />

                    </GridItem>
                </GridContainer>
            </div>
        );
    
}

export default ChildComponent;
