class Stack {
    #items = []
    constructor(array) {
        array?.forEach(element => {
            this.#items.push(element)
        });
    }
    push = (element) => this.#items.push(element)
    pop = () => this.#items.pop()
    isempty = () => this.#items.length === 0
    empty = () => (this.#items.length = 0)
    size = () => this.#items.length
    clear = () => this.#items = []
    top = () => this.#items[this.#items.length-1]
    copy = () => {
        let obj = new Stack()
        for(let i = 0; i<this.#items.length; i++){
            obj.push(this.#items[i])
        }
        return obj
    }
    print = () => {
        let arr = [] 
        for(let i = 0; i<this.#items.length; i++){
            arr[i] = this.#items[i]
        }
        return arr
    }
}


function func(event){

    sentence = event
    
    let input = new Stack(["$"])

    for(let i = sentence.length-1; i>=0; i--) {
        input.push(sentence[i]);
    }

    let stack = new Stack(["$", "S"]);

    let table = [
        [{action: "S➝aB", stack: new Stack(["a", "B"])}, {action: "-", stack: []}, {action: "S➝cAc", stack: new Stack(["c", "A", "c"])}, {action: "-", stack: []}],
        [{action: "A➝aB", stack: new Stack(["a", "B"])}, {action: "A➝bS", stack: new Stack(["b", "S"])}, {action: "A➝ε", stack: new Stack()}, {action: "-", stack: []}],
        [{action: "B➝aCc", stack: new Stack(["a", "C", "c"])}, {action: "B➝bAc", stack: new Stack(["b", "A", "c"])}, {action: "-", stack: []}, {action: "-", stack: []}],
        [{action: "C➝aB", stack: new Stack(["a", "B"])}, {action: "C➝bA", stack: new Stack(["b", "A"])}, {action: "-", stack: []}, {action: "-", stack: []}],
    ]

    let row = new Map();
    row.set("S", 0);
    row.set("A", 1);
    row.set("B", 2);
    row.set("C", 3);


    let col = new Map();
    col.set("a", 0);
    col.set("b", 1);
    col.set("c", 2);
    col.set("$", 3);

    flag = true
    let cont = 0
    iteration = {stack: [], input: [], action: ''}
    let result = new Array()
    let action
    while(flag){
        cont+=1
        result.push({0: stack.print(), 1: input.print(), 2: ""})
        let top_stack = stack.top()

        let top_input = input.top()

        if(top_input===top_stack){
            if(top_input === "$") break;
            action = `Ler ${top_input}`
            input.pop()
            stack.pop()
        }else if(top_stack=== "$" || top_input==="$"){
            action = `Erro em ${cont} iterações`
            flag = false;
        }else{
            a = table[row.get(top_stack)][col.get(top_input)]
            if(a===undefined) {
                action = `Erro em ${cont} iterações`
                flag = false;
            }else{
                action = a.action
                if(action === "-") {
                    action = `Erro em ${cont} iterações`
                    flag = false;
                }else{
                    let aux = a.stack.copy()
                    stack.pop()
                    while(!aux.isempty()){
                        stack.push(aux.top())
                        aux.pop()
                    }
                }
            }
        }

        result[cont-1][2] = action

    }

    if (flag) result[result.length-1][2] = `Aceito em ${cont} iterações`

    loadTable(result)
}

function loadTable(result) {

    var body = document.getElementsByTagName('body')[0];
    var tbl = document.getElementById('table');
    tbl.innerHTML = "";

    tbl.setAttribute('border', '1');
    var tbdy = document.createElement('tbody');
    
    var tr = document.createElement('tr');
    for (var j = 0; j < 4; j++) {
        var th = document.createElement('th');
        if (j==0) th.appendChild(document.createTextNode("It. Nº"))
        if (j==1) th.appendChild(document.createTextNode("Pilha"))
        if (j==2) th.appendChild(document.createTextNode("Entrada"))
        if (j==3) th.appendChild(document.createTextNode("Ação"))
        tr.appendChild(th)
    }
    tbdy.appendChild(tr);
    for (var i = 0; i < result.length; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < 4; j++) {
            var td = document.createElement('td');
            if(j==0) td.appendChild(document.createTextNode(i+1))
            else td.appendChild(document.createTextNode(result[i][j-1]))

            tr.appendChild(td)
        }
        tbdy.appendChild(tr);
    }

    tbl.appendChild(tbdy);
    body.appendChild(tbl)


}

