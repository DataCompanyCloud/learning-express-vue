class Data {
  dia: number
  mes: number
  ano:number

  constructor(dia: number, mes: number, ano: number) {
      this.dia = dia 
      this.mes = mes 
      this.ano = ano 
  }
}


const aniversario = new Data(3, 11, 1991)
aniversario.dia = 4
console.log(aniversario.dia)
console.log(aniversario)