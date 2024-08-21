import express, { Request, Response } from "express";
import { connectKafkaProducer } from "./config/kafka.config";
import { consumeMessages, produceMessage } from "./helper";

const app = express();
const port = 5000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Node Express!");
});

app.post("/", async (req, res) => {
  const body = req.body;
  await produceMessage("kafka-crash", body);
  return res.status(200).json({
    ok: true,
  });
});

// ** connect kafka producer..
connectKafkaProducer().catch((error) =>
  console.log("Kafka connect error", error)
);

consumeMessages("kafka-crash").catch((err) =>
  console.log("Error in consuming Messages", err)
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




