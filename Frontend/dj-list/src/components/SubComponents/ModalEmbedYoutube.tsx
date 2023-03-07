import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector , useDispatch} from 'react-redux';
import { RootState } from '../store/index';
import {modalShow, modalHide} from '../store/modalState';
import "../../App.css"
function ModalEmbedYoutube() {

    const modalState = useSelector((state:RootState)=>state.modalState.modalShow);
    const youtubeLink = useSelector((state:RootState)=>state.modalState.youtubeLink);
    const trackTitle = useSelector((state:RootState)=>state.modalState.trackTitle);
    const dispatch = useDispatch();

  return (
    <Container>

      <Modal
        show={modalState}
        onHide={()=>dispatch<any>(modalHide())}
        backdrop="static"
        keyboard={false}
        centered
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>{trackTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe src={youtubeLink} title={trackTitle}></iframe>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          <Button variant="danger">Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ModalEmbedYoutube;