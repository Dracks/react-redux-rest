import { ObjectDataType } from "../Types";

//export type RestBody

class Rest {
    manageFetch (response: Response){
        if (response.ok){
            return response.json()
        } else {
            return Promise.reject({code: response.status, description: response.statusText})
        }
    }

    send(url:string, data:RequestInit| null){
        if (data===null){
            data = {}
        }
        data.credentials = 'same-origin';
        return fetch(url, data)
    }

    sendJson(url: string, data: RequestInit){
        if (!data.headers){
            data.headers = new Headers();
        }
        (data.headers as Headers).append('Content-Type', 'application/json')
        return this.send(url, data).then(this.manageFetch)
    }

    get(url:string){
        return this.send(url, {method:"GET"}).then(this.manageFetch)
    }

    save<T extends ObjectDataType>(url: string, obj:T) {
        var method = "POST"
        if (obj.id){
            url = url.replace(":id", obj.id);
            method = "PUT"
        } else {
            url = url.replace(':id/','');
        }
        return this.sendJson(url, {
            body: JSON.stringify(obj),
            method: method,
        }).then(this.manageFetch);
    }

    destroy<T extends ObjectDataType>(url:string, obj:T) {
        if (obj.id){
            url = url.replace(':id', obj.id);
        }
        return this.send(url, {
            method: "DELETE",
        }).then((response)=>{
            return response.text()
        });
    }
}

export default new Rest();