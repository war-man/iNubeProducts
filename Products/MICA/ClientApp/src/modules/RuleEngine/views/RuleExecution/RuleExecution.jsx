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
import ReactTable from "react-table";
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

            // Redirect to the next Page ((Useless))
            //redirectto: '',

            RuleConditionName: [],
            Rules:[],
            tblRuleConditionArray: [],
            result:"",
            fields: {
                RuleName: ""
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
        fetch(`${ruleconfig.ruleEngineUrl}/RuleEngine/GetAllRulesWithParam`)
            .then(response => response.json())
            .then(data => {
                this.setState({ Rules: data });
                console.log("Rule Rules Data");
                console.log(this.state.Rules);
                this.setState({ Rules: this.state.Rules.filter(item => item.rule_id == event.target.value) });
                var checkParam = JSON.stringify(this.state.Rules);
                console.log('Check'+checkParam);
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
        fetch(`${ruleconfig.ruleEngineUrl}/RuleEngine/CheckRuleSets/` + this.state.fields.RuleName, {

            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json',
            },    
            body: JSON.stringify(this.state.fields)
        }).then(function (response) {
            return response.json();
            }).then(data => {
                alert(data.responseMessage);
                this.setState({ result: data });
                console.log(this.state.result, 'Results');
            });

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

                <form id="frmRule">
                    <GridContainer>

                        <GridItem xs={12} sm={12} md={12}>
                            <Card>
                                <CardBody>
                                    
                                        <GridContainer>
                                            {this.state.Rules.map((item, index) =>
                                                <GridItem xs={12} sm={12} md={4} key={index}>
                                                    <CustomInput labelText={item.paramName}
                                                        // value={item.paramName}
                                                        name={item.paramName}
                                                        onChange={this.onInputParamChange}
                                                        inputProps={{
                                                            //type: "number"
                                                        }}
                                                        formControlProps={{ fullWidth: true }} />

                                                </GridItem>


                                            )}
                                        </GridContainer>
                                    
                                    <Button onClick={() => this.onFormSubmit()}
                                        color="info"
                                        size="sm"
                                    >
                                        EXECUTE
                </Button>
                              {    //{this.renderRedirect()}
                //                    <Button onClick={() => this.handlename()}
                //                        color="info"
                //                        size="sm"
                //                    >
                //                        Rule_Mapping
                //</Button>
                                }
                                </CardBody>
                            </Card>

                        </GridItem>
                    </GridContainer>

                </form>
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






