import { useEffect, useState } from "react";
import Nav from "../components/navbar";
import axios from "axios";
import Card from "../components/card";

const Student = () =>{

    const[stud,setstud] = useState([]);
    const[st,setst] = useState({name:"",enr:"",city:""});
    const [editId, setEditId] = useState();


    const student =()=>{
        axios
        .get("http://localhost:4000/restro")
        .then(std => setstud(std.data))
        .catch(console.log);
    };

    useEffect(()=>{
        student()
    },[])

   const handleChange = (e) =>{
        setst({...st,[e.target.name]:e.target.value});
   }

   const handleSubmit = (e) =>{
        e.preventDefault();

        axios.post("http://localhost:4000/restro",st)
        .then(()=>{
            student();
            alert("Data Inserted");
            setst({name:"",enr:"",city:""})
        })
        .catch(console.log);
   };

   const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/restro/${id}`)
    .then(()=>{
        student();
        alert("Deleted")
        
    })
    .catch(console.log)
   }

   const handleEdit = (s) => {
    setst({
        name: s.name,
        enr: s.enr,
        city: s.city
    });

    setEditId(s.id);
    };

    const handleUpdate = () => {
    axios.put(`http://localhost:4000/restro/${editId}`, st)
        .then((res) => {
            setstud(stud.map(s => s.id === editId ? res.data : s));
            alert("Updated");
            setst({ name: "", enr: "", city: "" });
            setEditId(null);
        })
        .catch(console.log);
    };


    return(
        <>
        <Nav />
        <h1>Student Page</h1>

        <form onSubmit={handleSubmit}>

        Name : 
        <input type="text"
        name="name"
        value={st.name}
        onChange={handleChange}
        required
        />
        <br /><br />
        enrollment :
        <input type="text"
        name="enr"
        value={st.enr}
        onChange={handleChange}
        required
        />
        <br /><br />
        city :
        <input type="text"
        name="city"
        value={st.city}
        onChange={handleChange}
        required
        />
        <br /><br />
        <button type="submit">Submit</button>
        <button type="button" onClick={handleUpdate}>Update</button>
        <br /><br /><br /><br />
        </form>



        <table border="1">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Enrollment</th>
                    <th>City</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                    {
                        stud.map((s)=>{
                            return(
                                <Card
                                name={s.name}
                                enr={s.enr}
                                city={s.city}
                                action={
                                    <>
                                    <button onClick={() => handleEdit(s)}>Edit</button>
                                    <button onClick={()=>handleDelete(s.id)}>
                                        Delete
                                    </button>
                                    </>
                                }
                                />
                            )
                        })
                    }
            </tbody>
        </table>
        </>
    )
}

export default Student;