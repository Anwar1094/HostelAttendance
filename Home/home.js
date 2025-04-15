const host = 'https://hostelattendance-backend.onrender.com'
const Pyhost = 'https://rock-becoming-startup-rock.trycloudflare.com'

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

async function checkAuth() {
    const token = localStorage.getItem("token");

    if (!token) {
        swal("Session Expired!", `You are not logged in!!`, 'error').then((result) => {
            redirect("/index.html");
        }).catch((err) => {

        });
        return;
    }

    try {
        const response = await fetch(`${host}/protected`, {
            method: "GET",
            headers: { "Authorization": token }
        });

        if (!response.ok) {
            throw new Error("Unauthorized access");
        } else {
            loadWin()
        }

        const data = await response.json();
        console.log("Protected Data:", data);

    } catch (error) {
        console.error("Auth Error:", error);
        swal("Session Expired!", `Please login in!!`, 'error')
        localStorage.removeItem("token");
        redirect("/index.html");
    }
}
// async function checkAuth() {
//     await fetch(`${Pyhost}/read-cookies`).then(response=>response.json())
//     .then(data=>{
//         console.log(data)
//     })
//     // try {
//     //     const response = await fetch("http://localhost:3000/protected", {
//     //         method: "GET",
//     //         credentials: "include" // Send cookies
//     //     });

//     //     if (!response.ok) {
//     //         throw new Error("Unauthorized access");
//     //     }

//     //     const data = await response.json();
//     //     console.log("Protected Data:", data);
//     // } catch (error) {
//     //     console.error("Auth Error:", error);
//     //     alert("Session expired. Please login again.");
//     //     redirect("/index.html");
//     // }
// }

// checkAuth()
function redirect(url) {
    window.location.href = url; // Redirect to the given page
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    redirect("/index.html"); // Redirect back to login page
    fetch(`${host}/logout`)
    window.history.forward()
}



function changeState(state, id = null, cls = null, element = null) {
    if (cls != null) {
        document.getElementsByClassName(`${cls}`).style.display = state;
    } else if (id != null) {
        document.getElementById(`${id}`).style.display = state;
    } else {
        document.querySelectorAll(`${element}`).forEach(item => {
            item.style.display = state;
        })
    }
}

function homefun() {
    fetchStuAttendance()
    changeState('none', "main-body-div")
    setTimeout(() => {
        changeState('block', "main-body-div")
    }, 100);
    changeState('none', "pd-div")
    changeState('none', "mark-attendance-div")
    changeState('none', 'viewAttendance')
    changeState('none', 'complain')
    changeState('none', 'thankYouMessage')
    CloseCamera('success')
}

function showNavBar() {
    changeState('block', hamburger)
}
// Home
async function loadWin() {
    document.getElementById("pd-div").style.display = 'none';
    document.getElementById('UserName').innerHTML = localStorage.getItem('userId');
    const user = localStorage.getItem('userId');
    fetchStuAttendance()
    await fetch(`${host}/setuser`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({'user': user})
    }).then(response=>response.json())
    .then(data=>{
        // setProfile()
    })
} 
window.addEventListener('DOMContentLoaded', () => {
    setProfile(); // runs only once when DOM is ready
  });
const profileImage = document.getElementById("profileImage");
const profileUpload = document.getElementById("profileUpload");
const profileDropdown = document.getElementById("profileDropdown");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

// Toggle dropdown on profile image click
function showDropdown() {
    const style = document.getElementById('profileDropdown').style.display
    if (style == 'block') {
        document.getElementById('profileDropdown').style.display = 'none'
        return
    } else {
        document.getElementById('passwordPopup').style.display = 'none'
        document.getElementById('profileDropdown').style.display = 'block'
    }
}

// Close dropdown when clicking outside
document.addEventListener("click", function (event) {
    console.log(event.target.tagName)
    if (event.target.id != 'profileImage') {
        if (event.target.id == 'changePasswordPopUpBtn' || event.target.id == 'oldpassword' || event.target.id == 'newPassword' || event.target.id == 'confirmPassword' || event.target.tagName == 'label' || event.target.tagName == 'H3' || event.target.id == 'password-div') {
            document.getElementById('profileDropdown').style.display = 'block'
            return
        }
        document.getElementById('profileDropdown').style.display = 'none'
        return
    }
});

