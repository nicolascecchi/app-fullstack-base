class Main implements EventListenerObject, HandlerPost{ 
    public myFramework: MyFramework;

    constructor(){
        this.myFramework = new MyFramework();
    }
    public main(): void {
        let xhr: XMLHttpRequest = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {

                        // Llega la respuesta con todos los elementos
                        let listaDis: Array<Device> = JSON.parse(xhr.responseText);
                        
                        for (let disp of listaDis ){
                        
                            let listaDisp = this.myFramework.getElementById("listaDisp");
                            listaDisp.innerHTML += `<li class="collection-item avatar">
                            <img src="./static/images/lightbulb.png" alt="" class="circle">
                            <span class="nombreDisp">${disp.name} 
                                <a id = "btn-del-${disp.id}" class="btn-floating btn-small waves-effect waves-red btn-delete-device" href="#modal-eliminar">
                                <i id ="delete-${disp.id}" class="small material-icons">delete</i></a>
                            </span>
                            <p>
                                ${disp.description}
                            </p>
                                                     
                            <a href="#!" class="secondary-content">
                                <div class="switch">
                                    <label>
                                      Off
                                      <input id="disp-${disp.id}-state" type="checkbox">
                                      <span class="lever"></span>
                                      On
                                    </label>
                                  </div>
                            </a>
                          </li>`;
                                                     
                        }
                        for (let disp of listaDis) {
                            let delDisp = this.myFramework.getElementById("btn-del-" + disp.id);
                            delDisp.addEventListener("click",this);
                            //console.log(delDisp);
                        }

                        for (let disp of listaDis) {
                            let checkDisp = this.myFramework.getElementById("disp-" + disp.id +"-state");
                            checkDisp.addEventListener("click", this);
                            //console.log(checkDisp);
                        }
                    } 
                     else {
                        alert("error!!");
                        }
                }
            }
            xhr.open("GET","http://localhost:8000/devices",true);
            xhr.send();
    console.log(this.myFramework)
    this.myFramework.noHaceNada();     
    }


    public handleEvent(ev: Event) {
        console.log(ev);
        let objetoClick: HTMLElement = <HTMLElement>ev.target;

        // Acción: Cambiar estado del dispositivo (on/off)
        if (objetoClick.id.match(/disp-\d+-state/)){         
            this.changeDevState(ev, objetoClick)

        }else if (objetoClick.id.split("-")[0] == "delete"){
            let id = objetoClick.id.split("-")[1];
            this.delDevConfirm(ev=ev,id=id);

        }else{
            console.log("Algo salió mal")
        }
    }

    public changeDevState(ev:Event,objetoClick: HTMLElement){
        // Toma la checkbox donde se hizo click
        let checkBox: HTMLInputElement = <HTMLInputElement>ev.target;
        // Asigna al dispositivo el estado de la checkbox
        let datos = {"id":checkBox.id,"status":checkBox.checked};
        // Modifica el estado del dispositivo con método POST
        this.myFramework.requestPOST("http://localhost:8000/devices",this,datos);      
    }

    // Método del main para eliminar dispositivos
    public delDevConfirm(ev: Event, id:string){
        //Modal de eliminar dispositivos
        var modal = document.getElementById("modal-eliminar");
        
        // Operación de eliminar el dispositivo por id con método post
        var deleteDevHandler= (ev:Event,id:string)=>{
            let deleteDevice = {"id":id}
            this.myFramework.requestPOST("http://localhost:8000/devices/delete/",this,deleteDevice);
                    }
        
        // Confirmar operación
        var confirmDelete = (event:Event) => deleteDevHandler(event, id); 
        var delConfirm = document.getElementById("confirma-eliminar");
        delConfirm.addEventListener("click",confirmDelete);
        
        // Botón de cancelar para cerrar la operación
        var cancel = document.getElementById("cancela-eliminar");
        cancel.addEventListener("click", ()=>{modal.style.display= "none";})
        
        // Muestra el modal
        modal.style.display = "block";

    }

    public addDevice(){

    }
    
    responsePost(status: number, response: string) {
        if (response == "eliminado") {
        window.location.href = 'http://localhost:8000/';
        window.location.reload()
        }else {
        console.log("std resp")
        }
    }
}

window.addEventListener("load", ()=> {
    let miObjMain: Main = new Main();
    miObjMain.main();

    // Agrega el event listener para agregar nuevos dispositivos
    let addNewDisp:HTMLElement = miObjMain.myFramework.getElementById("btn-agregar-disp");
    addNewDisp.addEventListener("click", miObjMain.myFramework.newDeviceForm);

    


    // To be implemented -- 
    //let switchAllDisp: HTMLElement = miObjMain.myFramework.getElementById("btn-all-devices");
    //switchAllDisp.addEventListener("dblclick", ()=>{console.log("funcion no implementada")});

    //Close del window    
});
