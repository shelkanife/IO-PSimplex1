function generateTable(problem,nvariables,nconstrains,varHolgura){
    let table = document.createElement('table')
    let trHeading = document.createElement('tr')
    table.appendChild(trHeading)
    let _=document.createElement('th')
    trHeading.appendChild(_)

    for(let i=0;i<nvariables;i++){
        let thX=document.createElement('th')
        thX.textContent=`X${i+1}`
        trHeading.appendChild(thX)
    }
    for(let i=0;i<nconstrains;i++){
        let thS=document.createElement('th')
        thS.textContent=`S${i+1}`
        trHeading.appendChild(thS)
    }
    let thZ=document.createElement('th')
    thZ.textContent='Z'
    trHeading.appendChild(thZ)
    
    let trObjective = document.createElement('tr')
    _=document.createElement('td')
    trObjective.appendChild(_)
    
    for(let item of problem[0]){
        let td=document.createElement('td')
        td.textContent=item
        trObjective.appendChild(td)
    }
    table.appendChild(trObjective)
    
    for(i=0;i<nconstrains;i++){
        let trConstrains = document.createElement('tr')
        table.appendChild(trConstrains)
        let td=document.createElement('td')
        td.textContent=varHolgura[i]
        trConstrains.appendChild(td)
        
        for(let item of problem[i+1]){
            let td=document.createElement('td')
            td.textContent=item
            trConstrains.appendChild(td)
        }
    }
    return table
}

function generateObjectiveFunction(variables){
    const p=document.createElement('p')
    const maxLabel=document.createElement('label')
    maxLabel.textContent='Max Z ='
    p.appendChild(maxLabel)
    for(let i=0;i<variables;i++){
        const xLabel=document.createElement('label')
        if(i+1<variables) xLabel.textContent=`X${i+1} + `
        else xLabel.textContent=`X${i+1}`
        const xInput=document.createElement('input')
        xInput.className='variable'
        p.appendChild(xInput)
        p.appendChild(xLabel)
    }
    return p
}

function createProblem(layout,variables,constrains){
    layout.appendChild(generateObjectiveFunction(variables))
    for(i=0;i<constrains;i++){
        const p=document.createElement('p')
        for(let j=0;j<variables;j++){
            const xLabel=document.createElement('label')
            const xInput=document.createElement('input')
            xInput.className='constrain'
            if(j+1<variables) xLabel.textContent=`X${j+1} + `
            else xLabel.textContent=`X${j+1} <=`
            p.appendChild(xInput)
            p.appendChild(xLabel)
        }
        const xInput=document.createElement('input')
        xInput.className='constrain'
        p.appendChild(xInput)
        layout.appendChild(p)
    }
    const button=document.createElement('button')
    button.textContent='Solve'
    layout.appendChild(button)
    button.addEventListener('click',e=>solve(e))
}

function solve(e){
    
}