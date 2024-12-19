import { ofetch } from "ofetch"
import { Agent } from "undici"

const secureAgent = new Agent({
  connect: {
    rejectUnauthorized: false,
    key: process.env.INCUS_KEY,
    cert: process.env.INCUS_CERT,
  },
})

export const callIncus = ofetch.create({
  baseURL: `${process.env.INCUS_URL}/1.0`,
  dispatcher: secureAgent,
  keepalive: true,
  headers: {
    "Content-Type": "application/json",
  },

  parseResponse: async (response) => {
    const data = JSON.parse(response)
    return data.metadata
  },
})
