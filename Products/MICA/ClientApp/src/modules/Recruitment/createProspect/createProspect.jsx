import React from "react";
import FilterNone from "@material-ui/icons/FilterNone";

// @material-ui/core components

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

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import AddProduct from "modules/Partners/Partner/views/_AddProduct.jsx";
import Button from "components/CustomButtons/Button.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import searchproduct from "assets/img/search-product.png";
import Icon from "@material-ui/core/Icon";
import $ from 'jquery';
import CustomDropdown from "../../../components/CustomDropdown/CustomDropdown";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import user from "assets/img/user.png";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import { Animated } from "react-animated-css";

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

const submitBtn = {
    height: "35px",
    marginTop: "-10px"
}

class CreateProspect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            FirstName: "",
            MiddleName: "",
            LastName: "",
            Mobile: "",
            Email: "",
        };
    }
    render() {

        const { classes } = this.props;

        return (
            <div>
                
                
                    <Card>

                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                                <Icon><img id="icon" src={user} /></Icon>
                            </CardIcon>
                            {
                                <GridItem>
                                    <h4>Create Prospect</h4>


                                </GridItem>
                            }
                        </CardHeader>

                        <cardBody>
                        </cardBody>

                        <CardHeader color="rose" icon>

                            {
                                <GridItem>
                                    <h4>Personal Details</h4>


                                </GridItem>
                            }
                        </CardHeader>


                        <CardBody>

                            <GridContainer>

                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        success={this.FirstNameState === "success"}
                                        error={this.FirstNameState === "error"}
                                        labelText="First Name"
                                        name="FirstName"
                                        required={true}
                                        onChange={(e) => this.detailsChange("string", e)}
                                        value={this.FirstName}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>

                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Middle Name"
                                        //value={props.ProductDTO.ProductName}
                                        name="MiddleName"
                                        //onChange={props.SetValue}
                                        id="MiddleName"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        success={this.LastNameState === "success"}
                                        error={this.LastNameState === "error"}
                                        labelText="Last Name"
                                        name="LastName"
                                        required={true}
                                        onChange={(e) => this.detailsChange("string", e)}
                                        value={this.LastName}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="NIC"
                                        //value={props.ProductDTO.ProductName}
                                        name="NIC"
                                        //onChange={props.SetValue}
                                        id="NIC"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>

                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomDatetime required={true} onFocus={this.onClick} validdate={this.validdate} labelText="Date Of Birth" id='dob' name='dob' onChange={(evt) => this.onDateChange('datetime', 'ProductDTO', 'activeFrom', evt)} formControlProps={{ fullWidth: true }} />
                                </GridItem>


                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        success={this.Age === "success"}
                                        error={this.Age === "error"}
                                        labelText="Age "
                                        name="Age"
                                        required={true}
                                        onChange={(e) => this.detailsChange("string", e)}
                                        value={this.Age}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>


                                <GridItem xs={4}>
                                    <FormControl id="form-btm"

                                        fullWidth
                                        className={classes.selectFormControl}
                                    >
                                        <InputLabel
                                            htmlFor="simple-select"
                                            className={classes.selectLabel}
                                        >
                                            Gender
                                             </InputLabel>
                                        <Select
                                            MenuProps={{
                                                className: classes.selectMenu
                                            }}
                                            classes={{
                                                select: classes.select
                                            }}
                                            value={this.simpleSelect}
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
                                                Select
                            </MenuItem>
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected
                                                }}
                                                value="2"
                                            >
                                                Male
                            </MenuItem>
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected
                                                }}
                                                value="3"
                                            >
                                                Female
                            </MenuItem>
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected
                                                }}
                                                value="4"
                                            >
                                                Transgender
                            </MenuItem>



                                        </Select>
                                    </FormControl>
                                </GridItem>


                                <GridItem xs={4}>
                                    <FormControl id="form-btm"
                                        success={this.PresentProfession === "success"}
                                        error={this.PresentProfession === "error"}
                                        fullWidth
                                        className={classes.selectFormControl}
                                    >
                                        <InputLabel
                                            htmlFor="simple-select"
                                            className={classes.selectLabel}
                                        >
                                            Present Profession
                                             </InputLabel>
                                        <Select
                                            MenuProps={{
                                                className: classes.selectMenu
                                            }}
                                            classes={{
                                                select: classes.select
                                            }}
                                            value={this.simpleSelect}
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
                                                Select
                            </MenuItem>
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected
                                                }}
                                                value="2"
                                            >
                                                Governmet Sector
                            </MenuItem>
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected
                                                }}
                                                value="3"
                                            >
                                                Private Sector
                            </MenuItem>

                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected
                                                }}
                                                value="4"
                                            >
                                                Owned Business
                            </MenuItem>

                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected
                                                }}
                                                value="5"
                                            >
                                                Others
                            </MenuItem>


                                        </Select>
                                    </FormControl>
                                </GridItem>

                                <GridItem xs={4}>
                                    <FormControl id="form-btm"
                                        success={this.NeedOfIncome === "success"}
                                        error={this.NeedOfIncome === "error"}
                                        fullWidth
                                        className={classes.selectFormControl}
                                    >
                                        <InputLabel
                                            htmlFor="simple-select"
                                            className={classes.selectLabel}
                                        >
                                            Need Of Income
                                             </InputLabel>
                                        <Select
                                            MenuProps={{
                                                className: classes.selectMenu
                                            }}
                                            classes={{
                                                select: classes.select
                                            }}
                                            value={this.simpleSelect}
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
                                                Select
                            </MenuItem>
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected
                                                }}
                                                value="2"
                                            >
                                                To Build a House
                            </MenuItem>
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected
                                                }}
                                                value="3"
                                            >
                                                To Buy a Motorcycle
                            </MenuItem>

                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected
                                                }}
                                                value="4"
                                            >
                                                To Buy a Car
                            </MenuItem>

                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected
                                                }}
                                                value="5"
                                            >
                                                To Educate Children
                            </MenuItem>


                                        </Select>
                                    </FormControl>
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                    </Card>

                    <Card className="assignCard">

                        <CardHeader color="rose" icon>

                            {
                                <h4 >
                                    <small>Phone And Email </small>
                                </h4>
                            }
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        success={this.Mobile1 === "success"}
                                        error={this.Mobile1 === "error"}
                                        labelText="Mobile1"
                                        name="Mobile1"
                                        required={true}
                                        onChange={(e) => this.detailsChange("string", e)}
                                        value={this.Mobile1}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={4}>
                                    <CustomInput
                                        labelText="Mobile2"
                                        //value={props.ProductDTO.ProductName}
                                        name="Mobile2"
                                        //onChange={props.SetValue}
                                        id="Mobile2"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={4}>
                                    <CustomInput
                                        labelText="OfficeNo"
                                        //value={props.ProductDTO.ProductName}
                                        name="Office No"
                                        //onChange={props.SetValue}
                                        id="OfficeNo"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={4}>
                                    <CustomInput
                                        labelText="ResidenceNo"
                                        //value={props.ProductDTO.ProductName}
                                        name="Residence No"
                                        //onChange={props.SetValue}
                                        id="ResidenceNo"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>




                                <GridItem xs={12} sm={4}>
                                    <CustomInput
                                        labelText="E-Mail"
                                        //value={props.ProductDTO.ProductName}
                                        name="Email"
                                        //onChange={props.SetValue}
                                        id="Email"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                    </Card>
                    <Card className="assignCard">
                        <CardHeader color="rose" icon>

                            {
                                <h4 >
                                    <small> Communication Address </small>
                                </h4>
                            }
                        </CardHeader>
                        <CardBody>
                            <GridContainer>

                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        success={this.AddressLine1 === "success"}
                                        error={this.AddressLine1 === "error"}
                                        labelText="Address Line1"
                                        name="AddressLine1"
                                        required={true}
                                        onChange={(e) => this.detailsChange("string", e)}
                                        value={this.AddressLine1}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={4}>
                                    <CustomInput
                                        labelText="Address Line2"
                                        //value={props.ProductDTO.ProductName}
                                        name="AddressLine2"
                                        //onChange={props.SetValue}
                                        id="AddressLine2"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>

                                <GridItem xs={4}>
                                    <FormControl id="form-btm"

                                        success={this.Province === "success"}
                                        error={this.Province === "error"}
                                        fullWidth
                                        className={classes.selectFormControl}
                                    >
                                        <InputLabel
                                            htmlFor="simple-select"
                                            className={classes.selectLabel}
                                        >
                                            Province
                                             </InputLabel>
                                        <Select
                                            MenuProps={{
                                                className: classes.selectMenu
                                            }}
                                            classes={{
                                                select: classes.select
                                            }}
                                            value={this.simpleSelect}
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
                                                Central Province
                            </MenuItem>
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected
                                                }}
                                                value="2"
                                            >
                                                Eastern Province
                            </MenuItem>
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected
                                                }}
                                                value="3"
                                            >

                                                North Central Province
                            </MenuItem>

                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected
                                                }}
                                                value="4"
                                            >Northern Province
                            </MenuItem>

                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected
                                                }}
                                                value="5"
                                            >
                                                North Western Province
                            </MenuItem>


                                        </Select>
                                    </FormControl>
                                </GridItem>

                                <GridItem xs={4}>
                                    <FormControl id="form-btm"

                                        success={this.District === "success"}
                                        error={this.District === "error"}
                                        fullWidth
                                        className={classes.selectFormControl}
                                    >
                                        <InputLabel
                                            htmlFor="simple-select"
                                            className={classes.selectLabel}
                                        >
                                            District
                                             </InputLabel>
                                        <Select
                                            MenuProps={{
                                                className: classes.selectMenu
                                            }}
                                            classes={{
                                                select: classes.select
                                            }}
                                            value={this.simpleSelect}
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

                                            </MenuItem>




                                        </Select>
                                    </FormControl>
                                </GridItem>
                                <GridItem xs={4}>
                                    <FormControl id="form-btm"

                                        success={this.CityTown === "success"}
                                        error={this.CityTown === "error"}
                                        fullWidth
                                        className={classes.selectFormControl}
                                    >
                                        <InputLabel
                                            htmlFor="simple-select"
                                            className={classes.selectLabel}
                                        >
                                            City/Town
                                             </InputLabel>
                                        <Select
                                            MenuProps={{
                                                className: classes.selectMenu
                                            }}
                                            classes={{
                                                select: classes.select
                                            }}
                                            value={this.simpleSelect}
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

                                            </MenuItem>




                                        </Select>
                                    </FormControl>
                                </GridItem>


                                <GridItem xs={4}>
                                    <FormControl id="form-btm"

                                        success={this.ZipPinCode === "success"}
                                        error={this.ZipPinCode === "error"}
                                        fullWidth
                                        className={classes.selectFormControl}
                                    >
                                        <InputLabel
                                            htmlFor="simple-select"
                                            className={classes.selectLabel}
                                        >
                                            Zip/Pin Code
                                             </InputLabel>
                                        <Select
                                            MenuProps={{
                                                className: classes.selectMenu
                                            }}
                                            classes={{
                                                select: classes.select
                                            }}
                                            value={this.simpleSelect}
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

                                            </MenuItem>




                                        </Select>
                                    </FormControl>
                                </GridItem>




                            </GridContainer>
                            <GridContainer justify="center" >

                            </GridContainer>


                        </CardBody>
                    </Card>
                    <GridContainer justify="center">
                        <GridItem >
                            <div>

                                <Button id="submitBtn" color="info" round className={classes.marginRight} onClick={this.handleCreateSuspectdata} >
                                    Submit
                                               </Button>
                                <Button id="cancelBtn" color="info" round className={classes.marginRight} onClick={this.handleCreateSuspectdata} >
                                    Cancel
                                               </Button>

                            </div>
                        </GridItem>
                    </GridContainer>
                   
            </div>

        );
    }
}
export default withStyles(style)(CreateProspect);