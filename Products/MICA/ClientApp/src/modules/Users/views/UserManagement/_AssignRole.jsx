import React from "react";
//import React, { Component, useRef, useEffect } from 'react';
//import { render } from 'react-dom';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import CustomInput from "components/CustomInput/CustomInput.jsx";
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
import Permission from "./_Permission";
import DualListBox from 'react-dual-listbox';
import 'react-dual-listbox/lib/react-dual-listbox.css';
//import ReactTable from "react-table";
import ReactTable from "components/MuiTable/MuiTable.jsx";
import permission from "assets/img/role-asign.png";
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import role from "assets/img/users.png";
import user from "assets/img/user-search.png";
import { Animated } from "react-animated-css";
import validationPage from "./ValidationPage";
import TableContentLoader from "components/Loaders/TableContentLoader.jsx";
import PageContentLoader from "components/Loaders/PageContentLoader.jsx";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
//import CircularProgress from '@material-ui/core/CircularProgress';

//import data_Not_found from "assets/img/data_Not_found.png"
//import data_Not_found from "assets/img/data-not-found.png"
import data_Not_found from "assets/img/data-not-found-new.png"

import * as Scroll from 'react-scroll';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'



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

class AssignRole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isButtonVisibility: false,
            isButtonDisabled: true,
            btnload: false,
            btnload1: false,
            perFlag: false,
            search: false,
            name: "",
            userName: "",
            UName: "",
            redirect: false,
            cuser: false,
            simpleSelect: "",
            rowData: "",
            userdetails: [],
            multiroles: [],
            admin: "",
            confiVal: "",
            management: "",
            menuname: true,
            admins: "",
            cuserid: "",
            value: props.state || '',
            selected: [],
            RolesDTO: [],
            permission: [],
            simpleSelect: "",
            userFlag: false,
            MasPermissionDTO: [],
            UserRole: {
                "userId": "",
                "roleId": []
            },
            UserPermission: {
                "PermissionIds": [],
                "UserId": ""
            },
            showusertable: false,
            nodata: false,
            showpage: false,
            listData: [],
            dashboard: [],
            open: false,
            editModal: false,
            userId: "",
            userIdState: "",
            firstName: "",
            firstNameState: false,
            partneridState: false,
            emailIdState: false,
            showpage: false,
            employeeNumber: "",
            employeeNumberState: "",
            contactNumber: "",
            contactNumberState: false,
            panNo: "",
            panNoState: false,
            data: [],
            searchRequest:
                {
                    firstName: "",
                    employeeNumber: "",
                    emailId: "",
                    contactNumber: "",
                    panNo: "",
                    partnerId: "",
                },
            rolepermissions: {
                "userId": "",
                "roleId": []
            },
            loader: true,
            pageloader: false,
            //intervalId: 0,
            //thePosition: false,
            //myRef:null
        };
        this.saveroles = this.saveroles.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.searchuser = this.searchuser.bind(this);
        this.editFunction = this.editFunction.bind(this);
        //this.myRef = React.createRef();
        //this.myref = useRef(null);
    }

    saveroles() {
        let usrrole = this.state.UserRole;
        if (this.state.cuserid == "") {
            usrrole.userId = this.state.userId;
        }
        else {
            usrrole.userId = this.state.cuserid;
        }
        usrrole.roleId = [...this.state.selected];
        this.setState({ usrrole });
        this.setState({ btnload: true });
        fetch(`${UserConfig.UserConfigUrl}/api/Role/AssignRole`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(usrrole)
        })
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                this.setState({ btnload: false });
                console.log("response: ", data);
                if (data.status == 2) {
                    swal({
                        text: data.responseMessage,
                        icon: "success"
                    });
                }
                else if (data.status == 8) {
                    swal({
                        text: data.errors[0].errorMessage,
                        icon: "error"
                    });
                }
                else if (data.status == 400) {
                    swal({
                        text: "Please try again",
                        icon: "error"
                    });
                }
                else {

                }
            });

        let permissions = this.state.rolepermissions;
        if (this.state.cuserid != "") {
            permissions.userId = this.state.cuserid;
        }
        else {
            permissions.userId = this.state.userId;
        }
        permissions.roleId = this.state.UserRole.roleId;
        this.setState({ permissions });
        if (this.state.selected.length != 0) {
            this.setState({ perFlag: true });
            fetch(`${UserConfig.UserConfigUrl}/api/Permission/GetRolePermissions`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify(permissions)
            })
                .then(response => response.json())
                .then(data => {
                    this.setState({ listData: data });
                    console.log("list data", this.state.listData);
                });

            fetch(`${UserConfig.UserConfigUrl}/api/Permission/GetUserRoleDashboard`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify(permissions)
            })
                .then(response => response.json())
                .then(data => {
                    this.setState({ dashboard: data });
                    console.log("dashboards: ", this.state.dashboard);
                });

        } else {
            this.setState({ perFlag: false });
        }
    }

    componentDidMount() {
        //window.screenTop(0, 0);
        fetch(`${UserConfig.UserConfigUrl}/api/Role/GetRoles`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ RolesDTO: data });
                console.log("RolesDTO: ", this.state.RolesDTO);
            });
        if (this.props.location.state != null) {
            this.setState({
                cuserid: this.props.location.state.uid,
                UName: this.props.location.state.UName,
                cuser: true,
                showpage: true
            });

            this.setState({ isButtonVisibility: false, pageloader: true });
        } else {
            setTimeout(
                function () {
                    this.setState({ pageloader: true });
                }
                    .bind(this),
                2000
            );
            this.setState({ isButtonVisibility: true });
        }
        console.log("uid", this.cuserid);
        console.log("name", this.state.UName);
    }

    onChange = (currentNode, selectedNodes) => {
        this.state.permission.push(currentNode.permissionId);
    }

    searchuser() {
        this.state.selected = [];
        this.setState({ search: false, });
        let request = this.state.searchRequest;
        if (request.firstName != "" || request.employeeNumber != "" ||
            request.emailId != "" || request.contactNumber != "" ||
            request.panNo != "" || request.partnerId != ""
        ) {
            this.setState({ loader: false });
            fetch(`${UserConfig.UserConfigUrl}/api/UserProfile/SearchUser`,
                {
                    method: 'POST',
                    body: JSON.stringify(this.state.searchRequest),
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                    },
                }
            ).then(response => response.json())
                .then(data => {
                    this.setState({ userdetails: data, showpage: false, perFlag: false });

                    this.setState({ showusertable: false, loader: false });
                    if (this.state.userdetails.length > 0) {
                        this.tabledata();
                    } else {
                        setTimeout(
                            function () {
                                this.setState({ loader: true, showusertable: false, nodata: true });
                            }.bind(this), 2000
                        );
                    }
                });

        } else {
            swal({
                text: "Please enter any one search parameter",
                icon: "error"
            });
        }

    }

    tabledata = () => {
        this.setState({ showusertable: true, loader: true });
        this.setState({
            data: this.state.userdetails.map((prop, key) => {
                const { classes } = this.props;
                return {
                    UserName: prop.userName,
                    FirstName: prop.firstName,
                    //EmpId: prop.employeeNumber,
                    DOB: new Date(prop.dob).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', }),
                    PhNo: prop.contactNumber,
                    PanNo: prop.panNo,
                    radio: < input type="radio" name="product" onClick={this.editFunction.bind(this, key, prop.userId)} />
                };
            })
        });
    }

    testCheck = (index, location, c, event) => {
        if (location.length > 0) {
            let responses = [...this.state.listData[c].mdata];
            responses[location[0]]['children'][index]['status'] = !responses[location[0]]['children'][index]['status'];
            this.setState({ responses });
        } else {
            let responses = [...this.state.listData[c].mdata];
            responses[index].status = !responses[index].status;
            this.setState({ responses });
            this.setChildren(responses[index]['children'], responses[index].status);
        }
        event.preventDefault();
    }

    testCheck1 = (index, location, c, event) => {
        if (location.length > 0) {
            let responses = [...this.state.dashboard[c].mdata];
            responses[location[0]]['children'][index]['status'] = !responses[location[0]]['children'][index]['status'];
            this.setState({ responses });
        } else {
            let responses = [...this.state.dashboard[c].mdata];
            responses[index].status = !responses[index].status;
            this.setState({ responses });
            this.setChildren(responses[index]['children'], responses[index].status);
        }
        event.preventDefault();
    }

    changeCollapse1 = (index, location, c) => {
        let dashboard = this.state.dashboard[c].mdata;
        for (let i = 0; i < location.length; i++) {
            dashboard = dashboard[location[i]]['children'];
        }
        dashboard[index]['collapse'] = !dashboard[index]['collapse'];
        this.setState(dashboard);
    }

    changeCollapse = (index, location, c) => {
        let listData = this.state.listData[c].mdata;
        for (let i = 0; i < location.length; i++) {
            listData = listData[location[i]]['children'];
        }
        listData[index]['collapse'] = !listData[index]['collapse'];
        this.setState(listData);
    }

    setChildren = (parent, value) => {
        for (let i = 0; i < parent.length; i++) {
            let x = parent[i];
            x['status'] = value;
            this.setState(x);
            this.setChildren(x['children'], value);
        }
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    SetValue = (type, event) => {
        event.preventDefault();
        let UserSearch = this.state.searchRequest;
        let name = event.target.name;
        let value = event.target.value;
        UserSearch[name] = value;
        this.setState({ UserSearch })
        this.change(event, name, type);
    };

    change = (event, stateName, type) => {
        switch (type) {
            case "string":
                if (validationPage.verifyName(event.target.value)) {
                    //this.setState({ [stateName + "State"]: "success" });
                    this.setState({ [stateName + "State"]: false });
                }
                else {
                    //this.setState({ [stateName + "State"]: "error" });
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            case "email":
                if (validationPage.verifyEmail(event.target.value)) {
                    //this.setState({ [stateName + "State"]: "success" });
                    this.setState({ [stateName + "State"]: false });
                }
                else {
                    //this.setState({ [stateName + "State"]: "error" });
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            case "ID":
                if (validationPage.verifyID(event.target.value)) {
                    //this.setState({ [stateName + "State"]: "success" });
                    this.setState({ [stateName + "State"]: false });
                }
                else {
                    //this.setState({ [stateName + "State"]: "error" });
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            case "phnumber":
                if (validationPage.verifyPhNumber(event.target.value)) {
                    //this.setState({ [stateName + "State"]: "success" });
                    this.setState({ [stateName + "State"]: false });
                }
                else {
                    //this.setState({ [stateName + "State"]: "error" });
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            case "pan":
                if (validationPage.verifyPanIndNum(event.target.value, 6)) {
                    //this.setState({ [stateName + "State"]: "success" });
                    this.setState({ [stateName + "State"]: false });
                }
                else {
                    //this.setState({ [stateName + "State"]: "error" });
                    this.setState({ [stateName + "State"]: true });
                }
                break;

            default:
                break;
        }
    }

    calculate = (listData, tempArray) => {
        for (let i = 0; i < listData.length; i++) {
            let x = {};
            x.permissionId = listData[i].permissionId;
            x.label = listData[i].label;

            tempArray.concat([x]);
            tempArray = this.calculate(listData[i].children)
        }

        return tempArray;
    }

    editFunction(id, uId) {
        var orgArr = this.state.userdetails
        var userArr = [];
        $.each(orgArr, function (k, v) {
            if (v.userId == uId) {
                userArr.push(orgArr[id]);
            }
        })
        const useriddata = userArr[0].userId;
        const userdata = userArr[0].userName;
        const username = userArr[0].firstName;
        this.state.name = username;
        this.state.userName = userdata;
        this.state.userId = useriddata;
        this.state.rowData = userArr;
        this.setState({ rowData: userArr });
        console.log("rowdata", this.state.rowData);
        console.log("username", this.state.userName);
        console.log("userId", this.state.userId);
        fetch(`${UserConfig.UserConfigUrl}/api/Role/GetUserRole/` + this.state.userId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                this.setState({ multiroles: data })
                console.log("Multiroles: ", this.state.multiroles);
            });
    }

    handleClose = () => {
        this.setState({ showusertable: false, showpage: true });
        if (this.state.userId != null) {
            var multirole = this.state.multiroles;
            if (multirole != null) {
                var select = this.state.selected
                for (var i = 0; i < multirole.length; i++) {
                    select.push(multirole[i].id);
                }
                this.setState({ select });
                console.log("select values: ", this.state.selected)
            }
            this.setState({ search: true });
        }
        if (this.state.selected.length != 0) {
            this.setState({ showpage: true, nodata: false });
            let permissions = this.state.rolepermissions;
            if (this.state.cuserid != "") {
                permissions.userId = this.state.cuserid;
            } else {
                permissions.userId = this.state.userId;
            }
            permissions.roleId = this.state.selected;
            this.setState({ permissions });
            fetch(`${UserConfig.UserConfigUrl}/api/Permission/GetRolePermissions`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify(permissions)
            }).then(response => response.json())
                .then(data => {
                    this.setState({ listData: data });
                    this.setState({ perFlag: true });
                    console.log("list data", this.state.listData);
                });

            fetch(`${UserConfig.UserConfigUrl}/api/Permission/GetUserRoleDashboard`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify(permissions)
            })
                .then(response => response.json())
                .then(data => {
                    this.setState({ dashboard: data, perFlag: true });
                    console.log("dashboards: ", data,this.state.dashboard);
                });
        } else {
            this.setState({ perFlag: false });
        }
    }

    onDateChange(type, name, event, ) {
        var today = event.toDate();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        if (type == 'searchDTO') {
            let search = this.state.searchRequest;
            search[name] = date;
        }
    }

    handleRedirect = () => {
        this.setState({ redirect: true });
    }

    handleSubmit = () => {
        const that = this;
        let x = {};
        let listData = this.state.listData;
        let dashboard = this.state.dashboard;
        if (this.state.cuserid != "") {
            x.userId = this.state.cuserid;
        } else {
            x.userId = this.state.userId;
        }
        x.rolePermissionIds = [];

        let RolesDTO = this.state.RolesDTO;//for converting rolename to roleid

        for (let i = 0; i < listData.length; i++) {
            let y = {};
            for (let k = 0; k < RolesDTO.length; k++) {
                if (listData[i].roleName == RolesDTO[k].name) {
                    y.roleId = RolesDTO[k].id;
                }
            }
            y.permissionIds = [];
            for (let j = 0; j < listData[i].mdata.length; j++) {
                if (listData[i].mdata[j].status == false) {
                    y.permissionIds = y.permissionIds.concat([listData[i].mdata[j].permissionId]);
                }
                y.permissionIds = this.handleSubmitForChildren(listData[i].mdata[j].children, y.permissionIds);
            }

            if (y.permissionIds.length > 0) {
                let d = {};
                d.permissionIds = [];
                y.permissionIds = [...new Set(y.permissionIds)];
                //dashboards menus
                for (let i = 0; i < dashboard.length; i++) {
                    for (let j = 0; j < dashboard[i].mdata.length; j++) {
                        if (dashboard[i].mdata[j].status == false) {
                            d.permissionIds = d.permissionIds.concat([dashboard[i].mdata[j].permissionId]);
                        }
                        d.permissionIds = this.handleSubmitForChildren(dashboard[i].mdata[j].children, d.permissionIds);
                    }
                    if (d.permissionIds.length > 0) {
                        d.permissionIds = [...new Set(d.permissionIds)];
                        console.log("dashboards changes: ", d.permissionIds);
                    }
                }
                y.permissionIds = y.permissionIds.concat(d.permissionIds);
                x.rolePermissionIds = x.rolePermissionIds.concat(y);
            }
        }
       
        x.rolePermissionIds = [...new Set(x.rolePermissionIds)];
        that.setState({ btnload1: true });
        fetch(`${UserConfig.UserConfigUrl}/api/Permission/SaveRolePermissions`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(x)
        }).then(function (response) {
            console.log("response", response);
            return response.json();
        }).then(function (data) {
            that.setState({ btnload1: false });
            if (data.status == 2) {
                swal({
                    text: "Privileges assigned successfully",
                    icon: "success"
                });
                that.setState({ redirect: true });
                console.log("data", data);
            }
            else if (data.status == 8) {
                swal({
                    //title: "Error",
                    text: data.errors[0].errorMessage,
                    icon: "error"
                });
            }
            else if (data.status == 400) {
                swal({
                    //title: "Sorry",
                    text: "Please try again",
                    icon: "error"
                });
            }
            else {
            }
        });
        console.log("Post Request is:", x);
    }

    handleSubmitForChildren(parent, y) {
        for (let i = 0; i < parent.length; i++) {
            for (let j = 0; j < parent.length; j++) {
                if (parent[j].status == false) {
                    y = y.concat([parent[j].permissionId]);
                }
                y = this.handleSubmitForChildren(parent[j].children, y);
            }
        }

        return y;
    }

    renderRedirect = () => {
        if (this.state.redirect == true) {
            return <Redirect to={{
                pathname: '/dashboard/home',
            }} />
        }
    }

    handleSimple = event => {
        this.setState({ [event.target.name]: event.target.value });
        this.setState({
            confiVal: event.target.value
        })
    };

    setAdminField = (event) => {
        event.preventDefault();
        var cityId = this.state.confiVal;
        $.each(this.state.userdetails, function (k, v) {
            if (v.cityId == cityId) {
                document.getElementById("admins").value = v.city;
                document.getElementById("adminVal").value = v.cityId;
                document.getElementById('admins').classList.add("active");
            }
        })
    }

    searchagain = () => {
        this.setState({ nodata: false });
        //window.scrollTo(0, this.myref.current.offsetTop);
        //window.scrollTo({
        //    top: 0,
        //    left: 0,
        //    behavior: 'smooth'
        //})
        //window.focus();
        window.scrollTo(0, 0);
        //window.location.reload();
        //this.myRef.current.scrollTo(0, 0);
        //let intervalid = setinterval(this.scrollstep.bind(this), this.props.delayinms);
        //this.setstate({ intervalid: intervalId })
    }

    render() {
        //const { pathname, search } = useRouter();
        const { classes } = this.props;
        return (
            <div>
                {this.state.pageloader ?
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12} >
                            {this.state.isButtonVisibility ?
                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                    <Card >
                                        <CardHeader color="rose" icon>
                                            <CardIcon color="rose">
                                                <Icon><img id="icon" src={user} /></Icon>
                                            </CardIcon>
                                            {
                                                <h4 >
                                                    <small><TranslationContainer translationKey="SearchUser" /></small>
                                                </h4>
                                            }
                                        </CardHeader>
                                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                            <CardBody>
                                                <div>
                                                    <GridContainer>
                                                        <GridItem xs={12} sm={4} md={3}>
                                                            <CustomInput
                                                                //success={this.state.firstNameState == "success"}
                                                                //error={this.state.firstNameState == "error"}
                                                                error={this.state.firstNameState}
                                                                labelText="FirstName"
                                                                name="firstName"
                                                                value={this.state.searchRequest.firstName}
                                                                onChange={(e) => this.SetValue("string", e)}
                                                                formControlProps={{ fullWidth: true }}
                                                            />
                                                        </GridItem>
                                                        {/*        <GridItem xs={12} sm={4}>
                                                                    <CustomInput
                                                                        success={this.state.employeeNumberState == "success"}
                                                                        error={this.state.employeeNumberState == "error"}
                                                                        labelText="Employee ID"
                                                                        name="employeeNumber"
                                                                        value={this.state.searchRequest.employeeNumber}
                                                                        onChange={(e) => this.SetValue("ID", e)}
                                                                        formControlProps={{ fullWidth: true }}
                                                                    />
                                                                </GridItem>*/}
                                                        <GridItem xs={12} sm={4} md={3}>
                                                            <CustomInput
                                                                // success={this.state.partneridState == "success"}
                                                                error={this.state.partneridState}
                                                                labelText="Partner ID"
                                                                name="partnerId"
                                                                value={this.state.searchRequest.partnerId}
                                                                onChange={(e) => this.SetValue("ID", e)}
                                                                formControlProps={{ fullWidth: true }}
                                                            />
                                                        </GridItem>
                                                        <GridItem xs={12} sm={4} md={3}>
                                                            <CustomInput
                                                                //success={this.state.emailIdState == "success"}
                                                                //error={this.state.emailIdState == "error"}
                                                                error={this.state.emailIdState}
                                                                labelText="EmailIDorUserName"
                                                                name="emailId"
                                                                value={this.state.searchRequest.emailId}
                                                                onChange={(e) => this.SetValue("email", e)}
                                                                formControlProps={{ fullWidth: true }}
                                                            />
                                                        </GridItem>
                                                        <GridItem xs={12} sm={4} md={3}>
                                                            <CustomInput
                                                                //success={this.state.contactNumberState == "success"}
                                                                //error={this.state.contactNumberState == "error"}
                                                                error={this.state.contactNumberState}
                                                                labelText="MobileNumber"
                                                                name="contactNumber"
                                                                inputType="number"
                                                                value={this.state.searchRequest.contactNumber}
                                                                onChange={(e) => this.SetValue("phnumber", e)}
                                                                formControlProps={{ fullWidth: true }}
                                                            />
                                                        </GridItem>
                                                        <GridItem xs={12} sm={4} md={3}>
                                                            <CustomInput
                                                                //success={this.state.panNoState == "success"}
                                                                //error={this.state.panNoState == "error"}
                                                                error={this.state.panNoState}
                                                                labelText="PAN"
                                                                name="panNo"
                                                                onChange={(e) => this.SetValue("pan", e)}
                                                                value={this.state.searchRequest.panNo}
                                                                formControlProps={{ fullWidth: true }}
                                                            />
                                                        </GridItem>
                                                        <GridContainer lg={12} justify="center">
                                                            <GridItem xs={5} sm={3} md={3} lg={1} >
                                                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                                    <Button color="success" round onClick={this.searchuser}>
                                                                        <TranslationContainer translationKey="Search" />
                                                                    </Button>
                                                                </Animated>
                                                            </GridItem>
                                                        </GridContainer>
                                                    </GridContainer>
                                                </div>
                                            </CardBody>
                                        </Animated>
                                    </Card>
                                    {this.state.loader ?
                                        <GridContainer xl={12}>
                                            {this.state.showusertable ?
                                                <GridItem lg={12}>
                                                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                        <ReactTable
                                                            title={"Users"}
                                                            data={this.state.data}
                                                            filterable
                                                            columns={[
                                                                {
                                                                    Header: "Select",
                                                                    accessor: "radio",
                                                                    minWidth: 20,
                                                                    setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                                    headerClassName: 'react-table-center',
                                                                    sortable: false,
                                                                    filterable: false,
                                                                    resizable: false,
                                                                },
                                                                {
                                                                    Header: "User Name",
                                                                    accessor: "UserName",
                                                                    setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                                    headerClassName: 'react-table-center',
                                                                    minWidth: 70,
                                                                    resizable: false,

                                                                },
                                                                {
                                                                    Header: "First Name",
                                                                    accessor: "FirstName",
                                                                    setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                                    headerClassName: 'react-table-center',
                                                                    minWidth: 50,
                                                                    resizable: false,

                                                                },
                                                                //{
                                                                //    Header: "Employee ID",
                                                                //    accessor: "EmpId",
                                                                //    style: { textAlign: "right" },
                                                                //    headerClassName: 'react-table-center',
                                                                //    minWidth: 50,
                                                                //    resizable: false,
                                                                //},
                                                                {
                                                                    Header: "Date Of Birth",
                                                                    accessor: "DOB",
                                                                    setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                                    headerClassName: 'react-table-center',
                                                                    minWidth: 50,
                                                                    resizable: false,
                                                                },
                                                                {
                                                                    Header: "PAN",
                                                                    accessor: "PanNo",
                                                                    setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                                    headerClassName: 'react-table-center',
                                                                    minWidth: 50,
                                                                    resizable: false,
                                                                },
                                                                {
                                                                    Header: "Mobile Number",
                                                                    accessor: "PhNo",
                                                                    setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                                    headerClassName: 'react-table-center',
                                                                    minWidth: 50,
                                                                    resizable: false,
                                                                },
                                                                //{
                                                                //    Header: "Partner ID",
                                                                //    accessor: "partnerId",
                                                                //    style: { textAlign: "right" },
                                                                //    headerClassName: 'react-table-center',
                                                                //    minWidth: 50,
                                                                //    resizable: false,
                                                                //},
                                                            ]}
                                                            defaultPageSize={5}
                                                            showPaginationTop={false}
                                                            pageSize={([this.state.data.length + 1] < 5) ? [this.state.data.length + 1] : 5}
                                                            showPaginationBottom={true}
                                                            className="-striped -highlight"
                                                        />
                                                    </Animated>
                                                    <GridContainer lg={12} justify="center">
                                                        <GridItem xs={5} sm={3} md={3} lg={1} >
                                                            <Button color="success" round onClick={this.handleClose}> <TranslationContainer translationKey="OK" /></Button>
                                                        </GridItem>
                                                    </GridContainer>
                                                </GridItem>
                                                : <GridItem lg={12}>{
                                                    this.state.nodata ?
                                                        <Card>
                                                            <GridContainer lg={12} justify="center">
                                                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                                    <img src={data_Not_found} className="tab-data-not-found" />
                                                                </Animated>
                                                            </GridContainer>
                                                            <GridContainer lg={12} justify="center">
                                                                <GridItem xs={5} sm={3} md={3} lg={1} >
                                                                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                                        <Button className="secondary-color" round onClick={() => this.searchagain()}><TranslationContainer translationKey="tryagain" /></Button>
                                                                    </Animated>
                                                                </GridItem>
                                                            </GridContainer>
                                                        </Card>
                                                        : null
                                                }
                                                </GridItem>
                                            }
                                        </GridContainer>
                                        :
                                        <Card style={paddingCard}>
                                            <TableContentLoader />
                                        </Card>
                                    }

                                </Animated>
                                : null}

                        </GridItem>
                    </GridContainer>
                    : <PageContentLoader />}
                {this.state.showpage ?
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12} >
                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                <Card >
                                    <CardHeader color="rose" icon>
                                        <CardIcon color="rose">
                                            <Icon><img id="icon" src={role} /></Icon>
                                        </CardIcon>
                                        {
                                            <h4 >
                                                <small><TranslationContainer translationKey="AssignRole" /></small>
                                            </h4>
                                        }
                                    </CardHeader>
                                    <CardBody>
                                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>

                                            <GridContainer justify="center" >
                                                <GridItem xs={8} sm={6} md={3} lg={3} >
                                                    <br />
                                                    <label>
                                                        {this.state.search ?
                                                            <div className="banner">
                                                                <label> <TranslationContainer translationKey="Username" /></label><h5>{`${this.state.userName}`}</h5>&nbsp;&nbsp;<hr></hr>
                                                            </div>
                                                            : null}
                                                        {this.state.cuser ?
                                                            <div className="banner">
                                                                <label>  <TranslationContainer translationKey="Username" /></label>
                                                                <h5>{`${this.state.UName}`}</h5>&nbsp;&nbsp;
                                                             </div>
                                                            : null}
                                                    </label>
                                                </GridItem>
                                            </GridContainer>

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
                                                    <Button color="success" /*disabled={this.state.btnload} */ onClick={this.saveroles} round className={classes.submit}> <TranslationContainer translationKey="SaveRoles" /> </Button>
                                                    {/* {this.state.btnload ? <CircularProgress id="progress-bar" size={25} /> : null}*/}
                                                </GridItem>
                                            </GridContainer>
                                        </Animated>
                                    </CardBody>
                                </Card>
                                {this.state.perFlag ?
                                    <Card>
                                        <CardHeader color="warning" icon>
                                            <CardIcon color="rose">
                                                <Icon><img id="icon" src={permission} /></Icon>
                                            </CardIcon>
                                            <h4>
                                                <small><TranslationContainer translationKey="AssignPrivileges" /></small> </h4>
                                        </CardHeader>
                                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                            <CardBody>
                                                <GridContainer justify="center" display={this.state.isButtonVisibility} >
                                                    <Permission handleSubmit={this.handleSubmit} dashboard={this.state.dashboard} /*btnload1={this.state.btnload1}*/ menuname={this.state.menuname} listData={this.state.listData} changeCollapse={this.changeCollapse} testCheck={this.testCheck} changeCollapse1={this.changeCollapse1} testCheck1={this.testCheck1} MasPermissionDTO={this.state.MasPermissionDTO} savepermission={this.savepermission} MasPermissionDTO={this.state.MasPermissionDTO} />
                                                </GridContainer>
                                            </CardBody>
                                        </Animated>
                                    </Card>
                                    : null}
                            </Animated>
                        </GridItem>
                    </GridContainer>
                    : null}
            </div>
        );
    }
}

export default withStyles(style)(AssignRole);