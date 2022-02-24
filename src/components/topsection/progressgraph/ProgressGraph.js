
import Col from "react-bootstrap/Col";
import "./progressgraph.css";
import { Chart } from "react-google-charts";
import axios from "axios";
import { useState, useEffect } from "react";

function ProgressGraph({userSub}) {

  useEffect(() => {
    console.log("User sub");
    console.log(userSub);
    function getBalances() {
    axios
      .get(`http://localhost:8080/api/balances/getAll/8d80b473-ce12-4262-966f-31a8930fa278`)
      .then((response) => {
        console.log("response.......");
        console.log(response.data);
        
        setBalances(response.data);
      })
      .catch((error) => console.log(error.response.data.error));
    }

      console.log("Print balances....");
      console.log(balances);
      getBalances();
  }, []);
  
  return (
    <Col md={6}>
      <div className="section">
        <Chart
          height={"300px"}
          chartType="AreaChart"
          loader={<div>Loading Chart</div>}
          data={[
            ["Yesterday", "Balance"],
            ["2D", 53000],
            ["3D", 35721],
            ["4D", 105000],
            ["5D", 25000],
            ["6D", 155000],
            ["1W", 14000]
          ]}
          options={{
            title: "Portfolio Balance",
            hAxis: { title: "", titleTextStyle: { color: "#333" } },
            vAxis: { minValue: 0 },
            legend: { position: "none" },
            // For the legend to fit, we make the chart area smaller
            chartArea: { width: "78%", height: "70%" },
          }}
        />
      </div>
    </Col>
  );
}
export default ProgressGraph;
