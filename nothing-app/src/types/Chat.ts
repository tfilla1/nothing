
export default interface Chat {
  text: string,
  timestamp: Date | number
  userId: number
}

export const newChat = (text: string, userId: number): Chat => ({
  text,
  userId,
  timestamp: Date.now()
})
