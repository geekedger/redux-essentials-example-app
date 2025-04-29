import { useAddReactionMutation } from '@/features/api/apiSlice'
import type { Post, ReactionName } from './postsSlice'

const reactionEmoji: Record<ReactionName, string> = {
  thumbsUp: '👍',
  tada: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
}

interface ReactionButtonsProps {
  post: Post
}

export const ReactionButtons = ({ post }: ReactionButtonsProps) => {
  const [addReaction] = useAddReactionMutation()

  const reactionButtons = Object.entries(reactionEmoji).map(([stringName, emoji]) => {
    const reaction = stringName as ReactionName

    return (
      <button
        key={reaction}
        type="button"
        className="border border-gray-300 px-2 py-1 mr-2 mb-2 rounded text-sm whitespace-nowrap hover:bg-gray-100 transition"
        onClick={() => {
          addReaction({ postId: post.id, reaction })
        }}
      >
        {emoji} {post.reactions[reaction]}
      </button>
    )
  })

  return <div className="flex flex-wrap">{reactionButtons}</div>
}
