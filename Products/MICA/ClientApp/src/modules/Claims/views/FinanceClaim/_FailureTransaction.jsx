import React, { Component } from 'react';
import Dropzone from 'react-dropzone-uploader';
import GridContainer from '../../../../components/Grid/GridContainer';
//import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import claim from "assets/img/claim.png";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import PropTypes from "prop-types";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import MyUploader from "./DropZone.jsx";
import { Animated } from "react-animated-css";
import status from "assets/img/upload.png";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";


class UploadBankFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    //        let classes = props.classes;
    //// specify upload params and url for your files
    //const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }

    //// const myuploaddata1 = props.componentData;
    //// const myuploaddata = props;

    //// called every time a file's `status` changes
    //const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }
    //// receives array of files that are done uploading when submit button is clicked
    //const handleSubmit = (files) => { console.log(files.map(f => f.meta)) }
    ////console.log("DocumentNameData", props.DocumentData);
    //const documentprops = props.componentData;
    render() {
        const { classes } = this.props;
        return (
            <GridContainer lg={12} xs={12}>
                <GridItem xs={12}>
                    <Animated animationIn="fadeInUp" animationOut="fadeOut" isVisible={true}>
                        <Card style={{ height: '100%' }}>
                            <CardHeader color="rose" icon>
                                <CardIcon color="rose">
                                    <Icon><img id="icon" src={status} /></Icon>
                                </CardIcon>
                                <h4 className={this.props.cardIconTitle}>
                                    <small><TranslationContainer translationKey="UploadBankFile" /></small>
                                </h4>
                            </CardHeader>
                            <CardBody >
                                <GridContainer>
                                    <br />
                                    <GridContainer justify="center">
                                        <GridItem xs={6} sm={6} md={6}>
                                            <MyUploader />
                                        </GridItem>
                                    </GridContainer>
                                    <br />
                                    <GridItem xs={6} sm={6} md={6}>
                                    </GridItem>
                                </GridContainer>
                            </CardBody>
                        </Card>
                    </Animated>
                </GridItem>
            </GridContainer>
        );
    }
}

export default UploadBankFile;