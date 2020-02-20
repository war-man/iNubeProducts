import React from "react";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";
import Favorite from "@material-ui/icons/Favorite";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";


import FormControlLabel from "@material-ui/core/FormControlLabel";
import Datetime from "react-datetime";
import Switch from "@material-ui/core/Switch";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";


import Heading from "components/Heading/Heading.jsx";

// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Schedule from "@material-ui/icons/Schedule";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Clearfix from "components/Clearfix/Clearfix.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Wizard from "components/Wizard/Wizard.jsx";



import avatar from "assets/img/faces/marc.jpg";

class Benefits extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedA: true,
            checkedB: false,
            simpleSelect: "",
            simpleeSelect: "",
            productStatus: "",
            partnertype: "",
            partnername: "",
            partnerid: "",
            multipleSelect: [],
            tags: ["pizza", "pasta", "parmesan"]
        };
    }
    handleSimple = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };
    render() {
        const { classes } = this.props;

        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                        labelText="Benefit Amount"
                        id="gstnumber"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>

                    <GridContainer>
                        <GridItem xs={12} sm={6} md={12} lg={12}>
                            <FormControl
                                fullWidth
                                className={classes.selectFormControl}
                            >
                                <InputLabel
                                    htmlFor="simple-select"
                                    className={classes.selectLabel}
                                >
                                    Benefit Criteria
                          </InputLabel>
                                <Select
                                    MenuProps={{
                                        className: classes.selectMenu
                                    }}
                                    classes={{
                                        select: classes.select
                                    }}
                                    value={this.state.partnername}
                                    onChange={this.handleSimple}
                                    inputProps={{
                                        name: "partnername",
                                        id: "simple-select"
                                    }}
                                >
                                    <MenuItem
                                        disabled
                                        classes={{
                                            root: classes.selectMenuItem
                                        }}
                                    >
                                        Partner Name
                            </MenuItem>
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                        }}
                                        value="2"
                                    >
                                        Shreyas
                            </MenuItem>
                                </Select>
                            </FormControl>
                        </GridItem>
                    </GridContainer>
                </GridItem>



                <GridItem xs={12} sm={12} md={4}>

                    <GridContainer>
                        <GridItem xs={12} sm={6} md={12} lg={12}>
                            <FormControl
                                fullWidth
                                className={classes.selectFormControl}
                            >
                                <InputLabel
                                    htmlFor="simple-select"
                                    className={classes.selectLabel}
                                >
                                    Benefit Criteria Value
                          </InputLabel>
                                <Select
                                    MenuProps={{
                                        className: classes.selectMenu
                                    }}
                                    classes={{
                                        select: classes.select
                                    }}
                                    value={this.state.partnername}
                                    onChange={this.handleSimple}
                                    inputProps={{
                                        name: "partnername",
                                        id: "simple-select"
                                    }}
                                >
                                    <MenuItem
                                        disabled
                                        classes={{
                                            root: classes.selectMenuItem
                                        }}
                                    >
                                        Benifit
                            </MenuItem>
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                        }}
                                        value="2"
                                    >
                                        Criteria value
                            </MenuItem>
                                </Select>
                            </FormControl>
                        </GridItem>
                    </GridContainer>
                </GridItem>




                <GridItem xs={12} sm={12} md={4}>

                    <GridContainer>
                        <GridItem xs={12} sm={6} md={12} lg={12}>
                            <FormControl
                                fullWidth
                                className={classes.selectFormControl}
                            >
                                <InputLabel
                                    htmlFor="simple-select"
                                    className={classes.selectLabel}
                                >
                                    Maximum Benefit Amount / Criteria
                          </InputLabel>
                                <Select
                                    MenuProps={{
                                        className: classes.selectMenu
                                    }}
                                    classes={{
                                        select: classes.select
                                    }}
                                    value={this.state.partnername}
                                    onChange={this.handleSimple}
                                    inputProps={{
                                        name: "partnername",
                                        id: "simple-select"
                                    }}
                                >
                                    <MenuItem
                                        disabled
                                        classes={{
                                            root: classes.selectMenuItem
                                        }}
                                    >
                                        Amount
                            </MenuItem>
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                        }}
                                        value="2"
                                    >
                                        10000
                            </MenuItem>
                                </Select>
                            </FormControl>
                        </GridItem>
                    </GridContainer>
                </GridItem>


            </GridContainer>
        );
    }
}
export default withStyles(extendedFormsStyle)(Benefits);