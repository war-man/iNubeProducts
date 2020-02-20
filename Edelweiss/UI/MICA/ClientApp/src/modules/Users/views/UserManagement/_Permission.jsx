import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import $ from 'jquery';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import CustomCheckbox from "components/Checkbox/CustomCheckbox";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { Animated } from "react-animated-css";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import CircularProgress from '@material-ui/core/CircularProgress';

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

const Permission = (props) => {
    let menuname = props.menuname;
    let listData = props.listData;
    let testCheck = props.testCheck;
    let changeCollapse = props.changeCollapse;
    let foo = (a, b, location, c) => {
        return (
            <div>
                <React.Fragment>
                    {a.map((item, index) =>
                        <React.Fragment>
                            <ListItem className="tree-Assign-Privileges">
                                <ListItemIcon className="checkboxPading" >
                                    <CustomCheckbox
                                        value={item.status}
                                        onChange={(e) => { testCheck(index, location, c, e) }}
                                        checked={item.status}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText className="checkboxText" primary={item.label} onClick={() => { changeCollapse(index, location, c) }} />
                            </ListItem>
                            {
                                (item.children.length == 0) ? "" :
                                    <Collapse in={!item.collapse} unmountOnExit>
                                        <ListItem>
                                            <List className="list-padding">
                                                {foo(item.children, b + 1, location.concat([index]), c)}
                                            </List>
                                        </ListItem>
                                    </Collapse>
                            }
                        </React.Fragment>
                    )}
                </React.Fragment>
            </div>
        );
    }
    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <GridContainer>

                    <CardBody className="permission-card">
                        <List>
                            {listData.map((item, index) =>
                                <div className="permissiongrid" id="'+ randomID +'">
                                    <GridItem xs={12} sm={12}>
                                        {menuname ? null
                                            : <Dropdown
                                                required={true}
                                                labelText="SelectDashBoard"
                                                lstObject={props.dasboard}
                                                value={props.dashboardvalue}
                                                name='dashboardvalue'
                                                onChange={(e) => props.handleDropdown(e)}
                                                formControlProps={{ fullWidth: true }}
                                            />}
                                    </GridItem>
                                    <GridItem xs={12} sm={12}>
                                        <ListItem className="mica-admin" >
                                            <ListItemIcon className="checkboxPading" >
                                            </ListItemIcon>
                                            {menuname ?
                                                <ListItemText className="checboxText" primary={item.roleName} />
                                                : <label><TranslationContainer translationKey="ListofMenuPermissions" /></label>}
                                        </ListItem>
                                        <GridItem>
                                            <ListItem className="partner-admin">
                                                <List>
                                                    {foo(item.mdata, 0, [], index)}
                                                </List>
                                            </ListItem>
                                        </GridItem>
                                    </GridItem>
                                </div>
                            )}

                        </List>
                    </CardBody>
                </GridContainer>
                <GridContainer lg={12} justify="center">
                    <GridItem xs={7} sm={3} md={3} lg={1} >
                        <Button id="permissionbnt" disabled={props.btnload1} onClick={props.handleSubmit} color="success"><TranslationContainer translationKey="Save" /></Button>
                        {props.btnload1 ? <CircularProgress id="progress-bar" size={25} /> : null}
                    </GridItem>
                </GridContainer>
            </GridItem>
        </GridContainer>
    );
}
export default withStyles(style)(Permission);