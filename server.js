/* ---------------------------Import Packages--------------------------- */
const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer');
const { createPool } = require('mysql');
require('dotenv').config();
const mysql = require('mysql2')
const bodyParser = require('body-parser');
const multer = require('multer');
const jwt = require('jsonwebtoken')
const path = require('path');
// const fs = require('fs');
const cookieParser = require("cookie-parser");
const bcrypt = require('bcrypt')

const CountryObj = {
    "Afghanistan": [
        "Badakhshan", "Badghis", "Balkh", "Bamyan", "Daykundi", "Farah",
        "Faryab", "Ghazni", "Ghor", "Helmand", "Herat", "Jowzjan", "Kabul",
        "Kandahar", "Kunar", "Kunduz", "Laghman", "Logar", "Nangarhar",
        "Nimruz", "Nuristan", "Paktia", "Paktika", "Panjshir", "Parwan",
        "Samangan", "Sari Pul", "Takhar", "Urozgan", "Wardak", "Zabul"
    ],
    "Albania": [
        "Berat", "Dibër", "Durres", "Elbasan", "Fier", "Gjirokastër", "Shkodër",
        "Korçë", "Kukës", "Vlorë"
    ],
    "Algeria": [
        "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa",
        "Biskra", "Blida", "Bouira", "Tamanrasset", "Tébessa", "Tlemcen",
        "Tiaret", "Tizi Ouzou", "Algiers", "Djelfa", "Jijel", "Sétif", "Saïda",
        "Skikda", "Sidi Bel Abbès", "Annaba", "Guelma", "Constantine", "Médéa",
        "Mostaganem", "M'Sila", "Mascara", "Ouargla", "Oran", "El Bayadh",
        "El Tarf", "Tindouf", "Tissemsilt", "El Oued", "Khenchela", "Souk Ahras",
        "Tipaza", "Mila", "Aïn Defla", "Naama", "Aïn Témouchent", "Ghardaïa",
        "Relizane"
    ],
    "Andorra": [
        "Andorra la Vella", "Escaldes-Engordany", "Encamp", "Sant Julià de Lòria",
        "Ordino", "La Massana"
    ],
    "Angola": [
        "Bengo", "Benguela", "Bié", "Cabinda", "Cunene", "Huambo", "Huila", "Kwanza Norte",
        "Kwanza Sul", "Luanda", "Lunda Norte", "Lunda Sul", "Malanje", "Moxico",
        "Namibe", "Uíge", "Zaire"
    ],
    "Antigua and Barbuda": [
        "Saint George", "Saint John", "Saint Mary", "Saint Paul", "Saint Peter",
        "Saint Philip", "Barbuda"
    ],
    "Argentina": [
        "Buenos Aires", "Catamarca", "Chaco", "Chubut", "Córdoba", "Corrientes",
        "Entre Ríos", "Formosa", "Jujuy", "La Pampa", "La Rioja", "Mendoza",
        "Misiones", "Neuquén", "Río Negro", "Salta", "San Juan", "San Luis",
        "Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del Fuego",
        "Tucumán"
    ],
    "Armenia": [
        "Ararat", "Armavir", "Gegharkunik", "Kotayk", "Lori", "Shirak", "Syunik",
        "Tavush", "Vayots Dzor", "Yerevan"
    ],
    "Australia": [
        "Australian Capital Territory", "New South Wales", "Northern Territory",
        "Queensland", "South Australia", "Tasmania", "Victoria", "Western Australia"
    ],
    "Austria": [
        "Burgenland", "Carinthia", "Lower Austria", "Upper Austria", "Salzburg",
        "Styria", "Tyrol", "Vorarlberg", "Vienna"
    ],
    "Azerbaijan": [
        "Abşeron", "Agdam", "Agdash", "Aghjabadi", "Agstafa", "Azerbaijan Shahri",
        "Balakan", "Barda", "Beylagan", "Bilesuvar", "Barda", "Fizuli",
        "Ganja", "Goranboy", "Goychay", "Hajigabul", "Imishli", "Ismayilli",
        "Jabrayil", "Jalilabad", "Kalbajar", "Kurdamir", "Lankaran", "Lerik",
        "Mingachevir", "Murovdag", "Naftalan", "Nakhchivan", "Neftchala",
        "Oghuz", "Qabala", "Qakh", "Qazakh", "Quba", "Qubadli", "Qusar",
        "Saatli", "Sabirabad", "Salyan", "Shaki", "Shamkir", "Sheki", "Shemakha",
        "Shirvan", "Siazan", "Sumgayit", "Tartar", "Tovuz", "Yardimli", "Yevlakh"
    ],
    "Bahamas": [
        "Acklins and Crooked Islands", "Berry Islands", "Bimini", "Cat Island",
        "Exuma", "Grand Bahama", "Inagua", "Long Island", "Mayaguana", "New Providence",
        "Ragged Island", "Rum Cay", "San Salvador"
    ],
    "Bahrain": [
        "Capital", "Northern", "Southern", "Muharraq"
    ],
    "Bangladesh": [
        "Barisal", "Chittagong", "Dhaka", "Khulna", "Rajshahi", "Rangpur", "Sylhet"
    ],
    "Barbados": [
        "Christ Church", "Saint Andrew", "Saint George", "Saint James", "Saint John",
        "Saint Joseph", "Saint Lucy", "Saint Michael", "Saint Peter", "Saint Philip",
        "Saint Thomas"
    ],
    "Belarus": [
        "Brest", "Gomel", "Grodno", "Minsk", "Mogilev", "Vitebsk"
    ],
    "Belgium": [
        "Antwerp", "East Flanders", "Flemish Brabant", "Hainaut", "Liege", "Limburg",
        "Luxembourg", "Namur", "West Flanders", "Walloon Brabant", "Brussels"
    ],
    "Belize": [
        "Belize", "Cayo", "Corozal", "Orange Walk", "Stann Creek", "Toledo"
    ],
    "Benin": [
        "Alibori", "Atakora", "Atlantique", "Borgou", "Collines", "Donga", "Kouffo",
        "Littoral", "Mono", "Ouémé", "Plateau", "Zou"
    ],
    "Bhutan": [
        "Bumthang", "Chhukha", "Dagana", "Gasa", "Ha", "Lhuentse", "Mongar", "Paro",
        "Pema Gatshel", "Punakha", "Samdrup Jongkhar", "Sarpang", "Thimphu", "Trashigang",
        "Trashiyangtse", "Wangdue Phodrang", "Zhemgang"
    ],
    "Bolivia": [
        "Beni", "Chuquisaca", "Cochabamba", "La Paz", "Oruro", "Pando", "Potosí",
        "Santa Cruz", "Tarija"
    ],
    "Bosnia and Herzegovina": [
        "Federation of Bosnia and Herzegovina", "Republika Srpska", "Brčko District"
    ],
    "Botswana": [
        "Central", "Ghanzi", "Kgalagadi", "Kgatleng", "Kweneng", "North-East", "North-West",
        "South-East", "Southern"
    ],
    "Brazil": [
        "Acre", "Alagoas", "Amazonas", "Bahia", "Ceará", "Espírito Santo", "Goiás",
        "Maranhão", "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará", "Paraíba",
        "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro", "Rio Grande do Norte", "Rio Grande do Sul",
        "Rondônia", "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"
    ],
    "Brunei": [
        "Brunei-Muara", "Belait", "Temburong", "Tutong"
    ],
    "Bulgaria": [
        "Blagoevgrad", "Burgas", "Dobrich", "Gabrovo", "Haskovo", "Kardzhali", "Kyustendil",
        "Lovech", "Montana", "Pazardzhik", "Pernik", "Pleven", "Plovdiv", "Razgrad",
        "Ruse", "Shumen", "Silistra", "Sliven", "Sofia", "Sofia City", "Stara Zagora",
        "Targovishte", "Varna", "Veliko Tarnovo", "Vidin", "Vratza"
    ],
    "Burkina Faso": [
        "Boucle du Mouhoun", "Cascades", "Centre", "Centre-East", "Centre-North", "Centre-West",
        "Centre-West", "Est", "Hauts-Bassins", "Nord", "Sahel", "Sud-Ouest", "Centre-South"
    ],
    "Burundi": [
        "Bubanza", "Bujumbura Mairie", "Bururi", "Cankuzo", "Cibitoke", "Gitega", "Karuzi",
        "Kayanza", "Kirundo", "Makamba", "Muramvya", "Muyinga", "Mwaro", "Ngozi",
        "Ruyigi"
    ],
    "Cabo Verde": [
        "Boa Vista", "Brava", "Fogo", "Maio", "Santiago", "São Nicolau", "São Vicente"
    ],
    "Cambodia": [
        "Banteay Meanchey", "Battambang", "Kampong Cham", "Kampong Chhnang", "Kampong Speu",
        "Kampong Thom", "Kandal", "Koh Kong", "Kratie", "Mondulkiri", "Phnom Penh", "Preah Vihear",
        "Prey Veng", "Pursat", "Ratanakiri", "Siem Reap", "Sihanoukville", "Stung Treng",
        "Svay Rieng", "Takeo", "Tboung Khmum"
    ],
    "Cameroon": [
        "Adamawa", "Centre", "East", "Far North", "Littoral", "North", "Northwest", "South",
        "Southwest", "West"
    ],
    "Canada": [
        "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador",
        "Nova Scotia", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan"
    ],
    "Central African Republic": [
        "Bamingui-Bangoran", "Bangui", "Basse-Kotto", "Haut-Mbomou", "Haut-Kotto", "Kémo", "Mambere-Kadeï",
        "Mbomou", "Nana-Mambéré", "Ombella-Mpoko", "Ouaka", "Ouham", "Ouham-Pendé", "Vakaga"
    ],
    "Chad": [
        "Batha", "Borkou", "Chari-Baguirmi", "Ennedi", "Guéra", "Hadjer-Lamis", "Kanem", "Lac",
        "Logone Occidental", "Logone Oriental", "Mandoul", "Mayo-Kebbi Est", "Mayo-Kebbi Ouest",
        "Moyen-Chari", "N'Djamena", "Tandjilé", "Tchad"
    ],
    "Chile": [
        "Arica y Parinacota", "Antofagasta", "Atacama", "Aysén", "Biobío", "Coquimbo", "Los Lagos",
        "Los Ríos", "Magallanes", "Maule", "Ñuble", "Santiago Metropolitan", "Valparaíso"
    ],
    "China": [
        "Anhui", "Beijing", "Chongqing", "Fujian", "Gansu", "Guangdong", "Guangxi", "Guizhou",
        "Hainan", "Hebei", "Heilongjiang", "Henan", "Hubei", "Hunan", "Jiangsu", "Jiangxi", "Jilin",
        "Liaoning", "Ningxia", "Qinghai", "Shaanxi", "Shandong", "Shanghai", "Shanxi", "Sichuan",
        "Tianjin", "Tibet", "Xinjiang", "Yunnan", "Zhejiang"
    ],
    "Colombia": [
        "Amazonas", "Antioquia", "Arauca", "Atlántico", "Bolívar", "Boyacá", "Caldas", "Caquetá",
        "Casanare", "Cauca", "Cesar", "Chocó", "Córdoba", "Cundinamarca", "Guainía", "Guaviare",
        "Huila", "La Guajira", "Magdalena", "Meta", "Nariño", "Norte de Santander", "Putumayo", "Quindío",
        "Risaralda", "San Andrés and Providencia", "Santander", "Sucre", "Tolima", "Valle del Cauca",
        "Vaupés", "Vichada"
    ],
    "Comoros": [
        "Atsamaka", "Moheli", "Njazidja", "Ndzuwani"
    ],
    "Costa Rica": [
        "Alajuela", "Cartago", "Guanacaste", "Heredia", "Limón", "Puntarenas", "San José"
    ],
    "Croatia": [
        "Bjelovar-Bilogora", "Brođ-Posavina", "Dubrovnik-Neretva", "Istria", "Karlovac", "Koprivnica-Križevci",
        "Krapina-Zagorje", "Lika-Senj", "Međimurje", "Osijek-Baranja", "Požega-Slavonia", "Primorje-Gorski Kotar",
        "Sisak-Moslavina", "Split-Dalmatia", "Šibenik-Knin", "Varaždin", "Virovitica-Podravina", "Vukovar-Srijem",
        "Zadar", "Zagreb"
    ],
    "Cuba": [
        "Artemisa", "Camagüey", "Ciego de Ávila", "Cienfuegos", "Granma", "Guantánamo", "Holguín", "La Habana",
        "Las Tunas", "Matanzas", "Pinar del Río", "Santiago de Cuba", "Villa Clara"
    ],
    "Cyprus": [
        "Famagusta", "Kyrenia", "Larnaca", "Limassol", "Nicosia", "Paphos"
    ],
    "Czech Republic": [
        "Prague", "South Bohemia", "South Moravia", "Karlovy Vary", "Hradec Králové", "Liberec", "Moravia-Silesia",
        "Olomouc", "Pardubice", "Plzeň", "Central Bohemia", "Zlín"
    ],
    "DR Congo": [
        "Bas-Uele", "Haut-Uele", "Ituri", "Kasaï", "Kasaï-Central", "Kasaï-Oriental", "Kinshasa",
        "Kwango", "Kwilu", "Mai-Ndombe", "Maniema", "Masimanimba", "Mongala", "Nord-Kivu", "Nord-Ubangi",
        "Orientale", "Sankuru", "South Kivu", "Sud-Ubangi", "Tanganyika", "West Kasai", "West Kasai"
    ],
    "Denmark": [
        "Capital Region", "Central Jutland", "North Jutland", "Region Zealand", "Southern Denmark"
    ],
    "Djibouti": [
        "Ali Sabieh", "Arta", "Dikhil", "Djibouti", "Obock", "Tadjourah"
    ],
    "Dominica": [
        "Saint Andrew", "Saint David", "Saint George", "Saint John", "Saint Joseph", "Saint Luke",
        "Saint Mark", "Saint Patrick"
    ],
    "Dominican Republic": [
        "Azua", "Baoruco", "Barahona", "Dajabón", "Distrito Nacional", "Duarte", "El Seibo", "Espaillat",
        "Hato Mayor", "Independencia", "La Altagracia", "La Romana", "La Vega", "María Trinidad Sánchez",
        "Monseñor Nouel", "Monte Cristi", "Monte Plata", "Pedernales", "Peravia", "Puerto Plata",
        "Samana", "San Cristóbal", "San Juan", "San Pedro de Macorís", "Santiago", "Santiago Rodríguez",
        "Valverde"
    ],
    "East Timor (Timor-Leste)": [
        "Aileu", "Ainaro", "Baucau", "Bobonaro", "Covalima", "Dili", "Ermera", "Lautém", "Liquiça", "Manatuto",
        "Manufahi", "Oecusse"
    ],
    "Ecuador": [
        "Azuay", "Bolívar", "Cañar", "Carchi", "Chimborazo", "Coto", "El Oro", "Esmeraldas", "Galápagos",
        "Guayas", "Imbabura", "Loja", "Los Ríos", "Manabí", "Morona Santiago", "Napo", "Orellana", "Pichincha",
        "Santo Domingo de los Tsáchilas", "Sucumbíos", "Tungurahua", "Zamora-Chinchipe"
    ],
    "Egypt": [
        "Alexandria", "Aswan", "Asyut", "Beheira", "Beni Suef", "Cairo", "Dakahlia", "Damietta", "Faiyum",
        "Gharbia", "Giza", "Ismailia", "Kafr El Sheikh", "Luxor", "Matrouh", "Minya", "Monufia", "New Valley",
        "North Sinai", "Port Said", "Qalyubia", "Qena", "Red Sea", "Sharqia", "Sohag", "South Sinai", "Suez"
    ],
    "El Salvador": [
        "Ahuachapán", "Cabañas", "Chalatenango", "Cuscatlán", "La Libertad", "La Paz", "La Unión", "Morazán",
        "San Miguel", "San Salvador", "San Vicente", "Santa Ana", "Sonsonate", "Usulután"
    ],
    "Equatorial Guinea": [
        "Annobón", "Bioko Norte", "Bioko Sur", "Centro Sur", "Kie-Ntem", "Litoral", "Wele-Nzas"
    ],
    "Eritrea": [
        "Anseba", "Central", "Debub", "Gash-Barka", "Maekel", "Semien Keih Bahri"
    ],
    "Estonia": [
        "Harju", "Hiiu", "Ida-Viru", "Jõgeva", "Järva", "Lääne", "Lääne-Viru", "Põlva", "Pärnu", "Rapla",
        "Saare", "Tartu", "Valga", "Viljandi", "Võru"
    ],
    "Eswatini": [
        "Hhohho", "Lubombo", "Manzini", "Shiselweni"
    ],
    "Ethiopia": [
        "Addis Ababa", "Afar", "Amhara", "Benishangul-Gumuz", "Dire Dawa", "Gambela", "Harari", "Oromia",
        "Sidama", "Somali", "Southern Nations, Nationalities, and Peoples' Region", "Tigray"
    ],
    "Fiji": [
        "Central", "Eastern", "Northern", "Western"
    ],
    "Finland": [
        "Åland Islands", "Central Finland", "Kymenlaakso", "Lapland", "North Karelia", "North Ostrobothnia",
        "North Savo", "Ostrobothnia", "Pirkanmaa", "Pohjois-Karjala", "South Karelia", "South Ostrobothnia",
        "South Savo", "Uusimaa", "Varsinais-Suomi"
    ],
    "France": [
        "Alsace", "Aquitaine", "Auvergne", "Basse-Normandie", "Bourgogne", "Bretagne", "Centre-Val de Loire",
        "Champagne-Ardenne", "Corse", "Franche-Comté", "Île-de-France", "Languedoc-Roussillon", "Limousin",
        "Lorraine", "Midi-Pyrénées", "Nord-Pas-de-Calais", "Pays de la Loire", "Picardie", "Poitou-Charentes",
        "Provence-Alpes-Côte d'Azur", "Rhône-Alpes"
    ],
    "Gabon": [
        "Estuaire", "Haut-Ogooué", "Moyen-Ogooué", "Ngounié", "Nyanga", "Ogooué-Ivindo",
        "Ogooué-Lolo", "Woleu-Ntem"
    ],
    "Gambia": [
        "Banjul", "Central River", "Lower River", "MacCarthy Island", "North Bank", "Upper River", "Western"
    ],
    "Georgia": [
        "Ajara", "Guria", "Imereti", "Kakheti", "Kvemo Kartli", "Mtskheta-Mtianeti", "Racha-Lechkhumi and Kvemo Svaneti",
        "Samegrelo-Zemo Svaneti", "Samtskhe-Javakheti", "Shida Kartli", "Tbilisi", "Zugdidi"
    ],
    "Germany": [
        "Baden-Württemberg", "Bavaria", "Berlin", "Brandenburg", "Bremen", "Hamburg", "Hesse", "Lower Saxony",
        "Mecklenburg-Vorpommern", "North Rhine-Westphalia", "Rhineland-Palatinate", "Saarland", "Saxony",
        "Saxony-Anhalt", "Schleswig-Holstein", "Thuringia"
    ],
    "Ghana": [
        "Ashanti", "Brong-Ahafo", "Central", "Eastern", "Greater Accra", "Northern", "Western", "Volta", "Upper East",
        "Upper West"
    ],
    "Greece": [
        "Attica", "Central Greece", "Central Macedonia", "Crete", "Eastern Macedonia and Thrace", "Epirus",
        "Ionian Islands", "North Aegean", "Peloponnese", "South Aegean", "Thessaly", "Western Greece", "Western Macedonia"
    ],
    "Grenada": [
        "Saint Andrew", "Saint David", "Saint George", "Saint John", "Saint Mark", "Saint Patrick"
    ],
    "Guatemala": [
        "Alta Verapaz", "Baja Verapaz", "Chimaltenango", "Chiquimula", "Escuintla", "Guatemala", "Huehuetenango",
        "Izabal", "Jalapa", "Jutiapa", "Petén", "Quetzaltenango", "Quiché", "Retalhuleu", "Sacatepéquez",
        "San Marcos", "Santa Rosa", "Sololá", "Suchitepéquez", "Totonicapán", "Zacapa"
    ],
    "Guinea": [
        "Boké", "Conakry", "Faranah", "Kankan", "Kindia", "Labé", "Mamou", "Nzérékoré"
    ],
    "Guinea-Bissau": [
        "Bafata", "Biombo", "Bolama", "Cacheu", "Gabu", "Oio", "Quinara", "Tombali"
    ],
    "Guyana": [
        "Barima-Waini", "Cuyuni-Mazaruni", "Demerara-Mahaica", "East Berbice-Corentyne", "Essequibo Islands-West Demerara",
        "Mahaica-Berbice", "Pomeroon-Supenaam", "Potaro-Siparuni", "Upper Demerara-Berbice", "Upper Takutu-Upper Essequibo"
    ],
    "Haiti": [
        "Artibonite", "Centre", "Grand'Anse", "Nippes", "Nord", "Nord-Est", "Nord-Ouest", "Ouest", "Sud", "Sud-Est"
    ],
    "Honduras": [
        "Atlántida", "Choluteca", "Colón", "Comayagua", "Copán", "Cortés", "El Paraíso", "Francisco Morazán", "Intibucá",
        "Islas de la Bahía", "La Paz", "Lempira", "Ocotepeque", "Olancho", "Santa Bárbara", "Yoro"
    ],
    "Hungary": [
        "Bács-Kiskun", "Baranya", "Békés", "Borsod-Abaúj-Zemplén", "Budapest", "Csongrád", "Fejér", "Győr-Moson-Sopron",
        "Hajdú-Bihar", "Heves", "Jász-Nagykun-Szolnok", "Komárom-Esztergom", "Nógrád", "Pest", "Somogy",
        "Szabolcs-Szatmár-Bereg",
        "Tolna", "Vas", "Veszprém", "Zala"
    ],
    "Iceland": [
        "Arnessýsla", "Austur-Skaftafellssýsla", "Borgarfjarðarsýsla", "Dalasýsla", "Eyjafjarðarsýsla", "Hafnarfjordur",
        "Húnavatnssýsla", "Kjósarsýsla", "Kópavogur", "Reykjavík", "Skaftafellssýsla", "Snæfellsnes", "Súðurland"
    ],
    "India": [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
        "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
        "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
        "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
        "Uttar Pradesh", "Uttarakhand", "West Bengal"
    ],
    "Indonesia": [
        "Aceh", "Bali", "Banten", "Bengkulu", "Central Java", "Central Kalimantan", "Central Sulawesi",
        "East Java", "East Kalimantan", "East Nusa Tenggara", "Gorontalo", "Jakarta", "Jambi", "Lampung",
        "Maluku", "North Kalimantan", "North Maluku", "North Sulawesi", "North Sumatra", "Papua",
        "Riau", "Riau Islands", "South Kalimantan", "South Sulawesi", "South Sumatra", "Southeast Sulawesi",
        "West Java", "West Kalimantan", "West Nusa Tenggara", "West Papua", "West Sulawesi", "West Sumatra",
        "Yogyakarta"
    ],
    "Iran": [
        "Alborz", "Ardabil", "Bushehr", "Chaharmahal and Bakhtiari", "East Azerbaijan", "Esfahan", "Fars",
        "Gilan", "Golestan", "Hamadan", "Hormozgan", "Ilam", "Kerman", "Kermanshah", "Khuzestan", "Kohgiluyeh and Boyer-Ahmad",
        "Kurdistan", "Lorestan", "Markazi", "Mazandaran", "North Khorasan", "Qazvin", "Qom", "Razavi Khorasan",
        "Semnan", "Sistan and Baluchestan", "South Khorasan", "Tehran", "West Azerbaijan", "Yazd", "Zanjan"
    ],
    "Iraq": [
        "Al Anbar", "Al Qadisiyyah", "Al Sulaymaniyah", "Babil", "Baghdad", "Basra", "Dahuk", "Dhi Qar",
        "Diyala", "Karbala", "Kirkuk", "Muthanna", "Najaf", "Ninawa", "Qadissiya", "Salah ad Din",
        "Wasit"
    ],
    "Ireland": [
        "Carlow", "Cavan", "Clare", "Cork", "Derry", "Donegal", "Down", "Dublin", "Galway", "Kerry",
        "Kildare", "Kilkenny", "Laois", "Leitrim", "Limerick", "Longford", "Louth", "Mayo", "Meath", "Monaghan",
        "Offaly", "Roscommon", "Sligo", "Tipperary", "Waterford", "Westmeath", "Wexford", "Wicklow"
    ],
    "Israel": [
        "Central District", "Haifa", "Jerusalem District", "Northern District", "Southern District",
        "Tel Aviv District"
    ],
    "Italy": [
        "Abruzzo", "Basilicata", "Calabria", "Campania", "Emilia-Romagna", "Friuli Venezia Giulia", "Lazio",
        "Liguria", "Lombardy", "Marche", "Molise", "Piedmont", "Puglia", "Sardinia", "Sicily", "Tuscany",
        "Trentino-Alto Adige/Südtirol", "Umbria", "Valle d'Aosta", "Veneto"
    ],
    "Ivory Coast (Côte d'Ivoire)": [
        "Abidjan", "Bas-Sassandra", "Comoé", "Denguele", "Fromager", "Lacs", "Lagunes", "Marahoué", "Moyen-Cavally",
        "Moyen-Comoé", "Sassandra-Marahoué", "San-Pédro", "Vallee du Bandama", "Worodougou", "Zanzan"
    ],
    "Jamaica": [
        "Clarendon", "Hanover", "Kingston", "Manchester", "Portland", "St Andrew", "St Ann", "St Catherine",
        "St Elizabeth", "St James", "St Mary", "St Monica", "St Thomas", "Trelawny", "Westmoreland"
    ],
    "Japan": [
        "Aichi", "Akita", "Aomori", "Chiba", "Ehime", "Fukuoka", "Fukui", "Fukuoka", "Gifu", "Gunma",
        "Hiroshima", "Hokkaido", "Hyogo", "Ibaraki", "Ishikawa", "Iwakuni", "Ibaraki", "Kagawa", "Kagoshima",
        "Kanagawa", "Kochi", "Kumamoto", "Kyoto", "Mie", "Miyagi", "Miyazaki", "Nagano", "Nagasaki",
        "Nara", "Niigata", "Okinawa", "Osaka", "Saga", "Saitama", "Shiga", "Shimane", "Shizuoka", "Tochigi",
        "Tokyo", "Tottori", "Toyama", "Wakayama", "Yamagata", "Yamaguchi", "Yokohama"
    ],
    "Jordan": [
        "Ajloun", "Amman", "Irbid", "Jerash", "Karak", "Mafraq", "Ma'an", "Tafileh", "Zarqa"
    ],
    "Kazakhstan": [
        "Akmola", "Aktobe", "Almaty", "Atyrau", "East Kazakhstan", "Jambyl", "Karaganda", "Kostanay", "Kyzylorda",
        "Mangystau", "North Kazakhstan", "Pavlodar", "South Kazakhstan", "West Kazakhstan", "Zhambyl"
    ],
    "Kenya": [
        "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo-Marakwet", "Embu", "Garissa", "Homa Bay", "Isiolo",
        "Kajiado", "Kakamega", "Kericho", "Kiambu", "Kilifi", "Kirinyaga", "Kisii", "Kisumu", "Kitui",
        "Kwale", "Laikipia", "Lamu", "Machakos", "Makueni", "Mandera", "Marsabit", "Meru", "Migori", "Mombasa",
        "Murang'a", "Nairobi", "Nakuru", "Nandi", "Narok", "Nyamira", "Nyandarua", "Vihiga", "Wajir", "West Pokot"
    ],
    "Kiribati": [
        "Gilbert Islands", "Line Islands", "Phoenix Islands"
    ],
    "Korea (North)": [
        "Chagang", "Hamgyong", "Hwanghae", "Kaesong", "Kangwon", "Koryo", "Pyongan", "Ryanggang"
    ],
    "Korea (South)": [
        "Chungcheongbuk", "Chungcheongnam", "Gyeonggi", "Gyeongsangbuk", "Gyeongsangnam", "Jeju", "Jeollabuk",
        "Jeollanam", "Sejong", "Seoul", "Incheon", "Busan", "Daegu", "Daejeon", "Ulsan"
    ],
    "Kuwait": [
        "Al Ahmadi", "Al Farwaniyah", "Al Jahra", "Al Kuwait", "Al Mubarakia", "Hawalli", "Mubarak al-Kabeer"
    ],
    "Kyrgyzstan": [
        "Batken", "Chui", "Jalal-Abad", "Naryn", "Osh", "Talas", "Ysyk-Köl"
    ],
    "Laos": [
        "Attapeu", "Bokeo", "Bolikhamsai", "Champasak", "Houaphanh", "Khammouane", "Luang Namtha", "Luang Prabang",
        "Oudomxay", "Phongsaly", "Savannakhet", "Saravane", "Vientiane", "Vientiane Province", "Xaignabouli", "Xekong"
    ],
    "Latvia": [
        "Aizkraukle", "Aluksne", "Balvi", "Bauska", "Cesis", "Daugavpils", "Dobele", "Jelgava", "Jurmala",
        "Kandava", "Liepaja", "Limbazi", "Ludza", "Madona", "Jurmala", "Ogre", "Riga", "Jurmala", "Rēzekne"
    ],
    "Lebanon": [
        "Beirut", "Bekaa", "Mount Lebanon", "Nabatieh", "North Lebanon", "South Lebanon"
    ],
    "Lesotho": [
        "Berea", "Butha-Buthe", "Leribe", "Mafeteng", "Mokhotlong", "Qacha's Nek", "Quthing", "Thaba-Tseka"
    ],
    "Liberia": [
        "Bomi", "Bong", "Grand Bassa", "Grand Cape Mount", "Grand Gedeh", "Grand Kru", "Lofa", "Margibi", "Maryland",
        "Montserrado", "Nimba", "River Cess", "River Gee", "Sinoe"
    ],
    "Libya": [
        "Al Butnan", "Al Jabal al Akhdar", "Al Jufrah", "Al Khums", "Al Marj", "Al Wahat", "Azzawiya",
        "Banghazi", "Darnah", "Ghat", "Misrata", "Murzuq", "Nalut", "Sabha", "Sirte", "Tarhunah", "Tripoli",
        "Wadi al-Shati", "Zliten"
    ],
    "Liechtenstein": [
        "Balzers", "Eschen", "Gamprin", "Mauren", "Schellenberg", "Shengwald", "Vaduz", "Balzers", "Schaan"
    ],
    "Lithuania": [
        "Alytus", "Kaunas", "Klaipeda", "Marijampole", "Panevezys", "Siauliai", "Taurage", "Telsiai",
        "Vilnius", "Utena"
    ],
    "Luxembourg": [
        "Clervaux", "Diekirch", "Ettelbruck", "Grevenmacher", "Luxembourg", "Mersch", "Redange", "Remich",
        "Ettelbruck", "Differdange"
    ],
    "Madagascar": [
        "Antananarivo", "Antsiranana", "Fianarantsoa", "Mahajanga", "Toamasina", "Toliara"
    ],
    "Malawi": [
        "Balaka", "Blantyre", "Chikwawa", "Chiradzulu", "Dedza", "Dowa", "Karonga", "Kasungu", "Lilongwe",
        "Machinga", "Mangochi", "Mulanje", "Mwanza", "Mzimba", "Nkhata Bay", "Nkhotakota", "Phalombe",
        "Rumphi", "Salima", "Thyolo", "Zomba"
    ],
    "Malaysia": [
        "Johor", "Kedah", "Kelantan", "Melaka", "Negeri Sembilan", "Pahang", "Perak", "Perlis", "Penang",
        "Sarawak", "Selangor", "Terengganu", "Kuala Lumpur", "Putrajaya", "Labuan"
    ],
    "Maldives": [
        "Addu City", "Ari Atoll", "Baa Atoll", "Dhaalu Atoll", "Faafu Atoll", "Gaafu Alif Atoll", "Gaafu Dhaal Atoll",
        "Gnaviyani Atoll", "Haa Alif Atoll", "Haa Dhaalu Atoll", "Kaafu Atoll", "Laamu Atoll", "Lhaviyani Atoll",
        "Maddu Atoll", "Meemu Atoll", "Noonu Atoll", "Raa Atoll", "Shaviyani Atoll", "Thaa Atoll", "Vaavu Atoll"
    ],
    "Mali": [
        "Bamako", "Gao", "Kidal", "Koulikoro", "Mopti", "Segou", "Sikasso", "Tombouctou", "Taoudénit",
        "Kidal", "Menaka"
    ],
    "Malta": [
        "Gozo", "Malta"
    ],
    "Marshall Islands": [
        "Ailinglaplap Atoll", "Ailuk Atoll", "Arno Atoll", "Bikar Atoll", "Ebon Atoll", "Eniwetok Atoll",
        "Jabat Atoll", "Jaluit Atoll", "Kili Island", "Kwajalein Atoll", "Lae Atoll", "Lib Island", "Majuro Atoll",
        "Maloelap Atoll", "Mejit Atoll", "Namu Atoll", "Ralik Chain", "Rongelap Atoll", "Ujae Atoll",
        "Wotje Atoll"
    ],
    "Mauritania": [
        "Adrar", "Assaba", "Brakna", "Gorgol", "Guidimaka", "Hodh Ech Chargui", "Hodh El Gharbi", "Inchiri",
        "Nouakchott", "Tagant", "Tiris Zemmour", "Trarza"
    ],
    "Mauritius": [
        "Black River", "Flacq", "Grand Port", "Moka", "Pamplemousses", "Plaines Wilhems", "Port Louis",
        "Rivière du Rempart", "Savanne"
    ],
    "Mexico": [
        "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas", "Chihuahua",
        "Coahuila", "Colima", "Durango", "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "Mexico City",
        "Mexico State", "Michoacán", "Morelos", "Nayarit", "Nuevo Leon", "Oaxaca", "Puebla", "Querétaro",
        "Quintana Roo", "San Luis Potosi", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz",
        "Yucatan", "Zacatecas"
    ],
    "Micronesia": [
        "Chuuk", "Kosrae", "Pohnpei", "Yap"
    ],
    "Moldova": [
        "Bălți", "Bender", "Chișinău", "Cahul", "Căușeni", "Cimișlia", "Drochia", "Dubăsari", "Edineț", "Fălești",
        "Florești", "Găgăuzia", "Glodeni", "Hâncești", "Ialoveni", "Leova", "Nisporeni", "Ocnita", "Orhei",
        "Rezina", "Rîșcani", "Sîngerei", "Soroca", "Strășeni", "Șoldănești", "Taraclia", "Telenești", "Ungheni"
    ],
    "Monaco": [
        "La Condamine", "Fontvieille", "Moneghetti", "Monte Carlo", "Les Moulins", "Port Hercule"
    ],
    "Mongolia": [
        "Arhangai", "Bayankhongor", "Bulgan", "Burenkhaan", "Darkhan-Uul", "Dornogovi", "Dundgovi", "Dzavhan",
        "Govisumber", "Hovd", "Hovsgol", "Orkhon", "Ovorhangai", "Selenge", "Tuv", "Ulaanbaatar", "Uvs"
    ],
    "Montenegro": [
        "Andrijevica", "Berane", "Bijelo Polje", "Budva", "Danilovgrad", "Herceg Novi", "Kolasin", "Kotor",
        "Niksic", "Plav", "Pljevlja", "Plevlja", "Podgorica", "Rozaje", "Shavnik", "Tivat", "Ulcinj"
    ],
    "Morocco": [
        "Agadir-Ida-Outanane", "Al Haouz", "Azilal", "Beni Mellal", "Boujdour", "Casablanca", "Chaouia-Ouardigha",
        "El Jadida", "Fes-Meknes", "Guelmim", "Ifrane", "Kenitra", "Laayoune", "Marrakech-Tensift-Al Haouz",
        "Meknes-Tafilalet", "Nador", "Oujda-Angad", "Rabat-Sale-Zemmour-Zaer", "Safi", "Settat", "Tangier-Tetouan",
        "Taza-Al Hoceima-Taounate", "Tiznit"
    ],
    "Mozambique": [
        "Cabo Delgado", "Gaza", "Inhambane", "Manica", "Maputo", "Maputo City", "Nampula", "Niassa", "Sofala",
        "Tete", "Zambezia"
    ],
    "Myanmar (Burma)": [
        "Ayeyarwady", "Bago", "Chin", "Kachin", "Kayah", "Kayin", "Magway", "Mandalay", "Mon", "Rakhine",
        "Sagaing", "Shan", "Tanintharyi", "Yangon"
    ],
    "Namibia": [
        "Erongo", "Hardap", "Karas", "Kavango East", "Kavango West", "Khomas", "Kunene", "Ohangwena", "Omusati",
        "Oshana", "Oshikoto", "Otjozondjupa"
    ],
    "Nauru": [
        "Aiwo", "Anabar", "Anetan", "Baiti", "Boe", "Buada", "Denigomodu", "Ewa", "Ijuw", "Meneng", "Nauru"
    ],
    "Nepal": [
        "Bagmati", "Gandaki", "Karnali", "Lumbini", "Mahakali", "Mechi", "Narayani", "Rapti", "Sagarmatha", "Seti"
    ],
    "Netherlands": [
        "Drenthe", "Flevoland", "Friesland", "Gelderland", "Groningen", "Limburg", "North Brabant", "North Holland",
        "Overijssel", "South Holland", "Utrecht", "Zeeland"
    ],
    "New Zealand": [
        "Auckland", "Bay of Plenty", "Canterbury", "Gisborne", "Hawke's Bay", "Manawatu-Wanganui", "Marlborough",
        "Nelson", "Northland", "Otago", "Southland", "Taranaki", "Waikato", "Wellington", "West Coast"
    ],
    "Nicaragua": [
        "Boaco", "Carazo", "Chinandega", "Chontales", "Estelí", "Granada", "Jinotega", "León", "Madriz",
        "Managua", "Masaya", "Matagalpa", "Nueva Segovia", "Rivas"
    ],
    "Niger": [
        "Agadez", "Diffa", "Dosso", "Maradi", "Tahoua", "Tillabéri", "Zinder"
    ],
    "Nigeria": [
        "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River",
        "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
        "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau",
        "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
    ],
    "North Macedonia": [
        "Barloveni", "Berovo", "Bitola", "Demir Hisar", "Delčevo", "Dojran", "Kavadarci", "Kičevo", "Kocani",
        "Kumanovo", "Makedonska Kamenica", "Mavrovo", "Ohrid", "Prilep", "Radoviš", "Resen", "Skopje", "Strumica"
    ],
    "Norway": [
        "Agder", "Innlandet", "Møre og Romsdal", "Nordland", "Oslo", "Rogaland", "Troms og Finnmark", "Trøndelag", "Vestfold og Telemark", "Viken"
    ],
    "Oman": [
        "Ad Dakhiliyah", "Al Batinah North", "Al Batinah South", "Al Dhahirah", "Al Sharqiyah North", "Al Sharqiyah South",
        "Dhofar", "Muscat", "Musandam", "North Batinah", "South Batinah", "Zanzibar"
    ],
    "Pakistan": [
        "Azad Jammu and Kashmir", "Balochistan", "Federally Administered Tribal Areas", "Gilgit-Baltistan", "Khyber Pakhtunkhwa",
        "Punjab", "Sindh", "Islamabad Capital Territory"
    ],
    "Palau": [
        "Aimeliik", "Angaur", "Hatohobei", "Koror", "Melekeok", "Ngaraard", "Ngatpang", "Ngchesar", "Ngeremlengui",
        "Ngiwal", "Peleliu", "Sonsorol"
    ],
    "Panama": [
        "Bocas del Toro", "Chiriquí", "Coclé", "Colón", "Darien", "Herrera", "Los Santos", "Panamá", "Panamá Oeste",
        "Veraguas"
    ],
    "Papua New Guinea": [
        "Central", "Chimbu", "Eastern Highlands", "East New Britain", "East Sepik", "Enga", "Gulf", "Madang", "Manus",
        "Milne Bay", "Morobe", "National Capital District", "New Ireland", "Oro", "Southern Highlands", "West New Britain",
        "West Sepik", "Western", "Western Highlands"
    ],
    "Paraguay": [
        "Alto Paraguay", "Alto Paraná", "Amambay", "Asunción", "Boquerón", "Caaguazú", "Caazapá", "Canindeyú",
        "Central", "Concepción", "Cordillera", "Guairá", "Itapúa", "Misiones", "Ñeembucú", "Paraguarí", "Presidente Hayes",
        "San Pedro"
    ],
    "Peru": [
        "Amazonas", "Ancash", "Apurímac", "Arequipa", "Ayacucho", "Cajamarca", "Callao", "Cusco", "Huancavelica",
        "Huánuco", "Ica", "Junín", "La Libertad", "Lambayeque", "Lima", "Loreto", "Madre de Dios", "Moquegua", "Pasco",
        "Piura", "Puno", "San Martín", "Tacna", "Tumbes", "Ucayali"
    ],
    "Philippines": [
        "Abra", "Agusan del Norte", "Agusan del Sur", "Aklan", "Albay", "Antique", "Apayao", "Aurora", "Basilan",
        "Bataan", "Batanes", "Batangas", "Benguet", "Bohol", "Bukidnon", "Bulacan", "Cagayan", "Camarines Norte",
        "Camarines Sur", "Camiguin", "Capiz", "Catanduanes", "Cavite", "Cebu", "Cotabato", "Davao de Oro", "Davao del Norte",
        "Davao del Sur", "Davao Occidental", "Davao Oriental", "Dinagat Islands", "Eastern Samar", "Guimaras",
        "Ifugao", "Ilocos Norte", "Ilocos Sur", "Iloilo", "Isabela", "Kalinga", "Kamuig", "Laguna", "Lanao del Norte",
        "Lanao del Sur", "Leyte", "Maguindanao", "Marinduque", "Masbate", "Metro Manila", "Misamis Occidental", "Misamis Oriental",
        "Mountain Province", "Negros Occidental", "Negros Oriental", "Northern Samar", "North Cotabato", "Nueva Ecija",
        "Nueva Vizcaya", "Occidental Mindoro", "Oriental Mindoro", "Palawan", "Pampanga", "Pangasinan", "Quezon",
        "Quirino", "Rizal", "Romblon", "Samar", "Siquijor", "Sorsogon", "South Cotabato", "Southern Leyte", "Sultan Kudarat",
        "Sulu", "Surigao del Norte", "Surigao del Sur", "Tarlac", "Tawi-Tawi", "Zambales", "Zamboanga del Norte",
        "Zamboanga del Sur"
    ],
    "Poland": [
        "Dolnośląskie", "Kujawsko-Pomorskie", "Lubelskie", "Lubuskie", "Łódzkie", "Małopolskie", "Mazowieckie",
        "Opolskie", "Podkarpackie", "Podlaskie", "Pomorskie", "Śląskie", "Świętokrzyskie", "Warmińsko-Mazurskie",
        "Wielkopolskie", "Zachodniopomorskie"
    ],
    "Portugal": [
        "Aveiro", "Beja", "Braga", "Bragança", "Castelo Branco", "Coimbra", "Évora", "Funchal", "Guarda", "Leiria",
        "Lisbon", "Portalegre", "Porto", "Santarem", "Setúbal", "Viana do Castelo", "Vila Real", "Viseu"
    ],
    "Qatar": [
        "Ad Dawhah", "Al Khobar", "Al Khor", "Al Shamal", "Al Wakrah", "Umm Salal"
    ],
    "Romania": [
        "Alba", "Arad", "Arges", "Bacau", "Bihor", "Bistrita-Nasaud", "Botosani", "Braila", "Brasov", "Bucuresti",
        "Buzau", "Caras-Severin", "Calarasi", "Cluj", "Constanta", "Covasna", "Dambovita", "Dolj", "Galati",
        "Giurgiu", "Gorj", "Harghita", "Hunedoara", "Ialomita", "Iasi", "Ilfov", "Maramures", "Mehedinti",
        "Mures", "Neamt", "Olt", "Prahova", "Satu Mare", "Salaj", "Sibiu", "Suceava", "Teleorman", "Timis",
        "Tulcea", "Vaslui", "Valcea", "Vrancea"
    ],
    "Russia": [
        "Adygea", "Altai", "Amur", "Arkhangelsk", "Astrakhan", "Bashkortostan", "Belgorod", "Bryansk", "Buryatia",
        "Chechen Republic", "Chelyabinsk", "Chukotka Autonomous Okrug", "Chuvashia", "Dagestan", "Ingushetia",
        "Irkutsk", "Ivanovo", "Jewish Autonomous Region", "Kabardino-Balkaria", "Kaliningrad", "Kaluga", "Kamchatka",
        "Karachay-Cherkessia", "Karelia", "Kemerovo", "Khabarovsk", "Khakassia", "Khanty-Mansi", "Kirov", "Komi",
        "Kostroma", "Krasnodar", "Krasnoyarsk", "Kurgan", "Kursk", "Leningrad", "Lipetsk", "Magadan", "Moscow",
        "Murmansk", "Nizhny Novgorod", "North Ossetia-Alania", "Novgorod", "Novosibirsk", "Orenburg", "Oryol", "Penza",
        "Perm", "Primorsky Krai", "Pskov", "Rostov", "Ryazan", "Saint Petersburg", "Sakha", "Sakhalin", "Samara",
        "Saratov", "Smolensk", "Stavropol Krai", "Sverdlovsk", "Tambov", "Tatarstan", "Tomsk", "Tula", "Tver",
        "Tyva", "Udmurtia", "Ulyanovsk", "Vladimir", "Volgograd", "Vologda", "Voronezh", "Yamalo-Nenets", "Yaroslavl"
    ],
    "Rwanda": [
        "Eastern Province", "Kigali City", "Northern Province", "Western Province", "Southern Province"
    ],
    "Saint Kitts and Nevis": [
        "Saint Kitts", "Nevis"
    ],
    "Saint Lucia": [
        "Castries", "Choiseul", "Dauphin", "Gros Islet", "Micoud", "Soufrière", "Vieux Fort"
    ],
    "Saint Vincent and the Grenadines": [
        "Charlotte", "Saint Andrew", "Saint David", "Saint George", "Saint Patrick"
    ],
    "Samoa": [
        "Aiga-i-le-Tai", "Atua", "Fa'asaleleaga", "Gaga'emauga", "Gagaifomauga", "Palauli", "Savai'i", "Tuamasaga"
    ],
    "San Marino": [
        "Acquaviva", "Chiesanuova", "Domagnano", "Faetano", "Fiorentino", "Borgo Maggiore", "Montegiardino", "Seravalle"
    ],
    "Sao Tome and Principe": [
        "Príncipe", "São Tomé"
    ],
    "Saudi Arabia": [
        "Al Bahah", "Al Jawf", "Al Madinah", "Al Qassim", "Al Riyadh", "Ash Sharqiyah", "Asir", "Hail", "Jizan",
        "Makkah", "Najran", "Northern Borders", "Riyadh", "Tabuk", "Najran", "Qassim"
    ],
    "Senegal": [
        "Dakar", "Diourbel", "Fatick", "Kaolack", "Kedougou", "Kolda", "Louga", "Matam", "Saint-Louis", "Sedhiou",
        "Tambacounda", "Thies", "Ziguinchor"
    ],
    "Serbia": [
        "Belgrade", "Vojvodina", "Central Serbia", "Kosovo and Metohija"
    ],
    "Seychelles": [
        "Anse Aux Pins", "Anse Boileau", "Anse Etoile", "Baie Lazare", "Baie Sainte Anne", "Beau Vallon", "Bel Ombre",
        "Cascade", "Glacis", "Grand Anse", "La Digue", "Les Mamelles", "Mont Fleuri", "Plaisance", "Port Victoria",
        "Takamaka"
    ],
    "Sierra Leone": [
        "Eastern Province", "Northern Province", "Southern Province", "Western Area"
    ],
    "Singapore": [
        "Central Singapore", "North East", "North West", "South East", "South West"
    ],
    "Slovakia": [
        "Bratislava", "Trnava", "Trenčín", "Nitra", "Zlín", "Košice", "Prešov", "Banská Bystrica", "Žilina"
    ],
    "Slovenia": [
        "Pomurska", "Podravska", "Koroška", "Osrednjeslovenska", "Jugovzhodna Slovenija", "Osrednje", "Jugovzhodna",
        "Notranjska"
    ],
    "Solomon Islands": [
        "Central Islands", "Choiseul", "Guadalcanal", "Isabel", "Makira", "Malaita", "Rennell and Bellona", "Temotu"
    ],
    "Somalia": [
        "Awdal", "Bari", "Bay", "Bokolm", "Galguduud", "Hiiraan", "Jubbada Dhexe", "Jubbada Hoose", "Mudug",
        "Nugaal", "Sanaag", "Shabelle Dhexe", "Shabelle Hoose", "Sool", "Togdheer", "Woqooyi Galbeed"
    ],
    "South Africa": [
        "Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal", "Limpopo", "Mpumalanga", "Northern Cape", "North West",
        "Western Cape"
    ],
    "South Sudan": [
        "Central Equatoria", "Eastern Equatoria", "Jonglei", "Lakes", "Northern Bahr el Ghazal", "Western Bahr el Ghazal",
        "Unity", "Upper Nile", "Warrap", "Western Equatoria"
    ],
    "Spain": [
        "Andalusia", "Aragon", "Asturias", "Balearic Islands", "Basque Country", "Canary Islands", "Cantabria", "Castile and Leon",
        "Castile-La Mancha", "Catalonia", "Extremadura", "Galicia", "Madrid", "Murcia", "Navarre", "La Rioja", "Valencian Community"
    ],
    "Sri Lanka": [
        "Central", "Eastern", "Northern", "North Western", "North Central", "Sabaragamuwa", "Southern", "Uva", "Western"
    ],
    "Sudan": [
        "Al Bahah", "Al Jazirah", "Al Khartoum", "Al Qadarif", "Al Redayf", "An Nasir", "Atbara", "Beni Amer", "Berber"
    ],
    "Suriname": [
        "Brokopondo", "Commewijne", "Coronie", "Marowijne", "Nickerie", "Para", "Saramacca", "Sipaliwini", "Wanica"
    ],
    "Sweden": [
        "Blekinge", "Dalarna", "Gävleborg", "Gotland", "Halland", "Jämtland", "Jönköping", "Kalmar", "Kronoberg", "Norrbotten",
        "Örebro", "Östergötland", "Skåne", "Stockholm", "Södermanland", "Värmland", "Västerbotten", "Västernorrland",
        "Västmanland"
    ],
    "Switzerland": [
        "Aargau", "Appenzell Ausserrhoden", "Appenzell Innerrhoden", "Basel-Landschaft", "Basel-Stadt", "Bern", "Fribourg",
        "Geneva", "Glarus", "Graubünden", "Jura", "Lucerne", "Neuchâtel", "Nidwalden", "Obwalden", "Schaffhausen",
        "Solothurn", "St. Gallen", "Thurgau", "Ticino", "Uri", "Valais", "Vaud", "Zug", "Zurich"
    ],
    "Syria": [
        "Aleppo", "Al-Hasakah", "Al-Qamishli", "Damascus", "Daraa", "Deir ez-Zor", "Hama", "Homs", "Idlib", "Lattakia",
        "Quneitra", "Raqqa", "Rif Dimashq", "Sweida", "Tartus"
    ],
    "Taiwan": [
        "Changhua", "Chiayi", "Hsinchu", "Hualien", "Keelung", "Kinmen", "Matsu", "Nantou", "New Taipei", "Penghu",
        "Pingtung", "Taichung", "Tainan", "Taipei", "Taitung", "Taoyuan", "Yilan"
    ],
    "Tajikistan": [
        "Gorno-Badakhshan", "Khatlon", "Sughd", "Dushanbe"
    ],
    "Tanzania": [
        "Arusha", "Dar es Salaam", "Dodoma", "Iringa", "Kagera", "Kigoma", "Kilimanjaro", "Lindi", "Manyara", "Mara",
        "Mbeya", "Morogoro", "Mtwara", "Mwanza", "Pwani", "Rukwa", "Ruvuma", "Shinyanga", "Simiyu", "Singida", "Tabora",
        "Tanga"
    ],
    "Thailand": [
        "Ang Thong", "Ayutthaya", "Bangkok", "Chachoengsao", "Chai Nat", "Chaiyaphum", "Chanthaburi", "Chiang Mai",
        "Chiang Rai", "Chonburi", "Chumphon", "Kalasin", "Kamphaeng Phet", "Kanchanaburi", "Khon Kaen", "Krabi",
        "Lampang", "Lamphun", "Loei", "Lopburi", "Mae Hong Son", "Mukdahan", "Nakhon Nayok", "Nakhon Pathom",
        "Nakhon Phanom", "Nakhon Ratchasima", "Nakhon Sawan", "Nakhon Si Thammarat", "Narathiwat", "Nong Bua Lamphu",
        "Nong Khai", "Pattani", "Phang Nga", "Phatthalung", "Phayao", "Phetchabun", "Phetchaburi", "Phichit",
        "Phitsanulok", "Phrae", "Prachin Buri", "Prachuap Khiri Khan", "Ranong", "Ratchaburi", "Rayong", "Roi Et",
        "Sa Kaeo", "Sakon Nakhon", "Samut Prakan", "Samut Sakhon", "Samut Songkhram", "Saraburi", "Satun", "Singburi",
        "Sukhothai", "Suphanburi", "Surat Thani", "Surin", "Tak", "Trang", "Trat", "Ubon Ratchathani", "Udon Thani",
        "Uthai Thani", "Yala", "Yasothon"
    ],
    "Togo": [
        "Centrale", "Kara", "Maritime", "Plateaux", "Savanes"
    ],
    "Tonga": [
        "Eua", "Ha'apai", "Niuas", "Tongatapu"
    ],
    "Trinidad and Tobago": [
        "Chaguanas", "Diego Martin", "San Fernando", "Port of Spain", "Tobago", "Victoria", "Prince of Wales", "Penal"
    ],
    "Tunisia": [
        "Ariana", "Béja", "Ben Arous", "Bizerte", "Gabès", "Gafsa", "Jendouba", "Kairouan", "Kasserine", "Kébili",
        "La Manouba", "Le Kef", "Mahdia", "Medenine", "Monastir", "Nabeul", "Sfax", "Sidi Bouzid", "Siliana", "Tataouine",
        "Tozeur", "Tunis", "Zaghouan"
    ],
    "Turkey": [
        "Adana", "Adiyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Ardahan", "Artvin", "Aydın",
        "Balıkesir", "Bartın", "Batman", "Bayburt", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale",
        "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep",
        "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Iğdır", "Isparta", "İstanbul", "İzmir", "Kahramanmaraş", "Karabük",
        "Karaman", "Kastamonu", "Kayseri", "Kilis", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Mardin",
        "Mersin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Osmaniye", "Rize", "Sakarya", "Samsun", "Şanlıurfa",
        "Siirt", "Sinop", "Sivas", "Şırnak", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Uşak", "Van", "Yalova",
        "Yozgat", "Zonguldak"
    ],
    "Turkmenistan": [
        "Ahal", "Balkan", "Dashoguz", "Lebap", "Mary"
    ],
    "Tuvalu": [
        "Funafuti", "Nanumaga", "Nanumea", "Nukufetau", "Vaitupu"
    ],
    "Uganda": [
        "Central Region", "Eastern Region", "Northern Region", "Western Region"
    ],
    "Ukraine": [
        "Cherkasy", "Chernihiv", "Chernivtsi", "Dnipropetrovsk", "Donetsk", "Ivano-Frankivsk", "Kharkiv", "Kherson",
        "Khmelnytskyi", "Kiev", "Kirovohrad", "Luhansk", "Lviv", "Mykolaiv", "Odessa", "Poltava", "Rivne", "Sumy",
        "Ternopil", "Vinnytsia", "Volyn", "Zakarpattia", "Zaporizhzhia", "Zhytomyr"
    ],
    "United Arab Emirates": [
        "Abu Dhabi", "Ajman", "Dubai", "Fujairah", "Ras Al Khaimah", "Sharjah", "Umm Al-Quwain"
    ],
    "United Kingdom": [
        "England", "Northern Ireland", "Scotland", "Wales"
    ],
    "United States": [
        "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida",
        "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
        "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
        "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
        "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
        "West Virginia", "Wisconsin", "Wyoming"
    ],
    "Uruguay": [
        "Artigas", "Canelones", "Cerro Largo", "Colonia", "Durazno", "Flores", "Florida", "Lavalleja", "Maldonado",
        "Montevideo", "Paysandú", "Río Negro", "Rivera", "Rocha", "Salto", "San José", "Soriano", "Tacuarembó", "Treinta y Tres"
    ],
    "Uzbekistan": [
        "Andijan", "Bukhara", "Fergana", "Jizzakh", "Kashkadarya", "Khorezm", "Namangan", "Navoiy", "Samarkand",
        "Sirdaryo", "Surxondaryo", "Tashkent", "Tashkent City"
    ],
    "Vanuatu": [
        "Malampa", "Penama", "Sanma", "Shefa", "Tafea", "Torba"
    ],
    "Vatican City": [
        "Vatican City"
    ],
    "Venezuela": [
        "Amazonas", "Anzoátegui", "Apure", "Aragua", "Barinas", "Bolívar", "Carabobo", "Cojedes", "Delta Amacuro",
        "Falcón", "Guárico", "Lara", "Mérida", "Miranda", "Monagas", "Nueva Esparta", "Portuguesa", "Sucre", "Táchira",
        "Trujillo", "Yaracuy", "Zulia"
    ],
    "Vietnam": [
        "An Giang", "Bà Rịa–Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước",
        "Bình Thuận", "Cà Mau", "Cao Bằng", "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp", "Gia Lai",
        "Hà Giang", "Hà Nam", "Hà Nội", "Hải Dương", "Hải Phòng", "Hậu Giang", "Hòa Bình", "Hưng Yên", "Khánh Hòa",
        "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng", "Lạng Sơn", "Lào Cai", "Long An", "Nam Định", "Nghệ An",
        "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Phú Yên", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh",
        "Quảng Trị", "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa", "Thừa Thiên–Huế",
        "Tiền Giang", "Trà Vinh", "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"
    ],
    "Yemen": [
        "Aden", "Al Bayda", "Al Hudaydah", "Al Jawf", "Al Mahrah", "Al Mahwit", "Amanat al-Asimah", "Dhamar", "Hadramaut",
        "Hajjah", "Ibb", "Lahij", "Mareb", "Ma'rib", "Sa'dah", "Sanaa", "Shabwah", "Taiz"
    ],
    "Zambia": [
        "Central", "Copperbelt", "Eastern", "Luapula", "Lusaka", "Muchinga", "Northern", "North Western", "Southern", "Western"
    ],
    "Zimbabwe": [
        "Bulawayo", "Harare", "Manicaland", "Mashonaland Central", "Mashonaland East", "Mashonaland West", "Masvingo",
        "Matabeleland North", "Matabeleland South", "Midlands"
    ]
}
// Read private and public keys
// const PRIVATE_KEY = fs.readFileSync(path.join(__dirname, "private.pem"), "utf8");
// const PUBLIC_KEY = fs.readFileSync(path.join(__dirname, "public.pem"), "utf8");

