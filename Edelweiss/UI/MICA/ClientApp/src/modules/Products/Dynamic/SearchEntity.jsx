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
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import ProductConfig from 'modules/Products/Micro/ProductConfig.js';
import swal from 'sweetalert';
import Entities from './Entities';





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

class SearchEntity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchData: {},
            searchflag: false,
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
            searchEntity: {
                name: "",
            },
        };
    }


  
    handleSearchEntity = () => {
        fetch(`${ProductConfig.productConfigUrl}/api/PSD/GetEntityByName?EntName=` + this.state.searchEntity.name, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ searchData: data });
                console.log("data:", data, this.state.searchData);
            });  
       // this.setState({ searchflag: true });
        this.state.searchflag = true;
        console.log("searchflag:", this.state.searchflag);
    }

    SetAttValue = ((type, event) => {

        let searchentity = this.state.searchEntity;
        let name = event.target.name;
        let value = event.target.value;
        searchentity[name] = value;
        this.setState({ searchentity });
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
                            <small> Entity Search </small>
                        </h4>
                    }
                </CardHeader>

                <CardBody>

                    <GridContainer>
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="Entity Name"
                                name="name"
                                id="name"
                                value={this.state.searchEntity.name}
                                onChange={(e) => this.SetAttValue("string", e)}
                                formControlProps={{ fullWidth: true }}
                            />
                           
                        </GridItem>
                        
                       
                    </GridContainer>
                        <GridContainer lg={12} justify="center">
                            <GridItem xs={5} sm={3} md={3} lg={1}>
                                    <Button id="round" color="info" onClick={this.handleSearchEntity}> Search  </Button>
                            </GridItem>
                        </GridContainer>

                </CardBody>
            </Card>
            {this.state.searchflag?
                <Entities searchData={this.state.searchData} searchflag={this.state.searchflag} />
                : null}
        </div>
    );
}
}
export default withStyles(style)(SearchEntity);