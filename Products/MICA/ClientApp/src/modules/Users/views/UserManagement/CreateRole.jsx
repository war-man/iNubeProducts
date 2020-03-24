import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import $ from 'jquery';
import UserConfig from 'modules/Users/UserConfig.js';
// core components
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
import { Animated } from "react-animated-css";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import CircularProgress from '@material-ui/core/CircularProgress';
import Edit from "@material-ui/icons/Edit";
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Modal from '@material-ui/core/Modal';
import { config } from "../../../../config";

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

const okBtn = {
    left: "14%"

}

class CreateRole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            permissionpage: false,
            id: "",
            btnload: false,
            btnload1: false,
            roledata: "",
            dashboard: [],
            rolename: "",
            rowData: "",
            rolenormalizedname: "",
            userdetails: [],
            multiroles: [],
            value: props.state || '',
            selected: [],
            RolesDTO: [],
            menuname: false,
            permission: [],
            newroleid: "",
            showtable: false,
            showname: false,
            simpleSelect: "",
            open: false,
            data: [],
            MasPermissionDTO: [],
            Roles: {
                "name": "",
                "normalizedName": ""
            },
            initialRoles: {
                "name": "",
            },
            dashboardvalue: "",
            listData: [],
            reports: [],
            rolemenupermissions: {
                "roleId": ""
            },
            searchRequest: {
                "roleid": "",
                "editrolename": "",
            },
            rolepermissions: {
                "roleId": "",
                "permissionIds": []
            }
        };
        this.CreateRole = this.CreateRole.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    CreateRole() {
        if (this.state.Roles.name != "") {
            let role = this.state.Roles;
            role["normalizedName"] = role.name;
            this.setState({ role })
            console.log("final role", this.state.Roles);
            this.setState({ btnload: true });
            fetch(`${UserConfig.UserConfigUrl}/api/Role/CreateRole`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify(role)
            }).then(response => response.json())
                .then(data => {
                    this.setState({ btnload: false });
                    console.log("response data", data);
                    if (data.status == 2) {
                        this.setState({ newroleid: data.id, permissionpage: true, Roles: this.state.initialRoles });
                        swal({
                            text: data.responseMessage,
                            icon: "success"
                        });
                        this.handleRolepermission();
                        this.handleAllRoles();
                    } else if (data.status == 8) {
                        swal({
                            text: data.errors[0].errorMessage,
                            icon: "error"
                        });
                    } else if (data.status == 400) {
                        swal({
                            text: "Some fields are missing",
                            icon: "error"
                        });
                    }
                    else { }
                });

        } else {
            swal({
                text: "Some fields are missing",
                icon: "error"
            });
        }

    }

    handleAllRoles = () => {
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
                console.log("roles", this.state.RolesDTO);
                if (this.state.RolesDTO.length > 0) {
                    this.datatable();
                }
            });
    }

    handleClose = () => {
        this.setState({
            showtable: false,
            open: false,
            menuname: false
        });
    }

    componentDidMount() {
        this.setState({ menuname: false });
        this.handleAllRoles();
        this.handleRolepermission();
    }

    handleRolepermission = () => {

        fetch(`${UserConfig.UserConfigUrl}/api/Permission/GetAllPermissions`, {
            method: 'Get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(response => response.json())
            .then(data => {
                this.setState({ listData: data });
                console.log("permission data", this.state.listData);
            });

        fetch(`${UserConfig.UserConfigUrl}/api/Permission/GetDashboards`, {
            method: 'Get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(response => response.json())
            .then(data => {
                this.setState({ dashboard: data });
                console.log("permission data", this.state.dashboard);
            });

        fetch(`${UserConfig.UserConfigUrl}/api/Permission/GetReports`, {
            method: 'Get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(response => response.json())
            .then(data => {
                this.setState({ reports: data });
                console.log("permission data", this.state.reports);
            });
    }

    handleOpen = () => {
        this.setState({ open: true });
    }

    handleEdit = (roleId, rolename) => {
        //if (this.state.userId == "") {
        //    swal("", "Please select user to edit details", "error")
        //} else {
        let role = this.state.searchRequest;
        role.roleid = roleId;
        role.editrolename = rolename;
        this.setState({ role, menuname: true });
        console.log("perms: ", roleId)
        console.log("perms: ", this.state.searchRequest)
        this.handleOpen();
        let perm = this.state.rolemenupermissions;
        perm.roleId = roleId;
        this.setState({ perm });
        console.log("perms: ", perm)
        fetch(`${UserConfig.UserConfigUrl}/api/Permission/GetRolePermissionsbyid`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(perm)
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ listData: data });
                console.log("list data", this.state.listData);
            });

        fetch(`${UserConfig.UserConfigUrl}/api/Permission/Roledashboard`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(perm)
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ dashboard: data });
                console.log("dashboards: ", this.state.dashboard);
            });

        this.state.reports = [];
        fetch(`${UserConfig.UserConfigUrl}/api/Permission/RoleReports`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(perm)
        })
            .then(response => response.json())
            .then(data => {

                this.setState({ reports: data });
                console.log("reports: ", this.state.reports);
                this.handleOpen();
            });
    };

    datatable = () => {
        this.setState({
            data: this.state.RolesDTO.map((prop, key) => {
                const { classes } = this.props;
                return {
                    id: prop.id,
                    name: prop.name,
                    normalizedname: prop.normalizedName,
                    concurrencystamp: prop.concurrencyStamp,
                    //radio: < input type="radio" name="product" onClick={this.editFunction.bind(this, key, prop.id)} />
                    radio: <div>
                        <Tooltip title={< TranslationContainer translationKey="Edit" />} placement="bottom" arrow>
                            <IconButton color="info" justIcon round simple className="edit" onClick={() => this.handleEdit(prop.id, prop.name)} /*editModal={this.state.editModal}*/><Edit /></IconButton>
                        </Tooltip >
                    </div>
                };
            })
        });
    }

    //editFunction(id, uId) {
    //    var orgArr = this.state.RolesDTO;
    //    var roleArr = [];
    //    $.each(orgArr, function (k, v) {
    //        if (v.id == uId) {
    //            roleArr.push(orgArr[id]);
    //        }
    //    })
    //    console.log("roles dto", roleArr)
    //    const roleid = roleArr[0].id;
    //    const roledata = roleArr[0];
    //    const rolename = roleArr[0].name;
    //    this.state.id = roleid;
    //    console.log("id", this.state.id)
    //    this.state.roledata = roledata;
    //    console.log("roledata", this.state.roledata)
    //    this.state.rolename = rolename;
    //    console.log("rolename", this.state.rolename)
    //    this.state.rowData = roleArr;
    //    this.setState({ rowData: roleArr });
    //    this.setState({});
    //}

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

    testCheck2 = (index, location, c, event) => {
        if (location.length > 0) {
            let responses = [...this.state.reports[c].mdata];
            responses[location[0]]['children'][index]['status'] = !responses[location[0]]['children'][index]['status'];
            this.setState({ responses });
        } else {
            let responses = [...this.state.reports[c].mdata];
            responses[index].status = !responses[index].status;
            this.setState({ responses });
            this.setChildren(responses[index]['children'], responses[index].status);
        }
        event.preventDefault();
    }

    changeCollapse = (index, location, c) => {
        let listData = this.state.listData[c].mdata;
        for (let i = 0; i < location.length; i++) {
            listData = listData[location[i]]['children'];
        }
        listData[index]['collapse'] = !listData[index]['collapse'];
        this.setState(listData);
    }

    changeCollapse1 = (index, location, c) => {
        let dashboard = this.state.dashboard[c].mdata;
        for (let i = 0; i < location.length; i++) {
            dashboard = dashboard[location[i]]['children'];
        }
        dashboard[index]['collapse'] = !dashboard[index]['collapse'];
        this.setState(dashboard);
    }

    changeCollapse2 = (index, location, c) => {
        let reports = this.state.reports[c].mdata;
        for (let i = 0; i < location.length; i++) {
            reports = reports[location[i]]['children'];
        }
        reports[index]['collapse'] = !reports[index]['collapse'];
        this.setState(reports);
    }

    setChildren = (parent, value) => {
        for (let i = 0; i < parent.length; i++) {
            let x = parent[i];
            x['status'] = value;
            this.setState(x);
            this.setChildren(x['children'], value);
        }
    }

    handleDropdown = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    SetValue = (event) => {
        event.preventDefault();

        let roles = this.state.Roles;
        let name = event.target.name;
        let value = event.target.value;
        roles[name] = value;

        this.setState({ roles })
    };

    searchdata = () => {
        this.setState({ showtable: true });
        this.handleAllRoles();
    }

    calculate = (listData, tempArray) => {
        for (let i = 0; i < listData.length; i++) {
            let x = {};
            x.permissionId = listData[i].permissionId;
            x.label = listData[i].label;

            tempArray.concat([x]);
            console.log("Yaakappa Maaraya");
            tempArray = this.calculate(listData[i].children)
        }
        return tempArray;
    }

    handleRedirect = () => {
        this.setState({ redirect: true });
    }

    handleSubmit = () => {
        const that = this;
        let x = {};
        let listData = that.state.listData;
        let dashboard = that.state.dashboard;
        let reports = that.state.reports;
        console.log("new Roleid", that.state.newroleid);
        if (this.state.newroleid != "") {
            x.roleId = that.state.newroleid;
        } else {
            x.roleId = that.state.searchRequest.roleid;
        }
        x.permissionIds = [];
        let RolesDTO = that.state.RolesDTO;//for converting rolename to roleid
        for (let i = 0; i < listData.length; i++) {
            let y = {};
            y.newpermissionIds = [];
            for (let j = 0; j < listData[i].mdata.length; j++) {
                if (listData[i].mdata[j].status == true) {
                    y.newpermissionIds = y.newpermissionIds.concat([listData[i].mdata[j].permissionId]);
                }
                y.newpermissionIds = this.handleSubmitForChildren(listData[i].mdata[j].children, y.newpermissionIds);
            }

            if (y.newpermissionIds.length > 0 || y.newpermissionIds.length == 0) {
                y.newpermissionIds = [...new Set(y.newpermissionIds)];
                console.log("y.newpermissionIds: ", y.newpermissionIds);
                x.permissionIds = x.permissionIds.concat(y.newpermissionIds);
                console.log("x.permissionIds: ", x.permissionIds);
            }
        }

        for (let i = 0; i < dashboard.length; i++) {
            let y = {};
            y.newpermissionIds = [];
            for (let j = 0; j < dashboard[i].mdata.length; j++) {
                if (dashboard[i].mdata[j].status == true) {
                    y.newpermissionIds = y.newpermissionIds.concat([dashboard[i].mdata[j].permissionId]);
                }
                y.newpermissionIds = this.handleSubmitForChildren(dashboard[i].mdata[j].children, y.newpermissionIds);
            }
            if (y.newpermissionIds.length > 0 || y.newpermissionIds.length || 0) {
                y.newpermissionIds = [...new Set(y.newpermissionIds)];
                console.log("dashboards changes: ", y.newpermissionIds);
                x.permissionIds = x.permissionIds.concat(y.newpermissionIds);
                console.log("dashboards changes: ", x.permissionIds);
            }
        }
        debugger;
        for (let i = 0; i < reports.length; i++) {
            let y = {};
            y.newpermissionIds = [];
            for (let j = 0; j < reports[i].mdata.length; j++) {
                if (reports[i].mdata[j].status == true) {
                    y.newpermissionIds = y.newpermissionIds.concat([reports[i].mdata[j].permissionId]);
                }
                y.newpermissionIds = this.handleSubmitForChildren(reports[i].mdata[j].children, y.newpermissionIds);
            }

            if (y.newpermissionIds.length > 0 || y.newpermissionIds.length == 0) {
                y.newpermissionIds = [...new Set(y.newpermissionIds)];
                console.log("y.newpermissionIds: ", y.newpermissionIds);
                x.permissionIds = x.permissionIds.concat(y.newpermissionIds);
                console.log("x.permissionIds: ", x.permissionIds);
            }
        }

        x.permissionIds = [...new Set(x.permissionIds)];
        //if (this.state.searchRequest.roleid == "") {
        //    x.permissionIds.push(this.state.dashboardvalue);
        //}
        console.log("Final data", x);
        this.setState({ btnload1: true });
        fetch(`${UserConfig.UserConfigUrl}/api/Permission/AssignRolePermissions`, {
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
            console.log("data", data);
            that.setState({ btnload1: false });
            if (data.status == 2) {
                swal({
                    text: "Privileges assigned successfully",
                    icon: "success"
                });
                that.setState({ permissionpage: false });
                console.log("data", data);
                if (this.state.menuname == true) {
                    this.handleClose();
                }
            }
            else if (data.status == 8) {
                swal({
                    title: "Error",
                    text: data.errors[0].errorMessage,
                    icon: "error"
                });
            }
            else if (data.status == 400) {
                swal({
                    title: "Sorry",
                    text: "Please try again",
                    icon: "error"
                });
            }
            else {
            }
        });

    }

    handleSubmitForChildren(parent, y) {
        for (let i = 0; i < parent.length; i++) {
            for (let j = 0; j < parent.length; j++) {
                if (parent[j].status == true) {
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

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Card>
                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                            <Icon><img id="icon" src={role} /></Icon>
                        </CardIcon>
                        {
                            <h4 >
                                <small> <TranslationContainer translationKey="SearchRole" /> </small>
                            </h4>
                        }
                    </CardHeader>
                    <CardBody>
                        <GridContainer>
                            <GridItem xs={12} sm={4}>
                                <CustomInput
                                    labelText="RoleName"
                                    id="rolename"
                                    name="rolename"
                                    formControlProps={{ fullWidth: true }}
                                />
                            </GridItem>
                            {/*    <GridItem xs={12} sm={4}>
                                <CustomInput
                                    labelText="Normalized Name"
                                    id="normalizedname"
                                    name="normalizedname"
                                    formControlProps={{ fullWidth: true }}
                                />
                            </GridItem>*/}
                            <GridItem xs={12} sm={4}>
                                <Button id="top-bnt" onClick={this.searchdata} round color="success"><TranslationContainer translationKey="Search" /></Button>
                            </GridItem>
                        </GridContainer>
                    </CardBody>
                </Card>
                {this.state.showtable ?
                    <GridContainer>
                        <GridItem xs={12}>
                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                <ReactTable
                                    title={"Roles"}
                                    data={this.state.data}
                                    filterable
                                    columns={[

                                        //{
                                        //    Header: "Role Id",
                                        //    accessor: "id",
                                        //    style: { textAlign: "left" },
                                        //    headerClassName: 'react-table-center',
                                        //    minWidth: 80,
                                        //    resizable: false,
                                        //},
                                        {
                                            Header: "Role Name",
                                            accessor: "name",
                                            setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                            headerClassName: 'react-table-center',
                                            minWidth: 50,
                                            resizable: false,
                                        },
                                        {
                                            Header: "Edit",
                                            accessor: "radio",
                                            minWidth: 10,
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            sortable: false,
                                            filterable: false,
                                            resizable: false,
                                        },
                                        //{
                                        //    Header: "Normalized Name",
                                        //    accessor: "normalizedname",
                                        //    style: { textAlign: "center" },
                                        //    headerClassName: 'react-table-center',
                                        //    minWidth: 50,
                                        //    resizable: false,
                                        //},
                                        {
                                            Header: "Date of Role Created",
                                            accessor: "concurrencystamp",
                                            setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                            headerClassName: 'react-table-center',
                                            minWidth: 50,
                                            resizable: false,
                                        },
                                    ]}
                                    defaultPageSize={5}
                                    showPaginationTop={false}
                                    pageSize={([this.state.data.length + 1] < 5) ? [this.state.data.length + 1] : 5}
                                    showPaginationBottom={([this.state.data.length + 1] <= 5) ? false : true}
                                    className="-striped -highlight"
                                />
                            </Animated>
                            <Modal
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                open={this.state.open}
                                onClose={this.handleClose}>

                                <div className={classes.paper} id="modal">
                                    {/*<h4>  <small className="center-text"> <TranslationContainer translationKey="ModifyUser" /> </small> </h4>*/}
                                    <h4>  <small className="center-text"> Edit Role </small> </h4>
                                    <Button color="success"
                                        round
                                        className={classes.marginRight}
                                        id="close-bnt"
                                        onClick={this.handleClose}>
                                        &times;
                                                        </Button>
                                    <GridContainer justify="center">
                                        <div className="banner">
                                            {/* <label> <TranslationContainer translationKey="Username" /></label><h5>{`${this.state.userName}`}</h5>&nbsp;&nbsp;<hr></hr>*/}
                                            <label><h5>Role name: {this.state.searchRequest.editrolename}</h5></label>
                                        </div>
                                    </GridContainer>
                                    <div id="disp" >
                                        <Permission handleSubmit={this.handleSubmit} reports={this.state.reports} changeCollapse2={this.changeCollapse2} testCheck2={this.testCheck2}/*btnload1={this.state.btnload1}*/ dashboard={this.state.dashboard} handleDropdown={this.handleDropdown} dashboardvalue={this.state.dashboardvalue} menuname={this.state.menuname} listData={this.state.listData} changeCollapse={this.changeCollapse} testCheck={this.testCheck} changeCollapse1={this.changeCollapse1} testCheck1={this.testCheck1} MasPermissionDTO={this.state.MasPermissionDTO} savepermission={this.savepermission} MasPermissionDTO={this.state.MasPermissionDTO} />
                                    </div>
                                </div>

                            </Modal>
                        </GridItem>
                        <GridContainer justify="center">
                            <GridItem xs={3} sm={3} md={3}>
                                <Button color="success" round className={classes.marginRight} style={okBtn} onClick={this.handleClose}> <TranslationContainer translationKey="OK" /> </Button>
                            </GridItem>
                        </GridContainer>
                    </GridContainer>
                    : null}
                <Card >
                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                            <Icon><img id="icon" src={role} /></Icon>
                        </CardIcon>
                        {
                            <h4 >
                                <small> <TranslationContainer translationKey="CreateRole" />Create Role </small>
                            </h4>
                        }
                    </CardHeader>
                    <CardBody>
                        <GridContainer justify="center" >
                            <GridItem xs={8} sm={6} md={3} lg={3} >
                                {this.state.showname ?
                                    <div className="assign-role-info">
                                        <label>  <TranslationContainer translationKey="Rolename" />Rolename:</label>
                                        <h5>{`${this.state.rolename}`}</h5>&nbsp;&nbsp;
                                        </div>
                                    : null}
                            </GridItem>
                        </GridContainer>
                        <GridContainer justify="start">
                            <GridItem xs={12} sm={4}>
                                <CustomInput
                                    labelText="NameofaRole"
                                    name="name"
                                    required={true}
                                    value={this.state.Roles.name}
                                    onChange={(e) => this.SetValue(e)}
                                    formControlProps={{ fullWidth: true }}
                                />
                            </GridItem>
                            {/* <GridItem xs={12} sm={4}>
                                <CustomInput
                                    labelText="Normalized Name"
                                    name="normalizedName"
                                    required={true}
                                    value={this.state.Roles.normalizedName}
                                    onChange={(e) => this.SetValue(e)}
                                    formControlProps={{ fullWidth: true }}
                                />
                            </GridItem>*/}
                            <GridItem xs={12} sm={4}>
                                <Button /*disabled={this.state.btnload}*/ color="success" id="top-bnt" round className={classes.marginRight} style={modalSearch} onClick={this.CreateRole}>
                                    <TranslationContainer translationKey="Save" />
                                </Button>
                                {/*  {this.state.btnload ? <CircularProgress id="progress-bar" size={25} /> : null}*/}
                            </GridItem>
                        </GridContainer>

                    </CardBody>
                </Card>
                <GridContainer justify="center">
                    <GridItem xs={12}>
                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                            <ReactTable
                                title={"Roles"}
                                data={this.state.data}
                                filterable
                                columns={[
                                    //{
                                    //    Header: "Role Id",
                                    //    accessor: "id",
                                    //    style: { textAlign: "left" },
                                    //    headerClassName: 'react-table-center',
                                    //    minWidth: 100,
                                    //    resizable: false,

                                    //},
                                    {
                                        Header: "Role Name",
                                        accessor: "name",
                                        setCellProps: (value) => ({ style: { textAlign: "center" } }),
                                        headerClassName: 'react-table-center',
                                        minWidth: 50,
                                        resizable: false,

                                    },

                                    //{
                                    //    Header: "Normalized Name",
                                    //    accessor: "normalizedname",
                                    //    style: { textAlign: "left" },
                                    //    headerClassName: 'react-table-center',
                                    //    minWidth: 50,
                                    //    resizable: false,
                                    //},
                                    {
                                        Header: "Date of Role Created",
                                        accessor: "concurrencystamp",
                                        setCellProps: (value) => ({ style: { textAlign: "center" } }),
                                        headerClassName: 'react-table-center',
                                        minWidth: 70,
                                        resizable: false,
                                    },
                                ]}
                                defaultPageSize={5}
                                showPaginationTop={false}
                                showPaginationBottom
                                className="-striped -highlight"
                            />
                        </Animated>
                    </GridItem>
                </GridContainer>
                {this.state.permissionpage ?
                    <Card>
                        <CardHeader color="warning" icon>
                            <CardIcon color="rose">
                                <Icon><img id="icon" src={permission} /></Icon>
                            </CardIcon>
                            <h4>
                                <small><TranslationContainer translationKey="AssignPrivilegestotheRole" />
                                </small> </h4>
                        </CardHeader>
                        <CardBody>
                            <GridContainer justify="center" >
                                <Permission handleSubmit={this.handleSubmit} dashboard={this.state.dashboard} reports={this.state.reports} changeCollapse2={this.changeCollapse2} testCheck2={this.testCheck2}/*btnload1={this.state.btnload1}*/ handleDropdown={this.handleDropdown} dashboardvalue={this.state.dashboardvalue} menuname={this.state.menuname} listData={this.state.listData} changeCollapse={this.changeCollapse} testCheck={this.testCheck} changeCollapse1={this.changeCollapse1} testCheck1={this.testCheck1} MasPermissionDTO={this.state.MasPermissionDTO} savepermission={this.savepermission} />
                            </GridContainer>
                        </CardBody>
                    </Card>
                    : null}
            </div>
        );
    }
}

export default withStyles(style)(CreateRole);