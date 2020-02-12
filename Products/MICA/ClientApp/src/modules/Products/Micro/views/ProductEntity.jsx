import React, { isValidElement } from "react";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import role from "assets/img/users.png";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import productConfig from 'modules/Products/Micro/ProductConfig.js';
import ReactTable from "components/MuiTable/MuiTable.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import swal from 'sweetalert';

import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "../../../../components/Grid/GridContainer";
import GridItem from "../../../../components/Grid/GridItem";
import Button from "../../../../components/CustomButtons/Button";
import { config } from "../../../../config";

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

class ProductEntity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabledata: [],
            masterList: [],
            selectedData: [],
            parentid: "",
            value: "",
            error: false,
            mastertype: [],
            showtable: false,
            entityDTO: {
                "masterType": "",
                "typeCode": "",
                "value": "",
                "parentId": "",
                "level": 0,
                "parameter": "",
                "isDisable": true,
                "isActive": true,
            }
        };
        this.handlesubmit = this.handlesubmit.bind(this);
    }

    handlesubmit() {
        console.log("submitted Data: ", this.state.entityDTO);
        //let entity = this.state.entityDTO;
        //entity.parentId = this.state.parentid;
        //this.setState({ entity });
        if (this.state.entityDTO.masterType != "" && this.state.entityDTO.value != "" && this.state.entityDTO.parentId != "") {
            fetch(`${productConfig.productConfigUrl}/api/Product/AddEntityData`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify(this.state.entityDTO)
            }).then(response => response.json())
                .then(data => {
                    console.log("Response data: ", data);
                    swal({
                        text: "Data saved successfully!",
                        icon: "success"
                    })
                });
            fetch(`${productConfig.productConfigUrl}/api/Product/GetEntityMaster`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
            }).then(response => response.json())
                .then(data => {
                    this.setState({ masterList: data });
                    console.log("masterlist", this.state.masterList);
                    if (this.state.masterList.length > 0) {
                        this.Datatable();
                    }
                });
        }
        else {
            swal({
                text: "Some fields are missing",
                icon: "error"
            })
        }
    }

    Datatable = () => {
        this.setState({ showtable: true });
        this.setState({
            tabledata: this.state.masterList.map((prop, key) => {
                const { classes } = this.props;
                return {
                    id: prop.mID,
                    masterType: prop.mType,
                    value: prop.mValue,
                    level: prop.level,
                    parentId: prop.parentId,
                };
            })
        });
        for (let i = 0; i < this.state.masterList.length; i++) {
            this.state.mastertype.push(this.state.masterList[i].mType);
        }
    }

    handleSimple = (event) => {
        this.state.parentid = "";
        this.state.selectedData = [];

        this.setState({ [event.target.name]: event.target.value });
        this.setState({ value: event.target.value });
        console.log("value: ", this.state.value);
        this.state.selectedData.push(this.state.masterList[this.state.value - 1]);
        console.log("selected value: ", this.state.selectedData);
        this.setState({ parentid: this.state.selectedData[0].parentId });
        console.log("parentid: ", this.state.parentid);
    }

    componentDidMount() {
        fetch(`${productConfig.productConfigUrl}/api/Product/GetEntityMaster`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(response => response.json())
            .then(data => {
                this.setState({ masterList: data });
                console.log("masterlist", this.state.masterList);
                if (this.state.masterList.length > 0) {
                    this.Datatable();
                }

            });
        console.log("mastertype: ", this.state.mastertype);
    }

    handleChange = (event) => {
        this.handleinputvalue(event);
    }

    handleinputvalue = (event) => {
        let entity = this.state.entityDTO;
        let name = event.target.name;
        let value = event.target.value;
        entity[name] = value;

        this.setState({ entity });
        this.state.error = false;
        for (let i = 0; i < this.state.mastertype.length; i++) {
            if (this.state.mastertype[i] == this.state.entityDTO.masterType) {
                return this.setState({ error: true });
            }
        }
        console.log("Error: ", this.state.error)
    }

    render() {
        return (
            <div>
                <Card >
                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                            <Icon><img id="icon" src={role} /></Icon>
                        </CardIcon>
                        {
                            <h4 >
                                <small> Product Entity </small>
                            </h4>
                        }
                    </CardHeader>
                    <CardBody>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                    required={true}
                                    labelText="Master Type"
                                    id="lName"
                                    value={this.state.entityDTO.masterType}
                                    name="masterType"
                                    onChange={(e) => this.handleinputvalue(e)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                                {this.state.error ? <p className="error">*MasterType is already Exists</p> : null}
                            </GridItem>
                            {/*   <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                    labelText="Type Code"
                                    id="lName"
                                    value={this.state.entityDTO.typeCode}
                                    name="typeCode"
                                    onChange={(e) => this.handleinputvalue(e)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>*/}
                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                    required={true}
                                    labelText="Value"
                                    id="lName"
                                    value={this.state.entityDTO.value}
                                    name="value"
                                    onChange={(e) => this.handleinputvalue(e)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                                <Dropdown
                                    required={true}
                                    labelText="Assign Relation"
                                    lstObject={this.state.masterList}
                                    value={this.state.entityDTO.parentId}
                                    name='parentId'
                                    onChange={(e) => this.handleChange(e)}
                                    formControlProps={{ fullWidth: true }}
                                />
                            </GridItem>
                            <GridContainer justify="center">
                                <GridItem>
                                    <Button id="top-bnt" round color="success" onClick={this.handlesubmit}>Submit</Button>
                                </GridItem>
                            </GridContainer>
                        </GridContainer>
                        <br />
                        <br />
                        {this.state.showtable ?
                            <GridItem lg={12}>
                                <ReactTable
                                    data={this.state.tabledata}
                                    filterable
                                    columns={[
                                        {
                                            Header: "Master ID",
                                            accessor: "id",
                                            setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                            headerClassName: 'react-table-center',
                                            minWidth: 10,
                                            resizable: false,
                                        },
                                        {
                                            Header: "MasterType",
                                            accessor: "masterType",
                                            setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                            headerClassName: 'react-table-center',
                                            minWidth: 20,
                                            resizable: false,
                                        },
                                        {
                                            Header: "Value",
                                            accessor: "value",
                                            setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                            headerClassName: 'react-table-center',
                                            minWidth: 20,
                                            resizable: false,
                                        },
                                        {
                                            Header: "Level",
                                            accessor: "level",
                                            setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                            headerClassName: 'react-table-center',
                                            minWidth: 10,
                                            resizable: false,
                                        },
                                        {
                                            Header: "Parent Id",
                                            accessor: "parentId",
                                            setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                            headerClassName: 'react-table-center',
                                            minWidth: 10,
                                            resizable: false,
                                        },
                                    ]}
                                    defaultPageSize={5}
                                    showPaginationTop={false}
                                    pageSize={([this.state.tabledata.length + 1] < 5) ? [this.state.tabledata.length + 1] : 5}
                                    showPaginationBottom={([this.state.tabledata.length + 1] <= 5) ? false : true}
                                    className="-striped -highlight"
                                />
                            </GridItem>
                            : null}
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default withStyles(style)(ProductEntity);