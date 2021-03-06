﻿import React from "react";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import role from "assets/img/users.png";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
//import ReactTable from "react-table";
import ReactTable from "components/MuiTable/MuiTable.jsx";
import { Redirect } from 'react-router-dom';
import { Animated } from "react-animated-css";
import swal from 'sweetalert';
import $ from 'jquery';
//import productConfig from 'modules/Products/Micro/ProductConfig.js';
import ContractConfig from 'modules/Contracts/ContractConfig.js';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import withStyles from "@material-ui/core/styles/withStyles";
import { Grid } from "@material-ui/core";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import { METHODS } from "http";
import { EventEmitter } from "events";
import { initialState } from "components/Translation/reducer";
import OrgEntity from './OrgEntity.jsx';
import Modal from '@material-ui/core/Modal';
import { dangerBoxShadow } from "assets/jss/material-dashboard-pro-react";


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

class ManageMaster extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            masterList: [],
            newmasterList: [],
            open: false,
            dropdowns: [],
            masterdataType: "",
            masterdata: "",
            tabletype: "",
            value: "",
            showtable: false,
            fields: {},
            resetfields: {},
            levelCount: 0,
            masterdtolist: [],
            MasterDTO: {},
            selectedvalue: [],
            selectedvaluearray: [],
            MasterdataDTO:
            {
                "MasterType": "",
                "TypeCode": "",
                "Value": "",
                "ParentId": 0,
                "IsDisable": true,
                "IsActive": true,
            },
            lobtable: false,
            tabledata: [],
            parentId: 0,
        };
        this.initialfields = {};
        this.addData = this.addData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEntityScreen = this.handleEntityScreen.bind(this);
    }

    handleSimple = event => {
        this.setState({ [event.target.name]: event.target.value });
        //console.log("value", event.target.value);
        this.setState({
            [event.target.name]: event.target.value, masterdataType: "", fields: {}, tabledata: this.state.MasterDTO.OrgType, lobtable: false, showtable: false,
        });

        this.state.selectedvalue = [];
        this.state.selectedvaluearray = [];
        this.state.dropdowns = [];

        this.state.parentId = 0;
        //console.log("masterlist", this.state.masterList);

        this.state.selectedvalue = this.state.selectedvaluearray.push(this.state.masterList.filter(e => e.mID === event.target.value)[0]) === undefined
            ? []
            : this.state.masterList.filter((e) => e.mID === event.target.value)[0]
            ;
        //console.log("selectedvalue: ", this.state.selectedvalue);
        //console.log("selectedvaluearray: ", this.state.selectedvaluearray)
        console.log("selectedvalue: ", this.state.selectedvalue.mType);
        this.setState({ masterdataType: this.state.selectedvalue.mType });
        //let mtype=this.state.MasterdataDTO
        this.state.masterdataType = this.state.selectedvalue.mType;
        this.setState({});

        console.log("masterdataType: ", this.state.masterdataType);
        while (this.state.selectedvaluearray[0].parentId != 0) {
            let array = [];
            array = this.state.dropdowns.push(this.state.masterList.filter(e => e.mID == this.state.selectedvaluearray[0].parentId)[0]) === undefined
                ? []
                : this.state.masterList.filter((e) => e.mID === this.state.selectedvaluearray[0].parentId)[0]
                ;
            //console.log("array: ", array)
            this.state.selectedvaluearray = [];
            this.state.selectedvaluearray.push(array);
            this.setState({});
            //console.log("selectedvaluearray: ", this.state.selectedvaluearray)
        }

        this.state.levelCount = this.state.dropdowns.length;
        if (this.state.dropdowns.length == 0) {
            this.setState({ lobtable: true });
        }
        this.sortDescending();

        this.GetMasterService('OrgType', 0);
    };

    addData = () => {
        this.setState({ showtable: true });
    }

    handleSubmit() {
        //console.log("masterdata: ", this.state.masterdata)
        //console.log("masterdatatype: ", this.state.masterdataType)
        let mdata = this.state.MasterdataDTO;
        mdata.Value = this.state.masterdata;                                        //custuminput data
        mdata.MasterType = this.state.masterdataType;                               //type of masterdata selected in dropdown
        //console.log("data: ", this.state.masterdataType)
        // mdata.ParentId = this.GetParentId(this.state.masterdataType);               //parentid of masterdata selected in dropdown
        mdata.ParentId = this.state.parentId;               //parentid of masterdata selected in dropdown
        this.setState({ mdata });
        //console.log("Masterdata", mdata);
        console.log("mdata: ", mdata)
        fetch(`${ContractConfig.ContractConfigURL}/api/Organization/AddMasterData`, {
            method: 'Post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(mdata)
        }).then(response => response.json())
            .then(data => {
                console.log("response data", data);
                swal({
                    text: "Data saved successfully",
                    icon: "success"
                })
                this.state.fields = {};
                this.handlemasterdata();
            });
        this.state.dropdowns = [];
        this.setState({ showtable: false, lobtable: false, masterType: "", masterdata: "", value: "" });
    }

    handleinputvalue = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    SetValue = (type, event) => {
        let fields = this.state.fields;
        fields[event.target.name] = event.target.value;
        this.setState({ fields });
        //console.log('Fields', this.state.fields, 'Name', event.target.name, 'Value', event.target.value);
    }

    GetMasterService = (type, pID) => {
        fetch(`${ContractConfig.ContractConfigURL}/api/Organization/GetOrgMaster?masterType=` + type + `&parentID=` + pID, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("master response data: ", data)
                const lData = data;
                let locDTO = this.state.MasterDTO;
                locDTO[type] = lData;
                this.setState({ locDTO });
                console.log("MasterDTO: ", this.state.MasterDTO)
                let dataArray = this.GetMasterListData(type);
                this.setState({
                    tabledata: dataArray
                });
                //console.log("tabledata ", this.state.tabledata, "data array: ", dataArray)
            });
    };

    GetMasterData = (type, event) => {
        this.SetValue(type, event);

        console.log("type: ", type);
        var regex = /^[A-Za-z]+$/;
        var isvalid = regex.test(type);
        console.log("isvalid: ", isvalid);
        if (isvalid == false) {
            const valuetype = type;
            const splitstring = valuetype.split(",");
            console.log("array1: ", splitstring[0]);
            console.log("array1: ", splitstring[1]);
            for (let i = 0; i < splitstring.length; i++) {
                this.GetMasterService(splitstring[i], event.target.value);
            }
        }
        if (type === "OrgType") {
            this.GetMasterService('OrgConfigType', event.target.value);
            console.log("event", event.target.value);
        }
        if (type === "OrgConfigType") {
            this.GetMasterService('KPI', event.target.value);
            this.GetMasterService('Compensation', event.target.value);
            this.GetMasterService('Program', event.target.value);
            console.log("event", event.target.value);
        }
        if (type != "") {
            this.GetMasterService(type, event.target.value);
        }
        console.log("Table: ", this.state.tabledata)
    };

    GetLevelMasterData = (type, event) => {
        this.state.tabletype = this.state.masterList.filter(e => e.mID === this.state.value)[0].mValue === undefined
            ? []
            : this.state.masterList.filter((e) => e.mID === this.state.value)[0].mValue
            ;

        this.SetValue(type, event);
        //var regex = /^[A-Za-z]+$/;
        //var isvalid = regex.test(type);
        //console.log("isvalid: ", isvalid);
        //if (isvalid == false) {
        //    const valuetype = type;
        //    const splitstring = valuetype.split(",");
        //    console.log("array1: ", splitstring[0]);
        //    console.log("array1: ", splitstring[1]);
        //    for (let i = 0; i < splitstring.length; i++) {
        //        this.GetMasterService(splitstring[i], event.target.value);
        //    }
        //}
        this.setState({ lobtable: true });

        console.log("masterlist ", this.state.tabletype);

        this.GetMasterService(this.state.tabletype, event.target.value);

        this.state.parentId = event.target.value;
        let dataArray = this.GetMasterListData(type);
        this.setState({
            tabledata: dataArray
        })
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleEntityScreen = () => {
        this.setState({ open: true });
    }

    componentDidMount = () => {
        this.GetMasterService('OrgType', 0);
        fetch(`${ContractConfig.ContractConfigURL}/api/Organization/GetEntityMaster`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(response => response.json())
            .then(data => {
                this.setState({ masterList: data });
                console.log("masterlist ", data);
                let master = this.state.masterdtolist;
                for (let i = 0; i < this.state.masterList.length; i++) {
                    this.state.masterdtolist.push(this.state.masterList[i].mType);
                    this.state.MasterDTO[this.state.masterList[i].mType] = [];
                    this.state.fields[this.state.masterList[i].mType] = '';
                    this.state.resetfields[this.state.masterList[i].mType] = '';
                    this.initialfields[this.state.masterList[i].mType] = '';
                }
                this.setState({ master });
            });

        console.log("MasterDTO: ", this.state.MasterDTO);
    }

    handlemasterdata = () => {
        this.state.newmasterList = [];
        this.state.dropdowns = [];
        this.state.fields = {};
        this.setState({});
        fetch(`${ContractConfig.ContractConfigURL}/api/Organization/GetEntityMaster`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(response => response.json())
            .then(data => {
                this.setState({ newmasterList: data });
                console.log("masterlist ", data);
                for (let i = 0; i < this.state.newmasterList.length; i++) {
                    this.state.fields[this.state.newmasterList[i].mType] = '';
                }
                this.setState({});
            });
    }

    /*dynamic objects for name and value of dropdown*/
    GetMasterTypeData = (type) => {
        return this.state.fields[type];
    }

    /*dynamic objects for list of dropdown*/
    GetMasterListData = (type) => {
        return this.state.MasterDTO[type];
    }

    GetParentId = (type) => {
        let field = this.state.fields;
        switch (type) {
            case 'OrgType':
                return 0;
            case 'OrgConfigType':
                return field.OrgType;
            case 'OrgConfigType':
                return field.KPI;
            case 'OrgConfigType':
                return field.Compensation;
            case 'OrgConfigType':
                return field.Program;
            default:
                return 0;
        }
    }

    sortDescending = () => {
        const { dropdowns } = this.state;
        dropdowns.sort((a, b) => a - b).reverse();
        this.setState({ dropdowns });
    }

    render() {
        const { classes } = this.props;
        let levelcount = this.state.levelCount;
        let lob = this.state.fields.OrgType;

        return (
            <GridContainer>
                <GridItem xs={12}>

                    <Card >
                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                                <Icon><img id="icon" src={role} /></Icon>
                            </CardIcon>
                            {
                                <h4 >
                                    <small> Organization Master Data Mapping </small>
                                </h4>
                            }
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={4}>
                                    <Dropdown
                                        required={true}
                                        labelText="MasterType"
                                        lstObject={this.state.masterList}
                                        value={this.state.value}
                                        name='value'
                                        onChange={(e) => this.handleSimple(e)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={4}>
                                    <Modal
                                        aria-labelledby="simple-modal-title"
                                        aria-describedby="simple-modal-description"
                                        open={this.state.open}
                                        onClose={this.handleClose}>
                                        <div className={classes.paper} id="modal">
                                            <h4> <small className="center-text">   </small> </h4>
                                            <Button color="success" round className={classes.marginRight} id="close-bnt" onClick={this.handleClose}> &times;</Button>
                                            <div id="disp" >
                                                <OrgEntity />
                                            </div>
                                        </div>
                                    </Modal>
                                    <Button id="top-bnt" round color="success" onClick={this.handleEntityScreen}>Add MasterType</Button>
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                {this.state.dropdowns.map(function (item, key) {
                                    if (this.state.levelCount - 1 != key) {
                                        return (
                                            <GridItem xs={12} sm={4} key={key}>
                                                <Dropdown key={key}
                                                    required={true}
                                                    labelText={item.mValue}
                                                    lstObject={this.GetMasterListData(item.name)}
                                                    value={this.GetMasterTypeData(item.name)}
                                                    name={item.name}
                                                    onChange={(e) => this.GetMasterData(item.parameter, e)}
                                                    formControlProps={{ fullWidth: true }}
                                                />
                                            </GridItem>
                                        );
                                    } else {
                                        return (
                                            <GridItem xs={12} sm={4} key={key}>
                                                <Dropdown key={key}
                                                    required={true}
                                                    labelText={item.mValue}
                                                    lstObject={this.GetMasterListData(item.name)}
                                                    value={this.GetMasterTypeData(item.name)}
                                                    name={item.name}
                                                    onChange={(e) => this.GetLevelMasterData(item.parameter, e)}
                                                    formControlProps={{ fullWidth: true }}
                                                />
                                            </GridItem>
                                        );
                                    }
                                }.bind(this))
                                }
                            </GridContainer>
                            <GridContainer>
                                <GridItem>
                                    <Button round color="success" onClick={this.addData}>Add</Button>
                                </GridItem>
                            </GridContainer>
                            {this.state.showtable && <div id="searchTableSec">
                                <h5>Please insert new record</h5>
                                <GridContainer justify="start">
                                    <GridItem xs={12} sm={4}>
                                        <CustomInput
                                            labelText="Master Data"
                                            id="lName"
                                            value={this.state.masterdata}
                                            name="masterdata"
                                            onChange={(e) => this.handleinputvalue(e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} >
                                        <Button color="success" id="top-bnt" round onClick={this.handleSubmit} >Submit</Button>
                                    </GridItem>
                                </GridContainer>
                            </div>
                            }
                        </CardBody>
                    </Card>
                    {this.state.lobtable ?
                        <GridContainer>
                            <GridItem xs={12}>
                                <ReactTable
                                    title={"MasterData"}
                                    data={this.state.tabledata}
                                    //filterable
                                    columns={[
                                        {
                                            Header: "Existing Data",
                                            accessor: "mValue",
                                            style: { textAlign: "left" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 50,
                                            resizable: false,
                                        },
                                    ]}
                                    defaultPageSize={5}
                                    showPaginationTop={false}
                                    //pageSize={([this.state.tabledata.length + 1] < 5) ? [this.state.tabledata.length + 1] : 5}
                                    showPaginationBottom={true}
                                    className="-striped -highlight"
                                />
                            </GridItem>
                        </GridContainer>
                        : null}
                </GridItem>
            </GridContainer >
        );
    }
}

export default withStyles(style)(ManageMaster);