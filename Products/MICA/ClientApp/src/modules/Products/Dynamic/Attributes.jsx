import React from "react";
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
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import ProductConfig from 'modules/Products/Micro/ProductConfig.js';
import swal from 'sweetalert';






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

class Attributes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            masterList: [],
            dateSaved: {},
            attributesDto: {
                name: "",
                complexity: "",
                storage: "",
                listOfValues: "",
                dependency: "",
                dataType: "",
                default: "",
                displayType: "",
            },
            modifyFlag: false,
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

       
        debugger
        if (this.props.searchflag == true) {
            debugger
            //if (this.props.searchData != {} || this.props.searchData != undefined) {
            console.log("att:", this.props.searchData);
            let bdata = this.state;
            let Attobj = this.props.searchData;
            bdata['attributesDto'] = this.props.searchData[0];
            console.log("attributesDto", this.state.attributesDto)
            this.setState({ modifyFlag: true });
           // }
        }
        
    }
    handleSaveAttribute = () => {
        fetch(`${ProductConfig.productConfigUrl}/api/PSD/SaveAttribute`, {
            method: 'POST',
            body: JSON.stringify(this.state.attributesDto),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
       
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


    handleModifyAttribute = () => {
        fetch(`${ProductConfig.productConfigUrl}/api/PSD/UpdateAttribute`, {
            method: 'PUT',
            body: JSON.stringify(this.state.attributesDto),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log("modifieddata", data);
            swal({
                text: "Data Modified successfully!",
                icon: "success"
            });
        });
    }

    SetAttValue = ((type, event) => {

        let attributesDTO = this.state.attributesDto;
        let name = event.target.name;
        let value = event.target.value;
        attributesDTO[name] = value;
        this.setState({ attributesDTO });
       // this.change(event, name, type);
    });

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
                            <small> Attribute </small>
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
                                labelText="Attribute Name"
                                name="name"
                               // required={true}
                                id="name"
                                value={this.state.attributesDto.name}
                                onChange={(e) => this.SetAttValue("string", e)}
                                formControlProps={{ fullWidth: true }}
                            />
                           
                        </GridItem>
                        
                        <GridItem xs={12} sm={12} md={4}>
                            <MasterDropdown
                                labelText="Complexity"
                                id="complexity"
                               // disabled={prop.showlist[props.index]['disableRate']}
                                value={this.state.attributesDto.complexity}
                                lstObject={this.state.masterList}
                               // required={true}
                                filterName='Complexity'
                                //model="billingItem"
                                name='complexity'
                                onChange={(e) => this.SetAttValue("string", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                            </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            
                            <MasterDropdown
                                labelText="Attribute Storage"
                                id="storage"
                                // disabled={prop.showlist[props.index]['disableRate']}
                                value={this.state.attributesDto.storage}
                                lstObject={this.state.masterList}
                                // required={true}
                                filterName='Storage'
                                //model="billingItem"
                                name='storage'
                                onChange={(e) => this.SetAttValue("string", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                //success={this.state.customerNameState === "success"}
                                //error={this.state.customerNameState === "error"}
                                // disabled={this.state.CustNameDisable}
                                labelText="List Of Values"
                                name="listOfValues"
                                // required={true}
                                id="listOfValues"
                                value={this.state.attributesDto.listOfValues}
                                onChange={(e) => this.SetAttValue("string", e)}
                                formControlProps={{ fullWidth: true }}
                            />
                           
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            
                            <MasterDropdown
                                labelText="Dependency"
                                id="dependency"
                                // disabled={prop.showlist[props.index]['disableRate']}
                                value={this.state.attributesDto.dependency}
                                lstObject={this.state.masterList}
                                // required={true}
                                filterName='Dependency'
                                //model="billingItem"
                                name='dependency'
                                onChange={(e) => this.SetAttValue("string", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                           
                            <MasterDropdown
                                labelText="DataType"
                                id="dataType"
                                // disabled={prop.showlist[props.index]['disableRate']}
                                value={this.state.attributesDto.dataType}
                                lstObject={this.state.masterList}
                                // required={true}
                                filterName='Data Type'
                                //model="billingItem"
                                name='dataType'
                                onChange={(e) => this.SetAttValue("string", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                    //success={this.state.customerNameState === "success"}
                                    //error={this.state.customerNameState === "error"}
                                    // disabled={this.state.CustNameDisable}
                                    labelText="Default"
                                name="default"
                                    // required={true}
                                id="default"
                                value={this.state.attributesDto.default}
                                    onChange={(e) => this.SetAttValue("string", e)}
                                    formControlProps={{ fullWidth: true }}
                                />

                            </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                           
                            <MasterDropdown
                                labelText="DisplayType"
                                id="displayType"
                                // disabled={prop.showlist[props.index]['disableRate']}
                                value={this.state.attributesDto.displayType}
                                lstObject={this.state.masterList}
                                // required={true}
                                filterName='Display Type'
                                //model="billingItem"
                                name='displayType'
                                onChange={(e) => this.SetAttValue("string", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>

                    </GridContainer>
                    <GridContainer lg={12} justify="center">
                        {this.state.modifyFlag == false ?
                            <GridItem xs={5} sm={3} md={3} lg={1}>
                                <Button id="round" color="info" onClick={this.handleSaveAttribute}> Save  </Button>
                            </GridItem>
                            :
                            <GridItem xs={5} sm={3} md={3} lg={1}>
                                <Button id="round" color="info" onClick={this.handleModifyAttribute}> Modify  </Button>
                            </GridItem>
                        }
                        </GridContainer>

                </CardBody>
            </Card>
        </div>
    );
}
}
export default withStyles(style)(Attributes);