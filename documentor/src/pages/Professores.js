import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Spinner, Form } from "react-bootstrap";
import { FaSearch, FaHatWizard, FaBookReader } from "react-icons/fa";
import "./Professores.css";

const Professores = () => {
  const [professores, setProfessores] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [termoBusca, setTermoBusca] = useState("");

  useEffect(() => {
    fetch("https://hp-api.onrender.com/api/characters/staff")
      .then((res) => res.json())
      .then((dados) => {
        setProfessores(dados);
        setCarregando(false);
      })
      .catch((error) => console.error("Erro ao buscar professores:", error));
  }, []);

  const filtrarProfessores = () => {
    return professores.filter(professor => {
      const termo = termoBusca.toLowerCase();
      return (
        professor.name.toLowerCase().includes(termo) ||
        (professor.house && professor.house.toLowerCase().includes(termo))
    )});
  };

  return (
    <div className="pagina-professores">
      <Container>
        <h1 className="titulo-principal text-center mb-4">
          <span>Docentes de Hogwarts</span>
          <div className="linha-divisoria"></div>
        </h1>

        <div className="barra-busca mb-5">
          <Form.Group controlId="formBuscaProfessores">
            <div className="input-busca-container">
              <Form.Control
                type="text"
                placeholder="Buscar professor por nome ou casa..."
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
          <>
            {filtrarProfessores().length === 0 ? (
              <div className="text-center text-light mb-5">
                <h3>Nenhum professor encontrado para "{termoBusca}"</h3>
                <p>Tente outro termo de busca</p>
              </div>
            ) : (
              <Row xs={1} md={2} lg={3} className="g-4">
                {filtrarProfessores().map((professor) => (
                  <Col key={professor.id} className="mb-4">
                    <Card className="card-professor shadow-lg">
                      <Card.Body>
                        <div className="cabecalho-professor">
                            <FaBookReader className="icone-professor" />
                          <Card.Title className="nome-professor text-light">
                            {professor.name}
                          </Card.Title>
                        </div>
                        <Link
                          to={`/professor/${professor.id}`}
                          className="btn-detalhes-professor"
                        >
                           Ver mais
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default Professores;