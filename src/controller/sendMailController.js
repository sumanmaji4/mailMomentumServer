// const formData = require('form-data')
// const Mailgun =('mailgun.js')

import formData from 'form-data'
import Mailgun from 'mailgun.js'
import Template from '../model/templateModel.js'

const mailgun = new Mailgun(formData)

export async function handledSendMail(req, res) {
  const { mailId, templateId } = req.body
  // console.log(mailId, templateId)
  const mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY || '',
  })

  let finalMail, subject, currentTemplate

  try {
    currentTemplate = await Template.findById(templateId)
    let mailBody = currentTemplate.mailBody
    // let redirect = currentTemplate.redirect
    subject = currentTemplate.subject

    finalMail = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <title>Document</title>
      </head>
      <body>
        <img
          src="http://localhost:8080/api/track/open/id"
          alt="Logo"
          title="Logo"
          style="display: block"
          width="1"
          height="1"
        />

        <div>${mailBody}</div>

        <a href="${process.env.BASE_URL}/api/track/redirect/${templateId}">
          <span> Click to know more</span>
        </a>
      </body>
    </html>`
  } catch {
    return res.status(404).json({ error: 'Template not found' })
  }

  // console.log('##################')
  // console.log(subject)
  // console.log('##################')
  // console.log(finalMail)
  // console.log('##################')

  try {
    let msg = await mg.messages.create(
      'sandbox38317b2e20ed46beb01cb7d45b9e0f82.mailgun.org',
      {
        from: 'sumanmaji401@gmail.com',
        to: mailId,
        subject: subject,
        // text: "Testing some Mailgun awesomeness!",
        html: finalMail,
      }
    )
    // .then((msg) => console.log(msg)) // logs response data
    // .catch((err) => console.log(err)) // logs any error
    console.log('------------------------------')
    console.log(mailId + ' ## ' + JSON.stringify(msg))
    console.log('------------------------------')
    currentTemplate.totalSend = currentTemplate.totalSend + 1
    await currentTemplate.save()
    res.status(200).json('mail sent')
  } catch {
    res.status(500).json('mail not sent')
  }
}
