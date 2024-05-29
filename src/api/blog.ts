import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

import { IPostItem } from 'src/types/blog';

// ----------------------------------------------------------------------

export function useGetPosts() {
  const URL = endpoints.post.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      posts: (data?.docs as IPostItem[]) || [],
      postsLoading: isLoading,
      postsError: error,
      postsValidating: isValidating,
      postsEmpty: !isLoading && !data?.posts?.length,
    }),
    [data?.docs, error, isLoading, isValidating,data?.posts?.length]
  );

  return memoizedValue;
}


// ----------------------------------------------------------------------

export function useGetPost(postId: string) {
  const URL = `/api/v1/posts/${postId}`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
console.log(postId);

  const memoizedValue = useMemo(
    () => ({
      post: data?.data as IPostItem,
      postLoading: isLoading,
      postError: error,
      postValidating: isValidating,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetLatestPosts(title: string) {
  const URL = title ? [endpoints.post.latest, { params: { title } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      latestPosts: (data?.latestPosts as IPostItem[]) || [],
      latestPostsLoading: isLoading,
      latestPostsError: error,
      latestPostsValidating: isValidating,
      latestPostsEmpty: !isLoading && !data?.latestPosts.length,
    }),
    [data?.latestPosts, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useSearchPosts(query: string) {
  const URL = query ? [endpoints.post.search, { params: { query } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: (data?.results as IPostItem[]) || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !data?.results.length,
    }),
    [data?.results, error, isLoading, isValidating]
  );

  return memoizedValue;
}
