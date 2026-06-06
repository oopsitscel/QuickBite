-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 06, 2026 at 11:03 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quickbite_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `description` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `description`) VALUES
('07ec05f9-5fd9-46f1-b991-7f56f48e7e37', 'Desserts', 'Delightful sweet treats and pastries perfect for concluding your meal or enjoying as a standalone indulgence.'),
('2a701b4e-e59f-403e-8dfa-a5664367fbda', 'Japanese Food', 'Elegant and meticulously prepared cuisine that highlights fresh, seasonal ingredients, offering a delicate balance of umami through sushi, ramen, and savory grills.'),
('73e898c5-b408-4cdb-9fc4-b158933d339b', 'Italian Food', 'Classic Mediterranean cuisine famous for its rich cheeses, fresh tomatoes, olive oil, and a comforting variety of artisanal pastas and pizzas.'),
('7c48217f-f594-466f-beb2-4a56789a2eb4', 'Indonesian Food', 'Authentic Indonesian dishes rich in traditional herbs and spices, delivering a unique and vibrant blend of savory, sweet, and spicy flavors from across the archipelago.'),
('97ec44b1-e793-48a7-90eb-3c1c7c3cdec5', 'Korean Food', 'A variety of traditional and modern Korean dishes featuring bold flavors, balanced seasoning, and signature ingredients such as kimchi, rice, noodles, and grilled specialties.'),
('a53e8ebf-e213-4aed-8b83-39d991cf7022', 'Drinks', 'A refreshing selection of cold and hot beverages, ranging from traditional teas and coffees to tropical fruit juices.'),
('af324f25-66d2-4d85-9ca8-c1c8414a6506', 'Mexican Food', 'Vibrant and festive dishes packed with bold flavors, featuring a perfect combination of zesty lime, fresh cilantro, savory meats, and warm corn tortillas.');

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `description` varchar(191) NOT NULL,
  `price` double NOT NULL,
  `imageUrl` varchar(191) DEFAULT NULL,
  `categoryId` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `estimatedCookingTime` int(11) NOT NULL,
  `isAvailable` tinyint(1) NOT NULL DEFAULT 1,
  `stock` int(11) NOT NULL,
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`id`, `name`, `description`, `price`, `imageUrl`, `categoryId`, `createdAt`, `estimatedCookingTime`, `isAvailable`, `stock`, `updatedAt`) VALUES
('182e6af7-2b5c-4862-9741-2e569fac8964', 'Pizza Margherita', 'Classic pizza topped with pure tomato sauce, melted mozzarella cheese, and fresh basil leaves.', 65000, 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=600', '73e898c5-b408-4cdb-9fc4-b158933d339b', '2026-06-04 07:29:27.099', 20, 1, 15, '2026-06-04 07:29:27.099'),
('2578b83e-ae46-4f86-8322-4c1631af19f5', 'Sweet Ice Tea', 'A classic, comforting Indonesian-style jasmine black tea, freshly brewed and sweetened, served chilled over crisp ice cubes.', 10000, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aWNlJTIwdGVhfGVufDB8fDB8fHww', 'a53e8ebf-e213-4aed-8b83-39d991cf7022', '2026-06-04 09:05:14.278', 3, 1, 99, '2026-06-06 17:57:37.098'),
('35205b70-7e33-41b7-beca-37ae47ca2ee7', 'Gado-Gado', 'A fresh Indonesian salad of boiled vegetables, hard-boiled eggs, fried tofu, and tempeh, drizzled with peanut sauce.', 25000, 'https://media.istockphoto.com/id/2268444170/photo/close-up-of-gado-gado-traditional-indonesian-food.webp?a=1&b=1&s=612x612&w=0&k=20&c=Glta4tcIlhSj3jirQTs2GT0dyFdodXcst4wGI_7-dY4=', '7c48217f-f594-466f-beb2-4a56789a2eb4', '2026-06-04 07:29:10.240', 10, 1, 35, '2026-06-04 07:29:10.240'),
('4819c39c-2fb0-486f-819e-aae6c42ae37b', 'Cheesy Buldak Chicken Ramyeon', 'Springy Korean instant noodles tossed in a rich, fiercely spicy Buldak sauce, topped with tender pan-seared chicken bites and a generous melt of gooey mozzarella cheese to balance the heat. A', 38000, 'https://www.giant.com.my/wp-content/uploads/2021/03/Korean-Cheesy-Chicken-Ramen.jpg', '97ec44b1-e793-48a7-90eb-3c1c7c3cdec5', '2026-06-06 19:33:34.393', 10, 1, 24, '2026-06-06 20:15:02.326'),
('49ccb2b0-2f1a-4fa2-9dff-0f9e1592ad88', 'Chicken Tacos', 'Three crispy taco shells filled with grilled chicken, fresh lettuce, and zesty salsa sauce.', 38000, 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=600', 'af324f25-66d2-4d85-9ca8-c1c8414a6506', '2026-06-04 07:30:54.296', 10, 1, 34, '2026-06-06 12:19:27.104'),
('5aa9a001-7f86-4fc3-a6fe-3d183b443ecb', 'Lasagna Al Forno', 'Baked layers of artisanal pasta with rich beef bolognese sauce, creamy béchamel, and melted mozzarella.', 58000, 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?q=80&w=600', '73e898c5-b408-4cdb-9fc4-b158933d339b', '2026-06-04 07:29:42.841', 25, 1, 10, '2026-06-06 08:31:03.721'),
('5b23a99d-1863-4ca7-ab62-d0fb0fd43d24', 'Beef Gyudon', 'A classic Japanese rice bowl topped with thinly sliced beef and tender onions simmered in a sweet savory dashi sauce.', 50000, 'https://images.unsplash.com/photo-1761064864527-d428a88cd4f5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z3l1ZG9ufGVufDB8fDB8fHww', '2a701b4e-e59f-403e-8dfa-a5664367fbda', '2026-06-04 07:30:25.783', 12, 1, 23, '2026-06-06 20:17:14.744'),
('61e6e24c-a1d8-459f-a507-c256b6151a36', 'Earl Grey Hot Tea', 'A fragrant, comforting black tea blend infused with the distinctive aromatic oil of bergamot.', 15000, 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600', 'a53e8ebf-e213-4aed-8b83-39d991cf7022', '2026-06-04 07:35:04.161', 3, 1, 78, '2026-06-06 13:55:32.666'),
('638e5b32-c75f-45d2-baf7-0b811b1e48c2', 'Fudgy Chocolate Brownie', 'A rich, dense brownie packed with chocolate chunks, featuring a perfect shiny crinkle top.', 20000, 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?q=80&w=600', '07ec05f9-5fd9-46f1-b991-7f56f48e7e37', '2026-06-04 07:35:33.712', 3, 1, 24, '2026-06-06 17:57:37.102'),
('65e9e6d9-c26c-424b-a91c-1dc1afaa4f43', 'Roasted Oolong Oat Milk Tea', 'A premium blend of deeply fire-roasted Oolong tea and rich, creamy oat milk, sweetened with a touch of artisanal brown sugar. Perfectly balanced, earthy, and 100% dairy-free', 35000, 'https://images.unsplash.com/photo-1724198218220-f0641254233b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFJvYXN0ZWQlMjBPb2xvbmclMjBPYXQlMjBNaWxrJTIwVGVhfG', 'a53e8ebf-e213-4aed-8b83-39d991cf7022', '2026-06-06 18:15:02.981', 4, 1, 23, '2026-06-06 18:15:02.981'),
('69143d42-5e72-475a-96c2-f08064b96fd9', 'Tropical Mango Smoothie', 'A refreshing blended beverage made from fresh sweet mangoes, yogurt, and a touch of honey.', 25000, 'https://plus.unsplash.com/premium_photo-1663091544172-794c537af00c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8VHJvcGljYWwlMjBNYW5nbyUyMFNtb290aGllfGVufDB8', 'a53e8ebf-e213-4aed-8b83-39d991cf7022', '2026-06-04 07:35:52.188', 7, 1, 29, '2026-06-04 10:02:25.346'),
('72ca7176-f974-435c-9554-1112841e7adc', 'Fresh Lime Mojito', 'A crisp, non-alcoholic mocktail featuring muddled fresh mint leaves, zesty lime juice, and sparkling soda.', 22000, 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600', 'a53e8ebf-e213-4aed-8b83-39d991cf7022', '2026-06-04 07:36:09.052', 5, 1, 43, '2026-06-06 13:52:42.441'),
('7f316c7c-885b-4054-b6ab-503b4988366e', 'Iced Matcha Latte', 'Premium Japanese ceremonial matcha whisked with creamy milk and served over ice.', 28000, 'https://media.istockphoto.com/id/2164727441/photo/iced-matcha-green-tea-latte-sitting-on-wooden-tray.webp?a=1&b=1&s=612x612&w=0&k=20&c=4-MLI2YtM06sbqUjiVHuUtRL8LxyPvzUMJQUIL77drU=', 'a53e8ebf-e213-4aed-8b83-39d991cf7022', '2026-06-04 07:35:59.797', 5, 1, 39, '2026-06-06 13:55:35.369'),
('93094475-bede-48d8-a2a9-18b3a218e96c', 'Prawn Shoyu Ramen', 'Ramen noodles served in a traditional Japanese soy sauce broth, topped with sliced chicken and a boiled egg.', 52000, 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=600', '2a701b4e-e59f-403e-8dfa-a5664367fbda', '2026-06-04 07:29:59.210', 15, 1, 20, '2026-06-06 18:19:41.123'),
('a0070eee-9f95-4e56-a15f-dde7a8471c14', 'Carne Asada Burrito', 'A large flour tortilla rolled up with grilled flank steak, Mexican rice, pinto beans, and fresh pico de gallo.', 45000, 'https://images.unsplash.com/photo-1731090389462-351421240be9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2FybmUlMjBBc2FkYSUyMEJ1cnJpdG98ZW58MHx8MHx8fDA%3D', 'af324f25-66d2-4d85-9ca8-c1c8414a6506', '2026-06-04 07:31:15.109', 15, 1, 17, '2026-06-06 20:27:55.585'),
('a637381c-592f-4fbf-989d-f76cc9aee590', 'New York Cheesecake', 'A slice of dense, velvety smooth cream cheese cake on a buttery graham cracker crust, topped with strawberry coulis.', 38000, 'https://images.unsplash.com/photo-1676300185983-d5f242babe34?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TmV3JTIwWW9yayUyMENoZWVzZWNha2V8ZW58MHx8MHx8fDA%3D', '07ec05f9-5fd9-46f1-b991-7f56f48e7e37', '2026-06-04 07:35:17.170', 4, 1, 20, '2026-06-04 07:35:17.170'),
('ac2478ff-4075-4d05-abc0-4ae351fb21af', 'Churros with Chocolate', 'Golden fried pastry dough sticks dusted with cinnamon sugar, served with warm chocolate dipping sauce.', 25000, 'https://plus.unsplash.com/premium_photo-1714180194796-8cb272b0bfed?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Q2h1cnJvcyUyMHdpdGglMjBDaG9jb2xhdGV8ZW58MHx8', '07ec05f9-5fd9-46f1-b991-7f56f48e7e37', '2026-06-04 07:31:08.941', 12, 1, 19, '2026-06-06 20:24:40.569'),
('b778a5e8-4042-48fc-8301-87cf1f718eae', 'Spaghetti Carbonara', 'Creamy pasta cooked with savory smoked beef and topped with grated parmesan cheese.', 45000, 'https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=600', '73e898c5-b408-4cdb-9fc4-b158933d339b', '2026-06-04 07:29:18.428', 15, 1, 24, '2026-06-04 10:02:25.358'),
('b7b0e1f1-5f04-42c6-a721-977b4bb3d82c', 'Chicken Katsu Curry', 'Steaming white rice paired with a crispy, golden chicken cutlet and rich, savory Japanese curry sauce.', 46000, 'https://media.istockphoto.com/id/2187246308/photo/japanese-curry-rice-with-fried-chicken.webp?a=1&b=1&s=612x612&w=0&k=20&c=wBdPJdSN2jFUg33p2lz2AhemC2uMm4hBXSqrY_kz1t8=', '2a701b4e-e59f-403e-8dfa-a5664367fbda', '2026-06-04 07:30:13.579', 18, 1, 20, '2026-06-06 17:57:37.093'),
('c6269b15-3d3a-472b-8ad9-fc7f77497184', 'Nasi Goreng Spesial', 'Signature Indonesian fried rice cooked with aromatic spices, served with a sunny-side-up egg, chicken, and crackers.', 30000, 'https://images.unsplash.com/photo-1647093953000-9065ed6f85ef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TmFzaSUyMEdvcmVuZyUyMFNwZXNpYWx8ZW58MHx8MHx8fDA%3D', '7c48217f-f594-466f-beb2-4a56789a2eb4', '2026-06-04 07:28:27.797', 10, 1, 50, '2026-06-04 07:28:27.797'),
('d2c42c7d-7113-4e20-922b-e154032c6190', 'Molten Chocolate Lava Cake', 'Rich chocolate cake with a warm, decadent flowing chocolate center, served with vanilla ice cream.', 35000, 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600', '07ec05f9-5fd9-46f1-b991-7f56f48e7e37', '2026-06-04 07:35:25.379', 15, 1, 15, '2026-06-04 07:35:25.379'),
('dfa4bc9e-3028-43c5-9ffd-318a6a06ca11', 'Cheesy Ramyeon', 'Authentic Korean ramyeon noodles served in a rich, spicy, and creamy broth, topped with melted premium cheese slice, a soft-boiled egg, and a sprinkle of fresh green onions.', 38000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRquZo-8LAgQcYsKVZfJr0BKj0mMIiTSn8CTw&s', '97ec44b1-e793-48a7-90eb-3c1c7c3cdec5', '2026-06-06 20:08:43.172', 10, 1, 21, '2026-06-06 20:16:08.801'),
('ed64fe85-f76f-400f-97bc-1bbca1f4a6b3', 'Vanilla Crème Brûlée', 'A classic French dessert featuring a rich custard base topped with a texturally satisfying layer of hardened caramelized sugar.', 32000, 'https://images.unsplash.com/photo-1676300184943-09b2a08319a3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VmFuaWxsYSUyMENyJUMzJUE4bWUlMjBCciVDMyVCQmwlQzMlQT', '07ec05f9-5fd9-46f1-b991-7f56f48e7e37', '2026-06-04 07:35:44.438', 5, 1, 12, '2026-06-04 07:35:44.438'),
('f2008286-1bfd-4c32-a286-13ac22fa337a', 'Ebi Tempura', 'Crispy, light, and golden deep-fried prawns served with a delicate tentsuyu dipping sauce.', 48000, 'https://images.unsplash.com/photo-1750308250301-3954958c5b21?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8RWJpJTIwVGVtcHVyYXxlbnwwfHwwfHx8MA%3D%3D', '2a701b4e-e59f-403e-8dfa-a5664367fbda', '2026-06-04 07:30:34.382', 14, 1, 30, '2026-06-04 07:30:34.382'),
('f44dd67e-e4a2-47ea-8b70-e843172b79f3', 'Salmon Nigiri Sushi', 'Seasoned sushi rice topped with premium, melt-in-your-mouth slices of fresh raw salmon.', 55000, 'https://images.unsplash.com/photo-1607247098731-5bf6416d2e8c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8U2FsbW9uJTIwTmlnaXJpJTIwU3VzaGl8ZW58MHx8MHx8fDA%3D', '2a701b4e-e59f-403e-8dfa-a5664367fbda', '2026-06-04 07:30:06.040', 10, 1, 15, '2026-06-04 07:30:06.040'),
('f4cf0622-75fa-4280-956f-df6a62fc60af', 'Fettuccine Alfredo', 'Savory fettuccine pasta tossed in a rich, velvety butter and parmesan cream sauce.', 48000, 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=600', '73e898c5-b408-4cdb-9fc4-b158933d339b', '2026-06-04 07:29:35.449', 15, 1, 20, '2026-06-04 07:29:35.449'),
('faa2a13d-acbd-4b9d-9b61-5c50a73591c0', 'Sate Ayam Madura', 'Tender grilled chicken skewers marinated in sweet soy sauce, served with a rich and creamy peanut sauce.', 35000, 'https://plus.unsplash.com/premium_photo-1669150852115-38eb25f072e0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U2F0ZSUyMEF5YW0lMjBNYWR1cmF8ZW58MHx8MHx8fDA%', '7c48217f-f594-466f-beb2-4a56789a2eb4', '2026-06-04 07:28:44.728', 15, 1, 40, '2026-06-04 07:28:44.728'),
('fc43644b-ce25-4896-9f62-697a4739f261', 'Chicken Quesadilla', 'Toasted flour tortilla filled with juicy grilled chicken, melted cheese, and sautéed peppers.', 40000, 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?q=80&w=600', 'af324f25-66d2-4d85-9ca8-c1c8414a6506', '2026-06-04 07:30:42.245', 10, 1, 26, '2026-06-06 20:27:54.408'),
('fcbbfcf8-413b-4567-ab9d-0ee36399ce7e', 'Soto Ayam', 'A comforting Indonesian yellow chicken soup with vermicelli, hard-boiled egg, and fresh celery in a savory broth.', 50000, 'https://media.istockphoto.com/id/1373235829/photo/soto-ayam-an-indonesian-delicious-traditional-chicken-soup.webp?a=1&b=1&s=612x612&w=0&k=20&c=Dn4GxBf0kx0hDhmz5pZQVZkS0OAS2gNYwJOew0jVFFI=', '7c48217f-f594-466f-beb2-4a56789a2eb4', '2026-06-04 07:29:02.410', 12, 1, 30, '2026-06-04 09:34:20.657');

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id` varchar(191) NOT NULL,
  `status` enum('PENDING','COOKING','READY','COMPLETED','CANCELLED') NOT NULL DEFAULT 'PENDING',
  `totalPrice` double NOT NULL,
  `customerId` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `chefId` varchar(191) DEFAULT NULL,
  `updatedAt` datetime(3) NOT NULL,
  `cancelReason` varchar(191) DEFAULT NULL,
  `cancelledAt` datetime(3) DEFAULT NULL,
  `cancelledByRole` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`id`, `status`, `totalPrice`, `customerId`, `createdAt`, `chefId`, `updatedAt`, `cancelReason`, `cancelledAt`, `cancelledByRole`) VALUES
('1961f3d7-8abc-45b9-b813-44177bd1e0ca', 'PENDING', 95000, 'f4f35b76-0c6c-4d65-b52d-ea0653804171', '2026-06-06 17:54:06.727', NULL, '2026-06-06 17:54:06.727', NULL, NULL, NULL),
('2418e092-db43-462e-bb0b-bc02b10ff5f5', 'COMPLETED', 108000, '369fd73a-fe6d-4470-a462-bc66e2121010', '2026-06-06 08:31:03.698', '6d1881ee-783a-43fc-bf82-41496fc27feb', '2026-06-06 18:33:57.624', NULL, NULL, NULL),
('30023e5a-b596-4126-b59c-6d87f5caea45', 'CANCELLED', 84000, '957d0aab-6b46-42c3-9b76-f2311aed3242', '2026-06-04 10:35:14.687', '6d1881ee-783a-43fc-bf82-41496fc27feb', '2026-06-04 10:40:16.858', NULL, NULL, NULL),
('7d3f605b-4c57-44a3-889c-ad365ee6cb97', 'PENDING', 85000, '369fd73a-fe6d-4470-a462-bc66e2121010', '2026-06-06 08:40:23.704', '382bbea9-a8de-4622-bee0-046f6a5f24cb', '2026-06-06 11:51:55.726', NULL, NULL, NULL),
('831d9e4c-e871-47c0-a7c1-d5778b75a62c', 'COMPLETED', 110000, '369fd73a-fe6d-4470-a462-bc66e2121010', '2026-06-04 10:02:05.019', '6d1881ee-783a-43fc-bf82-41496fc27feb', '2026-06-04 10:34:15.058', NULL, NULL, NULL),
('95833c31-2aec-4aaa-ac3d-38dd3b1f1b14', 'COMPLETED', 150000, '369fd73a-fe6d-4470-a462-bc66e2121010', '2026-06-04 10:02:25.321', '6d1881ee-783a-43fc-bf82-41496fc27feb', '2026-06-04 10:49:47.610', NULL, NULL, NULL),
('ad36422c-ccff-4417-ab87-3361d42aee29', 'PENDING', 76000, 'f4f35b76-0c6c-4d65-b52d-ea0653804171', '2026-06-06 17:57:37.065', '3e96d886-3ccf-4fc7-a840-2914ea313668', '2026-06-06 18:36:09.535', NULL, NULL, NULL),
('d6713f93-ba1b-41aa-a7cd-d6b68b09ea30', 'PENDING', 115000, '369fd73a-fe6d-4470-a462-bc66e2121010', '2026-06-06 08:30:53.079', '3e96d886-3ccf-4fc7-a840-2914ea313668', '2026-06-06 08:39:02.362', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `orderdetail`
--

CREATE TABLE `orderdetail` (
  `id` varchar(191) NOT NULL,
  `orderId` varchar(191) NOT NULL,
  `menuId` varchar(191) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orderdetail`
--

INSERT INTO `orderdetail` (`id`, `orderId`, `menuId`, `quantity`, `price`) VALUES
('0097811e-1e92-4084-af47-6f363a88f270', 'd6713f93-ba1b-41aa-a7cd-d6b68b09ea30', 'fc43644b-ce25-4896-9f62-697a4739f261', 1, 40000),
('07a07ee0-4c37-41cb-ada9-7aa3336559c8', '2418e092-db43-462e-bb0b-bc02b10ff5f5', '7f316c7c-885b-4054-b6ab-503b4988366e', 1, 28000),
('07a16917-e4dd-44f7-902b-58bad7ba9226', '95833c31-2aec-4aaa-ac3d-38dd3b1f1b14', '5aa9a001-7f86-4fc3-a6fe-3d183b443ecb', 1, 58000),
('4b52a41f-0370-431c-8e5c-c8893db7c207', '95833c31-2aec-4aaa-ac3d-38dd3b1f1b14', '72ca7176-f974-435c-9554-1112841e7adc', 1, 22000),
('51b2b2d7-f710-4843-93ce-6edf9c8ab848', 'ad36422c-ccff-4417-ab87-3361d42aee29', 'b7b0e1f1-5f04-42c6-a721-977b4bb3d82c', 1, 46000),
('52a8a695-6d7f-4027-8b07-7e7ee067b7de', 'ad36422c-ccff-4417-ab87-3361d42aee29', '2578b83e-ae46-4f86-8322-4c1631af19f5', 1, 10000),
('6f8ed839-3e34-4600-a606-d0a159dbe208', '2418e092-db43-462e-bb0b-bc02b10ff5f5', '5aa9a001-7f86-4fc3-a6fe-3d183b443ecb', 1, 58000),
('720ff142-3438-49d7-b9d2-51f37efa3868', '2418e092-db43-462e-bb0b-bc02b10ff5f5', '72ca7176-f974-435c-9554-1112841e7adc', 1, 22000),
('73a04dc3-55ee-4443-a018-be296178555a', '7d3f605b-4c57-44a3-889c-ad365ee6cb97', 'fc43644b-ce25-4896-9f62-697a4739f261', 1, 40000),
('774bdcb2-248f-43cd-9121-cf15d79a2751', '95833c31-2aec-4aaa-ac3d-38dd3b1f1b14', '69143d42-5e72-475a-96c2-f08064b96fd9', 1, 25000),
('90a4f070-ea56-4b7d-94d7-e79a03ca82cc', '1961f3d7-8abc-45b9-b813-44177bd1e0ca', 'a0070eee-9f95-4e56-a15f-dde7a8471c14', 1, 45000),
('9ba46ca2-d8f8-40ed-ac84-faaa3c96e2a8', 'ad36422c-ccff-4417-ab87-3361d42aee29', '638e5b32-c75f-45d2-baf7-0b811b1e48c2', 1, 20000),
('9bd6654f-966d-4d90-bbfd-db297a267776', '30023e5a-b596-4126-b59c-6d87f5caea45', 'b7b0e1f1-5f04-42c6-a721-977b4bb3d82c', 1, 46000),
('9e08e987-d8fa-4bbd-8043-90c333c20e9b', '95833c31-2aec-4aaa-ac3d-38dd3b1f1b14', 'b778a5e8-4042-48fc-8301-87cf1f718eae', 1, 45000),
('a4dcd6df-35ee-4d2c-9c8e-8df3b0309b2e', '831d9e4c-e871-47c0-a7c1-d5778b75a62c', 'fc43644b-ce25-4896-9f62-697a4739f261', 2, 40000),
('b33d0ee8-df87-4b86-bcd7-0d12772ffc3e', 'd6713f93-ba1b-41aa-a7cd-d6b68b09ea30', 'ac2478ff-4075-4d05-abc0-4ae351fb21af', 1, 25000),
('d54b28c8-6c52-4b64-9645-f829c8da03b0', '831d9e4c-e871-47c0-a7c1-d5778b75a62c', '61e6e24c-a1d8-459f-a507-c256b6151a36', 2, 15000),
('db21c459-cf0c-48ea-96be-e494b68ba86f', 'd6713f93-ba1b-41aa-a7cd-d6b68b09ea30', '5b23a99d-1863-4ca7-ab62-d0fb0fd43d24', 1, 50000),
('e0936821-3c07-415f-aca7-6928b12ad230', '7d3f605b-4c57-44a3-889c-ad365ee6cb97', 'a0070eee-9f95-4e56-a15f-dde7a8471c14', 1, 45000),
('e557491e-538e-4b47-9839-e7f871098ce8', '1961f3d7-8abc-45b9-b813-44177bd1e0ca', '5b23a99d-1863-4ca7-ab62-d0fb0fd43d24', 1, 50000),
('fbc7a754-2326-4e73-87a4-ca52a8b44a27', '30023e5a-b596-4126-b59c-6d87f5caea45', '49ccb2b0-2f1a-4fa2-9dff-0f9e1592ad88', 1, 38000);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `role` enum('ADMIN','CHEF','CUSTOMER') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `role`) VALUES
('369fd73a-fe6d-4470-a462-bc66e2121010', 'Budi', 'budi@gmail.com', '$2b$10$2eWTKHs/Yhg6AA5XeC4m5.WowWhXbcLt5E870XkGZimtI5wIeGhNC', 'CHEF'),
('382bbea9-a8de-4622-bee0-046f6a5f24cb', 'Seline', 'seline@gmail.com', '$2b$10$xLa4I/SrtBWXomhOr2YvEefuWszxqvPcGbbUg4y9z0.3dFBHdVq22', 'CUSTOMER'),
('3e96d886-3ccf-4fc7-a840-2914ea313668', 'Edwin', 'edwin@gmail.com', '$2b$10$AgIs47I2e7rkJM1zzxVhIO/bQKYwQI1ESLB9.s7TcHB.KVwIWCEVy', 'CHEF'),
('6d1881ee-783a-43fc-bf82-41496fc27feb', 'Anna', 'anna@gmail.com', '$2b$10$D.tVff5xXSMjFtu46sLbcOVD1gjj6Jr1b5LVaNT4rbMF6QqJpUg9.', 'CHEF'),
('957d0aab-6b46-42c3-9b76-f2311aed3242', 'Kelly', 'kelly@gmail.com', '$2b$10$cvdPds9Mnh1bInANuK9gCeJi2svh11uudDqweZA0/rPX8WN4P6BeC', 'CUSTOMER'),
('ef54621d-d39b-45a5-94c0-0594705b67ea', 'Budi Wijaya', 'adminBudi@gmail.com', '$2b$10$FI7f.6B9UBToPgDazfOXcex1H/HifxecQBuwPDl5n8UNUj09y.HAy', 'ADMIN'),
('f4f35b76-0c6c-4d65-b52d-ea0653804171', 'John Doe', 'johndoe@gmail.com', '$2b$10$6VoEmBnDCvAw7MZHESeQhuUiaxctbncoX1tesBsiG0HvOTC8ZHkXS', 'CUSTOMER');

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('305a2c10-fe1c-42db-a70e-6ed50b0d987d', 'eecf63c4640ac4502479f29c3f2509468d36c16e95cafb96d1b2fdfd75c85cb2', '2026-06-04 07:10:22.437', '20260530135308_init', NULL, NULL, '2026-06-04 07:10:22.309', 1),
('431a4b92-7bc7-4206-993f-6a40fd6e292e', 'becea6bc51895bd739907657e1b70f56b52e5b8c4be7d7e30cc00ea58e63535a', '2026-06-04 07:10:22.482', '20260530153505_update_schema', NULL, NULL, '2026-06-04 07:10:22.438', 1),
('a34384ec-782e-4677-a82a-027059155284', '9380502402477b0397b79fc4585b4863857fa1f548ccca79767b045a04a0dcb9', '2026-06-04 07:10:22.492', '20260603051859_add_cancelled_status', NULL, NULL, '2026-06-04 07:10:22.484', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Menu_categoryId_fkey` (`categoryId`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Order_customerId_fkey` (`customerId`),
  ADD KEY `Order_chefId_fkey` (`chefId`);

--
-- Indexes for table `orderdetail`
--
ALTER TABLE `orderdetail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `OrderDetail_orderId_fkey` (`orderId`),
  ADD KEY `OrderDetail_menuId_fkey` (`menuId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `menu`
--
ALTER TABLE `menu`
  ADD CONSTRAINT `Menu_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `Order_chefId_fkey` FOREIGN KEY (`chefId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Order_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `orderdetail`
--
ALTER TABLE `orderdetail`
  ADD CONSTRAINT `OrderDetail_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `menu` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `OrderDetail_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `order` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
