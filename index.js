const express = require("express");
const app = express();
app.use(express.json());

const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS))
});
const db = admin.firestore();

app.post("/ton", async (req, res) => {
    const tx = req.body;

    const memo = tx.message;
    const amount = Number(tx.amount) / 1e9;

    await db.collection("payments").doc(memo).set({
        amount: amount,
        time: Date.now()
    });

    res.send("OK");
});

app.listen(3000, () => console.log("Server running"));
