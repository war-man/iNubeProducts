import React from "react";
import FilterNone from "@material-ui/icons/FilterNone";
import Dropdown from "components/Dropdown/Dropdown.jsx";
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

class CommunicationMethod extends React.Component {

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
          
                    <CardBody>
                        <GridContainer lg={12} >


                        

                        <GridItem xs={12} sm={4} md={6}>

                        <MasterDropdown
                                required={true}
                                labelText="Preferred language for Policy Document & Correspondence"
                                lstObject={this.props.MasterDataDto}
                                filterName='Language'
                                // value={orgData.selectedlevel}
                                //name='selectedlevel'
                                //onChange={(e) => orgData.handlelevels(e)}
                                formControlProps={{ fullWidth: true }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={4} md={4}>

                        <MasterDropdown
                                required={true}
                                labelText="Premium Method of Communication"
                            lstObject={this.props.MasterDataDto}
                            filterName='ModeOfCommunication'
                                // value={orgData.selectedlevel}
                                //name='selectedlevel'
                                //onChange={(e) => orgData.handlelevels(e)}
                                formControlProps={{ fullWidth: true }}
                            />
                        </GridItem>

                          
                           
                        </GridContainer>
                    </CardBody>
              


                


            

        );
    }
}
export default withStyles(style)(CommunicationMethod);