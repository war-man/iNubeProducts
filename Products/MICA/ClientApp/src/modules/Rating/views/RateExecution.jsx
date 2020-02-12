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



class RateExecution extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            fields: {
                RateName: "",
            },
            RulesList: [],
            RulesConditions: {
                parameterList: []
            },
            flagButton: false,
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
                this.setState({ RulesList: data });
                console.log(this.state.RulesList, 'CheckData');
            });

    }
    onInputParamChange = (evt) => {
        //console.log('Event', evt);
        let fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
    };
    //Condition State
    //handleState = event => {
    //    debugger
    //    fetch(`${RateConfig.rateConfigUrl}/api/RatingConfig/GetRulesCondition`, {
    //        method: 'GET',
    //        headers: {
    //            'Accept': 'application/json',
    //            'Content-Type': 'application/json',
    //            'Authorization': 'Bearer ' + localStorage.getItem('userToken')
    //        },
    //    })
    //        .then(response => response.json())
    //        .then(data => {
    //            this.setState({ RulesConditions: data });
    //            console.log("Rule Rules Data");
    //            console.log(this.state.RulesConditions);
    //            this.setState({ RulesConditions: this.state.RulesConditions.filter(item => item.ratingRuleId == event.target.value) });
    //            var checkParam = JSON.stringify(this.state.RulesConditions);
    //            console.log('Check' + checkParam);
    //            // For State Change
    //            const fields = this.state.fields;
    //            fields[event.target.name] = event.target.value;
    //            this.setState({ fields });
    //            this.setState({ [event.target.name]: event.target.value });
    //        });
    //    this.setState({ flagButton: true });

    //    console.log(event.target.value);
    //}
    handleState = event => {
        debugger
        fetch(`${RateConfig.rateConfigUrl}/api/RatingConfig/GetHandleExecEvents?EventId=` + event.target.value, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ RulesConditions: data });
                console.log("Rule Rules Data");
                console.log(this.state.RulesConditions);
                // For State Change
                const fields = this.state.fields;
                fields[event.target.name] = event.target.value;
                this.setState({ fields });
                this.setState({ [event.target.name]: event.target.value });
            });
        this.setState({ flagButton: true });

        console.log(event.target.value);
    }

    onFormSubmit = (evt) => {
        var rst;
        debugger;
        fetch(`${RateConfig.rateConfigUrl}/api/RatingConfig/CheckRuleSets/CheckRuleSets/` + this.state.fields.RateName, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.fields)
        }).then(response => response.json())
            .then(data => {
                if (data.responseMessage != null) {
                    swal({
                        text: "Rate:" + data.responseMessage,
                        icon: "success"
                    });
                    this.reset();
                }
                else {
                    swal({
                        text: "Conditions are wrong",
                        icon: "error"
                    });
                }
                this.setState({ result: data });
                console.log(this.state.result, 'Results');
            });

    }
    reset = () => {
        //Setting States After Saving
        let ratingDto = this.state.fields;
        ratingDto['RateName'] = "";
        this.setState({ ratingDto });
        this.setState({ flagButton: false });
        //let status = this.state;
        //this.setState({ status });
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
                                    <small> Rate Execution </small>
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
                                                onChange={this.handleState}
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
                                                    this.state.RulesList.map(item =>
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

                            </CardBody>
                        </Card>

                        {this.state.flagButton &&

                            <GridContainer>

                                <GridItem xs={12} sm={12} md={12}>
                                    <Card>
                                        <CardBody>

                                            <GridContainer>
                                                {this.state.RulesConditions.parameterList.map((item, index) =>
                                                    <GridItem xs={12} sm={12} md={3} key={index}>
                                                        <CustomInput labelText={item}
                                                            // value={item.paramName}
                                                            name={item}
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
                    </GridItem>
                </GridContainer>
            </div >
        );
    }
}

export default connect(null, null)(withStyles(extendedFormsStyle)(RateExecution));





