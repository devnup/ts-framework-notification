import * as hat from 'hat';
import { Notification } from "../../lib";

describe('lib.services.Notification', () => {
  it('should not instantiate a Notification service without any transports', async () => {
    expect(() => new Notification({})).toThrow(/No transports configured/);
  });

  it('should instantiate a Notification service with a debug email transport', async () => {
    let service = new Notification({ email: { from: 'test@company.com', debug: true } });

    expect(service.transports).toHaveProperty('email');
    expect(await service.transports.email.isReady()).toBe(false);

    await service.send(new Notification.EmailMessage({
      to: 'test@company.com',
      subject: 'Unit test',
      text: 'This is an automated test'
    }));
  });

  it('should instantiate a Notification service with a debug firebase transport', async () => {
    let service = new Notification({ firebase: { debug: true } });
    expect(service.transports).toHaveProperty('firebase');

    await service.send(new Notification.FirebaseMessage({
      registrationToken: hat(),
      body: 'Unit test',
      sample: 'true'
    }));
  });

  it('should not send a Notification without the transport required available', async () => {
    let service = new Notification({ email: { from: 'test@company.com', debug: true } });

    try {
      await service.send(new Notification.FirebaseMessage({
        registrationToken: hat(),
        body: 'Unit test',
        sample: 'true'
      }));
    } catch (exception) {
      expect(exception.message).toMatch(/Transport not available or misconfigured/)
    };
  });
});