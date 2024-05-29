import { Helmet } from 'react-helmet-async';
import { PostListView } from 'src/sections/blog/view';
// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Four</title>
      </Helmet>

      <PostListView />
    </>
  );
}
