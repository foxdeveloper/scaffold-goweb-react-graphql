package config

import "gitlab.com/wpetit/goweb/service"

func ServiceProvider(config *Config) service.Provider {
	return func(ctn *service.Container) (interface{}, error) {
		return config, nil
	}
}
