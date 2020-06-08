import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Checkbox from "@material-ui/core/Checkbox";

// material-ui icons
import Assignment from "@material-ui/icons/Assignment";
import Person from "@material-ui/icons/Person";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";
import Remove from "@material-ui/icons/Remove";
import Add from "@material-ui/icons/Add";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";

import product1 from "assets/img/product1.jpg";
import product2 from "assets/img/product2.jpg";
import product3 from "assets/img/product3.jpg";

//import ReactTable from "react-table";
import ReactTable from 'components/MuiTable/MuiTable.jsx';

import { Animated } from "react-animated-css";
import Modal from '@material-ui/core/Modal';
import Modify from "../Lead/Modify.jsx";

import NewBusinessConfig from 'modules/NewBusiness/NewBusinessConfig.js';
import { card } from "../../../assets/jss/material-dashboard-pro-react.jsx";

const searchClose = {
    float: "right",
    position: 'relative',
    width: "26px",
    height: "28px",
    borderRadius: "4px",
    fontSize: "larger",
    padding: "0px",
    right: '10px',

}
class ExtendedTables extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [],
            Quotedata: [],
            SelectedData: {},
            QuotePoolDTO: [{
                contactType: "",
                quoteNo: "",
                proposerName: "",
                emiratesID: "",
                createDate: "",
                leadNo: ""

            }]
        };
        this.handleToggle = this.handleToggle.bind(this);
    }

    componentDidMount() {

        fetch(`${NewBusinessConfig.NewBusinessConfigUrl}/api/Quotation/QuotationPool`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.datatable(data);
                this.setState({ Quotedata: data });

                console.log("Quotedata", this.state.Quotedata);


            });
    }


    datatable = (columndata) => {

        this.setState({
            newdata: columndata.map((prop, key) => {
                const { classes } = this.props;
                console.log("prop data", prop);
                console.log("send data", key);
                return {
                    id: key,
                    contactType: prop.contactType,
                    quoteNo: prop.quoteNo,
                    proposerName: prop.proposerName,
                    emiratesID: prop.emiratesID,
                    createDate: new Date(prop.createDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', }),
                    radio: <input type="radio" name="radio" onClick={this.editFunction.bind(this, key)} />,



                    actions: (
                        <div className="actions-right">
                            <Button color="info" justIcon round simple className="edit"><Edit /></Button>

                        </div>
                    )
                };
            })
        });
    }
    //ViewPDFFun = () => {
    //    console.log("selected", this.state.SelectedData)
    //    //fetch(`http://localhost:53000/Template/QuotationPdf` + this.state.proposerName , {
    //    //    method: 'POST',
    //    //    //body: JSON.stringify(this.state.SelectedData),
    //    //    headers: {
    //    //        'Content-Type': 'application/json; charset=utf-8',
    //    //        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
    //    //    }
    //    //})
    //    //    .then(response => response.json())
    //    //    .then(data => {
    //    //        this.setState({ partlist: data })
    //    //    })
    //    fetch(`http://localhost:53000/Template/QuotationPdf?proposerName=` + this.state.SelectedData.proposerName)
    //         .then(data => {



    //            console.log("Quote", data);


    //        });
    //}

    //local-https://localhost:44347
    sendquotepdf = () => {
        console.log("selected", this.state.SelectedData)
        fetch(`${NewBusinessConfig.NewBusinessConfigUrl}/api/Quotation/EmailQuotation`, {
            method: 'POST',
            body: JSON.stringify(this.state.SelectedData),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        })
            // .then(response => response.json())
            .then(data => {
                this.setState({ partlist: data })
            })
    }

    editFunction(id) {
        var orgArr = this.state.Quotedata[id];
        this.setState({ SelectedData: orgArr });
        console.log("orgArr", orgArr);
    }

    SetValue = (type, event) => {
        console.log("setVal", this.state.QuotePoolDTO);
        // event.preventDefault();
        let QuotePoolDTO = this.state.QuotePoolDTO;
        let name = event.target.name;
        let value = event.target.value;
        QuotePoolDTO[0][name] = value;
        this.setState({ QuotePoolDTO });

    }

    handleToggle(value) {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked
        });
    }

    render() {
        const { classes } = this.props;
        const fillButtons = [
            { color: "info", icon: Person },
            { color: "success", icon: Edit },
            { color: "danger", icon: Close }
        ].map((prop, key) => {
            return (
                <Button color={prop.color} round className={classes.actionButton} key={key}>
                    <prop.icon className={classes.icon} />
                </Button>
            );
        });
        const simpleButtons = [
            { color: "info", icon: Person },
            { color: "success", icon: Edit },
            { color: "danger", icon: Close }
        ].map((prop, key) => {
            return (
                <Button
                    color={prop.color}
                    simple
                    round
                    className={classes.actionButton}
                    key={key}
                >
                    <prop.icon className={classes.icon} />
                </Button>
            );
        });
        const roundButtons = [
            { color: "info", icon: Person },
            { color: "success", icon: Edit },
            { color: "danger", icon: Close }
        ].map((prop, key) => {
            return (
                <Button
                    round
                    color={prop.color}
                    className={classes.actionButton + " " + classes.actionButtonRound}
                    key={key}
                >
                    <prop.icon className={classes.icon} />
                </Button>
            );
        });
        return (
            <GridContainer xl={12}>
                <GridItem lg={12}>
                    <card>
                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                                <Assignment />
                            </CardIcon>

                            {
                                <h4 >
                                    <small>Load Quotation</small>
                                </h4>
                            }


                        </CardHeader>
                    </card>

                    <CardBody>
                        <center>
                            <Button color="rose" round onClick={this.ViewPDFFun}>View PDF</Button>
                            <Button color="rose" round onClick={this.sendquotepdf}>Email PDF</Button>
                        </center>




                        <GridContainer xl={12}>
                            <GridItem lg={12}>

                                <CardBody>
                                    <ReactTable
                                        data={this.state.newdata}
                                        filterable
                                        columns={[
                                            {
                                                Header: "",
                                                accessor: "radio",
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 20,
                                                resizable: false,

                                            },
                                            {
                                                Header: "Type",
                                                accessor: "contactType",
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 80,
                                                resizable: false,

                                            },
                                            {
                                                Header: "QUOTE NO",
                                                accessor: "quoteNo",
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 80,
                                                resizable: false,
                                                /* minWidth: 150,
                                                   style: { textAlign: "center" },
                                                   headerClassName: 'react-table-center'*/
                                            },
                                            {

                                                Header: "PROPOSER NAME",
                                                accessor: "proposerName",
                                                //minWidth: 150,
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 80,
                                                resizable: false,
                                            },
                                            {
                                                Header: "EMIRATES ID",
                                                accessor: "emiratesID",
                                                //minWidth: 150,
                                                //style: { textAlign: "center" },
                                                //headerClassName: 'react-table-center'
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 100,
                                                resizable: false,
                                            },

                                            {
                                                Header: "QUOTATION CREATION DATE",
                                                accessor: "createDate",
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 80,
                                                resizable: false,
                                                //minWidth: 150,
                                                //style: { textAlign: "center" },
                                                //headerClassName: 'react-table-center'
                                            },
                                            {
                                                Header: "LEAD NO",
                                                accessor: "leadNo",
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 80,
                                                resizable: false,
                                                //minWidth: 150,
                                                //style: { textAlign: "center" },
                                                //headerClassName: 'react-table-center'
                                            },
                                            {
                                                Header: "Actions",
                                                accessor: "actions",
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 40,
                                                resizable: false,

                                            }
                                        ]}
                                        defaultPageSize={5}
                                        showPaginationTop={false}
                                        // pageSize={([this.state.Policydetailsdata.length + 1] < 5) ? [this.state.Policydetailsdata.length + 1] : 5}
                                        showPaginationBottom
                                        className="-striped -highlight"
                                    />
                                </CardBody>
                            </GridItem>
                        </GridContainer>

                        <center>
                            <GridContainer xl={12} justify="center">

                                <GridItem xl={12} sm={4} md={3}>
                                    <Button color="info"
                                        round className={this.props.classes.marginRight}
                                        //onClick={props.handleLeadSave}
                                        id="saveBtn" >
                                        Create Proposal
                                </Button>
                                </GridItem>
                                <GridItem xl={12} sm={4} md={3}>
                                    <Button color="info"
                                        round className={this.props.classes.marginRight}
                                        //onClick={props.handleLeadSave}
                                        id="saveBtn" >
                                        Modify Quote
                                </Button>
                                </GridItem>



                            </GridContainer>
                        </center>
                    </CardBody>

                </GridItem>

            </GridContainer>

        );
    }
}

export default withStyles(extendedTablesStyle)(ExtendedTables);
