import React from "react";
// @material-ui/icons
//import Settings from "@material-ui/icons/Settings";
//import ChromeReader from "@material-ui/icons/ChromeReaderMode";
//import Extension from "@material-ui/icons/Extension";
import PropTypes from 'prop-types';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Wizard from "components/Wizard/Wizard.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import ProductConfigIcon from "assets/img/pro-config.png";
import Insurables from "./Covers/_Insurables.jsx";
import Covers from "./Covers/_Covers.jsx";
import Benefits from "./Covers/_Benefits.jsx";
import Premium from "./Covers/_Premium.jsx";
import Clauses from "./Clauses/_Clauses.jsx";
import ProductClauses from "./Clauses/_ProductClauses.jsx";
import Channels from "./Others/_Channels.jsx";
import Claims from "./Others/_Claims.jsx";
import Risks from "./Others/_Risks.jsx";
import Payment from "./Others/Payment.jsx";
import SwitchONParameter from "./Others/_SwtichPage.jsx";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import ProductSave from "./_ProductSave.jsx";
import { Transform } from "stream";
import Accordion from "components/Accordion/Accordion.jsx";
import ChromeReader from "@material-ui/icons/ChromeReaderMode";
//import ChromeReader from "@material-ui/icons/ChromeReaderMode";

import Extension from "@material-ui/icons/Widgets";
import { Animated } from "react-animated-css";
import AddCover from "./_AddCover.jsx";
import { withStyles } from "@material-ui/styles";

import Cover from "@material-ui/icons/VerifiedUser";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

//const useStyles = makeStyles(theme => ({
//    root: {
//        marginTop: "20px",
//        paddingLeft: "0",
//        marginBottom: "0",
//        overflow: "visible !important",
//        //backgroundColor: "#f4f4f4"
//    },
//    fixed: {
//        overflowX: "visible"
//    },
//    displayNone: {
//        display: "none !important"
//    },
//}));

const MyTab = withStyles(theme => ({
    root: {
        backgroundColor: "#ccc",
        // borderRadius: theme.shape.borderRadius
    },
    wrapper: {
        backgroundColor: "#ddd",
        //padding: theme.spacing(2),
        //borderRadius: theme.shape.borderRadius
    },
    selected: {
        color: "#FFFFFF",
        backgroundColor: "#2e6e9a",
        boxShadow: "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(0, 0, 0, 0.42)"
    }
}))(Tab);


const ProductDetails = (props) => {
    console.log("my props", props);
    console.log("productDetails clauses", props.clauses);

    //const [addinusrable, addinsurablefun] = React.useState([{
    //    title: ((props.productInsurableItemList.length>0)?props.productInsurableItemList[0].insurableCategoryId:"pk"),content: <AddCover props={props}  />
    //}]);
    const [addinusrable, addinsurablefun] = React.useState([]);
    // const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div >
            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                <Card className="productDetails">
                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                            {/*  <FilterNone /> */}
                            <Icon><img id="icon" src={ProductConfigIcon} /></Icon>
                        </CardIcon>
                        {
                            <h4 className={props.cardIconTitle}>
                                <small>Coverages</small>
                            </h4>
                        }
                    </CardHeader>
                    <CardBody>
                        <Insurables props={props} />


                    </CardBody>

                </Card>
            </Animated>
            <Card className="productDetails">
                <CardBody>
                    <GridContainer>
                        <GridItem xs={3}>
                            <Tabs
                                orientation="vertical"
                                variant="scrollable"
                                scrollButtons="on"
                                //indicatorColor="primary"
                                //textColor="primary"
                                value={value}
                                onChange={handleChange}
                                aria-label="Vertical tabs example"
                            //className={classes.tabs}
                            >
                                <MyTab label="Coverage"
                                    icon={<Cover />}
                                    {...a11yProps(0)}
                                />
                                <MyTab label="Clauses"
                                    icon={<ChromeReader />}
                                    {...a11yProps(1)}
                                />
                                <MyTab label="Others"
                                    icon={<Extension />}
                                    {...a11yProps(2)}
                                />
                            </Tabs>
                        </GridItem>
                        <GridItem id="wizard-grid" xs={9}>
                            <TabPanel value={value} index={0}>
                                <Wizard id="proWiz"

                                    validate
                                    steps={[

                                        { stepName: "C/W/E", stepComponent: ProductClauses, stepId: "ProductClauses", stepData: props },
                                     
                                        { stepName: "Premium", stepComponent: Premium, stepId: "premium", stepData: props },

                                    ]}
                                    title=""
                                    subtitle=""
                                // onLoadData={props.ProductDTO}
                                />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <Wizard
                                    validate
                                    steps={[
                                        { stepName: "Channels", stepComponent: Channels, stepId: "Channels", stepData: props },
                                        { stepName: "Risk Parameters", stepComponent: Risks, stepId: "Risk", stepData: props },
                                        { stepName: "Claim Parameters", stepComponent: Claims, stepId: "Claims", stepData: props },
                                    ]}
                                    title=""
                                    subtitle=""
                                />
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                          
                                    <Wizard
                                        validate
                                    steps={(props.ProductDTO.ProductDTO.isMasterPolicy == true) ? [
                                        { stepName: "Payment", stepComponent: Payment, stepId: "Risk", stepData: props },
                                        { stepName: "Policy Basic Feature", stepComponent: Claims, stepId: "Claims", stepData: props },
                                      //  { stepName: "SwitchONParameter", stepComponent: SwitchONParameter, stepId: "SwitchONParameter", stepData: props },

                                        ]: [
                                            { stepName: "Payment", stepComponent: Payment, stepId: "Risk", stepData: props },
                                            { stepName: "Policy Basic Feature", stepComponent: Claims, stepId: "Claims", stepData: props },
                                             

                             ]}
                                        title=""
                                        subtitle=""
                                    />
                           
                            </TabPanel>
                           
                        </GridItem>
                    </GridContainer>


                </CardBody>

            </Card>
      


            {/* <div >
          
            <Card className="productDetails">
                <CardBody>
                
                        <Wizard //id="proWiz"
                            validate
                            steps={(props.ProductDTO.ProductDTO.isMasterPolicy == true) ?[

                                { stepName: "C/W/E", stepComponent: ProductClauses, stepId: "ProductClauses", stepData: props },
                                { stepName: "Channels", stepComponent: Channels, stepId: "Channels", stepData: props },
                                { stepName: "Premium", stepComponent: Premium, stepId: "premium", stepData: props },

                                { stepName: "Risk Parameters", stepComponent: Risks, stepId: "Risk", stepData: props },
                                { stepName: "Claim Parameters", stepComponent: Claims, stepId: "Claims", stepData: props },
                                //{ stepName: "SwitchONParameter", stepComponent: SwitchONParameter, stepId: "SwitchONParameter", stepData: props },
                               

                            ] : [
                                    { stepName: "C/W/E", stepComponent: ProductClauses, stepId: "ProductClauses", stepData: props },
                                    { stepName: "Channels", stepComponent: Channels, stepId: "Channels", stepData: props },
                                    { stepName: "Premium", stepComponent: Premium, stepId: "premium", stepData: props },

                                    { stepName: "Risk Parameters", stepComponent: Risks, stepId: "Risk", stepData: props },
                                    { stepName: "Claim Parameters", stepComponent: Claims, stepId: "Claims", stepData: props },
                                   

                                ]}
                            title=""
                            subtitle=""

                        /> 

                </CardBody>

            </Card>
        </div>*/}
</div >
    );

}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
export default ProductDetails;