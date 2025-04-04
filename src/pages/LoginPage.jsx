
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import InputField from "../components/InputField";
import "../styles/AuthPages.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    if (errors[id]) {
      setErrors({ ...errors, [id]: "" });
    }

    if (loginError) {
      setLoginError("");
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Digite um e-mail válido";
    }
    
    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setLoginError("");
    
    try {
      const userData = await loginUser(formData.email, formData.password);
      login(userData);
      navigate("/home");
    } catch (error) {
      setLoginError(error.message || "Falha ao fazer login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Bem-vindo(a) de volta</h1>
          <p className="auth-subtitle">Entre na sua conta</p>
        </div>
        
        {loginError && (
          <div className="error-alert" role="alert">
            <p>{loginError}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <InputField
            id="email"
            label="E-mail"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="seu@email.com"
            required
            autoComplete="email"
          />
          
          <InputField
            id="password"
            label="Senha"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="••••••••"
            required
            autoComplete="current-password"
          />
          
          <div className="form-options">
            <div className="remember-me">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="checkbox"
              />
              <label htmlFor="remember-me" className="checkbox-label">
                Lembrar-me
              </label>
            </div>
            
            <div className="forgot-password">
              <a href="#" className="forgot-link">
                Esqueceu a senha?
              </a>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="submit-button"
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>
        
        <div className="auth-footer">
          <p className="switch-prompt">
            Não tem uma conta?{" "}
            <Link to="/register" className="switch-link">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
