import React from 'react'
import { Modal } from 'react-bootstrap'
import CrazyLoader from './CrazyLoader'

const BCTransactionModal = ({isLoading, message}: {isLoading: boolean, message?: string}) => {

  return (
    <Modal show={isLoading} backdrop={"static"} className='modal-get-started'>
        <Modal.Body> <CrazyLoader scale='0.6' /><br />{
          message ? message :
          'Please wait while your transaction gets on Chain. This may take a couple of minutes.'
        }</Modal.Body>
      </Modal>
  )
}

export default BCTransactionModal