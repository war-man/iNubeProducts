import React from "react";
// @material-ui/core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import Icon from "@material-ui/core/Icon";
import Pending from "assets/img/Pending.png";
import Button from "components/CustomButtons/Button.jsx";
import { Animated } from "react-animated-css";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import Wizard from "components/Wizard/Wizard.jsx";
import ReactTable from "react-table";

const Spouse = (props) => {

    //console.log("SpouseData",props);
    const spouseprops = props.componentData;

    return (
        <div>

            <ReactTable
                data={spouseprops}
                filterable
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
                        // Header: "Cover Event Factor - From Value",
                        Header: "Select Your Benifits",
                        accessor: "benifitName",
                        minWidth: 40,
                        style: { textAlign: "center" },
                        headerClassName: 'react-table-center'
                    },
                    {
                        Header: "SUM ASSURED",
                        accessor: "riderSuminsured",
                        minWidth: 40,
                        style: { textAlign: "center" },
                        headerClassName: 'react-table-center'
                    },
                    {
                        Header: "Premium",
                        accessor: "actualRiderPremium",
                        minWidth: 40,
                        style: { textAlign: "center" },
                        headerClassName: 'react-table-center'
                    },
                    {
                        Header: "Loading",
                        accessor: "loadingAmount",
                        style: { textAlign: "center" },
                        minWidth: 40,
                        style: { textAlign: "center" },
                        headerClassName: 'react-table-center',



                    }, {
                        Header: "Total Premium",
                        accessor: "riderPremium",
                        style: { textAlign: "center" },
                        minWidth: 40,
                        style: { textAlign: "center" },
                        headerClassName: 'react-table-center',



                    },


                ]}
                defaultPageSize={5}
                pageSize={([spouseprops.length + 1] < 5) ? [spouseprops.length + 1] : 5}
                showPaginationTop={false}
                showPaginationBottom
                className="-striped -highlight discription-tab"
            //loading={this.state.newdata}

            //   loadingText="coming"
            />



            </div>


    );



}

export default Spouse;
