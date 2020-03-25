import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import React from "react";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import { Redirect } from 'react-router-dom'
import EdelweissConfig from "./EdelweissConfig.js";
import Dropzone from 'react-dropzone-uploader';
import $ from 'jquery';
import swal from 'sweetalert';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';



class AddDriver extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            amount:0,
            startdate:"",
            drvcount:"1",
            showleftDropZone: false,
            showbtn:true,
            bytestring: "",
            fbase64: [],
            showDropZonerear: false,
            showadditionaldriver: false,
            proposalno: "",
            showadddrvflag: true,
            showDropZone: false,
            showadddrvbtn: false,
            redirect: "",
            ddlDTO: [
                { mID: 1, mValue: "Mr", label: "Mr" },
                { mID: 2, mValue: "Miss", label: "Miss" },
                { mID: 3, mValue: "Mrs", label: "Mrs" },
            ],
            NoOfDriver: '',
            VehicleAge: '',
            VehicleNumber: '',
            VehicleModelNumber: '',
            showadddrvbtn: '',

            quotationDetailsDto: {
            },
            policyRqst: {},
            premDTO: {},
            RiskObj: {
                "Age": "",
                "Name": "",
                "Identification Number": "",
                "Aadhaar No.": "",
                "Licence No.": "",
                "Driving Experience": "",
                "Documents": [],
            },
            duplicateRiskObj: {
                "Age": "",
                "Name": "",
                "Identification Number": "",
                "Aadhaar No.": "",
                "Licence No.": "",
                "Driving Experience": "",
                "Documents": []
            },
            insurableObj: [{

                "InsurableName": "Driver",

                "RiskItems": [

                ]

            }, {

                "InsurableName": "Vehicle",

                "RiskItems": [


                ]

            }],
            policyIssueDTO:
            {

                "ProposalNumber": "",
                "StartDate":"",
                "InsurableItem": [],


            },
            DocumentDTO: {
                frontimage: "",
                leftimage: "",
                backimage: "",
                rightimage: "",
            },
            imagesDTO: {
                frontfileImage: "",
                leftfileimage: "",
                backfileimage: "",
                rightfileimage: "",
            },
            drvvehicleType: "",
            adddrvMakeModel: "",
            tagName: "",
            tagValue: "",
            rtagName: "",
            rtagValue: "",
            imagePreviewUrl: '',

            fileUpload: {
                "fileUploadDTOs": [
                    {
                        "fileName": "",
                        "fileExtension": "",
                        "fileData": "",
                        "contentType": "",
                        "tagname": "",
                        "tagValue": ""
                    }
                ]
            },
            tags: {
                "tagname": "",
                "tagValue": ""
            },
            duplicatetags: {
                "tagname": "",
                "tagValue": ""
            },
            fileUpload: {
                "fileUploadDTOs": [
                    {
                        "fileName": "",
                        "fileExtension": "",
                        "fileData": "",
                        "contentType": "",
                        "tagdto": [
                           
                        ]
                    }
                ]
            },
            frontfilestr: {
                "fileName": "",
                "fileExtension": "",
                "fileData": "",
                "contentType": "",
                "tagdto": []
            },
            tagdtos: {
                "tagname": "",
                "tagValue": ""
            },
            duplicatetagtos: {
                "tagname": "",
                "tagValue": ""
            },
            backfilestr: {
                "fileName": "",
                "fileExtension": "",
                "fileData": "",
                "contentType": "",
                "tagdto": []
            },
            fileUploaddto: {
                "fileUploadDTOs": [

                ]
            },

        }
    }
   
    componentDidMount() {
        //console.log("this.location.policyRequest....", this.props.location.state.policyRequest, this.props.location.state.quotationDto)
        if (this.props.location.state != undefined) {
            this.state.drvvehicleType = this.props.location.state.vehType;
            this.state.adddrvMakeModel = this.props.location.state.drMakeModel
            this.state.quotationDetailsDto = this.props.location.state.quotationDto;
            this.state.startdate = this.props.location.state.startdate;
            //this.state.proposalno = this.props.location.state.proposalNo;
            this.state.policyIssueDTO = this.props.location.state.policyRequest;
            this.state.premDTO = this.props.location.state.premiumDTO;
            this.state.RiskObj.Age = this.props.location.state.quotationDto.age;
            this.state.RiskObj.Name = this.props.location.state.quotationDto.primaryDriverName;
            this.state.policyIssueDTO.ProposalNumber = this.props.location.state.proposalNo;
            this.state.amount = this.props.location.state.paymentAmt;
            console.log("aaaaaa", this.state.amount, this.props.location.state.paymentAmt);
            this.setState({});
            console.log("prno", this.props.location.state.proposalNo);
            console.log("policyRqstisueDTO", this.state.policyIssueDTO, this.props.location.state.startdate);
            console.log("this.state.RiskObj.Age", this.state.RiskObj.Age);

            if (this.props.location.state.premiumDTO.additionalDriver > 0 && this.props.location.state.premiumDTO.additionalDriver <= 2) {
                this.setState({ showadddrvbtn: true });
            }
        }


    }
    showOnClick = (evt, name, value) => {

        this.setState({ showDropZone: true, tagName: name, tagValue: value });
    }
    showrearOnClick = (evt, name, value) => {

        this.setState({ showDropZonerear: true, rtagName: name, rtagValue: value })
    }
    onInputChangepropsal = (event) => {
        let RiskObj = this.state.RiskObj;

        RiskObj[event.target.name] = event.target.value;
        this.setState({ RiskObj });
    }


    getUploadParams = ({ meta }) => {
        debugger;
        return { url: 'https://httpbin.org/post' }
    }

    handleChangeStatus = ({ meta, file }, status) => {
        debugger;
        console.log(status, meta, file)
    }
    uploadfile = (files) => {
        debugger;
        //var myJSON = JSON.stringify(files); 
        console.log("StData", files.map(f => f.meta))
        var data = new FormData();
        if (files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                data.append(files[i].file.name, files[i].file);
            }
        }
        console.log("form data: ", data)
        $.ajax({
            type: "POST",
            //url: `http://localhost:53000/api/DMS/UploadFile`,
            url: `https://inubeservicesnotification.azurewebsites.net/api/DMS/Documentupload/Documentupload`,
            // url: `https://inubeservicesnotification.azurewebsites.net/api/DMS/MobileDocumentupload/MobileDocumentupload`,
            contentType: false,
            processData: false,

            data: data,
            beforeSend: function (xhr) {
                /* Authorization header */
                // xhr.setRequestHeader("Authorization", 'Bearer ' + localStorage.getItem('userToken'));
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

    uploadfilefront = (files, evt) => {
        debugger;
        let obj = this.state.RiskObj;
        var data = new FormData();
        if (files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                data.append(files[i].file.name, files[i].file, files[i].file.size);

            }
        }
        console.log("data set", data)
        $.ajax({
            type: "POST",
            //url: `http://localhost:53000/api/DMS/UploadFile`,
            url: `https://inubeservicesnotification.azurewebsites.net/api/DMS/Documentupload/Documentupload?tagName=` + this.state.tagName + '&tagValue=' + this.state.tagValue,
            // url: `https://inubeservicesnotification.azurewebsites.net/api/DMS/MobileDocumentupload/MobileDocumentupload`,
            contentType: false,
            processData: false,

            data: data,
            beforeSend: function (data, xhr) {
                /* Authorization header */
                //xhr.setRequestHeader("Authorization", 'Bearer ' + localStorage.getItem('userToken'));
            },
            success: function (data, message) {
                console.log("dddata", data);
                let docObj = [
                ]
                for (var i = 0; i < data.dMSDTOs.length; i++) {

                    docObj.push(data.dMSDTOs[i]);
                }
                console.log("docobj", docObj);
                for (var i = 0; i < docObj.length; i++) {
                    let x = {};
                    x.docId = docObj[i].docId;
                    x.fileName = docObj[i].fileName;
                    let mainobj = obj.Documents;
                    mainobj.push(x);

                    console.log("docobj", mainobj);
                }

                //this.state.documentObj.docId = data.docId;
                //this.state.documentObj.fileName = data.fileName;

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
        this.setState({});
        console.log("this.state.Riskobj", this.state.RiskObj);
    }


    uploadfilerear = (files, evt) => {
        debugger;
        let obj = this.state.RiskObj;
        var data = new FormData();
        if (files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                data.append(files[i].file.name, files[i].file, files[i].file.size);

            }
        }

        $.ajax({
            type: "POST",
            //url: `http://localhost:53000/api/DMS/UploadFile`,
            url: `https://inubeservicesnotification.azurewebsites.net/api/DMS/Documentupload/Documentupload?tagName=` + this.state.rtagName + '&tagValue=' + this.state.rtagValue,
            // url: `https://inubeservicesnotification.azurewebsites.net/api/DMS/MobileDocumentupload/MobileDocumentupload`,
            contentType: false,
            processData: false,

            data: data,
            beforeSend: function (data, xhr) {
                /* Authorization header */
                //xhr.setRequestHeader("Authorization", 'Bearer ' + localStorage.getItem('userToken'));
            },
            success: function (data, message) {
                console.log("dddata", data);
                let docObj = [
                ]
                for (var i = 0; i < data.dMSDTOs.length; i++) {

                    docObj.push(data.dMSDTOs[i]);
                }
                console.log("docobj", docObj);
                for (var i = 0; i < docObj.length; i++) {
                    let x = {};
                    x.docId = docObj[i].docId;
                    x.fileName = docObj[i].fileName;
                    let mainobj = obj.Documents;
                    mainobj.push(x);

                    console.log("docobj", mainobj);
                }

                //this.state.documentObj.docId = data.docId;
                //this.state.documentObj.fileName = data.fileName;

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
        this.setState({});
        console.log("this.state.Riskobj", this.state.RiskObj);
    }

    getModelNumber = (e) => {

    }
    renderRedirect = () => {
        if (this.state.redirect === true) {
            return <Redirect to={{
                pathname: '/pages/AddVehicle',
                state: { quotationDetailsDto: this.state.quotationDetailsDto, proposalno: this.state.proposalno, policyIssueDTO: this.state.policyIssueDTO, premDTO: this.state.premDTO, drvvehicleType: this.state.drvvehicleType, adddrvMakeModel: this.state.adddrvMakeModel, policyRqst: this.state.policyRqst, startdate: this.state.startdate, amount: this.state.amount }
            }} />
        }
    }
    submitDriverDetails = (e) => {
        this.AddDrv();
      
        this.state.policyIssueDTO.InsurableItem = this.state.insurableObj;
        for (var i = 0; i < this.state.policyIssueDTO.InsurableItem[0].RiskItems.length; i++) {
            if (this.state.policyIssueDTO.InsurableItem[0].InsurableName == "Driver") {
                this.state.policyIssueDTO.InsurableItem[0].RiskItems[i]["Identification Number"] = "D" + (i+1).toString();
            }
        }
        console.log("policyIssueDTOpolicyIssueDTO", this.state.policyIssueDTO);
        this.renderRedirect();
        this.setState({ redirect: true })
    }
    AddDrv = (N) => {
        debugger;
        //console.log("additionalDriver", this.props.location.state.premiumDTO.additionalDriver);
        if (this.props.location.state != undefined && this.props.location.state.premiumDTO.additionalDriver > 0 && this.props.location.state.premiumDTO.additionalDriver <= 2) {

            for (var i = 0; i < this.state.insurableObj.length; i++) {
                if (this.state.insurableObj[i].InsurableName  == "Driver") {
                    //this.state.RiskObj["Identification Number"] = "D" + i.toString();
                    this.state.insurableObj[i].RiskItems.push(this.state.RiskObj);
                } 
            }
            this.setState({ showadddrvbtn: true });

        } else {
            this.setState({ showadddrvbtn: false });
            for (var i = 0; i < this.state.insurableObj.length; i++) {
                if (this.state.insurableObj[i].InsurableName == "Driver") {
                    //this.state.RiskObj["Identification Number"] = "D" + (i+1).toString();
                    this.state.insurableObj[i].RiskItems.push(this.state.RiskObj);
                }
                
            }
        }

        this.setState({ showadddrvflag: false, RiskObj: this.state.duplicateRiskObj});
      
                //this.state.RiskObj.Name = '';
                //this.state.RiskObj.Age = '';
                this.state.backimage = '';
                this.state.frontimage = '';
                const file = document.querySelector('.file');
                file.value = '';
                const bfile = document.querySelector('.fileback');
                bfile.value = '';
                this.setState({ showadditionaldriver: true })
        
        console.log(" this.state.policyRqst", this.state.policyRqst);
    }
    pressButton = (e) => {
        debugger;
        e.preventDefault();
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', this.state.file);
    }
    getPhoto = (e) => {
        debugger;
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file);

    }
    fileSelectedHandlerfront = (event, name) => {
        debugger;
        let images = this.state.DocumentDTO;
        let imagefiles = this.state.imagesDTO;
        let pictures = this.state.imagesDTO;
        let picture = event.target.files[0];
        var front = "";
        var left = "";
        var back = "";
        var right = "";

        let base = this.state.fbase64;
        let stringbase = this.state.bytestring;
        this.setState({
            selectedimage: event.target.files[0]
        })
        let reader = new FileReader();
        reader.onloadend = () => {
            base.push(reader.result);
            this.setState({
                imagePreviewUrl: reader.result
            });
            console.log("b5", this.state.bytestring);
        }
        console.log("imagePreviewUrl", this.state.imagePreviewUrl);
        
        //let data = base.toString();

        console.log("baseee", base);
        if (name == "front") {
            debugger;
            this.state.frontimage = this.state.fbase64;
            this.state.fbase64 = [];
            front = this.state.frontimage;
            images.frontimage = front;
            console.log("image: ", images.frontimage);
            imagefiles.frontfileimage = event.target.files[0];
        }
    
        if (name == "back") {
            this.state.backimage = this.state.fbase64;
            this.state.fbase64 = [];
            back = this.state.backimage;
            images.backimage = this.state.backimage;
            imagefiles.backfileimage = event.target.files[0];
        }
      
            
        this.setState({ images, imagefiles });
        this.Uploadfile(imagefiles, images, name, this.state.imagePreviewUrl);
        reader.readAsDataURL(event.target.files[0]);

        console.log("filwimage", images.frontimage);


    }
    Uploadfile = (files, bytes, name,imgdata) => {
        console.log("fyles", files, bytes, name, imgdata);
        if (name == "front") {
            this.state.frontfilestr.fileName = files.frontfileimage.name;
            this.state.frontfilestr.fileExtension = files.frontfileimage.name.split(".")[1];
            this.state.frontfilestr.fileData = imgdata.toString().replace('data:image/png;base64,', '');
                //bytes.frontimage[0];
            //.toString().replace('data:image/png;base64,', '');;
            this.state.frontfilestr.contentType = files.frontfileimage.type;
            //this.state.frontfilestr.tagdto[0].tagname = 'ImageType';
            //this.state.frontfilestr.tagdto[0].tagValue = name;
            this.state.tagdtos.tagname = 'ImageType';
            this.state.tagdtos.tagValue = name;
            this.state.frontfilestr.tagdto.push(this.state.tagdtos);
            this.setState({ tagdtos: this.state.duplicatetagtos });
            this.state.fileUploaddto.fileUploadDTOs.push(this.state.frontfilestr);
            console.log("fileUploaddtodocx", this.state.fileUploaddto);
        }


        if (name == "back") {
            this.state.backfilestr.fileName = files.backfileimage.name;
            this.state.backfilestr.fileExtension = files.backfileimage.name.split(".")[1];
            this.state.backfilestr.fileData = imgdata.toString().replace('data:image/png;base64,', '');
                //bytes.backimage[0];
                //.toString().replace('data:image/png;base64,', '');
            console.log("bytes.backimage[0]", bytes.backimage[0]);
            this.state.backfilestr.contentType = files.backfileimage.type;
            //this.state.backfilestr.tagdto[0].tagname = 'ImageType';
            //this.state.backfilestr.tagdto[0].tagValue = name;
            this.state.tagdtos.tagname = 'ImageType';
            this.state.tagdtos.tagValue = name;
            this.state.backfilestr.tagdto.push(this.state.tagdtos);
            this.setState({ tagdtos: this.state.duplicatetagtos});
            this.state.fileUploaddto.fileUploadDTOs.push(this.state.backfilestr);
            console.log("fileUploaddtodocx11", this.state.fileUploaddto);

        }
   
    }
    FileUploadSubmit = () => {
        console.log("this.state.fileUploaddto", this.state.fileUploaddto)
        let obj = this.state.RiskObj;
        if (this.state.fileUploaddto.fileUploadDTOs.length == 2) {
            fetch(`http://elwei-publi-1sxquhk82c0h4-688030859.ap-south-1.elb.amazonaws.com:9004/api/DMS/DocumentSimpleupload/DocumentSimpleupload`, {
                method: 'Post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state.fileUploaddto)
            }).then(response => response.json())
                .then(data => {
                    console.log("respdata", data);
                    let docObj = [
                    ]
                    for (var i = 0; i < data.length; i++) {

                        docObj.push(data[i].docid);
                    }
                    console.log("docobj", docObj.length);
                    for (var i = 0; i < docObj.length; i++) {
                        let x = {};
                        x.docId = docObj[i];
                        let mainobj = obj.Documents;
                        mainobj.push(x);

                        console.log("docobjmain", mainobj);
                    }

                    console.log("docObj", docObj);
                    swal({
                        text: "Document uploaded successfully!",
                        icon: "success"
                    })
                    this.setState({ disablesendotp: true, disableresendotp: false })
                    console.log("dddd", data);
                })
        }
        console.log("thisriskobj", this.state.RiskObj)
    }
    showonclick = () => {
        this.setState({ showleftDropZone: true, showbtn: false })

    }

    render() {
        const { touched } = this.state;
        const className = touched ? 'btn touched' : 'btn';
        const { classes, loggingIn } = this.props;
        let nameTitles = [{ value: 'Mr' }, { value: 'Miss' }, { value: 'Mrs' }];
        console.log(this.state);

        return (

            <div className={classes.container}>

                <GridContainer justify="center">
                    <GridItem xs={8}>
                        <Card>
                            <CardBody>
                                {this.state.showadddrvbtn ?
                                    <GridContainer justify="center">
                                        <GridItem>
                                            <Button color="primary" round onClick={this.AddDrv}> Add Driver </Button>
                                        </GridItem>
                                    </GridContainer> : null}
                                <GridContainer justify="center">
                                    {/*<GridItem xs={12} sm={12} md={2}>
                                        <Dropdown
                                            labelText="Title"
                                            id="TitleId"
                                            lstObject={this.state.ddlDTO}
                                            //value={this.state.proposalIssueDTO.InsurableName}
                                            //name='InsurableName'
                                            //onChange={(e) => this.GetMasterData(e)}
                                            formControlProps={{ fullWidth: true }} />
                                    </GridItem>*/}
                                    <GridItem xs={4} >
                                        <CustomInput
                                            labelText="Name"
                                            name="Name"
                                            value={this.state.RiskObj.Name}
                                            onChange={(e) => this.onInputChangepropsal(e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={4}>
                                        <CustomInput
                                            labelText="Age"
                                            name="Age"
                                            value={this.state.RiskObj.Age}
                                            onChange={(e) => this.onInputChangepropsal(e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer justify="center">
                                    <h4>Upload Licence</h4>
                                </GridContainer>

                                <GridContainer justify="center">
                                    {this.state.showDropZone ?
                                        <GridItem xs={3}>
                                            <Dropzone
                                                getUploadParams={this.getUploadParams}
                                                maxFiles={1}
                                                name='ImageType'
                                                value='front'
                                                onChangeStatus={this.handleChangeStatus}
                                                onSubmit={(e) => this.uploadfilefront(e)}
                                                accept="image/*,audio/*,video/*,application/pdf/*,word/*"
                                            />
                                        </GridItem> : null}

                                    {this.state.showDropZonerear ?
                                        <GridItem xs={3}>
                                            <Dropzone
                                                getUploadParams={this.getUploadParams}
                                                maxFiles={1}
                                                name='ImageType'
                                                value='front'
                                                onChangeStatus={this.handleChangeStatus}
                                                onSubmit={(e) => this.uploadfilerear(e)}
                                                accept="image/*,audio/*,video/*,application/pdf/*,word/*"
                                            />
                                        </GridItem> : null}
                                </GridContainer>

                                {this.state.showleftDropZone ? <GridContainer justify="center">
                                    <GridItem xs={3}>
                                        <h6 style={{ top: '1.2rem', position: 'relative', left: '1.3rem' }}>Front</h6>
                                        <div className="container">
                                            <div className="avatar-upload">
                                                <form action="/action_page.php">
                                                    <input type="file" class="file" name="myfile" onChange={(e) => this.fileSelectedHandlerfront(e, 'front')} />
                                                </form>
                                                <div className="avatar-preview">
                                                    <div id="imagePreview" style={{ backgroundImage: "url(" + this.state.frontimage + ")" }} />
                                                </div>
                                            </div>
                                        </div>
                                    </GridItem>


                                    <GridItem xs={3}>
                                        <h6 style={{ top: '1.2rem', position: 'relative', left: '1.3rem' }}>Back</h6>
                                        <div className="container">
                                            <div className="avatar-upload">
                                                <form action="/action_page.php">
                                                    <input type="file" class="fileback" name="myfile" onChange={(e) => this.fileSelectedHandlerfront(e, 'back')} />
                                                </form>
                                                <div className="avatar-preview">
                                                    <div id="imagePreview" style={{ backgroundImage: "url(" + this.state.backimage + ")" }} />
                                                </div>
                                            </div>
                                        </div>
                                    </GridItem>

                                </GridContainer> : null}
                                {this.state.showleftDropZone ? <GridContainer justify="center">
                                    {this.renderRedirect()}
                                    <Button color="primary" round onClick={this.FileUploadSubmit}> Upload </Button>
                                </GridContainer> : null}
                                {this.state.showbtn ? <GridContainer justify="center">
                                    <Button color="primary" round onClick={this.showonclick}> Upload </Button>
                                </GridContainer> : null}

                                <GridContainer justify="center">
                                    {this.renderRedirect()}
                                    <Button color="primary" round onClick={this.submitDriverDetails}> Submit </Button>

                                </GridContainer>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>


            </div>
        );
    }
}
AddDriver.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(AddDriver);
