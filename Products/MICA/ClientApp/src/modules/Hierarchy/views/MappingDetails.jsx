import React from "react";
import FilterNone from "@material-ui/icons/FilterNone";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";

// @material-ui/core components

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Datetime from "react-datetime";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import AddProduct from "modules/Partners/Partner/views/_AddProduct.jsx";
import Button from "components/CustomButtons/Button.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import searchproduct from "assets/img/search-product.png";
import Icon from "@material-ui/core/Icon";
import $ from 'jquery';
import CustomDropdown from "../../../components/CustomDropdown/CustomDropdown";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import user from "assets/img/user.png";
import UserAddress from "modules/Users/views/UserManagement/UserAddress.jsx";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import UserConfig from 'modules/Users/UserConfig.js';
import validationPage from "modules/Users/views/UserManagement/ValidationPage.jsx";
import swal from 'sweetalert';
import ReactTable from 'components/MuiTable/MuiTable.jsx';
import HierarchyConfig from 'modules/Hierarchy/HierarchyConfig.js';
import Dropdown from "components/Dropdown/Dropdown.jsx";





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

const submitBtn = {
    height: "35px",
    marginTop: "-10px"
}

class MappingDetails extends React.Component {
    constructor(props) {
        super(props);
        console.log("ppppp", this.props);
        this.state = {

            disable: false,
            positionmasterList: [],
            tableData: [],
            newmasterList: [],
            masterList: [],
            offmasterList: [],
            newdata: [],
            ddlLst: [],
            mappingdetails: {
                organizationId: "",
                officeId: "",
                positionNameId: "",
                noOfvecpos: "",
                reportingToId: ""
            },
            mappingTabledata: {
                positionNameId: "",
                noOfvecpos: "",
                reportingToId: ""
            },
            positionId: null,
            reportingmasList: [],

        }
    };
    componentDidMount() {
        //fetch(`${HierarchyConfig.HierarchyConfigURL}/api/Organization/GetOrgDropdown`, {
        //    method: 'GET',
        //    headers: {
        //        'Accept': 'application/json',
        //        'Content-Type': 'application/json',
        //        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
        //    },
        //})
        //    .then(response => response.json())
        //    .then(data => {
        //        console.log("masterdata", data);
        //        this.setState({ masterList: data });

        //     // this.state.masterList = data;
        //    });


        //console.log("state.masterList", this.state.masterList)
        ////this.MappingTableData();
    }
    //SetddlValue = (event, index) => {
    //    event.preventDefault();
    //    let name = event.target.name;
    //    let value = event.target.value;
    //    //this.state.treatydata[name] = value;
    //    //this.setState({ treatydata})


    //    let mappingTabledata = this.state.mappingdetails;

    //    mappingTabledata[name] = value;

    //    this.setState({ mappingTabledata });
    //    //this.MappingTableData();
    //    console.log("thismappingdetails", this.state.mappingTabledata)
    //    if (name =="positionNameId") {
    //        fetch(`${HierarchyConfig.HierarchyConfigURL}/api/Organization/GetVacantPositonCount?designame=` + this.state.mappingTabledata[0].positionNameId, {
    //            method: 'GET',
    //            headers: {
    //                'Accept': 'application/json',
    //                'Content-Type': 'application/json',
    //                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
    //            },
    //        })
    //            .then(response => response.json())
    //            .then(data => {
    //                console.log("countpos", data);
    //                //this.state.positionmasterList = data;
    //                this.state.mappingTabledata[0].noOfvecpos = data;
    //                this.setState({ reportingmasList: data });
    //                //this.MappingTableData();
    //            });
    //    }
    //}
    SetInputValue = (event, index) => {
        event.preventDefault();
        let name = event.target.name;
        let value = event.target.value;
        //this.state.treatydata[name] = value;
        //this.setState({ treatydata})
        let treatydata = this.state.treatydata;
        treatydata[index][name] = value;
        this.setState({ treatydata });
        //this.MappingTableData();
    }
    SelectRow = (e, index) => {
        this.setState({ disable: true });
    }
    //MappingTableData = () => {

