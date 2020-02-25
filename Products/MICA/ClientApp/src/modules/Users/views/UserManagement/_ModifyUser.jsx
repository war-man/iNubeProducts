import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import $ from 'jquery';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import UserConfig from 'modules/Users/UserConfig.js';
import user from "assets/img/user-search.png";
import MyProfile from './MyProfile.jsx';
//import ReactTable from "react-table";
import ReactTable from "components/MuiTable/MuiTable.jsx";
import swal from 'sweetalert';
import validationPage from "./ValidationPage";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip';
import Visibility from "@material-ui/icons/Visibility";
import Edit from "@material-ui/icons/Edit";
import IconButton from '@material-ui/core/IconButton';
import { Animated } from "react-animated-css";
import TableContentLoader from "components/Loaders/TableContentLoader.jsx";
import PageContentLoader from "components/Loaders/PageContentLoader.jsx";
import data_Not_found from "assets/img/data-not-found-new.png";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: '60%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',

    },
});

const paddingCard =
    {
        padding: "10px",
    };

const AntSwitch = withStyles(theme => ({
    root: {
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
    },
    switchBase: {
        padding: 2,
        color: theme.palette.grey[500],
        '&$checked': {
            transform: 'translateX(12px)',
            color: theme.palette.common.white,
            '& + $track': {
                opacity: 1,
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
            },
        },
    },
    thumb: {
        width: 12,
        height: 12,
        boxShadow: 'none',
    },
    track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: theme.palette.common.white,
    },
    checked: {},
}))(Switch);

class ModifyUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageloader: false,
            viewtext: true,
            nodata: false,
            loader: true,
            editModal: false,
            btnvisibility: false,
            picturevisibility: false,
            disabled: false,
            open: false,
            simpleSelect: "",
            selectedValue: null,
            edituser: false,
            masterList: [],
            userdetails: [],
            rowData: {},
            emaildisabled: false,
            userId: "",
            firstName: "",
            employeeNumber: "",
            employeeNumberState: "",
            partnerIdState: false,
            emailIdState: false,
            firstNameState: false,
            contactNumberState: false,
            panNoState: false,
            contactNumber: "",
            disable: false,
            showtable: false,
            panNo: "",
            data: [],
            load: false,
            masterList: [],
            display: false,
            UserData:
                {
                    "userId": "",
                    "userName": "",
                    "status": true,
                    "createdBy": "",
                    "createdDate": "",
                    "locked": true,
                    "lockedReason": "",
                    "lockStartDate": "",
                    "lockEndDate": "",
                    "lockMechanism": true,
                    "officeId": 0,
                    "firstName": "",
                    "middleName": "",
                    "lastName": "",
                    "countryId": "",
                    "stateId": "",
                    "districtId": "",
                    "cityId": "",
                    "addressLine1": "",
                    "addressLine2": "",
                    "addressLine3": "",
                    "pincodeId": "",
                    "employeeNumber": "",
                    "dob": "",
                    "doj": "",
                    "genderId": "",
                    "email": "",
                    "passportNumber": "",
                    "drivingLicenceNumber": "",
                    "contactNumber": "",
                    "userTypeId": "",
                    "panNo": "",
                    "lastLoginDateTime": "",
                    "isIos": true,
                    "isAndroid": true,
                    "isWindows": true,
                    "isPasswordChanged": true,
                    "landLineOffice": "",
                    "landLineResidence": "",
                    "partnerId": "",
                    "branchName": "",
                    "branchCode": "",
                    "designation": "",
                    "maritalStatusId": ""
                },
            resetUserData:
                {
                    "userId": "",
                    "userName": "",
                    "status": true,
                    "createdBy": "",
                    "createdDate": "",
                    "locked": true,
                    "lockedReason": "",
                    "lockStartDate": "",
                    "lockEndDate": "",
                    "lockMechanism": true,
                    "officeId": 0,
                    "firstName": "",
                    "middleName": "",
                    "lastName": "",
                    "countryId": "",
                    "stateId": "",
                    "districtId": "",
                    "cityId": "",
                    "addressLine1": "",
                    "addressLine2": "",
                    "addressLine3": "",
                    "pincodeId": "",
                    "employeeNumber": "",
                    "dob": "",
                    "doj": "",
                    "genderId": "",
                    "email": "",
                    "passportNumber": "",
                    "drivingLicenceNumber": "",
                    "contactNumber": "",
                    "userTypeId": "",
                    "panNo": "",
                    "lastLoginDateTime": "",
                    "isIos": true,
                    "isAndroid": true,
                    "isWindows": true,
                    "isPasswordChanged": true,
                    "landLineOffice": "",
                    "landLineResidence": "",
                    "partnerId": "",
                    "branchName": "",
                    "branchCode": "",
                    "designation": "",
                    "maritalStatusId": ""
                },
            radiodisable: false,
            searchRequest:
                {
                    firstName: "",
                    employeeNumber: "",
                    emailId: "",
                    contactNumber: "",
                    panNo: "",
                    partnerId: "",
                    status: "",
                }
        };
        this.showUserTable = this.showUserTable.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleView = (userId) => {
        //if (this.state.userId == "") {
        //    swal("", "Please select user to view details", "error")
        //} else {
        this.setState({ userId: userId });
        console.log("details: ", this.state.userId)
        this.handleOpen();
        let view = this.state;

        view.disabled = true;
        view.disable = true;
        view.editModal = true;
        view.open = true;
        view.btnvisibility = false;
        view.display = false;
        view.edituser = true;
        view.picturevisibility = false;
        view.viewtext = true;
        view.radiodisable = true;
        this.setState({ view });
        //}
    };

    //handleView = () => {
    //    if (this.state.userId == "") {
    //        swal("", "Please select user to view details", "error")
    //    } else {
    //        this.handleOpen();
    //        let view = this.state;

    //        view.disabled = true;
    //        view.disable = true;
    //        view.editModal = true;
    //        view.open = true;
    //        view.btnvisibility = false;
    //        view.display = false;
    //        view.edituser = true;
    //        view.picturevisibility = false;
    //        view.viewtext = true;
    //        view.radiodisable = true;
    //        this.setState({ view });
    //    }
    //};

    handleEdit = (userId) => {
        //if (this.state.userId == "") {
        //    swal("", "Please select user to edit details", "error")
        //} else {
        this.setState({ userId: userId });
        console.log("details: ", this.state.userId)
        this.handleOpen();
        let edit = this.state;
        edit.radiodisable = false;
        edit.editModal = true;
        edit.emaildisabled = true;
        edit.btnvisibility = true;
        edit.open = true;
        edit.disabled = false;
        edit.disable = false;
        edit.display = false;
        edit.edituser = true;
        edit.viewtext = false;
        edit.picturevisibility = false
        this.setState({ edit });
        //}
    };

    //handleEdit = (id) => {
    //    if (this.state.userId == "") {
    //        swal("", "Please select user to edit details", "error")
    //    } else {
    //        this.handleOpen();
    //        let edit = this.state;
    //        edit.radiodisable = false;
    //        edit.editModal = true;
    //        edit.emaildisabled = true;
    //        edit.btnvisibility = true;
    //        edit.open = true;
    //        edit.disabled = false;
    //        edit.disable = false;
    //        edit.display = false;
    //        edit.edituser = true;
    //        edit.viewtext = false;
    //        edit.picturevisibility = false
    //        this.setState({ edit });
    //    }
    //};

    handleClose = () => {
        this.setState({ search: true });
        this.setState({ open: false });
        this.showUserTable();
        //this.setState({ showtable: false });
    };

    componentDidMount() {
        setTimeout(
            function () {
                this.setState({ pageloader: true });
            }.bind(this), 2000
        );
        fetch(`${UserConfig.UserConfigUrl}/api/UserProfile/GetMasterData?sMasterlist=abc`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ masterList: data });
            });
    }

    handleSimple = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    GetMasterData = (type, event) => {
        this.SetValue(type, event);
    }

    UserDelete = (status, id) => {
        this.setState({ userId: id });
        fetch(`${UserConfig.UserConfigUrl}/api/UserProfile/DeleteUserById?Id=` + id, {
            method: 'Get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(data => {
            console.log("")
            this.showUserTable();
            if (status == true) {
                swal({
                    text: "User is Deactivated",
                    icon: "success"
                });
            }
            else {
                swal({
                    text: "User is activated",
                    icon: "success"
                });
            }
        });

        // }
    }

    showUserTable = () => {
        let request = this.state.searchRequest;
        if (request.firstName != "" || request.employeeNumber != "" ||
            request.emailId != "" || request.contactNumber != "" ||
            request.panNo != "" || request.partnerId != "" || request.status != ""
        ) {
            this.setState({ loader: false, load: true});
            fetch(`${UserConfig.UserConfigUrl}/api/UserProfile/SearchUser`, {
                method: 'POST',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                }
            }
            ).then(response => response.json())
                .then(data => {
                    this.setState({ userdetails: data, UserData: data });
                    console.log("details: ", this.state.userdetails);
                    this.setState({ showtable: false, loader: false });
                    if (this.state.userdetails.length > 0) {
                        this.tabledata();
                    } else {
                        setTimeout(
                            function () {
                                this.setState({ loader: true, showtable: false, nodata: true });
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
        this.setState({ loader: true, load: false, showtable: true });
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
                    radio: <input type="radio" name="product" onClick={this.editFunction.bind(this, key, prop.userId)} />,
                    btn: <div>
                        <Tooltip title={< TranslationContainer translationKey="View" />} placement="bottom" arrow>
                            <IconButton color="info" justIcon round simple className="view" onClick={() => this.handleView(prop.userId)} ><Visibility /></IconButton>
                        </Tooltip>
                        <Tooltip title={< TranslationContainer translationKey="Edit" />} placement="bottom" arrow>
                            <IconButton color="info" justIcon round simple className="edit" onClick={() => this.handleEdit(prop.userId)} editModal={this.state.editModal}><Edit /></IconButton>
                        </Tooltip >
                    </div>,
                    status: <div>
                        {
                            (prop.isActive == true) ?
                                (
                                    < Tooltip title={< TranslationContainer translationKey="Deactivate" />} placement="bottom" arrow >
                                        <Switch checked={prop.isActive} color="primary" onClick={() => this.UserDelete(prop.isActive, prop.userId)} />
                                    </Tooltip >
                                )
                                :
                                (
                                    < Tooltip title={< TranslationContainer translationKey="Activate" />} placement="bottom" arrow >
                                        <Switch checked={prop.isActive} color="primary" onClick={() => this.UserDelete(prop.isActive, prop.userId)} />
                                    </Tooltip >
                                )
                        }
                    </div>
                };
            })
        });
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

    editFunction(id, uId) {
        var orgArr = this.state.userdetails
        var userArr = [];
        $.each(orgArr, function (k, v) {
            if (v.userId == uId) {
                userArr.push(orgArr[id]);
            }
        })
        const userdata = userArr[0].userId;
        this.state.rowData = userArr[0];
        this.setState({ userId: userdata });
        this.state.UserData = this.state.rowData;
    }

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
            case "LandLineNumber":
                if (validationPage.verifyLandLineNumber(event.target.value)) {
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

    render() {
        const { classes } = this.props;

        return (
            <div>
                {this.state.pageloader ?
                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                        <Card>
                            <CardHeader color="rose" icon>
                                <CardIcon color="rose">
                                    <Icon><img id="icon" src={user} /></Icon>
                                </CardIcon>
                                {
                                    <h4 >
                                        <small> <TranslationContainer translationKey="UserSearch" /> </small>
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
                                            {/*    <GridItem xs={12} sm={4}>
                                        <CustomInput
                                            success={this.state.employeeNumberState == "success"}
                                            error={this.state.employeeNumberState == "error"}
                                            labelText="Employee ID"
                                            name="employeeNumber"
                                            value={this.state.searchRequest.employeeNumber}
                                            onChange={(e) => this.SetValue("ID",e)}
                                            formControlProps={{ fullWidth: true }}
                                        />
                                    </GridItem>*/}
                                            <GridItem xs={12} sm={4} md={3}>
                                                <CustomInput
                                                    error={this.state.partnerIdState}
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
                                            <GridItem xs={12} sm={4} md={3}>
                                                <MasterDropdown labelText="SelectStatus"
                                                    id="gender"
                                                    lstObject={this.state.masterList}
                                                    filterName='isActive'
                                                    required={true}
                                                    value={this.state.searchRequest.status}
                                                    name='status'
                                                    onChange={(e) => this.GetMasterData("status", e)}
                                                    formControlProps={{ fullWidth: true }}
                                                />
                                            </GridItem>
                                            <GridContainer lg={12} justify="center">
                                                <GridItem xs={5} sm={3} md={3} lg={1} >
                                                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                        <Button color="success"/* disabled={this.state.load} */round onClick={this.showUserTable}> <TranslationContainer translationKey="Search" /> </Button>
                                                        {/* {this.state.load ? <CircularProgress id="progress-bar" size={25} /> : null}*/}
                                                    </Animated>
                                                </GridItem>
                                            </GridContainer>
                                            <GridContainer justify="center">
                                            </GridContainer>
                                        </GridContainer>
                                    </div>
                                </CardBody>
                            </Animated>
                        </Card>
                    </Animated>
                    : <PageContentLoader />}
                {this.state.loader ?
                    <GridContainer xl={12}>
                        {this.state.showtable ?
                            <GridItem lg={12}>
                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                    <ReactTable
                                        title={"Users"}
                                        data={this.state.data}
                                        filterable
                                        columns={[
                                            //{
                                            //    Header: "Select",
                                            //    accessor: "radio",
                                            //    minWidth: 30,
                                            //    setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                            //    headerClassName: 'react-table-center',
                                            //    sortable: false,
                                            //    filterable: false,
                                            //    resizable: false,
                                            //},
                                            {
                                                Header: "User Name",
                                                accessor: "UserName",
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                headerClassName: 'react-table-center',
                                                minWidth: 100,
                                                resizable: false,

                                            },
                                            {
                                                Header: "First Name",
                                                accessor: "FirstName",
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                headerClassName: 'react-table-center',
                                                minWidth: 70,
                                                resizable: false,
                                            },
                                            //   {
                                            //    Header: "Employee ID",
                                            //    accessor: "EmpId",
                                            //    style: { textAlign: "center" },
                                            //    headerClassName: 'react-table-center',
                                            //    minWidth: 70,
                                            //    resizable: false,
                                            //},
                                            {
                                                Header: "Date Of Birth",
                                                accessor: "DOB",
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                headerClassName: 'react-table-center',
                                                minWidth: 70,
                                                resizable: false,
                                            },
                                            {
                                                Header: "PAN",
                                                accessor: "PanNo",
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                headerClassName: 'react-table-center',
                                                minWidth: 70,
                                                resizable: false,
                                            },
                                            {
                                                Header: "Mobile Number",
                                                accessor: "PhNo",
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                headerClassName: 'react-table-center',
                                                minWidth: 70,
                                                resizable: false,
                                            },
                                            {
                                                Header: "Action",
                                                accessor: "btn",
                                                minwidth: 30,
                                                style: { textalign: "left" },
                                                headerclassname: 'react-table-center',
                                                resizable: false,
                                            },
                                            {
                                                Header: "Status",
                                                accessor: "status",
                                                minwidth: 30,
                                                style: { textalign: "left" },
                                                headerclassname: 'react-table-center',
                                                resizable: false,
                                            },
                                        ]}
                                        pageSize={([this.state.data.length + 1] < 5) ? [this.state.data.length + 1] : 5}
                                        defaultPageSize={5}
                                        showPaginationTop={false}
                                        showPaginationBottom={([this.state.data.length + 1] <= 5) ? false : true}
                                        className="-striped -highlight"
                                    />
                                </Animated>
                                {/*          <GridContainer>
                                    <div className="center-modify-user-product">
                                        <Button color="success" id="push-right" round className={classes.marginRight} onClick={this.handleView}> View </Button>
                                        <Button color="success" round className={classes.marginRight} onClick={this.handleEdit} editModal={this.state.editModal}> Edit </Button>
                                        <Button color="success" round className={classes.marginRight} onClick={this.UserDelete} > Activate/Deactivate </Button>
                                    </div>
                                </GridContainer>*/}
                                <Modal
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                    open={this.state.open}
                                    onClose={this.handleClose}>

                                    <div className={classes.paper} id="modal">
                                        {this.state.viewtext ? <h4>  <small className="center-text"> <TranslationContainer translationKey="ViewUser" /></small> </h4>
                                            :
                                            <h4>  <small className="center-text"> <TranslationContainer translationKey="ModifyUser" /> </small> </h4>
                                        }
                                        <Button color="success"
                                            round
                                            className={classes.marginRight}
                                            id="close-bnt"
                                            onClick={this.handleClose}>
                                            &times;
                                                        </Button>

                                        <div id="disp" >
                                            <MyProfile disabled={this.state.disabled} radiodisable={this.state.radiodisable} picturevisibility={this.state.picturevisibility} disable={this.state.disable} emaildisabled={this.state.emaildisabled} edituser={this.state.edituser} display={this.state.display} editModal={this.state.editModal} handleClose={this.handleClose} searcheduser={this.state.UserData} isdisable={this.state.isdisable} searchUserId={this.state.userId} btnvisibility={this.state.btnvisibility} />
                                        </div>
                                    </div>

                                </Modal>
                            </GridItem>
                            : <GridItem lg={12}>{
                                this.state.nodata ? <Card>
                                    <GridContainer lg={12} justify="center">
                                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                            <img src={data_Not_found} className="tab-data-not-found" />
                                        </Animated>
                                    </GridContainer>
                                    <GridContainer lg={12} justify="center">
                                        <GridItem xs={5} sm={3} md={3} lg={1} >
                                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                <Button className="secondary-color" round onClick={() => this.searchagain()}> <TranslationContainer translationKey="Tryagain" />Try again </Button>
                                            </Animated>
                                        </GridItem>
                                    </GridContainer>
                                </Card>
                                    : null}
                            </GridItem>
                        }
                    </GridContainer> :
                    <Card style={paddingCard}>
                        <TableContentLoader />
                    </Card>
                }
            </div>
        );
    }
}
export default withStyles(styles)(ModifyUser);