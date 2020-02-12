import React from "react";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";

 

import CustomInput from "components/CustomInput/CustomInput.jsx";

import {Animated} from "react-animated-css";

import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";

import $ from 'jquery'

 

// @material-ui/core components

import withStyles from "@material-ui/core/styles/withStyles";

 

// @material-ui/icons

import Card from "components/Card/Card.jsx";

import CardBody from "components/Card/CardBody.jsx";

import Table from '@material-ui/core/Table';

import TableBody from '@material-ui/core/TableBody';

import TableCell from '@material-ui/core/TableCell';

 

 

import ReactTable from 'components/MuiTable/MuiTable.jsx';

const dateStyle = {

    width: "max-content",

    marginLeft: "125px",

    Top: "-25px",

    //marginDown:"-25px",

    backgroundColor: "transparent",

    border: "none",

    zoom: "1.15"

}

const ddl = {

    marginLeft: "105px"

 

}

const CustomTableCell = withStyles(theme => ({

    head: {

        backgroundColor: "#F29498",

        color: theme.palette.common.white,

        border: "1px solid #eee"

      

    },

    body: {

        fontSize: 14,

    },

}))(TableCell);

 

const tableStyle = { borderRadius: '10px  ', width: '100%' }

 

 

const tableRow = { height: '10px', width: '100%' }

 

 

const Channels = (props) => {

//   debugger;

    let list = [];

    console.log('Chanels', props);

    const channelsData = props.componentData;

    console.log("props componentData: ", props.componentData);

    console.log("channel masterList: ", props.componentData.masterList);

    //console.log("mvalue: ", channels);

  

    if (channelsData.masterList.length > 0) {

        let listdata = channelsData.masterList.filter(item => item.mType == "Channels");

        console.log("listdata", listdata)

         list = listdata[0].mdata;

        console.log("list", list)

 

    }

    return (

        <div>

          
                    <ReactTable
                    StyleType={true}
                        data={channelsData.channelstableData}

                        filterable

                        getTdProps={() => ({

                            style: {

                                overflow: 'visible',

                            },

                        })}

                        columns={[

                            {

                                Header: "#",

                                accessor: "id",

                                headerClassName: 'react-table-center',

                                style: { textAlign: "center" },

                                minWidth: 20,

                                sortable: false,

                               

                                //  filterable: false

                            },

                            {

                              

                                Header: "Channel",

                                accessor: "selectType",

                                minWidth: 40,

                              // style: { textAlign: "center" },

                                headerClassName: 'react-table-center'

                            },

                            {

                                Header: "Effective From",

                                accessor: "effectiveFrom",

                                minWidth: 40,

                                style: { textAlign: "center" },

                                headerClassName: 'react-table-center'

                            },

                            {

                                Header: "Effective To",

                                accessor: "effectiveTo",

                                minWidth: 40,

                                style: { textAlign: "right" },

                                headerClassName: 'react-table-center'

                            },

                            {

                                Header: " Comsn / Brokerage %",

                                accessor: "brokage",

                                minWidth: 60,

                                style: { textAlign: "center" },

                                headerClassName: 'react-table-center',

                                Cell: row=>row.row.brokage

                            },

                            {

                                Header: "",

                                accessor: "Action",

                                style: { textAlign: "center" },

                                minWidth: 40,

                                style: { textAlign: "center" },

                                headerClassName: 'react-table-center',

                                sortable: false,

                                filterable: false

                               

                            },

 

 

                        ]}
 
                        defaultPageSize={5}

                        pageSize={([channelsData.channelstableData.length + 2] < 5) ? [channelsData.channelstableData.length + 2] : 5}

                        showPaginationTop={false}

                        showPaginationBottom

                        className="-striped -highlight long-tab"

                    //loading={this.state.newdata}

 

                    //   loadingText="coming"

                    />

 

 

 

             

 

 

 

        </div>

    );

}

 

export default Channels;