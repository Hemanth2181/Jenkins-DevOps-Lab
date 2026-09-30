const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;
const ENVIRONMENT = process.env.ENVIRONMENT || "DEV";
const VERSION = process.env.APP_VERSION || "1.0.0";

app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Jenkins DevOps Lab</title>
            <style>
                body {
                    background: #080808;
                    color: white;
                    font-family: Arial;
                    text-align: center;
                    padding-top: 100px;
                }

                .card {
                    display: inline-block;
                    padding: 40px;
                    border: 1px solid #444;
                    border-radius: 20px;
                    background: #151515;
                }

                .status {
                    color: #00ff88;
                    font-size: 25px;
                }
            </style>
        </head>

        <body>
            <div class="card">
                <h1>🚀 DevOps Dashboard</h1>
                <h2>Jenkins CI/CD Lab</h2>

                <p>Environment:
                    <strong>${ENVIRONMENT}</strong>
                </p>

                <p>Version:
                    <strong>${VERSION}</strong>
                </p>

                <p class="status">
                    ● APPLICATION HEALTHY
                </p>
            </div>
        </body>
        </html>
    `);
});

app.get("/health", (req, res) => {
    res.json({
        status: "UP",
        environment: ENVIRONMENT,
        version: VERSION
    });
});

app.listen(PORT, () => {
    console.log(`Application running on port ${PORT}`);
});
