import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";

const Estudantes = () => {
  const [estudantes, setEstudantes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://hp-api.onrender.com/api/characters/students")
      .then((res) => res.json())
      .then((data) => {
        setEstudantes(data);
        setLoading(false);
      })
      .catch((error) => console.error("Erro ao buscar estudantes:", error));
  }, []);

  return (
    <Container>
      <h1 className="text-center my-4">Lista de Estudantes</h1>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row>
          {estudantes.map((estudante) => (
            <Col key={estudante.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card>
                <Card.Img variant="top" src={estudante.image || "https://via.placeholder.com/150"} alt={estudante.name} />
                <Card.Body>
                  <Card.Title>{estudante.name}</Card.Title>
                  <Link to={`/estudante/${estudante.id}`} className="btn btn-dark">
                    Ver Detalhes
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Estudantes;
