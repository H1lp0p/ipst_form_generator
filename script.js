let pth = './data/form-test-3.json'

//const data = require('./data/form-test-1.json')

let divContainer = document.getElementById('container')

function addBtn(src, container){
    if (src === "submit"){
        let submit = document.createElement('input')
        submit.type = 'submit'
        submit.className = 'btn'
        container.appendChild(submit)
    }
    else if (src === "clear") {
        let reset = document.createElement('input')
        reset.type = 'reset'
        reset.className = 'btn'
        container.appendChild(reset)
    }
}

function addInput(obj, container){
    let newLabel = document.createElement('label')
    newLabel.innerText = obj["label"]

    let div = document.createElement('div')
    //div.style.display = 'grid'
    div.className = 'form-group'


    div.appendChild(newLabel)

    if (obj["attrs"]["type"] === "checkbox" || obj["attrs"]["type"] === "radio"){
        for (let key in obj["attrs"]["variants"]){
            let variant = document.createElement('input')
            let inputLabel = document.createElement('label')
            inputLabel.className = 'form-check-label'

            let divVariant = document.createElement('div')
            divVariant.className = 'form-horizontal'

            variant.className = 'form-check-input'
            variant.type = obj["attrs"]["type"]
            variant.name = obj["attrs"]["name"]

            variant.value = obj["attrs"]["variants"][key]["value"]
            inputLabel.innerText = obj["attrs"]["variants"][key]["label"]

            divVariant.appendChild(variant)
            divVariant.appendChild(inputLabel)
            div.appendChild(divVariant)
        }
    }
    else if (obj["attrs"]["type"] === "select"){
        let select = document.createElement('select')
        select.className = 'form-select'
        select.name = obj["attrs"]["name"]

        for (let key in obj["attrs"]["variants"]){
            let option = document.createElement('option')
            option.value = obj["attrs"]["variants"][key]["value"]
            option.innerText = obj["attrs"]["variants"][key]["label"]
            select.appendChild(option)
        }
        div.appendChild(select)
    }
    else{
        let newInput = document.createElement('input')
        newInput.className = 'form-control'
        for (let key in obj["attrs"]){
            newInput.setAttribute(key, obj["attrs"][key])
        }
        div.appendChild(newInput)
    }

    container.appendChild(div)
}

function convert(src, container){
    container.innerHTML = ''
    let form = document.createElement('form')
    //form.className = 'form-group'
    console.log(src)
    let title = document.createElement('h1')
    title.innerText = src["title"]
    form.appendChild(title)

    if ("description" in src){
        let description = document.createElement('p')
        description.innerText = src["description"]
        form.appendChild(description)
    }

    for (let obj in src["fields"]){
        addInput(src["fields"][obj], form)
    }

    for (let btn in src["buttons"]){
        console.log(btn)
        addBtn(src["buttons"][btn], form)
    }

    container.appendChild(form)
}

//fetch(pth).then(res => res.json()).then(res => convert(res, divContainer))

const inputFile = document.getElementById('jsonFile')

inputFile.addEventListener('change', () => {
    let file = inputFile.files[0]

    let fileReader = new FileReader();

    fileReader.onload = (e) => {
        let res = JSON.parse(e.target.result)
        console.log(res)
        convert(res, divContainer)
    }

    fileReader.readAsText(file)

    //console.log(json)
    //json = JSON.parse(json)
    //convert(json, divContainer)
})