/* .......................Server Setup.......................*/
// Creating server & port
const app = express();
const port = process.env.PORT || 3000;


// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// By-passing data transfer policy of browser
app.use(cors({
    origin: [process.env.HOST, process.env.Site],
    credentials: true,
}))
// console.log('r:', [process.env.HOST, process.env.PyHOST, process.env.Site])
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.json()) // Json middleware to jsonify respose

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", req.headers.origin); // Allow specific origin dynamically
//     res.header("Access-Control-Allow-Credentials", "true");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     next();
// });


const SECRET_KEY = "admin$9451@HostelAttendance";
/* ---------------------------Student Page--------------------------- */

/* .......................Sign-in Window....................... */
// Mysql Connection
var pool = createPool({
    host: process.env.DbHOST,
    user: process.env.DbUSER,
    password: process.env.DbPASSWORD,
    database: process.env.DB,
    connectionLimit: 10
})

pool.query('SET time_zone = "+05:09";')
pool.query('Select DATE_FORMAT(NOW(), "%r")', (err, res) => {
    console.log(res)
})
// Create a transporter object using SMTP
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',  // The SMTP server for Gmail 
    port: 587,  // Port for sending emails (587 for TLS, 465 for SSL)
    secure: false,  // Use TLS (true for port 465, false for 587)
    auth: {
        user: 'doraemon.89071@gmail.com',  // Your email address
        pass: 'lcge wnxk prvi swar',   // Your email password
    },
});

