import Dropzone from 'react-dropzone-uploader';
import React, { Component } from 'react';
import $ from 'jquery';
import swal from 'sweetalert';
import CardHeader from "components/Card/CardHeader.jsx";
import Card from "components/Card/Card.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CardBody from "components/Card/CardBody.jsx";
import ReactTable from "components/MuiTable/MuiTable.jsx";
import policyConfig from 'modules/Policy/PolicyConfig.js';
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import FileUploadConfig from "modules/FileUpload/FileUploadConfig.js";

const MyUploader = (props) => {

    let [TableDataCopy, RefundTableHeaderFun] = React.useState([]);
    let [ShowGrid, GridFun] = React.useState(false);
    let [errorList, errorListFun] = React.useState([]);
    let TableDataList = [];
    console.log("doc props ", props)
    // specify upload params and url for your files
    const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }

    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }

    // receives array of files that are done uploading when submit button is clicked
    const handleSubmit = (files) => {
        console.log("SubmitData", files.map(f => f.meta))
        var data = new FormData();
        if (files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                data.append(files[i].file.name, files[i].file);

            }
        }

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
                console.log("response ", response);

                if (response.status == 1) {
                    GridFun(false);
                    swal({

                        text: response.responseMessage,
                        icon: "success"
                    });
                } else if (response.status == 7) {
                    if (response.errorDetails.length > 0) {
                        GridFun(true);
                        errorListFun(response.errorDetails);
                        RefundTableHeader(response.errorDetails);
                    }
                    swal({
                        text: response.responseMessage,
                        icon: "success"
                    });

                }
                else {
                }
            },
            error: function () {
                GridFun(false);
                swal({
                    text: "File uploading unsuccessful",
                    icon: "error"
                });
            }
        });


    }

    const RefundTableHeader = (activityDTOs) => {

        TableDataList = Object.keys(activityDTOs[0]).map((prop, key) => {
            return {
                Header: prop.charAt(0).toUpperCase() + prop.slice(1),
                accessor: prop,
            };

        })
        RefundTableHeaderFun(TableDataList);

        console.log("table data", TableDataList, errorList);
    }

    return (
        <GridContainer lg={12}>
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
                                getUploadParams={getUploadParams}
                                onChangeStatus={handleChangeStatus}
                                onSubmit={handleSubmit}
                            //accept="image/*,audio/*,video/*,application/pdf/*,word/*"
                            />
                        </GridItem>
                    </GridContainer>


                    {ShowGrid && <GridContainer justify="center" >
                        <GridItem xs={12}>

                            <ReactTable
                                title={<h5><TranslationContainer translationKey={"Refund Upload Errors"} /></h5>}

                                data={errorList}
                                filterable
                                columns={TableDataCopy}
                                defaultPageSize={4}
                                pageSize={([errorList.length + 1] < 4) ? [errorList.length + 1] : 4}
                                showPaginationTop={false}
                                //showPaginationBottom={([this.state.data.length + 1] <= 5) ? false : true}
                                showPaginationBottom={true}
                                className="-striped -highlight discription-tab"

                            />

                        </GridItem>

                    </GridContainer>}
                </CardBody>
            </Card>
        </GridContainer>
    );
}

export default MyUploader;
