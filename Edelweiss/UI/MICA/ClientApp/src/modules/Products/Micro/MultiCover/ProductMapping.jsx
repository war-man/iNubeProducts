import React from "react";

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
import ReactTable from "react-table";
import { Redirect } from 'react-router-dom';
import { Animated } from "react-animated-css";
import swal from 'sweetalert';
import $ from 'jquery';
import productConfig from 'modules/Products/Micro/ProductConfig.js';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import withStyles from "@material-ui/core/styles/withStyles";
import { Grid } from "@material-ui/core";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import { METHODS } from "http";
import { EventEmitter } from "events";
import { initialState } from "../../../../components/Translation/reducer";
import ProductEntity from './ProductEntity.jsx';
import Modal from '@material-ui/core/Modal';
import { dangerBoxShadow } from "../../../../assets/jss/material-dashboard-pro-react";


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

class ProductMapping extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            masterList: [],
            open: false,
            dropdowns: [],
            masterdataType: "",
            masterdata: "",
            value: "",
            showtable: false,
            fields: {},
           
            levelCount: 0,
            masterdtolist: [],
            MasterDTO: {},
            selectedvalue: [],
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
            parentId:0,
        };
        this.initialfields={ };
        this.addData = this.addData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEntityScreen = this.handleEntityScreen.bind(this);
    }

    handleSimple = event => {
        this.setState({ [event.target.name]: event.target.value });

        //console.log("fields: ", this.state.fields, "initial fields: ", this.initialfields);
        ////debugger;
        ////this.state.fields = this.state.initialfields;
        
        this.setState({
            [event.target.name]: event.target.value, masterdataType: "", tabledata: this.state.MasterDTO.LOB, lobtable: false, showtable: false,
        });
        
        this.state.selectedvalue = [];
        this.state.dropdowns = [];
        this.state.levelCount = event.target.value - 1;
        this.state.parentId = 0;
        this.state.selectedvalue.push(this.state.masterList[event.target.value - 1]);
        this.setState({ masterdataType: this.state.selectedvalue[0].name });
        console.log("level value: ", this.state.levelCount);
        console.log("masterdataType value: ", this.state.masterdataType);
        for (let i = 0; i < event.target.value - 1; i++) {
            this.state.dropdowns.push(this.state.masterList[i]);
        }
        console.log("count: ", this.state.levelCount);
        if (event.target.value == 1) {
            this.setState({ lobtable: true });
        }
    };

    addData = () => {
        this.setState({ showtable: true });
    }

    handleSubmit() {
        console.log("masterdata: ", this.state.masterdata)
        console.log("masterdatatype: ", this.state.masterdataType)
        let mdata = this.state.MasterdataDTO;
        mdata.Value = this.state.masterdata;                                        //custuminput data
        mdata.MasterType = this.state.masterdataType;                               //type of masterdata selected in dropdown
       // mdata.ParentId = this.GetParentId(this.state.masterdataType);               //parentid of masterdata selected in dropdown
        mdata.ParentId = this.state.parentId;               //parentid of masterdata selected in dropdown
        this.setState({ mdata });
        console.log("mdata: ", mdata)
        fetch(`${productConfig.productConfigUrl}/api/Product/AddMasterData`, {
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
            });
        this.setState({ showtable: false, lobtable: false, masterType: "" });

    }

    handleinputvalue = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    SetValue = (type, event) => {
        let fields = this.state.fields;
        fields[event.target.name] = event.target.value;
        this.setState({ fields });
        console.log('Fields', this.state.fields, 'Name', event.target.name, 'Value', event.target.value);
    }

    GetMasterService = (type, pID) => {
        fetch(`${productConfig.productConfigUrl}/api/Product/GetProductMaster?masterType=` + type + `&parentID=` + pID, {
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
                })
                console.log("tabledata ",this.state.tabledata,"data array: ",dataArray)
            });

    };

    GetMasterData = (type, event) => {
        this.SetValue(type, event);
        console.log("event", event.target.name, 'State', this.state)

        if (type === "COB") {
            this.GetMasterService('Cover', event.target.value);
            this.GetMasterService('CoverEvent', event.target.value);
        }
        if (type === "CoverEventFactor") {
            this.GetMasterService('BenefitCriteria', event.target.value);

        }
        if (type === "InsuranceType") {
            this.GetMasterService('CoverEvent', event.target.value);
        }
        if (type != "") {
            this.GetMasterService(type, event.target.value);
        }


        console.log("Table: ", this.state.tabledata)
    };

    GetLevelMasterData = (type, event) => {
        this.setState({ lobtable: true });
        this.SetValue(type, event);
        console.log("event", event.target.name, 'State', this.state)

        if (type === "COB") {
            this.GetMasterService('Cover', event.target.value);
            this.GetMasterService('CoverEvent', event.target.value);
        }
        if (type === "CoverEventFactor") {
            this.GetMasterService('BenefitCriteria', event.target.value);

        }
        if (type === "InsuranceType") {
            this.GetMasterService('CoverEvent', event.target.value);
        }
        if (type != "") {
            this.GetMasterService(type, event.target.value);
        }
        this.state.parentId = event.target.value;
        let dataArray = this.GetMasterListData(type);
        this.setState({
            tabledata: dataArray
        })
        console.log("Table: ", this.state.tabledata, 'Filterdata', dataArray)
        
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleEntityScreen = () => {
        this.setState({ open: true });
    }

    componentDidMount() {
        fetch(`${productConfig.productConfigUrl}/api/Product/GetEntityMaster`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(response => response.json())
            .then(data => {
                this.setState({ masterList: data });
                console.log("masterlist", this.state.masterList);
                let master = this.state.masterdtolist;
                for (let i = 0; i < this.state.masterList.length; i++) {
                    this.state.masterdtolist.push(this.state.masterList[i].mType);
                    this.state.MasterDTO[this.state.masterList[i].mType] = [];
                    this.state.fields[this.state.masterList[i].mType] = '';
                    this.initialfields[this.state.masterList[i].mType] = '';
                }
                //Object.assign(this.state.fields, this.state.initialfields);
                this.setState({ master });
                console.log("masterdtolist: ", this.state.masterdtolist);
                console.log("masterdto: ", this.state.MasterDTO);
                console.log("fields: ", this.state.fields);
            });
        this.GetMasterService('LOB', 0);
    }

    /*dynamic objects for name and value of dropdown*/
    GetMasterTypeData = (type) => {
        return this.state.fields[type]
    }

    /*dynamic objects for list of dropdown*/
    GetMasterListData = (type) => {
        return this.state.MasterDTO[type]
    }

    GetParentId = (type) => {
        let field = this.state.fields;
        switch (type) {
            case 'LOB':
                return 0;
            case 'COB':
                return field.LOB
            case 'InsuranceType':
                return field.COB;
            case 'Cover':
                return field.InsuranceType;
            case 'CoverEvent':
                return field.COB;
            case 'CoverEventFactor':
                return field.CoverEvent;
            case 'CoverEventFactorValue':
                return field.CoverEventFactor;
            case 'BenefitCriteria':
                return field.CoverEvent;
            default:
                return 0;
        }
    }

    render() {
        const { classes } = this.props;
        let levelcount = this.state.levelCount;
        let lob = this.state.fields.LOB;
        return (
            <div>
                <GridContainer>
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.open}
                        onClose={this.handleClose}>

                        <div className={classes.paper} id="modal">
                            <h4> <small className="center-text">   </small> </h4>
                            <Button color="info"
                                round
                                className={classes.marginRight}
                                id="close-bnt"
                                onClick={this.handleClose}>
                                &times;
                            </Button>
                            <div id="disp" >
                                <ProductEntity />
                            </div>
                        </div>
                    </Modal>
                </GridContainer >
                <Card >
                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                            <Icon><img id="icon" src={role} /></Icon>
                        </CardIcon>
                        {
                            <h4 >
                                <small> Product Master Data Mapping </small>
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
                                <Button id="edit-bnt-profile" onClick={this.handleEntityScreen}>Add MasterType</Button>
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
                                <Button round info="primary" onClick={this.addData}>Add</Button>
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
                                    <Button info="primary" round onClick={this.handleSubmit} >Submit</Button>
                                </GridItem>
                            </GridContainer>
                        </div>
                        }
                        {this.state.lobtable &&
                            <GridContainer justify="center">
                                <div id="searchTableSec">
                                    <GridItem xs={6}>
                                        <CardBody className="asign-product-react-tab">
                                            <ReactTable
                                                data={this.state.tabledata}
                                                //filterable
                                                columns={[
                                                    {
                                                        Header: "Existing Data",
                                                        accessor: "mValue",
                                                        style: { textAlign: "center" },
                                                        headerClassName: 'react-table-center',
                                                        minWidth: 20,
                                                        resizable: false,
                                                    },
                                                ]}
                                                defaultPageSize={5}
                                                showPaginationTop={false}
                                                showPaginationBottom
                                                className="-striped -highlight"
                                            />
                                        </CardBody>
                                    </GridItem>
                                </div>
                            </GridContainer>
                        }
                    </CardBody>
                </Card>
            </div >
        );
    }
}

export default withStyles(style)(ProductMapping);