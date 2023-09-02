export enum CHAT_REQUEST_EVENTS {
  GET_CHATS = 'getChats',
  CREATE_CHAT = 'createChat',
  GET_CHATS_MESSAGE = 'getChatsMessage',
}

export enum CHAT_RESPONSE_EVENTS {
  ERROR = 'error',
  CREATED_CHAT = 'createdChat',
  RECEIVE_CHATS = 'receiveChats',
}
