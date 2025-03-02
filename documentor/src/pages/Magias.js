import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Spinner, Form } from "react-bootstrap";
import { FaMagic, FaBookDead, FaRegSnowflake, FaFire } from "react-icons/fa";
import traducoes from '../utils/traducoes.json'; 
import "./Magias.css";

const Magias = () => {
  const [magias, setMagias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [termoBusca, setTermoBusca] = useState("");

  const obterIcone = (tipo) => {
    const tipoLower = tipo?.toLowerCase() || '';
    if (tipoLower.includes('maldição')) return <FaBookDead className="me-2"/>;
    if (tipoLower.includes('gelo')) return <FaRegSnowflake className="me-2"/>;
    if (tipoLower.includes('fogo')) return <FaFire className="me-2"/>;
    return <FaMagic className="me-2"/>;
  };

  const filtrarMagias = () => {
    return magias.filter(magia => {
      const termo = termoBusca.toLowerCase();
      return (
        magia.name.toLowerCase().includes(termo) ||
        (magia.description && magia.description.toLowerCase().includes(termo))
      );
    });
  };

  const traduzirDescricao = (nomeFeitico) => {
    return traducoes.feitiços[nomeFeitico] || nomeFeitico;
  };

  useEffect(() => {
    fetch("https://hp-api.onrender.com/api/spells")
      .then((res) => res.json())
      .then((dados) => {
        setMagias(dados);
        setCarregando(false);
      })
      .catch((error) => console.error("Erro ao buscar magias:", error));
  }, []);

  return (
    <div className="pagina-magias">
      <Container>
        <h1 className="titulo-magico text-center mb-4">
          <span>Feitiços e Magias</span>
          <div className="linha-divisoria"></div>
        </h1>

        <div className="barra-busca mb-5">
          <Form.Group controlId="formBuscaMagias">
            <div className="input-busca-container">
              <Form.Control
                type="text"
                placeholder="Procurar magia por nome ou descrição..."
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
            {filtrarMagias().length === 0 ? (
              <div className="text-center text-light mb-5">
                <h3>Nenhuma magia encontrada para "{termoBusca}"</h3>
                <p>Tente outro termo de busca</p>
              </div>
            ) : (
              <Row xs={1} md={2} lg={3} className="g-4">
                {filtrarMagias().map((magia, index) => (
                  <Col key={index}>
                    <Card className="card-magia shadow-lg">
                      <Card.Body>
                        <div className="cabecalho-magia">
                          {obterIcone(magia.type)}
                          <Card.Title className="nome-magia text-white">
                            {magia.name}
                          </Card.Title>
                        </div>
                        
                        <Card.Text className="descricao-magia">
                          {traduzirDescricao(magia.name)}
                        </Card.Text>
                        
                        <div className="metadados-magia">
                          <span className="tipo-magia">
                            {magia.type || 'Encantamento'}
                          </span>
                          {magia.incantation && (
                            <span className="encantamento">
                              ✨ {magia.incantation}
                            </span>
                          )}
                        </div>
                        
                        <Link 
                          to={`/magias/${magia.name}`} 
                          className="btn-detalhes-magia"
                        >
                          Revelar Segredos
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

export default Magias;
