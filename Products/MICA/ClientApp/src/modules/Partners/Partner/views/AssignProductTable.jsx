import ReactTable from 'components/MuiTable/MuiTable.jsx';
import React, { useState } from "react";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import classNames from "classnames";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import "assets/scss/material-dashboard-pro-react.css";
import Dialog from '@material-ui/core/Dialog';
import CustomCheckbox from "components/Checkbox/CustomCheckbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import FormControl from "@material-ui/core/FormControl";
import Button from "components/CustomButtons/Button.jsx";
import Edit from "@material-ui/icons/Edit";
import Add from "@material-ui/icons/AddCircleOutline";
import Delete from "@material-ui/icons/Delete";
import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";

export default function EditReactTable({ ...props }) {

    const {
        data,
        ColumnArray,
        stateArray,
        columnDetails,
        removeRow,
        changeRow,

        addRow,
    } = props;
    const temp = {};

    const stateList = ColumnArray.filter(item => item.accessor);
    const [editindex, seteditindex] = React.useState(-1);//index set for edit
    const [unupdaterow, unupdate] = React.useState();//react hook for
    const [count, setcount] = React.useState(-1);
    const [tempcount, settempcount] = React.useState(-1);
    const [tempStorage, setTempStorage] = React.useState("");//set tempStorage
    console.log("ColumnArray coming", ColumnArray, data, temp);
    console.log("ColumnArray", tempStorage);
    console.log("stateList", stateList);

    const reset = (index) => {

        setTempStorage(unupdaterow);
    }
    const settemp = () => {

        if (tempcount === 1) {
            setTempStorage(temp);
        }
    }
    const initializeTempStorage = (index) => {
        if (index == -2) {
            //for (let i = 0; i < stateList.length; i++) {
            //    temp[stateList[i]] = columnDetails[i]["default"];
            //}
            //addRow(temp);
        }
        else {
            for (let i = 0; i < stateList.length; i++) {
                // debugger;
                //[stateList[i]]
                temp[stateList[i]] = data[index];
                console.log("temp", temp, data[index]);
            }

        }
        unupdate(unupdaterow);
        setTempStorage(temp);
    }

    return (
        <ReactTable
            data={data}
            getTdProps={() => ({
                style: {
                    overflow: 'visible'
                },
            })}
            filterable
            
            columns={[
                {

                    Header: "PartnerName",
                    accessor: "partnerName",
                    headerClassName: 'react-table-center',
                    //minWidth: 40,
                    resizable: false,
                },
                {

                    Header: "AgentNo",
                    accessor: "policyNo",
                    headerClassName: 'react-table-center',
                    //minWidth: 40,
                    resizable: false,
                },
                {

                    Header: "ProductName",
                    accessor: "productName",
                    headerClassName: 'react-table-center',
                    //minWidth: 40,
                    resizable: false,
                },
                {

                    Header: "AssignDate",
                    accessor: "policyIssueDate",
                    headerClassName: 'react-table-center',
                    //minWidth: 40,
                    resizable: false,
                },
                {

                    Header: "EffectiveFrom",
                    accessor: "policyStartDate",
                    headerClassName: 'react-table-center',
                    //minWidth: 40,
                    resizable: false,
                },
                {

                    Header: "EffectiveTo",
                    accessor: "policyEndDate",
                    headerClassName: 'react-table-center',
                    //minWidth: 40,
                    resizable: false,
                },
                {

                    Header: "Action",
                    accessor: "btn",
                    headerClassName: 'react-table-center',
                    //minWidth: 40,
                    resizable: false,
                    
                }
               
            ]} 

            defaultPageSize={5}
            pageSize={([data.length + 1] < 5) ? [data.length + 1] : 5}
            showPaginationTop={false}
            showPaginationBottom
            className="-striped -highlight short-tab"
        />


    );
}
