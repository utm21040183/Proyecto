import { Card, Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import React, { useState } from "react";

interface IUser {
    name: string;
    email: string;
    CURP: string;
    password: string;
    rol: string;
}

export const RegisterParticipant = () => {
    const [data, setData] = useState<IUser>({
        name: "",
        email: "",
        CURP: "",
        password: "",
        rol: "participant",
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        const { name, email, CURP, password } = data;
        if (!name || !email || !CURP || !password) {
            Swal.fire("Campos incompletos", "Por favor completa todos los campos.", "warning");
            return false;
        }
        return true;
    };

    const onSubmit = async () => {
        if (!validateForm()) return;

        try {
            Swal.fire({ title: "Guardando datos", allowOutsideClick: false });
            Swal.showLoading();
            await axios.post("http://localhost:5000/user/register", data);
            Swal.fire("Datos guardados con éxito", "", "success");
        } catch (error: any) {
            console.error(error);
            Swal.fire("Algo salió mal", error.response?.data?.msg || "Error desconocido", "error");
        }
    };

    return (
        <Container>
            <Card style={{ width: "30rem", margin: "auto" }} className="mt-3">
                <Form>
                    <Form.Group>
                        <Form.Label>Nombre:</Form.Label>
                        <Form.Control name="name" onChange={onChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Correo:</Form.Label>
                        <Form.Control type="email" name="email" onChange={onChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>CURP:</Form.Label>
                        <Form.Control name="CURP" onChange={onChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Contraseña:</Form.Label>
                        <Form.Control type="password" name="password" onChange={onChange} />
                    </Form.Group>

                    <Button onClick={onSubmit}>ENVIAR</Button>
                </Form>
            </Card>
        </Container>
    );
};
