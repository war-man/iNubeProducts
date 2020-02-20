import React from "react";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import ProductBasic from "views/ProductConfig/_ProductBasic.jsx";
import ProductDetails from "views/ProductConfig/_ProductDetails.jsx"

class ProductConfig extends React.Component {
    render() {
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <ProductBasic />
                        <ProductDetails />
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}
export default ProductConfig;