import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import "../form.css";

const initialValues = {
  asset: "",
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
          <h5>Balance: €25.36</h5>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Select Asset</Form.Label>
            <Form.Select
              aria-label="Deslect asser to buy"
              name="asset"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.asset}
            >
              <option value=""></option>
              <option value="bitcoin">Bitcoin</option>
              <option value="ethereum">Ethereum</option>
              <option value="binancecoin">Binance Coin</option>
              <option value="tether">Tether </option>
              <option value="solana">Solana </option>
              <option value="binancecoin">Cardano</option>
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
            <h5>Buying: 2 ETH</h5>
            <h5>Cost: €25.36</h5>
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
