const generate = document.querySelector('#generate')
const open = document.querySelector('#open')
const input = document.querySelector("#input")
const result = document.querySelector("#result")
const toremove = document.querySelector("#toremove")
const doubleslink = document.querySelector("#doubles")
const p = document.querySelector("p")

//nbr of links
const generateNbr = document.querySelector(".generate")
const resultNbr = document.querySelector(".result")
const doublesNbr = document.querySelector(".doubles")
 
//to html
const myTxt = document.querySelector('#txt')
const myHtml = document.querySelector('#html')
const convertBtn = document.querySelector('#convert')

const addresses = document.querySelector("#addresses")
const clean_addresses = document.querySelector("#clean_addresses")

open.onclick = () =>{ 
    let links = input.value.split('\n') 
    let open =  confirm(`Open All ${links.length} Links!!`)
    
    //confirm the opening action
    if(open){
        for(let i=0; i<links.length; i++){ 
            if(links[i].substring(0,5) === ''){
                continue
            }
            else if(links[i].substring(0,5) === "https" || links[i].substring(0,5) === "http:"){
                window.open(links[i], '_blank') 						
            }
            else {
                window.open("https://"+links[i], '_blank')
            }
        }
    }
}

 
generate.onclick = () => {
    removeDuplication()
}

const removeDuplication = () => {  
    doubleslink.value = ''
    result.value = ''
     
    let links = toremove.value.split('\n')
    let output = []
    let doubles = []
    
    toremove.disabled = true
    
    for(let  i=0; i<links.length; i++){
    
        //to check if the link exist
        let exist = true
        
        let domain = links[i].includes("https") ? links[i].substr(8,20) : links[i].substr(0,20)
        for(let  j=0; j<output.length; j++){
            if(domain.trim() === output[j].substr(8,20).trim()){
                exist = false
            }
        }
        
        //if not exist in the output push to it
        if(exist) output.push(`${links[i]} \n`)
        
        //if it exist in the output push it to the doubles array
        else doubles.push(`${links[i]} \n`)
    }  

     output.forEach(link => result.value += link) 
    doubles.forEach(link => doubleslink.value += link)
    
    generateNbr.textContent = links.length
    resultNbr.textContent = output.length 
    doublesNbr.textContent = doubles.length 
} 
   
//target address
 document.querySelector('.target').addEventListener('click', (e)=> e.target.value ? e.target.select() : null )

convertBtn.addEventListener('click', ()=>{ 
    let splitedTxt = myTxt.value.split(' ')
    splitedTxt.unshift('<p>')
    splitedTxt.push('</p>') 
    
    let newtxt = splitedTxt.join(' ')
    console.log(newtxt)
    newtxt.replace('\n', '</p><p>')
    let newp = newtxt.replace(/\n\n/g, '</p><p>')
    myHtml.value = newp.replace(/\n/g, '<br>')
    console.log(newtxt.indexOf('\n')) })
 