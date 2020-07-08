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

class DynamicEntity extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            componenttype: [],
            dropdown: false,
            mdropdown: false,
            date: false,
            radio: false,
            check: false,
            booleanvalues: [
                {
                    "mID": true,
                    "mValue": "True",
                    "mType": "ComponentType"
                },
                {
                    "mID": false,
                    "mValue": "False",
                    "mType": "ComponentType"
                }
            ],
            relation: [
                {
                    "mID": "Single",
                    "mValue": "Single",
                    "mType": "ComponentType"
                },
                {
                    "mID": "Multiple",
                    "mValue": "Single",
                    "mType": "ComponentType"
                }
            ],
            entities: {
                "enitityName": "",
                "entityLevel": "",
                "parentId": 0,
                "relationship": "",
                "type": "",
                "entityAttributes": []
            },
            resetentities: {
                "enitityName": "",
                "entityLevel": "",
                "parentId": 0,
                "relationship": "",
                "type": "",
                "entityAttributes": []
            },
            entityAttributes: {
                "fieldType": "",
                "entityLevel": "",
                "labelText": "",
                "name": "",
                "value": "",
                "filterName": "",
                "listObject": "",
                "required": "",
                "futureDate": "",
                "checked": "",
                "parentId": "",
                "parameter": "",
            },
            resetentityAttributes: {
                "fieldType": "",
                "entityLevel": "",
                "labelText": "",
                "name": "",
                "value": "",
                "filterName": "",
                "listObject": "",
                "required": "",
                "futureDate": "",
                "checked": "",
                "parentId": "",
                "parameter": "",
            },
            tabledata: [],
            entityparent: "",
            array: [],
            showtable: false,
            showAttributes: false,
            entitylist: [],
            type: "",
        };
    }

    SetValue = (e) => {
        let entities = this.state.entities;
        let name = e.target.name;
        let value = e.target.value;

        if (name == "entityparent") {
            this.setState({ [e.target.name]: e.target.value });
        }

        entities[name] = value;
        this.setState({ entities });
        console.log("entities: ", entities)
    }

    handlechange = (e) => {
        //this.setState({ entities: this.state.resetentities });
        let entityAttributes = this.state.entityAttributes;
        let name = e.target.name;
        let value = e.target.value;

        entityAttributes[name] = value;

        if (name == "labelText") {
            entityAttributes.name = e.target.value.split(" ").join("");
        }
        let type;
        if (name == "fieldType") {
            type = this.state.componenttype.filter(a => a.mID === entityAttributes.fieldType)[0].mValue === undefined
                ? []
                : this.state.componenttype.filter(a => a.mID === entityAttributes.fieldType)[0].mValue;
        }

        if (type == "Radio") {
            entityAttributes.name = e.target.name.split(" ").join("");
        }

        this.setState({ entityAttributes });
        console.log("change: ", entityAttributes);
    }

    handleComponentType = (e) => {
        let entityAttributes = this.state.entityAttributes;
        let name = e.target.name;
        let value = e.target.value;

        entityAttributes[name] = value;

        let type = this.state.componenttype.filter(a => a.mID === e.target.value)[0].mValue === undefined
            ? []
            : this.state.componenttype.filter(a => a.mID === e.target.value)[0].mValue;

        if (type == "String" || type == "Number" || type == "Currency" || type == "Check" || type == "Button") {
            this.setState({ dropdown: false, mdropdown: false, date: false, radio: false });
        }
        if (type == "Dropdown") {
            this.setState({ dropdown: true, mdropdown: false, date: false, radio: false });
        }
        if (type == "Master Dropdown") {
            this.setState({ dropdown: false, mdropdown: true, date: false, radio: false });
        }
        if (type == "Date") {
            this.setState({ dropdown: false, mdropdown: false, date: true, radio: false })
        }
        if (type == "Radio") {
            this.setState({ dropdown: false, mdropdown: false, date: false, radio: true });
        }

        this.setState({ entityAttributes });
        console.log("change: ", entityAttributes);

    }

    componentDidMount() {
        fetch(`${productConfig.productConfigUrl}/api/Product/GetPSDMasterData?masterlist=ComponentType`,
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
                this.setState({ componenttype: data });
                console.log("dataCheck: ", data);
            });

        this.GetEntity(0);
        //fetch(`${productConfig.productConfigUrl}/api/Product/SaveEntities`,
        //fetch(`${productConfig.productConfigUrl}/api/Product/SearchEntities?type=s`,
        //fetch(`${productConfig.productConfigUrl}/api/Product/SearchEntitiesByType?type=Product`,
        //fetch(`${productConfig.productConfigUrl}/api/Product/GetDynamicProduct?type=Product`,
        //    {
        //        method: 'Get',
        //        //body: JSON.stringify(this.state.searchRequest),
        //        headers: {
        //            'Content-Type': 'application/json; charset=utf-8',
        //            'Authorization': 'Bearer ' + localStorage.getItem('userToken')
        //        },
        //    }
        //).then(response => response.json())
        //    .then(data => {
        //        this.setState({ screendata: data });
        //        console.log("dataCheck: ", data);
        //    });
    }

    GetEntity = (id) => {
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
                this.setState({ entitylist: data });
                console.log("dataCheck: ", data);
            });
    }

    handleAdd = () => {
        let obj = Object.assign({}, this.state.entityAttributes)
        this.state.array.push(obj);
        console.log("Array: ", this.state.array);
        this.handleTable();
        this.resetobj();
    }

    handleTable = (array) => {
        this.setState({ showtable: true });
        this.setState({
            tabledata: this.state.array.map((item) => {
                console.log("type: ", item.fieldType)
                const { classes } = this.props;
                return {
                    fieldType: this.componentType(item.fieldType),
                    labelText: item.labelText,
                    name: item.name,
                    required: item.required,
                };
            })
        })

    }

    resetobj = () => {
        //Object.assign(this.state.entityAttributes, ...{});
        Object.assign({}, this.state.entityAttributes);
        Object.assign(this.state.entityAttributes, this.state.resetentityAttributes);
        this.setState({});
    }

    componentType = (type) => {
        let ctype = this.state.componenttype.filter(a => a.mID === type)[0].mValue === undefined
            ? []
            : this.state.componenttype.filter(a => a.mID === type)[0].mValue;

        return ctype;
    }

    handleSubmit = () => {

        console.log("final Object: ", this.state.entities);
        console.log("final Object: ", this.state.array);

        let entity = this.state.entities;

        entity.parentId = this.state.entityparent;
        let array = this.state.array;
        for (let i = 0; i < array.length; i++) {
            array[i].entityLevel = this.state.entities.entityLevel;
        }
        entity['entityAttributes'] = array;
        this.setState({ entity });
        console.log("final Object: ", entity);

        fetch(`${productConfig.productConfigUrl}/api/Product/SaveEntities`, {
            //fetch(`http://localhost:59968/api/Product/SaveEntities`, {
            method: 'Post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(entity)
        }).then(response => response.json())
            .then(data => {
                console.log("response data", data);
                swal({
                    text: "Entity data saved successfully!",
                    icon: "success"
                })
                this.state.entities = this.state.resetentities;
                this.state.array = [];
                this.state.entityparent = "";
                this.state.tabledata = [];
                this.state.entityAttributes = this.state.resetentityAttributes;
                this.setState({ dropdown: false, mdropdown: false, date: false, radio: false, showtable: false, showAttributes: false });
            });
    }

    handleAttributes = () => {
        this.setState({ showAttributes: true });
    }

    render() {
        const { classes } = this.props;
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                                { /*  <FilterNone /> */}

                                <Icon><img id="icon" src={role} /></Icon>

                            </CardIcon>
                            <h4>
                                <small>{/*<TranslationContainer translationKey="SearchOrganization" />*/}Dynamic Entities </small>
                            </h4>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={4} md={3}>
                                    <CustomInput
                                        //success={this.state.firstNameState == "success"}
                                        //error={this.state.firstNameState == "error"}
                                        //error={this.state.firstNameState}
                                        labelText="Entity Name"
                                        name="enitityName"
                                        value={this.state.entities.enitityName}
                                        required={true}
                                        onChange={(e) => this.SetValue(e)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={4} md={3}>
                                    <CustomInput
                                        //success={this.state.firstNameState == "success"}
                                        //error={this.state.firstNameState == "error"}
                                        //error={this.state.firstNameState}
                                        labelText="Entity Level"
                                        name="entityLevel"
                                        value={this.state.entities.entityLevel}
                                        required={true}
                                        onChange={(e) => this.SetValue(e)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={4} md={3}>
                                    <CustomInput
                                        //success={this.state.firstNameState == "success"}
                                        //error={this.state.firstNameState == "error"}
                                        //error={this.state.firstNameState}
                                        labelText="Type"
                                        name="type"
                                        value={this.state.entities.type}
                                        required={true}
                                        onChange={(e) => this.SetValue(e)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={4} md={3}>
                                    <Dropdown
                                        //required={true}
                                        labelText="Parent"
                                        lstObject={this.state.relation}
                                        value={this.state.entities.relationship}
                                        name='relationship'
                                        onChange={(e) => this.SetValue(e)}
                                        formControlProps={{ fullWidth: true }} />
                                </GridItem>
                                <GridItem xs={12} sm={4} md={3}>
                                    <Dropdown
                                        //required={true}
                                        labelText="Parent"
                                        lstObject={this.state.entitylist}
                                        value={this.state.entityparent}
                                        name='entityparent'
                                        onChange={(e) => this.SetValue(e)}
                                        formControlProps={{ fullWidth: true }} />
                                </GridItem>
                            </GridContainer>
                            <GridContainer justify="center">
                                <GridItem>
                                    <Button color="primary" round onClick={() => this.handleAttributes()}> Attribute Details </Button>

                                </GridItem>
                            </GridContainer>

                        </CardBody>
                    </Card>
                    {this.state.showAttributes ?
                        <Card>
                            <CardBody>
                                <GridContainer>
                                    <GridItem xs={12} sm={4} md={3}>
                                        <CustomInput
                                            //success={this.state.firstNameState == "success"}
                                            //error={this.state.firstNameState == "error"}
                                            //error={this.state.firstNameState}
                                            labelText="Field Name"
                                            name="labelText"
                                            value={this.state.entityAttributes.labelText}
                                            required={true}
                                            onChange={(e) => this.handlechange(e)}
                                            formControlProps={{ fullWidth: true }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} md={3}>
                                        <Dropdown
                                            required={true}
                                            labelText="Field Type"
                                            lstObject={this.state.componenttype}
                                            value={this.state.entityAttributes.fieldType}
                                            name="fieldType"
                                            onChange={(e) => this.handleComponentType(e)}
                                            formControlProps={{ fullWidth: true }} />
                                    </GridItem>
                                    {/* <GridItem xs={12} sm={4} md={3}>
                                    <CustomInput
                                        //success={this.state.firstNameState == "success"}
                                        //error={this.state.firstNameState == "error"}
                                        //error={this.state.firstNameState}
                                        labelText="Entity Level"
                                        name="entityLevel"
                                        value={this.state.entities.entityLevel}
                                        required={true}
                                        onChange={(e) => this.handlechange(e)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                </GridItem>
                                   <GridItem xs={12} sm={4} md={3}>
                                    <CustomInput
                                        //success={this.state.firstNameState == "success"}
                                        //error={this.state.firstNameState == "error"}
                                        //error={this.state.firstNameState}
                                        placeholder="eg. Product or User"
                                        labelText="Type"
                                        name="type"
                                        value={this.state.entities.type}
                                        required={true}
                                        onChange={(e) => this.handlechange(e)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                </GridItem>*/}
                                    {this.state.radio ?
                                        <GridItem xs={12} sm={4} md={3}>
                                            <CustomInput
                                                //success={this.state.firstNameState == "success"}
                                                //error={this.state.firstNameState == "error"}
                                                //error={this.state.firstNameState}
                                                //placeholder="eg. Product or User"
                                                labelText="Radio Value"
                                                name="value"
                                                value={this.state.entityAttributes.value}
                                                required={true}
                                                onChange={(e) => this.handlechange(e)}
                                                formControlProps={{ fullWidth: true }}
                                            />
                                        </GridItem>
                                        : null}
                                    <GridItem xs={12} sm={4} md={3}>
                                        <Dropdown
                                            required={true}
                                            labelText="Is Mandatory field"
                                            lstObject={this.state.booleanvalues}
                                            value={this.state.entityAttributes.required}
                                            name="required"
                                            onChange={(e) => this.handlechange(e)}
                                            formControlProps={{ fullWidth: true }} />
                                    </GridItem>
                                    {this.state.mdropdown ?
                                        <GridItem xs={12} sm={4} md={3}>
                                            <CustomInput
                                                //success={this.state.firstNameState == "success"}
                                                //error={this.state.firstNameState == "error"}
                                                //error={this.state.firstNameState}
                                                labelText="Filter Name"
                                                name="filterName"
                                                value={this.state.entityAttributes.filterName}
                                                required={true}
                                                onChange={(e) => this.handlechange(e)}
                                                formControlProps={{ fullWidth: true }}
                                            />
                                        </GridItem>
                                        : null}
                                    {(this.state.dropdown || this.state.mdropdown) ?
                                        <GridItem xs={12} sm={4} md={3}>
                                            <CustomInput
                                                //error={this.state.firstNameState}
                                                labelText="List object for Dropdown"
                                                name="listObject"
                                                value={this.state.entityAttributes.listObject}
                                                required={true}
                                                onChange={(e) => this.handlechange(e)}
                                                formControlProps={{ fullWidth: true }}
                                            />
                                        </GridItem>
                                        : null}
                                    {(this.state.dropdown || this.state.mdropdown) ?
                                        <GridItem xs={12} sm={4} md={3}>
                                            <CustomInput
                                                //error={this.state.firstNameState}
                                                labelText="Parameters"
                                                name="parameter"
                                                value={this.state.entityAttributes.parameter}
                                                //required={true}
                                                onChange={(e) => this.handlechange(e)}
                                                formControlProps={{ fullWidth: true }} />
                                        </GridItem>
                                        : null}
                                    {this.state.date ?
                                        <GridItem xs={12} sm={4} md={3}>
                                            <Dropdown
                                                required={true}
                                                labelText="Future date"
                                                lstObject={this.state.booleanvalues}
                                                value={this.state.entityAttributes.futureDate}
                                                name="futureDate"
                                                onChange={(e) => this.handlechange(e)}
                                                formControlProps={{ fullWidth: true }} />
                                        </GridItem>
                                        : null}
                                    <GridContainer justify="center">
                                        <GridItem xs={12} sm={4} md={3}>
                                            <Button color="primary" round onClick={() => this.handleAdd()}>Add</Button>
                                        </GridItem>
                                    </GridContainer>

                                </GridContainer>
                            </CardBody>
                        </Card>
                        : null}
                    <GridContainer >
                        {this.state.showtable ?
                            <GridItem lg={12}>
                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                    <ReactTable
                                        //title={"Users"}
                                        data={this.state.tabledata}
                                        filterable
                                        columns={[
                                            {
                                                Header: "Field Name",
                                                accessor: "labelText",
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                headerClassName: 'react-table-center',
                                                minWidth: 70,
                                                resizable: false,
                                            },
                                            {
                                                Header: "Field Type",
                                                accessor: "fieldType",
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                headerClassName: 'react-table-center',
                                                minWidth: 100,
                                                resizable: false,
                                            },
                                            {
                                                Header: "Variable",
                                                accessor: "name",
                                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                headerClassName: 'react-table-center',
                                                minWidth: 70,
                                                resizable: false,
                                            },
                                            //{
                                            //    Header: "Is Mandatory Field?",
                                            //    accessor: "required",
                                            //    setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                            //    headerClassName: 'react-table-center',
                                            //    minWidth: 70,
                                            //    resizable: false,
                                            //},
                                        ]}
                                        pageSize={([this.state.tabledata.length + 1] < 5) ? [this.state.tabledata.length + 1] : 5}
                                        defaultPageSize={5}
                                        showPaginationTop={false}
                                        showPaginationBottom={([this.state.tabledata.length + 1] <= 5) ? false : true}
                                        className="-striped -highlight"
                                    />
                                </Animated>
                            </GridItem>
                            : null}
                    </GridContainer>
                    {this.state.showtable ?
                        <GridContainer justify="center">
                            <GridItem>
                                <Button color="primary" round onClick={() => this.handleSubmit()}>Save Entity</Button>
                            </GridItem>
                        </GridContainer>
                        : null}
                </GridItem>
            </GridContainer>
        );
    }
}
export default withStyles(style)(DynamicEntity);