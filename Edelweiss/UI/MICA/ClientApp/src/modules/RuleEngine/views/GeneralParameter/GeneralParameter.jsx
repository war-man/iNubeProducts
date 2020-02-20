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
import "react-table/react-table.css";
import $ from 'jquery';
import ReactTable from "react-table";
import ruleconfig from 'modules/RuleEngine/RuleConfig.js';
import { Animated } from "react-animated-css";
//import config from '../../../config.js';

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

class GeneralParameter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            checkedA: true,
            checkedB: false,
            gridObj: [],
            fields: {
                ParamName: "",
                ParamType: "",
                ParamMasterLink: "",
                IsActive: "",
                CreatedDate: "",
            },
            newdata: [],
        };
        this.handleTags = this.handleTags.bind(this);
    }
    handleTags(regularTags) {
        this.setState({ tags: regularTags });
    }
    onFormSubmit = (evt) => {

        this.state.fields.IsActive = 1;
        this.state.fields.CreatedDate = date();
        fetch(`${ruleconfig.ruleEngineUrl}/RuleConfig/CreateParameters/`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.fields)
        }).then(function (data) {
            console.log(data);
            alert("Parameter Saved");

        });
    }

    // For Grid View
    onGrid() {
        const { show } = this.state.show;
        this.setState({ show: !show });

        fetch(`${ruleconfig.ruleEngineUrl}/RuleConfig/GetAllParameter`)
            .then(response => response.json())
            .then(data => {
                this.setState({ gridObj: data });
                console.log("Rule OBJ Data");
                console.log(this.state.gridObj);

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
        var table = document.getElementById('benefitTable');
        var row = table.insertRow(-1);
        row.className = 'tableClassRow';
        var cell1 = row.insertCell(-1);
        var cell2 = row.insertCell(-1);
        var cell3 = row.insertCell(-1);
        var cell4 = row.insertCell(-1);

        cell1.innerHTML = this.state.fields.ParamName;
        cell2.innerHTML = this.state.fields.ParamType;
        cell3.innerHTML = this.state.fields.ParamMasterLink;
        //cell4.innerHTML = '<span class="delete"><i class="fa fa-trash" style="margin-left: 12px; padding: 3px; margin - top: 3px; border: none; background-color: transparent; color:red;zoom: 1.6; box-shadow: none; border-radius:4px;" aria-hidden="true"></i><span/>';
        //$(".delete").on('click', function () {
        //    $(this).parent().parent().remove();
        //});
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
                                    <small> General Parameter </small>
                                </h4>
                            </CardHeader>
                            <CardBody>

                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <CustomInput
                                            labelText="Parameter Name"
                                            id="ParamName"
                                            value={this.state.fields.ParamName}
                                            name='ParamName'
                                            onChange={this.onInputChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />

                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <FormControl
                                            fullWidth
                                            className={classes.selectFormControl}
                                        >
                                            <InputLabel
                                                htmlFor="simple-select"
                                                className={classes.selectLabel}
                                            >
                                                Data Type
                          </InputLabel>
                                            <Select
                                                MenuProps={{
                                                    className: classes.selectMenu
                                                }}
                                                classes={{
                                                    select: classes.select
                                                }}
                                                value={this.state.fields.ParamType}
                                                onChange={this.onInputChange}
                                                inputProps={{
                                                    name: "ParamType",
                                                    id: "simple-select"
                                                }}
                                            >
                                                <MenuItem
                                                    disabled
                                                    classes={{
                                                        root: classes.selectMenuItem
                                                    }}
                                                >
                                                    Data Type
                            </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="String"
                                                >
                                                    String
                            </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="Int"
                                                >
                                                    Int
                            </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="Float"
                                                >
                                                    Float
                            </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="Date"
                                                >
                                                    Date
                            </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="MobileNo"
                                                >
                                                    MobileNo
                            </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="Email"
                                                >
                                                    Email
                            </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="PassportNum"
                                                >
                                                    PassportNum
                                          </MenuItem>
                                              
                                            </Select>
                                        </FormControl>
                                    </GridItem>


                                    <GridItem xs={12} sm={12} md={4}>
                                        <CustomInput
                                            labelText="Master Name"
                                            id="ParamMasterLink"
                                            value={this.state.fields.ParamMasterLink}
                                            name="ParamMasterLink"
                                            onChange={this.onInputChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />

                                    </GridItem>
                                </GridContainer>
                                <Button onClick={() => this.addRow()}
                                    color="info"
                                    size="sm"
                                >
                                    ADD
                </Button>
                               
                                    <div>
                                        <table id="benefitTable">
                                            <tbody>
                                                <td>ParamID   </td>
                                                <td>Parameter  </td>
                                                <td>ParamType   </td>
                                            </tbody>
                                        </table>

                                    </div>
                                
                                <Button onClick={() => this.onFormSubmit()}
                                    color="info"
                                    size="sm"
                                >
                                    SAVE
                </Button>
                                {this.state.show &&
                                    <GridContainer>

                                        <GridItem xs={12}>

                                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                <CardBody className="product-search-tab">
                                                    <ReactTable
                                                        data={this.state.newdata}
                                                        filterable
                                                        columns={[
                                                            {
                                                                Header: "Param Id",
                                                                accessor: "PramId",
                                                                minWidth: 30,
                                                                style: { textAlign: "center" },
                                                                headerClassName: 'react-table-center',
                                                                resizable: false,

                                                            },
                                                            {
                                                                Header: "Param Name",
                                                                accessor: "ParamName",
                                                                minWidth: 30,
                                                                style: { textAlign: "center" },
                                                                headerClassName: 'react-table-center',
                                                                resizable: false,

                                                            },
                                                            {
                                                                Header: "Param Type",
                                                                accessor: "ParamType",
                                                                minWidth: 30,
                                                                style: { textAlign: "center" },
                                                                headerClassName: 'react-table-center',
                                                                resizable: false,

                                                            },
                                                            {
                                                                Header: "Param Master Link",
                                                                accessor: "ParamMasterLink",
                                                                minWidth: 30,
                                                                style: { textAlign: "center" },
                                                                headerClassName: 'react-table-center',
                                                                resizable: false,
                                                            },
                                                            {
                                                                Header: "IsActive",
                                                                accessor: "IsActive",
                                                                minWidth: 30,
                                                                style: { textAlign: "center" },
                                                                headerClassName: 'react-table-center',
                                                                resizable: false,
                                                            },
                                                            {
                                                                Header: "CreatedDate",
                                                                accessor: "CreatedDate",
                                                                minWidth: 30,
                                                                style: { textAlign: "center" },
                                                                headerClassName: 'react-table-center',
                                                                resizable: false,
                                                            },
                                                        ]}
                                                        defaultPageSize={5}
                                                        showPaginationTop={false}
                                                    pageSize={([this.state.gridObj.length + 1] < 5) ? [this.state.gridObj.length + 1] : 5}
                                                        showPaginationBottom
                                                        className="-striped -highlight"
                                                    />
                                                </CardBody>
                                            </Animated>
                                        </GridItem>
                                    </GridContainer>
                                }
                                <Button onClick={() => this.onGrid()}
                                    color="info"
                                    size="sm"
                                >
                                    GRID
                </Button>
                            </CardBody>
                        </Card>

                    </GridItem>
                </GridContainer>
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
export default connect(null, null)(withStyles(extendedFormsStyle)(GeneralParameter));






