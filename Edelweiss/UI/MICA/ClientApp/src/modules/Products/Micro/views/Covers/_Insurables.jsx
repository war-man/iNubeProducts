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
import Dropdown from "components/Dropdown/Dropdown.jsx";
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
    ...customCheckboxRadioSwitch
};

const Insurables = (props) =>{
       // const { classes } = this.props;
    const insurableData = props.componentData;
    console.log('Insurable data ', insurableData);
    console.log('Insurable data props ', props);
  
        return (
            <div>
                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                <GridContainer>
                
                    <GridItem xs={12} sm={4}>
                        <Dropdown labelText="Insurable Category" required={true} lstObject={insurableData.MasterDTO.InsurableCategory} value={insurableData.ProductDTO.productInsurableItem.insurableCategoryId} name='insurableCategoryId' onChange={(e) => insurableData.GetMasterData('InsuranceType', 'productInsurableItem', e)} disabled={insurableData.viewdisable} formControlProps={{ fullWidth: true }} />
                            {insurableData.errormessage && (insurableData.ProductDTO.productInsurableItem.insurableCategoryId == "") ? <p className="error">This Field is Required</p> : null}
                    </GridItem>
                    <GridItem xs={12} sm={4}>
                        <Dropdown labelText="Insurable Items" required={true} lstObject={insurableData.MasterDTO.InsuranceType} value={insurableData.ProductDTO.productInsurableItem.insurableItemTypeId} name='insurableItemTypeId'  onChange={(e) => insurableData.GetMasterData('Cover', 'productInsurableItem', e)} disabled={insurableData.viewdisable}  formControlProps={{ fullWidth: true }} />
                            {insurableData.errormessage && (insurableData.ProductDTO.productInsurableItem.insurableItemTypeId == "") ? <p className="error">This Field is Required</p> : null}
                    </GridItem>
                    
                </GridContainer>
                </Animated>
            </div>
        );
    
}

export default Insurables;
