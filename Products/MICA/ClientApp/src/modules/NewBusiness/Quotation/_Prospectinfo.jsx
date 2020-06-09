import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Radio from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";

// @material-ui/icons
import MailOutline from "@material-ui/icons/MailOutline";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import Contacts from "@material-ui/icons/Contacts";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Switch from "@material-ui/core/Switch";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";




class RegularForms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [24, 22],
            selectedValue: null,
            selectedEnabled: "b"
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeEnabled = this.handleChangeEnabled.bind(this);
        console.log("filterdata", props)
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
            <div>
                <GridContainer>


                    <CardHeader color="rose" icon>
                    </CardHeader>
                    <CardBody>
                        <GridContainer>
                            <GridItem xs={6} sm={6} md={4}>

                                <CustomInput
                                    labelText="Emirates ID"
                                    id="Emirates_ID"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        type: "email"
                                    }}
                                />
                            </GridItem>
                                                          <GridItem xs={4}>

                                    <CustomInput
                                        labelText="Type"
                                    value={this.props.QuotationData.prospectType}
                                    name="prospectType"
                                    onChange={(e) => this.props.SetValue("string", e)}

                                        required={true}
                                        formControlProps={{
                                            fullWidth: true
                                        }}

                                    />
                                </GridItem>


                                <GridItem xs={4}>

                                  <CustomInput
                                    labelText="Salutation"
                                    value={this.props.QuotationData.salutation}
                                    name="salutation"
                                    onChange={(e) => this.props.SetValue("string", e)}

                                    required={true}
                                    formControlProps={{
                                        fullWidth: true
                                    }}

                                  />
                               </GridItem>




                                <GridItem xs={4}>

                                    <CustomInput
                                    labelText="Given Name"
                                    value={this.props.QuotationData.prospectName}
                                    name="prospectName"
                                    onChange={(e) => this.props.SetValue("string", e)}
                                        
                                        required={true}
                                        formControlProps={{
                                            fullWidth: true
                                        }}

                                    />
                                </GridItem>



                                <GridItem xs={4}>

                                    <CustomInput
                                        labelText="Sur Name"
                                      

                                    value={this.props.QuotationData.prospectLastName}
                                    name="prospectLastName"
                                    onChange={(e) =>this.props.SetValue("string", e)}
                                        required={true}
                                        formControlProps={{
                                            fullWidth: true
                                    }}

                                    
                                    />
                                </GridItem>




                                <GridItem xs={4}>

                                    <CustomInput
                                        labelText="Mobile"
                                        
                                    value={this.props.QuotationData.prospectMobile}
                                    name="prospectMobile"
                                    onChange={(e) => this.props.SetValue("string", e)}
                                         required={true}
                                        formControlProps={{
                                            fullWidth: true
                                        }}

                                    />
                                </GridItem>



                                <GridItem xs={4}>

                                    <CustomInput
                                        labelText="Home"
                                    value={this.props.QuotationData.prospectHome}
                                    name="prospectHome"
                                    onChange={(e) => this.props.SetValue("string", e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}

                                    />
                                </GridItem>




                                <GridItem xs={4}>

                                    <CustomInput
                                        labelText="Office"
                                    value={this.props.QuotationData.prospectWork}
                                    name="prospectWork"
                                    onChange={(e) => this.props.SetValue("string", e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}

                                    />
                                </GridItem>



                                <GridItem xs={4}>

                                    <CustomInput
                                        labelText="E-Mail"
                                    value={this.props.QuotationData.prospectEmail}
                                    name="prospectEmail"
                                    onChange={(e) => this.props.SetValue("string", e)}

                                        formControlProps={{
                                            fullWidth: true
                                        }}

                                    />
                                </GridItem>




                                <GridItem xs={4}>

                                    <CustomInput
                                        labelText="Place"
                                    value={this.props.QuotationData.place}
                                    name="place"
                                    onChange={(e) => this.props.SetValue("string", e)}
                                        required={true}
                                        formControlProps={{
                                            fullWidth: true
                                        }}

                                    />
                                </GridItem>



                                
                                <GridItem xs={4}>

                                    <CustomInput
                                        labelText="Gender"
                                    value={this.props.QuotationData.place}
                                    name="place"
                                    onChange={(e) => this.props.SetValue("string", e)}
                                        required={true}
                                        formControlProps={{
                                            fullWidth: true
                                        }}

                                    />
                                </GridItem>


                                <GridItem xs={4}>

                                    <CustomInput
                                        labelText="Date Of Birth"
                                    value={this.props.QuotationData.dob}
                                    name="dob"
                                    onChange={(e) => this.props.SetValue("string", e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}

                                    />
                                </GridItem>


                                <GridItem xs={4}>

                                    <CustomInput
                                        labelText="Age"
                                    value={this.props.QuotationData.ageAtNxtBday}
                                    name="ageAtNxtBday"
                                    onChange={(e) => this.props.SetValue("string", e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}

                                    />
                                </GridItem>


                                <GridItem xs={4}>

                                    <CustomInput
                                        labelText="Occupation"
                                    value={this.props.QuotationData.occupation}
                                    name="occupation"
                                    onChange={(e) => this.props.SetValue("string", e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}

                                    />
                                </GridItem>

                                <GridItem xs={4}>

                                    <CustomInput
                                        labelText="Average Annual Income"
                                    value={this.props.QuotationData.salary}
                                    name="salary"
                                    onChange={(e) => this.props.SetValue("string", e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}

                                    />
                                </GridItem>


                                <GridItem xs={4}>

                                    <CustomInput
                                        labelText="Passport"
                                    value={this.props.QuotationData.passport}
                                    name="passport"
                                    onChange={(e) => this.props.SetValue("string", e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}

                                    />
                                </GridItem>

                                <GridItem xs={4}>
                                    <h5>Do you Smoke</h5>
                                    <br />
                                    <div
                                        className={
                                            classes.checkboxAndRadio +
                                            " " +
                                            classes.checkboxAndRadioHorizontal
                                        }
                                    >
                                        <FormControlLabel
                                            control={
                                                <Radio
                                                    checked={this.state.selectedValue === "a"}
                                                    onChange={this.handleChange}
                                                    value="a"
                                                    name="radio button demo"
                                                    aria-label="A"
                                                    icon={
                                                        <FiberManualRecord
                                                            className={classes.radioUnchecked}
                                                        />
                                                    }
                                                    checkedIcon={
                                                        <FiberManualRecord
                                                            className={classes.radioChecked}
                                                        />
                                                    }
                                                    classes={{
                                                        checked: classes.radio,
                                                        root: classes.radioRoot
                                                    }}
                                                />
                                            }
                                            classes={{
                                                label: classes.label
                                            }}
                                            label="Yes"
                                        />
                                    </div>

                                    <div
                                        className={
                                            classes.checkboxAndRadio +
                                            " " +
                                            classes.checkboxAndRadioHorizontal
                                        }
                                    >
                                        <FormControlLabel
                                            control={
                                                <Radio
                                                    checked={this.state.selectedValue === "b"}
                                                    onChange={this.handleChange}
                                                    value="b"
                                                    name="radio button demo"
                                                    aria-label="B"
                                                    icon={
                                                        <FiberManualRecord
                                                            className={classes.radioUnchecked}
                                                        />
                                                    }
                                                    checkedIcon={
                                                        <FiberManualRecord
                                                            className={classes.radioChecked}
                                                        />
                                                    }
                                                    classes={{
                                                        checked: classes.radio,
                                                        root: classes.radioRoot
                                                    }}
                                                />
                                            }
                                            classes={{
                                                label: classes.label
                                            }}
                                            label="No"
                                        />
                                    </div>
                                </GridItem>
                            
                            </GridContainer>






                            <h3>Communication Address:</h3>
                            <GridContainer>
                                <GridItem xs={6} sm={6} md={4}>

                                    <CustomInput
                                        labelText="Address Line1"
                                    value={this.props.QuotationData.address1}
                                    name="address1"
                                    onChange={(e) => this.props.SetValue("string", e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}

                                    />
                                </GridItem>

                                <GridItem xs={4}>

                                    <CustomInput
                                        labelText="Adress Line 2"
                                    value={this.props.QuotationData.address2}
                                    name="address2"
                                    onChange={(e) => this.props.SetValue("string", e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}

                                    />
                                </GridItem>


                                <GridItem xs={4}>

                                    <CustomInput
                                        labelText="Adress Line 3"
                                    value={this.props.QuotationData.address3}
                                    name="address3"
                                    onChange={(e) => this.props.SetValue("string", e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}

                                    />
                                </GridItem>

                                <GridItem xs={4}>

                                    <CustomInput
                                        labelText="Postal Code | City"
                                    value={this.props.QuotationData.city}
                                    name="city"
                                    onChange={(e) => this.props.SetValue("string", e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}

                                    />
                                </GridItem>


                                <GridItem xs={4}>

                                    <CustomInput
                                        labelText="District"
                                    value={this.props.QuotationData.district}
                                    name="district"
                                    onChange={(e) => this.props.SetValue("string", e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}

                                    />
                                </GridItem>



                                <GridItem xs={4}>

                                    <CustomInput
                                        labelText="Province"
                                    value={this.props.QuotationData.province}
                                    name="province"
                                    onChange={(e) => this.props.SetValue("string", e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}

                                    />
                            </GridItem>


                            <GridItem xs={4}>

                                <center><Button color="rose">Save Prospect</Button></center>
                            </GridItem>
                            
                            </GridContainer>
                   


                        </CardBody>
                    
                </GridContainer></div>

                );
            }
        }
        
        export default withStyles(regularFormsStyle)(RegularForms);
