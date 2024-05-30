import Stack from '@mui/material/Stack';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';





import { useGetPost } from 'src/api/blog';

import Markdown from 'src/components/markdown';


import PostDetailsHero from '../post-details-hero';
import { PostDetailsSkeleton } from '../post-skeleton';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function PostDetailsHomeView({ id }: Props) {
  const { post, postLoading } = useGetPost(id);


  const renderSkeleton = <PostDetailsSkeleton />;


  const renderPost = post && (
    <>
      <PostDetailsHero
        title={post.title}
        author={post.author}
        coverUrl={post.coverUrl}
        createdAt={post.createdAt}
      />

    

      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
          <Typography variant="subtitle1" sx={{ mb: 5 }}>
            {post.description}
          </Typography>

          <Markdown children={post.content} />

       
      



         
        </Stack>
      </Container>
    </>
  );



  return (
    <>
      {postLoading && renderSkeleton}


      {post && renderPost}

    
    </>
  );
}
