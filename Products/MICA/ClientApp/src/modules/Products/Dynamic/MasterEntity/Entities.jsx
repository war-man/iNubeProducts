﻿import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import Customer from "assets/img/Customer-details.png";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";
//import AddEntity from "./_AddEntity";
import EntityComponent from './_EntityPopup';
import ReactTable from "components/MuiTable/MuiTable.jsx";
import ProductConfig from 'modules/Products/Micro/ProductConfig.js';
import swal from 'sweetalert';
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";



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
   
};

class Entities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entityDto: {
                Name: "",
            },
            PSDFlag: false,
            TreeItemIndex: "root",
            DataSent: "",
            GridFalg: false,
            DynamicModel: {
                SchemaId: 1,
                ParentId: "root",
                SchemaName: "",
                SchemaType: "",
                AttributeList: [],
                SubMenu: []
            },
            ObjAttribute: {
                AttributeId: 1,
                AttributeType: "Clauses",
                Icon: "Assignment",
                PageData: [
                    {
                        id: "FirstName",
                        Name: "Mobile",
                        Year: "Submit"
                    }
                ]
            },
            Entitydto: {
                name: "",
                type: "",
                attruibuteList: [],
            },
            AttributesList: [],
            dateSaved: [],
            masterList: [],
        };
    }


    componentDidMount() {

        fetch(`${ProductConfig.productConfigUrl}/api/PSD/GetAllMaster`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ masterList: data });
                console.log("data:", data);
            });
    }
    handleAddAttribute = () => {
        this.setState({ PSDFlag: true });
        // this.getAttributes();
    }

    SetValue = ((type, event) => {
        let Entitydto = this.state.Entitydto;
        let name = event.target.name;
        let value = event.target.value;
        Entitydto[name] = value;
        this.setState({ Entitydto });
    });

    SetAttValue = ((columnName, event, index) => {
        debugger
        //let AttributesList = this.state.AttributesList;
        //let name = event.target.name;
        //let value = event.target.value;
        //AttributesList[i][name] = value;
        //this.setState({ AttributesList })
        console.log("columnName", columnName, event);
        let responses = [...this.state.AttributesList];


        if (columnName === 'displayName') {
            responses[index].displayName = event.target.value;
        }
        if (columnName === 'order') {
            responses[index].order = event.target.value;
        }
        if (columnName === 'valueMapping') {
            responses[index].valueMapping = event.target.value;
        }

        if (columnName === 'valid') {
            responses[index].valid = event.target.value;
        }

        this.setState({ responses });

        //this.attributeGrid();

    });

    attributeGrid = () => {
        this.setState({
            Attributes: this.state.AttributesList.map((prop, key) => {
                return {
                    SNo: key + 1,
                    Name: prop.name,
                    DisplayName: < CustomInput value={this.state.AttributesList.displayName} name="displayName" onChange={(e) => this.SetAttValue('displayName', e, key)} formControlProps={{ fullWidth: true }} />,
                    Order: < CustomInput value={this.state.AttributesList.order} type="numeric" inputType="number" name="order" onChange={(e) => this.SetAttValue('order', e, key)} formControlProps={{ fullWidth: true }} />,
                    ValueMapping: < CustomInput value={this.state.AttributesList.valueMapping} name="valueMapping" onChange={(e) => this.SetAttValue('valueMapping', e, key)} formControlProps={{ fullWidth: true }} />,
                    Valid: < CustomInput value={this.state.AttributesList.valid} name="valid" onChange={(e) => this.SetAttValue('valid', e, key)} formControlProps={{ fullWidth: true }} />,

                };
            })
        })
    }

    gridDisplay = () => {
        this.setState({ GridFalg: true });
        this.attributeGrid();
    }

    handleSaveEntity = () => {
        this.state.Entitydto.attruibuteList = [...this.state.Entitydto.attruibuteList, ...this.state.AttributesList];
        console.log("Entitydto:", this.state.Entitydto, this.state.AttributesList);



        fetch(`${ProductConfig.productConfigUrl}/api/PSD/SaveEntity`, {
            method: 'POST',
            body: JSON.stringify(this.state.Entitydto),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        //})
        //    .then(response => response.json())
        //    .then(data => {
        //        this.setState({ dateSaved: data });
        //        console.log("saved attribute data:", data);
        //    });
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log("responsivedata", data);
            swal({
                text: "Data Saved successfully!",
                icon: "success"
            });
        });
    }

    render() {
        return (
            <div>
                    <Card>
                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                                <Icon><img id="icon" src={Customer} /></Icon>
                            </CardIcon>
                            {
                                <h4 >
                                    <small> Entity </small>
                                </h4>
                            }
                        </CardHeader>

                    <CardBody>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                    //success={this.state.customerNameState === "success"}
                                    //error={this.state.customerNameState === "error"}
                                    // disabled={this.state.CustNameDisable}
                                    labelText="Entity Name"
                                    name="name"
                                    // required={true}
                                    id="name"
                                    value={this.state.Entitydto.name}
                                    onChange={(e) => this.SetValue("string", e)}
                                    formControlProps={{ fullWidth: true }}
                                />

                            </GridItem>

                            <GridItem xs={12} sm={12} md={4}>
                                
                                <MasterDropdown
                                    labelText="Entity Type"
                                    id="type"
                                    // disabled={prop.showlist[props.index]['disableRate']}
                                    value={this.state.Entitydto.type}
                                    lstObject={this.state.masterList}
                                    // required={true}
                                    filterName='Entity Type'
                                    //model="billingItem"
                                    name='type'
                                    onChange={(e) => this.SetValue("string", e)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={5} sm={3} md={3} lg={1}>
                                <Button id="top-bnt" round color="info" onClick={this.handleAddAttribute}> Add Attribute </Button>
                            </GridItem>
                            <GridItem xs={9}>

                                {this.state.PSDFlag ?

                                    <EntityComponent
                                        TreeItemIndex={this.state.TreeItemIndex}
                                        //  DataSent={this.state.DataSent}
                                        DynamicModel={this.state.DynamicModel}
                                        ObjAttribute={this.state.ObjAttribute}
                                        // TreeMaster={this.state.TreeMaster}
                                        AttributeMaster={this.state.AttributeList}
                                        //  callbackPSDFunction={this.callbackPSDFunction}
                                        gridDisplay={this.gridDisplay}
                                        AttributesList={this.state.AttributesList}
                                        attributeGrid={this.attributeGrid}
                                    /> : null

                                }
                            </GridItem>
                        </GridContainer>
                    </CardBody>
                </Card>
                    <GridContainer xl={12}>
                        {this.state.GridFalg &&
                            <GridItem xs={12}>

                                <ReactTable
                                    data={this.state.Attributes}
                                    filterable
                                    columns={[
                                        {
                                            Header: " S.No",
                                            accessor: "SNo",
                                            style: { textAlign: "right" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 150,

                                        },
                                        {
                                            Header: "Name",
                                            accessor: "Name",
                                            style: { textAlign: "right" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 250,

                                        },
                                        {

                                            Header: "DisplayName",
                                            accessor: "DisplayName",
                                            style: { textAlign: "right" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 250,

                                        },
                                        {
                                            Header: "Order",
                                            accessor: "Order",
                                            style: { textAlign: "right" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 150,

                                        },
                                        {
                                            Header: "ValueMapping",
                                            accessor: "ValueMapping",
                                            style: { textAlign: "right" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 150,

                                        },
                                        {
                                            Header: "Valid",
                                            accessor: "Valid",
                                            style: { textAlign: "left" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 30,

                                        },


                                    ]}
                                    defaultPageSize={5}
                                    showPaginationTop={false}
                                    // pageSize={([prop.billingItem[props.index].BillingItemDetail.length + 1] < 5) ? [prop.billingItem[props.index].BillingItemDetail.length + 1] : 5}
                                    showPaginationBottom
                                    className="-striped -highlight discription-tab"
                                />

                      



                        <GridContainer lg={12} justify="center">
                        <GridItem xs={5} sm={12} md={12} lg={1} > 
                                <Button id="round" style={{ marginTop: "1rem" }} color="info" onClick={this.handleSaveEntity}> Save  </Button>
                            </GridItem> 
                    
                        </GridContainer>
                        </GridItem>}

                    </GridContainer>

                   
            </div>
    );
    }
}
export default withStyles(style)(Entities);