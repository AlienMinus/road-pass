// Configuration file - loads environment variables
// In production, these would come from backend or proper env loading

// Default configuration (fallback)
const DEFAULT_CONFIG = {
  ADMIN_ID: 'admin',
  ADMIN_PASSWORD: '12345',
  API_URL: 'http://localhost:3000/api/transit-pass'
};

// Try to fetch config from server (best practice for frontend)
async function loadConfig() {
  try {
    const response = await fetch('/api/config');
    if (response.ok) {
      const config = await response.json();
      return config;
    }
  } catch (error) {
    console.log('Config endpoint not available, using defaults');
  }
  
  return DEFAULT_CONFIG;
}

// Global config object
let APP_CONFIG = DEFAULT_CONFIG;

// Initialize config on page load
document.addEventListener('DOMContentLoaded', async () => {
  APP_CONFIG = await loadConfig();
  console.log('App configured with API URL:', APP_CONFIG.API_URL);
});

// Export for use in other scripts (for modules)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { APP_CONFIG, loadConfig, DEFAULT_CONFIG };
}
