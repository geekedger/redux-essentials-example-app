import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/app/hooks'
import { TimeAgo } from '@/components/TimeAgo'
// import { fetchPosts, Post, selectAllPosts, selectPostsError, selectPostsStatus } from './postsSlice'
import { Spinner } from '@/components/Spinner'
import { ReactionButtons } from './ReactionButtons'
import {
  fetchPosts,
  selectPostById,
  selectPostIds,
  selectPostsStatus,
  selectPostsError
} from './postsSlice'
import { useSelector } from 'react-redux'


interface PostExcerptProps {
  postId: string
}

// let PostExcerpt = ({ post }: PostExcerptProps) => {
//   return (
//     <article className="post-excerpt" key={post.id}>
//       <h3>
//         <Link to={`/posts/${post.id}`}>{post.title}</Link>
//       </h3>
//       <div>
//         <PostAuthor userId={post.user} />
//         <TimeAgo timestamp={post.date} />
//       </div>
//       <p className="post-content">{post.content.substring(0, 100)}</p>
//       <ReactionButtons post={post} />
//     </article>
//   )
// }

// PostExcerpt = React.memo(PostExcerpt)

function PostExcerpt({ postId }: PostExcerptProps) {
  const post = useAppSelector(state => selectPostById(state, postId))
  return (
    <article className="post-excerpt" key={post.id}>
      <h3>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <ReactionButtons post={post} />
    </article>
  )
}

// let PostExcerpt = React.memo(({ post }: PostExcerptProps): JSX.Element => {
//   return (
//     <article className="post-excerpt" key={post.id}>
//       <h3>
//         <Link to={`/posts/${post.id}`}>{post.title}</Link>
//       </h3>
//       <div>
//         <PostAuthor userId={post.user} />
//         <TimeAgo timestamp={post.date} />
//       </div>
//       <p className="post-content">{post.content.substring(0, 100)}</p>
//       <ReactionButtons post={post} />
//     </article>
//   )
// })

// function PostExcerpt({ post }: PostExcerptProps) {
//   return (
//     <article className="post-excerpt" key={post.id}>
//       <h3>
//         <Link to={`/posts/${post.id}`}>{post.title}</Link>
//       </h3>
//       <div>
//         <PostAuthor userId={post.user} />
//         <TimeAgo timestamp={post.date} />
//       </div>
//       <p className="post-content">{post.content.substring(0, 100)}</p>
//       <ReactionButtons post={post} />
//     </article>
//   )
// }
export const PostsList = () => {
  // Select the `state.posts` value from the store into the component
  const dispatch = useAppDispatch()
  // const posts = useAppSelector(selectAllPosts)
  const postStatus = useAppSelector(selectPostsStatus)
  const postsError = useAppSelector(selectPostsError)
  const orderedPostIds = useSelector(selectPostIds)


  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  
  let content: React.ReactNode

  if (postStatus === 'pending') {
    content = <Spinner text="Loading..." />
  } else if (postStatus === 'succeeded') {
    // Sort posts in reverse chronological order by datetime string
    content = orderedPostIds.map(postId => (
      <PostExcerpt key={postId} postId={postId} />
    ))
  } else if (postStatus === 'rejected') {
    content = <div>{postsError}</div>
  }

  // const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
  // const renderedPosts = orderedPosts.map(post => (
  //   <article className="post-excerpt" key={post.id}>
  //     <h3>
  //     <Link to={`/posts/${post.id}`}>{post.title}</Link>
  //     </h3>
  //     <p className="post-content">{post.content.substring(0, 100)}</p>
  //     <PostAuthor userId={post.user} />
  //   </article>
  // ))
  
  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}