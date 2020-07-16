package config

import (
	"io"
	"io/ioutil"

	"github.com/pkg/errors"
	"gopkg.in/yaml.v2"
)

// Config structure definition
type Config struct {
	Env     string      `yaml:"env"`
	WorkDir string      `yaml:"working_dir"`
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
		WorkDir: "./cmd/server/",
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
