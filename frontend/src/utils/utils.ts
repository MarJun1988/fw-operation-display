/**
 * Generiert einen zufälligen Text mit 5-10 Zeichen
 */
export const generateRandomText = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const length = Math.floor(Math.random() * 6) + 5 // ergibt 5–10 Zeichen
  let result = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    result += characters[randomIndex]
  }

  return result
}

/**
 * Ausgabe von Meldungen nur im DEV Mode
 */
export const devLog = (...args: any[]) => {
  if (import.meta.env.DEV) {
    console.log(...args)
  }
}
