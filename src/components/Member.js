import { useSelector } from "react-redux/es/hooks/useSelector";
import classes from "./Member.module.css";
import { membersSelector } from "../store/members/memberSelectors";
import { sportsSelector } from "../store/sports/sportsSelectors";
import { useDispatch } from "react-redux";
import { getMembersThunk } from "../store/members/memberThunk";
import { getSportsThunk } from "../store/sports/sportsThunk";
import { useEffect } from "react";

const Member = (props) => {
  const dispatch = useDispatch();
  const memberList = useSelector(membersSelector);
  const sportsList = useSelector(sportsSelector);

  // problem to solve, whenver i refresh this page it crashes because the data is not there yet -- solved?
  useEffect(() => {
    dispatch(getMembersThunk());
    dispatch(getSportsThunk());
  }, [dispatch]);

  const member = memberList?.filter((member) => member.id === props.memberId);
  const arr1 = member[0]?.sports;
  const arr2 = sportsList;

  const res = arr1?.map((element) =>
    arr2?.filter((sport) => {
      return sport.id.toString() === element;
    })
  );

  return (
    <div className="row h-50 align-items-">
      <div className="col-lg-7 col-12 d-flex flex-column justify-content-end">
        <div className={classes.div}>
          <table className={classes.table}>
            <thead className={classes.trhead}>
              <tr>
                <th colSpan="2" className={classes.th}>
                  <span>{`${member[0]?.name.firstName} ${member[0]?.name.lastName}`}</span>
                </th>
              </tr>
              <tr>
                <td className={classes.td}>Profile picture</td>
                <td className={classes.td}>Sports</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={classes.td}>
                  {
                    <img
                      className={classes.img}
                      alt=""
                      src={member[0]?.image}
                    ></img>
                  }
                </td>
                <td className={classes.td}>
                  {res?.map((sport, index) => (
                    <p key={index}>{sport[0]?.name}</p>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Member;
