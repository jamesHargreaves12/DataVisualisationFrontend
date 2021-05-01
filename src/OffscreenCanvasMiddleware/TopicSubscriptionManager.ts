export class TopicSubscriptionManager<T> {
  subscriptions: {
    [topic in keyof T]?: {
      [s: string]: (data: T[topic]) => void;
    };
  };
  constructor() {
    this.subscriptions = {};
  }
  subscribe<U extends keyof T>(
    topic: U,
    id: string,
    callback: (data: T[U]) => void
  ) {
    this.subscriptions[topic] = {
      ...(this.subscriptions[topic] ?? {}),
      [id]: callback,
    };
  }

  pushMessage<U extends keyof T>(topic: U, data: T[U]) {
    const topicSubscribers = this.subscriptions[topic];
    if (topicSubscribers) {
      const definedTopicSubscriber = topicSubscribers as Exclude<
        typeof topicSubscribers,
        undefined
      >;
      Object.values(definedTopicSubscriber).forEach((sub) => sub(data));
    }
  }
  unsubscribe(topic: keyof T, id: string) {
    const topicSubscribers = this.subscriptions[topic];
    if (!topicSubscribers || !(id in topicSubscribers)) {
      console.error(
        `Can't unsubscribe ${id} from ${topic} as subscription doesn't exist `
      );
      return;
    }
    delete topicSubscribers[id];
  }
}
