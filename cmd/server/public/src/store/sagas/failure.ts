import { Action } from "redux";
import { ApolloError } from "apollo-boost";

interface FailureAction extends Action {
    error: Error
}

export function* handleFailedActionSaga(action: FailureAction) {
    if (isApolloError(action.error)) {
        const apolloError = action.error as ApolloError
        if (isUnauthorizedError(apolloError)) {
            window.location.hash = "#/login";
            return
        }
    }
    console.error(action.error);
}

export function isApolloError(err : ApolloError | Error) : boolean {
    return "graphQLErrors" in err
}

export function isUnauthorizedError(error : ApolloError) : boolean {
    for (let err, i = 0; (err = error.graphQLErrors[i]); i++) {
            if (err.extensions && err.extensions.code === 'unauthorized') {
            return true
        }
    }
    return false
}
