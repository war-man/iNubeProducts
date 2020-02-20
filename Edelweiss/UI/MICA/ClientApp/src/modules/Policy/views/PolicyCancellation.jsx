import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import $ from 'jquery';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
//import ReactTable from "react-table";
import user from "assets/img/user.png";
import swal from 'sweetalert';
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import policyConfig from 'modules/Policy/PolicyConfig.js';
import { Redirect } from 'react-router-dom';
import ReactTable from "components/MuiTable/MuiTable.jsx";
import { Animated } from "react-animated-css";



function rand() {
    return Math.round(Math.random() * 20) - 10;
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: '60%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',

    },
});

class PolicyCancellation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showtable: false,
            redirect: false,
            EndorsementStatusData: [],
            Policydetailsdata: [],
            editModal: false,
            btnvisibility: false,
            disabled: false,
            open: false,
            simpleSelect: "",
            selectedValue: null,
            masterList: [],
            Policydetails: [],
            rowData: {},
            eventId: "",
            policyNumber: "",
            policynumber: "",
            remarks: "",
            eventId: "",
            policyStatusId: "",
            display: false,
            PartnerData: [],
            ProductData: [],
            datalist: [],
            PolicyData: [],
            Policydata: {
                PartnerId: "",
            },
            show: false,
            submitshow: false,
            PolicyDTO: {
                // policyNumber: "",
                //PartnerId: "",



            },
            CancellationDTO: {
                policynumber: "",
                remarks: "",
                eventId: "",
                policyStatusId: ""
            }

        };

    }

    dropDown = () => {
        if (this.state.CancellationDTO.policynumber !== "") {
            this.setState({ show: true });
        }
    }



    submit = () => {
        let that = this;
        if (this.state.CancellationDTO.policynumber !== "") {
            console.log("CancellationDTO", this.state.CancellationDTO);
            swal("Are you sure you want to cancel  policy", {
                buttons: {
                    cancel: {
                        text: "No",
                        value: true,
                        visible: true,
                        className: "",
                       
                        closeModal: true,
                    },
                    confirm: {
                        text: "Yes",
                        value: "confirm",
                        visible: true,
                        className: "",
                        closeModal: true
                    }
                }

            }).then((value) => {
                console.log("policyDTO", this.state.CancellationDTO)
                switch (value) {

                    case "confirm":

                        fetch(`${policyConfig.policyConfigUrl}/api/Policy/PolicyCancellation`, {
                            method: 'post',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                            },
                            body: JSON.stringify(this.state.CancellationDTO)
                        }).then(function (response) {
                            return response.json();
                        }).then(function (data) {
                            console.log("data", data);
                            swal("", data, "success").then(() => {
                                that.setState({ redirect: true });
                                that.renderRedirect();
                            });
                        });
                        break;
                }
            }
            );
        }
    }

    onInputPolicyChange = (evt) => {
        this.setState({ submitshow: true });
        console.log('Event', evt);
        let fields = this.state.CancellationDTO;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
    }


    editFunction(id, pNO) {

        var orgArr = this.state.Policydetails;
        var partArr = [];
        $.each(orgArr, function (k, v) {
            if (v.policyNo == pNO) {
                partArr.push(orgArr[id]);
            }
        })

        this.state.CancellationDTO.policynumber = partArr[0].policyNo;
    }

    SetValue = event => {
        //this.setState({ [event.target.name]: event.target.value });
        //if (event.target.name === "policynumber") {
        //    this.setPolicyValue(event);
        //}
        let CancellationDTO = this.state.CancellationDTO;
        CancellationDTO[event.target.name] = event.target.value;
        this.setState({ CancellationDTO });
        console.log("CancellationDTO", this.state.CancellationDTO);
    };

    componentDidMount() {
        fetch(`${policyConfig.partnerconfigUrl}/api/Partner/GetMasterDataAsync?sMasterlist=Partner`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ PartnerData: data });
            });
        ////////////////////////////////////////////////////////////////////////////////////////////

        fetch(`${policyConfig.policyConfigUrl}/api/Policy/GetMasterData?sMasterlist=EndorsementStatus`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ EndorsementStatusData: data });
            });

        ////////////////////////////////////////////////////////////////////////////
    }
    setPolicyValue = (event) => {

        let policy = this.state.PolicyDTO;
        policy[event.target.name] = event.target.value;
        this.setState({ policy });
        if (event.target.name === "PartnerId") {
            this.setState({ submitshow: true });
        }
    }
    showPolicyTable = () => {
        //document.getElementById('searchTableSec').style.display = 'block';
        this.setState({ showtable: true });
        fetch(`${policyConfig.policyConfigUrl}/api/Policy/PolicySearch`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.CancellationDTO)
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ Policydetails: data });
                console.log("policy data", data, this.state.Policydetails);

                this.setState({
                    Policydetailsdata: this.state.Policydetails.map((prop, key) => {
                        const { classes } = this.props;
                        return {
                            EventId: prop.policyTypeId,
                            PolicyNo: prop.policyNo,
                            PID: new Date(prop.policyIssueDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', }),
                            PSD: new Date(prop.policyStartDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', }),
                            PED: new Date(prop.policyEndDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', }),
                            Email: prop.email,
                            CustName: prop.customerId,
                            radio: <input type="radio" name="product" onClick={this.editFunction.bind(this, key, prop.policyNo)} />
                        };
                    })
                });

            });
    }
    renderRedirect = () => {
        if (this.state.redirect == true) {
            return <Redirect to={{
                pathname: '/dashboard/home',

            }} />
        }
    }
    render() {
        const { classes } = this.props;

        return (


            <div>
                <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>



                    <Card className="assignCard">
                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                                <Icon><img id="icon" src={user} /></Icon>
                            </CardIcon>
                            {
                                <h4 >
                                    <small> Policy Cancellation Endorsement </small>
                                </h4>
                            }
                        </CardHeader>

                        <CardBody>

                            <div>

                                <GridContainer>
                                    <GridItem xs={12} sm={4}>
                                        <CustomInput
                                            labelText="Event Id"
                                            name="eventId"
                                            // required={true}
                                            value={this.state.CancellationDTO.eventId}
                                            onChange={(e) => this.SetValue(e)}
                                            formControlProps={{ fullWidth: true }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={4}>
                                        <CustomInput
                                            labelText="Policy Number"
                                            name="policynumber"
                                            // required={true}
                                            value={this.state.CancellationDTO.policynumber}
                                            onChange={(e) => this.SetValue(e)}
                                            formControlProps={{ fullWidth: true }}
                                        />
                                    </GridItem>
                                    <GridContainer justify="center">
                                        <GridItem xs={3} sm={3} md={3}>
                                            <Button id="center-modify-user" color="info" round className={classes.marginRight} onClick={this.showPolicyTable}> Search </Button>
                                        </GridItem>
                                    </GridContainer>
                                </GridContainer>

                            </div>

                        </CardBody>

                    </Card>

                    {this.state.showtable ? <GridContainer justify="center">
                        <GridItem xs={12}>


                            <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>



                                <ReactTable
                                    data={this.state.Policydetailsdata}
                                    filterable

                                    columns={[
                                        {
                                            Header: "Select",
                                            accessor: "radio",
                                            minWidth: 20,
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            sortable: false,
                                            filterable: false,
                                            resizable: false,
                                        },
                                        {
                                            Header: "Event Id",
                                            accessor: "EventId",
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 40,
                                            resizable: false,

                                        },
                                        {
                                            Header: "Policy Number",
                                            accessor: "PolicyNo",
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 100,
                                            resizable: false,
                                            /* minWidth: 150,
                                               style: { textAlign: "center" },
                                               headerClassName: 'react-table-center'*/
                                        },
                                        {

                                            Header: "Policy Issue Date",
                                            accessor: "PID",
                                            //minWidth: 150,
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 70,
                                            resizable: false,
                                        },
                                        {
                                            Header: "Policy Start Date",
                                            accessor: "PSD",
                                            //minWidth: 150,
                                            //style: { textAlign: "center" },
                                            //headerClassName: 'react-table-center'
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 70,
                                            resizable: false,
                                        },
                                        {
                                            Header: "Policy End Date",
                                            accessor: "PED",

                                            ///style: { textAlign: "center" },
                                            ///headerClassName: 'react-table-center'
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 70,
                                            resizable: false,
                                        },
                                        {
                                            Header: "Email ID",
                                            accessor: "Email",
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 100,
                                            resizable: false,
                                            //minWidth: 150,
                                            //style: { textAlign: "center" },
                                            //headerClassName: 'react-table-center'
                                        },
                                        {

                                            Header: "Customer Id",
                                            accessor: "CustName",
                                            //minWidth: 150,
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 70,
                                            resizable: false,
                                        },


                                    ]}

                                    defaultPageSize={5}
                                    showPaginationTop={false}
                                    pageSize={([this.state.Policydetailsdata.length + 1] < 5) ? [this.state.Policydetailsdata.length + 1] : 5}
                                    showPaginationBottom
                                    className="-striped -highlight"
                                />





                                <GridContainer justify="center">
                                    <GridItem xs={3} sm={3} md={3}>
                                        <Button id="center-modify-user" color="info" round className={classes.marginRight} onClick={this.dropDown}> Cancel Policy </Button>
                                    </GridItem>
                                </GridContainer>

                                <GridContainer>

                                    <GridItem xs={3} sm={3} md={3}>
                                        {this.state.show && <MasterDropdown labelText="Endorsement Status" id="ddlstatus" lstObject={this.state.EndorsementStatusData} filterName='EndorsementStatus' value={this.state.CancellationDTO.policyStatusId} name='policyStatusId' onChange={this.onInputPolicyChange} formControlProps={{ fullWidth: true }} />}
                                    </GridItem>



                                    <GridItem xs={3} sm={3} md={3}>
                                        {this.state.submitshow && <Button id="center-modify-user" color="info" round className={classes.marginRight} onClick={this.submit} style={{ top: '12px' }}> Submit </Button>}
                                    </GridItem>
                                    {this.renderRedirect()}
                                </GridContainer>



                            </Animated>

                        </GridItem>
                    </GridContainer>
                        : null}

                </Animated>

            </div >
        );
    }
}
export default withStyles(styles)(PolicyCancellation);
