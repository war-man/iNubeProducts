import React from "react";
//import React, { Component, useRef, useEffect } from 'react';
//import { render } from 'react-dom';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import $ from 'jquery';
import UserConfig from 'modules/Users/UserConfig.js';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import DualListBox from 'react-dual-listbox';
import 'react-dual-listbox/lib/react-dual-listbox.css';
//import ReactTable from "react-table";
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import role from "assets/img/users.png";
import user from "assets/img/user-search.png";
import { Animated } from "react-animated-css";
import TableContentLoader from "components/Loaders/TableContentLoader.jsx";
import PageContentLoader from "components/Loaders/PageContentLoader.jsx";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import HierarchyConfig from 'modules/Hierarchy/HierarchyConfig.js';
//import CircularProgress from '@material-ui/core/CircularProgress';

//import data_Not_found from "assets/img/data_Not_found.png"
//import data_Not_found from "assets/img/data-not-found.png"
import data_Not_found from "assets/img/data-not-found-new.png"




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

const modalSearch = {
    margin: "0px auto",
    textAlign: "center",

}

const paddingCard =
{
    padding: "10px",
}

const okBtn = {
    left: "14%"

}

class Designation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            react: false,
            orgid: "",
            open: false,
            OfficeCode: "",
            officelist: [],
            officesendlist: [],
            newofficesendlist: [],
            offdata: "",
            showtable: false,
            data: [],
            radioValue1: false,
            radioValue2: false,
            disabled: false,
            RolesDTO: [],
            rolesData: [],
            selected: [],
            display: false,
            Designations: [],
            orgId: "",
            Designation: {
                "designationId": "",
                "roleId": [],
            },
            Organizations: [],
        };
    }

    handlesave = () => {
        let desig = this.state.Designation;
        desig.roleId = [...this.state.selected];
        this.setState({ desig });
        console.log("select: ", this.state.selected);
        //calling service for saving data
        fetch(`${HierarchyConfig.HierarchyConfigURL}/api/Organization/AssignRole`, {
            // fetch(`https://localhost:44315/api/Office/CreateOffice`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(desig)
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log('Response data', data);
            if (data.status == 2) {
                swal({
                    //  title: "Perfect",
                    text: data.responseMessage,
                    icon: "success"
                });


            }
            else {
                swal({
                    text: data.errors[0].errorMessage,
                    icon: "error"
                });
            }
        });


    }

    onChange = (currentNode, selectedNodes) => {
        this.state.selected.push(currentNode.permissionId);
        console.log("seleted: ", this.state.selected);
    }

    handleOrganization = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        fetch(`${HierarchyConfig.HierarchyConfigURL}/api/Organization/GetDesignation?orgid=` + e.target.value, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(response => response.json())
            .then(data => {
                this.setState({ Designations: data[0].mdata });
                console.log("deg List", this.state.Designations, data);
            });
    }

    handleDesignation = (e) => {
        let that = this;
        let designation = that.state.Designation;
        let name = e.target.name;
        let value = e.target.value;
        designation[name] = value;
        that.setState({ designation });
        fetch(`${HierarchyConfig.HierarchyConfigURL}/api/Organization/DesignationRoles?designationid=` + e.target.value, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                that.setState({ rolesData: data.result.roles });
                console.log("SelectRoles: ", data);
                console.log("SelectRoles: ", that.state.rolesData);
                if (that.state.rolesData.length > 0) {
                    let role = that.state.rolesData;
                    that.state.selected = role;
                    console.log("select values: ", that.state.selected)
                    that.handleallroles();
                } else {
                    that.handleallroles();
                }
            });
        //if (that.state.rolesData.length > 0) {
        //    let role = that.state.rolesData;
        //    that.state.selected = role;
        //    console.log("select values: ", that.state.selected)
        //    that.handleallroles();
        //} else {
        //    that.handleallroles();
        //}
    }

    handleallroles = () => {
        fetch(`${UserConfig.UserConfigUrl}/api/Role/GetRoles`, {
            //fetch(`https://localhost:44351/api/Role/GetRoles`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ RolesDTO: data, display: true });
                console.log("RolesDTO: ", this.state.RolesDTO);
            });
    }

    componentDidMount() {
        //to get the dropdown data for designation
        fetch(`${HierarchyConfig.HierarchyConfigURL}/api/Organization/GetOrgDropdown`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ Organizations: data });
                console.log("organizations: ", data);
            });
    }

    render() {
        //const { pathname, search } = useRouter();
        const { classes } = this.props;
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12} >
                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                            <Card >
                                <CardHeader color="rose" icon>
                                    <CardIcon color="rose">
                                        <Icon><img id="icon" src={user} /></Icon>
                                    </CardIcon>
                                    {
                                        <h4 >
                                            <small>Designation Role Mapping</small>
                                        </h4>
                                    }
                                </CardHeader>
                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                    <CardBody>
                                        <div>
                                            <GridContainer>
                                                <GridItem xs={12} sm={4} md={3}>
                                                    <Dropdown
                                                        required={true}
                                                        labelText="Organization"
                                                        lstObject={this.state.Organizations}
                                                        value={this.state.orgid}
                                                        name='orgid'
                                                        onChange={(e) => this.handleOrganization(e)}
                                                        formControlProps={{ fullWidth: true }}
                                                    />
                                                </GridItem>
                                                <GridItem xs={12} sm={4} md={3}>
                                                    <Dropdown
                                                        required={true}
                                                        labelText="Designation"
                                                        lstObject={this.state.Designations}
                                                        value={this.state.Designation.designationId}
                                                        name='designationId'
                                                        onChange={(e) => this.handleDesignation(e)}
                                                        formControlProps={{ fullWidth: true }}
                                                    />
                                                </GridItem>
                                            </GridContainer>
                                        </div>
                                    </CardBody>
                                </Animated>
                            </Card>
                        </Animated>
                    </GridItem>
                </GridContainer>
                {this.state.display ?
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12} >
                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                <Card >
                                    <CardHeader color="rose" icon>
                                        {/*<CardIcon color="rose">
                                        <Icon><img id="icon" src={role} /></Icon>
                                    </CardIcon>*/}
                                        {
                                            <h4 >
                                                <small>Assign Roles to Designation</small>
                                                {/*<small><TranslationContainer translationKey="AssignRole" /></small>*/}
                                            </h4>
                                        }
                                    </CardHeader>
                                    <CardBody>
                                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                            <GridContainer justify="center">
                                                <GridItem className="selectBoxScroll">
                                                    <DualListBox id="selectBox"
                                                        label={this.state.RolesDTO}
                                                        options={this.state.RolesDTO}
                                                        selected={this.state.selected}
                                                        onChange={(selected) => {
                                                            this.setState({ selected });
                                                        }}
                                                    />
                                                </GridItem>
                                            </GridContainer>
                                            <GridContainer lg={12} justify="center">
                                                <GridItem xs={5} sm={3} md={3} lg={2} >
                                                    <Button color="success" onClick={() => this.handlesave()} round className={classes.submit}> Save </Button>
                                                </GridItem>
                                            </GridContainer>
                                        </Animated>
                                    </CardBody>
                                </Card>
                            </Animated>
                        </GridItem>
                    </GridContainer>
                    : null}
            </div>
        );
    }
}

export default withStyles(style)(Designation);