import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Delete from "@material-ui/icons/Delete";
// @material-ui/icons
import ExpandMore from "@material-ui/icons/ExpandMore";
import Button from "components/CustomButtons/Button.jsx";
import accordionStyle from "assets/jss/material-dashboard-pro-react/components/accordionStyle.jsx";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";

const useStyles = withStyles(theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '33.33%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(1, 2),
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
}));

class Accordion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: props.active,
            setColor: "",

        };
        console.log("According Data", props)
    }
    handleChange = panel => (event, expanded) => {
        this.setState({
            active: expanded ? panel : -1
        });

        console.log("Active", this.state.active);
        if (this.state.active == -1) {
            this.state.setColor = "#fff";
        }
        else {
            this.state.setColor = "#fff";
        }

    };
    render() {
        const { classes, collapses } = this.props;
        return (
            <div className={classes.root}>
                {collapses.map((prop, key) => {
                    return (
                        <ExpansionPanel id={(this.state.active === key ? "exandabel-shadow" : "")}
                            expanded={this.state.active === key}
                            onChange={this.handleChange(key)}
                            key={key}
                            classes={{
                                root: classes.expansionPanel,
                                expanded: classes.expansionPanelExpanded
                            }}
                        >
                            <ExpansionPanelSummary
                                expandIcon={<div><ExpandMore /></div>}
                                //  expandIcon={<Delete/>}
                                Icon={<Delete />}
                                aria-controls="panel1c-content"
                                id={this.state.setColor}
                                classes={{
                                    root: classes.expansionPanelSummary,
                                    expanded: classes.expansionPanelSummaryExpaned,
                                    content: classes.expansionPanelSummaryContent,
                                    expandIcon: classes.expansionPanelSummaryExpandIcon
                                }}
                            >


                                <GridContainer lg={10} xs={10}>
                                    
                                    <GridItem xs={3} >
                                        <h4 id="acordian-title" className={classes.title}><TranslationContainer translationKey={prop.title}/></h4>
                                        <h4 id="acordian-value" className={classes.title}>{prop.value}</h4>
                                    </GridItem>
                                    <GridItem xs={3}>

                                        <h4 id="acordian-title" className={classes.title}><TranslationContainer translationKey={prop.title1} /></h4>
                                        <h4 id="acordian-value" className={classes.title}>{prop.value1}</h4>
                                    </GridItem>
                                    <GridItem xs={3}>
                                        <h4 id="acordian-title" className={classes.title}><TranslationContainer translationKey={prop.title2} /></h4>
                                        <h4 id="acordian-value" className={classes.title}>{prop.value2}</h4>
                                    </GridItem>
                                    {prop.view && ((collapses.length-1)==key)&& <GridItem xs={1}>
                                        <Button justIcon round simple color="danger" className="remove" onClick={(e) => prop.deleteAccordion(e, key, prop.Iindex)} ><Delete /> </Button >
                                    </GridItem>
                                    }
                                </GridContainer>
                             
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                                {prop.content}
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    );
                })}
            </div>
        );
    }
}

Accordion.defaultProps = {
    active: -1
};

Accordion.propTypes = {
    classes: PropTypes.object.isRequired,
    // index of the default active collapse
    active: PropTypes.number,
    collapses: PropTypes.arrayOf(
        PropTypes.shape({
            title1: PropTypes.string,
            title: PropTypes.string,
            content: PropTypes.node
        })
    ).isRequired
};

export default withStyles(accordionStyle)(Accordion);