/**
 * LOGIN ROUTE - Generates JWT and sets it in HttpOnly Cookie
 */
// app.post("/login", (req, res) => {
//     const { username, password } = req.body;

//     // const user = users.find(u => u.username === username && u.password === password);
//     // if (!user) {
//     //     return res.status(401).json({ error: "Invalid credentials" });
//     // }

//     // Create JWT token
//     const token = jwt.sign({ userId: username }, PRIVATE_KEY, { algorithm: "RS256", expiresIn: "1h" });

//     // Set HttpOnly Cookie
//     res.cookie("token", token, {
//         httpOnly: true,  // Prevents JavaScript access (XSS protection)
//         secure: false,   // Set to true in production (requires HTTPS)
//         sameSite: "Strict" // Protects against CSRF attacks
//         // maxAge: 60 * 60 * 1000 // Cookie expires in 1 hour
//     });

//     res.json({ message: "Login successful" });
// });


// app.get("/getData", (req, res) => {
//     res.json({ message: "Data retrieved successfully!" });
// });

/**
 * PROTECTED ROUTE - Checks JWT in Cookie
 */
// app.post("/protected", (req, res) => {
//     const authHeader = req.headers.Authorization;
//     console.log(req)
//     if (!authHeader) {
//         return res.status(403).json({ error: "No token provided" });
//     }

