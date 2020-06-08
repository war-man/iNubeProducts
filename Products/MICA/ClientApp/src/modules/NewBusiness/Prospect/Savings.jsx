import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import CustomInput from "components/CustomInput/CustomInput.jsx";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";


import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import Button from "components/CustomButtons/Button.jsx";
import ReactTable from "react-table";
import CardBody from "components/Card/CardBody.jsx";
import Delete from "@material-ui/icons/Delete";



const dataTable = {
    headerRow: ["Type", "Lead Number", "Lead Date", "Proposer Name", "Place", "Mobile", "Actions"],
    // footerRow: ["Type", "Position", "Office", "Age", "Actions"],
    dataRows: [
        ["OWN", "1000024", "21-06-2019", "MR UDIT GUPTA", "BANGALORE", "9818196082", ""],
        ["OWN", "1000022", "18-06-2019", "MR RAVICHANDRA MAHALLINGAM", "BANGALORE", "9723615163", ""],
        ["OWN", "1000019", "	15-06-2019", "MISS RASHMIDEVI", "BANGALORE", "8618100397", ""],
        ["OWN", "1000018", "14-06-2019", "MISS CHYTRA MOHAN", "BANGALORE", "8618105433", ""],
        ["TELECALL LEAD", "1000014", "10 - 06 - 2019", "MISS SANDHYA", "BANGALORE", "72625656281", ""],
        ["OWN", "1000015", "12-06-2019", "MR AJAY V RAIKAR", "BANGALORE", "8618344397", ""],
        ["TELECALL LEAD", "1000012", "09-06-2019", "MISS NADIRA KHANUM", "DAVANAGERE", "7262136281", ""]

    ]
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


const radioAlign = {
    margin: "0 auto",
    textAlign: "center"
}

const validateBtn = {
    height: "35px",
    marginTop: "-10px",
}

const BtnStyle = {
    padding: "30px",
    width: "137px",
   
};
class Savings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: dataTable.dataRows.map((prop, key) => {
                debugger;
                return {
                    id: key,
                    Type: prop[0],
                    LeadNo: prop[1],
                    LeadDate: prop[2],
                    ProposerName: prop[3],
                    Place: prop[4],
                    Mobile: prop[5],

                    actions: (
                        <div className="actions-right">
                            <Button color="info" justIcon round simple className="edit"><Delete /></Button>
                        </div>
                    )
                };
            })
        }
    }
    render() {

        return (
            <div>



                <GridContainer>

                    <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                            labelText="Interest Rate(%)"
                            id="InflationRate"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />

                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                            labelText="Monthly Saving (Amount)"
                            id="MonthlySaving"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />

                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                            labelText="Annual Saving (Amount)"
                            id="AnnualSaving"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />

                    </GridItem>
                    <div>
                        <GridItem xs={2}>
                            <Button color="info" style={BtnStyle}>Wedding</Button>
                        </GridItem>
                    </div>

                    <div>
                        <GridItem xs={1}>
                            <Button color="info" style={BtnStyle}>Buy a House</Button>
                        </GridItem>
                    </div>

                    <div>
                        <GridItem xs={1}>
                            <Button color="info" style={BtnStyle}>Buy a Car</Button>
                        </GridItem>
                    </div>


                    <div>
                        <GridItem xs={1}>
                            <Button color="info" style={BtnStyle}>Foreign Tours</Button>
                        </GridItem>
                    </div>

                    <div>
                        <GridItem xs={1}>
                            <Button color="info" style={BtnStyle}>Others</Button>
                        </GridItem>
                    </div>
                    <GridItem xs={12}>


                        <CardBody>

                            <ReactTable
                                data={this.state.data}
                                filterable
                                columns={[
                                    {
                                        Header: "Type",
                                        accessor: "Type",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 70,
                                        resizable: false,

                                    },
                                    {
                                        Header: "Lead Number",
                                        accessor: "LeadNo",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 70,
                                        resizable: false,
                                        /* minWidth: 150,
                                           style: { textAlign: "center" },
                                           headerClassName: 'react-table-center'*/
                                    },
                                    {

                                        Header: "Lead Date",
                                        accessor: "LeadDate",
                                        //minWidth: 150,
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 70,
                                        resizable: false,
                                    },
                                    {
                                        Header: "Proposer Name",
                                        accessor: "ProposerName",
                                        //minWidth: 150,
                                        //style: { textAlign: "center" },
                                        //headerClassName: 'react-table-center'
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 100,
                                        resizable: false,
                                    },

                                    {
                                        Header: "Place",
                                        accessor: "Place",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 70,
                                        resizable: false,
                                        //minWidth: 150,
                                        //style: { textAlign: "center" },
                                        //headerClassName: 'react-table-center'
                                    },
                                    {
                                        Header: "Mobile",
                                        accessor: "Mobile",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 70,
                                        resizable: false,
                                        //minWidth: 150,
                                        //style: { textAlign: "center" },
                                        //headerClassName: 'react-table-center'
                                    },
                                    {
                                        Header: "Actions",
                                        accessor: "actions",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 40,
                                        resizable: false,
                                    }
                                ]}
                                defaultPageSize={2}
                                showPaginationTop={false}
                                // pageSize={([this.state.Policydetailsdata.length + 1] < 5) ? [this.state.Policydetailsdata.length + 1] : 5}
                                showPaginationBottom
                                className="-striped -highlight"
                            />

                        </CardBody>

                    </GridItem>
                    <GridContainer lg={8} justify="center">
                    <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                                labelText="Saving Fund & Protection Gap (LKR)"
                            id="MonthlySaving"
                            formControlProps={{
                                fullWidth: true
                            }}
                            />
                        </GridItem>
                    </GridContainer>
                    <GridContainer>
                    <GridItem>
                    <div className="actions-right">
                                <Button color="info" color="info">Print PDF</Button>
                        </div>
                        </GridItem>
                    </GridContainer>
                </GridContainer>



            </div>

        )
    }
}

export default withStyles(style)(Savings);