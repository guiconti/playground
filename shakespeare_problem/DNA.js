class DNA {
  constructor(composition){
    this.genes = [];
    this.fitness = 0;
    for(let i = 0; i < composition.length; i++){
      this.genes[i] = newChar();
    }
  }

  getDNA(){
    return this.genes.join('');
  }

  calculateFitness(target){
    let score = 0;
    for (let i = 0; i < this.genes.length; i++){
      if (this.genes[i] == target.charAt(i))
        score++;
    }
    this.fitness = score / target.length;
    this.fitness = Math.pow(this.fitness, 50);
  }

  crossover(partner){
    let child = new DNA(this.genes.length);
    
    let midpoint = Math.floor(Math.random() * this.genes.length);

    for (let i = 0; i < this.genes.length; i++)
      child.genes[i] = (i > midpoint)?this.genes[i]:partner.genes[i];

    return child;
  }

  mutate(mutationRate){
    for (let i = 0; i < this.genes.length; i++){
      if (Math.random() < mutationRate){
        //console.log('Mutate');
        this.genes[i] = newChar();
      } else {
        //console.log('Not mutate');
      }
    }
  }
}

function newChar() {
  let min = 63;
  let max = 122;
  let c = Math.floor(Math.random() * (max - min + 1)) + min;
  if (c === 63) c = 32;
  if (c === 64) c = 46;

  return String.fromCharCode(c);
}

module.exports = DNA;