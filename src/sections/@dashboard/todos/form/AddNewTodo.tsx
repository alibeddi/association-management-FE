import { yupResolver } from '@hookform/resolvers/yup';
import React, { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import FormProvider from '../../../../components/hook-form';
import * as Yup from 'yup';
import { MentionsInput, Mention } from 'react-mentions';
type FormValues = {
  todo: string;
};

export default function AddNewTodo() {
  const NewTodoSchema = Yup.object().shape({
    todo: Yup.string().required('task description is required'),
  });
  const [mentions, setMentions] = useState([]);
  const defaultValues = useMemo(
    () => ({
      todo: '',
    }),
    []
  );
  const methods = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(NewTodoSchema),
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
    control,
  } = methods;

  const onSubmit = async (data: FormValues) => {
    try {
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="todo"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <MentionsInput
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            placeholder="Type a message..."
            style={{ width: '100%', height: 100 }}
            allowSuggestionsAboveCursor
            inputRef={(input) => {
              field.ref(input);
            }}
            markup="@[__display__](__type__:__id__)"
            displayTransform={(id, display) => `@${display}`}
            suggestions={[]}
            onAdd={(id, display) => {
              setMentions([...mentions, { id, display }]);
            }}
            onBlur={() => {
              field.onBlur(mentions);
            }}
          >
            <Mention
              trigger="@"
              data={[]}
              renderSuggestion={(suggestion, search, highlightedDisplay) => (
                <div className="user">{highlightedDisplay}</div>
              )}
              onAdd={(id, display) => {
                setMentions([...mentions, { id, display }]);
              }}
            />
          </MentionsInput>
        )}
      />
    </FormProvider>
  );
}