// Profile Picture Upload
profileUpload.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (event) {
            profileImage.src = event.target.result;
        };

        reader.readAsDataURL(file);
    }
});
function uploadPhoto() {
    const formData = new FormData();
    try {
        const fileData = document.getElementById('profileUpload')
        if (fileData.files[0]) formData.append('file', fileData.files[0]);
    } catch (error) {
        console.log(error)
        return
    }
    console.log(formData)
    fetch(`${host}/uploadProfile`, {
        method: 'POST',
        body: formData
    }).then(response=>response.json()) 
    .then(data=>{
    }).catch(err=>{console.log(err)})
}

async function setProfile(){
    await fetch(`${host}/setProfile`)
    .then(res => {
        if (res.ok && res.headers.get("Content-Type")?.startsWith("image")) {
            return res.blob();
        } else {
            throw new Error("No image found");
        }
    })
    .then(blob => {
        const imgURL = URL.createObjectURL(blob);
        document.getElementById("profileImage").src = imgURL;
        document.getElementById("student-details-div-profileImage").src = imgURL;
    })
    .catch(err => {
        console.error("Image load error:", err);
        document.getElementById("profileImg").src = "default.png"; // fallback image
    });
}

function showPasswordPopUp() {
    document.getElementById("passwordPopup").style.display = "block";
}

// Function to Close Change Password Pop-up
function closePasswordPopup() {
    document.getElementById("passwordPopup").style.display = "none";

}

// Button Click for Password Change (without form tag)
function changePasswordDropdown() {
    let oldPassword = document.getElementById("oldpassword").value;
    let newPassword = document.getElementById("newPassword").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let errorMessage = document.getElementById("error-message");

    // Clear previous error messages
    errorMessage.style.display = "none";
    if (!oldPassword || !newPassword || !confirmPassword) {
        errorMessage.textContent = "fields do not empty!";
        errorMessage.style.display = "block";
        return; // Stop further execution
    }

    // Validate password match
    if (newPassword !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match!";
        errorMessage.style.display = "block";
        return; // Stop further execution
    }

    fetch(`${host}/changeStudentpassword`, {
        method: 'POST', // or 'PUT' depending on your server setup
        headers: {
            'Content-Type': 'application/json', // Indicates the type of data being sent
        },
        body: JSON.stringify({ oldPassword, newPassword }) // Convert the data object to JSON format
    })
        .then(response => response.json()) // Assuming the server responds with JSON
        .then(data => {
            console.log('Success:', data); // Handle server response here (e.g., success message)
            closePasswordPopup(); // Close the popup after successful password change
        })
        .catch((error) => {
            console.error('Error:', error); // Handle any error
            errorMessage.textContent = "Something went wrong. Please try again!";
            errorMessage.style.display = "block"; // Show error message if request fails
        });
};

// Toggle hamburger menu
hamburger.addEventListener("click", function () {
    navLinks.classList.toggle("active");
});

// Close menu when clicking outside
document.addEventListener("click", function (event) {
    if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
        navLinks.classList.remove("active");
    }
});

// Fetching List of Holidays
async function getData_of_list_of_holidays() {
    console.log("hello");

    const container = document.getElementById("data-container-getData_of_list_of_holidays");
    container.innerHTML = "Loading..."; // Show loading message while data is being fetched

    try {
        const response = await fetch(`${host}/getData_of_list_of_holidays`);

        // Check if the response status is OK (200)
        console.log(response.status)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Clear loading message and existing data
        container.innerHTML = "";

        // Generate the HTML string for all data
        let htmlContent = "";
        data.forEach(item => {
            htmlContent += `
                <div class="data-box">
                    <strong>${item.Festival}</strong><br>
                    Date: ${item.Date}<br>
                    Day: ${item.Day}<br>
                    No. of Day: ${item.NoofDay}
                </div>
            `;
        });

        // Append the generated HTML content to the container
        container.innerHTML = htmlContent;

    } catch (error) {
        console.error("Error fetching data in list of holidays:", error);
        container.innerHTML = "Failed to load data. Please try again later."; // Show error message
    }
}


// getData_of_list_of_holidays();

