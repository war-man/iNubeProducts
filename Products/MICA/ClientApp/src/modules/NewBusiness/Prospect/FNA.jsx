
import React from "react";
// @material-ui/icons
import ChromeReader from "@material-ui/icons/ChromeReaderMode";

import FinancialAnalysis from "./Calculator.jsx";
import Card from "components/Card/Card.jsx";
import CardFooter from "components/Card/CardHeader.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

import CardBody from "components/Card/CardBody.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Wizard from "components/Wizard/Wizard.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomDropDownTree from "components/CustomDropdownTree/CustomDropDownTree.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import ReactTable from "react-table";
import Button from "components/CustomButtons/Button.jsx";
import { type } from "os";




const Tabledata1 = {
    // headerRow: ["Type", "Lead Number", "Lead Date", "Peospect Name", "DOB", "Place", "Actions"],
    // footerRow: ["Type", "Position", "Office", "Age", "Actions"],
    dataRows: [
        ["RESERVES OF CRITICAL ILLNESS",
            <GridItem xs={12} sm={12} md={20}>
                <CustomInput
                    labelText=""
                    id="productname"
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            </GridItem>,

            <GridItem xs={12} sm={12} md={20}>
                <CustomInput
                    labelText=""
                    id="productname"
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            </GridItem>,

            <GridItem xs={12} sm={12} md={20}>
                <CustomInput
                    labelText=""
                    id="productname"
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            </GridItem>, ""],
        [<div><label>RESERVES FOR HOSPTALIZATION</label> <br/> <input type="radio" name="gender" value="local" />Local<input type="radio" name="gender" value="Global" />Global</div>,   
            <GridItem xs={12} sm={12} md={20}>
                <CustomInput
                    labelText=""
                    id="productname"
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            </GridItem>,
            <GridItem xs={12} sm={12} md={20}>
                <CustomInput
                    labelText=""
                    id="productname"
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            </GridItem>,
            <GridItem xs={12} sm={12} md={20}>
                <CustomInput
                    labelText=""
                    id="productname"
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            </GridItem>, ""],

        ["CASH",
            <GridItem xs={12} sm={12} md={20}>
                <CustomInput
                    labelText=""
                    id="productname"
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            </GridItem>,
            <GridItem xs={12} sm={12} md={20}>
                <CustomInput
                    labelText=""
                    id="productname"
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            </GridItem>,
            <GridItem xs={12} sm={12} md={20}>
                <CustomInput
                    labelText=""
                    id="productname"
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            </GridItem>, ""],
        ["CASH FOR ADITIONAL EXPENSE/ LOSS OF INCOME",
            <GridItem xs={12} sm={12} md={20}>
                <CustomInput
                    labelText=""
                    id="productname"
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            </GridItem>,
            <GridItem xs={12} sm={12} md={20}>
                <CustomInput
                    labelText=""
                    id="productname"
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            </GridItem>,
            <GridItem xs={12} sm={12} md={20}>
                <CustomInput
                    labelText=""
                    id="productname"
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            </GridItem>, ""],

    ]
};

const Tabledata2 = {
    // headerRow: ["Type", "Lead Number", "Lead Date", "Peospect Name", "DOB", "Place", "Actions"],
    // footerRow: ["Type", "Position", "Office", "Age", "Actions"],
    dataRows: [
        ["TOTAL",
            <GridItem xs={12} sm={12} md={20}>
                <CustomInput
                    labelText=""
                    id="productname"
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            </GridItem>,

            <GridItem xs={12} sm={12} md={20}>
                <CustomInput
                    labelText=""
                    id="productname"
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            </GridItem>,

            <GridItem xs={12} sm={12} md={20}>
                <CustomInput
                    labelText=""
                    id="productname"
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            </GridItem>, ""],
  

    ]
};

