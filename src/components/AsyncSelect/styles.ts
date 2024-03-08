export const StyledAsyncPaginate = (customStyles: Record<string, any> = {}) => ({
  indicatorsContainer: () => ({ display: "none" }), // Hides the indicators container
  control: (provided: object) => ({
    ...provided,
    height: "100%",
    width: "100%",
    ...customStyles
  }) // Sets height and width of the control
});