import Icon from "@material-ui/core/Icon";
import withStyles from "@material-ui/core/styles/withStyles";
import generatequotation from "assets/img/generate-quotation.png";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import React from "react";
import { Animated } from "react-animated-css";
import NewBusinessConfig from "modules/NewBusiness/NewBusinessConfig.js";

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

const radioAlign = {
    margin: "0 auto",
    textAlign: "center"
}

const validateBtn = {
    height: "35px",
    marginTop: "-10px",
}

class ViewQuote extends React.Component {
    constructor(props) {
        super(props);
        console.log("artprops", props);
        this.state = {
          
        };
    }


    componentDidMount() {
     
    }

  
    render() {
        const { classes } = this.props;
        return (
            <div>

                <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                    <GridContainer lg={12}>
                        <GridItem xs={12} sm={12} md={12}>
                            <Card>
                                <CardHeader color="info" icon >
                                    <CardIcon color="rose">
                                        <Icon><img id="icon" src={generatequotation} /></Icon>
                                    </CardIcon>
                                    {
                                        <h3 >
                                            <small>View Quote</small>
                                        </h3>
                                    }
                                </CardHeader>
                                <CardBody>
                                    <div>
                                       
                                    </div>
                                </CardBody>
                            </Card>
                        </GridItem>
                    </GridContainer>
                        </Animated>
                   
           
            </div>
                    );
                }
            }
            
export default withStyles(style)(ViewQuote);
            
