const myTxt = document.querySelector('#txt')
const myHtml = document.querySelector('#html')
const convertBtn = document.querySelector('#convert')
const err = document.querySelector('.err')

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
    newtxt.replace('\n', '</p><p>')
    let newp = newtxt.replace(/\n\n/g, '</p><p>')
    myHtml.value = newp.replace(/\n/g, '<br>')
    console.log(newtxt.indexOf('\n'))
})


document.querySelectorAll('textarea').forEach(elem => elem.addEventListener('focus', (e) => e.target.select()))

myTxt.addEventListener('focus', (e) => err.classList.remove('displayError'))


const displayError = () => {
    err.classList.add('displayError')
}