import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import lead from "assets/img/man-user.png";
import Icon from "@material-ui/core/Icon";
import validationPage from "components/Validation/Validation.jsx";
import NewBusinessConfig from 'modules/NewBusiness/NewBusinessConfig.js'; 
import { Animated } from "react-animated-css";
import CommonModify from './CommonModify.jsx';


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

const submitBtn = {
    height: "35px",
    marginTop: "-10px",
}

class CreateLead extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue: null,
            isShow: false,
            masterList: [],
            errormessage: false, 
         

            UserData:
            {
                "userId": "",
                "userName": "",
               
            },
         
            errors: {},
            fields: {}
        };
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.emiratesChange = this.emiratesChange.bind(this);
        this.detailsChange = this.detailsChange.bind(this);
      
       
    }

  
    componentDidMount() {
       fetch(`${NewBusinessConfig.NewBusinessConfigUrl}/api/Lead/GetMaster?isFilter=true`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("masterList: ", data);
                this.setState({ masterList: data });
            });
        console.log("data1", this.state.masterList);
  
    }

  
    handleSimple = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    handleRadioChange(e) {
        this.state.radioVal = e.target.value;
        this.setState({ selectedValue: e.target.value })
        let UserData = this.state.UserData;
        let name = 'userTypeId';
        let value = e.target.value;

        UserData[name] = value;

        this.setState({ UserData })
        if (this.state.radioVal == "1004") {
            this.setState({
                emrFlag: true,
                detFlag: false,
               visibility: true,
                emiratesid: "",
                fields: "",
                errors: "",
            })
            console.log("usertype", this.state.UserData.userTypeId)
        }
        else if (this.state.radioVal == "1003") {
            this.setState({
                detFlag: true,
                emrFlag: false,
                visibility: false,
                emiratesid: "",
                fields: "",
                errors: "",
            })
            console.log("usertype", this.state.UserData.userTypeId)
        }  
        else { }
    }

   

    emiratesChange(type, event) {
        this.setState({
            [event.target.name]: event.target.value,
            emiratesid: event.target.value
        });
       
    }

    detailsChange(type, event) {
        this.setState({
            [event.target.name]: event.target.value,
            saluation: event.target.value,
        });
     
    };
      render() {
        const { classes } = this.props;
        return (
            <div>
                <Card>
                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                            <Icon><img id="icon" src={lead} /></Icon>
                        </CardIcon>
                        {
                            <h4 >
                                <small>New Lead</small>
                            </h4>
                        }
                    </CardHeader>
              
                   
                    
                    
                        <GridContainer xl={12}>
                            
                                
                            <GridItem xs={12} sm={6} style={radioAlign}>
                                <div>
                                    <h6> Do you know the Emirates Id </h6>
                                    <FormControlLabel
                                        control={
                                            <Radio
                                                checked={this.state.selectedValue === "1004"}
                                                onChange={this.handleRadioChange}
                                                value="1004"
                                                name="radio button demo"
                                                aria-label="B"
                                                icon={
                                                    <FiberManualRecord
                                                        className={classes.radioUnchecked}
                                                    />
                                                }
                                                checkedIcon={
                                                    <FiberManualRecord
                                                        className={classes.radioChecked}
                                                    />
                                                }
                                                classes={{
                                                    checked: classes.radio,
                                                    root: classes.radioRoot
                                                }}
                                            />
                                        }
                                        classes={{
                                            label: classes.label
                                        }}
                                        label="Yes"
                                    />


                                    <FormControlLabel
                                        control={
                                            <Radio
                                                checked={this.state.selectedValue === "1003"}
                                                onChange={this.handleRadioChange}
                                                value="1003"
                                                name="radio button demo"
                                                aria-label="B"
                                                icon={
                                                    <FiberManualRecord
                                                        className={classes.radioUnchecked}
                                                    />
                                                }
                                                checkedIcon={
                                                    <FiberManualRecord
                                                        className={classes.radioChecked}
                                                    />
                                                }
                                                classes={{
                                                    checked: classes.radio,
                                                    root: classes.radioRoot
                                                }}
                                            />
                                        }
                                        classes={{
                                            label: classes.label
                                        }}
                                        label="No"
                                    />
                                </div>
                            </GridItem>

                        </GridContainer>
                </Card>
                <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                            {this.state.emrFlag ? 
                                <CommonModify isShow={this.state.isShow} isShowCreateLead={true} /> : null}


                                {
                                    this.state.detFlag ?

                                    <CommonModify isShow={this.state.isShow} isShowCreateLead={true} isDontShowCreateLeadBtn={true}/> : null}
               
                                
                </Animated>    
               
                
            </div>
        );
    }
}

export default withStyles(style)(CreateLead);