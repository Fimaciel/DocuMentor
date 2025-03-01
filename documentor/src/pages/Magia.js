import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Spinner } from "react-bootstrap";

const Magia = () => {
  const { id } = useParams();
  const [magia, setMagia] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://hp-api.onrender.com/api/spells")
      .then((res) => res.json())
      .then((data) => {
        const magiaEncontrada = data.find((spell) => spell.name === id);
        setMagia(magiaEncontrada);
        setLoading(false);
      })
      .catch((error) => console.error("Erro ao buscar magia:", error));
  }, [id]);

  return (
    <Container className="mt-4">
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : magia ? (
        <Card className="text-center">
          <Card.Body>
            <Card.Title>{magia.name}</Card.Title>
            <Card.Text>{magia.description}</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <h2>Magia não encontrada</h2>
      )}
    </Container>
  );
};

export default Magia;
