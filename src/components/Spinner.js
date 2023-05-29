import React, { Component } from 'react'
import spinner from 'C:/React/newsapp/src/spinner.gif'

export default class Spinner extends Component {
    render() {
        return (
            <div className='text-center'>
                <img className="my-3" src={spinner} alt ="loading"/>
            </div>
        )
    }
}
