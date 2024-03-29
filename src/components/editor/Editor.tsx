import '../../utils/highlight';
import ReactQuill from 'react-quill';
import 'quill-mention';
//
import { EditorProps } from './types';
import { StyledEditor } from './styles';
import EditorToolbar, { formats } from './EditorToolbar';
import { dispatch } from '../../redux/store';
import { getOfficesAndUsers } from '../../redux/slices/todos/actions';
import { Office } from '../../@types/offices';
import { User } from '../../@types/User';
import { isUser } from '../../sections/@dashboard/todos/utils/isUser';

// ----------------------------------------------------------------------

const mentionModule = {
  allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
  mentionDenotationChars: ['@'],
  source(searchTerm: string, renderList: (arg0: any) => void) {
    dispatch(getOfficesAndUsers({ page: 1, limit: 10, search: searchTerm }))
      .unwrap()
      .then((res) => {
        const { offices, users } = res.data;
        const docs = [...offices, ...users];
        renderList(
          docs.map((doc: User | Office) => ({
            id: doc._id,
            value: isUser(doc) ? doc.username || doc.email : doc.name,
          }))
        );
      })
      .catch((err) => console.log(err));
  },
};

export default function Editor({
  id = 'minimal-quill',
  error,
  value,
  onChange,
  simple = false,
  helperText,
  sx,
  ...other
}: EditorProps) {
  const modules = {
    mention: mentionModule,
    toolbar: {
      container: `#${id}`,
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true,
    },
    syntax: true,
    clipboard: {
      matchVisual: false,
    },
  };

  return (
    <>
      <StyledEditor
        sx={{
          ...(error && {
            border: (theme) => `solid 1px ${theme.palette.error.main}`,
          }),
          ...sx,
        }}
      >
        <EditorToolbar id={id} isSimple={simple} />

        <ReactQuill
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder="Write something awesome..."
          {...other}
        />
      </StyledEditor>

      {helperText && helperText}
    </>
  );
}
