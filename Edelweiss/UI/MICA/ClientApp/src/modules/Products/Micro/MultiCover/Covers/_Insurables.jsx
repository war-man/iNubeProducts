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
import Button from "components/CustomButtons/Button.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import { Animated } from "react-animated-css";
import Add from "@material-ui/icons/AddCircleOutline";
import AddCover from "../_AddCover.jsx";

import Accordion from "components/Accordion/Accordion.jsx";
import CustomRadioButton from "components/CustomRadiobutton/CustomRadiobutton.jsx";

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
    const insurableData = props.props;
    console.log('Insurable clauses', insurableData.clauses);
    console.log('Insurable data props ', props);
    console.log('insurableData.InitialInsurable', insurableData.InitialInsurable);
    const lenn = insurableData.ProductDTO.productInsurableItem.length;

  //  const [addinusrable, addinsurablefun] = React.useState(insurableData.InitialInsurable);

    // const radiolen=((lenn < addinusrable.length) ? (addinusrable.length - 1) : addinusrable.length);
    //const [addinusrable, addinsurablefun] = React.useState([{
    //    title: "Insurable", content: <AddCover props={insurableData}  />
    //}]);
   // console.log("SelectedRadio", insurableData.radiolist1.filter(item => item.mID == [insurableData.ProductDTO.productInsurableItem[addinusrable.length].isSingle]))
   // const radioType = insurableData.radiolist1.filter(item => item.mID == (insurableData.ProductDTO.productInsurableItem[radiolen].isSingle));
   
      return (
       
                  <GridContainer xl={12}>
                
                      <GridItem xs={12} sm={4}>
                  <Dropdown labelText="Insurable Category" required={true} lstObject={insurableData.MasterDTO.InsurableCategory} value={insurableData.ProductDTO.productInsurableItems.insurableCategoryId} name='insurableCategoryId' onChange={(e) => insurableData.GetInusrableMasterData('InsuranceType', 'productInsurableItems', e, insurableData.InitialInsurable.length)} disabled={insurableData.viewdisable} formControlProps={{ fullWidth: true }} />
                            {insurableData.errormessage && (insurableData.ProductDTO.productInsurableItem.insurableCategoryId == "") ? <p className="error">This Field is Required</p> : null}
                    </GridItem>
                    <GridItem xs={12} sm={4}>
                  <Dropdown labelText="Insurable Item" required={true} lstObject={insurableData.MasterDTO.InsuranceType} value={insurableData.ProductDTO.productInsurableItems.insurableItemTypeId} name='insurableItemTypeId' onChange={(e) => insurableData.GetInusrableMasterData('Cover', 'productInsurableItems', e, insurableData.InitialInsurable.length)} disabled={insurableData.viewdisable}  formControlProps={{ fullWidth: true }} />
                            {insurableData.errormessage && (insurableData.ProductDTO.productInsurableItem.insurableItemTypeId == "") ? <p className="error">This Field is Required</p> : null}
                      </GridItem>
              <CustomRadioButton radiolist={insurableData.radiolist1} disabled={insurableData.viewdisable} onChange={(e) => insurableData.onChangeradio(e, 'radiolist1')} />
                      <GridItem xs={12} sm={1}>
                  {!insurableData.viewdisable && <Button round color="info" onClick={(e) => { insurableData.addinurablelist(e, insurableData.InitialInsurable.length); }} > Add</Button >}
                    </GridItem>
                  <Accordion
                     // active={0}
                  collapses={insurableData.InitialInsurable}
                  />


                  </GridContainer>
                  
              
           
        );
    
}

export default Insurables;
