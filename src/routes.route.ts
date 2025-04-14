import { FastifyInstance,FastifyPluginOptions,FastifyReply,FastifyRequest } from "fastify";
import { ApiInstController } from "./controller/ApiInstagramController";

export async function routes(fastify:FastifyInstance, options:FastifyPluginOptions) {
    fastify.get("/api/resgataFeedComCode",async(request: FastifyRequest,reply:FastifyReply)=>{
        return new ApiInstController().resgataFeedComCode(request,reply);
    })
    fastify.get("/api/resgataFeedComToken",async(request: FastifyRequest,reply:FastifyReply)=>{
        return new ApiInstController().resgataFeedComCode(request,reply);
    })
    
}