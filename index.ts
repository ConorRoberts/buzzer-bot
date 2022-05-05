import express from "express";
import twilio from "twilio";

const VoiceResponse = twilio.twiml.VoiceResponse;

const app = express();

// Create a route that will handle Twilio webhook requests, sent as an
// HTTP POST to /voice in our application
app.post("/call", (request, response) => {
  // Use the Twilio Node.js SDK to build an XML response
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

  // Render the response as XML in reply to the webhook request
  response.type("text/xml");
  response.send(twiml.toString());
});

// Create an HTTP server and listen for requests on port 3000
app.listen(process.env.PORT ?? 3000, () => {
  console.log(
    "Now listening on port 3000. " +
      "Be sure to restart when you make code changes!"
  );
});
