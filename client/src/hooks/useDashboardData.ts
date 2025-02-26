import { useQuery } from "@tanstack/react-query";
import { axiosPrivate } from "../api/axiosInstance";
import { DashboardData } from "../types/interface";

const fetchDashboardData = async (): Promise<DashboardData> => {
    const response = await axiosPrivate.get('/admin/dashboard');
    return response.data.data;  
  };
  
  export const useDashboardData = () => {
    return useQuery<DashboardData, Error>({ queryKey: ['dashboardData'], queryFn: fetchDashboardData });
  };