import SportsList from "../components/SportsList";
import { useEffect, useState } from "react";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import { getSportsThunk } from "../store/sports/sportsThunk";
import { useDispatch } from "react-redux";
import SportsForm from "../components/SportsForm";

const SportsPage = () => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const modalHandler = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    dispatch(getSportsThunk());
  });

  return (
    <>
      <div className="container vh-100">
        <div className="row h-75">
          <div className="col-lg-7 col-12 d-flex flex-column justify-content-center">
            <SportsList />
            <Button onClick={modalHandler}>Add a sport</Button>
          </div>
        </div>
      </div>
      {modalOpen && (
        <Modal>
          <SportsForm />
          <Button onClick={() => setModalOpen(false)}>Close</Button>
        </Modal>
      )}
    </>
  );
};

export default SportsPage;
