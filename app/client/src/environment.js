import {SubscriptionClient} from 'subscriptions-transport-ws';
import {Environment, Network, RecordSource, Store} from 'relay-runtime';

const store = new Store(new RecordSource());

const SERVER_URL = process.env.NODE_ENV === 'production'
  ? 'localhost:4000'
  : 'localhost:4000';

function fetchQuery(operation, variables) {
  return fetch(`http://${SERVER_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('USER_ID') || '0',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => response.json());
}

function setupSubscription(config, variables, cacheConfig, observer) {
  const subscriptionClient = new SubscriptionClient(`ws://${SERVER_URL}/subscriptions`, {
    reconnect: true,
    connectionParams: {
      userId: localStorage.getItem('USER_ID') || '0',
    },
  });

  subscriptionClient.subscribe({query: config.text, variables}, (error, result) => {
    if (error) {
      console.error('error', error);
    } else {
      observer.onNext({data: result})
    }
  });

  return {
    dispose: () => null,
  };
}

const network = Network.create(fetchQuery, setupSubscription);
const environment = new Environment({network, store});

export default environment
