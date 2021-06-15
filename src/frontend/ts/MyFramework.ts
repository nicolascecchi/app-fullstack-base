class MyFramework{
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

  public clickOnEdit(){
    console.log("se pico");
  }

  public newDevice(){
    console.log("Esto se ejecutó en modal");
    // Get the modal
    var modal = document.getElementById("modal1");
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
}