import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";

const Magias = () => {
  const [magias, setMagias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://hp-api.onrender.com/api/spells")
      .then((res) => res.json())
      .then((data) => {
        setMagias(data);
        setLoading(false);
      })
      .catch((error) => console.error("Erro ao buscar magias:", error));
  }, []);

  return (
    <Container>
      <h1 className="text-center my-4">Magias de Harry Potter</h1>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row>
          {magias.map((magia, index) => (
            <Col key={index} xs={12} sm={6} md={4} className="mb-4">
              <Card className="text-center">
                <Card.Body>
                  <Card.Title>{magia.name}</Card.Title>
                  <Card.Text>{magia.description}</Card.Text>
                  <Link to={`/magias/${magia.name}`} className="btn btn-dark">
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

export default Magias;
