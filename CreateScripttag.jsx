
import { Page, Card } from "@shopify/polaris";
import { useMutation, gql } from "@apollo/client";
import { navigate } from "raviger";
import { Redirect } from "@shopify/app-bridge/actions";
import { useAppBridge } from "@shopify/app-bridge-react";

const shopOrigin = new URL(location).searchParams.get("shop");

const QUERY_SCRIPTTAGS = gql`
query {
  scriptTags(first: 5 ){
    edges {
      node {
        id
        src
        displayScope
      }
    }
  }
}`;


const WRITE_SCRIPTTAGS = gql`
mutation scriptTagCreate($input: ScriptTagInput!) {
  scriptTagCreate(input: $input) {
    userErrors {
      field
      message
    }
    scriptTag {
      src
      displayScope
    }
  }
}`;

const DELETE_SCRIPTTAGS = gql`
mutation scriptTagDelete($id: ID!) {
  scriptTagDelete(id: $id) {
    deletedScriptTagId
    userErrors {
      field
      message
    }
  }
}`;


const ActiveScripttag = () => {
  const abContext = useAppBridge();
  const redirect = Redirect.create(abContext);
  const returnUrl = `https://${appOrigin}/auth?shop=${shopOrigin}`;

  const [subScripts, { data, loading, error }] = useMutation(
    WRITE_SCRIPTTAGS
  );

  if (data) {
    // redirect.dispatch(
    //   Redirect.Action.REMOTE,
    //   data.appSubscriptionCreate.confirmationUrl
    // );
  }

  return (
    <Page
      title="App Settings "
      breadcrumbs={[{ content: "Settings", onAction: () => navigate("/") }]}
    >
      <Card
        sectioned
        primaryFooterAction={{
          content: "Create scripts",
          onAction: () => {
            subScripts({
              variables: {
                returnString: returnUrl,

                  input: {
                    "src": "https://gist.githubusercontent.com/sanjay-ios-io/5919a6de463cfd27f51b60d8401fadb9/raw/d364a4b9d0158e9d0dee7145e48f668126ffd60b/testjs.js",
                    "displayScope": "All"
                  }

              },
            });
          },
        }}
      >
        <p>
         Add Store front feature to the store
        </p>
      </Card>
    </Page>
  );
};

export default ActiveScripttag;
