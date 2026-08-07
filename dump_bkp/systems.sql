-- MySQL dump 10.13  Distrib 8.0.45, for Linux (x86_64)
--
-- Host: localhost    Database: systems
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `address_type_params`
--

DROP TABLE IF EXISTS `address_type_params`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address_type_params` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` varchar(60) COLLATE utf8mb4_general_ci NOT NULL,
  `code` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `i18n_id` int DEFAULT NULL,
  `erased` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address_type_params`
--

LOCK TABLES `address_type_params` WRITE;
/*!40000 ALTER TABLE `address_type_params` DISABLE KEYS */;
INSERT INTO `address_type_params` VALUES (1,'Cobrança / Faturamento','BILLING',4,0),(2,'Entrega','DELIVERY',5,0),(3,'Sem classificação','NONE',6,0);
/*!40000 ALTER TABLE `address_type_params` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cities_params`
--

DROP TABLE IF EXISTS `cities_params`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities_params` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_state` int NOT NULL,
  `text` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `ibge_code` char(7) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `erased` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_city_state` (`id_state`),
  CONSTRAINT `fk_city_state` FOREIGN KEY (`id_state`) REFERENCES `states_params` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities_params`
--

LOCK TABLES `cities_params` WRITE;
/*!40000 ALTER TABLE `cities_params` DISABLE KEYS */;
INSERT INTO `cities_params` VALUES (1,25,'São Paulo',NULL,0),(2,19,'Rio de Janeiro',NULL,0),(3,13,'Belo Horizonte',NULL,0),(4,5,'Salvador',NULL,0),(5,6,'Fortaleza',NULL,0),(6,16,'Curitiba',NULL,0),(7,4,'Manaus',NULL,0),(8,17,'Recife',NULL,0),(9,21,'Porto Alegre',NULL,0),(10,14,'Belém',NULL,0),(11,9,'Goiânia',NULL,0),(12,25,'Guarulhos',NULL,0),(13,25,'Campinas',NULL,0),(14,10,'São Luís',NULL,0),(15,2,'Maceió',NULL,0),(16,20,'Natal',NULL,0),(17,18,'Teresina',NULL,0),(18,12,'Campo Grande',NULL,0),(19,15,'João Pessoa',NULL,0),(20,26,'Aracaju',NULL,0),(21,11,'Cuiabá',NULL,0),(22,3,'Macapá',NULL,0),(23,22,'Porto Velho',NULL,0),(24,1,'Rio Branco',NULL,0),(25,23,'Boa Vista',NULL,0),(26,27,'Palmas',NULL,0),(27,8,'Vitória',NULL,0),(28,24,'Florianópolis',NULL,0),(29,5,'Porto Seguro',NULL,0),(30,5,'Ilhéus',NULL,0),(31,5,'Feira de Santana',NULL,0),(32,17,'Caruaru',NULL,0),(33,17,'Petrolina',NULL,0),(34,6,'Juazeiro do Norte',NULL,0),(35,20,'Mossoró',NULL,0),(36,15,'Campina Grande',NULL,0),(37,6,'Sobral',NULL,0),(38,10,'Imperatriz',NULL,0),(39,21,'Caxias do Sul',NULL,0),(40,21,'Pelotas',NULL,0),(41,21,'Santa Maria',NULL,0),(42,16,'Londrina',NULL,0),(43,16,'Maringá',NULL,0),(44,16,'Foz do Iguaçu',NULL,0),(45,24,'Joinville',NULL,0),(46,24,'Blumenau',NULL,0),(47,24,'Chapecó',NULL,0),(48,13,'Uberlândia',NULL,0),(49,13,'Contagem',NULL,0),(50,13,'Juiz de Fora',NULL,0),(51,13,'Betim',NULL,0),(52,13,'Montes Claros',NULL,0),(53,25,'Ribeirão Preto',NULL,0),(54,25,'São José dos Campos',NULL,0),(55,25,'Santos',NULL,0),(56,25,'Sorocaba',NULL,0),(57,25,'Osasco',NULL,0),(58,25,'Santo André',NULL,0),(59,25,'São Bernardo do Campo',NULL,0),(60,25,'Mogi das Cruzes',NULL,0),(61,25,'Jundiaí',NULL,0),(62,25,'Piracicaba',NULL,0),(63,25,'Bauru',NULL,0),(64,25,'Carapicuíba',NULL,0),(65,14,'Ananindeua',NULL,0),(66,14,'Santarém',NULL,0),(67,9,'Aparecida de Goiânia',NULL,0),(68,9,'Anápolis',NULL,0),(69,11,'Rondonópolis',NULL,0),(70,11,'Várzea Grande',NULL,0),(71,12,'Corumbá',NULL,0),(72,12,'Dourados',NULL,0),(73,19,'Macaé',NULL,0),(74,19,'Nova Iguaçu',NULL,0),(75,19,'Duque de Caxias',NULL,0),(76,19,'Niterói',NULL,0),(77,19,'São Gonçalo',NULL,0),(78,19,'Petrópolis',NULL,0),(79,19,'Volta Redonda',NULL,0),(80,19,'Campos dos Goytacazes',NULL,0),(81,8,'Serra',NULL,0),(82,8,'Cariacica',NULL,0),(83,8,'Vila Velha',NULL,0),(84,6,'Caucaia',NULL,0),(85,6,'Maracanaú',NULL,0),(86,5,'Camaçari',NULL,0),(87,5,'Lauro de Freitas',NULL,0),(88,5,'Vitória da Conquista',NULL,0),(89,22,'Ji-Paraná',NULL,0),(90,27,'Araguaína',NULL,0),(91,2,'Arapiraca',NULL,0),(92,20,'Mossoró',NULL,0),(93,18,'Parnaíba',NULL,0),(94,18,'Picos',NULL,0),(95,10,'Timon',NULL,0),(96,10,'Codó',NULL,0),(97,24,'Itajaí',NULL,0),(98,24,'Lages',NULL,0),(99,16,'Cascavel',NULL,0),(100,16,'Ponta Grossa',NULL,0);
/*!40000 ALTER TABLE `cities_params` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `cpf_cnpj` varchar(18) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `person_type` char(1) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'F',
  `birth_date` date DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `erased` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,'Carlos Vieira Martins','carlos.vieira4@ficticio.com.br','490.819.036-40','F','1968-12-15',1,'2026-04-17 01:11:09','2026-05-06 01:52:07',0,NULL),(2,'Leonardo Barbosa Alves','leonardo.barbosa13@invalid.com.br','691.768.530-55','F','1964-02-13',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(3,'Natália Andrade Pinto','natália.andrade69@ficticio.com.br','805.036.646-42','F','1983-07-21',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(4,'Paulo Pinto Lopes','paulo.pinto50@ficticio.com.br','767.377.442-90','F','1974-05-19',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(5,'Tatiane Carvalho Marques','tatiane.carvalho1@invalid.com.br','899.599.335-98','F','1966-02-11',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(6,'Patrícia Marques Almeida','patrícia.marques19@ficticio.com.br','162.660.543-29','F','1986-12-07',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(7,'Simone Fernandes Almeida','simone.fernandes67@invalid.com.br','099.304.579-09','F','1991-08-11',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(8,'Adriana Mendes Alves','adriana.mendes53@ficticio.com.br','919.307.458-18','F','1978-10-18',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(9,'Leonardo Ferreira Rodrigues','leonardo.ferreira48@invalid.com.br','539.166.304-07','F','1966-02-06',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(10,'Larissa Nascimento Rodrigues','larissa.nascimento59@ficticio.com.br','632.992.084-20','F','1999-05-19',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(11,'Daniel Gomes Vieira','daniel.gomes62@invalid.com.br','837.628.768-00','F','1973-11-14',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(12,'João Barbosa Rodrigues','joão.barbosa5@invalid.com.br','655.248.781-90','F','1969-10-14',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(13,'Juliana Cardoso Rezende','juliana.cardoso53@ficticio.com.br','895.963.991-52','F','1984-02-02',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(14,'Carolina Machado Teixeira','carolina.machado31@ficticio.com.br','649.608.096-80','F','1961-07-12',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(15,'Lucas Freitas Cardoso','lucas.freitas30@invalid.com.br','437.849.019-64','F','1965-02-07',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(16,'Ana Fernandes Ramos','ana.fernandes23@ficticio.com.br','648.975.183-69','F','1998-06-28',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(17,'Henrique Oliveira Sousa','henrique.oliveira99@invalid.com.br','508.329.773-65','F','1994-05-07',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(18,'Matheus Machado Martins','matheus.machado36@ficticio.com.br','171.481.279-04','F','1998-08-23',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(19,'Amanda Alves Almeida','amanda.alves42@invalid.com.br','553.947.355-81','F','1975-05-14',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(20,'Eduardo Cardoso Ferreira','eduardo.cardoso37@invalid.com.br','045.145.753-64','F','1994-05-25',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(21,'Roberto Ribeiro Oliveira','roberto.ribeiro83@ficticio.com.br','319.540.429-06','F','2000-03-14',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(22,'Vinícius Carvalho Pereira','vinícius.carvalho6@ficticio.com.br','528.844.037-95','F','1970-04-02',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(23,'Cristina Lima Nunes','cristina.lima70@invalid.com.br','349.416.876-80','F','1979-09-06',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(24,'Eduardo Lopes Fernandes','eduardo.lopes18@ficticio.com.br','761.917.085-56','F','1976-05-14',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(25,'Amanda Mendes Souza','amanda.mendes84@invalid.com.br','856.786.252-33','F','1976-04-13',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(26,'Monique Araújo Marques','monique.araújo34@invalid.com.br','976.842.325-09','F','1960-12-23',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(27,'Fernanda Oliveira Mendes','fernanda.oliveira94@ficticio.com.br','544.739.600-05','F','1967-11-26',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(28,'Sabrina Vieira Lopes','sabrina.vieira47@invalid.com.br','275.944.438-45','F','1963-11-01',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(29,'Débora Alves Moreira','débora.alves70@ficticio.com.br','213.840.156-12','F','1967-02-28',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(30,'Diego Souza Martins','diego.souza17@invalid.com.br','557.230.009-85','F','1994-08-27',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(31,'Carolina Sousa Moreira','carolina.sousa68@invalid.com.br','409.841.115-65','F','1992-01-04',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(32,'Felipe Carvalho Dias','felipe.carvalho70@ficticio.com.br','316.725.835-78','F','1996-09-26',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(33,'Pedro Mendes Gomes','pedro.mendes1@ficticio.com.br','853.944.760-63','F','1988-12-06',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(34,'Bruno Lopes Rezende','bruno.lopes80@invalid.com.br','423.395.168-03','F','1996-03-14',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(35,'Sérgio Araújo Oliveira','sérgio.araújo99@ficticio.com.br','769.287.108-61','F','1993-04-12',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(36,'Fábio Rezende Santos','fábio.rezende92@invalid.com.br','694.658.771-58','F','1996-06-08',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(37,'Leonardo Rocha Rezende','leonardo.rocha26@ficticio.com.br','018.438.010-35','F','1972-07-10',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(38,'Vanessa Machado Cardoso','vanessa.machado60@invalid.com.br','558.469.107-00','F','1964-07-14',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(39,'João Oliveira Fernandes','joão.oliveira28@ficticio.com.br','845.072.721-90','F','1999-11-03',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(40,'Vanessa Freitas Alves','vanessa.freitas91@ficticio.com.br','732.226.032-51','F','1977-03-12',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(41,'Diego Dias Mendes','diego.dias70@invalid.com.br','246.779.178-50','F','1998-04-08',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(42,'Rodrigo Vieira Vieira','rodrigo.vieira96@ficticio.com.br','411.957.832-13','F','1984-10-24',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(43,'Juliana Nascimento Alves','juliana.nascimento49@invalid.com.br','435.598.477-02','F','1998-01-17',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(44,'Larissa Teixeira Teixeira','larissa.teixeira6@ficticio.com.br','192.661.720-73','F','1998-08-18',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(45,'João Barbosa Nunes','joão.barbosa55@invalid.com.br','015.758.662-69','F','1988-03-22',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(46,'Cristina Rezende Nascimento','cristina.rezende67@ficticio.com.br','697.463.814-07','F','1996-07-20',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(47,'Bruno Silva Silva','bruno.silva66@invalid.com.br','728.494.221-50','F','1979-07-05',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(48,'Felipe Machado Barbosa','felipe.machado28@ficticio.com.br','094.383.241-19','F','1964-11-25',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(49,'Lucas Almeida Gomes','lucas.almeida57@invalid.com.br','153.505.647-90','F','1960-09-16',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(50,'Tatiane Rocha Andrade','tatiane.rocha89@ficticio.com.br','013.358.608-19','F','1977-11-24',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(51,'Eliane Rodrigues Pinto','eliane.rodrigues9@invalid.com.br','202.701.735-60','F','1968-10-03',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(52,'Larissa Cavalcanti Rodrigues','larissa.cavalcanti69@ficticio.com.br','020.846.464-64','F','1993-08-25',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(53,'Diego Fernandes Gonçalves','diego.fernandes54@invalid.com.br','615.821.393-42','F','1973-08-13',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(54,'André Almeida Nunes','andré.almeida18@ficticio.com.br','086.617.845-73','F','1975-01-11',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(55,'Henrique Marques Gomes','henrique.marques87@invalid.com.br','251.405.108-80','F','1969-01-11',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(56,'Bruno Freitas Ramos','bruno.freitas4@ficticio.com.br','349.198.790-32','F','1964-07-07',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(57,'André Barbosa Cardoso','andré.barbosa87@invalid.com.br','104.886.074-42','F','1986-03-01',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(58,'Henrique Nunes Cruz','henrique.nunes22@ficticio.com.br','940.783.909-51','F','1972-08-02',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(59,'Diego Lima Pinto','diego.lima13@invalid.com.br','177.386.270-77','F','1968-06-03',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(60,'Amanda Barbosa Almeida','amanda.barbosa2@ficticio.com.br','125.593.323-29','F','1986-08-09',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(61,'Amanda Moura Oliveira','amanda.moura65@invalid.com.br','798.666.635-82','F','1960-04-21',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(62,'Ana Rocha Gomes','ana.rocha70@ficticio.com.br','528.493.791-07','F','1974-12-04',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(63,'Monique Barbosa Martins','monique.barbosa94@invalid.com.br','663.974.855-01','F','1966-11-12',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(64,'Eduardo Marques Cardoso','eduardo.marques23@ficticio.com.br','775.874.850-31','F','1997-08-08',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(65,'Ricardo Araújo Souza','ricardo.araújo17@ficticio.com.br','997.090.557-04','F','1971-05-23',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(66,'Vanessa Fernandes Gomes','vanessa.fernandes79@invalid.com.br','324.766.552-87','F','1966-01-03',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(67,'Ricardo Vieira Barbosa','ricardo.vieira73@ficticio.com.br','306.762.780-60','F','1978-06-16',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(68,'Rodrigo Almeida Souza','rodrigo.almeida48@invalid.com.br','007.011.087-54','F','1978-10-27',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(69,'Vinícius Ribeiro Andrade','vinícius.ribeiro43@ficticio.com.br','765.162.412-28','F','1961-04-23',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(70,'Simone Moreira Gomes','simone.moreira19@invalid.com.br','356.923.203-47','F','1960-03-16',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(71,'Cristina Nunes Vieira','cristina.nunes79@ficticio.com.br','710.696.112-47','F','1982-12-21',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(72,'Gabriela Nascimento Ferreira','gabriela.nascimento45@invalid.com.br','632.293.448-12','F','1966-07-15',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(73,'Patrícia Teixeira Almeida','patrícia.teixeira23@ficticio.com.br','228.688.488-93','F','1989-08-25',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(74,'Thiago Moreira Souza','thiago.moreira93@ficticio.com.br','661.387.459-06','F','1986-05-11',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(75,'Natália Rocha Silva','natália.rocha87@invalid.com.br','315.924.541-19','F','1992-10-06',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(76,'Bruno Almeida Ferreira','bruno.almeida7@ficticio.com.br','855.018.032-75','F','1966-03-16',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(77,'Carlos Teixeira Rocha','carlos.teixeira57@invalid.com.br','737.116.246-34','F','1986-05-06',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(78,'Rodrigo Cruz Alves','rodrigo.cruz33@ficticio.com.br','161.817.152-66','F','1968-04-27',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(79,'Felipe Carvalho Moura','felipe.carvalho53@invalid.com.br','721.577.521-61','F','1998-08-21',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(80,'Amanda Alves Pereira','amanda.alves80@ficticio.com.br','715.337.437-03','F','1997-08-13',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(81,'Beatriz Pinto Lima','beatriz.pinto37@ficticio.com.br','062.587.543-50','F','1964-10-19',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(82,'Alexandre Machado Santos','alexandre.machado12@invalid.com.br','659.546.302-40','F','1995-12-02',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(83,'Paulo Lopes Moura','paulo.lopes19@ficticio.com.br','107.356.235-20','F','1980-01-17',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(84,'Vanessa Ferreira Marques','vanessa.ferreira56@invalid.com.br','698.307.456-43','F','1996-09-16',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(85,'Renata Santos Freitas','renata.santos51@ficticio.com.br','516.274.925-77','F','1987-05-14',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(86,'Sérgio Ribeiro Silva','sérgio.ribeiro92@invalid.com.br','392.334.040-05','F','1987-01-27',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(87,'Alexandre Sousa Oliveira','alexandre.sousa96@ficticio.com.br','614.607.424-19','F','1980-09-03',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(88,'Larissa Rezende Nunes','larissa.rezende11@invalid.com.br','357.484.184-10','F','1961-12-20',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(89,'Monique Dias Almeida','monique.dias7@ficticio.com.br','217.418.803-19','F','1982-01-17',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(90,'Fábio Alves Rocha','fábio.alves68@invalid.com.br','373.468.325-40','F','2000-08-04',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(91,'Larissa Pinto Moreira','larissa.pinto65@ficticio.com.br','959.143.051-52','F','1986-02-27',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(92,'Eduardo Sousa Pinto','eduardo.sousa81@invalid.com.br','470.254.600-79','F','1995-11-02',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(93,'Letícia Pereira Cardoso','letícia.pereira1@ficticio.com.br','015.968.194-48','F','1994-05-11',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(94,'Daniel Fernandes Andrade','daniel.fernandes50@invalid.com.br','614.459.648-80','F','1988-04-04',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(95,'Priscila Rocha Fernandes','priscila.rocha59@ficticio.com.br','678.975.978-65','F','1986-12-10',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(96,'Cristina Rezende Gonçalves','cristina.rezende37@invalid.com.br','230.997.660-11','F','1971-10-23',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(97,'Rafael Rocha Almeida','rafael.rocha28@ficticio.com.br','358.017.961-69','F','1989-04-28',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(98,'Henrique Marques Araújo','henrique.marques32@invalid.com.br','594.292.083-49','F','1996-01-14',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(99,'Natália Teixeira Silva','natália.teixeira72@ficticio.com.br','131.024.117-11','F','2000-02-20',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL),(100,'Vanessa Araújo Alves','vanessa.araújo57@invalid.com.br','621.646.759-08','F','1984-08-14',1,'2026-04-17 01:11:09','2026-04-17 01:11:09',0,NULL);
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `TR_clients_update_deleted_at` BEFORE UPDATE ON `clients` FOR EACH ROW BEGIN
  IF NEW.erased = 1 AND OLD.erased = 0 THEN
    SET NEW.deleted_at = NOW();
  END IF;

  IF NEW.erased = 0 THEN
    SET NEW.deleted_at = NULL;
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `clients_addresses`
--

DROP TABLE IF EXISTS `clients_addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients_addresses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_client` int NOT NULL,
  `id_address_type` int DEFAULT NULL,
  `street` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `number` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `complement` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `reference` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `zip_code` char(8) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `id_city` int DEFAULT NULL,
  `id_state` int DEFAULT NULL,
  `erased` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_addr_client` (`id_client`),
  KEY `fk_addr_type` (`id_address_type`),
  KEY `fk_addr_city` (`id_city`),
  KEY `fk_addr_state` (`id_state`),
  CONSTRAINT `fk_addr_city` FOREIGN KEY (`id_city`) REFERENCES `cities_params` (`id`),
  CONSTRAINT `fk_addr_client` FOREIGN KEY (`id_client`) REFERENCES `clients` (`id`),
  CONSTRAINT `fk_addr_state` FOREIGN KEY (`id_state`) REFERENCES `states_params` (`id`),
  CONSTRAINT `fk_addr_type` FOREIGN KEY (`id_address_type`) REFERENCES `address_type_params` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=133 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients_addresses`
--

LOCK TABLES `clients_addresses` WRITE;
/*!40000 ALTER TABLE `clients_addresses` DISABLE KEYS */;
INSERT INTO `clients_addresses` VALUES (1,1,1,'Av. Castelo Branco','1040',NULL,NULL,'20596109',79,19,0),(2,1,2,'Av. Centenário','2808',NULL,'Próximo à praça','21720645',85,6,0),(3,2,1,'Rua das Orquídeas','6897','Apto 202',NULL,'42530255',51,13,0),(4,2,2,'Av. Santos Dumont','2725','Casa dos fundos','Em frente ao banco','47947603',65,14,0),(5,3,1,'Av. Independência','7734','Apto 101','Próximo ao mercado','13903937',7,4,0),(6,3,2,'Av. Paulista','9395','Apto 101','Em frente ao banco','79715587',73,19,0),(7,3,1,'Rua das Rosas','1026',NULL,NULL,'25365813',6,16,0),(8,4,1,'Rua das Rosas','7294','Apto 45',NULL,'28297102',48,13,0),(9,4,2,'Av. Independência','7514','Bloco B Apto 12','Próximo ao mercado','26620156',27,8,0),(10,5,1,'Av. Castelo Branco','2553','Sala 2',NULL,'96293774',51,13,0),(11,6,1,'Rua Marechal Deodoro','4071','Apto 202','Em frente à escola','24479533',92,20,0),(12,7,1,'Av. Santos Dumont','5203','Apto 101',NULL,'82789237',84,6,0),(13,7,2,'Av. Tiradentes','8962',NULL,'Perto do posto de saúde','47075455',44,16,0),(14,8,1,'Rua Coronel Figueiredo','6682','Apto 45','Próximo à praça','11721102',55,25,0),(15,9,1,'Av. Independência','3619',NULL,'Próximo à praça','52336574',98,24,0),(16,10,1,'Rua Marechal Deodoro','4515',NULL,'Próximo à praça','77031632',65,14,0),(17,11,1,'Rua das Flores','5738','Bloco B Apto 12','Perto do posto de saúde','84556340',95,10,0),(18,12,1,'Rua das Orquídeas','9365',NULL,'Em frente ao banco','39006163',6,16,0),(19,13,1,'Av. Santos Dumont','4769',NULL,NULL,'43639927',97,24,0),(20,14,1,'Rua Barão do Rio Branco','1699',NULL,NULL,'24362404',34,6,0),(21,15,1,'Rua Marechal Deodoro','2073','Bloco B Apto 12','Ao lado da farmácia','17919783',87,5,0),(22,15,2,'Rua Marechal Deodoro','486','Apto 202','Em frente ao banco','34211830',71,12,0),(23,15,1,'Av. Independência','9131','Apto 501','Próximo ao mercado','29201938',13,25,0),(24,16,1,'Av. Getúlio Vargas','1854',NULL,'Próximo à praça','19991881',45,24,0),(25,17,1,'Av. Centenário','2041','Bloco B Apto 12','Em frente ao banco','10928666',8,17,0),(26,18,1,'Rua das Acácias','8425','Bloco B Apto 12',NULL,'99888394',6,16,0),(27,19,1,'Rua Marechal Deodoro','8173',NULL,NULL,'47843811',76,19,0),(28,20,1,'Rua das Acácias','488',NULL,'Ao lado da farmácia','33840340',28,24,0),(29,21,1,'Rua Coronel Figueiredo','1435','Apto 303',NULL,'65789177',27,8,0),(30,22,1,'Rua Barão do Rio Branco','1845','Apto 45','Ao lado da farmácia','36172526',79,19,0),(31,23,1,'Rua das Palmeiras','2575','Casa dos fundos','Em frente à escola','74120131',25,23,0),(32,24,1,'Av. Tiradentes','1111','Apto 501','Ao lado da farmácia','90441541',97,24,0),(33,24,2,'Rua Marechal Deodoro','8370','Apto 101','Próximo à praça','59096683',100,16,0),(34,25,1,'Av. Tiradentes','3161','Bloco B Apto 12','Em frente à escola','56399121',37,6,0),(35,26,1,'Rua das Flores','875','Apto 101','Próximo ao mercado','79776592',37,6,0),(36,27,1,'Rua das Palmeiras','2040','Apto 501',NULL,'17484932',96,10,0),(37,27,2,'Rua das Acácias','2423','Sala 2',NULL,'62178724',70,11,0),(38,27,2,'Rua das Orquídeas','5600','Bloco B Apto 12','Em frente ao banco','66089997',66,14,0),(39,28,1,'Av. Castelo Branco','9622',NULL,'Em frente à escola','94629794',53,25,0),(40,29,1,'Av. República','2629','Apto 101','Próximo à praça','79176767',99,16,0),(41,30,1,'Rua das Orquídeas','7437',NULL,NULL,'87260832',36,15,0),(42,30,2,'Rua das Orquídeas','3375','Apto 303','Próximo ao mercado','75206603',59,25,0),(43,31,1,'Av. Castelo Branco','9515','Apto 45','Próximo à praça','58972927',13,25,0),(44,32,1,'Rua das Flores','8960','Apto 303',NULL,'73197702',40,21,0),(45,33,1,'Av. Dom Pedro II','4246',NULL,'Em frente à escola','78018815',11,9,0),(46,34,1,'Rua Barão do Rio Branco','7270',NULL,NULL,'46421759',95,10,0),(47,35,1,'Rua 7 de Setembro','8211','Bloco B Apto 12',NULL,'49428808',46,24,0),(48,36,1,'Rua das Orquídeas','9510',NULL,'Próximo ao mercado','52735988',3,13,0),(49,37,1,'Av. Tiradentes','9273','Apto 45','Ao lado da farmácia','58684684',75,19,0),(50,38,1,'Rua São João','2672','Casa dos fundos',NULL,'67470847',37,6,0),(51,39,1,'Av. Paulista','9547','Apto 45','Ao lado da farmácia','41973246',8,17,0),(52,40,1,'Av. Brasil','6132',NULL,'Perto do posto de saúde','84030484',6,16,0),(53,41,1,'Av. Brasil','4776','Apto 303','Próximo ao mercado','67354666',93,18,0),(54,42,1,'Rua Coronel Figueiredo','9207','Apto 501','Perto do posto de saúde','74915490',14,10,0),(55,43,1,'Av. Independência','4204','Sala 2','Em frente à escola','10184697',34,6,0),(56,44,1,'Av. Getúlio Vargas','4526','Sala 2',NULL,'55059885',26,27,0),(57,44,2,'Av. Independência','97','Apto 45','Em frente à escola','33724808',51,13,0),(58,45,1,'Av. Centenário','2100','Casa dos fundos','Em frente à escola','46517548',76,19,0),(59,46,1,'Rua Barão do Rio Branco','226','Apto 202','Perto do posto de saúde','49289411',76,19,0),(60,47,1,'Av. Getúlio Vargas','1356','Apto 202','Em frente ao banco','28672903',20,26,0),(61,48,1,'Rua das Orquídeas','8879','Apto 101',NULL,'75854781',89,22,0),(62,49,1,'Av. Brasil','7844','Casa dos fundos',NULL,'63464103',87,5,0),(63,50,1,'Av. Paulista','6416',NULL,'Em frente ao banco','32292722',37,6,0),(64,51,1,'Av. Getúlio Vargas','3559','Apto 501','Perto do posto de saúde','58445964',16,20,0),(65,52,1,'Rua das Rosas','7600','Sala 2','Ao lado da farmácia','43754707',80,19,0),(66,53,1,'Rua Coronel Figueiredo','9335',NULL,'Próximo ao mercado','23709459',38,10,0),(67,54,1,'Av. Centenário','5068',NULL,'Em frente à escola','48600661',95,10,0),(68,54,2,'Av. Getúlio Vargas','8734',NULL,NULL,'61136482',87,5,0),(69,54,1,'Av. Getúlio Vargas','4258','Casa dos fundos','Em frente ao banco','53732513',71,12,0),(70,55,1,'Av. Brasil','6746','Apto 45',NULL,'53609221',80,19,0),(71,56,1,'Av. Santos Dumont','5821','Sala 2',NULL,'65476696',18,12,0),(72,56,2,'Rua São João','2821','Bloco B Apto 12','Próximo à praça','70010674',82,8,0),(73,56,2,'Rua das Acácias','2439','Apto 101',NULL,'91754312',35,20,0),(74,57,1,'Av. Dom Pedro II','2835','Sala 2','Perto do posto de saúde','48106746',42,16,0),(75,57,2,'Rua 7 de Setembro','5128',NULL,'Em frente à escola','24965346',52,13,0),(76,57,2,'Av. Dom Pedro II','7020','Apto 45','Perto do posto de saúde','27669137',91,2,0),(77,58,1,'Av. Getúlio Vargas','4602',NULL,'Em frente ao banco','89944706',51,13,0),(78,59,1,'Rua das Rosas','8536','Bloco B Apto 12',NULL,'34621513',73,19,0),(79,60,1,'Av. República','4561',NULL,'Perto do posto de saúde','56155746',6,16,0),(80,60,2,'Av. Independência','5679','Bloco B Apto 12',NULL,'99379975',9,21,0),(81,61,1,'Av. Tiradentes','6780',NULL,'Em frente ao banco','61567568',10,14,0),(82,61,2,'Av. Independência','9750','Apto 501','Em frente à escola','14384776',43,16,0),(83,62,1,'Av. Independência','9930','Apto 101',NULL,'56482404',70,11,0),(84,63,1,'Rua das Rosas','5319','Apto 303','Próximo ao mercado','25072925',49,13,0),(85,64,1,'Av. República','1151','Apto 202',NULL,'58002766',33,17,0),(86,64,2,'Av. Brasil','7805',NULL,NULL,'12468313',69,11,0),(87,64,2,'Rua Barão do Rio Branco','3787','Sala 2','Em frente ao banco','99739160',96,10,0),(88,65,1,'Av. Dom Pedro II','8021','Apto 45',NULL,'96447239',25,23,0),(89,66,1,'Rua São João','9512',NULL,'Em frente ao banco','21692179',97,24,0),(90,67,1,'Rua São João','5507','Casa dos fundos','Próximo à praça','98696936',86,5,0),(91,68,1,'Rua das Rosas','7574',NULL,NULL,'19060363',74,19,0),(92,69,1,'Rua Marechal Deodoro','9300','Casa dos fundos','Em frente à escola','22933761',72,12,0),(93,70,1,'Rua Marechal Deodoro','4052',NULL,NULL,'82695832',71,12,0),(94,71,1,'Rua Coronel Figueiredo','9469','Apto 501','Em frente à escola','85285209',14,10,0),(95,72,1,'Av. Tiradentes','6752',NULL,NULL,'92446577',38,10,0),(96,73,1,'Av. Brasil','8109','Apto 501','Em frente ao banco','92759635',63,25,0),(97,73,2,'Rua Marechal Deodoro','3062',NULL,NULL,'17685411',81,8,0),(98,73,3,'Rua Marechal Deodoro','6186',NULL,'Ao lado da farmácia','15088762',5,6,0),(99,74,1,'Rua das Flores','493','Apto 303','Próximo à praça','41874352',81,8,0),(100,75,1,'Av. Getúlio Vargas','6683','Apto 101','Ao lado da farmácia','19671937',58,25,0),(101,76,1,'Av. República','105','Casa dos fundos','Ao lado da farmácia','40893186',88,5,0),(102,77,1,'Rua das Acácias','2804','Apto 45',NULL,'49866223',97,24,0),(103,78,1,'Av. Independência','8591','Apto 202','Em frente ao banco','95770862',67,9,0),(104,79,1,'Av. Centenário','8964','Apto 202','Ao lado da farmácia','76822890',17,18,0),(105,80,1,'Av. Castelo Branco','9743',NULL,'Ao lado da farmácia','12209411',93,18,0),(106,81,1,'Av. Centenário','1183','Apto 202','Perto do posto de saúde','64823620',85,6,0),(107,82,1,'Rua Coronel Figueiredo','4309','Sala 2',NULL,'31254871',53,25,0),(108,82,2,'Av. Independência','3094','Apto 501','Em frente ao banco','97686160',11,9,0),(109,82,3,'Av. Independência','9590',NULL,NULL,'48482673',39,21,0),(110,83,1,'Av. Tiradentes','9328','Sala 2','Ao lado da farmácia','71231920',2,19,0),(111,84,1,'Av. Paulista','4221','Apto 202','Próximo ao mercado','97575141',49,13,0),(112,85,1,'Rua Barão do Rio Branco','2383','Apto 202','Ao lado da farmácia','92010776',99,16,0),(113,85,2,'Av. República','7059','Bloco B Apto 12',NULL,'27456286',93,18,0),(114,86,1,'Av. Getúlio Vargas','6415','Sala 2',NULL,'91742556',61,25,0),(115,87,1,'Rua 7 de Setembro','7507',NULL,'Perto do posto de saúde','43806154',65,14,0),(116,87,2,'Rua Barão do Rio Branco','3364','Casa dos fundos',NULL,'10780567',46,24,0),(117,88,1,'Av. Paulista','4601',NULL,NULL,'29717639',73,19,0),(118,89,1,'Rua São João','7606','Casa dos fundos','Perto do posto de saúde','34458981',92,20,0),(119,90,1,'Rua das Acácias','3356','Apto 303','Em frente à escola','39772916',96,10,0),(120,91,1,'Av. Brasil','4960',NULL,'Próximo ao mercado','10967653',23,22,0),(121,91,2,'Av. Independência','9033','Apto 202','Próximo ao mercado','96591964',73,19,0),(122,91,1,'Rua das Palmeiras','9841','Sala 2','Em frente à escola','60867296',21,11,0),(123,92,1,'Av. República','2327','Sala 2','Em frente ao banco','11291807',61,25,0),(124,93,1,'Av. Dom Pedro II','6584','Apto 303',NULL,'38517463',90,27,0),(125,94,1,'Av. Dom Pedro II','4250','Casa dos fundos','Perto do posto de saúde','61259466',26,27,0),(126,94,2,'Rua Barão do Rio Branco','2295','Casa dos fundos',NULL,'93108954',5,6,0),(127,95,1,'Av. Castelo Branco','2468','Apto 101','Próximo à praça','38671313',67,9,0),(128,96,1,'Rua das Flores','3966',NULL,NULL,'71038736',22,3,0),(129,97,1,'Rua das Flores','2646','Apto 303','Próximo ao mercado','90052376',71,12,0),(130,98,1,'Av. República','4675','Bloco B Apto 12',NULL,'64776995',45,24,0),(131,99,1,'Rua das Orquídeas','2190','Sala 2','Ao lado da farmácia','10823594',45,24,0),(132,100,1,'Av. Independência','6690','Bloco B Apto 12','Em frente à escola','29336176',1,25,0);
/*!40000 ALTER TABLE `clients_addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients_footer_templates`
--

DROP TABLE IF EXISTS `clients_footer_templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients_footer_templates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `html` text COLLATE utf8mb4_general_ci,
  `erased` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients_footer_templates`
--

LOCK TABLES `clients_footer_templates` WRITE;
/*!40000 ALTER TABLE `clients_footer_templates` DISABLE KEYS */;
INSERT INTO `clients_footer_templates` VALUES (1,'<div style=\"\n    width: 100%;\n    padding: 8px 30px;\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    border-top: 2px solid #1a56a0;\n    font-family: \'Segoe UI\', Arial, sans-serif;\n    box-sizing: border-box;\n    -webkit-print-color-adjust: exact;\n    print-color-adjust: exact;\n\">\n    <div style=\"font-size: 9px; color: #aaa;\">\n        © {:FOOTER_YEAR} {:FOOTER_COMPANY} — {:FOOTER_DOCUMENT_TYPE}\n    </div>\n\n    <div style=\"display: flex; align-items: center; gap: 6px;\">\n        <div style=\"width: 4px; height: 4px; border-radius: 50%; background: #1a56a0;\"></div>\n        <span style=\"font-size: 9px; color: #888;\">\n            Página <span class=\"pageNumber\"></span> de <span class=\"totalPages\"></span>\n        </span>\n        <div style=\"width: 4px; height: 4px; border-radius: 50%; background: #1a56a0;\"></div>\n    </div>\n\n    <div style=\"font-size: 9px; color: #aaa;\">\n        Gerado em {:FOOTER_DATETIME}\n    </div>\n</div>',0);
/*!40000 ALTER TABLE `clients_footer_templates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients_header_templates`
--

DROP TABLE IF EXISTS `clients_header_templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients_header_templates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `html` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `erased` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients_header_templates`
--

LOCK TABLES `clients_header_templates` WRITE;
/*!40000 ALTER TABLE `clients_header_templates` DISABLE KEYS */;
INSERT INTO `clients_header_templates` VALUES (1,'<div style=\"\n    width: 100%;\n    padding: 10px 30px;\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    border-bottom: 2px solid #1a56a0;\n    font-family: \'Segoe UI\', Arial, sans-serif;\n    box-sizing: border-box;\n    -webkit-print-color-adjust: exact;\n    print-color-adjust: exact;\n\">\n    <div style=\"display: flex; align-items: center; gap: 12px;\">\n        <div style=\"\n            width: 36px; height: 36px;\n            background: #1a56a0;\n            border-radius: 6px;\n            display: flex; align-items: center; justify-content: center;\n        \">\n            <span style=\"color: white; font-weight: bold; font-size: 16px;\">R</span>\n        </div>\n        <div>\n            <div style=\"font-size: 13px; font-weight: 700; color: #1a56a0; line-height: 1;\">{:HEADER_SYSTEM_NAME}</div>\n            <div style=\"font-size: 9px; color: #888; margin-top: 2px;\">{:HEADER_SUBTITLE}</div>\n        </div>\n    </div>\n\n    <div style=\"text-align: right;\">\n        <div style=\"font-size: 9px; color: #888;\">Data de emissão</div>\n        <div style=\"font-size: 11px; color: #333; font-weight: 600;\">{:HEADER_DATE}</div>\n    </div>\n</div>',0);
/*!40000 ALTER TABLE `clients_header_templates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients_phones`
--

DROP TABLE IF EXISTS `clients_phones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients_phones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_client` int NOT NULL,
  `id_phone_type` int DEFAULT NULL,
  `number` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `main` tinyint(1) NOT NULL DEFAULT '0',
  `erased` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_phone_client` (`id_client`),
  KEY `fk_phone_type` (`id_phone_type`),
  CONSTRAINT `fk_phone_client` FOREIGN KEY (`id_client`) REFERENCES `clients` (`id`),
  CONSTRAINT `fk_phone_type` FOREIGN KEY (`id_phone_type`) REFERENCES `phone_type_params` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=143 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients_phones`
--

LOCK TABLES `clients_phones` WRITE;
/*!40000 ALTER TABLE `clients_phones` DISABLE KEYS */;
INSERT INTO `clients_phones` VALUES (1,1,1,'(96) 95778-7367',1,0),(2,2,1,'(79) 96453-4180',1,0),(3,3,1,'(85) 98159-6126',1,0),(4,3,1,'(81) 95892-3050',0,0),(5,4,1,'(84) 95298-3387',1,0),(6,4,1,'(95) 98362-2027',0,0),(7,5,2,'(91) 4758-6135',1,0),(8,6,1,'(91) 94046-6532',1,0),(9,7,1,'(83) 96047-6444',1,0),(10,7,3,'(71) 3192-5252',0,0),(11,8,1,'(95) 98353-6848',1,0),(12,9,1,'(69) 99586-9061',1,0),(13,9,2,'(21) 2712-4260',0,0),(14,10,1,'(31) 92279-4542',1,0),(15,11,1,'(86) 94281-5721',1,0),(16,12,1,'(97) 96012-7599',1,0),(17,12,1,'(97) 97724-5997',0,0),(18,12,1,'(85) 95596-8824',0,0),(19,13,1,'(86) 92664-9301',1,0),(20,14,1,'(95) 95753-9809',1,0),(21,15,1,'(84) 95299-2534',1,0),(22,15,1,'(51) 91735-4092',0,0),(23,16,1,'(85) 99257-3288',1,0),(24,16,2,'(96) 2875-3688',0,0),(25,16,1,'(82) 97422-5880',0,0),(26,17,1,'(95) 91090-2752',1,0),(27,18,3,'(68) 2956-3588',1,0),(28,19,3,'(86) 4750-1918',1,0),(29,20,1,'(96) 98805-3942',1,0),(30,21,3,'(27) 4956-3067',1,0),(31,21,1,'(95) 94721-6013',0,0),(32,22,1,'(97) 92486-9826',1,0),(33,22,3,'(82) 3473-6062',0,0),(34,23,1,'(41) 98647-4185',1,0),(35,24,1,'(98) 93980-4773',1,0),(36,24,1,'(51) 94247-6326',0,0),(37,24,1,'(82) 93965-1705',0,0),(38,25,3,'(92) 4902-7912',1,0),(39,25,1,'(63) 96494-4517',0,0),(40,26,1,'(62) 94677-9071',1,0),(41,26,1,'(98) 92792-8657',0,0),(42,26,1,'(97) 92260-3668',0,0),(43,27,1,'(71) 99588-9299',1,0),(44,28,1,'(51) 98775-8846',1,0),(45,29,3,'(69) 4825-6744',1,0),(46,30,1,'(82) 91301-7586',1,0),(47,30,1,'(85) 91957-1920',0,0),(48,31,1,'(82) 99721-9526',1,0),(49,31,1,'(86) 99345-3984',0,0),(50,32,3,'(95) 5845-5171',1,0),(51,33,1,'(31) 96752-9040',1,0),(52,33,1,'(85) 97358-9932',0,0),(53,34,3,'(98) 5510-8760',1,0),(54,35,1,'(85) 95422-6324',1,0),(55,36,2,'(84) 2285-8758',1,0),(56,37,1,'(96) 97207-1518',1,0),(57,38,1,'(62) 92806-7588',1,0),(58,38,1,'(21) 96501-8267',0,0),(59,38,1,'(95) 95455-5910',0,0),(60,39,1,'(83) 93078-2390',1,0),(61,40,1,'(92) 95319-1674',1,0),(62,41,1,'(48) 93219-4912',1,0),(63,42,1,'(61) 96622-5651',1,0),(64,42,3,'(27) 4398-6688',0,0),(65,42,1,'(61) 96424-6569',0,0),(66,43,1,'(21) 99453-3593',1,0),(67,43,1,'(79) 95097-1284',0,0),(68,44,1,'(92) 91932-6313',1,0),(69,45,2,'(11) 3753-2112',1,0),(70,46,1,'(92) 95713-9750',1,0),(71,47,3,'(63) 3606-5206',1,0),(72,47,2,'(79) 4540-9828',0,0),(73,48,2,'(51) 3369-9594',1,0),(74,49,1,'(92) 96276-8690',1,0),(75,50,2,'(62) 2027-4450',1,0),(76,51,1,'(31) 93403-1584',1,0),(77,52,2,'(11) 5066-9701',1,0),(78,53,1,'(69) 97086-2468',1,0),(79,54,1,'(71) 97220-8339',1,0),(80,55,3,'(62) 2381-4392',1,0),(81,56,3,'(48) 3399-2557',1,0),(82,57,3,'(98) 4427-3036',1,0),(83,58,1,'(98) 96239-6777',1,0),(84,58,1,'(11) 93237-3395',0,0),(85,59,1,'(85) 91983-7607',1,0),(86,60,1,'(91) 96308-7784',1,0),(87,60,1,'(62) 98747-1354',0,0),(88,60,1,'(82) 98994-6581',0,0),(89,61,1,'(98) 98466-5001',1,0),(90,61,1,'(51) 92716-6489',0,0),(91,61,1,'(98) 94050-5566',0,0),(92,62,1,'(95) 96275-5738',1,0),(93,63,1,'(41) 96302-3808',1,0),(94,64,1,'(82) 91398-5529',1,0),(95,65,1,'(63) 94397-2006',1,0),(96,66,1,'(63) 95186-7002',1,0),(97,67,3,'(79) 2189-9661',1,0),(98,67,1,'(63) 95935-2046',0,0),(99,67,1,'(69) 94165-3666',0,0),(100,68,1,'(96) 98332-1617',1,0),(101,69,2,'(11) 2410-9574',1,0),(102,70,3,'(61) 3507-1362',1,0),(103,71,1,'(31) 97473-1154',1,0),(104,72,3,'(95) 3679-5462',1,0),(105,73,3,'(68) 2672-3705',1,0),(106,74,1,'(41) 93991-6193',1,0),(107,75,1,'(83) 93228-1680',1,0),(108,76,3,'(11) 5974-8781',1,0),(109,77,1,'(83) 98529-5227',1,0),(110,77,1,'(48) 91834-3532',0,0),(111,77,1,'(41) 98190-2586',0,0),(112,78,1,'(92) 93537-8269',1,0),(113,78,3,'(27) 5070-7074',0,0),(114,79,1,'(86) 98705-2739',1,0),(115,80,1,'(31) 91647-6373',1,0),(116,81,1,'(51) 99789-1641',1,0),(117,82,2,'(92) 4730-1590',1,0),(118,83,1,'(21) 99729-8059',1,0),(119,84,1,'(83) 98980-7803',1,0),(120,85,1,'(31) 91416-1501',1,0),(121,86,1,'(48) 91467-8556',1,0),(122,86,2,'(63) 3636-5711',0,0),(123,87,2,'(11) 2300-7745',1,0),(124,88,1,'(82) 95789-5144',1,0),(125,89,2,'(71) 2488-8562',1,0),(126,90,3,'(98) 2227-5291',1,0),(127,91,1,'(41) 95608-3427',1,0),(128,92,3,'(41) 4768-4359',1,0),(129,92,2,'(71) 3979-1744',0,0),(130,92,1,'(85) 94123-4885',0,0),(131,93,1,'(98) 93748-3053',1,0),(132,93,1,'(86) 98776-4465',0,0),(133,93,1,'(41) 93665-8482',0,0),(134,94,1,'(97) 98903-8065',1,0),(135,94,1,'(31) 93027-7890',0,0),(136,95,1,'(63) 98961-8342',1,0),(137,96,2,'(69) 3019-9845',1,0),(138,97,2,'(68) 5289-6020',1,0),(139,98,3,'(92) 4659-3796',1,0),(140,99,1,'(95) 98376-9777',1,0),(141,100,1,'(51) 98363-3337',1,0),(142,100,1,'(79) 91777-3399',0,0);
/*!40000 ALTER TABLE `clients_phones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients_report_templates`
--

DROP TABLE IF EXISTS `clients_report_templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients_report_templates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `html` text COLLATE utf8mb4_general_ci,
  `erased` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients_report_templates`
--

LOCK TABLES `clients_report_templates` WRITE;
/*!40000 ALTER TABLE `clients_report_templates` DISABLE KEYS */;
INSERT INTO `clients_report_templates` VALUES (1,'<!DOCTYPE html>\n<html lang=\"pt-BR\">\n<head>\n  <meta charset=\"UTF-8\" />\n  <title>Relatório do Cliente</title>\n  <link href=\"https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=DM+Sans:wght@300;400;500;600&display=swap\" rel=\"stylesheet\">\n\n  <style>\n    :root {\n      --ink:       #0f1923;\n      --ink-soft:  #4a5568;\n      --ink-muted: #94a3b8;\n      --gold:      #b8975a;\n      --gold-light:#d4b483;\n      --gold-pale: #f5efe4;\n      --surface:   #fdfcfa;\n      --border:    #e8e2d9;\n      --white:     #ffffff;\n      --navy:      #1a2b4a;\n      --navy-deep: #0d1a2e;\n    }\n\n    * { margin: 0; padding: 0; box-sizing: border-box; }\n\n    body {\n      font-family: \'DM Sans\', sans-serif;\n      background: var(--surface);\n      color: var(--ink);\n      padding: 40px 32px;\n      min-height: 100vh;\n    }\n\n    /* ── Page wrapper ── */\n    .page {\n      max-width: 900px;\n      margin: 0 auto;\n    }\n\n    /* ── Report title block ── */\n    .report-title-block {\n      margin-bottom: 44px;\n    }\n\n    .report-eyebrow {\n      font-size: 11px;\n      text-transform: uppercase;\n      letter-spacing: 2px;\n      color: var(--gold);\n      font-weight: 600;\n      margin-bottom: 10px;\n    }\n\n    .report-title {\n      font-family: \'Playfair Display\', serif;\n      font-size: 36px;\n      font-weight: 600;\n      color: var(--navy-deep);\n      line-height: 1.15;\n    }\n\n    .report-rule {\n      width: 60px;\n      height: 3px;\n      background: linear-gradient(90deg, var(--gold), var(--gold-light));\n      margin-top: 18px;\n      border-radius: 2px;\n    }\n\n    /* ── Section ── */\n    .section {\n      margin-bottom: 44px;\n    }\n\n    .section-header {\n      display: flex;\n      align-items: center;\n      gap: 12px;\n      margin-bottom: 20px;\n    }\n\n    .section-number {\n      font-size: 11px;\n      font-weight: 600;\n      color: var(--gold);\n      letter-spacing: 1px;\n      font-variant-numeric: tabular-nums;\n      min-width: 24px;\n    }\n\n    .section-title {\n      font-size: 13px;\n      font-weight: 600;\n      text-transform: uppercase;\n      letter-spacing: 1.5px;\n      color: var(--navy);\n    }\n\n    .section-line {\n      flex: 1;\n      height: 1px;\n      background: var(--border);\n    }\n\n    /* ── Info grid ── */\n    .info-grid {\n      display: grid;\n      grid-template-columns: repeat(3, 1fr);\n      gap: 12px;\n    }\n\n    .info-card {\n      background: var(--white);\n      border: 1px solid var(--border);\n      border-radius: 10px;\n      padding: 16px 18px;\n      position: relative;\n      overflow: hidden;\n      transition: border-color 0.2s;\n    }\n\n    .info-card::before {\n      content: \'\';\n      position: absolute;\n      top: 0; left: 0;\n      width: 3px; height: 100%;\n      background: linear-gradient(180deg, var(--gold), transparent);\n      opacity: 0;\n      transition: opacity 0.2s;\n    }\n\n    .info-label {\n      font-size: 10px;\n      text-transform: uppercase;\n      letter-spacing: 1px;\n      color: var(--ink-muted);\n      font-weight: 500;\n      margin-bottom: 6px;\n    }\n\n    .info-value {\n      font-size: 14px;\n      font-weight: 500;\n      color: var(--ink);\n      line-height: 1.4;\n    }\n\n    /* ── Badge ── */\n    .badge {\n      display: inline-flex;\n      align-items: center;\n      gap: 5px;\n      padding: 4px 10px;\n      border-radius: 20px;\n      font-size: 12px;\n      font-weight: 600;\n      background: #ecfdf5;\n      color: #065f46;\n      border: 1px solid #a7f3d0;\n    }\n\n    .badge::before {\n      content: \'\';\n      width: 6px; height: 6px;\n      border-radius: 50%;\n      background: #10b981;\n    }\n\n    /* ── Table ── */\n    .table-wrapper {\n      border: 1px solid var(--border);\n      border-radius: 12px;\n      overflow: hidden;\n      background: var(--white);\n    }\n\n    table {\n      width: 100%;\n      border-collapse: collapse;\n    }\n\n    thead {\n      background: var(--navy-deep);\n    }\n\n    th {\n      padding: 13px 18px;\n      text-align: left;\n      font-size: 10px;\n      font-weight: 600;\n      text-transform: uppercase;\n      letter-spacing: 1.2px;\n      color: rgba(255,255,255,0.7);\n    }\n\n    th:first-child {\n      color: var(--gold-light);\n    }\n\n    td {\n      padding: 14px 18px;\n      font-size: 13.5px;\n      color: var(--ink);\n      border-bottom: 1px solid var(--border);\n      font-weight: 400;\n    }\n\n    tbody tr:last-child td {\n      border-bottom: none;\n    }\n\n    tbody tr:nth-child(even) td {\n      background: #fafaf8;\n    }\n\n    tbody tr:hover td {\n      background: var(--gold-pale);\n      transition: background 0.15s;\n    }\n    \n    * {\n  		-webkit-print-color-adjust: exact;\n        print-color-adjust: exact;\n     }\n\n  </style>\n</head>\n\n<body>\n<div class=\"page\">\n\n  <!-- Title -->\n  <div class=\"report-title-block\">\n    <div class=\"report-eyebrow\">Documento confidencial</div>\n    <div class=\"report-title\">Relatório do Cliente</div>\n    <div class=\"report-rule\"></div>\n  </div>\n\n  <!-- Section 01 — Client Info -->\n  <div class=\"section\">\n    <div class=\"section-header\">\n      <span class=\"section-number\">01</span>\n      <span class=\"section-title\">Informações do Cliente</span>\n      <div class=\"section-line\"></div>\n    </div>\n\n    <div class=\"info-grid\">\n\n      <div class=\"info-card\">\n        <div class=\"info-label\">Nome</div>\n        <div class=\"info-value\">{:NAME}</div>\n      </div>\n\n      <div class=\"info-card\">\n        <div class=\"info-label\">E-mail</div>\n        <div class=\"info-value\">{:EMAIL}</div>\n      </div>\n\n      <div class=\"info-card\">\n        <div class=\"info-label\">CPF / CNPJ</div>\n        <div class=\"info-value\">{:CPF_CNPJ}</div>\n      </div>\n\n      <div class=\"info-card\">\n        <div class=\"info-label\">Tipo Pessoa</div>\n        <div class=\"info-value\">{:PERSON_TYPE}</div>\n      </div>\n\n      <div class=\"info-card\">\n        <div class=\"info-label\">Data de Nascimento</div>\n        <div class=\"info-value\">{:BIRTH_DATE}</div>\n      </div>\n\n      <div class=\"info-card\">\n        <div class=\"info-label\">Status</div>\n        <div class=\"info-value\">\n          <span class=\"badge\">{:ACTIVE}</span>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <!-- Section 02 — Phones -->\n  <div class=\"section\">\n    <div class=\"section-header\">\n      <span class=\"section-number\">02</span>\n      <span class=\"section-title\">Telefones</span>\n      <div class=\"section-line\"></div>\n    </div>\n\n    <div class=\"table-wrapper\">\n      <table>\n        <thead>\n          <tr>\n            <th>Tipo</th>\n            <th>Número</th>\n            <th>Principal</th>\n          </tr>\n        </thead>\n        <tbody>\n          [_{:COLUMN_PHONE_TYPE},{:COLUMN_PHONE_NUMBER},{:COLUMN_PHONE_MAIN}_]\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n  <!-- Section 03 — Addresses -->\n  <div class=\"section\">\n    <div class=\"section-header\">\n      <span class=\"section-number\">03</span>\n      <span class=\"section-title\">Endereços</span>\n      <div class=\"section-line\"></div>\n    </div>\n\n    <div class=\"table-wrapper\">\n      <table>\n        <thead>\n          <tr>\n            <th>Tipo</th>\n            <th>Rua</th>\n            <th>Número</th>\n            <th>Complemento</th>\n            <th>Referência</th>\n            <th>CEP</th>\n            <th>Cidade</th>\n            <th>UF</th>\n          </tr>\n        </thead>\n        <tbody>\n          [_{:COLUMN_ADDRESS_TYPE},{:COLUMN_ADDRESS_STREET},{:COLUMN_ADDRESS_NUMBER},{:COLUMN_ADDRESS_COMPLEMENT},{:COLUMN_ADDRESS_REFERENCE},{:COLUMN_ADDRESS_ZIP_CODE},{:COLUMN_ADDRESS_CITY},{:COLUMN_ADDRESS_STATE}_]\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n</div>\n</body>\n</html>',0);
/*!40000 ALTER TABLE `clients_report_templates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parameter_translation`
--

DROP TABLE IF EXISTS `parameter_translation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parameter_translation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `lang` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `i18n_id` int NOT NULL,
  `namespace` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `erased` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `parameter_translation_i18n_id_IDX` (`i18n_id`,`lang`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parameter_translation`
--

LOCK TABLES `parameter_translation` WRITE;
/*!40000 ALTER TABLE `parameter_translation` DISABLE KEYS */;
INSERT INTO `parameter_translation` VALUES (1,'Celular','pt_BR',1,'phone_type_params',0),(2,'Mobile','en',1,'phone_type_params',0),(3,'Handy','de',1,'phone_type_params',0),(4,'Celular','es',1,'phone_type_params',0),(5,'Fixo','pt_BR',2,'phone_type_params',0),(6,'Landline','en',2,'phone_type_params',0),(7,'Festnetz','de',2,'phone_type_params',0),(8,'Teléfono fijo','es',2,'phone_type_params',0),(9,'Comercial','pt_BR',3,'phone_type_params',0),(10,'Business','en',3,'phone_type_params',0),(11,'Geschäftlich','de',3,'phone_type_params',0),(12,'Comercial','es',3,'phone_type_params',0),(13,'Cobrança / Faturamento','pt_BR',4,'address_type_params',0),(14,'Billing','en',4,'address_type_params',0),(15,'Rechnungsadresse','de',4,'address_type_params',0),(16,'Facturación','es',4,'address_type_params',0),(17,'Entrega','pt_BR',5,'address_type_params',0),(18,'Delivery','en',5,'address_type_params',0),(19,'Lieferadresse','de',5,'address_type_params',0),(20,'Entrega','es',5,'address_type_params',0),(21,'Sem classificação','pt_BR',6,'address_type_params',0),(22,'Unclassified','en',6,'address_type_params',0),(23,'Nicht klassifiziert','de',6,'address_type_params',0),(24,'Sin clasificación','es',6,'address_type_params',0),(38,'lindo','pt_BR',7,'phone_type_params',0),(39,'hermoso','es',7,'phone_type_params',0),(40,'beautiful','en',7,'phone_type_params',0),(41,'Schön','de',7,'phone_type_params',0),(62,'com fome','pt_BR',8,'phone_type_params',0),(63,'hambriento','es',8,'phone_type_params',0),(64,'hungry','en',8,'phone_type_params',0),(65,'hungrig','de',8,'phone_type_params',0);
/*!40000 ALTER TABLE `parameter_translation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phone_type_params`
--

DROP TABLE IF EXISTS `phone_type_params`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phone_type_params` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` varchar(60) COLLATE utf8mb4_general_ci NOT NULL,
  `i18n_id` int DEFAULT NULL,
  `erased` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phone_type_params`
--

LOCK TABLES `phone_type_params` WRITE;
/*!40000 ALTER TABLE `phone_type_params` DISABLE KEYS */;
INSERT INTO `phone_type_params` VALUES (1,'Celular',1,0),(2,'Fixo',2,0),(3,'Comercial',2,0),(4,'beautiful',7,0),(8,'beautiful',8,0);
/*!40000 ALTER TABLE `phone_type_params` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `states_params`
--

DROP TABLE IF EXISTS `states_params`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `states_params` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `uf` char(2) COLLATE utf8mb4_general_ci NOT NULL,
  `erased` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `states_params`
--

LOCK TABLES `states_params` WRITE;
/*!40000 ALTER TABLE `states_params` DISABLE KEYS */;
INSERT INTO `states_params` VALUES (1,'Acre','AC',0),(2,'Alagoas','AL',0),(3,'Amapá','AP',0),(4,'Amazonas','AM',0),(5,'Bahia','BA',0),(6,'Ceará','CE',0),(7,'Distrito Federal','DF',0),(8,'Espírito Santo','ES',0),(9,'Goiás','GO',0),(10,'Maranhão','MA',0),(11,'Mato Grosso','MT',0),(12,'Mato Grosso do Sul','MS',0),(13,'Minas Gerais','MG',0),(14,'Pará','PA',0),(15,'Paraíba','PB',0),(16,'Paraná','PR',0),(17,'Pernambuco','PE',0),(18,'Piauí','PI',0),(19,'Rio de Janeiro','RJ',0),(20,'Rio Grande do Norte','RN',0),(21,'Rio Grande do Sul','RS',0),(22,'Rondônia','RO',0),(23,'Roraima','RR',0),(24,'Santa Catarina','SC',0),(25,'São Paulo','SP',0),(26,'Sergipe','SE',0),(27,'Tocantins','TO',0);
/*!40000 ALTER TABLE `states_params` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-07 22:50:19
