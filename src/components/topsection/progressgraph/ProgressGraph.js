import Col from "react-bootstrap/Col";
import "./progressgraph.css";
import { Chart } from "react-google-charts";

function ProgressGraph({ balances }) {
  return (
    <Col md={6}>
      <div className="section">
        <Chart
          height={"300px"}
          chartType="AreaChart"
          loader={<div>Loading Chart</div>}
          data={[
            ["Year", "Balance"],
            // balances.map(b => {
            //   return(
            //     [b.DateEntered, 35721]
            //   )
            // })
            ["1D", parseFloat(balances[0].UserBalance)],
            ["1W", parseFloat(balances[1].UserBalance)],
            ["1Y", parseFloat(balances[2].UserBalance)],
            ["All", parseFloat(balances[3].UserBalance)],
            ["All", parseFloat(balances[4].UserBalance)],
            ["All", parseFloat(balances[5].UserBalance)],
            ["All", parseFloat(balances[6].UserBalance)],
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
