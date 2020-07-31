    
import React from "react";
// @material-ui/icons
import ChromeReader from "@material-ui/icons/ChromeReaderMode";
import leadPool from "assets/img/server.png";
import Icon from "@material-ui/core/Icon";
import CountUp from 'react-countup';
import CustomInput from "components/CustomInput/CustomInput.jsx";
import FinancialAnalysis from "./Calculator.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Wizard from "components/Wizard/Wizard.jsx";
import { Animated } from "react-animated-css";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Typography from '@material-ui/core/Typography';
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import ArrowForward from '@material-ui/icons/ArrowForward';
import lead from "assets/img/man-user.png";
import CustomCheckbox from "components/Checkbox/CustomCheckbox.jsx";
import Button from "components/CustomButtons/Button.jsx";

const ProductSelection = (props) => {
    //console.log("data of props",props);
    return (
        <div>
            <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                <GridContainer lg={12}>
                    <GridItem xs={4}>
                        <Card>
                            <CardHeader color="rose" icon>
                                <CardIcon color="rose">
                                    <Icon><img id="icon" src={lead} /></Icon>
                                </CardIcon>
                            </CardHeader>
                            <CardContent>
                                <Typography variant="h6" color="textSecondary" component="h4">
                                    Live Life
                                            </Typography>

                            </CardContent>
                            <GridContainer style={{ marginTop: "-62px" }} justify="flex-end" xs={12}>
                                <CardActions >
                                    <IconButton //onClick={this.LeadFun}
                                    >
                                        <ArrowForward />
                                    </IconButton>
                                </CardActions>
                            </GridContainer>

                        </Card>
                    </GridItem>
                    <GridItem xs={4}>
                        <Card>
                            <CardHeader color="rose" icon>
                                <CardIcon color="rose">
                                    <Icon><img id="icon" src={leadPool} /></Icon>
                                </CardIcon>
                            </CardHeader>
                            <CardContent>
                                <Typography variant="h6" color="textSecondary" component="h4">
                                   Future Protect
                                            </Typography>

                            </CardContent>
                            <GridContainer style={{ marginTop: "-62px" }} justify="flex-end" xs={12}>
                                <CardActions >
                                    <IconButton //onClick={this.LeadFun}
                                    >
                                        <ArrowForward />
                                    </IconButton>
                                </CardActions>
                            </GridContainer>

                        </Card>
                    </GridItem>
                    <GridItem>
                        <CustomCheckbox
                            labelText="I confirm that i have come to a final selection of product having evaluated the need priorities and product offering "
                            name="confirm"
                           // value={this.state.Provision.production}
                            //onChange={(e) => this.SetEnvProvisionValue(e)}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                   < GridItem >
                            <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                        <Button style={{ marginTop: "1rem" }} id="button-search-partner" color="info" round >
                            Add Signature
                                    </Button>
                        {/*    <Button id="button-search-partner" color="info" round >
                                            Grid
                        </Button> */}
                    </Animated>
                        </GridItem>
                    
                </GridContainer>
            </Animated>
            </div>
    );
}
export default ProductSelection;


