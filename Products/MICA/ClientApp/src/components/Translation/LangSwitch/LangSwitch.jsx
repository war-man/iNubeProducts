import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { LANG_NAMES } from 'components/Translation/constants/translations';
import Dropdown from "components/Dropdown/Dropdown.jsx";

export default class LangSwitch extends Component {

    constructor(props) {
        super(props)
        this.state = {
            language:"en_US",
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

    OnLocaleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        this.props.setLanguage(event.target.value);
        localStorage.setItem('locale', event.target.value);
    }
    render() {
        return (
            <div className="lang" style={{ padding: 20, textAlign: 'left',width:'127px' }} >
                <Dropdown
                    //required={true}
                    //labelText="MasterType"
                    lstObject={LANG_NAMES}
                    value={this.state.language}
                    name='language'
                    onChange={this.OnLocaleChange}
                    formControlProps={{ fullWidth: true }}
                />
                {/*<select id='txt2' onChange={this.OnLocaleChange}>
                    {LANG_NAMES.map((language, i) =>
                        <option value={language.locale} >{language.name}</option>
                    )}
                </select>*/}

            </div>

        );
    }
}

LangSwitch.propTypes = {
    locale: PropTypes.string.isRequired,
    setLanguage: PropTypes.func,
};
