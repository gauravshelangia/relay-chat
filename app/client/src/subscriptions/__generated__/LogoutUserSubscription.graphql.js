/**
 * @flow
 * @relayHash 3ddd97d8ef70c89df311e38bc54523ab
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type LogoutUserSubscriptionVariables = {|
  input: {
    clientSubscriptionId?: ?string;
  };
|};
export type LogoutUserSubscriptionResponse = {|
  +logoutUser: ?{|
    +user: ?{|
      +id: string;
    |};
    +viewer: ?{|
      +id: string;
    |};
  |};
|};
*/


/*
subscription LogoutUserSubscription(
  $input: LogoutUserSubscriptionInput!
) {
  logoutUser(input: $input) {
    user {
      id
    }
    viewer {
      id
    }
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "LogoutUserSubscriptionInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "LogoutUserSubscription",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "LogoutUserSubscriptionInput!"
          }
        ],
        "concreteType": "LogoutUserSubscriptionPayload",
        "name": "logoutUser",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "User",
            "name": "user",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "User",
            "name": "viewer",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Subscription"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "LogoutUserSubscription",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "LogoutUserSubscriptionInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "LogoutUserSubscription",
    "operation": "subscription",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "LogoutUserSubscriptionInput!"
          }
        ],
        "concreteType": "LogoutUserSubscriptionPayload",
        "name": "logoutUser",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "User",
            "name": "user",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "User",
            "name": "viewer",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "subscription LogoutUserSubscription(\n  $input: LogoutUserSubscriptionInput!\n) {\n  logoutUser(input: $input) {\n    user {\n      id\n    }\n    viewer {\n      id\n    }\n  }\n}\n"
};

module.exports = batch;
