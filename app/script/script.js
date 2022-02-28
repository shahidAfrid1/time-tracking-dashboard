let timeFrame = 'weekly'
const dashboard = document.querySelector('.dashboard')
let cards;

let data = {}
fetch("./app/script/data.json")
.then( response => response.json())
.then( jsonData => {
     jsonData.forEach(element => {
         dashboard.insertAdjacentHTML('beforeend',
         createCard(element,timeFrame))
     })
     jsonData.forEach(element => {
         data[element.title] = element.timeframes
     })

     cards = document.querySelectorAll('.item')
})


const menuBtn = document.querySelectorAll('.button')
menuBtn.forEach(btn =>{
    btn.addEventListener('click', menuOnClick)
})

function menuOnClick(event){
    menuBtn.forEach(element =>{
        element.classList.remove("active")
    })
    event.target.classList.add("active")
    timeFrame = event.target.innerText.toLowerCase()
    updateCards(timeFrame)
}

function updateCards(timeFrame){
    cards.forEach(card => {
        updateCard(card,timeFrame)
    })
}

function updateCard(card , timeFrame){
    let title = card.querySelector('.title').innerText
    let current = data[title][timeFrame]['current']
    let previous = data[title][timeFrame]['previous']


    const timeFrameMsg = {
        'daily': 'Yesturday',
        'weekly': 'Last week',
        'monthly': 'Last month'
    }

    const hourElement = card.querySelector('.current')
    hourElement.innerText = `${current}hrs`

    const msgElement = card.querySelector('.previous')
    msgElement.innerText = `${timeFrameMsg[timeFrame]} - ${previous}hrs`

}

function createCard(element , timeFrame){

    let title = element['title']
    let current = element['timeframes'][timeFrame]['current']
    let previous = element['timeframes'][timeFrame]['previous']

    const timeFrameMsg = {
        'daily': 'Yesturday',
        'weekly': 'Last week',
        'monthly': 'Last month'
    }
    return `       
 <div class="item ${title.toLowerCase().replace(/\s/g, '')}">
    <div class="bg-box bg-color-img"></div>
    <div class="status-box">
      <div class="title">
        <h4>${title}</h4>
        <div class="dot">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div class="time">
        <div class="current">${current}hrs</div>
        <div class="previous">${timeFrameMsg[timeFrame]} - ${previous}hrs</div>
      </div>
    </div>
  </div>`
}