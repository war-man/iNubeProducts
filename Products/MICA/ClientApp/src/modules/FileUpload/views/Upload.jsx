import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import ReactTable from "components/MuiTable/MuiTable.jsx";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import $ from 'jquery';
import money from "assets/img/money.png";
import swal from 'sweetalert';
//import CustomDatetime from "components/CustomComponent/CustomDatetimeFormate.jsx";

import Visibility from "@material-ui/icons/Visibility";
import GetApp from "@material-ui/icons/GetApp";
import Edit from "@material-ui/icons/Edit";
import { Link } from 'react-router-dom';
import data_Not_found from "assets/img/data-not-found-new.png";
import TableContentLoader from "components/Loaders/TableContentLoader.jsx";
import PageContentLoader from "components/Loaders/PageContentLoader.jsx";
import { Animated } from "react-animated-css";
import bindModel from 'components/ModelBinding/bindModel.js';
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import MyUploader from "modules/FileUpload/views/DocumentUpload.jsx";
import FileUploadConfig from "modules/FileUpload/FileUploadConfig.js";
import Dropzone from 'react-dropzone-uploader';

class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: true,
            pageloader: false,
            nodata: false,
            typeList: [{ "mID": 1, "mValue": "Refund Upload", "mType": "FileName" },
                { "mID": 2, "mValue": "Monthly SI Upload ", "mType": "FileName" },
                { "mID": 3, "mValue": "PB Exception Upload", "mType": "FileName" }],
            fields: {
                FileName:"",
            },
            showUpload: false,
            monthly: [],
            GridFun: false,
            ShowGrid: false,
            errorListFun: [],
            errorList: [],
            TableDataList: [],
            TableDataCopy: [],
            RefundTableHeaderFun: [],
            monthlyDetailsData: [],
            monthlyData: [],
            mflag: false,
            responseErrors:[],
            resErrors:[],
        };
    }


 
// specify upload params and url for your files
// getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }

// called every time a file's `status` changes
 handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }

    onInputParamChange = (evt) => {
        console.log('Event', evt);
        const fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
        this.state.showUpload = true;
    }

