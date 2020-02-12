import React from "react";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import role from "assets/img/users.png";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import './style.css';

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

class DocumentTutorials extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
                {/* <object data='https://s3.ap-south-1.amazonaws.com/mica.documents/usermanualdoc.pdf'></object>*/}
                        <embed src='https://s3.ap-south-1.amazonaws.com/mica.documents/usermanualdoc.pdf' width="1364px" height="543px"/> 
              {/*    <iframe src="https://s3.ap-south-1.amazonaws.com/mica.documents/usermanualdoc.pdf" style="width:950px; height:550px;" frameborder="0" scrolling="no" zooming="true"></iframe> */}
            </div>
        );
    }
}
export default withStyles(style)(DocumentTutorials);