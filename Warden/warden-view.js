const host = 'http://localhost:3000'

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

document.onload = loadHomeWindow()
function loadHomeWindow() {
    changeState('block', 'main-body-div')
    changeState('none', 'addStudentDiv')
    changeState('none', 'sum_container')
    changeState('none', 'complain')
    changeState('none', 'ManageHostelDiv')
    changeState('none', 'pop-up')
    fetchWardenData()
}

function loadAddStudentWindow() {
    changeState('block', 'addStudentDiv')
    changeState('none', 'main-body-div')
    changeState('none', 'sum_container')
    changeState('none', 'complain')
    changeState('none', 'ManageHostelDiv')
    changeState('none', 'pop-up')
}
function loadUpdateStudentpopup() {
    changeState('none', 'addStudentDiv')
    changeState('none', 'main-body-div')
    changeState('none', 'sum_container')
    changeState('none', 'complain')
    changeState('none', 'ManageHostelDiv')
    changeState('none', 'pop-up')
    popup('Enter Student ID', 'Fetch Data', loadUpdateStudentWindow, true)
}
function loadAttendanceSummary() {
    changeState('block', 'sum_container')
    changeState('none', 'main-body-div')
    changeState('none', 'addStudentDiv')
    changeState('none', 'complain')
    changeState('none', 'ManageHostelDiv')
    changeState('none', 'pop-up')
}
function loadStudentcomplaint() {
    changeState('block', 'complain')
    changeState('none', 'main-body-div')
    changeState('none', 'addStudentDiv')
    changeState('none', 'sum_container')
    changeState('none', 'ManageHostelDiv')
    changeState('none', 'pop-up')
}
function loadManageHostel() {
    changeState('block', 'ManageHostelDiv')
    changeState('none', 'main-body-div')
    changeState('none', 'addStudentDiv')
    changeState('none', 'sum_container')
    changeState('none', 'complain')
    changeState('none', 'pop-up')
}
function fetchWardenData() {
    fetch(`${host}/getWardenData`).then(response=>response.json())
    .then(data=>{
        const newData = data[0]
        document.getElementById('warden-details-div-name-labels').textContent = newData['Name']
        document.getElementById('warden-details-div-wardenid-labels').textContent = newData['User_ID']
        document.getElementById('hostel-and-room-label').textContent = newData['Hostel_Name']
    }).catch(err=>{
        console.log(err)
    })
}
function AddNewStudent() {
    let data = []
    document.querySelectorAll('input.newStuData').forEach(input=>{
        if (input.value == '') {
            const lbl = document.querySelector(`label[for='${input.id}']`).textContent
            swal('All fields are required!', `Please Enter ${lbl}!`, 'error')
            data.push(null)
        } else {
            data.push(input.value)
        }
    })
    if (!data.includes(null)) {
        console.log('run')
        fetch(`${host}/addNewStudent`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({data})
        }).then(response=>response.json())
        .then(data=>{
            if (data == "ER_DUP_ENTRY: Duplicate entry 'BC2022004' for key 'PRIMARY'") {
                swal('Student Already Exists!', 'Re-Check Student ID!', 'error')
            } 
            if(Object.keys(data).includes('affectedRows')) {
                document.querySelectorAll('input.newStuData').forEach(input=>{
                    input.value = ''
                })
                changeState('none', 'addStudentDiv')
                popup('Student Added Successfully', 'Add New Student', loadAddStudentWindow)
            }
        }).catch(err=>{
            console.log(err)
        })
    }
}
async function loadUpdateStudentWindow(){
    const currUserID = document.getElementById('pop-entry').value
    if (currUserID == '') {
        swal('Field Required!', 'Please Enter Student ID!', 'error')
    } else {
        changeState('none', 'pop-up')
        changeState('block', 'updatestudent-div')
        setCountryDropDown()
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
                } 
            } 
            document.getElementById('Save').style.display = 'block';
        }).catch((err) => {
            console.log(err)
        });
    }
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
function setState(country) {
    // console.log(document.getElementById('Country').value)
    const State = document.getElementById('State')
    try {
        document.querySelectorAll('option.state').forEach(option => {
            State.removeChild(option)
        })
        if (country == undefined) {
            country = document.getElementById('Country').value
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
function updateStudentData() {
    const data = []
    document.querySelectorAll('.inp').forEach(inp=>{
        if (inp.value == '') {
            data.push(null)
        } else {
            data.push(inp.value)
        }
    })
    console.log(data)
    fetch(`${host}/updateStudentData`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(response=>response.json())
    .then(data=>{
        console.log(data)
    })
    
}
function popup(msg, btnText, func, inp=false) {
    document.getElementById('pop-up').style.display = 'block'
    document.getElementById('pop-up-msg').innerHTML = msg
    document.getElementById('backButton').innerHTML = btnText
    document.getElementById('backButton').addEventListener('click', func)
    if (inp==true) {
        document.getElementById('pop-entry').style.display = 'block'
    }
}

// document.addEventListener("DOMContentLoaded", function () {
//     const profileImage = document.getElementById("profileImage");
//     const profileUpload = document.getElementById("profileUpload");
//     const profileDropdown = document.getElementById("profileDropdown");
//     const hamburger = document.getElementById("hamburger");
//     const navLinks = document.getElementById("navLinks");
//     document.getElementById("complain").style.display = "none";

//     // Toggle dropdown on profile image click
//     profileImage.addEventListener("click", function (event) {
//         profileDropdown.classList.toggle("active");
//         navLinks.classList.remove("active");
//         // event.stopPropagation();
//     });
 
//     // Close dropdown when clicking outside
//     document.addEventListener("click", function (event) {
//         if (!profileImage.contains(event.target) && !profileDropdown.contains(event.target)) {
//             profileDropdown.classList.remove("active");
//         }
//     });
    

//     // Profile Picture Upload
//     profileUpload.addEventListener("change", function () {
//         const file = this.files[0];

//         if (file) {
//             const reader = new FileReader();

//             reader.onload = function (event) {
//                 profileImage.src = event.target.result;
//             };

//             reader.readAsDataURL(file);
//         }
//     });

//     // Toggle hamburger menu
//     hamburger.addEventListener("click", function () {
//         navLinks.classList.toggle("active");
//     });

//     // Close menu when clicking outside
//     document.addEventListener("click", function (event) {
//         if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
//             navLinks.classList.remove("active");
//         }
//     });
// });

// document.getElementById("addStudentBtn").addEventListener("click", function () {
//     document.getElementById("studentForm").style.display = "block";
//     document.getElementById("sum_container").style.display = "none";
//     document.getElementById("complain").style.display = "none";


// });
// function closeForm() {
//     document.getElementById("studentForm").style.display = "none";
// }


// //  Start Attendance summary
// function showAttendanceSummary() {
//     document.getElementById('sum_container').style.display = 'block';
//     document.getElementById("studentForm").style.display = "none";
//     document.getElementById("complain").style.display = "none";

// }
// document.addEventListener("DOMContentLoaded", function () {
//     let attendanceData = [
//         { srNo: 1, studentId: "STU001", roomNo: "101", day: "Monday", time: "10:00 AM", status: "Present", date: "2024-04-01" },
//         { srNo: 2, studentId: "STU002", roomNo: "102", day: "Tuesday", time: "10:00 AM", status: "Absent", date: "2024-04-02" },
//         { srNo: 3, studentId: "STU003", roomNo: "103", day: "Wednesday", time: "10:00 AM", status: "Present", date: "2024-04-03" },
//         { srNo: 4, studentId: "STU004", roomNo: "104", day: "Thursday", time: "10:00 AM", status: "Present", date: "2024-04-04" },
//         { srNo: 5, studentId: "STU005", roomNo: "105", day: "Friday", time: "10:00 AM", status: "Absent", date: "2024-04-05" }
//     ];

//     let tableBody = document.getElementById("attendanceTable");

//     function loadAttendance(data) {
//         tableBody.innerHTML = ""; // Clear table
//         if (data.length === 0) {
//             tableBody.innerHTML = `<tr><td colspan="7">No records found</td></tr>`; // Show message if no data found
//             return;
//         }
//         data.forEach(entry => {
//             let row = `
//                 <tr>
//                     <td>${entry.srNo}</td>
//                     <td>${entry.studentId}</td>
//                     <td>${entry.roomNo}</td>
//                     <td>${entry.day}</td>
//                     <td>${entry.time}</td>
//                     <td>${entry.status}</td>
//                     <td>${entry.date}</td>
//                 </tr>
//             `;
//             tableBody.innerHTML += row;
//         });
//     }

//     loadAttendance(attendanceData); // Load all data initially

//     window.filterAttendance = function () {
//         let fromDate = document.getElementById("fromDate").value;
//         let toDate = document.getElementById("toDate").value;
//         let studentIdSearch = document.getElementById("searchStudent").value.trim().toUpperCase(); // Convert to uppercase for matching

//         let filteredData = attendanceData.filter(entry => {
//             return (
//                 (!studentIdSearch || entry.studentId.includes(studentIdSearch)) &&
//                 (!fromDate || entry.date >= fromDate) &&
//                 (!toDate || entry.date <= toDate)
//             );
//         });

//         loadAttendance(filteredData);
//     };
// });

// //  end Attendance summary

// // Start Student complaint
// function showStudentcomplaint() {
//     document.getElementById('sum_container').style.display = 'none';
//     document.getElementById("studentForm").style.display = "none";
//     document.getElementById("complain").style.display = "block";
// }

// document.addEventListener("DOMContentLoaded", function() {
//     let complaintData = [
//         { date: "2024-03-22", studentId: "BC2022004", complaintType: "Electricity Issue", warden: "Warden 1", description: "Power cut in room", file: "document.pdf" },
//         { date: "2024-03-23", studentId: "BC2022154", complaintType: "Water Issue",       warden: "Warden 2", description: "No water supply in bathroom", file: "document.docx" },
//         { date: "2024-03-24", studentId: "BC2022233", complaintType: "Mess Food Issue",   warden: "Warden 3", description: "Food quality is not good", file: "report.pdf" },
//         { date: "2024-03-25", studentId: "BC2022272", complaintType: "Water Issue",       warden: "Warden 4", description: "FAn does'nt working", file: "imag.png" },

//         { date: "2024-03-26", studentId: "BC2022433", complaintType: "Mess Food Issue",   warden: "Warden 5", description: "Room is dirty Room is dirtyRoom is dirtyRoom is dirtyRoom is dirtyRoom is dirtyRoom is dirtyRoom is dirtyRoom is dirtyRoom is dirtyRoom is dirty", file: "imagge.jpeg" },
//         { date: "2024-03-26", studentId: "BC2022433", complaintType: "Mess Food Issue",   warden: "Warden 5", description: "Room is dirty ", file: "imagge.jpeg" },

//      ];

//     let tableBody = document.getElementById("complaint_Table");
    

//     complaintData.forEach(entry => {
//         let row = `
//             <tr> 

//                 <td>${entry.date}</td>
//                 <td>${entry.studentId}</td>
//                 <td>${entry.complaintType}</td>
//                 <td>${entry.warden}</td>
//                 <td><textarea class="description-box" readonly>${entry.description}</textarea></td>                       
//                 <td><a href="${entry.file}" download><img src="eye.png" alt="View" width="20"></a></td>
//             </tr>
//         `;
//         tableBody.innerHTML += row;
//     });
// });


// // End Student complaint

