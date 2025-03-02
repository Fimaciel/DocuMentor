import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Card, Spinner, Row, Col, ListGroup, Badge } from "react-bootstrap";
import { 
  FaUser, 
  FaMagic, 
  FaBirthdayCake, 
  FaEye, 
  FaPalette, 
  FaTheaterMasks,
  FaHatWizard,
  FaTree
} from "react-icons/fa";
import "./Estudante.css";

const coresCasas = {
  gryffindor: "#740001",
  slytherin: "#1A472A",
  ravenclaw: "#0E1A40",
  hufflepuff: "#FFD800",
  default: "#ffffff"
};

const Estudante = () => {
  const { id } = useParams();
  const [estudante, setEstudante] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const formatarData = (dataString) => {
    if (!dataString) return "Não informado";
    const [dia, mes] = dataString.split("-");
    const meses = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    return `${dia} de ${meses[parseInt(mes)-1]}`;
  };

  useEffect(() => {
    const carregarEstudante = async () => {
      try {
        const resposta = await fetch("https://hp-api.onrender.com/api/characters/students");
        if (!resposta.ok) throw new Error("Erro na API");
        const dados = await resposta.json();
        
        const estudanteEncontrado = dados.find(e => e.id === id);
        if (!estudanteEncontrado) throw new Error("Estudante não encontrado");
        
        setEstudante(estudanteEncontrado);
        setCarregando(false);
      } catch (error) {
        setErro(error.message);
        setCarregando(false);
      }
    };

    carregarEstudante();
  }, [id]);

  const obterCorCasa = () => {
    return estudante?.house ? coresCasas[estudante.house.toLowerCase()] : coresCasas.default;
  };

  const renderizarListaAlternativos = (dados, label) => {
    if (!dados || dados.length === 0) return null;
    return (
      <ListGroup.Item className="detalhe-item">
        <FaUser className="icone-detalhe" />
        <strong>{label}:</strong> {dados.join(", ")}
      </ListGroup.Item>
    );
  };

  return (
    <div className="pagina-estudante">
      <Container>
        <Link to="/estudantes" className="btn-voltar">
          &larr; Voltar aos Estudantes
        </Link>
        
        {carregando ? (
          <div className="text-center mt-5">
            <Spinner animation="border" variant="light" className="spinner-ouro" />
          </div>
        ) : erro ? (
          <div className="erro-container">
            <h2 className="text-center text-light">{erro}</h2>
            <Link to="/estudantes" className="btn-voltar">
              Ver Todos os Estudantes
            </Link>
          </div>
        ) : estudante ? (
          <Card className="card-estudante shadow-lg" style={{ borderColor: obterCorCasa() }}>
            <Row className="g-0">
              <Col md={4} className="d-flex align-items-center">
                <div className="imagem-container">
                  <Card.Img 
                    variant="top" 
                    src={estudante.image || "/student-detail-placeholder.png"} 
                    alt={estudante.name}
                    className="imagem-estudante"
                  />
                </div>
              </Col>
              
              <Col md={8}>
                <Card.Body className="info-estudante">
                  <Card.Title className="titulo-estudante text-light">
                    <FaHatWizard className="icone-titulo" />
                    {estudante.name}
                  </Card.Title>

                  <Row>
                    <Col md={6}>
                      <ListGroup variant="flush" className="detalhes-lista">
                        <ListGroup.Item className="detalhe-item">
                          <FaUser className="icone-detalhe" />
                          <strong>Espécie:</strong> {estudante.species || "Não informado"}
                        </ListGroup.Item>

                        <ListGroup.Item className="detalhe-item">
                          <FaUser className="icone-detalhe" />
                          <strong>Gênero:</strong> {estudante.gender || "Não informado"}
                        </ListGroup.Item>

                        <ListGroup.Item className="detalhe-item">
                          <FaBirthdayCake className="icone-detalhe" />
                          <strong>Nascimento:</strong> {estudante.dateOfBirth ? 
                            `${formatarData(estudante.dateOfBirth)} (${estudante.yearOfBirth})` : 
                            "Não informado"}
                        </ListGroup.Item>

                        <ListGroup.Item className="detalhe-item">
                          <FaMagic className="icone-detalhe" />
                          <strong>Linhagem:</strong> {estudante.ancestry || "Não informado"}
                        </ListGroup.Item>

                        <ListGroup.Item className="detalhe-item">
                          <FaEye className="icone-detalhe" />
                          <strong>Olhos:</strong> {estudante.eyeColour || "Não informado"}
                        </ListGroup.Item>

                        <ListGroup.Item className="detalhe-item">
                          <FaPalette className="icone-detalhe" />
                          <strong>Cabelo:</strong> {estudante.hairColour || "Não informado"}
                        </ListGroup.Item>
                      </ListGroup>
                    </Col>

                    <Col md={6}>
                      <ListGroup variant="flush" className="detalhes-lista">
                        <ListGroup.Item className="detalhe-item">
                          <FaMagic className="icone-detalhe" />
                          <strong>Varinha:</strong>
                          <div className="ms-3">
                            {estudante.wand?.wood ? (
                              <>
                                <div>Madeira: {estudante.wand.wood}</div>
                                <div>Núcleo: {estudante.wand.core || "Não informado"}</div>
                                <div>Comprimento: {estudante.wand.length ? 
                                  `${estudante.wand.length} polegadas` : "Não informado"}
                                </div>
                              </>
                            ) : "Não informado"}
                          </div>
                        </ListGroup.Item>

                        <ListGroup.Item className="detalhe-item">
                          <FaMagic className="icone-detalhe" />
                          <strong>Patrono:</strong> {estudante.patronus || "Não informado"}
                        </ListGroup.Item>

                        <ListGroup.Item className="detalhe-item">
                          <FaTheaterMasks className="icone-detalhe" />
                          <strong>Ator:</strong> {estudante.actor || "Não informado"}
                        </ListGroup.Item>

                        {renderizarListaAlternativos(estudante.alternate_names, "Nomes Alternativos")}
                        {renderizarListaAlternativos(estudante.alternate_actors, "Atores Alternativos")}

                        <ListGroup.Item className="detalhe-item">
                          <FaTree className="icone-detalhe" />
                          <strong>Status:</strong> 
                          <Badge bg={estudante.alive ? "success" : "danger"} className="ms-2">
                            {estudante.alive ? "Vivo" : "Falecido"}
                          </Badge>
                        </ListGroup.Item>
                      </ListGroup>
                    </Col>
                  </Row>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        ): ""}
      </Container>
    </div>
  );
};

export default Estudante;