
import { userStore } from '@/stores/user'
import _ from "lodash";
import router from "@/router";
import OauthApi from "@/services/apis/osfOauth"
import jwt_decode from "jwt-decode";
import { getGoals } from './Goals';
import { goalsStore } from '@/stores/goals';

export async function login(email: string, password:string){
    var oauth = new OauthApi();
    const store = userStore();
    var payload = {
        email: email,
        password: password
    }
    store.$reset();
    return await oauth.login(payload).then( response => {
        store.$reset()
        if(_.has(response,'AuthenticationResult')){
            var idToken = _.get(response, 'AuthenticationResult.IdToken')
            var decoded = jwt_decode(idToken);
            _.assign(store.$state, decoded)
            store.token = idToken;

            getGoals();
            
            router.push({path: '/private/dashboard'});
        }
    }).catch( error => {
        throw error;
        
    })
}

export function logout(){
    const storeUser = userStore();
    const storeGoals = goalsStore();
    storeUser.$reset();
    storeGoals.$reset();
    router.push({path: '/login'})
}


