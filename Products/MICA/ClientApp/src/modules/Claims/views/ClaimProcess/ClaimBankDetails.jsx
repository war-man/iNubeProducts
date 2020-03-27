import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';

// @material-ui/core components

// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";
// @material-ui/icons
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Icon from "@material-ui/core/Icon";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import ruleconfig from 'modules/RuleEngine/RuleConfig.js';
//import config from '../../../../config.js';
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import $ from 'jquery';
import Dropdown from "components/Dropdown/Dropdown.jsx";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";

const ClaimBankDetails = (props) => {
    const claimDetailsprops = props.claimDetailsprops;
    const Bankarray = props.claimDetailsprops.Bankarray;
    console.log("props.ClaimStatusData", props);
    console.log("props.ClaimStatusData", props.key);
    return (
        <div>
            {Bankarray.length > 0 ?
                <GridContainer>
                    {Bankarray.map((item, key) =>
                        <GridContainer >
                            {claimDetailsprops.displaycust == true ?
                                <GridContainer lg={12}>
                                    <GridItem lg={12}>
                                        <CardHeader color="info" icon >
                                            {
                                                <h3 >
                                                    <small> {item.name}&nbsp;<TranslationContainer translationKey="BankDetails" /></small>
                                                </h3>
                                            }
                                        </CardHeader>
                                    </GridItem>
                                    {
                                        item.BankDetails.map(m =>
                                            <GridItem xs={8} sm={5} md={3}>
                                                {claimDetailsprops.renderPage1(m, item.name)}

                                            </GridItem>
                                        )
                                    }
                                </GridContainer>
                                :
                                <GridContainer lg={12}>
                                    <GridItem lg={12}>
                                        <CardHeader color="info" icon >
                                            {
                                                <h3 >
                                                    <small> {item.name}&nbsp;<TranslationContainer translationKey="BankDetails" /></small>
                                                </h3>
                                            }
                                        </CardHeader>
                                    </GridItem>

                                    {
                                        item.BankDetails.map(m =>
                                            <GridItem xs={8} sm={5} md={3}>
                                                {claimDetailsprops.renderPage(m, item.name)}

                                            </GridItem>
                                        )
                                    }
                                </GridContainer>
                            }

                        </GridContainer>
                    )}
                </GridContainer>
                : null}
        </div >
    );
}
export default ClaimBankDetails;
