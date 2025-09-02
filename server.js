const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { HttpsProxyAgent } = require("https-proxy-agent");

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Proxy settings for different countries
const proxySettings = {
  kazakhstan: {
    host: "brd.superproxy.io",
    port: 33335,
    auth: {
      username: "brd-customer-hl_ba0676a7-zone-isp_proxy2",
      password: "s86stp7iqs7i",
    },
  },
  turkey: {
    host: "brd.superproxy.io",
    port: 33335,
    auth: {
      username: "brd-customer-hl_ba0676a7-zone-isp_proxy_turkey",
      password: "rnvea29aev6m",
    },
  },
};

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
