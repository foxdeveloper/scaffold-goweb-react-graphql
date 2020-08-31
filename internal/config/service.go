package config

import (
	"github.com/pkg/errors"
	"gitlab.com/wpetit/goweb/service"
)

const ServiceName service.Name = "config"

// From retrieves the config service in the given container
func From(container *service.Container) (*Config, error) {
	service, err := container.Service(ServiceName)
	if err != nil {
		return nil, errors.Wrapf(err, "error while retrieving '%s' service", ServiceName)
	}

	srv, ok := service.(*Config)
	if !ok {
		return nil, errors.Errorf("retrieved service is not a valid '%s' service", ServiceName)
	}

	return srv, nil
}

// Must retrieves the config service in the given container or panic otherwise
func Must(container *service.Container) *Config {
	srv, err := From(container)
	if err != nil {
		panic(err)
	}

	return srv
}
