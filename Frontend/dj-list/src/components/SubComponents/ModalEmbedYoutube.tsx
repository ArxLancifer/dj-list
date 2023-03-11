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
        onHide={()=>dispatch(modalHide())}
        backdrop="static"
        keyboard={false}
        centered
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>{trackTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {youtubeLink ==="Not available" ? <h1>There is not link reference</h1>
            :
            <iframe src={youtubeLink + "?autoplay=1"} title={trackTitle} allow='autoplay' allowFullScreen></iframe>}
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          <Button onClick={()=>dispatch(modalHide())} variant="danger">Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ModalEmbedYoutube;