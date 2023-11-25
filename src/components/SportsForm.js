import { useState } from "react";
import { useDispatch } from "react-redux";
import { sportsListActions } from "../store/sports/sportsListSlice";
import Button from "../UI/Button";
import { editSportThunk } from "../store/sports/sportsThunk";
import { postSportTunk } from "../store/sports/sportsThunk";

const SportsForm = (props) => {
  const dispatch = useDispatch();
  const [sportsName, setSportsName] = useState("");
  const [enteredSport, setEnteredSport] = useState(false);

  const onChangeSportInputHandler = (event) => {
    setSportsName(event.target.value);
  };
  //setting either the sportsname to be added, or the sportsname to be edited.
  const sportData = { name: sportsName };
  const newName = { id: props.id, name: sportsName };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (newName.id) {
      dispatch(sportsListActions.editSport(newName));
      dispatch(editSportThunk(newName));
    }

    if (!newName.id) {
      dispatch(sportsListActions.addSport(sportData));
      dispatch(postSportTunk(sportData));
    }

    setEnteredSport(true);
  };

  return (
    <>
      <div>
        {!enteredSport && (
          <form onSubmit={formSubmitHandler}>
            <div className="row mb-2">
              <h2>Rename this sport</h2>
            </div>
            <div className="flex row mb-2">
              <label className="col-4" htmlFor="rename">
                New name
              </label>
              <input
                className="col-7"
                required
                type="text"
                id="rename"
                onChange={onChangeSportInputHandler}
                value={sportsName}
              ></input>
            </div>
            <div className="flex row justify-content-center mb-2">
              <Button>Submit sport</Button>
            </div>
          </form>
        )}
        {enteredSport && <h2>Thank you!</h2>}
      </div>
    </>
  );
};
export default SportsForm;
