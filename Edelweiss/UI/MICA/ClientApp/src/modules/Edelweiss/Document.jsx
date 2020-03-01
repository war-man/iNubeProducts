﻿import Dropzone from 'react-dropzone-uploader';
import React, { Component } from 'react';
import $ from 'jquery'
import swal from 'sweetalert';
import ClaimConfig from 'modules/Claims/ClaimConfig.js';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";


const MyUploader = (props) => {

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
                console.log("dattaaa", data);
                //console.log("files[i]", files[i].file);
            }
        }
       
        $.ajax({
            type: "POST",
           // url: "http://localhost:53000/api/DMS/Documentupload/Documentupload",
            url: `https://inubeservicesnotification.azurewebsites.net/api/DMS/Documentupload/Documentupload`,
       
            contentType: false,
            processData: false,

            data: data,
            beforeSend: function (xhr) {
                /* Authorization header */
                xhr.setRequestHeader("Authorization", 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI5NTc4NmM2OS0xNjAxLTQzMGQtODM1Ni01M2RlNDUyZjUxZTYiLCJFbWFpbCI6InZpdGFsQGludWJlc29sdXRpb25zLmNvbSIsIk9yZ0lkIjoiMTEyIiwiUGFydG5lcklkIjoiMCIsIlJvbGUiOiJEZW1vIFJvbGUiLCJOYW1lIjoidml0aGFsIiwiVXNlck5hbWUiOiJ2aXRhbEBpbnViZXNvbHV0aW9ucy5jb20iLCJQcm9kdWN0VHlwZSI6Ik1pY2EiLCJTZXJ2ZXJUeXBlIjoiMSIsImV4cCI6MTY3MDY1NDMzMCwiaXNzIjoiSW51YmUiLCJhdWQiOiJJbnViZU1JQ0EifQ.nZsItQ97TGtSZ-IrZ8SlDeOCIKnaCI4tmeLC953z9qA');
            },
            success: function (data) {
                console.log("datamongo", data);
                props.docidfunc(data);
               // props.dmsdocId = data.docId;
                //console.log("docid", props.dmsdocId);
                swal({
                    text: "Document uploaded successfully!",
                    icon: "success"
                });
            },
            error: function (data) {

                swal({
                    text: "Document upload failed!",
                    icon: "error"
                });
            }
            
        });
       

    }


    return (

        <GridContainer lg={12}>
            <CardHeader color="info" icon >

                {
                    <h3 >
                        <small><TranslationContainer translationKey="UploadDocument" /></small>

                        {/* <span id="red" style={{ color: 'red' }}>*</span>*/}
                    </h3>
                }
            </CardHeader>
            <GridItem xs={12}>
            <Dropzone 
                getUploadParams={getUploadParams}
                onChangeStatus={handleChangeStatus}
                onSubmit={handleSubmit}
                accept="image/*,audio/*,video/*,application/pdf/*,word/*"
                />
            </GridItem>
        </GridContainer>
    );
}
export default MyUploader;