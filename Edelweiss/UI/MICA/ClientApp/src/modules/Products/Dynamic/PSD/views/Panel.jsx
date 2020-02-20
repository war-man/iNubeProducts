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
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography'
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import MailIcon from '@material-ui/icons/Mail';
import AddIcon from '@material-ui/icons/Add';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import DynamicPage from './DynamicPage';
import Page1 from './Page1';
import PSDComponent from './PSD';

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

const useTreeItemStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.text.secondary,
        '&:focus > $content': {
            backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
            color: 'var(--tree-view-color)',
        },
    },
    content: {
        color: theme.palette.text.secondary,
        borderTopRightRadius: theme.spacing(2),
        borderBottomRightRadius: theme.spacing(2),
        paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightMedium,
        '$expanded > &': {
            fontWeight: theme.typography.fontWeightRegular,
        },
    },
    group: {
        marginLeft: 0,
        '& $content': {
            paddingLeft: theme.spacing(2),
        },
    },
    expanded: {},
    label: {
        fontWeight: 'inherit',
        color: 'inherit',
    },
    labelRoot: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0.5, 0),
    },
    labelIcon: {
        marginRight: theme.spacing(1),
    },
    labelText: {
        fontWeight: 'inherit',
        flexGrow: 1,
    },
}));

const useStyles = makeStyles({
    root: {
        height: 264,
        flexGrow: 1,
        maxWidth: 400,
    },
});

function StyledTreeItem(props) {
    const classes = useTreeItemStyles();
    const { labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other } = props;

    return (
        <TreeItem
            label={
                <div className={classes.labelRoot}>
                    <LabelIcon color="inherit" className={classes.labelIcon} />
                    <Typography variant="body2" className={classes.labelText}>
                        {labelText}
                    </Typography>
                    <Typography variant="caption" color="inherit">
                        {labelInfo}
                    </Typography>
                </div>
            }
            style={{
                '--tree-view-color': color,
                '--tree-view-bg-color': bgColor,
            }}
            classes={{
                root: classes.root,
                content: classes.content,
                expanded: classes.expanded,
                group: classes.group,
                label: classes.label,
            }}
            {...other}
        />
    );
}

StyledTreeItem.propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    labelIcon: PropTypes.elementType.isRequired,
    labelInfo: PropTypes.string,
    labelText: PropTypes.string.isRequired,
};

class DynamicTreeView extends React.Component {

    state = {
        PageFlag: false, MasterPageFlag: false, PSDPage: false, DataSent: "Child", NewPageFlag: false, FinalModel: [], FinalPageData: [], DataSent: "",
        HeaderSchemaName:"",HeaderSchemaType:"",

        TreeMaster: [{ mID: "Package", mValue: "Package", mType: 1 },
        { mID: "Product", mValue: "Product", mType: 2 },
        { mID: "Insurable Item", mValue: "Insurable Item", mType: 3 },
        { mID: "Cover", mValue: "Cover", mType: 4 },
        { mID: "Benifit", mValue: "Benifit", mType: 5 },
        { mID: "Plan", mValue: "Plan", mType: 6 },
        { mID: "Relationship", mValue: "Relationship", mType: 7 },
        ],

        AttributeMaster: [{ mID: "Clauses", mValue: "Clauses", mType: 1 },
        { mID: "Warrenties", mValue: "Warrenties", mType: 2 },
        { mID: "Exclusion", mValue: "Exclusion", mType: 3 },
        { mID: "Risk", mValue: "Risk", mType: 4 },
        { mID: "Basic", mValue: "Basic", mType: 5 },
        { mID: "Claims", mValue: "Claims", mType: 6 },
        { mID: "Channels", mValue: "Channels", mType: 7 },
        { mID: "Premium", mValue: "Premium", mType: 8 },
        { mID: "PDF Template", mValue: "PDF Template", mType: 9 },
        { mID: "Rules", mValue: "Rules", mType: 10 },
        ],

        DynamicModel: {
            SchemaId: 2,
            SchemaName: "",
            SchemaType: "",
            AttributeList: [],
            SubMenu: []
        },

        ObjAttribute: {
            AttributeId: 1,
            AttributeType: "Clauses",
            Icon: "font_download",
            PageData: [
                {
                    id: "FirstName",
                    Name: "Mobile",
                    Year: "Submit"
                }
            ]
        },

    };
    constructor(props) {
        super(props);
    }


    TreeItemFun = (e, SchemaName,Label) => {
        debugger
        this.setState({ HeaderSchemaName: SchemaName });
        this.setState({ HeaderSchemaType: Label });
        this.setState({ DataSent: "Child" });
        this.setState({ PageFlag: true });

      

  

    };

    TreeViewFun = (e, SchemaName, Label) => {
        debugger
        console.log("Event", e);
        console.log("TreeViewLabel", Label);
        this.setState({ HeaderSchemaName: SchemaName });
        this.setState({ HeaderSchemaType: Label });
        this.setState({ FinalPageData: this.props.FinalModel});
        this.setState({ PageFlag: true });
       
        this.setState({ DataSent: "ChildCallAgain" });



  };


    handleSchemaAdd = () => {
        this.setState({ PageFlag: false });
        this.setState({ PSDPage: true });

    }