const Tabledata3 = {
    // headerRow: ["Type", "Lead Number", "Lead Date", "Peospect Name", "DOB", "Place", "Actions"],
    // footerRow: ["Type", "Position", "Office", "Age", "Actions"],
    dataRows: [
        ["PROTECT YOUR WEALTH",
            <GridItem xs={12} sm={12} md={20}>
                <CustomInput
                    labelText=""
                    id="productname"
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            </GridItem>,

             ""],
        ["PROTECT YOUR MONTHLY INCOME",
            <GridItem xs={12} sm={12} md={20}>
                <CustomInput
                    labelText=""
                    id="productname"
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            </GridItem>,

            ""],
        ["PROTECT YOUR DREAM(FINANCIAL OBLIGATIONS)",
            <GridItem xs={12} sm={12} md={20}>
                <CustomInput
                    labelText=""
                    id="productname"
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            </GridItem>,
            <GridItem xs={12} sm={12} md={20}>
                <CustomInput
                    labelText=""
                    id="productname"
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            </GridItem>,

            ""],
        ["TOTAL",
            <GridItem xs={12} sm={12} md={20}>
                <CustomInput
                    labelText=""
                    id="productname"
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            </GridItem>,
            <GridItem xs={12} sm={12} md={20}>
                <CustomInput
                    labelText=""
                    id="productname"
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            </GridItem>,

            ""],

    ]
};