    //    // if (this.state.newmasterlist.length > 0) {
    //    console.log("product channel", this.state.masterList, this.state.newmasterlist);

    //    let con = this.state.newmasterlist;


    //    this.setState({
    //        tableData: this.state.mappingTabledata.map((prop, key) => {
    //            //console.log("this.ProductDetails.productChannel[key].channelTypeId", key, con, this.ProductDetails.productChannel[key].channelTypeId, this.state.chindex + 1);
    //            return {
    //                id: key + 1,

    //                PositionName: <Dropdown id="PositionNameid" labelText={(this.state.mappingTabledata[key].positionNameId == "") ? "Select" : ""} lstObject={this.state.positionmasterList} value={this.state.mappingTabledata[key].positionNameId} name='positionNameId' formControlProps={{ fullWidth: true }} onChange={(e) => this.SetddlValue(e, key)} />,
    //                NoOfVacantPositions: <CustomInput labelText="" id="BusinessTypeText" required={true} value={this.state.mappingTabledata[key].noOfvecpos} name="noOfvecpos" /*onChange={(e) => this.SetTreatyDetailsValue("alphaNumeric", e, key)}*/ formControlProps={{ fullWidth: true }
    //                   // <CustomInput /*labelText="" id="NoOfvacposId"*/ required={true} value={this.state.mappingTabledata[key].noOfvecpos} name="noOfvecpos" formControlProps={{ fullWidth: true }
    //                } />,
    //                ReportingTo: <Dropdown id="ReportToId" labelText={(this.state.mappingTabledata[key].reportingToId == "") ? "Select" : ""} lstObject={this.state.newmasterList} value={this.state.mappingTabledata[key].reportingToId} name='reportingToId' formControlProps={{ fullWidth: true }} onChange={(e) => this.SetddlValue(e, key)} />,
    //                Action: <div><Button justIcon round simple color="info" disabled={this.state.disable} className="add" onClick={(e) => this.SelectRow(e, key)} > <i class="fa fa-check-circle"></i></Button >
    //                </div>
    //            };
    //        })
    //    });
    //    //}
    //}
    //GetMasterData = (e) => {
    //    debugger;
    //    console.log("evtmaster", e);
    //    let mappingdetails = this.state.mappingdetails;
    //    let name = e.target.name;
    //    let value = e.target.value;
    //    mappingdetails[name] = value;
    //    this.setState({ mappingdetails });
    //    console.log(" this.state.mappingdetails;", this.state.mappingdetails);
    //    if (this.state.mappingdetails.organizationId!="") {
    //    fetch(`${HierarchyConfig.HierarchyConfigURL}/api/Organization/GetOffbyOrgid?orgid=` + this.state.mappingdetails.organizationId,{
    //            method: 'GET',
    //            headers: {
    //                'Accept': 'application/json',
    //                'Content-Type': 'application/json',
    //                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
    //            },
    //        })
    //            .then(response => response.json())
    //            .then(data => {
    //                console.log("offmasterList", data);
    //                this.setState({ offmasterList: data });

    //                // this.state.masterList = data;
    //            });
    //        fetch(`${HierarchyConfig.HierarchyConfigURL}/api/Organization/GetVecPositions?orgid=` + this.state.mappingdetails.organizationId, {
    //            method: 'GET',
    //            headers: {
    //                'Accept': 'application/json',
    //                'Content-Type': 'application/json',
    //                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
    //            },
    //        })
    //            .then(response => response.json())
    //            .then(data => {
    //                console.log("positionmasterList", data);
    //                //this.state.positionmasterList = data;
    //                this.setState({ positionmasterList: data });
    //                //this.MappingTableData();
    //            });
    //    }
    //    console.log("positionmasterList", this.state.positionmasterList);
    //}
    //GetLocation = (e) => {
    //    debugger;
    //    console.log("evtmaster", e);
    //    let mappingdetails = this.state.mappingdetails;
    //    let name = e.target.name;
    //    let value = e.target.value;
    //    mappingdetails[name] = value;
    //    this.setState({ mappingdetails });
    //    console.log("mappingdetails", this.state.mappingdetails, e);

