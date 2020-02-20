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
// @material-ui/icons


import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import CustomInput from "components/CustomInput/CustomInput.jsx";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

class Covers extends React.Component {
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
                                    Cover
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
                                    Cover Event
                          </InputLabel>
                                <Select
                                    MenuProps={{
                                        className: classes.selectMenu
                                    }}
                                    classes={{
                                        select: classes.select
                                    }}
                                    value={this.state.partnerid}
                                    onChange={this.handleSimple}
                                    inputProps={{
                                        name: "partnerid",
                                        id: "simple-select"
                                    }}
                                >
                                    <MenuItem
                                        disabled
                                        classes={{
                                            root: classes.selectMenuItem
                                        }}
                                    >
                                        Cover Event
                            </MenuItem>
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                        }}
                                        value="2"
                                    >
                                        Paris
                            </MenuItem>
                                </Select>
                            </FormControl>
                        </GridItem>
                    </GridContainer>
                </GridItem>



                <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                        labelText="Cover Description"
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
                                    Cover Event Factor
                          </InputLabel>
                                <Select
                                    MenuProps={{
                                        className: classes.selectMenu
                                    }}
                                    classes={{
                                        select: classes.select
                                    }}
                                    value={this.state.partnerid}
                                    onChange={this.handleSimple}
                                    inputProps={{
                                        name: "partnerid",
                                        id: "simple-select"
                                    }}
                                >
                                    <MenuItem
                                        disabled
                                        classes={{
                                            root: classes.selectMenuItem
                                        }}
                                    >
                                        Partner Type
                            </MenuItem>
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                        }}
                                        value="2"
                                    >
                                        Paris
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
                                    Cover Event Factor Value Unit
                          </InputLabel>
                                <Select
                                    MenuProps={{
                                        className: classes.selectMenu
                                    }}
                                    classes={{
                                        select: classes.select
                                    }}
                                    value={this.state.partnerid}
                                    onChange={this.handleSimple}
                                    inputProps={{
                                        name: "partnerid",
                                        id: "simple-select"
                                    }}
                                >
                                    <MenuItem
                                        disabled
                                        classes={{
                                            root: classes.selectMenuItem
                                        }}
                                    >
                                        Cover Event Factor
                            </MenuItem>
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                        }}
                                        value="2"
                                    >
                                        Paris
                            </MenuItem>
                                </Select>
                            </FormControl>
                        </GridItem>
                    </GridContainer>
                </GridItem>



                <GridItem xs={12} sm={12} md={4}>


                    <form style={{ display: 'block', width: '' }} >

                        <div className="form-check">
                            <br />
                            <br />

                            <label>
                                <input
                                    type="radio"
                                    name="react-tips"
                                    value="option1"
                                    checked={true}
                                    className="form-check-input"

                                />
                                Single value
          </label>



                            <label>
                                <input
                                    type="radio"
                                    name="react-tips"
                                    value="option2"
                                    className="form-check-input"
                                />
                                Range Of Value
          </label>
                        </div>




                    </form>






                </GridItem>





                <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                        labelText="Cover Event Factor Value"
                        id="gstnumber"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                        labelText="Cover Period / Unit"
                        id="gstnumber"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>
            </GridContainer>
        );
    }
}
export default withStyles(extendedFormsStyle)(Covers);