function fetchStuAttendance() {
    fetch(`${host}/getData_of_student_attendance_data`)
        .then(response => response.json())
        .then(data => {

            const { Student_ID, Name, Hostel, Room_Number } = data[0];
            if (Name != null) {
                document.getElementById("student-details-div-name-labels").innerText = Name;
            }
            if (Student_ID != null) {
                document.getElementById("student-details-div-studentid-labels").innerText = Student_ID;
            }
            if (Hostel != null || Room_Number != null) {
                document.getElementById("hostel-and-room-label").innerText = `${Hostel}-${Room_Number}`;
            }

            document.getElementById("progressBar-totalattendance").style.width = 100 + "%";
            document.getElementById("progressBar-totalattendance").innerText = '100' + "%";

            document.getElementById("progressBar-totalpresent").style.width = 70 + "%";
            document.getElementById("progressBar-totalpresent").innerText = '70' + "%";

            document.getElementById("progressBar-totalabsent").style.width = 30 + "%";
            document.getElementById("progressBar-totalabsent").innerText = '30' + "%";

        })
        .catch(error => console.error("Error fetching users:", error));
}

// Personal Details Window
async function Personal_Details() {
    changeState('none', "pd-div")
    setTimeout(() => {
        changeState('block', "pd-div")
    }, 100);
    changeState('none', "main-body-div")
    changeState('none', "mark-attendance-div")
    changeState('none', 'viewAttendance')
    changeState('none', 'complain')
    changeState('none', 'thankYouMessage')
    CloseCamera('success')
    document.querySelectorAll('.inp').forEach(item => {
        item.value = ''
    });
    setCountryDropDown()

    const currUserID = document.getElementById('student-details-div-studentid-labels').innerHTML
    await fetch(`${host}/fetch-stu-pd`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currUserID })
    }).then(response => response.json())
        .then((result) => {
            const inps = []
            document.querySelectorAll('.inp').forEach(inp => {
                inps.push(inp.id)
            })
            var save = false
            for (let [key, val] of Object.entries(result[0]).sort()) {
                if (val == null && key != 'Profile') {
                    save = true
                }
                if (val != null && inps.includes(key)) {
                    if (document.getElementById(key).type == 'date') {
                        document.getElementById(key).value = val.split('T')[0]
                    } else {
                        if (key == 'Country') {
                            setState(val)
                        }
                        document.getElementById(key).value = val
                    }
                    if (document.getElementById(key).tagName == 'SELECT') {
                        document.getElementById(key).setAttribute('disabled', true)
                    } else {
                        document.getElementById(key).setAttribute('readonly', true)
                    }
                }
            }
            if (save == true) {
                document.getElementById('Save').style.display = 'block';
            } else {
                document.getElementById('Save').style.display = 'none';
            }
        }).catch((err) => {
            console.log(err)
        });
}

function saveStuData() {
    const data = {}
    document.querySelectorAll('.inp').forEach(element => {
        if (element.id != 'Student_ID') {
            (element.value != '') ? data[element.id] = (element.value) : data[element.id] = null;
        }
    })
    const Student_ID = document.getElementById('Student_ID').value
    fetch(`${host}/updateStuDetails`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data, Student_ID })
    }).then(response => response.json())
        .then(data => {
            if (data['err']) {
                swal(data['err']['Title'], data['err']['Msg'], 'error')
            }
            if (data['Updated']) Personal_Details();
        })
}

function setCountryDropDown() {
    const Country = document.getElementById('Country')
    for (item of Object.keys(CountryObj)) {
        const option = document.createElement('option')
        option.value = item
        option.text = item
        Country.appendChild(option)
    }
}