const Tabledata4 = {
    // headerRow: ["Type", "Lead Number", "Lead Date", "Peospect Name", "DOB", "Place", "Actions"],
    // footerRow: ["Type", "Position", "Office", "Age", "Actions"],
    dataRows: [
        ["EXISTING POLICY",
            <GridItem>
                <CustomInput
                    labelText=""
                    id="productname"
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            </GridItem>,

            <GridItem>
                <CustomInput
                    labelText=""
                    id="productname"
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            </GridItem>,

            ""],
        ["GAP",
            <GridItem xs={12} sm={12} md={20}>
                <CustomInput
                    labelText=""
                    id="productname"
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            </GridItem>,

            <GridItem>
                <CustomInput
                    labelText=""
                    id="productname"
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            </GridItem>,

            ""],

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


class FNA extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customddl1: [
                {
                    "label": "Land Building & House",
                    "Id": "1",
                },
                {
                    "label": "Fixed Deposit",
                    "Id": "2",
                   

                },
                {   
                    "label": "Shares",
                    "Id": "3",
                } ,
                {   
                    "label": "Vehicles",
                    "Id": "4",
                },
                {   
                    "label": "Gold & Jewellery",
                    "Id": "5",
                },
                {   
                    "label": "Other",
                    "Id": "6",
                },


            ],
            customddl2: [
                {
                    "label": "Bank Load",
                    "Id": "1",
                },
                {
                    "label": "Credit Card",
                    "Id": "2",


                },
                {
                    "label": "Lease",
                    "Id": "3",
                },
                {
                    "label": "Other",
                    "Id": "4",
                },
              
            ],
            customddl3: [
                { "label": "Higher Education", "id": "1" },
                { "label": "Wedding", "id": "2" },
                { "label": "Pension fund", "id": "3" },
                { "label": "Buy Car/Property", "id": "4" },
                { "label": "Other", "id": "5" },



            ],
            tbldata1: Tabledata1.dataRows.map((prop, key) => {
                return {
                    id: key,
                    Type: prop[0],
                    LeadNo: prop[1],
                    LeadDate: prop[2],
                    ProposerName: prop[3],
                    Dob: prop[4],
                    Place: prop[5],
                    //actions: (
                    //    <div className="actions-right">
                    //        <Button color="info" justIcon round simple className="edit" onClick={() => this.edittable()}><Edit /></Button>
                    //    </div>
                    //)
                };
            }),
            tbldata2: Tabledata2.dataRows.map((prop, key) => {
                return {
                    id: key,
                    Type: prop[0],
                    LeadNo: prop[1],
                    LeadDate: prop[2],
                    ProposerName: prop[3],
                    Dob: prop[4],
                    Place: prop[5],
                    //actions: (
                    //    <div className="actions-right">
                    //        <Button color="info" justIcon round simple className="edit" onClick={() => this.edittable()}><Edit /></Button>
                    //    </div>
                    //)
                };
            }),
            tbldata3: Tabledata3.dataRows.map((prop, key) => {
                return {
                    id: key,
                    Type: prop[0],
                    LeadNo: prop[1],
                    LeadDate: prop[2],
                    ProposerName: prop[3],
                    Dob: prop[4],
                    Place: prop[5],
                    //actions: (
                    //    <div className="actions-right">
                    //        <Button color="info" justIcon round simple className="edit" onClick={() => this.edittable()}><Edit /></Button>
                    //    </div>
                    //)
                };
            }),
            tbldata4: Tabledata4.dataRows.map((prop, key) => {
                return {
                    id: key,
                    Type: prop[0],
                    LeadNo: prop[1],
                    LeadDate: prop[2],
                    ProposerName: prop[3],
                    Dob: prop[4],
                    Place: prop[5],
                    //actions: (
                    //    <div className="actions-right">
                    //        <Button color="info" justIcon round simple className="edit" onClick={() => this.edittable()}><Edit /></Button>
                    //    </div>
                    //)
                };
            }),



        }
        //console.log("data of props",props);
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
              
                    <GridContainer lg={12}>
                    <GridItem xs={12}>    
                        <Card>
                            <CardBody>
                            <GridContainer>
                        <GridItem xs={12} sm={4}>
                        <CustomDatetime labelText="From Year " id='FromYear' name='FromYear' formControlProps={{ fullWidth: true }} />
                    </GridItem>

                        <GridItem xs={12} sm={4}>
                        <CustomDatetime labelText="To Year " id='ToYear' name='ToYear' formControlProps={{ fullWidth: true }} />

                    </GridItem>


                        <GridItem xs={12} sm={4}>
                        <CustomInput
                            labelText="Inflation Rate(%)"
                            id="InflationRate"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                       </GridItem>
          
                        <GridItem xs={12} sm={4}>
                        <CustomInput
                            labelText="Plan no of Years"
                            id="PlanNoOfYers"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                        </GridItem>
        
                        <GridItem xs={12} sm={4}>
                        <CustomInput
                            labelText="Interest Rate(%)"
                            id="InterestRate"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                        </GridItem>
                        

                                </GridContainer>
                           
                    <GridContainer lg={12}>
                    <GridItem xs={4}>
                       
                        <CustomDropDownTree className="dropdowntree"
                                data={this.state.customddl1}
                                label="Current Assets"
                        //onChange={}
                        />
                        </GridItem>
                 
                    <GridItem xs={4} sm={2}>
                    </GridItem>
                
                    <GridItem xs={4} sm={4} >

                        <CustomDropDownTree className="dropdowntree"
                            data={this.state.customddl2}
                            label="Current Assets"
                        //onChange={}
                        />
                        </GridItem>
                    </GridContainer>

                    <GridContainer>
                    <GridItem xs={12} sm={2} >

                            <h3><small>Amount</small></h3>
                        <b> <CustomInput
                                labelText="Total"
                            id="Total"
                            formControlProps={{
                                fullWidth: true
                            }}
                        /></b>
                    </GridItem>
                   
                    <GridItem xs={12} sm={4} >
                    </GridItem>

                    <GridItem xs={12} sm={3} >

                            <h3><small>Amount</small></h3>
                        <b> <CustomInput
                                labelText="Total"
                            id="Total"
                            formControlProps={{
                                fullWidth: true
                            }}
                           
                        /></b>
                    </GridItem>

                  

                    <GridItem xs={12} sm={3} >

                            <h3><small>Insured Amount</small></h3>
                        <b> <CustomInput
                             labelText="Total"
                            id="Total"
                            formControlProps={{
                                fullWidth: true
                            }}

                        /></b>
                    </GridItem>
                    </GridContainer>
                    <GridContainer>
                    <GridItem xs={12} sm={4}>
                        <Card>
                            <GridItem>
                                <h3><small>Net Assets </small></h3>
                                <CardFooter>
                                    <b><h3>0</h3></b>
                                </CardFooter>
                            </GridItem>
                        </Card>
                    </GridItem>


                    <GridItem xs={12} sm={8}>
                        <Card>
                            <GridItem>
                                <h3><small>Fund Requirement For Asset Protection </small></h3>
                                <CardFooter>
                                    <b><h3>0</h3></b>
                                </CardFooter>
                            </GridItem>
                        </Card>
                        </GridItem>
                    </GridContainer>
                    <GridContainer>
                    <GridItem xs={12} sm={4} >

                        <CustomDropDownTree className="dropdowntree"
                            data={this.state.customddl1}
                            label="Current Assets"
                        //onChange={}
                        />
                        </GridItem>

                        <GridItem xs={12} sm={4}>
                        </GridItem>

                    <GridItem xs={12} sm={4} >

                        <CustomDropDownTree className="dropdowntree"
                            data={this.state.customddl2}
                            label="Current Assets"
                        //onChange={}
                        />
                    </GridItem>
                    </GridContainer>


                    <GridContainer>
                        <GridItem xs={12} sm={2} >

                            <h3><small>Amount</small></h3>
                            <b> <CustomInput
                                labelText="Total"
                                id="Total"
                                formControlProps={{
                                    fullWidth: true
                                }}
                            /></b>
                        </GridItem>

                        <GridItem xs={12} sm={6} >
                        </GridItem>

                        <GridItem xs={12} sm={2} >

                            <h3><small>Amount</small></h3>
                            <b> <CustomInput
                                labelText="Total"
                                id="Total"
                                formControlProps={{
                                    fullWidth: true
                                }}

                            /></b>
                        </GridItem>

                    </GridContainer>

                    <GridContainer>
                        <GridItem xs={12} sm={8}>
                            <Card>
                                <GridItem>
                                    <h3><small>Fund Requirement For Inome Protection</small></h3>
                                    <CardFooter>
                                        <b><h3>0</h3></b>
                                    </CardFooter>
                                </GridItem>
                            </Card>
                        </GridItem>

                        <GridItem xs={12} sm={4}>
                        <Card>
                            <GridItem>
                                <h3><small>SurPlus/Deficit</small></h3>
                                <CardFooter>
                                    <b><h3>0</h3></b>
                                </CardFooter>
                            </GridItem>
                        </Card>
                    </GridItem>

                    </GridContainer>

                    <GridContainer>
                    <GridItem xs={12}>


                        <CardBody className="Health-react-tab">

                            <ReactTable
                                data={this.state.tbldata1}
                                filterable
                                columns={[
                                    {

                                        accessor: "Type",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 200,
                                        resizable: false,

                                    },
                                    {
                                        Header: "CURRENT REQUIREMENT",
                                        accessor: "LeadNo",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 150,
                                        resizable: false,
                                        /* minWidth: 150,
                                           style: { textAlign: "center" },
                                           headerClassName: 'react-table-center'*/
                                    },
                                    {

                                        Header: "AVAILABLE FUND",
                                        accessor: "LeadDate",
                                        //minWidth: 150,
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 150,
                                        resizable: false,
                                    },
                                    {
                                        Header: "GAP",
                                        accessor: "ProposerName",
                                        //minWidth: 150,
                                        //style: { textAlign: "center" },
                                        //headerClassName: 'react-table-center'
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 150,
                                        resizable: false,
                                    },

                                ]}
                                defaultPageSize={3}
                                showPaginationTop={false}
                                //pageSize={([props.data.length + 1] < 3) ? [props.data.length + 1] : 3}
                                showPaginationBottom
                                className="-striped -highlight discription-tab"
                            />

                        </CardBody>

                        </GridItem>
                    </GridContainer>

                    
                        <GridContainer>
                        <GridItem xs={12} sm={4} >
                            
                        <CustomDropDownTree className="dropdowntree"
                            data={this.state.customddl3}
                            label="Current Assets"
                        //onChange={}
                        />
                            </GridItem>
                       
                 


                    <GridItem xs={12}>


                        <CardBody className="Health-react-tab">

                            <ReactTable
                                data={this.state.tbldata2}
                                filterable
                                columns={[
                                    {
                                        Header: "FUTURE FINANCIAL NEEDS",
                                        accessor: "Type",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 50,
                                        resizable: false,

                                    },
                                    {
                                        Header: "BENIFICIARY",
                                        accessor: "LeadNo",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 50,
                                        resizable: false,
                                        /* minWidth: 150,
                                           style: { textAlign: "center" },
                                           headerClassName: 'react-table-center'*/
                                    },
                                    {

                                        Header: "CURRENT REQUIREMENT",
                                        accessor: "LeadDate",
                                        //minWidth: 150,
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 50,
                                        resizable: false,
                                    },
                                    {
                                        Header: "ESTIMATED AMOUNT",
                                        accessor: "ProposerName",
                                        //minWidth: 150,
                                        //style: { textAlign: "center" },
                                        //headerClassName: 'react-table-center'
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 50,
                                        resizable: false,
                                    },

                                    {
                                        Header: "AVAILABLE FUND",
                                        accessor: "ProposerName",
                                        //minWidth: 150,
                                        //style: { textAlign: "center" },
                                        //headerClassName: 'react-table-center'
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 50,
                                        resizable: false,
                                    },
                                    {
                                        Header: "GAP",
                                        accessor: "ProposerName",
                                        //minWidth: 150,
                                        //style: { textAlign: "center" },
                                        //headerClassName: 'react-table-center'
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 50,
                                        resizable: false,
                                    },

                                ]}
                                defaultPageSize={1}
                                showPaginationTop={false}
                                //pageSize={([props.data.length + 1] < 3) ? [props.data.length + 1] : 3}
                                showPaginationBottom
                                className="-striped -highlight discription-tab"
                            />

                        </CardBody>

                        </GridItem>
                   

                    
                    <GridItem xs={12}>


                        <CardBody className="Health-react-tab">

                            <ReactTable
                                data={this.state.tbldata4}
                                filterable
                                columns={[
                                    {

                                        accessor: "Type",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 160,
                                        resizable: false,

                                    },
                                    {
                                        Header: "LUMP SUM REQUIREMENT ANY GIVEN TIME",
                                        accessor: "LeadNo",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 160,
                                        resizable: false,
                                        /* minWidth: 150,
                                           style: { textAlign: "center" },
                                           headerClassName: 'react-table-center'*/
                                    },
                                    {

                                        Header: "LUMP SUM REQUIREMENT AT MATURITY TIME",
                                        accessor: "LeadDate",
                                        //minWidth: 150,
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 160,
                                        resizable: false,
                                    },
                                    
                                ]}
                                defaultPageSize={3}
                                showPaginationTop={false}
                                //pageSize={([props.data.length + 1] < 3) ? [props.data.length + 1] : 3}
                                showPaginationBottom
                                className="-striped -highlight discription-tab"
                            />

                        </CardBody>

                        </GridItem>
                    
                    <GridItem xs={3}>
                        <Button color="info" justify="center">Print PDF</Button>
                    </GridItem>
                                </GridContainer>
                            </CardBody>
                        </Card>
                        </GridItem>
                    </GridContainer>
            </div>
        );
    }
}
export default withStyles(style)(FNA);

