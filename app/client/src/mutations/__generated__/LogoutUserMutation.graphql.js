/**
 * @flow
 * @relayHash 8eae6fc07a621616c98996c88300c403
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type LogoutUserMutationVariables = {|
  input: {
    clientMutationId?: ?string;
    id: string;
  };
|};
export type LogoutUserMutationResponse = {|
  +logoutUser: ?{|
    +viewer: ?{| |};
  |};
|};
*/


/*
mutation LogoutUserMutation(
  $input: LogoutUserInput!
) {
  logoutUser(input: $input) {
    viewer {
      ...App_viewer
      id
    }
  }
}

fragment App_viewer on User {
  id
  name
  ...Chat_viewer
}

fragment Chat_viewer on User {
  id
  name
  ...Message_viewer
  users(first: 2147483647) {
    edges {
      cursor
      node {
        __typename
        id
        ...User_user
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
  messages(first: 2147483647) {
    edges {
      cursor
      node {
        __typename
        id
        userId
        ...Message_message
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}

fragment Message_viewer on User {
  id
}

fragment User_user on User {
  id
  name
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
        "type": "LogoutUserInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "LogoutUserMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "LogoutUserInput!"
          }
        ],
        "concreteType": "LogoutUserPayload",
        "name": "logoutUser",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "User",
            "name": "viewer",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "App_viewer",
                "args": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "LogoutUserMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "LogoutUserInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "LogoutUserMutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "LogoutUserInput!"
          }
        ],
        "concreteType": "LogoutUserPayload",
        "name": "logoutUser",
        "plural": false,
        "selections": [
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
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "name",
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 2147483647,
                    "type": "Int"
                  }
                ],
                "concreteType": "UserConnection",
                "name": "users",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "UserEdge",
                    "name": "edges",
                    "plural": true,
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
                        "concreteType": "User",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "__typename",
                            "storageKey": null
                          },
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
                            "name": "name",
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
                    "concreteType": "PageInfo",
                    "name": "pageInfo",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "endCursor",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "hasNextPage",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "users{\"first\":2147483647}"
              },
              {
                "kind": "LinkedHandle",
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 2147483647,
                    "type": "Int"
                  }
                ],
                "handle": "connection",
                "name": "users",
                "key": "UsersLists_users",
                "filters": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 2147483647,
                    "type": "Int"
                  }
                ],
                "concreteType": "MessageConnection",
                "name": "messages",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "MessageEdge",
                    "name": "edges",
                    "plural": true,
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
                            "name": "__typename",
                            "storageKey": null
                          },
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
                    "concreteType": "PageInfo",
                    "name": "pageInfo",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "endCursor",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "hasNextPage",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "messages{\"first\":2147483647}"
              },
              {
                "kind": "LinkedHandle",
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 2147483647,
                    "type": "Int"
                  }
                ],
                "handle": "connection",
                "name": "messages",
                "key": "MessageList_messages",
                "filters": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation LogoutUserMutation(\n  $input: LogoutUserInput!\n) {\n  logoutUser(input: $input) {\n    viewer {\n      ...App_viewer\n      id\n    }\n  }\n}\n\nfragment App_viewer on User {\n  id\n  name\n  ...Chat_viewer\n}\n\nfragment Chat_viewer on User {\n  id\n  name\n  ...Message_viewer\n  users(first: 2147483647) {\n    edges {\n      cursor\n      node {\n        __typename\n        id\n        ...User_user\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  messages(first: 2147483647) {\n    edges {\n      cursor\n      node {\n        __typename\n        id\n        userId\n        ...Message_message\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment Message_viewer on User {\n  id\n}\n\nfragment User_user on User {\n  id\n  name\n}\n\nfragment Message_message on Message {\n  id\n  userId\n  username\n  text\n  createdAt\n}\n"
};

module.exports = batch;
