import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "eu-west-1_fJyikVNi6",
  ClientId: "444g33jmre0mv5mteinkmiulpn",
};

export default new CognitoUserPool(poolData);
