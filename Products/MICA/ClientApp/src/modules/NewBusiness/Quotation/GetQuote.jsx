import Icon from "@material-ui/core/Icon";
import withStyles from "@material-ui/core/styles/withStyles";
import generatequotation from "assets/img/generate-quotation.png";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import React from "react";
import { Animated } from "react-animated-css";
import NewBusinessConfig from "modules/NewBusiness/NewBusinessConfig.js";

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

class GetQuote extends React.Component {
    constructor(props) {
        super(props);
        console.log("artprops", props);
        this.state = {
            masterList1: [],
            goflag: false,
            QuoteDto: {
                productId: "",
            },
            ProductLevelData: [],
            showprodleveldata: false,
            showfields: false,
        };
        //this.assignrolesubmit = this.assignrolesubmit.bind(this);

    }


    componentDidMount() {
        fetch(`${NewBusinessConfig.ProductConfig}/api/Product/GetMasterData?sMasterlist=` + "Product", {
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
                this.setState({ masterList1: data });
            });


    }

    onInputQuoteChange = (evt) => {
        const quotefields = this.state.QuoteDto;
        quotefields[evt.target.name] = evt.target.value;
        this.setState({ quotefields, goflag: true, showfields: false  });
    }
    onGet = () => {
        fetch(`${NewBusinessConfig.ProductConfig}/api/Product/GetInsurableRiskDetails?ProductId=` + this.state.QuoteDto.productId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("MasterDto:", data);
                //this.leadTable(data);

                console.log("ProductLevelData", this.state.ProductLevelData)
                var arr = [];
                arr.push(data)
                this.setState({ ProductLevelData: arr, showfields: true });
                console.log("fieldsdata", this.state.ProductLevelData);

            });
    }
    render() {
        const { classes } = this.props;
        return (
            <div>

                <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                    <GridContainer lg={12}>
                        <GridItem xs={12} sm={12} md={12}>
                            <Card>
                                <CardHeader color="info" icon >
                                    <CardIcon color="rose">
                                        <Icon><img id="icon" src={generatequotation} /></Icon>
                                    </CardIcon>
                                    {
                                        <h3 >
                                            <small>Get Quote</small>
                                        </h3>
                                    }
                                </CardHeader>
                                <CardBody>
                                    <div>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <MasterDropdown
                                                    labelText="Product Name"
                                                    id="productId"
                                                    value={this.state.QuoteDto.productId}
                                                    lstObject={this.state.masterList1}
                                                    required={true}
                                                    filterName='Product'
                                                    name='productId'
                                                    onChange={this.onInputQuoteChange}
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                />
                                            </GridItem>
                                            {this.state.goflag && < GridItem >
                                                <Button id="round" style={{ marginTop: '25px' }} color="info" onClick={this.onGet}> Go </Button>
                                            </GridItem>}
                                            </GridContainer>
                                       </div>
                                </CardBody>
                                </Card>
                            </GridItem>

                    </GridContainer>
                    {this.state.showfields && <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <Card>
                                <CardBody>
                                    <div>
                                        <GridContainer>
                                            <GridContainer>
                                                <GridItem>
                                                    <h4><small> Product Level </small></h4>
                                                </GridItem>
                                            </GridContainer>

                                            {this.state.ProductLevelData[0].productRcbDetails.map((item, index) =>

                                                <GridItem xs={12} sm={12} md={4} key={index}>
                                                    {(item.userInputType != "datetime") ?
                                                        <CustomInput labelText={item.inputType}
                                                            // value={item.paramName}
                                                            name={item.inputType}
                                                            onChange={(e) => this.onInputParamChange(e)}
                                                            inputProps={{
                                                                //type: "number"
                                                            }}
                                                            formControlProps={{ fullWidth: true }} /> :
                                                        <CustomDatetime
                                                            labelText={item.inputType}
                                                            //name={item.inputType} 
                                                            //value={this.state.fields[item.inputType]} 
                                                            //onChange={(evt) => this.onDateChange('Datetime', item.inputType, evt)} 
                                                            //value={this.state.fields[item.inputType]} 
                                                            formControlProps={{ fullWidth: true }} />
                                                    }
                                                </GridItem>
                                            )}



                                            {this.state.ProductLevelData[0].productRcbInsurableDetails.map((item, index) =>
                                                <GridContainer>

                                                    <GridItem xs={12} sm={12} md={12}>
                                                        <h4><small> Cover level details </small></h4>
                                                    </GridItem>

                                                    {item.coverRcbdetails.map((prop1, key1) =>



                                                        <GridItem xs={12} sm={12} md={12}>
                                                            <GridItem xs={12} sm={12} md={12}>
                                                                <h5><b>{prop1.inputType}</b></h5>
                                                            </GridItem>
                                                            <GridContainer>


                                                                {prop1.coverChildRcbdetail.map((prop2, key2) =>

                                                                    <GridItem xs={12} sm={12} md={4} key={key2}>
                                                                        {(prop1.userInputType != "datetime") ?
                                                                            <CustomInput labelText={prop2.inputType}
                                                                                // value={item.paramName}
                                                                                name={prop2.inputType}
                                                                                onChange={(e) => this.onInputParamChangeCover(e, index, key1, 0)}
                                                                                inputProps={{
                                                                                    //type: "number"
                                                                                }}
                                                                                formControlProps={{ fullWidth: true }} /> :
                                                                            <CustomDatetime labelText={prop2.inputType} name={prop2.inputType} value={this.state.fields[prop2.inputType]} onChange={(evt) => this.onDateChange('Datetime', item.inputType, evt)} value={this.state.fields[prop2.inputType]} formControlProps={{ fullWidth: true }} />
                                                                        }

                                                                    </GridItem>
                                                                )}
                                                            </GridContainer>
                                                        </GridItem>

                                                    )}
                                                </GridContainer>

                                            )}


                                        </GridContainer>

                                        <GridContainer>
                                            < GridItem >
                                                <Button id="round" style={{ marginTop: '25px' }} color="info" > Calculate Premium </Button>
                                            </GridItem>
                                        </GridContainer>
                                        {/*  <GridContainer>
                                        < GridItem >
                                            <Button id="round" style={{ marginTop: '25px' }} color="info" >View PDF </Button>
                                        </GridItem>
                                        < GridItem >
                                            <Button id="round" style={{ marginTop: '25px' }} color="info" >Send Mail </Button>
                                        </GridItem>
                                        < GridItem >
                                            <Button id="round" style={{ marginTop: '25px' }} color="info" >Save Quote </Button>
                                        </GridItem>

                                    </GridContainer>*/}
                                    </div>
                                </CardBody>
                            </Card>
                        </GridItem>
                    </GridContainer>}
                        </Animated>
                   
           
            </div>
                    );
                }
            }
            
            export default withStyles(style)(GetQuote);
            
