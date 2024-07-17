import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import moment from 'moment-timezone' 
import fs from 'fs' 

//OwnerShip
global.owner = [
  [process.env.OWNER_NUMBER || '919637987574', process.env.OWNER_NAME || 'Developer Shizo 🤖', true],
  ['919637987574', 'Shizo Techie ❤️✨', true]
]
global.mods = []
global.prems = []

global.author = process.env.OWNER_NAME || 'Shizo The Techie'
global.botname = process.env.BOT_NAME || 'OREO-BOT'
global.oname = author
global.bname = botname

//Extra Shortcuts
global.smlink = process.env.SOCIAL_MEDIA_LINK || 'https://instagram.com/shizo_the_techie'
global.gclink = process.env.GROUP_LINK || 'https://chat.whatsapp.com/JnBffMgpiCgBAra3GQC9rW'
 
//Apikeys
global.shizokeys = 'shizo'

//Sticker Watermarks
global.packname = process.env.BOT_NAME || 'OREO-BOT 🥵'
global.stkpack = process.env.BOT_NAME || 'OREO-BOT 🥵'
global.stkowner = process.env.OWNER_NAME || '© Shizo The Techie'
global.sessionid = process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0hBbU9ncG1VWUJqVTM0S0luaWlSdkFkVG16eWVzWCt6OXNBSEFMdmJWMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYjJ1eWhONlYwMUV4aittSUdQdGdLelRuSCtKc0NKbnRvdDdwbUpBcDlEaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3RFpoTU9UQ0lSV2k1emNEQTJLS0ZhT0hkNkRpNk9yYTF0YmxGc2RVRGwwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJoN25JeUZ0cy9MSDM4V2h4bUZvT2hyOVJPd0VUckw1cDQxVFM5UmtjMUNrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVQeGh5VmovNnRONEtmbnJXYXBTdHBvVGFkZjBUNkhpL2xTdEgvYzhzbUE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBBOHEvelQ0Sytvelp2WFU0K2Zvd3hhdnB0dU1Vblk0RWxCanRpWnFEbDA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUtQVk1ydlJyUmZ1eHg4Q0VvbGtvMGNVNDhMMjM4UHlzWVJjZjZRVUYzST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiblkwYkxpaVVFdk1nUGc0S293Uis4MnNKU3VwODNLWTZnN1Uxa3FBNC9RMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNwK2VUdjNwTzBzVEpQNGJHWkx5MUs2cllFMzIzd3Joak82eitDdUVSK3hvVTZuNEhjSTFiZkxKekJLZzNoT01MWXo5dmJ2TDl5aloxb1JUdW9xQkRRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTcxLCJhZHZTZWNyZXRLZXkiOiIzSDVIaXBWdG5saEZaMWwzMzhEay9DTUE2cjAvRzJwb2VTVld6dGZHWmZ3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJoM3NxMDgyNFRJQ0N5cTZQU2FqbFZnIiwicGhvbmVJZCI6ImI5ZTU1Nzc5LTE2NjUtNDNmZS05MjIwLTYzZjlkODVhZGY4OSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrejFFZVlmUVcxb3NNVXVBeU5YOTF4WWdiQWM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiREJBWVFyTkNNQWRTVFRaQ3ZqMmh3d2dUaGRFPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkRRQUw4WFNaIiwibWUiOnsiaWQiOiIyMzc2OTM3NTUzOTg6MjBAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiTm8gbmFtZSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTmI1dC9FREVQVHEyclFHR0FNZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5Ijoia2NDUytoUWprcXhnZmdLcFhzd2U5V0JNZTNCUnhtK3k0WG9HTCs1UFcyOD0iLCJhY2NvdW50U2lnbmF0dXJlIjoiZ2c3N3FESjNJcDdxeGRUdGptelBESHRTRDlwVWVxK0p1ZXJqWlZvUUFjK1JySFdEeE1oWlN5dWV3ajhyS0xzRW1HK241cmx1dGlvd1Y3R3NOQWJKREE9PSIsImRldmljZVNpZ25hdHVyZSI6IlVGbXh6QzB1bjRqM2FENlgyNEVseTJGbEhqVGhmbnlhdEttUjl3Y0Npb0x2NUIycHk0RVB0R1dETVoyRURubVhRRTZaWGtOZVhFTFlLMDdkcmtYSERnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM3NjkzNzU1Mzk4OjIwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlpIQWt2b1VJNUtzWUg0Q3FWN01IdlZnVEh0d1VjWnZzdUY2QmkvdVQxdHYifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjExNTI4OTcsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRHJzIn0='

//Watermark
global.maker = process.env.MAKER || 'Made with ❤️ by OREO-BOT'

//global emojis
global.wait = '*⌛ _Charging..._*\n*▰▰▰▱▱▱▱▱*'
global.rwait = '⌛'
global.dmoji = '🤭'
global.done = '✅'
global.error = '❌' 
global.xmoji = '🔥' 

//management
global.bug = '*!! Sorry 💢 !!*\nSomething went wrong 🌋'
global.stop = '*!! 🎭 Unfortunately 💔 !!*\nBot system is not Responding 🙃'

//TimeLines
global.botdate = `*⫹⫺ Date:*  ${moment.tz('Asia/Kolkata').format('DD/MM/YY')}`
global.bottime = `*⫹⫺ Time:* ${moment.tz('Asia/Kolkata').format('HH:mm:ss')}`

//Hosting Management
global.serverHost = 1
global.getQrWeb = 0
global.renderHost = 0
global.replitHost = 0

//global.pairingNumber = "" //put your bot number here

global.mods = ['919637987574','919637987574']
global.prems = ['919637987574','919637987574']
global.allowed = ['919637987574','919637987574']
global.keysZens = ['c2459db922', '37CC845916', '6fb0eff124']
global.keysxxx = keysZens[Math.floor(keysZens.length * Math.random())]
global.keysxteammm = [
  '29d4b59a4aa687ca',
  '5LTV57azwaid7dXfz5fzJu',
  'cb15ed422c71a2fb',
  '5bd33b276d41d6b4',
  'HIRO',
  'kurrxd09',
  'ebb6251cc00f9c63',
]
global.keysxteam = keysxteammm[Math.floor(keysxteammm.length * Math.random())]
global.keysneoxrrr = ['5VC9rvNx', 'cfALv5']
global.keysneoxr = keysneoxrrr[Math.floor(keysneoxrrr.length * Math.random())]
global.lolkeysapi = ['GataDios']



let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
