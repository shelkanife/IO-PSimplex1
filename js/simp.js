Array.prototype.insert = function(start,item){
    this.splice(start,0,item)
}

function generateIdentity(number){
    let matrix = []
    let insideMatriz = []
    for(i=0;i<number;i++){
        for(j=0;j<number;j++){
            insideMatriz.push(i===j? 1:0)
        }
        matrix.push(insideMatriz)
        insideMatriz = []
    }
    return matrix
}

function makeBaseMatriz(variables,constrains){
    let aVariables = [],aConstrains = []
    aVariables.push(Array.from(variables).map(variable => parseInt(variable.value)))
    let aAux=Array.from(constrains).map(constrain => parseInt(constrain.value))
    
    const SLICE = variables.length+1 
    for (let i = 0; i < aAux.length; i += SLICE) 
        aConstrains.push(aAux.slice(i, i + SLICE))

    return aVariables.concat(aConstrains)
}

function makeTable(problem,identity){
    problem[0] = problem[0].map(item => item*-1)
    problem[0]=problem[0].concat(Array(identity.length+1).fill(0))
    let lastItem = problem[1].length-1
    for(let j=1;j<identity[0].length+1;j++)
        for(let h=0;h<identity[0].length;h++)
            problem[j].insert(lastItem+h,identity[j-1][j-1,h])
                
    return problem
}

function findMin(row){
    let min=[]
    min[1]=Math.min(...row)
    min[0]=row.indexOf(min[1])
    return min
}

function getRightSide(problem){
    return problem.slice(1).map(row => row.slice(-1)[0])
}

function getPivotComlumn(index,problem){
    //Retorna una lista con los valores de la columna seleccionada como pivote
    return problem.slice(1).map(row => row[index])
}

function findMinnimun(indexes,divisiones,pivotes){
    let allIsNull=!divisiones.length && !pivotes.length
    
    if(!allIsNull){
        let min = divisiones[0],
        index = null,
        pivote = null;
        
        for(let i=0;i<divisiones.length;i++){
            if(min == null)
            continue
            else
            if(divisiones[i] != null){
                
                if(divisiones[i] <= min){
                    min = divisiones[i];
                    index = indexes[i];
                    pivote = pivotes[i];
                }
            }
        }
        return [index+1,pivote]
    }else{
        hasSolution = false
        return
    }
}

function findPivot(rightSide,pivotColumn){

    let index = [],
        divisiones = [],
        pivotes = [];
    for(let i=0;i<rightSide.length;i++){
        if(pivotColumn[i] != 0 && pivotColumn[i] > 0){
            divisiones.push(rightSide[i]/pivotColumn[i])
            index.push(i)
            pivotes.push(pivotColumn[i])
        }
    }
    return findMinnimun(index,divisiones,pivotes)
}

function getRowPivoted(row,coeficient){
    // Retorna una lista con los valores de la fila pivoteada
    return row.map(component => component/coeficient)
}

function getNewFO(oldFO,newRowPivoted,taregetIndex){
    const TIMES = oldFO[taregetIndex]*-1 
    return oldFO.map((component,i) => component+(newRowPivoted[i]*TIMES))
}

function sim(problem,nvariables,nconstrains){
    let varHeading=[],varHolgura=[]
    for(let i=0;i<nvariables;i++){
        varHeading.push(`X${i+1}`)
    }
    for(let i=0;i<nconstrains;i++){
        varHeading.push(`S${i+1}`)
    }
    for(let i=0;i<nconstrains;i++)
        varHolgura.push(`S${i+1}`)
    // Tablon inicial
    let headingIterations = document.createElement('h1')
    headingIterations.textContent = `Tablón inicial`
    tables.appendChild(headingIterations)
    tables.appendChild(generateTable(problem,nvariables,nconstrains,varHolgura))
    // -----------------
    let iteracion = 1;
    let min = findMin(problem[0].slice(0,problem[0].length));
    while(min[1] < 0){
        let rightSide = getRightSide(problem)
        let pivotColumn = getPivotComlumn(min[0],problem)
        let pivot = findPivot(rightSide,pivotColumn)
        
        if(pivot != undefined){
            let p = document.createElement('p')
            p.innerHTML = `<em>Sale <strong>${varHolgura[pivot[0]-1]}</strong> entra <strong>${varHeading[min[0]]}</strong></em>`
            varHolgura[pivot[0]-1] = varHeading[min[0]]
            tables.appendChild(p)
        }
        if(hasSolution){
            let headingIterations = document.createElement('h1')
            headingIterations.textContent = `Tablón ${iteracion}`
            tables.appendChild(headingIterations)
            
            problem[pivot[0]] = getRowPivoted(problem[pivot[0]],pivot[1])
            problem[0] = getNewFO(problem[0],problem[pivot[0]],min[0])
            for (let i=0; i<problem.length;i++){
                if(i == 0 || i == pivot[0])
                continue;
                else
                problem[i]=getNewFO(problem[i],problem[pivot[0]],min[0])
            }
            
            tables.appendChild(generateTable(problem,nvariables,nconstrains,varHolgura))
            
            min = findMin(problem[0].slice(0,problem[0].length));
            iteracion+=1
        }else
            break
    }
    if(hasSolution)
        alert(`Z = ${problem[0].slice(-1)[0]}`)
    else
        alert(`Solucion no acotada`)

}