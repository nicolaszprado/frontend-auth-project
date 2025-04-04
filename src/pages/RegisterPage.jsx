
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import InputField from "../components/InputField";
import "../styles/AuthPages.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    if (errors[id]) {
      setErrors({ ...errors, [id]: "" });
    }

    if (registerError) {
      setRegisterError("");
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Digite um e-mail válido";
    }
    
    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 6) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setRegisterError("");
    
    try {
      const userData = await registerUser(
        formData.name,
        formData.email,
        formData.password
      );
      login(userData);
      navigate("/home");
    } catch (error) {
      setRegisterError(error.message || "Falha ao registrar. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Criar Conta</h1>
          <p className="auth-subtitle">Cadastre-se para começar</p>
        </div>
        
        {registerError && (
          <div className="error-alert" role="alert">
            <p>{registerError}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <InputField
            id="name"
            label="Nome Completo"
            type="text"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="João Silva"
            required
            autoComplete="name"
          />
          
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
            autoComplete="new-password"
          />
          
          <InputField
            id="confirmPassword"
            label="Confirmar Senha"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            placeholder="••••••••"
            required
            autoComplete="new-password"
          />
          
          <button
            type="submit"
            disabled={isLoading}
            className="submit-button"
          >
            {isLoading ? "Criando conta..." : "Criar Conta"}
          </button>
        </form>
        
        <div className="auth-footer">
          <p className="switch-prompt">
            Já tem uma conta?{" "}
            <Link to="/login" className="switch-link">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
