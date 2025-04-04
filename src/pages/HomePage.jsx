
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/HomePage.css";

const HomePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="home-container">
      <nav className="home-nav">
        <div className="nav-content">
          <div className="nav-brand">
            <span className="dashboard-title">Painel</span>
          </div>
          <div className="user-section">
            <span className="welcome-message">Bem-vindo(a), {user?.username}</span>
            <button
              onClick={handleLogout}
              className="logout-button"
            >
              Sair
            </button>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <div className="content-wrapper">
          <div className="dashboard-box">
            <div className="dashboard-info">
              <h2 className="info-title">Bem-vindo(a) ao seu Painel</h2>
              <p className="info-message">Você está logado com sucesso!</p>
              <p className="info-detail">Esta é uma página protegida que requer autenticação</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
