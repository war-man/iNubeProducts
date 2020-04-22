import React, { Component } from "react";

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
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Dropzone from 'react-dropzone-uploader';
import $ from 'jquery';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router';



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

class DmsDocument extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            AddTagDto: {
                did: "",
                tagName: "",
                tagValue: "",
            },
            PaytmDeatils: "",
            url: "",
            resultdata: "",
            redirect:false,
            showdmsTable: false,
            SeachDeatils: [],
            showDropZone: false,
            TagDto: {
                tagName: "",
                tagValue: "",
                id: "",
                docid: "",
            },
        };
    }

    ontagInputChange = (type, event) => {
        event.preventDefault();
        let name = event.target.name;
        let value = event.target.value;
        const TagDto = this.state.TagDto;
        TagDto[name] = value;
        this.setState({ TagDto });
    }
    InputChange = (type, evt) => {
        const AddTagDto = this.state.AddTagDto;
        AddTagDto[evt.target.name] = evt.target.value;
        this.setState({ AddTagDto });
        console.log("name", evt.target.name);
    };

    //getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }

    handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }

    showOnClick = () => {
        this.setState({ showDropZone: true })
    }
    uploadfile = (files) => {
        debugger;
        //var myJSON = JSON.stringify(files); 
        console.log("StData", files.map(f => f.meta))
        var data = new FormData();
        if (files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                data.append(files[i].file.name, files[i].file, files[i].file.size);

            }
        }

        $.ajax({
            type: "POST",
            //url: `http://localhost:53000/api/DMS/UploadFile`,
            url: `https://inubeservicesnotification.azurewebsites.net/api/DMS/Documentupload/Documentupload`,
            contentType: false,
            processData: false,

            data: data,
            beforeSend: function (xhr) {
                /* Authorization header */
                xhr.setRequestHeader("Authorization", 'Bearer ' + localStorage.getItem('userToken'));
            },
            success: function (message) {
                swal({
                    text: "Document Uploaded Successful",
                    icon: "success"
                });
            },
            error: function (message) {

                swal({
                    text: "Document Upload Failed",
                    icon: "error"
                });
            }
        });

    }




    //Search (DMS)
    showDmsTable = () => {
        debugger;
        let tag = this.state.TagDto;
        console.log("tagdto", tag);
        if (tag.tagName != "" && tag.tagValue != "") {
            fetch(`https://inubeservicesnotification.azurewebsites.net/api/DMS/SearchParam?tagName=` + tag.tagName + `&tagValue=` + tag.tagValue, {
                method: 'GET',

                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                }
            })
                .then(response => response.json())
                .then(data => {
                    this.setState({ SeachDeatils: data })
                    console.log("data coming from server", data, this.state.SeachDeatils);
                });
        }
        else {
            swal({
                text: "Please  one search parameters",
                icon: "error"
            });
        }
    }

    //Delete (DMS)
    DeleteData = () => {
        debugger;

        let tag = this.state.TagDto;
        console.log("tagdto", tag);
        if (tag.docid != "") {
            fetch(`https://inubeservicesnotification.azurewebsites.net/api/DMS/DeleteDocument?id=` + tag.docid, {
                method: 'GET',

                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                }
            })
                .then(response => response.json())
                .then(data => {
                    swal({
                        text: "Document deleted Successful",
                        icon: "success"
                    });
                    //this.setState({ SeachDeatils: data })

                    //console.log("data coming from server", data, this.state.SeachDeatils);
                });
        }
        else {
            swal({
                text: "Please  one search parameters",
                icon: "error"
            });
        }
    }

    Paytm = (e) => {
        debugger;

        let flag = false;
        if (flag != true) {

            fetch(`https://inubeservicesnotification.azurewebsites.net/api/DMS/PaytmPayment`, {
                method: 'GET',

                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                }
            })
                .then(response => response.json())
                .then(data => {
                    swal({
                        text: "Document deleted Successful",
                        icon: "success"
                    });
                    this.setState({ PaytmDeatils: data, redirect:true })


                    console.log("paytm", data, this.state.PaytmDeatils);
                    this.setState({ url: this.state.PaytmDeatils.URL, resultdata: this.state.PaytmDeatils });
                    console.log("Uls: ", this.state.url + "payment: " + this.state.resultdata);
                  //  window.open('https://securegw-stage.paytm.in/order/process' + this.state.resultdata,'_blank');
                });
        }
        else {
            swal({
                text: "Error Ocured",
                icon: "error"
            });
        }

        
    }

    renderRedirect = () => {
        debugger;
        if (this.state.redirect == true) {

             let outputHtml = "";

             outputHtml += "<html>";

             outputHtml += "<head>";

             outputHtml += "<title>Merchant Checkout Page</title>";

             outputHtml += "</head>";

             outputHtml += "<body>";

           //  outputHtml += "<center><h1>Please do not refresh this page...</h1></center>";

            outputHtml += "<form method='post' action='https://securegw-stage.paytm.in/order/process' name='paytm_form' target='_self' >";
             let data = this.state.PaytmDeatils;

             for (var key in data) {
                 outputHtml += "<input type='hidden' name='" + key + "' value='" + data[key] + "'>";
            }
           // data.forEach((k, v) => outputHtml += "<input type='hidden' name='" + ${ k } + "' value='" + ${ v } + "'>";);

             //foreach (let  key in paytmParams.Keys)

             //{

             //    outputHtml += "<input type='hidden' name='" + key + "' value='" + paytmParams[key] + "'>";

             //}

            //outputHtml += "<input type='hidden' name='CHECKSUMHASH' value='" + this.state.PaytmDeatils.CHECKSUMHASH + "'>";

             outputHtml += "</form>";

             outputHtml += "<script type='text/javascript'>";

             outputHtml += "document.paytm_form.submit();";

             outputHtml += "</script>";

             outputHtml += "</body>";

            outputHtml += "</html>";
            let formName = "_self";

            let url = "https://securegw-stage.paytm.in/order/process";
            //window.open('', 'TheWindow');

            var newWindow = window.open(url, formName );
            newWindow.document.write(outputHtml );

            return newWindow;
           // return window.open('https://securegw-stage.paytm.in/order/process?' + "&MID=" + this.state.PaytmDeatils.MID + "&WEBSITE=" + this.state.PaytmDeatils.WEBSITE + "&INDUSTRY_TYPE_ID=" + this.state.PaytmDeatils.INDUSTRY_TYPE_ID + "&CHANNEL_ID=" + this.state.PaytmDeatils.CHANNEL_ID + "&ORDER_ID=" + this.state.PaytmDeatils.ORDER_ID + "&CUST_ID=" + this.state.PaytmDeatils.CUST_ID + "&MOBILE_NO=" + this.state.PaytmDeatils.MOBILE_NO + "&EMAIL=" + this.state.PaytmDeatils.EMAIL + "&TXN_AMMOUNT=" + this.state.PaytmDeatils.TXN_AMMOUNT + "&CALLBACK_URL=" + this.state.PaytmDeatils.CALLBACK_URL + "&CHECKSUMHASH=" + this.state.PaytmDeatils.CHECKSUMHASH , '_blank');
           // return newWindow.document.write(outputHtml);
           // return window.open(outputHtml)
        }
      // window.location.replace(this.state.url + this.state.resultdata);
        //window.open(this.state.url);
    }

    //componentWillMount() {
    //    window.location = this.state.url;
    //}
    //Download Document
    Addtags = () => {
        debugger;
        let AddTagDto = this.state.AddTagDto;
        console.log("AddTagDto", AddTagDto);
        if (AddTagDto.did != "") {
            fetch(`https://inubeservicesnotification.azurewebsites.net/api/DMS/AddTags?id=` + AddTagDto.did + `&tagName=` + AddTagDto.tagName + `&tagValue=` + AddTagDto.tagValue, {
                method: 'GET',

                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                }
            })
                .then(response => response.json())
                .then(data => {
                    swal({
                        text: "Tags Added Successfully",
                        icon: "success"
                    });
                    //this.setState({ SeachDeatils: data })

                    //console.log("data coming from server", data, this.state.SeachDeatils);
                });
        }
        else {
            swal({
                text: "Please  enter Id to Add",
                icon: "error"
            });
        }

    }


    render() {
        const { classes, loggingIn } = this.props;
        return (
            <div>
                <Card >
                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                            <Icon><img id="icon" src={role} /></Icon>
                        </CardIcon>
                        {
                            <h4 >
                                <small> Document Management System </small>
                            </h4>
                        }
                    </CardHeader>
                    <CardBody>

                        <GridContainer>
                            <GridItem xs={5} sm={3} md={3} lg={2}>
                                <Button color="info" round className={classes.marginRight} onClick={(e) => this.showOnClick(e)}> Upload File </Button>
                            </GridItem>

                            {this.state.showDropZone ?
                                <GridItem xs={12}>
                                    <Dropzone
                                        getUploadParams={this.getUploadParams}
                                        onChangeStatus={this.handleChangeStatus}
                                        onSubmit={this.uploadfile}
                                        accept="image/*,audio/*,video/*,application/pdf/*,word/*"
                                    />
                                    {/*<div className="avatar-edit">
                                <input type='file' id="imageUpload" onChange={(e) => this.uploadfile(e)} accept="image/*,audio/*,video/*,application/pdf/*,word/*" />
                                <label for="imageUpload"></label>
                            </div>*/}
                                </GridItem> : null}
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Tag Name"
                                        name="tagName"
                                        value={this.state.TagDto.tagName}
                                        onChange={(e) => this.ontagInputChange("ID", e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Tag Value"
                                        name="tagValue"
                                        value={this.state.TagDto.tagValue}
                                        onChange={(e) => this.ontagInputChange("string", e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>

                            <GridContainer>
                                <GridItem xs={5} sm={3} md={3} lg={2}>
                                    <Button color="info" round className={classes.marginRight} onClick={(e) => this.showDmsTable(e)}> SEARCH </Button>
                                </GridItem>
                            </GridContainer>

                            {this.state.SeachDeatils.map((item, i) => <h1>{item}</h1>)}
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Document Id"
                                        name="docid"
                                        value={this.state.TagDto.docid}
                                        onChange={(e) => this.ontagInputChange("string", e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={5} sm={3} md={3} lg={2}>
                                    <Button color="info" round className={classes.marginRight} onClick={(e) => this.DeleteData(e)}> DELETE DOCUMENT </Button>
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Document Id"
                                        name="id"
                                        value={this.state.TagDto.id}
                                        onChange={(e) => this.ontagInputChange("string", e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={5} sm={3} md={3} lg={2}>
                                    {/* <Button color="info" round className={classes.marginRight} onClick={(e) => this.DownloadDoc(e)}> Download document </Button>*/}
                                    <a href={`http://localhost:53000/api/DMS/DownloadFile?id=` + this.state.TagDto.id}>Download</a>
                                </GridItem>

                            </GridContainer>

                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                    labelText="Document Id"
                                    name="did"
                                    value={this.state.AddTagDto.did}
                                    onChange={(e) => this.InputChange("string", e)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>

                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                    labelText="Tag Name"
                                    name="tagName"
                                    value={this.state.AddTagDto.tagName}
                                    onChange={(e) => this.InputChange("string", e)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>

                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                    labelText="Tag Value"
                                    name="tagValue"
                                    value={this.state.AddTagDto.tagValue}
                                    onChange={(e) => this.InputChange("string", e)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={5} sm={3} md={3} lg={2}>
                                <Button color="info" round className={classes.marginRight} onClick={(e) => this.Addtags(e)}> Add Tags </Button>
                            </GridItem>
                            <GridItem xs={5} sm={3} md={3} lg={2}>
                                {this.renderRedirect()}
                                <Button color="info" round className={classes.marginRight} onClick={(e) => this.Paytm(e)}> Paytm </Button>
                            </GridItem>
                        </GridContainer>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default withStyles(style)(DmsDocument);