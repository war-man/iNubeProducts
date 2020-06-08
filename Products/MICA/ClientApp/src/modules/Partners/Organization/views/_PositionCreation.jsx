//node modules
import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import FilterNone from "@material-ui/icons/FilterNone";
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

//General Components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import profileStyles from "./profileStyles.jsx";
import ReactTable from 'components/MuiTable/MuiTable.jsx';

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

const PositionCreation = (props) => {
    console.log("position", props);
    const profileData = props.componentData;
    return (
        <div>
            <GridContainer>
                <GridItem xs={12}>
                    <CardBody>
                        <ReactTable
                            data={profileData.posDesigTable}
                            filterable
                            columns={[
                                {
                                    Header: "Designation",
                                    accessor: "designation",
                                    minWidth: 20,
                                },
                                {
                                    Header: "Reporting To",
                                    accessor: "reportingTo",
                                    minWidth: 20,
                                },
                                {
                                    Header: "No of Current Staff",
                                    accessor: "currentStaff",
                                    minWidth: 20,
                                },
                                {
                                    Header: "No of New Position",
                                    accessor: "newPosition",
                                    minWidth: 20,
                                },

                            ]}
                            defaultPageSize={5}
                            showPaginationTop={false}
                            pageSize={5}
                            className="-striped -highlight"
                        />
                    </CardBody>
                </GridItem>
            </GridContainer>
        </div>
    );
}
PositionCreation.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(style)(PositionCreation);
