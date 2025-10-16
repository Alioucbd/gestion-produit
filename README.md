# GestionProduit


Projet full-stack de gestion de produits comprenant un **backend** en Spring Boot (Java, Maven) et un **frontend** en Angular.

---

## 🧱 Structure du projet

gestion-produit/
|-- back/ # Backend - Spring Boot (Maven)
|-- front/ # Frontend - Angular (Node.js)


---

## 🚀 Fonctionnalités

- ✅ CRUD Produits (Créer, Lire, Modifier, Supprimer)
- ✅ Interface utilisateur moderne avec Angular
- ✅ API REST sécurisée
- ✅ Architecture standalone
- 🔄 base de données relationnelle (MySQL)

---

## 📦 Technologies utilisées

### Backend (Spring Boot)
- Java 17 
- Spring Boot (Web, Data JPA, etc.)
- Maven
- H2 / MySQL (selon config)
- Spring Security (optionnel)

### Frontend (Angular)
- Angular CLI
- TypeScript
- RxJS
- Bootstrap
- Angular Material

---

## ⚙️ Installation & exécution

### ✅ Prérequis

- Java 17 installé
- Node.js 22.20.0 & npm 10.9.3 installés
- Angular 20.3.0
- Angular CLI (global) recommandé : `npm install -g @angular/cli`


---

### 1. Cloner le dépôt

```bash
git clone https://github.com/alioucbd/gestion-produit.git
cd gestion-produit

2. Lancer le Backend (Spring Boot)
cd back
./mvnw clean install      # Compile et installe les dépendances
./mvnw spring-boot:run

3. Lancer le Frontend (Angular)
cd front
npm install
ng serve


This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.4.



