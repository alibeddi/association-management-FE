import React from 'react';
import "./_index.scss";

export const ErrorMessageCustom = ({ error }: { error: string }) => (
  <span className='error_message_custom'>{error}</span>
);

