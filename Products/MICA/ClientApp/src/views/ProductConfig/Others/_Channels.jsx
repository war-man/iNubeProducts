import React from "react";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";
import Favorite from "@material-ui/icons/Favorite";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";


import FormControlLabel from "@material-ui/core/FormControlLabel";
import Datetime from "react-datetime";
import Switch from "@material-ui/core/Switch";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";


import Heading from "components/Heading/Heading.jsx";

// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";
// @material-ui/icons


import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import CustomInput from "components/CustomInput/CustomInput.jsx";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";

import Wizard from "components/Wizard/Wizard.jsx";
import Table from "components/Table/Table.jsx";
import Assignment from "@material-ui/icons/Assignment";



import avatar from "assets/img/faces/marc.jpg";

class Channels extends React.Component {

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Table
                    tableHeaderColor="primary"
                    tableHead={["Channel", "Effective From", "Effective To", "Brokerage"]}
                    tableData={[
                        [<CustomInput
                            inputProps={{
                                type: "text"
                            }} />, <CustomInput
                            inputProps={{
                                type: "text"
                            }} />, <CustomInput
                            inputProps={{
                                type: "text"
                            }} />, <CustomInput
                            inputProps={{
                                type: "text"
                            }} />]

                    ]}
                    coloredColls={[3]}
                    colorsColls={["primary"]}
                />
            </div>
        );
    }
}
export default withStyles(extendedFormsStyle)(Channels);