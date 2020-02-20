import React, { useState } from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import CardBody from "components/Card/CardBody.jsx";
import ReactTable from "components/MuiTable/MuiTable.jsx";
import { Animated } from "react-animated-css";
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

const radioAlign = {
    margin: "0 auto",
    textAlign: "center"
}

const validateBtn = {
    height: "35px",
    marginTop: "-10px",
}



const History = (props) => {
    let classes = props.classes;
    console.log("props history", props);
    const prop = props.props;
    console.log("props.props", prop);

    return (


        <GridItem xs={12}>
               
                 

                    <ReactTable
                        data={prop.paymentForInvoice}
                        filterable
                        columns={[
                            {
                                Header: " S No",
                                accessor: "SNo",
                                style: { textAlign: "right" },
                                headerClassName: 'react-table-center',
                                minWidth: 10,
                                resizable: false,

                            },
                            {
                                Header: "Payment Type",
                                accessor: "PaymentType",
                                style: { textAlign: "center" },
                                headerClassName: 'react-table-center',
                                minWidth: 30,
                                resizable: false,

                            },
                            {

                                Header: "Bank Name",
                                accessor: "BankName",
                                style: { textAlign: "center" },
                                headerClassName: 'react-table-center',
                                minWidth: 30,
                                resizable: false,
                            },
                            {
                                Header: "Branch Name",
                                accessor: "BranchName",

                                style: { textAlign: "center" },
                                headerClassName: 'react-table-center',
                                minWidth: 30,
                                resizable: false,
                            },
                            {
                                Header: "IFSC Code",
                                accessor: "IFSCCode",

                                ///style: { textAlign: "center" },
                                ///headerClassName: 'react-table-center'
                                style: { textAlign: "right" },
                                headerClassName: 'react-table-center',
                                minWidth: 30,
                                resizable: false,
                            },
                            {
                                Header: " Payment Reference Id",
                                accessor: "PaymentRefId",
                                style: { textAlign: "center" },
                                headerClassName: 'react-table-center',
                                minWidth: 30,
                                resizable: false,

                            },
                            {
                                Header: " Payment Amount",
                                accessor: "PaymentAmount",
                                style: { textAlign: "right" },
                                headerClassName: 'react-table-center',
                                minWidth: 30,
                                resizable: false,

                            },
                            {
                                Header: " Payment Date",
                                accessor: "PaymentDate",
                                style: { textAlign: "center" },
                                headerClassName: 'react-table-center',
                                minWidth: 30,
                                resizable: false,

                            },
                            
                            {
                                Header: "Status",
                                accessor: "PaymentStatus",
                                style: { textAlign: "center" },
                                headerClassName: 'react-table-center',
                                minWidth: 30,
                                resizable: false,

                            },

                        ]}
                        defaultPageSize={3}
                        showPaginationTop={false}
                        //pageSize={([prop.paymentForInvoice.length + 1] < 5) ? [prop.paymentForInvoice.length + 1] : 5}
                        showPaginationBottom
                        className="-striped -highlight discription-tab"
                    />



                 
            </GridItem>

        

    );
}

export default withStyles(style)(History);