//     const token = authHeader; // Extract token from header
//     console.log("Received Token:", token);

//     jwt.verify(token, PUBLIC_KEY, { algorithms: ["RS256"] }, (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ error: "Invalid token" });
//         }
//         res.json({ message: "Access granted!", userId: decoded.userId });
//     });
// });


/**
 * LOGOUT ROUTE - Clears JWT Cookie
 */
// app.post("/logout", (req, res) => {
//     res.clearCookie("token"); // Remove JWT cookie
//     res.json({ message: "Logged out successfully" });
// });

var otp;
var uId;

app.post('/setuser', (req, res)=>{
    const user = req.body.user;
    uId = user;
    return res.status(200).json({"success": true})
})

/* .......................Sending OTP....................... */

// API for generating and sending otp
app.post('/send-otp', (req, res) => {
    const { userId } = req.body;
    uId = userId
    // Generating otp
    otp = Math.floor(Math.random() * 1000000)
    while (String(otp).length < 6) {
        otp = Math.floor(Math.random() * 1000000)
    }
    // return res.status(200).send({'OTP Sent': true})
    let sqlQuery = `select Name, Email from StudentsData where Student_ID = '${userId}';`
    if (String(userId).startsWith('INVW')) {
        sqlQuery = `select Name, Email from WardensData where User_ID = '${userId}';`
    }
    // Fetch name and emailID to send email to user
    pool.query(sqlQuery, function (err, result, fields) {
        try {
            if (err) {
                console.log(err)
                // return err;
            }
            const [{ Name, Email }] = result
            console.log('OTP sent')
            // return res.status(202).json({'OTP Sent': true})
            if (Email != null) {
                // Email Data
                const mailOptions = {
                    from: `"Doraemon" <doraemon.89071@gmail.com>`,  // Sender address
                    to: Email,  // Recipient address
                    subject: 'One-Time Password from Hostel-Attandance-Manager',  // Subject line
                    text: `Hii ${Name}!\n One Time Password for logining in Hostel-Attandance-Manager: !` + otp,  // Plain text body
                    html: `<p>Hii ${Name}<br>One Time Password for logining in Hostel-Attandance-Manager!</p><h1>${otp}</h1>`,  // HTML body (optional)
                };

                // Send the email
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        // console.log('Error occurred:', error);
                        return res.status(500).send({ 'OTP Sent': false })
                    } else {
                        console.log('Email sent:', info.response);
                        return res.status(200).send({ 'OTP Sent': true })
                    }
                });
            }
        } catch (error) {
            console.log(error.message)
            return res.status(500).send({ 'OTP Sent': false })
        }
    })
})

