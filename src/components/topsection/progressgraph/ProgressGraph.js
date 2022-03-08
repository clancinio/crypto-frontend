import Col from "react-bootstrap/Col";
import "./progressgraph.css";
import { Chart } from "react-google-charts";
import { useEffect } from "react";
import axios from "axios";

function ProgressGraph({ balances, userSub, userBalance }) {
  const MINUTE_MS = 60000;

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     var today = new Date();
  //     var dd = String(today.getDate()).padStart(2, "0");
  //     var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  //     var yyyy = today.getFullYear();

  //     today = yyyy + "/" + mm + "/" + dd;

  //     const balance = {
  //       AccountID: userSub,
  //       UserBalance: userBalance,
  //       DateEntered: today,
  //     };

  //     await axios
  //       .post(`http://localhost:8080/api/balances/${userSub}`, balance)
  //       .then((response) => {
  //         console.log("Inserted to Balances.");
  //       });
  //   }, MINUTE_MS);

  //   // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  //   return () => clearInterval(interval);
  // }, []);

  if (balances.length > 6) {
    return (
      <Col md={6}>
        <div className="sub-section">
          <Chart
            height={"300px"}
            chartType="AreaChart"
            loader={<div>Loading Chart</div>}
            data={[
              ["Days", "Balance"],
              ["-6d", parseFloat(balances[0].UserBalance)],
              ["-5d", parseFloat(balances[1].UserBalance)],
              ["-4d", parseFloat(balances[2].UserBalance)],
              ["-3d", parseFloat(balances[3].UserBalance)],
              ["-2d", parseFloat(balances[4].UserBalance)],
              ["-1d", parseFloat(balances[5].UserBalance)],
              ["Today", parseFloat(balances[6].UserBalance)],
            ]}
            options={{
              title: "Portfolio Balance",
              hAxis: { title: "", titleTextStyle: { color: "#333" } },
              vAxis: { minValue: 0 },
              legend: { position: "none" },
              // For the legend to fit, we make the chart area smaller
              chartArea: { width: "80%", height: "80%" },
            }}
          />
        </div>
      </Col>
    );
  } else {
    return (
      <h2 className="text-center mt-5">
        A chart will be available after 7 days{" "}
      </h2>
    );
  }
}
export default ProgressGraph;
