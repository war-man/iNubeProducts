import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import profileStyles from "./profileStyles.jsx";
import PinCodeModal from "./_PinCodeModal";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "components/CustomButtons/Button.jsx";
import AddPhoneNumber from "./_AddPhoneNumber";
import AddEmail from "./_AddEmail";
import AddMobileNumber from "./_AddMobileNumber";
import $ from "jquery";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import RegAddress from "./_RegAddress.jsx";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import ReactTable from 'components/MuiTable/MuiTable.jsx';
import CardBody from "components/Card/CardBody.jsx";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";

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
    ...customCheckboxRadioSwitch,
    ...profileStyles
};

const itemStyle = { marginTop: "25px" }

const OrgStructure = (props) => {
    const orgData = props.componentData;
    console.log("orgstructure: ", orgData);
    return (
        <GridContainer>

            <GridContainer>
                <GridItem xs={12}>
                    <CardBody>
                        <ReactTable
                            data={orgData.tablelevel}
                            filterable
                            columns={[
                                {
                                    Header: <TranslationContainer translationKey="levelId" />,
                                    accessor: "levelId",
                                    minWidth: 20,
                                },
                                {
                                    Header: <TranslationContainer translationKey="LevelName" /> ,
                                    accessor: "levelname",
                                    minWidth: 20,
                                    //style: { textAlign: "center" },
                                    //headerClassName: 'react-table-center'
                                },
                                //{
                                //    Header: "Website",
                                //    //accessor: "orgWebsite",
                                //    //style: { textAlign: "center" },
                                //    // minWidth: 75,
                                //    //headerClassName: 'react-table-center'
                                //},
                                //{
                                //    Header: "Office branch",
                                //    //accessor: "orgPhoneNo",
                                //    //style: { textAlign: "center" },
                                //    //  minWidth: 35,
                                //    //headerClassName: 'react-table-center'
                                //},
                                {
                                    Header: <TranslationContainer translationKey="ReportingTo" />,
                                    accessor: "reportto",
                                    //style: { textAlign: "center" },
                                    minWidth: 20,
                                    //headerClassName: 'react-table-center'
                                },

                            ]}
                            defaultPageSize={5}
                            showPaginationTop={false}
                            pageSize={5}
                            className="-striped -highlight"
                        />
                    </CardBody>
                </GridItem>
            </GridContainer>
        </GridContainer>
    );
}
export default withStyles(style)(OrgStructure);