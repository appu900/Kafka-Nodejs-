import { Kafka, logLevel } from "kafkajs";
import "dotenv/config";

export const kafka = new Kafka({
  brokers: [process.env.KAFKA_BROKER as string],
  ssl: true,
  sasl: {
    mechanism: "scram-sha-256",
    username: process.env.KAFKA_USERNAME as string,
    password: process.env.KAFKA_PASSWORD as string,
  },
  logLevel: logLevel.ERROR,
});


export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: "test-group" });


// ** To create a kafka Producer..

export const connectKafkaProducer = async () =>{
    await producer.connect();
    console.log("Kafka producer connected..")
}




