import { Text, TextMessage, TextGateway } from "../../lib";
import MockTransport from "../util/MockTransport";

describe('lib.services.Text', () => {

  it('should instantiate a simple text message', async () => {
    const message = new TextMessage({ to: '+5511987654321', text: 'Unit test'});
    expect(message).toHaveProperty('to', '+5511987654321');
    expect(message).toHaveProperty('text', 'Unit test');
  });

  it('should crash without a valid configuration', async () => {
    expect(() => new Text({ gateway: undefined })).toThrowError(/no gateway supplied/ig);
  });

  it('should not crash with a valid configuration but in debug mode', async () => {
    const text = new Text({ gateway: TextGateway.DEBUG });
    expect(await text.isReady()).toBe(true);
    expect(text).toBeTruthy();
  });

  it('should not instantiate without a valid configuration for Twilio', async () => {
    const text = new Text({ gateway: TextGateway.TWILIO });
    expect(await text.isReady()).toBe(false);
  });

  it('should not crash sending with a valid configuration but in debug mode', async () => {
    const text = new Text({ gateway: TextGateway.DEBUG });

    text.send({
      to: '+5511987654321',
      text: 'This is an automated test'
    });
  });

});
