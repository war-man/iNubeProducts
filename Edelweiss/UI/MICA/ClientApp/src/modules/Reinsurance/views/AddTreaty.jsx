﻿import React from "react";
import Radio from "@material-ui/core/Radio";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import role from "assets/img/users.png";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Modal from '@material-ui/core/Modal';
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import MenuItem from "@material-ui/core/MenuItem";
import ReactTable from 'components/MuiTable/MuiTable.jsx';
import { Animated } from "react-animated-css";

const searchClose = {
    float: "right",
    position: 'relative',
    width: "26px",
    height: "28px",
    borderRadius: "4px",
    fontSize: "larger",
    padding: "0px",
    right: '10px',

};
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

const AddTreaty = (props) => {

    let list = [];

    console.log('Chanels', props);

    const TreatyData = props.componentData;

    console.log("props componentData: ", props.componentData);

    console.log("channel masterList: ", props.componentData.masterList);

    //console.log("mvalue: ", channels);



    //if (TreatyData.masterList.length > 0) {

    //    let listdata = TreatyData.masterList.filter(item => item.mType == "Channels");

    //    console.log("listdata", listdata)

    //    list = listdata[0].mdata;

    //    console.log("list", list)



    //}

    return (

        <div>


            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                <ReactTable
                    StyleType={true}
                    data={TreatyData.TreatytableData}

                    filterable

                    getTdProps={() => ({

                        style: {

                            overflow: 'visible',

                        },

                    })}

                    columns={[

                        {

                            Header: "S No",

                            accessor: "id",

                            headerClassName: 'react-table-center',

                            style: { textAlign: "center" },

                            minWidth: 20,

                            sortable: false,



                            //  filterable: false

                        },

                        {



                            Header: "Treaty Group",

                            accessor: "treatyGroup",

                            minWidth: 40,

                            // style: { textAlign: "center" },

                            headerClassName: 'react-table-center'

                        },

                        {

                            Header: "Business Type",

                            accessor: "selectType",

                            minWidth: 40,

                            style: { textAlign: "center" },

                            headerClassName: 'react-table-center'

                        },
                        {

                            Header: "Actions",

                            accessor: "Action",

                            minWidth: 40,

                            style: { textAlign: "center" },

                            headerClassName: 'react-table-center'

                        },

                    ]}

                    defaultPageSize={5}

                    pageSize={([TreatyData.TreatytableData.length + 2] < 5) ? [TreatyData.TreatytableData.length + 2] : 5}

                    showPaginationTop={false}

                    showPaginationBottom

                    className="-striped -highlight long-tab"

                //loading={this.state.newdata}



                //   loadingText="coming"

                />







            </Animated>









        </div>

    );

}
export default AddTreaty;