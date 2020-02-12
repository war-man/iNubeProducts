
import React from "react";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import role from "assets/img/users.png";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import Button from "components/CustomButtons/Button.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import Modal from '@material-ui/core/Modal';
import PDFViewer from 'pdf-viewer-reactjs';
import { Animated } from "react-animated-css";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import RDLCConfig from  'modules/RDLC/RDLCConfig.js';

const searchClose = {
    float: "right",
    position: 'relative',
    width: "26px",
    height: "28px",
    borderRadius: "4px",
    fontSize: "larger",
    padding: "0px",
    right: '10px',

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

class RDLCReports extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            byte: [],
            open: false,
            ReportsDto: {
                policynumber:"",
            },
        };
    }

    SetValue = event => {
        let ReportsDto = this.state.ReportsDto;
        ReportsDto[event.target.name] = event.target.value;
        this.setState({ ReportsDto });
        console.log("ReportsDto", this.state.ReportsDto);
    };

    ViewPDFFun = () => {
        debugger;
        let PolicyNo = this.state.ReportsDto.policynumber;
        //fetch(`http://localhost:53000/api/Rdlc/?PolicyNo=` + PolicyNo, {
        fetch(`${RDLCConfig.RDLCConfigUrl}/api/Rdlc/ReportForCoveringLetter?PolicyNo=` + PolicyNo, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        })
            .then(response => response.json())
            .then(data => {
                //this.setState({ SeachDeatils: data })
                console.log("data coming from server",data,data.mainStream);
                //let data1 = data.mainStream;
                console.log("data1", data.mainStream);
                this.setState({ byte: data.mainStream });
                console.log("statedata", this.state.byte);
                this.setState({ open: true });
            });

    }
    handleClose = () => {
        this.setState({ open: false });
    }

    render() {
        const { classes } = this.props;
        return (
           
                <Card className="assignCard">
                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                            <Icon><img id="icon" src={role} /></Icon>
                        </CardIcon>
                        {
                            <h4 >
                                <small> RDLC Reports </small>
                            </h4>
                        }
                    </CardHeader>
                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                    <CardBody>
                        <Modal
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={this.state.open}
                            onClose={this.handleClose}

                        >
                            <div className={classes.paper} id="modal">


                                <Button color="info"
                                    round
                                    className={classes.marginRight}
                                    style={searchClose}
                                    onClick={this.handleClose}>
                                    &times;
                                </Button>
                                {/*<Modify surNameState="" classes={classes} handleSimple={this.handleSimple} handleClose={this.handleClose} masterList={this.state.masterList} LeadDTO={this.state.LeadDTO} SetValue={this.SetValue} suspectinfo={this.state.suspectinfo} modifySuspect={this.modifySuspect} SetaddressValue={this.SetaddressValue} addressDTO={this.state.addressDTO} />*/}
                                <PDFViewer
                                    document={{
                                        base64: this.state.byte,
                                    }}
                                />

                            </div>
                        </Modal>
                        <GridItem xs={12} sm={4}>
                            <CustomInput
                                labelText="Policy Number"
                                name="policynumber"
                                value={this.state.ReportsDto.policynumber}
                                onChange={(e) => this.SetValue(e)}
                                formControlProps={{ fullWidth: true }}
                            />
                        </GridItem>
                        <center>
                            <Button color="rose" onClick={this.ViewPDFFun}>View PDF</Button>
                        </center>
                        </CardBody>
                    </Animated>
                </Card>
           
        );
    }
}

export default withStyles(style)(RDLCReports);