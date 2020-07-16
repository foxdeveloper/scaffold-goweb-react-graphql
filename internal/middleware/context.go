package middleware

import (
	"context"
	"net/http"

	"github.com/pkg/errors"
)

const (
	// KeyRequest -
	KeyRequest ContextKey = "request"
	// KeyResponseWriter -
	KeyResponseWriter ContextKey = "responseWriter"
)

// ContextKey Une clé permettant de récupérer des données depuis le contexte d'une requête HTTP
type ContextKey string

// Request -
func Request(ctx context.Context) *http.Request {
	req, ok := ctx.Value(KeyRequest).(*http.Request)
	if !ok {
		panic(errors.Errorf("value with key '%s' is not a valid request", KeyRequest))
	}
	return req
}

// ResponseWriter -
func ResponseWriter(ctx context.Context) http.ResponseWriter {
	w, ok := ctx.Value(KeyResponseWriter).(http.ResponseWriter)
	if !ok {
		panic(errors.Errorf("value with key '%s' is not a valid response writer", KeyResponseWriter))
	}
	return w
}
