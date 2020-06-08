import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

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
import NewBusinessConfig from 'modules/NewBusiness/NewBusinessConfig.js'; 
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";

class ProspectInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [24, 22],
            selectedValue: null,
            selectedEnabled: "b",
            masterList: [],
            ContactsDetailsDTO: {
                EmiratesId: "",
                TypeId: "",
                Type: "",
                Salutation: "",
                GivenName: "",
                SurName: "",
                MobileNo: "",
                Home: "",
                Office: "",
                Email: "",
                Place: "",
                Gender: "",
                MaritialStatus: "",
                Age: "",
                Occupation: "",
                AverageAnnualIncome: "",
                Currency: "",
                Passport: "",
            },
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

    

    SetValue = ((type, event) => {

        event.preventDefault();
        let ContactsDetailsDTO = this.state.ContactsDetailsDTO;
        let name = event.target.name;
        let value = event.target.value;
        ContactsDetailsDTO[name] = value;
        this.setState({ ContactsDetailsDTO })
    });

    componentDidMount() {
     //fetch(`${NewBusinessConfig.NewBusinessConfigUrl}/api/Prospect/GetMaster?lMasterlist=Type`, {
     //     // fetch(`https://localhost:44320/api/Prospect/GetMaster?lMasterlist=Type `, {
     //       method: 'GET',

     //       headers: {
     //           'Content-Type': 'application/json; charset=utf-8'
     //       }
     //   })
     //       .then(response => response.json())
     //       .then(data => {

     //           this.setState({ masterList: data });
     //           console.log("data masterlist", data);
     //       });
        
    }
    render() {
        const { classes } = this.props;
        return (
           
            <div>
                <GridContainer lg={12}>
                    <GridItem>
                    <Card>

                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                                <MailOutline />
                            </CardIcon>
                            <h3 className={classes.cardIconTitle}><b>Prospect Information</b></h3>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>

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
                               
                                        <GridItem xs={12} sm={12} md={4}>
                                            <MasterDropdown
                                                labelText="Type"
                                                id="ContactsDTO.TypeId"
                                                value={this.state.ContactsDetailsDTO.TypeId}
                                                lstObject={this.state.masterList}
                                                required={true}
                                                filterName='Type'
                                                model="ContactsDetailsDTO"
                                                name='TypeId'
                                                onChange={(e) => this.SetValue("string", e)}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                            />
                                        </GridItem>
                                
                                    <GridItem xs={12} sm={12} md={4}>
                                        <MasterDropdown
                                            labelText="Salutation"
                                            id="ContactsDetailsDTO.SalutationId"
                                            value={this.state.ContactsDetailsDTO.Salutation}
                                            lstObject={this.state.masterList}
                                            required={true}
                                            filterName='Salutation'
                                            model="ContactsDetailsDTO"
                                            name='Salutation'
                                            onChange={(e) => this.SetValue("string", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>


                              

                                    <GridItem xs={12} sm={12} md={4}>

                                    <CustomInput
                                        labelText="Sur Name"
                                        id="Salutation"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: ""
                                        }}
                                    />
                                </GridItem>




                                    <GridItem xs={12} sm={12} md={4}>

                                    <CustomInput
                                        labelText="Mobile"
                                        id="Salutation"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: ""
                                        }}
                                    />
                                </GridItem>



                                    <GridItem xs={12} sm={12} md={4}>

                                    <CustomInput
                                        labelText="Home"
                                        id="Salutation"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: ""
                                        }}
                                    />
                                </GridItem>




                                    <GridItem xs={12} sm={12} md={4}>

                                    <CustomInput
                                        labelText="Office"
                                        id="Salutation"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: ""
                                        }}
                                    />
                                </GridItem>



                                    <GridItem xs={12} sm={12} md={4}>

                                    <CustomInput
                                        labelText="E-Mail"
                                        id="Salutation"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: ""
                                        }}
                                    />
                                </GridItem>




                                    <GridItem xs={12} sm={12} md={4}>

                                    <CustomInput
                                        labelText="Place"
                                        id="Salutation"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: ""
                                        }}
                                    />
                                </GridItem>



                                    <GridItem xs={12} sm={12} md={4}>
                                        <MasterDropdown 
                                            labelText="Gender"
                                            id="ContactsDetailsDTO.GenderId"
                                            value={this.state.ContactsDetailsDTO.Gender}
                                            lstObject={this.state.masterList}
                                            required={true}
                                            filterName='Gender'
                                            model="ContactsDetailsDTO"
                                            name='Gender'
                                            onChange={(e) => this.SetValue("string", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            />
                                    </GridItem>

                                   

                                    <GridItem xs={12} sm={12} md={4}>
                                        <MasterDropdown
                                            labelText="Marital Status"
                                            id="ContactsDetailsDTO.MaritalStatusId"
                                            value={this.state.ContactsDetailsDTO.MaritialStatus}
                                            lstObject={this.state.masterList}
                                            required={true}
                                            filterName='MaritialStatus'
                                            model="ContactsDetailsDTO"
                                            name='MaritialStatus'
                                            onChange={(e) => this.SetValue("string", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={4}>

                                    <CustomInput
                                        labelText="Date Of Birth"
                                        id="Salutation"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: ""
                                        }}
                                    />
                                </GridItem>


                                    <GridItem xs={12} sm={12} md={4}>

                                    <CustomInput
                                        labelText="Age"
                                        id="Salutation"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: ""
                                        }}
                                    />
                                </GridItem>


                                    <GridItem xs={12} sm={12} md={4}>

                                    <CustomInput
                                        labelText="Occupation"
                                        id="Salutation"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: ""
                                        }}
                                    />
                                </GridItem>

                                    <GridItem xs={12} sm={12} md={4}>

                                    <CustomInput
                                        labelText="Average Annual Income"
                                        id="Salutation"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: ""
                                        }}
                                    />
                                </GridItem>


                                    <GridItem xs={12} sm={12} md={4}>

                                    <CustomInput
                                        labelText="Passport"
                                        id="Salutation"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: ""
                                        }}
                                    />
                                </GridItem>

                                
                            </GridContainer>






                            <h4><b>Communication Address:</b></h4>
                            <GridContainer>
                                    <GridItem xs={12} sm={12} md={4}>

                                    <CustomInput
                                        labelText="Address Line1"
                                        id="Salutation"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: ""
                                        }}
                                    />
                                </GridItem>

                                    <GridItem xs={12} sm={12} md={4}>

                                    <CustomInput
                                        labelText="Adress Line 2"
                                        id="Salutation"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: ""
                                        }}
                                    />
                                </GridItem>


                                    <GridItem xs={12} sm={12} md={4}>

                                    <CustomInput
                                        labelText="Adress Line 3"
                                        id="Salutation"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: ""
                                        }}
                                    />
                                </GridItem>

                                    <GridItem xs={12} sm={12} md={4}>

                                    <CustomInput
                                        labelText="Postal Code | City"
                                        id="Salutation"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: ""
                                        }}
                                    />
                                </GridItem>


                                    <GridItem xs={3} xs={12} sm={12} md={4}>

                                    <CustomInput
                                        labelText="District"
                                        id="Salutation"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: ""
                                        }}
                                    />
                                </GridItem>



                                    <GridItem xs={12} sm={12} md={4}>

                                    <CustomInput
                                        labelText="Province"
                                        id="Salutation"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: ""
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>



                        </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer></div>

        );
    }
}

export default withStyles(regularFormsStyle)(ProspectInformation);
