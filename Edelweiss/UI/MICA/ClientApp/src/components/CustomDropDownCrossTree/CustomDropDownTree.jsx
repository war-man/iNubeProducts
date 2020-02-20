import React from "react";
import { render } from "react-dom";
import DropdownTreeSelect from "react-dropdown-tree-select";

import "./index.css"; 

const DropdownTree = (props) => {
    return (
        <DropdownTreeSelect  data={props.data} onChange={props.onChange} className="mdl-demo" />
    );
};

export default DropdownTree;