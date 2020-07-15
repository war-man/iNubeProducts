import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Button from "components/CustomButtons/Button.jsx";
//import ReactTable from "react-table";
import ReactTable from 'components/MuiTable/MuiTable.jsx';

import { Animated } from "react-animated-css";

const LeadGrid = (props) => {
    console.log("newdata", props.newdata);
    let classes = props.classes;

    console.log("isDontShowQtnBtn", props.isDontShowQtnBtn)
    return (

           

                <CardBody>
                    <ReactTable

                        data={props.newdata}
                        filterable
                        columns={

                            (props.isDontShowQtnBtn == true) ?
                                ([{
                                    Header: "Select",
                                    accessor: "radio",
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 30,
                                    resizable: false,

                                },
                                {
                                    Header: "Type",
                                    accessor: "Type",
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 65,
                                    resizable: false,

                                },
                                {
                                    Header: "Lead Number",
                                    accessor: "LeadNo",
                                    style: { textAlign: "right" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 60,
                                    resizable: false,

                                },
                                {

                                    Header: "Lead Date",
                                    accessor: "LeadDate",
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 70,
                                    resizable: false,
                                },
                                {
                                    Header: "Proposer Name",
                                    accessor: "ProposerName",
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 100,
                                    resizable: false,
                                },

                                {
                                    Header: "Place",
                                    accessor: "Place",
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 70,
                                    resizable: false,

                                },
                                {
                                    Header: "Mobile",
                                    accessor: "Mobile",
                                    style: { textAlign: "right" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 70,
                                    resizable: false,

                                },
                                {
                                    Header: "Actions",
                                    accessor: "actions",
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 40,
                                    resizable: false,

                                }
                                ]

                                ) : ([{
                                    Header: "Type",
                                    accessor: "Type",
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 65,
                                    resizable: false,

                                }, {
                                    Header: "Lead Number",
                                    accessor: "LeadNo",
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 60,
                                    resizable: false,

                                },
                                {

                                    Header: "Lead Date",
                                    accessor: "LeadDate",
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 70,
                                    resizable: false,
                                },
                                {
                                    Header: "Proposer Name",
                                    accessor: "ProposerName",
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 100,
                                    resizable: false,
                                },

                                {
                                    Header: "Place",
                                    accessor: "Place",
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 70,
                                    resizable: false,

                                },
                                {
                                    Header: "Mobile",
                                    accessor: "Mobile",
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 70,
                                    resizable: false,

                                },
                                {
                                    Header: "Actions",
                                    accessor: "actions",
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 40,
                                    resizable: false,

                                }
                                ])
                        }
                        defaultPageSize={5}
                        showPaginationTop={false}
                        // pageSize={([this.state.Policydetailsdata.length + 1] < 5) ? [this.state.Policydetailsdata.length + 1] : 5}
                        showPaginationBottom
                        className="-striped -highlight"
                    />
                    {
                        props.isDontShowQtnBtn &&
                        <Button color="info" round onClick={props.CreateQuoteFun}

                        > CreateQuote </Button>
                    }
                </CardBody>
            
        
    )
}
export default LeadGrid;