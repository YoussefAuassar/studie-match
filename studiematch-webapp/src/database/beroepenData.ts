const beroepen = [
	{
		id: 1,
		naam_beroep: "UI Designer",
		afbeelding: "ui-designer.png",
		beschrijving_beroep:
			"Een UI-designer, of User Interface-designer, is gespecialiseerd in het vormgeven van digitale interfaces zoals websites, apps of software. Het doel is om schermen te ontwerpen die er aantrekkelijk uitzien én gemakkelijk te gebruiken zijn. Daarbij staat de ervaring van de gebruiker centraal: alles wat je ziet en waar je op klikt, wordt bewust ontworpen om duidelijk, logisch en gebruiksvriendelijk te zijn. Een UI-designer werkt nauw samen met UX-designers en developers om visuele elementen zoals knoppen, iconen, navigatie en typografie af te stemmen op het totaalbeeld van een digitale toepassing. Kleurgebruik, hiërarchie en consistentie zijn daarbij erg belangrijk. De ontwerpen worden uitgewerkt in tools zoals Figma, Adobe XD of Sketch, vaak als interactieve prototypes. Het resultaat is een pixel-perfecte interface die intuïtief aanvoelt én visueel overtuigt.",
		persoonlijkheidstype: ["Artistiek"]
	},
	{
		id: 2,
		naam_beroep: "Grafisch Vormgever",
		afbeelding: "grafisch-vormgever.png",
		beschrijving_beroep:
			"Een grafisch ontwerper is iemand die zich bezighoudt met het visueel vormgeven van ideeën en boodschappen. Met creativiteit en technische vaardigheden vertaalt hij of zij informatie naar ontwerpen die aanspreken, informeren of overtuigen. Dit kunnen allerlei soorten uitingen zijn, zoals logo’s, posters, flyers, verpakkingen, magazines, websites of advertenties. Een goed grafisch ontwerp is niet alleen mooi om naar te kijken, maar ondersteunt ook de communicatie en identiteit van een merk of organisatie. Daarom heeft een grafisch ontwerper een scherp oog voor kleur, typografie, beeld en compositie. Er wordt gewerkt met professionele software zoals Adobe Illustrator, Photoshop of InDesign om ontwerpen tot in de puntjes uit te werken. Uiteindelijk zorgt de ontwerper ervoor dat het resultaat technisch klaar is voor druk of digitale publicatie, zodat het effectief ingezet kan worden in de praktijk.",
		persoonlijkheidstype: ["Artistiek"]
	},
	{
		id: 3,
		naam_beroep: "Motion Designer",
		afbeelding: "motion-designer.png",
		beschrijving_beroep:
			"Een motion designer is gespecialiseerd in het tot leven brengen van grafische elementen via animatie en beweging. Hij of zij ontwerpt bewegende content voor video’s, apps, websites, social media, commercials of titelsequenties. Beweging wordt ingezet om verhalen te versterken, informatie duidelijker te maken of de aandacht van de kijker te trekken. Een goede motion designer combineert grafisch inzicht met technische kennis van animatie. Daarbij wordt vaak gewerkt met software zoals After Effects, Premiere Pro of Cinema 4D. Motion design vraagt ook om gevoel voor timing, ritme en expressie. De designer zorgt ervoor dat elke animatie niet alleen mooi beweegt, maar ook functioneel en betekenisvol is. Zo ontstaat een visuele ervaring die blijft hangen en emoties oproept.",
		persoonlijkheidstype: ["Artistiek"]
	},
	{
		id: 4,
		naam_beroep: "Fashion Designer",
		afbeelding: "fashion-designer.png",
		beschrijving_beroep:
			"Een fashion designer ontwerpt kleding en accessoires die passen bij een bepaalde stijl, doelgroep of trend. Hij of zij vertaalt ideeën, concepten en inspiratiebronnen naar draagbare ontwerpen die creativiteit combineren met functionaliteit. Een fashion designer denkt na over kleuren, stoffen, pasvormen en details om een unieke en herkenbare collectie te creëren. Naast het ontwerpen op papier of digitaal, houdt een fashion designer zich ook bezig met het kiezen van materialen, het maken van prototypes en het begeleiden van het productieproces. Daarbij wordt vaak gewerkt met tekenprogramma’s zoals Adobe Illustrator of CLO 3D. Een sterk modegevoel, gevoel voor trends en oog voor detail zijn essentieel. Het einddoel is om kleding te ontwerpen die niet alleen mooi is, maar ook een verhaal vertelt en mensen aanspreekt.",
		persoonlijkheidstype: ["Artistiek"]
	},
	{
		id: 5,
		naam_beroep: "Performance Artist",
		afbeelding: "performance-artist.png",
		beschrijving_beroep:
			"Een performance artist gebruikt zijn of haar lichaam, stem en aanwezigheid als artistiek middel om ideeën, emoties of maatschappelijke thema’s over te brengen. De uitvoering, vaak live en tijdelijk, staat centraal in het werk. Performance art kan plaatsvinden op een podium, in de publieke ruimte of in een galerie en combineert vaak elementen uit theater, dans, beeldende kunst of muziek. De kracht van performancekunst ligt in de directe interactie met het publiek en de persoonlijke expressie van de maker. Elke performance is uniek en vaak confronterend, poëtisch of experimenteel. Een performance artist werkt conceptueel, zoekt de grenzen van kunst op en stelt vragen over identiteit, cultuur, politiek of het dagelijks leven. Het resultaat is een ervaring die niet alleen wordt bekeken, maar intens wordt beleefd.",
		persoonlijkheidstype: ["Artistiek"]
	},
	{
		id: 6,
		naam_beroep: "Fotograaf",
		afbeelding: "fotograaf.png",
		beschrijving_beroep:
			"Een fotograaf legt beelden vast die een verhaal vertellen, emoties oproepen of een moment bevriezen. Met oog voor compositie, licht, kleur en timing maakt hij of zij foto's die meer zeggen dan woorden. Fotografie kan toegepast worden in uiteenlopende contexten, zoals mode, portret, journalistiek, natuur, reclame of kunst. Naast het nemen van foto’s houdt een fotograaf zich ook bezig met beeldbewerking, kadrering en het kiezen van het juiste materiaal. Vaak wordt gewerkt met professionele camera’s en software zoals Lightroom of Photoshop. Een goede fotograaf combineert techniek met creativiteit en weet exact hoe een beeld het best tot zijn recht komt. Het eindresultaat is niet zomaar een foto, maar een krachtig visueel middel met impact.",
		persoonlijkheidstype: ["Artistiek"]
	},
	{
		id: 7,
		naam_beroep: "Interieurontwerper",
		afbeelding: "fashion-designer.png",
		beschrijving_beroep:
			"Een interieurontwerper richt ruimtes in op een manier die zowel functioneel als esthetisch is. Hij of zij bedenkt creatieve oplossingen voor woon-, werk- of publieke omgevingen en stemt kleuren, meubels, materialen en verlichting zorgvuldig op elkaar af. Het doel is om een ruimte te creëren die past bij de wensen, stijl en leefgewoonten van de gebruiker. Naast het visuele aspect houdt een interieurontwerper ook rekening met indeling, ergonomie, lichtinval en sfeer. Ontwerpen worden vaak uitgewerkt in digitale 2D- of 3D-modellen met software zoals SketchUp, AutoCAD of Vectorworks. Een goed ontwerp verbindt comfort en schoonheid, en maakt van elke ruimte een aangename, doordachte plek waarin mensen zich thuis voelen.",
		persoonlijkheidstype: ["Artistiek"]
	},
	{
		id: 8,
		naam_beroep: "Etaleur",
		afbeelding: "etaleur.png",
		beschrijving_beroep:
			"Een etaleur zorgt ervoor dat winkels en etalages er aantrekkelijk en inspirerend uitzien. Door producten creatief te presenteren, trekt hij of zij de aandacht van voorbijgangers en stimuleert het koopgedrag. Etaleren is meer dan mooi schikken — het gaat om het vertellen van een visueel verhaal dat past bij het merk, het seizoen of een bepaalde campagne. Een etaleur werkt met kleuren, materialen, verlichting, vormen en compositie om sfeer en beleving te creëren. Daarbij is gevoel voor trends, styling en ruimtelijk inzicht onmisbaar. Soms werkt de etaleur ook binnen in de winkel, bijvoorbeeld aan productpresentaties of decoratie. Het eindresultaat is een visuele beleving die klanten verleidt en een winkel tot leven brengt.",
		persoonlijkheidstype: ["Artistiek"]
	}
];

export default beroepen;
