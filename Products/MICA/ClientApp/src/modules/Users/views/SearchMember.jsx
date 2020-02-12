import React from "react";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import SearchMemberDet from "./SearchMember/_SearchMemberDet.jsx";
import ViewMember from "./SearchMember/_SearchMemberView.jsx"


class SearchMember extends React.Component {
    render() {
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>

                        <SearchMemberDet />
                        <ViewMember />

                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}
export default SearchMember;