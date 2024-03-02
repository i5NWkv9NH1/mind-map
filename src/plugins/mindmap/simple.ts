import type MindMap from 'simple-mind-map'

export class SimplePlugin {
  public static instanceName: string = 'simple'

  constructor({ _ }: { _: MindMap }) {
  }

  beforePluginRemove() { }

  beforePluginDestroy() { }
}

SimplePlugin.instanceName = 'Simple'