function setState(country = null) {
    console.log(document.getElementById('Country').value)
    if (country == null) {
        country = document.getElementById('Country').value
    }
    const State = document.getElementById('State')
    try {
        document.querySelectorAll('option.state').forEach(option => {
            State.removeChild(option)
        })
        if (country == '') {

        }
        const states = CountryObj[country]
        for (let i = 0; i < states.length; i++) {
            const option = document.createElement('option')
            option.className = 'state'
            option.value = states[i]
            option.text = states[i]
            State.appendChild(option)
        }
    } catch { }
}
// Mark Attendance Window Code
var captInterval
var videoStream
function MarkAttendance() {
    changeState('none', "mark-attendance-div")
    setTimeout(() => {
        changeState('flex', "mark-attendance-div")
    }, 100);
    changeState('none', "main-body-div")
    changeState('none', "pd-div")
    changeState('none', 'viewAttendance')
    changeState('none', 'complain')
    changeState('none', 'thankYouMessage')
    // Reset GUI on load
    document.getElementById('stuID').textContent = ''
    document.getElementById('btnText-captureImage').textContent = 'Mark Attendance'
    document.getElementById('submitAttendance').disabled = true;
    changeState('block', 'scan-line')
    document.getElementById('scanner').style.borderColor = '#0095ff'
    document.getElementById('att-h1').innerHTML = 'Marking Your Attendance...'
    const video = document.getElementById('video');
    // Access the user's camera
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            videoStream = stream;
            video.srcObject = stream;
        })
        .catch((error) => {
            console.error('Error accessing webcam: ', error);
        });

    captInterval = setInterval(() => {
        captureImage()
    }, 2000)
}

// Function to capture an image and send it to the server
function captureImage() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current video frame onto the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the canvas image to a data URL (base64 image)
    const imageDataUrl = canvas.toDataURL('image/png');

    // Send the image data to the server
    sendImageToServer(imageDataUrl);

    // Create an image element and add it to the captured images section
    var imgUrl = imageDataUrl;
}

// Function to send image data to the server
let count = 0
let Detected = 0
function sendImageToServer(imageDataUrl) {
    document.getElementById('scanner').style.borderColor = '#0095ff'
    document.getElementById('att-h1').innerHTML = 'Detecting Your Face...'
    fetch(`${Pyhost}/recognize_face`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageDataUrl })
    }).then(response => response.json()).then(data => {
        console.log(data['stuId'])
        if (data['stuId'] == null) {
            count++;
            // document.getElementById('att-h1').innerHTML = 'Can\'t Detected Face!'
            if (count > 10) {
                document.getElementById('scanner').style.borderColor = 'red'
                document.getElementById('att-h1').innerHTML = 'No Face Detected!'
                CloseCamera('fail');
                setTimeout(() => {
                    document.getElementById('att-h1').innerHTML = 'Restart...'
                    MarkAttendance()
                }, 2000);
            }
        } else if (data['stuId'] != 'Undetected' && data['stuId'] != null) {
            document.getElementById('stuID').textContent = data['stuId']
            changeState('none', 'scan-line')
            document.getElementById('scanner').style.borderColor = '#00ff6e'
            if (document.getAnimations('att-h1'))
                document.getElementById('att-h1').innerHTML = 'Attendance Marked!'
            document.getElementById('submitAttendance').disabled = false;
            CloseCamera('success')
        } else {
            Detected++;
            if (Detected > 5) {
                if (Detected % 3 == 0) {
                    document.getElementById('att-h1').innerHTML = 'Face Not Matched!'
                    document.getElementById('scanner').style.borderColor = 'red'
                }
            }
        }
    }
    )
}

function CloseCamera(st) {
    setTimeout(() => {
        clearInterval(captInterval)
    }, 1000)
    if (videoStream) {
        // Get all video tracks from the stream
        const tracks = videoStream.getTracks();
        // Stop each track (including the video track)
        tracks.forEach(track => track.stop());
        changeState('none', 'scan-line')
        count = 0
    }
}

async function submitAttendance() {
    changeState('none', 'btnText-captureImage')
    changeState('flex', 'spinner-captureImage')
    const Student_ID = document.getElementById('stuID').textContent;
    await fetch(`${Pyhost}/verify`).then(response => response.json())
        .then(data => {
            fetch(`${host}/markAttendance`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Student_ID })
            }).then(response => response.json())
                .then(data => {
                    changeState('none', 'spinner-captureImage')
                    changeState('flex', 'btnText-captureImage')
                    if (data['err']) {
                        swal(data['err']['Title'], data['err']['Msg'], 'error')
                        return
                    }
                    document.getElementById('btnText-captureImage').innerHTML = 'Attendance Submitted!'
                    setTimeout(() => {
                        viewAttendance()
                    }, 2000);
                })
        })
}

// View Attendance Window
function viewAttendance() {
    changeState('none', 'viewAttendance')
    setTimeout(() => {
        changeState('block', 'viewAttendance')
    }, 100);
    changeState('none', "main-body-div")
    changeState('none', "pd-div")
    changeState('none', "mark-attendance-div")
    changeState('none', 'complain')
    changeState('none', 'thankYouMessage')
    CloseCamera('success')
}


