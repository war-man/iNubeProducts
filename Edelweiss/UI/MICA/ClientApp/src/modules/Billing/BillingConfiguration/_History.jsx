import React, { useState } from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import CardBody from "components/Card/CardBody.jsx";
//import ReactTable from "react-table";
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

        <GridContainer>
            <GridItem xs={12}>
                

                        <ReactTable
                            data={prop.data}
                            filterable
                            columns={[
                                {
                                    Header: " S No",
                                    accessor: "SNo",
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 50,
                                    resizable: false,

                                },
                                {
                                    Header: "Modified Date",
                                    accessor: "ModifiedDate",
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 70,
                                    resizable: false,

                                },
                                {

                                    Header: "Object/Event",
                                    accessor: "ObjectEvent",
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 50,
                                    resizable: false,
                                },
                                //{
                                //    Header: "Details",
                                //    accessor: "Details",

                                //    style: { textAlign: "center" },
                                //    headerClassName: 'react-table-center',
                                //    minWidth: 50,
                                //    resizable: false,
                                //},
                                {
                                    Header: "Currency",
                                    accessor: "Currency",

                                    ///style: { textAlign: "center" },
                                    ///headerClassName: 'react-table-center'
                                    style: { textAlign: "right" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 50,
                                    resizable: false,
                                },
                                {
                                    Header: " Frequency",
                                    accessor: "Frequency",
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 70,
                                    resizable: false,

                                },
                                {
                                    Header: " EfficitiveDate",
                                    accessor: "EfficitiveDate",
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 80,
                                    resizable: false,

                                },
                                {
                                    Header: " End Date",
                                    accessor: "EndDate",
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 80,
                                    resizable: false,

                                },
                                {
                                    Header: " Due Date",
                                    accessor: "DueDate",
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 80,
                                    resizable: false,

                                },

                            ]}
                            defaultPageSize={3}
                            showPaginationTop={false}
                            // pageSize={([this.state.data.length + 1] < 5) ? [this.state.data.length + 1] : 5}
                            showPaginationBottom
                            className="-striped -highlight discription-tab"
                        />



                    
            </GridItem>

        </GridContainer>

    );
}

export default withStyles(style)(History);

