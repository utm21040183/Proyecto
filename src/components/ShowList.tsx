//Lista de usuarios -> jueces, participantes , administradores
//Lista de equiopos
//Eventos
import axios from "axios";
import {useEffect, useState} from "react"
import Swal from "sweetalert2";
import { IEvent, ITeams, IUser } from "../Types";
import { Columns } from "react-bootstrap-icons";
import { CardBody, Card, Table } from "react-bootstrap";

interface props{
    entity:"user" | "team" | "event"
}

export const ShowList = ({entity}: props) =>{
    const[data, setData] =useState([]);
    useEffect(()=> {
        getData()
    }, []);


    const getData = async ()=>{
        try {
            const url = `http://localhost:4000/${entity}/list`
            const {data} = await axios.get (url);
            setData(data);
        } catch (error) {
            Swal.fire("Oops ocurrió un error no se puedieron, no se pudieron obtener los datos de la tabla", "error")
        }
    }

    const getColumns = () => {

        const userColumns= ["Nombre", "Correo", "CURP", "Rol"]
        const eventColumns= ["Nombre del evento", "Cantidad de rondas"]
        const teamColumns = ["Nombre del equipo", "Nombre del lider"]

        let columns =[];
        if (entity == "event") {
             columns = eventColumns;
        }else if (entity == "team") {
            columns = teamColumns;
        }else {
            columns = userColumns;
        };
        const HTMLColumns = columns.map((c)=>{
            <th>{c}</th>
        })
        //return HTMLColumns
         // Retornar JSX del encabezado
         return columns.map((c, index) => <th key={index}>{c}</th>);
    }
   

    const getName = ()=>{
        let name = ""
        if (entity == "event") {
            name = "eventos";
       }else if (entity == "team") {
           name = "equipos";
       }else {
           name = "usuarioos";
       };
       return name;
    }

    return(
        <Card>
            <CardBody>
                <Card.Title>Listado de {getName()}</Card.Title>
                <Table>
                    <thead>
                        {getColumns()}
                    </thead>
                    <tbody>
                       {
                        entity == "event" && (
                            data.map((event:IEvent) => (
                                <tr>
                                    <td>{event.title}</td>
                                    <td>{event.maxRound}</td>
                                </tr>
                            ))
                        )||
                        entity == "team" && (
                            data.map((event:ITeams) => (
                                <tr>
                                    <td>{event.name}</td>
                                    <td>{event.leader}</td>
                                </tr>
                            ))
                        )||
                        entity == "user" && (
                            data.map((event:IUser) => (
                                <tr>
                                    <td>{event.name}</td>
                                    <td>{event.email}</td>
                                    <td>{event.CURP}</td>
                                </tr>
                            ))
                        )
                       
                       }
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    )
}