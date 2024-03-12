declare module 'simple-mind-map/src/utils' {
  function nodeRichTextToTextWithWrap(html: string): string
  function textToNodeRichTextWithWrap(text: string): string
  function htmlEscape(html: string): any
}
