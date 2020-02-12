import React from "react";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import { TRANSLATIONS } from 'components/Translation/constants/translations';
import stringInject from 'stringinject';




const CommonMessage = (key, keyArray) => {
    console.log("data coming in key", key, keyArray)
    //var keyArray = ['Ashish', 'Gopi', 'Nadira'];
    var textmessage = <TranslationContainer translationKey={key} />;
    console.log("Textmsg", textmessage);
    var locale = localStorage.getItem('locale');
    var chk = TRANSLATIONS[locale][key];
    console.log("textmessage", chk);
    var string = stringInject(chk, keyArray);
    return string;
}

export default CommonMessage;
