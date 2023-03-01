const myTxt = document.querySelector('#txt')
const myHtml = document.querySelector('#html')
const convertBtn = document.querySelector('#convert')
const err = document.querySelector('.err')

//
const spamKeywordsContainer = document.querySelector('.Spam_Keywords')
const nothingFound =  document.querySelector('.Spam_Keywords p')
const spamBtn  = document.querySelector("#Spam")
const removeBtn  = document.querySelector("#Remove")


convertBtn.addEventListener('click', () => {
    if (myTxt.value.trim() == '') {
        displayError()
        return
    }
    let splitedTxt = myTxt.value.split(' ')

    //splitedTxt.unshift('<p>')
    //splitedTxt.push('</p>')
    //avoid pace in the start and end of the string after <p>

    splitedTxt[0] = '<p>' + splitedTxt[0]
    splitedTxt[splitedTxt.length - 1] = splitedTxt[splitedTxt.length - 1] + '</p> '
    console.log(splitedTxt)
    let newtxt = splitedTxt.join(' ')
    console.log(newtxt)
    newtxt.replace('\n', '</p>\n<p>')
    myHtml.value = newtxt.replace(/\n\n/g, '</p>\n<p>')
   // myHtml.value = newp.replace(/\n/g, '\n')
    console.log(newtxt.indexOf('\n'))
})

document.querySelectorAll('textarea').forEach(elem => elem.addEventListener('focus', (e) => e.target.select()))

myTxt.addEventListener('focus', (e) => err.classList.remove('displayError'))

const displayError = () => {
    err.classList.add('displayError')
}

const spamArray = [ 'Debt','Deal','millions','offer','offers','credit','Discount',
'Credit','Trial','Warranty','Unlimited','income','financial','Ad','ads','Prices','%','$',
'Certified','Billing','Loans','performance','financial','Cheap','price','now','get',
'call','today ','Extra','dollar','Billion','income','Cash','price','sales',
'bucks','bonus','Cents','earn','Giveaway','gift','membership','investment', 'free',
'refund','trial','sales','winner','profit','earnings','Prize','limited','freedom','money','earn', 'amazing', 'click', 'Weight','Bargain', 'thousands','opportunity', 'only',
'action','now','order','terms','debt','billionaire','finance', 'today', 'check','traffic','urgent','open' , 'claims','billing','medical',  'fast','insurance', 'lottery','member','million','Success','chance', 'deal','save','prize', 'success', 'won','leave','new','bank', 'loan','purchase','soon', 'great','£','per','costs','billion', 'guarantee','get','boss','buy', 'life', 'off', 'all', 'human','request','access', 'please', 'legal', 'important', 'you']

let foundKeywords = []


//split the text by space
spamBtn.addEventListener('click', () => {

    checkText()

    let splitedPhrases = myTxt.value.split('\n')

     let splitedTxt = []
     //-----
     //-----
     //-----

     splitedPhrases.forEach(phrase => phrase.trim().split(' ').forEach(item => splitedTxt.push(item)) )
      
    console.log(splitedTxt)

    foundSpamKeywords(splitedTxt)

    //remove child nodes : spam keywords 
    const colors = ['#f5b2b2','#b2dcf5','#b2f5b7','#e5f5b2','#646e9f','#f5beb2','#f4b2f5']

    Array.from(document.querySelectorAll('.Spam_Keywords span'), i => i.remove())

    for (let i = 0; i < foundKeywords.length; i++) {
        let randomColor = Math.floor(Math.random() * colors.length)
        let span = document.createElement('span')
        span.textContent = foundKeywords[i].value
        span.style.backgroundColor = colors[randomColor] 
        spamKeywordsContainer.appendChild(span)
    }

    !foundKeywords.length ? nothingFound.classList.add('visible') :nothingFound.classList.remove('visible')
})

//remove spam keywords btn
removeBtn.addEventListener('click', () => {

    checkText()

    for (let i = 0; i < foundKeywords.length; i++) {
        myTxt.value = myTxt.value.replaceAll(foundKeywords[i].value,'')
    }
})

//check for spam keywords
const foundSpamKeywords = (splitedTxt) => {
    foundKeywords = []

    for (let i = 0; i < splitedTxt.length; i++) {
        let keyword = {
            value : '',
            index : null
        }

        if(spamArray.includes(splitedTxt[i].toLowerCase()) || spamArray.includes(splitedTxt[i].toLowerCase().substring(0, splitedTxt[i].length-1))){
            keyword.value = splitedTxt[i]
            keyword.index = i
            foundKeywords.push(keyword)
        }
    }
}

//check if the input field is not empty
const checkText = () => {
    if(myTxt.value.trim() == '') {
        displayError()
        return
    }
}

myTxt.addEventListener('change', ()=>{
    nothingFound.classList.remove('visible')
})