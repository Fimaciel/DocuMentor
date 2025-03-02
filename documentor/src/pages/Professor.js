import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Container, 
  Card, 
  Spinner, 
  Row, 
  Col, 
  ListGroup, 
  Badge 
} from "react-bootstrap";
import { 
  FaMagic,
  FaUser,
  FaTransgender,
  FaBirthdayCake,
  FaCat,
  FaTheaterMasks,
  FaTree,
  FaHatWizard
} from "react-icons/fa";
import "./Professor.css";

const Professor = () => {
  const { id } = useParams();
  const [professor, setProfessor] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const coresCasas = {
    gryffindor: "#740001",
    slytherin: "#1A472A",
    ravenclaw: "#0E1A40",
    hufflepuff: "#FFD800",
    default: "#8400ff"
  };

  useEffect(() => {
    const carregarProfessor = async () => {
      try {
        const resposta = await fetch("https://hp-api.onrender.com/api/characters/staff");
        if (!resposta.ok) throw new Error("Erro na API");
        const dados = await resposta.json();
        
        const professorEncontrado = dados.find(p => p.id === id);
        if (!professorEncontrado) throw new Error("Professor não encontrado");
        
        setProfessor(professorEncontrado);
        setCarregando(false);
      } catch (error) {
        setErro(error.message);
        setCarregando(false);
      }
    };

    carregarProfessor();
  }, [id]);

  const formatarData = (dataString) => {
    if (!dataString) return "Não informado";
    const [dia, mes] = dataString.split("-");
    const meses = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    return `${dia} de ${meses[parseInt(mes)-1]}`;
  };

  const obterCorCasa = () => {
    return professor?.house ? coresCasas[professor.house.toLowerCase()] : coresCasas.default;
  };

  const renderizarLista = (dados, label) => {
    if (!dados || dados.length === 0) return null;
    return (
      <ListGroup.Item className="detalhe-item">
        <FaUser className="icone-detalhe" />
        <strong>{label}:</strong> {dados.join(", ")}
      </ListGroup.Item>
    );
  };

  return (
    <div className="pagina-professor">
      <Container>
        <Link to="/professores" className="btn-voltar">
          &larr; Voltar aos Professores
        </Link>
        
        {carregando ? (
          <div className="text-center mt-5">
            <Spinner animation="border" variant="light" className="spinner-ouro" />
          </div>
        ) : erro ? (
          <div className="erro-container">
            <h2 className="text-center text-light">{erro}</h2>
            <Link to="/professores" className="btn-voltar">
              Ver Todos os Professores
            </Link>
          </div>
        ) : professor ? (
          <Card className="card-professor shadow-lg" style={{ borderColor: obterCorCasa() }}>
            <Row className="g-0">
              <Col md={4} className="d-flex align-items-center">
                <div className="imagem-container">
                  <Card.Img 
                    variant="top" 
                    src={professor.image || "/wizard-placeholder.png"} 
                    alt={professor.name}
                    className="imagem-professor"
                  />
                </div>
              </Col>
              
              <Col md={8}>
                <Card.Body className="info-professor">
                  <Card.Title className="titulo-professor text-light">
                    <FaHatWizard className="icone-titulo" />
                    {professor.name}
                  </Card.Title>

                  <Row>
                    <Col md={6}>
                      <ListGroup variant="flush" className="detalhes-lista">
                        <ListGroup.Item className="detalhe-item">
                          <FaTransgender className="icone-detalhe" />
                          <strong>Espécie:</strong> {professor.species || "Não informado"}
                        </ListGroup.Item>

                        <ListGroup.Item className="detalhe-item">
                          <FaUser className="icone-detalhe" />
                          <strong>Gênero:</strong> {professor.gender || "Não informado"}
                        </ListGroup.Item>

                        <ListGroup.Item className="detalhe-item">
                          <FaBirthdayCake className="icone-detalhe" />
                          <strong>Nascimento:</strong> {professor.dateOfBirth ? 
                            `${formatarData(professor.dateOfBirth)} (${professor.yearOfBirth})` : 
                            "Não informado"}
                        </ListGroup.Item>

                        <ListGroup.Item className="detalhe-item">
                          <FaMagic className="icone-detalhe" />
                          <strong>Linhagem:</strong> {professor.ancestry || "Não informado"}
                        </ListGroup.Item>
                      </ListGroup>
                    </Col>

                    <Col md={6}>
                      <ListGroup variant="flush" className="detalhes-lista">
                        <ListGroup.Item className="detalhe-item">
                          <FaMagic className="icone-detalhe" />
                          <strong>Varinha:</strong>
                          <div className="ms-3">
                            {professor.wand?.wood ? (
                              <>
                                <div>Madeira: {professor.wand.wood}</div>
                                <div>Núcleo: {professor.wand.core || "Não informado"}</div>
                                <div>Comprimento: {professor.wand.length ? 
                                  `${professor.wand.length} polegadas` : "Não informado"}
                                </div>
                              </>
                            ) : "Não informado"}
                          </div>
                        </ListGroup.Item>

                        <ListGroup.Item className="detalhe-item">
                          <FaCat className="icone-detalhe" />
                          <strong>Patrono:</strong> {professor.patronus || "Não informado"}
                        </ListGroup.Item>
                      </ListGroup>
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col>
                      <ListGroup variant="flush" className="detalhes-lista">
                        <ListGroup.Item className="detalhe-item">
                          <FaTheaterMasks className="icone-detalhe" />
                          <strong>Ator:</strong> {professor.actor || "Não informado"}
                        </ListGroup.Item>

                        {renderizarLista(professor.alternate_names, "Nomes Alternativos")}
                        {renderizarLista(professor.alternate_actors, "Atores Alternativos")}

                        <ListGroup.Item className="detalhe-item">
                          <FaTree className="icone-detalhe" />
                          <strong>Status:</strong> 
                          <Badge bg={professor.alive ? "success" : "danger"} className="ms-2">
                            {professor.alive ? "Vivo" : "Falecido"}
                          </Badge>
                        </ListGroup.Item>
                      </ListGroup>
                    </Col>
                  </Row>
                </Card.Body>
              </Col>
            </Row>
          </Card>
      ) : null}
      </Container>
    </div>
  );
};

export default Professor;