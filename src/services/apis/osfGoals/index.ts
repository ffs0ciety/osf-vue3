// https://osj4hzyn9k.execute-api.eu-west-1.amazonaws.com/v1

import Request from "@/services/Request";
import { userStore } from '@/stores/user'

export default class apiOsfGoals extends Request{
    
    constructor(){
        super({
            host: 'https://h3nlhw8br7.execute-api.eu-west-1.amazonaws.com',
            version: 1
        })
    }

    async getGoals(id?:string){
        const store = userStore()
        if(id){
            return await this.get(`goals/${id}`, undefined, {
            headers:{
                'Authorization': `Bearer ${store.token}`
            }
        }).then( response => {
                return response.Item
            })
        }

        
        return await this.get('goals', undefined, {
            headers:{
                'Authorization': `Bearer ${store.token}`
            }
        }).then( response => {
            return response.Items
        })
    }

    async createGoal(data:Object){
        const store = userStore()
        return await this.post('goals', undefined, data, {
            headers:{
                'Authorization': `Bearer ${store.token}`
            }
        });
    }

    async addEntrance(_id:string){
        return await this.post(`goals/${_id}`)
    }

}