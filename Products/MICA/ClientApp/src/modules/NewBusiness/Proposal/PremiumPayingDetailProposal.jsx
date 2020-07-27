import React from "react";
import FilterNone from "@material-ui/icons/FilterNone";

// @material-ui/core components
import Dropdown from "components/Dropdown/Dropdown.jsx";
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

class PremiumPayingDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            PremiumPaymentMethod: "",
            PaymentPaidBy: "",
            Proposer: "",
         
        };
    }
    render() {

        const { classes } = this.props;


        console.log("premiumpaymentmethod", this.props.MasterDataDto, this.props);

        return (
           
                    <CardBody>
                       
                        <GridContainer xl={12}>
                            <GridItem xs={12} sm={4} md={3}>

                        <MasterDropdown
                                    required={true}
                                    labelText="Premium Payment Method"
                                    lstObject={this.props.MasterDataDto}
                                    filterName='PaymentMethod'
                                    value={this.props.premiumPayingDto.premiumPaymentMethod}
                                    name='premiumPaymentMethod'
                                    onChange={(e) => this.props.PremiumPaymentSetValue(e)}
                                    formControlProps={{ fullWidth: true }}
                                />
                            </GridItem>
                        
                             <GridItem xs={12} sm={4} md={3}>

                        <MasterDropdown
                                required={true}
                                labelText=" Payment Paid By"
                                lstObject={this.props.MasterDataDto}
                                //filterName='PaymentMethod'
                                value={this.props.premiumPayingDto.paymentPaidBy}
                                name='paymentPaidBy'
                                onChange={(e) =>this.props.PremiumPaymentSetValue(e)}
                                formControlProps={{ fullWidth: true }}
                            />
                        </GridItem>

                           
                        <GridItem xs={12} sm={4} md={3}>
                                
                                <CustomInput
                                    labelText="If other, please specify"
                                    value={this.props.premiumPayingDto.Relationshipwithproposer}
                                    name="Relationshipwithproposer"
                                    onChange={(e) => this.props.PremiumPaymentSetValue(e)}
                                    id="Proposer"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                        </GridItem>
                       
                          <GridItem xs={12} sm={4} md={3}>

                            <CustomInput
                                labelText="Payment Recipt Prefered By"
                                value={this.props.premiumPayingDto.paymentRecieptPreferredBy}
                                name="paymentRecieptPreferredBy"
                            onChange={(e) => this.props.PremiumPaymentSetValue(e)}
                                id="Proposer"
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>
                           
                        <GridItem xs={12} sm={4} md={4}>

                                <CustomInput
                                    labelText="Total Annual Premium Contribution"
                                    value={this.props.premiumPayingDto.totalAnnualPremium}
                                    name="totalAnnualPremium"
                            onChange={(e) => this.props.PremiumPaymentSetValue(e)}
                                    id="AnnualPremium"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                        <GridItem xs={12} sm={4} md={3}>

                                <CustomInput
                                    labelText="Proposer Deposit Premium"
                                    value={this.props.premiumPayingDto.proposalDepositPremium}
                                    name="proposalDepositPremium"
                            onChange={(e) => this.props.PremiumPaymentSetValue(e)}
                                    id="ProposerDepositPremium"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            </GridContainer>
                      

                <CardHeader color="rose" icon>
                    

                    {
                        
                        <h2>Your Bank Account and credit card details</h2>
                       
                    }
                </CardHeader>

                                
                            <GridContainer xl={12}>
                        <GridItem xs={12} sm={4} md={3}>

                                <CustomInput
                                    labelText="Bank Account No"
                                    value={this.props.premiumPayingDto.bankAccNo}
                                    name="bankAccNo"
                            onChange={(e) => this.props.PremiumPaymentSetValue(e)}
                                    id="BankAccountNo"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>

                        <GridItem xs={12} sm={4} md={3}>

                                <CustomInput
                                    labelText="Name Of Bank/Branch"
                                    value={this.props.premiumPayingDto.nameOfBranch}
                                    name="nameOfBranch"
                            onChange={(e) => this.props.PremiumPaymentSetValue(e)}
                                    id="NameOfBankBranch"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>

                           
                        <GridItem xs={12} sm={4} md={3}>
                                <CustomInput
                                    labelText="Credit Card No"
                                    value={this.props.premiumPayingDto.creditCardNo}
                                    name="creditCardNo"
                            onChange={(e) => this.props.PremiumPaymentSetValue(e)}
                                    id="CreditCardNo"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>

                        <GridItem xs={12} sm={4} md={3}>
                                <CustomInput
                                    labelText="Name Of Bank"
                                    value={this.props.premiumPayingDto.nameOfBank}
                                    name="nameOfBank"
                            onChange={(e) => this.props.PremiumPaymentSetValue(e)}
                                    id="NameOfBank"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                         </GridContainer>     
                    
                         </CardBody>

           

        );
    }
}
export default withStyles(style)(PremiumPayingDetails);