import React from 'react';
//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
//import Select from "@material-ui/core/Select";
//import MenuItem from "@material-ui/core/MenuItem";
//import InputLabel from "@material-ui/core/InputLabel";
//import FormControl from "@material-ui/core/FormControl";
//import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import partnerconfig from "modules/Partners/PartnerConfig.js";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
//import Table from '@material-ui/core/Table';
//import TableBody from '@material-ui/core/TableBody';
//import TableCell from '@material-ui/core/TableCell';
//import TableHead from '@material-ui/core/TableHead';
//import TableRow from '@material-ui/core/TableRow';
//import Paper from '@material-ui/core/Paper';
import Button from "components/CustomButtons/Button.jsx";
//import Radio from "@material-ui/core/Radio";
//import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
//import FormControlLabel from "@material-ui/core/FormControlLabel";
//import Partner from "modules/Partners/Organization/views/CreatePartner.jsx";
//import ProductSearch from "modules/Products/Micro/views/ProductSearch.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
//import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
//import bindModel from 'components/ModelBinding/bindModel.js';
import $ from 'jquery';
import swal from 'sweetalert';
//import ReactTable from "react-table";
import searchproduct from "assets/img/search-product.png";
import Organization from "./Organization.jsx";
import "react-table/react-table.css";
import ReactTable from 'components/MuiTable/MuiTable.jsx';


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