/* .......................Verifiying OTP....................... */
app.post('/verify-otp', (req, res) => {
    const { OTP } = req.body
    // return res.status(200).json({'msg':'OTP Verified', 'Verified': true})
    // console.log(otp, OTP)
    if (OTP == otp) {
        // console.log(otp, OTP)
        console.log('OTP Verified')
        return res.status(200).send({ 'Verified': true })
    }
    return res.status(500).send({ 'Verified': false })
})

/* .......................Sign In....................... */
// Signin API 
app.post('/signin', (req, res) => {
    const { uid, pswrd } = req.body;
    // Fetch data from mysql
    let sqlQuery = `select * from StudentsData where Student_ID = '${uid}';`
    if (String(uid).startsWith('INVW')) {
        sqlQuery = `select * from WardensData where User_ID = '${uid}';`
    }
    pool.query(sqlQuery, function (err, result) {
        try {
            if (err) {
                return console.log(err);
            }
            const [{ _, Password }] = result
            console.log(result, Password)
            bcrypt.compare(pswrd, Password, (err, results) => {
                if (results) {
                    uId = uid
                    
                    console.log(results)
                    // SECRET_KEY = `${uId}$${Password}@login`;
                    const token = jwt.sign({ userId: uid }, SECRET_KEY, { expiresIn: "1h" });
                    console.log(token);
                    return res.status(200).json({ token });
                } else {
                    return res.status(401).json({ error: "Invalid credentials" });
                }
            })
        } catch (error) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
    })

})

