declare module 'simple-mind-map/src/plugins/Select.js' {
  export default class { }
}
declare module 'simple-mind-map/src/plugins/RichText.js' {
  export default class { }
}
declare module 'simple-mind-map/src/plugins/AssociativeLine.js' {
  export default class { }
}
declare module 'simple-mind-map/src/plugins/Drag.js' {
  export default class { }
}
declare module 'simple-mind-map/src/plugins/KeyboardNavigation.js' {
  export default class { }
}
declare module 'simple-mind-map/src/plugins/Export.js' {
  export default class { }
}
declare module 'simple-mind-map/src/plugins/MiniMap.js' {
  export default class { }
}
declare module 'simple-mind-map/src/plugins/Watermark.js' {
  export default class { }
}
declare module 'simple-mind-map/src/plugins/TouchEvent.js' {
  export default class { }
}
declare module 'simple-mind-map/src/plugins/NodeImgAdjust.js' {
  export default class { }
}
declare module 'simple-mind-map/src/plugins/Search.js' {
  export default class { }
}
declare module 'simple-mind-map/src/plugins/Painter.js' {
  export default class { }
}
declare module 'simple-mind-map/src/plugins/Scrollbar.js' {
  export default class { }
}
declare module 'simple-mind-map/src/plugins/Formula.js' {
  export default class { }
}

declare module 'simple-mind-map/src/parse/xmind.js' {
  function parseXmindFile(): void
  function transformXmind(): void
  function transformOldXmind(): void
  function transformToXmind(): void
  export {
    parseXmindFile,
    transformXmind,
    transformOldXmind,
    transformToXmind,
  }
}
declare module 'simple-mind-map/src/parse/markdown.js' {
  function transformToMarkdown(data: Record<string, any>): string
  function transformMarkdownTo(content: string): Promise<Record<string, any>>
  export {
    transformToMarkdown,
    transformMarkdownTo,
  }
}
