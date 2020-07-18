package config

import (
	"io"
	"io/ioutil"

	"github.com/caarlos0/env/v6"
	"github.com/pkg/errors"
	"gopkg.in/yaml.v2"
)

// Config structure definition
type Config struct {
	Debug   bool        `yaml:"debug" env:"DEBUG"`
	Env     string      `yaml:"env" env:="ENV"`
	WorkDir string      `yaml:"working_dir" env:"WORKING_DIR"`
	HTTP    *HTTPConfig `yaml:"http"`
}

// NewFromFile return the configuration from the given YAML file or an error
func NewFromFile(filepath string) (*Config, error) {
	config := DefaultConfig()

	data, err := ioutil.ReadFile(filepath)
	if err != nil {
		return nil, errors.Wrapf(err, "could not read file '%s'", filepath)
	}

	if err := yaml.Unmarshal(data, config); err != nil {
		return nil, errors.Wrapf(err, "could not unmarshal configuration")
	}

	return config, nil
}

// DefaultConfig return the default configuration
func DefaultConfig() *Config {
	return &Config{
		Env:     "dev",
		Debug:   true,
		WorkDir: "",
		HTTP:    DefaultHTTPConfig(),
	}
}

// Dump return the configuration dump
func (c *Config) Dump(w io.Writer) error {
	data, err := yaml.Marshal(c)
	if err != nil {
		return errors.Wrapf(err, "could not dump config")
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
