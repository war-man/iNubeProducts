import React from "react";

import RuleConfig from "./RuleConfig/RuleConfig.jsx";
import RuleCondition from "./RuleCondition/RuleCondition.jsx";


class Rules extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <RuleConfig />
                <RuleCondition />
            </div>
        );
    }
}

export default Rules;