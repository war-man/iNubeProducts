import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";


import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";

// core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

const style = {
    infoText: {
        fontWeight: "300",
        margin: "10px 0 30px",
        textAlign: "center"
    },
    ...customSelectStyle
};

class Step3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [24, 22],
            selectedValue: null,
            selectedEnabled: "b"
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeEnabled = this.handleChangeEnabled.bind(this);
    }
    handleChange(event) {
        this.setState({ selectedValue: event.target.value });
    }
    handleChangeEnabled(event) {
        this.setState({ selectedEnabled: event.target.value });
    }
    handleToggle(value) {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked
        });
    }
    render() {
        const { classes } = this.props;
        return (

            <GridContainer>

                <GridItem xs={12} sm={10}>
                    <div className={classes.inlineChecks}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    tabIndex={-1}
                                    onClick={() => this.handleToggle(10)}
                                    checkedIcon={
                                        <Check className={classes.checkedIcon} />
                                    }
                                    icon={<Check className={classes.uncheckedIcon} />}
                                    classes={{
                                        checked: classes.checked,
                                        root: classes.checkRoot
                                    }}
                                />
                            }
                            classes={{
                                label: classes.label
                            }}
                            label="Partner ID"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    tabIndex={-1}
                                    onClick={() => this.handleToggle(11)}
                                    checkedIcon={
                                        <Check className={classes.checkedIcon} />
                                    }
                                    icon={<Check className={classes.uncheckedIcon} />}
                                    classes={{
                                        checked: classes.checked,
                                        root: classes.checkRoot
                                    }}
                                />
                            }
                            classes={{
                                label: classes.label
                            }}
                            label="Reference ID"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    tabIndex={-1}
                                    onClick={() => this.handleToggle(12)}
                                    checkedIcon={
                                        <Check className={classes.checkedIcon} />
                                    }
                                    icon={<Check className={classes.uncheckedIcon} />}
                                    classes={{
                                        checked: classes.checked,
                                        root: classes.checkRoot
                                    }}
                                />
                            }
                            classes={{
                                label: classes.label
                            }}
                            label="Insured/Memeber Mobile number"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    tabIndex={-1}
                                    onClick={() => this.handleToggle(11)}
                                    checkedIcon={
                                        <Check className={classes.checkedIcon} />
                                    }
                                    icon={<Check className={classes.uncheckedIcon} />}
                                    classes={{
                                        checked: classes.checked,
                                        root: classes.checkRoot
                                    }}
                                />
                            }
                            classes={{
                                label: classes.label
                            }}
                            label="Event Duration Value/Unit"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    tabIndex={-1}
                                    onClick={() => this.handleToggle(11)}
                                    checkedIcon={
                                        <Check className={classes.checkedIcon} />
                                    }
                                    icon={<Check className={classes.uncheckedIcon} />}
                                    classes={{
                                        checked: classes.checked,
                                        root: classes.checkRoot
                                    }}
                                />
                            }
                            classes={{
                                label: classes.label
                            }}
                            label="Event Date/Time"
                        />
                    </div>
                </GridItem>

            </GridContainer>

        );
    }
}

export default withStyles(regularFormsStyle)(Step3);
