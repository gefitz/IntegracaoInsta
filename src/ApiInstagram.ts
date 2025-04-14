import { ReturnApiInstaModel } from "./Models/ReturnApiInstaModel";

export class ApiInstagram{
    private listMediaFeed: ReturnApiInstaModel[] = [];
    GetListMediaFeed(): ReturnApiInstaModel[]{
        return this.listMediaFeed;
    }

    async ResgataFotosFeed (token:string){
        try{
            if(token == ""){
                console.log("Deve passar token de longa ou curta duração");
                return;                
            }
            const response = await fetch("https://graph.instagram.com/me/media?fields=id,media_url,timestamp",{
                method:"GET",
                headers:{
                    "Authorization": "Bearer " + token
                }
            })
            if(!response.ok){
                console.log(await response.text());
                return;
            }
            var resp = await response.json();
            var data = resp.data;
            for (let index = 0; index < data.length; index++) {
                var obj = data[index];
                this.listMediaFeed.push(
                    new ReturnApiInstaModel(
                        obj.media_url,
                        obj.id,
                        obj.timestamp
                    )
                )
                
            }
        }catch(error){
            console.log("Erro ao resgatar o feed" + error)
        }
    }
    async GerarTokenAcessoCurtaDuracao(code:string):Promise<string>{
        try{
            if(code == "" || code == undefined){
                console.log("Deve passar o code de validação para geração de token");
                return "";
            }
            code = decodeURIComponent(code);
            const response = await fetch("https://api.instagram.com/oauth/access_token",
                {
                    method:"POST",
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    },
                    body: new URLSearchParams({
                        client_id: "1716608585958190", // id  do app do instagram
                        client_secret: "b9b21eb8a7a47794d46ba53dcacc07b4", // Chave secreta do app do instagram
                        grant_type:"authorization_code", // valor padrao para gerar o token
                        redirect_uri:"https://github.com/gefitz", // url do site que e feito o redicionamento
                        code: code // code obtido apos o sucesso de login do instagram, e fica na url de quando e rediricionado
                    })
                }
            )
            
            if(!response.ok){
                console.log(await response.text());
            }
            var data = await response.json()
            if(data.access_token)
                return data.access_token
            else
            console.log("Erro: " + await response.text());
        return "";
    }catch(error){
        console.log("Erro ao Gerar token curta duração" + error);
        return "";
    }
    }
    async GerarTokenLongaDuracao(token:string):Promise<string>{
        try{
            if(token == ""){
                console.log("Deve passar o token de curta duracao");
                return "";
            }
            const response = await fetch("https://graph.instagram.com/access_token?"
                +"grant_type=ig_exchange_token" // valor pradao para gerar token de longa duracao
                +"&client_secret=b9b21eb8a7a47794d46ba53dcacc07b4" // Chave secreta do app do instagram
                +"&access_token=" + token,
                
            )
            if(!response.ok){
                console.log(await response.text());
            }
            var data = await response.json();
            if(data.access_token)
                return data.access_token
            else{
                console.log("Erro: " + data.toString());
                return "";
            }
        }catch(error){
            console.log("Erro ao gerar token de longa duracao" + error);
            return "";
        }
    }
    }
    (async () => {
        try {
            const apiInsta = new ApiInstagram();
            const code = "AQDB5oPsKhfA-nBMhWIeWM1tmg7L4HfKMkDqfKa1htm6fT0uff2uA4eeS-Qoghjq6AAACmtVme0859hkxqC_VZHDStxgidqBodoER8TQPM733EXrjKL1j6op8FFVmh5ctaHAieWn6zyg6ounJ4JDV_fpOQYclMGmaV94SXOugvlWR2ebdEBYZLZvg0XX-frxflmt_juoTXsqZAKWzdYBdraUjJRdw8RDxL-XXSr_yPPtiQ#_";
            
            // 🔹 1. Pega o token de curta duração
            const tokenCurtaDuracao = await apiInsta.GerarTokenAcessoCurtaDuracao(code);
            console.log("Token de Curta Duração:", tokenCurtaDuracao);
            // 🔹 2. Converte para token de longa duração
             const tokenLongaDuracao = await apiInsta.GerarTokenLongaDuracao(tokenCurtaDuracao);
            // const tokenLongaDuracao = await apiInsta.GerarTokenLongaDuracao("IGAAYZAPxT8Ay5BZAE5UdW5Eem43bEhOVjVwNUNweVNGRXZAiT1RjeVhWcFhOUkpyVkdFSlY2dFo0RUhlZAldNMlltcFdnNll3X0F4SXBja1B6c2kyNGlRMWF2aUdtbzByd2tRQU4zSHRsdkVXWGx3Q1lOeGZAjYS1oOHR3YmdxNHozNWNRR2EtdFZAiS21n");
            console.log("Token de Longa Duração:", tokenLongaDuracao);


                // 🔹 3. Usa o token longo para buscar o feed
                await apiInsta.ResgataFotosFeed(tokenLongaDuracao);
                // await apiInsta.ResgataFotosFeed("IGAAYZAPxT8Ay5BZAE1tZAENPWHpFWlotWmlfaDhOZAkVxZAlMzbFREQVlxdHREeUlYLWxleGFYakRHT2lYU21qRUc5OE43Ukl4aG9RdUVBRGYzMkV0WEZAnSFotNXFMRkRleFVGYTZAjTkJHUFNXMzU2cWRYMzRyekxuQkpodmh2RmZAtTE1EbTZAERmMzdHhB");
                console.log("Fotos do Feed:", apiInsta.GetListMediaFeed());

        


    } catch (error) {

        console.error("Erro na execução:", error);
    }
})();