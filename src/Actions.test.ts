import { whenComplete } from "./Actions";

describe("[Actions]", ()=>{
    describe("whenComplete", ()=>{
        let subject: any;
        let callback: any;

        beforeEach(()=>{
            callback = jest.fn()
            subject = whenComplete(callback)
        });

        it ("No completed", ()=>{
            subject(true, {});
            expect(callback).not.toBeCalled();

            subject(false, undefined);
            expect(callback).not.toBeCalled()
        });

        it ("Completed", ()=>{
            subject(false, {})
            expect(callback).toBeCalled();
        })
    });
})