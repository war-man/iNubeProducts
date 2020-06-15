import React from "react";
// @material-ui/icons

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Wizard from "components/Wizard/Wizard.jsx";
import RegAddress from "modules/Hierarchy/views/_RegAddress.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Add from "@material-ui/icons/FeaturedPlayList";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import ReactTable from 'components/MuiTable/MuiTable.jsx';

import { Animated } from "react-animated-css";

const EducationDetails = (props) => {
    console.log("props",props);
    const Data = props.componentData;
    return (
        <div>
            <Card>
            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                <ReactTable
                    StyleType={true}
                    data={props.tableData}

                    filterable

                    getTdProps={() => ({

                        style: {

                            overflow: 'visible',

                        },

                    })}

                    columns={[

                        {

                            Header: "SNo",

                            accessor: "id",

                            headerClassName: 'react-table-center',

                            style: { textAlign: "center" },

                            minWidth: 20,

                            sortable: false,



                            //  filterable: false

                        },

                        {



                            Header: "Certification",

                            accessor: "Certification",

                            minWidth: 40,

                            // style: { textAlign: "center" },

                            headerClassName: 'react-table-center'

                        },

                        {

                            Header: "Year",

                            accessor: "Year",

                            minWidth: 40,

                            style: { textAlign: "center" },

                            headerClassName: 'react-table-center'

                        },
                        {
                            Header: "GradePercentage",

                            accessor: "Grade",

                            minWidth: 40,

                            style: { textAlign: "center" },

                            headerClassName: 'react-table-center'

                        },
                        {

                            Header: "Action",

                            accessor: "Action",

                            minWidth: 40,

                            style: { textAlign: "center" },

                            headerClassName: 'react-table-center'

                        },

                    ]}

                    defaultPageSize={5}

                  //  pageSize={([props.tableData.length + 2] < 5) ? [props.tableData.length + 2] : 5}

                    showPaginationTop={false}

                    showPaginationBottom

                    className="-striped -highlight long-tab"

                //loading={this.state.newdata}



                //   loadingText="coming"

                />


            </Animated>
                </Card>
        </div>

    );
}
export default EducationDetails;