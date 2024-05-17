import mongoose from 'mongoose'

const templateSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    totalSend: { type: Number, default: 0 },
    subject: { type: String, required: true },
    mailBody: { type: String, required: true },
    redirect: { type: String, required: true },
    performancePerHour: [
      {
        time: { type: String, required: true },
        count: { type: Number, required: true, default: 0 },
      },
    ],
    performancePerDay: [
      {
        day: { type: String, required: true },
        count: { type: Number, required: true, default: 0 },
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Template = mongoose.model('Template', templateSchema)

export default Template
