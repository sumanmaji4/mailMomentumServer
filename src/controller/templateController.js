import Template from '../model/templateModel.js'

export async function handleGetAllTemplates(req, res) {
  let templateList = await Template.find({})
  let nameList = templateList.map((item) => {
    return { id: item._id, name: item.name }
  })

  return res.status(200).json(nameList)
}

export async function handleCreateTemplate(req, res) {
  //   console.log(name, subject, mailBody)
  let { name, subject, mailBody, redirect } = req.body

  try {
    if (
      name.trim().length < 3 ||
      subject.trim().length < 3 ||
      mailBody.trim().length < 3 ||
      redirect.trim().length < 3
    ) {
      return res.status(400).json({ error: 'invalid input' })
    }

    const template = new Template({
      name,
      subject,
      mailBody,
      redirect,
      totalSend: 0,
    })

    const currentTemplate = await template.save()
    return res.status(201).json({ id: currentTemplate?._id })
  } catch {
    return res.status(500).json({ error: 'unable to save template' })
  }
}

export async function handleGetTemplate(req, res) {
  const id = req.params.id
  //   console.log(id)

  try {
    let template = await Template.findById(id)
    // console.log('handleGetTemplate' + res)
    if (!template) return res.status(404).json({ error: 'template not found' })

    return res.status(200).json({
      name: template.name,
      subject: template.subject,
      mailBody: template.mailBody,
      redirect: template.redirect,
    })
  } catch {
    return res.status(404).json({ error: 'template not found' })
  }
}

export async function handleUpdateTemplate(req, res) {
  let { name, subject, mailBody, redirect } = req.body
  const id = req.params.id
  try {
    let template = await Template.findById(id)
    // console.log('handleUpdateTemplate ' + id)
    if (!template) return res.status(404).json({ error: 'template not found' })

    template.name = name
    template.subject = subject
    template.mailBody = mailBody
    template.redirect = redirect

    const updatedTemplate = await template.save()
    return res.status(200).json(updatedTemplate)
  } catch {
    return res.status(404).json({ error: 'template not found' })
  }
}

export async function handleDeleteTemplate(req, res) {
  const id = req.params.id
  //   console.log('handleDeleteTemplate ' + id)
  try {
    await Template.findByIdAndDelete(id)
    return res.status(200).json({ msg: 'template removed' })
  } catch {
    return res.status(404).json({ error: 'template not found' })
  }
}
