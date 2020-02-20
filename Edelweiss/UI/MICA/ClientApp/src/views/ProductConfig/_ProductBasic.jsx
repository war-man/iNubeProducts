import React from "react";

import PermIdentity from "@material-ui/icons/PermIdentity";
import FilterNone from "@material-ui/icons/FilterNone";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Datetime from "react-datetime";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import TranslationContainer from "components/Translation/TranslationContainer.jsx";

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

class ProductBasic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            simpleSelect: "",
            desgin: false,
            code: false,
            develop: false,
            topics: [],
            lob:""
        };
    }
    handleSimple = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };
    componentDidMount() {
        //fetch('api/SampleData/GetDropDownFromList',{
    //    method: 'GET',
    //        headers: {
    //        'Accept': 'application/json',
    //            'Content-Type': 'application/json',
    //                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
    //    },
    //})
        //    .then(response => response.json())
        //    .then(data => {
        //        this.setState({ topics: data });
        //    });
    }
    render() {
        const { classes } = this.props;
        return (
            <Card>
                <CardHeader color="rose" icon>
                    <CardIcon color="rose">
                        <FilterNone />
                    </CardIcon>
                    <h4 className={this.props.cardIconTitle}>
                        <small> Product Basic Feature </small>
                    </h4>
                </CardHeader>
                <CardBody>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="ProductName"
                                id="productname"
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="ProductCode"
                                id="productcode"
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <FormControl fullWidth className={classes.selectFormControl}>
                                <InputLabel
                                    htmlFor="Lob"
                                    className={classes.selectLabel}
                                >
                                    <TranslationContainer translationKey={"LineOfBusiness"} />
                                    
                  </InputLabel>
                                <Select
                                    MenuProps={{
                                        className: classes.selectMenu
                                    }}
                                    classes={{
                                        select: classes.select
                                    }}
                                    value={this.state.lob}
                                    onChange={this.handleSimple}
                                    inputProps={{
                                        name: "lob",
                                        id: "lob"
                                    }}
                                >
                                    {this.state.topics.map(item =>


                                        <MenuItem value={item.cityId}  classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                        }}  > {item.city}
                                        </MenuItem>
                                    )}
                                  
                                  
                                   
                                </Select>
                            </FormControl>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <FormControl fullWidth className={classes.selectFormControl}>
                                <InputLabel
                                    htmlFor="simple-select"
                                    className={classes.selectLabel}
                                >
                                    <TranslationContainer translationKey={"ClassOfBusiness"} />
                                    
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
                                        <TranslationContainer translationKey={"InsurableItems"} />
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
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                        }}
                                        value="3"
                                    >
                                        Bucharest
                    </MenuItem>
                                </Select>
                            </FormControl>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <InputLabel className={classes.label}><TranslationContainer translationKey={"ActiveFrom"} /></InputLabel>
                            <br />
                            <FormControl fullWidth>
                                <Datetime
                                    timeFormat={false}
                                    inputProps={{ placeholder: "Click Here" }}
                                />
                            </FormControl>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <InputLabel className={classes.label}><TranslationContainer translationKey={"ActiveTo"} /></InputLabel>
                            <br />
                            <FormControl fullWidth>
                                <Datetime
                                    timeFormat={false}
                                    inputProps={{ placeholder: "Click Here" }}
                                />
                            </FormControl>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <FormControl fullWidth className={classes.selectFormControl}>
                                <InputLabel
                                    htmlFor="simple-select"
                                    className={classes.selectLabel}
                                >
                                    <TranslationContainer translationKey={"ProductStatus"} />
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
                                        Insurable Items
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
                                    <MenuItem
                                        classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                        }}
                                        value="3"
                                    >
                                        Bucharest
                    </MenuItem>
                                </Select>
                            </FormControl>
                        </GridItem>
                    </GridContainer>
                </CardBody>
            </Card>
        );
    }
}
export default withStyles(style)(ProductBasic);