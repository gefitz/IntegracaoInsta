import { ReturnApiInstaModel } from "../Models/ReturnApiInstaModel";
import { ApiInstagram } from "./ApiInstagram";

export class UsuarioService{
   private apiInsta: ApiInstagram = new ApiInstagram()
    async buscarFeedUsuarioCode(code:string): Promise<ReturnApiInstaModel[]>{
        var ret: ReturnApiInstaModel[] = []
        if(code === ''){
            return ret;            
        }
        const tokenCurtaDuracao = await this.apiInsta.GerarTokenAcessoCurtaDuracao(code);
        if(tokenCurtaDuracao === ''){
            return ret;
        }
        const tokenLongaDuracao = await this.apiInsta.GerarTokenLongaDuracao(tokenCurtaDuracao);
        if(tokenLongaDuracao === ''){
            return ret;
        }

         ret = await this.apiInsta.ResgataFotosFeed(tokenCurtaDuracao);
         return ret;
    }
    async buscarFeedUsuarioToken(token:string): Promise<ReturnApiInstaModel[]>{
         return await this.apiInsta.ResgataFotosFeed(token);
    }
}