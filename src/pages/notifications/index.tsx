import { useNotification } from '@/contexts/NotificationContext'
import React from 'react'

const index = () => {
  const {notifications} = useNotification()
  return (
    <div className='notification-container'>
      <h2>Notifications</h2>
      <br />
      {notifications?.length < 1 ? <div>No Notifications</div> : 
            notifications?.map(notification => {
              return <>
                <div style={{color: "black"}} key={notification.id}>{notification.text}</div>
                <hr />
              </>
            })
          }
    </div>
  )
}

export default index