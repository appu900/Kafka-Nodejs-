import { consumer, producer } from "./config/kafka.config";

export const produceMessage = async (topic: string, data: any) => {
  await producer.send({
    topic: topic,
    messages: [{ value: JSON.stringify(data) }],
  });
};

export const consumeMessages = async (topic: string) => {
  await consumer.connect();
  await consumer.subscribe({ topic: topic, fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const parseData = message.value
        ? JSON.parse(message.value.toString())
        : null;
      console.log({
        partition,
        offset: message.offset,
        value: parseData,
      });
    },
  });
};


