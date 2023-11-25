import { useState } from "react";
import { useDispatch } from "react-redux";
import { memberListActions } from "../store/members/memberListSlice";
import Button from "../UI/Button";
import { editMemberThunk } from "../store/members/memberThunk";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { membersSelector } from "../store/members/memberSelectors";
import { sportsSelector } from "../store/sports/sportsSelectors";
import { postMemberThunk } from "../store/members/memberThunk";

const MemberForm = (props) => {
  const dispatch = useDispatch();
  const memberList = useSelector(membersSelector);
  const sports = useSelector(sportsSelector);
  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");
  const [enteredUrl, setEnteredUrl] = useState("");
  const [selectedSports, setSelectedSports] = useState([]);
  const [done, setDone] = useState(false);

  const memberToEdit = memberList.find(
    (member) => member.id === props.memberId
  );

  console.log(memberToEdit);
  const firstNameInputHandler = (event) => {
    setEnteredFirstName(event.target.value.trim());
  };

  const lastNameInputHandler = (event) => {
    setEnteredLastName(event.target.value.trim());
  };

  const urlInputHandler = (event) => {
    setEnteredUrl(event.target.value.trim());
  };

  const selectInputHandler = (event) => {
    setSelectedSports(
      Array.from(event.target.selectedOptions, (option) => option.value)
    );
  };
  const memberData = {
    name: {
      firstName: enteredFirstName ? enteredFirstName : "",
      lastName: enteredLastName ? enteredLastName : "",
    },
    image: enteredUrl ? enteredUrl : "",
    sports: selectedSports,
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (memberToEdit) {
      dispatch(memberListActions.editMember(memberData));
      dispatch(editMemberThunk(memberData));
    }
    dispatch(memberListActions.addMember(memberData));
    dispatch(postMemberThunk(memberData));

    setDone(true);
  };

  return (
    <div>
      {!done && (
        <form onSubmit={formSubmitHandler}>
          <div className="row">
            <h3>Enter member information</h3>
          </div>
          <div className="flex row mt-2">
            <label className="col-4" htmlFor="name">
              First name
            </label>
            <input
              className="col-7"
              required
              type="text"
              id="name"
              onChange={firstNameInputHandler}
              //   value={enteredFirstName}
              defaultValue={memberToEdit?.name.firstName}
            ></input>
          </div>
          <div className=" flex row mt-2 ">
            <label className="flex col-4" htmlFor="surname">
              Surname
            </label>
            <input
              className="col-7"
              required
              type="text"
              id="surname"
              onChange={lastNameInputHandler}
              defaultValue={memberToEdit?.name.lastName}
            ></input>
          </div>
          <div className="flex row mt-2 mb-2">
            <label className="col-4" htmlFor="image">
              Image adres
            </label>
            <input
              className="col-7"
              onChange={urlInputHandler}
              type="url"
              id="image"
              defaultValue={memberToEdit?.image}
            ></input>
          </div>
          <div className="flex row mt-2 mb-2">
            <label className="col-4" htmlFor="select">
              Select your sports
            </label>
            <select
              className="col-7"
              id="select"
              multiple={true}
              onChange={selectInputHandler}
            >
              {sports?.map((sport, index) => (
                <option
                  selected={
                    memberToEdit?.sports.find((i) => i === sport.id)
                      ? true
                      : false
                  }
                  value={sport.id}
                  key={index}
                >
                  {sport.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex row justify-content-center m-2">
            <Button>Submit member</Button>
          </div>
        </form>
      )}
      {done && <h2>Thank you!</h2>}
    </div>
  );
};
export default MemberForm;
