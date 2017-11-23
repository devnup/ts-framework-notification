# ts-framework-notification

Install using Yarn or NPM.

```bash
# Install using yarn
yarn add git:https://gitlab.devnup.com/npm/ts-framework-notification.git#master

# Install using NPM
npm install --save git:https://gitlab.devnup.com/npm/ts-framework-notification.git#master
```

## Sending simple E-mails

Sending a simple `html` or `plain text` message:

```typescript
import { Email } from 'ts-framework-notification';

const email = new Email({
  from: process.env.SMTP_FROM,
  connectionUrl: process.env.SMTP_URL
});

// Send a simple E-mail message
email.send({
  to: 'hello@company.com',
  subject: 'Welcome aboard!',
  text: 'Thank you for creating a new account! https://google.com',
  html: 'Thank you for creating a new account! <a href="https://google.com>Click here to login</a>'
}).then(response => console.info(response))
```

## Sending with the Template Engine

See the [Templates documentation](./template.md).


## API Docs

// TODO