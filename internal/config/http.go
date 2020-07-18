package config

import (
	"time"
)

// HTTPConfig definition
type HTTPConfig struct {
	Address                 string `yaml:"address" env:"HTTP_ADDRESS"`
	CookieAuthenticationKey string `yaml:"cookieAuthenticationKey" env:"HTTP_COOKIE_AUTHENTICATION_KEY"`
	CookieEncryptionKey     string `yaml:"cookieEncryptionKey" env:"HTTP_COOKIE_ENCRYPTION_KEY"`
	CookieMaxAge            int    `yaml:"cookieMaxAge" env:"HTTP_COOKIE_MAX_AGE"`
	PublicDir               string `yaml:"publicDir" env:"HTTP_PUBLIC_DIR"`
	CRTFile                 string `yaml:"ssl_crt_path"`
	KeyFile                 string `yaml:"ssl_key_path"`
}

// DefaultHTTPConfig return the default configuration
func DefaultHTTPConfig() *HTTPConfig {
	return &HTTPConfig{
		Address:                 ":9000",
		CookieAuthenticationKey: "",
		CookieEncryptionKey:     "",
		CookieMaxAge:            int((time.Hour * 1).Seconds()),
		CRTFile:                 "./data/server.crt",
		KeyFile:                 "./data/server.key",
		PublicDir:               "public/dist",
	}
}

// GetBaseURL return the application base URL
func (h *HTTPConfig) GetBaseURL() string {
	return h.Address
}
