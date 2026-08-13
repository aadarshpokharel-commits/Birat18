import API from "./auth";

export interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  sentAt: string;
  read: boolean;
}

export const getConversation = async (userA: number, userB: number): Promise<Message[]> => {
  const { data } = await API.get<Message[]>("/messages/conversation", {
    params: { userA, userB },
  });
  return data;
};

export const sendMessage = async (
  senderId: number,
  receiverId: number,
  content: string,
): Promise<Message> => {
  const { data } = await API.post<Message>("/messages", {
    senderId,
    receiverId,
    content,
  });
  return data;
};

export const getUnreadCount = async (userId: number): Promise<number> => {
  const { data } = await API.get<{ count: number }>("/messages/unread-count", {
    params: { userId },
  });
  return data.count;
};

export const markMessagesRead = async (userId: number, senderId: number): Promise<void> => {
  await API.post("/messages/mark-read", null, {
    params: { userId, senderId },
  });
};
