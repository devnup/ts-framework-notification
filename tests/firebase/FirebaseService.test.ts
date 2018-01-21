import * as hat from 'hat';
import { Firebase, FirebaseMessage } from "../../lib";

describe('lib.services.FirebaseService', () => {

  it('should instantiate a simple firebase message', async () => {
    const registrationToken = hat();
    const message = new FirebaseMessage({ body: 'Unit test', registrationToken, sample: 'true' });
    expect(message).toHaveProperty('registrationToken', registrationToken);
    expect(message).toHaveProperty('body', 'Unit test');
    expect(message).toHaveProperty('sample', 'true');
  });

  it('should not instantiate a debug Firebase service instance without explicit configuration', async () => {
    expect(() => new Firebase({})).toThrow(/The Google Service Account is not available/);
  });

  it('should intantiate a simple debug instance', async () => {
    const firebase = new Firebase({ debug: true });
    expect(firebase).toBeTruthy();
    expect(firebase.sdk).toBeUndefined();
  });

  it('should intantiate a simple debug instance in verbose mode and send simple notification', async () => {
    const firebase = new Firebase({ debug: true, verbose: true });
    expect(firebase).toBeTruthy();
    expect(firebase.sdk).toBeUndefined();
    expect(async () => await firebase.send({ registrationToken: hat(), body: 'Unit test', sample: 'true' })).not.toThrow();
  });

});