/* .......................Logout....................... */
app.get('/logout', (req, res) => {
    uId = null;
})

/* .......................Login Authentication....................... */
app.get("/protected", (req, res) => {
    const token = req.headers["authorization"];
    console.log('run')
    console.log(token, SECRET_KEY)
    if (!token) {
        return res.status(403).json({ error: "No token provided" });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Invalid token" });
        }
        res.json({ message: "Access granted!", userId: decoded.userId });
    });
});

/* .......................Change Password....................... */
app.post('/change_pswrd', (req, res) => {
    console.log(req.body)
    const { password } = req.body
    if (/[a-z]/.test(password) == false) {
        return res.status(500).json({'Msg': 'Password must contain Alphabets!'}) 
    } else if (/[0-9]/.test(password) == false) {
        return res.status(500).json({'Msg': 'Password must contain Numbers!'}) 
    } else if (/[A-Z]/.test(password) == false) {
        return res.status(500).json({'Msg': 'Password must contain Capital Letter!'}) 
    } else if (/[\W_]/.test(password) == false) {
        return res.status(500).json({'Msg': 'Password must contain Speical Characters!'}) 
    } else if ((password.length >= 8) ==false) {
        return res.status(500).json({'Msg': 'Password length must be 8!'}) 
    } 
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        // const encodedPswrd = btoa(password);
        let sqlQuery = `update StudentsData set Password='${hashedPassword}' where Student_ID = '${uId}';`
        if (String(uId).startsWith('INVW')) {
            sqlQuery = `update WardensData set Password='${hashedPassword}' where User_ID = '${uId}';`
        }
        pool.query(sqlQuery, function (err, results, fields) {
            if (err) {
                res.status(500).send({ 'msg': 'Error during Password Changed!', 'Changes': false })
                console.error(err)
            }
            return res.status(200).send({ 'msg': 'Password Changed!', 'Changes': true })
        })
    })
})