    childcallbackPSDFunction = (childData,dataSent) => {
        debugger;
        console.log("DatafromChildPSD", childData);

        console.log("DatafromChildPSDSENT", dataSent);
     
        this.setState({ FinalModel: childData });
        this.setState({ PageFlag: false });
        this.setState({ FinalPageData: this.state.FinalModel });
  

     

    }



    PAGECALL = () => {

        debugger;
        console.log("props.DataSent", this.props.DataSent);
        console.log("state.DataSent", this.state.DataSent);

        if (this.state.DataSent == "Child") {

            console.log("parentloop", this.state.DataSent);

            return (<Page1 FinalModel={this.state.FinalModel} DataSent={this.state.DataSent} HeaderSchemaName={this.state.HeaderSchemaName} HeaderSchemaType={this.state.HeaderSchemaType} />);
            console.log("this.props.FinalModelthis.props.FinalModel", this.props.FinalModel);

        }
        else {

            console.log("childloop", this.state.DataSent);
            return (<Page1 FinalModel={this.props.FinalModel} HeaderSchemaName={this.state.HeaderSchemaName} HeaderSchemaType={this.state.HeaderSchemaType}/>);

        }

    }


    renderForm = () => {
        const classes = makeStyles({
            root: {
                height: 264,
                flexGrow: 1,
                maxWidth: 400,
            },
        });
        console.log("Treeview Props", this.props);

        let model = this.props.model;
        let defaultValues = this.props.defaultValues;
        let FinalModel = this.props.FinalModel;

        let formUI = FinalModel.map(m => {

            console.log("Dyanmica Model", m);

            let NodeId = m.SchemaId;
            let Label = m.SchemaType;
            let SchemaName = m.SchemaName;
            let SubMenu = m.SubMenu;

          

            let input = (<div> <h1>No Data</h1></div>);

            if (SubMenu.length != 0) {

                console.log("SubmenuData", SubMenu);
                let SubmenuMap = SubMenu.map(sm => {

                    return (<StyledTreeItem nodeId={sm.SchemaId} label={sm.SchemaType} labelIcon={ArrowRightIcon}
                        onClick={(e) => this.TreeItemFun(e, sm.SchemaName,sm.SchemaType)} />);


                });

                input = (<GridContainer lg={12}>
                    <GridItem>

                    <AddIcon onClick={this.handleSchemaAdd} />
                        </GridItem>

                    <GridItem>

                    <TreeView
                        // className={classes.root}
                        /*  Drop down Icons of Menu */

                        className={classes.root}
                        defaultExpanded={['3']}
                        defaultCollapseIcon={<ArrowDropDownIcon />}
                        defaultExpandIcon={<ArrowRightIcon />}
                        defaultEndIcon={<div style={{ width: 24 }} />}
                      //  onClick={(e) => this.TreeViewFun(e, Label)}
                    >

                            <StyledTreeItem nodeId={NodeId} label={Label} labelIcon={SupervisorAccountIcon} onClick={(e) => this.TreeViewFun(e, SchemaName, Label)} >

                            {SubmenuMap}

                        </StyledTreeItem>
                        
                    </TreeView>
                        </GridItem>

                    

                    
                </GridContainer>);

            }
            else {


                input = (<GridContainer lg={12}>
                    <GridItem>

                    <AddIcon onClick={this.handleSchemaAdd} />
                        </GridItem>
                    <GridItem>

                        <TreeView
                        // className={classes.root}
                        /*  Drop down Icons of Menu */

                        className={classes.root}
                        defaultExpanded={['3']}
                        defaultCollapseIcon={<ArrowDropDownIcon />}
                        defaultExpandIcon={<ArrowRightIcon />}
                        defaultEndIcon={<div style={{ width: 24 }} />}
                       // onClick={(e) => this.TreeViewFun(e, Label)}
                    >
                      


                            <StyledTreeItem nodeId={NodeId} label={Label} labelIcon={SupervisorAccountIcon} onClick={(e) => this.TreeViewFun(e,SchemaName,Label)}>

                        </StyledTreeItem>

                    </TreeView>

                        </GridItem>

                    
                </GridContainer>);

            }


            return (
                <div>

                    {/* Final Rendering Page Return  */}

                    {input}


                </div>
            );
        });
        return formUI;

    };


    render() {

        return (
                   
            <GridContainer lg={12}>

                <GridItem md={3}>
               
                    <Card>
                        <CardBody>
                       
                                {this.renderForm()}
                            
                                </CardBody>
                                </Card>
              
                        </GridItem>
               
                {this.state.PageFlag ?
                    <GridItem md={9}>

                        
                        {this.PAGECALL()}



                    </GridItem> : null
                }

                {     this.state.PSDPage ?
                            <PSDComponent
                        DataSent={this.state.DataSent}
                        DynamicModel={this.state.DynamicModel}
                        ObjAttribute={this.state.ObjAttribute}
                        TreeMaster={this.state.TreeMaster}
                        AttributeMaster={this.state.AttributeMaster}
                        FinalModel={this.props.FinalModel}
                        childcallbackPSDFunction={this.childcallbackPSDFunction}
          
        /> : null


                    
                }
              
          </GridContainer> 
           
        );
    }
}

export default withStyles(style)(DynamicTreeView);