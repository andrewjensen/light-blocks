export interface ProgramMeta {
  id: number
  title: string
  source: string
}

export interface LightEnvironment {
  initialize: () => Promise<void>

  getReachableLightIds: () => number[]

  lightOn: (lightId: number | null) => Promise<unknown>
  lightOff: (lightId: number | null) => Promise<unknown>

  setColor: (lightId: number | null, hue: number, saturation: number, brightness: number) => Promise<unknown>
}
