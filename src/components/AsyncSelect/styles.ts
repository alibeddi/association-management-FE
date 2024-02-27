export const StyledAsyncPaginate =  {
  indicatorsContainer: () => ({ display: "none" }), // Hides the indicators container
  control: (provided:object) => ({ ...provided, height: '100%' }), // Sets height of the control
}