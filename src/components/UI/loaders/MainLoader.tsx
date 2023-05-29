import React from "react";
import ContentLoader from "react-content-loader";

const MainLoader = (props: object) => {
  return (
    <ContentLoader height="100%" width="100%" viewBox="0 0 370 300" {...props}>
      <rect x="15" y="10" rx="2" ry="2" width="350" height="100%" />
    </ContentLoader>
  );
};

export default MainLoader;
