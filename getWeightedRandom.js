const weights = JSON.parse(process.env.weights);

function getWeightedRandomIndex(weights) {
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    const normalizedWeights = weights.map(weight => weight / totalWeight);
    const cumulativeWeights = [];
    normalizedWeights.reduce((sum, weight, index) => {
        sum += weight;
        cumulativeWeights[index] = sum;
        return sum;
    }, 0);
    const random = Math.random();
    for (let i = 0; i < cumulativeWeights.length; i++) {
        if (random <= cumulativeWeights[i]) {
            return i;
        }
    }
    throw new Error('Invalid weights array');
}

const index = getWeightedRandomIndex(weights);
console.log(`::set-output name=index::${index}`);
