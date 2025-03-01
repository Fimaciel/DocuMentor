import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";

const Personagens = () => {
  const [personagens, setPersonagens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://hp-api.onrender.com/api/characters")
      .then((res) => res.json())
      .then((data) => {
        setPersonagens(data);
        setLoading(false);
      })
      .catch((error) => console.error("Erro ao buscar personagens:", error));
  }, []);

  return (
    <Container>
      <h1 className="text-center my-4">Lista de Personagens</h1>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row>
          {personagens.map((personagem) => (
            <Col key={personagem.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card>
                <Card.Img variant="top" src={personagem.image || "https://via.placeholder.com/150"} alt={personagem.name} />
                <Card.Body>
                  <Card.Title>{personagem.name}</Card.Title>
                  <Link to={`/personagem/${personagem.id}`} className="btn btn-dark">
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

export default Personagens;
