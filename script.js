const myTxt = document.querySelector('#txt')
const myHtml = document.querySelector('#html')
const convertBtn = document.querySelector('#convert')


convertBtn.addEventListener('click', () => {
    let splitedTxt = myTxt.value.split(' ')
    splitedTxt.unshift('<p>')
    splitedTxt.push('</p>')

    let newtxt = splitedTxt.join(' ')
    console.log(newtxt)
    newtxt.replace('\n', '</p><p>')
    let newp = newtxt.replace(/\n\n/g, '</p><p>')
    myHtml.value = newp.replace(/\n/g, '<br>')
    console.log(newtxt.indexOf('\n'))
})


myHtml.addEventListener('focus', (e) => e.target.select())