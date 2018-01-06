import * as hat from 'hat';
import * as sinon from 'sinon';
import { Firebase, FirebaseMessage } from "../../lib";
import MockTransport from "../util/MockTransport";

describe('lib.services.FirebaseService', () => {

  it('should instantiate a simple firebase message', async () => {
    const registrationToken = hat();
    const message = new FirebaseMessage({ body: 'Unit test', registrationToken });
    expect(message).toHaveProperty('registrationToken', registrationToken);
    expect(message).toHaveProperty('body', 'Unit test');
  });

  it('should instantiate a valid Firebase service instance', async () => {
    const service = new Firebase({
      serviceAccount: {
        projectId: hat(),
        clientEmail: hat() + '@' + hat() + '.com',
        privateKey: hat()
      },
      databaseURL: 'https://' + hat() + 'firebase.io',
      sdk: sinon.stub()
    })

    expect(service).toBeTruthy();
  });

});