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
import ReactTable from "components/MuiTable/MuiTable.jsx";
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
//import { alert } from "../../../Login/_reducers/alert.reducer";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RateConfig from "modules/Rating/RateConfig.js";
import { Animated } from "react-animated-css";
import swal from 'sweetalert';
import data_Not_found from "assets/img/data-not-found-new.png";
import TableContentLoader from "components/Loaders/TableContentLoader.jsx";
import PageContentLoader from "components/Loaders/PageContentLoader.jsx";
import validationPage from "modules/Partners/Organization/views/ValidationPage.jsx";
import { IconButton } from "@material-ui/core";
import AddIcon from '@material-ui/icons/AddCircleOutline';
import Chip from '@material-ui/core/Chip';
import DispatcherConfig from "modules/Dispatcher/DispatcherConfig.js";

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
const paddingCard =
{
    padding: "10px",
}
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

class Dispatcher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                DispatcherTaskName: "",
                InputObject: "",
                OutputObject: "",
                StartDate: "",
                EndDate: "",
                Api: "",
                ResponseMsg: "",
                CInputObject: "",
                COutputObject: "",
                InputTypeObject: "",
                OutputTypeObject:""

            },
            StartDateState: "",
            EndDateState: "",
            displayDispatcherTask: false,
            DispatcherArray: [],
            newDispatcherData:[]
            
        };

    }
    componentDidMount() {
        
    }

    onInputChange = (evt) => {
        let fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
    };

    


    addDispatcherTask() {
        debugger
        if (this.state.fields.Api != "" && this.state.fields.ResponseMsg != "" && this.state.fields.CInputObject != "" && this.state.fields.COutputObject != "" && this.state.fields.InputTypeObject != "" && this.state.fields.OutputTypeObject!="") {
            
            //Showing Grid
            this.setState({ displayDispatcherTask: true });
            var isActive = 1;
            let pDispatcherArray = this.state.DispatcherArray;
            this.setState({ DispatcherArray: pDispatcherArray });

            pDispatcherArray.push({
                'api': this.state.fields.Api,
                'responseMsg': this.state.fields.ResponseMsg,
                'inputObject': this.state.fields.CInputObject,
                'outputObject': this.state.fields.COutputObject,
                'inputTypeObject': this.state.fields.InputTypeObject,
                'outputTypeObject': this.state.fields.OutputTypeObject
            });

            // State Set After Selecting
            let rate = this.state.fields;
            rate['Api'] = "";
            rate['ResponseMsg'] = "";
            rate['CInputObject'] = "";
            rate['COutputObject'] = "";
            rate['InputTypeObject'] = "";
            rate['OutputTypeObject'] = "";
            this.setState({ rate });

            if (this.state.DispatcherArray.length > 0) {
                this.setState({
                    newDispatcherData: this.state.DispatcherArray.map((prop, key) => {

                        return {
                            Url: prop.api,
                            ResponseMsg: prop.responseMsg,
                            CInputObject: prop.inputObject,
                            COutputObject: prop.outputObject,
                            InputTypeObject: prop.inputTypeObject,
                            OutputTypeObject: prop.outputTypeObject,
                        };
                    })
                });
            }
        }
        else {
            swal("", "Some fields are missing", "error");
            this.setState({ errormessage: true });
        }
    }

    onFormSubmit = (evt) => {
        debugger;
        if (this.state.fields.DispatcherTaskName != "" &&  this.state.fields.InputObject != "" && this.state.fields.OutputObject != "" && this.state.DispatcherArray.length > 0) {
            let isActive = 1;
            var data = {
                'dispatcherTaskName': this.state.fields.DispatcherTaskName, 'startDate': this.state.fields.StartDate, 'endDate': this.state.fields.EndDate, 'inputObject': this.state.fields.InputObject, 'outputObject': this.state.fields.OutputObject, 'createdDate': date(), 'isActive': isActive, 'dispatcherTaskDTO': this.state.DispatcherArray
            };
            fetch(`${DispatcherConfig.dispactherConfigUrl}/api/Dispatcher/CreateDispatcherTask`, {
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
                            text: data.responseMessage,
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
            swal("", "Some fields are missing", "error");
        }
    }

    reset() {
        let rate = this.state.fields;
        rate['DispatcherTaskName'] = "";
        rate['InputObject'] = "";
        rate['OutputObject'] = "";
        this.setState({ rate });
        let state = this.state;
        state['displayDispatcherTask'] = false;
        state['DispatcherArray'] = [];
        state['newDispatcherData'] = [];
        this.setState({ state });
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
                                    <small> Dispatcher </small>
                                </h4>
                            </CardHeader>
                            <CardBody>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            labelText="Dispacther Task Name"
                                            id="DispatcherTaskName"
                                            required={true}
                                            value={this.state.fields.DispatcherTaskName}
                                            name='DispatcherTaskName'
                                            onChange={this.onInputChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            labelText="Input Object"
                                            id="InputObject"
                                            required={true}
                                            value={this.state.fields.InputObject}
                                            name='InputObject'
                                            onChange={this.onInputChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            labelText="Output Object"
                                            id="OutputObject"
                                            required={true}
                                            value={this.state.fields.OutputObject}
                                            name='OutputObject'
                                            onChange={this.onInputChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>

                                </GridContainer>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardHeader color="rose" icon>
                                <CardIcon color="rose">
                                    <PermIdentity />
                                </CardIcon>
                                <h4 className={this.props.cardIconTitle}>
                                    <small> Dispatcher Task</small>
                                </h4>
                            </CardHeader>
                            <CardBody>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            labelText="Url"
                                            id="Api"
                                            required={true}
                                            value={this.state.fields.Api}
                                            name='Api'
                                            onChange={this.onInputChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            labelText="Response Message"
                                            id="ResponseMsg"
                                            required={true}
                                            value={this.state.fields.ResponseMsg}
                                            name='ResponseMsg'
                                            onChange={this.onInputChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            labelText="Url Input Object"
                                            id="CInputObject"
                                            required={true}
                                            value={this.state.fields.CInputObject}
                                            name='CInputObject'
                                            onChange={this.onInputChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            labelText="Url Output Object"
                                            id="COutputObject"
                                            required={true}
                                            value={this.state.fields.COutputObject}
                                            name='COutputObject'
                                            onChange={this.onInputChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            labelText="Input Type Object"
                                            id="InputTypeObject"
                                            required={true}
                                            value={this.state.fields.InputTypeObject}
                                            name='InputTypeObject'
                                            onChange={this.onInputChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            labelText="Output Type Object"
                                            id="OutputTypeObject"
                                            required={true}
                                            value={this.state.fields.OutputTypeObject}
                                            name='OutputTypeObject'
                                            onChange={this.onInputChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={2} sm={12} md={1}>
                                        <IconButton id="top-bnt" onClick={() => this.addDispatcherTask()} > <AddIcon /> </IconButton>
                                     </GridItem>
                                </GridContainer>
                            </CardBody>
                        </Card>
                        {this.state.displayDispatcherTask &&
                            <GridContainer xl={12}>
                                <GridItem xs={12}>

                                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                        <ReactTable
                                            data={this.state.newDispatcherData}
                                            filterable
                                            columns={[
                                                {
                                                    Header: "Url",
                                                    accessor: "Url",
                                                    minWidth: 30,
                                                    style: { textAlign: "center" },
                                                    headerClassName: 'react-table-center',
                                                    resizable: false,
                                                },
                                                {
                                                    Header: "Response Message",
                                                    accessor: "ResponseMsg",
                                                    minWidth: 30,
                                                    style: { textAlign: "center" },
                                                    headerClassName: 'react-table-center',
                                                    resizable: false,
                                                },
                                                {
                                                    Header: "Input Object",
                                                    accessor: "CInputObject",
                                                    minWidth: 30,
                                                    style: { textAlign: "center" },
                                                    headerClassName: 'react-table-center',
                                                    resizable: false,
                                                },
                                                {
                                                    Header: "Output Object",
                                                    accessor: "COutputObject",
                                                    minWidth: 30,
                                                    style: { textAlign: "center" },
                                                    headerClassName: 'react-table-center',
                                                    resizable: false,
                                                },
                                                {
                                                    Header: "Input Type Object",
                                                    accessor: "InputTypeObject",
                                                    minWidth: 30,
                                                    style: { textAlign: "center" },
                                                    headerClassName: 'react-table-center',
                                                    resizable: false,
                                                },
                                                {
                                                    Header: "Output Type Object",
                                                    accessor: "OutputTypeObject",
                                                    minWidth: 30,
                                                    style: { textAlign: "center" },
                                                    headerClassName: 'react-table-center',
                                                    resizable: false,
                                                }
                                            ]}
                                            defaultPageSize={5}
                                            showPaginationTop={false}
                                            pageSize={([this.state.newDispatcherData.length + 1] < 5) ? [this.state.newDispatcherData.length + 1] : 5}
                                            showPaginationBottom
                                            className="-striped -highlight"
                                        />
                                    </Animated>
                                </GridItem>
                            </GridContainer>
                        }
                        {this.state.displayDispatcherTask &&
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
                    </GridItem>
                </GridContainer>
            </div >
        );
    }
}

export default connect(null, null)(withStyles(extendedFormsStyle)(Dispatcher));





