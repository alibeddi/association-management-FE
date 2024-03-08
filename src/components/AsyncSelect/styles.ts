export const StyledAsyncPaginate = (customStyles: Record<string, any> = {}) => ({
  indicatorsContainer: () => ({ display: "none" }), 
  control: (provided: object) => ({
    ...provided,
    height: "100%",
    width: "100%",
    ...customStyles
  }) 
});