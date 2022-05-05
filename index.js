const express = require("express");
const twilio = require("twilio");

const VoiceResponse = twilio.twiml.VoiceResponse;

const app = express();

const port = process.env.PORT || 3000;

app.post("/", (request, response) => {
  console.log(`${request.method} - ${request.url}`);

  const twiml = new VoiceResponse();

  // Greeting
  twiml.say({ voice: "man" }, "Unlocking door.");

  twiml.play({ digits: 99, loop: 3 })

  twiml.say({ voice: "man" }, "Door should be unlocked.");

  // Delay before repeat
  twiml.pause({ length: 10 });

  if (process.env.FALLBACK_PHONE_NUMBER) {
    twiml.dial(process.env.FALLBACK_PHONE_NUMBER);
    twiml.say({ voice: "man" }, "Forwarding call.");
  }

  response.type("text/xml");
  response.send(twiml.toString());
});

// Create an HTTP server and listen for requests on port 3000
app.listen(port, () => {
  console.log(`Now listening on port ${port}.`);
});
