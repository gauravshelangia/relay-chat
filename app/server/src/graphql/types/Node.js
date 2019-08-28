import {
  nodeDefinitions,
} from 'graphql-relay';

const types = [];

const registerType = type => {
  types[type.name] = type;
  return type;
}

const {nodeInterface: NodeInterface, nodeField: node} = nodeDefinitions(
  async (globalId, context) => context.getNode(globalId),
  (obj) => types[obj.__typename]
);

export {
  NodeInterface,
  node,
  registerType,
}
