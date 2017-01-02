[{
    produit: "ewe",
    "name": "Les Echos Weekend",
    "parutions": [{
        "date": "20160101",
        "folios": [{
            "page": 01,
            "locked": "false",
            "nomFichier": "SLM_154_TEST_AP_17",
            "user": "apinto",
            "host": "MBP-apinto.local",
            "etapeWorkflow": "SR1",
            "couleur": "#ff8000",
            "dateExport": "09/04/2016",
            "heureExport": "15:26:02"
        }]
    }]
}]


var apiSchema = new mongoose.Schema({
    produit: String,
    name: String,
    parutions: [{
        date: Number,
        folios: [{
            page: Number,
            locked: Boolean,
            nomFichier: String,
            user: String,
            host: String,
            etapeWorkflow: String,
            couleur: String,
            dateExport: String,
            heureExport: String
        }]
    }]
});