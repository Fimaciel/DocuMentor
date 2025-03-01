import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Spinner } from "react-bootstrap";

const Estudante = () => {
  const { id } = useParams();
  const [estudante, setEstudante] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://hp-api.onrender.com/api/characters/students") // Pegamos todos porque a API não tem endpoint por ID
      .then((res) => res.json())
      .then((data) => {
        const foundEstudante = data.find((e) => e.id === id);
        setEstudante(foundEstudante);
        setLoading(false);
      })
      .catch((error) => console.error("Erro ao buscar estudante:", error));
  }, [id]);

  return (
    <Container className="text-center mt-4">
      {loading ? (
        <Spinner animation="border" />
      ) : estudante ? (
        <Card>
          <Card.Img variant="top" src={estudante.image || "https://via.placeholder.com/150"} alt={estudante.name} />
          <Card.Body>
            <Card.Title>{estudante.name}</Card.Title>
            <p><strong>Casa:</strong> {estudante.house || "Desconhecida"}</p>
            <p><strong>Ator:</strong> {estudante.actor || "Não informado"}</p>
          </Card.Body>
        </Card>
      ) : (
        <h2>Estudante não encontrado</h2>
      )}
    </Container>
  );
};

export default Estudante;
