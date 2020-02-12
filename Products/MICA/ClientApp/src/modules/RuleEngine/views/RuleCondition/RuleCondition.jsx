import React from "react";
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
import { Animated } from "react-animated-css";

class RuleObject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                checkedA: true,
                checkedB: false,
                conditionattributes: "",
                simpleSelect: "",
                simpleSelect2: "",
                conditionvaluefrom: "",
                conditionvalueTo: "",
                islistofvalue: "",
                conditionlogicaloperator: "",
                simpleSelect1: "",
            }, people: [],

        };
        this.handleTags = this.handleTags.bind(this);
    }
    handleSimple = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    handleMultiple = event => {
        this.setState({ multipleSelect: event.target.value });
    };
    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };
    handleTags(regularTags) {
        this.setState({ tags: regularTags });
    }
    onFormSubmit = (evt) => {
        const people = [...this.state.people, this.state.fields];
        this.setState({ people, fields: { ruleobjectname: "", multipleSelect: [] } });

        // evt.preventDefault();
    };
    onInputChange = (evt) => {
        const fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
    };
    render() {
        const { classes } = this.props;
        return (




            <GridContainer>
                <GridItem xs={12}>
                    <Card>
                        <CardBody>
                            <form onSubmit={this.onFormSubmit}>
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
                                                Condition Attributes
                          </InputLabel>
                                            <Select
                                                MenuProps={{
                                                    className: classes.selectMenu
                                                }}
                                                classes={{
                                                    select: classes.select
                                                }}
                                                value={this.state.simpleSelect}
                                                onChange={this.handleSimple}
                                                inputProps={{
                                                    name: "simpleSelect",
                                                    id: "simple-select"
                                                }}
                                            >
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="ParamSetDetailID2"
                                                >
                                                    ParamSetDetailID2
                            </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="ParamSetDetailID1"
                                                >
                                                    ParamSetDetailID
                            </MenuItem>

                                            </Select>
                                        </FormControl>
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={3}>
                                        <FormControl
                                            fullWidth
                                            className={classes.selectFormControl}
                                        >
                                            <InputLabel
                                                htmlFor="simple-select"
                                                className={classes.selectLabel}
                                            >
                                                Condition Operator
                          </InputLabel>
                                            <Select
                                                MenuProps={{
                                                    className: classes.selectMenu
                                                }}
                                                classes={{
                                                    select: classes.select
                                                }}
                                                value={this.state.simpleSelect}
                                                onChange={this.handleSimple}
                                                inputProps={{
                                                    name: "simpleSelect",
                                                    id: "simple-select"
                                                }}
                                            >
                                                <MenuItem
                                                    disabled
                                                    classes={{
                                                        root: classes.selectMenuItem
                                                    }}
                                                >
                                                    Condition Operator
                            </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="EqualTo"
                                                >
                                                    =
                            </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="Greater Than"
                                                >
                                                    >
                            </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="lessthan"
                                                >
                                                    {"<"}
                                                </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="Not Equal To"
                                                >
                                                    !=
                            </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="LessThanEqualTo"
                                                >
                                                    {"<="}
                                                </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="GreaterThanEqualTo"
                                                >
                                                    >=
                                                    </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="InBetween"
                                                >
                                                    InBetween
                                                    </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="IsListOf"
                                                >
                                                    IsListOf
                                                    </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="Validate"
                                                >
                                                    Validate
                                                    </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput labelText="Condition Value"
                                            value={this.state.fields.conditionvaluefrom}
                                            name='conditionvaluefrom'
                                            onChange={this.onInputChange}
                                            inputProps={{
                                                type: "number"
                                            }}
                                            formControlProps={{ fullWidth: true }} />
                                    </GridItem>



                                    <GridItem xs={12} sm={12} md={3}>
                                        <FormControl
                                            fullWidth
                                            className={classes.selectFormControl}
                                        >
                                            <InputLabel
                                                htmlFor="conditionlogicaloperator"
                                                className={classes.selectLabel}
                                            >
                                                Condition Logical Operator
                          </InputLabel>
                                            <Select
                                                MenuProps={{
                                                    className: classes.selectMenu
                                                }}
                                                classes={{
                                                    select: classes.select
                                                }}
                                                value={this.state.simpleSelect1}
                                                onChange={this.handleSimple}
                                                inputProps={{
                                                    name: "simpleSelect1",
                                                    id: "simple-select1"
                                                }}
                                            >
                                                <MenuItem
                                                    disabled
                                                    classes={{
                                                        root: classes.selectMenuItem
                                                    }}
                                                >
                                                    Condition Logical Operator
                            </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="and"
                                                >
                                                    AND
                            </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="or"
                                                >
                                                    OR
                            </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="andor"
                                                >
                                                    AND/OR
                            </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </GridItem>

                                </GridContainer>

                                <Button onClick={() => this.onFormSubmit()}
                                    color="info"
                                    size="sm"
                                >
                                    ADD
                                </Button>
                                <div>
                                    <ul>
                                        {this.state.people.map(({ simpleSelect2, conditionattributes, simpleSelect, conditionvaluefrom, conditionvalueTo, islistofvalue, simpleSelect1 }, i) => <li key={i}>  {simpleSelect2}, {conditionattributes},{simpleSelect},{conditionvaluefrom},{conditionvalueTo},{islistofvalue},{simpleSelect1}</li>
                                        )}
                                    </ul> </div>
                            </form >
                        </CardBody >
                    </Card >
                </GridItem >
            </GridContainer >
        );

    }
}
export default withStyles(extendedFormsStyle)(RuleObject);