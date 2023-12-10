import Swal, {SweetAlertPosition, SweetAlertOptions} from "sweetalert2";

export function toast(message:string, type = 'success', timer = 2500, position = 'top-end') {
  
  const Toast = Swal.mixin({
    toast: true,
    position: position as SweetAlertPosition,
    showConfirmButton: false,
    timer: timer
  })
  
  Toast.fire({
      type: type,
      title: message
  } as SweetAlertOptions);
}