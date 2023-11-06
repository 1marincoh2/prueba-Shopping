import  { ToastMessageOptions } from 'primevue/toast';
import { useToast as useNotify } from "primevue/usetoast";

export function useToast(){
    const toast = useNotify();
    const show = (severity: ToastMessageOptions["severity"], summary: string, detail: string) => {
        toast.add({ severity: severity, summary: summary, detail: detail, life: 3000 });
    };
    return {show}
}