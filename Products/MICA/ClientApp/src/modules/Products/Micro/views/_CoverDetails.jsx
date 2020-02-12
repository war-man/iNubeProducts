import React from "react";
// @material-ui/icons
//import Settings from "@material-ui/icons/Settings";
//import ChromeReader from "@material-ui/icons/ChromeReaderMode";
//import Extension from "@material-ui/icons/Extension";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Wizard from "components/Wizard/Wizard.jsx";


import Insurables from "./Covers/_Insurables.jsx";
import Covers from "./Covers/_Covers.jsx";
import Benefits from "./Covers/_Benefits.jsx";
import Premium from "./Covers/_Premium.jsx";
import Clauses from "./Clauses/_Clauses.jsx";
import Channels from "./Others/_Channels.jsx";
import Claims from "./Others/_Claims.jsx";
import Risks from "./Others/_Risks.jsx";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import ProductSave from "./_ProductSave.jsx";
import { Transform } from "stream";

import ChromeReader from "@material-ui/icons/ChromeReaderMode";
//import ChromeReader from "@material-ui/icons/ChromeReaderMode";
import cover from "@material-ui/icons/VerifiedUser";
import Extension from "@material-ui/icons/Widgets";
import Accordion from "components/Accordion/Accordion.jsx";
import ProductConfigIcon from "assets/img/pro-config.png";
import Icon from "@material-ui/core/Icon";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import withStyles from "@material-ui/core/styles/withStyles";
import CustomRadioButton from "components/CustomRadiobutton/CustomRadiobutton.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Add from "@material-ui/icons/AddCircleOutline";
const CoverDetails = (props) => {
    console.log("my cover props", props);
    const { classes } = props;
    const [addCover, addCoverfun] = React.useState([{
        title: "Cover", content: <Covers props={props} Cindex={(addCover === undefined) ? 0 : addCover.length} />
    }]);

const Cindex = (addCover === undefined) ? 0 : addCover.length;
    return (
        <GridContainer lg={10} justify="center">
          
            <GridItem xs={12} sm={10}>
                    <Accordion
            active={0}
            collapses={addCover}
                    />
            </GridItem>
            <GridItem xs={12} sm={2}>
                <Button round color="info" className="Add" onClick={(e) => { props.props.addCoverelist(e, Cindex, props.Iindex); addCoverfun(addCover.concat({ title: "Cover", content: <Covers props={props} Cindex={addCover.length} /> })) }}><Add /> ADD COVERS</Button >

            </GridItem>
   
            </GridContainer>
    );

}
export default withStyles(customCheckboxRadioSwitch)(CoverDetails);