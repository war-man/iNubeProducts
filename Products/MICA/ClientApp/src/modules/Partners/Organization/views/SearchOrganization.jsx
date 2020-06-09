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
import data_Not_found from "assets/img/data-not-found-new.png";
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
import Edit from "@material-ui/icons/Edit";
//import view from "@material-ui/icons/view";

import ReactTable from 'components/MuiTable/MuiTable.jsx';
import { Animated } from "react-animated-css";
import TableContentLoader from "components/Loaders/TableContentLoader.jsx";
import Visibility from "@material-ui/icons/Visibility";
import Tooltip from '@material-ui/core/Tooltip';
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import IconButton from '@material-ui/core/IconButton';

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

class SearchOrganization extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //loader
            loader: true,
            pageloader: false,
            nodata: false,
            showtable: false,
            //loader
            isDontShowSubmit: false,
            isShowViewModify: false,

            isShowSearchOrg: true,
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
                // "organizationId": "",
                "organizationId": null,
                "orgName": "",
                "orgWebsite": "",
                "orgPhoneNo": "",
                "orgRegistrationNo": ""
            },
        };
        // this.state.isDontShowSubmit = props.isShowSubmit;
        // this.state.isDontShowSubmit = this.state.isShowSubmit;
        this.SearchOrg = this.SearchOrg.bind(this);
        // this.handleEdit = this.handleEdit.bind(this);
        this.editFunction = this.editFunction.bind(this);
        this.viewFunction = this.viewFunction.bind(this);
    }
    searchagain = () => {
        this.setState({ nodata: false });
        window.scrollTo(0, 0);
    }
    handleClose = () => {
        this.setState({ open: false });
    };

    handleRadioChange(event) {
        this.setState({ selectedValue: event.target.value });
    }




    viewFunction(id, oId) {
        document.getElementById("disp");

        var orgArr = this.state.orglist
        var OrgtArr = [];
        $.each(orgArr, function (k, v) {
            if (v.organizationId == oId) {
                OrgtArr.push(orgArr[id]);
            }
        })

        this.setState({ orgId: OrgtArr[0].organizationId, rowData: OrgtArr });
        this.handleOpen();


        let view = this.state;

        view.disabled = true;
        view.editModal = true;
        view.open = true;
        view.btnvisibility = false;
        this.setState({ isShowSearchOrg: false });
        this.setState({ isShowViewModify: true });

        this.setState({ view });
    }
    editFunction(id, oId) {
        document.getElementById("disp");

        var orgArr = this.state.orglist
        var OrgtArr = [];
        $.each(orgArr, function (k, v) {
            if (v.organizationId == oId) {
                OrgtArr.push(orgArr[id]);
            }
        })

        this.setState({ orgId: OrgtArr[0].organizationId, rowData: OrgtArr });
        this.handleOpen();

        let edit = this.state;

        edit.open = true;
        edit.editModal = true;
        edit.btnvisibility = true;
        edit.disabled = false;
        this.setState({ isDontShowSubmit: true });
        this.setState({ isShowSearchOrg: false });
        this.setState({ isShowViewModify: true });



        this.setState({ edit });

    }
    handleOpen = () => {
        this.setState({ open: true });
    };



    SearchOrg() {
        debugger
       // this.state.searchOrg.organizationId
        this.setState({ loader: false, showtable: false });
        //  document.getElementById('searchTableSec').style.display = 'block';

        //fetch(`https://localhost:44315/api/Organization/SearchOrg`,
        fetch(`${partnerconfig.partnerconfigUrl}/api/Organization/SearchOrgAsync`,
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
                //  if (data.length > 0) {
                this.setState({ orglist: data })
                console.log("dataCheck", data, this.state.orglist);
                if (data.length > 0) {
                    this.setState({ loader: true, showtable: true });
                    this.tabledata();
                    // this.setState({ loader: true });

                } else {
                    setTimeout(
                        function () {
                            this.setState({ loader: true, showtable: false, pageloader: true, nodata: true });
                        }.bind(this), 2000
                    );
                }
            });

    }



    //        } else {
    //            setTimeout(
    //    function() {
    //                this.setState({ loader: true, showtable: false, nodata: true });
    //            }.bind(this), 2000
    //);
    //            }


    tabledata = () => {
        this.setState({
            loader: true
        });
        this.setState({
            dataLength: this.state.orglist.map((prop, key) => {
                //    if (dataLength > 0) {
                console.log("Orgdata", this.state.dataLength, this.state.orglist);
                return {
                    orgid: prop.organizationId,
                    orgName: prop.orgName,
                    orgWebsite: prop.orgWebsite,
                    orgPhoneNo: prop.orgPhoneNo,
                    orgRegistrationNo: prop.orgRegistrationNo,
                    //  radio: < input type="radio" name="product" onClick={this.editFunction.bind(this, key, prop.organizationId)} />,
                    actions: (
                        <div className="actions-right">
                            <Tooltip title={< TranslationContainer translationKey="View" />} placement="bottom" arrow>
                                <IconButton color="info" justIcon round simple className="view" onClick={this.viewFunction.bind(this, key, prop.organizationId)} ><Visibility /></IconButton>
                            </Tooltip>
                            <Tooltip title={< TranslationContainer translationKey="Edit" />} placement="bottom" arrow>
                                <IconButton color="info" justIcon round simple className="edit" onClick={this.editFunction.bind(this, key, prop.organizationId)}><Edit /></IconButton>
                            </Tooltip >

                        </div>
                    )
                };
            })
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
            <GridContainer >
                <GridItem xs={12} sm={12} md={12}>
                    {this.state.isShowSearchOrg &&
                        <Card>

                            <CardHeader color="rose" icon>
                                <CardIcon color="rose">
                                    { /*  <FilterNone /> */}

                                    <Icon><img id="icon" src={searchproduct} /></Icon>

                                </CardIcon>
                                <h4>
                                <small><TranslationContainer translationKey="SearchOrganization" /> </small>
                                </h4>
                            </CardHeader>

                            <CardBody>



                                <GridContainer>

                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            labelText="OrganizationID"
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
                                            labelText="OrganizationName"
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
                                            labelText="OrganizationPhNumber"
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
                                            labelText="OrganizationRegNumber"
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
                                            labelText="OrganizationWebsite"
                                            id="Organizationid"
                                            value={this.state.searchOrg.orgWebsite}
                                            name="orgWebsite"
                                            onChange={(e) => this.SetValue(e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridContainer justify="center">
                                        <GridItem>
                                            <Button id="round" style={{ marginTop: '25px' }} color="info" onClick={this.SearchOrg}> Search  </Button>

                                        </GridItem>
                                    </GridContainer>

                                </GridContainer>
                            </CardBody>
                        </Card>
                    }
                    {this.state.isShowSearchOrg &&
                        <GridContainer >
                            {this.state.loader ?

                                <GridContainer >

                                    {this.state.showtable ?

                                        <GridItem xs={12}>

                                            <CardBody>
                                                <ReactTable
                                                    data={this.state.dataLength}
                                                    filterable
                                                    columns={[
                                                        //{
                                                        //    Header: "",
                                                        //    accessor: "radio",
                                                        //    //style: { textAlign: "center" },
                                                        //    //minWidth: 100,
                                                        //    //headerClassName: 'react-table-center'
                                                        //},
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
                                                        }, {
                                                            Header: "Actions",
                                                            accessor: "actions",
                                                            style: { textAlign: "center" },
                                                            headerClassName: 'react-table-center',
                                                            minWidth: 40,
                                                            resizable: false,

                                                        }

                                                    ]}
                                                    defaultPageSize={5}
                                                    showPaginationTop={false}
                                                    pageSize={([this.state.dataLength.length + 1] < 5) ? [this.state.dataLength.length + 1] : 5}
                                                    showPaginationBottom={([this.state.dataLength.length + 1] <= 5) ? false : true}
                                                    className="-striped -highlight"
                                                />

                                            </CardBody>

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
                                                                <Button className="secondary-color" round onClick={() => this.searchagain()}> Try again </Button>
                                                            </Animated>
                                                        </GridItem>
                                                    </GridContainer>
                                                </Card>
                                                : null}
                                        </GridItem>
                                    }

                                </GridContainer>
                                : <Card style={paddingCard}>
                                    <TableContentLoader />
                                </Card>
                            }
                        </GridContainer>
                    }
                    <GridContainer>

                        <GridItem xs={12}>
                            <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                                {this.state.isShowViewModify &&
                                    <Organization editModal={this.state.editModal} open={this.state.open} isDontShowSubmit={this.state.isDontShowSubmit}
                                        searchOrganizationId={this.state.orgId} disabled={this.state.disabled}
                                        btnvisibility={this.state.btnvisibility} />}
                            </Animated>

                        </GridItem >
                    </GridContainer>
                </GridItem >
            </GridContainer>


        );
    }

}

export default withStyles(styles)(SearchOrganization);