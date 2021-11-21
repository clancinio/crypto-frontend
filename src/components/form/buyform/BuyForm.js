import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";

function BuyForm() {
  return (
    <Formik>
      <Form>
        <h5>Balance: $25.36</h5>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Select Asset</Form.Label>
          <Form.Select aria-label="Deslect asser to buy">
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
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <InputGroup className="mb-2">
            <InputGroup.Text>€</InputGroup.Text>
            <FormControl type="number" min="1" step="any" />
          </InputGroup>
          <Form.Text id="" muted>
            Amount you wish to buy in Euros
          </Form.Text>
        </Form.Group>
        <div>
          <h5>Buying: 2 ETH</h5>
          <h5>Cost: $25.36</h5>
        </div>
        <hr />
        <div className="d-grid gap-2">
          <Button variant="primary" size="lg">
            Buy
          </Button>
        </div>
      </Form>
    </Formik>
  );
}

export default BuyForm;