class SearchOrganization extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editModal: false,
            selectedValue: null,
            btnvisibility: false,
            disabled: false,
            rowData: {},
            orgId: "",
            orglist: [],

            dataLength: [],

            open: false,
            searchOrg: {
                "organizationId": 0,
                "orgName": "",
                "orgWebsite": "",
                "orgPhoneNo": "",
                "orgRegistrationNo": ""
            },
        };
        this.SearchOrg = this.SearchOrg.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.editFunction = this.editFunction.bind(this);
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    handleRadioChange(event) {
        this.setState({ selectedValue: event.target.value });
    }

    handleView = () => {
        if (this.state.orgId == "") {
            swal("", "Please select organization to view datails", "")
        } else {
            this.handleOpen();
            let view = this.state;

            view.disabled = true;
            view.editModal = true;
            view.open = true;
            view.btnvisibility = false;

            this.setState({ view });
        }
    };

    handleEdit = (id) => {
        if (this.state.orgId == "") {
            swal("", "Please select organization to edit datails", "")
        } else {
            this.handleOpen();
            let edit = this.state;

            edit.open = true;
            edit.editModal = true;
            edit.btnvisibility = true;
            edit.disabled = false;

            this.setState({ edit });
        }
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    editFunction(id, oId) {
        document.getElementById("disp");

        var orgArr = this.state.orglist
        var OrgtArr = [];
        $.each(orgArr, function (k, v) {
            if (v.organizationId == oId) {
                OrgtArr.push(orgArr[id]);
            }
        })
        //const orgptdata = OrgtArr[0].organizationId;
        this.setState({ orgId: OrgtArr[0].organizationId, rowData: OrgtArr });
        //state.orgId = OrgtArr[0].organizationId;
        //state.rowData = OrgtArr;
        //this.setState({ state });
    }

    SearchOrg() {
        document.getElementById('searchTableSec').style.display = 'block';
        fetch(`${partnerconfig.partnerconfigUrl}/api/Organization/SearchOrg`,
            //fetch(`https://localhost:44315/api/Organization/SearchOrg`,
            {
                method: 'POST',
                body: JSON.stringify(this.state.searchOrg),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
            }
        ).then(response => response.json())
            .then(data => {
                this.setState({ orglist: data })
                this.setState({
                    dataLength: this.state.orglist.map((prop, key) => {
                      //  console.log("Orgdata", dataLength);
                        const { classes } = this.props;
                        return {
                            orgid: prop.organizationId,
                            orgName: prop.orgName,
                            orgWebsite: prop.orgWebsite,
                            orgPhoneNo: prop.orgPhoneNo,
                            orgRegistrationNo: prop.orgRegistrationNo,
                            radio: < input type="radio" name="product" onClick={this.editFunction.bind(this, key, prop.organizationId)} />
                        };
                    })
                    
                });
            });
    }

    SetValue = (event) => {
        event.preventDefault();

        let search = this.state.searchOrg;
        let name = event.target.name;
        let value = event.target.value;
        search[name] = value;

        this.setState({ search });
    };
    render() {
        const { classes } = this.props;

        return (
            <Card>
                <CardHeader color="rose" icon>
                    <CardIcon color="rose">
                        { /*  <FilterNone /> */}

                        <Icon><img id="icon" src={searchproduct} /></Icon>

                    </CardIcon>
                    <h4>
                        <small> Search Organization </small>
                    </h4>
                </CardHeader>
                <CardBody>

                    <GridContainer>
                        <GridItem>

                            <GridContainer>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="Organization ID"
                                        id="Organizationid"
                                        value={this.state.searchOrg.organizationId}
                                        name="organizationId"
                                        onChange={(e) => this.SetValue(e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="Organization Name"
                                        id="Organizationid"
                                        value={this.state.searchOrg.orgName}
                                        name="orgName"
                                        onChange={(e) => this.SetValue(e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem >
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="Organization Name"
                                        id="Organizationid"
                                        value={this.state.searchOrg.orgName}
                                        name="orgName"
                                        onChange={(e) => this.SetValue(e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="Organization Ph. Number"
                                        id="Organizationid"
                                        value={this.state.searchOrg.orgPhoneNo}
                                        name="orgPhoneNo"
                                        onChange={(e) => this.SetValue(e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="Organization Reg Number"
                                        id="Organizationid"
                                        value={this.state.searchOrg.orgRegistrationNo}
                                        name="orgRegistrationNo"
                                        onChange={(e) => this.SetValue(e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="Organization Website"
                                        id="Organizationid"
                                        value={this.state.searchOrg.orgWebsite}
                                        name="orgWebsite"
                                        onChange={(e) => this.SetValue(e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridContainer>
                                    <GridItem className="search-bnt" xs={3} sm={3} md={3}>
                                        <Button style={{ marginTop: "1rem" }} className={classes.marginRight}  id="button-search-partner" color="info" onClick={this.SearchOrg}>
                                   
                                            Search Organization
                                </Button>
                                    </GridItem>
                                </GridContainer>
                            </GridContainer>
                            <GridContainer justify="center">
                                <div id="searchTableSec" style={{ display: 'none' }}>
                                    <br />
                                    <GridItem xs={12}>
                                        <CardBody>
                                            <ReactTable
                                                data={this.state.dataLength}
                                                filterable
                                                columns={[
                                                    {
                                                        Header: "",
                                                        accessor: "radio",
                                                        //style: { textAlign: "center" },
                                                        //minWidth: 100,
                                                        //headerClassName: 'react-table-center'
                                                    },
                                                    {
                                                        Header: "Organization Id",
                                                        accessor: "orgid",
                                                    },
                                                    {
                                                        Header: "Organization Name",
                                                        accessor: "orgName",
                                                        //style: { textAlign: "center" },
                                                        // minWidth: 35,
                                                        //headerClassName: 'react-table-center'
                                                    },
                                                    {
                                                        Header: "Website",
                                                        accessor: "orgWebsite",
                                                        //style: { textAlign: "center" },
                                                       // minWidth: 75,
                                                         //headerClassName: 'react-table-center'
                                                    },
                                                    {
                                                        Header: "Phone Number",
                                                        accessor: "orgPhoneNo",
                                                        //style: { textAlign: "center" },
                                                      //  minWidth: 35,
                                                        //headerClassName: 'react-table-center'
                                                    },
                                                    {
                                                        Header: "Registration Number",
                                                        accessor: "orgRegistrationNo",
                                                        //style: { textAlign: "center" },
                                                       // minWidth: 35,
                                                        //headerClassName: 'react-table-center'
                                                    },

                                                ]}
                                                defaultPageSize={5}
                                                showPaginationTop={false}
                                              pageSize={([this.state.dataLength.length + 1] < 5) ? [this.state.dataLength.length + 1] : 5}
                                              showPaginationBottom={([this.state.dataLength.length + 1] <= 5) ? false : true}
                                                className="-striped -highlight"
                                            />

                                        </CardBody>

                                    </GridItem>
                                    <div className="center-bnt">
                                        <Button color="info" round className={classes.marginRight} onClick={this.handleView}>
                                            View
                                    </Button>
                                        <Button color="info" round className={classes.marginRight} onClick={(id) => this.handleEdit(id)} editModal={this.state.editModal}>
                                            Edit
                                    </Button>
                                    </div>
                                    <Modal
                                        aria-labelledby="simple-modal-title"
                                        aria-describedby="simple-modal-description"
                                        open={this.state.open}
                                        onClose={this.handleClose}>
                                        <div className={classes.paper} id="modal">
                                            <h4><small className="center-text"> Modify Organization</small> </h4>
                                            <Button color="info"
                                                round
                                                className={classes.marginRight}
                                                id="close-bnt"
                                                onClick={this.handleClose}>
                                                &times;
                                                        </Button>

                                            <div id="disp" >
                                                <Organization editModal={this.state.editModal} open={this.state.open} searchOrganizationId={this.state.orgId} disabled={this.state.disabled} btnvisibility={this.state.btnvisibility} />
                                            </div>
                                        </div>
                                    </Modal>
                                </div>
                            </GridContainer>


                        </GridItem>
                    </GridContainer>
                </CardBody>
            </Card>
        );
    }

}

export default withStyles(styles)(SearchOrganization);