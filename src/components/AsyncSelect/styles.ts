

export const StyledAsyncPaginate = (cssStyle: Record<string, any> = {}) => ({
  indicatorsContainer: () => ({ display: "none"}), // Hides the indicators container
  control: (provided: object) => ({
    ...provided,
    height: '100%',width:'100%',
    ...cssStyle 
  }) // Sets height and width of the control
});
