import React from "react";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import role from "assets/img/users.png";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";

import './style.css';

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

class VideoTutorials extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
                <GridContainer lg={12}>
                    <GridItem xs={12} sm={4}>
                        <div class="fab-message__content">
                            <section class="gallery">
                                <div class="container-video">
                                    <ol class="image-list grid-view">
                                        <li>
                                            <figure>
                                                <video class="video" controls>
                                                    <source src="https://s3.ap-south-1.amazonaws.com/mica.videos/Assigning_Partner_to_Product.mp4 " type="video/mp4" />
                                                </video>
                                                <figcaption>
                                                    <p>Assigning Partner to Product</p>
                                                </figcaption>
                                            </figure>
                                        </li>
                                    </ol>
                                </div>
                            </section>
                        </div>
                    </GridItem>
                    <GridItem xs={12} sm={4}>
                        <div class="fab-message__content">
                            <section class="gallery">
                                <div class="container-video">
                                    <ol class="image-list grid-view">
                                        <li>
                                            <figure>
                                                <video class="video" controls>
                                                    <source src="https://s3.ap-south-1.amazonaws.com/mica.videos/Creating_a_Partner.mp4 " type="video/mp4" />
                                                </video>
                                                <figcaption>
                                                    <p>Creating a Partner</p>
                                                </figcaption>
                                            </figure>
                                        </li>
                                    </ol>
                                </div>
                            </section>
                        </div>
                    </GridItem>
                    <GridItem xs={12} sm={4}>
                        <div class="fab-message__content">
                            <section class="gallery">
                                <div class="container-video">
                                    <ol class="image-list grid-view">
                                        <li>
                                            <figure>
                                                <video class="video" controls>
                                                    <source src="https://s3.ap-south-1.amazonaws.com/mica.videos/Creating_CD_Account.mp4 " type="video/mp4" />
                                                </video>
                                                <figcaption>
                                                    <p>Creating CD Account</p>
                                                </figcaption>
                                            </figure>
                                        </li>
                                    </ol>
                                </div>
                            </section>
                        </div>
                    </GridItem>
                    <GridItem xs={12} sm={4}>
                        <div class="fab-message__content">
                            <section class="gallery">
                                <div class="container-video">
                                    <ol class="image-list grid-view">
                                        <li>
                                            <figure>
                                                <video class="video" controls>
                                                    <source src="https://s3.ap-south-1.amazonaws.com/mica.videos/Login_Module.mp4 " type="video/mp4" />
                                                </video>
                                                <figcaption>
                                                    <p>Login Module</p>
                                                </figcaption>
                                            </figure>
                                        </li>
                                    </ol>
                                </div>
                            </section>
                        </div>
                    </GridItem>
                    <GridItem xs={12} sm={4}>
                        <div class="fab-message__content">
                            <section class="gallery">
                                <div class="container-video">
                                    <ol class="image-list grid-view">
                                        <li>
                                            <figure>
                                                <video class="video" controls>
                                                    <source src="https://s3.ap-south-1.amazonaws.com/mica.videos/Product Config.mp4 " type="video/mp4" />
                                                </video>
                                                <figcaption>
                                                    <p>Product Config</p>
                                                </figcaption>
                                            </figure>
                                        </li>
                                    </ol>
                                </div>
                            </section>
                        </div>
                    </GridItem>
                    <GridItem xs={12} sm={4}>
                        <div class="fab-message__content">
                            <section class="gallery">
                                <div class="container-video">
                                    <ol class="image-list grid-view">
                                        <li>
                                            <figure>
                                                <video class="video" controls>
                                                    <source src="https://s3.ap-south-1.amazonaws.com/mica.videos/Product_View_After_Creation.mp4 " type="video/mp4" />
                                                </video>
                                                <figcaption>
                                                    <p>Product View After Creation</p>
                                                </figcaption>
                                            </figure>
                                        </li>
                                    </ol>
                                </div>
                            </section>
                        </div>
                    </GridItem>
                    <GridItem xs={12} sm={4}>
                        <div class="fab-message__content">
                            <section class="gallery">
                                <div class="container-video">
                                    <ol class="image-list grid-view">
                                        <li>
                                            <figure>
                                                <video class="video" controls>
                                                    <source src="https://s3.ap-south-1.amazonaws.com/mica.videos/Replenish_CD_Account.mp4 " type="video/mp4" />
                                                </video>
                                                <figcaption>
                                                    <p>Replenish CD Account</p>
                                                </figcaption>
                                            </figure>
                                        </li>
                                    </ol>
                                </div>
                            </section>
                        </div>
                    </GridItem>
                    <GridItem xs={12} sm={4}>
                        <div class="fab-message__content">
                            <section class="gallery">
                                <div class="container-video">
                                    <ol class="image-list grid-view">
                                        <li>
                                            <figure>
                                                <video class="video" controls>
                                                    <source src="https://s3.ap-south-1.amazonaws.com/mica.videos/View_CD_Account.mp4 " type="video/mp4" />
                                                </video>
                                                <figcaption>
                                                    <p>View CD Account</p>
                                                </figcaption>
                                            </figure>
                                        </li>
                                    </ol>
                                </div>
                            </section>
                        </div>
                    </GridItem>
                    <GridItem xs={12} sm={4}>
                        <div class="fab-message__content">
                            <section class="gallery">
                                <div class="container-video">
                                    <ol class="image-list grid-view">
                                        <li>
                                            <figure>
                                                <video class="video" controls>
                                                    <source src="https://s3.ap-south-1.amazonaws.com/mica.videos/View_or_Modify_Partner.mp4 " type="video/mp4" />
                                                </video>
                                                <figcaption>
                                                    <p>View or Modify Partner</p>
                                                </figcaption>
                                            </figure>
                                        </li>
                                    </ol>
                                </div>
                            </section>
                        </div>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}
export default withStyles(style)(VideoTutorials);