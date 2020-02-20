import Dropzone from 'react-dropzone-uploader';
import React, { Component } from 'react';
import $ from 'jquery'
import swal from 'sweetalert';
import ClaimConfig from 'modules/Claims/ClaimConfig.js';

const MyUploader = () => {
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
                // console.log("files[i].name", files[i].file.name);
                //console.log("files[i]", files[i].file);
            }
        }

        $.ajax({
            type: "POST",
            url: `${ClaimConfig.claimConfigUrl}/api/ClaimManagement/Import/import`,
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
                    swal({
                        text: response.responseMessage,
                        icon: "success"
                    });
                } else if (response.status == 7) {
                    swal({
                        text: response.responseMessage,
                        icon: "error"
                    });
                }
                else {
                }
            },
            error: function () {
                swal({
                    text: "File uploading unsuccessful",
                    icon: "error"
                });
            }
        });


    }

    return (

        <Dropzone
            maxFiles={1}
            getUploadParams={getUploadParams}
            onChangeStatus={handleChangeStatus}
            onSubmit={handleSubmit}
        //accept="image/*,audio/*,video/*,text/*,excel/*,pdf/*,word/*"
        />
    );
}
export default MyUploader;
