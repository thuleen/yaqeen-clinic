const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "1rem",
  },
  listItem: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    margin: "0rem",
  },
  listItemFirstCol: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
  listItemSecondCol: {
    display: "flex",
    flexDirection: "column",
    alignItems: "end",
  },
  listItemTagNo: {
    fontFamily: "Abel",
    fontSize: "1.3rem",
    fontWeight: 600,
  },
  listItemTestType: {
    color: "#079992",
  },
  detailsItemTagNo: {
    fontFamily: "Abel",
    fontSize: "1.3em",
  },
  detailsItemPatientName: {
    fontSize: "1.1em",
  },
  detailsItemTestType: {
    fontSize: "1.1em",
  },
  detailsItemTestResult: {
    fontSize: "1.1em",
  },
  statusCompleted: {
    color: "#27ae60",
  },
  statusPending: {},
};
export default styles;
