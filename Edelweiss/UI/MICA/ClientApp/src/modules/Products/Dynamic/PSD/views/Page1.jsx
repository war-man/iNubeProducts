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
        PageData: [],
        AttributeName:"",
      
    };
    constructor(props) {
        super(props);
    }

    componentDidMount() {

        this.state.PageData.push(this.props.PageData.AttributeList[0].PageData[0]);
        this.state.AttributeName = this.props.PageData.AttributeList[0].AttributeType;
        this.setState({ });
     
    }

    handleAttributes = (event,AttrType,PageData) => {

        console.log("PageDataPageData", PageData);

        this.setState({ AttributeName: AttrType });

        this.setState({ PageData : PageData});
            
    }


    ToolBar = (AttrList) => {

       // debugger;
        console.log("SubmenuListprops", AttrList);


        let AttrData = AttrList.AttributeList;
   
        let Icons = AttrData.map(m => {
                let DynamicIcon = MasterIcons[m.Icon];


            return(    <Tooltip title={m.AttributeType}>
                    <IconButton aria-label="delete">
                    <DynamicIcon fontSize="small" onClick={(e) => this.handleAttributes(e, m.AttributeType, m.PageData)} />
                    </IconButton>
                </Tooltip>
                )
                
            })


            return Icons;
    
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
                                {this.state.PageData.map(m =>
                                   <GridContainer>
                                        <GridItem xs={12} sm={12} md={2}>
                                            <CustomInput
                                                labelText={m.id}
                                                required={true}
                                                name="SchemaName"
                                                formControlProps={{ fullWidth: true }}
                                            />


                                         
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}>

                                        <CustomInput
                                                labelText={m.Name}
                                                required={true}
                                                name="SchemaName"
                                                formControlProps={{ fullWidth: true }}
                                            />
                                            </GridItem>

                                        <GridItem xs={12} sm={12} md={2}>

                                            <Button> {m.Year} </Button>

                                         
                                        </GridItem>

                                    </GridContainer>                     
                                )}
                                </div>
                            


                        </GridItem>

             </CardBody>
                </Card>
            </div>
        );
    }
}

export default withStyles(style)(Page1);