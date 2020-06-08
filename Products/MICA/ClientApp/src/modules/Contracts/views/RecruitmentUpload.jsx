import React, { isValidElement } from "react";
import Dropzone from 'react-dropzone-uploader';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import role from "assets/img/users.png";
import $ from 'jquery'
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
//import productConfig from 'modules/Products/Micro/ProductConfig.js';
import ContractConfig from 'modules/Contracts/ContractConfig.js';
//import ReactTable from "components/MuiTable/MuiTable.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import swal from 'sweetalert';
import { Animated } from "react-animated-css";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Button from "components/CustomButtons/Button";
import ReactTable from "components/MuiTable/MuiTable.jsx";
//import { config } from "../../../../config";

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

class RecruitmentUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ErrorResponose: [],
            newdata: [],
            flag: false

        };
        // this.handlesubmit = this.handlesubmit.bind(this);
    }



    componentDidMount() {
        //fetch(`${ContractConfig.ContractConfigURL}/api/Organization/GetEntityMaster`, {
        //    method: 'GET',
        //    headers: {
        //        'Accept': 'application/json',
        //        'Content-Type': 'application/json',
        //        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
        //    },
        //}).then(response => response.json())
        //    .then(data => {
        //        this.setState({ masterList: data });
        //        console.log("masterlist", this.state.masterList);
        //        if (this.state.masterList.length > 0) {
        //            this.Datatable();
        //        }

        //    });
        //console.log("mastertype: ", this.state.mastertype);
    }
    //${ContractConfig.ContractConfigURL}/api/Organization/AddMasterData
    handleChange = (event) => {
        this.handleinputvalue(event);
    }
    handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }
    handleSubmit = (files) => {
        console.log("SubmitData", files.map(f => f.meta))
        var data = new FormData();
        if (files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                data.append(files[i].file.name, files[i].file);

            }
        }
        let that = this;
        $.ajax({
            type: "POST",
            url: `${ContractConfig.ContractConfigURL}/api/Contract/ContractUpload`,

            //url: `https://localhost:44315/api/Contract/ContractUpload`,
            // url: `http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com/api/Contract/ContractUpload`,

            contentType: false,
            processData: false,

            data: data,
            beforeSend: function (xhr) {
                /* Authorization header */
                xhr.setRequestHeader("Authorization", 'Bearer ' + localStorage.getItem('userToken'));
            },
            success: function (response) {
                console.log("response ", response);
                console.log("response Errors", response.errors);
                //this.state.ErrorResponose = response.errors;
                //DataGrid(response.errors);
                //if (response.errors.length > 0) {
                //    this.state.flag = true;
                //}
                that.setState({
                    flag: true,
                    newdata: response.errors.map((prop, key) => {
                        return {
                            RecruitmentNumber: prop.propertyName,
                            ErroDescription: prop.errorMessage,


                        };
                    })
                })
                console.log("new data", that.state.newdata
                )


                swal({
                    text: response.responseMessage,
                    icon: "success"
                });


            }
        })

    }
    DataGrid(data) {
        this.setState({
            newdata: data.map((prop, key) => {
                return {
                    ErroDescription: prop.errorMessage,

                };
            })
        });
    }

    handleinputvalue = (event) => {
        let entity = this.state.entityDTO;
        let name = event.target.name;
        let value = event.target.value;
        entity[name] = value;

        this.setState({ entity });
        this.state.error = false;
        for (let i = 0; i < this.state.mastertype.length; i++) {
            if (this.state.mastertype[i] == this.state.entityDTO.masterType) {
                return this.setState({ error: true });
            }
        }
        console.log("Error: ", this.state.error)
    }

    render() {
        return (
            <div>
                <Card >
                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                            <Icon><img id="icon" src={role} /></Icon>
                        </CardIcon>
                        {
                            <h4 >
                                <small> Recruitment Upload </small>
                            </h4>
                        }
                    </CardHeader>
                    <CardBody>

                    </CardBody>
                </Card>
                <GridContainer justify="center">

                    <GridItem xs={12}>
                        <Dropzone
                            maxFiles={1}
                            // getUploadParams={getUploadParams}
                            onChangeStatus={this.handleChangeStatus}
                            onSubmit={this.handleSubmit}
                        //accept="image/*,audio/*,video/*,application/pdf/*,word/*"
                        />
                    </GridItem>




                </GridContainer>

                {this.state.flag &&
                    <GridContainer>
                        <GridItem xs={12}>
                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                <CardBody className="product-search-tab">
                                    <ReactTable
                                        title={"Contrct Upload Details"}
                                        data={this.state.newdata}
                                        filterable
                                        columns={[
                                            {
                                                Header: "RecruitmentNumber",
                                                accessor: "RecruitmentNumber",
                                                minWidth: 30,
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                resizable: false,

                                            },
                                            {
                                                Header: "ErrorDescription",
                                                accessor: "ErroDescription",
                                                minWidth: 30,
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                resizable: false,

                                            }

                                        ]}
                                        defaultPageSize={5}
                                        showPaginationTop={false}
                                        //pageSize={([this.state.newdata.length + 1] < 5) ? [this.state.newdata.length + 1] : 5}
                                        showPaginationBottom
                                        className="-striped -highlight"
                                    />
                                </CardBody>
                            </Animated>
                        </GridItem>




                    </GridContainer>

                }

            </div>
        );
    }
}

export default withStyles(style)(RecruitmentUpload);
