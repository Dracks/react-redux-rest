import FetchReducer from "./FetchReducer";
import { NetworkResponse, ReducerCallback } from "../Types";


describe("[FetchReducerMerge]", ()=>{

    const ActionTest = "Perico de los palotes"
    type TestObject  = {
        id: number
        sort: number
    }

    const buildObject = (id: number, sort: number): TestObject => ({id, sort})

    const buildResponse = (data: Array<TestObject>)=>({
        type: ActionTest,
        payload: {
            data,
            meta: {}
        }
    })

    describe('basic transformation of a field', ()=>{
        let subject: ReducerCallback<Array<number>>;
        beforeEach(()=>{
            subject = FetchReducer(ActionTest, (values:NetworkResponse<Array<TestObject>>)=>
                ({...values, data: values.data.map((v)=>v.id)})
            )
        })

        it('Most basic case', ()=>{
            const data = buildResponse([
                buildObject(1, 10),
            ])
    
            const result = subject(undefined, data)
            
            expect(result).toBeTruthy()
            expect(result!.data).toEqual([
                1
            ])
        })
    })

    describe('Sorting and ordering fields', ()=>{
        let subject: ReducerCallback<Array<TestObject>>;

        const compare = (a: TestObject, b: TestObject)=>{
            if (a.sort<b.sort){
                return -1
            } else if (a.sort>b.sort){
                return 1
            } else {
                if ( a.id < b.id){
                    return -1
                } else if (a.id > b.id){
                    return 1
                } else {
                    return 0
                }
            }
        }


        beforeEach(()=>{
            subject = FetchReducer(ActionTest, (newResponse: NetworkResponse<TestObject[]>, status)=>{
                let listValues = newResponse.data || []
                let oldValues = status && [...status.data] || []
                listValues.forEach((v)=>{
                    let statusComparation = -1;
                    let index = 0;
                    while (statusComparation==-1 && index < oldValues.length){
                        statusComparation = compare(v,oldValues[index])
                        index++;
                    }
                    if (statusComparation==1){
                        index--;
                        oldValues.splice(index, 0, v)
                    } else if (index == oldValues.length){
                        oldValues.push(v)
                    }
                })
                return { ...newResponse, data: oldValues}
            })
        })

        it('Most basic case for initial value', ()=>{
            const data = buildResponse([
                buildObject(1, 10),
                buildObject(2, 5),
            ])
    
            const result = subject(undefined, data)
            
            expect(result).toBeTruthy()
            expect(result!.data).toEqual([
                buildObject(1, 10),
                buildObject(2, 5),
            ])
        })

        it('Most basic case for initial value', ()=>{
            const data = buildResponse([
                buildObject(1, 10),
                buildObject(2, 5),
            ])
    
            const result = subject({data: [buildObject(3, 5)], meta: { isLoading:false, url:""}}, data)
            
            expect(result).toBeTruthy()
            expect(result!.data).toEqual([
                buildObject(1, 10),
                buildObject(3, 5),
                buildObject(2, 5),
            ])
        })
    })
})