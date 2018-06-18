import { Logger } from 'ts-framework';
import { Text, TextGateway } from '../lib';

const text = new Text({
  from: process.env.SMS_FROM,
  gateway: TextGateway.TWILIO,
  gatewayOptions: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
  },
});

setTimeout(() => {
  text.send({
    to: process.env.SMS_TO,
    text: 'hello world',
  }).then(response => {
    Logger.debug(response);
    process.exit(0);
  }).catch(error => {
    Logger.error(error)
    process.exit(1);
  });
}, 1000);