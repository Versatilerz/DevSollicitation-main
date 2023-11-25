import { useState } from "react";
import { useDispatch } from "react-redux";
import { memberListActions } from "../store/members/memberListSlice";
import { sportsListActions } from "../store/sports/sportsListSlice";
import Button from "../UI/Button";
import { deleteMemberThunk } from "../store/members/memberThunk";
import { deleteSportThunk } from "../store/sports/sportsThunk";

const DeleteRow = (props) => {
  const dispatch = useDispatch();
  const [thankYou, setThankYou] = useState(false);

  const memberToDelete = props.id;
  const sportToDelete = props.id;

  //delete a row
  const onDeleteHandler = (props) => {
    setThankYou(true);
    if (memberToDelete) {
      dispatch(memberListActions.removeMember(memberToDelete));
      dispatch(deleteMemberThunk(memberToDelete));
    }

    if (sportToDelete) {
      dispatch(sportsListActions.removeSport(sportToDelete));
      dispatch(deleteSportThunk(sportToDelete));
    }
  };

  return (
    <>
      {!thankYou && (
        <div>
          <div>
            <h2>Warning!</h2>
          </div>
          <div>
            <p className="">
              Are you sure you want to delete this{props.text}?
            </p>
            <div className="row-12 mb-2 justify-content-center">
              <Button onClick={onDeleteHandler}>Confirm delete</Button>
            </div>
          </div>
        </div>
      )}
      {thankYou && <h2>Thank you!</h2>}
    </>
  );
};

export default DeleteRow;
