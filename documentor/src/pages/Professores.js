import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";

const Professores = () => {
  const [professores, setProfessores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://hp-api.onrender.com/api/characters/staff") // Endpoint para professores
      .then((res) => res.json())
      .then((data) => {
        setProfessores(data);
        setLoading(false);
      })
      .catch((error) => console.error("Erro ao buscar professores:", error));
  }, []);

  return (
    <Container>
      <h1 className="text-center my-4">Lista de Professores</h1>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row>
          {professores.map((professor) => (
            <Col key={professor.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card>
                <Card.Img variant="top" src={professor.image || "https://via.placeholder.com/150"} alt={professor.name} />
                <Card.Body>
                  <Card.Title>{professor.name}</Card.Title>
                  <Link to={`/professor/${professor.id}`} className="btn btn-dark">
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

export default Professores;
