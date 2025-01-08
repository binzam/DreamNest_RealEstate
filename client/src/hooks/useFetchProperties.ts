import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useSelector } from "react-redux";
import { fetchProperties } from "../store/slices/propertySlice";

export const useFetchProperties = (type: string | undefined) => {
    const dispatch = useDispatch<AppDispatch>();
    const { properties, loading, error } = useSelector(
      (state: RootState) => state.properties
    );
  
    useEffect(() => {
      if (!properties) {
        dispatch(fetchProperties());
      }
    }, [type, properties, dispatch]);
  
    return { properties, loading, error };
  };