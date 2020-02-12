import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
//import CustomInput from "components/CustomInput/CustomInput.jsx";
//import FormControlLabel from "@material-ui/core/FormControlLabel";
//import Radio from "@material-ui/core/Radio";
//import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import $ from 'jquery';

//import CreateUser from "./_CreateUser";
//import Button from "components/CustomButtons/Button.jsx";
//import data from 'views/Test/data.json';
//import CustomDropDownTree from "components/CustomDropdownTree/CustomDropDownTree.jsx";
//import DropdownTreeSelect from "react-dropdown-tree-select";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
//import AlertWizard from "components/AlertWizard/AlertWizard.jsx";
import SalesSummaryIcon from "assets/img/sales-summary.png";
import Permission from "./_Permission";
import FilterNone from "@material-ui/icons/FilterNone";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";

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

//const rightBtn = {
//    marginTop: "40px",
//    backgroundColor: "#1068ac",
//    color: "white",
//    border: "none",
//    borderRadius: "4px",
//    width: "35px",
//    height: "30px",
//    marginLeft: "90px"
//}

//const uType = {
//    marginTop: "3px"
//}

//const roleStyle = {
//    marginLeft : "12px"
//}
//const subheader = {
//    color: "#407ba4",
//    fontSize: "20px",
//    paddingleft: "14px",
//    display: "block",
//    marginLeft : "10px"
//}

//const radioLabel = {
//    marginTop: "-15px"
//}

class RolePrivileges extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            simpleSelect: "",
            topics: [],
            parameter: "",
            management: "",
            paramVal: "",
            configurator: "",
            selectedValue: null
        };
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.save = this.save.bind(this);
    }

    onChange = (currentNode, selectedNodes) => {
        this.state.role.push(currentNode.permissionId);
        console.log('onChange::', currentNode.permissionId, selectedNodes);
    }
    save() {
        console.log("values  ", this.state.role);
    };

    getInitialState() {
        return { label: "Admin" }
    }
    componentDidMount() {
        fetch('/api/SampleData/GetDropDownFromList')
            .then(response => response.json())
            .then(data => {
                this.setState({ topics: data, label : "Admin"});
            });
    }

    handleSimple = event => {
        this.setState({ [event.target.name]: event.target.value });
        this.setState({
            paramVal: event.target.value
        })

    };

    addParams = () => {
        var cityId = this.state.paramVal;
        $.each(this.state.topics, function (k, v) {
            if (v.cityId === cityId) {
                document.getElementById("admin").value = v.city;
                document.getElementById("adminVal").value = v.cityId;
                document.getElementById('admin').classList.add("active");
            }
        })
    
    }

    handleRadioChange(event) {
        this.setState({ selectedValue: event.target.value });
    }

    render() {
        const { classes } = this.props;
        return (
            <GridContainer>
                <Card className="assignCard">
                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                            <FilterNone />
                        </CardIcon>
                        {
                            <h4 >
                                <small> Role Privilages </small>
                            </h4>
                        }
                    </CardHeader>
                    <CardBody>



                 <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                        <FormControl fullWidth className={classes.selectFormControl}>
                            <InputLabel htmlFor="configurator" className={classes.selectLabel}>Select Role</InputLabel>
                            <Select
                                MenuProps={{
                                    className: classes.selectMenu
                                }}
                                classes={{
                                    select: classes.select
                                }}
                                value={this.state.configurator}
                                onChange={this.handleSimple}
                                inputProps={{
                                    name: "configurator",
                                    id: "configurator"
                                }}
                            >
                                {this.state.topics.map(item =>
                                    <MenuItem value={item.cityId} classes={{
                                        root: classes.selectMenuItem,
                                        selected: classes.selectMenuItemSelected
                                    }}  > {item.city}
                                    </MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </GridItem>
                    </GridContainer>
                    </CardBody>
                </Card>
                <GridContainer justify="Center">
                    <GridItem>
                        <Card className="wizCard">
                            <CardHeader color="warning" icon>
                                <CardIcon color="warning">
                                    <Icon> <img src={SalesSummaryIcon} className={classes.cardIcons} /></Icon>
                                </CardIcon>
                                <h4 className={classes.cardIconTitle}>
                                    <small>AssignRole Priveleges
                        </small> </h4>
                            </CardHeader>
                            <CardBody>
                                <GridContainer className="roleTree" justify="center" display={this.state.isButtonVisibility} >
                                    <GridItem>
                                        <GridContainer className="privelegesBox">
                                            <GridItem id="alertItem" xs={12} sm={12} md={12} lg={12}>
                                                {this.state.perFlag ? <Permission onChange={this.onChange} MasPermissionDTO={this.state.MasPermissionDTO} savepermission={this.savepermission} /> : null}
                                            </GridItem>
                                        </GridContainer>
                                    </GridItem>
                                </GridContainer>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
                
            </GridContainer>
        );
    }
}

export default withStyles(style)(RolePrivileges);
