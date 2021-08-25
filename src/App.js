import React, {Component} from 'react';
import uuid from 'react-uuid'
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {

    state = {
        tasks: [
            {id: uuid(), title: 'task1', status: 'open'},
            {id: uuid(), title: 'task5', status: 'open'},
            {id: uuid(), title: 'task2', status: 'pending'},
            {id: uuid(), title: 'task4', status: 'pending'},
            {id: uuid(), title: 'task6', status: 'pending'},
            {id: uuid(), title: 'task3', status: 'inprog'}
        ],
        modalVisible: false,
        footerEnabled: false,
        chosenOneId: '',
        chosenOneTitle: ''
    }

    addTask = (status) => {
        let tempTask = {id: uuid(), title: 'task' + (this.state.tasks.length + 1), status: status}
        let tempArr = this.state.tasks
        tempArr.push(tempTask)
        this.setState({tasks: tempArr})
    }

    toggle = (id) => {
        this.setState({modalVisible: !this.state.modalVisible, chosenOneId: id})
    }

    footerEnable = () => {
        this.setState({footerEnabled: !this.state.footerEnabled})
    }

    deleteTask = () => {
        let tempArr = this.state.tasks
        tempArr.map((item, index) => {
            if (item.id === this.state.chosenOneId) tempArr.splice(index, 1)
        })
        this.setState({tasks: tempArr, modalVisible: false, footerEnabled: false, chosenOneId: '', chosenOneTitle: ''})
    }

    editTask = () => {
        let tempArr = this.state.tasks
        tempArr.map((item) => {
            if (item.id === this.state.chosenOneId) {
                item.status = this.state.chosenOneTitle
            }
        })
        this.setState({tasks: tempArr, modalVisible: false, footerEnabled: false, chosenOneId: '', chosenOneTitle: ''})
    }

    getSelection = (e) => {
        this.setState({chosenOneTitle: e.target.value})
        console.log(this.state.chosenOneTitle)
    }

    render() {

        const {tasks, modalVisible, footerEnabled} = this.state

        return (
            <div className={'container-fluid bg-secondary p-5'}>
                <div className="row mb-5 text-center bg-light">
                    <div className="col-md-12">
                        <h3>Tasks / To Do / Trello.com / ClickUp.com</h3>
                        <p>( task ustiga bosilganda o'chirish va boshqa statusga o'tkazish modali chiqadi ! )</p>
                    </div>
                </div>

                {/* Modal */}
                {modalVisible ?
                    <div className="row my-5">
                        <div className="col-md-12">
                            <Modal isOpen={modalVisible} toggle={this.toggle}>
                                <ModalHeader toggle={this.toggle}>Choose an operation</ModalHeader>
                                <ModalBody>
                                    <button className={'btn btn-danger'} onClick={this.deleteTask}>Delete
                                    </button>
                                    <button className={'btn btn-warning float-end'} onClick={this.footerEnable}>Edit
                                    </button>
                                </ModalBody>
                                {footerEnabled ?
                                    <ModalFooter>
                                        <h3>Choose task category to swap</h3>
                                        <div className="form-group">
                                            <select className={'form-control'} id="selection"
                                                    onChange={this.getSelection}>
                                                <option value="open">Open task</option>
                                                <option value="pending">Pending task</option>
                                                <option value="inprog">In progress task</option>
                                                <option value="complete">Completed task</option>
                                            </select>
                                        </div>
                                        <button className={'btn btn-info'} onClick={this.editTask}>Submit</button>
                                    </ModalFooter>
                                    : ''}
                            </Modal>
                        </div>
                    </div>
                    : ''}

                <div className="row">

                    {/* open */}
                    <div className="col-md-2 rounded mx-5 bg-dark p-3 text-center">
                        <div className="card">
                            <div className="card-header py-3">
                                <h3>open</h3>
                                <hr/>
                            </div>
                            <div className="card-body">
                                {tasks.map((item) => {
                                    return (item.status === 'open' ?
                                        <div key={item.id} className={'bg-dark text-white my-1 rounded p-2'}
                                             style={{cursor: 'pointer'}}
                                             onClick={() => this.toggle(item.id)}>{item.title}</div> :
                                        <div key={item.id}>{''}</div>)
                                })}
                            </div>
                            <div className="card-footer py-3">
                                <hr/>
                                <button className={'btn btn-dark'} onClick={() => this.addTask('open')}>add open
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* pending */}
                    <div className="col-md-2 rounded bg-danger mx-5 p-3 text-center">
                        <div className="card">
                            <div className="card-header py-3">
                                <h3>pending</h3>
                                <hr/>
                            </div>
                            <div className="card-body">
                                {tasks.map((item) => {
                                    return (item.status === 'pending' ?
                                        <div key={item.id} className={'bg-danger text-white my-1 rounded p-2'}
                                             style={{cursor: 'pointer'}}
                                             onClick={() => this.toggle(item.id)}>{item.title}</div> :
                                        <div key={item.id}>{''}</div>)
                                })}
                            </div>
                            <div className="card-footer py-3">
                                <hr/>
                                <button className={'btn btn-danger'} onClick={() => this.addTask('pending')}>add
                                    pending
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* inprog */}
                    <div className="col-md-2 mx-5 rounded bg-warning p-3 text-center">
                        <div className="card">
                            <div className="card-header py-3">
                                <h3>inprog</h3>
                                <hr/>
                            </div>
                            <div className="card-body">
                                {tasks.map((item) => {
                                    return (item.status === 'inprog' ?
                                        <div key={item.id} className={'bg-warning my-1 rounded p-2'}
                                             style={{cursor: 'pointer'}}
                                             onClick={() => this.toggle(item.id)}>{item.title}</div> :
                                        <div key={item.id}>{''}</div>)
                                })}
                            </div>
                            <div className="card-footer py-3">
                                <hr/>
                                <button className={'btn btn-warning'} onClick={() => this.addTask('inprog')}>add
                                    inprog
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* complete */}
                    <div className="col-md-2 mx-5 bg-success rounded p-3 text-center">
                        <div className="card">
                            <div className="card-header py-3">
                                <h3>complete</h3>
                                <hr/>
                            </div>
                            <div className="card-body">
                                {tasks.map((item) => {
                                    return (item.status === 'complete' ?
                                        <div key={item.id} className={'bg-success my-1 rounded p-2'}
                                             style={{cursor: 'pointer'}}
                                             onClick={() => this.toggle(item.id)}>{item.title}</div> :
                                        <div key={item.id}>{''}</div>)
                                })}
                            </div>
                            <div className="card-footer py-3">
                                <hr/>
                                <button className={'btn btn-success'} onClick={() => this.addTask('complete')}>add
                                    complete
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default App;