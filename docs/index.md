# ts-framework-notification

Install using Yarn or NPM.

```bash
# Install using yarn
yarn add git:https://gitlab.devnup.com/npm/ts-framework-notification.git#master

# Install using NPM
npm install --save git:https://gitlab.devnup.com/npm/ts-framework-notification.git#master
```

Special thanks to the [Cerberus](https://github.com/TedGoas/Cerberus) team, that developed a great E-mail template, used as the default template.
Don't forget to checkout their official website: [http://tedgoas.github.io/Cerberus/](http://tedgoas.github.io/Cerberus/)

<center>![Sample email template](./assets/sample-template.png)</center>

## Getting Started

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

Sending a simple email message using the default template (Cerberus):

```typescript
import { Email } from 'ts-framework-notification';

const email = new Email({
  from: process.env.SMTP_FROM,
  connectionUrl: process.env.SMTP_URL
});

// Send an E-mail using the default template (Cerberus)
email.send({
  to: 'hello@company.com',
  subject: 'Welcome aboard!',
  locals: {
    title: 'Simple sender test',
    logo: 'https://i.imgur.com/5UMVOBG.jpg',
    body: 'Thank you for creating a new account!'
    button: {
      label: 'Visit your Accoutn',
      url: 'https://company.com/account'
    },
    footer: 'This is a footer',
  },
}).then(response => console.info(response))
```

## Sending with the Default Template

See the [Templates documentation](./template.md).

## Sending with a Custom Template

// TODO