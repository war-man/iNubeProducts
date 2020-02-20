import React from "react";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import role from "assets/img/users.png";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import productConfig from 'modules/Products/Micro/ProductConfig.js';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import swal from 'sweetalert';
import withStyles from "@material-ui/core/styles/withStyles";
import Token from "assets/img/Token.jpg";

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";

import "./Token.css";

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

class TokenExpiry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div class="slider-content">
                <div class="slider-wrapper">
                    <div class="slider-container">
                        <div class="slide active grey" data-order="1" data-color="#EE4654" >
                            <div class="fake-bg grey"></div>
                            <canvas class="canvas" ></canvas>
                            <div class="title-wrapper">
                                <h1>Don't worry your data is safe,</h1>
                                <h1>just click on generate button</h1>
                                <h1>we will take care further.</h1>
                                <div class="gallery">
                                    <Button class="button text">Generate Token</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default withStyles(loginPageStyle)(TokenExpiry);