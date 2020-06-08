import React, { isValidElement } from "react";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import role from "assets/img/users.png";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
//import productConfig from 'modules/Products/Micro/ProductConfig.js';
import RenumerationCofig from 'modules/Renumeration/RenumerationCofig.js';
import ReactTable from "components/MuiTable/MuiTable.jsx";
import swal from 'sweetalert';
import $ from 'jquery';
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Button from "components/CustomButtons/Button";
import Modal from '@material-ui/core/Modal';
import MyUploader from "./DropZone.jsx";
import { Animated } from "react-animated-css";
import TableContentLoader from "components/Loaders/TableContentLoader.jsx";
import data_Not_found from "assets/img/data-not-found-new.png"

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

const paddingCard =
{
    padding: "10px",
}

class Compensation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabledata: [],
            showtable: false,
            nodata: false,
            loader: true,
            pageloader: false,
        };
    }

    handleSubmit = (files) => {
        this.setState({ loader: false, showtable: false });
        let tabledata = this.state.tabledata;
        let table = this.tabledetails;
        let nodata = this.nodata;
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
            url: `${RenumerationCofig.RenumerationCofigURL}/api/Contract/IncentiveCalculation`,
            //url: `https://localhost:44315/api/Contract/IncentiveCalculation`,
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
                    table(response.incentive);
                    console.log("tabledata: ", tabledata);
                    //swal({
                    //    text: response.responseMessage,
                    //    icon: "success"
                    //});
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
                nodata();
                swal({
                    text: "File uploading unsuccessful",
                    icon: "error"
                });
            }
        });
        console.log("tabledata: ", tabledata);
    }

    nodata = () => {
        this.setState({ nodata: true });
    }

    searchagain = () => {
        this.setState({ nodata: false });
        //window.scrollTo(0, this.myref.current.offsetTop);
        //window.scrollTo({
        //    top: 0,
        //    left: 0,
        //    behavior: 'smooth'
        //})
        //window.focus();
        window.scrollTo(0, 0);
        //window.location.reload();
        //this.myRef.current.scrollTo(0, 0);
        //let intervalid = setinterval(this.scrollstep.bind(this), this.props.delayinms);
        //this.setstate({ intervalid: intervalId })
    }

    tabledetails = (data) => {
        if (data.length > 0) {
            this.setState({ loader: true, showtable: true });
            this.setState({
                tabledata: data.map((prop, key) => {
                    const { classes } = this.props;
                    return {
                        empCode: prop.EmpCode,
                        empName: prop.EmpName,
                        incentiveName: prop.IncentiveName,
                        channel: prop.Channel,
                        subChannel: prop.SubChannel,
                        designation: prop.Designation,
                        level: prop.Level,
                        incentiveAmount: prop.IncentiveAmount,
                        anp: prop.ANP,
                        rp: prop.RP,
                        incentiveRate: prop.IncentiveRate,
                        incentiveValue: prop.IncentiveValue,
                    }
                })
            })
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12} >
                    <Card>
                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                                <Icon><img id="icon" src={role} /></Icon>
                            </CardIcon>
                            {
                                <h4 >
                                    <small> Compensation </small>
                                </h4>
                            }
                        </CardHeader>
                        <CardBody>
                            <GridContainer justify="center">
                                <GridItem xs={6} sm={6} md={6}>
                                    <h4>Upload excel here</h4>
                                    <MyUploader handleSubmit={this.handleSubmit} />
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                    </Card>
                    {this.state.loader ?
                        <GridContainer xl={12}>
                            {this.state.showtable ?
                                <GridItem lg={12}>
                                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                        <ReactTable
                                            //title={"Users"}
                                            data={this.state.tabledata}
                                            filterable
                                            columns={[
                                                {
                                                    Header: "Emp Code",
                                                    accessor: "empCode",
                                                    setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                    headerClassName: 'react-table-center',
                                                    minWidth: 40,
                                                    resizable: false,
                                                },
                                                {
                                                    Header: "Employer Name",
                                                    accessor: "empName",
                                                    setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                    headerClassName: 'react-table-center',
                                                    minWidth: 40,
                                                    resizable: false,
                                                },
                                                {
                                                    Header: "Incentive Name",
                                                    accessor: "incentiveName",
                                                    setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                    headerClassName: 'react-table-center',
                                                    minWidth: 40,
                                                    resizable: false,
                                                },
                                                {
                                                    Header: "Channel",
                                                    accessor: "channel",
                                                    setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                    headerClassName: 'react-table-center',
                                                    minWidth: 40,
                                                    resizable: false,
                                                },
                                                {
                                                    Header: "Sub Channel",
                                                    accessor: "subChannel",
                                                    setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                    headerClassName: 'react-table-center',
                                                    minWidth: 40,
                                                    resizable: false,
                                                },
                                                {
                                                    Header: "Designation",
                                                    accessor: "designation",
                                                    setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                    headerClassName: 'react-table-center',
                                                    minWidth: 40,
                                                    resizable: false,
                                                },
                                                {
                                                    Header: "Level",
                                                    accessor: "level",
                                                    setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                    headerClassName: 'react-table-center',
                                                    minWidth: 40,
                                                    resizable: false,
                                                },
                                                {
                                                    Header: "Incentive Amount",
                                                    accessor: "incentiveAmount",
                                                    setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                    headerClassName: 'react-table-center',
                                                    minWidth: 30,
                                                    resizable: false,
                                                },
                                                {
                                                    Header: "ANP",
                                                    accessor: "anp",
                                                    setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                    headerClassName: 'react-table-center',
                                                    minWidth: 30,
                                                    resizable: false,
                                                },
                                                {
                                                    Header: "RP",
                                                    accessor: "rp",
                                                    setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                    headerClassName: 'react-table-center',
                                                    minWidth: 30,
                                                    resizable: false,
                                                },
                                                {
                                                    Header: "Incentive Rate",
                                                    accessor: "incentiveRate",
                                                    setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                    headerClassName: 'react-table-center',
                                                    minWidth: 30,
                                                    resizable: false,
                                                },
                                                {
                                                    Header: "Incentive Value",
                                                    accessor: "incentiveValue",
                                                    setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                                    headerClassName: 'react-table-center',
                                                    minWidth: 30,
                                                    resizable: false,
                                                },
                                            ]}
                                            defaultPageSize={5}
                                            showPaginationTop={false}
                                            //pageSize={([this.state.data.length + 1] < 5) ? [this.state.data.length + 1] : 5}
                                            showPaginationBottom={true}
                                            className="-striped -highlight"
                                        />
                                    </Animated>
                                </GridItem>
                                : <GridItem lg={12}>{
                                    this.state.nodata ?
                                        <Card>
                                            <GridContainer lg={12} justify="center">
                                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                    <img src={data_Not_found} className="tab-data-not-found" />
                                                </Animated>
                                            </GridContainer>
                                            <GridContainer lg={12} justify="center">
                                                <GridItem xs={5} sm={3} md={3} lg={1} >
                                                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                        <Button className="secondary-color" round onClick={() => this.searchagain()}>Try Again</Button>
                                                    </Animated>
                                                </GridItem>
                                            </GridContainer>
                                        </Card>
                                        : null
                                }
                                </GridItem>
                            }
                        </GridContainer>
                        :
                        <Card style={paddingCard}>
                            <TableContentLoader />
                        </Card>
                    }
                </GridItem>
            </GridContainer >
        );
    }
}
export default withStyles(style)(Compensation);