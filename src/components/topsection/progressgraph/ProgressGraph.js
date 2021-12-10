import Col from "react-bootstrap/Col";
import "./progressgraph.css";
import { Chart } from "react-google-charts";

function ProgressGraph() {
  return (
    <Col md={6}>
      <div className="section">
        <Chart
          height={"300px"}
          chartType="AreaChart"
          loader={<div>Loading Chart</div>}
          data={[
            ["Year", "Balance"],
            ["1H", 53000],
            ["1D", 35721],
            ["1W", 105000],
            ["1Y", 25000],
            ["All", 155000],
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
