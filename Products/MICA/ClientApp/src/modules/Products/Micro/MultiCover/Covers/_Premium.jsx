import React from "react";
import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import CustomRadioButton from "components/CustomRadiobutton/CustomRadiobutton.jsx";
import productConfig from "../ProductConfig.jsx";
import CustomCheckbox from "components/Checkbox/CustomCheckbox";
import CalCulationResult from "./CalCulationResult.jsx"
import Button from "components/CustomButtons/Button.jsx";


const Premium = (props) => {
    // const { classes } = this.props;
    const premiumData = props.componentData;
    console.log("premiumData", props, premiumData.ProductDTO.productPremium);
    console.log("Insurabletitle P", premiumData.Insurabletitle);
    var currencylist = JSON.parse(localStorage.getItem('listdata'));
    //const category = premiumData.MasterDTO.InsurableCategory.filter(item => item.mID === data.productInsurableItems[i].insurableCategoryId)[0].mValue;
    //const Type = premiumData.MasterDTO.InsuranceType.filter(item => item.mID === data.productInsurableItems[i].insurableItemTypeId)[0].mValue;
    //<h5 className="bold-font" small>premiumData.Insurabletitle[i][0]/premiumData.Insurabletitle[i][1]</h5>) : null)}
    //  <h5 className="bold-font" small>{premiumData.MasterDTO.Cover[i][0].filter(item => item.mID == premiumData.productInsurableItem[i].productCover[j].coverTypeId)[0].mValue}</h5>) : null)}
    console.log("Data for cover master", premiumData.MasterDTO.CoverMaster);
    return (
      
        <GridContainer lg={12} style={{ position: 'relative', left: '17px' }}>

            <CustomRadioButton disabled={premiumData.viewdisable} radiolist={premiumData.radiolist} onChange={(e) => premiumData.onChangeradio(e, 'radiolist')} />
            <GridItem xs={2} sm={2} md={2}>
                <MasterDropdown required={true} labelText="Currency" disabled={premiumData.viewdisable} lstObject={premiumData.MasterDTOlist} filterName='Currency' value={(premiumData.ProductDTO.productPremium.length>0)?premiumData.ProductDTO.productPremium[0].currencyId:null} name='currencyId' onChange={(e) => premiumData.SetCoverProductDetailsValue('productPremium', e, 0, 0)} formControlProps={{ fullWidth: true }} />
                {premiumData.errormessage && (premiumData.ProductDTO.productPremium[0].currencyId === "") ? <p className="error">This Field is Required</p> : null}
            </GridItem>
            {premiumData.hideRatingCheckBox && !premiumData.viewdisable &&
                <CustomCheckbox
                    name="RatingCheckBox"
                    labelText="Rating"
                    value={premiumData.RatingCheckBox}
                    onChange={(e) => premiumData.SetRatingCheckBox(e)}
                    //disabled={(coversProductDetails.ProductDTO.ProductDTO.isCoverEvent === false) ? coversData.viewdisable : coversProductDetails.ProductDTO.ProductDTO.isCoverEvent}
                    checked={premiumData.RatingCheckBox}

                    formControlProps={{
                        fullWidth: true
                    }}

                />

            }

            {!premiumData.RatingCheckBox && premiumData.radiolist.map((data, index) => (

                premiumData.ProductDTO.productPremium.length > 0 && data.mIsRequired && premiumData.ProductDTO.productPremium.map((item, i) => (<GridContainer lg={12} >
                    <GridItem xs={2} sm={2} md={3}>
                        {((data.mValue == "Insurable Item") ? (
                            <h5 className="bold-font" small>{(premiumData.MasterDTO.InsurableTypeMaster.length > 0) ? (premiumData.MasterDTO.InsurableTypeMaster.filter(s => s.mID == premiumData.ProductDTO.productInsurableItem[i].insurableItemTypeId)[0].mValue) : ""}</h5>
                        ) : null)}
                            {((data.mValue == "Product") ? (
                            <h5 className="bold-font" small>Product</h5>) : null)}

                        {((data.mValue == "Cover") ? (

                            <h5 className="bold-font" small>{item.description}-{(premiumData.MasterDTO.CoverMaster.length > 0) ? ((premiumData.MasterDTO.CoverMaster.filter(s => s.mID == item.subLevelId)).length > 0) ? (premiumData.MasterDTO.CoverMaster.filter(s => s.mID == item.subLevelId)[0].mValue) : "" : ""}</h5>) : null)}
                    </GridItem>
                    {/* <GridItem xs={2} sm={2} md={2}>
                        <MasterDropdown required={true} labelText="Currency" disabled={premiumData.viewdisable} lstObject={premiumData.MasterDTOlist} filterName='Currency' value={premiumData.ProductDTO.productPremium[i].currencyId} name='currencyId' onChange={(e) => premiumData.SetCoverProductDetailsValue('productPremium', e, i, 0)} formControlProps={{ fullWidth: true }} />
                        {premiumData.errormessage && (premiumData.ProductDTO.productPremium[i].currencyId === "") ? <p className="error">This Field is Required</p> : null}
                    </GridItem>
                    */}
                    {!premiumData.hidepremiumAmount && <GridItem xs={12} sm={12} md={5}>
                        <CustomInput
                            labelText="Premium Amount"
                            required={true}
                         
                            onBlur={() => premiumData.onBlur(data.mValue, 'productPremium', i, premiumData.ProductDTO.productPremium[i].levelId, premiumData.ProductDTO.productPremium[i].subLevelId)}
                            id="gstnumber"
                            inputType="number" type="numeric" negative={true}
                            value={premiumData.ProductDTO.productPremium[i].premiumAmount}
                            name="premiumAmount"
                            onChange={(e) => premiumData.SetCoverProductDetailsValue('productPremium', e, i, 0)}
                            disabled={premiumData.viewdisable}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />

                        {premiumData.errormessage && (premiumData.ProductDTO.productPremium[i].premiumAmount == "") ? <p className="error">This Field is Required</p> : null}
                        {(premiumData.ProductDTO.productPremium[i].flag ) && <p className="error">Premium Amount can not more then Benefit Amount</p>}
                    </GridItem>
                    }
                </GridContainer>
                ))
            ))}
            {(premiumData.hidepremiumAmount && !premiumData.viewdisable) ? <p className="error">*Please fill Premium Amount in Benefit Level</p> : ""}
            {premiumData.RatingCheckBox && premiumData.hideRatingCheckBox && <GridItem xs={12} >
                <CalCulationResult />


                {premiumData.hideRatingCheckBox && <GridContainer>
                    <Button id="submitBtn" color="info" round onClick={premiumData.mappingPopUp}> Mapping  </Button>
                </GridContainer>}
            </GridItem>}
           

            </GridContainer>
           
    );
}

export default Premium;