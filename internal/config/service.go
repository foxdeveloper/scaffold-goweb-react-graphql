package config

import (
	"github.com/pkg/errors"
	"gitlab.com/wpetit/goweb/service"
)

// ServiceName defined the service name
const ServiceName service.Name = "config"

// Must return service from container
func Must(container *service.Container) *Config {
	srv, err := from(container)
	if err != nil {
		panic(err)
	}

	return srv
}

func from(container *service.Container) (*Config, error) {
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
