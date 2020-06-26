import React from "react";
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

const ParticipantGrid = (props) => {
    console.log("ppp", props);
    let list = [];
     
     
    return (

        <GridContainer xl={12}>
            <GridItem xs={12}>
                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                    <ReactTable
                        title={"Treaty Participant"}
                        data={props.newdata}
                        filterable
                        columns={[
                            {
                                Header: "SNo",
                                accessor: "id",
                                minWidth: 40,
                                headerClassName: 'react-table-center'
                            },
                            {
                                Header: "Reinsurer Code",
                                accessor: "reinsurercodeId",
                                minWidth: 40,
                                headerClassName: 'react-table-center'
                            },
                            {
                                Header: "Reinsurer Name",
                                accessor: "reinsurername",
                                minWidth: 40,
                                style: { textAlign: "center" },
                                headerClassName: 'react-table-center'
                            },
                            {
                                Header: "RI BranchCode",
                                accessor: "ribranchcodeId",
                                minWidth: 40,
                                style: { textAlign: "center" },
                                headerClassName: 'react-table-center'
                            },
                            {
                                Header: "Broker Code",
                                accessor: "brokercode",
                                minWidth: 40,
                                style: { textAlign: "center" },
                                headerClassName: 'react-table-center'
                            },
                            {
                                Header: "Broker Name",
                                accessor: "brokername",
                                minWidth: 40,
                                style: { textAlign: "center" },
                                headerClassName: 'react-table-center'
                            },
                            {
                                Header: "Broker BranchCode",
                                accessor: "bkbranchcodeId",
                                minWidth: 40,
                                style: { textAlign: "center" },
                                headerClassName: 'react-table-center'
                            },
                            {
                                Header: "Share(%)",
                                accessor: "sharepercent",
                                minWidth: 40,
                                style: { textAlign: "center" },
                                headerClassName: 'react-table-center'
                            },
                            {
                                Header: "Brokage(%)",
                                accessor: "brokagepercent",
                                minWidth: 40,
                                style: { textAlign: "center" },
                                headerClassName: 'react-table-center'
                            },
                            {
                                Header: "RI Commission(%)",
                                accessor: "riCommissionpercent",
                                minWidth: 40,
                                style: { textAlign: "center" },
                                headerClassName: 'react-table-center'
                            },
                            {
                                Header: "Bordereaux Frequency",
                                accessor: "bordereauxfrequencyId",
                                minWidth: 40,
                                style: { textAlign: "center" },
                                headerClassName: 'react-table-center'
                            },
                            {
                                Header: "Action",
                                accessor: "btn",

                                ///style: { textAlign: "center" },
                                ///headerClassName: 'react-table-center'
                                style: { textAlign: "center" },
                                headerClassName: 'react-table-center',
                                minWidth: 50,
                                //resizable: false,
                            }
                        ]}
                        defaultPageSize={5}
                        //pageSize={([this.state.tabledata.length + 1] < 5) ? [this.state.tabledata.length + 1] : 5}
                        showPaginationTop={false}
                        showPaginationBottom={true}
                        className="-striped -highlight"
                    />
                </Animated>
            </GridItem>
        </GridContainer>

    );

}
export default ParticipantGrid;