import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import $ from 'jquery';

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import CreateUser from "./_CreateUser";
import Button from "components/CustomButtons/Button.jsx";
import data from 'views/Test/data.json';
import CustomDropDownTree from "components/CustomDropdownTree/CustomDropDownTree.jsx";
import DropdownTreeSelect from "react-dropdown-tree-select";


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

const btnStyle = {
    margin : '0 auto'
}

class UserCreation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            role:[],
            simpleSelect: "",
            userFlag : false
        };
        this.save = this.save.bind(this);
    }
    
    onChange = (currentNode, selectedNodes) => {
        this.state.role.push(currentNode.permissionId);
    }
    save() {
        fetch(`http://localhost:2020/api/Permission/GetPermissions`, {
            method: 'Get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <GridContainer justify="center">
                    <GridItem >
                        <CustomDropDownTree
                            data={data}
                            onChange={this.onChange}
                        />
                    </GridItem>
                    <br/>
                    <GridContainer justify="center">
                        <GridItem >
                            <Button onClick={this.save} color="success">Save</Button>
                        </GridItem>
                    </GridContainer>
                </GridContainer>
            </div>
        );
    }
}

export default withStyles(style)(UserCreation);
