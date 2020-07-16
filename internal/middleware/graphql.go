package middleware

import (
	"context"
	"net/http"

	"github.com/graphql-go/handler"
)

// GraphQLHTTP expose the graphql middleware
func GraphQLHTTP(h *handler.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		ctx := context.WithValue(r.Context(), KeyRequest, r)
		ctx = context.WithValue(ctx, KeyResponseWriter, w)
		h.ContextHandler(ctx, w, r)
	}
}
