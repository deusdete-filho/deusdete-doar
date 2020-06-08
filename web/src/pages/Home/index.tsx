import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

import "./styles.css";

import logo from "../../assets/logo.png";
import iphone from "../../assets/iphone.png";

const Home = () => {
  return (
    <div id="page-home">
      <div className="content">
        <main>
          <div>
            <header>
              <img src={logo} alt="Ecoleta" title="Ecoleta" />
            </header>
            <h1> Conectamos pessoas que querem doar com quem mais precisa.</h1>
            <p>
              Ajudamos pessoas a encontrarem um ponto de doação de forma
              eficiente.
            </p>
            <Link to="/create-point" title="">
              <span>
                <FiArrowRight />
              </span>
              <strong>Cadastrar um ponto de doação</strong>
            </Link>
          </div>
          <div className="iphone">
            <img src={iphone} alt="Ecoleta" title="Ecoleta" />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
