import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

import { Spinner } from '@/components/Spinner'
import { TimeAgo } from '@/components/TimeAgo'

import { useGetPostsQuery, Post } from '@/features/api/apiSlice'

import { PostAuthor } from './PostAuthor'
import { ReactionButtons } from './ReactionButtons'

interface PostExcerptProps {
  post: Post
}

function PostExcerpt({ post }: PostExcerptProps) {
  return (
    <article className="border border-gray-300 rounded-md p-4">
      <h3 className="text-xl font-semibold mb-1">
        <Link to={`/posts/${post.id}`} className="text-blue-700 hover:underline">
          {post.title}
        </Link>
      </h3>
      <div className="text-sm text-gray-600 mb-2 flex flex-wrap gap-2">
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="text-base mb-3">{post.content.substring(0, 100)}</p>
      <ReactionButtons post={post} />
    </article>
  )
}

export const PostsList = () => {
  const { data: posts = [], isLoading, isFetching, isSuccess, isError, error } = useGetPostsQuery()

  const sortedPosts = useMemo(() => {
    const sorted = posts.slice()
    sorted.sort((a, b) => b.date.localeCompare(a.date))
    return sorted
  }, [posts])

  let content: React.ReactNode

  if (isLoading) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    const renderedPosts = sortedPosts.map((post) => <PostExcerpt key={post.id} post={post} />)

    const containerClassname = classnames('grid gap-4', {
      'opacity-50 pointer-events-none': isFetching,
    })

    content = <div className={containerClassname}>{renderedPosts}</div>
  } else if (isError) {
    content = <div className="text-red-600">{(error as Error).toString()}</div>
  }

  return (
    <section className="max-w-screen-lg mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-6">Posts</h2>
      {content}
    </section>
  )
}
