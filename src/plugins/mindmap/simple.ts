import MindMap from 'simple-mind-map'
export class SimplePlugin {
  public static instanceName: string = 'simple'

  constructor({ mindMap }: { mindMap: MindMap }) {
    console.log('mind-map::plugins:', 'simple')
  }

  beforePluginRemove() { }

  beforePluginDestroy() { }

}

SimplePlugin.instanceName = 'Simple'
