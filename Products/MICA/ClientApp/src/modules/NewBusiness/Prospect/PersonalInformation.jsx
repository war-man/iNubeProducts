
import React from "react";
// @material-ui/icons
import PropTypes from "prop-types";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import profileDetails from "assets/img/profile-details.png";
import Icon from "@material-ui/core/Icon";
import { withStyles } from '@material-ui/core/styles';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Switch from "@material-ui/core/Switch";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
//import ProspectInfo from "./_ProspectInfo"; 
import InputAdornment from "@material-ui/core/InputAdornment";
import PermIdentity from "@material-ui/icons/PermIdentity";
import Button from "components/CustomButtons/Button.jsx";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import ChromeReader from "@material-ui/icons/ChromeReaderMode";
import { Animated } from "react-animated-css";

import Datetime from "react-datetime";
import { max } from "moment";
import CommonModify from 'modules/NewBusiness/Lead/CommonModify.jsx';
import ReactTable from 'components/MuiTable/MuiTable.jsx';
import Wizard from "components/Wizard/Wizard.jsx";
import ProductSelection from 'modules/NewBusiness/Prospect/ProductSelection.jsx';




const ProsptInformation = (props) => {

    let classes = props.classes;
    console.log("PersnInfo", props, props.componentData, props.newChildData);

    return (
        <div>
           
            <GridContainer>
               

                            <GridItem xs={12} sm={12} md={3}>
                                <CustomInput
                                    required={true}
                                   success={props.componentData.firstNameState === "success"}
                                    error={props.componentData.firstNameState === "error"}
                                    labelText="Given Name"
                                    id="givenName"
                                    name="firstName"
                                    value={props.componentData.LeadDTO[0].firstName}
                                   // value={props.LeadDTO[0].firstName}
                                 //   onChange={(e) => props.componentData.SetValue("string", e)}
                                    formControlProps={{
                                        fullWidth: true
                                    }} />
                                                              
                            </GridItem>
                            <GridItem xs={12} sm={12} md={3}>
                                <CustomDatetime
                                    required={true}
                                    success={props.componentData.dateOfBirthState === "success"}
                                    error={props.componentData.dateOfBirthState === "error"}
                                    value={props.componentData.LeadDTO[0].dateOfBirth}
                                    labelText="Date Of Birth"
                                    id='dob'
                                    name='dateOfBirth'
                                   // onChange={(e) => props.onDateChange("date", "dateOfBirth", e)}
                                    formControlProps={{ fullWidth: true }} />
                                
                            </GridItem>

                            <GridItem xs={12} sm={12} md={3}>
                                <CustomInput
                                    required={true}
                                    success={props.componentData.ageState === "success"}
                                    error={props.componentData.ageState === "error"}
                                    labelText="Age"
                                    id="age"
                                    name="age"
                                    value={props.componentData.LeadDTO[0].age}
                                   // onChange={(e) => props.SetValue("string", e)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                                

                            </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                        required={true}
                 
                        labelText="Number Of Children"
                        id="NoOfChildren"
                        name="NoOfchild"
                        value={props.componentData.ChildDTO.NoOfchild}
                        onChange={(e) => props.componentData.SetValueChild("string", e)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />


                </GridItem>
  
                
            </GridContainer> 
            <GridContainer xl={12}>
                <GridItem xs={12}>
                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>

                        <ReactTable
                            data={props.componentData.newChildData}
                            filterable
                            columns={[
                                //{
                                //    Header: "No  ",
                                //    accessor: "No",
                                //    minWidth: 30,
                                //    style: { textAlign: "center" },
                                //    headerClassName: 'react-table-center',
                                //    resizable: false,

                                //},
                                
                                {
                                    Header: "NAME  ",
                                    accessor: "NAME",
                                    //accessor: "childName",
                                    minWidth: 30,
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    resizable: false,

                                }, {
                                    Header: "DOB",
                                    accessor: "DOB",
                                    //accessor: "childDob",
                                    minWidth: 30,
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    resizable: false,

                                },
                                {
                                    Header: "AGE AT NEXT BIRTHDAY ",
                                    accessor: "Age",
                                   // accessor: "childAge",
                                    minWidth: 30,
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    resizable: false,

                                },
                                {
                                    Header: "RELATIONSHIP",
                                    accessor: "Relationship",
                                    minWidth: 30,
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    resizable: false,

                                }
                            ]}
                            defaultPageSize={5}
                            showPaginationTop={false}
                            pageSize={([props.componentData.newChildData.length + 1] < 5) ? [props.componentData.newChildData.length + 1] : 5}
                            showPaginationBottom
                            className="-striped -highlight"
                        />


                    </Animated>
                </GridItem>
            </GridContainer>

                   

        </div>


           ) }

export default ProsptInformation;


