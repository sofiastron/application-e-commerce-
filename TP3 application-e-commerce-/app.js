const { createApp } = Vue;

createApp({
  data() {
    return {
      pieces: [
        {
          "id": 1,
          "nom": "Batterie 12V",
          "prix": 120,
          "categorie": "Électricité",
          "image": "images/moteur.jpg",
          "disponible": true
        },
        {
          "id": 2,
          "nom": "Filtre à huile",
          "prix": 15,
          "categorie": "Filtration",
          "image": "images/moteur.jpg",
          "disponible": true
        },
        {
          "id": 3,
          "nom": "Bougies d'allumage (x4)",
          "prix": 35,
          "categorie": "Moteur",
          "image": "images/moteur.jpg",
          "disponible": true
        },
        {
          "id": 4,
          "nom": "Disques de frein (x2)",
          "prix": 80,
          "categorie": "Freinage",
          "image": "images/moteur.jpg",
          "disponible": true
        },
        {
          "id": 5,
          "nom": "Courroie de distribution",
          "prix": 90,
          "categorie": "Moteur",
          "image": "images/moteur.jpg",
          "disponible": true
        },
        {
          "id": 6,
          "nom": "Pompe à eau",
          "prix": 70,
          "categorie": "Refroidissement",
          "image": "images/moteur.jpg",
          "disponible": true
        },
        {
          "id": 7,
          "nom": "Amortisseurs arrière (x2)",
          "prix": 150,
          "categorie": "Suspension",
          "image": "images/moteur.jpg",
          "disponible": true
        },
        {
          "id": 8,
          "nom": "Filtre à air",
          "prix": 20,
          "categorie": "Filtration",
          "image": "images/moteur.jpg",
          "disponible": true
        },
        {
          "id": 9,
          "nom": "Capteur ABS",
          "prix": 50,
          "categorie": "Sécurité",
          "image": "images/moteur.jpg",
          "disponible": true
        },
        {
          "id": 10,
          "nom": "Radiateur de refroidissement",
          "prix": 130,
          "categorie": "Refroidissement",
          "image": "images/moteur.jpg",
          "disponible": true
        },
        {
          "id": 11,
          "nom": "Alternateur",
          "prix": 200,
          "categorie": "Électricité",
          "image": "images/moteur.jpg",
          "disponible": true
        },
        {
          "id": 12,
          "nom": "Démarreur",
          "prix": 180,
          "categorie": "Électricité",
          "image": "images/moteur.jpg",
          "disponible": true
        },
        {
          "id": 13,
          "nom": "Kit d'embrayage",
          "prix": 220,
          "categorie": "Transmission",
          "image": "images/moteur.jpg",
          "disponible": true
        },
        {
          "id": 14,
          "nom": "Injecteur de carburant",
          "prix": 110,
          "categorie": "Moteur",
          "image": "images/moteur.jpg",
          "disponible": true
        },
        {
          "id": 15,
          "nom": "Pompe à carburant",
          "prix": 90,
          "categorie": "Carburant",
          "image": "images/moteur.jpg",
          "disponible": true
        },
        {
          "id": 16,
          "nom": "Capteur de pression des pneus (TPMS)",
          "prix": 45,
          "categorie": "Sécurité",
          "image": "images/moteur.jpg",
          "disponible": true
        },
        {
          "id": 17,
          "nom": "Rétroviseur extérieur",
          "prix": 60,
          "categorie": "Carrosserie",
          "image": "images/moteur.jpg",
          "disponible": true
        },
        {
          "id": 18,
          "nom": "Échappement complet",
          "prix": 250,
          "categorie": "Échappement",
          "image": "images/moteur.jpg",
          "disponible": true
        },
        {
          "id": 19,
          "nom": "Vanne EGR",
          "prix": 140,
          "categorie": "Moteur",
          "image": "images/moteur.jpg",
          "disponible": true
        },
        {
          "id": 20,
          "nom": "Turbo",
          "prix": 400,
          "categorie": "Moteur",
          "image": "images/moteur.jpg",
          "disponible": true
        },
        {
          "id": 21,
          "nom": "Joint de culasse",
          "prix": 75,
          "categorie": "Moteur",
          "image": "images/moteur.jpg",
          "disponible": true
        },
        {
          "id": 22,
          "nom": "Boîtier de direction",
          "prix": 300,
          "categorie": "Direction",
          "image": "images/moteur.jpg",
          "disponible": true
        },
        {
          "id": 23,
          "nom": "Silent bloc de suspension",
          "prix": 35,
          "categorie": "Suspension",
          "image": "images/moteur.jpg",
          "disponible": true
        },
        {
          "id": 24,
          "nom": "Cardan de transmission",
          "prix": 160,
          "categorie": "Transmission",
          "image": "images/moteur.jpg",
          "disponible": true
        },
        {
          "id": 25,
          "nom": "Capteur de position vilebrequin",
          "prix": 50,
          "categorie": "Moteur",
          "image": "images/moteur.jpg",
          "disponible": true
        }
      ],
      recherche: '',
      categorieSelectionnee: '',
      disponibiliteSelectionnee: '',
      triPrix: '',
      panier: []
    }
  },
  computed: {
    categories() {
      return [...new Set(this.pieces.map(p => p.categorie))];
    },
    piecesFiltrees() {
      let result = this.pieces;

      if (this.recherche) {
        const rechercheLower = this.recherche.toLowerCase();
        result = result.filter(p => p.nom.toLowerCase().includes(rechercheLower));
      }

      if (this.categorieSelectionnee) {
        result = result.filter(p => p.categorie === this.categorieSelectionnee);
      }

      if (this.disponibiliteSelectionnee) {
        const dispo = this.disponibiliteSelectionnee === 'true';
        result = result.filter(p => p.disponible === dispo);
      }

      if (this.triPrix) {
        result = [...result].sort((a, b) => this.triPrix === 'asc' ? a.prix - b.prix : b.prix - a.prix);
      }

      return result;
    }
  },
  methods: {
    ajouterAuPanier(piece) {
      if (piece.disponible) {
        this.panier.push(piece);
        this.afficherNotification(`${piece.nom} ajouté au panier !`);
      }
    },
    viderPanier() {
      if (confirm('Voulez-vous vraiment vider votre panier ?')) {
        this.panier = [];
        this.afficherNotification('Panier vidé');
      }
    },
    afficherNotification(message) {
      alert(message); // Vous pouvez remplacer par un système de notification plus élégant
    }
  }
}).mount('#app');
