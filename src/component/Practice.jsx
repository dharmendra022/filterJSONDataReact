import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Practice = () => {



    const [filtData, setFiltData] = useState([])
    useEffect(() => {
        GetData();

    }, [])

    const GetData = () => {
        axios.get('https://jsonplaceholder.typicode.com/comments').then((response) => {
            console.log(response)
            setFiltData(response.data)
            }).catch((err) => {
            console.log(err)
        })
    }

    const[search,setSearch]=useState("")
    const handleSearch=(e)=>{
        const value=e.target.value
        console.log(value);
        setSearch(value)
        if(value==""){
            setFiltData(filtData)
        }

    }
    const searchClick=()=>{
        filter(search)

    }
    const filter=(value)=>{
        const val=value.toLowerCase().trim()
        if(!val){
            setFiltData(filtData)
        }else{
            const filterData=filtData.filter(item=>{
                return Object.keys(item).some(key=>{
                    return item[key].toString().toLowerCase().includes(val)
                })
            })
            setFiltData(filterData)
        }

    }


    return (
        <>
            <div className="card mx-auto bg-warning">
                <div className="w-75 p-3 text-center mx-auto">

                    <div className="col-md-4 mb-3 ">
                       
                        <input type="text"className="form-control is-valid" id="validationServer01" placeholder="search...." onChange={handleSearch} value={search} />
                        <button type="button" className="btn btn-danger d-inline p-2 mt-2" onClick={searchClick}>Search</button>
                    </div>
                    <table className="table">

                        <thead className="table table-dark">
                            <tr>
                                <th scope="col">S.No</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Body</th>
                            </tr>
                        </thead>
                        {
                            filtData.map((value, index) => {
                                return (
                                    <>
                                        <tbody key={index}>
                                            <tr>
                                                <td>{value.id} </td>
                                                <td>{value.name}</td>
                                                <td>{value.email}</td>
                                                <td>{value.body}</td>
                                            </tr>
                                        </tbody>
                                    </>
                                )

                            })
                        }
                    </table>

                </div>

            </div>
        </>
    )
}

export default Practice