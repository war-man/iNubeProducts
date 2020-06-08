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
import lead from "assets/img/man-user.png";
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import ArrowForward from '@material-ui/icons/ArrowForward';
import ReactTable from "react-table";





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

class PersonalDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showtable: false,

        }
    };


    tableshow = () => {
        this.setState({ showtable: true });
    };

    render() {

        const { classes } = this.props;

        return (
            <Card>
                <CardHeader color="rose" icon>
                    {/*  <CardIcon color="rose">
                       

                        <Icon><img id="icon" src={searchproduct} /></Icon> 

                    </CardIcon>  */}
                    <h4 className={this.props.cardIconTitle}>
                        <small> Personal Details </small>
                    </h4>
                </CardHeader>
                <CardBody>
                    <GridContainer>

                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="Name"
                                 name="name"
                                value={this.props.personalDet.staffName}
                                //  onChange={(e) => this.SetValue("office", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="Code"
                                 name="code"
                                value={this.props.personalDet.staffCode}
                                //  onChange={(e) => this.SetValue("office", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="Branch"
                                // name="mobileNumber"
                                // value={this.state.ClaimDTO.mobileNumber}
                                //  onChange={(e) => this.SetValue("office", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="Designation"
                                // name="mobileNumber"
                                // value={this.state.ClaimDTO.mobileNumber}
                                //  onChange={(e) => this.SetValue("office", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="Date Of Appointment"
                                // name="mobileNumber"
                                // value={this.state.ClaimDTO.mobileNumber}
                                //  onChange={(e) => this.SetValue("office", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="Last Action"
                                // name="mobileNumber"
                                // value={this.state.ClaimDTO.mobileNumber}
                                //  onChange={(e) => this.SetValue("office", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>
                    </GridContainer>
                  
                        

                </CardBody>
            </Card>


        );
    }
}
export default withStyles(style)(PersonalDetails);