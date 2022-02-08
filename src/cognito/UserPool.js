import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "eu-west-1_2VpVGJ9rP",
  ClientId: "5njm5lremklo64chd3acbpjeg7",
};

export default new CognitoUserPool(poolData);
