-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: May 01, 2018 at 07:20 PM
-- Server version: 5.6.38
-- PHP Version: 7.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `BTA`
--

-- --------------------------------------------------------

--
-- Table structure for table `attraction`
--

CREATE TABLE `attraction` (
  `attID` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `operDate` varchar(128) NOT NULL,
  `operTime` varchar(256) NOT NULL,
  `suggTime` varchar(256) DEFAULT NULL,
  `cost` varchar(256) DEFAULT NULL,
  `type` varchar(16) NOT NULL,
  `zone` varchar(16) NOT NULL,
  `transportation` varchar(256) DEFAULT NULL,
  `description` text,
  `validated` varchar(1) NOT NULL,
  `imgSrc` varchar(100) NOT NULL,
  `lat` float(10,6) NOT NULL,
  `lng` float(10,6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `attraction`
--

INSERT INTO `attraction` (`attID`, `name`, `operDate`, `operTime`, `suggTime`, `cost`, `type`, `zone`, `transportation`, `description`, `validated`, `imgSrc`, `lat`, `lng`) VALUES
(1, 'The Grand Palace', 'Everyday', '8:30am - 3:30pm', '2 hours at the morning', '500 Baht for foreigners , Free for locals', 'palace', 'Phranakhon', 'BUS available :1,2,3,15,25,32,42,47,53,59,60,68,70,79,80,82,91,203,503,509,511,508,516 and 556\r\nBTS/MRT:\r\nBTS available\r\nBTS Saphan Taksin then take Chaopraya boat\r\n\r\nDepart from Siam:\r\nFrom siam take no.15 bus in front of siam square 1', 'Explore the famous complex of ornate buildings at The Grand Palace, a gem in the country\'s architectural and political heritage. Established in 1782, the palace grounds have been added to over the centuries with eclectically designed buildings, halls, and pavilions. The official home of Thai monarchs until the abolishment of the absolute monarchy in 1932, the site remains open to visitors, with its well-maintained grounds and monumental architecture providing great photo ops and an immersive cultural experience. ', 'Y', 'the grand palace.jpg', 13.750031, 100.491287),
(2, 'Temple of the Emerald Buddha', 'Everyday', '8:30am – 3:30pm ', '1 hours at the morning', '500 Baht for foreigners , Free for locals', 'temple', 'Phranakhon', 'BUS available :1,2,3,15,25,32,42,47,53,59,60,68,70,79,80,82,91,203,503,509,511,508,516 and 556\r\n\r\nBTS/MRT:\r\nBTS available\r\n(BTS Saphan Taksin then take Chaopraya boat)', 'Pay a visit to the most sacred Buddhist temple in Thailand at Temple of the Emerald Buddha (Wat Phra Kaew). Located in the precincts of the Grand Palace, the temple houses an emerald Buddha statue carved from semi-precious green stone and covered in gold--deemed to be the palladium (protective image) of Thailand. The surrounding buildings, sculptural forms, and murals complement the regal and spiritual atmosphere of the room in which the Buddha is kept. Take time to wander the grounds, a great place to get lost in.', 'Y', 'watprakaew.jpg', 13.751644, 100.492706),
(3, 'Chatuchak Weekend Market', 'Weekend', '10:00am - 7:00pm', '3h 30 min for sightseeing , 5h-6h for shopaholic', 'Free', 'shopping', 'Chatuchak', 'Bus available : 3, 8, 26, 27, 28, 29, 34, 38, 39, 44, 52, 59, 63, 77, 90, 96, 104, 108, 122, 126, 134, 136, 138, 145, 182, 188 BTS/MRT:  Mrt Chatuchak BTS Mochit  Train: Hualumphong Train Station To Chatuchak train station', 'Browse the day away at Chatuchak Weekend Market, a popular covered retail space in the city center. Attracting over 200,000 visitors on a typical weekend, the huge market offers 27 separate areas of stalls, with over 8,000 individual vendors plying their trade. From collectibles, souvenirs, and clothes, to fresh food, restaurants, and household appliance stores, the market contains a mind-boggling range of products. Its sheer scale will likely impress even those who have nothing on their shopping list.', 'Y', 'chatuchak.jpg', 13.800113, 100.551041),
(4, 'Siam Paragon', 'Everyday', '10:00am - 10:00pm', '2 hours walking', 'Free', 'shopping', 'Pathumwan', 'Bus Available\r\n15,16,204,40,48,501,508,54,73,79\r\n\r\nBTS/MRT: BTS Siam', 'Find what you\'re looking for at Siam Paragon, a modern, upscale shopping mall in Bangkok--and one of the largest in Asia. Since opening in 2008, the center has become a place to be seen for locals and a place to see for tourists: the stylish displays and elite brands on offer here make for an attractive place of commerce and leisure, while modern flourishes neatly encapsulate the will for modernization in the region. With a multitude of shops, international and local restaurants, and a multiplex cinema, the mall offers different experiences for a wide set of visitors.', 'Y', 'paragon.jpg', 13.746091, 100.534813),
(5, 'Temple of Dawn (Wat Arun)', 'Everyday', '8:00am - 5.30pm', '1 hours walking', '50 Baht for foreigners, Free for locals', 'temple', 'Chaopraya', 'BUS Available:19 and 57\r\nBTS Sapan Taksin (Exit 2) > Chao Phraya Express Boat (Ta Sathorn) > Chao Phraya Express Boat (Ta Tian) > Wat Arun\r\n', 'Admire the grand and evocative design of Temple of Dawn (Wat Arun), a towering Buddhist temple located in the heart of Bangkok. Established in the 1600s--but gaining its distinctive porcelain-clad prangs (spires) during the reign of King Rama II in the early 19th century--the temple represents an apex of religious architecture and is one of the best maintained of all buildings commissioned by the Thai monarchy. Open to the public as a place of worship and tourism, the site contains prized artifacts relating to the religious and royal history of Thailand. ', 'Y', 'wat arun.jpeg', 13.743685, 100.488930),
(6, 'MBK Center (Ma Boon Khrong Center)', 'Everyday', '10:00am - 10:00pm', '3 hours walking, a day for shopping', 'Free', 'shopping', 'Pathumwan', 'BUS Available:11,113,159,16,163,172,177,204,25,29,34,36,40,47,50,501,529,542,73 and 93\r\n\r\nBTS/MRT\r\nBTS National Stadium\r\n', 'Feel the buzz of commerce in the capital at MBK Center (Ma Boon Khrong Center), an enormous shopping mall in the heart of Bangkok. Popular with tourists and locals alike, the entire complex houses around 2,000 businesses offering a variety of products and services. The elevated walkways and throngs of people make this a popular tourist destination even for those not initially interested in purchasing anything. Visit the center to take a photo or two, and browse around to see if anything catches your eye.', 'Y', 'mbk.jpg', 13.744468, 100.529907),
(7, 'Safari World', 'Everyday', '9:00am - 5:00pm', '5 hours for visiting, a day for passion', 'Safari Park : Adult = 1,000 Baht , Child = 900 Baht;\r\nMarine Park : Adult = 1,200 Baht , Child = 1,000 Baht;\r\nBoth Park : Adult = 1,400 Baht , Child = 1,100 Baht;  ', 'other', 'Khlong Sam Wa', 'BTS Mo Chit > Bus No.29,96 (Fashion Island)\r\n', 'A trip around the huge grounds of Safari World guarantees sights of a range of animals in a safari experience. You can use your own car or go on an official tour to see the creatures in expansive settings. This \"zoo-plus\" features a large marine environment, bird cages, and even the chance to feed giraffes. Note that there have been many reports of poor treatment of animals here. ', 'Y', 'safari world.jpg', 13.865491, 100.703407),
(8, 'The National Museum Bangkok', 'Wednesday - Sunday', '9:00am - 4:00pm', '1 hours for visiting', '200 Baht for foreigners', 'Museum', 'Phranakhon', 'BUS Available 524\r\nBTS/MRT\r\nBTS Sapan Taksin (Exit 2) >Chao Phraya Express Boat (Ta Sathorn)  > Chao Phraya Express Boat (Ta Chang) > Thammasat University > The National Museum Bangkok\r\n', 'Go on a journey through thousands of years of Thai history and culture at The National Museum Bangkok, a treasure chest housed inside the former palace of Siamese viceroys. Originally established in 1874 by King Rama V to showcase his father\'s private collection of artwork, the museum now ranks among the largest in Southeast Asia and displays various aspects of Thai heritage. You can admire everything from precious stones to ornamental clothes, and from prehistoric artifacts to royal thrones. In addition to the rich Thai collection, the museum displays objects from other parts of Southeast Asia and China, including weapons, sculptures, and musical instruments. Information in English and multilingual tours provide context for visitors without knowledge of the Thai language. ', 'Y', 'national museum.JPG', 13.759172, 100.494026),
(9, 'Wat Pho', 'Everyday', 'All Time', '1 hours for visiting', 'Free', 'Temple', 'Phranakhon', 'Bus Available :1,3,6,9,12,25,32,44,47,48,53,82\r\n\r\nBTS/MRT\r\nBTS Sapan Taksin S6 (Exit 2) > Chao Phraya Express Boat (Ta Sathorn) > Chao Phraya Express Boat (Ta Tian) > Wat Pho\r\n', 'Visit Wat Pho, one of the six main Buddhist temples in Thailand. Admire the 46 m (151 ft) long Buddha statue and its memorable pose, and explore the wide range of temple buildings displaying rich and intricate religious designs and a history dating back to the 16th century. Vital to the spiritual and architectural heritage of the city and the country at large, the site houses the largest collection of Buddha depictions in Thailand. Said to be the first public university in the nation, the temple also has an illustrious educational history and still runs courses on traditional Thai massage and medicine. ', 'Y', 'wat pho.jpg', 13.746493, 100.492592),
(10, 'China Town (Yaowarat)', 'Everyday', 'Lunch and Dinner', 'Evening (Dinner)', 'Free', 'Street', 'Phranakhon', 'BTS/MRT\r\nBTS Sapan Taksin (Exit 2) > Shuttle Boat \r\n', 'Chinatown is a colourful, exotic and pleasingly chaotic area, packed with market stalls and probably the highest concentration of gold shops in the city. During major festivities like Chinese New Year and the Vegetarian Festival, the dynamism and spirit of celebration spreads across town like wildfire, and if you happen to be around, don’t miss an opportunity to witness Bangkok Chinatown at its best.', 'Y', 'yaowarat.jpg', 13.741273, 100.508163),
(11, 'Khao San Road', 'Everyday', 'Evening', 'After Evening', 'Free', 'Street', 'Phranakhon', 'Bus available 3,6,15,30,33,64,55\r\nBoat: drop at Thaprarthit station walk straight and then turn right then turn left at soi Ramabuit then walk straight \r\nFrom Siam:\r\nFrom Siam takes no.15 bus and get off at Khok Wua bus stop at Ratchadumnernklang road cros', 'If Bangkok is a city where East greets West, then Khao San Road is the scene of their collision, the place where they jostle for superiority and poke one another in the eye. With travellers from every corner of the modern world, sleek clubs playing sophisticated sounds, eclectic market stalls, converted VW cocktail bars, and foods tamed to suit the Western palate, it may seem clear who won the fight.', 'Y', 'khao san.jpg', 13.758937, 100.497215),
(12, 'Asiatique The Riverfront', 'EveryDay', '5:00PM - 12:00AM', 'After 7:00PM', 'Free', 'street', 'Chaopraya', 'Bus available 3,6,15,30,33,64,55\r\nBoat: drop at Thaprarthit station walk straight and then turn right then turn left at soi Ramabuit then walk straight \r\n\r\n', 'Asiatique has successfully combined two of the most popular shopping experiences in the city: a night bazaar and a mall. Ten minutes downriver from Saphan Taksin BTS station this once-bustling international trade port has been transformed, with over 1,500 boutiques and 40 restaurants housed under a huge replica warehouse complex. Open from 17:00, spending an evening here is no problem: you’ll have good fun browsing the boutiques, picking up gifts or something for yourself; you are guaranteed to find something you would like to eat and if this isn’t enough entertainment, shows are performed nightly: Calypso ladyboy cabaret and soon, a classic Thai puppets performance.', 'Y', 'Asiatique.jpg', 13.704704, 100.502640),
(13, 'Lhong 1919', 'EveryDay', '10:00AM - 10:00PM', 'Evening', 'Free', 'street', 'Chaopraya', 'BTS Sapan Taksin (Exit 2) > Shuttle Boat(Sawatdee Station)\r\n', 'Lhong 1919 Bangkok is a 19th century Chinese mansion that has been fully restored and opened as an attraction. It mixes Bangkok heritage with shopping, dining and lots of interesting photo opportunities – it ticks all the boxes for a fun day out in Bangkok. The centre point of this old Chinese manor is the large shrine to Mazu, the Chinese goddess of seafarers. The air is heavy with the scent of incense and smoke and many people will kneel to say a prayer. As you walk around the courtyard and rooms, you can see period fixtures and artefacts displayed for visitors to see. In parts, it feels a little like a theme park recreation of what a 19th century Chinese mansion should be, but it’s still wildly popular with locals and visitors.', 'Y', 'lhong 1919.jpg', 13.734309, 100.507637),
(15, 'Jim Thompson\'s House', 'Everyday', '9:00AM - 5:00PM', 'After Afternoon', '100 Baht for Adults, 50 Baht for Students', 'other', 'Pathumwan', 'BUS Available:11,113,159,16,163,172,177,204,25,29,34,36,40,47,50,501,529,542,73 and 93\r\nBTS/MRT\r\nBTS National stadium cross the road to opposite side walk in to Soi Kasemsun ', 'The historic home of a \'self-made American entrepreneur\' who disappeared while traveling in Malaysia now stands as a relic of an older time in Bangkok. Jim Thompson settled in Thailand after spending time there as a serviceman around the end of WWII. He was a prominent figure in the Thai silk industry and was awarded the Order of the White Elephant, a significant honor given to foreigners who have made contributions to Thailand. Thompson\'s home has been turned into a museum offering insights into his life and business, as well as the history of the city and the Thai silk industry.', 'Y', 'jim thompson.jpg', 13.749155, 100.528381),
(16, 'Lumpini Park', 'Everyday', '9:00AM - 5:00PM', 'At the early morning', 'Free', 'Park', 'Silom', 'BUS Available\r\n4, 13, 14A, 15, 29, 45, 47, 50, 62, 67, 76, 77, 89, 505\r\nBTS/MRT:\r\nBTS Saladaemg\r\nMRT Silom', 'Lumpini Park provides visitors with a green oasis amidst the traffic and chaos of Bangkok. Hang out on one of several lawn areas, enjoy the shade of a Chinese pagoda, or take a boat out on the lake. Lumpini Park is a great place to spend an afternoon enjoying the contrast of the tranquil park with the skyscrapers rising all around it. Note that the park has been the site of anti-government protests that have occasionally turned violent in the past, so be sure to check on the current status before visiting.', 'Y', 'lumphini.jpg', 13.729922, 100.541336),
(17, 'Terminal 21', 'Everyday', '10:00AM - 10:00PM', 'Meal Time', 'Free', 'Shopping', 'Watthana', 'BUS Available 2,48,508,511,513\r\nBTS/MRT:\r\nBTS Asoke\r\nMRT Sukhumvit\r\n', 'The name might lead you to think this is a transport hub, but it\'s actually a shopping mall. And you might be wondering why you would want to visit a shopping mall for kick while traveling. Well, Terminal 21 has a special flair - even by Thailand\'s shopping standards. Every floor of the mall has been themed to a different international city. Enter at the level of the BTS station and you\'ll be in Paris; go up a floor and it\'s Tokyo; another floor and you\'re staring at the iconic red phone booths of London. The Caribbean, San Francisco, and Istanbul also figure into the design theme.', 'Y', 'terminal21.jpg', 13.737877, 100.560440),
(18, 'Central World', 'Everyday', '10:30AM - 10:00PM', 'Any Time', 'Free', 'Shopping', 'Pathumwan', 'BUS Available \r\n13,14,17,2,204,504,505,511,513,514,54,73,74,77,79\r\n\r\nBTS/MRT:\r\nBTS: Siam ,Chid Lom\r\n \r\n', 'Opened in 1990, the eight-story CentralWorld marketed itself as a middle class shopping center, opposed to the upper class-marketed Siam Paragon. On 19th May 2010, CentralWorld was one of the many properties set on fire by anti government protestors. The fire raged for two days and the Zen department store collapsed in the fire. After months of repair works, the shopping complex reopened on 28th September with 80% of its retail space open for business.', 'Y', 'centralworld.jpg', 13.746539, 100.539360),
(19, 'Platinum Mall', 'Everyday', '8:00AM - 8:00PM', 'Any Time', 'Free', 'Shopping', 'Ratchathewi', 'BUS Available \r\n204,504,514,62,73,74,76\r\nBTS/MRT\r\nBTS Chid Lom, Ratchathewi\r\n', 'The Platinum Mall is a fashion mall; this means the focus of the stores is on fashion and clothing. The mall is ideally located in one of the busiest areas of Bangkok and the 6 storey shopping center caters to bargain hunters and those looking for cheap merchandise. Platinum is a wholesale mall with many clothing, shoe and accessory stores as well as restaurants and a food', 'Y', 'platinum.jpg', 13.750203, 100.539452),
(20, 'Erawan Shrine', 'Everyday', '6:00AM - 6:00AM', '1 hours for visiting', 'Free', 'temple', 'Pathumwan', 'BUS Available 13,14,15,17,2,40,48,501,504,505,508,511,513,514,74,77\r\n\r\nBTS/MRT\r\n\r\nBTS Chid Lom\r\n\r\n', 'The Thao Maha Brahma Shrine or Erawan Shrine was constructed in 1956 to appease the Gods/spirits/evil forces when the Grand Hyatt Erawan Hotel building site faced a number of setbacks. The superstitious construction workers refused to continue working until astrologists were consulted and the land spirits were appeased. Believers felt that the bad luck suffered by the construction workers was due to the work beginning on an unfavorable date. The construction of this shrine shows the power of religion in the modern Thai society, and that the many ancient temples and shrines are not just part of the Thai history but a living element in the Thai culture. Once the shrine had been built the deaths stopped and the hotel went on to enjoy 30 years of prosperity!', 'Y', 'erawan.jpg', 13.744397, 100.540367),
(21, 'Museum of Siam', 'Tuesday - Sunday', '10:00AM - 6:00PM', '1 hours for visiting', '300 Baht for foreigners , 100 Baht for locals', 'Museum', 'Phranakhon', 'BTS/MRT\r\nBTS Sapan Taksin S6 (Exit 2) > Chao Phraya Express Boat (Ta Sathorn) > Chao Phraya Express Boat (Ta Tian) > Sanamchai Rd. > Museum\r\n', 'This museum shows the development and history of the Thai culture, innovative interactive displays, games and storytelling techniques were used in the museum. The museum building is a neoclassical house, once the Commerce Ministry building. As you approach the museum there is a modern metal sculpture of a coiling ribbon (as used in traditional Thai dancing) on the lawn. On the ribbon is written \'What does it mean to be Thai?\' which captures the museum\'s premise in a nutshell. The ribbon or \'roong\' theme continues throughout the museum.', 'Y', 'museum of siam.jpg', 13.744147, 100.494141),
(22, 'Dusit Zoo', 'Tuesday - Sunday', '8:00AM - 6:00PM', '2 hours for visiting, half a day for passion', '150 Baht for foreigners : 100 Baht for locals', 'other', 'Dusit', 'BUS Available 18, 28, 108, 528,515, 539,542\r\nBTS Victory Monument (need to take bus)', 'Animals from far and wide are featured at Dusit Zoo. Different types of monkeys, hippopotamus, alligators, tigers, and lions together with rare breeds (for Thailand) such as penguins, camels, wallabies, and kangaroos are kept here. Some other highlights include African Savanna, an area where giraffes, ostriches, and zebras roam, Nocturnal House, Reptile House, Pheasants Aviary, Hawks Exhibit, Elephants House, and an impressive Play Land, where many rides are available for your children\'s laughs and giggles.', 'Y', 'dusit zoo.jpg', 13.773880, 100.516182),
(23, 'Chulalongkorn University', 'Everyday', 'All day', 'Any time', 'Free', 'Other', 'Pathumwan', 'BTS:Siam \r\nMrt:Samyan exit 2\r\nBUS available : 11, 25, 54, 73,79, 204, 21,34,47,50,67,93, 141, 27,29,36,65,501,16,21,141\r\n', 'University in Bangkok', 'Y', 'chulalonglornunisersity.jpg', 13.739007, 100.527611),
(27, 'Bangkok Christian College', 'Everyday', 'All day', 'Any time', 'Free', 'Other', 'Sathorn', 'BTS Surasak', 'Best school in Bangkok', 'Y', 'images.jpeg', 13.721303, 100.522423),
(28, 'Tha Maharaj', 'Everyday', '10.00AM-10.00PM', 'After 7:00PM', 'Free', 'shopping', 'Phranakhon', 'BUS 32,53,124,203,201 and 524\r\nBTS Sapantaksin take Chaopraya speed boat from Sathorn station to Pranok station\r\n', '“Tha Maharaj” is located on Maharaj road in Rattanakosin Island, built in the early Ratttanakosin period.  Located on the bank of the Chao Phraya river, Tha Maharaj is surrounded by rich cultural heritage and tourist attraction of Thai arts, museums, The Grand Palace, Wat Pho, Wat Arun The Temple of Dawn, Thammasat University, Silapakorn Fine Arts University, and Siriraj Hospital.  Tourists visit this area daily as their “Must See Place” in Bangkok.  Local visitors also flock this area to experience one of the biggest talisman and amulet market in Thailand.', 'Y', 'thamaharat.jpeg', 13.753642, 100.488823),
(29, 'Phra Sumen Fort', 'Everyday', 'All day', '30 minutes for visiting', 'Free', 'Park', 'Chaopraya', NULL, 'Phra Sumen Fort, in particular, is a sight to behold. Present since 1782 around the time of Bangkok’s founding, the durable fort is one of two last remaining original forts that were built to protect the city from invasions. It is named after Mount Meru in Hindu, Jain, and Buddhist cosmology. The octagonal white brick and stucco structure is three floors high and once housed weapons and ammunition. Today, one can observe canons overlooking the area from the fort still doing their job with vigilance.', 'Y', 'prasumen.jpg', 13.763978, 100.495766),
(30, 'Pipit Banglamphu', 'Tuesday - Sunday', '10.00AM-6.00PM', '1.5 hours for visiting', 'Free', 'Museum', 'Chaopraya', NULL, 'Pipit Bang Lamphu Museum is composed of two L-shaped buildings. The buildings were constructed in 1925 and once served as the Wat Sangwet Printing School. The museum presents local ways of life, historical sites and traditions of the Bang Lamphu community.', 'Y', 'pipit.jpeg', 13.763534, 100.496452),
(36, 'Central Rama III', 'e', 'e', 'e', 'free', 'Shopping', 'rama 3', 'BUS Available \r\n102,180, 22,67,77\r\n', 'eeeee', 'Y', 'bangkok-on-a-budget.jpg', 13.697567, 100.537582);

-- --------------------------------------------------------

--
-- Table structure for table `attraction_name`
--

CREATE TABLE `attraction_name` (
  `attID` int(11) NOT NULL,
  `name` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `attraction_name`
--

INSERT INTO `attraction_name` (`attID`, `name`) VALUES
(1, 'The Grand Palace'),
(2, 'Temple of the Emerald Buddha'),
(2, 'Wat Pra kaew'),
(3, 'Chatuchak Weekend Market'),
(4, 'Siam Paragon'),
(5, 'Temple of Dawn'),
(6, 'MBK Center'),
(7, 'Safari World'),
(8, 'The National Museum Bangkok'),
(9, 'Wat Pho'),
(10, 'China Town'),
(11, 'Khao San Road'),
(12, 'Asiatique The Riverfront'),
(13, 'Lhong 1919'),
(15, 'Jim Thompson\'s House'),
(16, 'Lumpini Park'),
(17, 'Terminal 21'),
(18, 'Central World'),
(19, 'Platinum Mall'),
(20, 'Erawan Shrine'),
(21, 'Museum of Siam'),
(22, 'Dusit Zoo'),
(23, 'Chulalongkorn University'),
(23, 'undefined'),
(27, 'Bangkok Christian College'),
(28, 'Tha Maharaj'),
(29, 'Phra Sumen Fort'),
(30, 'Pipit Banglamphu'),
(36, 'Best central'),
(36, 'my home'),
(36, 'Rama 3');

-- --------------------------------------------------------

--
-- Table structure for table `contains`
--

CREATE TABLE `contains` (
  `attID` int(11) NOT NULL,
  `Time` int(1) NOT NULL,
  `routeID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `contains`
--

INSERT INTO `contains` (`attID`, `Time`, `routeID`) VALUES
(1, 4, 1),
(1, 3, 2),
(1, 1, 10),
(1, 4, 11),
(1, 3, 12),
(2, 5, 1),
(2, 5, 2),
(2, 2, 9),
(2, 5, 11),
(2, 5, 12),
(3, 1, 4),
(3, 2, 8),
(4, 3, 3),
(4, 2, 4),
(4, 4, 5),
(5, 1, 1),
(5, 3, 6),
(5, 4, 9),
(5, 1, 11),
(6, 2, 3),
(6, 3, 5),
(8, 4, 2),
(8, 2, 10),
(8, 4, 12),
(9, 2, 1),
(9, 1, 2),
(9, 3, 9),
(9, 2, 11),
(9, 1, 12),
(12, 6, 6),
(13, 5, 6),
(15, 1, 3),
(17, 3, 4),
(18, 5, 3),
(20, 4, 3),
(20, 1, 5),
(20, 1, 9),
(21, 3, 1),
(21, 2, 2),
(21, 4, 6),
(21, 3, 10),
(21, 3, 11),
(21, 2, 12),
(22, 1, 8),
(23, 2, 5),
(28, 6, 2),
(28, 6, 12),
(29, 1, 6),
(30, 2, 6),
(30, 4, 10);

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `attID` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `operDate` varchar(128) NOT NULL,
  `operTime` varchar(256) NOT NULL,
  `suggTime` varchar(256) DEFAULT NULL,
  `cost` varchar(256) DEFAULT NULL,
  `type` varchar(16) NOT NULL,
  `zone` varchar(16) NOT NULL,
  `transportation` varchar(256) DEFAULT NULL,
  `description` text,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `validated` varchar(1) NOT NULL,
  `imgSrc` varchar(100) NOT NULL,
  `lat` float NOT NULL,
  `lng` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`attID`, `name`, `operDate`, `operTime`, `suggTime`, `cost`, `type`, `zone`, `transportation`, `description`, `startDate`, `endDate`, `validated`, `imgSrc`, `lat`, `lng`) VALUES
(6, 'Intania Fair', 'Weekdays', '16.00 - 20.00', '17.00-19.00', 'free', 'Business', 'Bangkok', 'BTS Siam Exit 2', 'Food & Beverage', '2018-04-06', '2018-05-09', 'Y', 'intania.jpg', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `favorite`
--

CREATE TABLE `favorite` (
  `uid` int(11) NOT NULL,
  `attID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `favorite`
--

INSERT INTO `favorite` (`uid`, `attID`) VALUES
(1, 15),
(1, 16);

-- --------------------------------------------------------

--
-- Table structure for table `route`
--

CREATE TABLE `route` (
  `routeID` int(11) NOT NULL,
  `noplace` tinyint(4) NOT NULL,
  `type1` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `route`
--

INSERT INTO `route` (`routeID`, `noplace`, `type1`) VALUES
(1, 5, 'Temples and Museums'),
(2, 6, 'Rattanakosin Highlight'),
(3, 5, 'Siam and around'),
(4, 3, 'Shopping along the BTS'),
(5, 4, ''),
(6, 6, 'Boat along Chaopraya River'),
(8, 2, 'Zoo and shopping'),
(9, 4, ''),
(10, 4, ''),
(11, 5, ''),
(12, 6, '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `uid` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `email` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`uid`, `name`, `email`) VALUES
(1, 'Phumin Aphichaichatchaval', 'phumin.aph@gmail.com'),
(2, 'Chan', 'Chigachan'),
(3, 'Karn', 'karnnykarn@gmail.com'),
(4, 'Nonny', 'Nonnyeang@chula.student'),
(5, 'Chim', 'Chimchim'),
(6, 'Chalee', 'Chalee.lee@gmail.com'),
(7, 'Mark', 'Marki@gail.com'),
(29, 'Phumin Aphichaichatchaval', 'peach.aph@gmail.com'),
(30, 'Chan Pichitwattana', 'chan.pichitwattana@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `went_to_attraction`
--

CREATE TABLE `went_to_attraction` (
  `uid` int(11) NOT NULL,
  `attID` int(11) NOT NULL,
  `feedback` text NOT NULL,
  `date` date NOT NULL,
  `rating` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `went_to_attraction`
--

INSERT INTO `went_to_attraction` (`uid`, `attID`, `feedback`, `date`, `rating`) VALUES
(1, 1, 'This is Thailand\'s most venerated and glittering sight, the Grand Palace, which is home to the country\'s most visited temple, Wat Phra Kaew, more commonly known as the Temple of the Emerald Buddha. Built by King Rama I, it is the most revered spot in Thailand, and packed with merit making locals on weekends. Make sure not to miss the Emerald Buddha. It may only be 31 inches tall, but it is the most worshipped statue in the country. You can buy joss sticks, candles, and gold leaves if you wish to join the pilgrims in the temple making their offerings. Proper attire is required, appropriate attire is required, no singlets, shorts, skirts, sandals, or revealing clothing of any nature is allowed,although if you forget there are sarongs available for use.  ', '2018-04-23', '100'),
(1, 2, 'Amazing! it is everything around the temple that is most impressive. The Buddha himself is tiny, but the grounds are incredible in the number and detail of the sculptures and architecture.', '2018-04-23', '100\r\n'),
(1, 3, 'A little disappointed\r\nI was there during Songkran and was disappointed to find lots of shops were closed. But i did find a few interesting things.', '2018-04-13', '70'),
(1, 4, 'Just a mall with super car', '2018-04-23', '70\r\n'),
(1, 5, 'Beautiful Place\r\nStunning and ornate architecture, worth a visit. make sure you dress respectfully though they are very hot on this.', '2018-04-24', '90\r\n'),
(1, 6, 'Mall with fake brand', '2018-04-24', '40'),
(1, 7, 'Just a zoo', '2018-04-25', '40'),
(1, 9, 'Temple with big giant in front, this place is very beautiful ', '2018-04-21', '80'),
(1, 10, 'Great food great people', '2018-04-25', '70'),
(1, 11, 'Nice club, bunch of ladyboy', '2018-04-26', '89'),
(1, 12, 'Good view on night and day, you can see the view on big ferry wheel', '2018-04-26', '99'),
(1, 18, 'Too cold', '2018-04-23', '99'),
(1, 23, 'Best university in Samyan, 101 years of history. People visit', '2018-04-27', '100'),
(2, 4, 'Lot of MacBook and brandname ', '2018-04-21', '100'),
(2, 6, 'I like it, I love to buy and sell things here', '2018-04-21', '100'),
(2, 17, 'Another good mall, different floor have different design.', '2018-04-21', '100'),
(2, 18, 'This is very near from both Siam and Chitlom station. It very is easy to transport by train. The thing inside is very similar to other mall but it have every thing.', '2018-04-21', '100'),
(3, 3, 'This place was insane, there are a lot of shop that sell the same thing with the same price. They also sell second hand stuff here.', '2018-04-30', '80'),
(3, 11, 'Nice club, nice people, cheap food.', '2018-04-21', '100'),
(4, 2, 'Sooo many people!\r\nWhile in Bangkok it is definitely worth a visit.\r\n\r\nTake lots of water, with the amount of people in small proximity in very high temperatures it was unbearably hot.\r\n\r\nWe only stayed for about 20 minutes due to the number of people (soooo many!!) and heat.\r\n\r\nYou have to wear appropriate clothing (men have to wear long trousers).', '2018-04-23', '100'),
(5, 2, 'My favorite Temple in Bangkok\r\nNot only is this place huge, but it has many shrines and pagodas, and the architecture and detail are very cool. It takes a while to get through, but it is truly amazing. I also recommend spending some time in the courtyard outside of the Grand Palace itself - it\'s a huge building! Come here and you won\'t be disappointed.', '2018-04-28', '88'),
(6, 2, 'Regal though crowded.\r\nHere all that glitters is indeed gold or gold plated and very artistic. However the chief attraction itself ie the Emerald Buddha ( though made of jade) was rather underwhelming as it was much too small and placed too high up to be properly visible. The whole place was also packed with tourists as it was the high season (late December) and so we had to jostle and queue to see every sight. \r\nBe mindful of the modest attire required at most Thai sites otherwise you’ll need to get the brightly patterned Thai pyjamas that seem like the standard uniform of most tourists.', '2018-04-21', '100'),
(7, 2, 'Highlights of Thailand\r\nThere are many temples in Thailand and in Bangkok to visit. They are all unique and interesting. The Temple of the Emerald Buddha was interesting and attractive. The grounds around the temple also are worth a visit.', '2018-04-27', '90');

-- --------------------------------------------------------

--
-- Table structure for table `went_to_route`
--

CREATE TABLE `went_to_route` (
  `routeID` int(11) NOT NULL,
  `uID` int(11) NOT NULL,
  `feedback` text NOT NULL,
  `date` date NOT NULL,
  `rating` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `went_to_route`
--

INSERT INTO `went_to_route` (`routeID`, `uID`, `feedback`, `date`, `rating`) VALUES
(1, 1, '', '2018-04-26', ''),
(4, 1, 'hey', '2018-04-18', '80'),
(6, 1, 'Nice', '2018-04-03', '90');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attraction`
--
ALTER TABLE `attraction`
  ADD PRIMARY KEY (`attID`),
  ADD KEY `idx_zone` (`zone`) USING HASH,
  ADD KEY `idx_type` (`type`) USING HASH;

--
-- Indexes for table `attraction_name`
--
ALTER TABLE `attraction_name`
  ADD PRIMARY KEY (`attID`,`name`);

--
-- Indexes for table `contains`
--
ALTER TABLE `contains`
  ADD PRIMARY KEY (`attID`,`routeID`),
  ADD KEY `routeID` (`routeID`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`attID`);

--
-- Indexes for table `favorite`
--
ALTER TABLE `favorite`
  ADD PRIMARY KEY (`uid`,`attID`),
  ADD KEY `attID` (`attID`);

--
-- Indexes for table `route`
--
ALTER TABLE `route`
  ADD PRIMARY KEY (`routeID`),
  ADD KEY `idx_noplace` (`noplace`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uid`);

--
-- Indexes for table `went_to_attraction`
--
ALTER TABLE `went_to_attraction`
  ADD PRIMARY KEY (`uid`,`attID`),
  ADD KEY `attID` (`attID`),
  ADD KEY `idx_rating` (`rating`);

--
-- Indexes for table `went_to_route`
--
ALTER TABLE `went_to_route`
  ADD PRIMARY KEY (`routeID`,`uID`),
  ADD KEY `uID` (`uID`),
  ADD KEY `idx_rating` (`rating`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attraction`
--
ALTER TABLE `attraction`
  MODIFY `attID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `attID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `route`
--
ALTER TABLE `route`
  MODIFY `routeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attraction_name`
--
ALTER TABLE `attraction_name`
  ADD CONSTRAINT `attraction_name_ibfk_1` FOREIGN KEY (`attID`) REFERENCES `attraction` (`attID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `favorite`
--
ALTER TABLE `favorite`
  ADD CONSTRAINT `favorite_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `favorite_ibfk_2` FOREIGN KEY (`attID`) REFERENCES `attraction` (`attID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `went_to_attraction`
--
ALTER TABLE `went_to_attraction`
  ADD CONSTRAINT `went_to_attraction_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `went_to_attraction_ibfk_2` FOREIGN KEY (`attID`) REFERENCES `attraction` (`attID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `went_to_route`
--
ALTER TABLE `went_to_route`
  ADD CONSTRAINT `went_to_route_ibfk_1` FOREIGN KEY (`routeID`) REFERENCES `route` (`routeID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `went_to_route_ibfk_2` FOREIGN KEY (`uID`) REFERENCES `users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
