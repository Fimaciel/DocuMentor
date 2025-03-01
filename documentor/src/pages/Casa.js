import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Spinner, ListGroup, Badge } from "react-bootstrap";
import './Casa.css';

const detalhesCasas = {
  gryffindor: {
    cores: ["#740001", "#D3A625"],
    fundador: "Godric Gryffindor",
    animal: "Leão",
    caracteristicas: ["Coragem", "Ousadia", "Nobreza", "Determinação"],
    descricao: "Grifinória é conhecida por valorizar a coragem acima de tudo. Seus membros são destemidos e sempre prontos para enfrentar desafios. O lema da casa é 'Enfrentar o leão na sua cova'."
  },
  slytherin: {
    cores: ["#1A472A", "#AAAAAA"],
    fundador: "Salazar Slytherin",
    animal: "Serpente",
    caracteristicas: ["Ambição", "Astúcia", "Liderança", "Autopreservação"],
    descricao: "Sonserina valoriza a ambição e a astúcia. Seus membros são determinados e frequentemente mostram grande habilidade em alcançar seus objetivos. 'Sangue puro' era um ideal importante para seu fundador."
  },
  ravenclaw: {
    cores: ["#0E1A40", "#946B2D"],
    fundador: "Rowena Ravenclaw",
    animal: "Águia",
    caracteristicas: ["Inteligência", "Criatividade", "Sabedoria", "Curiosidade"],
    descricao: "Corvinal é a casa dos sábios e intelectuais. Valoriza o aprendizado e a criatividade. Seu lema é 'Uma mente sem limites é o maior tesouro do homem'."
  },
  hufflepuff: {
    cores: ["#000000", "#FFD800"],
    fundador: "Helga Hufflepuff",
    animal: "Texugo",
    caracteristicas: ["Lealdade", "Dedicação", "Justiça", "Trabalho duro"],
    descricao: "Lufa-Lufa valoriza o trabalho árduo e a lealdade. Seus membros são conhecidos por sua natureza bondosa e senso de justiça. 'Todos iguais, eu os ensino e deles cuido' era o lema de Helga."
  }
};

const Casa = () => {
  const { id } = useParams();
  const [casa, setCasa] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch(`https://hp-api.onrender.com/api/characters/house/${id}`)
      .then((resposta) => resposta.json())
      .then((dados) => {
        setCasa({ 
          nome: id.charAt(0).toUpperCase() + id.slice(1), 
          personagens: dados,
          ...detalhesCasas[id]
        });
        setCarregando(false);
      })
      .catch((erro) => console.error("Erro ao buscar casa:", erro));
  }, [id]);

  return (
    <div className="pagina-casa" style={{ 
      background: `linear-gradient(160deg, ${casa?.cores[0]} 30%, ${casa?.cores[1]} 100%)`,
      minHeight: '100vh',
      padding: '2rem 0'
    }}>
      <Container>
        {carregando ? (
          <div className="text-center mt-5">
            <Spinner animation="border" variant="light" className="spinner-ouro" />
          </div>
        ) : casa ? (
          <>
            <Card className="card-informacoes-casa mb-5 shadow-lg">
              <Card.Body>
                <Row>
                  <Col md={1} className="text-center">
                    <div 
                      className="brasao-casa"
                      style={{ 
                        backgroundImage: `url(/crest-${id}.png)`,
                        filter: `drop-shadow(0 0 10px ${casa.cores[0]})`
                      }}
                    ></div>
                  </Col>
                  <Col md={8}>
                    <h1 className="display-3 mb-4">{casa.nome}</h1>
                    <div className="metadados-casa mb-4">
                      <Badge bg="light" className="me-2 text-dark">
                        Fundador: {casa.fundador}
                      </Badge>
                      <Badge bg="light" className="me-2 text-dark">
                        Animal: {casa.animal}
                      </Badge>
                    </div>
                    <Card.Text className="lead">{casa.descricao}</Card.Text>
                    <div className="caracteristicas-container mt-4">
                      {casa.caracteristicas.map((caracteristica, index) => (
                        <span 
                          key={index}
                          className="emblema-caracteristica"
                          style={{ 
                            backgroundColor: casa.cores[0],
                            borderColor: casa.cores[1]
                          }}
                        >
                          {caracteristica}
                        </span>
                      ))}
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <h2 className="text-center mb-4 titulo-secao">Membros Notáveis</h2>
            <Row xs={1} md={2} lg={3} xl={4} className="g-4">
              {casa.personagens.map((personagem) => (
                <Col key={personagem.id}>
                  <Link to={`/personagem/${personagem.id}`} className="text-decoration-none">
                    <Card className="card-personagem h-100 shadow">
                      <Card.Body>
                        <Card.Title>{personagem.name}</Card.Title>
                        <ListGroup variant="flush">
                          <ListGroup.Item>
                            Ator: {personagem.actor}
                          </ListGroup.Item>
                          {personagem.dateOfBirth && (
                            <ListGroup.Item>
                              Nascimento: {personagem.dateOfBirth}
                            </ListGroup.Item>
                          )}
                        </ListGroup>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </>
        ) : (
          <h2 className="text-center text-white">Casa não encontrada</h2>
        )}
      </Container>
    </div>
  );
};

export default Casa;