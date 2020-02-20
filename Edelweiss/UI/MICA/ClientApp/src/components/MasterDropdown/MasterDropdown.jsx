import React from "react";
// nodejs library to set properties for components
import Dropdown from "../Dropdown/Dropdown.jsx";
import withStyles from "@material-ui/core/styles/withStyles";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";

const style = {
    ...customSelectStyle
}

const MasterDropdown = (props) => {
    let contents = (props.lstObject.filter((e) => e.mType === props.filterName)[0]) === undefined
        ? []
        : props.lstObject.filter((e) => e.mType === props.filterName)[0].mdata
        ;
    return (
        <div>
            {
                <Dropdown disabled={props.disabled} labelText={props.labelText}  id={props.id} lstObject={contents} value={props.value} name={props.name} onChange={props.onChange}  required={props.required} formControlProps={{ fullWidth: true }} />
            }
        </div>
    )
}

export default withStyles(style)(MasterDropdown);
