import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Spinner } from "react-bootstrap";

const Personagem = () => {
  const { id } = useParams();
  const [personagem, setPersonagem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://hp-api.onrender.com/api/characters")
      .then((res) => res.json())
      .then((data) => {
        const foundPersonagem = data.find((p) => p.id === id);
        setPersonagem(foundPersonagem);
        setLoading(false);
      })
      .catch((error) => console.error("Erro ao buscar personagem:", error));
  }, [id]);

  return (
    <Container className="text-center mt-4">
      {loading ? (
        <Spinner animation="border" />
      ) : personagem ? (
        <Card>
          <Card.Img variant="top" src={personagem.image || "https://via.placeholder.com/150"} alt={personagem.name} />
          <Card.Body>
            <Card.Title>{personagem.name}</Card.Title>
            <p><strong>Casa:</strong> {personagem.house || "Desconhecida"}</p>
            <p><strong>Ator:</strong> {personagem.actor || "Não informado"}</p>
          </Card.Body>
        </Card>
      ) : (
        <h2>Personagem não encontrado</h2>
      )}
    </Container>
  );
};

export default Personagem;
