package config

import (
	"io"
	"io/ioutil"
	"time"

	"github.com/pkg/errors"
	"gitlab.com/wpetit/goweb/logger"

	"github.com/caarlos0/env/v6"
	"gopkg.in/yaml.v2"
)

type Config struct {
	Debug    bool           `yaml:"debug" env:"DEBUG"`
	Log      LogConfig      `yaml:"log"`
	HTTP     HTTPConfig     `yaml:"http"`
	Database DatabaseConfig `yaml:"database"`
}

// NewFromFile retrieves the configuration from the given file
func NewFromFile(filepath string) (*Config, error) {
	config := NewDefault()

	data, err := ioutil.ReadFile(filepath)
	if err != nil {
		return nil, errors.Wrapf(err, "could not read file '%s'", filepath)
	}

	if err := yaml.Unmarshal(data, config); err != nil {
		return nil, errors.Wrapf(err, "could not unmarshal configuration")
	}

	return config, nil
}

type HTTPConfig struct {
	Address                 string     `yaml:"address" env:"HTTP_ADDRESS"`
	CookieAuthenticationKey string     `yaml:"cookieAuthenticationKey" env:"HTTP_COOKIE_AUTHENTICATION_KEY"`
	CookieEncryptionKey     string     `yaml:"cookieEncryptionKey" env:"HTTP_COOKIE_ENCRYPTION_KEY"`
	CookieMaxAge            int        `yaml:"cookieMaxAge" env:"HTTP_COOKIE_MAX_AGE"`
	TemplateDir             string     `yaml:"templateDir" env:"HTTP_TEMPLATE_DIR"`
	PublicDir               string     `yaml:"publicDir" env:"HTTP_PUBLIC_DIR"`
	FrontendURL             string     `yaml:"frontendURL" env:"HTTP_FRONTEND_URL"`
	CORS                    CORSConfig `yaml:"cors"`
}

type CORSConfig struct {
	AllowedOrigins   []string `yaml:"allowedOrigins" env:"HTTP_CORS_ALLOWED_ORIGINS"`
	AllowCredentials bool     `yaml:"allowCredentials" env:"HTTP_CORS_ALLOW_CREDENTIALS"`
}

type LogConfig struct {
	Level  logger.Level  `yaml:"level"  env:"LOG_LEVEL"`
	Format logger.Format `yaml:"format" env:"LOG_FORMAT"`
}

type DatabaseConfig struct {
	DSN string `yaml:"dsn" env:"DATABASE_DSN"`
}

func NewDumpDefault() *Config {
	config := NewDefault()
	return config
}

func NewDefault() *Config {
	return &Config{
		Debug: false,
		Log: LogConfig{
			Level:  logger.LevelInfo,
			Format: logger.FormatHuman,
		},
		HTTP: HTTPConfig{
			Address:                 ":8081",
			CookieAuthenticationKey: "",
			CookieEncryptionKey:     "",
			CookieMaxAge:            int((time.Hour * 1).Seconds()), // 1 hour
			TemplateDir:             "template",
			PublicDir:               "public",
			FrontendURL:             "http://localhost:8080",
			CORS: CORSConfig{
				AllowedOrigins:   []string{"http://localhost:8080"},
				AllowCredentials: true,
			},
		},
		Database: DatabaseConfig{
			DSN: "host=localhost database=daddy",
		},
	}
}

func Dump(config *Config, w io.Writer) error {
	data, err := yaml.Marshal(config)
	if err != nil {
		return errors.Wrap(err, "could not dump config")
	}

	if _, err := w.Write(data); err != nil {
		return err
	}

	return nil
}

func WithEnvironment(conf *Config) error {
	if err := env.Parse(conf); err != nil {
		return err
	}

	return nil
}
