import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Modal from "../UI/Modal";
import RenameSport from "./SportsForm";
import { Link } from "react-router-dom";
import Button from "../UI/Button";
import { sportsSelector } from "../store/sports/sportsSelectors";
import { membersSelector } from "../store/members/memberSelectors";
import { getMembersThunk } from "../store/members/memberThunk";
import Table from "../UI/Table";
import DeleteRow from "./DeleteRow";

const title = "Sports";
const headers = [
  "#",
  "Sports",
  "Number of members",
  "Sports page",
  "Rename sport",
  " Delete sport",
];

const SportsList = () => {
  const dispatch = useDispatch();
  const sportsList = useSelector(sportsSelector);
  const memberData = useSelector(membersSelector);
  const [renameModalOpen, setRenameModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [actionId, setActionId] = useState("");

  // needed to load in the members per sport on a page refresh
  useEffect(() => {
    dispatch(getMembersThunk());
  }, [dispatch]);

  const renameModalHandler = (id) => {
    setRenameModalOpen(true);
    setActionId(id);
  };

  const deleteModalHandler = (id) => {
    setActionId(id);
    setDeleteModalOpen(true);
  };

  let rows = sportsList?.map((sports, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{sports.name}</td>
      <td>
        {
          (memberData?.filter((member) =>
            member.sports.includes(`${sports.id}`)
          )).length
        }
      </td>
      <td>
        <Button onClick={() => renameModalHandler(sports.id)}>Rename</Button>
      </td>
      <td>
        <Link to={`/members?sport=${sports.id}`}>Navigate</Link>
      </td>
      <td>
        <Button onClick={() => deleteModalHandler(sports.id)}>Delete</Button>
      </td>
    </tr>
  ));

  return (
    <div>
      <Table title={title} headers={headers} rows={rows} />
      {renameModalOpen && (
        <Modal>
          <RenameSport id={actionId} />
          <Button onClick={() => setRenameModalOpen(false)}>Close</Button>
        </Modal>
      )}
      {deleteModalOpen && (
        <Modal>
          <DeleteRow id={actionId} text={" sport"} />
          <Button onClick={() => setDeleteModalOpen(false)}>Close</Button>
        </Modal>
      )}
    </div>
  );
};

export default SportsList;
