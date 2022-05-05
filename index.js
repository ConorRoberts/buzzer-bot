const express = require("express");
const twilio = require("twilio");

const VoiceResponse = twilio.twiml.VoiceResponse;

const app = express();

const attempts = 3;

const port = process.env.PORT || 3000;

app.post("/", (request, response) => {
  console.log(`${request.method} - ${request.url}`);

  const twiml = new VoiceResponse();

  for (const i = 0; i < attempts; i++) {
    // Greeting
    twiml.say({ voice: "man" }, "Unlocking door.");

    twiml.dial("9");
    twiml.dial("9");

    twiml.pause({ length: 2 });
    twiml.say({ voice: "man" }, "Door should be unlocked.");

    // Delay before repeat
    twiml.pause({ length: 3 });
  }

  twiml.say({ voice: "man" }, "Bye.");

  response.type("text/xml");
  response.send(twiml.toString());
});

// Create an HTTP server and listen for requests on port 3000
app.listen(port, () => {
  console.log(`Now listening on port ${port}.`);
});
