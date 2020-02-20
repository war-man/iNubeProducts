import React, { useState } from "react";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import classNames from "classnames";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import ReactTable from "react-table";
//import ReactTable from "components/MuiTable/MuiTable.jsx";
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
import { Animated } from "react-animated-css";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";

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
            columns={(props.Edit == true) ? (ColumnArray.map((x) => (

                (x.InputType == "Input") ?
                    {
                        Header: <TranslationContainer translationKey={x.Header} />,
                        style: { textAlign: "center" },
                       headerClassName: 'react-table-center',
                        resizable: false,
                        Cell: row => (
                            ((editindex !== -2 && editindex !== row.index)) ?
                                data[row.index][x.accessor]
                                :
                                <CustomInput
                                    formControlProps={{ fullWidth: true }}
                                    labelText={x.Header}
                                    value={(count === -1) ? tempStorage[x.accessor] : tempStorage[stateList[row.index]][x.accessor]}
                                    onChange={(e) => {
                                        for (let i = 0; i < stateList.length; i++) {
                                            temp[stateList[i]] = tempStorage[stateList[i]];
                                            temp[stateList[i]][x.accessor] = e.target.value;
                                            console.log("statelist", tempStorage[stateList[i]])
                                        }
                                        temp[x.accessor] = e.target.value;
                                        console.log("statelist", temp, tempStorage, tempStorage[x.accessor])
                                        settemp();
                                        //  setTempStorage(temp);
                                    }
                                    }
                                />
                        )
                    } :
                    (x.InputType == "datetime") ?

                        {

                            Header: <TranslationContainer translationKey={x.Header} />,
                            resizable: false,
                            style: { textAlign: "center" },
                                                                headerClassName: 'react-table-center',
                            Cell: row => (
                                (editindex !== -2 && editindex !== row.index) ?

                                    //((count === -1) ? new Date(data[row.index][x.accessor]).toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', })
                                    //  : (editindex !== row.index && tempcount!==row.index) ?
                                    //  new Date(data[row.index][x.accessor]).toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', })
                                    //    :
                                    data[row.index][x.accessor]
                                    //)
                                    :
                                    <CustomDatetime
                                        formControlProps={{ fullWidth: true }}
                                        labelText=<TranslationContainer translationKey={x.Header} />
                                        value={(count == -1) ? tempStorage[x.accessor] : tempStorage[stateList[row.index]][x.accessor]}
                                        onChange={(event) => {

                                            let today = event.toDate();
                                            let date = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
                                            temp[x.accessor] = date;
                                            for (let i = 0; i < stateList.length; i++) {

                                                temp[stateList[i]] = tempStorage[stateList[i]];

                                            }
                                            temp[stateList[row.index]][x.accessor] = date;
                                            setTempStorage(temp);
                                        }
                                        }
                                    />
                            )
                        } :
                        (x.InputType === "date") ?
                            {
                                Header: <TranslationContainer translationKey={x.Header} />,
                    style: { textAlign: "center" },
                    headerClassName: 'react-table-center',
                    Cell: row => (

                                    new Date(data[row.index][x.accessor]).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', })


                                )

                }:
                        {
                                Header: <TranslationContainer translationKey={x.Header} />,
                            style: { textAlign: "center" },
                                                                headerClassName: 'react-table-center',
                            Cell: row => (

                                    "" + data[row.index][x.accessor]

                                )
                            }

            )).concat(

                {
                    Header: "",
                    minWidth: 120,
                    style: { textAlign: "center" },
                    headerClassName: 'react-table-center',
                    sortable: false,
                    filterable: false,
                    resizable: false,
                    Cell: row => (
                        (editindex === -1) ?
                            <div>

                                <Button color="info" justIcon round simple className="edit" onClick={() => { seteditindex(row.index); initializeTempStorage(row.index); setcount(1); settempcount(row.index) }}><Edit /></Button>
                                <Button color="danger" justIcon round simple className="edit" onClick={() => { removeRow(row.index) }}><Delete /></Button>
                                {/* <Button color="info" justIcon round simple className="edit" onClick={() => { seteditindex(row.index); }}><Add /></Button>*/}
                            </div>
                            : (editindex === row.index) ?
                                <div>
                                    <Button color="info" justIcon round simple className="edit" onClick={() => {
                                        for (let i = 0; i < stateList.length; i++) {

                                            temp[stateList[i]] = tempStorage[stateList[i]];

                                        }
                                        changeRow(editindex, temp[stateList[row.index]]);
                                        seteditindex(-1);
                                        settempcount(-1);
                                    }}><Check /></Button>
                                    <Button color="danger" justIcon round simple className="edit" onClick={() => { seteditindex(-1); reset(row.index) }}><Close /></Button>
                                </div>
                                : (editindex === -2) ?
                                    <div>
                                        <Button color="info" justIcon round simple className="edit" onClick={() => { seteditindex(-2); }}><Check /></Button>
                                        <Button color="danger" justIcon round simple className="edit" onClick={() => { seteditindex(-1); }}><Close /></Button>
                                    </div>
                                    : ""
                    )
                })
            ) : (
                 
                    ColumnArray.map((x) => (
                        {
                          
                            Header: <TranslationContainer translationKey={x.Header} />,
                          //  (verifyNumericValue == true) ?
                            //(): (),

                    Cell: row => (
                        "" + data[row.index][x.accessor]
                        
                    )
                }
            ))

                )
            }
            defaultPageSize={5}
            pageSize={([data.length + 1] < 5) ? [data.length + 1] : 5}
            showPaginationTop={false}
            showPaginationBottom
            className="-striped -highlight short-tab" 
        />


    );
}
