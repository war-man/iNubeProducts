import Dropzone from 'react-dropzone-uploader';
import React, { Component } from 'react';
import $ from 'jquery';
import swal from 'sweetalert';
import BillingConfig from "modules/Billing/BillingConfig.js";
import CardHeader from "components/Card/CardHeader.jsx";
import Card from "components/Card/Card.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";


const MyUploader = (props) => {
   
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
        debugger
        $.ajax({
            type: "POST",
            url: `${BillingConfig.BillingConfigUrl}/api/Billing/UploadFiles/UploadFiles?contractId=`+props.contractId,
            contentType: false,
            processData: false,
            data: data,
            beforeSend: function (xhr) {
                /* Authorization header */
                xhr.setRequestHeader("Authorization", 'Bearer ' + localStorage.getItem('userToken'));
                
            },
            success: function () {
                swal({
                    text: "Document Uploaded Successful",
                    icon: "success"
                }); 
                //history.push('/');
            },
            error: function () {
                swal({
                    text: "Document Uploaded Failed",
                    icon: "error"
                }); 
                //alert("There was error uploading files!");
            }
        });


    }

    return (
        <div>
        <GridContainer>
            <CardHeader color="info" icon >

                {
                    <h3 >
                        <small> Documents </small>
                    </h3>
                }
            </CardHeader>
       
            <Dropzone
                    getUploadParams={getUploadParams}
                    onChangeStatus={handleChangeStatus}
                    onSubmit={handleSubmit}
                    //contractId={props.contractId}
                />
            </GridContainer>
        </div>
    );
}
export default MyUploader;
