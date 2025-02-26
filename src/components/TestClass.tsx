export class Person{
  name: string
  age: number

  constructor(name:string, age: number){
    this.name = name
    this.age = age
  }
  skibi(): void {
    console.log( `chipi ${this.name} chapa ${this.age}`)
  } 
}