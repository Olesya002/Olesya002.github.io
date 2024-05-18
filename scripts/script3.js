function randint(min,max) {
  return Math.round(Math.random() * (max - min) + min)
}
  
let signs = [
  "+",
  "-",
  "/",
  "*",
]

function random_sign() {
    return signs[randint(0, 3)]
}

let question = document.querySelector('.question')
let answer = document.querySelectorAll('.answer')
let start = document.querySelector('.container_h3')
let container_main = document.querySelector('.container_main')
let start_button = document.querySelector('.start_btn')

class Quiz{
  constructor(){
  let a = randint(1,30)
  let b = randint(1,30)
  let sign = random_sign()
  this.question = `${a} ${sign} ${b}`
  if (sign == "+"){
      this.correct_var = a + b
  }
  if (sign == "-"){
      this.correct_var = a - b
  }
  if (sign == "/"){
      this.correct_var = (a / b).toFixed(1)
  }
  if (sign == "*"){
      this.correct_var = a * b
  }

  this.massive_answers=[
      randint(this.correct_var - 15, this.correct_var - 1),
      randint(this.correct_var - 15, this.correct_var - 1),
      randint(this.correct_var - 15, this.correct_var - 1),
      randint(this.correct_var - 15, this.correct_var - 1),
      this.correct_var]
}
  display(){
      question.innerHTML = this.question
      for (let i = 0; i < this.massive_answers.length; i += 1){
          answer[i].innerHTML = this.massive_answers[i]}
  }
}



start_button.addEventListener('click', function() {

    container_main.style.display = 'block'
    start.style.display = 'none'
    start_button.style.display = 'none'

    current_question = new Quiz()
    current_question.display()


    correct_answers_given = 0
    total_answers_given = 0


    setTimeout(function() {

container_main.style.display = 'none'
start.style.display = 'flex'
start_button.style.display = 'inline-block'

start.innerHTML = `Вы дали ${correct_answers_given} правильных ответов из ${total_answers_given}. Точность - ${Math.round(correct_answers_given * 100 / total_answers_given)}%.`
    }, 10000)
})


for (let i = 0; i < answer.length; i += 1) {
  answer[i].addEventListener('click',function(){
      if (answer[i].innerHTML == current_question.correct_var){
        correct_answers_given += 1
          anime({
              targets: answer[i],
              background: "#00ff00",
              color: "#ffffff",
              duration: "500",
              delay: "100"
            }).
            finished.then(function(){
                answer[i].style.color = "#000000"
                answer[i].style.background = "#ffffff"
            })
        }
      
        else{
            anime({
                targets: answer[i],
                background: "#f82d0b",
                color: "#ffffff",
                duration: "500",
                delay: "100"
            }).
            finished.then(function(){
                answer[i].style.color = "#000000"
                answer[i].style.background = "#ffffff"
            })
        }
        total_answers_given += 1
        current_question = new Quiz()
        current_question.display()
    })
}