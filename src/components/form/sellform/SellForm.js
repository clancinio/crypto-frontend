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
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function SellForm({
  userBalance,
  assets,
  setUserBalance,
  userSub,
  currentInvestment,
  handleClose,
}) {
  // Selected asset to sell
  const [selectedAsset, setSelectedAsset] = useState("");
  // Price of selected asset
  const [assetPrice, setAssetPrice] = useState();
  // Name of selected asset
  const [assetName, setassetName] = useState();
  // Quantity to sell
  const [quantity, setQuantity] = useState(0);
  // Sell price
  const [sellPrice, setSellPrice] = useState(0);
  // selected asset ID
  const [assetSymbol, setAssetSymbol] = useState("");
  // Purchase state
  const [isSold, setIsSold] = useState(false);
  // Selected asset total amount owmed
  const [assetAmount, setAssetAmount] = useState(0);
  // Selected asset total amount owmed
  const [assetId, setAssetId] = useState("");
  //Asset Image
  const [image, setImage] = useState("");

  function sendEmail() {
    window.Email.send({
      Host: "smtp.elasticemail.com",
      Username: "TryptoCryptoCurrencyTrading@gmail.com",
      Password: "CEC17BF627210E74C573D689894B9108AA71",
      To: "coreymcrann@gmail.com",
      From: "TryptoCryptoCurrencyTrading@gmail.com",
      Subject: "Test Email",
      Body:
        "Thank you for using our app! This is a email to confirm you have sold " +
        assetAmount +
        " " +
        selectedAsset +
        "on our site. Best of luck!",
    });
  }

  // Formik
  const initialValues = {
    asset: "",
    quantity: "0.00",
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
    const newBalance = Number(userBalance) + sellPrice;

    // Calculate new Amount
    const newQuantity = assetAmount - quantity.toFixed(6);

    // Create a transaction object
    const transaction = {
      AccountId: userSub,
      AssetSymbol: assetSymbol,
      BuySell: "S",
      Amount: values.quantity,
      Price: assetPrice,
      Date: date,
      Cost: sellPrice,
      Image: image,
    };

    // Create an account object
    const account = {
      AccountId: userSub,
      Balance: newBalance,
      HasInvested: 1,
    };

    const asset = {
      AccountId: userSub,
      AssetId: assetId,
      AssetSymbol: assetSymbol,
      Amount: newQuantity,
      AssetName: assetName,
    };

    setIsSold(true);
    setUserBalance(newBalance);
    setAssetAmount(newQuantity);
    sendEmail();

    // Update balance
    axios
      .put("http://localhost:8080/api/account", account)
      .then((response) => console.log(response));

    // Post a transaction
    axios
      .post("http://localhost:8080/api/transaction/create", transaction)
      .then((response) => console.log(response));

    // Update amount transaction
    axios
      .put("http://localhost:8080/api/assets/", asset)
      .then((response) => console.log("SOLD!!!!!!!!!!!"));

    setIsSold(true);
    setUserBalance(newBalance);
    setAssetAmount(newQuantity);
  };

  // Formik
  const validationSchema = Yup.object().shape({
    asset: Yup.string().required("Required!"),
    quantity: Yup.number()
      .min(0.000001, "Quantity to sell must be greater than 0.000001")
      .required(),
  });

  // This function makes a call to get the price of the selected asset
  async function fetchPrice(quantity) {
    try {
      const response = await axios.get(assetData(selectedAsset));
      const price = response.data.market_data.current_price.eur;
      const symbol = response.data.symbol;
      const name = response.data.name;
      const image = response.data.image.small;
      const totalAsset = Number(quantity) * Number(price);
      let obj = assets.find((o) => o.AssetSymbol === symbol);
      setAssetAmount(obj.Amount);
      setSellPrice(totalAsset);
      setAssetSymbol(symbol);
      setAssetPrice(price);
      setassetName(name);
      setImage(image);
    } catch (error) {
      console.log(error.response.data.error);
    }
  }

  // When component renders, call the fetchPrice function
  useEffect(() => {
    if (selectedAsset === "") {
      return;
    }
    fetchPrice(quantity);
  }, [selectedAsset, quantity]);

  if (!isSold) {
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
            {setQuantity(values.quantity)}
            {setAssetId(values.asset)}
            {isSold && (
              <Alert variant={"success"}>
                Success!! You sold {quantity} {assetSymbol.toUpperCase()} for{" "}
                {formatter.format(sellPrice)}
              </Alert>
            )}
            <h5>Balance: {formatter.format(userBalance)}</h5>
            {isSold && (
              <p className="text-success lead">
                {"+" + formatter.format(sellPrice)}
              </p>
            )}
            <Form.Group className="mb-3" controlId="asset">
              <Form.Label>Select Asset</Form.Label>
              <Form.Select
                aria-label="Select asset to buy"
                name="asset"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.asset}
                disabled={isSold ? true : false}
              >
                <option value=""></option>
                {assets.map((asset) => {
                  return (
                    <option value={asset.AssetId}>{asset.AssetName}</option>
                  );
                })}
              </Form.Select>
              {touched.asset && errors.asset ? (
                <div className="error">{errors.asset}</div>
              ) : null}
            </Form.Group>
            <Form.Label>Quantity</Form.Label>
            <Form.Group className="mb-3">
              <InputGroup className="mb-2">
                <FormControl
                  type="number"
                  step="any"
                  name="quantity"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.quantity}
                />
              </InputGroup>
              {touched.quantity && errors.quantity ? (
                <div className="error">{errors.quantity}</div>
              ) : null}
              {quantity > assetAmount && (
                <div className="error">
                  The maximum amount you can sell is {assetAmount}{" "}
                  {assetSymbol.toUpperCase()}
                </div>
              )}
            </Form.Group>
            <div>
              {selectedAsset !== "" && (
                <>
                  <h5>
                    Total {assetSymbol.toUpperCase()}: {assetAmount}
                  </h5>
                  <h5>
                    Sell {Number(values.quantity).toFixed(6)}{" "}
                    {assetSymbol.toUpperCase()} for{" "}
                    {formatter.format(sellPrice)}
                  </h5>
                </>
              )}
            </div>
            <hr />
            <Row className="d-flex">
              <Col>
                <Button
                  variant=""
                  size="md"
                  className="btn-full btn-outline-secondary"
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
                  disabled={isSold || quantity > assetAmount ? true : false}
                >
                  {isSold ? <TiTick /> : "Sell"}
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
        <Alert variant={"success"}>Your sale was successful</Alert>
        <h5>
          You sold {assetAmount} {assetSymbol.toUpperCase()}
        </h5>
        <h5 className="text-success">
          Value: {"+" + formatter.format(sellPrice)}
        </h5>
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

export default SellForm;
