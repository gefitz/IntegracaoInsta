export class ReturnApiInstaModel{
    
    private media_url!:string
    private id!:number;
    private timestamp!:Date;
    constructor(media_url:string,id:string,timestamp:string){
        this.media_url = media_url;
        this.id = parseInt(id);
        this.timestamp = new Date(timestamp);
    }
}