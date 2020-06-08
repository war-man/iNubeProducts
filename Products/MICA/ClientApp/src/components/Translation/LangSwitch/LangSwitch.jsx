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
import ColorLensIcon from '@material-ui/icons/ColorLens';
import ThemeSwitch from 'assets/jss/ThemeSwitch.jsx';
import {
    PeytoTheme, AlaskaTheme,
    OceanicTheme, RagaTheme,
    AvianTheme, changeTheme6,
} from "assets/jss/material-dashboard-pro-react.jsx";
import { withStyles } from '@material-ui/styles';

const styleButton = withStyles({
    root: {
        color: localStorage.getItem('primaryColor')
    }
})(IconButton);

export default class LangSwitch extends Component {

    constructor(props) {
        super(props)
        this.state = {
            language: "en_US",
            anchorEl: "",
            selectedIndex: 1,
            opendialogue: false,
            opentheme: false,
            themee1: "",
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

    TheamChangeFun = () => {
        let data = ThemeSwitch.changeTheme();
        this.setState({});
    }

    handleMenu = (event) => {
        this.setState({ anchorEl: event.currentTarget, opendialogue: true });
    };

    handleTheme = (event) => {
        this.setState({ themee1: event.currentTarget, opentheme: true });
    };

    handleThemeclose = (event) => {
        this.setState({ opentheme: false });
    };

    handleClose = (lang) => {
        console.log("language", lang);
        this.setState({ language: lang });
        this.props.setLanguage(lang);
        localStorage.setItem('locale', lang);
        this.setState({ opendialogue: false });
    };

    OnLocaleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        this.props.setLanguage(event.target.value);
        localStorage.setItem('locale', event.target.value);
    }

    handlelangClose = () => {
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
                {/* */}<IconButton
                    variant="outlined"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    id="Language"
                    onClick={this.handleMenu}
                    color="primary"
                //style={{ top: "-11px" }}
                >
                    <GTranslateIcon />
                </IconButton>
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
                    onClose={this.handlelangClose}
                >
                    {LANG_NAMES.map((language, i) => {
                        return (
                            <div>
                                <MenuItem onClick={() => this.handleClose(language.locale)}>{language.name}</MenuItem>
                            </div>
                        );
                    }
                    )}
                </Menu>

                {/*  <div className="lang" style={{ padding: 12, textAlign: 'left', right: '3rem', position: 'relative', width: '110px' }}>
                        <GTranslateIcon />*/}
                {/* <Dropdown
                        //required={true}
                        //labelText={}
                        lstObject={LANG_NAMES}
                        value={this.state.language}
                        name='language'
                        onChange={this.OnLocaleChange}
                        formControlProps={{ fullWidth: true }}
                    />
                     <select id='txt2' onChange={this.OnLocaleChange}>
                    {LANG_NAMES.map((language, i) =>
                        <option value={language.locale} >{language.name}</option>
                    )}
                </select>

                </div >
                </ div>
                <div>*/}
                &nbsp;
                <IconButton
                    variant="outlined"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    id="themes"
                    onClick={this.handleTheme}
                    color="primary"
                //style={{ top: "-11px" }}
                >
                    <ColorLensIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={this.state.themee1}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={this.state.opentheme}
                    onClose={this.handleThemeclose}
                >
                    <MenuItem onClick={() => ThemeSwitch.DefaultTheme()}>Default Theme</MenuItem>
                    <MenuItem onClick={PeytoTheme}>Peyto Theme</MenuItem>
                    <MenuItem onClick={AlaskaTheme}>Alaska Theme</MenuItem>
                    <MenuItem onClick={OceanicTheme}>Oceanic Theme</MenuItem>
                    <MenuItem onClick={RagaTheme}>Raga Theme</MenuItem>
                    <MenuItem onClick={AvianTheme}>Avian Theme</MenuItem>
                    {/*<MenuItem onClick={changeTheme6}></MenuItem>*/}
                </Menu>
            </div>
        );
    }
}

LangSwitch.propTypes = {
    locale: PropTypes.string.isRequired,
    setLanguage: PropTypes.func,
};