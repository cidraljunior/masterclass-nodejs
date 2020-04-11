const ul = document.querySelector("ul")
const input = document.querySelector("input")
const form = document.querySelector('form')

async function load() {
    const res = await fetch("http://localhost:3000").then((data) => data.json())

    res.urls.map(url => addElement(url))
}

load()

function addElement({ name, url }) {
    const li = document.createElement('li')
    const a = document.createElement("a")
    const trash = document.createElement("span")

    a.href = url
    a.innerHTML = name
    a.target = "_blank"

    trash.innerHTML = "x"
    trash.onclick = () => removeElement(trash)

    li.append(a)
    li.append(trash)
    ul.append(li)
}

function removeElement(el) {
    const url = el.parentNode.firstChild.href
    const name = el.parentNode.firstChild.innerHTML

    console.log(url,name)
    
    if (confirm('Tem certeza que deseja deletar?'))

        fetch(`http://localhost:3000/?name=${name}&url=${url}&del=1`)

        console.log(`http://localhost:3000/?name=${name}&url=${url}&del=1`)
        el.parentNode.remove()
       
        

}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let { value } = input

    if (!value) 
        return alert('Preencha o campo')

    const [name, url] = value.split(",")

    if (!url) 
        return alert('formate o texto da maneira correta')

    if (!/^http/.test(url)) 
        return alert("Digite a url da maneira correta")

    addElement({ name, url })

    fetch(`http://localhost:3000/?name=${name}&url=${url}/`)

    input.value = ""
})