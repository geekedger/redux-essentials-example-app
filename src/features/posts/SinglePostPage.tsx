// src/features/posts/SinglePostPage.tsx
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';

import { TimeAgo } from '@/components/TimeAgo';
import { Spinner } from '@/components/Spinner';

import { useGetPostQuery } from '@/features/api/apiSlice';
import { selectCurrentUsername } from '@/features/auth/authSlice';

import { PostAuthor } from './PostAuthor';
import { ReactionButtons } from './ReactionButtons';

export const SinglePostPage = () => {
  const { postId } = useParams();

  const { data: post, isFetching, isSuccess } = useGetPostQuery(postId!);
  const currentUsername = useAppSelector(selectCurrentUsername)!;

  let content: React.ReactNode;

  const canEdit = currentUsername === post?.user;

  if (isFetching) {
    content = <Spinner text="Loading..." />;
  } else if (isSuccess) {
    content = (
      <article>
        <h2 className="text-[2.5rem] mb-1">{post.title}</h2>
        <div>
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} />
        </div>
        <p className="mt-2.5">{post.content}</p>
        <ReactionButtons post={post} />
        {canEdit && (
          <Link
            to={`/editPost/${post.id}`}
            className="inline-block bg-button text-white rounded-sm font-bold px-2xl py-lg"
          >
            Edit Post
          </Link>
        )}
      </article>
    );
  }

  return <section className="mx-auto max-w-[1024px] px-2xl">{content}</section>;
};