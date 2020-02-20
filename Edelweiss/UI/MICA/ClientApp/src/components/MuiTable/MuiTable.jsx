import React from "react";
import MuiTable from 'mui-datatables';
import CustomToolbar from "./CustomToolBar.js";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import TranslationContainer from "components/Translation/TranslationContainer.jsx";


export default function EditReactTable({ ...props }) {

    //console.log("PropsData", props.columns.style);

    const getMuiTheme = () => createMuiTheme({
        overrides: {
            MUIDataTable: {
                responsiveStacked: {
                    overflow: " unset !important",
                    overflowX: "unset !important"


                }
            },

        }
    })


    const getBlankMuiTheme = () => createMuiTheme({

    })

    // console.log("PropsData", props);

    const customBodyRenderFun = (value, tableMeta, updateValue, editable) => {
        debugger;

        return ((editable) ? < FormControlLabel value={value} control={< TextField value={value} />} onChange={event => updateValue(event.target.value)} /> : < FormControlLabel value={value} control={< TextField value={value} disabled={true} />} onChange={event => updateValue(event.target.value)} />);
    }


    const {
        data,
        columns,
        title,
        StyleType,
    } = props;

    console.log("DataType", props);
    return (
        <MuiThemeProvider theme={(StyleType == true) ? getMuiTheme() : getBlankMuiTheme()}>

            <MuiTable
                className="mui-table"

                //id="hide-scroll"
                title={title}
                data={data}
                //id={id}
                columns={(columns.map((x) => ((x.show == undefined) ?
                    {
                        label: <TranslationContainer translationKey={x.Header} />,
                        name: x.accessor,
                        // width: x.minWidth,
                        options: {
                            filter: true,
                            sort: true,
                            customBodyRender: x.customBodyRender,
                            setCellProps: x.setCellProps,
                            setCellHeaderProps: x.setCellProps,

                            /* customBodyRender: (value, tableMeta, updateValue) => (
     
                                 customBodyRenderFun(value, tableMeta, updateValue,false)
                                 
                             )*/
                        }
                    } : (x.show == true) ? ({
                        label: <TranslationContainer translationKey={x.Header} /> ,
                        name: x.accessor,
                        // width: x.minWidth,
                        options: {
                            filter: true,
                            sort: true,
                            customBodyRender: x.customBodyRender,
                            setCellProps: x.setCellProps,
                            setCellHeaderProps: x.setCellProps,

                            /* customBodyRender: (value, tableMeta, updateValue) => (
     
                                 customBodyRenderFun(value, tableMeta, updateValue,false)
                                 
                             )*/
                        }
                    }) : ""))

                /*.concat({
                    name: "Edit",
                    options: {
                        filter: false,
                        sort: false,
                        empty: true,
                        customBodyRender: (value, tableMeta, updateValue) => { 
                            return (
                                <button onClick={() => {  console.log(`Clicked "Edit" for row ${tableMeta.rowData}`) }}>
                                    Edit
              </button>
                            );
                        }
                    }
                }) */)}
                options={{
                    filterType: 'dropdown',
                    responsive: 'stacked',
                    selectableRows: false,
                    /* customToolbar: () => {
                        return <CustomToolbar />;
                    }*/
                    //expandableRows: true,
                }}

            />

        </MuiThemeProvider>
    );
}
