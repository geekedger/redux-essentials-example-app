
import { useAppDispatch, useAppSelector } from '@/app/hooks'

import { logout } from '@/features/auth/authSlice'
import {
  fetchNotificationsWebsocket,
  selectUnreadNotificationsCount,
  useGetNotificationsQuery,
} from '@/features/notifications/notificationsSlice'
import { selectCurrentUser } from '@/features/users/usersSlice'

import { UserIcon } from './UserIcon'
import NavLink from './NavLink'
import SmallButton from './SmallButton'

export const Navbar = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectCurrentUser)

  // Trigger initial fetch of notifications and keep the websocket open to receive updates
  useGetNotificationsQuery()

  const numUnreadNotifications = useAppSelector(selectUnreadNotificationsCount)

  const isLoggedIn = !!user

  let navContent: React.ReactNode = null

  if (isLoggedIn) {
    const onLogoutClicked = () => {
      dispatch(logout())
    }

    const fetchNewNotifications = () => {
      dispatch(fetchNotificationsWebsocket())
    }

    let unreadNotificationsBadge: React.ReactNode | undefined

    if (numUnreadNotifications > 0) {
      unreadNotificationsBadge = <span className="badge inline-block px-sm py-1 text-badge font-bold leading-tight text-center whitespace-nowrap align-baseline rounded-badge bg-background ml-3xl relative">{numUnreadNotifications}</span>
    }

    navContent = (
      <div className="navContent flex flex-wrap justify-between">
        <div className="navLinks flex ">
          <NavLink to="/posts"className="first:-ml-3xl">Posts</NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/notifications">Notifications {unreadNotificationsBadge}</NavLink>
          <SmallButton  onClick={fetchNewNotifications}>
            Refresh Notifications
          </SmallButton>
        </div>
        <div className="userDetails flex items-center">
          <UserIcon size={32} />
          {user.name}
          <SmallButton onClick={onLogoutClicked}>
            Log Out-
          </SmallButton>
        </div>
      </div>
    )
  }

  return (
    <nav className="flex p-0 bg-redux">
      <section className="w-full text-white">
        <h1 className="my-md">Redux Essentials Example</h1>
        {navContent}
      </section>
    </nav>
  )
}