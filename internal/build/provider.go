package build

import "gitlab.com/wpetit/goweb/service"

// ServiceProvider provide the given service
func ServiceProvider(projectVersion, gitRef, buildDate string) service.Provider {
	info := &Info{projectVersion, gitRef, buildDate}

	return func(ctn *service.Container) (interface{}, error) {
		return info, nil
	}
}
