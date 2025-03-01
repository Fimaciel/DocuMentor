import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Spinner } from "react-bootstrap";

const Professor = () => {
  const { id } = useParams();
  const [professor, setProfessor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://hp-api.onrender.com/api/characters/staff")
      .then((res) => res.json())
      .then((data) => {
        const foundProfessor = data.find((p) => p.id === id);
        setProfessor(foundProfessor);
        setLoading(false);
      })
      .catch((error) => console.error("Erro ao buscar professor:", error));
  }, [id]);

  return (
    <Container className="text-center mt-4">
      {loading ? (
        <Spinner animation="border" />
      ) : professor ? (
        <Card>
          <Card.Img variant="top" src={professor.image || "https://via.placeholder.com/150"} alt={professor.name} />
          <Card.Body>
            <Card.Title>{professor.name}</Card.Title>
            <p><strong>Casa:</strong> {professor.house || "Desconhecida"}</p>
            <p><strong>Ator:</strong> {professor.actor || "Não informado"}</p>
          </Card.Body>
        </Card>
      ) : (
        <h2>Professor não encontrado</h2>
      )}
    </Container>
  );
};

export default Professor;
