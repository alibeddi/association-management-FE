import React from "react";

export const StyledAsyncPaginate = (customStyles: React.CSSProperties = {}) => ({
  indicatorsContainer: () => ({ display: "none" }), 
  control: (provided: object) => ({
    ...provided,
    height: "100%",
    width: "100%",
    ...customStyles
  }) 
});