-- phpMyAdmin SQL Dump
-- version 5.1.0-3.fc33
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : ven. 28 mai 2021 à 17:46
-- Version du serveur :  8.0.25
-- Version de PHP : 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `microblog`
--

CREATE DATABASE microblog;

-- --------------------------------------------------------

--
-- Structure de la table `abonnement`
--

CREATE TABLE `abonnement` (
  `idUser` int NOT NULL,
  `idAbonnement` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `abonnement`
--

INSERT INTO `abonnement` (`idUser`, `idAbonnement`) VALUES
(5, 6),
(5, 7),
(5, 9);

-- --------------------------------------------------------

--
-- Structure de la table `commentaire`
--

CREATE TABLE `commentaire` (
  `idCommentaire` int NOT NULL,
  `idPublication` int NOT NULL,
  `author` int NOT NULL,
  `date` datetime NOT NULL,
  `content` text NOT NULL,
  `nbLike` int NOT NULL,
  `nbDislike` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `commentaire`
--

INSERT INTO `commentaire` (`idCommentaire`, `idPublication`, `author`, `date`, `content`, `nbLike`, `nbDislike`) VALUES
(6, 11, 6, '2021-05-26 03:55:44', 'Ah genre ????', 0, 0),
(7, 11, 5, '2021-05-27 18:53:44', 'Faux', 0, 0),
(8, 13, 8, '2021-05-27 23:57:10', 'On ne comprend pas ce qu\'est la science de la chaussure, quand on ne comprend pas ce qu\'est la science', 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `publication`
--

CREATE TABLE `publication` (
  `idPublication` int NOT NULL,
  `date` datetime NOT NULL,
  `content` text NOT NULL,
  `nbLike` int NOT NULL,
  `nbDislike` int NOT NULL,
  `author` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `publication`
--

INSERT INTO `publication` (`idPublication`, `date`, `content`, `nbLike`, `nbDislike`, `author`) VALUES
(8, '2021-05-26 03:35:00', '@everyone “Quand on écrit, faut-il tout écrire ? Quand on peint, faut-il tout peindre ? De grâce, laissez quelque chose à suppléer par mon imagination ! #art”', 1, 0, 5),
(9, '2021-05-26 03:35:27', '@everyone “Celui qui se sera étudié lui-même sera bien avancé dans la connaissance des autres. #philosophie”', 0, 1, 5),
(10, '2021-05-26 03:35:38', '@everyone “Nous croyons conduire le destin, mais c’est toujours lui qui nous mène. #fatalitisme”', 1, 0, 5),
(11, '2021-05-26 03:35:56', '@Descartes5 L’esprit dit de jolies choses et n’en fait que de petites. #punchline', 1, 0, 5),
(12, '2021-05-26 03:39:11', '@everyone Je pense, donc je suis. #punchline', 0, 0, 6),
(13, '2021-05-26 03:39:57', '@everyone Toute science est une connaissance certaine et évidente. #science', 1, 0, 6),
(14, '2021-05-26 03:41:02', '@Diderot7 La raison est la seule chose qui nous rend hommes. #raison #philosophie', 0, 1, 6),
(15, '2021-05-27 01:44:21', '@everyone Les choses dont on parle le plus parmi les hommes sont assez ordinairement celles qu’on connaît le moins. #savoir', 0, 0, 5),
(16, '2021-05-27 19:07:06', 'La parole a beaucoup plus de force pour persuader que l\'écriture.', 0, 0, 6),
(19, '2021-05-27 23:04:10', '@ Diderot7 @everyone “Les choses dont on parle le plus parmi les hommes sont assez ordinairement celles qu’on connaît le moins. #savoir”', 0, 0, 9),
(20, '2021-05-27 23:56:36', '@spinoza4 Si on veut connaître un peuple, il faut écouter sa musique.', 0, 0, 8),
(21, '2021-05-28 00:02:15', '@everyone L\'amour est aveugle.', 0, 0, 8),
(22, '2021-05-28 00:02:27', '@Diderot7 @everyone “Nous croyons conduire le destin, mais c’est toujours lui qui nous mène. #fatalitisme”', 0, 0, 8),
(24, '2021-05-28 00:12:55', '@everyone Les hommes sont conduits plutôt par le désir aveugle que par la raison.', 0, 0, 9),
(25, '2021-05-28 00:14:19', '@everyone Le désir qui naît de la joie est plus fort que le désir qui naît de la tristesse.', 0, 0, 9),
(26, '2021-05-28 00:15:17', '@everyone Il n\'y a pas de plus grande joie que celle qu\'on n\'attend pas.', 0, 0, 7),
(27, '2021-05-28 00:15:33', '@Diderot7 @everyone “Celui qui se sera étudié lui-même sera bien avancé dans la connaissance des autres. #philosophie”', 0, 0, 7);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `idUser` int NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `nickname` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `avatar` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`idUser`, `name`, `email`, `nickname`, `password`, `avatar`) VALUES
(5, 'Denis Diderot', 'diderot@mail.fr', 'Diderot7', '$2b$10$vHbFT91b17XoawziovtP7uaG6V/WlxymDOy7YtNliG3q7n3NtvMvG', 'diderot.jpeg'),
(6, 'Rene Descartes', 'descartes@mail.fr', 'Descartes5', '$2b$10$gGLuF7dxzlskWkmV0KLwgutO0g2jpQlGNLn9FcD8xneSCJJK8OUvm', 'descartes.png'),
(7, 'Sophocle', 'sophocle@mail.fr', 'Sophocle2', '$2b$10$5MCqYca1gNvhVwZSa6S6K.AmW/1HrBCSZRXbqdcxs2bb1P0Wif.ve', 'sophocle.jpeg'),
(8, 'Platon', 'platon@mail.fr', 'Platon3', '$2b$10$oz0Xx.jXF/wOJzTQ52TFYOXwehCmEr1VZbJzD6n/OMyyLcxJpYWxy', 'platon.jpeg'),
(9, 'Baruch Spinoza', 'spinoza@mail.fr', 'Spinoza4', '$2b$10$ldJgN46mNiRxKjFXVVNpa.G.LN8Vq5fpdxK5w7hVdgSkksMc4wRIm', 'spinoza.jpeg');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `abonnement`
--
ALTER TABLE `abonnement`
  ADD PRIMARY KEY (`idUser`,`idAbonnement`),
  ADD KEY `idAbonnement` (`idAbonnement`);

--
-- Index pour la table `commentaire`
--
ALTER TABLE `commentaire`
  ADD PRIMARY KEY (`idCommentaire`),
  ADD KEY `author` (`author`),
  ADD KEY `idPublication` (`idPublication`);

--
-- Index pour la table `publication`
--
ALTER TABLE `publication`
  ADD PRIMARY KEY (`idPublication`),
  ADD KEY `author` (`author`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`idUser`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `commentaire`
--
ALTER TABLE `commentaire`
  MODIFY `idCommentaire` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `publication`
--
ALTER TABLE `publication`
  MODIFY `idPublication` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `idUser` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `abonnement`
--
ALTER TABLE `abonnement`
  ADD CONSTRAINT `abonnement_ibfk_1` FOREIGN KEY (`idAbonnement`) REFERENCES `user` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `abonnement_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `commentaire`
--
ALTER TABLE `commentaire`
  ADD CONSTRAINT `commentaire_ibfk_1` FOREIGN KEY (`author`) REFERENCES `user` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `commentaire_ibfk_2` FOREIGN KEY (`idPublication`) REFERENCES `publication` (`idPublication`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `publication`
--
ALTER TABLE `publication`
  ADD CONSTRAINT `publication_ibfk_1` FOREIGN KEY (`author`) REFERENCES `user` (`idUser`) ON DELETE CASCADE ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
