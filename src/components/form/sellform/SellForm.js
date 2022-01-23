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

function SellForm({ userBalance, assets, setBalance }) {
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

  // Formik
  const initialValues = {
    asset: "",
    quantity: "0.00",
  };

  // Formik
  const onSubmit = (values) => {
    //Calculate balance after purchase
    const newBalance = Number(userBalance) + Number(sellPrice);

    setIsSold(true);
    setBalance(newBalance);
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
      const totalAsset = (Number(quantity) * Number(price)).toFixed(6);
      console.log(totalAsset);
      let obj = assets.find((o) => o.AssetSymbol === symbol);
      setAssetAmount(obj.Amount);
      setSellPrice(totalAsset);
      setAssetSymbol(symbol);
      setAssetPrice(price);
      setassetName(name);
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
          {setQuantity(values.quantity)}
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
                return <option value={asset.AssetId}>{asset.AssetName}</option>;
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
            {selectedAsset != "" && (
              <>
                <h5>
                  Total {assetSymbol.toUpperCase()}: {assetAmount}
                </h5>
                <h5>
                  Sell {Number(values.quantity).toFixed(6)}{" "}
                  {assetSymbol.toUpperCase()} for {formatter.format(sellPrice)}
                </h5>
              </>
            )}
          </div>
          <hr />
          <div className="d-grid gap-2">
            <Button
              type="submit"
              variant="success"
              size="lg"
              disabled={isSold || quantity > assetAmount ? true : false}
            >
              {isSold ? <TiTick /> : "Sell"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default SellForm;
