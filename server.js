const express = require("express");
const axios = require("axios");
const cors = require("cors");
const proxySettings = require("./proxySettings");

const app = express();
const port = 3000;

// API endpoint to get location data through proxy
app.get("/api/geo/:country", async (req, res) => {
  const country = req.params.country.toLowerCase();
  console.log(`Received request for country: ${country}`);

  try {
    // For default option - make direct request without proxy
    if (country === "default") {
      console.log("Using default connection without proxy");
      const response = await axios.get("http://ip-api.com/json/");
      return res.json(response.data);
    }

    // Check if we have proxy settings for the requested country
    if (!proxySettings[country]) {
      console.log(`No proxy settings found for country: ${country}`);
      return res
        .status(400)
        .json({ error: "Proxy for this country not available" });
    }

    console.log(
      `Using proxy settings for country: ${country}`,
      proxySettings[country]
    );

    // Get the proxy settings for the selected country
    const proxyConfig = proxySettings[country];

    // Configure axios to use the proxy properly
    const response = await axios.get("http://ip-api.com/json/", {
      proxy: {
        host: proxyConfig.host,
        port: proxyConfig.port,
        auth: proxyConfig.auth,
        protocol: "http",
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(
      `Error fetching data through ${country} proxy:`,
      error.message
    );
    res.status(500).json({
      error: "Failed to fetch data through proxy",
      details: error.message,
    });
  }
});

// Serve the HTML file
app.use(express.static("."));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
