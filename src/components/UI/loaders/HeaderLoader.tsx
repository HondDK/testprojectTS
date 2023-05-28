import React from "react";
import ContentLoader from "react-content-loader";

const HeaderLoader = (props) => (
    <ContentLoader height="" width="100%" viewBox="0 0 370 50" {...props}>
        <rect x="15" y="15" rx="4" ry="4" width="350" height="25" />
    </ContentLoader>
);

export default HeaderLoader;