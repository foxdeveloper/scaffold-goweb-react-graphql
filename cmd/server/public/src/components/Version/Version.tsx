import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers/root';
import { fetchAPIAction } from '../../store/actions/api';

export const Version: FunctionComponent<{}> = () => {
    const dispatch = useDispatch()
    const api = useSelector((state: RootState) => state.api)

    useEffect(() => {
      dispatch(fetchAPIAction())
    }, [])

    return(
        <>
            <span>v{api.projectVersion}-{api.gitRef}</span>
        </>
    )

}
