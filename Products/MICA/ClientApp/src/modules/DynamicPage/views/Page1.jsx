import React from "react";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import role from "assets/img/users.png";
import DynamicForm from './DynamicFields';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import ToolBar from './ToolBar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import Dropdown from "../../../components/Dropdown/Dropdown.jsx";
import * as MasterIcons from '@material-ui/icons';

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

class Page1 extends React.Component {

    state = {
        CustomPageData: [{ type: "string", labelText: "Product Name" }, { type: "Date", labelText: "Product Date" }, {
            type: "DropDown", labelText: "Product Name", Data: [{ mID: "Package", mValue: "Package", mType: 1 },
            { mID: "Product", mValue: "Product", mType: 2 },
            { mID: "Insurable Item", mValue: "Insurable Item", mType: 3 },
            { mID: "Cover", mValue: "Cover", mType: 4 },
            { mID: "Benifit", mValue: "Benifit", mType: 5 },
            { mID: "Plan", mValue: "Plan", mType: 6 },
            { mID: "Relationship", mValue: "Relationship", mType: 7 },
            ] }], 
        PageData: [],
        AttributeName:"",
      
    };
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("MASTERPAGE", this.props.PageData.AttributeList);

//        let DATA = this.props.PageData.AttributeList.filter(x => x.AttributeList == "Basic");

      //  console.log("MASTERPAGE---2", DATA.filter(x => x.AttributeList == "Basic"));
        //this.setState({ PageData: this.props.PageData }) 
         

        console.log("MASTERPAGE---3", this.state.PageData);

        this.state.AttributeName = this.props.PageData.AttributeList[0].AttributeType;
        this.setState({ });
     
    }

    handleAttributes = (event,AttrType,PageData) => {

        console.log("PageDataPageData", PageData);

        this.setState({ AttributeName: AttrType });

        this.setState({ PageData : PageData});
            
    }


    ToolBar = (AttrList) => {

        let AttrData = AttrList.AttributeList;
   
        let Icons = AttrData.map(m => {
                let DynamicIcon = MasterIcons[m.Icon];


            return(    <Tooltip title={m.AttributeType}>
                <IconButton aria-label="delete" onClick={(e) => this.handleAttributes(e, m.AttributeType, m.PageData)}>
                    <DynamicIcon fontSize="small"  />
                    </IconButton>
                </Tooltip>
                )
                
            })


            return Icons;
    
    }



    renderPage = (Data) => {
        
        //let PageReturn = Data.map(m => {

        console.log("DataData---3", Data);

        if (Data.type == "Text") {

                return (  <CustomInput 
                    labelText={Data.labelText}
                    required={true}
                    name={Data.LabelName}
                    formControlProps={{ fullWidth: true }}
                />

                );


            }
        else if (Data.type == "DateTime") {

                return (
                    <CustomDatetime
                        labelText={Data.labelText}
                       // id='dob'
                        name={Data.labelText}
                       // Futuredatevalidate={true}
                        //required={true}
                        //onChange={(evt) => props.onDateChange('dob', evt)}
                        //value={props.UserData.dob}
                        formControlProps={{ fullWidth: true }} />

                );


            }

        else if (Data.type == "Dropdown") {

                return (
                    <Dropdown
                       // required={true}
                        labelText={Data.labelText}
                        id="Type"
                        lstObject={[]}
                        //value={this.state.selectedType}
                        //name='selectedType'
                        //onChange={(e) => this.handleSchemaType(e)}
                        formControlProps={{ fullWidth: true }}
                    />

                );


            }


        //});

        //return PageReturn;
    }


    render() {

     

        return (
            <div>

                <Card >
                <CardHeader color="rose" icon>
                    <CardIcon color="rose">
                        <Icon><img id="icon" src={role} /></Icon>
                        </CardIcon>

                        <h4 >
                            <small> {this.props.PageData.SchemaType}</small>
                        </h4>
                               <div id="icons">


                            {this.ToolBar(this.props.PageData)}

                        </div>
                       
                </CardHeader>

                    <CardBody>
                      
                        <GridItem>

                                <div>
                                <h3> {this.state.AttributeName} </h3>
                                        <GridContainer xs={12}>
                                    
                                        {this.state.PageData.map(m =>

                                                <GridItem xs={12} sm={12} md={4}>
                                                    {this.renderPage(m)}

                                                </GridItem>
                                            )
                                        }

                                    
                                        </GridContainer>
                            </div>
                            


                        </GridItem>

             </CardBody>
                </Card>
            </div>
        );
    }
}

export default withStyles(style)(Page1);