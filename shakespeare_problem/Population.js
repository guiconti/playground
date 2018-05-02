const DNA = require('./DNA');

class Population{

  constructor(target, populationSize, mutationRate){
    this.target = target;
    this.mutationRate = mutationRate;
    this.perfectScore = 1;
    this.generations = 0;
    this.finished = false;
    this.best = '';

    this.population = [];
    for (let i = 0; i < populationSize; i++){
      this.population.push(new DNA(target));
    }

    this.matingPool = [];
    this.calculateFitness();
  }

  calculateFitness(){
    //  Calculate population fitness
    for(let i = 0; i < this.population.length; i++){
      this.population[i].calculateFitness(this.target);
    }
  }

  naturalSelection(){
    this.matingPool = [];

    let fitnessSum = 0;

    for(let i = 0; i < this.population.length; i++)
      fitnessSum += this.population[i].fitness;

    for(let i = 0; i < this.population.length; i++)
      this.population[i].calculateProbability(fitnessSum);

    for(let i = 0; i < this.population.length; i++){
      let randomPick = Math.random();
      let index = 0;
      while (randomPick > 0){
        randomPick -= this.population[index].reproduceProbability;
        index++;
      }

      index--;
      this.matingPool.push(this.population[index]);
    }
  }

  generate(){
    for(let i = 0; i < this.population.length; i++){
      //  Get two random partners
      let firstPartner = this.matingPool[Math.floor(Math.random() * this.matingPool.length)];
      let secondPartner = this.matingPool[Math.floor(Math.random() * this.matingPool.length)];
      let child = firstPartner.crossover(secondPartner);
      child.mutate(this.mutationRate);
      this.population[i] = child;
    }
    this.generations++;
  }

  calculatePopulationChampion(){
    let bestScore = -1;
    let bestScoreIndex;

    for (let i = 0; i < this.population.length; i++){
      if (this.population[i].fitness > bestScore){
        bestScore = this.population[i].fitness;
        bestScoreIndex = i;
      }
    }

    this.best = this.population[bestScoreIndex].getDNA();
    if (bestScore == this.perfectScore){
      this.finished = true;
    }
  }

  getBest(){
    return this.best;
  }

  getGenerations(){
    return this.generations;
  }

  isFinished(){
    return this.finished;
  }

}

module.exports = Population;