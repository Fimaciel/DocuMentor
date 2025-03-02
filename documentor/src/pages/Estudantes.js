import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Spinner, Form } from "react-bootstrap";
import { FaSearch, FaUserGraduate } from "react-icons/fa";
import "./Estudantes.css";

const coresCasas = {
  gryffindor: "#740001",
  slytherin: "#1A472A",
  ravenclaw: "#0E1A40",
  hufflepuff: "#cfb103",
  default: "#525151"
};

const Estudantes = () => {
  const [estudantes, setEstudantes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [termoBusca, setTermoBusca] = useState("");

  useEffect(() => {
    fetch("https://hp-api.onrender.com/api/characters/students")
      .then((res) => res.json())
      .then((dados) => {
        setEstudantes(dados);
        setCarregando(false);
      })
      .catch((error) => console.error("Erro ao buscar estudantes:", error));
  }, []);

  const filtrarEstudantes = () => {
    return estudantes.filter(estudante => {
      const termo = termoBusca.toLowerCase();
      return (
        estudante.name.toLowerCase().includes(termo) ||
        (estudante.house && estudante.house.toLowerCase().includes(termo))
      );
    });
  };

  const obterCorCasa = (casa) => {
    return casa ? coresCasas[casa.toLowerCase()] : coresCasas.default;
  };

  return (
    <div className="pagina-estudantes">
      <Container>
        <h1 className="titulo-principal text-center mb-4">
          <span>Alunos de Hogwarts</span>
          <div className="linha-divisoria"></div>
        </h1>

        <div className="barra-busca mb-5">
          <Form.Group controlId="formBuscaEstudantes">
            <div className="input-busca-container">
              <Form.Control
                type="text"
                placeholder="Buscar aluno por nome ou casa..."
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
                className="input-busca"
              />
            </div>
          </Form.Group>
        </div>

        {carregando ? (
          <div className="text-center mt-5">
            <Spinner animation="border" variant="light" className="spinner-ouro" />
          </div>
        ) : (
          <Row xs={1} md={2} lg={3} xl={4} className="g-4">
            {filtrarEstudantes().map((estudante) => {
              const corCasa = obterCorCasa(estudante.house);
              const temCasa = Boolean(estudante.house);

              return (
                <Col key={estudante.id} className="mb-4">
                  <Card 
                    className="card-estudante shadow-lg"
                    style={{ 
                      backgroundColor: "#2d2d2d",
                      transition: "all 0.3s ease",
                      border: "none"
                    }}
                    onMouseEnter={(e) => {
                      if (temCasa) e.currentTarget.style.backgroundColor = `${corCasa}33`;
                    }}
                    onMouseLeave={(e) => {
                      if (temCasa) e.currentTarget.style.backgroundColor = "#2d2d2d";
                    }}
                  >
                    <Card.Body>
                      <Card.Title className="nome-estudante text-light">
                        <FaUserGraduate className="icone-estudante" />
                        {estudante.name}
                      </Card.Title>
                      
                      <div className="detalhes-estudante">
                        <span className="casa-estudante">
                          {temCasa ? `Casa: ${estudante.house}` : "Casa não informada"}
                        </span>
                      </div>
                      
                      <Link
                        to={`/estudante/${estudante.id}`}
                        className="btn-detalhes-estudante"
                        style={{ 
                          backgroundColor: corCasa,
                          borderColor: corCasa
                        }}
                      >
                        Ver Detalhes
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Estudantes;