import axios from 'axios';
import React, { useState } from 'react' // Importa React y el hook useState para manejar el estado del componente.
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'; // Importa componentes de Bootstrap para diseño y funcionalidad.
import { Trash } from 'react-bootstrap-icons';
import Swal from 'sweetalert2';
import { IEvent } from '../Types';

export const CreateEvent = () => {
    const emptyMetric = { // Objeto plantilla para una métrica vacía.
        description: "",  // Descripción inicial vacía.
        max_points: 0     // Puntos iniciales en 0.
    }

    const [event, setEvent] = useState<IEvent>({ // Estado inicial del evento.
        title: "",        // Título vacío.
        maxRound: 0,      // Número de rondas inicializado en 0.
        metrics: [emptyMetric] // Una métrica vacía por defecto.
    });

    const onChangeBasicFields = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const data: any = event;
        data[e.target.name] = e.target.value;
        setEvent({ ...data });
    }

    const onChangeMetric = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
        e.preventDefault();
        const data: any = event;
        data.metrics[i][e.target.name] = e.target.value;
        setEvent({ ...data })
    }

    const addMetric = () => { // Función para agregar una métrica nueva al evento.
        const data = event;  // Copia del estado actual del evento.
        data.metrics.push(emptyMetric); // Añade una métrica vacía al arreglo de métricas.
        setEvent({ ...data }) // Actualiza el estado con la nueva métrica añadida.
    }

    const removeMetric = (iM: number) => { // Función para eliminar una métrica específica.
        const data = event;
        const metricsFiltered = data.metrics.filter((_, i) => i != iM) // Filtra las métricas, excluyendo la seleccionada.
        data.metrics = metricsFiltered
        setEvent({ ...data }); // Actualiza el estado con la lista modificada.
    }

    const onSubmit = async () => {
        try {
            Swal.fire("Guardando evento...");
            Swal.showLoading
            await axios.post("http://localhost:4000/event/create", event)
            Swal.fire("Evento registrado con éxito", "", "success")
        } catch (error) {

        }
    }

    return ( // Renderiza el componente.
        <Container> {/* Contenedor principal para centrar el contenido */}
            <Card className='m-3'> {/* Tarjeta para agrupar los elementos */}
                <Card.Body> {/* Cuerpo de la tarjeta */}
                    <Card.Title>Crear evento</Card.Title> {/* Título de la tarjeta */}
                    <Form> {/* Formulario para ingresar los datos del evento */}
                        <Row className='mb-3'> {/* Fila para los campos del título y número de rondas */}
                            <Col>
                                <Form.Group> {/* Grupo de formulario para el título */}
                                    <Form.Label>Titulo del evento</Form.Label> {/* Etiqueta del campo */}
                                    <Form.Control onChange={onChangeBasicFields} name="title" /> {/* Campo para ingresar el título */}
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group> {/* Grupo de formulario para el número de rondas */}
                                    <Form.Label>Numero de rondas</Form.Label> {/* Etiqueta del campo */}
                                    <Form.Control onChange={onChangeBasicFields} name="maxRound" type='number' /> {/* Campo numérico para ingresar las rondas */}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row> {/* Fila para las métricas */}
                            <Form.Group className='text-center'> {/* Grupo centrado para las métricas */}
                                <Form.Label>Metricas:</Form.Label> {/* Etiqueta del grupo de métricas */}
                                {
                                    event.metrics.map((metric, i) => ( // Itera sobre el arreglo de métricas.
                                        <Row className='mb-3' key={i}> {/* Fila para cada métrica */}
                                            <Col>
                                                <Form.Label>Descripción:</Form.Label> {/* Etiqueta de la descripción */}
                                                <Form.Control onChange={(e: any) => onChangeMetric(e, i)} name="description" /> {/* Campo para ingresar la descripción */}
                                            </Col>
                                            <Col>
                                                <Form.Label>Calificación maxima:</Form.Label> {/* Etiqueta para los puntos */}
                                                <Form.Control onChange={(e: any) => onChangeMetric(e, i)} type='number' name="max_points" /> {/* Campo numérico para los puntos */}
                                            </Col>
                                            {
                                                event.metrics.length > 1 && (

                                                    <Col xs={1}>
                                                        <Button onClick={() => removeMetric(i)} variant='danger'>
                                                            <Trash />
                                                        </Button>
                                                    </Col>
                                                )
                                            }

                                        </Row>
                                    ))
                                }
                                <div className='text-center'> {/* Botón centrado para agregar métricas */}
                                    <Button variant='info' onClick={() => addMetric()}>Agregar metrica</Button> {/* Botón que llama a addMetric */}
                                </div>
                            </Form.Group>
                        </Row>
                        <hr></hr> {/* Línea divisoria */}
                        <div className='text-center'> {/* Botón centrado para guardar el evento */}
                            <Button onClick={() => onSubmit()}>Guardar evento</Button> {/* Botón de acción principal */}
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}
