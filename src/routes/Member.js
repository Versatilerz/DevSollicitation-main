import { useParams } from "react-router-dom";
import Member from "../components/Member";
import { useState } from "react";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import MemberForm from "../components/MemberForm";

const MemberPage = () => {
  const params = useParams();
  const [modalOpen, setModalOpen] = useState(false);

  const modalHandler = () => {
    setModalOpen(true);
  };

  return (
    <>
      <div className="container vh-100">
        <Member memberId={params.memberId} />
        <div className="col-lg-7 col-12">
          <Button onClick={modalHandler}>Edit member</Button>
        </div>
      </div>

      {modalOpen && (
        <Modal>
          <MemberForm memberId={params.memberId} />
          <Button onClick={() => setModalOpen(false)}>Close</Button>
        </Modal>
      )}
    </>
  );
};
export default MemberPage;
