import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { assetData } from "../../../api";
import "../form.css";

// Number formatter for euros
var formatter = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
});

const initialValues = {
  asset: "bitcoin",
  amount: "0.00",
};

const onSubmit = (values) => {
  console.log("Form Values: " + JSON.stringify(values));
};

const validationSchema = Yup.object().shape({
  asset: Yup.string().required("Required!"),
  amount: Yup.number().min(5, "The minimum amount is €5.00").required(),
});

function BuyForm() {
  // Selected asset to buy
  const [selectedAsset, setSelectedAsset] = useState("bitcoin");
  // Cost of purchase
  const [cost, setCost] = useState("");
  // Cost of purchase
  const [assetAmount, setAssetAmount] = useState();

  async function fetchPrice(c) {
    try {
      const response = await axios.get(assetData(selectedAsset));
      const price = response.data.market_data.current_price.eur;
      const totalAsset = (Number(c) / Number(price)).toFixed(6);
      setAssetAmount(totalAsset);
      console.log(price);
      console.log(cost);
      console.log(totalAsset);
    } catch (error) {
      console.log(error.response.data.error);
    }
  }

  useEffect(() => {
    fetchPrice(cost);
  }, [selectedAsset, cost]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        handleBlur,
      }) => (
        <Form onSubmit={handleSubmit}>
          {setSelectedAsset(values.asset)}
          {setCost(values.amount)}
          <h5>Balance: €2,000.00</h5>
          <Form.Group className="mb-3" controlId="asset">
            <Form.Label>Select Asset</Form.Label>
            <Form.Select
              aria-label="Deslect asser to buy"
              name="asset"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.asset}
            >
              <option value="bitcoin">Bitcoin</option>
              <option value="ethereum">Ethereum</option>
              <option value="binancecoin">Binance Coin</option>
              <option value="tether">Tether </option>
              <option value="solana">Solana </option>
              <option value="cardano">Cardano</option>
              <option value="ripple">Ripple</option>
              <option value="polkadot">Polkadot</option>
              <option value="dogecoin">Dogecoin </option>
              <option value="avalanche-2">Avalanche</option>
            </Form.Select>
            {touched.asset && errors.asset ? (
              <div className="error">{errors.asset}</div>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-3">
            <InputGroup className="mb-2">
              <InputGroup.Text>€</InputGroup.Text>
              <FormControl
                type="number"
                step="any"
                name="amount"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.amount}
              />
            </InputGroup>
            {touched.amount && errors.amount ? (
              <div className="error">{errors.amount}</div>
            ) : null}
          </Form.Group>
          <div>
            <h5>
              Buying: {assetAmount} {values.asset.toUpperCase()}
            </h5>
            <h5>Cost: {formatter.format(values.amount)}</h5>
          </div>
          <hr />
          <div className="d-grid gap-2">
            <Button type="submit" variant="primary" size="lg">
              Buy
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default BuyForm;
