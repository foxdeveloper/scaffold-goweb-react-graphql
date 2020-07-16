package build

import (
	"github.com/pkg/errors"
	"gitlab.com/wpetit/goweb/service"
)

// ServiceName defined the service name
const ServiceName service.Name = "build"

// Must retrieves the user repository in the given service container or panic otherwise
func Must(container *service.Container) *Info {
	srv, err := from(container)
	if err != nil {
		panic(err)
	}

	return srv
}

func from(container *service.Container) (*Info, error) {
	service, err := container.Service(ServiceName)
	if err != nil {
		return nil, errors.Wrapf(err, "error while retrieving '%s' service", ServiceName)
	}

	srv, ok := service.(*Info)
	if !ok {
		return nil, errors.Errorf("retrieved service is not a valid '%s' service", ServiceName)
	}

	return srv, nil
}
