import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import "./_DynamicCSS.scss";


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

class ToolBar extends React.Component {

    state = {};
    constructor(props) {
        super(props);
    }

    render() {

        return (<div id="icons">
                <i class="material-icons" id="color">color_lens</i>
                <i class="material-icons" id="pin">vertical_align_top</i>
                <i class="material-icons" id="invert">invert_colors</i>
                <i class="material-icons" id="font">font_download</i>
                <i class="material-icons" id="font">font_download</i>
                <i class="material-icons" id="font">font_download</i>
              </div>
        );
    }
}

export default withStyles(style)(ToolBar);