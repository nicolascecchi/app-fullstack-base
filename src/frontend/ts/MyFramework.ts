class MyFramework{

  public getElementsByClassName(classname:string): HTMLCollection{
    return document.getElementsByClassName(classname);
  }

  public getElementById(id:string): HTMLElement{
    return document.getElementById(id);
  }

  public requestPOST(url: string, response: HandlerPost, datos: any) {
    let xlm: XMLHttpRequest = new XMLHttpRequest();

    xlm.onreadystatechange = () => {
      if (xlm.readyState == 4) {
        response.responsePost(xlm.status, xlm.responseText);
      }
    }
    xlm.open("POST", url, true);
    xlm.setRequestHeader("Content-Type", "application/json");
    xlm.send(JSON.stringify(datos));
  }
  public editDeviceForm(id:string) {
    
  }

  public newDeviceForm(){
    console.log("Esto se ejecutó en modal");
    // Get the modal
    var modal = document.getElementById("modal-new-device");
    // Get the button that opens the modal
    var btn = document.getElementById("agregar-disp");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    // When the user clicks on the button, open the modal
    modal.style.display = "block";

    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }

  public deleteDeviceConfirmation(){
    console.log("Ejecución modal eliminar");
    // Get the modal
    var modal = document.getElementById("modal-eliminar");
    // Get the button that opens the modal
    // var btn_eliminar = document.getElementById("confirma-eliminar");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    // When the user clicks on the button, open the modal
    modal.style.display = "block";

    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }
}