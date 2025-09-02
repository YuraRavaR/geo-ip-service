# Geo IP Lookup with Proxy Support

This application allows you to look up IP location information using different country proxies.

## Clone Repository

To get a local copy of this project, run:

```bash
git clone https://github.com/YuraRavaR/geo-ip-service.git
cd geo-ip-service
```

## Setup Instructions

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm start
```

3. Open your web browser and go to:

```
http://localhost:3000
```

## Features

- Geo IP lookup using ip-api.com
- Default option without proxy
- Proxy support for different countries (Kazakhstan, Turkey)
- Simple and responsive UI

## How It Works

The application uses a Node.js server to handle requests to the IP-API service.
When you select a country and click "Get Location Data", the request is processed as follows:

- **Default (No Proxy)**: Direct request to IP-API showing your actual location
- **Country-specific**: Request sent through a proxy server corresponding to the selected country, giving you location information as if you were browsing from that country

## Proxy Configuration

Proxy settings are configured in the `proxySettings.js` file. You can add more proxy configurations
for additional countries as needed.

⚠️ **Important**: The default proxy settings are not valid and are provided as examples only. You must update the proxy configuration in `proxySettings.js` with your own valid proxy details before using.
