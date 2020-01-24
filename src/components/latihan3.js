import React from 'react'
import Axios from 'axios'
import { API_URL } from '../API_URL'
import { Table, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';


class Home extends React.Component{
    state = {
        nama : '',
        usia : '',
        pekerjaan : '',
        id : '',
        selectedId:null
    }
    componentDidMount(){
        Axios.get(API_URL+'/users')
        .then((res) => {
            console.log(res.data)
            this.setState({data : res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    

    render(){
        return(
            <div>
                <h1>PETUNJUK</h1>
                <p>1. Fitur Add Data</p>
                <p>2. Fitur Edit Data</p>
                <p>3. Fitur Delete Data</p>
                <p>4. Fitur Delete All Data</p>
                <p>5. Filter By Pekerjaan dimana option berdasarkan unique data pekerjaan yang sudah di tambah</p>
                <p>Note</p>
                <p>1. Gunakan JSON Server untuk menyimpan Datanya</p>
                <p>2. Boleh melanjutkan disini atau bikin Project Baru</p>
                <p>3. Kirim Link Github ke lian.eddy@gmail.com</p>

            </div>
        )
    }
}

export default (Home)