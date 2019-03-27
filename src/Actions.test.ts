import { whenComplete } from "./Actions";
import { ActionCallback, MetaData } from "./Types";

describe("[Actions]", ()=>{
    describe("whenComplete", ()=>{
        let subject: ActionCallback;
        let callback: any;

        const getMeta = (isLoading: boolean):MetaData => ({
            isLoading,
            url: ""
        })

        beforeEach(()=>{
            callback = jest.fn()
            subject = whenComplete(callback)
        });

        it ("No completed", ()=>{
            subject(getMeta(true), {});
            expect(callback).not.toBeCalled();

            subject(getMeta(false), undefined);
            expect(callback).not.toBeCalled()
        });

        it ("Completed", ()=>{
            subject(getMeta(false), {})
            expect(callback).toBeCalled();
        })
    });
})