    //};
    render() {

        const { classes } = this.props;

        return (
            <div>
                <h4><TranslationContainer translationKey="MappingDetails"/></h4>
                <GridContainer >
                    <GridItem xs={12} sm={4}>
                        <Dropdown
                            labelText="Organization"
                            id="OrganizationId"
                            lstObject={this.props.masterList1}
                            name="organizationId"
                            value={this.props.peopledetails1.organizationId}
                            onChange={(e) => this.props.GetMasterData1(e)}
                            //modelbind={model('UserDetailsDTO.Country')}
                            formControlProps={{ fullWidth: true }}
                            bind
                        />
                    </GridItem>

                    <GridItem xs={12} sm={4}>
                        <Dropdown
                            labelText="Office"
                            id="officeId"
                            lstObject={this.props.offmasterList}
                            name='officeId'
                            value={this.props.peopledetails1.officeId}
                            onChange={(e) => this.props.GetLocation1(e)}
                            //modelbind={model('UserDetailsDTO.Country')}
                            formControlProps={{ fullWidth: true }}
                            bind
                        />
                    </GridItem>
                    <GridItem xs={12} sm={4}>
                        <Dropdown id="PositionNameid"
                            labelText="VacantPositions"
                            lstObject={this.props.positionmasterList}
                            value={this.props.peopledetails1.deginName}
                            name='deginName'
                            formControlProps={{ fullWidth: true }}
                            onChange={(e) => this.props.SetddlValue(e, "")}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={4}>
                        <CustomInput labelText="Reportingto"
                            disabled={true}
                            id="BusinessTypeText"
                            required={true}
                            value={this.props.supervisor}
                            name="noOfvecpos"
                            /*onChange={(e) => this.SetTreatyDetailsValue("alphaNumeric", e, key)}*/
                            formControlProps={{ fullWidth: true }}
                        />
                    </GridItem>
                    {/*  <GridItem xs={12} sm={4}>
                        <Dropdown id="ReportToId"
                            labelText="Reporting To"
                            lstObject={this.props.newmasterList}
                            value={this.props.peopledetails.avoOrgEmployee.position.empId}
                            name='empId'
                            formControlProps={{ fullWidth: true }}
                            onChange={(e) => this.SetddlValue(e, "")}
                        />
                    </GridItem>*/}
                </GridContainer>
                {/* <CardBody>

                    <ReactTable

                        data={this.state.tableData}
                        filterable
                        columns={[
                                {
                                    Header: "Position Name",
                                    accessor: "PositionName",
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 40,
                                    resizable: false,

                                },
                                {
                                    Header: "No of vacant positions",
                                    accessor: "NoOfVacantPositions",
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 40,
                                    resizable: false,

                                },
                                {
                                    Header: "Reporting To",
                                    accessor: "ReportingTo",
                                    style: { textAlign: "right" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 40,
                                    resizable: false,

                                },
                                {
                                    Header: "Actions",
                                    accessor: "Action",
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 40,
                                    resizable: false,

                                }
                       ]}
                        defaultPageSize={5}
                        showPaginationTop={false}
                        // pageSize={([this.state.Policydetailsdata.length + 1] < 5) ? [this.state.Policydetailsdata.length + 1] : 5}
                        showPaginationBottom
                        className="-striped -highlight"
                    />
                  
                </CardBody>*/}
                {/* <GridContainer> <GridItem xs={12} sm={4} md={3}>
                    <MasterDropdown
                        disabled={this.state.disabled}
                        labelText="Allocate To"
                        required={true}
                        id="gender"
                        lstObject={this.state.masterList}
                        filterName=''
                        //value={this.state.UserData.genderId}
                        //name='genderId'
                        //onChange={(e) => this.GetMasterData('Gender', 'Userdata', e)}
                        formControlProps={{ fullWidth: true }}
                    />
                </GridItem>
                    </GridContainer>*/}
            </div>

        );
    }
}
export default withStyles(style)(MappingDetails);