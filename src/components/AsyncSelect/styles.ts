export const StyledAsyncPaginate =  {
  indicatorsContainer: () => ({ display: "none" }), // Hides the indicators container
  control: (provided:any) => ({ ...provided, height: '100%' }), // Sets height of the control
}