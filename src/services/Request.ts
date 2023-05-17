
import axios from 'axios';
import _ from 'lodash';
import { logout } from './Oauth';


interface RequestInterface {
    host: string,
    version?: number,
    params?: Object,
    config?: Object
}

function endpointWithParams(_endpoint: string, _params: Object) {
    var endpoint = _endpoint;
    endpoint = `${endpoint}?`;
    if (_params) {
        for (const [key, value] of Object.entries(_params)) {
            endpoint = `${endpoint}${key}=${value}&`;
        }
    }
    return endpoint;
}

export default abstract class Request {
    host: string;
    version?: number;
    hostPath: string;
    config?: Object;

    constructor(req: RequestInterface) {
        this.host = req.host;
        this.version = req.version;
        this.config = req.config || {
            headers: {
                // "Access-Control-Allow-Origin": "*",
                // "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                // "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
                "Content-Type":"application/json",
                // "Accept":"*/*"
            }
        };

        if(_.has(this,'version')){
            this.hostPath = `${this.host}/v${this.version}/`
        } else {
            this.hostPath = `${this.host}/`
        }
    }

    protected async get(_endpoint:string, _params?:Object, _config?:Object) {
        var endpoint = `${this.hostPath}${_endpoint}`;
        if (_params) {
            endpoint = endpointWithParams(endpoint, _params)
        }

        return axios.get(endpoint, _config || this.config).then(response => {
            return response.data;
        }).catch( error => {
            if(_.get(error,'response.status') == 401){
                logout();
            }
            throw error;
        })
    }

    protected async post(_endpoint:string, _params?:Object, body?:Object, _config?:Object) {
        var endpoint = `${this.hostPath}${_endpoint}`;
        
        if (_params) {
            endpoint = endpointWithParams(endpoint,_params)
        }
        
        return axios.post(endpoint, JSON.stringify(body),_config || this.config).then(response => {
            return response.data;
        }).catch(error => {
            if(_.get(error,'response.status') == 401){
                logout();
            }
            throw error.response.data.error || error;
        })
    }

    protected async patch(_endpoint:string, _params?:Object, body?:Object, _config?:Object) {
        var endpoint = `${this.hostPath}${_endpoint}`;

        var config = _config || this.config || {}
        
        if (_params) {
            endpoint = endpointWithParams(endpoint,_params)
        }

        return axios.patch(endpoint, JSON.stringify(body), config).then(response => {
            return response.data;
        }).catch(error => {
            if(_.get(error,'response.status') == 401){
                logout();
            }
            return error;
        })
    }

    

}



