import React from "react";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import role from "assets/img/users.png";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import CustomCheckbox from "components/Checkbox/CustomCheckbox";
import DynamicFormTesting from "./DynamicFormTesting.jsx";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Radio from "@material-ui/core/Radio";
import { withStyles } from '@material-ui/core/styles';
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import UserConfig from 'modules/Users/UserConfig.js';
import Dropdown from "components/Dropdown/Dropdown.jsx";
import Accordion from "components/Accordion/Accordion.jsx";
import { Animated } from "react-animated-css";
import { fade } from "@material-ui/core/styles";
import swal from 'sweetalert';
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem.jsx";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ReactTable from "components/MuiTable/MuiTable.jsx";
import PageContentLoader from "components/Loaders/PageContentLoader.jsx";
import { config } from "../../config";
import CustomRadioButton from "components/CustomRadiobutton/CustomRadiobutton.jsx";
import DragNDrop from "./DragNDrop.jsx";
import Modal from '@material-ui/core/Modal';
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import Tooltip from '@material-ui/core/Tooltip';
import Visibility from "@material-ui/icons/Visibility";
import Edit from "@material-ui/icons/Edit";
import IconButton from '@material-ui/core/IconButton';
import productConfig from 'modules/Products/Micro/ProductConfig.js';
import DynamicEntity from 'modules/Workflow/DynamicEntity';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
//import DynamicAccordion from "./DynamicAccordion.jsx"
import { array } from "prop-types";
import Cover from "@material-ui/icons/VerifiedUser";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

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

//const maritalstatus = {
//        [ mID= "Package", mValue= "Male", mType= 1 ],
//        [ mID= "Product", mValue= "Female", mType= 2 ],
//};


class DynamicForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ProductType: [
                { mID: 'Product', mType: "Product", mValue: "Product" },
                { mID: 'User', mType: "User", mValue: "User" },
                { mID: 'Claims', mType: "Claims", mValue: "Claims" },
            ],
            parent: "",
            child: "",
            masterList: [],
            empty: [
                {
                    "mType": "mddfilter",
                    "mdata": [
                        {
                            "mID": 'mdd1',
                            "mValue": "Master Dropdown1",
                            "mType": "isActive"
                        },
                        {
                            "mID": 'mdd1',
                            "mValue": "Master Dropdown2",
                            "mType": "isActive"
                        },
                        {
                            "mID": 'mdd1',
                            "mValue": "Master Dropdown3",
                            "mType": "isActive"
                        }
                    ]
                }
            ],
            dropdown: [
                { mID: 'dd1', mType: "Product", mValue: "Dropdown1" },
                { mID: 'dd2', mType: "User", mValue: "Dropdown2" },
                { mID: 'dd3', mType: "Claims", mValue: "Dropdown3" },
            ],
            Dynamicdata: {},
            radiovalue: "",
            screendata: {
                Parent: [],
                Child: [],
            },
            emptyarray: [],
            showtable: false,
            data: [],
            entitylist: {
                Parent: [],
                Child: [],
            },
            Accordion: [],
            tabvalue: "",
            multipleobject: [],
            Accordian: [],
            MasterDTO: {
                LOB: [],
                COB: [],
                Cover: [],
                CoverEvent: [],
                CoverEventFactor: [],
                CoverEventFactorValue: [],
                InsuranceType: [],
                InsurableCategory: [],
                Risk: [],
                Claim: [],
                channel: [],
                BenefitCriteria: []
            },
            multipleflag: false,
            dynamicobject: [],
            showComponents: false,
            entityname: "",
            fields: {
                selectedFields: [],
            },

            selectedfields: [],
        };
    }

    handleChange = (event, newValue) => {
        this.setState({ tabvalue: event.target.value });
    };

    onInputChange = (evt) => {
        let fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
        console.log("fields: ", fields)
    };

    SetValue = (e, entity) => {
        let data = this.state.Dynamicdata;
        let name = e.target.name;
        let value = e.target.value;

        let objdata = this.state.dynamicobject
        for (let i = 0; i < objdata.length; i++) {
            let array = objdata[i];
            for (let j = 0; j < array.length; j++) {
                let array1 = array[j];
                let attributes = array1.entityAttributes;
                for (let k = 0; k < attributes.length; k++) {
                    if (attributes[k].name == name && attributes[k].entityLevel == entity) {
                        attributes[k].value = value;
                    }
                }
            }
        }
        //let screendata = this.state.screendata.Parent;
        //screendata = screendata.filter(e => e.name === name)[0] === undefined
        //    ? []
        //    : screendata.filter((e) => e.name === name)[0]
        //    ;
        //screendata.value = value;

        data[name] = value;

        this.setState({ data });
        console.log("selected: ", data);
        console.log("selected: ", this.state.dynamicobject);
    }

    onDateChange = (name, event, entity) => {
        var today = event.toDate();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let data = this.state.Dynamicdata;

        data[name] = date;

        let objdata = this.state.dynamicobject
        for (let i = 0; i < objdata.length; i++) {
            let array = objdata[i];
            for (let j = 0; j < array.length; j++) {
                let array1 = array[j];
                let attributes = array1.entityAttributes;
                for (let k = 0; k < attributes.length; k++) {
                    if (attributes[k].name == name && attributes[k].entityLevel == entity) {
                        attributes[k].value = date;
                    }
                }
            }
        }

        this.setState({ data });
        console.log("selected: ", data);
    };

    handleRadioChange = (name, e, entity) => {
        let value = e.target.value;
        this.setState({ radiovalue: e.target.value })
        let data = this.state.Dynamicdata;

        data[name] = value;
        this.setState({ data });
        console.log("selected: ", data);
    }

    SetCheckValue = (name, e, entity) => {
        let data = this.state.Dynamicdata;
        let value = e.target.checked;
        if (value == true) {
            data[name] = value;
        } else if (value == false) {
            data[name] = value;
        }
        this.setState({ data });
        console.log("selected: ", data);
    }

    GetMasterData = (type, event, entity) => {
        this.SetValue(event, entity);
        console.log("event", event.target.name)

        if (type != "") {
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
            if (isvalid == true) {
                this.GetMasterService(type, event.target.value)
            }
            //this.GetMasterService(type, event.target.value);
        }
        //if (type === "COB") {
        //    //COB based call
        //    //this.GetMasterService('InsuranceType', 0);
        //    this.GetMasterService('Cover', event.target.value);
        //    this.GetMasterService('CoverEvent', event.target.value);
        //}
        //if (type === "CoverEventFactor") {
        //    this.GetMasterService('BenefitCriteria', event.target.value);
        //    this.GetMasterService('Risk', event.target.value);
        //    this.GetMasterService('Claim', event.target.value);
        //}
        //if (type === "InsurableCategory") {
        //    this.GetMasterService('CoverEvent', event.target.value);
        //}
    };

    handleRenderScreen = (prop) => {
        if (prop.componentType == "String") {
            return (
                <CustomInput
                    //success={this.state.firstNameState == "success"}
                    //error={this.state.firstNameState == "error"}
                    //error={this.state.firstNameState}
                    labelText={prop.labelText}
                    name={prop.name}
                    value={prop.value}
                    required={prop.required}
                    onChange={(e) => this.SetValue(e, prop.entityLevel)}
                    formControlProps={{ fullWidth: true }}
                />
            );
        }
        if (prop.componentType == "Number") {
            return (
                <CustomInput
                    //success={this.state.firstNameState == "success"}
                    //error={this.state.firstNameState == "error"}
                    //error={this.state.firstNameState}
                    labelText={prop.labelText}
                    name={prop.name}
                    value={prop.value}
                    inputType="number"
                    required={prop.required}
                    onChange={(e) => this.SetValue(e, prop.entityLevel)}
                    formControlProps={{ fullWidth: true }}
                />
            );
        }
        if (prop.componentType == "Currency") {
            return (
                <CustomInput
                    //success={this.state.firstNameState == "success"}
                    //error={this.state.firstNameState == "error"}
                    //error={this.state.firstNameState}
                    labelText={prop.labelText}
                    name={prop.name}
                    value={prop.value}
                    type="Rupee"
                    required={prop.required}
                    onChange={(e) => this.SetValue(e, prop.entityLevel)}
                    formControlProps={{ fullWidth: true }}
                />
            );
        }
        if (prop.componentType == "Dropdown") {
            return (
                <Dropdown
                    required={prop.required}
                    labelText={prop.labelText}
                    lstObject={this.state.MasterDTO[prop.listObject]}
                    value={prop.value}
                    name={prop.name}
                    onChange={(e) => this.GetMasterData(prop.parameter, e, prop.entityLevel)}
                    formControlProps={{ fullWidth: true }} />
            );
        }
        if (prop.componentType == "Master Dropdown") {
            return (
                <MasterDropdown
                    labelText={prop.labelText}
                    name={prop.name}
                    value={prop.value}
                    id={prop.name}
                    lstObject={this.state.masterList}
                    required={prop.required}
                    filterName={prop.filterName}
                    onChange={(e) => this.SetValue(e, prop.entityLevel)}
                    formControlProps={{ fullWidth: true }}
                />
            );
        }
        if (prop.componentType == "Date") {
            return (
                <CustomDatetime
                    labelText={prop.labelText}
                    name={prop.name}
                    value={prop.value}
                    id={prop.name}
                    Futuredatevalidate={prop.futureDate}
                    required={prop.required}
                    onChange={(e) => this.onDateChange(prop.name, e, prop.entityLevel)}
                    formControlProps={{ fullWidth: true }} />
            );
        }
        if (prop.componentType == "Radio") {
            const { classes } = this.props;
            return (
                <FormControlLabel
                    control={
                        <Radio
                            checked={this.state.radiovalue == prop.value}
                            onChange={(e) => this.handleRadioChange(prop.name, e, prop.entityLevel)}
                            value={prop.value}
                            name={prop.name}
                            aria-label="B"
                            icon={
                                <FiberManualRecord
                                    className={classes.radioUnchecked}
                                />
                            }
                            checkedIcon={
                                <FiberManualRecord
                                    className={classes.radioChecked}
                                />
                            }
                            classes={{
                                checked: classes.radio,
                                root: classes.radioRoot
                            }}
                        />
                    }
                    classes={{
                        label: classes.label
                    }}
                    label={prop.labelText}
                />
            );
        }
        if (prop.componentType == "Check") {
            return (
                <CustomCheckbox
                    labelText={prop.labelText}
                    name={prop.name}
                    value={prop.checked}
                    onChange={(e) => this.SetCheckValue(prop.name, e, prop.entityLevel)}
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            );
        }
        if (prop.componentType == "Button") {
            return (
                <Button color='primary' round onClick={() => this.handlesubmit(prop.name)} >{prop.labelText}</Button>
            )
        }
        if (prop.componentType == "Accordion") {
            this.AccordianFunction();
        }
        if (prop.componentType == "Label") {
            return (
                <label>{prop.labelText}</label>
            )
        }

    }

    AccordianFunction = () => {
        return (
            <GridItem xs={12}>
                {/*{this.state.AddCont.map((prop, key) => {
                    return (
                    */}
                <Accordion
                    collapses={
                        [{
                            title: "Coverages",
                            content: ""
                        }]
                    }
                />

                {/*  );
                })
                }*/}
            </GridItem>
        )
    };

    handleProductType = (e, type) => {
        if (type == "Parent") {
            this.state.dynamicobject = [];
        }
        this.state.showComponents = false;
        let name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value });

        if (type == "Parent") {
            this.state.entityname = this.state.entitylist.Parent.filter(a => a.mID == e.target.value)[0].mValue === undefined
                ? [] :
                this.state.entitylist.Parent.filter(a => a.mID == e.target.value)[0].mValue;
        }
        this.setState({});

        this.SearchEntities(e.target.value);

        console.log("Entitylist: ", this.state.screendata)
        console.log("Entitylist: ", this.state.entitylist)
    }

    SearchEntities = (id) => {
        fetch(`${productConfig.productConfigUrl}/api/Product/GetSingleEntitiesById?Id=` + id + ``,
            {
                method: 'Get',
                //body: JSON.stringify(this.state.searchOrg),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
            }
        ).then(response => response.json())
            .then(data => {
                const lData = data;
                console.log("dataCheck: ", data);
                this.setState({ dynamicobject: data })

                //let screenDTO = this.state.screendata;
                //this.state.dynamicobject.push(lData[0].entityAttributes);
                //screenDTO[type] = lData[0].entityAttributes;

                //this.setState({ screenDTO });

                console.log("dataCheck: ", data);
                console.log("dataCheck: ", this.state.dynamicobject);

                if (data.length == 0) {
                    this.setState({ showComponents: true });
                }
            });
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
                const lData = data;
                //let locDTO = ;
                this.state.MasterDTO[type] = lData;
                this.setState({});
                console.log("GetMasterService: ", data);
                console.log("GetMasterService: ", this.state.MasterDTO);
            });

    };

    handlesubmit = (name) => {
        //console.log("selected: ", this.state.Dynamicdata)
        //if (this.state.Dynamicdata != {}) {
        //    this.state.emptyarray.push(this.state.Dynamicdata);
        //    //this.tabledata();
        //}
        if (name == "Add") {
            //swal({
            //    text: "This is Add button event",
            //    icon: "success"
            //})
            if (this.state.multipleflag == false) {
                fetch(`${productConfig.productConfigUrl}/api/Product/GetMultipleEntitiesById?Id=` + this.state.parent + ``,
                    {
                        method: 'Get',
                        //body: JSON.stringify(this.state.searchOrg),
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                        },
                    }
                ).then(response => response.json())
                    .then(data => {
                        const lData = data;
                        console.log("Response ", data);
                        this.setState({ multipleobject: data })
                        this.state.Accordion.push(data);

                        //this.dynamicAccordion(data);
                        //for (let i = 0; i < data.length; i++) {
                        //    var array1 = data[i];
                        //    for (let j = 0; j < array1.length; j++) {
                        //        this.state.multipleobject.push(array1[j].entityAttributes);
                        //        //let array = array1[j].entityAttributes;
                        //        //this.state.multipleobject = this.state.multipleobject.concat(array);
                        //    }
                        //}

                        //var array1 = data[0];
                        //var array2 = array1[0];

                        //this.state.multipleobject = array2.entityAttributes;

                        //console.log("response: ", array2.entityAttributes);
                        console.log("response: ", this.state.multipleobject);
                        this.setState({ multipleflag: true });
                    });
                //this.state.Accordion = Object.assign([], arraydata);
                console.log("selected: ", this.state.Accordion)
            }
            if (this.state.multipleflag == true) {
                this.state.Accordion.push(this.state.multipleobject);
                //this.dynamicAccordion();
                console.log("selected: ", this.state.Accordion)
                this.setState({})
            }
        }

        //let objdata = this.state.dynamicobject
        //for (let i = 0; i < objdata.length; i++) {
        //    let array = objdata[i];
        //    for (let j = 0; j < array.length; j++) {
        //        if (array[j].componentType != "Radio") {
        //            array[j].value = "";
        //        }
        //    }
        //    this.setState({ radiovalue: "" });
        //}

        //Object.assign(this.state.Dynamicdata, {});
        //this.state.Dynamicdata = {};

        //for (let i = 0; i < this.state.screendata.length; i++) {
        //    let screendata = this.state.screendata;
        //    if (screendata[i].componentType != "Radio") {
        //        screendata[i].value = "";
        //    }
        //    this.setState({ radiovalue: "" });
        //}

        console.log("Select ", this.state.Dynamicdata);
    }

    dynamicAccordion = (data) => {
        console.log('selected: ', this.state.Accordion)

        return (
            <GridContainer>
                <GridItem xs={12}>
                    {this.state.Accordion.map(item => {
                        return (
                            <Accordion
                                collapses={
                                    [{
                                        title: "Coverages",
                                        content: this.ChildDynamicAccordion(item)
                                    }]
                                }
                            />
                        );
                    })}
                </GridItem>
            </GridContainer>
        );
    }

    ChildDynamicAccordion = (data) => {
        return (
            <GridContainer>
                <GridItem md={12}>
                    {data.map((item1, key) => {
                        if (key == 0) {
                            return (
                                <Accordion
                                    collapses={
                                        [{
                                            title: item1.enitityName,
                                            content: <CardBody>
                                                <GridContainer lg={12}>
                                                    {item1.entityAttributes.map(item2 => {
                                                        return (
                                                            <GridItem xs={12} sm={4} >
                                                                {this.handleRenderScreen(item2)}
                                                            </GridItem>
                                                        );
                                                    })}
                                                </GridContainer>
                                            </CardBody>
                                        }]
                                    }
                                />
                            );
                        }
                        if (key == 1) {
                            return (
                                <Accordion
                                    collapses={
                                        [{
                                            title: item1.enitityName,
                                            content: <CardBody>
                                                <GridContainer>
                                                    {item1.entityAttributes.map(item2 => {
                                                        return (
                                                            <GridItem xs={12} sm={4} >
                                                                {this.handleRenderScreen(item2)}
                                                            </GridItem>
                                                        );
                                                    })}
                                                </GridContainer>
                                            </CardBody>
                                        }]
                                    }
                                />
                            );
                        }
                    })}
                </GridItem>
            </GridContainer>
        );
    }

    RenderAccordion = () => {
        return (
            <GridItem xs={12}>
                <Accordion
                    collapses={
                        [{
                            title: "Coverages",
                            content: this.state.multipleobject.map((item, key) => {
                                return (
                                    <CardBody>
                                        <GridContainer lg={12}>
                                            {item.entityAttributes.map(item1 => {
                                                return (
                                                    <GridItem xs={12} sm={4} md={3}>
                                                        {this.handleRenderScreen(item1)}
                                                    </GridItem>
                                                );
                                            })}
                                        </GridContainer>
                                    </CardBody>
                                );
                            })

                        }]
                    }
                />
            </GridItem>
        );
        {/*<DynamicAccordion multipleobject={this.state.multipleobject} MasterDTO={this.state.MasterDTO} />,*/ }
    }

    tabledata = () => {
        this.setState({ showtable: true });

        this.setState({
            data: Object.keys(this.state.emptyarray[0]).map((prop) => {
                return {
                    Header: prop.charAt(0).toUpperCase() + prop.slice(1),
                    accessor: prop,
                };
                this.setState({});
            })
        });
        console.log("Selected: ", this.state.data)
        console.log("Select ", this.state.Dynamicdata);
    }

    resetobject = () => {
        this.setState({ Dynamicdata: {} });
    }

    Multiple = () => {
        //if (key == 0) {
        //    {
        //        debugger
        //        item.map(item1 => {
        //            return (
        //                <GridItem>
        //                    {this.handleRenderScreen(item1)}
        //                </GridItem>
        //            );
        //        })
        //    }
        //}
        //else {
        //    {
        //        item.map(item1 => {
        //            return (
        //                <GridItem xs={12} sm={4} md={3}>
        //                    {this.handleRenderScreen(item1)}
        //                </GridItem>
        //            );
        //        })
        //    }
        //}
        return (
            <GridContainer>
                {this.state.multipleobject.map(item => {
                    return (
                        <GridItem xs={12} sm={4} md={3}>
                            {this.handleRenderScreen(item)}
                        </GridItem>
                    )
                })}
            </GridContainer>
        )
    }

    componentDidMount() {
        fetch(`${productConfig.productConfigUrl}/api/Product/GetMasterData?sMasterlist=das`, {
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
                console.log("masterlist", data);
            });
        this.GetEntity(0, 'Parent');
        this.GetMasterService('LOB', 0);
    }

    GetEntity = (id, type) => {
        fetch(`${productConfig.productConfigUrl}/api/Product/GetEntities?parentid=` + id + ``,
            {
                method: 'Get',
                //body: JSON.stringify(this.state.searchRequest),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
            }
        ).then(response => response.json())
            .then(data => {
                const lData = data;
                let EntityDTO = this.state.entitylist;
                EntityDTO[type] = lData;
                this.setState({ EntityDTO });
                console.log("dataCheck: ", data);
            });
    }

    addFields = () => {

        let fields = this.state.fields.selectedFields;
        var multiselectedarray = fields.split(",");
        let finalfields = this.state.selectedfields;
        let obj = this.state.screendata;
        for (let i = 0; i < fields.length; i++) {
            for (let j = 0; j < obj.length; j++) {
                if (obj[i].id == fields[i]) {
                    finalfields.push(obj[i]);
                }
            }
        }
        this.setState({ finalfields });
        console.log("fields: ", finalfields)
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="rose" icon>
                                <CardIcon color="rose">
                                    { /*  <FilterNone /> */}

                                    <Icon><img id="icon" src={role} /></Icon>

                                </CardIcon>
                                <h4>
                                    <small>{/*<TranslationContainer translationKey="SearchOrganization" />*/}Dynamic Product </small>
                                </h4>
                            </CardHeader>
                            <CardBody>
                                <GridContainer>
                                    <GridItem xs={12} sm={4} md={3}>
                                        <Dropdown
                                            required={true}
                                            labelText="Select Entity"
                                            lstObject={this.state.entitylist.Parent}
                                            value={this.state.parent}
                                            name='parent'
                                            onChange={(e) => this.handleProductType(e, 'Parent')}
                                            formControlProps={{ fullWidth: true }} />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} md={3}>
                                        <FormControl
                                            fullWidth
                                            className={classes.selectFormControl}
                                        >
                                            <InputLabel
                                                htmlFor="multiple-select"
                                                className={classes.selectLabel}
                                            >
                                                Attributes
                          </InputLabel>
                                            <Select
                                                multiple
                                                value={this.state.fields.selectedFields}
                                                onChange={this.onInputChange}
                                                MenuProps={{ className: classes.selectMenu }}
                                                classes={{ select: classes.select }}
                                                inputProps={{
                                                    name: "selectedFields",
                                                    id: "multiple-select"
                                                }}
                                            >
                                                {
                                                    this.state.screendata.Parent.map(item =>
                                                        <MenuItem
                                                            value={item.id}
                                                            classes={{
                                                                root: classes.selectMenuItem,
                                                                selected: classes.selectMenuItemSelected
                                                            }}
                                                        > {item.labelText}
                                                        </MenuItem>
                                                    )
                                                }
                                            </Select>
                                        </FormControl>
                                    </GridItem>
                                    <GridItem xs={12} sm={4} md={3}>
                                        <Button color="primary" round onClick={() => this.addFields()}>Add Fields</Button>
                                    </GridItem>
                                </GridContainer>

                            </CardBody>
                        </Card>

                        {(this.state.dynamicobject.length > 0) ?
                            <div>
                                {this.state.dynamicobject.map((item, key) => {
                                    return (
                                        <Card>
                                            {(key == 0) ?
                                                <CardHeader color="rose" icon>
                                                    <CardIcon color="rose">
                                                        { /*  <FilterNone /> */}
                                                        <Icon><img id="icon" src={role} /></Icon>
                                                    </CardIcon>
                                                    <h4>
                                                        <small>{/* <TranslationContainer translationKey="SearchOrganization" />*/}{this.state.entityname} </small>
                                                        {/* <small><TranslationContainer translationKey="SearchOrganization" />{item[0].enitityName} </small>*/}
                                                    </h4>
                                                </CardHeader>
                                                : null}
                                            <CardBody>
                                                <GridContainer>
                                                    {item[0].entityAttributes.map(item1 => {
                                                        return (
                                                            <GridItem xs={12} sm={4} md={3}>
                                                                {this.handleRenderScreen(item1)}
                                                            </GridItem>
                                                        );
                                                    })}
                                                </GridContainer>
                                            </CardBody>
                                        </Card>
                                    );
                                })}

                            </div>
                            : null}

                        {/*{this.state.multipleflag ?
                            <GridContainer>
                                {this.RenderAccordion()}
                            </GridContainer>
                            : null}*/}

                        {this.state.multipleflag ?
                            <GridContainer>
                                <GridItem xs={12}>
                                    {this.dynamicAccordion()}
                                </GridItem>
                            </GridContainer>
                            : null}

                        {/* {this.state.multipleflag ?
                            <GridContainer>
                                {this.state.Accordion.map(item => {
                                    return (
                                        <GridItem xs={12}>
                                            <Accordion
                                                collapses={
                                                    [{
                                                        title: "Coverages",
                                                        content: item.map((item1, key) => {
                                                            return (
                                                                <CardBody>
                                                                    <GridContainer lg={12}>
                                                                        {item1.entityAttributes.map(item2 => {
                                                                            return (
                                                                                <GridItem xs={12} sm={4} md={3}>
                                                                                    {this.handleRenderScreen(item2)}
                                                                                </GridItem>
                                                                            );
                                                                        })}
                                                                    </GridContainer>
                                                                </CardBody>
                                                            );
                                                        })

                                                    }]
                                                }
                                            />
                                        </GridItem>
                                    );
                                })}
                            </GridContainer>
                            : null}*/}

                        {this.state.showComponents ?
                            <Card>
                                <CardHeader color="rose" icon>
                                    <CardIcon color="rose">
                                        { /*  <FilterNone /> */}

                                        <Icon><img id="icon" src={role} /></Icon>

                                    </CardIcon>
                                    <h4>
                                        <small>{/*<TranslationContainer translationKey="SearchOrganization" />*/}{this.state.entityname} </small>
                                    </h4>
                                </CardHeader>
                                <CardBody>
                                    <h4>There are no Entities available for the selected Product Type</h4>
                                </CardBody>
                            </Card>
                            : null
                        }
                        {this.state.showtable ?
                            <GridContainer xl={12}>
                                <GridItem lg={12}>
                                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                        <ReactTable
                                            //title={"Users"}
                                            data={this.state.emptyarray}
                                            filterable
                                            columns={this.state.data}
                                            defaultPageSize={5}
                                            showPaginationTop={false}
                                            //pageSize={([this.state.data.length + 1] < 5) ? [this.state.data.length + 1] : 5}
                                            showPaginationBottom={true}
                                            className="-striped -highlight"
                                        />
                                    </Animated>
                                </GridItem>
                            </GridContainer>
                            : null}
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default withStyles(style)(DynamicForm);