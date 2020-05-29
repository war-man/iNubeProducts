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

import data_Not_found from "assets/img/data-not-found-new.png";
import TableContentLoader from "components/Loaders/TableContentLoader.jsx";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import PageContentLoader from "components/Loaders/PageContentLoader.jsx";

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

class IllustrationResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rulename: {
                EllConfigName: "",
                From: "",
                To:"",
            },
            fields: {
            },
            IllustrationConfigList: [],
            IllConditionValue: [],
            result: [],
            //Loader
            loader: true,
            pageloader: false,
            nodata: false,
            isButtonVisibility: false,
            searchTableSec: false,
        };
    }

    componentDidMount() {
        fetch(`${RateConfig.rateConfigUrl}/api/RatingConfig/GetIllustrationConfig`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ IllustrationConfigList: data });
                console.log(this.state.IllustrationConfigList, 'CheckData');
            });
    }

    onInputParamChange = (evt) => {
        let fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
    };
    onInputChange = (evt) => {
        let fields = this.state.rulename;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
    };

    handleStateCheck = event => {
        const rulename = this.state.rulename;
        rulename[event.target.name] = event.target.value;
        this.setState({ rulename });
        this.setState({ [event.target.name]: event.target.value });

        this.setState({ flagParam: true });
        fetch(`${RateConfig.rateConfigUrl}/api/RatingConfig/GetHandleEventsIllustration?EventIllustrationId=` + event.target.value, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                //this.state.CheckCondition = data;
                this.setState({ IllConditionValue: data });
                console.log(this.state.IllConditionValue, 'IllValues');
            });
    }

    //Sending Data for Execution
    onFormSubmit = (evt) => {
        if (this.state.rulename.EllConfigName != "" && this.state.rulename.From != "" && this.state.rulename.To != "") {
            var rst;
            debugger;
            console.log(this.state.rulename.EllConfigName);
            this.setState({ searchTableSec: false, loader: false });
            fetch(`${RateConfig.rateConfigUrl}/api/RatingConfig/CheckIllustration/CheckIllustration/` + this.state.rulename.EllConfigName + '?' + 'From=' + this.state.rulename.From + '&To=' + this.state.rulename.To, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify(this.state.fields)
            }).then(response => response.json())
                .then(data => {
                    this.setState({ result: data });
                    console.log(this.state.result, 'Result');
                    if (this.state.result.length > 0) {
                        this.tabledata(data);
                        //this.reset();
                    }
                    else {
                        setTimeout(
                            function () {
                                this.setState({ loader: true, searchTableSec: false, nodata: true });
                            }.bind(this), 2000
                        );
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

    tabledata = (data) => {
        debugger;
        console.log(this.state.result, 'result');
        this.setState({
            resultDetails: Object.keys(data[0]).map((prop, key) => {
                return {
                    Header: prop.charAt(0).toUpperCase() + prop.slice(1),
                    accessor: prop,
                };
              
            })
        });
        console.log("table data", this.state.resultDetails);
        this.setState({ searchTableSec: true, loader: true });
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
                                    <small> Illustration Result </small>
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
                                                Illustration Config Name
                          </InputLabel>
                                            <Select
                                                value={this.state.rulename.EllConfigName}
                                                onChange={this.handleStateCheck}
                                                MenuProps={{
                                                    className: classes.selectMenu
                                                }}
                                                classes={{
                                                    select: classes.select
                                                }}
                                                inputProps={{
                                                    name: "EllConfigName",
                                                    id: "simple-select"
                                                }}
                                            >
                                                {
                                                    this.state.IllustrationConfigList.map(item =>
                                                        <MenuItem
                                                            value={item.illustrationConfigId}
                                                            classes={{
                                                                root: classes.selectMenuItem,
                                                                selected: classes.selectMenuItemSelected
                                                            }}
                                                        >
                                                            {item.illustrationConfigName}
                                                        </MenuItem>
                                                    )
                                                }
                                            </Select>
                                        </FormControl>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>

                                        <CustomInput labelText="From"
                                            value={this.state.rulename.From}
                                            name='From'
                                            onChange={this.onInputChange}
                                            formControlProps={{ fullWidth: true }} />
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput labelText="To"
                                            value={this.state.rulename.To}
                                            name='To'
                                            onChange={this.onInputChange}
                                            formControlProps={{ fullWidth: true }} />
                                    </GridItem>

                                </GridContainer>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
                {this.state.flagParam &&
                    <GridContainer>

                        <GridItem xs={12} sm={12} md={12}>
                            <Card>
                                {/*  <h5><small>Parameters</small></h5> */}
                                <CardHeader color="info" icon >

                                    {
                                        <h3 >
                                            <small>Input Parameters</small>
                                        </h3>
                                    }
                                </CardHeader>
                                <CardBody>

                                    <GridContainer>
                                        {this.state.IllConditionValue.map((item, index) =>
                                            <GridItem xs={12} sm={12} md={3} key={index}>
                                                <CustomInput labelText={item.parameter}
                                                    // value={item.paramName}
                                                    name={item.parameter}
                                                    onChange={this.onInputParamChange}
                                                    inputProps={{
                                                        //type: "number"
                                                    }}
                                                    formControlProps={{ fullWidth: true }} />

                                            </GridItem>


                                        )}
                                    </GridContainer>

                                    <GridContainer lg={12} justify="center">
                                        <GridItem xs={5} sm={3} md={3} lg={1}>
                                            <Button onClick={() => this.onFormSubmit()}
                                                color="info"
                                                round
                                            >
                                                EXECUTE
                </Button>
                                        </GridItem>
                                    </GridContainer>
                                </CardBody>
                            </Card>
                        </GridItem>
                    </GridContainer>
                }
                {this.state.loader ?
                    <GridContainer xl={12}>
                        {this.state.searchTableSec ?

                            < GridItem lg={12}>
                                <ReactTable
                                    title={<h5><TranslationContainer translationKey={"Illustration"} /></h5>}
                                    resultDetails
                                    data={this.state.result}
                                    filterable
                                    columns={this.state.resultDetails}
                                    defaultPageSize={4}
                                    pageSize={([this.state.result.length + 1] < 4) ? [this.state.result.length + 1] : 4}
                                    showPaginationTop={false}
                                    //showPaginationBottom={([this.state.data.length + 1] <= 5) ? false : true}
                                    showPaginationBottom={true}
                                    className="-striped -highlight discription-tab"

                                />
                                </GridItem>
                            : <GridItem lg={12}>{
                                this.state.nodata ?
                                    <Card>
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
                                    : null
                            }
                            </GridItem>
                        }
                    </GridContainer>
                    :
                    <Card style={paddingCard}>
                        <TableContentLoader />
                    </Card>
                }

            </div >
            

        );
    }
}

export default withStyles(style)(IllustrationResult);