// receives array of files that are done uploading when submit button is clicked
    handleSubmit = (files) => {
        debugger
        console.log("SubmitData", files.map(f => f.meta))
        var data = new FormData();
        if (files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                data.append(files[i].file.name, files[i].file);

            }
        }

        var mdata = new FormData();
        if (files.length > 0) {
            for (var j = 0; j < files.length; j++) {
                mdata.append(files[j].file.name, files[j].file);

            }
        }
     
        if (this.state.fields.FileName == 1) {
            $.ajax({
                type: "POST",
                url: `${FileUploadConfig.FileUploadConfigUrl}/api/Policy/RefundUpload`,
                contentType: false,
                processData: false,

                data: data,
                beforeSend: function (xhr) {
                    /* Authorization header */
                    xhr.setRequestHeader("Authorization", 'Bearer ' + localStorage.getItem('userToken'));
                },
                success: function (response) {
                    console.log("response ", response);

                    if (response.status == 1) {

                        console.log("errorDetails", response.errorDetails);
                        //this.setState({
                        //    GridFun: true,
                        //    errorListFun: response.errorDetails
                        //});
                        //this.RefundTableHeader(response.errors);
                        swal({

                            text: response.responseMessage,
                            icon: "success"
                        });

                    } else {
                        // if (response.errorDetails.length > 0) {
                        response.errorDetails.map((prop, index) => {

                            if (prop.errorDescription != undefined) {
                                if (prop.errorDescription.length > 0) {
                                    prop.errorDescription = prop.errorDescription.map(c => {
                                        return (<p className="gridparagraph">{c.Details} </p>)
                                    })
                                }
                            }
                            else {
                                return response.errorDetails[index];
                            }
                        }
                        );



                        this.setState({
                            GridFun: true,
                            errorListFun: response.errorDetails
                        });
                        if (response.errorDetails.length > 0) {
                            this.RefundTableHeader(response.errorDetails);
                        }
                        //}
                        swal({
                            text: response.responseMessage,
                            icon: "success"
                        });
                        console.log("check", response.responseMessage);
                    }

                }.bind(this),
                error: function () {

                    this.setState({
                        GridFun: false
                    });
                    swal({
                        text: "File uploading unsuccessful",
                        icon: "error"
                    });
                }.bind(this)
            });
        }

        else if (this.state.fields.FileName == 2) {
            $.ajax({
                type: "POST",
                url: `${FileUploadConfig.FileUploadConfigUrl}/api/Mica_EGI/MonthlySIUpload`,
                //https://localhost:44351/api/Policy/RefundUpload
                //url: `https://localhost:44351/api/Policy/RefundUpload`,
                contentType: false,
                processData: false,

                data: data,
                beforeSend: function (xhr) {
                    /* Authorization header */
                    xhr.setRequestHeader("Authorization", 'Bearer ' + localStorage.getItem('userToken'));
                },
                success: function (response) {
                    console.log("response ", response, response.errors, response.status);


                    if (response.status == 1) {
                        this.setState({
                            mflag: true,
                            monthlyData: response.errors,

                        });
                        if (response.errors.length>0) {
                            this.tabledata(response.errors);
                        }
                        swal({
                            text: response.responseMessage,
                            icon: "success"
                        });


                    } else {
                        this.setState({
                            mflag: true,
                            monthlyData: response.errors,

                        });
                        if (response.errors.length > 0) {
                            this.tabledata(response.errors);
                        }
                        swal({
                            text: response.responseMessage,
                            icon: "error"
                        });
                        console.log("check", response.responseMessage);
                    }

                }.bind(this),

            });
        } else if (this.state.fields.FileName == 3) {
            $.ajax({
                type: "POST",
                url: `${FileUploadConfig.FileUploadConfigUrl}/api/Policy/RefundReportUpload`,
               // url: `https://localhost:44351/api/Policy/RefundReportUpload`,
                contentType: false,
                processData: false,

                data: data,
                beforeSend: function (xhr) {
                    /* Authorization header */
                    xhr.setRequestHeader("Authorization", 'Bearer ' + localStorage.getItem('userToken'));
                },
                success: function (response) {
                    console.log("response ", response);

                    if (response.status == 1) {

                        console.log("errorDetails", response.errorDetails);
        
                        swal({

                            text: response.responseMessage,
                            icon: "success"
                        });

                    } else {
                        // if (response.errorDetails.length > 0) {
                        response.errorDetails.map((prop, index) => {

                            if (prop.errorDescription != undefined) {
                                if (prop.errorDescription.length > 0) {
                                    prop.errorDescription = prop.errorDescription.map(c => {
                                        return (<p className="gridparagraph">{c.Details} </p>)
                                    })
                                }
                            }
                            else {
                                return response.errorDetails[index];
                            }
                        }
                        );



                        this.setState({
                            GridFun: true,
                            errorListFun: response.errorDetails
                        });
                        if (response.errorDetails.length > 0) {
                            this.RefundTableHeader(response.errorDetails);
                        }
                        //}
                        swal({
                            text: response.responseMessage,
                            icon: "success"
                        });
                        console.log("check", response.responseMessage);
                    }

                }.bind(this),
                error: function () {

                    this.setState({
                        GridFun: false
                    });
                    swal({
                        text: "File uploading unsuccessful",
                        icon: "error"
                    });
                }.bind(this)
            });

        }
}

    RefundTableHeader = (errors) => {
        console.log("errors", errors);
        this.state.resErrors = errors;
        this.setState({GridFun:true});
        this.setState({
            TableDataList: Object.keys(errors[0]).map((prop, key) => {
            return {
                Header: prop.charAt(0).toUpperCase() + prop.slice(1),
                accessor: prop,
                };
                this.setState({});
            })
        });
    }

    tabledata = (errors) => {
       // debugger
        this.state.responseErrors = errors;
        this.setState({ mflag: true });
        console.log("Monthly", this.state.monthlyData);
        this.setState({
            monthlyDetailsData: this.state.responseErrors.map((prop, key) => {
                return {
                    SNo: key + 1,
                    ErrorCode: prop.errorCode,
                    ErrorMessage: prop.errorMessage,
                    PropertyName: prop.propertyName
                };
            })
        });
    }

    render() {
        return (
           
             <div>
                        <Card>
                            <CardHeader color="rose" icon>
                                <CardIcon color="rose">
                                    <Icon><img id="icon" src={money} /></Icon>
                                </CardIcon>
                                {
                                    <h4 >
                                        <small> <TranslationContainer translationKey="File Upload" /> </small>
                                    </h4>
                                }
                            </CardHeader>
                    <CardBody>
                        <div>
                            <GridContainer>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <Dropdown
                                            labelText="File Name"
                                            id="FileName"
                                            value={this.state.fields.FileName}
                                            lstObject={this.state.typeList}
                                            name='FileName'
                                           onChange={this.onInputParamChange}
                                           // onChange={this.handleSubmit}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                            </GridContainer>
                        </div>
                            </CardBody>
                </Card>

                {this.state.showUpload &&
                    <Card>
                        <CardHeader color="info" icon >



                            <h3 >
                                <small> Upload Document:</small>

                                <span id="red" style={{ color: 'red' }}>*</span>
                            </h3>

                        </CardHeader>

                        <CardBody>

                            <GridContainer justify="center">

                                <GridItem xs={12}>
                                    <Dropzone
                                        maxFiles={1}
                                       // getUploadParams={this.getUploadParams}
                                        onChangeStatus={this.handleChangeStatus}
                                        onSubmit={this.handleSubmit}
                                    //accept="image/*,audio/*,video/*,application/pdf/*,word/*"
                                    />
                                </GridItem>
                            </GridContainer>


                        {this.state.GridFun &&
                                <GridContainer justify="center" >
                                    <GridItem xs={12}>

                                        <ReactTable
                                            title={<h5><TranslationContainer translationKey={"Refund Upload Errors"} /></h5>}

                                            data={this.state.resErrors}
                                            filterable
                                            columns={this.state.TableDataList}
                                            defaultPageSize={4}
                                            pageSize={([this.state.errorList.length + 1] < 4) ? [this.state.errorList.length + 1] : 4}
                                            showPaginationTop={false}
                                            //showPaginationBottom={([this.state.data.length + 1] <= 5) ? false : true}
                                            showPaginationBottom={true}
                                            className="-striped -highlight discription-tab"

                                        />

                                    </GridItem>

                                </GridContainer>}
                        </CardBody>
                    </Card>
                }

                {this.state.mflag &&
                <GridContainer>
                 <GridItem lg={12}>
                                                        <ReactTable
                                    title=<TranslationContainer translationKey={"Monthly SI Error Details"} />
                                                            data={this.state.monthlyDetailsData}
                                                            filterable

                                                            columns={[

                                                                {

                                                                    Header: "Error Code",
                                                                    accessor: "ErrorCode",
                                                                    headerClassName: 'react-table-center',
                                                                    //minWidth: 40,
                                                                    resizable: false,
                                                                },
                                                                {
                                                                    Header: "Error Message",
                                                                    accessor: "ErrorMessage",
                                                                    style: { textAlign: "center" },
                                                                    headerClassName: 'react-table-center',
                                                                    //minWidth: 40,
                                                                    resizable: false,
                                                                },
                                                                {
                                                                    Header: "Property Name",
                                                                    accessor: "PropertyName",
                                                                    headerClassName: 'react-table-center',
                                                                    //minWidth: 40,
                                                                    resizable: false,
                                                                },
                                                            ]}

                                                            defaultPageSize={5}
                                                            showPaginationTop={false}
                                                            //pageSize={([this.state.Policydetailsdata.length + 1] < 5) ? [this.state.Policydetailsdata.length + 1] : 5}
                                                            showPaginationBottom
                    className="-striped -highlight discription-tab"
                />
                                                    </GridItem>
                </GridContainer>
                    }
                        </div>
        );
    }
}
export default Upload;