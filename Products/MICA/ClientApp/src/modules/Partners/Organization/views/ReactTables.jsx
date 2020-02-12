import React from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Dvr";
import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import $ from 'jquery';
import { dataTable } from "variables/general.jsx";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import SearchOffice from "./SearchOffice";

const styles = {
    cardIconTitle: {
        ...cardTitle,
        marginTop: "15px",
        marginBottom: "0px"
    }
};

class ReactTables extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            data: props.officelist.map((prop, key) => {
                console.log("coming");
                const { classes } = this.props;
                console.log("prop data", prop);
                console.log("send data", key);
                return {
                    id: key,
                    orgOfficeId: prop.orgOfficeId,
                    officeCode: prop.officeCode,
                    officePhoneNo: prop.officePhoneNo,
                    officeId: prop.tblOfficeSpocDetails[0].officeId,
                    spocname: prop.tblOfficeSpocDetails[0].spocname,
                    spocemailId: prop.tblOfficeSpocDetails[0].spocemailId,
                    officeAddressLine1: prop.officeAddressLine1,
                    radio: < input type="radio" name="product" onClick={props.editFunction.bind(this, key, prop.orgOfficeId)} />





            //data: props.officelist.map((prop, key) => {
            //    return {
            //        id: key,
            //        name: prop[0],
            //        position: prop[1],
            //        office: prop[2],
            //        age: prop[3],
            //        actions: (
            //            // we've added some custom button actions
            //            <div className="actions-right">
            //                {/* use this button to add a like kind of action */}
            //                <Button
            //                    justIcon
            //                    round
            //                    simple
            //                    onClick={() => {
            //                        let obj = this.state.data.find(o => o.id === key);
            //                        alert(
            //                            "You've clicked LIKE button on \n{ \nName: " +
            //                            obj.name +
            //                            ", \nposition: " +
            //                            obj.position +
            //                            ", \noffice: " +
            //                            obj.office +
            //                            ", \nage: " +
            //                            obj.age +
            //                            "\n}."
            //                        );
            //                    }}
            //                    color="info"
            //                    className="like"
            //                >
            //                    <Favorite />
            //                </Button>{" "}
            //                {/* use this button to add a edit kind of action */}
            //                <Button
            //                    justIcon
            //                    round
            //                    simple
            //                    onClick={() => {
            //                        let obj = this.state.data.find(o => o.id === key);
            //                        alert(
            //                            "You've clicked EDIT button on \n{ \nName: " +
            //                            obj.name +
            //                            ", \nposition: " +
            //                            obj.position +
            //                            ", \noffice: " +
            //                            obj.office +
            //                            ", \nage: " +
            //                            obj.age +
            //                            "\n}."
            //                        );
            //                    }}
            //                    color="warning"
            //                    className="edit"
            //                >
            //                    <Dvr />
            //                </Button>{" "}
            //                {/* use this button to remove the data row */}
            //                <Button
            //                    justIcon
            //                    round
            //                    simple
            //                    onClick={() => {
            //                        var data = this.state.data;
            //                        data.find((o, i) => {
            //                            if (o.id === key) {
            //                                // here you should add some custom code so you can delete the data
            //                                // from this component and from your server as well
            //                                data.splice(i, 1);
            //                                return true;
            //                            }
            //                            return false;
            //                        });
            //                        this.setState({ data: data });
            //                    }}
            //                    color="danger"
            //                    className="remove"
            //                >
            //                    <Close />
            //                </Button>{" "}
            //            </div>
            //        )
                };
            })
        };
        console.log("react props", props);
    }
    editFunction(id, oid) {
        console.log("pid", oid);
        console.log("officelist data", this.state.officelist);
        var offArr = this.state.officelist;
        var OfficeArr = [];
        $.each(offArr, function (k, v) {
            if (v.orgOfficeId == oid) {
                OfficeArr.push(offArr[id]);
            }
        })
        console.log("OfficeArr", OfficeArr);
        this.setState({ officesendlist: OfficeArr });

        const Officedata = OfficeArr[0].orgOfficeId;
        // let offdata=this.state.offdata;
        this.setState({ offdata: Officedata });
        console.log("officesendlist: ", this.state.officesendlist, this.state.offdata);

    }
    render() {
        const { classes } = this.props;
        return (
            <GridContainer>
                <GridItem xs={12}>
                   
                       
                        <CardBody>
                            <ReactTable
                                data={this.state.data}
                                filterable
                                columns={[
                                    {
                                        Header: "ORG-OFFICE ID",
                                        accessor: "orgOfficeId",
                                        Width: "20px"

                                    },
                                    {
                                        Header: "OFFICE CODE",
                                        accessor: "officeCode",
                                        
                                    },
                                    {
                                        Header: "OFFICE PHONE NO",
                                        accessor: "officePhoneNo",
                                        Width: "10px"
                                    },
                                    {
                                        Header: "OFFICE ID",
                                        accessor: "officeId",
                                        //Width: "20px"
                                    },
                                    {
                                        Header: "SPOC-NAME",
                                        accessor: "spocname",
                                       // Width: "20px"
                                    },
                                    {
                                        Header: "SPOC-EMAILID",
                                        accessor: "spocemailId",
                                       // Width: "20px"
                                    },
                                    {
                                        Header: "OFFICE ADDRESS",
                                        accessor: "officeAddressLine1",
                                       // maxWidth: "20px"
                                    },
                                    {
                                        Header: "",
                                        accessor: "radio",
                                        sortable: false,
                                        filterable: false
                                    },
                                ]}
                                defaultPageSize={10}
                                showPaginationTop={false}
                                showPaginationBottom
                                className="-striped -highlight"
                            />
                        </CardBody>
                    
                </GridItem>
            </GridContainer>
        );
    }
}

export default withStyles(styles)(ReactTables);
