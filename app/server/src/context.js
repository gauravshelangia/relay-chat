import {fromGlobalId} from 'graphql-relay';
import {PubSub} from 'graphql-subscriptions';

export const ADD_MESSAGE_EVENT = 'ADD_MESSAGE_EVENT';
export const DELETE_MESSAGE_EVENT = 'DELETE_MESSAGE_EVENT';
export const LOGIN_USER_EVENT = 'LOGIN_USER_EVENT';
export const LOGOUT_USER_EVENT = 'LOGOUT_USER_EVENT';
export const UPDATE_MESSAGE_EVENT = 'UPDATE_MESSAGE_EVENT';

const GUEST_USER = {id: null, name: 'Guest'};

//
const messages = {};
const users = {};

let id = 0;
function nextId() {
  id++;
  return id;
}

//
function getId(anyId) {
  if (typeof anyId === 'undefined' || anyId === null || anyId === 'null' || anyId === '') {
    return null;
  }

  if (/^\d+$/.test(anyId)) {
    return Number(anyId);
  }

  const {type, id} = fromGlobalId(anyId);
  if (type) {
    return id;
  }

  return Number(anyId);
}

async function getNode(globalId) {
  const {id, type} = fromGlobalId(globalId);

  const node = await this[`get${type}`](id);
  if (node) {
    node.__typename = type;
  }

  return node;
}

// Messages
function addMessage(payload) {
  if (!this.viewer.id) {
    return null;
  }

  const messageId = nextId();

  const now = (new Date()).toISOString();
  const message = {
    id: messageId,
    userId: payload.userId,
    username: payload.username,
    text: payload.text,
    createdAt: now,
    updatedAt: now,
  };

  messages[messageId] = message;
  this.publish(ADD_MESSAGE_EVENT, message);

  return message;
}

function deleteMessage(rawMessageId) {
  if (!this.viewer.id) {
    return null;
  }

  const messageId = getId(rawMessageId);

  const message = messages[messageId];
  if (message) {
    delete messages[messageId];
    this.publish(DELETE_MESSAGE_EVENT, message);
    return message;
  }

  return null;
}

function updateMessage(rawMessageId, payload) {
  if (!this.viewer.id) {
    return null;
  }

  const messageId = getId(rawMessageId);

  const message = {
    ...messages[messageId],
    text: payload.text,
    updatedAt: (new Date()).toISOString(),
  };

  messages[messageId] = message;
  this.publish(UPDATE_MESSAGE_EVENT, message);

  return message;
}

function getMessage(rawMessageId) {
  if (!this.viewer.id) {
    return null;
  }

  const messageId = getId(rawMessageId);
  return messages[messageId] || null;
}

function getMessages() {
  if (!this.viewer.id) {
    return null;
  }

  return Object.keys(messages).map(k => messages[k]);
}

// Users
function loginUser(payload) {
  const userId = nextId();

  const now = (new Date()).toISOString();
  const user = {
    id: userId,
    name: payload.name,
    createdAt: now,
    updatedAt: now,
  };

  this.viewer = user;

  users[userId] = user;
  this.publish(LOGIN_USER_EVENT, user);

  return user;
}

function logoutUser(rawUserId) {
  const userId = getId(rawUserId);

  this.viewer = GUEST_USER;

  const user = users[userId];
  if (user) {
    delete users[userId];
    this.publish(LOGOUT_USER_EVENT, user);
    return user;
  }

  return null;
}

function getGuest() {
  return GUEST_USER;
}

function getUser(rawUserId) {
  const userId = getId(rawUserId);
  return users[userId] || null;
}

function getUsers() {
  if (!this.viewer.id) {
    return null;
  }

  return Object.keys(users).map(k => users[k]);
}

function subscribe(event) {
  return this.pubSub.asyncIterator(event);
}

function publish(event, payload) {
  return this.pubSub.publish(event, payload);
}

export default {
  viewer: GUEST_USER,
  getNode,
  getGuest,
  getUser,
  getUsers,
  loginUser,
  logoutUser,
  getMessage,
  getMessages,
  addMessage,
  deleteMessage,
  updateMessage,
  pubSub: new PubSub(),
  subscribe,
  publish,
}
