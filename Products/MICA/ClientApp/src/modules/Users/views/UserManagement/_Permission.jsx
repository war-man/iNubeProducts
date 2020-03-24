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
//import CircularProgress from '@material-ui/core/CircularProgress';

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
    let dashboard = props.dashboard;
    let reports = props.reports;
    let testCheck = props.testCheck;
    let changeCollapse = props.changeCollapse;
    let testCheck1 = props.testCheck1;
    let changeCollapse1 = props.changeCollapse1;
    let testCheck2 = props.testCheck2;
    let changeCollapse2 = props.changeCollapse2;
    let permissions = (a, b, location, c) => {
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
                                                {permissions(item.children, b + 1, location.concat([index]), c)}
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
    let dashboardmenu = (a1, b1, location1, c1) => {
        return (
            <div>
                <React.Fragment>
                    {a1.map((item, index) =>
                        <React.Fragment>
                            <ListItem className="tree-Assign-Privileges">
                                <ListItemIcon className="checkboxPading" >
                                    <CustomCheckbox
                                        value={item.status}
                                        onChange={(e) => { testCheck1(index, location1, c1, e) }}
                                        checked={item.status}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText className="checkboxText" primary={item.label} onClick={() => { changeCollapse1(index, location1, c1) }} />
                            </ListItem>
                            {
                                (item.children.length == 0) ? "" :
                                    <Collapse in={!item.collapse} unmountOnExit>
                                        <ListItem>
                                            <List className="list-padding">
                                                {dashboardmenu(item.children, b1 + 1, location1.concat([index]), c1)}
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
    let reportsmenu = (a2, b2, location2, c2) => {
        return (
            <div>
                <React.Fragment>
                    {a2.map((item, index) =>
                        <React.Fragment>
                            <ListItem className="tree-Assign-Privileges">
                                <ListItemIcon className="checkboxPading" >
                                    <CustomCheckbox
                                        value={item.status}
                                        onChange={(e) => { testCheck2(index, location2, c2, e) }}
                                        checked={item.status}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText className="checkboxText" primary={item.label} onClick={() => { changeCollapse2(index, location2, c2) }} />
                            </ListItem>
                            {
                                (item.children.length == 0) ? "" :
                                    <Collapse in={!item.collapse} unmountOnExit>
                                        <ListItem>
                                            <List className="list-padding">
                                                {reportsmenu(item.children, b2 + 1, location2.concat([index]), c2)}
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
                        <h4 style={{ fontWeight: '400' }}> Dashoard Privileges </h4>
                        <List>
                            {dashboard.map((item, index) =>
                                <div className="permissiongrid" id="'+ randomID +'">
                                    <GridItem xs={12} sm={12}>
                                        <ListItem className="mica-admin" >
                                            <ListItemIcon className="checkboxPading" >
                                            </ListItemIcon>
                                            {/* {menuname ?	
                                                <ListItemText className="checboxText" primary={item.roleName} />	
                                                : <label><TranslationContainer translationKey="ListofDashboards" /></label>}*/}
                                            <ListItemText className="checboxText" primary={item.roleName} />
                                        </ListItem>
                                        <GridItem>
                                            <ListItem className="partner-admin">
                                                <List>
                                                    {dashboardmenu(item.mdata, 0, [], index)}
                                                </List>
                                            </ListItem>
                                        </GridItem>
                                    </GridItem>
                                </div>
                            )}
                        </List>
                    </CardBody>
                </GridContainer>{/**/}
                <GridContainer>
                    <CardBody className="permission-card">
                        <h4 style={{ fontWeight: '400' }}> Menu Privileges </h4>
                        <List>
                            {listData.map((item, index) =>
                                <div className="permissiongrid" id="'+ randomID +'">
                                    {/*    <GridItem xs={12} sm={12}>	
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
                                    </GridItem>*/}
                                    <GridItem xs={12} sm={12}>
                                        <ListItem className="mica-admin" >
                                            <ListItemIcon className="checkboxPading" >
                                            </ListItemIcon>
                                            {/*  {menuname ?	
                                                <ListItemText className="checboxText" primary={item.roleName} />	
                                                : <label><TranslationContainer translationKey="ListofMenuPermissions" /></label>}*/}
                                        </ListItem>
                                        <GridItem>
                                            <ListItem className="partner-admin">
                                                <List>
                                                    {permissions(item.mdata, 0, [], index)}
                                                </List>
                                            </ListItem>
                                        </GridItem>
                                    </GridItem>
                                </div>
                            )}
                        </List>
                    </CardBody>
                </GridContainer>
                <GridContainer>
                    <CardBody className="permission-card">
                        <h4 style={{ fontWeight: '400' }}> Reports Privileges </h4>
                        <List>
                            {reports.map((item, index) =>
                                <div className="permissiongrid" id="'+ randomID +'">
                                    {/*    <GridItem xs={12} sm={12}>	
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
                                    </GridItem>*/}
                                    <GridItem xs={12} sm={12}>
                                        <ListItem className="mica-admin" >
                                            <ListItemIcon className="checkboxPading" >
                                            </ListItemIcon>
                                            {/*   {menuname ?	
                                                <ListItemText className="checboxText" primary={item.roleName} />	
                                                : <label><TranslationContainer translationKey="ListofReports" /></label>}*/}
                                        </ListItem>
                                        <GridItem>
                                            <ListItem className="partner-admin">
                                                <List>
                                                    {reportsmenu(item.mdata, 0, [], index)}
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
                        <Button id="permissionbnt" /*disabled={props.btnload1}*/ onClick={props.handleSubmit} color="success"><TranslationContainer translationKey="Save" /></Button>
                        {/*{props.btnload1 ? <CircularProgress id="progress-bar" size={25} /> : null}*/}
                    </GridItem>
                </GridContainer>
            </GridItem>
        </GridContainer>
    );
}
export default withStyles(style)(Permission);