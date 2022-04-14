export function creatXmlRequest(method, url, cb, data = null){
    // possui os métodos que permitem a comunicação com o servidor de forma síncrona
    const xhr = new XMLHttpRequest()

    xhr.open(method, url)
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    xhr.send(data)

    xhr.onreadystatechange = verificaAjax

    function verificaAjax(){
        // console.log(xhr.readyState)
        // console.log(xhr.status)
        // console.log(xhr.responseText)
    
        if(xhr.readyState === 4){ // retorna o estado 4(DONE), isto é, requisição foi feita com sucesso
            if(xhr.status < 400){
                const json = JSON.parse(xhr.responseText)
                if(typeof cb === "function"){
                    cb(json)
                }
            } 
            else if (typeof cb === "function"){
                cb({
                    error: true,
                    status: xhr.status,
                    message: "Algo deu errado com a conexão"
                })
            }
         
    }

    }
}