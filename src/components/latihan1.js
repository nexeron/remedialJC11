import React from 'react'
import { Table, Input, Button } from 'reactstrap';
import Axios from 'axios'
import { API_URL } from '../API_URL'

class Home extends React.Component{

    state = {
        nama: '',
        usia: '',
        pekerjaan: '',
        id: ''
    }
    
    componentDidMount(){
        Axios.get(API_URL+'/users')
        .then((res)=>{
            console.log(res.data)
            this.setState({data:res.data})
        })
        .catch((err)=>{
            console.log(err)
        })
        
    }

    AddToData= () => {
        let {nama, usia, pekerjaan, id} = this.state
        Axios.post(API_URL+'/users', {
            nama,
            usia,
            pekerjaan,
            id
        })
        .then((res) => {
            Axios.get(API_URL+'/users')
            .then((res) => {
                console.log(res.data)
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    deleteData = (id) => {
        Axios.delete(API_URL+`/users/${id}`)
        .then(() => {
            Axios.get(API_URL+'/users')
            .then((res) => {
                console.log(res.data)
                this.setState({data: res.data})
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    editData = (id) => {
        this.setState({selectedId: id})
        console.log(this.state.selectedId)
    }

    confirmEdit = (id) => {
        var namaEdit = this.namaEdit.value;
        var usiaEdit = this.usiaEdit.value;
        var pekerjaanEdit = this.pekerjaanEdit.value;
        Axios.put(API_URL+`/users/${id}`,{
            nama: namaEdit,
            usia: usiaEdit,
            pekerjaan: pekerjaanEdit
        })
        .then(() => {
            Axios.get(API_URL+'/users')
            .then((res) => {
                console.log(res.data)
                this.setState({data: res.data, selectedId: null})
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
    renderUserData = () => {
        return this.state.data.map((val, index) => {
            if(this.state.selectedId === val.id){
                return(
                    <tr key={val.id}>
                        <td></td>
                        <td>
                            <Input type="text" innerRef={(namaEdit) => this.namaEdit = namaEdit}/>
                        </td>
                        <td>
                            <Input type="text" innerRef={(usiaEdit) => this.usiaEdit = usiaEdit}/>
                        </td>
                        <td>
                            <Input type="text" innerRef={(pekerjaanEdit) => this.pekerjaanEdit = pekerjaanEdit}/>
                        </td>
                        <td><Button color='primary' onClick={() => this.confirmEdit(val.id)}>Confirm</Button></td>
                        <td><Button color='secondary' onClick={() => this.setState({selectedId: null})}>Cancel</Button></td>
                    </tr>
                )
            }
            return(
                <tr key={val.id}>
                  <th scope="row">{index+1}</th>
                  <td>{val.nama}</td>
                  <td>{val.usia}</td>
                  <td>{val.pekerjaan}</td>
                  <td><Button color='success' onClick={() => this.editData(val.id)}>Edit</Button></td>
                  <td><Button color='danger' onClick={() => this.deleteData(val.id)}>Delete</Button></td>
                </tr>
            )
        })
    }


    render(){
        return(
            <div>
                <h1>SOAL 1</h1>
                <div className='row'>
                    <div className='col-md-4 mb-4'>
                        <select className='form-control'>
                            <option>Filter By Pekerjaan</option>
                            <option value='usia'>Filter by Usia</option>
                        </select>
                    </div>
                </div>
                <table className='table mb-4'>
                    <thead>
                        <tr>
                            <td>Nama</td>
                            <td>Usia</td>
                            <td>Pekerjaan</td>
                            <td>Act</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            
                        </tr>
                    </tbody>
                </table>
                <div className='row'>
                    <div className='col-md-3'> <input type='text' className='form-control' placeholder='Nama' /> </div>
                    <div className='col-md-3'> <input type='text' className='form-control' placeholder='Usia' /> </div>
                    <div className='col-md-3'> <input type='text' className='form-control' placeholder='Pekerjaan' /> </div>
                    <div className='col-md-3'> <input type='button' className='form-control btn-info' value='add Data' onClick={this.AddToData()} /> </div>
                </div>
            </div>
        )
    }

}


export default Home