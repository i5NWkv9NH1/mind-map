export function generateRandomData(depth = 6, maxChildren = 6) {
  // @ts-ignore
  const generateNode = (id, level) => ({
    id,
    name: `Node ${id}`,
    children: level < depth
    // @ts-ignore
      ? Array.from({ length: Math.floor(Math.random() * maxChildren) + 1 }, (_, i) =>
        generateNode(id * 10 + i + 1, level + 1))
      : [],
  })

  // @ts-ignore
  return generateNode(1, 1)
}

// @ts-ignore
export function flattenTree(node, level = 0) {
  if (!node.children)
    return [{ ...node, level }]

  return [
    { ...node, level },
    ...node.children.flatMap((child: any) => flattenTree(child, level + 1)),
  ]
}
