import React from "react";
import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import {Animated} from "react-animated-css";
const Premium = (props) => {
    // const { classes } = this.props;
    const premiumData = props.componentData;
    
    return (
<Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
        <GridContainer>
            <GridItem xs={3} sm={3} md={2}>
                <MasterDropdown required={true} labelText="Currency" disabled={premiumData.viewdisable} lstObject={premiumData.masterList} filterName='Currency' value={premiumData.ProductDTO.productPremium.currencyId} name='currencyId' onChange={(event) => premiumData.SetValue("productPremium", event)} formControlProps={{ fullWidth: true }} />
                    {premiumData.errormessage && (premiumData.ProductDTO.productPremium.currencyId === "") ? <p className="error">This Field is Required</p> : null}
            </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                        labelText="Premium Amount"
                        required={true}
                        id="gstnumber"
                        type="numeric"
                        inputType="number"
                        value={premiumData.ProductDTO.productPremium.premiumAmount}
                        name="premiumAmount"
                        onBlur={() => premiumData.onBlur('productPremium')}
                    onChange={(e) => premiumData.SetValue('productPremium', e)}
                    disabled={premiumData.viewdisable}
                        formControlProps={{
                            fullWidth: true
                        }}
                />
                    {premiumData.errormessage && (premiumData.ProductDTO.ProductDTO.premiumAmount>0) ? <p className="error">This Field is Required</p> : null}
                    {premiumData.premiumerror && <p className="error">Premium Amount can not more then Benefit Amount</p>}
                </GridItem>
            </GridContainer>
            </Animated>
        );
    }

export default Premium;