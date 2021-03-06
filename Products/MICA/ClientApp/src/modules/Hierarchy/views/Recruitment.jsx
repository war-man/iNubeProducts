﻿import React from "react";
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
import ReactTable from "components/MuiTable/MuiTable.jsx";
import Accordion from "components/Accordion/Accordion.jsx";
import ProspectRecruitment from './ProspectRecruitment.jsx';
import InterviewRecruitment from './InterviewRecruitment.jsx';










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

class Recruitment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            retainFlag: false,

        }
    };


    retainFun = () => {
        this.setState({ retainFlag: false });
    };
    distributeFun = () => {
        this.setState({ retainFlag: true });
    };

    ProspectFunction = () => {
       
        return (
            <GridItem xs={12}>
                        <Accordion
                            collapses={
                                [{
                                    title: " Prospect",
                            content: <ProspectRecruitment />
                                }]
                            }
                        />     
            </GridItem>
        )
    };
    InterviewFunction = () => {
       
        return (
            <GridItem xs={12}>
                <Accordion
                    collapses={
                        [{
                            title: "Interview",
                            content: <InterviewRecruitment />
                        }]
                    }
                />
            </GridItem>
        )
    };
   

    render() {

        const { classes } = this.props;

        return (
            <div>
                    <GridContainer>
                        <GridContainer justify="center">
                        <GridItem xs={3} sm={3} md={3}>
                            <Button color="warning" onClick={this.retainFun} round>Retain</Button>

                        </GridItem>
                        <GridItem xs={3} sm={3} md={3}>
                            <Button color="warning" onClick={this.distributeFun} round>Distribute</Button>

                        </GridItem>
                    </GridContainer>

                    {this.state.retainFlag && <GridContainer>

                        {this.ProspectFunction()
                        }
                        {this.InterviewFunction()
                        }

                    </GridContainer>}
                        

                    </GridContainer>
                  
                        
</div>


        );
    }
}
export default withStyles(style)(Recruitment);