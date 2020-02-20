import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";

import footerStyle from "assets/jss/material-dashboard-pro-react/components/footerStyle";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";

function Footer({ ...props }) {
    const { classes, fluid, white, rtlActive } = props;
    var container = cx({
        [classes.container]: !fluid,
        [classes.containerFluid]: fluid,
        [classes.whiteColor]: white
    });
    var anchor =
        classes.a +
        cx({
            [" " + classes.whiteColor]: white
        });
    var block = cx({
        [classes.block]: true,
        [classes.whiteColor]: white
    });
    return (
        <footer className={classes.footer}>
            <div className={container}>
                <div className={classes.left}>
                    <GridContainer>
                        <List className={classes.list}>
                            <ListItem className={classes.inlineBlock}>
                                <a href="#home" className={block}>
                                    {rtlActive ? "الصفحة الرئيسية" : "Key Benefits"}
                                </a>
                            </ListItem>
                            <ListItem className={classes.inlineBlock}>
                                <a href="#company" className={block}>
                                    {rtlActive ? "شركة" : "Document Downloads"}
                                </a>
                            </ListItem>
                            <ListItem className={classes.inlineBlock}>
                                <a href="#portfolio" className={block}>
                                    {rtlActive ? "بعدسة" : "Why Edelweiss General Insurance"}
                                </a>
                            </ListItem>
                            <ListItem className={classes.inlineBlock}>
                                <a href="#blog" className={block}>
                                    {rtlActive ? "مدونة" : "Claims Process"}
                                </a>
                            </ListItem>
                            <ListItem className={classes.inlineBlock}>
                                <a href="#blog" className={block}>
                                    {rtlActive ? "مدونة" : "FAQ’s"}
                                </a>
                            </ListItem>
                        </List>
                    </GridContainer>
                </div>
                <p style={{ color: "white" }} className={classes.right}>
                    &copy; {1900 + new Date().getYear()}{" "}
                    {/* <a href="https://www.inubesolutions.com" className={anchor}>*/}
                    {rtlActive ? "توقيت الإبداعية" : "iNube Software Solutions"}
                    {/*    </a>*/}
                    {rtlActive
                        ? ", مصنوعة مع الحب لشبكة الإنترنت أفضل"
                        : " "}
                </p>
                {/*  <p className={classes.right}>
                    <div>
                        l
                        </div>
                    <label>@  {1900 + new Date().getYear()}{"   "} </label> {rtlActive ? "توقيت الإبداعية" : <label></label>}
                </p>
                <p className={classes.right}>
          &copy; {1900 + new Date().getYear()}{" "}
          <a href="https://www.inubesolutions.com" className={anchor}>
                          {rtlActive ? "توقيت الإبداعية" : "iNube Software Solutions"}
          </a>
          {rtlActive
            ? ", مصنوعة مع الحب لشبكة الإنترنت أفضل"
            : " "}
        </p>*/}
            </div>
        </footer>
    );
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
    fluid: PropTypes.bool,
    white: PropTypes.bool,
    rtlActive: PropTypes.bool
};

export default withStyles(footerStyle)(Footer);
