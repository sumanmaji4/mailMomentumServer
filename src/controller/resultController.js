import Template from '../model/templateModel.js'

export async function handleGetAllResulst(req, res) {
  let ResultPerHour = {}
  let ResultPerDay = {}

  try {
    const allData = await Template.find({})

    for (let i = 0; i < allData.length; i++) {
      for (let j = 0; j < allData[i].performancePerHour.length; j++) {
        if (ResultPerHour[allData[i].performancePerHour[j].time]) {
          ResultPerHour[allData[i].performancePerHour[j].time] +=
            allData[i].performancePerHour[j].count
        } else {
          ResultPerHour[allData[i].performancePerHour[j].time] =
            allData[i].performancePerHour[j].count
        }
      }
      for (let j = 0; j < allData[i].performancePerDay.length; j++) {
        if (ResultPerDay[allData[i].performancePerDay[j].day]) {
          ResultPerDay[allData[i].performancePerDay[j].day] +=
            allData[i].performancePerDay[j].count
        } else {
          ResultPerDay[allData[i].performancePerDay[j].day] =
            allData[i].performancePerDay[j].count
        }
      }
    }
    return res
      .status(200)
      .json({ ResultPerHour, ResultPerDay, templateName: 'OverAll Result' })
  } catch {
    return res.status(404).json({ error: 'No data found' })
  }
}

export async function handleGetResultById(req, res) {
  let ResultPerHour = {}
  let ResultPerDay = {}

  const id = req.params.id

  try {
    let data = await Template.findById(id)
    let templateName = data.name

    for (let i = 0; i < data.performancePerHour.length; i++) {
      if (ResultPerHour[data.performancePerHour[i].time]) {
        ResultPerHour[data.performancePerHour[i].time] +=
          data.performancePerHour[i].count
      } else {
        ResultPerHour[data.performancePerHour[i].time] =
          data.performancePerHour[i].count
      }
    }

    for (let i = 0; i < data.performancePerDay.length; i++) {
      if (ResultPerDay[data.performancePerDay[i].day]) {
        ResultPerDay[data.performancePerDay[i].day] +=
          data.performancePerDay[i].count
      } else {
        ResultPerDay[data.performancePerDay[i].day] =
          data.performancePerDay[i].count
      }
    }
    return res.status(200).json({ ResultPerHour, ResultPerDay, templateName })
  } catch {
    return res.status(404).json({ error: 'No data found' })
  }
}
