import { Card, Container, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import React, { useState } from "react";

interface IMetric {
  description: string;
  maxScore: string;
}

interface IEvent {
  title: string;
  rounds: string;
  metrics: IMetric[];
}

export const CreateEvent = () => {
  const [data, setData] = useState<IEvent>({
    title: "",
    rounds: "",
    metrics: [{ description: "", maxScore: "" }],
  });

  const onChange = (
    e: React.ChangeEvent<any>,
    index?: number
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("metrics") && index !== undefined) {
      const updatedMetrics = [...data.metrics];
      updatedMetrics[index] = {
        ...updatedMetrics[index],
        [name.split(".")[1]]: value,
      };
      setData({ ...data, metrics: updatedMetrics });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const addMetric = () => {
    setData({
      ...data,
      metrics: [...data.metrics, { description: "", maxScore: "" }],
    });
  };

  const validateForm = () => {
    const { title, rounds, metrics } = data;
    if (!title || !rounds || metrics.some(metric => !metric.description || !metric.maxScore)) {
      Swal.fire(
        "Campos incompletos",
        "Por favor completa todos los campos del formulario.",
        "warning"
      );
      return false;
    }
    return true;
  };

  const onSubmit = async () => {
    if (!validateForm()) return;

    try {
      Swal.fire({ title: "Guardando datos", allowOutsideClick: false });
      Swal.showLoading();
      await axios.post("http://localhost:5000/events/create", data);
      Swal.fire("Evento guardado con éxito", "", "success");
    } catch (error: any) {
      console.error(error);
      Swal.fire(
        "Algo salió mal",
        error.response?.data?.msg || "Error desconocido",
        "error"
      );
    }
  };

  return (
    <Container>
      <Card style={{ width: "50rem", margin: "auto" }} className="mt-3 p-4">
        <h3>Crear evento</h3>
        <Form>
          {/* Título del evento */}
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Título del evento</Form.Label>
                <Form.Control
                  name="title"
                  value={data.title}
                  onChange={onChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Número de rondas</Form.Label>
                <Form.Control
                  name="rounds"
                  value={data.rounds}
                  onChange={onChange}
                />
              </Form.Group>
            </Col>
          </Row>
  
          {/* Métricas */}
          <h5>Métricas:</h5>
          {data.metrics.map((metric, index) => (
            <Row key={index} className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Descripción:</Form.Label>
                  <Form.Control
                    name={`metrics.${index}.description`}
                    value={metric.description}
                    onChange={(e) => onChange(e, index)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Calificación máxima:</Form.Label>
                  <Form.Control
                    name={`metrics.${index}.maxScore`}
                    value={metric.maxScore}
                    onChange={(e) => onChange(e, index)}
                  />
                </Form.Group>
              </Col>
            </Row>
          ))}
  
          {/* Botón para agregar métricas */}
          <div className="d-flex justify-content-center mb-3">
            <Button variant="info" onClick={addMetric} className="me-2">
              Agregar métrica
            </Button>
          </div>
  
          {/* Botón para guardar */}
          <div className="d-flex justify-content-center mt-3">
            <Button variant="primary" onClick={onSubmit}>
              Guardar evento
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}  