/* ---------------------------Home Page--------------------------- */
/* .......................FetchAttendance of Student....................... */
// Home Window
app.get("/getData_of_student_attendance_data", (req, res) => {
    pool.query("SELECT Student_ID, Name, Hostel, Room_Number FROM StudentsData;", (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        console.log(result)
        const { Student_ID, Name, Hostel, Room_Number } = result[0];
        console.log(Student_ID, Name, Hostel, Room_Number)
        return res.json(result);
    });
})

/* .......................Access Holidays....................... */
app.get("/getData_of_list_of_holidays", (req, res) => {
    pool.query("SELECT * FROM calender", (err, results) => {
        if (err) {
            res.status(500).json({ error: "Database Error" });
        } else {
            res.json(results);
        }
    });
});

/* .......................Fetching Students Data....................... */
// Student's Personal Details Window
app.post('/fetch-stu-pd', (req, res) => {
    // console.log(req.body)
    const { currUserID } = req.body;
    // console.log(currUserID)
    pool.query(`SELECT * FROM StudentsData where Student_ID='${currUserID}';`, (err, results) => {
        if (err) return res.status(500).json(err)
        // console.log('Data: ', results)
        return res.status(200).json(results)
    })
})

/* .......................Update Student Data....................... */
app.post('/updateStuDetails', (req, res) => {
    const { data, Student_ID } = req.body;
    // Validation of Fields
    for (let key of Object.entries(data)) {
        if (key[1] == null) {
            return res.status(500).json({ 'err': { 'Title': `${key[0]} Empty!`, 'Msg': `Please fill ${key[0]} field!` } })
        }
    }
    const { DOB, Date_of_Joining } = data
    if (validDate(DOB, 'DOB', 'Please Select Valid Date of Birth!') != true) {
        return res.status(500).json({ 'err': validDate(data['DOB'], 'DOB', 'Please Select Valid Date of Birth!') })
    }
    if (validDate(Date_of_Joining, 'Date_of_Joining', 'Please Select Valid Date of Joining!') != true) {
        return res.status(500).json({ 'err': validDate(data['Date_of_Joining'], 'Date_of_Joining', 'Please Select Valid Date of Joining!') })
    }
    let newData = Object.values(data)
    pool.query(`UPDATE StudentsData SET Name=CASE WHEN Name IS NULL THEN ? ELSE Name END,Gender=CASE WHEN Gender IS NULL THEN ? ELSE Gender END,Fathers_Name=CASE WHEN Fathers_Name IS NULL THEN ? ELSE Fathers_Name END,Mothers_Name=CASE WHEN Mothers_Name IS NULL THEN ? ELSE Mothers_Name END,Student_Mobile_Number=CASE WHEN Student_Mobile_Number IS NULL THEN ? ELSE Student_Mobile_Number END,Fathers_Mobile_Number=CASE WHEN Fathers_Mobile_Number IS NULL THEN ? ELSE Fathers_Mobile_Number END,Email=CASE WHEN Email IS NULL THEN ? ELSE Email END,Adhaar=CASE WHEN Adhaar IS NULL THEN ? ELSE Adhaar END,DOB=CASE WHEN DOB IS NULL THEN ? ELSE DOB END,Date_of_Joining=CASE WHEN Date_of_Joining IS NULL THEN ? ELSE Date_of_Joining END,Course=CASE WHEN Course IS NULL THEN ? ELSE Course END,Year=CASE WHEN Year IS NULL THEN ? ELSE Year END,Hostel=CASE WHEN Hostel IS NULL THEN ? ELSE Hostel END,Room_Number=CASE WHEN Room_Number IS NULL THEN ? ELSE Room_Number END,Room_Type=CASE WHEN Room_Type IS NULL THEN ? ELSE Room_Type END,Country=CASE WHEN Country IS NULL THEN ? ELSE Country END,State=CASE WHEN State IS NULL THEN ? ELSE State END,City=CASE WHEN City IS NULL THEN ? ELSE City END,Postal_Code=CASE WHEN Postal_Code IS NULL THEN ? ELSE Postal_Code END,Address=CASE WHEN Address IS NULL THEN ? ELSE Address END,Warden=CASE WHEN Warden IS NULL THEN ? ELSE Warden END where Student_ID='${Student_ID}';`, newData, (err, results) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ "Updated": false })
        }
        console.log('Done')
        return res.status(200).json({ "Updated": true })
    });

})

