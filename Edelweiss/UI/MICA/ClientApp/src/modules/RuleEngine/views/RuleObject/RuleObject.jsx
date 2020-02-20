import React from "react";
import PropTypes, { string } from "prop-types";
import { connect } from 'react-redux';
import FormControl from "@material-ui/core/FormControl";
import Datetime from "react-datetime";
import Button from "components/CustomButtons/Button.jsx";
import MenuItem from "@material-ui/core/MenuItem";
import classNames from "classnames";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InputLabel from "@material-ui/core/InputLabel";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Select from "@material-ui/core/Select";
import Assignment from "@material-ui/icons/Assignment";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";
import ruleconfig from 'modules/RuleEngine/RuleConfig.js';
//import config from '../../../../config.js';
import "react-table/react-table.css";
import { Row, Col } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';
import $ from 'jquery';
import "react-table/react-table.css";
import { keys } from "@material-ui/core/styles/createBreakpoints";

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

class RuleObject extends React.Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
        this.state = {
            show: false,
            showG: false,
            Paramid: "",
            ruleobj: [],
            gridObj:[],
            multiselectArray: [],
            result: [],
            fields: {
                checkedA: true,
                checkedB: false,
                simpleSelect: "",
                ruleobjectname: "",
                multipleSelect: [],
                IsActive: "",
                CreatedDate: "",
                createddateParamset: "",
                isactive:""
            },
            newdata:[],
        };
        this.handleTags = this.handleTags.bind(this);
    }
    
    handleTags(regularTags) {
        this.setState({ tags: regularTags });
    }
   
    onFormSubmit = (evt) => {
        
            this.state.fields.IsActive = 1;
            this.state.fields.CreatedDate = date();
            var data = { 'paramSetName': this.state.fields.ruleobjectname, 'isActive': this.state.fields.IsActive, 'createdDate': this.state.fields.CreatedDate, 'tblParamSetDetails': this.state.multiselectArray };           
            console.log('data' + JSON.stringify(data));
            fetch(`${ruleconfig.ruleEngineUrl}/RuleConfig/CreateParamset/`, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }).then(function (data) {
                console.log(data);
            });

                this.setState({
                    redirect: true,

                })
        };
        onInputChange = (evt) => {
            const fields = this.state.fields;
            fields[evt.target.name] = evt.target.value;
            this.setState({ fields });
        };
    
        componentDidMount() {
            fetch(`${ruleconfig.ruleEngineUrl}/RuleConfig/GetAllParameter`)
                .then(response => response.json())
                .then(data => {
                    this.setState({ ruleobj: data });
                    //console.log(this.state.ruleobj);

                });
    }

    // For Grid View
    onGrid() {
        const { showG } = this.state.showG;
        this.setState({ showG: !showG });

        fetch(`${ruleconfig.ruleEngineUrl}/RuleEngine/GetAllParamSetDetailsGrid`)
            .then(response => response.json())
            .then(data => {
                this.setState({ gridObj: data });
                //console.log(this.state.gridObj);
                if (this.state.gridObj.length > 0) {
                    this.setState({
                        newdata: this.state.gridObj.map((prop, key) => {

                            return {
                                PramId: prop.paramId,
                                ParamName: prop.paramName,
                                ParamType: prop.paramType,
                                ParamMasterLink: prop.paramMasterLink,
                                IsActive: prop.isActive,
                                CreatedDate: prop.createdDate,
                            };
                        })
                    });
                    console.log(this.state.newdata, 'New Data');
                }
            });
    }
    
    addRow() {
        const { show } = this.state.show;
        this.setState({ show: !show });

        var mlt_select = this.state.fields.multipleSelect.toString();
        var multiselect_array = mlt_select.split(",");
        let pMultiselectArray = this.state.multiselectArray;
        this.setState({ multiselectArray: pMultiselectArray });
        for (var i = 0; i < multiselect_array.length; i++) {
            pMultiselectArray.push({ paramId: multiselect_array[i] });
        }
        var storedArray = [] ;
        for (var i = 0; i < multiselect_array.length; i++) {
            var res = this.state.ruleobj.filter(word => word.paramId == multiselect_array[i]);
            storedArray.push(res[0]);
        }
        this.setState({
            result: storedArray
        })
    }

    delete(paramId) {
        //console.log("Target " + paramId);
        var filteredItems = this.state.result.filter(item => item.paramId !== paramId);
        this.setState({
            result: filteredItems
        })
        var filterMultiSelectArray = this.state.multiselectArray.filter(item => item.paramId !== paramId.toString());
        this.setState({
            multiselectArray: filterMultiSelectArray
        })
    }

    render() {
        const { classes } = this.props;
        return (

            <GridContainer>
                <GridItem xs={12}>
                    <Card>
                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                                <Assignment />
                            </CardIcon>
                            <h4 className={classes.cardIconTitle}>Rule Object</h4>
                        </CardHeader>
                        <CardBody>

                            <form onSubmit={e => this.onFormSubmit(e)}>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <CustomInput labelText="Rule Object Name"
                                            value={this.state.fields.ruleobjectname}
                                            name='ruleobjectname'
                                            onChange={this.onInputChange}
                                            formControlProps={{ fullWidth: true }} />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={4}>

                                        <FormControl
                                            fullWidth
                                            className={classes.selectFormControl}
                                        >
                                            <InputLabel
                                                htmlFor="multiple-select"
                                                className={classes.selectLabel}
                                            >
                                                Rule Parameter
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
                                                    this.state.ruleobj.map(item =>
                                                        <MenuItem
                                                            value={item.paramId}
                                                            classes={{
                                                                root: classes.selectMenuItem,
                                                                selected: classes.selectMenuItemSelected
                                                            }}
                                                        > {item.paramName}
                                                        </MenuItem>
                                                    )
                                                }
                                            </Select>
                                        </FormControl>
                                    </GridItem>


                                </GridContainer>


                                <Button onClick={() => this.addRow()}
                                    color="info"
                                    size="sm"
                                >
                                    ADD
                </Button>
                                {this.state.show &&
                                    <div id="div1">
                                        <table className="createTableClass table-striped " style={{ width: "100" }} id="benefitTable">

                                            <thead className="tableClassRow">

                                                <tr className="tableClassRow">
                                                    <th className="tableClassRow" ><h6>Param Id</h6></th>
                                                    <th className="tableClassRow" ><h6>Parameter Name</h6></th>
                                                    <th className="tableClassRow" ><h6>Parameter Type</h6></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { this.state.result.map((item, index) =>
                                                        <tr className="tableClassRow" key={index}>
                                                            <td className="tableClassRow"><h6>{item.paramId}</h6></td>
                                                            <td className="tableClassRow"><h6>{item.paramName}</h6></td>
                                                            <td className="tableClassRow"><h6>{item.paramType}</h6></td>
                                                            <td>
                                                                <button type="button" className="btn-style search-btn" onClick={this.delete.bind(this, item.paramId)}></button>
                                                            </td>
                                                        </tr>
                                                    )}
                                            </tbody>
                                        </table>
                                    </div>
                                }
                                <Button onClick={() => this.onFormSubmit()}
                                    color="info"
                                    size="sm"
                                >
                                    SAVE
                </Button>

                                {this.state.showG &&
                                    <div id="div1">
                                        <table className="createTableClass table-striped " style={{ width: "100" }} id="benefitTable">
                                            <thead className="tableClassRow">
                                                <tr className="tableClassRow">
                                                    <th className="tableClassRow" >ParamSetId</th>
                                                    <th className="tableClassRow" >ParamSetName</th>
                                                <th className="tableClassRow" >ParameterId</th>
                                                <th className="tableClassRow" >ParameterName</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    this.state.gridObj.map((item, index) =>
                                                        <tr className="tableClassRow" key={index}>
                                                        <td className="tableClassRow"><h6>{item.paramSetId}</h6></td>
                                                        <td className="tableClassRow"><h6>{item.paramSetName}</h6></td>
                                                        <td className="tableClassRow"><h6>{item.paramId}</h6></td>
                                                        <td className="tableClassRow"><h6>{item.paramName}</h6></td>
                                                        </tr>
                                                    )}
                                            </tbody>
                                        </table>
                                    </div>
                                }
                                <Button onClick={() => this.onGrid()}
                                    color="info"
                                    size="sm"
                                >
                                    GRID
                </Button>
                            </form >
                        </CardBody >
                    </Card >
                </GridItem >
            </GridContainer >



        );

    }
}

function mapStateToProps(state) {
    //const { loggingIn } = state.authentication;
    //return {
    //    loggingIn
    //};
}

export default connect(null, null)(withStyles(extendedFormsStyle)(RuleObject));

//export default withStyles(extendedFormsStyle)(RuleObject);