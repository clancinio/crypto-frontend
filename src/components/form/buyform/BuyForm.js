import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import { TiTick } from "react-icons/ti/";
import { Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { assetData } from "../../../api";
import { formatter } from "../../../helpers";
import "../form.css";

function BuyForm({ userBalance, setUserBalance, userSub, handleClose, email }) {
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
  // Modal Show state
  const [show1, setShow1] = useState(false);
  const handleShow1 = () => setShow1(true);
  
  function sendEmail() {
    window.Email.send({
      Host: "smtp.elasticemail.com",
      Username: "TryptoCryptoCurrencyTrading@gmail.com",
      Password: "CEC17BF627210E74C573D689894B9108AA71",
      To: email,
      From: "tryptocryptocurrencytrading@gmail.com",
      Subject: "Thank You!",
      Body: "Thank you for using our app! This is a email to confirm you have sold " +assetAmount+" " +selectedAsset+ "on our site. Best of luck!",
   }).then((message) => alert("sending a email to" +email));
   
  }

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
      AccountId: userSub,
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
    setUserBalance(newBalance);
    console.log(values.assetAmount);
    console.log("Balance:" + userBalance);
    console.log(values.asset);
    // console.log("Form Values: " + JSON.stringify(values));

   
    sendEmail();
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
      console.log();
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

  if (!isPurchased) {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        handleClose={handleClose}
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
            <Row className="d-flex">
              <Col>
                <Button
                  variant="danger"
                  size="md"
                  className="btn-full"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Col>
              <Col>
                <Button
                  type="submit"
                  variant="success"
                  size="md"
                  className="btn-full"
                  disabled={userBalance - cost < 0 ? true : false}
                >
                  Buy
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    );
  } else {
    return (
      <>
        <Alert variant={"success"}>Your purchase was successful</Alert>
        <h5>
          You purchased {assetAmount} {assetSymbol.toUpperCase()}
        </h5>
        <h5 className="text-danger">Cost: {"-" + formatter.format(cost)}</h5>
        <h5>New Balance: {formatter.format(userBalance)}</h5>
        <Button
          type="submit"
          variant="success"
          size="md"
          className="btn-full mt-3"
          onClick={handleClose}
        >
          Continue
        </Button>
      </>
    );
  }
}

export default BuyForm;
