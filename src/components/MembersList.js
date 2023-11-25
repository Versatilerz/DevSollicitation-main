import { useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Button from "../UI/Button";
import { useState } from "react";
import Modal from "../UI/Modal";
import DeleteMember from "./DeleteRow";
import {
  membersError,
  membersSelector,
} from "../store/members/memberSelectors";
import { sportsSelector } from "../store/sports/sportsSelectors";
import Table from "../UI/Table";

const headers = [
  "#",
  "First Name",
  "Last Name",
  "Number of sports",
  "Member page",
  "Delete member",
];

const MembersListTable = () => {
  const navigate = useNavigate();
  const error = useSelector(membersError);
  const memberList = useSelector(membersSelector);
  const sportsList = useSelector(sportsSelector);
  const [searchParams] = useSearchParams();
  const sportsPage = searchParams.get("sport") > 0;
  const sport = searchParams.get("sport");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [actionId, setActionId] = useState("");

  //membersFilteredBySport
  const filteredMembers = memberList.filter((member) =>
    member.sports.includes(sport)
  );

  if (error) {
    navigate("/error");
  }

  //show either the memberpage, or the memberpage for 1 sport only
  const sportname = sportsList?.find((element) => element.id === sport);
  let content = [];
  let title = "";
  if (!sportsPage) {
    content = memberList;
    title = "Members";
  }
  if (sport) {
    content = filteredMembers;
    title = `${sportname?.name} members`;
  }

  // content per row, cells
  let rows = content?.map((member, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{member.name.firstName}</td>
      <td>{member.name.lastName}</td>
      <td>{member.sports.length}</td>
      <td>
        <Link to={`/members/${member.id}`}>Navigate</Link>
      </td>
      <td>
        <Button onClick={() => deleteModalHandler(member.id)}>Delete</Button>
      </td>
    </tr>
  ));

  //delete member
  const deleteModalHandler = (id) => {
    setActionId(id);
    setDeleteModalOpen(true);
  };

  return (
    <div>
      <Table title={title} headers={headers} rows={rows} />
      {deleteModalOpen && (
        <Modal>
          <DeleteMember id={actionId} text={" member"} />
          <Button onClick={() => setDeleteModalOpen(false)}>Close</Button>
        </Modal>
      )}
    </div>
  );
};

export default MembersListTable;
