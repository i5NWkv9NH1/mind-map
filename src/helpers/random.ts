export function generateRandomData(depth = 6, maxChildren = 6) {
  const generateNode = (id, level) => ({
    id,
    name: `Node ${id}`,
    children: level < depth
      ? Array.from({ length: Math.floor(Math.random() * maxChildren) + 1 }, (_, i) =>
        generateNode(id * 10 + i + 1, level + 1))
      : [],
  })

  return generateNode(1, 1)
}

export function flattenTree(node, level = 0) {
  if (!node.children)
    return [{ ...node, level }]

  return [
    { ...node, level },
    ...node.children.flatMap(child => flattenTree(child, level + 1)),
  ]
}
