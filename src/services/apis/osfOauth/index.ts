// https://osj4hzyn9k.execute-api.eu-west-1.amazonaws.com/v1
import jwt_decode from "jwt-decode";
import Request from "@/services/Request";
import { userStore } from '@/stores/user'
import _ from "lodash";
import router from "@/router";

export default class apiOsfGoals extends Request{
    
    constructor(){
        super({
            host: 'https://citfg5nhqk.execute-api.eu-west-1.amazonaws.com',
            version: 1
        })
    }

    async login(data:Object){
        return await this.post('oauth/login', undefined, data)
    }

}