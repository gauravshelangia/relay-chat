/**
 * @flow
 * @relayHash f414b44f90951e8caf29cd98c4e4fbae
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type NewMessageSubscriptionVariables = {|
  input: {
    clientSubscriptionId?: ?string;
  };
|};
export type NewMessageSubscriptionResponse = {|
  +newMessage: ?{|
    +messageEdge: ?{|
      +cursor: string;
      +node: ?{|
        +id: string;
        +userId: ?string;
        +username: ?string;
        +text: ?string;
        +createdAt: ?string;
      |};
    |};
    +viewer: ?{|
      +id: string;
    |};
  |};
|};
*/


/*
subscription NewMessageSubscription(
  $input: NewMessageSubscriptionInput!
) {
  newMessage(input: $input) {
    messageEdge {
      cursor
      node {
        id
        userId
        username
        text
        createdAt
        ...Message_message
      }
    }
    viewer {
      id
    }
  }
}

fragment Message_message on Message {
  id
  userId
  username
  text
  createdAt
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "NewMessageSubscriptionInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "NewMessageSubscription",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "NewMessageSubscriptionInput!"
          }
        ],
        "concreteType": "NewMessageSubscriptionPayload",
        "name": "newMessage",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "MessageEdge",
            "name": "messageEdge",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "cursor",
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "Message",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "id",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "userId",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "username",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "text",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "createdAt",
                    "storageKey": null
                  },
                  {
                    "kind": "FragmentSpread",
                    "name": "Message_message",
                    "args": null
                  }
                ],
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
  "name": "NewMessageSubscription",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "NewMessageSubscriptionInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "NewMessageSubscription",
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
            "type": "NewMessageSubscriptionInput!"
          }
        ],
        "concreteType": "NewMessageSubscriptionPayload",
        "name": "newMessage",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "MessageEdge",
            "name": "messageEdge",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "cursor",
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "Message",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "id",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "userId",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "username",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "text",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "createdAt",
                    "storageKey": null
                  }
                ],
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
  "text": "subscription NewMessageSubscription(\n  $input: NewMessageSubscriptionInput!\n) {\n  newMessage(input: $input) {\n    messageEdge {\n      cursor\n      node {\n        id\n        userId\n        username\n        text\n        createdAt\n        ...Message_message\n      }\n    }\n    viewer {\n      id\n    }\n  }\n}\n\nfragment Message_message on Message {\n  id\n  userId\n  username\n  text\n  createdAt\n}\n"
};

module.exports = batch;
