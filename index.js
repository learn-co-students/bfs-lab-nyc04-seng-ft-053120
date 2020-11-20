function bfs(rootNode, vertices, edges){
    rootNode.distance = 0
    let queue = [rootNode]
    let allVertices = [rootNode]
    while (queue.length > 0) {
        let currentVertice = queue.shift()
        let adjacentVertices = findAdjacent(currentVertice.name, vertices, edges)
        queue = [...queue, ...adjacentVertices]
        markDistanceAndPredecessor(currentVertice, adjacentVertices)
        allVertices = [...allVertices, ...adjacentVertices]
    }
    return allVertices
}

function findAdjacent(query, vertices, edges) {
    let adjacentEdges = edges.filter(edge => edge.includes(query))
    let streetNames = adjacentEdges.map(edge => edge.find(street => street != query))
    let adjacentVertices = streetNames.map(streetName => vertices.find(vertice => vertice.name === streetName))
    return adjacentVertices.filter(adjacentVertice => adjacentVertice.distance === null)
}

function markDistanceAndPredecessor(predecessor, adjacentVertices) {
    for (let i = 0; i < adjacentVertices.length; i++) {
        adjacentVertices[i].distance = predecessor.distance + 1
        adjacentVertices[i].predecessor = predecessor
    }
    return adjacentVertices
}