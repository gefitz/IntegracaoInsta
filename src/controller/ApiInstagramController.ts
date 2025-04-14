import { FastifyReply, FastifyRequest } from "fastify";
import { UsuarioService } from "../services/UsuarioService";

export class ApiInstController{
    private readonly service: UsuarioService = new UsuarioService();
    async resgataFeedComCode(request: FastifyRequest, reply: FastifyReply){
            const paramUrl = request.query as {code:string}
            const ret = await this.service.buscarFeedUsuarioCode(paramUrl.code);
            reply.send(ret);
    }
    async resgataFeedComToken(request: FastifyRequest, reply: FastifyReply){
        const paramUrl = request.query as {token:string}
        const ret = await this.service.buscarFeedUsuarioToken(paramUrl.token);
        reply.send(ret);
}
}
