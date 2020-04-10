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

class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: true,
            pageloader: false,
            nodata: false,
            typeList: [{ "mID": 1, "mValue": "Refund Upload", "mType": "FileName" },
                { "mID": 2, "mValue": "Monthly SI Upload ", "mType": "FileName" }],
            fields: {
                FileName:"",
            },
            showUpload:false,
        };
    }

    onInputParamChange = (evt) => {
        console.log('Event', evt);
        const fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
        this.state.showUpload = true;
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
                                            //required={true}
                                            //model="InvoiceSearchHistory"
                                            //filterName='InvoiceStatus'
                                            name='FileName'
                                            onChange={this.onInputParamChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                            </GridContainer>

                            {this.state.showUpload &&
                                    <MyUploader
                                        handleChange={this.handleChange}
                                        getUploadParams={this.state.getUploadParams}
                                        onChangeStatus={this.state.handleChangeStatus}
                                        onSubmit={this.state.handleSubmit}
                                        fields={this.state.fields}
                                        //ContractData={this.state.contractId}
                                        //contractId={this.state.contractId}
                                        onInputParamChange={this.onInputParamChange}
                                    />
                            }

                        </div>
                            </CardBody>
                </Card>

               
                        </div>

        );
    }
}
export default Upload;