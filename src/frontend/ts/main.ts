class Main implements EventListenerObject, HandlerPost{ 
    public mf: MyFramework;
    constructor(){
        this.mf = new MyFramework();
    }
    public initPageApp(): void {
        let xhr: XMLHttpRequest = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {

                        // Llega la respuesta con todos los elementos
                        let listaDis: Array<Device> = JSON.parse(xhr.responseText);
                        
                        for (let disp of listaDis ){
                            if (disp.state == true) {
                                var checked: string = "checked"
                            }
                            else {
                                var checked: string = ""
                            }
                            if (disp.type == 0){
                                var icono = "lightbulb"
                            }else{
                                var icono = "persiana"
                            }
                            let listaDisp = this.mf.getElementById("listaDisp");
                            listaDisp.innerHTML += `<li class="collection-item avatar">
                            <img src="./static/images/${icono}.png" alt="" class="circle">
                            <span class="nombreDisp">${disp.name} 
                                <a id = "btn-del-${disp.id}" class="btn-floating btn-small waves-effect waves-red btn-delete-device">
                                <i id ="delete-${disp.id}" class="small material-icons">delete</i></a>
                            </span>
                            <p>
                                ${disp.description}
                            </p>
                                                     
                            <a href="#!" class="secondary-content">
                                <div class="switch">
                                    <label>
                                      Off
                                      <input id="disp-${disp.id}-state" type="checkbox" ${checked}>
                                      <span class="lever"></span>
                                      On
                                    </label>
                                  </div>
                            </a>
                          </li>`;
                                                     
                        }
                        for (let disp of listaDis) {
                            let delDisp = this.mf.getElementById("btn-del-" + disp.id);
                            delDisp.addEventListener("click",this);
                        }

                        for (let disp of listaDis) {
                            let checkDisp = this.mf.getElementById("disp-" + disp.id +"-state");
                            checkDisp.addEventListener("click", this);
                        }
                    } 
                     else {
                        alert("error!!");
                        }
                }
            }
            xhr.open("GET","http://localhost:8000/devices",true);
            xhr.send();
        
            // Agrega el event listener para agregar nuevos dispositivos
        let addNewDisp:HTMLElement = this.mf.getElementById("btn-agregar-disp");
        addNewDisp.addEventListener("click", this);
        
    }

    public handleEvent(ev: Event) {
        console.log(ev);
        let objetoClick: HTMLElement = <HTMLElement>ev.target;

        // Acción: Cambiar estado del dispositivo (on/off)
        if (objetoClick.id.match(/disp-\d+-state/)){         
            this.changeDevState(ev, objetoClick)
        
        // Handle para eliminar dispositivo
        }else if (objetoClick.id.split("-")[0] == "delete"){
            this.delDevConfirm(ev=ev);
        
        // Handle para agregar nuevo dispositivo
        }else if(objetoClick.id == "btn-agregar-disp"){
            this.newDeviceForm(ev=ev)

        // Handle error en el evento
        }else{
            alert("Algo salió mal")
            console.log(ev.target)
            window.location.replace("http://localhost:8000/");
        }
    }

    public newDeviceForm(ev:Event){
        // Conjunto de operaciones para agregar un nuevo dispositivo

        // Objeto Modal, donde está el formulario para nuevo disp.
        var modal = document.getElementById("modal-new-device");

        // Campos del formulario
        var nameField: HTMLInputElement = <HTMLInputElement> this.mf.getElementById("dev-name");
        var descField: HTMLInputElement = <HTMLInputElement> this.mf.getElementById("description");
        var typeField: HTMLInputElement = <HTMLInputElement> this.mf.getElementById("devType");


        // Botón de cancelar para cerrar la operación
        var cancel = document.getElementById("cancelar-addDev");
        // Cierra el modal y resetea los campos
        cancel.addEventListener("click", ()=>{modal.style.display= "none";
                                            nameField.value = "";
                                            descField.value = "";
                                            //window.location.replace("http://localhost:8000/");
                                            })
        
        // Post para agregar el dispositivo
        var addDevHandler= (ev:Event)=>{
            let devName:string = nameField.value;
            let devDesc:string = descField.value;
            let devType:string = typeField.value;
            let newDevice = {"name":devName, "description":devDesc, "state":"0", "type":devType}
            this.mf.requestPOST("http://localhost:8000/devices/add/",this,newDevice);
        }
        
        // Boton de confirmar el nuevo dispositivo
        var addConfirmBtn = document.getElementById("btn-confirm-addDev");
        addConfirmBtn.addEventListener("click",addDevHandler);    

        // Abrir modal
        modal.style.display = "block";
    }

    public changeDevState(ev:Event,objetoClick: HTMLElement){
        // Toma la checkbox donde se hizo click
        let checkBox: HTMLInputElement = <HTMLInputElement>ev.target;
        // Asigna al dispositivo el estado de la checkbox
        let datos = {"id":checkBox.id,"status":checkBox.checked};
        // Modifica el estado del dispositivo con método POST
        this.mf.requestPOST("http://localhost:8000/devices",this,datos);      
    }

    // Método del main para eliminar dispositivos
    public delDevConfirm(ev: Event){

        //Modal de eliminar dispositivos
        var modal = document.getElementById("modal-eliminar");

        // Toma id de dispositivo a eliminar
        var id = ev.target["id"].split("-")[1]

        // Operación que se ejecuta al confirmar en el Modal
        // Envia por POST el id del dispositivo a eliminar
        let confirmDelete= (ev:Event)=>{
            let deleteDevice = {"id":id}
            this.mf.requestPOST("http://localhost:8000/devices/delete/",this,deleteDevice);
        }
        
        // Confirmar operación
        var delConfirmBtn = document.getElementById("confirma-eliminar");
        delConfirmBtn.addEventListener("click",confirmDelete);
        
        // Botón de cancelar para cerrar la operación
        var cancel = document.getElementById("cancela-eliminar");
        cancel.addEventListener("click", ()=>{modal.style.display= "none";})
        
        // Muestra el modal
        modal.style.display = "block";

    }
    
    responsePost(status: number, response: string) {
        if (response == "eliminado" || response== "agregado") {
        window.location.replace('http://localhost:8000/');
        }else {
        console.log("std resp")
        }
    }
}

window.addEventListener("load", ()=> {
    let miObjMain: Main = new Main();
    miObjMain.initPageApp();

    // To be implemented -- 
    //let switchAllDisp: HTMLElement = miObjMain.mf.getElementById("btn-all-devices");
    //switchAllDisp.addEventListener("dblclick", ()=>{console.log("funcion no implementada")});

});
