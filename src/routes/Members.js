import { useEffect, useState } from "react";
import MembersList from "../components/MembersList";
import Modal from "../UI/Modal";
import MemberForm from "../components/MemberForm";
import Button from "../UI/Button";
import { useDispatch } from "react-redux";
import { getMembersThunk } from "../store/members/memberThunk";
import { getSportsThunk } from "../store/sports/sportsThunk";

const MembersPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMembersThunk());
    dispatch(getSportsThunk());
  });

  const modalHandler = () => {
    setModalOpen(true);
  };

  return (
    <>
      <div className="container vh-100">
        <div className="row h-75">
          <div className="col-lg-7 col-12 d-flex flex-column justify-content-center">
            <MembersList />
            <Button onClick={modalHandler}>Add a member</Button>
          </div>
        </div>
      </div>
      {modalOpen && (
        <Modal>
          <MemberForm />
          <Button onClick={() => setModalOpen(false)}>Close</Button>
        </Modal>
      )}
    </>
  );
};
export default MembersPage;
