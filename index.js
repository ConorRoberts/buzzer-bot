import express from "express";
import twilio from "twilio";

const VoiceResponse = twilio.twiml.VoiceResponse;

const app = express();

const port = process.env.PORT ?? 3000;

app.post("/", (request, response) => {
  console.log(`${request.method} - ${request.url}`);
  
  const twiml = new VoiceResponse();

  twiml.say({ voice: "man" }, "One second please.");
  twiml.pause({ length: 0.2 });

  twiml.dial("9");
  twiml.pause({ length: 0.2 });
  twiml.dial("9");
  twiml.pause({ length: 3 });

  twiml.say({ voice: "man" }, "Door should be unlocked.");
  twiml.pause({ length: 15 });

  twiml.say({ voice: "man" }, "Bye.");

  response.type("text/xml");
  response.send(twiml.toString());
});

// Create an HTTP server and listen for requests on port 3000
app.listen(port, () => {
  console.log(`Now listening on port ${port}.`);
});
