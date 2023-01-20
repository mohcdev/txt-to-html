const btnGenerate = document.querySelector('#btn_generate')
const tableBtn = document.querySelector('.fill')
const table1 = document.querySelector('.table1 tbody')
const table_best = document.querySelector('.table_best tbody')

let targetColumn = []

///get the target column
btnGenerate.addEventListener('click', () => {
    let data = document.querySelector('textarea').value.split('\n')

    targetColumn = []
    for (let i = 8; i < data.length - 1; i++) {
        targetColumn.push(data[i].split(',')[2])
    }
    console.log('generate')
    setTimeout(generate7141, 3000)
})


/// get the result only for 71 & 41

let resultOf7141 = []
function generate7141() {
    resultOf7141 = []
    console.log('generate7141')

    targetColumn.forEach(elem => {
        let deploy = {
            deployId: null,
            entityId: null,
            count: 1
        }
        let foundState = {
            found: false,
            index: null
        }
        let deploy_ID = elem.substr(elem.search('_') + 1, 8)

        if (elem.substr(-2, 2) == "71" || elem.substr(-2, 2) == "41") {
            foundState = checkIfDeployExist(deploy_ID)

            foundState.found ? resultOf7141[foundState.index].count++ :
                (
                    deploy.deployId = deploy_ID,
                    deploy.entityId = elem.substr(-2, 2),
                    resultOf7141.push(deploy)
                )
        }
    });
}

function checkIfDeployExist(deployID) {
    const deploy = {
        found: false,
        index: null
    }

    resultOf7141.forEach((elem, i) => {
        if (elem.deployId == deployID) {
            deploy.found = true
            deploy.index = i

        }
    })
    return deploy
}


tableBtn.addEventListener('click', fillTable)

function fillTable() {
    resultOf7141.forEach(elem => {
        let tr = document.createElement('tr')
        let deployIdTd = document.createElement('td')
        let entityIdTd = document.createElement('td')
        let nbrLeadTd = document.createElement('td')

        deployIdTd.textContent = elem.deployId
        entityIdTd.textContent = elem.entityId
        nbrLeadTd.textContent = elem.count

        deployIdTd.textContent.includes('_') ? tr.style.background = 'rgb(240, 135, 135)' : null

        tr.appendChild(deployIdTd)
        tr.appendChild(entityIdTd)
        tr.appendChild(nbrLeadTd)

        //if nbr leads >= 2 add it to table best 
        if (elem.count >= 2) {
            table_best.appendChild(tr)
        }
        else
            table1.appendChild(tr)

    })
}

