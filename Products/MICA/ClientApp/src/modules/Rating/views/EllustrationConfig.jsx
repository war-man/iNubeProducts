import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import Radio from "@material-ui/core/Radio";
// @material-ui/core components
// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";
// @material-ui/icons
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import Tooltip from '@material-ui/core/Tooltip';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import ruleconfig from 'modules/RuleEngine/RuleConfig.js';
//import config from '../../../../config.js';
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import $ from 'jquery';
import Modal from '@material-ui/core/Modal';
//import { alert } from "../../../Login/_reducers/alert.reducer";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RateConfig from "modules/Rating/RateConfig.js";
import { Animated } from "react-animated-css";
import swal from 'sweetalert';
import ReactTable from 'components/MuiTable/MuiTable.jsx';
import Dropdown from "components/Dropdown/Dropdown.jsx";
import { IconButton } from "@material-ui/core";
import AddIcon from '@material-ui/icons/AddCircleOutline';
import Reset from '@material-ui/icons/Autorenew';
import Chip from '@material-ui/core/Chip';
import role from "assets/img/users.png";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";

function date() {

    var today = new Date();
    var date;
    var hrs = today.getHours();
    hrs = hrs < 10 ? '0' + hrs : hrs;
    var min = today.getMinutes();
    min = min < 10 ? '0' + min : min;
    var sec = today.getSeconds();
    sec = sec < 10 ? '0' + sec : sec;

    return date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + 'T' + hrs + ':' + min + ':' + sec;

}
const useStyles = withStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));

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

class EllustrationConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            fields: {
                EllustrationConfigName: "",
                EllustrationConfigDDID: "",
                multipleSelect: [],
                EllustrationConfigParam: "",
                Ellustration: [],
                From: "",
                To: "",
                OutputParameter: "",
                MappingOutputParameter: "",
                OutputParametMapEllustration:"",

            },
            OutputList: [],
            sendingPrArray: [],
            mappingSendingArray: [],
            OutputEllustrationArray:[],
            multiselectEllustrationArray:[],
            EllParameterArray: [],
            multiselectArray:[],
            RateRules:[],
            flag : false,
            rateflag : false,
            ellustrationFlag: false,
            displayModalFlag: false,
            parameterCard: false,
            flagButon: false,
            open: false,
            typeList: [{ "mID": 1, "mValue": "Rate", "mType": "RateConfig" },
                { "mID": 2, "mValue": "Parameter", "mType": "RateConfig" },
                { "mID": 3, "mValue": "Ellustration", "mType": "RateConfig" }],
            ellustrationList: [{ "mID": 1, "mValue": "CalYear", "mType": "RateConfig" },
                { "mID": 2, "mValue": "NULL", "mType": "RateConfig" }],
            ellustrationOutputList: [{ "mID": 1, "mValue": "Year", "mType": "CalYear" },
                { "mID": 2, "mValue": "Principle", "mType": "CalYear" },
            { "mID": 3, "mValue": "RateInterest", "mType": "CalYear" },
            { "mID": 4, "mValue": "EMI", "mType": "CalYear" },
            { "mID": 4, "mValue": "Balance", "mType": "CalYear" }],
        };

    }
    
    onInputChange = (evt) => {
        let fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    onInputParamChange = (evt) => {
        console.log('Event', evt);
        const fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        console.log("fields", fields);
        this.setState({ fields });
        if (evt.target.value == 1) {
            this.state.flag = false;
            this.state.rateflag = true;
            this.state.ellustrationFlag = false;
        }
        else if (evt.target.value == 2) {
            this.state.flag = true;
            this.state.rateflag = false;
            this.state.ellustrationFlag = false;
        }
        else {
            this.state.flag = false;
            this.state.rateflag = false;
            this.state.ellustrationFlag = true;
        }
    }

    //Onchange Event for Grid Input
    setOutputChange = ( event, index) => {
        event.preventDefault();
        let name = event.target.name;
        let value = event.target.value;
        this.state.OutputList[index][event.target.name] = event.target.value;
        console.log(this.state.OutputList,'Output')
        this.DataGrid();    
    }

    //Addition of Parameters
    //addCalConfigParam
    addEllustrationConfigParam() {
        if (this.state.fields.EllustrationConfigName != "") {
            var isActive = 1;
            this.setState({ displayCalculationParameterGrid: true });
            this.setState({ flagButon: true });
            let pEllParameterArray = this.state.EllParameterArray;
            this.setState({ EllParameterArray: pEllParameterArray });
            let Type = "Param";
            pEllParameterArray.push({
                'ellustrationConfigParamName': this.state.fields.EllustrationConfigParam,
                'createdDate': date(),
                'isActive': isActive,
                'type': Type
            });
            ////Pusing in Output
            let pOutputParameterArray = this.state.OutputList;
            this.setState({ OutputList: pOutputParameterArray });
            pOutputParameterArray.push({
                'ellustrationConfigParamName': this.state.fields.EllustrationConfigParam,
                'outputParam':""
            });
            // State Set After Selecting
            this.setState({ EllustrationConfigParam: '' });
            this.state.fields.EllustrationConfigParam = "";
            console.log(this.state.EllParameterArray, 'EllParamArray');
            this.setState({ parameterCard: true });
            this.setState({ flagButon: true });
            this.DataGrid();    
            
        }
        else {
            swal("", "Some fields are missing", "error");
            this.setState({ errormessage: true });
        }
    }

    DataGrid =()=> {
        if (this.state.EllParameterArray.length > 0) {
            this.setState({
                newParamData: this.state.EllParameterArray.map((prop, key) => {

                    return {
                        EllConfigParam: prop.ellustrationConfigParamName,
                        OutputParameter: <CustomInput id="padding-input" value={this.state.OutputList[key].OutputParameter} name="OutputParameter" onChange={(e) => this.setOutputChange(e, key)} disabled={true} formControlProps={{ fullWidth: true }} />
                    };
                })
            });
        }
    }
    //Addition of Rates
    addRates() {
        var mlt_select = this.state.fields.multipleSelect.toString();
        var multiselect_array = mlt_select.split(",");
        let pMultiselectArray = this.state.multiselectArray;
        this.setState({ multiselectArray: pMultiselectArray });
        for (var i = 0; i < multiselect_array.length; i++) {
            pMultiselectArray.push({ rateName: multiselect_array[i] });
        }
        this.setState({ parameterCard: true });
        this.setState({ flagButon: true });
        //swal({
        //    text: "Rates Added Successfully",
        //    icon: "success"
        //});
        console.log(this.state.multiselectArray, 'MultiSelect');
    }

    onOutputEllustration(outputParameter) {
        this.setState({ displayModalFlag: true, open: true });
        this.state.fields.OutputParametMapEllustration = outputParameter;
        document.getElementById("disp");
    }
    //Mapping of Parameter To be Done 
    onMapParameter() {
        debugger
        console.log(this.state.fields.OutputParametMapEllustration, this.state.fields.MappingOutputParameter, 'OutputEllustrationParamete and InputParameter');
        //Mapping to be Done for Particular Input Parameter 
        //var index = "";
        //for(var i=0 ; i<this.state.ellustrationOutputList.length;i++)
        //{
        //    if (this.state.ellustrationOutputList[i].mValue == this.state.fields.OutputParametMapEllustration) {
        //        index = i;
        //    }
        //}
        //var index = this.state.ellustrationOutputList.findIndex(s => s.mValue == this.state.fields.OutputParametMapEllustration);
        
        var index = this.state.EllParameterArray.findIndex(s => s.ellustrationConfigParamName == this.state.fields.MappingOutputParameter);
        this.state.OutputList[index]["OutputParameter"] = this.state.fields.OutputParametMapEllustration;
        this.setState({});
        this.DataGrid();  
        console.log(this.state.OutputList[index][this.state.fields.OutputParameter], 'OutputWindow')
        swal({
            text: "Successfully Mapped",
            icon: "success"
        });
        this.handleClose();
    }
    addEllustration() {
        var mlt_select = this.state.fields.Ellustration.toString();
        var multiselect_array = mlt_select.split(",");
        let pMultiselectArray = this.state.multiselectEllustrationArray;
        this.setState({ multiselectEllustrationArray: pMultiselectArray });
        for (var i = 0; i < multiselect_array.length; i++) {
            pMultiselectArray.push({ ellustrationName: multiselect_array[i] });
        }
        //Filteration and Check for Output Parameter Available for Ellustration
        let pOutputEllParamArray = this.state.OutputEllustrationArray;
        this.setState({ OutputEllustrationArray: pOutputEllParamArray });
        for (var i = 0; i < this.state.multiselectEllustrationArray.length; i++) {
            for (var j = 0; j < this.state.ellustrationOutputList.length; j++) {
                if (this.state.multiselectEllustrationArray[i].ellustrationName == this.state.ellustrationOutputList[j].mType) {
                    pOutputEllParamArray.push({ outputParameter: this.state.ellustrationOutputList[j].mValue });
                }
            }
        }
        console.log(this.state.OutputEllustrationArray, 'Output_Ellustration_Array');
        this.setState({ parameterCard: true });
        this.setState({ flagButon: true });
        //swal({
        //    text: "Rates Added Successfully",
        //    icon: "success"
        //});
        console.log(this.state.multiselectArray, 'MultiSelect');
    }

    componentDidMount() {
        fetch(`${RateConfig.rateConfigUrl}/api/RatingConfig/GetRules`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ RateRules: data });
                console.log(data);
            });
    }

    //Form Submit
    onFormSubmit = (evt) => {
        let isActive = 1;
        let psendingArray = this.state.sendingPrArray;
        this.setState({ sendingPrArray: psendingArray });
        if (this.state.EllParameterArray.length != 0 && this.state.OutputEllustrationArray.length != 0 && this.state.multiselectEllustrationArray.length != 0 && this.state.fields.From != "" &&  this.state.fields.To != "") {
            //Addition of EllustrationParam into sendingArray 
            for (var i = 0; i < this.state.EllParameterArray.length; i++) {
                psendingArray.push({
                    'illustrationConfigParamName': this.state.EllParameterArray[i].ellustrationConfigParamName,
                    'type': this.state.EllParameterArray[i].type,
                    'createdDate': date(),
                    'isActive': isActive
                });
            }
            //Addition of Rates into sendingArray 
            if (this.state.multiselectArray.length != 0) {
                for (var i = 0; i < this.state.multiselectArray.length; i++) {
                    psendingArray.push({
                        'illustrationConfigParamName': this.state.multiselectArray[i].rateName,
                        'type': 'Rate',
                        'createdDate': date(),
                        'isActive': isActive
                    });
                }
            }
            //Addition of Illustration of OutputParameter into sendingArray 
            for (var i = 0; i < this.state.OutputEllustrationArray.length; i++) {
                psendingArray.push({
                    'illustrationConfigParamName': this.state.OutputEllustrationArray[i].outputParameter,
                    'type': 'OutputParam',
                    'createdDate': date(),
                    'isActive': isActive
                });
            }
            //Addition of Illustration (calYear) into sendingArray
            for (var i = 0; i < this.state.multiselectEllustrationArray.length; i++) {
                psendingArray.push({
                    'illustrationConfigParamName': this.state.multiselectEllustrationArray[i].ellustrationName,
                    'type': 'Illustration',
                    'createdDate': date(),
                    'isActive': isActive
                });
            }
            console.log(this.state.sendingPrArray, 'SendingArray');
            console.log(this.state.newParamData, 'ABC');
            //Addition of Mapping of Input and Output Parameter into the Sending Array  for Mapping 
            let pmappingSendingArray = this.state.mappingSendingArray;
            this.setState({ mappingSendingArray: pmappingSendingArray });
            for (var i = 0; i < this.state.newParamData.length; i++) {
                pmappingSendingArray.push({
                    'illustrationInputParam': this.state.newParamData[i].EllConfigParam,
                    'illustrationOutputParam': this.state.newParamData[i].OutputParameter.props.value,
                    'createdDate': date(),
                    'isActive': isActive
                })
            }
            debugger
            console.log(this.state.mappingSendingArray, 'MappingArray');


            var data = {
                'illustrationConfigName': this.state.fields.EllustrationConfigName, 'from': this.state.fields.From, 'to': this.state.fields.To, 'createdDate': date(), 'isActive': isActive, 'illustrationConfigParam': this.state.sendingPrArray, 'illustrationMapping': this.state.mappingSendingArray
            };
            fetch(`${RateConfig.rateConfigUrl}/api/RatingConfig/CreateIllustrationRules`, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify(data)
            }).then(response => response.json())
                .then(data => {
                    if (data.status == 2) {
                        swal({
                            //   title: "Perfect",
                            text: data.responseMessage,
                            //  text: "Account Successfully Created",
                            icon: "success"
                        });
                        this.reset();
                    } else if (data.status == 8) {
                        swal({
                            text: data.errors[0].errorMessage,
                            icon: "error"
                        });
                    } else if (data.status == 4) {
                        swal({
                            text: data.errors[0].errorMessage,
                            icon: "error"
                        });
                    }
                });
        }
        else {
            swal({
                text: "Some Fields are missing",
                icon: "error"
            });
        }
    }
    //reseting ALl Fields
    reset() {
        debugger
        this.setState({ RateRules: [], OutputList: [], sendingPrArray: [], EllParameterArray: [], newParamData: [], mappingSendingArray: [], multiselectArray: [], multiselectEllustrationArray: [], OutputEllustrationArray: [], displayCalculationParameterGrid: false, parameterCard: false, flag: false, rateFlag: false, ellustrationFlag: false, flagButon:false,displayModalFlag:false});
        let rate = this.state.fields;
        rate['EllustrationConfigName'] = "";
        rate['EllustrationConfigDDID'] = "";
        rate['EllustrationConfigParam'] = "";
        rate['From'] = "";
        rate['To'] = "";
        rate['OutputParameter'] = "";
        rate['MappingOutputParameter'] = "";
        rate['OutputParametMapEllustration'] = "";
        rate['multipleSelect'] = [];
        rate['Ellustration'] = [];
    }
    

    render() {
        const { classes } = this.props;
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="rose" icon>
                                <CardIcon color="rose">
                                    <PermIdentity />
                                </CardIcon>
                                <h4 className={this.props.cardIconTitle}>
                                    <small> Illustration Config </small>
                                </h4>
                            </CardHeader>
                            <CardBody>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            labelText="Illustration Config Name"
                                            id="EllustrationConfigName"
                                            required={true}
                                            value={this.state.fields.EllustrationConfigName}
                                            name='EllustrationConfigName'
                                            onChange={this.onInputChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>


                                    <GridItem xs={12} sm={12} md={3}>
                                        <Dropdown
                                            labelText="Illustration Config"
                                            id="EllustrationConfigDDID"
                                            value={this.state.fields.EllustrationConfigDDID}
                                            lstObject={this.state.typeList}
                                            name='EllustrationConfigDDID'
                                            onChange={this.onInputParamChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>

                                    {this.state.rateflag ?

                                        <GridItem xs={12} sm={12} md={3}>

                                            <FormControl
                                                fullWidth
                                                className={classes.selectFormControl}
                                            >
                                                <InputLabel
                                                    htmlFor="multiple-select"
                                                    className={classes.selectLabel}
                                                >
                                                    Rate
                          </InputLabel>
                                                <Select
                                                    multiple
                                                    value={this.state.fields.multipleSelect}
                                                    onChange={this.onInputChange}
                                                    MenuProps={{ className: classes.selectMenu }}
                                                    classes={{ select: classes.select }}
                                                    inputProps={{
                                                        name: "multipleSelect",
                                                        id: "multiple-select"
                                                    }}
                                                >
                                                    {
                                                        this.state.RateRules.map(item =>
                                                            <MenuItem
                                                                value={item.rateName}
                                                                classes={{
                                                                    root: classes.selectMenuItem,
                                                                    selected: classes.selectMenuItemSelected
                                                                }}
                                                            > {item.rateName}
                                                            </MenuItem>
                                                        )
                                                    }
                                                </Select>
                                            </FormControl>
                                        </GridItem> : null}
                                    {this.state.ellustrationFlag ?
                                        <GridItem xs={12} sm={12} md={3}>

                                            <FormControl
                                                fullWidth
                                                className={classes.selectFormControl}
                                            >
                                                <InputLabel
                                                    htmlFor="multiple-select"
                                                    className={classes.selectLabel}
                                                >
                                                    Illustration
                          </InputLabel>
                                                <Select
                                                    multiple
                                                    value={this.state.fields.Ellustration}
                                                    onChange={this.onInputChange}
                                                    MenuProps={{ className: classes.selectMenu }}
                                                    classes={{ select: classes.select }}
                                                    inputProps={{
                                                        name: "Ellustration",
                                                        id: "multiple-select"
                                                    }}
                                                >
                                                    {
                                                        this.state.ellustrationList.map(item =>
                                                            <MenuItem
                                                                value={item.mValue}
                                                                classes={{
                                                                    root: classes.selectMenuItem,
                                                                    selected: classes.selectMenuItemSelected
                                                                }}
                                                            > {item.mValue}
                                                            </MenuItem>
                                                        )
                                                    }
                                                </Select>
                                            </FormControl>
                                        </GridItem>

                                        : null}

                                    {this.state.flag ?
                                        <GridItem xs={12} sm={12} md={3}>
                                            <CustomInput
                                                labelText="Illustration Config Param"
                                                id="EllustrationConfigParam"
                                                required={true}
                                                value={this.state.fields.EllustrationConfigParam}
                                                name='EllustrationConfigParam'
                                                onChange={this.onInputChange}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                            />
                                        </GridItem> : null}
                                    {this.state.flag ?
                                        <GridItem xs={12} sm={12} md={3}>
                                            <Tooltip title="Add">
                                                <IconButton id="top-bnt" onClick={() => this.addEllustrationConfigParam()}

                                                    round
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </GridItem> : null}

                                    {this.state.rateflag ?
                                        <GridItem xs={12} sm={12} md={3}>
                                            <Tooltip title="Add">
                                                <IconButton id="top-bnt" onClick={() => this.addRates()}

                                                    round
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </GridItem> : null}
                                    {this.state.ellustrationFlag ?
                                        <GridItem xs={12} sm={12} md={3}>
                                            <Tooltip title="Add">
                                                <IconButton id="top-bnt" onClick={() => this.addEllustration()}

                                                    round
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </GridItem> : null}
                                    
                                </GridContainer>

                               
                            </CardBody>
                        </Card>

                        {this.state.parameterCard &&
                            <Card>
                                <CardBody>
                                    <GridContainer xs={12} sm={12} md={12} xl={12} >
                                        
                                        <GridItem xs={12} sm={4} md={4}>
                                                <h4>
                                                    <small> Parameter </small>
                                                </h4>
                                                <div className="rates-parameter-bg">
                                                    {this.state.EllParameterArray.map((item, i) => (
                                                        <Chip size="small"
                                                            color="info"
                                                        label={item.ellustrationConfigParamName}
                                                        onClick={() => this.onclickParameter(item.ellustrationConfigParamName)} />
                                                    )
                                                    )
                                                    }

                                                </div>
                                    </GridItem>
                                    
                                    <GridContainer id="expression-overflow" xs={12} sm={12} md={8}>
                                        <GridItem xs={12} sm={4} md={6}>
                                                <h4><small>Rates</small></h4>
                                                <div className="rates-rates-bg">
                                                    {this.state.multiselectArray.map((item, i) => (
                                                        <Chip size="small"
                                                            // avatar={<Avatar>M</Avatar>}
                                                            label={item.rateName}
                                                            onClick={() => this.onCLickRates(item.rateName)} />
                                                    ))}
                                                </div>
                                        </GridItem>
                                        <GridItem xs={12} sm={4} md={6}>
                                            <h4><small>Illustration</small></h4>
                                            <div className="rates-rates-bg">
                                                {this.state.multiselectEllustrationArray.map((item, i) => (
                                                    <Chip size="small"
                                                        // avatar={<Avatar>M</Avatar>}
                                                        label={item.ellustrationName}
                                                        onClick={() => this.onCLickEllustration(item.ellustrationName)} />
                                                ))}
                                            </div>
                                        </GridItem>
                                        <GridItem xs={12} sm={4} md={6}>
                                            <h4><small>Output Parameters</small></h4>
                                            <div className="rates-rates-bg">
                                                {this.state.OutputEllustrationArray.map((item, i) => (
                                                    <Chip size="small"
                                                        // avatar={<Avatar>M</Avatar>}
                                                        label={item.outputParameter}
                                                        onClick={() => this.onOutputEllustration(item.outputParameter)} />
                                                ))}
                                            </div>
                                        </GridItem>
                                        </GridContainer>
                                    </GridContainer>
                                </CardBody>
                            </Card>
                        }
                        {this.state.parameterCard &&
                            <GridContainer justify="center" xs={12} className="cal-label">
                                <GridItem xs={4} sm={12} md={4}>

                                    <CustomInput labelText="From"
                                        value={this.state.fields.From}
                                        name='From'
                                        onChange={this.onInputChange}
                                        formControlProps={{ fullWidth: true }} />
                                </GridItem>

                                <GridItem xs={4} sm={12} md={4}>
                                    <CustomInput labelText="To"
                                        value={this.state.fields.To}
                                        name='To'
                                        onChange={this.onInputChange}
                                        formControlProps={{ fullWidth: true }} />
                                </GridItem>
                                <GridItem xs={2} sm={12} md={1}>
                                    <IconButton id="top-bnt" onClick={() => this.executeYearCal()} > <Reset /> </IconButton>
                                </GridItem>
                            </GridContainer>
                        }
                        {this.state.displayCalculationParameterGrid &&

                            <GridContainer>
                            <GridItem xs={4} sm={12} md={12}>
                                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                        <CardBody className="product-search-tab">
                                            <ReactTable
                                                data={this.state.newParamData}
                                                filterable
                                                columns={[
                                                    {
                                                        Header: "Illustration Config Parameter",
                                                        accessor: "EllConfigParam",
                                                        minWidth: 30,
                                                        style: { textAlign: "center" },
                                                        headerClassName: 'react-table-center',
                                                        resizable: false,
                                                    },
                                                    {
                                                        Header: "Output Config Parameter",
                                                        accessor: "OutputParameter",
                                                        minWidth: 30,
                                                        style: { textAlign: "center" },
                                                        headerClassName: 'react-table-center',
                                                        resizable: false,
                                                    }
                                                    
                                                ]}
                                                defaultPageSize={5}
                                                showPaginationTop={false}
                                                pageSize={([this.state.newParamData.length + 1] < 5) ? [this.state.newParamData.length + 1] : 5}
                                                showPaginationBottom
                                                className="-striped -highlight"
                                            />
                                        </CardBody>
                                    </Animated>
                                </GridItem>
                            </GridContainer>
                        }
                        {this.state.flagButon &&
                            <GridContainer lg={12} justify="center">
                                <GridItem xs={5} sm={3} md={3} lg={1}>
                                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                        <Button style={{ marginTop: "1rem" }} color="info" round onClick={() => this.onFormSubmit()}>
                                            Save
                                    </Button>
                                    </Animated>
                                </GridItem>
                            </GridContainer>
                        }

                        {
                            this.state.displayModalFlag &&
                            <Modal
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                open={this.state.open}
                                onClose={this.handleClose}>
                                <div className={classes.paper} id="modal">
                                    <h4><small className="center-text">Illustration Parameter Mapping</small></h4>

                                    <Button color="info"
                                        round
                                        className={classes.marginRight}
                                        style={searchClose}
                                        onClick={this.handleClose}>
                                        &times;
                                    </Button>
                                    <div id="disp" >
                                        <Card>
                                            <CardBody>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={3}>

                                                <FormControl
                                                    fullWidth
                                                    className={classes.selectFormControl}
                                                >
                                                    <InputLabel
                                                        htmlFor="multiple-select"
                                                        className={classes.selectLabel}
                                                    >
                                                        Illustration Input Parameters
                          </InputLabel>
                                                    <Select
                                                        value={this.state.fields.MappingOutputParameter}
                                                        onChange={this.onInputChange}
                                                        MenuProps={{ className: classes.selectMenu }}
                                                        classes={{ select: classes.select }}
                                                        inputProps={{
                                                            name: "MappingOutputParameter",
                                                            id: "simple-select"
                                                        }}
                                                    >
                                                        {
                                                            this.state.EllParameterArray.map(item =>
                                                                <MenuItem
                                                                    value={item.ellustrationConfigParamName}
                                                                    classes={{
                                                                        root: classes.selectMenuItem,
                                                                        selected: classes.selectMenuItemSelected
                                                                    }}
                                                                > {item.ellustrationConfigParamName}
                                                                </MenuItem>
                                                            )
                                                        }
                                                    </Select>
                                                </FormControl>
                                            </GridItem>
                                                </GridContainer>
                                                <GridContainer lg={12} justify="center">
                                                    <GridItem xs={5} sm={3} md={3} lg={1}>
                                                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                            <Button style={{ marginTop: "1rem" }} color="info" round onClick={() => this.onMapParameter()}>
                                                                Map Parameters
                                    </Button>
                                                        </Animated>
                                                    </GridItem>
                                                </GridContainer>
                                                </CardBody>
                                                    </Card>
                                    </div>
                                </div>
                            </Modal>

                        }
                        
                    </GridItem>
                </GridContainer>

            </div >
            

        );
    }
}

export default withStyles(style)(EllustrationConfig);