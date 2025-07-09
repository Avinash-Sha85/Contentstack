const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Content-Security-Policy",
    value: `frame-ancestors 'self' https://app.contentstack.com https://app.eu.contentstack.com https://app-na1.contentstack.com https://eu.contentstack.com`,
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "no-referrer" },
  { key: "Permissions-Policy", value: "microphone=(), camera=()" },
];

const securityHeadersConfig = async () => [
  {
    source: "/:path*",
    headers: securityHeaders,
  },
];

module.exports = securityHeadersConfig;
