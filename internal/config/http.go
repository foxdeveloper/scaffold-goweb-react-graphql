package config

import (
	"fmt"
	"time"
)

// HTTPConfig definition
type HTTPConfig struct {
	Address                 string `yaml:"address"`
	Port                    string `yaml:"port"`
	CookieAuthenticationKey string `yaml:"cookie_authentication_key"`
	CookieEncryptionKey     string `yaml:"cookie_encryption_key"`
	CookieMaxAge            int    `yaml:"cookie_max_age"`
	CRTFile                 string `yaml:"ssl_crt_path"`
	KeyFile                 string `yaml:"ssl_key_path"`
	PublicDir               string `yaml:"public_dir"`
}

// DefaultHTTPConfig return the default configuration
func DefaultHTTPConfig() *HTTPConfig {
	return &HTTPConfig{
		Address:                 "127.0.0.1",
		Port:                    "9000",
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
	return fmt.Sprintf("%s:%s", h.Address, h.Port)
}
