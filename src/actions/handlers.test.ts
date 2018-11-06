import { whenComplete, saga } from "./handlers";

describe("[handlers]", ()=>{
    describe("whenComplete", ()=>{
        let subject: any;
        let callback: any;

        beforeEach(()=>{
            callback = jest.fn()
            subject = whenComplete(callback)
        });

        it ("No completed", ()=>{
            expect(subject(true, {})).not.toBeTruthy();

            expect(subject(false, undefined)).not.toBeTruthy()
        });

        it ("Completed", ()=>{
            expect(subject(false, {})).toBeTruthy();
        })
    });

    describe("saga", ()=>{
        let subject : (isLoading:boolean, data: any, error?: any)=>IterableIterator<any>;
        let callback: jest.Mock;
        beforeEach(()=>{
            callback = jest.fn()
            subject = saga(callback)
        });

        it ("Is loading", ()=>{
            callback.mockReturnValue({daleks:"5"})
            const generator = subject(true, null)
            expect(generator.next().value.PUT.action).toEqual({daleks:"5"})
            expect(callback).toBeCalledWith(true, null, undefined);
        })

        it ("Is loading", ()=>{
            callback.mockReturnValue({daleks:"6"})
            const generator = subject(false, {some:"data"})
            expect(generator.next().value.PUT.action).toEqual({daleks:"6"})
            expect(callback).toBeCalledWith(false, {some:"data"}, undefined);
        })

        it ("Is loading", ()=>{
            callback.mockReturnValue({daleks:"-1"})
            const generator = subject(false, {some:"data"}, "error")
            expect(generator.next().value.PUT.action).toEqual({daleks:"-1"})
            expect(callback).toBeCalledWith(false, {some:"data"}, "error");
        })
    })
})