function createTableRow(srNo, date, days, time, attendance) {
    return `
    <tr>
    <td>${srNo}</td>
    <td>${date}</td>
    <td>${days}</td>
    <td>${time}</td>
    <td>${attendance}</td>
    </tr>
    `;
}

function showAttendance() {
    const dayMap = { '0': "MONDAY", '1': "TUESDAY", '2': "WEDNESDAY", '3': "THURSDAY", '4': "FRIDAY", '5': "SATURDAY", '6': "SUNDAY" }
    const startDate = document.getElementById('fromDate').value
    const endDate = document.getElementById('toDate').value
    fetch(`${host}/fetchAttendance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ startDate, endDate })
    }).then(response => response.json())
        .then(data => {
            if (data['err']) {
                swal(data['err']['Title'], data['err']['Msg'], 'error')
            } else if (data['code']) {
                swal('Database Error', 'Server Error!', 'error')
            } else {

                const tableBody = document.getElementById('tableBody');
                while (tableBody.firstChild) {
                    tableBody.removeChild(tableBody.firstChild)
                }
                data.forEach(row => {
                    console.log(data['Date'])
                    tableBody.innerHTML += createTableRow(row['SRNO'], String(row['Date']).split('T')[0], dayMap[row['Day']], row['Time'], row['Attendance']);
                })
            }
        })
}
// Add rows to the table
// for (let i = 1; i <= 15; i++)
//  {
// tableBody.innerHTML += createTableRow('1', '12/04/2004', 'monday', '10.0am', 'present');
// tableBody.innerHTML += createTableRow('1', '12/04/2004', 'monday', '10.0am', 'present');
// tableBody.innerHTML += createTableRow('1', '12/04/2004', 'monday', '10.0am', 'present');

// }

// Complain Code
function complain() {
    changeState('none', "mark-attendance-div")
    changeState('none', "main-body-div")
    changeState('none', "pd-div")
    changeState('none', 'viewAttendance')
    changeState('none', 'thankYouMessage')
    changeState('none', 'complain')
    setTimeout(() => {
        changeState('block', 'complain')
    }, 100);
    CloseCamera('success')
    document.querySelectorAll('.complain-inp').forEach(data => {
        data.value = ''
    })
    document.getElementById('complaintForm').classList.remove('hidden')
    document.getElementById('thankYouMessage').classList.add('hidden')

    const complains = [
        "Hostel Issue",
        "Electricity Issue",
        "Water Issue",
        "Maintenance Issue",
        "Food Quality Issue",
        "Internet Issue",
        "Attendance Discrepancy",
        "Other"
    ]

    const Wardens = [
        "Abhishek Gupta",
        "Kedar",
        "Himalay Warden",
        "Shivalik Warden",
        "Arawali Warden",
        "Kaveri Warden",
        "Narmada Warden",
        "Godawari Warden",
        "Bhagirathi Warden"
    ]
    const complainType = document.getElementById('complaintType')
    complains.forEach(complain => {
        const option = document.createElement('option')
        option.value = complain
        option.text = complain
        complainType.appendChild(option)
    })

    const Warden = document.getElementById('warden')
    Wardens.forEach(warden => {
        const option = document.createElement('option')
        option.value = warden
        option.text = warden
        Warden.appendChild(option)
    })

}

async function submitComplain() {
    const complainData = {}
    document.querySelectorAll('.complain-inp').forEach(inp => {
        complainData[inp.id] = inp.value
    })
    console.log(complainData)
    const formData = new FormData();
    try {
        const fileData = document.getElementById('uploadDoc')
        console.log(JSON.stringify(complainData))
        formData.append('complainData', JSON.stringify(complainData))
        if (fileData.files[0]) formData.append('file', fileData.files[0]);
    } catch (error) {
        console.log(error)
    }
    await fetch(`${host}/submitComplain`, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(data => {
            if (data['err']) {
                swal(data['err']['Title'], data['err']['Msg'], 'error')
            } else if (data['code']) {
                console.log(data)
                swal('Database Error', 'Server Error!', 'error')
            }
            if (data['success']) {
                document.getElementById('complain').style.display = 'none';
                document.getElementById('thankYouMessage').style.display = 'block';
            }
        })

}
