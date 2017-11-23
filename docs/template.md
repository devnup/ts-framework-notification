# ts-framework-notificaiton

This package has a built-in template engine for e-mails based on [niftylettuce/email-templates](https://github.com/niftylettuce/email-templates) module.
It is configured for `ejs` but can be overriden to nearly any other template engine, such as `pug` or `handlebars`.

This package also comes with simple template based on Cerberus.

### Sending with Default Template

Sending a simple email message using the default template:

```typescript
import { Email } from 'ts-framework-notification';

// Prepare the template engine
const email = new Email({
  from: process.env.SMTP_FROM,
  connectionUrl: process.env.SMTP_URL,
  template: {
    enabled: true
  }
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

The currently available locals for this template are:

- `preview`: The preview text, placed alongside the subject in most e-mail inbox providers.

- `header`: URL for the header image.

- `logo`: URL for the main image of the e-mail.

- `title`: The main e-mail title.

- `body`: The main e-mail message.

- `button`: Optional.
  - `label`: The button label.
  - `url`: The button destination url.

- `section`: Additional e-mail section, optional.
  - `title`: The section title
  - `body`: The section body

- `company`: The company information to be placed in the footer, optional.
  - `name`: The company name.
  - `address`: The company address.
  - `tel`: The company telephone number.

- `unsubscribe`: Optional.
  - `label`: Override the unsubscribe label, defaults to: "Unsubscribe".
  - `url`: The destination url for the Unsubscribe link.

## Sending with a Custom Template

// TODO