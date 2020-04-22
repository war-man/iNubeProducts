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
import CustomDateTimePicker from "components/CustomDateTimePicker/DateTimePicker.jsx";

const ClaimBankDetails = (props) => {
    const claimDetailsprops = props.claimDetailsprops;
    const claimDetailsFun = props.claimDetailsFun;
    const Bankarray = props.claimDetailsprops.Bankarray;
    console.log("props.ClaimStatusData", props);
    console.log("props.ClaimStatusData", props.key);
  
   const renderPage1 = (Bankfieldsmodel, name) => {
        if (Bankfieldsmodel.UIControl == "TextField") {
            return (<CustomInput
                labelText={Bankfieldsmodel.Name}
                //  required={true}
                name={Bankfieldsmodel.Name}
                value={Bankfieldsmodel.Value}
                onChange={(e) => claimDetailsFun.onModelChange(e, name)}
                formControlProps={{ fullWidth: true }}
            />

            );


        }
        else if (Bankfieldsmodel.UIControl == "Datetime") {
            return (
                < CustomDateTimePicker
                    timeformate={true}
                    disabled={false}
                    width='13rem'
                    //required={true}
                    minDate={claimDetailsprops.ClaimIntemationDate}
                    maxDate={new Date()}
                    //minDate={new Date(this.state.claimDetailsData.lossDate)}
                    disableFuture={true}
                    labelText={Bankfieldsmodel.Name}
                    name={Bankfieldsmodel.Name}
                    value={Bankfieldsmodel.Value}
                    onChange={(event) => claimDetailsFun.onDateChange('datetime', "Bankfieldsmodel", Bankfieldsmodel.Name, name, event)         }
       />
            );
        }
        else if (Bankfieldsmodel.UIControl == "Dropdown") {

            return (
                <MasterDropdown
                    // required={true}
                    labelText={Bankfieldsmodel.Name}
                    // id="Type"
                    lstObject={claimDetailsprops.AccountTypedata}
                    filterName='Account Type'
                    value={Bankfieldsmodel.Value}
                    name={Bankfieldsmodel.Name}
                    onChange={(e) => claimDetailsFun.onModelChange(e, name)}
                    formControlProps={{ fullWidth: true }}
                />

            );


        }

    }

    return (
        <div>
            {Bankarray.length > 0 ?
                <GridContainer>
                    {Bankarray.map((item, key) =>
                        <GridContainer >
                            {claimDetailsprops.displaycust == true ?
                                <GridContainer lg={12}>
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
                                        </GridContainer>

                                    {
                                        item.BankDetails.map(m =>
                                            <GridItem xs={8} sm={5} md={3}>
                                                {renderPage1(m, item.name)}

                                            </GridItem>
                                        )
                                    }
                                </GridContainer>
                                :
                                <GridContainer lg={12}>
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
                                    </GridContainer>

                                    {
                                        item.BankDetails.map(m =>
                                            <GridItem xs={8} sm={5} md={3}>
                                                {renderPage1(m, item.name)}

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
