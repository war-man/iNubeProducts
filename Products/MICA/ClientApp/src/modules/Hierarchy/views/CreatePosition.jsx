import React from "react";

//General Components
import Heading from "components/Heading/Heading.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

//Module Components
import withStyles from "@material-ui/core/styles/withStyles";
//General Components
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import FilterNone from "@material-ui/icons/FilterNone";
import Button from "components/CustomButtons/Button.jsx";
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CustomInput from "components/CustomInput/CustomInput.jsx";
import swal from 'sweetalert';
import $ from 'jquery';
import { Redirect } from 'react-router-dom';
import Dropdown from "components/Dropdown/Dropdown.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import officedetails from "assets/img/architecture-and-city.png";
import HierarchyConfig from "modules/Hierarchy/HierarchyConfig.js";
import Icon from "@material-ui/core/Icon"
import ReactTable from 'components/MuiTable/MuiTable.jsx';

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: "#00acc1",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);
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

const margin = {
    position: 'relative',
    marginLeft: "45%"

}
const okBtn = {

    marginLeft: "527px",
    //marginTop: "20px",
    height: "25px",
    textAlign: "center",

    width: "65px",
    padding: "1px"
}
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
    paddingRight: '2px'
    //  boxShadow: theme.shadows[5],

};

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
class CreatePosition extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Organizations: [],
            officeReportingOfficeId: [],
            Office: [],
            officeDTO: {
                //  "orgOfficeId": 0,
                "organizationId": 0,
                "officeName": "",
                "officeCode": "",
                "officePhoneNo": "",
                "officeFaxNo": "",
                "officeLevelId": "",
                "officeReportingOfficeId": "",
                "officeCountryId": 0,
                "officeStateId": 0,
                "officeDistrictId": 0,
                "officeCityId": 0,
                "officeAddressLine1": "",
                "officeAddressLine2": "",
                "officeAddressLine3": "",
                "officePincodeId": 0,
                "officeSpocDetails": [
                    {
                        //"officeSpocid": 0,
                        "officeId": 0,
                        "spocname": "string",
                        "spocmobileno": "string",
                        "spocemailId": "string",
                        "spocdesignation": "string",
                        "spoccountryId": 0,
                        "spocstateId": 0,
                        "spocdistrictId": 0,
                        "spoccityId": 0,
                        "spocaddressLine1": "string",
                        "spocaddressLine2": "string",
                        "spocaddressLine3": "string",
                        "spocpincodeId": 0
                    }
                ]
            },
            posDesigTable: [],
            redirect: false,
            currentStaff: "",
            response: false,
            positionDTO: {
                "empId": "",
                "newpositioncount": "",
                "organizationId": "",
                "officeId": "",
                "designationId": "",
            },
            Designations: [],
            Employees: [],
            desigleveldata: [],
            levelobject: {},
            tabledata: [],
            showPosTable: false,
        };
    }

    componentDidMount() {
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

    handleOrgdata = (e) => {
        let office = this.state.officeDTO;
        let position = this.state.positionDTO;
        position.organizationId = e.target.value;
        let name = e.target.name;
        let value = e.target.value;
        office[name] = value;
        this.setState({ office, position });

        this.setState({ organizationid: e.target.value });
        fetch(`${HierarchyConfig.HierarchyConfigURL}/api/Organization/GetOffbyOrgid?orgid=` + e.target.value, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ Office: data });
                console.log("organizations: ", data);

            });

        this.handleDesignationDD(e.target.value);

    }

    handleOfficeData = (e) => {
        let office = this.state.officeDTO;
        let position = this.state.positionDTO;
        position.officeId = e.target.value;
        let name = e.target.name;
        let value = e.target.value;
        office[name] = value;
        this.setState({ office, position });

        this.setState({ showPosTable: true });
    }

    onInputParamChange = (type, event) => {
        const fields = this.state.positionDTO;
        fields[event.target.name] = event.target.value;
        this.setState({ fields });
    };

    handlePositionTableAssignValue = () => {
        let array = []
        let element = {};
        array.push(element)
        this.state.posDesigList = array;
        this.setState({});
        this.handlePositionTable();
    }

    handlePositionTable = () => {
        this.setState({
            posDesigTable: this.state.posDesigList.map(m => {
                return {
                    designation: <Dropdown /*required={true}*/ lstObject={this.state.Designations} value={this.state.positionDTO.designationId} name="designationId" onChange={(e) => this.handledesigchange(e)} formControlProps={{ fullWidth: true }} />,
                    reportingTo: <Dropdown /*required={true}*/ lstObject={this.state.Employees} value={this.state.positionDTO.empId} name="empId" onChange={(e) => this.handledesigchange(e)} formControlProps={{ fullWidth: true }} />,
                    currentStaff: <CustomInput value={this.state.currentStaff} disabled={true} name="currentStaff" formControlProps={{ fullWidth: true }} />,
                    newPosition: <CustomInput value={this.state.positionDTO.newpositioncount} name="newpositioncount" onChange={(e) => this.handledesigchange(e)} formControlProps={{ fullWidth: true }} />,
                };
            })
        });
    }

    handledesigchange = (e) => {

        let name = e.target.name;
        let value = e.target.value;
        let position = this.state.positionDTO;
        position[name] = value;

        if (name == "designationId") {
            this.state.Employees = [];
            this.handleReportingDD(this.state.positionDTO.designationId);
            this.setState({});
        }
        if (name == "empId") {
            this.handleCurrentStaffCount(this.state.positionDTO.empId);
        }
        if (name == "newpositioncount") {
            //this.handlePositionCreation(this.state.positionDTO.newpositioncount);
        }

        console.log("positionOnchange", this.state.positionDTO);
        this.setState({ position });
        this.handlePositionTable();
    }

    handleDesignationDD = (orgid) => {
        let that = this;
        fetch(`${HierarchyConfig.HierarchyConfigURL}/api/Organization/GetDesignation?orgid=` + orgid, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    that.setState({ Designations: data[0].mdata });
                    if (this.state.Designations.length != 0) {

                        this.handlePositionTableAssignValue();
                    }
                    console.log("deg List", that.state.Designations, data);
                }
            });
    }

    handleReportingDD = (desigid) => {
        let that = this;
        fetch(`${HierarchyConfig.HierarchyConfigURL}/api/Organization/GetEmployee?orgid=` + that.state.positionDTO.organizationId + `&offid=` + that.state.positionDTO.officeId + `&desgiId=` + desigid, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    that.setState({ Employees: data[0].mdata });
                    this.handlePositionTable();
                }
                console.log("report", data, this.state.Employees);
            });
    }

    handleCurrentStaffCount = (empid) => {
        let that = this;
        fetch(`${HierarchyConfig.HierarchyConfigURL}/api/Organization/GetCount?empid=` + empid, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                that.setState({ currentStaff: data });
                this.handlePositionTable();
                console.log("report", data);
            });
    }

    handlePositionCreation = () => {
        console.log("checkPostion: ", this.state.positionDTO);
        this.setState({ response: true });
        fetch(`${HierarchyConfig.HierarchyConfigURL}/api/Organization/CreatePosition`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.positionDTO)
        })
            .then(response => response.json())
            .then(data => {
                if (data.status == 2) {
                    swal({
                        text: "Positions created successfully",
                        icon: "success"
                    })

                    this.setState({ redirect: true, response: false });
                    this.handlePositionTable();
                } else {
                    swal({
                        text: "Something went wrong",
                        icon: "error"
                    })
                }

            });

    }

    renderRedirect = () => {
        if (this.state.redirect == true) {
            return <Redirect to={{
                pathname: '/dashboard/home',

            }} />
        }
    }

    render() {
        return (
            <div>
                <Card>
                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                            <Icon><img id="icon" src={officedetails} /></Icon>

                        </CardIcon>
                        <h4>
                            <small> Position Details </small>
                        </h4>
                    </CardHeader>
                    <CardBody>
                        <GridContainer>
                            <GridItem xs={12} sm={4} md={3}>
                                <Dropdown
                                    required={true}
                                    labelText="Organization"
                                    lstObject={this.state.Organizations}
                                    value={this.state.officeDTO.organizationid}
                                    name='organizationid'
                                    onChange={(e) => this.handleOrgdata(e)}
                                    formControlProps={{ fullWidth: true }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={4} md={3}>
                                <Dropdown
                                    required={true}
                                    labelText="Reporting To Office"
                                    lstObject={this.state.Office}
                                    value={this.state.officeDTO.officeReportingOfficeId}
                                    name='officeReportingOfficeId'
                                    onChange={(e) => this.handleOfficeData(e)}
                                    formControlProps={{ fullWidth: true }}
                                />
                            </GridItem>

                        </GridContainer>
                    </CardBody>
                </Card>

                {this.state.showPosTable &&
                    <GridContainer>
                        <GridItem xs={12}>
                            <CardBody>
                                <ReactTable
                                    data={this.state.posDesigTable}
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
                        <GridContainer justify="center">
                            <GridItem>
                                <Button round color="warning" disbled={this.state.response} onClick={() => this.handlePositionCreation()}>Create Positions</Button>
                            </GridItem>
                        </GridContainer>

                    </GridContainer>
                }
            </div>
        );
    }
}
export default withStyles(styles)(CreatePosition);
