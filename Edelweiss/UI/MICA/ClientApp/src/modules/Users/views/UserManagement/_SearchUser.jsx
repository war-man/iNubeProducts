import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "components/CustomButtons/Button.jsx";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import bindModel from 'components/ModelBinding/bindModel.js';
import $ from 'jquery';
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import SalesSummaryIcon from "assets/img/sales-summary.png";
import FilterNone from "@material-ui/icons/FilterNone";
//import UserConfig from "./UserConfig";
import User from "./User";
import UserConfig from 'modules/Users/UserConfig.js';
import validationPage from "./ValidationPage";
import user from "assets/img/user.png";
const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: "#00acc1",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

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
};



function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

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

const modalStyles = {
    position: 'absolute',
    top: '10%',
    left: '10%',
    right: '10%',
    transform: 'translate(-25 %, -25%)',
    backgroundColor: 'white',
    width: 'auto',
    height: 'auto',
    borderRadius: '8px',
    paddingBottom: '5px',
    paddingRight: '2px',
    //  boxShadow: theme.shadows[5],

    'max-height': 'calc(100vh - 210px)',
    'overflow-y': 'auto'


};

const searchBtn = {
    marginTop: "25px",
    width: "120px",
    height: "35px",
    textAlign: "center"
}

const modalSearch = {
    margin: "0px auto",
    height: "25px",
    textAlign: "center",
    width: "65px",
    padding: "1px"
}

const okBtn = {

    marginLeft: "527px",
    //marginTop: "20px",
    height: "Auto",
    textAlign: "center",

    width: "Auto",
    padding: "1px"
}


const view = {
    marginLeft: "100px",
    height: "Auto",
    textAlign: "center",
    width: "Auto",
    padding: "1px"

}

const searchClose = {
    float: "right",
    position: 'relative',
    bottom: "56px",
    width: "26px",
    height: "28px",
    borderRadius: "4px",
    fontSize: "larger",
    padding: "0px",
    right: '10px',
    
}


class SearchUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editModal: false,
            open: false,
            simpleSelect: "",
            selectedValue: null,
            masterList: [],
            topics: [],
            useid: "",
            rowData: {},
            userId: "",
            userIdState: "error",
            userId: "",
            userIdState: "",
            firstName: "",
            firstNameState: "",
            employeeNumber: "",
            employeeNumberState: "",
            contactNumber: "",
            contactNumberState: "",
            panNo: "",
            panNoState: "",
            searchRequest:
            {
                "userId": "",
                "firstName": "",
                "employeeNumber": "",
                "dob": "",
                "contactNumber": "",
                "panNo": ""
            }

        };
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.showPartnerTable = this.showPartnerTable.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }
    handleClose = () => {
        this.setState({ open: false });
        console.log("User Id", this.state.searchRequest.userId);
    };

    handleEdit = (id) => {
        console.log(id)
        console.log("Userid ", this.state.searchRequest.userId);
        this.setState({ editModal: true });
        this.setState({ open: false });
        console.log(this.state.editModal);
    };
    handleOpen = () => {
        this.setState({ open: true });
    };


    handleSimple = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    showUserTable = () => {
        console.log("now :", this.state.searchRequest);
        document.getElementById('searchTableSec').style.display = 'block';
        fetch(`${UserConfig.UserConfigUrl}/api/UserProfile/SearchUser`,
            {
                method: 'POST',
                body: JSON.stringify(this.state.searchRequest),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                }
            }
        ).then(response => response.json())
            .then(data => {
                console.log("data", data);
                this.setState({ topics: data.tblUserDetails })
                console.log("data save result:", data);
                console.log("topics", this.state.topics);
            });
    }

    handleRadioChange(event) {
        this.setState({ selectedValue: event.target.value });
    }

    editFunction(id, uId) {
        console.log(uId);
        console.log("topics data", this.state.topics);
        var orgArr = this.state.topics
        var userArr = [];
        $.each(orgArr, function (k, v) {
            if (v.userId == uId) {
                userArr.push(orgArr[id]);
            }
        })
        console.log(userArr);
        const userdata = userArr[0].userId;//partner id from dto object
        console.log("userdata: ", userdata);
        const { userId } = this.state;
        this.setState({ userId: userdata });
        this.setState({ rowData: userArr });
        console.log(this.state.rowData);
        // handleEdit(uId);
    }

    //componentDidMount() {

    //    fetch(`${partnerconfig.partnerconfigUrl}/api/Organization/GetMasterData?sMasterlist=OrgCategory`)
    //        .then(response => response.json())
    //        .then(data => {
    //            this.setState({ masterList: data });
    //        });

    //    //fetch('https://localhost:44315/api/Partner/SearchPartner', {
    //    //    method: 'GET',
    //    //    body: JSON.stringify(),
    //    //    headers: {
    //    //        'Content-Type': 'application/json; charset=utf-8'
    //    //    }
    //    //})
    //    //    .then(response => response.json())
    //    //    .then(data => {


    //    //        this.setState({ topics: data })

    //    //        console.log("data save result:", data);
    //    //        console.log("topics", this.state.topics);

    //    //    });

    //};

    SetValue = (type, event) => {
        event.preventDefault();

        let UserSearch = this.state.searchRequest;
        let name = event.target.name;
        let value = event.target.value;
        UserSearch[name] = value;

        this.setState({ UserSearch })
        this.change(event, name, type);

    };
    change(event, stateName, type) {
        console.log("come baby", type);
        switch (type) {

            case "string":
                if (validationPage.verifyName(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                }
                else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "number":
                if (validationPage.verifyNumber(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                }
                else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            default:
                break;
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <Card className="assignCard">
                <CardHeader color="rose" icon>

                    <CardIcon color="rose">
                        {/*  <FilterNone /> */}
                        <Icon><img id="icon" src={user} /></Icon>
                    </CardIcon>
                    {
                        <h4 >
                            <small> User Search </small>
                        </h4>
                    }
                </CardHeader>
                <CardBody>
                <Button color="info" style={searchBtn} onClick={this.handleOpen}>
                    Search User
                </Button>


                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <div className={classes.paper} style={modalStyles}>
                        <h4 className="search-heading">Search Member <Button color="info" className={classes.marginRight} style={searchClose} onClick={this.handleClose}>
                            &times;
                                </Button>
                        </h4>
                        <GridContainer>
                                <GridItem xs={12} sm={4}>
                                    <CustomInput
                                        success={this.state.userIdState === "success"}
                                        error={this.state.userIdState === "error"}
                                        labelText="User Id*"
                                        //id="partnerNmae"
                                        name="userId"
                                        value={this.state.searchRequest.userId}
                                        onChange={(e) => this.SetValue("string", e)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={4}>
                                    <CustomInput
                                        success={this.state.firstNameState === "success"}
                                        error={this.state.firstNameState === "error"}
                                        labelText="First Name*"
                                        //id="firstName"
                                        name="firstName"
                                        value={this.state.searchRequest.firstName}
                                        onChange={(e) => this.SetValue("string", e)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={4}>
                                    <CustomInput
                                        success={this.state.employeeNumberState === "success"}
                                        error={this.state.employeeNumberState === "error"}
                                        labelText="Employee Id*"
                                        //id="employeeNumber"
                                        name="employeeNumber"
                                        value={this.state.searchRequest.employeeNumber}
                                        onChange={(e) => this.SetValue("string", e)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={4}>
                                    <CustomDatetime
                                        labelText="Date of Birth*"
                                        name='dob'
                                        onChange={(evt) => this.onDateChange('searchDTO', 'dob', evt)}
                                        // value={props.}
                                        value={this.state.searchRequest.dob}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={4}>
                                    <CustomInput
                                        success={this.state.contactNumberState === "success"}
                                        error={this.state.contactNumberState === "error"}
                                        labelText="Phone Number*"
                                        //id="partnerNmae"
                                        name="contactNumber"
                                        value={this.state.searchRequest.contactNumber}
                                        onChange={(e) => this.SetValue("number", e)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={4}>
                                    <CustomInput
                                        success={this.state.panNoState === "success"}
                                        error={this.state.panNoState === "error"}
                                        labelText="Pan Number*"
                                        //id="partnerNmae"
                                        name="panNo"
                                        onChange={(e) => this.SetValue("string", e)}
                                        value={this.state.searchRequest.panNo}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                </GridItem>

                            <GridContainer>
                                    <Button color="info" round className={classes.marginRight} style={modalSearch} onClick={this.showUserTable}>
                                    Search
                                </Button>
                            </GridContainer>

                            <GridContainer>
                                <div id="searchTableSec" style={{ display: 'none' }}>
                                    <br />
                                    <Paper className={classes.root} style={{ marginLeft: '75px', marginRight: '75px' }} >
                                        <Table className={classes.table} style={{ borderRadius: '6px  ', width: '100%', margin: '0 auto' }} id="searchTable">
                                            <TableHead>
                                                <TableRow className="table-row" style={{ height: '20px' }}>
                                                    <CustomTableCell className="table-row">User Id</CustomTableCell>
                                                    <CustomTableCell className="table-row">First Name</CustomTableCell>
                                                    <CustomTableCell className="table-row">Emp Id</CustomTableCell>
                                                    <CustomTableCell className="table-row">DoB</CustomTableCell>
                                                    <CustomTableCell className="table-row">Phone Num</CustomTableCell>
                                                    <CustomTableCell className="table-row">Pan Numr</CustomTableCell>
                                                    <CustomTableCell className="table-row">Select</CustomTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <tbody>
                                                {this.state.topics.map((topic, index) =>
                                                    <tr className="tableClassRow" key={index}>
                                                        <td><h6><b>{topic.userId}</b></h6></td>
                                                        <td><h6><b>{topic.firstName}</b></h6></td>
                                                        <td><h6><b>{topic.employeeNumber}</b></h6></td>
                                                        <td><h6><b>{topic.dob}</b></h6></td>
                                                        <td><h6><b>{topic.contactNumber}</b></h6></td>
                                                        <td><h6><b>{topic.panNo}</b></h6></td>
                                                        <td><h6>
                                                            <input type="radio" name="user" onClick={this.editFunction.bind(this, index, topic.userId)} />
                                                        </h6>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </Table>
                                    </Paper>

                                    <Button color="info" className={classes.marginRight} style={okBtn} onClick={this.handleClose}>
                                        Export to Pdf
                                    </Button>
                                    <Button color="info" className={classes.marginRight} style={view} onClick={this.handleClose}>
                                        Export to Excel
                                    </Button>
                                </div>
                            </GridContainer>
                        </GridContainer>
                    </div>
                </Modal>
                <User />
             </CardBody>
           </Card>
        );
    }

}

export default withStyles(styles)(SearchUser);