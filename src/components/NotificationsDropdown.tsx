import { useNotification } from "@/contexts/NotificationContext"
import { use } from "react"
import { Dropdown } from "react-bootstrap"
import { BsBellFill } from "react-icons/bs"

const NotificationsDropdown = () => {
  const {notifications} = useNotification()
  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="transparent" id="dropdown-basic">
          <BsBellFill />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {notifications?.length < 1 ? <Dropdown.Item disabled>No Notifications</Dropdown.Item> : 
            notifications?.map(notification => {
              return <>
                <Dropdown.Item style={{color: "black"}} disabled key={notification.id}>{notification.text}</Dropdown.Item>
                <hr />
              </>
            })
          }
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export default NotificationsDropdown