// Endpoint to handle password change
app.post('/changeStudentpassword', (req, res) => {
    const { oldPassword, newPassword } = req.body;

    // Validate input
    if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: "Both old password and new password are required." });
    }

    // Step 1: Retrieve user from the database (replace 'username' with actual user identifier)
    console.log(oldPassword, newPassword, uId)
    pool.query('SELECT Password FROM StudentsData WHERE Student_ID = ?', [uId], (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = results[0];
        console.log(user)
        // Step 2: Compare the old password with the stored password (hashed)
        bcrypt.compare(oldPassword, user.Password, (err, isMatch) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            if (!isMatch) {
                return res.status(400).json({ message: 'Old password is incorrect' });
            }

            // Step 3: Hash the new password
            bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
                if (err) {
                    console.error('Error hashing password:', err);
                    return res.status(500).json({ message: 'Internal Server Error' });
                }

                // Step 4: Update the password in the database
                pool.query('UPDATE StudentsData SET Password = ? WHERE Student_ID = ?', [hashedPassword, uId], (err, result) => {
                    if (err) {
                        console.error('Error updating password:', err);
                        return res.status(500).json({ message: 'Internal Server Error' });
                    }
                    // Return success response
                    res.status(200).json({ message: 'Password changed successfully!' });
                });
            });
        });
    });
});

/* .......................Upload Profile....................... */
app.post('/uploadProfile', upload.single('file'), async (req, res)=>{
    console.log(uId)
    const fileData = req.file
    if (fileData) {
        const { originalname, buffer } = req.file;
        pool.query(`UPDATE StudentsData SET Profile=? WHERE Student_ID='${uId}';`, [buffer], (err, results)=>{
            if (err){
                console.log(err)
                return res.status(500).json({'fail': true})
            }
            return res.status(200).json({'success': true})
        })
    }
})

app.get('/setProfile', (req, res)=>{
    console.log('run2.0', uId)
    pool.query(`SELECT Profile from StudentsData Where Student_ID=?`, [uId], (err, results)=>{
        if (err) {
            console.log(err)
            return res.status(500).send('DB Error')
        }
        try{
            res.set('Content-Type', 'image/png');
            console.log(results[0]['Profile'])
            return res.status(200).send(results[0]['Profile'])
        } catch {
            return res.status(500).send('Server Error')
        }
        })
})

app.get('/Countries', (req, res) => {
    return res.status(200).json(CountryObj)
})
// app.post('/getStates', (req, res) => {
//     const { country } = req.body
//     // console.log(country, req.body)
//     pool.query(`Select states from CountryData where country='${country}';`, (err, result) => {
//         // console.log(result)
//         if (err) { return res.status(500).json(err) }
//         return res.status(200).json(result[0])
//     })
// })

// Mark Attendance Window Script
app.use(bodyParser.json({ limit: '50mb' }));

/* .......................MySQL Connection....................... */
// const connection = mysql.createConnection({
//     host: "sql12.freesqldatabase.com" || process.env.DbHOST,
//     user: "sql12771503" || process.env.DbUSER,
//     password: "hIYpmm9bkn" || process.env.DbPASSWORD,
//     database: "sql12771503" || process.env.DB
// })

// connection.connect((err) => {
//     if (err) {
//         console.error('Error connecting to DB:', err)
//         return;
//     }
//     console.log('Connected to the Mysql Database!')
// })


// Middleware to parse JSON
app.use(bodyParser.json());

/* .......................Save Image to Database....................... */
// Route to save image
app.post('/save-image', (req, res) => {
    const { imageDataUrl, id } = req.body;
    // console.log(req.body)

    pool.query(`Update StudentsData Set Image='${imageDataUrl}' where Student_ID='${id}';`, (err, results, fields) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Database error', details: err });
        }
        // console.log('Results:', res.json());
        return res.status(200).json({ 'results': true });
    })
});

function getFormattedTimestamp() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(now.getDate()).padStart(2, '0');

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/* .......................Mark Attendance....................... */
var studentId
app.post('/verifyAttendance', (req, res) => {
    studentId = req.body.Student_Id
    console.log(studentId)
    return res.status(200).json({'success': true})
})
app.post('/markAttendance', (req, res) => {
    const { Student_ID } = req.body
    const date = new Date().toISOString().split('T')[0];
    const Time = new Date().toLocaleString('en-GB', {
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: true
    });
    console.log(studentId, Student_ID)
    if (studentId == Student_ID) {
        pool.query(`Insert Into AttendanceData (TimeStamp, Date, Time, Attendance, Student_ID, Hostel, Room_Number, Day) values ('${getFormattedTimestamp()}', '${date}', '${Time}', 'Present', '${Student_ID}', 'Himgiri','F-16', WEEKDAY(CURDATE()))`, (err, result) => {
            console.log(result)
            if (err) {
                console.log(err)
                return res.status(500).json(err)
            }
            return res.status(200).json({ 'Success': true })
        })
    } else {
        return res.status(500).json({ 'err': { "Title": 'Unauthorised Access!', "Msg": 'You Can\'t Mark Your Attendance In Unauthorised Way!' } })
    }
})

/* .......................Fetch Attendance from database....................... */
// View Attendace Code
function validDate(inputDate, Title, msg) {
    console.log(inputDate)
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(inputDate)) {
        console.log(regex.test(inputDate))
        return { 'Title': `${Title} Empty`, 'Msg': msg }
    }
    inputDate = new Date(inputDate)
    const date = new Date()
    if (inputDate.getFullYear() < 1900) {
        console.log(inputDate.getFullYear())
        return { 'Title': `${Title} Invalid Year`, 'Msg': msg }
    } else if (inputDate.getMonth() + 1 < 1 || inputDate.getMonth() + 1 > 12) {
        console.log(inputDate.getMonth())
        return { 'Title': `${Title} Invalid Month`, 'Msg': msg }
    } else if (inputDate.getMonth() + 1 == 2 && inputDate.getDate() > 29) {
        console.log(inputDate.getDate())
        return { 'Title': `${Title} Invalid Day`, 'Msg': msg }
    } else if (inputDate.getDate() <= 0 || inputDate.getDate() > 31) {
        console.log(inputDate.getDate())
        return { 'Title': `${Title} Invalid Day`, 'Msg': msg }
    }
    return true
}

app.post('/fetchAttendance', (req, res) => {
    const { startDate, endDate } = req.body
    if (validDate(startDate, 'From Date', 'Please Select Valid From Date!') != true) {
        return res.status(500).json({ 'err': validDate(startDate, 'From Date', 'Please Select Valid From Date!') })
    } else if (validDate(endDate, 'To Date', 'Please Select Valid To Date!') != true) {
        return res.status(500).json({ 'err': validDate(endDate, 'To Date', 'Please Select Valid To Date!') })
    } else if (startDate > endDate) {
        return res.status(500).json({ 'err': { 'Title': 'From Date Greater than To Date', 'Msg': 'Select Valid Dates!' } })
    }
    pool.query('Select SRNO, Date, Time, Attendance, Day from AttendanceData where Date BETWEEN ? AND ?;', [startDate, endDate], (err, result) => {
        console.log(result)
        if (err) {
            console.log(err)
            return res.status(500).json(err)
        }
        return res.status(200).json(result)
    })
})

/* .......................Complain Window....................... */
// Submit Complain
/* .......................Submit Comlain to Database....................... */
app.post('/submitComplain', upload.single('file'), async (req, res) => {
    let complainData = JSON.parse(req.body.complainData);
    // complainData = String(complainData).split(',')
    if (validDate(complainData.date, 'Date of Complaint Empty!', 'Please Enter Date of Complaint!') != true) {
        return res.status(500).json({ "err": { 'Title': 'Date of Complaint Empty!', "Msg": 'Please Enter Date of Complaint!' } })
    } else if (complainData.studentId == '') {
        return res.status(500).json({ "err": { 'Title': 'Student ID Empty!', "Msg": 'Please Enter Student ID!' } })
    } else if (complainData.complaintType == '') {
        return res.status(500).json({ "err": { 'Title': 'Complaint Type Empty!', "Msg": 'Please Enter Complaint Type!' } })
    } else if (complainData.warden == '') {
        return res.status(500).json({ "err": { 'Title': 'Warden Name Empty!', "Msg": 'Please Enter Warden Name!' } })
    } else if (complainData.description == '') {
        return res.status(500).json({ "err": { 'Title': 'Description Empty!', "Msg": 'Please Enter Description!' } })
    }
    let newComplainData = Object.values(complainData)
    if (req.file) {
        const { originalname, buffer } = req.file;
        complainData['filename'] = originalname
        complainData['filedata'] = buffer
        newComplainData = Object.values(complainData)
        pool.query('Insert into Complaints (Date, Student_ID, complain, Warden_name, Description,filename, filedata) values (?,?,?,?,?,?,?);', newComplainData, (err, result) => {
            if (err) return res.status(500).json(result);
            return res.status(200).json({ 'success': true })
        })
    } else {
        pool.query('Insert into Complaints (Date, Student_ID, complain, Warden_name, Description) values (?,?,?,?,?);', newComplainData, (err, result) => {
            console.log(err)
            if (err) return res.status(500).json(err);
            return res.status(200).json({ 'success': true })
        })
    }
})

/* ----------------------Warden Server----------------------------------*/
// Home
/* .......................Fetch Warden Details....................... */
app.get('/getWardenData', (req, res) => {
    pool.query(`Select User_ID, Name, Hostel_Name FROM WardensData WHERE User_ID=?`, uId, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json(err)
        }
        return res.status(200).json(result)
    })
})

// Add New Student
/* .......................Add New Student to Database....................... */
app.post('/addNewStudent', (req, res) => {
    const Data = req.body.data
    pool.query('INSERT INTO StudentsData (Student_ID, Name, Student_Mobile_Number, Fathers_Mobile_Number, Email, Adhaar, Hostel, Room_Number) VALUES (?,?,?,?,?,?,?,?)', Data, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json(err.message)
        }
        return res.status(200).json(result)
    })
})


/* .......................Update Student Details via Warden....................... */
// Update Student Data
app.post('/updateStudentData', (req, res) => {
    const Data = req.body;
    pool.query(`UPDATE StudentsData SET Name=?,Gender=?,Fathers_Name=?,Mothers_Name=?,Student_Mobile_Number=?,Fathers_Mobile_Number=?,Email=?,Adhaar=?,DOB=?,Date_of_Joining=?,Course=?,Year=?,Hostel=?,Room_Number=?,Room_Type=?,Country=?,State=?,City=?,Postal_Code=?,Address=?,Warden=? where Student_ID='${Data[0]}';`, Data.slice(1), (err, results) => {
        if (err) {
            console.log(err)
            return res.status(500).json(err)
        }
        return res.status(200).json(results)
    })
})

app.listen(port, () => {
    console.log(`Server Listening at: http://localhost:${port}`)
})
