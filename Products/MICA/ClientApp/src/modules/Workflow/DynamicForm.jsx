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
import DynamicEntity from 'modules/Workflow/DynamicEntity';

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
            type: "",
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
            screendata: [],
            emptyarray: [],
            showtable: false,
            data: [],
            showComponents: false,
        };
    }

    SetValue = (e) => {

        let data = this.state.Dynamicdata;
        let name = e.target.name;
        let value = e.target.value;

        let screendata = this.state.screendata;
        screendata = screendata.filter(e => e.name === name)[0] === undefined
            ? []
            : screendata.filter((e) => e.name === name)[0]
            ;
        screendata.value = value;

        data[name] = value;

        this.setState({ data });
        console.log("selected: ", data);
    }

    onDateChange = (name, event) => {
        var today = event.toDate();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let data = this.state.Dynamicdata;

        data[name] = date;

        let screendata = this.state.screendata;
        screendata = screendata.filter(e => e.name === name)[0] === undefined
            ? []
            : screendata.filter((e) => e.name === name)[0]
            ;
        screendata.value = date;

        this.setState({ data });
        console.log("selected: ", data);
    };

    handleRadioChange = (name, e) => {
        let value = e.target.value;
        this.setState({ radiovalue: e.target.value })
        let data = this.state.Dynamicdata;

        data[name] = value;
        this.setState({ data });
        console.log("selected: ", data);
    }

    SetCheckValue = (name, e) => {
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
                    onChange={(e) => this.SetValue(e)}
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
                    onChange={(e) => this.SetValue(e)}
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
                    onChange={(e) => this.SetValue(e)}
                    formControlProps={{ fullWidth: true }}
                />
            );
        }
        if (prop.componentType == "Dropdown") {
            return (
                <Dropdown
                    required={prop.required}
                    labelText={prop.labelText}
                    lstObject={this.state.dropdown}
                    value={prop.value}
                    name={prop.name}
                    onChange={(e) => this.SetValue(e)}
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
                    lstObject={this.state.empty}
                    required={prop.required}
                    filterName={prop.filterName}
                    onChange={(e) => this.SetValue(e)}
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
                    onChange={(e) => this.onDateChange(prop.name, e)}
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
                            onChange={(e) => this.handleRadioChange(prop.name, e)}
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
                    onChange={(e) => this.SetCheckValue(prop.name, e)}
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            );
        }
        if (prop.componentType == "Button") {
            return (
                <Button color='primary' round onClick={this.handlesubmit} >{prop.labelText}</Button>
            )
        }
    }

    handleProductType = (e) => {
        this.state.screendata = [];
        this.state.showComponents = false;
        this.setState({ [e.target.name]: e.target.value });


        fetch(`${productConfig.productConfigUrl}/api/Product/SearchEntitiesByType?type=` + e.target.value + ``,
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
                this.setState({ screendata: data });
                console.log("dataCheck: ", data);
                if (data.length == 0) {
                    this.setState({ showComponents: true });
                }
            });

        //fetch(`${productConfig.productConfigUrl}/api/Product/GetDynamicProduct?type=` + e.target.value + ``,
        //    {
        //        method: 'Get',
        //        //body: JSON.stringify(this.state.searchOrg),
        //        headers: {
        //            'Accept': 'application/json',
        //            'Content-Type': 'application/json',
        //            'Authorization': 'Bearer ' + localStorage.getItem('userToken')
        //        },
        //    }
        //).then(response => response.json())
        //    .then(data => {
        //        this.setState({ screendata: data });
        //        console.log("dataCheck: ", data);
        //    });
    }

    handlesubmit = () => {
        console.log("selected: ", this.state.Dynamicdata)
        if (this.state.Dynamicdata != {}) {
            this.state.emptyarray.push(this.state.Dynamicdata);
            this.tabledata();
        }

        //Object.assign(this.state.Dynamicdata, {});
        this.state.Dynamicdata = {};
        for (let i = 0; i < this.state.screendata.length; i++) {
            let screendata = this.state.screendata;
            if (screendata[i].componentType != "Radio") {
                screendata[i].value = "";
            }
            this.setState({ radiovalue: "" });
        }
        console.log("Select ", this.state.Dynamicdata);
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

    componentDidMount() {
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

    render() {
        const { classes } = this.props;
        return (
            <div>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={12}>
                        <DynamicEntity />

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
                                            labelText="Select Product Type"
                                            lstObject={this.state.ProductType}
                                            value={this.state.type}
                                            name='type'
                                            onChange={(e) => this.handleProductType(e)}
                                            formControlProps={{ fullWidth: true }} />
                                    </GridItem>
                                </GridContainer>
                            </CardBody>
                        </Card>
                        {(this.state.screendata.length > 0) ?
                            <Card>
                                <CardHeader color="rose" icon>
                                    <CardIcon color="rose">
                                        { /*  <FilterNone /> */}

                                        <Icon><img id="icon" src={role} /></Icon>

                                    </CardIcon>
                                    <h4>
                                        <small>{/*<TranslationContainer translationKey="SearchOrganization" />*/}{this.state.type} </small>
                                    </h4>
                                </CardHeader>
                                <CardBody>
                                    <GridContainer>
                                        {
                                            this.state.screendata.map(item => {
                                                if (item.componentType != "Button") {
                                                    return (
                                                        <GridItem xs={12} sm={4} md={3}>
                                                            {this.handleRenderScreen(item)}
                                                        </GridItem>
                                                    );
                                                }
                                                else {
                                                    return (
                                                        <GridContainer justify="center">
                                                            {this.handleRenderScreen(item)}
                                                        </GridContainer>
                                                    );
                                                }
                                            })
                                        }
                                    </GridContainer>
                                </CardBody>
                            </Card>
                            : null}
                        {this.state.showComponents ?
                            <Card>
                                <CardHeader color="rose" icon>
                                    <CardIcon color="rose">
                                        { /*  <FilterNone /> */}

                                        <Icon><img id="icon" src={role} /></Icon>

                                    </CardIcon>
                                    <h4>
                                        <small>{/*<TranslationContainer translationKey="SearchOrganization" />*/}{this.state.type} </small>
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