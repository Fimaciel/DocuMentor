import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Casas.css"; // Criaremos este arquivo CSS separado

const Casas = () => {
  const casas = [
    { 
      name: "Grifinória", 
      img: "https://tavernaderivia.com.br/wp-content/uploads/2023/02/11.jpg", 
      id: "gryffindor",
      color: "#740001"
    },
    { 
      name: "Sonserina", 
      img: "https://tavernaderivia.com.br/wp-content/uploads/2023/02/sin.jpg", 
      id: "slytherin",
      color: "#1A472A"
    },
    { 
      name: "Corvinal", 
      img: " https://tavernaderivia.com.br/wp-content/uploads/2023/02/corv.jpg", 
      id: "ravenclaw",
      color: "#4168e8"
    },
    { 
      name: "Lufa-Lufa", 
      img: "https://tavernaderivia.com.br/wp-content/uploads/2023/02/lufa10.jpg", 
      id: "hufflepuff",
      color: "#FFD800"
    }
  ];

  return (
    <div className="hogwarts-background">
      <Container className="py-5">
        <h1 className="hogwarts-title mb-5">
          <span>Casas de</span>
          <span>Hogwarts</span>
        </h1>
        
        <Row className="g-4">
          {casas.map((casa) => (
            <Col key={casa.id} xs={12} md={6} lg={3}>
              <Card 
                className="house-card shadow-lg"
                style={{ borderColor: casa.color }}
              >
                <div className="card-image-container">
                  <Card.Img 
                    variant="top" 
                    src={casa.img} 
                    alt={casa.name}
                    className="card-image"
                  />
                  <div className="house-crest"></div>
                </div>
                
                <Card.Body className="d-flex flex-column">
                  <Card.Title 
                    className="house-name mb-4"
                    style={{ color: casa.color }}
                  >
                    {casa.name}
                  </Card.Title>
                  <Link 
                      to={`/casas/${casa.id}`} 
                      className="d-block text-center text-decoration-none py-2"
                      style={{ 
                        color: casa.color,
                        fontSize: "1.1rem",
                        letterSpacing: "1px",
                        transition: "all 0.3s ease"
                      }}
                  >
                      Ver Detalhes
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Casas;