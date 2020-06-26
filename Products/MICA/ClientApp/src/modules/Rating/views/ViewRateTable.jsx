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
import money from "assets/img/money.png";
import Icon from "@material-ui/core/Icon";
import ReactTable from 'components/MuiTable/MuiTable.jsx';
import data_Not_found from "assets/img/data-not-found-new.png";
import TableContentLoader from "components/Loaders/TableContentLoader.jsx";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import PageContentLoader from "components/Loaders/PageContentLoader.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";

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

class ViewRateTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                RateName:"",
                
            },
            RateList: [],
            displayData: [],
            resultDetails:[],
            //Loader
            loader: true,
            pageloader: false,
            nodata: false,
            isButtonVisibility: false,
            searchTableSec: false,
        };

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
                    this.setState({ RateList: data });
                    console.log(this.state.RateList, 'RateList');
                });
    }

    onFormSubmit = () => {
        debugger;
        fetch(`${RateConfig.rateConfigUrl}/api/RatingConfig/GetRateRulesGrid?RuleId=` + this.state.fields.RateName, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(response => response.json())
            .then(data => {
                console.log(data.ltObj, data, 'DATA');
                this.setState({ displayData: data.ltObj });
                if (this.state.displayData != null) {
                    if (this.state.displayData.length > 0) {
                        this.setState({ searchTableSec: false, loader: false });
                        this.tabledata(data.ltObj);
                    } else {
                        setTimeout(
                            function () {
                                this.setState({ loader: true, searchTableSec: false, nodata: true });
                            }.bind(this), 2000
                        );
                    }
                }
                else {
                    swal({
                        text: "Please Select Other RateName ,Rates are Without Parameters",
                        icon: "success"
                    });
                }
                console.log("Search calculation display data:", data);

            });

    }
    tabledata = (data) => {
        debugger;
        console.log(this.state.displayData, 'Data');
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

onInputChange = (evt) => {
    const fields = this.state.fields;
    fields[evt.target.name] = evt.target.value;
    this.setState({ fields });
};


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
                                <small> View RateTable </small>
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
                                            Rate Name
                          </InputLabel>
                                        <Select
                                            value={this.state.fields.RateName}
                                            onChange={this.onInputChange}
                                            MenuProps={{
                                                className: classes.selectMenu
                                            }}
                                            classes={{
                                                select: classes.select
                                            }}
                                            inputProps={{
                                                name: "RateName",
                                                id: "simple-select"
                                            }}
                                        >
                                            {
                                                this.state.RateList.map(item =>
                                                    <MenuItem
                                                        value={item.ratingId}
                                                        classes={{
                                                            root: classes.selectMenuItem,
                                                            selected: classes.selectMenuItemSelected
                                                        }}
                                                    >
                                                        {item.rateName}
                                                    </MenuItem>
                                                )
                                            }
                                        </Select>
                                    </FormControl>
                                </GridItem>
                            </GridContainer>
                            <GridContainer lg={12} justify="center">
                                <GridItem xs={5} sm={3} md={3} lg={1}>
                                    <Button onClick={() => this.onFormSubmit()}
                                        color="info"
                                        round
                                    >
                                        SUBMIT
                </Button>
                                </GridItem>
                            </GridContainer>

                        </CardBody>
                    </Card>

                    
                </GridItem>
            </GridContainer>
            {this.state.loader ?
                <GridContainer xl={12}>
                    {this.state.searchTableSec ?

                        < GridItem lg={12}>
                            <ReactTable
                                title={<h5><TranslationContainer translationKey={"Rate Table"} /></h5>}
                                resultDetails
                                data={this.state.displayData}
                                filterable
                                columns={this.state.resultDetails}
                                defaultPageSize={4}
                                pageSize={([this.state.displayData.length + 1] < 4) ? [this.state.displayData.length + 1] : 4}
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

export default connect(null, null)(withStyles(extendedFormsStyle)(ViewRateTable));