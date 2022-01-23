import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { TiTick } from "react-icons/ti/";
import { Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { assetData } from "../../../api";
import { formatter } from "../../../helpers";
import "../form.css";

function BuyForm({ userBalance, setBalance, userSub }) {
  // Selected asset to buy
  const [selectedAsset, setSelectedAsset] = useState("bitcoin");
  // Price of selected asset
  const [assetPrice, setAssetPrice] = useState();
  // Name of selected asset
  const [assetName, setassetName] = useState();
  // Cost of purchase
  const [cost, setCost] = useState("");
  // Cost of purchase
  const [assetAmount, setAssetAmount] = useState();
  // selected asset ID
  const [assetSymbol, setAssetSymbol] = useState("btc");
  // Purchase state
  const [isPurchased, setIsPurchased] = useState(false);

  // Formik
  const initialValues = {
    asset: "bitcoin",
    amount: "0.00",
  };

  // Formik
  const onSubmit = (values) => {
    // Get today's date
    const today = new Date();
    const date =
      today.getDate() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getFullYear();

    // Calculate new Balance
    const newBalance = userBalance - Number(cost);

    // Create a transaction object
    const transaction = {
      AccountId: userSub,
      AssetId: values.asset,
      BuySell: "B",
      Amount: assetAmount,
      Price: assetPrice,
      Date: date,
      Cost: cost,
    };

    // Create an asset object
    const asset = {
      AccountId: userSub,
      AssetId: values.asset,
      AssetSymbol: assetSymbol,
      Amount: assetAmount,
      AssetName: assetName,
    };
    console.log(transaction);
    console.log(asset);

    // Create an account object
    const account = {
      AccountId: "8f625af7-45cf-43f7-91ec-c6561c8c2b69",
      Balance: newBalance,
    };

    // Post a transaction
    axios
      .post("http://localhost:8080/api/transaction/create", transaction)
      .then((response) => console.log(response));

    // Post/Update asset
    axios
      .post("http://localhost:8080/api/assets", asset)
      .then((response) => console.log(response));

    // Update balance
    axios
      .put("http://localhost:8080/api/account", account)
      .then((response) => console.log(response));

    setIsPurchased(true);
    setBalance(newBalance);
    console.log(values.assetAmount);
    console.log("Balance:" + userBalance);
    console.log(values.asset);
    // console.log("Form Values: " + JSON.stringify(values));
  };

  // Formik
  const validationSchema = Yup.object().shape({
    asset: Yup.string().required("Required!"),
    amount: Yup.number().min(5, "The minimum amount is €5.00").required(),
  });

  // This function makes a call to get the price of the selected asset
  async function fetchPrice(c) {
    try {
      const response = await axios.get(assetData(selectedAsset));
      const price = response.data.market_data.current_price.eur;
      const symbol = response.data.symbol;
      const name = response.data.name;
      const totalAsset = (Number(c) / Number(price)).toFixed(6);
      setAssetAmount(totalAsset);
      setAssetSymbol(symbol);
      setAssetPrice(price);
      setassetName(name);
      console.log(price);
      console.log(cost);
      console.log(totalAsset);
    } catch (error) {
      console.log(error.response.data.error);
    }
  }

  // When component renders, call the fetchPrice function
  useEffect(() => {
    fetchPrice(cost);
  }, [selectedAsset, cost, userBalance]);

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
          {isPurchased && (
            <Alert variant={"success"}>Your purchase was successful</Alert>
          )}

          <h5>Balance: {formatter.format(userBalance)}</h5>
          {isPurchased && (
            <p className="text-danger lead">{"-" + formatter.format(cost)}</p>
          )}
          <Form.Group className="mb-3" controlId="asset">
            <Form.Label>Select Asset</Form.Label>
            <Form.Select
              aria-label="Deslect asser to buy"
              name="asset"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.asset}
              disabled={isPurchased ? true : false}
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
                disabled={isPurchased ? true : false}
              />
            </InputGroup>
            {touched.amount && errors.amount ? (
              <div className="error">{errors.amount}</div>
            ) : null}
            {userBalance - cost < 0 && isPurchased == false ? (
              <div className="error">
                You do not have enough money to make this purchase
              </div>
            ) : null}
          </Form.Group>
          <div>
            <h5>
              Buying: {assetAmount} {assetSymbol.toUpperCase()}
            </h5>
            <h5>Cost: {formatter.format(values.amount)}</h5>
          </div>
          <hr />
          <div className="d-grid gap-2">
            <Button
              type="submit"
              variant="success"
              size="lg"
              disabled={isPurchased || userBalance - cost < 0 ? true : false}
            >
              {isPurchased ? <TiTick /> : "Buy"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default BuyForm;
