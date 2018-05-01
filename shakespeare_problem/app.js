const Population = require('./Population');

let targetPhrase = 'O milk feeda intencionalmente pronto falei';
let populationSize = 2000;
let mutationRate = 0.01;

let population = new Population(targetPhrase, populationSize, mutationRate);

while(!population.isFinished()){

  // Generate mating pool
  population.naturalSelection();
  //Create next generation
  population.generate();
  // Calculate fitness
  population.calculateFitness();
  // Check if we achieved the perfect score
  population.calculatePopulationChampion();

  console.log(population.getBest());
  console.log(population.getGenerations());

}

console.log('Done');