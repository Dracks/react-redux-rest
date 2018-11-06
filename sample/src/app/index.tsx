import * as React from 'react';
import { connect } from 'react-redux';
import { Debug } from './Debug';
import { actions } from '../../../src';
import { callback } from './Actions';
import { Response } from '../../../src/Types';

const SAMPLE_URL = "https://api.nasa.gov/planetary/apod?api_key=7TTLAMNHFWUDqcRR1KrTYfZbLTa1YgM9AzDPc3";

const get = actions.fetch(SAMPLE_URL, callback )

const Show=({isLoading, data, error}: Response)=>(
    <Debug {...{ isLoading, data: JSON.stringify(data), error }} />
)

const App = ({get, rest} : {get:any, rest:Response})=>{
    return (
        <div>
            <h1> Test Saga redux </h1>
            <div>
                <button onClick={get}>Something!</button>
            </div>
            <Show {...rest} />
        </div>
    )
}

export default connect(
    ({rest}: any)=>({
        rest
    }), {get:()=>get}
)(App);