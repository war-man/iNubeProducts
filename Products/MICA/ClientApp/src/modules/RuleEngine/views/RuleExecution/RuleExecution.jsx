import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
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
//import config from '../../../../config.js';
import ruleconfig from 'modules/RuleEngine/RuleConfig.js';
import "react-table/react-table.css";
import $ from 'jquery';
//import ReactTable from "react-table";
import ReactTable from 'components/MuiTable/MuiTable.jsx';
import { Animated } from "react-animated-css";
import { Redirect } from 'react-router-dom'
// For RuleMapping   
//import RuleMapping from 'modules/RuleEngine/views/RuleMapping';

import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
//import RuleMapping from "../RuleMapping/RuleMapping";
class RuleExecution extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedA: true,
            checkedB: false,
            RuleId: "",
            formFlag: false,
            // Redirect to the next Page ((Useless))
            //redirectto: '',
            RuleConditionName: [],
            Rules: [],
            Rates:[],
            tblRuleConditionArray: [],
            displayOutputGrid: false,
            newData: [],
            result:[],
            fields: {
                RuleName: ""
            },
            rate: {
            },
            people: [],
        };

        this.handleTags = this.handleTags.bind(this);
        //For REdireect
        //this.handlename = this.handlename.bind(this);
    }
    handleSimple = event => {
        const fields = this.state.fields;
        fields[event.target.name] = event.target.value;
        this.setState({ fields });
        this.setState({ [event.target.name]: event.target.value });
    };

    handleState = event => {
        //fetch(`${ruleconfig.ruleEngineUrl}/RuleEngine/GetAllRulesWithParam`)
        //    .then(response => response.json())
        //    .then(data => {
        //        this.setState({ Rules: data });
        //        console.log("Rule Rules Data");
        //        console.log(this.state.Rules);
        //        this.setState({ Rules: this.state.Rules.filter(item => item.rule_id == event.target.value) });
        //        var checkParam = JSON.stringify(this.state.Rules);
        //        console.log('Check'+checkParam);
        //        // For State Change
        //        const fields = this.state.fields;
        //        fields[event.target.name] = event.target.value;
        //        this.setState({ fields });
        //        this.setState({ [event.target.name]: event.target.value });
        //    });
        // new Method
        fetch(`${ruleconfig.ruleEngineUrl}/RuleConfig/HandleRuleState?RuleId=` + event.target.value)
            .then(response => response.json())
            .then(data => {
                this.setState({ Rules: data.paramObj });
                this.setState({ Rates: data.rateObj });
                this.setState({ formFlag: true });
                console.log("Rule Rules Data");
                console.log(this.state.Rules,'Rules');
                //var checkParam = JSON.stringify(this.state.Rules);
                //console.log('Check' + checkParam);

                //var checkRate = JSON.stringify(this.state.Rules);
                //console.log('Check' + checkRate);
                // For State Change
                const fields = this.state.fields;
                fields[event.target.name] = event.target.value;
                this.setState({ fields });
                this.setState({ [event.target.name]: event.target.value });
            });
        console.log(event.target.value);


    }




    //// For Rendering to nxt Page (((( Useless ))))
    //handlename() {
    //    this.setState({ redirectto: true });
    //}
    //// For Rendering to nxt Page (((( Useless ))))
    //renderRedirect = () => {
    //    if (this.state.redirectto == true) {
    //        return <Redirect to={{
    //            pathname: '../RuleEngine/RuleMapping',
                
    //        }}
    //        />
    //    }

    //}


    handleTags(regularTags) {
        this.setState({ tags: regularTags });
    }
    componentDidMount() {
        fetch(`${ruleconfig.ruleEngineUrl}/RuleConfig/GetAllRules`)
            .then(response => response.json())
            .then(data => {
                this.setState({ RuleConditionName: data });
            });
    }
    result = (evt) => {
        console.log(this.state, 'state');
    }

    onFormSubmit = (evt) => {
        var rst;
        this.setState({ displayOutputGrid: true });
        var data = {
            'ruleParameter': this.state.fields, 'rateParameter': this.state.rate,
        };
        fetch(`${ruleconfig.ruleEngineUrl}/RuleEngine/CheckRuleSets/` + this.state.fields.RuleName, {

            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json',
            },    
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(data => {
                console.log(data,'Data')
                //alert(data.responseMessage);
                this.setState({ result: data });
                console.log(this.state.result, 'Results');
                this.tabledata();
            });
    }
    tabledata = (e, index) => {
        debugger;
        if (this.state.result.length > 0) {
            this.setState({
                newData: this.state.result.map((prop, key) => {

                    return {
                        ValidatorName: prop.validatorName,
                        Outcome: prop.outcome,
                        Message: prop.message,
                        Code: prop.code,
                    };
                })
            });
        }
    }
    // For Rendering To the New Page
    onRuleMap = () => {
        window.location = '../RuleMapping/RuleMapping.jsx';
    }
    

    onInputChange = (evt) => {
        const fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
    };
    onInputParamChange = (evt) => {
        //console.log('Event', evt);
        let fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
    };
    onInputRateChange = (evt) => {
        let rate = this.state.rate;
        rate[evt.target.name] = evt.target.value;
        this.setState({ rate });
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
                                    <small> Rule Execution </small>
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
                                                Rule Name
                          </InputLabel>
                                            <Select
                                                value={this.state.fields.RuleName}
                                                onChange={this.handleState}
                                                MenuProps={{
                                                    className: classes.selectMenu
                                                }}
                                                classes={{
                                                    select: classes.select
                                                }}
                                                inputProps={{
                                                    name: "RuleName",
                                                    id: "simple-select"
                                                }}
                                            >
                                                {
                                                    this.state.RuleConditionName.map(item =>
                                                        <MenuItem
                                                            value={item.ruleId}
                                                            classes={{
                                                                root: classes.selectMenuItem,
                                                                selected: classes.selectMenuItemSelected
                                                            }}
                                                        >
                                                            {item.ruleName}
                                                        </MenuItem>
                                                    )
                                                }
                                            </Select>
                                        </FormControl>
                                    </GridItem>


                                </GridContainer>

                            </CardBody>
                        </Card>

                    </GridItem>
                </GridContainer>
                {this.state.formFlag &&
                    <GridContainer>

                        <GridItem xs={12} sm={12} md={12}>
                            <Card>
                                {/*  <h5><small>Parameters</small></h5> */}
                                <CardHeader color="info" icon >

                                    {
                                        <h3 >
                                            <small>Parameters</small>
                                        </h3>
                                    }
                                </CardHeader>
                                <CardBody>

                                <GridContainer>
                                    {this.state.Rules.map((item, index) =>
                                        <GridItem xs={12} sm={12} md={4} key={index}>
                                            <CustomInput labelText={item.ruleParameter}
                                                // value={item.paramName}
                                                name={item.ruleParameter}
                                                onChange={this.onInputParamChange}
                                                inputProps={{
                                                    //type: "number"
                                                }}
                                                formControlProps={{ fullWidth: true }} />

                                        </GridItem>


                                    )}
                                </GridContainer>
                                </CardBody>
                            </Card>

                        </GridItem>
                    </GridContainer>
                }
                {this.state.formFlag &&
                    <GridContainer>

                        <GridItem xs={12} sm={12} md={12}>
                            <Card>
                                <CardHeader color="info" icon >

                                    {
                                        <h3 >
                                            <small>Rate Parameters</small>
                                        </h3>
                                    }
                                </CardHeader>
                                <CardBody>

                                <GridContainer>
                                    {this.state.Rates.map((item, index) =>
                                        <GridItem xs={12} sm={12} md={4} key={index}>
                                            <CustomInput labelText={item.rateParameter}
                                                // value={item.paramName}
                                                name={item.rateParameter}
                                                onChange={this.onInputRateChange}
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
                {this.state.displayOutputGrid &&

                    <GridContainer xl={12}>
                    <GridItem lg={12}>
                                    <ReactTable
                                        data={this.state.newData}
                                        filterable
                                        columns={[
                                            {
                                                Header: "Validator Name",
                                                accessor: "ValidatorName",
                                                minWidth: 30,
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                resizable: false,
                                            },
                                            {
                                                Header: "Outcome",
                                                accessor: "Outcome",
                                                minWidth: 30,
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                resizable: false,
                                            },
                                            {
                                                Header: "Message",
                                                accessor: "Message",
                                                minWidth: 30,
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                resizable: false,
                                            },
                                            {
                                                Header: "Code",
                                                accessor: "Code",
                                                minWidth: 30,
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                resizable: false,
                                            }

                                        ]}
                                        defaultPageSize={5}
                                        showPaginationTop={false}
                                        //pageSize={([this.state.result.length + 1] < 5) ? [this.state.length.length + 1] : 5}
                                        showPaginationBottom
                                        className="-striped -highlight"
                                    />
                        </GridItem>
                    </GridContainer>
                }
                {
                //    this.state.formFlag &&
                //    <form id="frmRule">
                //        <GridContainer>

                //            <GridItem xs={12} sm={12} md={12}>
                //                <Card>
                //                    <CardBody>
                //                    <small><h1>Parameters</h1></small>

                //                        <GridContainer>
                //                            {this.state.Rules.map((item, index) =>
                //                                <GridItem xs={12} sm={12} md={4} key={index}>
                //                                    <CustomInput labelText={item.ruleParameter}
                //                                        // value={item.paramName}
                //                                        name={item.ruleParameter}
                //                                        onChange={this.onInputParamChange}
                //                                        inputProps={{
                //                                            //type: "number"
                //                                        }}
                //                                        formControlProps={{ fullWidth: true }} />

                //                                </GridItem>


                //                            )}
                //                        </GridContainer>
                //                        <small><h1>Rate Parameters</h1></small>
                //                        <GridContainer>
                //                            {this.state.Rates.map((item, index) =>
                //                                <GridItem xs={12} sm={12} md={4} key={index}>
                //                                    <CustomInput labelText={item.rateParameter}
                //                                        // value={item.paramName}
                //                                        name={item.rateParameter}
                //                                        onChange={this.onInputRateChange}
                //                                        inputProps={{
                //                                            //type: "number"
                //                                        }}
                //                                        formControlProps={{ fullWidth: true }} />

                //                                </GridItem>


                //                            )}
                //                        </GridContainer>

                //                        <Button onClick={() => this.onFormSubmit()}
                //                            color="info"
                //                            size="sm"
                //                        >
                //                            EXECUTE
                //</Button>
                //                        {    //{this.renderRedirect()}
                //                            //                    <Button onClick={() => this.handlename()}
                //                            //                        color="info"
                //                            //                        size="sm"
                //                            //                    >
                //                            //                        Rule_Mapping
                //                            //</Button>
                //                        }
                //                    </CardBody>
                //                </Card>

                //            </GridItem>
                //        </GridContainer>

                //        {this.state.displayOutputGrid &&

                //            <GridContainer>
                //                <GridItem xs={4} sm={12} md={12}>
                //                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                //                        <CardBody className="product-search-tab">
                //                            <ReactTable
                //                                data={this.state.newData}
                //                                filterable
                //                                columns={[
                //                                    {
                //                                        Header: "Validator Name",
                //                                        accessor: "ValidatorName",
                //                                        minWidth: 30,
                //                                        style: { textAlign: "center" },
                //                                        headerClassName: 'react-table-center',
                //                                        resizable: false,
                //                                    },
                //                                    {
                //                                        Header: "Outcome",
                //                                        accessor: "Outcome",
                //                                        minWidth: 30,
                //                                        style: { textAlign: "center" },
                //                                        headerClassName: 'react-table-center',
                //                                        resizable: false,
                //                                    },
                //                                    {
                //                                        Header: "Message",
                //                                        accessor: "Message",
                //                                        minWidth: 30,
                //                                        style: { textAlign: "center" },
                //                                        headerClassName: 'react-table-center',
                //                                        resizable: false,
                //                                    },
                //                                    {
                //                                        Header: "Code",
                //                                        accessor: "Code",
                //                                        minWidth: 30,
                //                                        style: { textAlign: "center" },
                //                                        headerClassName: 'react-table-center',
                //                                        resizable: false,
                //                                    }

                //                                ]}
                //                                defaultPageSize={5}
                //                                showPaginationTop={false}
                //                                //pageSize={([this.state.result.length + 1] < 5) ? [this.state.length.length + 1] : 5}
                //                                showPaginationBottom
                //                                className="-striped -highlight"
                //                            />
                //                        </CardBody>
                //                    </Animated>
                //                </GridItem>
                //            </GridContainer>
                //        }

                //    </form>
                }

                {//<h4>
                 //   Def{this.state.result}
                //</h4>
                }
            </div>
            
        );
    }
}

function mapStateToProps(state) {
    //const { loggingIn } = state.authentication;
    //return {
    //    loggingIn
    //};
}

export default connect(null, null)(withStyles(extendedFormsStyle)(RuleExecution));
//export default withStyles(extendedFormsStyle)(RuleExecution);






