import { Modal, Button } from "flowbite-react";

export default function Success({ show: [showProp, setShowProp] }) {
  return (
    <Modal show={showProp} onClose={() => setShowProp(false)}>
      <Modal.Header>Success</Modal.Header>
      <Modal.Body>
        <p className="text-center">Data berhasil disimpan</p>
      </Modal.Body>
      <Modal.Footer className="flex justify-center">
        <Button color="blue" onClick={() => setShowProp(false)}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
