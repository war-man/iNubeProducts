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

class DispatcherExecution extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                    eventobject: {
                        eventid: "1",
                        objectid: "2",
                                    },
                    TxnObject: { }
            },
            DispatcherTaskLt: [],
            DispatcherTask: "",
            inputFlag: false,
            InputObject: "",
            outputFlag: false,
            OutputObject:""



            
        };

    }
    componentDidMount() {
        fetch(`${DispatcherConfig.dispactherConfigUrl}/api/Dispatcher/GetDispatcherTask`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ DispatcherTaskLt: data });
                console.log(this.state.DispatcherTaskLt, 'CheckData');
            });
    }

    onInputChange = (evt) => {
        let fd = this.state;
        fd[evt.target.name] = evt.target.value;
        this.setState({ fd });
        if (evt.target.name == "DispatcherTask") {
            this.setState({ inputFlag: true });
        }
    };

    


    

    onFormSubmit = (evt) => {
        debugger;
        console.log(this.state.InputObject, 'DBGR')
        let abc = JSON.parse(this.state.InputObject.toString());
        this.state.fields.TxnObject = JSON.parse(this.state.InputObject.toString());
        console.log(this.state.fields.TxnObject, 'FIES');
        if (this.state.DispatcherTask != "" && this.state.InputObject != "") {

            fetch(`${DispatcherConfig.dispactherConfigUrl}/api/Dispatcher/DispatcherEvent?EventType=` + this.state.DispatcherTask, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify(this.state.fields)
            }).then(response => response.json())
                .then(data => {
                    this.reset();
                    console.log(data);
                    this.state.OutputObject = JSON.stringify(data);
                    this.setState({ outputFlag: true });
                    console.log(this.state.OutputObject, 'Check');
                });
        }
        else {
            swal("", "Some fields are missing", "error");
        }
    }

    reset() {
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
                                    <small> Dispatcher Execution</small>
                                </h4>
                            </CardHeader>
                            <CardBody>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <FormControl
                                            fullWidth
                                            className={classes.selectFormControl}
                                        >
                                            <InputLabel
                                                htmlFor="simple-select"
                                                className={classes.selectLabel}
                                            >
                                                Dispatcher Task
                          </InputLabel>
                                            <Select
                                                value={this.state.DispatcherTask}
                                                onChange={this.onInputChange}
                                                MenuProps={{
                                                    className: classes.selectMenu
                                                }}
                                                classes={{
                                                    select: classes.select
                                                }}
                                                inputProps={{
                                                    name: "DispatcherTask",
                                                    id: "simple-select"
                                                }}
                                            >
                                                {
                                                    this.state.DispatcherTaskLt.map(item =>
                                                        <MenuItem
                                                            value={item.dispatcherTaskName}
                                                            classes={{
                                                                root: classes.selectMenuItem,
                                                                selected: classes.selectMenuItemSelected
                                                            }}
                                                        >
                                                            {item.dispatcherTaskName}
                                                        </MenuItem>
                                                    )
                                                }
                                            </Select>
                                        </FormControl>
                                    </GridItem>
                                    {
                                    //    this.state.inputFlag &&
                                    //<GridItem xs={4} sm={12} md={7}>
                                    //    <CustomInput labelText=""
                                    //        value={this.state.InputObject}
                                    //        multiline={true}
                                    //        name='InputObject'
                                    //        onChange={this.onInputChange}
                                    //        formControlProps={{ fullWidth: true }} />
                                    //</GridItem>
                                    }

                                    {this.state.inputFlag &&
                                        <GridItem xs={4} sm={12} md={7}>
                                            <label><h5><b>Input : </b></h5></label>
                                            <textarea
                                                value={this.state.InputObject}
                                                multiline={true}
                                                name='InputObject'
                                                onChange={this.onInputChange}
                                                formControlProps={{ fullWidth: true }}
                                                rows={4}
                                                cols={90}
                                            />
                                        </GridItem>
                                    }

                                    {
                                        //this.state.outputFlag &&
                                        //<GridItem xs={4} sm={12} md={7}>
                                        //    <CustomInput labelText=""
                                        //        value={this.state.OutputObject}
                                        //        multiline={true}
                                        //        disabled={true}
                                        //        name='OutputObject'
                                        //        onChange={this.onInputChange}
                                        //        formControlProps={{ fullWidth: true }} />
                                        //</GridItem>
                                    }
                                    {this.state.outputFlag &&
                                        <GridItem xs={4} sm={12} md={7}>
                                            <label><h5><b>Output : </b></h5></label>
                                            <textarea
                                                value={this.state.OutputObject}
                                                multiline={true}
                                                disabled={true}
                                                name='OutputObject'
                                                onChange={this.onInputChange}
                                                formControlProps={{ fullWidth: true }}
                                                rows={4}
                                                cols={90}
                                            />
                                        </GridItem>
                                    }


                                </GridContainer>
                            </CardBody>
                        </Card>
                        <GridContainer lg={12} justify="center">
                            <GridItem xs={5} sm={3} md={3} lg={1}>
                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                    <Button style={{ marginTop: "1rem" }} color="info" round onClick={() => this.onFormSubmit()}>
                                        Save
                                    </Button>
                                </Animated>
                            </GridItem>
                        </GridContainer>
                        
                    </GridItem>
                </GridContainer>
            </div >
        );
    }
}

export default connect(null, null)(withStyles(extendedFormsStyle)(DispatcherExecution));





