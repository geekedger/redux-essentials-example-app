import { useLayoutEffect } from 'react'
import classnames from 'classnames'
import { useAppDispatch, useAppSelector } from '@/app/hooks'

import { TimeAgo } from '@/components/TimeAgo'

import { PostAuthor } from '@/features/posts/PostAuthor'

import { allNotificationsRead, useGetNotificationsQuery, selectMetadataEntities } from './notificationsSlice'

export const NotificationsList = () => {
  const dispatch = useAppDispatch()
  const { data: notifications = [] } = useGetNotificationsQuery()
  const notificationsMetadata = useAppSelector(selectMetadataEntities)

  useLayoutEffect(() => {
    dispatch(allNotificationsRead())
  })

  const renderedNotifications = notifications.map((notification) => {
    const metadata = notificationsMetadata[notification.id]

    const notificationClassname = classnames(
      'border border-gray-200 p-3 text-sm',
      {
        'bg-blue-50': metadata.isNew,
        'bg-white': !metadata.isNew
      }
    )

    return (
      <div key={notification.id} className={notificationClassname}>
        <div className="mb-1">
          <b className="font-semibold">
            <PostAuthor userId={notification.user} showPrefix={false} />
          </b>{' '}
          {notification.message}
        </div>
        <TimeAgo timestamp={notification.date} />
      </div>
    )
  })

  return (
    <section className="max-w-screen-lg mx-auto px-6 py-4">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>
      <div className="space-y-2">{renderedNotifications}</div>
    </section>
  )
}