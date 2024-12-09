import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import Swal from "sweetalert2"
import axios, {AxiosError} from "axios"
import { useState } from "react"

export const Login = () => {
    const [data, setData] = useState({})


    const onChange = (e: any) => {
        e.preventDefault()
        const tempoData: any = data;
        tempoData[e.target.name] = e.target.value;
        setData(tempoData)
    }

    const onSubmit = async () => {
        console.log("")
        try {

            Swal.fire("Guardando datos")
            Swal.showLoading();
            await axios.post("http://localhost:4000/user/register",data);
            Swal.fire("Datos guardados con éxito", "", "success");

        } catch (error:any) {
            Swal.fire("Algo salió mal" ,"", "error");
        }

    }

    return (
        <Container >
            <Card style={{ width: "30rem", margin:"auto"}}
                className="mt-3"
            >
                <Card.Body>
                    <Card.Title className="text-center"> Bienvenido inicia sesion </Card.Title>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Correo:</Form.Label>
                                <Form.Control className="mb-3" name="email" onChange={onChange}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Contraseña:</Form.Label>
                                <Form.Control type="password" className="mb-3" name="password" onChange={onChange}></Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button className="mb-3" onClick={()=>onSubmit()} > Ingresa </Button>
                        </Col>
                    </Row>

                    <Row className="text-center">
                        <Col>
                            Olvidaste tu contrasena? Recuperala<a> aqui </a>
                        </Col>
                        <Col>
                            Todavia no tienes cuenta? Registrate aqui <a href="/register"> aqui </a>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}