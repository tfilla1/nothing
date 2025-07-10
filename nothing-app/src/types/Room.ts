export interface Room {
  key: string,
  title: string,
  subtitle: string,
  icon: string,
  start?: Date,
  end?: Date
}

export const newRoom = (key: string, title: string, subtitle?: string, icon?: string) => ({
  key,
  title,
  subtitle: subtitle ?? '',
  icon: icon ?? '$nothing',
})
