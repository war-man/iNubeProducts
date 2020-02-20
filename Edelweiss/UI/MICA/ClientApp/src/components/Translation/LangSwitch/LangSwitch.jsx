import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { LANG_NAMES } from 'components/Translation/constants/translations';
import Dropdown from "components/Dropdown/Dropdown.jsx";
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from "@material-ui/core/MenuItem";
import GTranslateIcon from '@material-ui/icons/GTranslate';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from "components/CustomButtons/Button.jsx";
import MUIButton from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default class LangSwitch extends Component {

    constructor(props) {
        super(props)
        this.state = {
            language: "en_US",
            anchorEl: "",
            selectedIndex: 1,
            opendialogue: false,
            open: false,
        };
        this.OnLocaleChange = this.OnLocaleChange.bind(this);
    }

    componentDidMount() {
        var locale = localStorage.getItem('locale');
        //localStorage.setItem('locale', event.target.value);
        if (locale != null) {
            this.setState({ language: locale });
            this.props.setLanguage(locale);
        }
    }

    handleMenu = (event) => {
        this.setState({ anchorEl: event.currentTarget, opendialogue: true });
    };

    //handleClose = (lang) => {
    //    console.log("language", lang);
    //    this.setState({ language: lang });
    //    this.props.setLanguage(lang);
    //    localStorage.setItem('locale', lang);
    //    this.setState({ opendialogue: false });
    //};

    OnLocaleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        this.props.setLanguage(event.target.value);
        localStorage.setItem('locale', event.target.value);
    }

    handleClose = () => {
        this.setState({ opendialogue: false });
    }

    handleClickListItem = () => {
        this.setState({ opendialogue: true });
    }

    handleMenuItemClick = (event, index) => {
        this.setState({ opendialogue: false });
    }

    render() {
        return (
            <div>
                {/* <MUIButton
                    variant="outlined" 
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="primary"
                    //style={{ top: "-11px" }}
                >
                    <GTranslateIcon /><label>{this.state.language}</label>
                </MUIButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={this.state.anchorEl}
                    //anchorOrigin={{
                    //    vertical: 'top',
                    //    horizontal: 'right',
                    //}}
                    keepMounted
                    //transformOrigin={{
                    //    vertical: 'top',
                    //    horizontal: 'right',
                    //}}
                    open={this.state.opendialogue}
                    onClose={this.handleClose}
                >
                    {LANG_NAMES.map((language, i) => {
                        return (
                            <div>
                                <MenuItem onClick={() => this.handleClose(language.locale)}>{language.locale}</MenuItem>
                            </div>
                        );
                    }
                    )}
                </Menu>*/}
                <div className="lang" style={{ padding: 20, textAlign: 'left', width: '127px' }}>
                    {/*     <GTranslateIcon />*/}
                    <Dropdown
                        //required={true}
                        //labelText={}
                        lstObject={LANG_NAMES}
                        value={this.state.language}
                        name='language'
                        onChange={this.OnLocaleChange}
                        formControlProps={{ fullWidth: true }}
                    />
                    {/*  <select id='txt2' onChange={this.OnLocaleChange}>
                    {LANG_NAMES.map((language, i) =>
                        <option value={language.locale} >{language.name}</option>
                    )}
                </select>*/}

                </div >
            </ div>
        );
    }
}

LangSwitch.propTypes = {
    locale: PropTypes.string.isRequired,
    setLanguage: PropTypes.func,
};
