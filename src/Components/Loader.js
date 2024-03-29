import React from "react";
import ContentLoader from "react-content-loader";
const MyLoader = (props) => (
  <ContentLoader
    speed={1}
    width={1000}
    height={1000}
    viewBox="0 0 800 800"
    backgroundColor="#ff3f62"
    foregroundColor="#05cdf5"
    {...props}
    className="loader">
    <path d="M 95.998 418.909 H 76.22 c -25.706 0 -46.545 20.84 -46.545 46.545 C 29.674 491.16 50.514 512 76.22 512 H 331.053 c 83.413 0 151.273 -67.86 151.273 -151.273 c 0 -40.609 -16.088 -77.528 -42.22 -104.727 c 26.132 -27.2 42.22 -64.118 42.22 -104.727 C 482.326 67.86 414.466 0 331.053 0 H 76.22 C 50.514 0 29.674 20.84 29.674 46.545 S 50.514 93.09 76.219 93.09 h 19.779 V 418.909 z m 93.091 -325.818 h 141.964 c 32.082 0 58.182 26.1 58.182 58.182 s -26.1 58.182 -58.182 58.182 H 189.089 V 93.091 z m 0 209.454 h 141.964 c 32.082 0 58.182 26.1 58.182 58.182 s -26.1 58.182 -58.182 58.182 H 189.089 V 302.545 z" />
    <path d="M 189.089 418.909 V 302.545 H 256 v -93.091 h -66.911 V 93.091 H 256 V 0 H 76.22 C 50.514 0 29.674 20.84 29.674 46.545 S 50.514 93.09 76.219 93.09 h 19.779 V 418.909 H 76.22 c -25.706 0 -46.545 20.84 -46.545 46.545 C 29.674 491.16 50.514 512 76.22 512 H 256 v -93.091 h -66.911 z" />
  </ContentLoader>
);

export default MyLoader;
