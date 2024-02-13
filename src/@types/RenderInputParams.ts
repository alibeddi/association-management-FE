export interface RenderInputParams {
  ref: React.Ref<HTMLInputElement>;
  inputProps: Record<string, unknown>;
  InputLabelProps: Record<string, unknown>;
  InputProps: Record<string, unknown>;
  hidden: boolean;
}
