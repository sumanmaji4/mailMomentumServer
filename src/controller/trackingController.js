import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import Template from '../model/templateModel.js'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const folder = path.resolve()

function getTime() {
  // date creation
  const dateObj = new Date()
  const month = dateObj.getUTCMonth() + 1 // months from 1-12
  const day = dateObj.getUTCDate()
  const year = dateObj.getUTCFullYear()

  // Using padded values, so that 2023/1/7 becomes 2023/01/07
  const pMonth = month.toString().padStart(2, '0')
  const pDay = day.toString().padStart(2, '0')
  const newPaddedDate = `${year}-${pMonth}-${pDay}`
  const hour = dateObj.getHours()

  // console.log(hour) // 0 to 23
  // console.log(newPaddedDate) // 2024-05-17

  return { hour: hour.toString(), newPaddedDate }
}

export async function handleMailOpen(req, res) {
  // track mail here
  const id = req.params.id

  console.log('mail opened', id)
  res.set('Content-Type', 'image/png')
  return res.status(200).sendFile(path.join(__dirname, '../../public/logo.png')) //('public/logo.png')
  //'https://res.cloudinary.com/dqykfmixh/image/upload/v1720241220/mailmomentum/wzdylg5aqqp4rafvk8if.png'
  // return res.json('img path')
}

export async function handleMailClick(req, res) {
  const id = req.params.id
  // console.log('mail clicked ' + id)

  try {
    let currentTemplate = await Template.findById(id)
    // console.log(currentTemplate)
    let redirect = currentTemplate.redirect
    let currperformancePerHour = [...currentTemplate.performancePerHour]
    let currperformancePerDay = [...currentTemplate.performancePerDay]

    let f1 = 1,
      f2 = 1
    const { hour, newPaddedDate } = getTime()

    for (let i = 0; i < currperformancePerHour.length; i++) {
      if (currperformancePerHour[i].time == hour) {
        currperformancePerHour[i].count++
        f1 = 0
      }
    }

    if (f1) currperformancePerHour.push({ time: hour, count: 1 })

    for (let i = 0; i < currperformancePerDay.length; i++) {
      if (currperformancePerDay[i].day == newPaddedDate) {
        currperformancePerDay[i].count++
        f2 = 0
      }
    }
    if (f2) currperformancePerDay.push({ day: newPaddedDate, count: 1 })

    currentTemplate.performancePerHour = currperformancePerHour
    currentTemplate.performancePerDay = currperformancePerDay

    // console.log(hour)
    // console.log(
    //   '#####################' + JSON.stringify(currperformancePerHour)
    // )

    await currentTemplate.save()

    res.status(200).redirect(`${redirect}`)
  } catch {
    res.status(500).redirect('https://www.google.com')
  }
}
