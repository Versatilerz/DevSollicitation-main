import classes from "./Table.module.css";

const Table = ({ title, headers, rows }) => {
  return (
    <div>
      <h2>
        <span>{title}</span>
      </h2>
      <div className={classes.div}>
        <table className={classes.table}>
          <thead className={classes.thead}>
            <tr className={classes.trhead}>
              {headers?.map((header, index) => (
                <th key={index} className={classes.th}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={classes.tbody}>{rows}</tbody>
        </table>
      </div>
    </div>
  );
};
export default Table;
