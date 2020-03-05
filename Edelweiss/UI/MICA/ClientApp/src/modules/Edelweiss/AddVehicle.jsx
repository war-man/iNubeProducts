import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import React from "react";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import { Redirect } from 'react-router-dom';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Dropzone from 'react-dropzone-uploader';
import EdelweissConfig from "./EdelweissConfig.js";
import $ from 'jquery';
import swal from 'sweetalert';
import './style.css';
import './style-cover.css';



class AddVehicle extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            showDropZone:false,
            showbtn:true,
            bytestring: "",
            fbase64: [],
            lbase64: [],
            bbase64: [],
            rbase64: [],
            policyNo: "",
            vehicleModel: "",
            vehicleModel1: "",
            showDropZone: false,
            quotationdataDto: {},
            NoOfDriver: '',
            VehicleAge: '',
            VehicleAge1: '',
            //VehicleNumber: '',
            VehicleModelNumber: '',
            insurableObj: [],
            vehiclepremiumDto: {},
            proposalIssueDTO:
            {

                "ProposalNumber": "",
                "InsurableItem": [],


            },
            policyIssueRequest: {

            },
            RiskObj: {
                "Model": "",
                "VehicleNumber": "",
                "Identification Number": "1",
                "YearofRegistration": "",
                "Vehicle Type": "",
                "Documents": []
            },
            duplicateRiskObj: {

                "Model": "",

                "VehicleNumber": "",

                "Identification Number": "",

                "YearofRegistration": "",

                "Vehicle Type": "",

                "Documents": []
            },
            scheduleDTO: {
                "policyNo": "",
                "vehicleRegistrationNo": "",
                "vehicleType": "",
                "mon": false,
                "tue": false,
                "wed": false,
                "thu": false,
                "fri": false,
                "sat": false,
                "sun": false,
            },
            poliNo: "",
            showleftDropZone: false,
            showrightDropZone: false,
            showfrontDropZone: false,
            showbackDropZone: false,
            ltagName: "",
            ltagValue: "",
            rtagName: "",
            rtagValue: "",
            ftagName: "",
            ftagValue: "",
            btagName: "",
            btagValue: "",
            frontimage: [],
            rightimage: "",
            leftimage: "",
            backimage: "",
            imagePreview: "",
            selectedimage: "",
            selectedimage1: "",
            selectedimage2: "",
            selectedimage3: "",
            imagePreviewUrl: '',
            profileimage: [],
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
            fileUploaddto: {
                "fileUploadDTOs": [

                ]
            },
            frontfilestr: {
                "fileName": "",
                "fileExtension": "",
                "fileData": "",
                "contentType": "",
                "tagname": "",
                "tagValue": ""
            },
            leftfilestr: {
                "fileName": "",
                "fileExtension": "",
                "fileData": "",
                "contentType": "",
                "tagname": "",
                "tagValue": ""
            },
            backfilestr: {
                "fileName": "",
                "fileExtension": "",
                "fileData": "",
                "contentType": "",
                "tagname": "",
                "tagValue": ""
            },
            rightfilestr: {
                "fileName": "",
                "fileExtension": "",
                "fileData": "",
                "contentType": "",
                "tagname": "",
                "tagValue": ""
            },
            duplicatefilestr: {
                "fileName": "",
                "fileExtension": "",
                "fileData": "",
                "contentType": "",
                "tagname": "",
                "tagValue": ""
            },
        }
    }
    AddVehicle = (files) => {
        debugger;
        if (this.state.policyIssueRequest.InsurableItem[1].InsurableName == "Vehicle") {

            this.state.policyIssueRequest.InsurableItem[1].RiskItems.push(this.state.RiskObj);


        }
        //this.setState({ RiskObj: this.state.duplicateRiskObj });
        console.log(" this.state.policyRqst", this.state.policyRqst);
    }
    Issuepolicy = () => {
        debugger;
        //let policyno = this.state.scheduleDTO.policyNo;
        this.state.scheduleDTO.vehicleRegistrationNo = this.state.RiskObj.VehicleNumber;
        console.log("this.state.RiskObj.VehicleNumber", this.state.RiskObj.VehicleNumber, this.state.RiskObj)
        this.AddVehicle();
        debugger;
        console.log("Issuepolicy", this.state.policyIssueRequest);
        fetch(`${EdelweissConfig.PolicyConfigUrl}/api/Policy/IssuePolicy`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('edelweisstoken')
            },
            body: JSON.stringify(this.state.policyIssueRequest)
        }).then(response => response.json())
            .then(data => {

                this.state.policyNo = data.id;
                let sDTO = this.state.scheduleDTO;
                sDTO.policyNo = data.id;
                //this.setState({poliNo:data.id})
                console.log("polissued", data);

                this.setState({ sDTO });

                //let policynothis = data.id;
                //policyno = policynothis;

                if (data.status == 2) {

                    this.renderRedirect();
                    this.setState({ redirect: true });

                    swal({
                        text: data.responseMessage,
                        icon: "success"
                    })
                    console.log("dddd", data);
                    fetch(`${EdelweissConfig.EdelweissConfigUrl}/api/Mica_EGI/CreateUpdateSchedule`, {
                        method: 'Post',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJjNTFhYmQ0Mi0zZDEyLTRkODctOTI5OS1iOTY0MGUzMmU3ZjIiLCJFbWFpbCI6ImphZ3VhcnJpZGVyMThAZ21haWwuY29tIiwiT3JnSWQiOiIxMTIiLCJQYXJ0bmVySWQiOiIwIiwiUm9sZSI6ImlOdWJlIEFkbWluIiwiTmFtZSI6IkdvcGkiLCJVc2VyTmFtZSI6ImphZ3VhcnJpZGVyMThAZ21haWwuY29tIiwiUHJvZHVjdFR5cGUiOiJNaWNhIiwiU2VydmVyVHlwZSI6IjI5OCIsImV4cCI6MTYxNDUwNzU0OSwiaXNzIjoiSW51YmUiLCJhdWQiOiJJbnViZU1JQ0EifQ.MxIIyauo1RUqJfaAZNKIuVDKMjpsM8ax1NYGE1Wq3Sk'
                        },
                        body: JSON.stringify(this.state.scheduleDTO)
                    }).then(response => response.json())
                        .then(data => {
                            swal({
                                text: "Schedule Created Successfully!",
                                icon: "success"
                            })
                            this.setState({ disablesendotp: true, disableresendotp: false })
                            console.log("dddd", data);
                        })
                }
            })

        console.log("ssssss", this.state.scheduleDTO);


    }

    componentDidMount() {
        const edelweisstoken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJjNTFhYmQ0Mi0zZDEyLTRkODctOTI5OS1iOTY0MGUzMmU3ZjIiLCJFbWFpbCI6ImphZ3VhcnJpZGVyMThAZ21haWwuY29tIiwiT3JnSWQiOiIxMTIiLCJQYXJ0bmVySWQiOiIwIiwiUm9sZSI6ImlOdWJlIEFkbWluIiwiTmFtZSI6IkdvcGkiLCJVc2VyTmFtZSI6ImphZ3VhcnJpZGVyMThAZ21haWwuY29tIiwiUHJvZHVjdFR5cGUiOiJNaWNhIiwiU2VydmVyVHlwZSI6IjI5OCIsImV4cCI6MTYxNDUwNzU0OSwiaXNzIjoiSW51YmUiLCJhdWQiOiJJbnViZU1JQ0EifQ.MxIIyauo1RUqJfaAZNKIuVDKMjpsM8ax1NYGE1Wq3Sk';
        localStorage.setItem('edelweisstoken', edelweisstoken);

        //const edelweisstoken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJhOTVkMDNjZC1kZjE4LTQ3NTYtYTU3Ny0zNDEyYjY4MTdkZDAiLCJFbWFpbCI6InNhbmRoeWFAZ21haWwuY29tIiwiT3JnSWQiOiIyNzciLCJQYXJ0bmVySWQiOiIwIiwiUm9sZSI6ImlOdWJlIEFkbWluIiwiTmFtZSI6InNhbmRoeWEiLCJVc2VyTmFtZSI6InNhbmRoeWFAZ21haWwuY29tIiwiUHJvZHVjdFR5cGUiOiJNaWNhIiwiU2VydmVyVHlwZSI6IjEiLCJleHAiOjE2NzU0OTkyOTksImlzcyI6IkludWJlIiwiYXVkIjoiSW51YmVNSUNBIn0.2oUTJQBxiqqqgl2319ZCREz1IyYHjVRhlDehI__O8Xg';
        //localStorage.setItem('edelweisstoken', edelweisstoken);

        if (this.props.location.state != undefined) {
            this.state.scheduleDTO.vehicleType = this.props.location.state.drvvehicleType;
            this.state.RiskObj['Vehicle Type'] = this.props.location.state.drvvehicleType;
            this.state.RiskObj.Model = this.props.location.state.adddrvMakeModel;
            console.log("this.state.scheduleDTO.vehicleType", this.state.RiskObj.Model, this.state.scheduleDTO.vehicleType);

            this.setState({ quotationdataDto: this.props.location.state.quotationDetailsDto, policyIssueRequest: this.props.location.state.policyIssueDTO, vehiclepremiumDto: this.props.location.state.premDTO });
            //this.state.policyIssueRequest = this.props.location.state.policyRqst;
            //this.state.insurableObj[0].RiskItems[0].Name = this.state.quotationdataDto.primaryDriverName;
            console.log("policyIssueRequestis.stat", this.state.policyIssueRequest);

            fetch(`http://mica-publi-11qa3l637dqw3-293834673.ap-south-1.elb.amazonaws.com:9025/api/Mica_EGI/GetVehicleDetails?VehicleId=` + this.props.location.state.quotationDetailsDto.vehicleMakeModelId, {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log("qdata21:", data);
                    this.setState({ vehicleModel: data.vehicleModel });
                });

            console.log("this.state.insurableObj", this.state.insurableObj);
        }
    }
    onInputChange = (evt) => {

        const Data = this.state.RiskObj;
        Data[evt.target.name] = evt.target.value;
        this.setState({ Data });
    }
    showleftOnClick = (evt) => {
        debugger;
        this.setState({ showleftDropZone: true })
    }
    showrightOnClick = () => {
        this.setState({ showrightDropZone: true })
    }
    showfrontOnClick = () => {
        this.setState({ showfrontDropZone: true })
    }
    showbackOnClick = () => {
        this.setState({ showbackDropZone: true })
    }

    getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }

    handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }

    showonclick = () => {
        this.setState({ showleftDropZone: true,showbtn:false })

    }

    Uploadfile = (files, bytes, name) => {
        console.log("fyles", files, bytes, name);;
        if (name == "front") {
            this.state.frontfilestr.fileName = files.frontfileimage.name;
            this.state.frontfilestr.fileExtension = files.frontfileimage.name.split(".")[1];
            this.state.frontfilestr.fileData = bytes.frontimage.toString();
            this.state.frontfilestr.contentType = files.frontfileimage.type;
            this.state.frontfilestr.tagname = 'ImageType';
            this.state.frontfilestr.tagValue = name;
            this.state.fileUploaddto.fileUploadDTOs.push(this.state.frontfilestr);
         }
            
      
        if (name == "left") {
            this.state.leftfilestr.fileName = files.leftfileimage.name;
            this.state.leftfilestr.fileExtension = files.leftfileimage.name.split(".")[1];
            this.state.leftfilestr.fileData = bytes.leftimage.toString();
            this.state.leftfilestr.contentType = files.leftfileimage.type;
            this.state.leftfilestr.tagname = 'ImageType';
            this.state.leftfilestr.tagValue = name;
            this.state.fileUploaddto.fileUploadDTOs.push(this.state.leftfilestr);
        }
        if (name == "back") {
            this.state.backfilestr.fileName = files.backfileimage.name;
            this.state.backfilestr.fileExtension = files.backfileimage.name.split(".")[1];
            this.state.backfilestr.fileData = bytes.backimage.toString().replace('data:image/png;base64,', '');
            this.state.backfilestr.contentType = files.backfileimage.type;
            this.state.backfilestr.tagname = 'ImageType';
            this.state.backfilestr.tagValue = name;
            this.state.fileUploaddto.fileUploadDTOs.push(this.state.backfilestr);
        }
        if (name == "right") {
            this.state.rightfilestr.fileName = files.rightfileimage.name;
            this.state.rightfilestr.fileExtension = files.rightfileimage.name.split(".")[1];
            this.state.rightfilestr.fileData = bytes.rightimage.toString().replace('data:image/png;base64,','');
            this.state.rightfilestr.contentType = files.rightfileimage.type;
            this.state.rightfilestr.tagname = 'ImageType';
            this.state.rightfilestr.tagValue = name;
            this.state.fileUploaddto.fileUploadDTOs.push(this.state.rightfilestr);
        }
    }
    FileUploadSubmit = () => {
        console.log("this.state.fileUploaddto", this.state.fileUploaddto)
        let obj = this.state.RiskObj;
        if (this.state.fileUploaddto.fileUploadDTOs.length==4) {
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



    renderRedirect = () => {
        if (this.state.redirect === true) {
            return <Redirect to={{
                pathname: '/pages/LogonVehicle',
                state: { policyIssueRequest: this.state.policyIssueRequest, RiskObj: this.state.RiskObj, scheduleDTO: this.state.scheduleDTO, vehiclepremiumDto: this.state.vehiclepremiumDto, policyNo: this.state.policyNo }
            }} />
        }
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

        //let files = this.state.file;
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

            //stringbase = base.toString();
            //this.setState({ bytestring: stringbase})
            //this.state.bytestring = stringbase;
            //console.log("d5", this.state.bytestring);
        }
        console.log("imagePreviewUrl", this.state.imagePreviewUrl);
        console.log("b5", this.state.bytestring);
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
        if (name == "left") {
            this.state.leftimage = this.state.fbase64;
            this.state.fbase64 = [];
            left = this.state.leftimage;
            images.leftimage = left;
            imagefiles.leftfileimage = event.target.files[0];
        }
        if (name == "back") {
            this.state.backimage = this.state.fbase64;
            this.state.fbase64 = [];
            back = this.state.backimage;
            images.backimage = this.state.backimage;
            imagefiles.backfileimage = event.target.files[0];
        }
        if (name == "right") {
            debugger;
            this.state.rightimage = this.state.fbase64;
            this.state.fbase64 = [];
            right = this.state.rightimage;
            images.rightimage = this.state.rightimage;
            imagefiles.rightfileimage = event.target.files[0];


        }

        this.setState({ images, imagefiles });
        this.Uploadfile(imagefiles, images, name);
        reader.readAsDataURL(event.target.files[0]);

        console.log("filwimage", images.frontimage);




        //console.log("picfiles", this.state.imagesDTO);
        //var data = new FormData();
        //data.append('file', event.target.files[0]);
        //data.append('filename', event.target.files[0].name);

        //console.log("data: ", event.target.files);

        //console.log("datafile", data);

    }







    render() {
        const { classes, loggingIn } = this.props;
        console.log(this.state);

        return (
            <div className={classes.container}>
                <GridContainer justify="center">
                    <GridItem xs={10}>
                        <Card>
                            <CardBody>
                                <GridContainer justify="center">
                                    <GridItem xs={4}>
                                        <CustomInput
                                            labelText="Vehicle Number"
                                            name="VehicleNumber"
                                            value={this.state.RiskObj.VehicleNumber}
                                            onChange={(e) => this.onInputChange(e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={4}>
                                        <CustomInput
                                            labelText="Make & Model"
                                            name="Model"
                                            value={this.state.RiskObj.Model}
                                            onChange={(e) => this.onInputChange(e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={4}>
                                        <CustomInput
                                            labelText="Year of Registration"
                                            name="YearofRegistration"
                                            value={this.state.RiskObj.YearofRegistration}
                                            onChange={(e) => this.onInputChange(e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer justify="center">
                                    {this.state.showDropZone ?
                                        <GridItem xs={3}>
                                            <Dropzone
                                                getUploadParams={this.getUploadParams}
                                                onChangeStatus={this.handleChangeStatus}
                                                onSubmit={(e) => this.uploadfilefront(e)}
                                                name="front"
                                                //value={this.state.RiskObj.Documents}
                                                accept="image/*,audio/*,video/*,application/pdf/*,word/*"
                                            />
                                        </GridItem> : null}
                                    {this.state.showrightDropZone ?
                                        <GridItem xs={3}>
                                            <Dropzone
                                                getUploadParams={this.getUploadParams}
                                                onChangeStatus={this.handleChangeStatus}
                                                onSubmit={(e) => this.uploadfilefront(e)}
                                                name="front"
                                                //value={this.state.RiskObj.Documents}
                                                accept="image/*,audio/*,video/*,application/pdf/*,word/*"
                                            />
                                        </GridItem> : null}
                                    {this.state.showfrontDropZone ?
                                        <GridItem xs={3}>
                                            <Dropzone
                                                getUploadParams={this.getUploadParams}
                                                onChangeStatus={this.handleChangeStatus}
                                                onSubmit={(e) => this.uploadfilefront(e)}
                                                name="front"
                                                //value={this.state.RiskObj.Documents}
                                                accept="image/*,audio/*,video/*,application/pdf/*,word/*"
                                            />
                                        </GridItem> : null}
                                    {this.state.showbackDropZone ?
                                        <GridItem xs={3}>
                                            <Dropzone
                                                getUploadParams={this.getUploadParams}
                                                onChangeStatus={this.handleChangeStatus}
                                                onSubmit={(e) => this.uploadfilefront(e)}
                                                name="front"
                                                //value={this.state.RiskObj.Documents}
                                                accept="image/*,audio/*,video/*,application/pdf/*,word/*"
                                            />
                                        </GridItem> : null}
                                </GridContainer>
                                {/*<GridContainer justify="center">
                                    <Button color="default" onClick={(e) => this.showleftOnClick(e, 'ImageType', 'left')}>
                                        left
                                         </Button>

                                    <Button color="default" onClick={(e) => this.showrightOnClick(e, 'ImageType', 'right')}>
                                        right
                                         </Button>
                                     <Button color="default" onClick={(e) => this.showfrontOnClick(e, 'ImageType', 'front')}>
                                        Front
                                         </Button> 

                                    <Button color="default" onClick={(e) => this.showbackOnClick(e, 'ImageType', 'back')}>
                                        Back
                                         </Button> 

                             
                                </GridContainer>*/}
                                {this.state.showleftDropZone ? <GridContainer >
                                    <GridItem xs={3}>
                                        <h6 style={{ top: '1.2rem', position: 'relative', left: '1.3rem' }}>Front</h6>
                                        <div className="container">
                                            <div className="avatar-upload">
                                                {/*<div className="avatar-edit">
                                                    <input type='file' onChange={(e) => this.fileSelectedHandlerfront(e, 'front')} accept=".png, .jpg, .jpeg" />
                                                    <label for="imageUpload"></label>
                                                </div>*/}
                                                <form action="/action_page.php">
                                                    <input type="file" name="myfile" onChange={(e) => this.fileSelectedHandlerfront(e, 'front')} />
                                                </form>
                                                <div className="avatar-preview">
                                                    <div id="imagePreview" style={{ backgroundImage: "url(" + this.state.frontimage + ")" }} />
                                                </div>
                                            </div>
                                        </div>
                                    </GridItem>
                                    <GridItem xs={3}>
                                        <h6 style={{ top: '1.2rem', position: 'relative', left: '1.3rem' }}>Left</h6>
                                        <div className="container">
                                            <div className="avatar-upload">
                                                {/*<div className="avatar-edit">
                                                    <input type='file' onChange={(e) => this.fileSelectedHandlerfront(e, 'left')} accept=".png, .jpg, .jpeg" />
                                                    <label for="imageUpload"></label>
                                                </div>*/}
                                                <form action="/action_page.php">
                                                    <input type="file" name="myfile" onChange={(e) => this.fileSelectedHandlerfront(e, 'left')} />
                                                </form>
                                                <div className="avatar-preview">
                                                    <div id="imagePreview" style={{ backgroundImage: "url(" + this.state.leftimage + ")" }} />
                                                </div>
                                            </div>
                                        </div>
                                    </GridItem>
                                    <GridItem xs={3}>
                                        <h6 style={{ top: '1.2rem', position: 'relative', left: '1.3rem' }}>Back</h6>
                                        <div className="container">
                                            <div className="avatar-upload">
                                                {/*<div className="avatar-edit">
                                                    <input type='file' onChange={(e) => this.fileSelectedHandlerback(e, 'back')} accept=".png, .jpg, .jpeg" />
                                                    <label for="imageUpload"></label>
                                                </div>*/}
                                                <form action="/action_page.php">
                                                    <input type="file" name="myfile" onChange={(e) => this.fileSelectedHandlerfront(e, 'back')} />
                                                </form>
                                                <div className="avatar-preview">
                                                    <div id="imagePreview" style={{ backgroundImage: "url(" + this.state.backimage + ")" }} />
                                                </div>
                                            </div>
                                        </div>
                                    </GridItem>
                                    <GridItem xs={3}>
                                        <h6 style={{ top: '1.2rem', position: 'relative', left: '1.3rem' }}>Right</h6>
                                        <div className="container">
                                            <div className="avatar-upload">
                                                {/*<div className="avatar-edit">
                                                    <input type='file' onChange={(e) => this.fileSelectedHandlerright(e, 'right')} accept=".png, .jpg, .jpeg" />
                                                    <label for="imageUpload"></label>
                                                </div>*/}
                                                <form action="/action_page.php">
                                                    <input type="file" name="myfile" onChange={(e) => this.fileSelectedHandlerfront(e, 'right')} />
                                                </form>
                                                <div className="avatar-preview">
                                                    <div id="imagePreview" style={{ backgroundImage: "url(" + this.state.rightimage + ")" }} />
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
                                    <Button color="primary" round onClick={this.Issuepolicy}> Issue Policy </Button>
                                </GridContainer>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}
AddVehicle.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(AddVehicle);
