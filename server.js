const express = require("express")
const cors = require("cors")
const pesquisas = require("./dados.json")

function autoIncrement(){
   const ultimoId = Number(pesquisas[pesquisas.length - 1].id)
   return ultimoId + 1
}

const Cadastrar = (req, res) => {
    const dados = req.body
    if(req.body){
        pesquisas.push(req.body)
        dados.id = autoIncrement()
        res.send("Cadastro criado com sucesso.")
    }else{
        res.send("Erro ao cadastrar")
    }
}

const Excluir = (req, res) => {
    const id = req.params.id
    let status = 0

    pesquisas.forEach((pesquisa, indice) => {
        if(pesquisa.id == id){
            status = 1
            pesquisas.splice(indice, 1)
        }
    })

    if(status == 1){
        res.send("Pesquisa excluída com sucesso.")
    }else{
        res.status(404).send("Pesquisa não encontrada.")
    }
}

const Atualizar = (req, res) => {
    const id = req.params.id
    const dados = req.body
    let status

    pesquisas.forEach((pesquisa) => {
        if(pesquisa.id == id){
            status = 1
            pesquisa.sistema = dados.sistema
            pesquisa.tipo = dados.tipo
            pesquisa.finalidade = dados.finalidade
            pesquisa.tipo = dados.tipo
            pesquisa.tecnologia = dados.tecnologia
            pesquisa.nivel_risco = dados.nivel_risco
            pesquisa.possui_revisao_humana = dados.possui_revisao_humana
        }
    })

    if(status == 1){
        res.send("Pesquisa atualizada com sucesso")
    }else{
        res.status(404).send("Pesquisa não encontrada")
    }
}

const ListarTudo = (req, res) => {
    res.send(pesquisas)
}

const ListarId = (req, res) => {
    const id = req.params.id
    let status = 0
    let retorno

    pesquisas.forEach((pesquisa) => {
        if(pesquisa.id == id){
            retorno = pesquisa
            status = 1
        }
    })

    if(status == 1){
        res.send(retorno)
    }else{
        res.status(404).send("Pesquisa não encontrada")
    }
}

const ListarNivel = (req, res) => {
    const nivel = req.params.nivel_risco
    let status = 0
    let retorno

    pesquisas.forEach((pesquisa) => {
        if(pesquisa.nivel_risco == nivel){
            retorno = pesquisa
            status = 1
        }
    })

    if(status == 1){
        res.send(retorno)
    }else{
        res.status(404).send("Pesquisa não encontrada")
    }    
}

const ListarTipo = (req, res) => {
    const tipo = req.params.tipo
    let status = 0
    let retorno

    pesquisas.forEach((pesquisa) => {
        if(pesquisa.tipo == tipo){
            retorno = pesquisa
            status = 1
        }
    })

    if(status == 1){
        res.send(retorno)
    }else{
        res.status(404).send("Pesquisa não encontrada")
    }
}


const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const porta = 3000

app.get("/", ListarTudo)
app.get("/:id", ListarId) 
app.get("/risco/:nivel_risco", ListarNivel)
app.get("/tipo/:tipo", ListarTipo) 
app.post("/", Cadastrar)
app.delete("/:id", Excluir)
app.put("/:id", Atualizar)

app.listen(porta, () => {
    console.log(`Servidor respondendo em: http://localhost:${porta}`)
})